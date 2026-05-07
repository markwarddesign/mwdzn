        return ['message' => $this->message->load('user:id,name')];
    }
}
```

We also broadcast `ChatMessageUpdated`, `ChatMessageDeleted`, and `ChatUserTyping`. Typing fires on a debounced keystroke, with a 4-second TTL on the client. Nothing fancy — we deliberately did **not** persist typing state.

### Channel authorization

`routes/channels.php` is where the "who can listen" rules live:

```php
Broadcast::channel('chat.channel.{channelId}', function (User $user, int $channelId) {
    return ChatChannel::where('id', $channelId)
        ->whereHas('members', fn ($q) => $q->where('user_id', $user->id))
        ->exists();
});
```

The presence channel for the same room (`presence-chat.channel.{id}`) returns the user's id and name so the client can render avatars of who's currently watching.

### Why Reverb (and not Pusher)

Reverb is a Laravel-first WebSocket server. It speaks the Pusher protocol, so the client SDK is identical, but it runs as a process you supervise yourself (`php artisan reverb:start`). Three reasons we picked it:

- **Free, predictable cost.** No per-connection meter. We run it on the same droplet behind nginx with `proxy_pass` to port 8080.
- **Same auth pipeline as the app.** Private channel auth uses the existing session cookie — no separate token dance.
- **Drops in.** `BROADCAST_DRIVER=reverb` and `php artisan install:broadcasting` writes the client config and you're done.

The trade-off: you're operating a long-lived process. We supervise with `systemd` (`Restart=always`), point health checks at `/health`, and ship the WebSocket logs to the same place as the app logs. That's it.

### Client side: one `useChat` hook

The whole client is wrapped around a single hook:

```js
const {
  messages,        // [{ id, body, user, created_at, mentions }]
  send,            // (body, mentions) => void
  edit, remove,    // CRUD
  typingUsers,     // [{ id, name }]
  hasMore, loadMore,
  presentUsers,    // from the presence channel
} = useChat(channelId);
```

Internally:

1. On mount, fetch the most recent 50 messages over plain HTTP.
2. Subscribe to `private-chat.channel.{id}` for the four event types.
3. On each event, update the local list immutably. (No SWR, no React Query — this state has only one consumer.)
4. On reconnect, refetch since the last seen `id` and merge — Echo's `connect`/`reconnect` events make this easy.

The reconnect path is the one we got bitten by. If the WebSocket drops for 30 seconds and a coworker sends 10 messages, those events vanish. Refetching on reconnect (and reconciling by id) is non-negotiable.

### Mentions

We use a contenteditable composer (the same one our notifications and feed use), which serializes mention chips as `<span data-user-id="42" class="mention-chip">@Jane Doe</span>`. On send, we extract user ids server-side and:

1. Persist to `chat_messages.mentions` (JSON column).
2. Fan out a database notification to each mentioned user (`MentionedInChatNotification`).
3. The notification preview field strips HTML on the client, so chips render as plain `@Jane Doe` text in the bell dropdown.

That last point cost us an afternoon. The composer's HTML went straight into the notification, and the dropdown rendered `<span class="...">` as literal text. The fix was a tiny `htmlToText()` helper that uses `DOMParser` to extract `textContent` — DOMParser handles entities and chip inner-text already includes the `@` sign, so the output is clean.

### Things we'd do differently

- **Start with the unread model.** We bolted `last_read_at` on later and had to backfill. Decide your unread semantics before you build the UI.
- **Pick a single composer abstraction.** Chat, feed, comments, and notifications all need a contenteditable with mentions, attachments, and emoji. We have one now (`RichEditor`), but for two months we had three slightly different ones.
- **Treat the WebSocket as best-effort.** Always re-sync on focus + reconnect. The server is the source of truth.

### Total scope

About 1,200 lines of PHP (controller, events, channel auth, model relations) and 1,800 lines of JSX (the panel, the drawer, the hook, the composer). Took one engineer two weeks to first usable, another week to polish.

---

## Post 2 — Putting Apryse WebViewer in Front of Construction Drawings

> *How we got real PDF markup, with multi-user annotations and version history, into our project management app.*

### Why Apryse

Construction PMs live in PDFs. Drawings, RFI markups, submittal redlines — every one of these is a shared, annotatable, printable document. We tried two cheaper paths first:

- **PDF.js + custom annotation layer.** Works for viewing, falls apart the moment you need stamps, callouts, measure tools, or interoperable XFDF.
- **Server-side flatten and render.** Fine for read-only, useless for the actual day-to-day workflow of "circle this and tag the GC."

[Apryse WebViewer](https://docs.apryse.com/web/guides/get-started) (formerly PDFTron) is the de-facto answer. It's a commercial SDK, but it gives you a complete, accessible, mobile-friendly viewer with a real annotation engine and an XFDF-native data model.

### What we wanted from the integration

1. **Multiple users annotating the same drawing**, with everyone's marks visible.
2. **Version history** — every PDF revision keeps its own annotation set; you can copy markups forward to a new revision.
3. **Mentions inside annotation comments**, wired into our notification system.
4. **Server-side persistence** — annotations live in our DB, not in the client.
5. **No vendor lock-in for the data.** Annotations are stored as standard XFDF.

### The architecture

```
        ┌────────────┐    POST /sync     ┌────────────────────┐
        │ WebViewer  │ ───────────────▶  │ DrawingApryseCtrl  │
        │ (browser)  │ ◀──────────────── │  → drawing_annotations
        └────────────┘    GET /xfdf      │  → drawing_annotation_events
                                         └────────────────────┘
```

Each drawing has a `current_version` (a row in `drawing_versions`, pointing at a stored PDF). Annotations are persisted as XFDF fragments — one row per annotation in `drawing_annotations`, plus an append-only `drawing_annotation_events` log so we can detect what changed since a client's last sync.

### The "delta sync" loop

Apryse's `annotationManager` fires events for every annotation create/update/delete. We don't ship the entire XFDF document on every change — that gets enormous fast on a busy drawing. Instead:

1. The client buffers ops for ~400ms, then POSTs to `/projects/{p}/drawings/{d}/apryse/sync`:
   ```json
   {
     "revision": 17,           // last revision the client has seen
     "ops": [
       { "type": "modify", "xfdf_id": "abc-123", "xfdf_fragment": "<square ...>" },
       { "type": "delete", "xfdf_id": "def-456" }
     ]
   }
   ```
2. The server checks `revision` against the version's current `xfdf_revision`. If the client is behind, the response includes the missed ops so the client can apply them before reconciling its own.
3. On success, the server bumps `xfdf_revision`, records the events, and broadcasts `DrawingAnnotationsSynced` to other viewers via Reverb.

This is the same pattern Google Docs uses, just a lot simpler — we don't need true OT because annotations don't conflict the way text edits do. Last write wins per `xfdf_id`.

### Initial load

On document open the client calls `GET /apryse/xfdf`, which returns:

```json
{ "revision": 17, "xfdf": "<?xml version=\"1.0\"...><xfdf>...</xfdf>" }
```

The server reconstructs a single XFDF document from the rows in `drawing_annotations` and hands it back. Apryse's `annotationManager.importAnnotations()` swallows it and the page lights up. We cache this response per `(version_id, revision)` so a popular drawing isn't re-serializing on every refresh.

### Mentions inside comments

This is where Apryse pays for itself. The viewer has built-in mention support — you call `instance.UI.mentions.setUserData([{ value, id, email }])` once on init and `@` inside any comment becomes an autocomplete. When the comment is saved, the `mentionChanged` event fires with the diff (added vs. removed user ids), and we:

1. Reconcile against the `drawing_annotation_mentions` table.
2. Dispatch a `DrawingAnnotationMentioned` notification to each newly-mentioned user.
3. Skip notifications when the same user is re-mentioned within 5 minutes (we batch via a queued job — `DispatchDrawingAnnotationNotifications` — to avoid spamming when someone is fixing typos).

The deep link in the notification opens the drawing and uses Apryse's "focus annotation" API to scroll to and select the annotation that mentioned you. That single bit of polish made adoption real.

### Versions

When a PM uploads a new revision of the drawing:

1. The new PDF gets a fresh `drawing_versions` row with `version = previous + 1` and `is_current = true`.
2. If "copy annotations" is checked, we duplicate the rows from the old version, rewriting their `version_id`. Annotations are tied to PDF coordinates, not page content, so they land in the right spot for any layout that hasn't shifted; we accept that they'll need cleanup on big redesigns.
3. The old version sticks around and is reachable via a version dropdown in the toolbar. Historical versions open in `readOnly` mode — the annotation manager is locked and the toolbar ribbons (`toolsHeader`, `ribbons`) are hidden.

### What we disabled in the UI

WebViewer is enormous. By default it ships Fill & Sign, Forms, Content Edit, Rubber Stamps, signature tools, file picker — none of which made sense for our context. We pared it down with:

```js
instance.UI.disableFeatures([
  instance.UI.Feature.ContentEdit,
  instance.UI.Feature.FilePicker,
  instance.UI.Feature.LocalStorage,
]);
instance.UI.disableElements([
  'toolbarGroup-Forms',
  'toolbarGroup-FillAndSign',
  'toolbarGroup-Edit',
  'toolbarGroup-EditText',
  'signatureToolGroupButton',
  'rubberStampToolGroupButton',
]);
```

`disableFeatures` is the right hook for behavior; `disableElements` is the right hook for hiding UI. Mixing them up will leave you with phantom buttons that throw on click.

### Mobile

WebViewer is mobile-capable but cramped. We open drawings full-screen by default — a `position: fixed inset-0 z-100` overlay outside our normal AuthenticatedLayout — with a Minimize button to drop back into the regular page chrome. The toolbar collapses to icon-only on `<sm` viewports; everything has a `title` for tooltip access on desktop.

### What you'll spend a day on

- **License key plumbing.** WebViewer needs a license key in the constructor. Don't ship it in the public bundle — pass it through Inertia props from a server-side `apryse.license_key` config.
- **`fileUrl` auth.** WebViewer fetches the PDF from a URL you provide. That URL must be authenticated, so we proxy it through a signed Laravel route that streams from S3 with the correct `Content-Type`.
- **Read-only mode is two flags.** `annotationManager.enableReadOnlyMode()` **and** hide the tool ribbons. One without the other lets users draw annotations that vanish on reload.

### Was it worth it?

Yes — the alternative was building 30% of WebViewer ourselves and having it be worse. The integration shipped in about three weeks: one for the persistence model and sync protocol, one for the version pipeline, one for mentions and notifications and mobile polish.

The license isn't cheap, but our customers' first reaction to drawings was "wait, this works on my phone?" That's the kind of moment that closes deals.
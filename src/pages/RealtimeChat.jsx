import React from 'react';
import { FiArrowLeft, FiZap, FiCheckCircle, FiAlertTriangle, FiCode, FiUsers, FiRefreshCw, FiMessageSquare } from 'react-icons/fi';
import { SiLaravel, SiReact, SiPhp } from 'react-icons/si';
import { Link } from 'react-router-dom';

const RealtimeChat = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">

          {/* Header */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded-full mb-4">Real-Time · WebSockets</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">
              Building Realtime Chat into a Laravel + React App
            </h1>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400 text-sm">
            <span>By <strong className="text-gray-200">Mark Ward</strong> &middot; Lead Software Engineer</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiLaravel className="text-red-400" size={16} /> Laravel Reverb</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiReact className="text-cyan-400" size={16} /> React</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiPhp className="text-indigo-400" size={16} /> PHP 8.2</span>
            <span className="text-gray-600">·</span>
            <span className="text-sm text-gray-400">March 12, 2026 &middot; 8 min read</span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            <p>
              How we shipped per-project chat channels with mentions, presence, and live updates — without paying for Pusher.
            </p>

            {/* The Shape of the Feature */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiMessageSquare className="text-cyan-400" /> The Shape of the Feature
            </h2>
            <p>We needed lightweight, in-app chat scoped to construction projects:</p>
            <ul>
              <li>One or more channels per project, plus DMs.</li>
              <li>Members list, mentions, typing indicators, message edit/delete.</li>
              <li>A floating side panel on every page <strong className="text-white">and</strong> a full-page hub at <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">/chat</code>.</li>
              <li>Realtime — messages should land for everyone in the channel within a second of being sent.</li>
            </ul>
            <p>
              We were already running Laravel 11 + Inertia/React + Postgres. We did not want to introduce a Node service, and we did not want to pay Pusher per concurrent connection. That left two relevant pieces to assemble:
            </p>
            <ol>
              <li><strong className="text-white">Laravel Reverb</strong> as the WebSocket broker (first-party, runs alongside the app).</li>
              <li><strong className="text-white">Laravel Echo</strong> on the client, listening on private + presence channels.</li>
            </ol>

            {/* Data Model */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCode className="text-yellow-400" /> Data Model
            </h2>
            <p>Three tables, no surprises:</p>
            <ul>
              <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">chat_channels</code> — <code className="bg-gray-800 px-1 rounded text-cyan-300">project_id</code> (nullable, for DMs), <code className="bg-gray-800 px-1 rounded text-cyan-300">name</code>, <code className="bg-gray-800 px-1 rounded text-cyan-300">kind</code> (<code className="bg-gray-800 px-1 rounded text-cyan-300">project | dm</code>), <code className="bg-gray-800 px-1 rounded text-cyan-300">account_id</code> (multi-tenant).</li>
              <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">chat_channel_members</code> — pivot with <code className="bg-gray-800 px-1 rounded text-cyan-300">last_read_at</code> so we can compute unread counts.</li>
              <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">chat_messages</code> — <code className="bg-gray-800 px-1 rounded text-cyan-300">channel_id</code>, <code className="bg-gray-800 px-1 rounded text-cyan-300">user_id</code>, <code className="bg-gray-800 px-1 rounded text-cyan-300">body</code>, <code className="bg-gray-800 px-1 rounded text-cyan-300">mentions</code> (JSON of user ids), soft deletes.</li>
            </ul>
            <p>
              The <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">last_read_at</code> column is the unsung hero — every unread badge in the UI is <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">count(messages where created_at &gt; last_read_at)</code>. No "read receipt" table, no per-message join.
            </p>

            {/* The Events */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiZap className="text-cyan-400" /> The Events
            </h2>
            <p>Each user-visible action gets a single broadcast event implementing <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">ShouldBroadcastNow</code>:</p>

            <div className="not-prose bg-gray-900 border border-gray-700 rounded-xl overflow-hidden my-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400 font-mono">ChatMessageSent.php</span>
              </div>
              <pre className="p-5 text-sm text-gray-300 overflow-x-auto leading-relaxed"><code>{`class ChatMessageSent implements ShouldBroadcastNow
{
    public function __construct(public ChatMessage $message) {}

    public function broadcastOn(): array
    {
        return [new PrivateChannel("chat.channel.{$this->message->channel_id}")];
    }

    public function broadcastWith(): array
    {
        return ['message' => $this->message->load('user:id,name')];
    }
}`}</code></pre>
            </div>

            <p>
              We also broadcast <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">ChatMessageUpdated</code>, <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">ChatMessageDeleted</code>, and <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">ChatUserTyping</code>. Typing fires on a debounced keystroke, with a 4-second TTL on the client. We deliberately did <strong className="text-white">not</strong> persist typing state.
            </p>

            {/* Channel Authorization */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiUsers className="text-green-400" /> Channel Authorization
            </h2>
            <p><code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">routes/channels.php</code> is where the "who can listen" rules live:</p>

            <div className="not-prose bg-gray-900 border border-gray-700 rounded-xl overflow-hidden my-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400 font-mono">routes/channels.php</span>
              </div>
              <pre className="p-5 text-sm text-gray-300 overflow-x-auto leading-relaxed"><code>{`Broadcast::channel('chat.channel.{channelId}', function (User $user, int $channelId) {
    return ChatChannel::where('id', $channelId)
        ->whereHas('members', fn ($q) => $q->where('user_id', $user->id))
        ->exists();
});`}</code></pre>
            </div>

            <p>
              The presence channel for the same room (<code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">presence-chat.channel.{'{id}'}</code>) returns the user's id and name so the client can render avatars of who's currently watching.
            </p>

            {/* Why Reverb */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <SiLaravel className="text-red-400" /> Why Reverb (and not Pusher)
            </h2>
            <p>
              Reverb is a Laravel-first WebSocket server. It speaks the Pusher protocol, so the client SDK is identical, but it runs as a process you supervise yourself (<code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">php artisan reverb:start</code>). Three reasons we picked it:
            </p>

            <div className="not-prose space-y-3 my-6">
              {[
                { title: 'Free, predictable cost', desc: 'No per-connection meter. We run it on the same droplet behind nginx with proxy_pass to port 8080.' },
                { title: 'Same auth pipeline as the app', desc: 'Private channel auth uses the existing session cookie — no separate token dance.' },
                { title: 'Drops in', desc: 'BROADCAST_DRIVER=reverb and php artisan install:broadcasting writes the client config and you\'re done.' },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3 bg-gray-900 border border-gray-700 rounded-xl p-4">
                  <FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p>
              The trade-off: you're operating a long-lived process. We supervise with <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">systemd</code> (<code className="bg-gray-800 px-1 rounded text-cyan-300">Restart=always</code>), point health checks at <code className="bg-gray-800 px-1 rounded text-cyan-300">/health</code>, and ship the WebSocket logs to the same place as the app logs. That's it.
            </p>

            {/* useChat Hook */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <SiReact className="text-cyan-400" /> Client Side: One <code className="text-cyan-300 text-xl">useChat</code> Hook
            </h2>
            <p>The whole client is wrapped around a single hook:</p>

            <div className="not-prose bg-gray-900 border border-gray-700 rounded-xl overflow-hidden my-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400 font-mono">useChat.js</span>
              </div>
              <pre className="p-5 text-sm text-gray-300 overflow-x-auto leading-relaxed"><code>{`const {
  messages,        // [{ id, body, user, created_at, mentions }]
  send,            // (body, mentions) => void
  edit, remove,    // CRUD
  typingUsers,     // [{ id, name }]
  hasMore, loadMore,
  presentUsers,    // from the presence channel
} = useChat(channelId);`}</code></pre>
            </div>

            <p>Internally:</p>
            <ol>
              <li>On mount, fetch the most recent 50 messages over plain HTTP.</li>
              <li>Subscribe to <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">private-chat.channel.{'{id}'}</code> for the four event types.</li>
              <li>On each event, update the local list immutably. (No SWR, no React Query — this state has only one consumer.)</li>
              <li>On reconnect, refetch since the last seen <code className="bg-gray-800 px-1 rounded text-cyan-300">id</code> and merge — Echo's <code className="bg-gray-800 px-1 rounded text-cyan-300">connect</code>/<code className="bg-gray-800 px-1 rounded text-cyan-300">reconnect</code> events make this easy.</li>
            </ol>

            <div className="not-prose bg-gray-900 border border-red-800/40 rounded-xl p-5 my-6">
              <div className="flex items-start gap-3">
                <FiAlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-bold text-red-300 mb-1">The Reconnect Path</p>
                  <p className="text-sm text-gray-400">The reconnect path is the one we got bitten by. If the WebSocket drops for 30 seconds and a coworker sends 10 messages, those events vanish. Refetching on reconnect (and reconciling by id) is non-negotiable.</p>
                </div>
              </div>
            </div>

            {/* Mentions */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiMessageSquare className="text-purple-400" /> Mentions
            </h2>
            <p>
              We use a contenteditable composer which serializes mention chips as <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">{'<span data-user-id="42" class="mention-chip">@Jane Doe</span>'}</code>. On send, we extract user ids server-side and:
            </p>
            <ol>
              <li>Persist to <code className="bg-gray-800 px-1 rounded text-cyan-300">chat_messages.mentions</code> (JSON column).</li>
              <li>Fan out a database notification to each mentioned user (<code className="bg-gray-800 px-1 rounded text-cyan-300">MentionedInChatNotification</code>).</li>
              <li>The notification preview field strips HTML on the client, so chips render as plain <code className="bg-gray-800 px-1 rounded text-cyan-300">@Jane Doe</code> text in the bell dropdown.</li>
            </ol>
            <p>
              That last point cost us an afternoon. The composer's HTML went straight into the notification, and the dropdown rendered <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">{'<span class="...">}'}</code> as literal text. The fix was a tiny <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">htmlToText()</code> helper that uses <code className="bg-gray-800 px-1 rounded text-cyan-300">DOMParser</code> to extract <code className="bg-gray-800 px-1 rounded text-cyan-300">textContent</code>.
            </p>

            {/* Things We'd Do Differently */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiRefreshCw className="text-yellow-400" /> Things We'd Do Differently
            </h2>
            <ul>
              <li><strong className="text-white">Start with the unread model.</strong> We bolted <code className="bg-gray-800 px-1 rounded text-cyan-300">last_read_at</code> on later and had to backfill. Decide your unread semantics before you build the UI.</li>
              <li><strong className="text-white">Pick a single composer abstraction.</strong> Chat, feed, comments, and notifications all need a contenteditable with mentions, attachments, and emoji. We have one now (<code className="bg-gray-800 px-1 rounded text-cyan-300">RichEditor</code>), but for two months we had three slightly different ones.</li>
              <li><strong className="text-white">Treat the WebSocket as best-effort.</strong> Always re-sync on focus + reconnect. The server is the source of truth.</li>
            </ul>

            {/* Total Scope */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCode className="text-cyan-400" /> Total Scope
            </h2>
            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-cyan-400 mb-1">~1,200</p>
                <p className="text-sm font-semibold text-white mb-1">Lines of PHP</p>
                <p className="text-xs text-gray-400">Controller, events, channel auth, model relations.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-purple-400 mb-1">~1,800</p>
                <p className="text-sm font-semibold text-white mb-1">Lines of JSX</p>
                <p className="text-xs text-gray-400">The panel, the drawer, the hook, the composer.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center sm:col-span-2">
                <p className="text-3xl font-extrabold text-green-400 mb-1">3 weeks</p>
                <p className="text-sm font-semibold text-white mb-1">Total Delivery</p>
                <p className="text-xs text-gray-400">Two weeks to first usable, one week to polish.</p>
              </div>
            </div>

            <blockquote className="border-l-4 border-cyan-500 pl-6 my-10 not-prose">
              <p className="text-lg text-gray-300 italic leading-relaxed">
                "The reconnect path and the unread model are the two things that will bite you if you skip them. Everything else is just wiring."
              </p>
              <footer className="mt-3 text-sm text-cyan-400 font-semibold">— Mark Ward, Lead Engineer</footer>
            </blockquote>

          </div>

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 font-medium transition-colors">
              <FiArrowLeft size={16} />
              Back to Home
            </Link>
          </div>

        </article>
      </main>
    </div>
  );
};

export default RealtimeChat;

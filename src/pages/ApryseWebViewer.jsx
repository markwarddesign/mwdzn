import React from 'react';
import { FiArrowLeft, FiCheckCircle, FiAlertTriangle, FiCode, FiLayers, FiUsers, FiRefreshCw, FiFileText } from 'react-icons/fi';
import { SiLaravel, SiReact } from 'react-icons/si';
import { Link } from 'react-router-dom';

const ApryseWebViewer = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">

          {/* Header */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-900/30 px-3 py-1 rounded-full mb-4">PDF · Annotations · Construction</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">
              Putting Apryse WebViewer in Front of Construction Drawings
            </h1>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400 text-sm">
            <span>By <strong className="text-gray-200">Mark Ward</strong> &middot; Lead Software Engineer</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiLaravel className="text-red-400" size={16} /> Laravel</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiReact className="text-cyan-400" size={16} /> React</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><FiFileText className="text-amber-400" size={16} /> Apryse WebViewer</span>
            <span className="text-gray-600">·</span>
            <span className="text-sm text-gray-400">April 9, 2026 &middot; 9 min read</span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            <p>
              How we got real PDF markup — with multi-user annotations and version history — into our construction project management app.
            </p>

            {/* Why Apryse */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiFileText className="text-amber-400" /> Why Apryse
            </h2>
            <p>
              Construction PMs live in PDFs. Drawings, RFI markups, submittal redlines — every one of these is a shared, annotatable, printable document. We tried two cheaper paths first:
            </p>

            <div className="not-prose space-y-3 my-6">
              {[
                { label: 'PDF.js + custom annotation layer', result: 'Works for viewing, falls apart the moment you need stamps, callouts, measure tools, or interoperable XFDF.' },
                { label: 'Server-side flatten and render', result: 'Fine for read-only, useless for the actual day-to-day workflow of "circle this and tag the GC."' },
              ].map(({ label, result }) => (
                <div key={label} className="flex items-start gap-3 bg-gray-900 border border-red-800/40 rounded-xl p-4">
                  <FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-sm font-bold text-white">{label}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{result}</p>
                  </div>
                </div>
              ))}
            </div>

            <p>
              <a href="https://docs.apryse.com/web/guides/get-started" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">Apryse WebViewer</a> (formerly PDFTron) is the de-facto answer. It's a commercial SDK, but it gives you a complete, accessible, mobile-friendly viewer with a real annotation engine and an XFDF-native data model.
            </p>

            {/* What We Wanted */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-green-400" /> What We Wanted from the Integration
            </h2>
            <ol>
              <li><strong className="text-white">Multiple users annotating the same drawing</strong>, with everyone's marks visible.</li>
              <li><strong className="text-white">Version history</strong> — every PDF revision keeps its own annotation set; you can copy markups forward to a new revision.</li>
              <li><strong className="text-white">Mentions inside annotation comments</strong>, wired into our notification system.</li>
              <li><strong className="text-white">Server-side persistence</strong> — annotations live in our DB, not in the client.</li>
              <li><strong className="text-white">No vendor lock-in for the data.</strong> Annotations are stored as standard XFDF.</li>
            </ol>

            {/* Architecture */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiLayers className="text-blue-400" /> The Architecture
            </h2>

            <div className="not-prose bg-gray-900 border border-gray-700 rounded-xl overflow-hidden my-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400 font-mono">Architecture Overview</span>
              </div>
              <pre className="p-5 text-sm text-gray-300 overflow-x-auto leading-relaxed"><code>{`        ┌────────────┐    POST /sync     ┌────────────────────┐
        │ WebViewer  │ ───────────────▶  │ DrawingApryseCtrl  │
        │ (browser)  │ ◀──────────────── │  → drawing_annotations
        └────────────┘    GET /xfdf      │  → drawing_annotation_events
                                         └────────────────────┘`}</code></pre>
            </div>

            <p>
              Each drawing has a <code className="bg-gray-800 px-1.5 py-0.5 rounded text-amber-300">current_version</code> (a row in <code className="bg-gray-800 px-1 rounded text-amber-300">drawing_versions</code>, pointing at a stored PDF). Annotations are persisted as XFDF fragments — one row per annotation in <code className="bg-gray-800 px-1 rounded text-amber-300">drawing_annotations</code>, plus an append-only <code className="bg-gray-800 px-1 rounded text-amber-300">drawing_annotation_events</code> log so we can detect what changed since a client's last sync.
            </p>

            {/* Delta Sync */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiRefreshCw className="text-cyan-400" /> The "Delta Sync" Loop
            </h2>
            <p>
              Apryse's <code className="bg-gray-800 px-1.5 py-0.5 rounded text-amber-300">annotationManager</code> fires events for every annotation create/update/delete. We don't ship the entire XFDF document on every change — that gets enormous fast on a busy drawing. Instead:
            </p>

            <div className="not-prose bg-gray-900 border border-gray-700 rounded-xl overflow-hidden my-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400 font-mono">POST /apryse/sync — payload</span>
              </div>
              <pre className="p-5 text-sm text-gray-300 overflow-x-auto leading-relaxed"><code>{`{
  "revision": 17,
  "ops": [
    { "type": "modify", "xfdf_id": "abc-123", "xfdf_fragment": "<square ...>" },
    { "type": "delete", "xfdf_id": "def-456" }
  ]
}`}</code></pre>
            </div>

            <ol>
              <li>The client buffers ops for ~400ms, then POSTs to <code className="bg-gray-800 px-1.5 py-0.5 rounded text-amber-300">/projects/{'{p}'}/drawings/{'{d}'}/apryse/sync</code>.</li>
              <li>The server checks <code className="bg-gray-800 px-1 rounded text-amber-300">revision</code> against the version's current <code className="bg-gray-800 px-1 rounded text-amber-300">xfdf_revision</code>. If the client is behind, the response includes the missed ops so the client can apply them before reconciling its own.</li>
              <li>On success, the server bumps <code className="bg-gray-800 px-1 rounded text-amber-300">xfdf_revision</code>, records the events, and broadcasts <code className="bg-gray-800 px-1 rounded text-amber-300">DrawingAnnotationsSynced</code> to other viewers via Reverb.</li>
            </ol>
            <p>
              This is the same pattern Google Docs uses, just a lot simpler — we don't need true OT because annotations don't conflict the way text edits do. Last write wins per <code className="bg-gray-800 px-1.5 py-0.5 rounded text-amber-300">xfdf_id</code>.
            </p>

            {/* Mentions inside comments */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiUsers className="text-purple-400" /> Mentions Inside Comments
            </h2>
            <p>
              This is where Apryse pays for itself. The viewer has built-in mention support — you call <code className="bg-gray-800 px-1.5 py-0.5 rounded text-amber-300">{'instance.UI.mentions.setUserData([{ value, id, email }])'}</code> once on init and <code className="bg-gray-800 px-1 rounded text-amber-300">@</code> inside any comment becomes an autocomplete. When the comment is saved, the <code className="bg-gray-800 px-1 rounded text-amber-300">mentionChanged</code> event fires with the diff (added vs. removed user ids), and we:
            </p>
            <ol>
              <li>Reconcile against the <code className="bg-gray-800 px-1 rounded text-amber-300">drawing_annotation_mentions</code> table.</li>
              <li>Dispatch a <code className="bg-gray-800 px-1 rounded text-amber-300">DrawingAnnotationMentioned</code> notification to each newly-mentioned user.</li>
              <li>Skip notifications when the same user is re-mentioned within 5 minutes (we batch via a queued job — <code className="bg-gray-800 px-1 rounded text-amber-300">DispatchDrawingAnnotationNotifications</code> — to avoid spamming when someone is fixing typos).</li>
            </ol>
            <p>
              The deep link in the notification opens the drawing and uses Apryse's "focus annotation" API to scroll to and select the annotation that mentioned you. <strong className="text-white">That single bit of polish made adoption real.</strong>
            </p>

            {/* Versions */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiLayers className="text-amber-400" /> Versions
            </h2>
            <p>When a PM uploads a new revision of the drawing:</p>
            <ol>
              <li>The new PDF gets a fresh <code className="bg-gray-800 px-1 rounded text-amber-300">drawing_versions</code> row with <code className="bg-gray-800 px-1 rounded text-amber-300">version = previous + 1</code> and <code className="bg-gray-800 px-1 rounded text-amber-300">is_current = true</code>.</li>
              <li>If "copy annotations" is checked, we duplicate the rows from the old version, rewriting their <code className="bg-gray-800 px-1 rounded text-amber-300">version_id</code>. Annotations are tied to PDF coordinates, not page content, so they land in the right spot for any layout that hasn't shifted.</li>
              <li>The old version sticks around and is reachable via a version dropdown in the toolbar. Historical versions open in <code className="bg-gray-800 px-1 rounded text-amber-300">readOnly</code> mode — the annotation manager is locked and the toolbar ribbons are hidden.</li>
            </ol>

            {/* What We Disabled */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCode className="text-red-400" /> What We Disabled in the UI
            </h2>
            <p>
              WebViewer is enormous. By default it ships Fill &amp; Sign, Forms, Content Edit, Rubber Stamps, signature tools, file picker — none of which made sense for our context. We pared it down with:
            </p>

            <div className="not-prose bg-gray-900 border border-gray-700 rounded-xl overflow-hidden my-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400 font-mono">viewer-init.js</span>
              </div>
              <pre className="p-5 text-sm text-gray-300 overflow-x-auto leading-relaxed"><code>{`instance.UI.disableFeatures([
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
]);`}</code></pre>
            </div>

            <div className="not-prose bg-gray-900 border border-amber-800/40 rounded-xl p-5 my-6">
              <div className="flex items-start gap-3">
                <FiAlertTriangle className="text-amber-400 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-gray-300"><code className="bg-gray-800 px-1 rounded text-amber-300">disableFeatures</code> is the right hook for behavior; <code className="bg-gray-800 px-1 rounded text-amber-300">disableElements</code> is the right hook for hiding UI. Mixing them up will leave you with phantom buttons that throw on click.</p>
              </div>
            </div>

            {/* What You'll Spend a Day On */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiAlertTriangle className="text-yellow-400" /> What You'll Spend a Day On
            </h2>

            <div className="not-prose space-y-3 my-6">
              {[
                { title: 'License key plumbing', desc: "WebViewer needs a license key in the constructor. Don't ship it in the public bundle — pass it through Inertia props from a server-side apryse.license_key config." },
                { title: 'fileUrl auth', desc: 'WebViewer fetches the PDF from a URL you provide. That URL must be authenticated, so we proxy it through a signed Laravel route that streams from S3 with the correct Content-Type.' },
                { title: 'Read-only mode is two flags', desc: 'annotationManager.enableReadOnlyMode() AND hide the tool ribbons. One without the other lets users draw annotations that vanish on reload.' },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3 bg-gray-900 border border-yellow-800/40 rounded-xl p-4">
                  <FiAlertTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Was it worth it */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-green-400" /> Was It Worth It?
            </h2>
            <p>
              Yes — the alternative was building 30% of WebViewer ourselves and having it be worse. The integration shipped in about three weeks: one for the persistence model and sync protocol, one for the version pipeline, one for mentions and notifications and mobile polish.
            </p>

            <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-amber-400 mb-1">3</p>
                <p className="text-sm font-semibold text-white mb-1">Weeks to Ship</p>
                <p className="text-xs text-gray-400">Persistence model, version pipeline, mentions, mobile.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-blue-400 mb-1">XFDF</p>
                <p className="text-sm font-semibold text-white mb-1">Open Standard</p>
                <p className="text-xs text-gray-400">All annotation data stored as vendor-neutral XFDF — no lock-in.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-green-400 mb-1">📱</p>
                <p className="text-sm font-semibold text-white mb-1">Mobile-First</p>
                <p className="text-xs text-gray-400">"Wait, this works on my phone?" — the moment that closes deals.</p>
              </div>
            </div>

            <blockquote className="border-l-4 border-amber-500 pl-6 my-10 not-prose">
              <p className="text-lg text-gray-300 italic leading-relaxed">
                "The license isn't cheap, but our customers' first reaction to drawings was 'wait, this works on my phone?' That's the kind of moment that closes deals."
              </p>
              <footer className="mt-3 text-sm text-amber-400 font-semibold">— Mark Ward, Lead Engineer</footer>
            </blockquote>

          </div>

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-amber-400 font-medium transition-colors">
              <FiArrowLeft size={16} />
              Back to Home
            </Link>
            <a href="https://projectaire.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-2.5 rounded-full text-white font-bold shadow-lg bg-amber-600 hover:bg-amber-700 hover:-translate-y-0.5 transition-all text-sm">
              See ProjectAire &rarr;
            </a>
          </div>

        </article>
      </main>
    </div>
  );
};

export default ApryseWebViewer;

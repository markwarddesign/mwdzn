import React from 'react';
import { FiCheckCircle, FiAlertTriangle, FiZap, FiShield, FiCode, FiCpu } from 'react-icons/fi';
import { SiGoogle, SiCloudflare, SiReact, SiVite } from 'react-icons/si';

const GeminiPortfolioAssistant = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">

          {/* Header */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-yellow-400 bg-yellow-900/30 px-3 py-1 rounded-full mb-4">AI / Architecture</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">
              Building a Secure AI Assistant Into a Static Portfolio Site
            </h1>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400 text-sm">
            <span>By <strong className="text-gray-200">Mark Ward</strong> &middot; Lead Software Engineer</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiReact className="text-cyan-400" size={16} /> React</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiGoogle className="text-blue-400" size={16} /> Gemini 2.0</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiCloudflare className="text-orange-400" size={16} /> Cloudflare Workers</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiVite className="text-purple-400" size={16} /> Vite</span>
            <span className="text-gray-600">·</span>
            <span className="text-sm text-gray-400">February 19, 2026 &middot; 7 min read</span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            <p>
              The little chat widget in the corner of this site is powered by Google's Gemini 2.0 Flash model — and it knows a surprising amount about my career, projects, and tech opinions. What it <em>doesn't</em> do is expose an API key to anyone who opens DevTools. Here's how I built it, why the obvious approach fails, and the architecture that actually works on a static host.
            </p>

            {/* The Goal */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCpu className="text-blue-400" /> The Goal
            </h2>
            <p>
              I wanted a recruiter or hiring manager to be able to ask natural-language questions — "What's Mark's experience with multi-tenant auth?" or "Tell me about the California Closets project" — and get a fast, grounded, accurate answer. No hallucinations about credentials I don't have. No chatbot going rogue. Just a focused, useful assistant that represents me honestly.
            </p>
            <p>
              The site itself is a Vite + React SPA deployed to GitHub Pages. Completely static. No server. That constraint makes the API key problem interesting.
            </p>

            {/* The Problem */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiAlertTriangle className="text-red-400" /> The Problem with <code className="text-red-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">VITE_*</code> Env Vars
            </h2>
            <p>
              Vite's <code className="text-yellow-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">VITE_*</code> environment variables are designed to be embedded in the client bundle at build time. That's exactly what makes them convenient — and exactly what makes them a security liability for secrets like API keys.
            </p>
            <p>
              When you do this in your component:
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <code>{`const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);`}</code>
            </pre>
            <p>
              Vite replaces that expression with the literal string value during the build. Your compiled <code className="text-yellow-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">dist/assets/index-abc123.js</code> ends up containing something like:
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <code>{`const apiKey = "AIzaSy...your-real-key";`}</code>
            </pre>
            <p>
              That file is publicly accessible on GitHub Pages. Anyone who opens the Network tab, searches the bundle, or runs a basic scraper gets your key. I learned this the hard way — GitHub's secret scanning caught the leak almost immediately after my first deploy.
            </p>

            {/* The Solution */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiShield className="text-green-400" /> The Fix: A Cloudflare Worker Proxy
            </h2>
            <p>
              The fix is conceptually simple: the API key should never touch the client. Instead, the React app calls a lightweight server-side proxy that injects the key on the way out. On a static-only stack, the free tier of <strong className="text-white">Cloudflare Workers</strong> is the perfect fit — it's globally distributed, handles 100k requests/day free, and can store secrets in its own encrypted environment.
            </p>

            <div className="not-prose bg-gray-900 border border-gray-700 rounded-xl p-5 my-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Request Flow</p>
              <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-center">
                <div className="bg-[#1e2230] border border-blue-800/50 rounded-lg px-4 py-3 flex-1">
                  <SiReact className="text-cyan-400 mx-auto mb-1" size={18} />
                  <p className="text-blue-100 font-semibold">React App</p>
                  <p className="text-gray-500 text-xs mt-1">Sends message + history</p>
                </div>
                <div className="text-gray-500 text-lg font-bold px-2">→</div>
                <div className="bg-[#1e2230] border border-orange-800/50 rounded-lg px-4 py-3 flex-1">
                  <SiCloudflare className="text-orange-400 mx-auto mb-1" size={18} />
                  <p className="text-orange-100 font-semibold">Cloudflare Worker</p>
                  <p className="text-gray-500 text-xs mt-1">Injects API key (secret env var)</p>
                </div>
                <div className="text-gray-500 text-lg font-bold px-2">→</div>
                <div className="bg-[#1e2230] border border-blue-800/50 rounded-lg px-4 py-3 flex-1">
                  <SiGoogle className="text-blue-400 mx-auto mb-1" size={18} />
                  <p className="text-blue-100 font-semibold">Gemini API</p>
                  <p className="text-gray-500 text-xs mt-1">Streams SSE response</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 text-center mt-4">The API key only ever exists inside Cloudflare's encrypted environment — never in the browser.</p>
            </div>

            <p>
              The worker itself is about 50 lines. It validates the origin (CORS), forwards the request body to Gemini's streaming endpoint with the secret key injected, and pipes the SSE response straight back to the client:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiCloudflare className="text-orange-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">worker/gemini-proxy.js</span>
              </div>
              <code className="language-javascript">{`export default {
  async fetch(request, env) {
    // CORS: only allow requests from the portfolio domain
    const origin = request.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowed,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const body = await request.text();

    // env.GEMINI_API_KEY is a Cloudflare secret — never visible to the client
    const geminiRes = await fetch(
      \`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=\${env.GEMINI_API_KEY}\`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }
    );

    return new Response(geminiRes.body, {
      status: geminiRes.status,
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  },
};`}</code>
            </pre>

            <p>
              Deploy it once with <code className="text-yellow-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">wrangler deploy</code>, set the secret with <code className="text-yellow-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">wrangler secret put GEMINI_API_KEY</code>, and that's it. The React app now only knows a public worker URL — no secret in sight.
            </p>

            {/* SSE Streaming */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiZap className="text-yellow-400" /> Handling Streaming Without the SDK
            </h2>
            <p>
              I originally used Google's <code className="text-yellow-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">@google/generative-ai</code> SDK, which wraps the streaming nicely. But the SDK calls the API directly and needs the key on the client — exactly what we're avoiding. So I dropped it and implemented the SSE parsing myself with the Fetch API. It's not complicated:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiReact className="text-cyan-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">src/components/GeminiChat.jsx (send function)</span>
              </div>
              <code className="language-javascript">{`const response = await fetch(workerUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [...apiHistory, { role: 'user', parts: [{ text }] }],
  }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();
let buffer = '';
let fullResponse = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  buffer += decoder.decode(value, { stream: true });
  const lines = buffer.split('\\n');
  buffer = lines.pop(); // keep incomplete line in buffer

  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    const data = line.slice(6).trim();
    if (!data || data === '[DONE]') continue;
    try {
      const parsed = JSON.parse(data);
      const chunk = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
      fullResponse += chunk;
      // Update UI token by token for the streaming effect
      setDisplayMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'model', text: fullResponse };
        return updated;
      });
    } catch (_) {}
  }
}`}</code>
            </pre>

            <p>
              The key nuance is the <strong className="text-white">buffer pattern</strong>: SSE chunks don't always arrive on clean line boundaries. By splitting on <code className="text-yellow-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">\n</code> and keeping the last (potentially incomplete) line in a buffer, we handle split packets without dropping any tokens.
            </p>

            {/* System Prompt Design */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCode className="text-purple-400" /> Keeping the Assistant Grounded
            </h2>
            <p>
              Streaming works. The bigger design challenge is making sure the model only talks about things that are actually true about me. LLMs are creative — left unconstrained, they'll confidently invent credentials.
            </p>
            <p>
              My approach was a single <code className="text-yellow-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">assistantConfig.js</code> file that acts as the source of truth — a structured JavaScript object containing my real experience, skills, projects, and behavioral instructions. A <code className="text-yellow-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">buildSystemPrompt()</code> function compiles it into a system instruction sent with every request:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiReact className="text-cyan-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">src/assistantConfig.js (excerpt)</span>
              </div>
              <code className="language-javascript">{`assistantInstructions: \`
  - Speak about Mark in the third person, positively but factually.
  - Keep responses to 2–4 sentences unless a detailed technical answer is warranted.
  - Do not invent projects, credentials, or facts not listed in this config.
  - If asked something you don't know, say so honestly and suggest contacting Mark directly.
  - Never discuss salary expectations or make commitments on Mark's behalf.
\``}</code>
            </pre>

            <p>
              This pattern — structured data in, system prompt out — means updating the assistant's knowledge is just editing a config file. No prompt engineering buried in component logic.
            </p>

            {/* Tradeoffs */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-green-400" /> What Worked, What I'd Change
            </h2>

            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gray-900 border border-green-800/40 rounded-xl p-5">
                <p className="font-bold text-green-300 mb-3 text-sm">What worked well</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> Cloudflare Worker free tier handles the traffic easily</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> Gemini 2.0 Flash is fast — responses start streaming in ~300ms</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> Config-driven system prompt is trivial to update</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> No SDK dependency on the client — less bundle weight</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> CORS restriction means the key can't be abused from other domains</li>
                </ul>
              </div>
              <div className="bg-gray-900 border border-yellow-800/40 rounded-xl p-5">
                <p className="font-bold text-yellow-300 mb-3 text-sm">What I'd improve</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" size={13} /> Rate limiting per-IP at the Worker level (not yet implemented)</li>
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" size={13} /> Chat history isn't persisted across sessions</li>
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" size={13} /> No token count guard — a long session could hit context limits</li>
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" size={13} /> Could add a simple abuse honeypot or turnstile for bots</li>
                </ul>
              </div>
            </div>

            <p>
              The whole thing — Worker, config, streaming chat component — took about half a day to build. Gemini 2.0 Flash's speed makes it feel snappy enough that visitors actually engage with it. If you're building a portfolio and want to stand out beyond the usual resume dump, a grounded AI assistant is a meaningful differentiator — just don't skip the proxy.
            </p>

          </div>

          {/* Footer nav */}
          <div className="mt-10 pt-8 border-t border-gray-800">
            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Tags:</span>
              {['Gemini', 'AI', 'Cloudflare Workers', 'React', 'Vite', 'Static Sites', 'API Security'].map(tag => (
                <span key={tag} className="bg-gray-800 text-gray-400 border border-gray-700 rounded-full px-3 py-0.5 text-xs">{tag}</span>
              ))}
            </div>
          </div>

        </article>
      </main>
    </div>
  );
};

export default GeminiPortfolioAssistant;

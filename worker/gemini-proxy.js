/**
 * Cloudflare Worker — Gemini API Proxy + Notify beacon
 *
 * POST /         → proxies a streaming Gemini request (keeps GEMINI_API_KEY server-side)
 * POST /notify   → sends a real-time email via Resend when a page is opened
 *
 * Deploy:
 *   1. npm install -g wrangler
 *   2. wrangler login
 *   3. wrangler deploy                     (from the /worker directory)
 *   4. wrangler secret put GEMINI_API_KEY  ← Gemini key
 *   5. wrangler secret put RESEND_API_KEY  ← Resend API key (re_...)
 *   6. (optional) set NOTIFY_TO / NOTIFY_FROM as [vars] in wrangler.toml
 *
 * Resend requires the FROM domain to be verified in your Resend account.
 * Default FROM uses markwarddesign.com — verify that domain in Resend first.
 */

const ALLOWED_ORIGINS = [
  'https://portfolio.markwarddesign.com',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:4173',
];

const jsonResponse = (obj, status, corsHeaders) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const allowedOrigin = ALLOWED_ORIGINS.includes(origin)
      ? origin
      : ALLOWED_ORIGINS[0];

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    // --- Notify beacon → Resend email ---
    if (url.pathname === '/notify') {
      return handleNotify(request, env, corsHeaders);
    }

    // --- Gemini proxy (default) ---
    try {
      const body = await request.text();

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        }
      );

      return new Response(geminiRes.body, {
        status: geminiRes.status,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};

async function handleNotify(request, env, corsHeaders) {
  if (!env.RESEND_API_KEY) {
    return jsonResponse({ ok: false, error: 'RESEND_API_KEY not set' }, 500, corsHeaders);
  }

  const data = await request.json().catch(() => ({}));
  const to = env.NOTIFY_TO || 'mark@markwarddesign.com';
  const from = env.NOTIFY_FROM || 'Portfolio Alerts <notify@markwarddesign.com>';
  const page = data.page || 'unknown page';
  const when = data.time || new Date().toISOString();

  const subject = `👀 Someone just opened your ${page} page`;
  const text = [
    `Your ${page} page was just opened.`,
    '',
    `Time:      ${when}`,
    `Referrer:  ${data.referrer || 'direct'}`,
    `Event:     ${data.event || 'page_open'}`,
    `Device:    ${data.userAgent || 'unknown'}`,
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, text }),
    });

    const detail = await res.text();
    return jsonResponse({ ok: res.ok, detail }, res.ok ? 200 : 502, corsHeaders);
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message }, 500, corsHeaders);
  }
}

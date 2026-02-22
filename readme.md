# mwdzn — Mark Ward's Portfolio

> **Live site:** [portfolio.markwarddesign.com](https://portfolio.markwarddesign.com)

A personal portfolio and case study site built to reflect the same standards I hold production work to — clean component architecture, real CI/CD, and zero placeholder content.

---

## What's inside

This isn't a template. Every page is hand-crafted to tell a specific story:

- **Case studies** — deep-dives into real shipped work (California Closets, CropAide, MILES)
- **Thoughts** — technical posts on architecture decisions and patterns I've actually used
- **AI Assistant** — a Gemini 2.0-powered chat interface that answers questions about my experience, streamed via a Cloudflare Worker to keep the API key server-side

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | React 19 + Vite | Fast builds, modern hooks, no unnecessary abstraction |
| Styling | Tailwind CSS + Typography plugin | Utility-first, consistent design tokens |
| Routing | React Router v7 | Client-side SPA routing with GitHub Pages support |
| AI | Google Gemini 2.0 Flash | Streaming SSE responses, grounded in a custom knowledge base |
| AI Proxy | Cloudflare Workers | Keeps the API key out of the browser, handles CORS |
| Deployment | GitHub Actions → GitHub Pages | Automated on every push to `main` |

---

## Architecture Highlights

### AI Assistant
The portfolio includes a live AI assistant powered by Gemini 2.0 Flash. Rather than exposing a key in client-side code, the frontend posts to a **Cloudflare Worker** which injects the secret and proxies the streaming SSE response back to the browser. The assistant's personality and knowledge base are entirely driven by [`src/assistantConfig.js`](src/assistantConfig.js) — updating what it knows requires zero code changes.

```
Browser → VITE_GEMINI_WORKER_URL (Cloudflare Worker) → Gemini API (streaming SSE)
```

### GitHub Pages SPA Routing
React Router's client-side routing doesn't work out of the box with GitHub Pages. This project uses the standard `404.html` redirect workaround — the 404 page captures the path and passes it through the query string, and the app reads it on mount and calls `navigate()` to restore the correct route.

### Deployment
A `predeploy` script runs `vite build` before `gh-pages` publishes the `dist/` folder. A `CNAME` file in `/public` ensures the custom domain persists across deployments.

---

## Local Development

```bash
# Install dependencies
npm install

# Add your Cloudflare Worker URL (for the AI chat)
echo "VITE_GEMINI_WORKER_URL=https://your-worker.workers.dev" > .env.local

# Start the dev server
npm run dev
```

### Deploying the Cloudflare Worker

```bash
cd worker
npm install -g wrangler
wrangler login
wrangler deploy
wrangler secret put GEMINI_API_KEY
```

Then add the deployed worker URL as `VITE_GEMINI_WORKER_URL` in both `.env.local` and your GitHub repository secrets.

### Build & Deploy

```bash
npm run deploy
```

Runs `vite build` then pushes `dist/` to the `gh-pages` branch via the `gh-pages` package.

---

## Project Structure

```
src/
├── App.jsx              # Main layout, routing, homepage sections
├── assistantConfig.js   # AI assistant knowledge base (edit to update the assistant)
├── components/
│   ├── GeminiChat.jsx   # Streaming AI chat component
│   └── FadeInSection.jsx
└── pages/               # Case study & thought article pages
    ├── CaliforniaClosets.jsx
    ├── CropAide.jsx
    ├── MILES.jsx
    └── ...

worker/
├── gemini-proxy.js      # Cloudflare Worker — Gemini API proxy
└── wrangler.toml
```

---

## Featured Case Studies

| Project | Role | Stack |
|---|---|---|
| [California Closets](https://www.californiaclosets.com) | Technical Architect & Dev Lead | Next.js, React, TypeScript, GraphQL, Algolia |
| [CropAide](https://cropaide.com) | Co-Founder, Lead Architect | Laravel 11, PHP 8.2, MySQL, Cloudflare, Stripe |
| [MILES](https://miles.dealertransparency.com) | Co-Founder, Lead Developer | Laravel, React, Zustand, WebSockets |

---

## Contact

**Mark Ward** — Lead Engineer & Full Stack Architect
📧 [mark@markwarddesign.com](mailto:mark@markwarddesign.com)
💼 [linkedin.com/in/markwarddesign](https://linkedin.com/in/markwarddesign)
🐙 [github.com/markwarddesign](https://github.com/markwarddesign)

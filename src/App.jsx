import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { ArrowUpRight, ArrowLeft, Sparkles, X as XIcon, Send } from 'lucide-react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { buildSystemPrompt } from './assistantConfig';

import DesignSystem from './pages/DesignSystem';
import HeadlessVsMonolithic from './pages/HeadlessVsMonolithic';
import WordPressGutenberg from './pages/WordPressGutenberg';
import CICD from './pages/CICD';
import WPEFaustJS from './pages/WPEFaustJS';
import { CaseStudyPage } from './case-studies.jsx';
import LaravelRBAC from './pages/LaravelRBAC';
import LaravelCloud from './pages/LaravelCloud';
import LaravelReverb from './pages/LaravelReverb';
import ZustandMILES from './pages/ZustandMILES';
import RollupComponents from './pages/RollupComponents';
import GeminiPortfolioAssistant from './pages/GeminiPortfolioAssistant';
import RealtimeChat from './pages/RealtimeChat';
import ApryseWebViewer from './pages/ApryseWebViewer';

/* ---------- smooth scroll ---------- */

const LenisContext = createContext(null);
const useLenis = () => useContext(LenisContext);

const useLenisInit = () => {
  const [lenis, setLenis] = useState(null);
  useEffect(() => {
    const l = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    let raf;
    const tick = (time) => { l.raf(time); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    setLenis(l);
    return () => { cancelAnimationFrame(raf); l.destroy(); };
  }, []);
  return lenis;
};

const scrollToId = (lenis, id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.05 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

/* ---------- reveal ---------- */

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
};

const Reveal = ({ children, as: Tag = 'div', className = '', delay = 0 }) => {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
};

/* ---------- ScrollToTop + GA ---------- */

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== '/') window.scrollTo(0, 0);
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname]);
  return null;
};

/* ---------- nav (logo + section links + email + back arrow on subpages) ---------- */

const NAV = [
  { id: 'work',    label: 'Work' },
  { id: 'writing', label: 'Writing' },
  { id: 'about',   label: 'About' },
];

const Nav = () => {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goto = (e, id) => {
    e.preventDefault();
    if (onHome) {
      scrollToId(lenis, id);
      history.replaceState(null, '', `#${id}`);
    } else {
      navigate('/');
      setTimeout(() => scrollToId(lenis, id), 100);
    }
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled || !onHome ? 'bg-paper/85 backdrop-blur-md border-b border-rule' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 h-14 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {!onHome && (
            <Link
              to="/#work"
              aria-label="Back to work"
              className="inline-flex items-center justify-center w-9 h-9 -ml-1 rounded-full border border-rule text-ink-quiet hover:text-ink hover:border-rule-strong transition-colors"
            >
              <ArrowLeft size={15} />
            </Link>
          )}
          <Link to="/" aria-label="Mark Ward — home" className="group inline-flex items-center">
            <span
              aria-hidden="true"
              className="block h-6 w-[88px] bg-ink group-hover:bg-accent transition-colors"
              style={{
                WebkitMaskImage: 'url(/logo.png)',
                maskImage: 'url(/logo.png)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'left center',
                maskPosition: 'left center',
              }}
            />
          </Link>
        </div>
        <nav className="hidden sm:flex items-center gap-7 text-[14px] text-ink-soft">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => goto(e, n.id)} className="hover:text-ink transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <a href="mailto:mark@markwarddesign.com" className="hidden sm:inline-flex items-center gap-1.5 text-[14px] text-ink hover:text-accent transition-colors">
          Email <ArrowUpRight size={13} />
        </a>
      </div>
    </header>
  );
};

/* ---------- AI assistant — context + drawer ---------- */

const ChatContext = createContext({ openChat: () => {} });
const useChat = () => useContext(ChatContext);

const ChatDrawer = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi — I'm Mark's AI assistant. Ask me anything about his experience, architecture decisions, or tech stack." },
  ]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const SUGGESTED = [
    'What are your strongest skills?',
    'Tell me about MILES',
    'How do you handle multi-tenant auth?',
    'What leadership experience do you have?',
  ];

  const send = async (text) => {
    if (!text.trim() || loading) return;
    setMessages((m) => [...m, { role: 'user', text }, { role: 'model', text: '' }]);
    setInput('');
    setLoading(true);

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'ai_chat_message', {
        event_category: 'AI Assistant',
        message_preview: text.slice(0, 100),
      });
    }

    const workerUrl = import.meta.env.VITE_GEMINI_WORKER_URL;
    if (!workerUrl) {
      setMessages((m) => {
        const u = [...m];
        u[u.length - 1] = { role: 'model', text: "The assistant is offline in this environment (VITE_GEMINI_WORKER_URL not set). Try the deployed site." };
        return u;
      });
      setLoading(false);
      return;
    }

    try {
      const nextHistory = [...history, { role: 'user', parts: [{ text }] }];
      const res = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: nextHistory,
          systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
        }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let replyText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (!payload) continue;
          try {
            const json = JSON.parse(payload);
            const chunk = json?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (chunk) {
              replyText += chunk;
              setMessages((m) => {
                const u = [...m];
                u[u.length - 1] = { role: 'model', text: replyText };
                return u;
              });
            }
          } catch {}
        }
      }
      if (!replyText) replyText = 'No response.';
      setHistory([...nextHistory, { role: 'model', parts: [{ text: replyText }] }]);
    } catch (err) {
      setMessages((m) => {
        const u = [...m];
        u[u.length - 1] = { role: 'model', text: `Something went wrong (${err.message}).` };
        return u;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Chat with Mark's AI assistant"
        aria-modal="true"
        className={`fixed top-0 right-0 z-[61] h-full w-full sm:w-[440px] bg-paper border-l border-rule shadow-xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex items-center justify-between px-5 h-14 border-b border-rule flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <Sparkles size={15} className="text-accent" />
            <span className="font-display font-semibold text-ink text-[15px] tracking-tighter2">AI assistant</span>
            <span className="meta !text-[10px]">Gemini</span>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="inline-flex items-center justify-center w-9 h-9 rounded-full text-ink-quiet hover:text-ink hover:bg-paper-2 transition-colors">
            <XIcon size={16} />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              <span className="meta !text-[10px] mb-1.5">{m.role === 'user' ? 'You' : 'Mark · AI'}</span>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14.5px] leading-[1.55] whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-ink text-paper'
                  : 'bg-surface border border-rule text-ink-soft'
              }`}>
                {m.text || (loading && i === messages.length - 1 ? '…' : '')}
              </div>
            </div>
          ))}
          {messages.length <= 1 && (
            <div className="pt-2 space-y-2">
              <div className="meta">Try asking</div>
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="block w-full text-left text-[14px] text-ink-soft border border-rule rounded-lg px-3 py-2 hover:bg-paper-2 hover:border-rule-strong transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="border-t border-rule p-3 flex items-center gap-2 flex-shrink-0"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Mark's work…"
            disabled={loading}
            className="flex-1 bg-paper-2 border border-rule rounded-full px-4 py-2.5 text-[14.5px] text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-ink text-paper hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={15} />
          </button>
        </form>
      </aside>
    </>
  );
};

/* ---------- hero ---------- */

const Hero = () => {
  const { openChat } = useChat();
  return (
  <section id="top" className="pt-32 lg:pt-40 pb-12 lg:pb-16">
    <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
        <Reveal as="div" className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-7">
            <span className="status-dot" aria-hidden="true" />
            <span className="meta text-ink">Open to Senior / Lead roles — May 2026</span>
          </div>
          <h1 className="font-display font-semibold tracking-tighter3 text-ink text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.98]">
            Mark Ward
          </h1>
          <p className="mt-6 text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.5] text-ink-soft measure">
            I lead engineering at <a href="https://thirdandgrove.com" target="_blank" rel="noreferrer" className="prose-link">Third &amp; Grove</a>,
            and I co-founded three SaaS products (CropAide, MILES, ProjectAire). Fifteen years of
            production work — Laravel, React, Next.js — and a clear sense of what matters and what's just noise.
          </p>
        </Reveal>
        <Reveal as="div" delay={120} className="lg:col-span-4 space-y-4">
          <figure className="tile p-0 overflow-hidden bg-surface">
            <img src="/mark-headshot.jpg" alt="Mark Ward" className="block w-full aspect-square object-cover" />
            <figcaption className="px-5 py-4 flex items-baseline justify-between gap-4 border-t border-rule">
              <span className="meta">Twin Falls, ID · Remote</span>
              <span className="meta">15 yrs</span>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={openChat}
            className="group w-full tile px-5 py-4 flex items-center justify-between gap-3 text-left hover:border-rule-strong transition-colors"
          >
            <span className="flex items-center gap-3">
              <Sparkles size={16} className="text-accent flex-shrink-0" />
              <span>
                <span className="block font-display font-semibold text-ink text-[15px] tracking-tighter2 leading-tight">Ask my AI assistant</span>
                <span className="meta !text-[10px] mt-0.5 block">Gemini · grounded in my work</span>
              </span>
            </span>
            <ArrowUpRight size={15} className="text-ink-quiet group-hover:text-ink tile-arrow flex-shrink-0" />
          </button>
        </Reveal>
      </div>
    </div>
  </section>
  );
};

/* ---------- proof strip ---------- */

const PROOF = [
  { k: '15+',  v: 'years shipping production' },
  { k: '3',    v: 'SaaS products co-founded' },
  { k: '7',    v: 'eng-team headcount, peak' },
  { k: '200+', v: 'Storybook components shipped' },
];

const Proof = () => (
  <section className="pb-16 lg:pb-24">
    <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
      <Reveal>
        <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-rule">
          {PROOF.map((p, i) => (
            <div
              key={p.v}
              className={`py-9 lg:py-10 px-5 lg:px-6 ${i > 0 ? 'lg:border-l border-rule' : ''} ${i % 2 === 1 ? 'border-l border-rule lg:border-l' : ''}`}
            >
              <dt className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(2.25rem,3.6vw,2.875rem)] leading-[1.05]">{p.k}</dt>
              <dd className="mt-3 text-[13px] text-ink-quiet leading-snug">{p.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </section>
);

/* ---------- work — alternating wide rows ---------- */

const WORK = [
  {
    id: 'cc',
    name: 'California Closets',
    mark: 'CC',
    role: 'Technical lead · Third & Grove',
    date: 'Launched Sept 2025',
    metric: { k: '200+', v: 'Storybook components' },
    live: 'https://www.californiaclosets.com',
    study: '/case-studies/california-closets',
    body: 'Led a team of up to seven engineers through a headless rebuild on Next.js with a Storybook-anchored design system, multilingual support (EN + ES), WCAG-compliant components, and CI/CD with branch previews on every PR. Shipped on schedule, dealer locator intact.',
    tags: ['Next.js', 'TypeScript', 'GraphQL', 'Algolia', 'Storybook', 'WordPress', 'Salesforce'],
  },
  {
    id: 'miles',
    name: 'MILES',
    mark: 'M',
    role: 'Co-founder & lead architect · Dealer Transparency',
    date: 'Live · 5 dealerships',
    metric: { k: '99.9%', v: 'production uptime' },
    live: 'https://miles.dealertransparency.com',
    study: '/case-studies/miles',
    body: 'A real-time offer engine for automotive dealers, replacing the process of phoning a manager to confirm a number. WebSocket sync on Laravel Reverb, penny-accurate financial calculations using the Strategy pattern, third-party API integrations that keep inventory honest.',
    tags: ['Laravel 12', 'React 18', 'TypeScript', 'Reverb', 'Zustand', 'MySQL'],
  },
  {
    id: 'cropaide',
    name: 'CropAide',
    mark: 'CA',
    role: 'Co-founder · solo build',
    date: 'Public beta',
    metric: { k: '3', v: 'tenant role hierarchies' },
    live: 'https://cropaide.com',
    study: '/case-studies/cropaide',
    body: 'A multi-tenant agricultural platform where growers, advisors, and dealers share data through a row-level authorization model I built from scratch when none of the off-the-shelf options modeled the hierarchy correctly. Schema, billing, infrastructure — solo, over evenings and weekends.',
    tags: ['Laravel 11', 'PHP 8.2', 'MySQL', 'Cloudflare R2', 'Stripe'],
  },
  {
    id: 'aire',
    name: 'ProjectAire',
    mark: 'PA',
    role: 'Co-founder & lead engineer',
    date: 'Live',
    metric: { k: 'XFDF', v: 'multi-user annotation sync' },
    live: 'https://projectaire.app',
    study: '/case-studies/projectaire',
    body: 'Construction project management SaaS. The hard part was an Apryse WebViewer integration with multi-user PDF annotation sync over Reverb — three weeks of XFDF wrangling. Pricing tiers gated through middleware; metrics pre-aggregated on write because the dashboard is the product.',
    tags: ['Laravel', 'React', 'Apryse', 'MySQL', 'Stripe'],
  },
];

const WorkRow = ({ p, i }) => {
  const reverse = i % 2 === 1;
  return (
    <Reveal as="article" className="py-10 lg:py-14 border-t border-rule first:border-t-0">
      <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <Link
          to={p.study}
          className="lg:col-span-5 group block tile p-0 overflow-hidden no-underline focus-visible:outline-accent"
          aria-label={`${p.name} — read the case study`}
        >
          <div className="cover h-full min-h-[260px] lg:min-h-[320px]">
            <div className="relative z-10">
              <div className="meta mb-3">Case study</div>
              <div className="cover-title">{p.name}</div>
            </div>
            <span className="cover-mark" aria-hidden="true">{p.mark}</span>
            <span className="absolute top-5 right-5 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-paper border border-rule text-ink-quiet group-hover:text-ink group-hover:border-rule-strong transition-colors">
              <ArrowUpRight size={16} className="tile-arrow" />
            </span>
          </div>
        </Link>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
            <span className="meta">{p.role}</span>
            <span className="meta text-ink-faint">· {p.date}</span>
          </div>
          <h3 className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.02] mb-5">
            {p.name}
          </h3>
          <p className="text-[16.5px] leading-[1.65] text-ink-soft measure mb-6">{p.body}</p>

          <div className="grid sm:grid-cols-[auto,1fr] gap-x-8 gap-y-4 pt-5 border-t border-rule mb-6">
            <div>
              <div className="meta mb-1.5">Highlight</div>
              <div className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(1.5rem,2vw,1.875rem)] leading-none whitespace-nowrap">
                {p.metric.k}
              </div>
              <div className="text-[13px] text-ink-quiet mt-1">{p.metric.v}</div>
            </div>
            <div>
              <div className="meta mb-2">Stack</div>
              <ul className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <li key={t} className="meta px-2 py-1 border border-rule rounded-md bg-paper-2 !text-[10px] !tracking-[0.06em]">{t}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
            <Link
              to={p.study}
              className="inline-flex items-center gap-1.5 text-ink font-medium hover:text-accent transition-colors group/cta"
            >
              Read the case study
              <ArrowUpRight size={14} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-ink-quiet hover:text-ink transition-colors group/cta"
            >
              Live site
              <ArrowUpRight size={13} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

const Work = () => (
  <section id="work" className="pb-16 lg:pb-28 scroll-mt-20">
    <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
      <Reveal as="header" className="flex items-end justify-between gap-8 mb-8 lg:mb-12">
        <div>
          <div className="meta mb-2">Section 01 — Work</div>
          <h2 className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(2rem,3.6vw,3rem)] leading-[1.02]">
            Four shipped products
          </h2>
        </div>
        <p className="hidden md:block text-[14px] text-ink-quiet measure-tight">
          A small sample. Click any cover to read the case study.
        </p>
      </Reveal>
      <div>
        {WORK.map((p, i) => <WorkRow key={p.id} p={p} i={i} />)}
      </div>
    </div>
  </section>
);

/* ---------- writing — real titles from /thoughts/ routes ---------- */

const POSTS = [
  { cat: 'Real-time',    title: 'Killing the Refresh Button: Real-Time Dealership Ops with Laravel Reverb', excerpt: 'Private channels, presence, mentions, and a single useChat hook. The WebSocket layer that makes MILES feel like Google Docs for deal desks.', href: '/thoughts/laravel-reverb' },
  { cat: 'Real-time',    title: 'Putting Apryse WebViewer in Front of Construction Drawings',              excerpt: 'Multi-user PDF annotation over Reverb broadcasting, XFDF on the wire, three weeks of license-key plumbing and read-only mode gotchas.', href: '/thoughts/apryse-webviewer' },
  { cat: 'Real-time',    title: 'Building Realtime Chat into a Laravel + React App',                      excerpt: 'Channels, broadcasts, presence, and the reconnect path that always gets you bitten if you don\'t plan for it.', href: '/thoughts/realtime-chat-laravel' },
  { cat: 'Architecture', title: 'Headless vs. Monolithic: Choosing the Right Tool for the Job',           excerpt: 'Where the headless-WordPress argument actually pays off, and where it costs you more than it saves. A field-tested take from production rebuilds.', href: '/thoughts/headless-vs-monolithic' },
  { cat: 'Architecture', title: 'Escaping RBAC Hell: Multi-Tenant Hierarchies in Laravel',                 excerpt: 'Policy-based authorization across Grower / Advisor / Dealer roles in CropAide — what off-the-shelf packages miss, and how I modeled it from scratch.', href: '/thoughts/laravel-rbac' },
  { cat: 'Architecture', title: 'One Package, Two Runtimes: React Components Between Next.js and Gutenberg', excerpt: 'How we bundled a shared React component library with Rollup so the live Next.js site and the WordPress CMS editor render the same blocks.', href: '/thoughts/rollup-gutenberg-components' },
  { cat: 'Architecture', title: 'Headless WordPress at Scale with WP Engine, Faust.js, and Atlas',         excerpt: 'When WPE\'s managed headless stack is worth it, when it isn\'t, and what the Atlas deployment story actually looks like in production.', href: '/thoughts/wpe-faustjs-atlas' },
  { cat: 'Frontend',     title: 'Why We Chose Zustand Over Redux for a Real-Time Automotive SaaS',         excerpt: 'Predictable state flow, surgical re-renders, real-time without complexity. Why MILES uses Zustand instead of Redux or React Query.', href: '/thoughts/zustand-miles' },
  { cat: 'Frontend',     title: 'Mastering the Block: Modern WordPress with Gutenberg',                   excerpt: 'How Gutenberg actually works under the hood, and how to build custom blocks editors will use without complaining.', href: '/thoughts/wordpress-gutenberg' },
  { cat: 'Infra',        title: 'Why I Chose Laravel Cloud Over AWS for a Production SaaS',               excerpt: 'Laravel Cloud vs. rolling your own AWS stack — total cost of ownership, ops budget, and the tradeoffs that matter at small team scale.', href: '/thoughts/laravel-cloud' },
  { cat: 'Infra',        title: 'The Power of the Pipeline: CI/CD for Modern Web Development',            excerpt: 'GitHub Actions, branch previews, automated tests, and the build pipeline that lets a team of seven engineers ship without stepping on each other.', href: '/thoughts/ci-cd' },
  { cat: 'Practice',     title: 'The Unseen Value of a Design System',                                    excerpt: 'A design system is not the icon library. It\'s the contract between designers and engineers that lets a team ship a hundred pages without arguing about button padding.', href: '/thoughts/design-system' },
  { cat: 'AI',           title: 'Building a Secure AI Assistant Into a Static Portfolio Site',            excerpt: 'How the Gemini-powered chat on this portfolio works — Cloudflare Workers as the API key broker, SSE streaming back to the browser, knowledge base in code.', href: '/thoughts/gemini-portfolio-assistant' },
];

const PostCard = ({ p }) => (
  <Reveal as="article" className="tile group">
    <Link to={p.href} className="tile-link p-6 lg:p-7 flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <span className="meta">{p.cat}</span>
        <ArrowUpRight size={16} className="tile-arrow text-ink-faint group-hover:text-ink" />
      </div>
      <h3 className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(1.15rem,1.5vw,1.4rem)] leading-[1.2] mb-3">
        {p.title}
      </h3>
      <p className="text-[14.5px] leading-[1.6] text-ink-soft">{p.excerpt}</p>
    </Link>
  </Reveal>
);

const Writing = () => (
  <section id="writing" className="pb-16 lg:pb-28 scroll-mt-20">
    <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
      <Reveal as="header" className="flex items-end justify-between gap-8 mb-8 lg:mb-10">
        <div>
          <div className="meta mb-2">Section 02 — Writing</div>
          <h2 className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(2rem,3.6vw,3rem)] leading-[1.02]">
            Notes from production
          </h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {POSTS.map((p) => <PostCard key={p.title} p={p} />)}
      </div>
    </div>
  </section>
);

/* ---------- about ---------- */

const About = () => (
  <section id="about" className="pb-16 lg:pb-28 scroll-mt-20">
    <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
      <Reveal as="header" className="mb-8 lg:mb-10">
        <div className="meta mb-2">Section 03 — About</div>
        <h2 className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(2rem,3.6vw,3rem)] leading-[1.02]">
          A bit more, if you're curious
        </h2>
      </Reveal>
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
        <Reveal as="div" className="lg:col-span-8 space-y-5 text-[16.5px] leading-[1.7] text-ink-soft measure">
          <p>
            I think architecture is, mostly, a writing problem. The schema, the API contracts,
            and the deployment topology should be legible to anyone who can read English. If a
            decision can't be written down, it hasn't been made yet — and that's where most
            projects quietly start to go sideways.
          </p>
          <p>
            In fifteen years I haven't missed a committed launch date. Not because I'm a hero,
            but because I've learned to refuse the version of a project that would force me to.
            Scope, quality, and the date — you get two, and the third one calls the others' bluff.
            I'm comfortable saying "not this sprint" out loud and in writing.
          </p>
          <p>
            Outside of work I'm a dad to three daughters, a high school basketball coach, and
            recently a fly fisherman — which, like debugging a gnarly race condition, mostly
            consists of standing in a river thinking.
          </p>
        </Reveal>
        <Reveal as="aside" delay={100} className="lg:col-span-4">
          <div className="tile p-6 lg:p-7">
            <div className="meta mb-4">Currently</div>
            <ul className="space-y-3 text-[14.5px] text-ink-soft">
              <li className="flex items-baseline gap-3">
                <span className="meta !text-[10px] w-16 flex-shrink-0">Role</span>
                <span>Lead Developer · Third &amp; Grove</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="meta !text-[10px] w-16 flex-shrink-0">Stack</span>
                <span>Laravel · React · Next.js · TypeScript</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="meta !text-[10px] w-16 flex-shrink-0">Building</span>
                <span>MILES · CropAide · ProjectAire</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="meta !text-[10px] w-16 flex-shrink-0">Location</span>
                <span>Twin Falls, Idaho — remote-first</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="meta !text-[10px] w-16 flex-shrink-0">Open to</span>
                <span className="inline-flex items-center gap-2"><span className="status-dot" />Senior / Lead roles</span>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------- hire ---------- */

const Hire = () => (
  <section className="border-t border-rule">
    <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <Reveal as="div" className="measure">
        <div className="meta mb-6">Hiring?</div>
        <p className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.1]">
          If you're hiring for a senior or lead engineering role at a product company that takes
          its craft seriously, write me at{' '}
          <a href="mailto:mark@markwarddesign.com?subject=Hiring%20%E2%80%94%20Mark%20Ward" className="text-accent underline decoration-accent/40 underline-offset-[6px] hover:decoration-accent transition-all">
            mark@markwarddesign.com
          </a>.
        </p>
        <p className="mt-7 text-[15px] leading-relaxed text-ink-quiet">
          I read every email. I reply within one business day. No contact form.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------- footer ---------- */

const Footer = () => (
  <footer className="border-t border-rule bg-paper-2">
    <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-10 lg:py-12 flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
      <div className="text-[13.5px] text-ink-quiet">
        © {new Date().getFullYear()} Mark Ward. Hand-built. Set in Fraunces &amp; Inter Tight.
      </div>
      <div className="flex items-center gap-5">
        <a href="https://github.com/markwarddesign"      aria-label="GitHub"   className="text-ink-quiet hover:text-ink transition-colors"><FiGithub size={17} /></a>
        <a href="https://linkedin.com/in/markwarddesign" aria-label="LinkedIn" className="text-ink-quiet hover:text-ink transition-colors"><FiLinkedin size={17} /></a>
        <a href="mailto:mark@markwarddesign.com"         aria-label="Email"    className="text-ink-quiet hover:text-ink transition-colors"><FiMail size={17} /></a>
      </div>
    </div>
  </footer>
);

/* ---------- home ---------- */

const Home = () => {
  const lenis = useLenis();
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const t = setTimeout(() => scrollToId(lenis, id), 100);
    return () => clearTimeout(t);
  }, [location.hash, lenis]);

  return (
    <>
      <Hero />
      <Proof />
      <Work />
      <Writing />
      <About />
      <Hire />
    </>
  );
};

/* ---------- app shell + routes ---------- */

const AppContent = () => {
  const navigate = useNavigate();
  // GitHub Pages SPA redirect workaround
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect) navigate('/' + redirect, { replace: true });
  }, [navigate]);

  const lenis = useLenisInit();
  const [chatOpen, setChatOpen] = useState(false);
  const openChat = () => {
    setChatOpen(true);
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'ai_chat_open', { event_category: 'AI Assistant' });
    }
  };

  return (
    <LenisContext.Provider value={lenis}>
      <ChatContext.Provider value={{ openChat }}>
      <div className="bg-paper text-ink min-h-screen">
        <Nav />
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thoughts/design-system" element={<DesignSystem />} />
            <Route path="/thoughts/headless-vs-monolithic" element={<HeadlessVsMonolithic />} />
            <Route path="/thoughts/wordpress-gutenberg" element={<WordPressGutenberg />} />
            <Route path="/thoughts/ci-cd" element={<CICD />} />
            <Route path="/thoughts/wpe-faustjs-atlas" element={<WPEFaustJS />} />
            <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
            <Route path="/thoughts/laravel-rbac" element={<LaravelRBAC />} />
            <Route path="/thoughts/laravel-cloud" element={<LaravelCloud />} />
            <Route path="/thoughts/laravel-reverb" element={<LaravelReverb />} />
            <Route path="/thoughts/zustand-miles" element={<ZustandMILES />} />
            <Route path="/thoughts/rollup-gutenberg-components" element={<RollupComponents />} />
            <Route path="/thoughts/gemini-portfolio-assistant" element={<GeminiPortfolioAssistant />} />
            <Route path="/thoughts/realtime-chat-laravel" element={<RealtimeChat />} />
            <Route path="/thoughts/apryse-webviewer" element={<ApryseWebViewer />} />
          </Routes>
        </main>
        <Footer />
        <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
      </ChatContext.Provider>
    </LenisContext.Provider>
  );
};

const App = () => <AppContent />;

export default App;

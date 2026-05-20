import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

import DesignSystem from './pages/DesignSystem';
import HeadlessVsMonolithic from './pages/HeadlessVsMonolithic';
import WordPressGutenberg from './pages/WordPressGutenberg';
import CICD from './pages/CICD';
import WPEFaustJS from './pages/WPEFaustJS';
import CropAide from './pages/CropAide';
import MILES from './pages/MILES';
import LaravelRBAC from './pages/LaravelRBAC';
import LaravelCloud from './pages/LaravelCloud';
import LaravelReverb from './pages/LaravelReverb';
import ZustandMILES from './pages/ZustandMILES';
import CaliforniaClosets from './pages/CaliforniaClosets';
import RollupComponents from './pages/RollupComponents';
import GeminiPortfolioAssistant from './pages/GeminiPortfolioAssistant';
import ProjectAire from './pages/ProjectAire';
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
          <Link to="/" aria-label="Mark Ward — home" className="font-display font-semibold tracking-tighter2 text-[18px] text-ink hover:text-accent transition-colors">
            Mark Ward
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

/* ---------- hero ---------- */

const Hero = () => (
  <section id="top" className="pt-32 lg:pt-40 pb-12 lg:pb-16">
    <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
        <Reveal as="div" className="lg:col-span-9">
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
        <Reveal as="div" delay={120} className="lg:col-span-3">
          <div className="tile p-6 lg:p-7 h-full">
            <div className="meta mb-3">Currently</div>
            <div className="text-[14.5px] text-ink-soft leading-snug">
              Lead Developer at <span className="text-ink font-medium">Third &amp; Grove</span>. Co-founder of <span className="text-ink font-medium">CropAide</span>, <span className="text-ink font-medium">MILES</span>, and <span className="text-ink font-medium">ProjectAire</span>.
            </div>
            <div className="mt-5 flex items-center gap-2">
              <span className="meta">Twin Falls, ID · Remote</span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------- proof strip ---------- */

const PROOF = [
  { k: '15+', v: 'years shipping production' },
  { k: '3',   v: 'SaaS products co-founded' },
  { k: '7',   v: 'eng-team headcount, peak' },
  { k: '0',   v: 'committed launch dates missed' },
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
  { cat: 'Real-time',    title: 'Real-time chat with Laravel Reverb',                    excerpt: 'Private channels, presence, mentions, and a single useChat hook. About 1,200 lines of PHP and 1,800 of JSX, two weeks to first usable.', href: '/thoughts/laravel-reverb' },
  { cat: 'Real-time',    title: 'Putting Apryse WebViewer in front of construction drawings', excerpt: 'Multi-user PDF annotation over Reverb broadcasting, XFDF on the wire, three weeks of license-key plumbing and read-only mode gotchas.', href: '/thoughts/apryse-webviewer' },
  { cat: 'Architecture', title: 'Headless vs. monolithic: choosing the right tool',      excerpt: 'Where the headless-WordPress argument actually pays off, and where it costs you more than it saves. A field-tested take from production rebuilds.', href: '/thoughts/headless-vs-monolithic' },
  { cat: 'Architecture', title: 'Row-level authorization for multi-tenant SaaS',          excerpt: 'Policy-based authorization across Grower / Advisor / Dealer roles in CropAide — what off-the-shelf packages miss, and how I modeled it from scratch.', href: '/thoughts/laravel-rbac' },
  { cat: 'Frontend',     title: 'Why Zustand for a real-time dashboard',                 excerpt: 'Predictable state flow, surgical re-renders, real-time without complexity. Why MILES uses Zustand instead of Redux or React Query.', href: '/thoughts/zustand-miles' },
  { cat: 'Practice',     title: 'The unseen value of a design system',                   excerpt: 'A design system is not the icon library. It is the contract between designers and engineers that lets a team ship a hundred pages without arguing about button padding.', href: '/thoughts/design-system' },
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

  return (
    <LenisContext.Provider value={lenis}>
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
            <Route path="/case-studies/cropaide" element={<CropAide />} />
            <Route path="/case-studies/miles" element={<MILES />} />
            <Route path="/thoughts/laravel-rbac" element={<LaravelRBAC />} />
            <Route path="/thoughts/laravel-cloud" element={<LaravelCloud />} />
            <Route path="/thoughts/laravel-reverb" element={<LaravelReverb />} />
            <Route path="/thoughts/zustand-miles" element={<ZustandMILES />} />
            <Route path="/case-studies/california-closets" element={<CaliforniaClosets />} />
            <Route path="/case-studies/projectaire" element={<ProjectAire />} />
            <Route path="/thoughts/rollup-gutenberg-components" element={<RollupComponents />} />
            <Route path="/thoughts/gemini-portfolio-assistant" element={<GeminiPortfolioAssistant />} />
            <Route path="/thoughts/realtime-chat-laravel" element={<RealtimeChat />} />
            <Route path="/thoughts/apryse-webviewer" element={<ApryseWebViewer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LenisContext.Provider>
  );
};

const App = () => <AppContent />;

export default App;

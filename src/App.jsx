import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail, FiArrowRight, FiArrowLeft, FiLayers, FiCheckCircle, FiGlobe, FiShield, FiZap, FiCloud, FiActivity, FiRefreshCw, FiAward, FiLock } from 'react-icons/fi';
import { FaUsers, FaMicrochip, FaChartBar, FaBolt, FaCodeBranch, FaFileAlt, FaCode, FaServer, FaTools, FaReact } from 'react-icons/fa';
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
import FadeInSection from './components/FadeInSection';
import GeminiChat from './components/GeminiChat';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Skills', href: '#skills' },
  { name: 'Thoughts', href: '#thoughts' },
  { name: 'Contact', href: '#contact' },
];

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top when navigating INTO a sub-page, not when returning home
    if (pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

const App = () => (
  <AppContent />
);

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle GitHub Pages redirect workaround
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      navigate('/' + redirect, { replace: true });
    }
  }, [navigate]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetId = href.substring(1);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#181c24] text-white font-sans leading-normal tracking-tight">
      <Header handleNavClick={handleNavClick} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

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
          <Route path="/thoughts/rollup-gutenberg-components" element={<RollupComponents />} />
          <Route path="/thoughts/gemini-portfolio-assistant" element={<GeminiPortfolioAssistant />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

const Header = ({ handleNavClick, isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSubPage = location.pathname !== '/';

  // Sliding bar state
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });
  const navRef = React.useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollingToIdx, setScrollingToIdx] = useState(null);

  // Set bar to active or hovered item
  const moveBar = (idx) => {
    if (!navRef.current) return;
    const navLinks = navRef.current.querySelectorAll('a');
    const el = navLinks[idx];
    if (el) {
      const span = el.querySelector('span');
      if (span) {
        const margin = 8;
        setBarStyle({
          left: span.offsetLeft + el.offsetLeft + (span.offsetWidth - (span.offsetWidth - margin)) / 2,
          width: Math.max(0, span.offsetWidth - margin)
        });
      } else {
        setBarStyle({
          left: el.offsetLeft + (el.offsetWidth - (el.offsetWidth - 16)) / 2,
          width: Math.max(0, el.offsetWidth - 32)
        });
      }
    }
  };

  // On mount, set bar to first item
  useEffect(() => {
    moveBar(scrollingToIdx !== null ? scrollingToIdx : activeIdx);
  }, [activeIdx, scrollingToIdx]);

  // Intersection Observer for scroll-based active nav
  useEffect(() => {
    let ignoreObserver = false;
    const sectionIds = navLinks.map(link => link.href.replace('#', ''));
    const sections = sectionIds.map(id => document.getElementById(id));
    if (sections.some(s => !s)) return;

    const handleIntersect = (entries) => {
      if (ignoreObserver) return;
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length > 0) {
        const idx = sections.findIndex(s => s === visible[0].target);
        if (idx !== -1) setActiveIdx(idx);
      }
    };
    const observer = new window.IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0,
    });
    sections.forEach(section => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  // Listen for scroll end to re-enable observer
  useEffect(() => {
    if (scrollingToIdx === null) return;
    let timeout;
    let lastScrollY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (Math.abs(window.scrollY - lastScrollY) < 2) {
            setScrollingToIdx(null);
            window.removeEventListener('scroll', onScroll);
          } else {
            lastScrollY = window.scrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll);
    // Fallback in case scroll event doesn't fire
    timeout = setTimeout(() => {
      setScrollingToIdx(null);
      window.removeEventListener('scroll', onScroll);
    }, 1200);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', onScroll);
    };
  }, [scrollingToIdx]);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-[#181c24] border-b border-[#23283a] shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 relative">
        <Link to="/" aria-label="Mark Ward – Home" className="flex items-center space-x-3 group">
          <img
            src="https://markwarddesign.com/wp-content/uploads/2018/04/Artboard-4@2x-1.png"
            alt=""
            aria-hidden="true"
            className="h-10 w-auto group-hover:scale-105 transition-transform filter invert brightness-0 saturate-0"
          />
        </Link>
        {isSubPage ? (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-300 hover:text-blue-400 font-medium transition-colors duration-200"
          >
            <FiArrowLeft size={16} aria-hidden="true" />
            <span>Back</span>
          </button>
        ) : (
          <>
            <nav ref={navRef} className="hidden md:flex items-center space-x-2 relative" style={{minHeight:44}}>
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setScrollingToIdx(idx);
                    moveBar(idx);
                  }}
                  onMouseEnter={() => moveBar(idx)}
                  onMouseLeave={() => moveBar(scrollingToIdx !== null ? scrollingToIdx : activeIdx)}
                  className={`relative px-4 py-2 font-medium transition-colors duration-200 focus:outline-none cursor-pointer ${(scrollingToIdx !== null ? scrollingToIdx : activeIdx) === idx ? 'text-blue-400' : 'text-blue-100 hover:text-blue-400'}`}
                  style={{zIndex:2}}
                >
                  {link.name}
                </a>
              ))}
              {/* Sliding bar */}
              <span
                className="absolute bottom-0 h-1 bg-blue-500 rounded-full transition-all duration-300"
                style={{ left: barStyle.left, width: barStyle.width, zIndex: 1 }}
              />
            </nav>
            <button
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="md:hidden text-blue-100 bg-[#23283a] border border-[#23283a] rounded-full p-2 shadow focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={28} aria-hidden="true" /> : <FiMenu size={28} aria-hidden="true" />}
            </button>
          </>
        )}
      </div>
      {!isSubPage && isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-[#181c24] z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                handleNavClick(e, link.href);
                setIsMenuOpen(false);
              }}
              className="text-blue-100 text-2xl font-bold px-8 py-3 rounded-full border border-[#23283a] shadow hover:bg-[#23283a] transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

const Home = () => (
  <>
    <HeroSection />
    <FadeInSection id="about" alternate={false}>
      <AboutSection />
    </FadeInSection>
    <FadeInSection id="case-studies" alternate={true}>
      <CaseStudiesSection />
    </FadeInSection>
    <FadeInSection id="skills" alternate={true}>
      <SkillsSection />
    </FadeInSection>
    <FadeInSection id="thoughts" alternate={false}>
      <ThoughtsSection />
    </FadeInSection>
    <FadeInSection id="contact" alternate={true}>
      <ContactSection />
    </FadeInSection>
  </>
);

const HeroSection = () => (
  <section id="home" className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 md:px-0 bg-[#181c24] overflow-hidden">

    {/* Grid background */}
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: `linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)`,
      backgroundSize: '48px 48px',
    }} />

    {/* Radial vignette to fade grid at edges */}
    <div className="absolute inset-0 pointer-events-none" style={{
      background: 'radial-gradient(ellipse at center, transparent 30%, #181c24 100%)',
    }} />

    {/* Glowing orb — top left */}
    <div className="absolute pointer-events-none" style={{
      width: 520, height: 520,
      top: '-100px', left: '-140px',
      background: 'radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(2px)',
    }} />

    {/* Glowing orb — bottom right */}
    <div className="absolute pointer-events-none" style={{
      width: 480, height: 480,
      bottom: '-80px', right: '-120px',
      background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(2px)',
    }} />

    {/* Floating code badge — left */}
    <div className="hidden lg:flex absolute left-16 top-1/3 items-center gap-2 bg-[#1e2230]/80 border border-blue-900/60 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg pointer-events-none select-none" style={{transform:'rotate(-3deg)'}}>
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <code className="text-xs text-blue-300 font-mono">git push origin main</code>
    </div>

    {/* Floating code badge — right */}
    <div className="hidden lg:flex absolute right-16 top-2/5 items-center gap-2 bg-[#1e2230]/80 border border-blue-900/60 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg pointer-events-none select-none" style={{transform:'rotate(2deg)'}}>
      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{animationDelay:'500ms'}} />
      <code className="text-xs text-blue-300 font-mono">✓ Deploy successful</code>
    </div>

    {/* Floating stack pill — bottom left */}
    <div className="hidden lg:flex absolute left-24 bottom-36 items-center gap-2 bg-[#1e2230]/80 border border-blue-900/60 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg pointer-events-none select-none" style={{transform:'rotate(2deg)'}}>
      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{animationDelay:'1000ms'}} />
      <code className="text-xs text-blue-300 font-mono">Laravel · React · Next.js</code>
    </div>

    {/* Content */}
    <div className="relative pt-28 z-10">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight drop-shadow-lg">
        Digital Architect &amp; Lead Engineer
      </h1>
      <h2 className="text-xl md:text-2xl font-medium mb-8 text-blue-100 max-w-3xl mx-auto drop-shadow">
        I build high-performance, scalable web solutions that drive business growth and deliver exceptional user experiences.
      </h2>
      <a href="#case-studies" className="inline-flex items-center px-8 py-3 rounded-full text-white font-bold shadow-lg bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 transition-all hover:opacity-90">
        <span>View My Work</span>
        <FiArrowRight size={22} className="ml-3" aria-hidden="true" />
      </a>
    </div>
  </section>
);

const AboutSection = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

      {/* Left: Bio */}
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-5 mb-6">
          <img
            src="https://avatars.githubusercontent.com/u/2242875?v=4"
            alt="Mark Ward"
            className="rounded-full w-20 h-20 object-cover border-2 border-blue-800/60 shadow-lg flex-shrink-0"
          />
          <div>
            <h2 className="text-3xl font-bold text-blue-50 leading-tight">Mark Ward</h2>
            <p className="text-blue-400 text-sm font-medium mt-1">Lead Engineer &nbsp;·&nbsp; Twin Falls, Idaho</p>
          </div>
        </div>

        <p className="text-blue-100 leading-relaxed mb-4">
          I build things that last — and lead teams that do too. As Lead Developer at <strong className="text-white">Third &amp; Grove</strong>, I've shipped production systems for national brands, and co-founded two SaaS products — <strong className="text-white">CropAide</strong> and <strong className="text-white">MILES</strong> — taking both from concept to production.
        </p>
        <p className="text-blue-100 leading-relaxed mb-7">
          I care about architecture, clean documentation, developer experience, and never missing a launch date. Fifteen-plus years of production work has given me a pretty clear sense of what matters and what's just noise.
        </p>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-7">
          {[
            { stat: '15+', label: 'Years shipping' },
            { stat: '100%', label: 'Remote career' },
            { stat: '3', label: 'SaaS products led' },
          ].map(({ stat, label }) => (
            <div key={label} className="bg-[#1e2230] border border-blue-900/40 rounded-xl p-3 text-center">
              <p className="text-xl font-extrabold text-white">{stat}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2">
          {['Laravel', 'React', 'Next.js', 'TypeScript', 'Team Lead', 'CI/CD', 'Multi-tenant SaaS'].map(tag => (
            <span key={tag} className="text-xs bg-[#1e2230] border border-blue-900/40 text-blue-300 rounded-full px-3 py-1">{tag}</span>
          ))}
        </div>
      </div>

      {/* Right: AI Chat */}
      <div className="flex flex-col">
        <div className="mb-5">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-yellow-400 bg-yellow-900/20 px-3 py-1 rounded-full mb-3">AI-Powered</span>
          <h3 className="text-2xl font-bold text-blue-50 mb-2">Ask Me Anything</h3>
          <p className="text-blue-300 text-sm">My Gemini-powered assistant knows my work, stack, and background. Go ahead — give it a spin.</p>
        </div>
        <GeminiChat />
      </div>

    </div>
  </div>
);

const CaseStudiesSection = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold text-blue-50 text-center mb-12">Case Studies</h2>
    <div className="space-y-10">

      {/* California Closets */}
      <div className="bg-[#1e2230] rounded-xl shadow-lg overflow-hidden p-8 md:p-12 border border-blue-900">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">Enterprise</span>
              <span className="text-xs text-gray-500">Shipped Sept 2025</span>
            </div>
            <h3 className="text-3xl font-bold text-blue-100 mb-2">California Closets</h3>
            <h4 className="text-xl font-semibold text-blue-50 mb-4">Architecting a Headless Future for a Leading National Brand</h4>
            <p className="text-blue-100 mb-6">At Third &amp; Grove, I led a team of up to 7 engineers in the complete headless rebuild of the California Closets web presence, working within an Agile environment to enhance performance, accessibility, and marketing agility.</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3"><FaUsers className="text-blue-400 mt-1 flex-shrink-0" size={18} /><div><strong className="text-white">My Role:</strong> Technical Architect &amp; Dev Lead</div></div>
              <div className="flex items-start space-x-3"><FaMicrochip className="text-blue-400 mt-1 flex-shrink-0" size={18} /><div><strong className="text-white">Key Tech:</strong> Next.js, React, GraphQL, Algolia, Salesforce</div></div>
              <div className="flex items-start space-x-3"><FaChartBar className="text-blue-400 mt-1 flex-shrink-0" size={18} /><div><strong className="text-white">Impact:</strong> Established CI/CD workflows, improved site speed, and ensured ADA compliance.</div></div>
              <div className="flex items-start space-x-3"><FaBolt className="text-blue-400 mt-1 flex-shrink-0" size={18} /><div><strong className="text-white">Outcome:</strong> Successfully launched September 2025. Ongoing optimization for Core Web Vitals.</div></div>
            </div>
            <div>
              <a href="https://www.californiaclosets.com" target="_blank" rel="noopener noreferrer" className="inline-block font-semibold text-blue-400 hover:text-blue-300 transition-colors mr-4">Visit Live Site &rarr;</a>
              <Link to="/case-studies/california-closets" className="inline-block font-semibold text-blue-400 hover:text-blue-300 transition-colors">Read Case Study &rarr;</Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#23283a] to-[#1a1f2e] border border-blue-800/40 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-500/70 mb-4">At a Glance</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-[#181c24] border-t-2 border-blue-500 rounded-xl p-4 text-center">
                <FaUsers className="mx-auto text-blue-400 mb-1.5" size={15} />
                <p className="text-2xl font-extrabold text-white">7</p>
                <p className="text-xs text-gray-400 mt-1">Engineers led</p>
              </div>
              <div className="bg-[#181c24] border-t-2 border-blue-500 rounded-xl p-4 text-center">
                <FiLayers className="mx-auto text-blue-400 mb-1.5" size={15} />
                <p className="text-2xl font-extrabold text-white">200+</p>
                <p className="text-xs text-gray-400 mt-1">Components</p>
              </div>
              <div className="bg-[#181c24] border-t-2 border-blue-500 rounded-xl p-4 text-center">
                <FiCheckCircle className="mx-auto text-blue-400 mb-1.5" size={15} />
                <p className="text-2xl font-extrabold text-white">ADA</p>
                <p className="text-xs text-gray-400 mt-1">WCAG compliant</p>
              </div>
              <div className="bg-[#181c24] border-t-2 border-blue-500 rounded-xl p-4 text-center">
                <FiGlobe className="mx-auto text-blue-400 mb-1.5" size={15} />
                <p className="text-2xl font-extrabold text-white">i18n</p>
                <p className="text-xs text-gray-400 mt-1">Multi-locale</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Next.js', 'React', 'TypeScript', 'GraphQL', 'Algolia', 'Salesforce', 'Storybook'].map(t => (
                <span key={t} className="text-xs bg-[#181c24] text-blue-300 border border-blue-800/50 rounded-full px-2.5 py-1">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CropAide */}
      <div className="bg-[#1e2230] rounded-xl shadow-lg overflow-hidden p-8 md:p-12 border border-blue-900">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-green-400 bg-green-900/20 px-3 py-1 rounded-full">SaaS · Co-Founder</span>
              <span className="text-xs text-gray-500">Public Beta</span>
            </div>
            <h3 className="text-3xl font-bold text-blue-100 mb-2">CropAide</h3>
            <h4 className="text-xl font-semibold text-blue-50 mb-4">Building a Data-Driven SaaS Platform for Agriculture</h4>
            <p className="text-blue-100 mb-6">Co-founded and architected a multi-tenant agricultural SaaS from zero to production. Designed a row-level Policy auth system, decoupled media via Cloudflare R2, and integrated Stripe subscription billing.</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3"><FaCodeBranch className="text-blue-500 mt-1 flex-shrink-0" size={18} /><div><strong className="text-blue-50">My Role:</strong> Co-Founder, Lead Architect &amp; Full-Stack Engineer</div></div>
              <div className="flex items-start space-x-3"><FaMicrochip className="text-blue-500 mt-1 flex-shrink-0" size={18} /><div><strong className="text-blue-50">Key Tech:</strong> Laravel 11, PHP 8.2, MySQL, Cloudflare, Stripe</div></div>
              <div className="flex items-start space-x-3"><FaFileAlt className="text-blue-500 mt-1 flex-shrink-0" size={18} /><div><strong className="text-blue-50">Highlights:</strong> CI/CD pipeline, Stripe billing, custom reporting, data import tools.</div></div>
              <div className="flex items-start space-x-3"><FaBolt className="text-blue-500 mt-1 flex-shrink-0" size={18} /><div><strong className="text-blue-50">Status:</strong> Active Beta Testing with real-world users.</div></div>
            </div>
            <div>
              <a href="https://cropaide.com/" target="_blank" rel="noopener noreferrer" className="inline-block font-semibold text-blue-400 hover:text-blue-300 transition-colors mr-4">Visit Live Site &rarr;</a>
              <Link to="/case-studies/cropaide" className="inline-block font-semibold text-blue-400 hover:text-blue-300 transition-colors mr-4">Read Case Study &rarr;</Link>
              <a href="https://dev.cc-website.com/cc-storybook/index.html" target="_blank" rel="noopener noreferrer" className="inline-block font-semibold text-purple-400 hover:text-purple-300 transition-colors">View Storybook &rarr;</a>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1a2420] to-[#1a1f2e] border border-green-800/40 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-green-500/70 mb-4">At a Glance</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-[#181c24] border-t-2 border-green-500 rounded-xl p-4 text-center">
                <FiLock className="mx-auto text-green-400 mb-1.5" size={15} />
                <p className="text-2xl font-extrabold text-white">3</p>
                <p className="text-xs text-gray-400 mt-1">Permission tiers</p>
              </div>
              <div className="bg-[#181c24] border-t-2 border-green-500 rounded-xl p-4 text-center">
                <FiShield className="mx-auto text-green-400 mb-1.5" size={15} />
                <p className="text-2xl font-extrabold text-white">100%</p>
                <p className="text-xs text-gray-400 mt-1">Tenant isolation</p>
              </div>
              <div className="bg-[#181c24] border-t-2 border-green-500 rounded-xl p-4 text-center">
                <FiZap className="mx-auto text-green-400 mb-1.5" size={15} />
                <p className="text-2xl font-extrabold text-white">0→1</p>
                <p className="text-xs text-gray-400 mt-1">Architecture &amp; build</p>
              </div>
              <div className="bg-[#181c24] border-t-2 border-green-500 rounded-xl p-4 text-center">
                <FiCloud className="mx-auto text-green-400 mb-1.5" size={15} />
                <p className="text-2xl font-extrabold text-white">∞</p>
                <p className="text-xs text-gray-400 mt-1">Media scalability</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Laravel 11', 'PHP 8.2', 'MySQL', 'Cloudflare R2', 'Stripe', 'GitHub Actions'].map(t => (
                <span key={t} className="text-xs bg-[#181c24] text-green-300 border border-green-800/50 rounded-full px-2.5 py-1">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dealer Transparency MILES */}
      <div className="bg-[#1e2230] rounded-xl shadow-lg overflow-hidden p-8 md:p-12 border border-blue-900">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-900/20 px-3 py-1 rounded-full">SaaS · Real-Time</span>
              <span className="text-xs text-gray-500">Production</span>
            </div>
            <h3 className="text-3xl font-bold text-blue-100 mb-2">Dealer Transparency MILES</h3>
            <h4 className="text-xl font-semibold text-blue-50 mb-4">Real-Time Vehicle Tracking &amp; Automation Platform</h4>
            <p className="text-blue-100 mb-6">Co-founded and led the architecture of a comprehensive SaaS platform providing dealers with real-time vehicle tracking, automated reporting, and seamless third-party integrations for complete inventory visibility.</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3"><FaCodeBranch className="text-blue-500 mt-1 flex-shrink-0" size={18} /><div><strong className="text-blue-50">My Role:</strong> Co-Founder, Lead Developer &amp; Technical Architect</div></div>
              <div className="flex items-start space-x-3"><FaMicrochip className="text-blue-500 mt-1 flex-shrink-0" size={18} /><div><strong className="text-blue-50">Key Tech:</strong> Laravel, React, Zustand, WebSockets, MySQL</div></div>
              <div className="flex items-start space-x-3"><FaBolt className="text-blue-500 mt-1 flex-shrink-0" size={18} /><div><strong className="text-blue-50">Highlights:</strong> Real-time data sync, automated workflows, enterprise-grade multi-dealer tenancy.</div></div>
            </div>
            <div>
              <a href="https://miles.dealertransparency.com/" target="_blank" rel="noopener noreferrer" className="inline-block font-semibold text-blue-400 hover:text-blue-300 transition-colors mr-4">Visit Live Platform &rarr;</a>
              <Link to="/case-studies/miles" className="inline-block font-semibold text-blue-400 hover:text-blue-300 transition-colors">Read Case Study &rarr;</Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1e1a2e] to-[#1a1f2e] border border-purple-800/40 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-purple-500/70 mb-4">At a Glance</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-[#181c24] border-t-2 border-purple-500 rounded-xl p-4 text-center">
                <FiActivity className="mx-auto text-purple-400 mb-1.5" size={15} />
                <p className="text-2xl font-extrabold text-white">WS</p>
                <p className="text-xs text-gray-400 mt-1">Real-time sync</p>
              </div>
              <div className="bg-[#181c24] border-t-2 border-purple-500 rounded-xl p-4 text-center">
                <FiRefreshCw className="mx-auto text-purple-400 mb-1.5" size={15} />
                <p className="text-2xl font-extrabold text-white">API</p>
                <p className="text-xs text-gray-400 mt-1">Auto integrations</p>
              </div>
              <div className="bg-[#181c24] border-t-2 border-purple-500 rounded-xl p-4 text-center">
                <FiAward className="mx-auto text-purple-400 mb-1.5" size={15} />
                <p className="text-2xl font-extrabold text-white">✓</p>
                <p className="text-xs text-gray-400 mt-1">Enterprise scale</p>
              </div>
              <div className="bg-[#181c24] border-t-2 border-purple-500 rounded-xl p-4 text-center">
                <FaUsers className="mx-auto text-purple-400 mb-1.5" size={15} />
                <p className="text-2xl font-extrabold text-white">✓</p>
                <p className="text-xs text-gray-400 mt-1">Multi-dealer tenancy</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Laravel', 'React', 'Zustand', 'WebSockets', 'MySQL', 'Laravel Reverb'].map(t => (
                <span key={t} className="text-xs bg-[#181c24] text-purple-300 border border-purple-800/50 rounded-full px-2.5 py-1">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);

const SkillsSection = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold text-blue-50 text-center mb-12">Core Competencies</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
  <div className="case-study bg-[#1e2230] rounded-xl shadow-lg overflow-hidden p-8 md:p-12 border border-blue-900">
        <FaCode className="mx-auto text-blue-500 mb-4" size={40} />
      <h3 className="text-2xl font-bold text-blue-100 mb-2">Front-End</h3>
  <p className="text-blue-100">React, Next.js, TypeScript, Redux, Jest, Tailwind CSS, Bootstrap, Framer Motion</p>
      </div>
  <div className="case-study bg-[#1e2230] rounded-xl shadow-lg overflow-hidden p-8 md:p-12 border border-blue-900">
        <FaServer className="mx-auto text-blue-500 mb-4" size={40} />
      <h3 className="text-2xl font-bold text-blue-100 mb-2">Back-End</h3>
  <p className="text-blue-100">Node.js, PHP, Laravel, GraphQL, REST APIs, MySQL, PostgreSQL, WordPress</p>
      </div>
  <div className="case-study bg-[#1e2230] rounded-xl shadow-lg overflow-hidden p-8 md:p-12 border border-blue-900">
        <FaTools className="mx-auto text-blue-500 mb-4" size={40} />
      <h3 className="text-2xl font-bold text-blue-100 mb-2">Tools & Methods</h3>
  <p className="text-blue-100">Git, GitHub Actions, CI/CD, Docker, AWS, Vercel, Agile/Scrum, Jira, Figma, Storybook</p>
      </div>
    </div>
  </div>
);

const POSTS = [
  {
    tag: 'AI / Architecture', tagClass: 'text-yellow-300 bg-yellow-900/25 border-yellow-700/40',
    accentClass: 'border-l-yellow-500',
    title: 'Building a Secure AI Assistant Into a Static Portfolio Site',
    date: 'Feb 19, 2026', read: '7 min',
    excerpt: 'How I built a Gemini 2.0 Flash-powered chat assistant into this site — and why the obvious VITE_* env var approach leaks your API key on every static deploy.',
    to: '/thoughts/gemini-portfolio-assistant', isNew: true,
  },
  {
    tag: 'State Management', tagClass: 'text-purple-300 bg-purple-900/25 border-purple-700/40',
    accentClass: 'border-l-purple-500',
    title: 'Why We Chose Zustand Over Redux for a Real-Time Automotive SaaS',
    date: 'Feb 18, 2026', read: '8 min',
    excerpt: 'On MILES we needed surgical re-renders, WebSocket-to-state integration, and form persistence — without Redux boilerplate. Here\'s the full architecture.',
    to: '/thoughts/zustand-miles',
  },
  {
    tag: 'Real-Time', tagClass: 'text-cyan-300 bg-cyan-900/25 border-cyan-700/40',
    accentClass: 'border-l-cyan-500',
    title: 'Killing the Refresh Button: Real-Time Dealership Ops with Laravel Reverb',
    date: 'Feb 11, 2026', read: '7 min',
    excerpt: 'Stale data kills deals in automotive sales. How I built sub-100ms state sync across dealership devices — no Pusher bill, no polling.',
    to: '/thoughts/laravel-reverb',
  },
  {
    tag: 'DevOps', tagClass: 'text-yellow-300 bg-yellow-900/25 border-yellow-700/40',
    accentClass: 'border-l-yellow-500',
    title: 'Why I Chose Laravel Cloud Over AWS for a Production SaaS',
    date: 'Feb 4, 2026', read: '6 min',
    excerpt: 'Every greenfield SaaS hits the same infrastructure crossroads. For a live deal-desk platform, Laravel Cloud was the right call. Here\'s the honest breakdown.',
    to: '/thoughts/laravel-cloud',
  },
  {
    tag: 'Backend', tagClass: 'text-red-300 bg-red-900/25 border-red-700/40',
    accentClass: 'border-l-red-500',
    title: 'Escaping RBAC Hell: Managing Multi-Tenant Hierarchies in Laravel',
    date: 'Jan 28, 2026', read: '8 min',
    excerpt: 'Standard role-based access breaks down fast in multi-tenant SaaS. How I replaced controller spaghetti with clean Laravel Policy architecture in CropAide.',
    to: '/thoughts/laravel-rbac',
  },
  {
    tag: 'Design Systems', tagClass: 'text-pink-300 bg-pink-900/25 border-pink-700/40',
    accentClass: 'border-l-pink-500',
    title: 'One Package, Two Runtimes: Sharing React Components Between Next.js and Gutenberg',
    date: 'Jan 21, 2026', read: '9 min',
    excerpt: 'How we used Rollup to build a shared component package that renders identically in the Next.js frontend and the WordPress Gutenberg editor — no drift, one source of truth.',
    to: '/thoughts/rollup-gutenberg-components',
  },
  {
    tag: 'Architecture', tagClass: 'text-blue-300 bg-blue-900/25 border-blue-700/40',
    accentClass: 'border-l-blue-500',
    title: 'Headless WordPress at Scale with WP Engine, Faust.js, and Atlas',
    date: 'Aug 4, 2024', read: '8 min',
    excerpt: 'A deep dive into WP Engine\'s Atlas platform and Faust.js for building performant, scalable headless WordPress solutions for enterprise clients.',
    to: '/thoughts/wpe-faustjs-atlas',
  },
  {
    tag: 'DevOps', tagClass: 'text-blue-300 bg-blue-900/25 border-blue-700/40',
    accentClass: 'border-l-blue-400',
    title: 'The Power of the Pipeline: CI/CD for Modern Web Development',
    date: 'Jul 2, 2024', read: '5 min',
    excerpt: 'A well-structured CI/CD pipeline is the bedrock of modern development. It\'s not just automation — it\'s a cultural shift toward quality and speed.',
    to: '/thoughts/ci-cd',
  },
  {
    tag: 'WordPress', tagClass: 'text-sky-300 bg-sky-900/25 border-sky-700/40',
    accentClass: 'border-l-sky-500',
    title: 'Mastering the Block: Modern WordPress with Gutenberg',
    date: 'Jun 15, 2024', read: '6 min',
    excerpt: 'Gutenberg transformed WordPress from a content editor into a page builder. Here\'s how to get the most out of the block editor as a developer.',
    to: '/thoughts/wordpress-gutenberg',
  },
  {
    tag: 'Design', tagClass: 'text-indigo-300 bg-indigo-900/25 border-indigo-700/40',
    accentClass: 'border-l-indigo-500',
    title: 'The Unseen Value of a Design System',
    date: 'May 10, 2024', read: '5 min',
    excerpt: 'A design system is more than a component library. It\'s the shared language that accelerates development and ensures brand consistency at scale.',
    to: '/thoughts/design-system',
  },
  {
    tag: 'Architecture', tagClass: 'text-blue-300 bg-blue-900/25 border-blue-700/40',
    accentClass: 'border-l-blue-500',
    title: 'Headless vs. Monolithic: Choosing the Right Tool for the Job',
    date: 'Apr 22, 2024', read: '7 min',
    excerpt: 'The debate isn\'t which is better — it\'s which is right for your context. A practical framework for making the call on your next project.',
    to: '/thoughts/headless-vs-monolithic',
  },
];

const ThoughtsSection = () => {
  const [featured, ...rest] = POSTS;
  return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold text-blue-50 text-center mb-12">Thoughts & Insights</h2>

    {/* Featured / Latest */}
    <Link to={featured.to} className="group block mb-8">
      <div className={`bg-[#1e2230] border border-blue-900/50 rounded-2xl p-7 flex flex-col md:flex-row md:items-center gap-6 shadow-lg border-l-4 ${featured.accentClass} hover:border-purple-400 transition-colors`}>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${featured.tagClass}`}>{featured.tag}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-green-400 bg-green-900/20 px-2.5 py-1 rounded-full border border-green-700/40">Latest</span>
          </div>
          <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-purple-300 transition-colors">{featured.title}</h3>
          <p className="text-blue-100 text-sm leading-relaxed mb-3">{featured.excerpt}</p>
          <p className="text-xs text-gray-500">{featured.date} &middot; {featured.read} read</p>
        </div>
        <div className="flex-shrink-0 text-purple-400 group-hover:translate-x-1 transition-transform text-2xl font-bold">&rarr;</div>
      </div>
    </Link>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {rest.map((post) => (
        <Link key={post.to} to={post.to} className="group block">
          <div className={`bg-[#1e2230] border border-blue-900/40 rounded-2xl p-5 flex flex-col h-full shadow border-l-4 ${post.accentClass} hover:border-opacity-100 transition-colors`}>
            <div className="mb-3">
              <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${post.tagClass}`}>{post.tag}</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-blue-300 transition-colors flex-grow">{post.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#23283a]">
              <span className="text-xs text-gray-500">{post.date} &middot; {post.read}</span>
              <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">Read &rarr;</span>
            </div>
          </div>
        </Link>
      ))}
    </div>

  </div>
  );
};


const ContactSection = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious team.</p>
    <a href="mailto:mark@markwarddesign.com" className="inline-flex items-center px-8 py-3 rounded-full text-white font-bold shadow-lg bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 transition-all hover:opacity-90">
      <span>Say Hello</span>
      <FiMail size={22} className="ml-3" aria-hidden="true" />
    </a>
  </div>
);

const Footer = () => (
  <footer className="bg-[#181c24] py-10 border-t border-[#23283a]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
      <p className="text-blue-100 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Mark Ward. Built with React & Tailwind CSS.</p>
      <div className="flex space-x-6 items-center">
        <a href="https://github.com/markwarddesign" target="_blank" rel="noopener noreferrer" aria-label="Mark Ward on GitHub" className="text-blue-200 hover:text-blue-400 transition-colors"><FiGithub size={24} aria-hidden="true" /></a>
        <a href="https://linkedin.com/in/markwarddesign" target="_blank" rel="noopener noreferrer" aria-label="Mark Ward on LinkedIn" className="text-blue-200 hover:text-blue-400 transition-colors"><FiLinkedin size={24} aria-hidden="true" /></a>
        <a href="mailto:mark@markwarddesign.com" aria-label="Email Mark Ward" className="text-blue-200 hover:text-blue-400 transition-colors"><FiMail size={24} aria-hidden="true" /></a>
        <a href="#home" className="ml-6 inline-flex items-center px-6 py-2 rounded-full text-white font-bold shadow-lg bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 transition-all hover:opacity-90">Back to Top</a>
      </div>
    </div>
  </footer>
);

export default App;

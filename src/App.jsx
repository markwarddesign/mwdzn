import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaUsers, FaMicrochip, FaChartBar, FaBolt, FaCodeBranch, FaFileAlt, FaCode, FaServer, FaTools, FaReact } from 'react-icons/fa';
import DesignSystem from './pages/DesignSystem';
import HeadlessVsMonolithic from './pages/HeadlessVsMonolithic';
import WordPressGutenberg from './pages/WordPressGutenberg';
import CICD from './pages/CICD';
import WPEFaustJS from './pages/WPEFaustJS';
import FadeInSection from './components/FadeInSection';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Recent Work', href: '#recent-work' },
  { name: 'Skills', href: '#skills' },
  { name: 'Thoughts', href: '#thoughts' },
  { name: 'Contact', href: '#contact' },
];

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

const Header = ({ handleNavClick, isMenuOpen, setIsMenuOpen }) => {

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
      rootMargin: '0px',
      threshold: 0.5,
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
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src="https://markwarddesign.com/wp-content/uploads/2018/04/Artboard-4@2x-1.png"
            alt="Ward Logo"
            className="h-10 w-auto group-hover:scale-105 transition-transform filter invert brightness-0 saturate-0"
          />
        </Link>
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
  <button className="md:hidden text-blue-100 bg-[#23283a] border border-[#23283a] rounded-full p-2 shadow focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>
      {isMenuOpen && (
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
    <FadeInSection id="recent-work" alternate={false}>
      <RecentWorkSection />
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
    {/* Subtle dark overlay for extra depth */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#181c24] via-[#23283a] to-[#181c24] opacity-90 pointer-events-none" />
    <div className="relative pt-28 z-10">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight drop-shadow-lg">
        Digital Architect & Lead Engineer
      </h1>
  <h2 className="text-xl md:text-2xl font-medium mb-8 text-blue-100 max-w-3xl mx-auto drop-shadow">
        I build high-performance, scalable web solutions that drive business growth and deliver exceptional user experiences.
      </h2>
      <a href="#case-studies" className={`inline-flex items-center px-8 py-3 rounded-full text-white font-bold shadow-lg bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 transition-all hover:opacity-90`}>
        <span>View My Work</span>
        <FiArrowRight size={22} className="ml-3" />
      </a>
    </div>
  </section>
);

const AboutSection = () => (
  <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-center px-4 sm:px-6 lg:px-8">
    <div className="md:col-span-2 flex justify-center">
      <img src="https://avatars.githubusercontent.com/u/2242875?v=4" alt="Ward" className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-white shadow-lg" />
    </div>
    <div className="md:col-span-3 text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-50 mb-4">About Me</h2>
      <p className="text-blue-100 mb-4">
        As a Lead Developer at <strong className="text-white">Third & Grove</strong>, I guide teams in building high-stakes enterprise solutions. My experience is rooted in Agile environments, where I thrive on bridging the gap between high-level business strategy and detailed technical execution.
      </p>
      <p className="text-blue-100">
        I have a passion for creating robust, scalable applications and establishing efficient CI/CD workflows that ensure quality and speed. Whether leading a team or building a passion project, my goal is to deliver products that are well-engineered and perfectly aligned with user needs.
      </p>
    </div>
  </div>
);

const CaseStudiesSection = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold text-blue-50 text-center mb-12">Case Studies</h2>
    <div>
      {/* First Case Study */}
      <div className="case-study bg-[#1e2230] rounded-xl shadow-lg overflow-hidden p-8 md:p-12 border border-blue-900 mb-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="case-study-content">
            <h3 className="text-3xl font-bold text-blue-100 mb-2">California Closets</h3>
            <h4 className="text-xl font-semibold text-blue-50 mb-4">Architecting a Headless Future for a Leading National Brand</h4>
            <p className="text-blue-100 mb-6">
              At Third & Grove, I led a team of three in the complete headless rebuild of the California Closets web presence, working within an Agile environment to enhance performance, accessibility, and marketing agility.
            </p>
            <div className="space-y-4 mb-6">
              <a href="https://www.californiaclosets.com" target="_blank" rel="noopener noreferrer" className="inline-block font-semibold text-blue-400 hover:text-blue-600 transition-colors mr-4">Visit Live Site &rarr;</a>
              <a href="https://www.californiaclosets.com/cc-storybook/index.html" target="_blank" rel="noopener noreferrer" className="inline-block font-semibold text-blue-400 hover:text-blue-600 transition-colors">View Storybook &rarr;</a>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3"><FaUsers className="text-blue-400 mt-1 flex-shrink-0" size={20} /><div><strong className="text-white">My Role:</strong> Technical Architect & Dev Lead</div></div>
              <div className="flex items-start space-x-3"><FaMicrochip className="text-blue-400 mt-1 flex-shrink-0" size={20} /><div><strong className="text-white">Key Tech:</strong> Next.js, React, GraphQL, Algolia, Salesforce</div></div>
              <div className="flex items-start space-x-3"><FaChartBar className="text-blue-400 mt-1 flex-shrink-0" size={20} /><div><strong className="text-white">Impact:</strong> Established CI/CD workflows, improved site speed, and ensured ADA compliance.</div></div>
              <div className="flex items-start space-x-3"><FaBolt className="text-blue-400 mt-1 flex-shrink-0" size={20} /><div><strong className="text-white">Outcome:</strong> Successfully launched September 2025. Ongoing optimization for Core Web Vitals.</div></div>
            </div>
          </div>
          <div className="case-study-visual">
            <h4 className="text-lg font-semibold text-blue-100 mb-3 text-center">Simplified System Architecture</h4>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <svg width="100%" viewBox="0 0 400 220" className="font-sans text-xs">
                <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" /></marker></defs>
                <g><rect x="130" y="10" width="140" height="40" rx="5" fill="#ffffff" stroke="#e5e7eb" /><text x="200" y="35" fill="#1f2937" textAnchor="middle">Next.js / React</text></g>
                <g><rect x="150" y="90" width="100" height="40" rx="5" fill="#ffffff" stroke="#e5e7eb" /><text x="200" y="115" fill="#1f2937" textAnchor="middle">GraphQL API</text></g>
                <g><rect x="10" y="170" width="120" height="40" rx="5" fill="#ffffff" stroke="#e5e7eb" /><text x="70" y="195" fill="#1f2937" textAnchor="middle">Headless WordPress</text></g>
                <g><rect x="140" y="170" width="120" height="40" rx="5" fill="#ffffff" stroke="#e5e7eb" /><text x="200" y="195" fill="#1f2937" textAnchor="middle">Algolia Search</text></g>
                <g><rect x="270" y="170" width="120" height="40" rx="5" fill="#ffffff" stroke="#e5e7eb" /><text x="330" y="195" fill="#1f2937" textAnchor="middle">Salesforce / Mulesoft</text></g>
                <path d="M 200 50 V 90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
                <path d="M 200 130 V 150 H 70 V 170" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" strokeLinejoin="round" fill="none" />
                <path d="M 200 130 V 170" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
                <path d="M 200 130 V 150 H 330 V 170" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Second Case Study */}
      <div className="case-study bg-[#1e2230] rounded-xl shadow-lg overflow-hidden p-8 md:p-12 border border-blue-900">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="case-study-visual">
            <h4 className="text-lg font-semibold text-blue-100 mb-3 text-center">Product & Technical Roadmap</h4>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="relative">
                <div className="absolute left-4 top-1 h-full w-0.5 bg-blue-500"></div>
                <div className="relative pl-10 pb-8"><div className="absolute left-4 top-1 w-4 h-4 bg-[#23283a] border-2 border-blue-500 rounded-full transform -translate-x-1/2"></div><h5 className="font-bold text-gray-900">Phase 1: MVP (Currently in Beta Testing)</h5><p className="text-sm text-gray-700">Built with Laravel & Bootstrap for rapid development and a solid, responsive foundation.</p></div>
                <div className="relative pl-10 pb-8"><div className="absolute left-4 top-1 w-4 h-4 bg-[#23283a] border-2 border-blue-500 rounded-full transform -translate-x-1/2"></div><h5 className="font-bold text-gray-900">Phase 2: User Engagement</h5><p className="text-sm text-gray-700">Integrating real-time SMS notifications for key events using Twilio.</p></div>
                <div className="relative pl-10 pb-8"><div className="absolute left-4 top-1 w-4 h-4 bg-[#23283a] border-2 border-blue-500 rounded-full transform -translate-x-1/2"></div><h5 className="font-bold text-gray-900">Phase 3: Web App Evolution</h5><p className="text-sm text-gray-700">Migrate front-end to React for a more dynamic, component-based user experience.</p></div>
                <div className="relative pl-10"><div className="absolute left-4 top-1 w-4 h-4 bg-[#23283a] border-2 border-blue-500 rounded-full transform -translate-x-1/2"></div><h5 className="font-bold text-gray-900">Phase 4: Native Mobile</h5><p className="text-sm text-gray-700">Develop native iOS & Android apps using React Native, sharing logic with the web platform.</p></div>
              </div>
            </div>
          </div>
          <div className="case-study-content">
            <h3 className="text-3xl font-bold text-blue-100 mb-2">CropAide</h3>
            <h4 className="text-xl font-semibold text-blue-50 mb-4">Building a Data-Driven SaaS Platform for Agriculture</h4>
            <p className="text-blue-100 mb-6">A passion project built from scratch to help growers make better decisions. I established a full CI/CD pipeline for automated testing and deployment. Currently in active Beta Testing.</p>
            <div className="space-y-4 mb-6">
              <a href="https://cropaide.com/" target="_blank" rel="noopener noreferrer" className="inline-block font-semibold text-blue-400 hover:text-blue-600 transition-colors">Visit Live Site &rarr;</a>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3"><FaCodeBranch className="text-blue-500 mt-1 flex-shrink-0" size={20} /><div><strong className="text-blue-50">My Role:</strong> Founder, Architect, & Full-Stack Developer</div></div>
              <div className="flex items-start space-x-3"><FaMicrochip className="text-blue-500 mt-1 flex-shrink-0" size={20} /><div><strong className="text-blue-50">Key Tech:</strong> Laravel, PHP, Bootstrap, Stripe, Cloudflare, Twilio</div></div>
              <div className="flex items-start space-x-3"><FaFileAlt className="text-blue-500 mt-1 flex-shrink-0" size={20} /><div><strong className="text-blue-50">Highlights:</strong> CI/CD pipeline, Stripe subscription billing, custom reporting, data import tools, and a clear growth roadmap.</div></div>
              <div className="flex items-start space-x-3"><FaBolt className="text-blue-500 mt-1 flex-shrink-0" size={20} /><div><strong className="text-blue-50">Status:</strong> Active Beta Testing with real-world users.</div></div>
            </div>
          </div>
        </div>
      </div>
      {/* Third Case Study - Dealer Transparency MILES */}
      <div className="case-study bg-[#1e2230] rounded-xl shadow-lg overflow-hidden p-8 md:p-12 border border-blue-900 mt-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="case-study-content">
            <h3 className="text-3xl font-bold text-blue-100 mb-2">Dealer Transparency MILES</h3>
            <h4 className="text-xl font-semibold text-blue-50 mb-4">Real-Time Vehicle Tracking & Automation Platform</h4>
            <p className="text-blue-100 mb-6">A comprehensive SaaS solution providing dealers with real-time vehicle tracking, automated reporting, and seamless third-party integrations for complete inventory visibility.</p>
            <div className="space-y-4 mb-6">
              <a href="https://miles.dealertransparency.com/" target="_blank" rel="noopener noreferrer" className="inline-block font-semibold text-blue-400 hover:text-blue-600 transition-colors">Visit Live Platform &rarr;</a>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3"><FaCodeBranch className="text-blue-500 mt-1 flex-shrink-0" size={20} /><div><strong className="text-blue-50">My Role:</strong> Lead Developer & Technical Architect</div></div>
              <div className="flex items-start space-x-3"><FaMicrochip className="text-blue-500 mt-1 flex-shrink-0" size={20} /><div><strong className="text-blue-50">Key Tech:</strong> Laravel, React, Zustand, WebSocket Integration, Third-Party API Automations</div></div>
              <div className="flex items-start space-x-3"><FaBolt className="text-blue-500 mt-1 flex-shrink-0" size={20} /><div><strong className="text-blue-50">Highlights:</strong> Real-time data synchronization, automated workflows, and enterprise-grade scalability.</div></div>
            </div>
          </div>
          <div className="case-study-visual">
            <h4 className="text-lg font-semibold text-blue-100 mb-3 text-center">Platform Features</h4>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="space-y-4 text-gray-900">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h5 className="font-bold">Real-Time Vehicle Tracking</h5>
                    <p className="text-sm text-gray-700">Live location updates via WebSocket connections</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h5 className="font-bold">Automated API Integrations</h5>
                    <p className="text-sm text-gray-700">Seamless third-party data synchronization</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h5 className="font-bold">State Management</h5>
                    <p className="text-sm text-gray-700">Zustand for efficient, predictable data flow</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h5 className="font-bold">Enterprise Scalability</h5>
                    <p className="text-sm text-gray-700">Built to handle high-volume dealer operations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RecentWorkSection = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold text-blue-50 text-center mb-12">Recent Work</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      {/* Card 1: California Closets */}
      <div className="bg-[#23283a] p-8 rounded-xl shadow-lg flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-blue-100 mb-2">California Closets</h3>
          <p className="text-blue-100 mb-4">Led the headless rebuild and launch of the national brand site. Ongoing performance, accessibility, and marketing improvements.</p>
          <p className="text-sm font-medium text-blue-200 mb-4">Next.js, React, GraphQL, Algolia, Salesforce</p>
        </div>
        <a href="https://www.californiaclosets.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors mt-auto">Visit Live Site &rarr;</a>
        <a href="https://www.californiaclosets.com/cc-storybook/index.html" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 hover:text-blue-600 transition-colors mt-2">View Storybook &rarr;</a>
      </div>
      {/* Card 2: Health Coach Institute */}
      <div className="bg-[#23283a] p-8 rounded-xl shadow-lg flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-blue-100 mb-2">Health Coach Institute</h3>
          <p className="text-blue-100 mb-4">Led the team on a full site rebuild, modernizing the platform for a better student and marketing experience.</p>
          <p className="text-sm font-medium text-blue-200 mb-4">WordPress, Gutenberg, React, Custom Integrations</p>
        </div>
        <a href="https://www.healthcoachinstitute.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors mt-auto">Visit Site &rarr;</a>
      </div>
      {/* Card 3: FX Nutrition */}
      <div className="bg-[#23283a] p-8 rounded-xl shadow-lg flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-blue-100 mb-2">FX Nutrition</h3>
          <p className="text-blue-100 mb-4">Led the team on a full site rebuild, delivering a modern, scalable, and user-friendly experience for a growing nutrition brand.</p>
          <p className="text-sm font-medium text-blue-200 mb-4">WordPress, Gutenberg, React, Custom Integrations</p>
        </div>
        <a href="https://fxnutrition.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors mt-auto">Visit Site &rarr;</a>
      </div>
      {/* Card 4: Zulutions Global */}
      <div className="bg-[#23283a] p-8 rounded-xl shadow-lg flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-blue-100 mb-2">Zulutions Global</h3>
          <p className="text-blue-100 mb-4">Pioneering a revolutionary process to convert municipal and industrial waste into clean, renewable energy.</p>
          <p className="text-sm font-medium text-blue-200 mb-4">React, Tailwind, Form Integrations</p>
        </div>
        <a href="https://zulutionsglobal.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors mt-auto">Visit Site &rarr;</a>
      </div>
      {/* Card 5: Sculpting Time */}
      <div className="bg-[#23283a] p-8 rounded-xl shadow-lg flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-blue-100 mb-2">Sculpting Time</h3>
          <p className="text-blue-100 mb-4">A showcase for a local artist's one-of-a-kind, handmade kinetic sculpture clocks carved from the finest woods.</p>
          <p className="text-sm font-medium text-blue-200 mb-4">React, Tailwind, Form Integrations</p>
        </div>
        <a href="https://sculpting-time.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors mt-auto">Visit Site &rarr;</a>
      </div>
      {/* Card 6: SuburbanCM */}
      <div className="bg-[#23283a] p-8 rounded-xl shadow-lg flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-blue-100 mb-2">SuburbanCM</h3>
          <p className="text-blue-100 mb-4">A trusted partner in Southern Idaho for quality construction and strategic project management.</p>
          <p className="text-sm font-medium text-blue-200 mb-4">WordPress, Gutenberg, React, Tailwind</p>
        </div>
        <a href="https://suburbancm.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors mt-auto">Visit Site &rarr;</a>
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

const ThoughtsSection = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold text-blue-50 text-center mb-12">Thoughts & Insights</h2>
    <div className="space-y-12">
      {/* Post 1: Headless WordPress at Scale */}
      <div className="p-8 bg-[#23283a] rounded-xl shadow-lg flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg" alt="WordPress" className="w-8 h-8" />
          <span className="text-blue-200 text-xs">Architecture</span>
        </div>
        <h3 className="text-2xl font-bold text-blue-100 mb-2">Headless WordPress at Scale with WP Engine, Faust.js, and Atlas</h3>
        <p className="text-blue-200 text-sm mb-4">August 4, 2024 &middot; 8 min read</p>
        <p className="text-blue-100 mb-4">For enterprise-level projects, a headless WordPress architecture offers the ultimate in performance, security, and flexibility. WP Engine's Atlas platform, combined with the Faust.js framework, provides a powerful, end-to-end solution for building and deploying headless WordPress sites at scale.</p>
        <pre className="bg-[#181c24] text-blue-200 rounded-lg p-4 text-xs overflow-x-auto mb-2"><code>{`import { FaustProvider } from '@faustjs/next';

<FaustProvider>
  {/* ...your app... */}
</FaustProvider>`}</code></pre>
        <Link to="/thoughts/wpe-faustjs-atlas" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors">Read more &rarr;</Link>
      </div>
      {/* Post 2: CI/CD */}
      <div className="p-8 bg-[#23283a] rounded-xl shadow-lg flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <FaCodeBranch className="text-blue-400" size={24} />
          <span className="text-blue-200 text-xs">DevOps</span>
        </div>
        <h3 className="text-2xl font-bold text-blue-100 mb-2">The Power of the Pipeline: CI/CD for Modern Web Development</h3>
        <p className="text-blue-200 text-sm mb-4">July 2, 2024 &middot; 5 min read</p>
        <p className="text-blue-100 mb-4">A well-structured Continuous Integration and Continuous Deployment (CI/CD) pipeline is the bedrock of modern web development, enabling teams to ship better products, faster. It's about more than just automation; it's a cultural shift that emphasizes collaboration, quality, and efficiency.</p>
        <pre className="bg-[#181c24] text-blue-200 rounded-lg p-4 text-xs overflow-x-auto mb-2"><code>{`# .github/workflows/deploy.yml
name: Deploy
on: [push]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install & Build
        run: npm ci && npm run build
      - name: Deploy
        run: npm run deploy`}</code></pre>
        <Link to="/thoughts/ci-cd" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors">Read more &rarr;</Link>
      </div>
      {/* Post 3: Gutenberg */}
      <div className="p-8 bg-[#23283a] rounded-xl shadow-lg flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg" alt="WordPress" className="w-8 h-8" />
          <span className="text-blue-200 text-xs">WordPress</span>
        </div>
        <h3 className="text-2xl font-bold text-blue-100 mb-2">Mastering the Block: Modern WordPress with Gutenberg</h3>
        <p className="text-blue-200 text-sm mb-4">June 15, 2024 &middot; 6 min read</p>
        <p className="text-blue-100 mb-4">The introduction of the Gutenberg block editor in WordPress marked a pivotal shift from a simple content editor to a powerful page builder. For developers, this evolution opens up a new world of possibilities for creating dynamic, structured, and highly customizable user experiences.</p>
        <pre className="bg-[#181c24] text-blue-200 rounded-lg p-4 text-xs overflow-x-auto mb-2"><code>{`<!-- wp:paragraph -->
<p>Hello from the WordPress block editor!</p>
<!-- /wp:paragraph -->`}</code></pre>
        <Link to="/thoughts/wordpress-gutenberg" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors">Read more &rarr;</Link>
      </div>
      {/* Post 4: Design System */}
      <div className="p-8 bg-[#23283a] rounded-xl shadow-lg flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <FaTools className="text-blue-400" size={24} />
          <span className="text-blue-200 text-xs">Design</span>
        </div>
        <h3 className="text-2xl font-bold text-blue-100 mb-2">The Unseen Value of a Design System</h3>
        <p className="text-blue-200 text-sm mb-4">May 10, 2024 &middot; 5 min read</p>
        <p className="text-blue-100 mb-4">A design system is more than a component library; it's the shared language that accelerates development, ensures brand consistency, and empowers teams to build better products, faster. It’s the ultimate source of truth.</p>
        <pre className="bg-[#181c24] text-blue-200 rounded-lg p-4 text-xs overflow-x-auto mb-2"><code>{`// Button.stories.jsx
export const Primary = () => <Button primary label="Primary" />;`}</code></pre>
        <Link to="/thoughts/design-system" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors">Read more &rarr;</Link>
      </div>
      {/* Post 5: Headless vs. Monolithic */}
      <div className="p-8 bg-[#23283a] rounded-xl shadow-lg flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <FaMicrochip className="text-blue-400" size={24} />
          <span className="text-blue-200 text-xs">Architecture</span>
        </div>
        <h3 className="text-2xl font-bold text-blue-100 mb-2">Headless vs. Monolithic: Choosing the Right Tool for the Job</h3>
        <p className="text-blue-200 text-sm mb-4">April 22, 2024 &middot; 7 min read</p>
        <p className="text-blue-100 mb-4">The debate isn't about which is "better," but which is right for your context. A headless architecture offers unparalleled flexibility and performance, but the simplicity of a monolith can be the smarter choice for many projects.</p>
        <pre className="bg-[#181c24] text-blue-200 rounded-lg p-4 text-xs overflow-x-auto mb-2"><code>{`// Monolith vs Headless
const monolith = {
  stack: 'LAMP',
  pros: ['Simple', 'All-in-one'],
  cons: ['Less flexible']
};
const headless = {
  stack: 'Jamstack',
  pros: ['Flexible', 'Scalable'],
  cons: ['More setup']
};`}</code></pre>
        <Link to="/thoughts/headless-vs-monolithic" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors">Read more &rarr;</Link>
      </div>
    </div>
  </div>
);

const ContactSection = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious team.</p>
    <a href="mailto:mark@markwarddesign.com" className="inline-flex items-center px-8 py-3 rounded-full text-white font-bold shadow-lg bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 transition-all hover:opacity-90">
      <span>Say Hello</span>
      <FiMail size={22} className="ml-3" />
    </a>
  </div>
);

const Footer = () => (
  <footer className="bg-[#181c24] py-10 border-t border-[#23283a]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
      <p className="text-blue-100 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Mark Ward. Built with React & Tailwind CSS.</p>
      <div className="flex space-x-6 items-center">
        <a href="https://github.com/markwarddesign" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-blue-400 transition-colors"><FiGithub size={24} /></a>
        <a href="https://linkedin.com/in/markwarddesign" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-blue-400 transition-colors"><FiLinkedin size={24} /></a>
        <a href="mailto:mark@markwarddesign.com" className="text-blue-200 hover:text-blue-400 transition-colors"><FiMail size={24} /></a>
        <a href="#home" className="ml-6 inline-flex items-center px-6 py-2 rounded-full text-white font-bold shadow-lg bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 transition-all hover:opacity-90">Back to Top</a>
      </div>
    </div>
  </footer>
);

export default App;

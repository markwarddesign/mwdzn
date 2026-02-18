import React from 'react';
import { FiArrowLeft, FiCheckCircle, FiCode, FiLayers, FiGlobe, FiZap, FiUsers, FiExternalLink, FiMonitor, FiBarChart2 } from 'react-icons/fi';
import { SiNextdotjs, SiReact, SiTypescript, SiGraphql, SiStorybook, SiAlgolia, SiGithubactions } from 'react-icons/si';
import { Link } from 'react-router-dom';

const CaliforniaClosets = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-gray-900/80 backdrop-blur-sm shadow-md border-b border-gray-800 fixed top-0 left-0 z-50">
        <Link to="/" className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 font-medium transition-colors text-base">
          <FiArrowLeft />
          <span>Back to Home</span>
        </Link>
      </nav>

      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">

          {/* Header */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-900/40 px-3 py-1 rounded-full mb-4">Case Study</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-4">
              California Closets — Enterprise Headless Migration
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Migrating a high-traffic national brand from a monolithic WordPress theme to a fully decoupled Next.js architecture — built for performance, localization, and long-term developer velocity.
            </p>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-3 my-7">
            <span className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-300">
              <FiUsers className="text-blue-400" size={14} />
              <strong className="text-white">Role:</strong>&nbsp;Technical Architect &amp; Dev Lead
            </span>
            <span className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-300">
              <FiUsers className="text-purple-400" size={14} />
              <strong className="text-white">Team:</strong>&nbsp;Up to 7 engineers
            </span>
            <span className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-300">
              <FiCheckCircle className="text-green-400" size={14} />
              <strong className="text-white">Status:</strong>&nbsp;Launched Sept 2025
            </span>
          </div>

          {/* Stack */}
          <div className="flex flex-wrap items-center gap-4 mb-10 p-4 bg-gray-900/60 rounded-xl border border-gray-800">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold mr-2">Stack</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiNextdotjs className="text-white" size={18} /> Next.js</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiReact className="text-cyan-400" size={18} /> React</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiTypescript className="text-blue-400" size={18} /> TypeScript</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiGraphql className="text-pink-400" size={18} /> GraphQL</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg" alt="WordPress" className="w-4 h-4" />
              WordPress
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiAlgolia className="text-blue-400" size={18} /> Algolia</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiStorybook className="text-pink-500" size={18} /> Storybook</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiGithubactions className="text-orange-400" size={18} /> GitHub Actions</span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            {/* 1. Executive Summary */}
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
              <FiCode className="text-blue-400" /> 1. Executive Summary
            </h2>
            <p>
              The California Closets digital transformation involved migrating a traditional, monolithic WordPress instance to a modern headless architecture. This transition was designed to enhance performance, improve developer velocity, and deliver a premium, app-like user experience that matches the brand's high-end physical products.
            </p>
            <p>
              By leveraging Next.js on the frontend and WordPress as a structured CMS, the project achieved a scalable, multilingual, and high-performance enterprise solution serving millions of visitors across North America.
            </p>

            {/* Before/After comparison */}
            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <div className="bg-gray-900 border border-red-800/40 rounded-xl p-5">
                <p className="font-bold text-red-300 mb-3 text-sm">Before — Monolithic WordPress</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {[
                    'Server-side PHP rendering on every request',
                    'Theme-based architecture with tight coupling',
                    'Minimal type safety — PHP runtime errors',
                    'Scalability limited by server CPU',
                    'Slow content preview and editing cycles',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-900 border border-green-700/40 rounded-xl p-5">
                <p className="font-bold text-green-300 mb-3 text-sm">After — Headless Next.js</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {[
                    'Hybrid SSG/SSR — pages served from the edge',
                    'Component-based, fully decoupled frontend',
                    'End-to-end TypeScript + GraphQL type safety',
                    'Edge-ready and horizontally scalable',
                    'Instant previews via Next.js Preview Mode',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 2. Architecture */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiLayers className="text-purple-400" /> 2. Architecture &amp; Project Foundations
            </h2>
            <p>
              The core rebuild used <strong className="text-white">Next.js with TypeScript</strong> — providing a type-safe environment that reduces runtime errors and improves maintainability across a distributed team of up to 7 engineers.
            </p>

            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              {[
                {
                  label: 'Build Pipeline',
                  body: 'Tailwind CSS for rapid UI development, PostCSS for CSS optimization. Rollup bundling for the shared component package, keeping bundle size precise and tree-shakeable.',
                },
                {
                  label: 'Code Standards',
                  body: 'ESLint and Prettier enforced consistent code quality. Shared config files committed to the monorepo ensured no style drift across contributors.',
                },
                {
                  label: 'CI/CD',
                  body: 'GitHub Actions pipelines handled automated testing, linting, and deployment on every PR. Branch previews gave the client real-time visibility into in-progress work.',
                },
                {
                  label: 'Rendering Strategy',
                  body: 'Static pages (location pages, product categories) deployed at the edge via SSG. Dynamic personalization (pricing, availability) handled at request time via SSR.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="bg-gray-900 border border-gray-700/50 rounded-xl p-4">
                  <p className="font-bold text-gray-200 text-sm mb-1">{label}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            {/* 3. Design System */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <SiStorybook className="text-pink-400" size={22} /> 3. Design System &amp; Component Library
            </h2>
            <p>
              A "component-first" approach was adopted to bridge the gap between design and implementation. Rather than building pages directly, we established a shared component library that served both the live Next.js frontend and the WordPress editorial experience.
            </p>
            <ul>
              <li>
                <strong className="text-white">Storybook Integration:</strong> 200+ reusable React components (Accordions, Drawers, Navigation, Product Tiles, etc.) were built and documented in Storybook, enabling isolated testing before integration.
              </li>
              <li>
                <strong className="text-white">Gutenberg Mapping:</strong> WordPress Gutenberg blocks were mapped 1:1 to frontend React components via a shared npm package bundled with Rollup. Content editors built complex layouts without touching code, and the live site rendered the exact same components they were arranging.
              </li>
              <li>
                <strong className="text-white">Styling Strategy:</strong> CSS Modules for component-scoped styles to prevent leakage, backed by a global design token system via Tailwind. This kept the component library portable and independent of the app layer.
              </li>
            </ul>

            <div className="not-prose bg-gray-900 border border-blue-800/40 rounded-xl p-5 my-6">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">The Shared Component Architecture</p>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-[#1e2230] rounded-lg p-3 border border-blue-900/40">
                  <p className="font-bold text-white mb-1">@cc/components</p>
                  <p className="text-xs text-gray-400">Shared npm package<br />Bundled with Rollup</p>
                </div>
                <div className="flex items-center justify-center text-gray-500 font-bold text-lg">→</div>
                <div className="flex flex-col gap-2">
                  <div className="bg-[#1e2230] rounded-lg p-2 border border-cyan-900/40">
                    <p className="font-bold text-cyan-300 text-xs">Next.js Frontend</p>
                    <p className="text-xs text-gray-400">Live site</p>
                  </div>
                  <div className="bg-[#1e2230] rounded-lg p-2 border border-orange-900/40">
                    <p className="font-bold text-orange-300 text-xs">WordPress Gutenberg</p>
                    <p className="text-xs text-gray-400">CMS editing</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Data Layer */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <SiGraphql className="text-pink-400" size={20} /> 4. Data Layer &amp; Type Safety
            </h2>
            <p>
              To handle complex enterprise data requirements, we moved away from standard REST APIs in favor of GraphQL, with full TypeScript coverage from schema to component.
            </p>
            <ul>
              <li>
                <strong className="text-white">GraphQL Code Generator:</strong> TypeScript types were automatically generated from the WordPress GraphQL schema on every build. No manual typing of API responses — the schema was the source of truth.
              </li>
              <li>
                <strong className="text-white">Fragment Masking:</strong> Components declared their own data requirements via fragments, ensuring each component only received the fields it needed. This reduced over-fetching and made components independently testable.
              </li>
              <li>
                <strong className="text-white">State Management:</strong> Custom React Context providers managed global state — user sessions, feature flags, and localization preferences — across the decoupled frontend without introducing Redux overhead.
              </li>
            </ul>

            {/* 5. i18n */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiGlobe className="text-green-400" /> 5. Internationalization &amp; Localization
            </h2>
            <p>
              Serving a North American audience required robust multilingual support across both static and dynamic content.
            </p>
            <ul>
              <li>
                <strong className="text-white">Locale-Aware Routing:</strong> Next.js middleware handled language-specific routing (<code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">/en/</code> vs <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">/es/</code>), with automatic locale detection from browser headers and geography.
              </li>
              <li>
                <strong className="text-white">Dynamic Translation System:</strong> Message files (<code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">en.json</code>, <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">es.json</code>) integrated with the CMS to provide localized content for both static UI strings and dynamic CMS entries, managed without code deployments.
              </li>
            </ul>

            {/* 6. Analytics */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiBarChart2 className="text-yellow-400" /> 6. Analytics &amp; Performance Monitoring
            </h2>
            <p>
              Enterprise visibility required more than Google Analytics. We implemented a full observability stack to monitor both user behavior and system health.
            </p>

            <div className="not-prose space-y-3 my-6">
              {[
                {
                  title: 'Attribution Engine',
                  body: 'Custom logic tracked marketing source/medium through the full lead funnel, handling edge cases like incognito users and UTM parameter loss at form submission.',
                },
                {
                  title: 'New Relic Integration',
                  body: 'Full-stack observability: Core Web Vitals tracking, SSR performance monitoring, and API latency dashboards. Any regression in TTFB or LCP triggered alerts before it hit end users.',
                },
                {
                  title: 'SEO & Service Workers',
                  body: 'Dynamic robots.txt and sitemap generation ensured the headless transition improved search rankings. Service worker configuration enabled offline-ready capabilities and aggressive caching of static assets.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="bg-gray-900 border border-gray-700/50 rounded-xl p-4 flex gap-3">
                  <FiCheckCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="font-bold text-gray-200 text-sm">{title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mt-0.5">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 7. Outcomes */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiZap className="text-blue-400" /> 7. Key Outcomes
            </h2>

            <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
              {[
                { stat: '200+', label: 'Reusable components' },
                { stat: '7', label: 'Engineers led' },
                { stat: 'i18n', label: 'EN + ES locales' },
                { stat: 'ADA', label: 'WCAG compliant' },
              ].map(({ stat, label }) => (
                <div key={label} className="bg-gray-900 border border-blue-900/40 rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-white">{stat}</p>
                  <p className="text-xs text-gray-400 mt-1">{label}</p>
                </div>
              ))}
            </div>

            <p>
              The California Closets headless migration delivered a site that matches the performance expectations of a modern SaaS product while remaining fully manageable by a non-technical marketing team. The component-first architecture continues to pay dividends — new page types are assembled from existing building blocks in hours rather than days, and the shared npm package approach means the CMS editing experience always stays in sync with the live site.
            </p>

            {/* CTA */}
            <div className="not-prose mt-12 bg-gray-900 border border-blue-800/50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-1">Explore further</p>
                <p className="text-gray-300 text-sm">Visit the live site, or read about the shared component architecture behind the Gutenberg integration.</p>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <a
                  href="https://www.californiaclosets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow"
                >
                  Visit Live Site <FiExternalLink size={14} />
                </a>
                <Link
                  to="/thoughts/rollup-gutenberg-components"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-bold text-sm transition-all hover:-translate-y-0.5"
                >
                  Read: Shared Components Post &rarr;
                </Link>
              </div>
            </div>

          </div>

          {/* Footer nav */}
          <div className="mt-10 pt-8 border-t border-gray-800">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 font-medium transition-colors">
              <FiArrowLeft size={16} />
              Back to Home
            </Link>
          </div>

        </article>
      </main>
    </div>
  );
};

export default CaliforniaClosets;

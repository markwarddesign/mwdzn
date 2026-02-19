import React from 'react';
import { FiArrowLeft, FiShield, FiZap, FiDatabase, FiUsers, FiCheckCircle, FiCode, FiExternalLink } from 'react-icons/fi';
import { SiLaravel, SiReact, SiTypescript, SiMysql } from 'react-icons/si';
import { Link } from 'react-router-dom';

const MILES = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">

          {/* Header */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-900/40 px-3 py-1 rounded-full mb-4">Case Study</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-2">MILES Offer Engine</h1>
            <p className="text-gray-400 text-lg mb-6">Modern Integrated Lead Engagement System</p>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-300">
              <FiUsers className="text-blue-400" size={14} />
              <strong className="text-white">Role:</strong>&nbsp;Lead Full Stack Engineer
            </span>
            <span className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-300">
              <FiCheckCircle className="text-green-400" size={14} />
              <strong className="text-white">Status:</strong>&nbsp;Live Production Pilot &mdash; 5 Active Dealerships
            </span>
          </div>

          {/* Stack icons */}
          <div className="flex flex-wrap items-center gap-4 mb-10 p-4 bg-gray-900/60 rounded-xl border border-gray-800">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold mr-2">Stack</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiLaravel className="text-red-400" size={20} title="Laravel" /> Laravel 12</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiReact className="text-cyan-400" size={20} title="React" /> React 18</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiTypescript className="text-blue-400" size={20} title="TypeScript" /> TypeScript</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiMysql className="text-blue-300" size={20} title="MySQL" /> MySQL 8</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300">
              <span className="w-5 h-5 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="currentColor" className="text-red-400 w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg></span>
              Laravel Reverb
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300">
              <FiZap className="text-yellow-400" size={16} /> Laravel Cloud
            </span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            {/* 1. Executive Summary */}
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
              <FiCode className="text-blue-400" /> 1. Executive Summary
            </h2>
            <p>
              MILES (Modern Integrated Lead Engagement System) is a multi-tenant automotive SaaS designed to replace legacy dealership spreadsheets with a real-time, reactive offer engine. As the Lead Engineer, I architected and deployed a system that is currently processing live vehicle offers for <strong className="text-white">5 active dealerships</strong>. By leveraging <strong className="text-yellow-300">Laravel Cloud</strong>, I ensured the infrastructure is serverless-scalable without the operational overhead, allowing me to focus on feature iteration based on real-time feedback from sales floors.
            </p>

            {/* 2. The Challenge */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiDatabase className="text-yellow-400" /> 2. The Challenge
            </h2>
            <p>Automotive sales are high-pressure and fast-paced. A delay in updating a price or an error in a tax calculation can kill a deal.</p>

            <div className="not-prose bg-gray-900 border border-yellow-700/50 rounded-xl p-6 my-6">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <FiZap className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                  <span><strong className="text-white">Concurrency:</strong> Multiple users (Salesperson + Manager) often view the same offer simultaneously.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiZap className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                  <span><strong className="text-white">Financial Accuracy:</strong> "Penny-perfect" calculations are required, including complex regional variables like the Washington State Luxury Tax.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiZap className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                  <span><strong className="text-white">Real-World Reliability:</strong> The system is the daily driver for 3–5 dealerships; downtime means they cannot print legal contracts or close deals.</span>
                </li>
              </ul>
            </div>

            {/* 3. Key Architectural Decisions */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiShield className="text-green-400" /> 3. Key Architectural Decisions
            </h2>
            <p>
              To solve these challenges, I moved away from a traditional Request/Response cycle toward an <strong className="text-white">event-driven, cloud-native architecture</strong>.
            </p>

            {/* 3A */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <FiZap className="text-yellow-400" /> A. Infrastructure: Laravel Cloud (Zero-Ops)
              </h3>
              <p className="text-gray-300 mb-3">Instead of managing Nginx configurations, I deployed MILES on <strong className="text-white">Laravel Cloud</strong>.</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-1">The Problem</p>
                  <p className="text-gray-400 text-sm">We needed enterprise-grade reliability for our pilot dealerships but didn't want to burn budget on a dedicated DevOps engineer.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-1">The Solution</p>
                  <ul className="text-gray-400 text-sm space-y-1 list-none pl-0">
                    <li className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} /> <span><strong className="text-white">Instant Scaling:</strong> The platform automatically handles concurrency spikes during end-of-month rushes.</span></li>
                    <li className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} /> <span><strong className="text-white">Security:</strong> Leveraged isolated environments to ensure strict data separation between all 5 active tenants.</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3B */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <FiZap className="text-cyan-400" /> B. Real-Time State Management (Laravel Reverb)
              </h3>
              <p className="text-gray-300 mb-3">In a negotiation, data is stale the moment it loads. I implemented <strong className="text-white">Laravel Reverb</strong> to push updates instantly.</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-1">The Decision</p>
                  <p className="text-gray-400 text-sm">Utilized Laravel's native WebSocket server, Reverb, paired with React and Zustand on the frontend.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-1">The Result</p>
                  <p className="text-gray-400 text-sm">When a Manager approves a price, the Salesperson's screen updates instantly without a refresh — a "Google Docs-style" collaborative experience for deal desks.</p>
                </div>
              </div>
            </div>

            {/* 3C */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <FiCode className="text-purple-400" /> C. Type-Safe Financial Logic
              </h3>
              <p className="text-gray-300 mb-3">Handling currency in JavaScript is notoriously error-prone.</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-1">Decision</p>
                  <p className="text-gray-400 text-sm">Strict TypeScript implementation for the frontend offer engine, mirrored by a PHP calculation service on the backend.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-1">Outcome</p>
                  <p className="text-gray-400 text-sm">Enforced strict typing for all financial inputs to prevent floating-point errors, ensuring offers are <strong className="text-white">"penny-perfect"</strong> before they are signed.</p>
                </div>
              </div>
            </div>

            {/* 4. Tech Stack */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiDatabase className="text-blue-400" /> 4. Tech Stack Strategy
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-800 my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-gray-300 uppercase text-xs tracking-widest">
                    <th className="px-5 py-3 text-left font-semibold">Component</th>
                    <th className="px-5 py-3 text-left font-semibold">Choice</th>
                    <th className="px-5 py-3 text-left font-semibold">Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-blue-300">Infrastructure</td>
                    <td className="px-5 py-4 text-gray-300 flex items-center gap-2"><FiZap className="text-yellow-400" size={16} /> Laravel Cloud</td>
                    <td className="px-5 py-4 text-gray-400">Serverless environment for zero-downtime deployments and auto-scaling without DevOps overhead.</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-blue-300">Backend</td>
                    <td className="px-5 py-4 text-gray-300 flex items-center gap-2"><SiLaravel className="text-red-400" size={16} /> Laravel 12</td>
                    <td className="px-5 py-4 text-gray-400">Latest features including native Reverb WebSockets for real-time syncing.</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-blue-300">Frontend</td>
                    <td className="px-5 py-4 text-gray-300 flex items-center gap-2"><SiReact className="text-cyan-400" size={16} /> React 18 + <SiTypescript className="text-blue-400" size={16} /> TS</td>
                    <td className="px-5 py-4 text-gray-400">Component-based UI for complex, interactive forms with type-safe financial logic.</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-blue-300">State</td>
                    <td className="px-5 py-4 text-gray-300">Zustand</td>
                    <td className="px-5 py-4 text-gray-400">Lightweight state management to handle the rapid flux of live offer numbers.</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-blue-300">Database</td>
                    <td className="px-5 py-4 text-gray-300 flex items-center gap-2"><SiMysql className="text-blue-300" size={16} /> MySQL 8.0</td>
                    <td className="px-5 py-4 text-gray-400">ACID compliance for reliable financial transactions.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 5. Feature Highlight */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-green-400" /> 5. Feature Highlight: The "Penny-Perfect" Calculator
            </h2>
            <p>
              The core value prop is the calculation engine. I isolated the tax logic into specific <strong className="text-white">Strategy classes</strong> to handle regional variances.
            </p>
            <ul>
              <li>
                <strong className="text-blue-300">Strategy Pattern:</strong> The system detects the dealership's region (e.g., WA) and swaps in the <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">WashingtonLuxuryTaxStrategy</code>.
              </li>
              <li>
                <strong className="text-blue-300">Result:</strong> This allowed us to onboard our first 5 dealerships in different tax jurisdictions without rewriting core logic — we simply injected the correct Tax Strategy class.
              </li>
            </ul>

            {/* 6. Live Results */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-green-400" /> 6. Live Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 not-prose">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-green-400 mb-1">5</p>
                <p className="text-sm font-semibold text-white mb-1">Active Dealerships</p>
                <p className="text-xs text-gray-400">Replaced Excel-based workflows across 5 independent dealers.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-blue-400 mb-1">99.9%</p>
                <p className="text-sm font-semibold text-white mb-1">Uptime</p>
                <p className="text-xs text-gray-400">Maintained during business hours via Laravel Cloud auto-scaling.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-purple-400 mb-1">&lt;24h</p>
                <p className="text-sm font-semibold text-white mb-1">Deploy Cycle</p>
                <p className="text-xs text-gray-400">Hotfixes and new lender integrations shipped in under 24 hours.</p>
              </div>
            </div>

            {/* Commentary */}
            <blockquote className="border-l-4 border-blue-500 pl-6 my-10 not-prose">
              <p className="text-lg text-gray-300 italic leading-relaxed">
                "Getting to 'Hello World' is easy. Getting 5 dealerships to trust your software with their revenue is the real test. Using Laravel Cloud allowed us to punch above our weight class on infrastructure, so I could focus entirely on the 'Penny-Perfect' math that earned that trust."
              </p>
              <footer className="mt-3 text-sm text-blue-400 font-semibold">— Mark Ward, Lead Full Stack Engineer</footer>
            </blockquote>

          </div>

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 font-medium transition-colors">
              <FiArrowLeft size={16} />
              Back to Home
            </Link>
            <a href="https://miles.dealertransparency.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold shadow-lg bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 transition-all text-sm">
              Visit Live Platform <FiExternalLink size={14} />
            </a>
          </div>

        </article>
      </main>
    </div>
  );
};

export default MILES;

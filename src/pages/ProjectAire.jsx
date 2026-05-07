import React from 'react';
import { FiArrowLeft, FiCheckCircle, FiCloud, FiDatabase, FiUsers, FiBarChart2, FiCode, FiLayers, FiZap } from 'react-icons/fi';
import { SiLaravel, SiPhp, SiMysql, SiStripe, SiReact } from 'react-icons/si';
import { Link } from 'react-router-dom';

const ProjectAire = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">

          {/* Header */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-400 bg-orange-900/40 px-3 py-1 rounded-full mb-4">Case Study</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-6">ProjectAire</h1>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-300">
              <FiUsers className="text-orange-400" size={14} />
              <strong className="text-white">Role:</strong>&nbsp;Co-Founder &amp; Lead Engineer
            </span>
            <span className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-300">
              <FiCheckCircle className="text-green-400" size={14} />
              <strong className="text-white">Status:</strong>&nbsp;Production
            </span>
          </div>

          {/* Stack icons */}
          <div className="flex flex-wrap items-center gap-4 mb-10 p-4 bg-gray-900/60 rounded-xl border border-gray-800">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold mr-2">Stack</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiLaravel className="text-red-400" size={20} title="Laravel" /> Laravel</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiPhp className="text-indigo-400" size={20} title="PHP" /> PHP 8.2</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiReact className="text-cyan-400" size={20} title="React" /> React</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiMysql className="text-blue-400" size={20} title="MySQL" /> MySQL</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiStripe className="text-purple-400" size={20} title="Stripe" /> Stripe</span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            {/* 1. Executive Summary */}
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
              <FiCode className="text-orange-400" /> 1. Executive Summary
            </h2>
            <p>
              ProjectAire is a construction project management SaaS built to give contractors, project managers, and field teams a unified platform for tracking progress, coordinating collaboration, and surfacing actionable analytics. As Co-Founder and Lead Engineer, I took the product from initial architecture through production launch — designing a system that scales from five-user Starter teams to enterprise organizations with unlimited projects and custom integrations.
            </p>

            {/* 2. The Challenge */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiDatabase className="text-yellow-400" /> 2. The Challenge
            </h2>
            <p>Construction project management carries a distinct set of technical and UX constraints:</p>
            <ul>
              <li>
                <strong className="text-orange-300">Fragmented Visibility:</strong> Project timelines, deliverables, and team communications are scattered across spreadsheets, email threads, and disconnected tools — leaving owners and PMs flying blind.
              </li>
              <li>
                <strong className="text-orange-300">Multi-Tier Access:</strong> A platform serving Starter, Professional, and Enterprise customers must enforce strict plan-based feature gating without code sprawl or messy conditional logic throughout the codebase.
              </li>
              <li>
                <strong className="text-orange-300">Data-Driven Decisions:</strong> Construction leadership needs reliable reporting — budget burn, milestone completion rates, team utilization — not just raw data dumps. Analytics must be meaningful and fast.
              </li>
            </ul>

            {/* 3. Key Architectural Decisions */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiLayers className="text-green-400" /> 3. Key Architectural Decisions
            </h2>

            {/* 3A */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-orange-300 mb-3 flex items-center gap-2">
                <FiLayers className="text-green-400" /> A. Plan-Based Feature Gating with Laravel Middleware
              </h3>
              <p className="text-gray-300 mb-3">
                With three distinct pricing tiers — Starter, Professional, and Enterprise — feature access couldn't be an afterthought scattered across controllers. I centralized it at the middleware layer.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-1">The Problem</p>
                  <p className="text-gray-400 text-sm">
                    Ad-hoc plan checks sprinkled through controller logic lead to inconsistency, missed gates, and a maintenance nightmare as the product evolves.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-1">The Solution</p>
                  <p className="text-gray-400 text-sm mb-2">I implemented a <code className="bg-gray-800 px-1 rounded text-orange-300">PlanGate</code> middleware that resolves the authenticated tenant's active subscription and exposes a clean <code className="bg-gray-800 px-1 rounded text-orange-300">can()</code> helper used consistently across routes, API responses, and frontend feature flags.</p>
                  <ul className="text-gray-400 text-sm space-y-1 list-none pl-0">
                    <li className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} /> Starter: capped at 5 users &amp; 10 projects, enforced at the gate — not scattered through UI components.</li>
                    <li className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} /> Advanced analytics routes are 403'd for Starter plans server-side, not just hidden in CSS.</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-1">Impact</p>
                  <p className="text-gray-400 text-sm">A single source of truth for plan enforcement — adding a new plan or changing a limit requires one file change, not a grep-and-replace across the entire codebase.</p>
                </div>
              </div>
            </div>

            {/* 3B */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-orange-300 mb-3 flex items-center gap-2">
                <FiUsers className="text-blue-400" /> B. Real-Time Collaboration Architecture
              </h3>
              <p className="text-gray-300 mb-3">
                Keeping distributed construction teams aligned means changes to a project — status updates, document uploads, new milestones — must surface instantly for everyone on that project, not on the next page reload.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-1">Decision</p>
                  <p className="text-gray-400 text-sm">Integrated Laravel Broadcasting with a dedicated WebSocket layer to push project-scoped events to connected team members in real-time. Project channels are authorization-gated so only members of a given project receive its events.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-1">Outcome</p>
                  <ul className="text-gray-400 text-sm space-y-1 list-none pl-0">
                    <li className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} /> Document and status changes appear live for all project collaborators.</li>
                    <li className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} /> Authorization-scoped channels prevent cross-project data leakage.</li>
                    <li className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} /> Reduced polling overhead — no repeated API hammering from the React frontend.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3C */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-orange-300 mb-3 flex items-center gap-2">
                <FiBarChart2 className="text-purple-400" /> C. Analytics Pipeline &amp; Reporting Engine
              </h3>
              <p className="text-gray-300 mb-3">
                "Analytics" on a construction platform can't mean slow, full-table aggregations firing on every dashboard load. I designed a dedicated reporting layer to keep the experience snappy at scale.
              </p>
              <ul className="text-gray-400 text-sm space-y-2 list-none pl-0">
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="text-purple-400 mt-0.5 flex-shrink-0" size={14} />
                  <span><strong className="text-white">Pre-Aggregated Snapshots:</strong> A scheduled Laravel job computes key project metrics (milestone velocity, completion %, budget burn) and stores snapshots, so dashboards read from pre-computed rows rather than scanning millions of records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="text-purple-400 mt-0.5 flex-shrink-0" size={14} />
                  <span><strong className="text-white">Plan-Gated Depth:</strong> Starter plans get high-level summaries; Professional and Enterprise unlock drill-down views and exportable reports — all routed through the same <code className="bg-gray-800 px-1 rounded text-orange-300">PlanGate</code> middleware.</span>
                </li>
              </ul>
            </div>

            {/* 4. Tech Stack */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiDatabase className="text-orange-400" /> 4. Tech Stack Strategy
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
                    <td className="px-5 py-4 font-semibold text-orange-300">Backend</td>
                    <td className="px-5 py-4 text-gray-300 flex items-center gap-2"><SiLaravel className="text-red-400" size={16} /> Laravel</td>
                    <td className="px-5 py-4 text-gray-400">Mature ecosystem with first-class support for multi-tenancy, queues, broadcasting, and billing via Cashier.</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-orange-300">Frontend</td>
                    <td className="px-5 py-4 text-gray-300 flex items-center gap-2"><SiReact className="text-cyan-400" size={16} /> React</td>
                    <td className="px-5 py-4 text-gray-400">Component-driven UI for a complex, data-dense dashboard with real-time state requirements.</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-orange-300">Database</td>
                    <td className="px-5 py-4 text-gray-300 flex items-center gap-2"><SiMysql className="text-blue-400" size={16} /> MySQL</td>
                    <td className="px-5 py-4 text-gray-400">Relational integrity for the project → team → milestone → deliverable data hierarchy.</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-orange-300">Billing</td>
                    <td className="px-5 py-4 text-gray-300 flex items-center gap-2"><SiStripe className="text-purple-400" size={16} /> Stripe Cashier</td>
                    <td className="px-5 py-4 text-gray-400">Handles three-tier subscription logic, trial periods, and seat-based upgrades without custom billing infrastructure.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 5. Feature Highlights */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiZap className="text-yellow-400" /> 5. Feature Highlights
            </h2>
            <ul>
              <li>
                <strong className="text-orange-300">Project Tracking:</strong> Real-time milestone boards with progress indicators, timeline views, and deliverable status — giving PMs instant visibility across all active projects.
              </li>
              <li>
                <strong className="text-orange-300">Team Collaboration:</strong> Shared document repositories, threaded communications, and live activity feeds scoped to individual projects, keeping field crews and office staff aligned.
              </li>
              <li>
                <strong className="text-orange-300">Analytics &amp; Reports:</strong> Pre-computed project health snapshots and exportable reports for Professional and Enterprise customers, enabling data-driven decisions without query lag.
              </li>
              <li>
                <strong className="text-orange-300">14-Day Free Trial:</strong> No credit card required onboarding, backed by a Stripe trial period wired directly into the subscription lifecycle — reducing friction for new sign-ups.
              </li>
            </ul>

            {/* 6. Results */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-green-400" /> 6. Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 not-prose">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-orange-400 mb-1">3</p>
                <p className="text-sm font-semibold text-white mb-1">Pricing Tiers</p>
                <p className="text-xs text-gray-400">Starter, Professional &amp; Enterprise — all gated through a single middleware layer.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-blue-400 mb-1">RT</p>
                <p className="text-sm font-semibold text-white mb-1">Real-Time Collaboration</p>
                <p className="text-xs text-gray-400">WebSocket-powered project updates delivered instantly to all team members.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-green-400 mb-1">0→1</p>
                <p className="text-sm font-semibold text-white mb-1">Full Build</p>
                <p className="text-xs text-gray-400">Architecture, development, billing, and launch — end to end.</p>
              </div>
            </div>

            {/* 7. Commentary */}
            <blockquote className="border-l-4 border-orange-500 pl-6 my-10 not-prose">
              <p className="text-lg text-gray-300 italic leading-relaxed">
                "Construction teams deserve software that works the way job sites do — fast decisions, clear ownership, and no ambiguity about who can see what. ProjectAire was built with that constraint at the center of every architectural choice."
              </p>
              <footer className="mt-3 text-sm text-orange-400 font-semibold">— Mark Ward, Co-Founder &amp; Lead Engineer</footer>
            </blockquote>

          </div>

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 font-medium transition-colors">
              <FiArrowLeft size={16} />
              Back to Home
            </Link>
            <a href="https://projectaire.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-2.5 rounded-full text-white font-bold shadow-lg bg-orange-600 hover:bg-orange-700 hover:-translate-y-0.5 transition-all text-sm">
              Visit ProjectAire &rarr;
            </a>
          </div>

        </article>
      </main>
    </div>
  );
};

export default ProjectAire;

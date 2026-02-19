import React from 'react';
import { FiArrowLeft, FiShield, FiCloud, FiDatabase, FiUsers, FiMap, FiCheckCircle, FiCode } from 'react-icons/fi';
import { SiLaravel, SiPhp, SiMysql, SiCloudflare, SiStripe } from 'react-icons/si';
import { Link } from 'react-router-dom';

const CropAide = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">

          {/* Header */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-900/40 px-3 py-1 rounded-full mb-4">Case Study</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-6">CropAide SaaS Platform</h1>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-300">
              <FiUsers className="text-blue-400" size={14} />
              <strong className="text-white">Role:</strong>&nbsp;Lead Architect &amp; Full Stack Engineer
            </span>
            <span className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-300">
              <FiCheckCircle className="text-green-400" size={14} />
              <strong className="text-white">Status:</strong>&nbsp;Public Beta
            </span>
          </div>

          {/* Stack icons */}
          <div className="flex flex-wrap items-center gap-4 mb-10 p-4 bg-gray-900/60 rounded-xl border border-gray-800">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold mr-2">Stack</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiLaravel className="text-red-400" size={20} title="Laravel" /> Laravel 11</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiPhp className="text-indigo-400" size={20} title="PHP" /> PHP 8.2</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiMysql className="text-blue-400" size={20} title="MySQL" /> MySQL</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiCloudflare className="text-orange-400" size={20} title="Cloudflare" /> Cloudflare</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-300"><SiStripe className="text-purple-400" size={20} title="Stripe" /> Stripe</span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            {/* 1. Executive Summary */}
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
              <FiCode className="text-blue-400" /> 1. Executive Summary
            </h2>
            <p>
              CropAide is a multi-tenant SaaS platform designed to modernize agricultural field management. As the Lead Engineer, I architected a system that handles complex data ownership hierarchies (Growers vs. Advisors vs. Dealers) while delivering a mobile-optimized experience for field operations. The project demonstrates a focus on data isolation, scalable media handling, and developer tooling.
            </p>

            {/* 2. The Challenge */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiDatabase className="text-yellow-400" /> 2. The Challenge
            </h2>
            <p>Agricultural software faces unique constraints:</p>
            <ul>
              <li>
                <strong className="text-blue-300">Complex Hierarchies:</strong> Data isn't just "owned" by one user. An Advisor needs access to multiple Growers, while a Grower needs privacy from other Growers.
              </li>
              <li>
                <strong className="text-blue-300">Field Conditions:</strong> Users are often in areas with poor connectivity, requiring a lightweight, responsive interface.
              </li>
              <li>
                <strong className="text-blue-300">Media Heavy:</strong> Field scouting requires uploading high-res photos and videos of crops, which can quickly bloat server storage and bandwidth.
              </li>
            </ul>

            {/* 3. Key Architectural Decisions */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiShield className="text-green-400" /> 3. Key Architectural Decisions
            </h2>
            <p>
              To address these challenges, I made several high-level architectural decisions that prioritize scalability and maintainability:
            </p>

            {/* 3A */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <FiShield className="text-green-400" /> A. Granular Policy-Based Authorization
              </h3>
              <p className="text-gray-300 mb-3">
                Instead of simple role checks, I implemented a strict <strong className="text-white">Policy-Gate system</strong> within Laravel to handle multi-tenant scoping.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-1">The Problem</p>
                  <p className="text-gray-400 text-sm">
                    Standard RBAC (Role-Based Access Control) wasn't enough. An "Advisor" has high-level permissions but only for their specific assigned Growers.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-1">The Solution</p>
                  <p className="text-gray-400 text-sm mb-2">I utilized Laravel Policies to enforce row-level security:</p>
                  <ul className="text-gray-400 text-sm space-y-1 list-none pl-0">
                    <li className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} /> Growers can only edit data they created (<code className="bg-gray-800 px-1 rounded text-blue-300">created_by</code> checks).</li>
                    <li className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} /> Advisors inherit permission over their assigned growers via a pivot table check.</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-1">Impact</p>
                  <p className="text-gray-400 text-sm">Ensures strict data privacy and prevents "tenant leakage" in a multi-user environment.</p>
                </div>
              </div>
            </div>

            {/* 3B */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <FiCloud className="text-orange-400" /> B. Decoupled Media Infrastructure (Cloudflare Images)
              </h3>
              <p className="text-gray-300 mb-3">
                I identified early on that storing field inspection photos on the app server would inevitably lead to scaling issues and slow backups.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-1">Decision</p>
                  <p className="text-gray-400 text-sm">Integrated <strong className="text-orange-300">Cloudflare Images</strong> and <strong className="text-orange-300">Stream</strong> for all user-generated content.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-1">Outcome</p>
                  <ul className="text-gray-400 text-sm space-y-1 list-none pl-0">
                    <li className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} /> Offloaded 100% of media bandwidth from core servers.</li>
                    <li className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} /> Improved load times for mobile users via Cloudflare's CDN.</li>
                    <li className="flex items-start gap-2"><FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} /> Reduced long-term storage costs.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3C */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <FiCode className="text-purple-400" /> C. Prioritizing Developer Experience (DX)
              </h3>
              <p className="text-gray-300 mb-3">
                A senior lead doesn't just write code; they build environments where the team can move fast. I built a suite of custom CLI tools to streamline development:
              </p>
              <ul className="text-gray-400 text-sm space-y-2 list-none pl-0">
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="text-purple-400 mt-0.5 flex-shrink-0" size={14} />
                  <span><strong className="text-white">Automated Seeding:</strong> Created <code className="bg-gray-800 px-1 rounded text-blue-300">create_test_growers.sh</code> and <code className="bg-gray-800 px-1 rounded text-blue-300">create_test_relationships.sh</code> to instantly spin up complex, multi-role user scenarios for QA testing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="text-purple-400 mt-0.5 flex-shrink-0" size={14} />
                  <span><strong className="text-white">Relationship Debugging:</strong> Wrote raw SQL debug scripts to help the team quickly verify complex many-to-many relationships between Advisors and Growers.</span>
                </li>
              </ul>
            </div>

            {/* 4. Tech Stack Strategy */}
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
                    <td className="px-5 py-4 font-semibold text-blue-300">Backend</td>
                    <td className="px-5 py-4 text-gray-300 flex items-center gap-2"><SiLaravel className="text-red-400" size={16} /> Laravel 11</td>
                    <td className="px-5 py-4 text-gray-400">Chosen for its stable ecosystem, strict typing support in PHP 8.2+, and robust queue system.</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-blue-300">Database</td>
                    <td className="px-5 py-4 text-gray-300 flex items-center gap-2"><SiMysql className="text-blue-400" size={16} /> MySQL 8.0</td>
                    <td className="px-5 py-4 text-gray-400">Reliable relational integrity for the complex User &harr; Grower &harr; Field relationships.</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-blue-300">Media</td>
                    <td className="px-5 py-4 text-gray-300 flex items-center gap-2"><SiCloudflare className="text-orange-400" size={16} /> Cloudflare</td>
                    <td className="px-5 py-4 text-gray-400">Enterprise-grade delivery for video/images without managing S3 buckets manually.</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-blue-300">Billing</td>
                    <td className="px-5 py-4 text-gray-300 flex items-center gap-2"><SiStripe className="text-purple-400" size={16} /> Stripe Cashier</td>
                    <td className="px-5 py-4 text-gray-400">Simplified subscription management to handle recurring SaaS revenue models.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 5. Feature Highlight */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiMap className="text-green-400" /> 5. Feature Highlight: The Field Visit Engine
            </h2>
            <p>
              The core of the application is the <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">FieldVisitsController</code>, which I designed to be the "source of truth" for crop health.
            </p>
            <ul>
              <li>
                <strong className="text-blue-300">GPS Integration:</strong> Automatically captures coordinates to map visits to specific field boundaries.
              </li>
              <li>
                <strong className="text-blue-300">Polymorphic Associations:</strong> Designed the database so "Notes" and "Photos" can be attached to Fields, Crops, or Machinery using polymorphic relationships, reducing schema redundancy.
              </li>
            </ul>

            {/* 6. Results */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-green-400" /> 6. Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 not-prose">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-green-400 mb-1">✓</p>
                <p className="text-sm font-semibold text-white mb-1">Beta Launch</p>
                <p className="text-xs text-gray-400">Deployed to production with secure Stripe billing integration.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-blue-400 mb-1">∞</p>
                <p className="text-sm font-semibold text-white mb-1">Scalability</p>
                <p className="text-xs text-gray-400">Infinite horizontal scaling of media assets with zero server performance impact.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
                <p className="text-3xl font-extrabold text-purple-400 mb-1">100%</p>
                <p className="text-sm font-semibold text-white mb-1">Tenant Isolation</p>
                <p className="text-xs text-gray-400">Complete data privacy achieved through the custom policy engine.</p>
              </div>
            </div>

            {/* 7. Lead/Senior Commentary */}
            <blockquote className="border-l-4 border-blue-500 pl-6 my-10 not-prose">
              <p className="text-lg text-gray-300 italic leading-relaxed">
                "Building CropAide wasn't just about CRUD operations; it was about mapping real-world agricultural relationships into a secure digital schema. My focus was on ensuring that as the database grows to millions of records, the permission checks remain fast and the media delivery remains instant."
              </p>
              <footer className="mt-3 text-sm text-blue-400 font-semibold">— Mark Ward, Lead Architect & Full Stack Engineer</footer>
            </blockquote>

          </div>

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 font-medium transition-colors">
              <FiArrowLeft size={16} />
              Back to Home
            </Link>
            <a href="https://cropaide.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-2.5 rounded-full text-white font-bold shadow-lg bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 transition-all text-sm">
              Visit CropAide &rarr;
            </a>
          </div>

        </article>
      </main>
    </div>
  );
};

export default CropAide;

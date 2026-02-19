import React from 'react';
import { FiArrowLeft, FiZap, FiCheckCircle, FiAlertTriangle, FiServer, FiExternalLink } from 'react-icons/fi';
import { SiLaravel, SiAmazon, SiDigitalocean } from 'react-icons/si';
import { Link } from 'react-router-dom';

const LaravelCloud = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">

          {/* Header */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-yellow-400 bg-yellow-900/30 px-3 py-1 rounded-full mb-4">DevOps &amp; Deployment</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">
              Why I Chose Laravel Cloud Over AWS for a Production SaaS
            </h1>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400 text-sm">
            <span>By <strong className="text-gray-200">Mark Ward</strong> &middot; Lead Full Stack Engineer</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiLaravel className="text-red-400" size={16} /> Laravel Cloud</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><FiZap className="text-yellow-400" size={16} /> Zero-Ops</span>
            <span className="text-gray-600">·</span>
            <span className="text-sm text-gray-400">February 4, 2026 &middot; 6 min read</span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            <p>
              Every greenfield SaaS project hits the same infrastructure crossroads: <strong className="text-white">AWS, DigitalOcean, or something newer?</strong> For the MILES Offer Engine — a production automotive deal-desk platform currently running live for 5 dealerships — I chose <strong className="text-yellow-300">Laravel Cloud</strong>, and it was one of the best architectural decisions of the project.
            </p>
            <p>
              Here's the honest reasoning behind that call.
            </p>

            {/* The Traditional Options */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiAlertTriangle className="text-yellow-400" /> The Traditional Options (And Their Hidden Costs)
            </h2>

            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <SiAmazon className="text-orange-400" size={20} />
                  <p className="font-bold text-white">AWS / DigitalOcean</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={13} /> Requires Nginx/Apache configuration</li>
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={13} /> Manual SSL cert renewal</li>
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={13} /> Queue workers require Supervisor config</li>
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={13} /> Scaling requires load balancer setup</li>
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={13} /> Deployments need a CI/CD pipeline built from scratch</li>
                </ul>
              </div>
              <div className="bg-gray-900 border border-yellow-700/50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FiZap className="text-yellow-400" size={20} />
                  <p className="font-bold text-white">Laravel Cloud</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> Zero server configuration</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> Automatic SSL, always</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> Queue workers managed natively</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> Auto-scales on traffic spikes</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> Git-push deploys out of the box</li>
                </ul>
              </div>
            </div>

            <p>
              That list doesn't capture the real hidden cost: <strong className="text-white">developer hours</strong>. Every hour spent wrestling with a Supervisor config or debugging a failed deploy is an hour <em>not</em> spent on the "Penny-Perfect" calculator that dealerships actually care about.
            </p>

            {/* The Context */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiServer className="text-blue-400" /> The Context That Made It the Right Call
            </h2>
            <p>
              MILES isn't a hobby project — it's processing real vehicle deals, real tax calculations, and real contracts for sales teams on active showroom floors. But it's also in an early pilot phase, which means two things are simultaneously true:
            </p>
            <ul>
              <li><strong className="text-white">Reliability is non-negotiable.</strong> A salesperson mid-deal cannot have the app go down.</li>
              <li><strong className="text-white">Speed of iteration is everything.</strong> Dealer feedback needs to become features in hours, not weeks.</li>
            </ul>
            <p>
              AWS can satisfy the first requirement. It struggles with the second at a solo-lead scale — the operational surface area is simply too large. Laravel Cloud was purpose-built for exactly this tension.
            </p>

            {/* The specific wins */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-green-400" /> Three Specific Wins in Production
            </h2>

            <div className="not-prose space-y-4 my-6">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <p className="text-sm font-bold text-blue-300 uppercase tracking-wide mb-2">1. End-of-Month Traffic Spikes</p>
                <p className="text-gray-300 text-sm">Automotive dealerships close a disproportionate number of deals on the last 3 days of each month. Laravel Cloud handled the concurrency surge automatically — no pre-warming, no panic. On AWS, I'd have needed a scheduled scaling policy or an Application Load Balancer to absorb the same spike.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <p className="text-sm font-bold text-blue-300 uppercase tracking-wide mb-2">2. Isolated Tenant Environments</p>
                <p className="text-gray-300 text-sm">Each dealership is a separate tenant. Laravel Cloud's environment isolation gave me strict data separation between tenants as a platform feature, not a hand-rolled config. That's a security guarantee I can explain to a dealer principal in plain English.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <p className="text-sm font-bold text-blue-300 uppercase tracking-wide mb-2">3. Sub-24-Hour Hotfix Loop</p>
                <p className="text-gray-300 text-sm">When a dealer in Washington flagged an edge case in the Luxury Tax calculation on a Friday afternoon, I had a fix in production before they opened on Saturday morning. Git push → automated deploy → done. No SSH, no Forge, no drama.</p>
              </div>
            </div>

            {/* When NOT to use it */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiAlertTriangle className="text-yellow-400" /> When I'd Still Reach for AWS
            </h2>
            <p>
              Laravel Cloud isn't the answer for everything. If MILES ever needs custom VPC peering to a third-party DMS (Dealer Management System), granular IAM roles across a microservices mesh, or raw EC2 compute for video processing, AWS is the right tool. The Platform-as-a-Service tradeoff is real: you gain operational simplicity and lose low-level control.
            </p>
            <p>
              But for a Laravel application that needs to be <strong className="text-white">reliable on day one, scalable by default, and iterable on day two</strong> — Laravel Cloud is currently punching well above its weight class.
            </p>

            {/* Conclusion */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiZap className="text-yellow-400" /> The Senior Engineer's Take
            </h2>
            <p>
              Choosing infrastructure isn't about using the most powerful tool — it's about using the right tool for the current phase of the product. Reaching for a full AWS stack on a 5-dealership pilot would have been resume-driven development. Laravel Cloud let me stay focused on the problem that actually mattered: making the math right on every signed contract.
            </p>
            <p>
              As MILES scales past the pilot phase, that infrastructure decision will be revisited with real data. That's how it should work.
            </p>

            {/* CTA */}
            <div className="not-prose mt-12 bg-gray-900 border border-blue-800/50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-1">See it in context</p>
                <p className="text-gray-300 text-sm">Read the full MILES Offer Engine architecture case study.</p>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <Link
                  to="/case-studies/miles"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow"
                >
                  Read Case Study
                </Link>
                <a
                  href="https://miles.dealertransparency.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-bold text-sm transition-all hover:-translate-y-0.5"
                >
                  Visit Live Platform <FiExternalLink size={14} />
                </a>
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

export default LaravelCloud;

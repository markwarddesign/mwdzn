import React from 'react';
import { FiArrowLeft, FiZap, FiAlertTriangle, FiCheckCircle, FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import { SiLaravel, SiReact, SiTypescript } from 'react-icons/si';
import { Link } from 'react-router-dom';

const LaravelReverb = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">

          {/* Header */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded-full mb-4">Real-Time Architecture</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">
              Killing the Refresh Button: Real-Time Dealership Ops with Laravel Reverb
            </h1>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400 text-sm">
            <span>By <strong className="text-gray-200">Mark Ward</strong> &middot; Lead Software Engineer</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiLaravel className="text-red-400" size={16} /> Laravel Reverb</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiReact className="text-cyan-400" size={16} /> React</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiTypescript className="text-blue-400" size={16} /> TypeScript</span>
            <span className="text-gray-600">·</span>
            <span className="text-sm text-gray-400">February 11, 2026 &middot; 7 min read</span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            <p>
              In the high-pressure environment of an automotive dealership, the <strong className="text-white">"Refresh" button is a liability.</strong>
            </p>
            <p>
              If a Sales Manager approves a price drop on a vehicle, but the Salesperson on the lot doesn't see it for 5 minutes because they haven't refreshed their browser, the deal — and the commission — can vanish.
            </p>
            <p>
              For MILES, our automotive offer engine, "near real-time" wasn't good enough. We needed <strong className="text-white">instant state synchronization across devices</strong>. When a Manager touches a deal, the Salesperson's iPad needs to react immediately.
            </p>
            <p>
              Here is how we achieved <strong className="text-cyan-300">sub-100ms latency</strong> using Laravel Reverb, avoiding the "polling trap" and third-party SaaS costs.
            </p>

            {/* The Problem */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiAlertTriangle className="text-red-400" /> The Problem: The "Stale Data" Risk
            </h2>
            <p>In a standard Request/Response cycle, data is stale the moment it renders.</p>

            <div className="not-prose bg-gray-900 border border-red-800/40 rounded-xl p-6 my-6">
              <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">Without Real-Time Sync</p>
              <div className="space-y-3">
                {[
                  { step: '1', text: 'Salesperson opens an offer — Price is $50,000.' },
                  { step: '2', text: 'Manager (in the office) adjusts the price to $49,500 to close the deal.' },
                  { step: '3', text: 'Salesperson is still looking at $50,000. They present the wrong numbers to the customer. Confusion ensues.' },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${step === '3' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}>{step}</span>
                    <p className={`text-sm ${step === '3' ? 'text-red-300' : 'text-gray-300'}`}>{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700 flex items-start gap-2">
                <FiRefreshCw className="text-yellow-400 mt-0.5 flex-shrink-0" size={14} />
                <p className="text-xs text-gray-400"><strong className="text-yellow-300">Legacy "fix":</strong> Short Polling — a GET request every 5 seconds. This floods your server with empty requests and drains mobile battery life. An architectural dead-end.</p>
              </div>
            </div>

            {/* The Solution */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiZap className="text-cyan-400" /> The Solution: Laravel Reverb
            </h2>
            <p>
              With the release of Laravel 11/12, we gained <strong className="text-white">Laravel Reverb</strong> — a first-party WebSocket server that is fast, scalable, and free of per-message pricing.
            </p>

            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <p className="font-bold text-red-300 mb-2 text-sm">Pusher / Ably</p>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={13} /> Charged per message — punishes success</li>
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={13} /> Third-party dependency &amp; potential outage</li>
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={13} /> Data leaving your infrastructure</li>
                </ul>
              </div>
              <div className="bg-gray-900 border border-cyan-700/50 rounded-xl p-5">
                <p className="font-bold text-cyan-300 mb-2 text-sm">Laravel Reverb</p>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> Self-hosted — infinite scale, zero usage bill</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> First-party Laravel integration, zero config</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> Data stays in your environment</li>
                </ul>
              </div>
            </div>
            <p>
              We deployed Reverb directly alongside our application on <strong className="text-yellow-300">Laravel Cloud</strong>, giving us a fully managed WebSocket layer without touching a server config.
            </p>

            {/* Implementation */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-green-400" /> Implementation
            </h2>

            <h3 className="text-xl font-bold mt-8 mb-3 text-gray-200">1. The Backend: Broadcast Events</h3>
            <p>
              Every significant action in MILES is a <strong className="text-white">Broadcastable Event</strong>. When an offer is updated, we don't just write to the database — we announce it to the channel.
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiLaravel className="text-red-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">app/Events/OfferUpdated.php</span>
              </div>
              <code className="language-php">{`class OfferUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $offer;

    public function __construct(Offer $offer)
    {
        // Only send the essential data payload to keep it lightweight
        $this->offer = $offer->only([
            'id', 'status', 'total_price', 'manager_notes'
        ]);
    }

    /**
     * Private channel so only authorized users on this
     * specific deal can listen.
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('offers.' . $this->offer['id']),
        ];
    }
}`}</code>
            </pre>

            <h3 className="text-xl font-bold mt-8 mb-3 text-gray-200">2. The Frontend: React &amp; Laravel Echo</h3>
            <p>
              On the frontend, we don't just show a "New Notification" toast — we <strong className="text-white">hydrate the state in real-time</strong>. If the price changes, the number on screen physically changes without the user touching anything.
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiTypescript className="text-blue-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">src/hooks/useRealTimeOffer.ts</span>
              </div>
              <code className="language-typescript">{`useEffect(() => {
    if (!offerId) return;

    // Subscribe to the specific offer's private channel
    const channel = window.Echo.private(\`offers.\${offerId}\`);

    channel.listen('OfferUpdated', (e: OfferUpdatedEvent) => {
        // 1. Hydrate local state immediately — no refresh needed
        setOfferState(prevState => ({
            ...prevState,
            ...e.offer
        }));

        // 2. Trigger a non-intrusive notification
        toast.success(
            \`Offer updated by Manager: \${e.offer.manager_notes}\`,
            { icon: '🔔', duration: 4000 }
        );
    });

    // Cleanup: unsubscribe on unmount to prevent memory leaks
    return () => {
        channel.stopListening('OfferUpdated');
    };
}, [offerId]);`}</code>
            </pre>

            {/* The Ah-Ha moment */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiZap className="text-yellow-400" /> The "Ah-Ha" Moment
            </h2>
            <p>The true power of this architecture became clear during our pilot.</p>

            <blockquote className="border-l-4 border-cyan-500 pl-6 my-8 not-prose">
              <p className="text-lg text-gray-300 italic leading-relaxed">
                A Salesperson was walking a customer through a trade-in valuation on a tablet. The customer hesitated on the monthly payment. Without interrupting the conversation, the Sales Manager — watching the deal remotely — slightly bumped the trade-in value.
              </p>
              <p className="text-lg text-gray-300 italic leading-relaxed mt-4">
                Because of Reverb, the numbers on the tablet updated while the customer was looking at it. The payment dropped into their target range, and the deal was signed.
              </p>
              <p className="text-base text-cyan-400 font-semibold mt-4">
                No refresh button. No "Let me run back to the desk." Just seamless, real-time commerce.
              </p>
            </blockquote>

            {/* Conclusion */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-blue-400" /> Conclusion
            </h2>
            <p>
              By leveraging Laravel Reverb, we transformed MILES from a static database interface into a <strong className="text-white">live collaboration tool</strong>. We cut out the latency of communication and created a system that moves as fast as the negotiation itself.
            </p>
            <p>
              The architecture scales naturally — each new dealership gets their own isolated channels, and Reverb running on Laravel Cloud handles the concurrency without any configuration changes. The "Refresh" button is no longer a liability, because it's no longer necessary.
            </p>

            {/* CTA */}
            <div className="not-prose mt-12 bg-gray-900 border border-blue-800/50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-1">See the full architecture</p>
                <p className="text-gray-300 text-sm">Read the complete MILES Offer Engine case study, or visit the live platform.</p>
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

export default LaravelReverb;

import React from 'react';
import { FiArrowLeft, FiZap, FiAlertTriangle, FiCheckCircle, FiExternalLink, FiLayers, FiCpu, FiCode } from 'react-icons/fi';
import { SiReact, SiTypescript, SiRedux } from 'react-icons/si';
import { Link } from 'react-router-dom';

const ZustandMILES = () => {
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
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-900/30 px-3 py-1 rounded-full mb-4">State Management</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">
              Why We Chose Zustand Over Redux for a Real-Time Automotive SaaS
            </h1>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400 text-sm">
            <span>By <strong className="text-gray-200">Mark Ward</strong> &middot; Lead Software Engineer</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiReact className="text-cyan-400" size={16} /> React</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiTypescript className="text-blue-400" size={16} /> TypeScript</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiRedux className="text-purple-400" size={16} /> Zustand</span>
            <span className="text-gray-600">·</span>
            <span className="text-sm text-gray-400">February 18, 2026 &middot; 8 min read</span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            <p>
              When we started building MILES — a real-time automotive offer engine used live on dealership floors — our state management choice mattered more than most projects. We were coordinating <strong className="text-white">live WebSocket updates, complex multi-step form state, and role-based UI rendering</strong>, all in a TypeScript React app where a re-render at the wrong moment could show a customer the wrong price.
            </p>
            <p>
              We evaluated Redux Toolkit, React Context, and Zustand. We shipped with Zustand. Here's why, and exactly how we used it.
            </p>

            {/* Why Not Redux */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiAlertTriangle className="text-red-400" /> Why Not Redux?
            </h2>
            <p>
              Redux isn't bad — it's just a lot. For MILES, the overhead wasn't worth it:
            </p>

            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gray-900 border border-red-800/40 rounded-xl p-5">
                <p className="font-bold text-red-300 mb-3 text-sm flex items-center gap-2"><SiRedux className="text-purple-400" size={14} /> Redux Toolkit</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={13} /> Slices, actions, selectors, thunks — all before you write a single feature</li>
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={13} /> ~15kb+ ecosystem weight</li>
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={13} /> Every state change requires touching multiple files</li>
                  <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={13} /> Selector memoization is a manual discipline, not a default</li>
                </ul>
              </div>
              <div className="bg-gray-900 border border-purple-700/50 rounded-xl p-5">
                <p className="font-bold text-purple-300 mb-3 text-sm flex items-center gap-2"><FiZap size={14} /> Zustand</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> Store, actions, and subscriptions in one file</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> ~2.5kb — practically free</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> Components subscribe only to the slices they need</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> TypeScript inference works without extra ceremony</li>
                </ul>
              </div>
            </div>

            <p>
              Context API was a non-starter for anything that updates frequently. A WebSocket event firing every few seconds re-rendering an entire Context tree is a performance anti-pattern — we'd be putting out fires from day one.
            </p>

            {/* Store Architecture */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiLayers className="text-purple-400" /> Store Architecture
            </h2>
            <p>
              We structured MILES around a domain-sliced store — one store per feature area, composed together at the app level. Here's the core offer store:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiTypescript className="text-blue-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">src/stores/useOfferStore.ts</span>
              </div>
              <code className="language-typescript">{`import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Offer {
  id: string;
  vehicleId: string;
  status: 'pending' | 'approved' | 'declined';
  totalPrice: number;
  tradeInValue: number;
  monthlyPayment: number;
  managerNotes: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

interface OfferStore {
  offer: Offer | null;
  isLoading: boolean;
  error: string | null;
  // Actions
  setOffer: (offer: Offer) => void;
  patchOffer: (patch: Partial<Offer>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useOfferStore = create<OfferStore>()(
  devtools(
    (set) => ({
      offer: null,
      isLoading: false,
      error: null,

      setOffer: (offer) => set({ offer }, false, 'setOffer'),

      // Key pattern: patch only what changed — critical for WebSocket updates
      patchOffer: (patch) =>
        set(
          (state) => ({ offer: state.offer ? { ...state.offer, ...patch } : null }),
          false,
          'patchOffer'
        ),

      setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
      setError: (error) => set({ error }, false, 'setError'),
      reset: () => set({ offer: null, isLoading: false, error: null }, false, 'reset'),
    }),
    { name: 'OfferStore' }
  )
);`}</code>
            </pre>

            <p>
              The <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">patchOffer</code> action is the workhorse here. When a WebSocket event fires with a partial update — say, just the price changed — we don't replace the entire offer object. We merge only what changed. This keeps re-renders surgical.
            </p>

            {/* Selective Subscriptions */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCpu className="text-cyan-400" /> Selective Subscriptions: Preventing Unnecessary Re-Renders
            </h2>
            <p>
              This is where Zustand earns its keep. Instead of subscribing to the whole store, components select <em>only the slice they display</em>:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiTypescript className="text-blue-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">src/components/PriceDisplay.tsx</span>
              </div>
              <code className="language-typescript">{`// ✅ GOOD: Component only re-renders when totalPrice changes
const PriceDisplay = () => {
  const totalPrice = useOfferStore((state) => state.offer?.totalPrice);
  return <span className="price">{formatCurrency(totalPrice)}</span>;
};

// ❌ BAD: Re-renders on ANY offer change — even managerNotes
const PriceDisplay = () => {
  const { offer } = useOfferStore();
  return <span className="price">{formatCurrency(offer?.totalPrice)}</span>;
};`}</code>
            </pre>

            <p>
              For components that need multiple fields, we use Zustand's <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">shallow</code> comparator to avoid the same problem at a higher level:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiTypescript className="text-blue-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">src/components/OfferSummary.tsx</span>
              </div>
              <code className="language-typescript">{`import { shallow } from 'zustand/shallow';

const OfferSummary = () => {
  // Only re-renders if totalPrice OR monthlyPayment changes — not on managerNotes, etc.
  const { totalPrice, monthlyPayment } = useOfferStore(
    (state) => ({
      totalPrice: state.offer?.totalPrice,
      monthlyPayment: state.offer?.monthlyPayment,
    }),
    shallow
  );

  return (
    <div>
      <p>Total: {formatCurrency(totalPrice)}</p>
      <p>Monthly: {formatCurrency(monthlyPayment)}</p>
    </div>
  );
};`}</code>
            </pre>

            {/* WebSocket Integration */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiZap className="text-yellow-400" /> WebSocket Integration
            </h2>
            <p>
              This is the pattern I'm most proud of on MILES. The Zustand store becomes the <strong className="text-white">single source of truth</strong> for real-time data — WebSocket events write to the store, and the UI reacts automatically:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiTypescript className="text-blue-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">src/hooks/useRealTimeOffer.ts</span>
              </div>
              <code className="language-typescript">{`export const useRealTimeOffer = (offerId: string) => {
  const patchOffer = useOfferStore((state) => state.patchOffer);

  useEffect(() => {
    if (!offerId) return;

    const channel = window.Echo.private(\`offers.\${offerId}\`);

    channel.listen('OfferUpdated', (e: OfferUpdatedEvent) => {
      // WebSocket event writes directly to Zustand store.
      // Every subscribed component updates automatically.
      patchOffer({
        totalPrice: e.offer.total_price,
        status: e.offer.status,
        managerNotes: e.offer.manager_notes,
        lastUpdatedBy: e.offer.updated_by,
        lastUpdatedAt: e.offer.updated_at,
      });
    });

    // Clean teardown — no memory leaks
    return () => {
      channel.stopListening('OfferUpdated');
    };
  }, [offerId, patchOffer]);
};`}</code>
            </pre>

            <p>
              Notice what this <em>isn't</em>: there's no component re-fetching the whole offer from the API on every event. No cache invalidation. No loading spinner flash. The store patch is synchronous — the UI updates in the same frame the WebSocket message arrives.
            </p>

            {/* Form State */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCode className="text-green-400" /> Form State with Persistence Middleware
            </h2>
            <p>
              Dealership finance forms are complex — trade-in values, lender selections, rebates, doc fees. Losing that data on a browser refresh is a real UX failure in a high-pressure sales environment. Zustand's <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">persist</code> middleware solved this with three lines:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiTypescript className="text-blue-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">src/stores/useFinanceFormStore.ts</span>
              </div>
              <code className="language-typescript">{`export const useFinanceFormStore = create<FinanceFormStore>()(
  persist(
    devtools(
      (set, get) => ({
        tradeInValue: 0,
        selectedLender: null,
        rebates: [],
        docFee: 399,

        setTradeIn: (value) => set({ tradeInValue: value }),
        addRebate: (rebate) =>
          set((state) => ({ rebates: [...state.rebates, rebate] })),

        // Derived value — computed from current state, not stored
        getMonthlyPayment: () => {
          const { tradeInValue, rebates, docFee } = get();
          const totalRebates = rebates.reduce((sum, r) => sum + r.amount, 0);
          // ... financing calculation logic
          return computeMonthly(tradeInValue, totalRebates, docFee);
        },
      }),
      { name: 'FinanceFormStore' }
    ),
    {
      name: 'miles-finance-form', // localStorage key
      partialize: (state) => ({
        // Only persist the form values — not the actions
        tradeInValue: state.tradeInValue,
        selectedLender: state.selectedLender,
        rebates: state.rebates,
        docFee: state.docFee,
      }),
    }
  )
);`}</code>
            </pre>

            <p>
              If the salesperson's tablet goes to sleep mid-deal and they re-open the browser, their form is exactly where they left it.
            </p>

            {/* Why It Works */}
            <h2 className="text-2xl font-bold mt-10 mb-6 flex items-center gap-2">
              <FiCheckCircle className="text-blue-400" /> Why This Architecture Holds Up
            </h2>

            <div className="not-prose space-y-4 my-6">
              {[
                {
                  icon: <FiLayers className="text-purple-400 flex-shrink-0 mt-0.5" size={18} />,
                  title: 'Predictable state flow',
                  body: 'Actions are explicit functions that transform state. No hidden mutations, no middleware magic you have to debug. The DevTools integration shows every action by name — patchOffer, setLoading, reset — with a full state diff.',
                },
                {
                  icon: <FiCpu className="text-cyan-400 flex-shrink-0 mt-0.5" size={18} />,
                  title: 'Surgical re-renders',
                  body: 'Selective subscriptions and shallow comparison mean a WebSocket event that only touches totalPrice re-renders exactly the components displaying a price. A 30-component page doesn\'t thrash because manager notes changed.',
                },
                {
                  icon: <FiZap className="text-yellow-400 flex-shrink-0 mt-0.5" size={18} />,
                  title: 'Real-time without complexity',
                  body: 'The WebSocket hook writes to the store; the store notifies subscribers. That\'s the entire integration. There\'s no "real-time layer" — it\'s just state management doing its job at the speed of a WebSocket event.',
                },
                {
                  icon: <FiCode className="text-green-400 flex-shrink-0 mt-0.5" size={18} />,
                  title: 'TypeScript works out of the box',
                  body: 'The store type propagates through selectors automatically. Call useOfferStore and your editor knows the shape of every property, with no extra typing boilerplate. On a financial platform, that type safety is non-negotiable.',
                },
                {
                  icon: <FiCheckCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />,
                  title: 'Easy to test',
                  body: 'Zustand stores are just JavaScript objects. Unit testing an action is straightforward — import the store, call the action directly, assert the state. No Provider wrappers, no dispatch mocking.',
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="bg-gray-900 border border-gray-700/60 rounded-xl p-5 flex gap-4">
                  {icon}
                  <div>
                    <p className="font-bold text-gray-100 mb-1">{title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Takeaway */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiZap className="text-purple-400" /> The Takeaway
            </h2>
            <p>
              Zustand isn't the right choice for every project. If you're building something with a large team that needs strict conventions enforced by tooling, Redux Toolkit's structure has real value. But for a product like MILES — fast-moving, real-time, built by a lean team — Zustand's minimal surface area was a genuine competitive advantage. We spent our time on business logic, not boilerplate.
            </p>
            <p>
              The combination of <strong className="text-white">selective subscriptions + shallow comparison + patchOffer</strong> gave us a real-time UI that handles WebSocket events from a live dealership floor without a single unnecessary re-render.
            </p>

            {/* CTA */}
            <div className="not-prose mt-12 bg-gray-900 border border-blue-800/50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-1">See the full architecture</p>
                <p className="text-gray-300 text-sm">Read the complete MILES Offer Engine case study, or explore the real-time integration post.</p>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <Link
                  to="/case-studies/miles"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow"
                >
                  Read Case Study
                </Link>
                <Link
                  to="/thoughts/laravel-reverb"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-bold text-sm transition-all hover:-translate-y-0.5"
                >
                  Real-Time Post <FiExternalLink size={14} />
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

export default ZustandMILES;

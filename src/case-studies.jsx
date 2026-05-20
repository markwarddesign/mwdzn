import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, X } from 'lucide-react';

/* ============================================================================
 * Shared content primitives — Quiet styling used by every case study body
 * ============================================================================ */

export const Section = ({ n, title, children }) => (
  <section className="mt-14 lg:mt-20">
    <header className="flex items-baseline gap-4 mb-6">
      <span className="font-display text-ink-faint text-[clamp(1.5rem,2.4vw,2rem)] leading-none tracking-tighter2">{n}</span>
      <h2 className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.05]">
        {title}
      </h2>
    </header>
    <div className="space-y-5">{children}</div>
  </section>
);

export const P = ({ children }) => (
  <p className="text-[16.5px] leading-[1.7] text-ink-soft measure-tight">{children}</p>
);

export const Lead = ({ children }) => (
  <p className="text-[18px] leading-[1.65] text-ink-soft measure">{children}</p>
);

export const Strong = ({ children }) => <strong className="text-ink font-semibold">{children}</strong>;
export const Code = ({ children }) => (
  <code className="font-mono text-[0.85em] bg-paper-2 border border-rule px-1.5 py-0.5 rounded text-ink-soft">{children}</code>
);

export const Bullets = ({ items }) => (
  <ul className="space-y-3 mt-2 measure-tight">
    {items.map((it, i) => (
      <li key={i} className="flex items-start gap-3 text-[16px] leading-[1.6] text-ink-soft">
        <span className="flex-shrink-0 w-1 h-1 rounded-full bg-ink-faint mt-3" aria-hidden="true" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

export const Compare = ({ before, after }) => (
  <div className="grid sm:grid-cols-2 gap-4 mt-2">
    <div className="tile p-6">
      <div className="meta mb-3 text-ink-quiet">{before.label}</div>
      <ul className="space-y-2.5">
        {before.items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14.5px] leading-[1.55] text-ink-soft">
            <X size={14} className="text-ink-faint flex-shrink-0 mt-1" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="tile p-6 bg-paper-2">
      <div className="meta mb-3 text-ink">{after.label}</div>
      <ul className="space-y-2.5">
        {after.items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14.5px] leading-[1.55] text-ink-soft">
            <Check size={14} className="text-ink flex-shrink-0 mt-1" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const Grid = ({ items }) => (
  <div className="grid sm:grid-cols-2 gap-4 mt-2">
    {items.map((it, i) => (
      <div key={i} className="tile p-5">
        <div className="font-display font-semibold text-ink text-[17px] leading-[1.2] mb-1.5 tracking-tighter2">{it.label}</div>
        <p className="text-[14.5px] leading-[1.55] text-ink-soft">{it.body}</p>
      </div>
    ))}
  </div>
);

export const Decision = ({ title, problem, solution, impact }) => (
  <div className="tile p-6 lg:p-8 mt-2">
    {title && <h3 className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(1.125rem,1.6vw,1.4rem)] leading-[1.2] mb-5">{title}</h3>}
    <div className="space-y-5">
      {problem && (
        <div>
          <div className="meta mb-1.5">Problem</div>
          <p className="text-[15px] leading-[1.6] text-ink-soft">{problem}</p>
        </div>
      )}
      {solution && (
        <div>
          <div className="meta mb-1.5">Solution</div>
          <div className="text-[15px] leading-[1.6] text-ink-soft">{solution}</div>
        </div>
      )}
      {impact && (
        <div>
          <div className="meta mb-1.5">Impact</div>
          <p className="text-[15px] leading-[1.6] text-ink-soft">{impact}</p>
        </div>
      )}
    </div>
  </div>
);

export const StackTable = ({ rows }) => (
  <div className="tile overflow-hidden mt-2">
    <table className="w-full text-[14.5px]">
      <thead>
        <tr className="border-b border-rule bg-paper-2">
          <th className="text-left px-5 py-3 meta">Component</th>
          <th className="text-left px-5 py-3 meta">Choice</th>
          <th className="text-left px-5 py-3 meta">Rationale</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className={i < rows.length - 1 ? 'border-b border-rule' : ''}>
            <td className="px-5 py-4 font-medium text-ink whitespace-nowrap align-top">{r.component}</td>
            <td className="px-5 py-4 text-ink align-top whitespace-nowrap">{r.choice}</td>
            <td className="px-5 py-4 text-ink-soft leading-[1.55] align-top">{r.rationale}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const Stats = ({ items }) => (
  <div className={`grid grid-cols-2 ${items.length === 3 ? 'sm:grid-cols-3' : items.length === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} gap-4 mt-2`}>
    {items.map((it, i) => (
      <div key={i} className="tile p-5 text-center">
        <div className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(1.75rem,3vw,2.5rem)] leading-[1] whitespace-nowrap">{it.k}</div>
        <div className="mt-2 text-[13px] text-ink-quiet leading-snug">{it.v}</div>
      </div>
    ))}
  </div>
);

export const Quote = ({ children, attribution }) => (
  <blockquote className="mt-2 pl-6 border-l-2 border-ink">
    <p className="font-display italic text-ink text-[clamp(1.15rem,1.8vw,1.45rem)] leading-[1.4] tracking-tightish">
      "{children}"
    </p>
    {attribution && <footer className="mt-3 meta">— {attribution}</footer>}
  </blockquote>
);

/* ============================================================================
 * Case study metadata
 * ============================================================================ */

const META = {
  'california-closets': {
    slug: 'california-closets',
    name: 'California Closets',
    tagline: 'Enterprise headless migration',
    intro: 'Migrating a high-traffic national brand from a monolithic WordPress theme to a fully decoupled Next.js architecture — built for performance, localization, and long-term developer velocity.',
    role: 'Technical lead · Third & Grove',
    status: 'Launched September 2025',
    team: 'Up to 7 engineers',
    metric: { k: '200+', v: 'Storybook components' },
    live: 'https://www.californiaclosets.com',
    stack: ['Next.js', 'TypeScript', 'GraphQL', 'WordPress', 'Algolia', 'Storybook', 'GitHub Actions'],
    next: 'miles',
  },
  miles: {
    slug: 'miles',
    name: 'MILES',
    tagline: 'Real-time offer engine for automotive dealers',
    intro: 'A multi-tenant automotive SaaS that replaces legacy dealership spreadsheets with a real-time, reactive offer engine. Currently processing live vehicle offers for five active dealerships at 99.9% uptime.',
    role: 'Co-founder & lead architect · Dealer Transparency',
    status: 'Live · 5 active dealerships',
    team: 'Solo lead, founding team',
    metric: { k: '99.9%', v: 'production uptime' },
    live: 'https://miles.dealertransparency.com',
    stack: ['Laravel 12', 'React 18', 'TypeScript', 'Reverb', 'Zustand', 'MySQL', 'Laravel Cloud'],
    next: 'cropaide',
  },
  cropaide: {
    slug: 'cropaide',
    name: 'CropAide',
    tagline: 'Multi-tenant agricultural SaaS',
    intro: "Modernizing agricultural field management with a multi-tenant platform that handles complex data ownership hierarchies (Growers, Advisors, Dealers) and a mobile-optimized experience for field operations.",
    role: 'Co-founder · solo build',
    status: 'Public beta',
    team: 'Solo',
    metric: { k: '3', v: 'tenant role hierarchies' },
    live: 'https://cropaide.com',
    stack: ['Laravel 11', 'PHP 8.2', 'MySQL', 'Cloudflare', 'Stripe'],
    next: 'projectaire',
  },
  projectaire: {
    slug: 'projectaire',
    name: 'ProjectAire',
    tagline: 'Construction project management SaaS',
    intro: 'A construction project-management SaaS giving contractors, PMs, and field teams a unified platform for tracking progress, coordinating collaboration, and surfacing actionable analytics. Built end-to-end from architecture through production launch.',
    role: 'Co-founder & lead engineer',
    status: 'Live · production',
    team: 'Solo lead, founding team',
    metric: { k: 'XFDF', v: 'multi-user annotation sync' },
    live: 'https://projectaire.app',
    stack: ['Laravel', 'PHP 8.2', 'React', 'MySQL', 'Stripe', 'Apryse'],
    next: 'california-closets',
  },
};

export const CASE_STUDIES = Object.values(META);

/* ============================================================================
 * Bodies
 * ============================================================================ */

function CaliforniaClosetsBody() {
  return (
    <>
      <Section n="01" title="Executive summary">
        <Lead>
          The California Closets digital transformation involved migrating a traditional, monolithic
          WordPress instance to a modern headless architecture — designed to improve performance,
          developer velocity, and deliver a premium, app-like user experience that matches the brand's
          high-end physical products.
        </Lead>
        <P>
          By leveraging Next.js on the frontend and WordPress as a structured CMS, the project shipped
          a scalable, multilingual, high-performance enterprise solution serving millions of visitors
          across North America.
        </P>
        <Compare
          before={{
            label: 'Before — monolithic WordPress',
            items: [
              'Server-side PHP rendering on every request',
              'Theme-based architecture with tight coupling',
              'Minimal type safety — PHP runtime errors',
              'Scalability limited by server CPU',
              'Slow content preview and editing cycles',
            ],
          }}
          after={{
            label: 'After — headless Next.js',
            items: [
              'Hybrid SSG / SSR — pages served from the edge',
              'Component-based, fully decoupled frontend',
              'End-to-end TypeScript + GraphQL type safety',
              'Edge-ready and horizontally scalable',
              'Instant previews via Next.js Preview Mode',
            ],
          }}
        />
      </Section>

      <Section n="02" title="Architecture & foundations">
        <P>
          The core rebuild used <Strong>Next.js with TypeScript</Strong> — a type-safe environment
          that reduces runtime errors and improves maintainability across a distributed team of up
          to seven engineers.
        </P>
        <Grid items={[
          { label: 'Build pipeline', body: 'Tailwind for rapid UI, PostCSS for optimization, Rollup for the shared component package — precise, tree-shakeable bundles.' },
          { label: 'Code standards', body: 'ESLint + Prettier with shared monorepo config — no style drift across contributors.' },
          { label: 'CI / CD', body: 'GitHub Actions handled testing, linting, and deploys on every PR. Branch previews gave the client real-time visibility.' },
          { label: 'Rendering strategy', body: 'SSG for static pages (locations, categories), SSR for dynamic personalization (pricing, availability).' },
        ]} />
      </Section>

      <Section n="03" title="Design system & component library">
        <P>
          A component-first approach bridged the gap between design and implementation. Rather than
          building pages directly, we established a shared component library that served both the
          live Next.js frontend and the WordPress editorial experience.
        </P>
        <Bullets items={[
          <><Strong>Storybook integration:</Strong> 200+ reusable React components (accordions, drawers, navigation, product tiles) built and documented in Storybook, enabling isolated testing before integration.</>,
          <><Strong>Gutenberg mapping:</Strong> WordPress Gutenberg blocks mapped 1:1 to React components via a shared npm package bundled with Rollup. Editors built complex layouts in the CMS that rendered identically on the live site.</>,
          <><Strong>Styling strategy:</Strong> CSS Modules for component-scoped styles, backed by a global design token system in Tailwind. Portable, app-layer-independent.</>,
        ]} />
      </Section>

      <Section n="04" title="Data layer & type safety">
        <P>
          To handle enterprise data requirements, we moved away from REST in favor of GraphQL, with
          full TypeScript coverage from schema to component.
        </P>
        <Bullets items={[
          <><Strong>GraphQL Code Generator:</Strong> TypeScript types generated from the WordPress schema on every build. The schema is the source of truth — no manual typing of API responses.</>,
          <><Strong>Fragment masking:</Strong> Components declared their own data requirements via fragments — each component received only the fields it needed. Less over-fetching, components independently testable.</>,
          <><Strong>State management:</Strong> Custom React Context providers for user sessions, feature flags, localization — no Redux overhead.</>,
        ]} />
      </Section>

      <Section n="05" title="Internationalization">
        <P>
          Serving a North American audience required robust multilingual support across both static
          and dynamic content.
        </P>
        <Bullets items={[
          <><Strong>Locale-aware routing:</Strong> Next.js middleware handled language routing (<Code>/en/</Code> vs <Code>/es/</Code>) with automatic locale detection from headers and geography.</>,
          <><Strong>Dynamic translation system:</Strong> Message files (<Code>en.json</Code>, <Code>es.json</Code>) integrated with the CMS to localize both static UI strings and dynamic content — no code deployments required.</>,
        ]} />
      </Section>

      <Section n="06" title="Analytics & observability">
        <P>
          Enterprise visibility required more than Google Analytics. We implemented a full observability
          stack monitoring both user behavior and system health.
        </P>
        <Grid items={[
          { label: 'Attribution engine', body: 'Custom logic tracked marketing source / medium through the full lead funnel — handling edge cases like incognito users and UTM loss at submission.' },
          { label: 'New Relic', body: 'Core Web Vitals tracking, SSR performance, API latency dashboards. Regressions in TTFB or LCP triggered alerts before users saw them.' },
          { label: 'SEO + service workers', body: 'Dynamic robots.txt and sitemap generation. Service workers enabled offline-ready behavior and aggressive caching.' },
        ]} />
      </Section>

      <Section n="07" title="Outcomes">
        <Stats items={[
          { k: '200+', v: 'reusable components' },
          { k: '7',    v: 'engineers led' },
          { k: 'EN+ES', v: 'locales shipped' },
          { k: 'WCAG', v: 'ADA compliance' },
        ]} />
        <P>
          The headless migration delivered a site that matches the performance expectations of a
          modern SaaS product while remaining fully manageable by a non-technical marketing team.
          New page types are now assembled from existing building blocks in hours instead of days,
          and the shared npm package approach keeps the CMS editing experience in sync with the
          live site.
        </P>
      </Section>
    </>
  );
}

function MilesBody() {
  return (
    <>
      <Section n="01" title="Executive summary">
        <Lead>
          MILES (Modern Integrated Lead Engagement System) is a multi-tenant automotive SaaS designed
          to replace legacy dealership spreadsheets with a real-time, reactive offer engine.
        </Lead>
        <P>
          As lead engineer I architected and deployed a system currently processing live vehicle
          offers for five active dealerships. Running on Laravel Cloud means the infrastructure is
          serverless-scalable without operational overhead — so I can focus on feature iteration
          based on real-time feedback from sales floors.
        </P>
      </Section>

      <Section n="02" title="The challenge">
        <P>
          Automotive sales are high-pressure and fast-paced. A delay in updating a price, or an error
          in a tax calculation, can kill a deal.
        </P>
        <Bullets items={[
          <><Strong>Concurrency:</Strong> Salesperson and manager often view the same offer simultaneously.</>,
          <><Strong>Financial accuracy:</Strong> Penny-perfect calculations required, including regional variables like the Washington State Luxury Tax.</>,
          <><Strong>Reliability:</Strong> The daily driver for five dealerships — downtime means they can't print contracts or close deals.</>,
        ]} />
      </Section>

      <Section n="03" title="Architectural decisions">
        <P>
          To solve these challenges I moved away from a traditional request/response cycle toward
          an <Strong>event-driven, cloud-native architecture</Strong>.
        </P>
        <Decision
          title="A. Infrastructure — Laravel Cloud (zero-ops)"
          problem="We needed enterprise-grade reliability for our pilot dealerships, but didn't want to burn budget on a dedicated DevOps engineer."
          solution={<><Strong>Instant scaling</Strong> for end-of-month rushes, isolated environments for strict tenant data separation, zero-downtime deploys — all without managing Nginx, queues, or workers myself.</>}
          impact="Punched above our weight on infrastructure. Engineering time stayed on the offer engine, not on plumbing."
        />
        <Decision
          title="B. Real-time state — Laravel Reverb"
          problem="In a negotiation, data is stale the moment it loads. A salesperson editing the same offer as their manager couldn't be polling."
          solution="Laravel's native WebSocket server, paired with React and Zustand on the frontend. Private channels scoped per offer, presence channels for who's currently watching."
          impact="When a manager approves a price, the salesperson's screen updates instantly — a Google-Docs-style collaborative experience for deal desks."
        />
        <Decision
          title="C. Type-safe financial logic"
          problem="Handling currency in JavaScript is notoriously error-prone — floating point drift is fine for product totals, fatal for legally-signed offers."
          solution="Strict TypeScript on the frontend offer engine, mirrored by a PHP calculation service on the backend. Strict typing enforced on every financial input."
          impact={<>Offers are <Strong>penny-perfect</Strong> before they're signed.</>}
        />
      </Section>

      <Section n="04" title="Stack">
        <StackTable rows={[
          { component: 'Infrastructure', choice: 'Laravel Cloud',           rationale: 'Serverless environment for zero-downtime deploys and auto-scaling — no DevOps overhead.' },
          { component: 'Backend',        choice: 'Laravel 12',              rationale: 'Latest features including native Reverb WebSockets for real-time syncing.' },
          { component: 'Frontend',       choice: 'React 18 + TypeScript',   rationale: 'Component-based UI for complex interactive forms with type-safe financial logic.' },
          { component: 'State',          choice: 'Zustand',                 rationale: 'Lightweight state management to handle the rapid flux of live offer numbers.' },
          { component: 'Database',       choice: 'MySQL 8',                 rationale: 'ACID compliance for reliable financial transactions.' },
        ]} />
      </Section>

      <Section n="05" title='The "penny-perfect" calculator'>
        <P>
          The core value proposition is the calculation engine. I isolated tax logic into specific{' '}
          <Strong>Strategy classes</Strong> to handle regional variances.
        </P>
        <Bullets items={[
          <><Strong>Strategy pattern:</Strong> The system detects the dealership's region (e.g. WA) and swaps in the <Code>WashingtonLuxuryTaxStrategy</Code>.</>,
          <><Strong>Result:</Strong> Onboarded the first five dealerships in different tax jurisdictions without rewriting core logic — we just injected the correct strategy class.</>,
        ]} />
      </Section>

      <Section n="06" title="Live results">
        <Stats items={[
          { k: '5',     v: 'active dealerships' },
          { k: '99.9%', v: 'production uptime' },
          { k: '<24h',  v: 'hotfix cycle' },
        ]} />
        <Quote attribution="Mark Ward · Lead Engineer, MILES">
          Getting to "hello world" is easy. Getting five dealerships to trust your software with
          their revenue is the real test. Laravel Cloud let us punch above our weight class on
          infrastructure, so I could focus entirely on the penny-perfect math that earned that trust.
        </Quote>
      </Section>
    </>
  );
}

function CropAideBody() {
  return (
    <>
      <Section n="01" title="Executive summary">
        <Lead>
          CropAide is a multi-tenant SaaS platform designed to modernize agricultural field management.
        </Lead>
        <P>
          As lead engineer I architected a system that handles complex data ownership hierarchies
          (Growers vs. Advisors vs. Dealers) while delivering a mobile-optimized experience for
          field operations. The project demonstrates a focus on data isolation, scalable media
          handling, and developer tooling.
        </P>
      </Section>

      <Section n="02" title="The challenge">
        <P>Agricultural software faces unique constraints:</P>
        <Bullets items={[
          <><Strong>Complex hierarchies:</Strong> Data isn't owned by one user. An advisor needs access to multiple growers; a grower needs privacy from other growers.</>,
          <><Strong>Field conditions:</Strong> Users are often in areas with poor connectivity, requiring a lightweight, responsive interface.</>,
          <><Strong>Media heavy:</Strong> Field scouting requires high-res photos and videos of crops, which can quickly bloat server storage and bandwidth.</>,
        ]} />
      </Section>

      <Section n="03" title="Architectural decisions">
        <Decision
          title="A. Granular policy-based authorization"
          problem="Standard RBAC wasn't enough. An advisor has high-level permissions but only for their specific assigned growers."
          solution={
            <>
              Laravel Policies enforcing row-level security:
              <ul className="mt-2 space-y-1.5 list-none pl-0">
                <li className="flex items-start gap-2"><Check size={14} className="text-ink-quiet flex-shrink-0 mt-1.5" /><span>Growers can only edit data they created (<Code>created_by</Code> checks).</span></li>
                <li className="flex items-start gap-2"><Check size={14} className="text-ink-quiet flex-shrink-0 mt-1.5" /><span>Advisors inherit permission over assigned growers via a pivot-table check.</span></li>
              </ul>
            </>
          }
          impact="Strict data privacy, no tenant leakage in a multi-user environment."
        />
        <Decision
          title="B. Decoupled media infrastructure (Cloudflare)"
          problem="Storing field inspection photos on the app server would inevitably lead to scaling issues and slow backups."
          solution="Integrated Cloudflare Images and Stream for all user-generated content."
          impact="Offloaded 100% of media bandwidth from core servers, improved load times for mobile users via Cloudflare's CDN, reduced long-term storage costs."
        />
        <Decision
          title="C. Developer experience"
          problem="A senior lead doesn't just write code — they build environments where the team can move fast."
          solution={<>Custom CLI tools: <Code>create_test_growers.sh</Code> and <Code>create_test_relationships.sh</Code> instantly spin up complex multi-role user scenarios for QA. Raw SQL debug scripts let the team verify complex many-to-many relationships in seconds.</>}
        />
      </Section>

      <Section n="04" title="Stack">
        <StackTable rows={[
          { component: 'Backend',  choice: 'Laravel 11',     rationale: 'Stable ecosystem, strict typing support in PHP 8.2+, robust queue system.' },
          { component: 'Database', choice: 'MySQL 8',        rationale: 'Reliable relational integrity for User → Grower → Field relationships.' },
          { component: 'Media',    choice: 'Cloudflare',     rationale: 'Enterprise-grade delivery for video and images without managing S3 buckets manually.' },
          { component: 'Billing',  choice: 'Stripe Cashier', rationale: 'Subscription management for the recurring SaaS revenue model.' },
        ]} />
      </Section>

      <Section n="05" title="The field-visit engine">
        <P>
          The core of the application is the <Code>FieldVisitsController</Code>, designed as the
          source of truth for crop health.
        </P>
        <Bullets items={[
          <><Strong>GPS integration:</Strong> Automatically captures coordinates to map visits to specific field boundaries.</>,
          <><Strong>Polymorphic associations:</Strong> Notes and photos attach to Fields, Crops, or Machinery via polymorphic relationships — less schema redundancy.</>,
        ]} />
      </Section>

      <Section n="06" title="Results">
        <Stats items={[
          { k: '✓',    v: 'beta launched with Stripe billing' },
          { k: '∞',    v: 'horizontal media scaling' },
          { k: '100%', v: 'tenant isolation enforced' },
        ]} />
        <Quote attribution="Mark Ward · Lead Architect, CropAide">
          Building CropAide wasn't just about CRUD operations. It was about mapping real-world
          agricultural relationships into a secure digital schema, and ensuring that as the database
          grows to millions of records, the permission checks remain fast and the media delivery
          remains instant.
        </Quote>
      </Section>
    </>
  );
}

function ProjectAireBody() {
  return (
    <>
      <Section n="01" title="Executive summary">
        <Lead>
          ProjectAire is a construction project-management SaaS built to give contractors, project
          managers, and field teams a unified platform for tracking progress, coordinating
          collaboration, and surfacing actionable analytics.
        </Lead>
        <P>
          As co-founder and lead engineer, I took the product from initial architecture through
          production launch — designing a system that scales from five-user Starter teams to
          enterprise organizations with unlimited projects and custom integrations.
        </P>
      </Section>

      <Section n="02" title="The challenge">
        <P>Construction project management carries a distinct set of technical and UX constraints:</P>
        <Bullets items={[
          <><Strong>Fragmented visibility:</Strong> Timelines, deliverables, and team communications are scattered across spreadsheets, email threads, and disconnected tools — leaving PMs flying blind.</>,
          <><Strong>Multi-tier access:</Strong> Starter, Professional, and Enterprise customers each need strict plan-based feature gating — without code sprawl or messy conditionals across the codebase.</>,
          <><Strong>Data-driven decisions:</Strong> Leadership needs reliable reporting (budget burn, milestone completion, team utilization), not raw data dumps. Analytics must be meaningful and fast.</>,
        ]} />
      </Section>

      <Section n="03" title="Architectural decisions">
        <Decision
          title="A. Plan-based feature gating via Laravel middleware"
          problem="Ad-hoc plan checks scattered through controller logic lead to inconsistency, missed gates, and a maintenance nightmare as the product evolves."
          solution={<>A <Code>PlanGate</Code> middleware resolves the authenticated tenant's active subscription and exposes a clean <Code>can()</Code> helper used consistently across routes, API responses, and frontend feature flags.</>}
          impact="A single source of truth for plan enforcement. Adding a plan or changing a limit is one file change, not a grep-and-replace across the codebase."
        />
        <Decision
          title="B. Real-time collaboration"
          problem="Keeping distributed construction teams aligned means changes (status updates, document uploads, new milestones) must surface instantly — not on the next page reload."
          solution="Laravel Broadcasting with a dedicated WebSocket layer pushes project-scoped events to connected members. Channels are authorization-gated so only project members receive events."
          impact="Live document and status updates for all collaborators. No cross-project leakage. No polling overhead from the React frontend."
        />
        <Decision
          title="C. Analytics & reporting"
          problem="Analytics on a construction platform can't mean slow, full-table aggregations firing on every dashboard load."
          solution="A scheduled Laravel job pre-computes key project metrics (milestone velocity, completion %, budget burn) and stores snapshots. Dashboards read from pre-computed rows rather than scanning millions of records."
          impact="Snappy dashboards at scale. Starter sees summaries; Professional and Enterprise unlock drill-downs and exports — all routed through the same PlanGate."
        />
      </Section>

      <Section n="04" title="Apryse WebViewer + multi-user annotations">
        <P>
          The hardest piece was three weeks of Apryse WebViewer integration: multi-user PDF
          annotation sync over Reverb broadcasting, XFDF on the wire, and the kind of debugging
          where the merge conflict is on a binary PDF stream.
        </P>
        <Bullets items={[
          <><Strong>License-key plumbing:</Strong> The key lives in server-side config and is passed through Inertia props — never shipped in the public bundle.</>,
          <><Strong>Authenticated <Code>fileUrl</Code>:</Strong> WebViewer fetches PDFs from a URL you provide. That URL is a signed Laravel route streaming from S3 with the correct content-type.</>,
          <><Strong>Read-only mode is two flags:</Strong> <Code>enableReadOnlyMode()</Code> AND hide the tool ribbons. One without the other lets users draw annotations that vanish on reload.</>,
        ]} />
      </Section>

      <Section n="05" title="Stack">
        <StackTable rows={[
          { component: 'Backend',  choice: 'Laravel',        rationale: 'Mature ecosystem with first-class support for multi-tenancy, queues, broadcasting, and billing via Cashier.' },
          { component: 'Frontend', choice: 'React',          rationale: 'Component-driven UI for a complex, data-dense dashboard with real-time state requirements.' },
          { component: 'Database', choice: 'MySQL',          rationale: 'Relational integrity for the project → team → milestone → deliverable hierarchy.' },
          { component: 'Billing',  choice: 'Stripe Cashier', rationale: 'Three-tier subscription logic, trial periods, seat-based upgrades — without custom billing infrastructure.' },
        ]} />
      </Section>

      <Section n="06" title="Results">
        <Stats items={[
          { k: '3',    v: 'pricing tiers, single middleware' },
          { k: 'RT',   v: 'real-time collaboration on WS' },
          { k: '0→1',  v: 'architecture through launch' },
        ]} />
        <Quote attribution="Mark Ward · Co-founder, ProjectAire">
          Construction teams deserve software that works the way job sites do — fast decisions,
          clear ownership, and no ambiguity about who can see what. Every architectural choice
          started from that constraint.
        </Quote>
      </Section>
    </>
  );
}

const BODY_BY_SLUG = {
  'california-closets': CaliforniaClosetsBody,
  miles: MilesBody,
  cropaide: CropAideBody,
  projectaire: ProjectAireBody,
};

/* ============================================================================
 * Page renderer — shared chrome
 * ============================================================================ */

export function CaseStudyPage() {
  const { slug } = useParams();
  const meta = META[slug];
  const Body = BODY_BY_SLUG[slug];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!meta || !Body) {
    return (
      <div className="bg-paper text-ink min-h-screen pt-32 px-6 lg:px-10 max-w-[800px] mx-auto">
        <p className="meta mb-4">Not found</p>
        <h1 className="font-display font-semibold text-ink text-3xl mb-6">No case study at that path.</h1>
        <Link to="/" className="prose-link">Back to home</Link>
      </div>
    );
  }

  const nextMeta = META[meta.next];

  return (
    <article className="bg-paper text-ink min-h-screen pt-14">
      {/* Back link bar */}
      <div className="border-b border-rule">
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 h-14 flex items-center">
          <Link to="/#work" className="inline-flex items-center gap-2 text-[14px] text-ink-quiet hover:text-ink transition-colors">
            <ArrowLeft size={14} /> All work
          </Link>
        </div>
      </div>

      {/* Hero */}
      <header className="max-w-[920px] mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-10 lg:pb-14">
        <div className="meta mb-6">Case study</div>
        <h1 className="font-display font-semibold tracking-tighter3 text-ink text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] mb-5">
          {meta.name}
        </h1>
        <p className="font-display tracking-tightish text-ink-soft text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.3] measure mb-9">
          {meta.tagline}
        </p>

        <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-rule">
          <div className="py-5 pr-5">
            <dt className="meta mb-1.5">Role</dt>
            <dd className="text-[14px] text-ink leading-snug">{meta.role}</dd>
          </div>
          <div className="py-5 px-5 border-l border-rule">
            <dt className="meta mb-1.5">Status</dt>
            <dd className="text-[14px] text-ink leading-snug">{meta.status}</dd>
          </div>
          <div className="py-5 px-5 lg:border-l border-rule border-t lg:border-t-0">
            <dt className="meta mb-1.5">Team</dt>
            <dd className="text-[14px] text-ink leading-snug">{meta.team}</dd>
          </div>
          <div className="py-5 pl-5 border-l border-rule border-t lg:border-t-0">
            <dt className="meta mb-1.5">Highlight</dt>
            <dd className="text-[14px] text-ink leading-snug">
              <span className="font-display font-semibold tracking-tighter2 text-[18px]">{meta.metric.k}</span>
              <span className="text-ink-quiet"> — {meta.metric.v}</span>
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-1.5 items-center">
          <span className="meta mr-2">Stack</span>
          {meta.stack.map((t) => (
            <span key={t} className="meta px-2 py-1 border border-rule rounded-md bg-paper-2 !text-[10px] !tracking-[0.06em]">{t}</span>
          ))}
        </div>

        <div className="mt-6">
          <a
            href={meta.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[14px] text-ink hover:text-accent transition-colors group/cta"
          >
            Visit the live site
            <ArrowUpRight size={14} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </a>
        </div>

        <p className="mt-10 text-[18px] leading-[1.65] text-ink-soft measure">{meta.intro}</p>
      </header>

      <div className="max-w-[920px] mx-auto px-6 lg:px-10 pb-16">
        <Body />
      </div>

      {nextMeta && (
        <div className="border-t border-rule">
          <div className="max-w-[920px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
            <div className="meta mb-3">Next case study</div>
            <Link to={`/case-studies/${nextMeta.slug}`} className="group inline-flex items-baseline gap-4">
              <span className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(1.75rem,3vw,2.5rem)] leading-[1] group-hover:text-accent transition-colors">
                {nextMeta.name}
              </span>
              <ArrowUpRight size={20} className="text-ink-quiet group-hover:text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <p className="mt-3 text-[15px] text-ink-quiet">{nextMeta.tagline}</p>
          </div>
        </div>
      )}
    </article>
  );
}

import React from 'react';
import { FiArrowLeft, FiCheckCircle, FiPackage, FiCode, FiLayers, FiZap, FiExternalLink, FiAlertTriangle } from 'react-icons/fi';
import { SiReact, SiTypescript, SiStorybook, SiNextdotjs } from 'react-icons/si';
import { Link } from 'react-router-dom';

const RollupComponents = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">

          {/* Header */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-pink-400 bg-pink-900/30 px-3 py-1 rounded-full mb-4">Design Systems</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">
              One Package, Two Runtimes: Sharing React Components Between Next.js and WordPress Gutenberg
            </h1>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400 text-sm">
            <span>By <strong className="text-gray-200">Mark Ward</strong> &middot; Lead Software Engineer</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiReact className="text-cyan-400" size={16} /> React</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiTypescript className="text-blue-400" size={16} /> TypeScript</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiStorybook className="text-pink-400" size={16} /> Storybook</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg" alt="WordPress" className="w-4 h-4" />
              Gutenberg
            </span>
            <span className="text-gray-600">·</span>
            <span className="text-sm text-gray-400">January 14, 2026 &middot; 9 min read</span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            <p>
              On the California Closets headless rebuild, we had a problem that sounds simple but bites almost every headless WordPress project: <strong className="text-white">your frontend components and your Gutenberg blocks will diverge</strong>.
            </p>
            <p>
              Without a deliberate architecture, you end up maintaining two separate implementations of the same Button, the same Card, the same Accordion — one in React for the Next.js site and another inside WordPress Gutenberg blocks. They start identical and drift apart. By month three, the editorial preview in the CMS no longer looks like the live site.
            </p>
            <p>
              Here's how we solved it: a <strong className="text-white">shared React component package, bundled with Rollup, consumed by both runtimes</strong>. One source of truth for design, behavior, and markup — live site and CMS in perfect sync.
            </p>

            {/* The Problem */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiAlertTriangle className="text-red-400" /> The Problem: Two Worlds, Same Components
            </h2>
            <p>
              A headless WordPress setup has two distinct JavaScript environments:
            </p>

            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <SiNextdotjs className="text-white" size={16} />
                  <p className="font-bold text-white text-sm">Frontend (Next.js)</p>
                </div>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li>Full React runtime</li>
                  <li>Tailwind CSS available</li>
                  <li>TypeScript, modern bundling</li>
                  <li>Components render for end users</li>
                </ul>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg" alt="WordPress" className="w-4 h-4" />
                  <p className="font-bold text-white text-sm">Editor (Gutenberg)</p>
                </div>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li>React runtime (WordPress-provided)</li>
                  <li>Isolated CSS scope</li>
                  <li>Webpack via @wordpress/scripts</li>
                  <li>Components render in the admin</li>
                </ul>
              </div>
            </div>

            <p>
              Both environments speak React. The insight is that if you package your components correctly, the same JSX can render in both — no duplication required.
            </p>

            {/* The Solution */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiPackage className="text-blue-400" /> The Solution: A Shared Component Package
            </h2>
            <p>
              We created an internal package — <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">@cc/components</code> — that lives as a workspace package in our monorepo. Both the Next.js app and the WordPress theme reference it as a dependency.
            </p>
            <p>
              The key requirements for the package:
            </p>
            <ul>
              <li><strong className="text-white">Peer dependencies only</strong> — React and ReactDOM must not be bundled in. Each consumer provides its own runtime.</li>
              <li><strong className="text-white">ESM + CJS outputs</strong> — Next.js wants ESM. WordPress scripts toolchain is CommonJS. Rollup handles both.</li>
              <li><strong className="text-white">No direct Tailwind dependency</strong> — styles are handled via CSS Modules + design tokens, so Tailwind's JIT compiler in the consumer app picks them up without conflicts.</li>
              <li><strong className="text-white">Named exports</strong> — tree-shakeable. Gutenberg blocks only import what they register.</li>
            </ul>

            {/* Package Structure */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiLayers className="text-purple-400" /> Package Structure
            </h2>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <FiPackage className="text-blue-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">packages/components/</span>
              </div>
              <code className="language-text">{`packages/components/
├── src/
│   ├── components/
│   │   ├── Accordion/
│   │   │   ├── Accordion.tsx
│   │   │   ├── Accordion.module.css
│   │   │   └── Accordion.stories.tsx
│   │   ├── Card/
│   │   └── Button/
│   └── index.ts          ← named exports only
├── rollup.config.js
└── package.json`}</code>
            </pre>

            <p>
              The <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">index.ts</code> is just re-exports. Nothing is a default export — named exports only, for clean tree-shaking:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiTypescript className="text-blue-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">packages/components/src/index.ts</span>
              </div>
              <code className="language-typescript">{`export { Accordion } from './components/Accordion/Accordion';
export type { AccordionProps } from './components/Accordion/Accordion';

export { Card } from './components/Card/Card';
export type { CardProps } from './components/Card/Card';

export { Button } from './components/Button/Button';
export type { ButtonProps } from './components/Button/Button';`}</code>
            </pre>

            {/* Rollup Config */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCode className="text-yellow-400" /> The Rollup Config
            </h2>
            <p>
              This is the critical part. The config produces two outputs — ESM for Next.js and CJS for Gutenberg — and explicitly externalizes React so neither consumer gets a duplicate runtime:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <FiCode className="text-yellow-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">packages/components/rollup.config.js</span>
              </div>
              <code className="language-javascript">{`import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',

  // Critical: do NOT bundle React — each consumer provides its own
  external: ['react', 'react-dom', 'react/jsx-runtime'],

  output: [
    {
      // ESM output for Next.js (import/export)
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      // CJS output for WordPress Gutenberg (@wordpress/scripts uses webpack/CJS)
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],

  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
    }),
    postcss({
      // CSS Modules output alongside JS
      modules: true,
      extract: 'dist/styles.css',
      minimize: true,
    }),
  ],
};`}</code>
            </pre>

            <p>
              The <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">package.json</code> for the component package points consumers to the right output for their bundler:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <FiPackage className="text-blue-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">packages/components/package.json</span>
              </div>
              <code className="language-json">{`{
  "name": "@cc/components",
  "version": "1.0.0",
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "types": "dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js"
    },
    "./styles": "./dist/styles.css"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "sideEffects": ["dist/styles.css"]
}`}</code>
            </pre>

            {/* Consuming in Next.js */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <SiNextdotjs className="text-white" size={20} /> Consuming in Next.js
            </h2>
            <p>
              On the Next.js side, it's a standard import. Because this is a workspace package in the monorepo, no publish step is needed during development:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiTypescript className="text-blue-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">apps/web/components/ProductCard.tsx</span>
              </div>
              <code className="language-typescript">{`import { Card, Button } from '@cc/components';
import '@cc/components/styles';

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
}

export const ProductCard = ({ title, price, imageUrl }: ProductCardProps) => (
  <Card>
    <img src={imageUrl} alt={title} />
    <h3>{title}</h3>
    <p>{formatCurrency(price)}</p>
    <Button variant="primary">Configure</Button>
  </Card>
);`}</code>
            </pre>

            {/* Consuming in Gutenberg */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg" alt="WordPress" className="w-5 h-5" />
              Consuming in Gutenberg Blocks
            </h2>
            <p>
              In the WordPress theme, we register Gutenberg blocks using <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">registerBlockType</code> and pull the <strong className="text-white">exact same React component</strong> from the shared package for the block's <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">edit</code> function — the one that renders in the admin editor:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiTypescript className="text-blue-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">wp-theme/blocks/product-card/index.ts</span>
              </div>
              <code className="language-typescript">{`import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Card, Button } from '@cc/components';
import '@cc/components/styles';
import metadata from './block.json';

registerBlockType(metadata.name, {
  edit: ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();

    return (
      <div {...blockProps}>
        {/* The SAME Card component that renders on the live site */}
        <Card>
          <img src={attributes.imageUrl} alt={attributes.title} />
          <h3>{attributes.title || 'Product Title'}</h3>
          <Button variant="primary">Configure</Button>
        </Card>

        <InspectorControls>
          {/* Block settings sidebar */}
        </InspectorControls>
      </div>
    );
  },

  // The save function returns null — rendering is handled server-side
  // by the Next.js frontend consuming GraphQL from WordPress
  save: () => null,
});`}</code>
            </pre>

            <p>
              The <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">save: () =&gt; null</code> pattern is key for headless. We're not using WordPress to render HTML — we're using it purely as a structured content store. The block's <em>data</em> is saved, and the Next.js frontend decides how to render it. But the editor preview is the real component, so what editors see is exactly what users get.
            </p>

            {/* Dev Workflow */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiZap className="text-cyan-400" /> The Developer Experience Payoff
            </h2>

            <div className="not-prose space-y-4 my-6">
              {[
                {
                  icon: <FiCheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />,
                  title: 'No CMS/frontend drift',
                  body: 'A design change to the Card component is committed once. The next build updates both the editorial preview in WordPress and the live Next.js site simultaneously.',
                },
                {
                  icon: <SiStorybook className="text-pink-400 flex-shrink-0 mt-0.5" size={18} />,
                  title: 'Storybook as the single design review surface',
                  body: 'Designers review components in Storybook. Once approved, those exact components go into production on both runtimes. No separate "block preview" review step needed.',
                },
                {
                  icon: <FiCode className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />,
                  title: 'TypeScript types flow through both consumers',
                  body: 'The component package exports its prop types. Both the Next.js team and the Gutenberg block team get full autocomplete and type checking in their editors, referencing the same interface definition.',
                },
                {
                  icon: <FiPackage className="text-yellow-400 flex-shrink-0 mt-0.5" size={18} />,
                  title: 'Independent versioning when needed',
                  body: 'When the package is eventually published to a private registry, consumers can pin to a specific version and upgrade on their own schedule — decoupling block development from frontend deployment.',
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

            {/* Gotchas */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiAlertTriangle className="text-yellow-400" /> Gotchas to Watch For
            </h2>
            <ul>
              <li>
                <strong className="text-white">CSS specificity in the editor:</strong> Gutenberg injects its own admin styles. You'll need to scope component styles carefully or use higher-specificity selectors to prevent WordPress admin CSS from bleeding into your component previews.
              </li>
              <li>
                <strong className="text-white">WordPress's externals:</strong> Gutenberg's webpack config externalizes <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">react</code> to its own bundled version. Make sure your component package doesn't accidentally inline a conflicting version — the <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">external: ['react', 'react-dom']</code> in the Rollup config is non-negotiable.
              </li>
              <li>
                <strong className="text-white">Server components:</strong> Next.js 13+ App Router Server Components cannot import client-side hooks. Mark any component that uses <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">useState</code> or event handlers with <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">'use client'</code> at the top of the file in the shared package.
              </li>
            </ul>

            {/* Conclusion */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiZap className="text-purple-400" /> The Takeaway
            </h2>
            <p>
              The shared component package approach requires more upfront architecture than just copying components between projects. But on a long-running enterprise engagement like California Closets, it was the decision that aged best. We never had a "the block looks different than the live site" bug. Design review happened in one place. TypeScript kept both teams honest.
            </p>
            <p>
              If you're building a headless WordPress project of any significant size, this architecture is worth the setup cost — and Rollup makes the bundling straightforward once you understand the external/output matrix.
            </p>

            {/* CTA */}
            <div className="not-prose mt-12 bg-gray-900 border border-blue-800/50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-1">See the full project</p>
                <p className="text-gray-300 text-sm">Read the complete California Closets case study for the full architecture picture.</p>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <Link
                  to="/case-studies/california-closets"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow"
                >
                  Read Case Study
                </Link>
                <a
                  href="https://www.californiaclosets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-bold text-sm transition-all hover:-translate-y-0.5"
                >
                  Visit Live Site <FiExternalLink size={14} />
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

export default RollupComponents;

import React from 'react';
import { FiLayers, FiUsers, FiCheckSquare } from 'react-icons/fi';
import { SiStorybook, SiFigma, SiReact } from 'react-icons/si';

const DesignSystem = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="mb-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">The Unseen Value of a Design System</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg mb-8">May 10, 2024 &middot; 5 min read</p>
          <div className="prose prose-invert lg:prose-xl max-w-none">
            <p>
              In the world of product development, speed and consistency are often at odds. Teams are pushed to deliver more, faster, but without a shared language and a common set of building blocks, the result is often a fragmented user experience and a codebase that becomes increasingly difficult to maintain. This is where a design system proves its immense, though often unseen, value.
            </p>
            <div className="flex items-center gap-3 my-6">
              <SiStorybook className="text-fuchsia-400 text-3xl" title="Storybook" />
              <SiFigma className="text-pink-400 text-3xl" title="Figma" />
              <SiReact className="text-cyan-400 text-3xl" title="React" />
            </div>
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2"><FiCheckSquare className="text-green-400" /> Accelerating Development</h2>
            <p>
              With a library of pre-built, pre-tested components, developers can assemble interfaces with speed and confidence. Instead of reinventing the wheel for every new feature, they can pull from a trusted inventory of buttons, forms, and modals. This not only accelerates the development process but also reduces the likelihood of bugs and inconsistencies.
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4"><code className="language-jsx">// Example: Using a Button from a design system
import &#123; Button &#125; from '@acme/design-system';

&lt;Button variant="primary"&gt;Click Me&lt;/Button&gt;
</code></pre>
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2"><FiLayers className="text-pink-400" /> Ensuring Brand Consistency</h2>
            <p>
              A design system enforces brand guidelines at scale. Every color, typeface, and layout is defined and codified, ensuring that every part of the product feels like it belongs to the same family. This consistency builds trust and recognition with users, reinforcing the brand's identity at every touchpoint.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2"><FiUsers className="text-blue-400" /> Empowering Teams</h2>
            <p>
              By providing a clear and comprehensive set of tools and standards, a design system empowers teams to build better products, faster. Designers can focus on solving user problems instead of pixel-pushing, and developers can focus on implementation instead of guesswork. It’s the ultimate source of truth that enables teams to move with autonomy and purpose.
            </p>
          </div>
        </article>
      </main>

    </div>
  );
};

export default DesignSystem;

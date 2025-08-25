import React from 'react';
import { FiArrowLeft, FiGrid, FiUsers, FiRepeat } from 'react-icons/fi';
import { SiWordpress, SiReact } from 'react-icons/si';
import { Link } from 'react-router-dom';

const WordPressGutenberg = () => {
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
          <div className="flex items-center gap-4 mb-4">
            <SiWordpress className="text-blue-400 text-4xl" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">Mastering the Block: Modern WordPress with Gutenberg</h1>
          </div>
          <p className="text-gray-400 text-lg mb-8">June 15, 2024 &middot; 6 min read</p>
          <div className="prose prose-invert lg:prose-xl max-w-none">
            <p>
              The introduction of the Gutenberg block editor in WordPress marked a pivotal shift from a simple content editor to a powerful page builder. For developers, this evolution opens up a new world of possibilities for creating dynamic, structured, and highly customizable user experiences. Mastering Gutenberg is no longer just an option; it's essential for modern WordPress development.
            </p>
            <div className="flex items-center gap-3 my-6">
              <SiWordpress className="text-blue-400 text-3xl" title="WordPress" />
              <SiReact className="text-cyan-400 text-3xl" title="React" />
              <FiGrid className="text-pink-400 text-3xl" title="Blocks" />
            </div>
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2"><FiGrid className="text-pink-400" /> The Power of Custom Blocks</h2>
            <p>
              The true power of Gutenberg lies in the ability to create custom blocks. With a bit of React, you can build bespoke components that empower content creators to build complex layouts with ease and consistency. Imagine creating a custom "Team Member" block with fields for a photo, name, title, and social links. This not only ensures brand consistency but also simplifies the content creation process, reducing the reliance on shortcodes or complex HTML.
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4"><code className="language-jsx">// Example: Registering a custom block in Gutenberg
wp.blocks.registerBlockType('my-plugin/team-member', &#123;
  title: 'Team Member',
  icon: 'groups',
  category: 'widgets',
  edit: function(props) &#123;
    // React component for editing
  &#125;,
  save: function(props) &#123;
    // React component for saving
  &#125;
&#125;);
</code></pre>
            <p>
              At Third & Grove, we've leveraged custom blocks to build everything from intricate product displays to dynamic event calendars, giving our clients unparalleled control over their content without sacrificing design integrity.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2"><FiRepeat className="text-yellow-400" /> Block Patterns and Reusable Blocks</h2>
            <p>
              Beyond single blocks, Gutenberg offers block patterns and reusable blocks. Block patterns are pre-designed layouts composed of multiple blocks, allowing users to quickly scaffold entire sections of a page. Reusable blocks, on the other hand, let you save a block or group of blocks to be used across multiple pages. Any update to a reusable block is instantly reflected everywhere it's used, making it perfect for content like calls-to-action or contact information.
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4"><code className="language-js">// Example: Creating a reusable block pattern
const pattern = &#123;
  name: 'my-plugin/cta-section',
  title: 'Call to Action Section',
  content: '&lt;!-- wp:paragraph --&gt;&lt;p&gt;Ready to get started?&lt;/p&gt;&lt;!-- /wp:paragraph --&gt;',
&#125;;
wp.blocks.registerBlockPattern(pattern.name, pattern);
</code></pre>
            <p>
              By combining these features, you can create a robust and flexible content creation toolkit that empowers your clients and streamlines your development workflow.
            </p>
          </div>
        </article>
      </main>

    </div>
  );
};

export default WordPressGutenberg;

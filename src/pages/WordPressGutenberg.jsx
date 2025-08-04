import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const WordPressGutenberg = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-sm shadow-md border-b border-gray-200 fixed top-0 left-0 z-50">
        <Link to="/" className="flex items-center space-x-3 text-gray-600 hover:text-blue-500 font-medium transition-colors text-base">
          <FiArrowLeft />
          <span>Back to Home</span>
        </Link>
      </nav>
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">Mastering the Block: Modern WordPress with Gutenberg</h1>
          <p className="text-gray-500 text-lg mb-8">June 15, 2024 &middot; 6 min read</p>
          <div className="prose lg:prose-xl max-w-none">
            <p>
              The introduction of the Gutenberg block editor in WordPress marked a pivotal shift from a simple content editor to a powerful page builder. For developers, this evolution opens up a new world of possibilities for creating dynamic, structured, and highly customizable user experiences. Mastering Gutenberg is no longer just an option; it's essential for modern WordPress development.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">The Power of Custom Blocks</h2>
            <p>
              The true power of Gutenberg lies in the ability to create custom blocks. With a bit of React, you can build bespoke components that empower content creators to build complex layouts with ease and consistency. Imagine creating a custom "Team Member" block with fields for a photo, name, title, and social links. This not only ensures brand consistency but also simplifies the content creation process, reducing the reliance on shortcodes or complex HTML.
            </p>
            <p>
              At Third & Grove, we've leveraged custom blocks to build everything from intricate product displays to dynamic event calendars, giving our clients unparalleled control over their content without sacrificing design integrity.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Block Patterns and Reusable Blocks</h2>
            <p>
              Beyond single blocks, Gutenberg offers block patterns and reusable blocks. Block patterns are pre-designed layouts composed of multiple blocks, allowing users to quickly scaffold entire sections of a page. Reusable blocks, on the other hand, let you save a block or group of blocks to be used across multiple pages. Any update to a reusable block is instantly reflected everywhere it's used, making it perfect for content like calls-to-action or contact information.
            </p>
            <p>
              By combining these features, you can create a robust and flexible content creation toolkit that empowers your clients and streamlines your development workflow.
            </p>
          </div>
        </article>
      </main>
      <footer className="bg-gray-50 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Mark Ward. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WordPressGutenberg;

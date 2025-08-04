import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const WPEFaustJS = () => {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">Headless WordPress at Scale with WP Engine, Faust.js, and Atlas</h1>
          <p className="text-gray-500 text-lg mb-8">August 4, 2024 &middot; 8 min read</p>
          <div className="prose lg:prose-xl max-w-none">
            <p>
              For enterprise-level projects, a headless WordPress architecture offers the ultimate in performance, security, and flexibility. WP Engine's Atlas platform, combined with the Faust.js framework, provides a powerful, end-to-end solution for building and deploying headless WordPress sites at scale.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">The Power of Atlas</h2>
            <p>
              Atlas is WP Engine's all-in-one platform for headless WordPress. It combines a high-performance WordPress environment with a Node.js hosting layer for your front-end application. This integrated approach simplifies the complexities of managing a decoupled architecture, providing a seamless developer experience and robust infrastructure.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Faust.js: The Missing Piece</h2>
            <p>
              Faust.js is an open-source framework specifically designed for building headless WordPress sites with React and Next.js. It provides a set of tools and conventions that streamline the process of fetching data from the WordPress GraphQL API, handling previews, and managing authentication. With Faust.js, you can build a feature-rich, data-driven front-end with a fraction of the effort it would take to build from scratch.
            </p>
            <p>
              Our work on the California Closets project is a testament to the power of this stack. By leveraging Atlas and Faust.js, we were able to build a highly performant, scalable, and user-friendly e-commerce experience, all powered by the familiarity and flexibility of WordPress.
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

export default WPEFaustJS;

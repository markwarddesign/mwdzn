import React from 'react';
import { FiArrowLeft, FiServer, FiZap } from 'react-icons/fi';
import { SiWpengine, SiNextdotjs, SiReact } from 'react-icons/si';
import { Link } from 'react-router-dom';

const WPEFaustJS = () => {
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
            <SiWpengine className="text-blue-400 text-4xl" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">Headless WordPress at Scale with WP Engine, Faust.js, and Atlas</h1>
          </div>
          <p className="text-gray-400 text-lg mb-8">August 4, 2024 &middot; 8 min read</p>
          <div className="prose prose-invert lg:prose-xl max-w-none">
            <p>
              For enterprise-level projects, a headless WordPress architecture offers the ultimate in performance, security, and flexibility. WP Engine's Atlas platform, combined with the Faust.js framework, provides a powerful, end-to-end solution for building and deploying headless WordPress sites at scale.
            </p>
            <div className="flex items-center gap-3 my-6">
              <SiWpengine className="text-blue-400 text-3xl" title="WP Engine" />
              <SiReact className="text-cyan-400 text-3xl" title="React" />
              <SiNextdotjs className="text-white text-3xl" title="Next.js" />
              <FiServer className="text-green-400 text-3xl" title="Atlas" />
            </div>
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2"><FiServer className="text-green-400" /> The Power of Atlas</h2>
            <p>
              Atlas is WP Engine's all-in-one platform for headless WordPress. It combines a high-performance WordPress environment with a Node.js hosting layer for your front-end application. This integrated approach simplifies the complexities of managing a decoupled architecture, providing a seamless developer experience and robust infrastructure.
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4"><code className="language-js">// Example: Deploying a Next.js app to Atlas
module.exports = &#123;
  target: 'serverless',
  // ...other config
&#125;
</code></pre>
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2"><FiZap className="text-yellow-400" /> Faust.js: The Missing Piece</h2>
            <p>
              Faust.js is an open-source framework specifically designed for building headless WordPress sites with React and Next.js. It provides a set of tools and conventions that streamline the process of fetching data from the WordPress GraphQL API, handling previews, and managing authentication. With Faust.js, you can build a feature-rich, data-driven front-end with a fraction of the effort it would take to build from scratch.
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4"><code className="language-jsx">// Example: Using FaustProvider in your app
import &#123; FaustProvider &#125; from '@faustjs/next';

&lt;FaustProvider&gt;
  &#123;/* ...your app... */&#125;
&lt;/FaustProvider&gt;
</code></pre>
            <p>
              Our work on the California Closets project is a testament to the power of this stack. By leveraging Atlas and Faust.js, we were able to build a highly performant, scalable, and user-friendly e-commerce experience, all powered by the familiarity and flexibility of WordPress.
            </p>
          </div>
        </article>
      </main>
  
    </div>
  );
};

export default WPEFaustJS;

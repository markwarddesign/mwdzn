import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const DesignSystem = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-sm shadow-md border-b border-gray-200 fixed top-0 left-0 z-50">
        <a href="/" className="flex items-center space-x-3 text-gray-600 hover:text-blue-500 font-medium transition-colors text-base">
          <FiArrowLeft />
          <span>Back to Home</span>
        </a>
      </nav>
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">The Unseen Value of a Design System</h1>
          <p className="text-gray-500 text-lg mb-8">May 10, 2024 &middot; 5 min read</p>
          <div className="prose lg:prose-xl max-w-none">
            <p>
              In the world of product development, speed and consistency are often at odds. Teams are pushed to deliver more, faster, but without a shared language and a common set of building blocks, the result is often a fragmented user experience and a codebase that becomes increasingly difficult to maintain. This is where a design system proves its immense, though often unseen, value.
            </p>
            <p>
              A design system is more than a component library or a style guide; it's the single source of truth that groups all the elements that will allow the teams to design, realize, and develop a product. It's the shared language that bridges the gap between design and engineering, fostering collaboration and alignment.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Accelerating Development</h2>
            <p>
              With a library of pre-built, pre-tested components, developers can assemble interfaces with speed and confidence. Instead of reinventing the wheel for every new feature, they can pull from a trusted inventory of buttons, forms, and modals. This not only accelerates the development process but also reduces the likelihood of bugs and inconsistencies.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Ensuring Brand Consistency</h2>
            <p>
              A design system enforces brand guidelines at scale. Every color, typeface, and layout is defined and codified, ensuring that every part of the product feels like it belongs to the same family. This consistency builds trust and recognition with users, reinforcing the brand's identity at every touchpoint.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Empowering Teams</h2>
            <p>
              By providing a clear and comprehensive set of tools and standards, a design system empowers teams to build better products, faster. Designers can focus on solving user problems instead of pixel-pushing, and developers can focus on implementation instead of guesswork. It’s the ultimate source of truth that enables teams to move with autonomy and purpose.
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

export default DesignSystem;

import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CICD = () => {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">The Power of the Pipeline: CI/CD for Modern Web Development</h1>
          <p className="text-gray-500 text-lg mb-8">July 2, 2024 &middot; 5 min read</p>
          <div className="prose lg:prose-xl max-w-none">
            <p>
              In today's fast-paced development landscape, speed and reliability are paramount. A well-structured Continuous Integration and Continuous Deployment (CI/CD) pipeline is the bedrock of modern web development, enabling teams to ship better products, faster. It's about more than just automation; it's a cultural shift that emphasizes collaboration, quality, and efficiency.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">What is CI/CD?</h2>
            <p>
              Continuous Integration (CI) is the practice of frequently merging code changes from multiple developers into a central repository. Each integration is then automatically verified by a build and a series of automated tests. This process helps to detect integration issues early, preventing them from becoming larger problems down the line.
            </p>
            <p>
              Continuous Deployment (CD) takes this a step further by automatically deploying every change that passes the CI stage to a production environment. This ensures that new features and bug fixes are released to users as quickly as possible, creating a rapid feedback loop.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">The Benefits of a Robust Pipeline</h2>
            <p>
              Implementing a CI/CD pipeline offers numerous benefits. It reduces manual effort and the risk of human error, freeing up developers to focus on what they do best: building great features. It also improves code quality by enforcing automated testing and code standards. Most importantly, it accelerates the delivery of value to your users, giving you a competitive edge.
            </p>
            <p>
              At Third & Grove, our CI/CD pipelines, often powered by GitHub Actions, are the backbone of our projects. They handle everything from linting and testing to building and deploying our applications to platforms like Vercel and WP Engine, ensuring a smooth and reliable development process.
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

export default CICD;

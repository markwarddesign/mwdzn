import React from 'react';
import { FiGitBranch, FiZap, FiCheckCircle } from 'react-icons/fi';
import { SiGithubactions, SiVercel, SiWpengine } from 'react-icons/si';

const CICD = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <main className="flex-1 pt-24">
        <article className="max-w-4xl mx-auto py-12 px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="mb-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">The Power of the Pipeline: CI/CD for Modern Web Development</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg mb-8">July 2, 2024 &middot; 5 min read</p>
          <div className="prose prose-invert lg:prose-xl max-w-none">
            <p>
              In today's fast-paced development landscape, speed and reliability are paramount. A well-structured Continuous Integration and Continuous Deployment (CI/CD) pipeline is the bedrock of modern web development, enabling teams to ship better products, faster. It's about more than just automation; it's a cultural shift that emphasizes collaboration, quality, and efficiency.
            </p>
            <div className="flex items-center gap-3 my-6">
              <SiGithubactions className="text-purple-400 text-3xl" title="GitHub Actions" />
              <FiZap className="text-yellow-400 text-3xl" title="Automation" />
              <SiVercel className="text-white text-3xl" title="Vercel" />
              <SiWpengine className="text-blue-500 text-3xl" title="WP Engine" />
            </div>
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2"><FiZap className="text-yellow-400" /> What is CI/CD?</h2>
            <p>
              <span className="font-bold text-blue-300">Continuous Integration (CI)</span> is the practice of frequently merging code changes from multiple developers into a central repository. Each integration is then automatically verified by a build and a series of automated tests. This process helps to detect integration issues early, preventing them from becoming larger problems down the line.
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4"><code className="language-yaml"># Example GitHub Actions workflow for CI
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
</code></pre>
            <p>
              <span className="font-bold text-green-400">Continuous Deployment (CD)</span> takes this a step further by automatically deploying every change that passes the CI stage to a production environment. This ensures that new features and bug fixes are released to users as quickly as possible, creating a rapid feedback loop.
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4"><code className="language-yaml"># Example deployment step
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        run: npx vercel --prod
</code></pre>
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2"><FiCheckCircle className="text-green-400" /> The Benefits of a Robust Pipeline</h2>
            <ul>
              <li>Reduces manual effort and human error</li>
              <li>Improves code quality with automated testing</li>
              <li>Accelerates delivery of value to users</li>
              <li>Frees up developers to focus on features</li>
            </ul>
            <p>
              At Third & Grove, our CI/CD pipelines, often powered by <span className="font-bold text-purple-300">GitHub Actions</span>, are the backbone of our projects. They handle everything from linting and testing to building and deploying our applications to platforms like <span className="font-bold text-white">Vercel</span> and <span className="font-bold text-blue-400">WP Engine</span>, ensuring a smooth and reliable development process.
            </p>
          </div>
        </article>
      </main>

    </div>
  );
};

export default CICD;

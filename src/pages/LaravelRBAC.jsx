import React from 'react';
import { FiArrowLeft, FiShield, FiAlertTriangle, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { SiLaravel, SiPhp } from 'react-icons/si';
import { Link } from 'react-router-dom';

const LaravelRBAC = () => {
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

          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="mb-4">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-900/40 px-3 py-1 rounded-full mb-4">Backend Architecture</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">
                Escaping RBAC Hell: Managing Multi-Tenant Hierarchies in Laravel
              </h1>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400 text-sm">
            <span>By <strong className="text-gray-200">Mark Ward</strong> &middot; Lead WordPress Engineer &amp; Full Stack Architect</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiLaravel className="text-red-400" size={16} /> Laravel 11</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiPhp className="text-indigo-400" size={16} /> PHP 8.2</span>
            <span className="text-gray-600">·</span>
            <span className="text-sm text-gray-400">January 28, 2026 &middot; 8 min read</span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            <p>
              In standard SaaS applications, permissions are usually binary: you are either an <strong className="text-white">Admin</strong> (can see everything) or a <strong className="text-white">User</strong> (can see your own data).
            </p>
            <p>
              But in the agricultural tech space, reality is rarely that simple.
            </p>
            <p>
              While building <strong className="text-blue-300">CropAide</strong>, a field management platform, I encountered a permission structure that broke the standard mold. We have <strong className="text-green-300">Growers</strong> (who own the land) and <strong className="text-yellow-300">Advisors</strong> (consultants who manage multiple Growers).
            </p>

            {/* Challenge callout */}
            <div className="not-prose bg-gray-900 border border-yellow-700/50 rounded-xl p-6 my-8">
              <h3 className="text-base font-bold text-yellow-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FiAlertTriangle /> The Challenge
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <FiShield className="text-green-400 mt-1 flex-shrink-0" size={16} />
                  <span><strong className="text-white">Growers must be isolated.</strong> They can strictly see only their own fields.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiShield className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                  <span><strong className="text-white">Advisors need "Admin-like" access</strong>, but scoped only to the specific Growers assigned to them.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiShield className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                  <span><strong className="text-white">Dealers need read-only access</strong> to specific equipment data for assigned Growers.</span>
                </li>
              </ul>
            </div>

            <p>
              Here is how I architected a scalable authorization system using <strong className="text-red-300">Laravel Policies</strong> to solve this "Scoped Multi-Tenancy" problem without cluttering our controllers.
            </p>

            {/* Section 1 */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <span className="text-blue-400">1.</span> The Data Model: Beyond Simple Roles
            </h2>
            <p>
              The first step was avoiding the trap of adding a simple <code>parent_id</code> to the User table. An Advisor might support 20 different Growers, and a Grower might hire 3 different Advisors. This is a classic <strong className="text-white">Many-to-Many relationship</strong>.
            </p>
            <p>
              We utilized a <code>grower_user</code> pivot table with a <code>role</code> column. This allows a single User to have different permission levels depending on which "context" (Grower) they are currently viewing.
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <SiPhp className="text-indigo-400" size={14} />
                <span className="text-xs text-gray-500 uppercase tracking-widest">User.php Model</span>
              </div>
              <code className="language-php">{`public function growers()
{
    return $this->belongsToMany(Grower::class)
                ->withPivot('role') // 'advisor', 'dealer', 'staff'
                ->withTimestamps();
}`}</code>
            </pre>

            {/* Section 2 */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <span className="text-red-400">2.</span> The Anti-Pattern: Controller Spaghetti
            </h2>
            <p>
              A junior or mid-level approach often involves checking these relationships directly inside the Controller. It usually looks something like this:
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <FiAlertTriangle className="text-red-400" size={14} />
                <span className="text-xs text-red-400 uppercase tracking-widest">Bad Practice — FieldVisitsController.php</span>
              </div>
              <code className="language-php">{`public function update(Request $request, FieldVisit $visit)
{
    $user = Auth::user();

    // The "If/Else" Spaghetti
    if ($user->role === 'grower' && $visit->user_id !== $user->id) {
        abort(403);
    }
    
    if ($user->role === 'advisor') {
        // Query the database again to see if they are linked?
        if (!$user->growers->contains($visit->grower_id)) {
            abort(403);
        }
    }

    $visit->update($request->all());
}`}</code>
            </pre>

            <div className="not-prose bg-red-950/40 border border-red-800/50 rounded-xl p-5 my-6">
              <p className="text-sm font-bold text-red-400 uppercase tracking-widest mb-3">Why this fails</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={14} /><span><strong className="text-white">Not Reusable:</strong> You have to copy-paste this logic into every single CRUD method (<code className="bg-gray-800 px-1 rounded text-blue-300">show</code>, <code className="bg-gray-800 px-1 rounded text-blue-300">edit</code>, <code className="bg-gray-800 px-1 rounded text-blue-300">delete</code>, <code className="bg-gray-800 px-1 rounded text-blue-300">store</code>).</span></li>
                <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={14} /><span><strong className="text-white">Hard to Test:</strong> Testing complex authorization logic inside a controller is messy.</span></li>
                <li className="flex items-start gap-2"><FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={14} /><span><strong className="text-white">Security Risk:</strong> If a developer forgets this check in just one method, data leaks.</span></li>
              </ul>
            </div>

            {/* Section 3 */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <span className="text-green-400">3.</span> The Solution: Policy-Based Authorization
            </h2>
            <p>
              As a Lead Engineer, my job is to ensure the code creates a <strong className="text-white">"Pit of Success"</strong>—making the right thing the easiest thing to do.
            </p>
            <p>
              I moved all permission logic into a dedicated <strong className="text-red-300">Policy</strong>. This centralizes the business rules. If the rules for an "Advisor" change later, we update it in one place.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-3 text-gray-200">The FieldVisitPolicy</h3>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <FiCheckCircle className="text-green-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">app/Policies/FieldVisitPolicy.php</span>
              </div>
              <code className="language-php">{`public function update(User $user, FieldVisit $visit)
{
    // 1. Super Admins bypass everything
    if ($user->role === 'super_admin') {
        return true;
    }

    // 2. Advisors: Can edit if they are assigned to this specific Grower
    if ($user->role === 'advisor') {
        return $user->growers()
                    ->where('growers.id', $visit->grower_id)
                    ->exists();
    }

    // 3. Growers: Can strictly edit ONLY their own records
    // AND the record must belong to their farm
    return $user->id === $visit->created_by;
}`}</code>
            </pre>

            {/* Section 4 */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <span className="text-blue-400">4.</span> The Result: Clean Controllers
            </h2>
            <p>
              With the logic abstracted away, our Controller returns to doing what it does best: handling the request and returning a response. The authorization is now a single, readable line.
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <FiCheckCircle className="text-green-400" size={14} />
                <span className="text-xs text-green-400 uppercase tracking-widest">Good Practice — FieldVisitsController.php</span>
              </div>
              <code className="language-php">{`public function update(Request $request, FieldVisit $visit)
{
    // This one line runs all the complex logic above
    $this->authorize('update', $visit);

    $visit->update($request->validated());

    return redirect()->route('visits.index');
}`}</code>
            </pre>

            {/* Conclusion */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-blue-400" /> Conclusion
            </h2>
            <p>
              Building for the "Happy Path" is easy. Building for complex, real-world hierarchies requires foresight.
            </p>
            <p>
              By leveraging Laravel's Policy system, we ensured that CropAide is <strong className="text-white">secure by default</strong>. We didn't just write code that works; we built an architecture that protects our users' data integrity as the application scales from ten users to ten thousand.
            </p>

            {/* CTA block */}
            <div className="not-prose mt-12 bg-gray-900 border border-blue-800/50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-1">See it in action</p>
                <p className="text-gray-300 text-sm">Read the full CropAide architecture case study, or visit the live platform.</p>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <Link
                  to="/case-studies/cropaide"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow"
                >
                  Read Case Study
                </Link>
                <a
                  href="https://cropaide.com/"
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

export default LaravelRBAC;

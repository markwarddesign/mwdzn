import React from 'react';
import { FiArrowLeft, FiZap, FiCheckCircle, FiAlertTriangle, FiServer, FiLock, FiBox, FiCode, FiExternalLink } from 'react-icons/fi';
import { SiDocker, SiLaravel, SiGooglecloud, SiNodedotjs } from 'react-icons/si';
import { Link } from 'react-router-dom';

const PdfMicroservice = () => {
  return (
    <div className="post-quiet min-h-screen bg-paper text-ink font-sans pt-14">
      <main className="flex-1 pt-8">
        <article className="max-w-4xl mx-auto py-12 px-6">

          {/* Header */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-yellow-400 bg-yellow-900/30 px-3 py-1 rounded-full mb-4">DevOps &amp; Deployment</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">
              When the Platform Won&rsquo;t Let You Install a Binary: A PDF-Splitting Microservice for Serverless Laravel
            </h1>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400 text-sm">
            <span>By <strong className="text-gray-200">Mark Ward</strong> &middot; Lead Full Stack Engineer</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiLaravel className="text-red-400" size={16} /> Laravel Cloud</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400"><SiGooglecloud className="text-blue-400" size={16} /> Cloud Run</span>
            <span className="text-gray-600">·</span>
            <span className="text-sm text-gray-400">June 8, 2026 &middot; 9 min read</span>
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none">

            <p>
              I was building a &ldquo;Plans&rdquo; feature for a construction management app — upload a multi-page drawing set, and the app splits it into individual sheets you can view, mark up, and link to tasks. The splitting itself is a solved problem: <code className="text-cyan-300">qpdf</code> extracts pages, <code className="text-cyan-300">poppler-utils</code> gives you thumbnails (<code className="text-cyan-300">pdftoppm</code>), page counts (<code className="text-cyan-300">pdfinfo</code>), and text (<code className="text-cyan-300">pdftotext</code>). Four small, battle-tested, open-source binaries. On a normal server you <code className="text-cyan-300">apt-get install qpdf poppler-utils</code> and move on with your life.
            </p>
            <p>
              We deploy on <strong className="text-white">Laravel Cloud</strong>. You cannot <code className="text-cyan-300">apt-get install</code> anything on Laravel Cloud. That one sentence is the whole story, so let me explain why — and how I ended up shipping a tiny container on Cloud Run to do the dirty work.
            </p>

            {/* The thing that doesn't work */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiAlertTriangle className="text-red-400" /> The Thing That Doesn&rsquo;t Work (And Why)
            </h2>
            <p>
              Laravel Cloud builds your app into an immutable Docker image on every deploy and runs it on stateless, ephemeral containers. That&rsquo;s great for the app. It&rsquo;s a brick wall for native dependencies:
            </p>
            <ul>
              <li>There&rsquo;s no <code className="text-cyan-300">Dockerfile</code> you control, so you can&rsquo;t add an <code className="text-cyan-300">apt-get</code> line to the image build.</li>
              <li><code className="text-cyan-300">nixpacks.toml</code> does nothing — Laravel Cloud isn&rsquo;t Nixpacks-based, so the file I hopefully committed was inert.</li>
              <li>Build Commands can run shell, but apt installs don&rsquo;t persist. Anything you write into <code className="text-cyan-300">/usr</code> during the build is gone at runtime, because build and run are different layers. Files written into <code className="text-cyan-300">$HOME</code> survive, so the &ldquo;download a static binary into <code className="text-cyan-300">$HOME/bin</code>&rdquo; trick works for something like ffmpeg (which ships static builds)&hellip; but qpdf and poppler don&rsquo;t ship easy static ARM64 binaries, and trying to extract <code className="text-cyan-300">.deb</code>s by hand turned into a dependency-resolution rabbit hole. (It also turned out the build container has no apt package index and <code className="text-cyan-300">apt-get update</code> isn&rsquo;t usable, which killed that approach outright.)</li>
            </ul>
            <p>So I went looking for a way to do the splitting without native binaries.</p>

            {/* The PHP detour */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCode className="text-yellow-400" /> The &ldquo;Just Use a PHP Library&rdquo; Detour
            </h2>
            <p>
              The tempting answer is &ldquo;do it in PHP, no binaries needed.&rdquo; It doesn&rsquo;t hold up for arbitrary PDFs:
            </p>
            <ul>
              <li><strong className="text-white">setasign/fpdi</strong> can split — but the free version only reads PDF &le; 1.4. Real construction drawings come out of CAD tools as 1.5&ndash;1.7 with object streams, which need FPDI&rsquo;s paid parser add-on.</li>
              <li><strong className="text-white">smalot/pdfparser</strong> is great for reading (page count, text) — it doesn&rsquo;t write, so it can&rsquo;t split.</li>
              <li>Thumbnails need a rasterizer (Ghostscript/Imagick), which is&hellip; another native dependency.</li>
            </ul>
            <p>
              You can get there with a paid FPDI license plus client-side <code className="text-cyan-300">pdf-lib</code> for thumbnails, and that&rsquo;s a legitimate path. But splitting arbitrary modern PDFs is exactly the job native tools are good at and pure-PHP is bad at. I didn&rsquo;t want to fight PDF edge cases forever.
            </p>

            {/* The decision */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiZap className="text-cyan-400" /> The Decision: Isolate the Binaries, Don&rsquo;t Eliminate Them
            </h2>
            <p>
              Here&rsquo;s the reframe that made everything click: the problem isn&rsquo;t qpdf. The problem is running qpdf <em>inside the app&rsquo;s runtime</em>. So don&rsquo;t. Put the native toolchain in a small container I fully control, expose it over HTTP, and have the Laravel app call it.
            </p>
            <p>
              This is just the <a href="https://en.wikipedia.org/wiki/Microservices" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">sidecar / extract-a-service</a> pattern, and it ticks every box that mattered for this project:
            </p>

            <div className="not-prose space-y-4 my-6">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <p className="text-sm font-bold text-cyan-300 uppercase tracking-wide mb-2">Keep the best tool</p>
                <p className="text-gray-300 text-sm">qpdf handles any PDF. No version limits, no licensing.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <p className="text-sm font-bold text-cyan-300 uppercase tracking-wide mb-2">No vendor lock-in, no per-use fees</p>
                <p className="text-gray-300 text-sm">It&rsquo;s my container running open-source binaries — which was the entire reason we were migrating off a commercial PDF SDK in the first place. A managed PDF API would have quietly reintroduced both problems.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <p className="text-sm font-bold text-cyan-300 uppercase tracking-wide mb-2">Data stays in my infrastructure</p>
                <p className="text-gray-300 text-sm">Construction drawings are sensitive; they go to my service, not a third party.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <p className="text-sm font-bold text-cyan-300 uppercase tracking-wide mb-2">It&rsquo;s host-agnostic</p>
                <p className="text-gray-300 text-sm">The app stays on Laravel Cloud. The binaries run wherever containers are allowed. Laravel Cloud&rsquo;s &ldquo;no system binaries&rdquo; rule simply stops being my problem.</p>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <p className="text-sm font-bold text-cyan-300 uppercase tracking-wide mb-2">It&rsquo;s swappable</p>
                <p className="text-gray-300 text-sm">Behind a <code className="text-cyan-300">POST /process</code> contract, I can rewrite the implementation — or even point it at a managed API later — without touching app code.</p>
              </div>
            </div>

            {/* The service */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiBox className="text-cyan-400" /> The Service
            </h2>
            <p>
              It&rsquo;s deliberately small: a Node container with the binaries installed, one endpoint, and S3 for I/O so large files never stream through HTTP.
            </p>
            <p>
              The Dockerfile is the part Laravel Cloud wouldn&rsquo;t let me write — here it&rsquo;s trivial:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4 border border-gray-800">
              <code className="language-dockerfile">{`FROM node:20-slim
RUN apt-get update \\
    && apt-get install -y --no-install-recommends qpdf poppler-utils \\
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]`}</code>
            </pre>

            <p>
              The server does one thing: pull the original from object storage, walk the pages, and for each one extract a single-page PDF, rasterize a thumbnail, and grab the text — then write the artifacts back to storage and return their keys. A shared-secret header keeps it honest.
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4 border border-gray-800">
              <code className="language-javascript">{`app.post('/process', async (req, res) => {
  const { bucket, key, outputPrefix, dpi = 100 } = req.body;
  const work = await mkdtemp(join(tmpdir(), 'pdfsvc-'));
  const original = join(work, 'original.pdf');

  try {
    await downloadToFile(bucket, key, original);
    const count = await pageCount(original);          // pdfinfo
    const pages = [];

    for (let n = 1; n <= count; n++) {
      const pdf = join(work, \`page-\${n}.pdf\`);
      const png = join(work, \`page-\${n}\`);            // pdftoppm appends .png
      const txt = join(work, \`page-\${n}.txt\`);

      await exec('qpdf', ['--warning-exit-0', original, '--pages', '.', \`\${n}-\${n}\`, '--', pdf]);
      await exec('pdftoppm', ['-png', '-r', String(dpi), '-f', \`\${n}\`, '-l', \`\${n}\`, '-singlefile', original, png]);
      await exec('pdftotext', ['-f', \`\${n}\`, '-l', \`\${n}\`, '-layout', original, txt]).catch(() => {});

      const pdfKey = \`\${outputPrefix}/page-\${n}.pdf\`;
      const thumbKey = \`\${outputPrefix}/page-\${n}.png\`;
      await uploadFile(bucket, pdfKey, pdf);
      await uploadFile(bucket, thumbKey, \`\${png}.png\`);
      pages.push({ page: n, pdfKey, thumbKey, text: await readText(txt) });
    }

    res.json({ pageCount: count, pages });
  } finally {
    await rm(work, { recursive: true, force: true });
  }
});`}</code>
            </pre>

            <p>Two design notes that paid off:</p>
            <ul>
              <li><strong className="text-white">S3 in, S3 out.</strong> The request body is tiny — a bucket, a key, an output prefix. A 200&nbsp;MB drawing set never touches the HTTP request. This also dodges request-size and timeout limits.</li>
              <li><strong className="text-white">One call does everything per page.</strong> Download once, then split + thumbnail + text in a single pass. The app keeps the title-detection heuristics in PHP and just consumes the returned text — clean separation of &ldquo;extract bytes&rdquo; (service) from &ldquo;make sense of them&rdquo; (app).</li>
            </ul>

            {/* Deploying to Cloud Run */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <SiGooglecloud className="text-blue-400" /> Deploying to Cloud Run (and the Org-Policy Boss Fight)
            </h2>
            <p>
              Cloud Run is the right host for this: it scales to zero, so a bursty, occasional job costs roughly nothing when idle, and you size memory/timeout for the heavy moments. Deploy is one command from the service directory:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4 border border-gray-800">
              <code className="language-bash">{`gcloud run deploy plans-pdf --source . --region us-central1 \\
  --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 600 --concurrency 4`}</code>
            </pre>

            <p>
              Then reality intervened, in the form of Google Cloud org policies — which, if you&rsquo;re on a company Workspace, are worth knowing about before you start:
            </p>
            <ul>
              <li><code className="text-cyan-300">--allow-unauthenticated</code> silently failed: domain-restricted sharing (<code className="text-cyan-300">iam.allowedPolicyMemberDomains</code>) forbids granting <code className="text-cyan-300">allUsers</code>, so the service stayed private and every request 403&rsquo;d.</li>
              <li>The natural fallback — a service-account key so an external app can mint identity tokens — was also blocked by <code className="text-cyan-300">iam.disableServiceAccountKeyCreation</code>.</li>
            </ul>
            <p>
              Two locked doors. Because it&rsquo;s our own org, the fix was to relax one policy, scoped to this single project so the rest of the org stays locked down:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4 border border-gray-800">
              <code className="language-bash">{`# allow public principals on THIS project only
cat > policy.yaml <<'EOF'
name: projects/PROJECT_ID/policies/iam.allowedPolicyMemberDomains
spec:
  rules:
  - allowAll: true
EOF
gcloud org-policies set-policy policy.yaml

gcloud run services add-iam-policy-binding plans-pdf \\
  --region us-central1 --member="allUsers" --role="roles/run.invoker"`}</code>
            </pre>

            <p>
              &ldquo;Public&rdquo; here just means <em>reachable</em> — the shared secret still guards <code className="text-cyan-300">/process</code>. If your org won&rsquo;t let you touch policy, the alternative is keeping the service private and calling it with a Cloud Run identity token (which needs that SA key, hence the second policy). For a secret-protected internal service, public + secret is a perfectly reasonable trade.
            </p>

            {/* The Laravel side */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <SiLaravel className="text-red-400" /> The Laravel Side
            </h2>
            <p>
              The app change is small and, importantly, non-destructive — the local binary path stays the default so dev machines with qpdf installed keep working untouched. A config block:
            </p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4 border border-gray-800">
              <code className="language-php">{`'service' => [
    'url'    => env('PLANS_PDF_SERVICE_URL'),
    'secret' => env('PLANS_PDF_SERVICE_SECRET'),
    'timeout'=> (int) env('PLANS_PDF_SERVICE_TIMEOUT', 600),
],`}</code>
            </pre>

            <p>A thin client:</p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4 border border-gray-800">
              <code className="language-php">{`public function process(string $bucket, string $key, string $outputPrefix): array
{
    return Http::withHeaders(['X-PDF-Secret' => config('plans.service.secret')])
        ->timeout(config('plans.service.timeout'))
        ->post(rtrim(config('plans.service.url'), '/').'/process', [
            'bucket' => $bucket, 'key' => $key,
            'outputPrefix' => $outputPrefix, 'dpi' => (int) config('plans.thumb_dpi'),
        ])->throw()->json();
}`}</code>
            </pre>

            <p>And one branch in the processor — when the service is configured, offload; otherwise shell out locally:</p>

            <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto my-4 border border-gray-800">
              <code className="language-php">{`private function processPlans(PlanSet $set): void
{
    if (PlanPdfService::enabled()) {
        $this->processPlansRemote($set);   // call the service, build sheets from returned keys
        return;
    }
    // ...existing local qpdf/poppler path (dev fallback)...
}`}</code>
            </pre>

            <p>
              The remote path reads the bucket from the same disk the rest of the app uses, calls the service, and creates each sheet record pointing at the keys the service wrote. The viewer doesn&rsquo;t know or care that a container in another cloud produced the file.
            </p>

            {/* What I'd tell past-me */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-green-400" /> What I&rsquo;d Tell Past-Me
            </h2>
            <ul>
              <li><strong className="text-white">Don&rsquo;t fight the platform; route around it.</strong> I burned real time trying to smuggle binaries into a build that&rsquo;s designed to forbid them. The moment I accepted &ldquo;this work doesn&rsquo;t belong in the app&rsquo;s runtime,&rdquo; the solution got simple.</li>
              <li><strong className="text-white">A microservice is a contract, not a cluster.</strong> This is ~80 lines of Node and a four-line Dockerfile. The value is the <code className="text-cyan-300">POST /process</code> boundary — everything behind it is swappable.</li>
              <li><strong className="text-white">Read your cloud&rsquo;s org policies early.</strong> The two that bit me (no public services, no SA keys) are common in company-managed Google orgs, and they quietly change which deployment patterns are even possible.</li>
              <li><strong className="text-white">&ldquo;Use an API&rdquo; is a values decision, not just a technical one.</strong> A managed PDF API would&rsquo;ve been the least code. It also would&rsquo;ve reintroduced the vendor lock-in and the &ldquo;your customers&rsquo; files leave your infrastructure&rdquo; problem we were explicitly trying to escape. Owning the container kept both.</li>
            </ul>

            <p>
              The result: the app stays serverless and clean, the splitting runs on robust open-source tools I control, drawings never leave my infrastructure, and the whole thing costs about a coffee a month because it sleeps when nobody&rsquo;s uploading.
            </p>

            {/* Stack tags */}
            <div className="not-prose flex flex-wrap items-center gap-2 mt-10">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 bg-gray-900 border border-gray-700 rounded-full px-3 py-1"><SiDocker className="text-blue-400" size={13} /> Docker</span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 bg-gray-900 border border-gray-700 rounded-full px-3 py-1"><SiNodedotjs className="text-green-400" size={13} /> Node</span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 bg-gray-900 border border-gray-700 rounded-full px-3 py-1"><SiGooglecloud className="text-blue-400" size={13} /> Cloud Run</span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 bg-gray-900 border border-gray-700 rounded-full px-3 py-1"><SiLaravel className="text-red-400" size={13} /> Laravel Cloud</span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 bg-gray-900 border border-gray-700 rounded-full px-3 py-1"><FiServer className="text-cyan-400" size={13} /> qpdf / poppler</span>
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

export default PdfMicroservice;

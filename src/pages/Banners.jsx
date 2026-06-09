import React, { useEffect, useMemo, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Non-public banner workshop                                         */
/*  Route: /banners — unlinked, noindex.                               */
/*                                                                     */
/*  Banners are authored as native SVG so:                             */
/*    • previews scale crisply at any size                             */
/*    • one-click PNG export at 2× resolution works (no foreignObject  */
/*      canvas-taint), suitable for LinkedIn / X / GitHub uploads      */
/* ------------------------------------------------------------------ */

const URLS = {
  dev: 'markward.dev',
  portfolio: 'portfolio.markwarddesign.com',
};

const TAGLINE = 'Full-stack engineer & architect';
const STACK_LINE = 'React · TypeScript · Next.js  —  PHP · Laravel';
const STAMP = 'MW · PORTFOLIO — EST. 2010';

const C = {
  paper: '#fcfcfc',
  ink: '#0a0a0a',
  inkSoft: '#2a2a2a',
  inkQuiet: '#5e5e5b',
  rule: '#e3e3e0',
  ruleStrong: '#c9c9c4',
  accent: '#2649c4',
};

const FONTS = {
  display: "Fraunces, Georgia, 'Times New Roman', serif",
  sans: "'Inter Tight', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, 'SF Mono', monospace",
};

/* ===== banner SVGs ================================================== */

const LinkedInSvg = React.forwardRef(({ url }, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1584 396"
    width="1584"
    height="396"
    style={{ display: 'block', maxWidth: '100%', height: 'auto', background: C.paper }}
  >
    <defs>
      <linearGradient id="li-accent" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={C.accent} stopOpacity="0" />
        <stop offset="100%" stopColor={C.accent} stopOpacity="0.06" />
      </linearGradient>
    </defs>
    <rect width="1584" height="396" fill={C.paper} />

    {/* top label row */}
    <circle cx="71" cy="44" r="3.5" fill={C.accent} />
    <text x="86" y="49" fontFamily={FONTS.mono} fontSize="13" letterSpacing="2.34" fill={C.inkQuiet}>
      {STAMP}
    </text>
    <line x1="430" y1="44" x2="1520" y2="44" stroke={C.ruleStrong} strokeWidth="1" />

    {/* accent block under avatar overlap */}
    <rect x="64" y="200" width="232" height="196" fill="url(#li-accent)" />
    <line x1="64" y1="200" x2="64" y2="396" stroke={C.rule} strokeWidth="1" />

    {/* main lockup */}
    <text
      x="336"
      y="230"
      fontFamily={FONTS.display}
      fontWeight="500"
      fontSize="132"
      letterSpacing="-4.62"
      fill={C.ink}
    >
      Mark Ward<tspan fill={C.accent}>.</tspan>
    </text>
    <line x1="336" y1="278" x2="408" y2="278" stroke={C.ruleStrong} strokeWidth="1" />
    <text
      x="426"
      y="285"
      fontFamily={FONTS.sans}
      fontSize="22"
      letterSpacing="-0.22"
      fill={C.inkSoft}
    >
      {TAGLINE}
    </text>

    {/* right column - stack */}
    <text
      x="1520" y="118" textAnchor="end"
      fontFamily={FONTS.mono} fontSize="11" letterSpacing="1.98" fill={C.inkQuiet}
    >STACK</text>
    <text x="1520" y="150" textAnchor="end" fontFamily={FONTS.sans} fontSize="14" fill={C.inkQuiet}>
      React · TS · Next
    </text>
    <text x="1520" y="174" textAnchor="end" fontFamily={FONTS.sans} fontSize="14" fill={C.inkQuiet}>
      PHP · Laravel
    </text>
    <text x="1520" y="198" textAnchor="end" fontFamily={FONTS.sans} fontSize="14" fill={C.inkQuiet}>
      Cloudflare · AWS
    </text>

    {/* bottom-right URL */}
    <text
      x="1520" y="330" textAnchor="end"
      fontFamily={FONTS.mono} fontSize="12" letterSpacing="2.16" fill={C.inkQuiet}
    >PORTFOLIO</text>
    <text x="1520" y="358" textAnchor="end" fontFamily={FONTS.mono} fontSize="22" fill={C.ink}>
      {url}
    </text>
  </svg>
));
LinkedInSvg.displayName = 'LinkedInSvg';

const XSvg = React.forwardRef(({ url }, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1500 500"
    width="1500"
    height="500"
    style={{ display: 'block', maxWidth: '100%', height: 'auto', background: C.paper }}
  >
    <rect width="1500" height="500" fill={C.paper} />

    {/* hairline grid */}
    <line x1="0" y1="60" x2="1500" y2="60" stroke={C.rule} strokeWidth="1" />
    <line x1="0" y1="440" x2="1500" y2="440" stroke={C.rule} strokeWidth="1" />
    <line x1="280" y1="0" x2="280" y2="500" stroke={C.rule} strokeWidth="1" />

    {/* top label */}
    <circle cx="300" cy="36" r="3.5" fill={C.accent} />
    <text x="316" y="41" fontFamily={FONTS.mono} fontSize="12" letterSpacing="2.16" fill={C.inkQuiet}>
      {STAMP}
    </text>

    {/* main lockup */}
    <text
      x="300" y="290"
      fontFamily={FONTS.display} fontWeight="500" fontSize="168"
      letterSpacing="-5.88" fill={C.ink}
    >
      Mark Ward<tspan fill={C.accent}>.</tspan>
    </text>
    <text x="300" y="346" fontFamily={FONTS.sans} fontSize="28" letterSpacing="-0.28" fill={C.inkSoft}>
      {TAGLINE}
    </text>
    <text x="300" y="382" fontFamily={FONTS.mono} fontSize="15" letterSpacing="2.7" fill={C.inkQuiet}>
      {STACK_LINE.toUpperCase()}
    </text>

    {/* bottom-right URL */}
    <text
      x="1436" y="404" textAnchor="end"
      fontFamily={FONTS.mono} fontSize="12" letterSpacing="2.16" fill={C.inkQuiet}
    >PORTFOLIO</text>
    <text x="1436" y="430" textAnchor="end" fontFamily={FONTS.mono} fontSize="24" fill={C.ink}>
      {url}
    </text>
  </svg>
));
XSvg.displayName = 'XSvg';

const GitHubSvg = React.forwardRef(({ url }, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1280 640"
    width="1280"
    height="640"
    style={{ display: 'block', maxWidth: '100%', height: 'auto', background: C.paper }}
  >
    <rect width="1280" height="640" fill={C.paper} />

    {/* inner frame */}
    <rect x="48" y="48" width="1184" height="544" fill="none" stroke={C.rule} strokeWidth="1" />

    {/* top label */}
    <circle cx="600" cy="118" r="3.5" fill={C.accent} />
    <text
      x="614" y="123"
      fontFamily={FONTS.mono} fontSize="13" letterSpacing="2.6" fill={C.inkQuiet}
    >
      {STAMP}
    </text>

    {/* main lockup */}
    <text
      x="640" y="340" textAnchor="middle"
      fontFamily={FONTS.display} fontWeight="500" fontSize="180"
      letterSpacing="-6.3" fill={C.ink}
    >
      Mark Ward<tspan fill={C.accent}>.</tspan>
    </text>
    <line x1="580" y1="384" x2="700" y2="384" stroke={C.ruleStrong} strokeWidth="1" />
    <text
      x="640" y="430" textAnchor="middle"
      fontFamily={FONTS.sans} fontSize="30" letterSpacing="-0.3" fill={C.inkSoft}
    >
      {TAGLINE}
    </text>

    {/* bottom stack + URL */}
    <text
      x="640" y="528" textAnchor="middle"
      fontFamily={FONTS.mono} fontSize="14" letterSpacing="2.8" fill={C.inkQuiet}
    >
      {STACK_LINE.toUpperCase()}
    </text>
    <text
      x="640" y="566" textAnchor="middle"
      fontFamily={FONTS.mono} fontSize="22" fill={C.ink}
    >
      {url}
    </text>
  </svg>
));
GitHubSvg.displayName = 'GitHubSvg';

/* ===== 2× PNG export from a native SVG ============================== */

async function downloadSvgAsPng(svgEl, filename, width, height, dpr = 2) {
  if (!svgEl) return;
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch {}
  }

  /* serialize the live SVG node — already has xmlns */
  const xml = new XMLSerializer().serializeToString(svgEl);
  const svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.decoding = 'sync';
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('SVG failed to load for rasterization.'));
    img.src = svgUrl;
  });

  const canvas = document.createElement('canvas');
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(svgUrl);

  const pngBlob = await new Promise((res) => canvas.toBlob(res, 'image/png', 1));
  const pngUrl = URL.createObjectURL(pngBlob);
  const a = document.createElement('a');
  a.href = pngUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(pngUrl), 1500);
}

/* ===== Frame ======================================================== */

const Frame = ({ width, height, fit, label, dims, filename, children }) => {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  const onDownload = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await downloadSvgAsPng(ref.current, filename, width, height, 2);
    } catch (e) {
      console.error('Banner export failed', e);
      alert(`Export failed: ${e.message}`);
    } finally {
      setBusy(false);
    }
  };

  /* render the SVG at fit width when fit=true; native px when fit=false */
  const previewWidth = fit ? Math.min(width, 960) : width;
  const previewHeight = previewWidth * (height / width);

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[22px] tracking-tighter2 text-ink">{label}</h3>
        <div className="flex items-center gap-4">
          <span className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-quiet">
            {dims}
          </span>
          <button
            type="button"
            onClick={onDownload}
            disabled={busy}
            className="rounded-full border border-ink bg-ink px-4 py-1.5 font-mono text-[12px] tracking-tight text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy ? 'Exporting…' : 'Download 2× PNG'}
          </button>
        </div>
      </div>

      <div className="overflow-auto border border-rule bg-paper-2">
        {/* clone children, passing ref + width/height for preview */}
        {React.cloneElement(children, {
          ref,
          width: previewWidth,
          height: previewHeight,
        })}
      </div>
    </div>
  );
};

/* ===== page ========================================================= */

export default function Banners() {
  const [which, setWhich] = useState('dev');
  const [fit, setFit] = useState(true);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Banners — internal';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
    };
  }, []);

  const url = URLS[which];

  const banners = useMemo(
    () => [
      {
        key: 'linkedin',
        label: 'LinkedIn cover',
        dims: '1584 × 396',
        width: 1584,
        height: 396,
        filename: `mw-linkedin-${which}-2x.png`,
        svg: <LinkedInSvg url={url} />,
      },
      {
        key: 'x',
        label: 'X / Twitter header',
        dims: '1500 × 500',
        width: 1500,
        height: 500,
        filename: `mw-x-${which}-2x.png`,
        svg: <XSvg url={url} />,
      },
      {
        key: 'github',
        label: 'GitHub social preview',
        dims: '1280 × 640',
        width: 1280,
        height: 640,
        filename: `mw-github-${which}-2x.png`,
        svg: <GitHubSvg url={url} />,
      },
    ],
    [url, which]
  );

  return (
    <main className="min-h-screen bg-paper px-6 py-16 md:px-12">
      <div className="mx-auto max-w-[1040px] space-y-12">
        <header className="space-y-4">
          <span className="font-mono uppercase tracking-[0.18em] text-[12px] text-ink-quiet">
            Internal · unlinked
          </span>
          <h1 className="font-display text-[44px] leading-[1] tracking-tighter3 text-ink md:text-[56px]">
            Social banners
          </h1>
          <p className="max-w-[64ch] font-sans text-[16px] leading-relaxed text-ink-soft">
            Editorial covers authored as native SVG. Hit <b>Download 2× PNG</b>{' '}
            to export at twice the platform's pixel size (e.g. 3168×792 for
            LinkedIn) — crisp on every screen, no upload blur. If the export
            uses a serif fallback for Fraunces, switch Preview to{' '}
            <b>1:1</b> and screenshot the on-page SVG instead (it always
            renders with the real site fonts on this page).
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-rule py-5">
          <div className="flex items-center gap-3">
            <span className="font-mono uppercase tracking-[0.18em] text-[12px] text-ink-quiet">URL</span>
            <div className="flex items-center gap-1 rounded-full border border-rule bg-paper-2 p-1">
              {Object.entries(URLS).map(([k, v]) => {
                const active = which === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setWhich(k)}
                    className={`rounded-full px-4 py-1.5 font-mono text-[13px] tracking-tight transition-colors ${
                      active ? 'bg-ink text-paper' : 'text-ink-quiet hover:text-ink'
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono uppercase tracking-[0.18em] text-[12px] text-ink-quiet">Preview</span>
            <div className="flex items-center gap-1 rounded-full border border-rule bg-paper-2 p-1">
              {[
                { k: true, label: 'Fit' },
                { k: false, label: '1:1' },
              ].map((o) => {
                const active = fit === o.k;
                return (
                  <button
                    key={String(o.k)}
                    type="button"
                    onClick={() => setFit(o.k)}
                    className={`rounded-full px-4 py-1.5 font-mono text-[13px] tracking-tight transition-colors ${
                      active ? 'bg-ink text-paper' : 'text-ink-quiet hover:text-ink'
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <section className="space-y-16">
          {banners.map((b) => (
            <Frame
              key={b.key}
              width={b.width}
              height={b.height}
              fit={fit}
              label={b.label}
              dims={b.dims}
              filename={b.filename}
            >
              {b.svg}
            </Frame>
          ))}
        </section>

        <footer className="border-t border-rule pt-6">
          <span className="font-mono normal-case tracking-normal text-[11px] text-ink-quiet">
            <b className="uppercase tracking-[0.18em]">Note —</b> SVG rasterizers
            in some browsers don't share the page's webfont cache, so the
            exported PNG may render Fraunces as a generic serif. The geometry,
            color, and 2× sharpness are exact either way. For pixel-perfect
            Fraunces, use Preview <b>1:1</b> + DevTools "Capture node screenshot"
            on the on-page <span>&lt;svg&gt;</span>.
          </span>
        </footer>
      </div>
    </main>
  );
}

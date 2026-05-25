import React from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi';
import { profile } from '../assistantConfig';

const SectionHeader = ({ n, label, title }) => (
  <header className="mb-6 lg:mb-8">
    <div className="meta mb-2">Section {n} — {label}</div>
    <h2 className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.05]">
      {title}
    </h2>
  </header>
);

const CV = () => {
  const onPrint = () => window.print();

  return (
    <div className="cv-page min-h-screen bg-paper text-ink pt-20 lg:pt-24">
      <article className="max-w-[1080px] mx-auto px-6 lg:px-10 pb-20 lg:pb-28">

        {/* ---------- Header ---------- */}
        <header className="cv-header mb-12 lg:mb-16">
          <div className="meta mb-3">Curriculum Vitae</div>
          <h1 className="font-display font-semibold tracking-tighter2 text-ink text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">
            {profile.name}
          </h1>
          <p className="mt-3 text-[17px] lg:text-[18px] text-ink-soft">
            {profile.title}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-ink-quiet">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-ink transition-colors">
              <FiMail size={14} /> {profile.email}
            </a>
            <a href={profile.linkedin} className="inline-flex items-center gap-2 hover:text-ink transition-colors">
              <FiLinkedin size={14} /> linkedin.com/in/markwarddesign
            </a>
            <a href={profile.github} className="inline-flex items-center gap-2 hover:text-ink transition-colors">
              <FiGithub size={14} /> github.com/markwarddesign
            </a>
            <span className="inline-flex items-center gap-2">
              <FiMapPin size={14} /> {profile.location}
            </span>
          </div>

          <div className="cv-actions mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onPrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-ink text-paper text-[13.5px] hover:bg-accent transition-colors"
            >
              <FiDownload size={14} /> Download PDF
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-rule text-[13.5px] text-ink-soft hover:text-ink hover:border-ink-quiet transition-colors"
            >
              Back to site
            </Link>
          </div>
        </header>

        {/* ---------- Summary ---------- */}
        <section className="mb-12 lg:mb-16">
          <SectionHeader n="01" label="Summary" title="Player-coach lead engineer, 15+ years across the full stack" />
          <div className="measure text-[16px] leading-[1.7] text-ink-soft space-y-4">
            <p>
              Lead software engineer and SaaS architect with 15+ years across the full stack —
              React/TypeScript/Next.js on the front, PHP/Laravel and Node on the back, MySQL and
              Postgres underneath. I've led enterprise headless migrations, run distributed
              engineering teams of 2–10+, and shipped multi-tenant SaaS from MVP to production
              as a fractional CTO. I think architecture is, mostly, a writing problem — if a
              decision can't be written down, it hasn't been made yet.
            </p>
            <p>
              I'm a "player-coach": rigorous code reviews and 1-on-1 mentorship on one side,
              heavy individual contribution on the other. Scope, quality, and the date are a
              real trade-off, and I'm comfortable saying "not this sprint" out loud and in
              writing — early enough for it to matter. The same fundamentals I bring to coaching
              varsity basketball — clear feedback, unblocking the team, mastering the basics —
              translate directly to how I lead engineering.
            </p>
          </div>
        </section>

        {/* ---------- Specialties ---------- */}
        {profile.specialties && profile.specialties.length > 0 && (
          <section className="mb-12 lg:mb-16">
            <SectionHeader n="02" label="Specialties" title="Where I go deep" />
            <ul className="flex flex-wrap gap-2">
              {profile.specialties.map((s) => (
                <li
                  key={s}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-rule text-[13.5px] text-ink-soft"
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---------- Experience ---------- */}
        <section className="mb-12 lg:mb-16">
          <SectionHeader n="03" label="Experience" title="Selected roles" />
          <ol className="space-y-8">
            {profile.experience.map((job) => (
              <li key={`${job.company}-${job.role}`} className="grid lg:grid-cols-12 gap-4 lg:gap-8">
                <div className="lg:col-span-3">
                  <div className="meta">{job.dates}</div>
                  <div className="mt-1 text-[15px] text-ink">{job.company}</div>
                </div>
                <div className="lg:col-span-9">
                  <div className="font-display text-[20px] lg:text-[22px] font-semibold tracking-tighter2 text-ink leading-tight">
                    {job.role}
                  </div>
                  <p className="mt-2 text-[15.5px] leading-[1.65] text-ink-soft">
                    {job.summary.trim()}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- War Stories ---------- */}
        {profile.warStories && profile.warStories.length > 0 && (
          <section className="mb-12 lg:mb-16">
            <SectionHeader n="04" label="War Stories" title="Specific things, specifically solved" />
            <ul className="space-y-4">
              {profile.warStories.map((s) => (
                <li key={s.title} className="grid lg:grid-cols-12 gap-3 lg:gap-8">
                  <div className="lg:col-span-4">
                    <div className="font-display text-[17px] font-semibold tracking-tighter2 text-ink leading-snug">
                      {s.title}
                    </div>
                  </div>
                  <p className="lg:col-span-8 text-[15px] leading-[1.65] text-ink-soft">
                    {s.body.trim().replace(/\s+/g, ' ')}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---------- Selected Projects ---------- */}
        <section className="mb-12 lg:mb-16">
          <SectionHeader n="05" label="Selected Projects" title="Things I've shipped" />
          <ul className="grid md:grid-cols-2 gap-4 lg:gap-5">
            {profile.featuredProjects.map((p) => (
              <li key={p.name} className="tile p-5 lg:p-6">
                <div className="meta mb-2">{p.role}</div>
                <div className="font-display text-[18px] font-semibold tracking-tighter2 text-ink leading-tight">
                  {p.name}
                </div>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-soft">
                  {p.highlights}
                </p>
                <div className="mt-3 meta !text-[10.5px]">{p.stack}</div>
                {p.caseStudy && (
                  <Link to={p.caseStudy} className="mt-3 inline-block text-[13px] text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                    Read case study →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Skills ---------- */}
        <section className="mb-12 lg:mb-16">
          <SectionHeader n="06" label="Stack" title="Tools of the trade" />
          <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
            {Object.entries(profile.skills).map(([cat, items]) => (
              <div key={cat}>
                <dt className="meta mb-2">{cat}</dt>
                <dd className="text-[14.5px] leading-[1.65] text-ink-soft">
                  {items.join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------- Education ---------- */}
        <section className="mb-12 lg:mb-16">
          <SectionHeader n="07" label="Education" title="Schooling & self-direction" />
          <ul className="space-y-5">
            {profile.education.map((ed) => (
              <li key={ed.institution} className="grid lg:grid-cols-12 gap-4 lg:gap-8">
                <div className="lg:col-span-3 meta">{ed.institution}</div>
                <div className="lg:col-span-9">
                  <div className="text-[15.5px] text-ink">{ed.degree}</div>
                  {ed.notes && (
                    <p className="mt-1 text-[14.5px] leading-[1.6] text-ink-quiet">{ed.notes}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Footer / contact ---------- */}
        <section className="border-t border-rule pt-8 lg:pt-10 space-y-3">
          <p className="text-[15px] text-ink-soft">
            Open to {profile.targetRoles.slice(0, 3).join(', ')} roles. Write me at{' '}
            <a href={`mailto:${profile.email}`} className="text-accent underline decoration-accent/40 underline-offset-[5px] hover:decoration-accent">
              {profile.email}
            </a>.
          </p>
          {profile.targetDomains && (
            <p className="text-[14px] text-ink-quiet">
              <span className="meta mr-2">Domains</span>
              {profile.targetDomains.join(' · ')}
            </p>
          )}
        </section>

      </article>
    </div>
  );
};

export default CV;

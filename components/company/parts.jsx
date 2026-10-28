import { ChevronRight } from 'lucide-react';
import { CONTAINER } from '@/components/site/Section';
import { COMPANY, RELEASES, TEAM, VALUES, fmtRelease } from '@/lib/company';

export const H1 = 'm-0 text-balance text-[36px] font-[450] leading-[1.1] tracking-[-0.01em] text-ink md:text-[48px] md:leading-[1.05] lg:text-[58px]';
export const SUB = 'm-0 mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-ink/65 md:text-[18px]';

const ext = (href) => (/^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {});

// A split hero: the headline and its actions on the left, a short list of where to go next on the right.
export function SplitHero({ title, sub, actions, links }) {
  return (
    <section className="bg-white">
      <div className={`${CONTAINER} grid gap-12 pt-14 pb-16 md:pt-24 md:pb-24 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16`}>
        <div className="load-up">
          <h1 className={H1}>{title}</h1>
          <p className={SUB}>{sub}</p>
          <div className="mt-8 flex flex-wrap gap-2.5">{actions}</div>
        </div>
        {links && (
          <ul className="m-0 list-none p-0 load-up" style={{ '--t': '120ms' }}>
            {links.map((l) => (
              <li key={l.href} className="border-hairline [&:not(:first-child)]:border-t">
                <a href={l.href} {...ext(l.href)} className="group flex items-start justify-between gap-6 py-4 !text-ink no-underline">
                  <span>
                    <span className="block text-[16px] font-medium">{l.title}</span>
                    <span className="mt-1 block text-[14px] leading-[1.5] text-ink/60">{l.line}</span>
                  </span>
                  <ChevronRight size={16} className="nudge mt-1 shrink-0 text-ink/40 group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function Values() {
  return (
    <ol className="m-0 grid list-none overflow-hidden rounded-2xl bg-ivory p-0 md:grid-cols-3">
      {VALUES.map((v, i) => (
        <li key={v.title} className="border-hairline p-6 md:p-8 [&:not(:first-child)]:border-t md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-t-0">
          <span className="block text-[28px] font-[400] leading-none tracking-[-0.01em] text-ink/45 tabular-nums" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="m-0 mt-8 text-[18px] font-[500] leading-[1.3]">{v.title}</h3>
          <p className="m-0 mt-2 text-[15px] leading-[1.6] text-ink/65">{v.line}</p>
        </li>
      ))}
    </ol>
  );
}

const initials = (name) => name.split(' ').map((w) => w[0]).join('');
const profiles = (t) => [
  t.linkedin && { label: 'LinkedIn', href: t.linkedin },
  t.x && { label: 'X', href: `https://x.com/${t.x}` },
  t.github && { label: 'GitHub', href: `https://github.com/${t.github}` },
].filter(Boolean);

export function Team() {
  return (
    <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-12 p-0 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-14">
      {TEAM.map((t) => (
        <li key={t.name} className="group">
          {t.image ? (
            <img src={t.image} alt={`Photo of ${t.name}`} width="320" height="320" loading="lazy"
              className="block size-[72px] rounded-full object-cover ring-1 ring-hairline grayscale transition-[filter] duration-150 ease-[cubic-bezier(.4,0,.2,1)] group-hover:grayscale-0 md:size-24" />
          ) : (
            <span role="img" aria-label={t.name} className="flex size-[72px] items-center justify-center rounded-full bg-aubergine text-[22px] font-[450] tracking-[0.02em] text-cream ring-1 ring-hairline md:size-24 md:text-[28px]">
              {initials(t.name)}
            </span>
          )}
          <span className="mt-5 block text-[15px] font-medium leading-[1.35] text-ink">{t.name}</span>
          <span className="mt-0.5 block text-[13px] leading-[1.45] text-ink/60">{t.role}</span>
          {t.bio && <span className="mt-2 block text-[13px] leading-[1.5] text-ink/75">{t.bio}</span>}
          <span className="mt-1 flex flex-wrap gap-x-4">
            {profiles(t).map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.name} on ${l.label}`}
                className="inline-flex min-h-11 items-center text-[13px] !text-ink/55 underline decoration-ink/20 underline-offset-[3px] transition-colors duration-150 hover:!text-ink hover:decoration-ink/60">
                {l.label}
              </a>
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}

// Releases grouped by year, newest first: the year on the left, dated rows on the right.
export function Timeline() {
  const years = [...new Set(RELEASES.map((r) => r.date.slice(0, 4)))];
  return years.map((y) => (
    <div key={y} className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
      <h3 className="m-0 text-[30px] font-[450] leading-none tracking-[-0.01em] text-cream md:text-[40px]">{y}</h3>
      <ul className="m-0 list-none p-0">
        {RELEASES.filter((r) => r.date.startsWith(y)).map((r) => (
          <li key={r.title} className="border-white/10 [&:not(:first-child)]:border-t">
            <a href={r.href} {...ext(r.href)} className="group flex min-h-12 items-center justify-between gap-6 py-3 text-[15px] !text-cream no-underline">
              <span className="flex items-center gap-1">{r.title}<ChevronRight size={15} className="nudge shrink-0 text-cream/40 group-hover:text-cream" /></span>
              <time dateTime={r.date} className="shrink-0 text-[13px] tabular-nums text-cream/55">{fmtRelease(r.date)}</time>
            </a>
          </li>
        ))}
      </ul>
    </div>
  ));
}

export function CompanyFacts() {
  const rows = [
    ['Legal name', COMPANY.legalName],
    ['Office', `${COMPANY.office.street}, ${COMPANY.office.city}, ${COMPANY.office.country}`],
    ['Company number', COMPANY.number],
  ];
  return (
    <dl className="m-0 border-t border-hairline">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[140px_1fr] gap-4 border-b border-hairline py-3.5 text-[15px]">
          <dt className="text-ink/60">{k}</dt>
          <dd className="m-0 text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export const personLd = TEAM.map((t) => ({
  '@type': 'Person',
  name: t.name,
  jobTitle: t.role,
  ...(t.image && { image: `https://surogate.ai${t.image}` }),
  sameAs: profiles(t).map((l) => l.href),
  worksFor: { '@id': 'https://surogate.ai/#organization' },
}));

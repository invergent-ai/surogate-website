'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/site/Section';
import { USE_CASES } from '@/lib/solutions';

// Each industry's photo in two layers from docs/brand/tools/photo-layers.py: a black to gold duotone, and its
// strongest contours as gold lines. The lines draw out from the centre first, then the photo rises beneath them.
const INDUSTRIES = [
  { name: 'Banking', line: 'Accuracy, sign-off and audit', photo: 'banking-window-row-skyline' },
  { name: 'Insurance', line: 'Claims, calls and cover', photo: 'insurance-family-window-city' },
  { name: 'Public sector', line: 'Sovereign, auditable, air-gapped', photo: 'public-hall-light-shadows' },
  { name: 'Energy', line: 'Plants, grids and field crews', photo: 'energy-offshore-technician' },
  { name: 'Logistics', line: 'Invoices, approvals and pace', photo: 'logistics-port-night-aerial' },
  { name: 'Health', line: 'Patients, privacy and time', photo: 'health-surgeon-dark' },
];
const TABS = INDUSTRIES.map((x) => {
  const jobs = USE_CASES.filter((u) => u.industry === x.name);
  return { ...x, href: jobs.find((u) => u.href)?.href || '/solutions/', photo: `/v3/photos/${x.photo}` };
});
const DWELL = 6500;

export default function Industries() {
  const [sel, setSel] = useState(0);
  const [cycle, setCycle] = useState(0);
  const pick = (n) => { setSel(n); setCycle((c) => c + 1); };
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);

  return (
    <Section divider={false}>
      <h2 className="m-0 mx-auto max-w-[18ch] text-balance text-center text-[32px] font-[450] leading-[1.08] tracking-[-0.015em] md:text-[48px]">Every use case, by industry.</h2>
      <div role="tablist" aria-label="Industries" className="mx-auto mt-8 flex w-fit max-w-full gap-8 overflow-x-auto border-b border-hairline [scrollbar-width:none]">
        {TABS.map((t, i) => (
          <button key={t.name} role="tab" type="button" aria-selected={i === sel} onClick={() => pick(i)}
            className={`relative shrink-0 pb-3 text-[15px] transition-colors duration-150 ${i === sel ? 'text-ink' : 'text-ink/45 hover:text-ink'}`}>
            {i === sel && !still && <span key={cycle} aria-hidden="true" className="ind-run absolute inset-x-0 -bottom-px h-[2px] bg-sun"
              style={{ '--dwell': `${DWELL}ms` }} onAnimationEnd={() => pick((sel + 1) % TABS.length)} />}
            {i === sel && still && <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-[2px] bg-ink" />}
            {t.name}
          </button>
        ))}
      </div>

      <div className="relative mt-10 h-[540px] overflow-hidden rounded-[14px] bg-ink md:h-[640px]">
        {TABS.map((t, i) => (
          <a key={t.name} href={t.href} role="tabpanel" aria-hidden={i !== sel} tabIndex={i === sel ? 0 : -1}
            className={`ind-panel group absolute inset-0 block !text-white no-underline ${i === sel ? 'is-on' : ''}`}>
            {/* The frame holds still while the photo inside it drifts; the contours draw first, then the photo rises. */}
            <div aria-hidden="true" className="ind-photo absolute inset-0">
              <img src={`${t.photo}-duo.jpg`} alt="" loading={i === 0 ? 'eager' : 'lazy'} decoding="async" className="ind-duo absolute inset-0 h-full w-full object-cover" />
              <img src={`${t.photo}-trace.png`} alt="" loading={i === 0 ? 'eager' : 'lazy'} decoding="async" className="ind-trace absolute inset-0 h-full w-full object-cover" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.12)_0%,rgba(10,10,10,.28)_50%,rgba(10,10,10,.5)_100%)]" />
            {/* The name holds the centre; its line and the one action sit low, as a caption would. */}
            <div className="relative flex h-full flex-col items-center px-6 pb-10 text-center md:pb-12">
              <p className="ind-title m-0 my-auto pt-16 text-[56px] font-[300] leading-none tracking-[-0.045em] md:text-[96px]">{t.name}</p>
              <p className="ind-sub m-0 text-[16px] font-[400] text-white/90 md:text-[17px]">{t.line}</p>
              <span className="ind-sub mt-4 inline-flex h-9 items-center gap-1.5 rounded-[6px] bg-white px-4 text-[13px] font-medium text-ink transition-colors duration-150 group-hover:bg-white/90">
                Explore <ArrowRight size={14} className="nudge" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Section, { SectionHead } from '@/components/site/Section';
import { WILDCLAW as W } from '@/lib/results';

const US = { name: 'Surogate 3.7 Flash', maker: 'Invergent', runs: 'Open weights', n: W.surogate, us: true };
const ROWS = [US, ...W.rows].sort((a, b) => b.n - a.n);
const MAX = 60;
const gap = (n) => (Math.abs(n - W.surogate) <= 0.5 ? 'Tie' : `\u2212${(W.surogate - n).toFixed(1)}`);

// One ranked list on one scale from zero, so a bar's length is its score. Our row is the only one in colour.
function useSeen() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

export default function Results() {
  const [ref, seen] = useSeen();
  return (
    <Section id="results">
      <SectionHead wide title="Head to head with frontier models." sub="Our model runs on your own servers and scores level with or ahead of each of these on real agent tasks." />
      <figure ref={ref} data-seen={seen || undefined} className="rank m-0">
        <ol className="m-0 list-none border-b border-hairline p-0">
          {ROWS.map((r, i) => (
            <li key={r.name} style={{ '--i': i }}
              className={`grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-t border-hairline py-4 md:grid-cols-[260px_1fr_64px_72px] ${r.us ? 'bg-stone/70 -mx-4 px-4 md:-mx-5 md:px-5' : ''}`}>
              <div className="min-w-0">
                <span className={`block truncate text-[15px] ${r.us ? 'font-semibold' : 'font-medium'}`}>{r.name}</span>
                <span className="block text-[12px] text-ink/50">{r.maker}, {r.runs.toLowerCase()}</span>
              </div>
              <span className={`text-right text-[15px] tabular-nums md:order-3 ${r.us ? 'font-semibold' : ''}`}>{r.n}</span>
              <div aria-hidden="true" className="col-span-2 h-2.5 md:order-2 md:col-span-1">
                <span className={`rank-bar block h-full rounded-r-[3px] ${r.us ? 'bg-sun' : 'bg-ink/15'}`} style={{ width: `${(r.n / MAX) * 100}%` }} />
              </div>
              <span className="hidden text-right text-[13px] tabular-nums text-ink/45 md:order-4 md:block">{r.us ? '' : gap(r.n)}</span>
            </li>
          ))}
        </ol>
        <figcaption className="mt-4 flex flex-wrap justify-between gap-2 text-[12px] text-ink/50">
          <span>Score in percent on {W.tasks} agent tasks.</span>
          <a href={W.href} target="_blank" rel="noopener noreferrer" className="!text-ink/50 underline decoration-ink/20 underline-offset-2 hover:!text-ink">WildClawBench, read {W.checked}</a>
        </figcaption>
      </figure>
    </Section>
  );
}

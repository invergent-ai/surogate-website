'use client';

import { Fragment, useEffect, useState } from 'react';
import Transit from '@/components/site/Rings';
import { CONTAINER } from '@/components/site/Section';
import { ArrowRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { CONTACT_SALES } from '@/lib/site';

const H1 = 'm-0 text-balance text-[36px] font-[450] leading-[1.1] tracking-[-0.01em] text-ink md:text-[48px] md:leading-[1.05] lg:text-[56px]';
const SUB = 'mx-auto mt-5 mb-0 max-w-[600px] text-balance text-[16px] leading-[1.6] text-ink/65 md:text-[18px]';
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const exitMs = (text) => 320 + text.length * 8;
const DWELL_MS = 7000;

// Every slide argues the same claim: the first states it, the rest give one reason each, in the order the page proves them.
// Each slide carries its own actions and they change with it. Only Book a demo is a button; everything else is a quiet link.
const DEMO = { label: 'Book a demo', href: CONTACT_SALES, event: 'contact_sales_clicked' };
const SLIDES = [
  { key: 'claim', name: 'the claim', headline: 'Frontier-level automation. On your own infrastructure.', sub: 'Trained on your work. Running in your data centre.',
    primary: DEMO, link: { label: 'The platform', href: '#platform' } },
  { key: 'results', name: 'the results', headline: 'Surogate 3.7 Flash matches frontier models.', sub: 'Kimi K3, GLM 5.2, Claude Opus 4.6 and Gemini 3.1 Pro, on agent tasks.',
    link: { label: 'Benchmark results', href: '#results' } },
  { key: 'process', name: 'the process', headline: 'Processes that run agents. Not the other way around.', sub: 'Keel runs agents in well-defined business processes.',
    link: { label: 'Inside Keel', href: '/keel/' } },
  { key: 'model', name: 'the model', headline: 'Make the model yours.', sub: 'Build a dataset from your agents\' chats and fine-tune without writing code.',
    link: { label: 'Train your own model', href: '/train/' } },
  { key: 'deploy', name: 'where it runs', headline: 'Runs where your data is.', sub: 'Our EU cloud, your cloud, your hardware or air-gapped, with the same agents and audit trail.',
    primary: DEMO, link: { label: 'Deployment options', href: '/security/' } },
];

// The solid action: black, square-cornered, the arrow the one gold thing on it.
function Primary({ slide }) {
  const l = slide.primary;
  return (
    <TrackedLink href={l.href} event={l.event || 'hero_action_clicked'} eventProps={{ location: `home_hero_${slide.key}` }}
      className="group inline-flex h-11 items-center gap-2.5 rounded-[7px] bg-ink pl-5 pr-4 text-[14px] font-medium !text-white no-underline shadow-[inset_0_1px_0_rgba(255,255,255,.14),0_1px_2px_rgba(0,0,0,.25),0_8px_24px_-12px_rgba(0,0,0,.5)] transition-colors duration-150 hover:bg-[#1f1f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2">
      {l.label}<ArrowRight size={16} strokeWidth={2.2} className="nudge text-sun" />
    </TrackedLink>
  );
}

// The quiet link: plain text and a gold arrow that steps forward on intent.
function SlideLink({ slide }) {
  const l = slide.link;
  return (
    <TrackedLink href={l.href} event="hero_action_clicked" eventProps={{ location: `home_hero_${slide.key}` }}
      className="slide-link group relative inline-flex items-center gap-2 py-1.5 text-[15px] font-medium !text-ink no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25">
      {l.label}<ArrowRight size={16} strokeWidth={2.2} className="nudge text-sun" />
    </TrackedLink>
  );
}

// Words stay unbreakable boxes so the line wraps where the plain text would; letters animate inside them.
function Letters({ text, mode }) {
  let k = 0;
  const words = text.split(' ');
  return words.map((w, wi) => (
    <Fragment key={wi}>
      <span className={`inline-block whitespace-nowrap ${mode === 'load' ? 'hero-w' : ''}`} style={{ '--i': wi }}>
        {[...w].map((ch) => {
          const n = k++;
          if (mode === 'load' || mode === 'rest') return ch;
          return <span key={n} className={`inline-block hero-l-${mode}`} style={{ '--i': n, '--r': text.length - n }}>{ch}</span>;
        })}
      </span>
      {wi < words.length - 1 && ' '}
    </Fragment>
  ));
}

// The headline, its line and the actions change together on a timer.
// The timer is the current segment's CSS fill: pausing it pauses the rotation, and its end advances it.
export default function Hero() {
  const [sel, setSel] = useState(0);
  const [shown, setShown] = useState(0);
  const [mode, setMode] = useState('load');
  const [hold, setHold] = useState({ focus: false, hidden: false });
  const [cycle, setCycle] = useState(0);
  const [wrapped, setWrapped] = useState(false);
  const jump = (n) => { setWrapped(n < sel); setSel(n); setCycle((c) => c + 1); };
  const advance = () => jump((sel + 1) % SLIDES.length);

  useEffect(() => {
    if (sel === shown) return;
    if (reduced()) { setShown(sel); setMode('rest'); return; }
    setMode('out');
    const t = setTimeout(() => { setShown(sel); setMode('in'); }, exitMs(SLIDES[shown].headline));
    return () => clearTimeout(t);
  }, [sel]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onVis = () => setHold((h) => ({ ...h, hidden: document.hidden }));
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Hover never pauses. A keyboard focus does, so a focused button never changes under the key press.
  const paused = hold.focus || hold.hidden;
  const p = SLIDES[shown];
  const swap = mode === 'out' ? 'hero-s-out' : mode === 'in' ? 'hero-s-in' : '';

  return (
    <section className="relative bg-white">
      {/* The brand rings stand beside the headline, faded out before they reach the copy. Phones have no room beside it. */}
      <div aria-hidden="true" className="hero-rings pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
        <Transit className="absolute right-[-30%] top-[-8%] h-[640px] w-auto sm:right-[-12%] lg:right-[-7%] lg:top-[-14%] lg:h-[760px]" />
      </div>
      <div className={`relative ${CONTAINER} pt-14 pb-12 text-center md:pt-20 md:pb-16`}
        data-paused={paused || undefined}
        onFocus={(e) => e.target.matches(':focus-visible') && setHold((h) => ({ ...h, focus: true }))}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold((h) => ({ ...h, focus: false }))}>
        {/* Every variant sits in the same grid cell, invisible, so the cell is always the tallest one's height. */}
        <div className="mx-auto grid max-w-[780px] pt-6 md:pt-10">
          {SLIDES.map((x) => (
            <div key={x.key} aria-hidden="true" className="invisible self-center [grid-area:1/1]">
              <div className={H1}>{x.headline}</div>
              <p className={SUB}>{x.sub}</p>
            </div>
          ))}
          <div id="hero-copy" aria-live="polite" className="self-center [grid-area:1/1]">
            <h1 className={H1}>
              <span className="sr-only">{p.headline}</span>
              <span key={shown} aria-hidden="true"><Letters text={p.headline} mode={mode} /></span>
            </h1>
            <p key={`s${shown}`} className={`${SUB} ${mode === 'load' ? 'load-up' : swap}`}
              style={mode === 'load' ? { '--y': '16px', '--t': '300ms', '--d': '650ms' } : undefined}>{p.sub}</p>
          </div>
        </div>

        <div className="load-up mx-auto mt-9 max-w-[720px]" style={{ '--y': '12px', '--t': '400ms', '--d': '650ms' }}>
          {/* One reserved footprint for every slide's actions, so nothing below moves when they change. */}
          <div className="flex h-14 items-center justify-center">
            <div key={shown} className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-3 ${swap}`}>
              {p.primary && <Primary slide={p} />}
              {p.link && <SlideLink slide={p} />}
            </div>
          </div>
          {/* One equal segment per slide. Done ones are full and still, upcoming ones empty and still; only the current
              one animates, restarted by its key. On a wrap the full ones fade out together before the first runs. */}
          <div className="mt-1 flex justify-center gap-1.5 md:mt-3">
            {SLIDES.map((x, n) => (
              <button key={x.key} type="button" aria-label={`Show ${x.name}`} aria-current={n === sel || undefined} onClick={() => jump(n)}
                className="group flex h-10 items-center rounded-full md:h-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25">
                <span className="relative block h-[2px] w-6 overflow-hidden rounded-full bg-hairline transition-colors duration-150 group-hover:bg-ink/20">
                  {n === sel ? (
                    <span key={`${n}-${cycle}`} className="seg-run absolute inset-0 bg-ink"
                      style={{ '--dwell': `${DWELL_MS}ms`, '--delay': wrapped ? '300ms' : '0ms' }} onAnimationEnd={advance} />
                  ) : n < sel ? (
                    <span className="absolute inset-0 bg-ink" />
                  ) : wrapped ? (
                    <span key={`g${cycle}`} className="seg-ghost absolute inset-0 bg-ink" />
                  ) : null}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

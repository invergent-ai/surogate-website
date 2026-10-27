'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import Pill from '@/components/site/Pill';
import { CONTAINER } from '@/components/site/Section';
import Bento from './Bento';
import HeroAction, { dwellFor } from './HeroAction';
import { PRODUCTS } from '@/lib/products';
import { ANNOUNCEMENT } from '@/lib/site';

const H1 = 'm-0 text-balance text-[36px] font-[450] leading-[1.1] tracking-[-0.01em] text-ink md:text-[48px] md:leading-[1.05] lg:text-[58px]';
const SUB = 'mx-auto mt-5 mb-0 max-w-[600px] text-balance text-[16px] leading-[1.6] text-ink/65 md:text-[18px]';
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const exitMs = (text) => 320 + text.length * 8;

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

// The headline, its line and the actions change together on a timer; the bento tile below follows.
// The timer is the current segment's CSS fill: pausing it pauses the rotation, and its end advances it.
export default function Hero() {
  const [sel, setSel] = useState(0);
  const [shown, setShown] = useState(0);
  const [mode, setMode] = useState('load');
  const [hold, setHold] = useState({ focus: false, hidden: false, audio: false });
  const [cycle, setCycle] = useState(0);
  const [wrapped, setWrapped] = useState(false);
  // Counts passes through the six, so Agents shows its next brief each time round.
  const [round, setRound] = useState(0);
  const jump = (n) => { if (n < sel) setRound((r) => r + 1); setWrapped(n < sel); setSel(n); setCycle((c) => c + 1); };
  const advance = () => jump((sel + 1) % PRODUCTS.length);

  useEffect(() => {
    if (sel === shown) return;
    if (reduced()) { setShown(sel); setMode('rest'); return; }
    setMode('out');
    const t = setTimeout(() => { setShown(sel); setMode('in'); }, exitMs(PRODUCTS[shown].headline));
    return () => clearTimeout(t);
  }, [sel]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onVis = () => setHold((h) => ({ ...h, hidden: document.hidden }));
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const onPlaying = useCallback((v) => setHold((h) => (h.audio === v ? h : { ...h, audio: v })), []);
  // Hover never pauses. The voice sample does, and so does a keyboard focus, so a focused button never
  // changes under the key press.
  const paused = hold.focus || hold.hidden || hold.audio;
  const p = PRODUCTS[shown];
  const swap = mode === 'out' ? 'hero-s-out' : mode === 'in' ? 'hero-s-in' : '';

  return (
    <section className="bg-white">
      <div className={`${CONTAINER} pt-14 pb-12 text-center md:pt-20 md:pb-16`}
        data-paused={paused || undefined}
        onFocus={(e) => e.target.matches(':focus-visible') && setHold((h) => ({ ...h, focus: true }))}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold((h) => ({ ...h, focus: false }))}>
        <Pill {...ANNOUNCEMENT} className="load-up" style={{ '--y': '8px' }} />

        {/* Every variant sits in the same grid cell, invisible, so the cell is always the tallest one's height. */}
        <div className="mx-auto mt-8 grid max-w-[780px] md:mt-10">
          {PRODUCTS.map((x) => (
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

        <div className="load-up mx-auto mt-8 max-w-[720px]" style={{ '--y': '12px', '--t': '400ms', '--d': '650ms' }}>
          {/* One reserved footprint for every slide's actions, so nothing below moves when they change. */}
          <div className="flex h-[112px] items-center justify-center md:h-[76px]">
            <div key={shown} data-action={p.action.kind} className={`w-full ${swap}`}>
              <HeroAction product={p} round={round} onPlaying={onPlaying} />
            </div>
          </div>
          {/* Six equal segments. Done ones are full and still, upcoming ones empty and still; only the current
              one animates, restarted by its key. On a wrap the full ones fade out together before the first runs. */}
          <div className="mt-3 flex justify-center gap-1.5">
            {PRODUCTS.map((x, n) => (
              <button key={x.key} type="button" aria-label={`Show ${x.name}`} aria-current={n === sel || undefined} onClick={() => jump(n)}
                className="group flex h-6 items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25">
                <span className="relative block h-[2px] w-6 overflow-hidden rounded-full bg-hairline transition-colors duration-150 group-hover:bg-ink/20">
                  {n === sel ? (
                    <span key={`${n}-${cycle}`} className="seg-run absolute inset-0 bg-ink"
                      style={{ '--dwell': `${dwellFor(PRODUCTS[sel].action, round)}ms`, '--delay': wrapped ? '300ms' : '0ms' }} onAnimationEnd={advance} />
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
      <Bento active={PRODUCTS[sel].key} />
    </section>
  );
}

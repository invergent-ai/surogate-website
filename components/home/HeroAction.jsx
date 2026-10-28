'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import Button, { Arrow } from '@/components/site/Button';
import { amamiSrc } from '@/lib/labs';

// What sits under the headline. Agents has a box where a brief types itself out, Voice one with a line
// Amami reads; every other product gets its own plain calls to action. Server, no-JS and reduced motion get
// the finished state.
export const TYPE_MS = 140;
export const HOLD_MS = 3000;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ext = (l) => (l.external ? { external: true } : {});
const where = (key) => ({ location: `home_hero_${key}` });

const pick = (list, round) => list[round % list.length];
export const briefFor = (a, round) => pick(a.briefs, round);
export const lineFor = (a, round) => pick(a.lines, round);
// The slide lasts as long as the headline swap, its brief's typing and the hold, so it never changes mid-sentence.
export const dwellFor = (a, round) => (a.kind === 'brief' ? 1000 + briefFor(a, round)[1].split(' ').length * TYPE_MS + HOLD_MS : 7000);

function Brief({ a, round, k }) {
  const [market, text] = briefFor(a, round);
  const words = text.split(' ');
  const [n, setN] = useState(words.length);
  useEffect(() => {
    if (reduced()) return undefined;
    let i = 0;
    setN(0);
    const id = setInterval(() => { i += 1; setN(i); if (i >= words.length) clearInterval(id); }, TYPE_MS);
    return () => clearInterval(id);
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="flex h-[112px] w-full items-start gap-3 rounded-xl border border-hairline bg-white py-3 pr-2 pl-4 md:h-14 md:items-center md:py-2 md:gap-4 md:pl-5">
      {/* The market label is as wide as the widest one, so the brief always starts in the same place. */}
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1 md:flex-row md:items-center md:gap-3">
      <span key={market} className="word-in shrink-0 rounded-md bg-ink px-2.5 py-1 text-[12px] font-medium leading-[16px] text-white md:w-[104px] md:text-center">{market}</span>
      <p className="m-0 min-w-0 flex-1 text-left text-[14px] leading-[1.4] text-ink md:text-[15px]">
        <span className="sr-only">{market}: {text}</span>
        <span aria-hidden="true">
          {words.slice(0, n).map((w, i) => <span key={i} className="word-in">{i ? ' ' : ''}{w}</span>)}
          <span className="caret ml-0.5 inline-block h-[1.05em] w-px translate-y-[2px] bg-ink/70" />
        </span>
      </p>
      </div>
      <Button href={a.primary.href} size="lg" arrow event={a.primary.event} eventProps={where(k)} className="shrink-0 self-center">{a.primary.label}</Button>
    </div>
  );
}

function TextLink({ l, k }) {
  return (
    <TrackedLink href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} event="hero_action_clicked" eventProps={where(k)}
      className="group inline-flex h-11 items-center gap-1 whitespace-nowrap rounded-full px-2 text-[14px] font-medium !text-ink no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25">
      {l.label}<Arrow />
    </TrackedLink>
  );
}

// A line a voice agent would say on a call, in the market's chip like a brief, with Amami reading it.
function Speak({ a, round, onPlaying }) {
  const { market, slug, ro, en } = lineFor(a, round);
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => () => onPlaying?.(false), [onPlaying]);
  const set = (v) => { setPlaying(v); onPlaying?.(v); };
  return (
    <div className="flex h-[104px] w-full items-center gap-3 rounded-xl border border-hairline bg-white py-3 pr-3 pl-3 md:h-[72px] md:gap-4 md:pr-5">
      <button type="button" onClick={() => (audio.current.paused ? audio.current.play().catch(() => {}) : audio.current.pause())}
        aria-label={playing ? `Pause: ${a.label}` : `Play: ${a.label}`}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white transition duration-150 ease-in-out hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2">
        {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="translate-x-px" />}
      </button>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left md:flex-row md:items-center md:gap-3">
        <span key={market} className="word-in shrink-0 rounded-md bg-ink px-2.5 py-1 text-[12px] font-medium leading-[16px] text-white md:w-[104px] md:text-center">{market}</span>
        <div className="min-w-0 flex-1">
          <p lang="ro" className="m-0 text-[13px] leading-[1.35] text-ink md:text-[15px]">{ro}</p>
          <p className="m-0 mt-0.5 hidden text-[12px] leading-[1.35] text-ink/50 md:block">{en}</p>
        </div>
      </div>
      <audio key={slug} ref={audio} src={amamiSrc(a.voice, slug)} preload="none" onPlay={() => set(true)} onPause={() => set(false)} onEnded={() => set(false)} />
    </div>
  );
}

// Two pills side by side at 390 need a little less padding than the desktop size.
const TIGHT = 'max-sm:!px-4';
function Ctas({ a, k }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <Button href={a.primary.href} size="lg" arrow {...ext(a.primary)} event={a.primary.event || 'hero_action_clicked'} eventProps={where(k)} className={TIGHT}>{a.primary.label}</Button>
        {a.secondary && <Button href={a.secondary.href} size="lg" variant="secondary" {...ext(a.secondary)} event={a.secondary.event || 'hero_action_clicked'} eventProps={where(k)} className={TIGHT}>{a.secondary.label}</Button>}
        {a.link && <TextLink l={a.link} k={k} />}
      </div>
      {a.note && <p className="m-0 hidden text-[13px] text-ink/45 sm:block">{a.note}</p>}
    </div>
  );
}

export default function HeroAction({ product, round = 0, onPlaying }) {
  const a = product.action;
  if (a.kind === 'brief') return <Brief a={a} round={round} k={product.key} />;
  if (a.kind === 'audio') return <Speak a={a} round={round} onPlaying={onPlaying} />;
  return <Ctas a={a} k={product.key} />;
}

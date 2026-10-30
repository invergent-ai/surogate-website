'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { CONTAINER } from '@/components/site/Section';
import { LOGO_RABBIT, LOGO_STAR } from '@/components/site/logo.js';
import { FLASH } from '@/lib/labs';

// The stack builds from the ground up: it starts in the customer's building and ends with agents at work.
const LAYERS = [
  { key: 'ground', we: 'We install it in your building.', you: 'You hold the keys.',
    line: 'Your GPUs, your Kubernetes, or a closed network with no connection out.',
    fact: ['0', 'connections out, air-gapped'], link: ['Deployment options', '/security/'] },
  { key: 'models', we: 'We research the models.', you: 'You own the weights.',
    line: 'Surogate 3.7 Flash and the open family from our lab: speech, voice and a model that sees.',
    fact: [FLASH.facts[0].n, 'tokens of context'], link: ['Research', '/labs/'] },
  { key: 'train', we: 'We train them on your work.', you: 'You keep what they learn.',
    line: 'Fine-tune and run reinforcement learning on your own data, on your own hardware.',
    fact: ['2.53×', 'faster training than Unsloth'], link: ['Train', '/train/'] },
  { key: 'serve', we: 'We serve them at full speed.', you: 'You choose the hardware.',
    line: 'The same engine that trains your model serves it, over the HTTP APIs your teams already use.',
    fact: ['7.0×', 'faster serving than llama.cpp'], link: ['Surogate Engine', '/labs/engine/'] },
  { key: 'agents', we: 'We run the agents.', you: 'You sign off.',
    line: 'Agents work your processes step by step. Over a limit, a person decides, and every step is written down.',
    fact: ['€12,400', 'over the limit, so a person decides'], link: ['Inside Keel', '/keel/'] },
];

// Isometric plates: a 2:1 rhombus with a thin edge, stacked bottom to top. Each plate's drawing is made on a
// 100 × 100 square and laid onto the plate's face with one affine matrix.
const CX = 320, A = 230, B = 115, T = 12, BASE = 604, GAP = 92;
const yOf = (i) => BASE - i * GAP;
const face = (cy) => `M${CX},${cy - B}L${CX + A},${cy}L${CX},${cy + B}L${CX - A},${cy}Z`;
const left = (cy) => `M${CX - A},${cy}L${CX},${cy + B}L${CX},${cy + B + T}L${CX - A},${cy + T}Z`;
const right = (cy) => `M${CX},${cy + B}L${CX + A},${cy}L${CX + A},${cy + T}L${CX},${cy + B + T}Z`;
const onFace = (cy) => `matrix(${A / 100} ${B / 100} ${-A / 100} ${B / 100} ${CX} ${cy - B})`;

const ring = (x, y, r) => `M${x - r},${y}a${r},${r} 0 1,0 ${r * 2},0a${r},${r} 0 1,0 ${-r * 2},0`;
const STAR = LOGO_STAR.split('M581.22,0')[0];

// What is etched on each plate, in the plate's own 100 × 100 square. The gold stroke marks the part that is yours.
const ETCH = {
  ground: [
    ...[0, 1, 2, 3, 4, 5].map((r) => `M16,${16 + r * 12}h68v8h-68z`),
    ...[0, 1, 2, 3, 4, 5].map((r) => `M22,${20 + r * 12}h8`),
  ],
  models: [1, 1.45].map((s) => ({ d: STAR, t: `translate(50 50) scale(${0.17 * s}) translate(-597 -114)`, w: 0.5 / (0.17 * s) })),
  train: ['M12,88H88M12,88V12', 'M14,22C32,58 52,68 86,74', 'M14,28C34,56 54,62 86,66', 'M14,16C28,58 46,78 86,84'],
  serve: [ring(40, 50, 5), 'M10,30C25,30 26,50 35,50', 'M10,50H35', 'M10,70C25,70 26,50 35,50',
    'M45,50C60,50 62,24 74,24', 'M45,50H74', 'M45,50C60,50 62,76 74,76', ring(80, 24, 5), ring(80, 50, 5), ring(80, 76, 5)],
  agents: ['M10,40h8v8h-8z', 'M30,40h8v8h-8z', 'M54,38l6,6l-6,6l-6,-6z', 'M70,40h8v8h-8z', 'M18,44h12M38,44h10M60,44h10M78,44h10',
    'M12,66h44', 'M12,74h56', 'M12,82h36'],
};
// The strokes that turn gold while their plate is in focus: the closed network, our star, the best run, the engine,
// the person.
const GOLD = { ground: ETCH.ground.map((_, j) => j), models: [0], train: [3], serve: [0], agents: [2] };

function Etch({ k, gold }) {
  return ETCH[k].map((p, j) => {
    if (gold && !GOLD[k].includes(j)) return null;
    const { d, t, w } = typeof p === 'string' ? { d: p, w: 0.45 } : p;
    return <path key={j} d={d} transform={t} pathLength="1" strokeWidth={w} className="ly-etch" />;
  });
}

function Stack({ plates, mark, spine }) {
  return (
    <svg viewBox="0 0 640 760" aria-hidden="true" className="ly-float block h-auto w-full overflow-visible" fill="none">
      <defs>
        <linearGradient id="ly-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".14" />
          <stop offset=".55" stopColor="#fff" stopOpacity=".04" />
          <stop offset="1" stopColor="#ffaf10" stopOpacity=".06" />
        </linearGradient>
      </defs>
      <path ref={spine} d={`M${CX},${BASE}V${yOf(LAYERS.length - 1)}`} pathLength="1" className="ly-spine" />
      {LAYERS.map((l, i) => {
        const cy = yOf(i);
        return (
          <g key={l.key} ref={(el) => { plates.current[i] = el; }} className="ly-plate">
            <path d={left(cy)} className="ly-side" />
            <path d={right(cy)} className="ly-side ly-side-r" />
            <path d={face(cy)} fill="url(#ly-glass)" className="ly-face" />
            <path d={face(cy)} className="ly-ghost" />
            <path d={face(cy)} className="ly-edge" />
            <g transform={onFace(cy)} className="ly-etch-white"><Etch k={l.key} /></g>
            <g transform={onFace(cy)} className="ly-etch-gold"><Etch k={l.key} gold /></g>
            <g transform={onFace(cy)} className="ly-flow"><Etch k={l.key} /></g>
          </g>
        );
      })}
      <g ref={mark} className="ly-mark" transform={`translate(${CX} 70) scale(.44) translate(-597 -117)`}>
        <path d={STAR} pathLength="1" className="ly-mark-star" />
        <path d={LOGO_RABBIT} className="ly-mark-rabbit" />
      </g>
    </svg>
  );
}

const clamp = (x) => Math.min(1, Math.max(0, x));
const ease = (x) => x * x * (3 - 2 * x);
// Lands with a small settle: overshoots by a few percent and comes back, like a pane set down on the one below.
const settle = (x) => 1 + 2.2 * (x - 1) ** 3 + 1.2 * (x - 1) ** 2;

// Everything follows one number: how far the reader has scrolled through the steps, from 0 (the ground) to 4 (the
// agents). It is eased toward the scroll each frame, so the stack moves with the page instead of on a timer.
// The stack moves on a staircase of that number: it holds still while a step's text sits mid-screen and only moves
// in the gap between two steps, where the eye is free.
const stair = (p) => { const n = Math.floor(p); return n + ease(clamp((p - n - 0.18) / 0.64)); };

function paint(p, { plates, mark, spine, steps }) {
  const last = LAYERS.length - 1;
  const q = stair(p);
  plates.forEach((g, i) => {
    if (!g) return;
    const land = i === 0 ? 1 : clamp(q - i + 1);
    const focus = clamp(1 - Math.abs(q - i));
    g.style.setProperty('--land', land.toFixed(4));
    g.style.setProperty('--drop', (1 - (i === 0 ? 1 : settle(land))).toFixed(4));
    g.style.setProperty('--depth', (i - q).toFixed(4));
    g.style.setProperty('--focus', focus.toFixed(4));
    g.style.setProperty('--draw', (i === 0 ? 1 : clamp((q - i + 0.45) / 0.45)).toFixed(4));
  });
  steps.forEach((el, i) => {
    if (!el) return;
    el.style.setProperty('--near', ease(clamp(1 - Math.abs(p - i) * 1.25)).toFixed(4));
    el.style.setProperty('--off', Math.max(-1, Math.min(1, i - p)).toFixed(4));
  });
  spine?.style.setProperty('--p', (q / last).toFixed(4));
  mark?.style.setProperty('--m', clamp((q - last + 0.6) / 0.6).toFixed(4));
}

export default function Layers() {
  const list = useRef(null);
  const steps = useRef([]);
  const plates = useRef([]);
  const mark = useRef(null);
  const spine = useRef(null);

  useEffect(() => {
    const last = LAYERS.length - 1;
    const els = () => ({ plates: plates.current, mark: mark.current, spine: spine.current, steps: steps.current });
    const wide = window.matchMedia('(min-width: 1024px)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let shown = 0, raf = 0;

    // Below the two-column layout the stack sits above the steps, so it shows built.
    const target = () => {
      if (!wide.matches) return last;
      const centre = (el) => { const r = el.getBoundingClientRect(); return r.top + r.height / 2; };
      const a = centre(steps.current[0]), b = centre(steps.current[last]);
      return Math.min(last, Math.max(0, ((window.innerHeight / 2 - a) / (b - a)) * last));
    };
    const tick = () => {
      const t = target();
      shown = still.matches ? t : shown + (t - shown) * 0.1;
      if (Math.abs(t - shown) < 0.001) shown = t;
      paint(shown, els());
      raf = shown === t ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    // The stack leans a few pixels toward the pointer, each plate by its height, so it reads as depth, not a picture.
    const sec = list.current.closest('section');
    const lean = (e) => {
      if (still.matches) return;
      const r = sec.getBoundingClientRect();
      sec.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      sec.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    };
    sec.addEventListener('pointermove', lean);
    shown = target();
    paint(shown, els());
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    wide.addEventListener('change', kick);
    return () => {
      cancelAnimationFrame(raf);
      sec.removeEventListener('pointermove', lean);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      wide.removeEventListener('change', kick);
    };
  }, []);

  return (
    <section id="layers" data-tone="night" className="ly relative scroll-mt-16 bg-night text-white">
      <div className={`${CONTAINER} pt-24 md:pt-32`}>
        <h2 className="m-0 max-w-[16ch] text-[40px] font-[300] leading-[1.02] tracking-[-0.04em] md:text-[72px]">Every layer is ours. All of it runs on yours.</h2>
        <p className="m-0 mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-white/60">From the research lab to the agent at work, we built the whole stack. It goes together from the ground up, starting in your building.</p>
      </div>
      <div className={`${CONTAINER} grid gap-10 pb-24 md:pb-32 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10`}>
        <div ref={list} className="order-2 lg:order-1">
          {LAYERS.map((l, i) => (
            <article key={l.key} ref={(el) => { steps.current[i] = el; }}
              className="ly-step flex flex-col justify-center border-t border-white/10 py-10 lg:min-h-[62vh] lg:border-0 lg:py-0">
              <h3 className="m-0 text-[28px] font-[400] leading-[1.15] tracking-[-0.02em] md:text-[36px]">
                <span className="block">{l.we}</span>
                <span className="block text-sun">{l.you}</span>
              </h3>
              <p className="m-0 mt-5 max-w-[44ch] text-[16px] leading-[1.6] text-white/65">{l.line}</p>
              <div className="mt-8 flex items-end justify-between gap-6 border-t border-white/15 pt-5">
                <p className="m-0">
                  <span className="block text-[40px] font-[300] leading-none tracking-[-0.03em] tabular-nums md:text-[48px]">{l.fact[0]}</span>
                  <span className="mt-2 block text-[14px] text-white/55">{l.fact[1]}</span>
                </p>
                <a href={l.link[1]} className="group inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium !text-white no-underline">
                  {l.link[0]} <ArrowRight size={15} strokeWidth={2.2} className="nudge text-sun" />
                </a>
              </div>
            </article>
          ))}
          {/* Room after the last step, so the finished stack holds still under it instead of being carried away. */}
          <div aria-hidden="true" className="hidden h-[22vh] lg:block" />
        </div>
        <div className="order-1 lg:order-2 lg:-mt-16">
          <div className="lg:sticky lg:top-[calc(50vh-340px)]">
            <div className="mx-auto max-w-[640px] lg:mx-0"><Stack plates={plates} mark={mark} spine={spine} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

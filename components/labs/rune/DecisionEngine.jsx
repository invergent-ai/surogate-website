'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import data from '@/lib/labs/rune-industries.json';
import RuneGlyph from '../RuneGlyph';
import RuneRing from './RuneRing';

/*
 * The decision engine: real inputs from different industries go in, the rune fires, a typed decision
 * comes out. Every answer is a real Rune response recorded by labs/spaces/record_industries.py.
 *
 * It advances on its own every few seconds, pauses when off screen or hovered, and each industry can be
 * picked directly. With reduced motion each example is shown finished and you step through them.
 */

const EXAMPLES = data.examples;
const HOLD_MS = 9000;  // long enough to read the input, the question and the answer
const pct = (p) => `${Math.round(p * 100)}%`;

/* Structured inputs (a policy and a claim, an order and an invoice) read better as labelled fields
   than as JSON: {"purchase_order": {"supplier": "Nordkraft AS", "lines": 3, "total_eur": 12400}}
   becomes "Purchase order: Nordkraft AS · 3 lines · €12,400". */
const humanize = (k) => k.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
const formatValue = (k, v) => {
  if (k.endsWith('_eur')) return `€${Number(v).toLocaleString('en-GB')}`;
  if (k === 'lines') return `${v} lines`;
  return String(v);
};
function fieldsOf(input) {
  if (!input.startsWith('{')) return null;
  try {
    return Object.entries(JSON.parse(input)).map(([k, v]) => ({
      label: humanize(k),
      value: v && typeof v === 'object' ? Object.entries(v).map(([k2, v2]) => formatValue(k2, v2)).join(' · ') : String(v),
    }));
  } catch {
    return null;
  }
}

export default function DecisionEngine() {
  const [i, setI] = useState(0);
  const root = useRef(null);
  const paused = useRef(false);
  const visible = useRef(false);
  const reduced = useRef(false);
  const tabs = useRef(null);
  const ex = EXAMPLES[i];
  const fields = fieldsOf(ex.input);

  const next = useCallback(() => setI((n) => (n + 1) % EXAMPLES.length), []);

  // Advance once an example has been watched for HOLD_MS. Only watched time counts (on screen, not
  // hovered, tab visible), and a pick restarts the clock, so a chosen industry always gets the full hold.
  const shownAt = useRef(0);
  useEffect(() => { shownAt.current = Date.now(); }, [i]);
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = root.current;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.35 });
    io.observe(el);
    const t = setInterval(() => {
      if (reduced.current || !visible.current || paused.current || document.hidden) shownAt.current = Date.now();
      else if (Date.now() - shownAt.current >= HOLD_MS) next();
    }, 250);
    return () => { clearInterval(t); io.disconnect(); };
  }, [next]);

  // On phones the tabs are one swipeable row; keep the active one in view. Only the row scrolls, never the page.
  useEffect(() => {
    const row = tabs.current;
    const tab = row.children[i];
    if (row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: reduced.current ? 'auto' : 'smooth' });
    }
  }, [i]);

  // One timeline per example: input in, beam, the rune fires, decision out.
  useEffect(() => {
    const el = root.current;
    if (reduced.current) return undefined;
    const ctx = gsap.context(() => {
      const text = el.querySelector('.de-text');
      const o = { n: 0 };
      const tl = gsap.timeline();
      tl.fromTo('.de-in', { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' });
      if (text) {
        const full = ex.input;
        tl.to(o, { n: full.length, duration: Math.min(1.8, 0.022 * full.length), ease: 'none',
          onUpdate: () => { text.textContent = full.slice(0, Math.round(o.n)); } }, 0.2);
      } else {
        tl.fromTo('.de-field', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.35 }, 0.2);
      }
      tl
        .fromTo('.de-q', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, '>+0.1')
        .fromTo('.de-beam-in', { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.6, ease: 'power2.in' }, '>+0.3')
        .fromTo('.de-spark-in', { attr: { cx: 0 }, opacity: 1 }, { attr: { cx: 100 }, duration: 0.6, ease: 'power2.in' }, '<')
        .to('.de-spark-in', { opacity: 0, duration: 0.1 })
        .addLabel('fire')
        // the ring of runes lights up around the circle, then the R ignites
        .fromTo('.rr-rune', { '--lit': 0 }, { '--lit': 1, duration: 0.18, stagger: { each: 0.035, from: 18 }, ease: 'power1.out' }, 'fire')
        .to('.rr-rune', { '--lit': 0.25, duration: 0.6, stagger: { each: 0.02, from: 18 } }, 'fire+=0.9')
        // the R never disappears: its strokes smoulder, then ignite one after another
        .fromTo('.de-core .rg-s', { opacity: 0.28 }, { opacity: 1, duration: 0.45, stagger: 0.18, ease: 'power2.in' }, 'fire+=0.25')
        .fromTo('.de-core .rune-glyph', { '--glow': 0.2 }, { '--glow': 1.4, duration: 0.35, ease: 'power2.in' }, 'fire+=0.75')
        .fromTo('.de-flare', { scale: 0.4, opacity: 0.9 }, { scale: 1.8, opacity: 0, duration: 0.9, ease: 'power2.out', transformOrigin: '50% 50%' }, 'fire+=0.95')
        .fromTo('.de-ring', { scale: 0.7, opacity: 0.8 }, { scale: 1.7, opacity: 0, duration: 1.1, stagger: 0.22, ease: 'power2.out', transformOrigin: '50% 50%' }, 'fire+=0.95')
        .to('.de-core .rune-glyph', { '--glow': 0.55, duration: 1.2 }, 'fire+=1.3')
        .fromTo('.de-beam-out', { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.5, ease: 'power2.out' }, 'fire+=1.1')
        .fromTo('.de-spark-out', { attr: { cx: 0 }, opacity: 1 }, { attr: { cx: 100 }, duration: 0.5, ease: 'power2.out' }, '<')
        .to('.de-spark-out', { opacity: 0, duration: 0.1 })
        .fromTo('.de-out', { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 'fire+=1.4')
        .fromTo('.de-bar em', { scaleX: 0 }, { scaleX: (k, t) => Number(t.dataset.p), duration: 1, stagger: 0.1, ease: 'power3.out' }, 'fire+=1.6');
    }, el);
    return () => ctx.revert();
  }, [i, ex.input]);

  return (
    <div
      ref={root}
      className="de"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onFocus={() => { paused.current = true; }}
      onBlur={() => { paused.current = false; }}
    >
      <div ref={tabs} className="de-tabs" role="tablist" aria-label="Industries">
        {EXAMPLES.map((e, n) => (
          <button
            key={e.industry}
            type="button"
            role="tab"
            aria-selected={n === i}
            className="de-tab"
            onClick={() => setI(n)}
          >
            {e.industry}
          </button>
        ))}
      </div>

      <div className="de-stage" role="tabpanel" aria-live="polite" aria-label={`${ex.industry}: ${ex.question} Rune: ${ex.decision}`}>
        <div className="de-in">
          <span className="de-label">Input · {ex.industry}</span>
          {ex.image && <img className="de-img" src={ex.image} alt="" width="900" height="600" />}
          {fields ? (
            <dl className="de-fields" key={i}>
              {fields.map((f) => (
                <div className="de-field" key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="de-text" key={i}>{ex.input}</p>
          )}
          <p className="de-q"><span>Question</span>{ex.question}</p>
        </div>

        <svg className="de-beam" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
          <line className="de-beam-in" x1="0" y1="5" x2="100" y2="5" pathLength="1" strokeDasharray="1" />
          <circle className="de-spark-in" cx="0" cy="5" r="2.2" />
        </svg>

        <div className="de-core" aria-hidden="true">
          <RuneRing />
          <span className="de-flare" />
          <span className="de-ring" />
          <span className="de-ring" />
          <RuneGlyph />
        </div>

        <svg className="de-beam" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
          <line className="de-beam-out" x1="0" y1="5" x2="100" y2="5" pathLength="1" strokeDasharray="1" />
          <circle className="de-spark-out" cx="0" cy="5" r="2.2" />
        </svg>

        <div className="de-out">
          <span className="de-label">Rune · {ex.type}</span>
          <p className="de-decision">{ex.type === 'score' ? `${ex.decision}` : ex.decision}</p>
          {ex.type === 'score' && <p className="de-score">{ex.score} on a 0–{ex.levels - 1} scale</p>}
          <div className="de-dist">
            {ex.distribution.map(([label, p]) => (
              <div className={`de-bar${label === ex.decision ? ' is-top' : ''}`} key={label}>
                <span>{label}</span>
                <b>{pct(p)}</b>
                <i><em data-p={p} style={{ transform: `scaleX(${p})` }} /></i>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="de-foot">
        Real answers from Rune, one request each, recorded {data.recorded}.
        <button type="button" className="de-next" onClick={next}>Next example</button>
      </p>
    </div>
  );
}

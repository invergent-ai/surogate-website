'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import data from '@/lib/labs/rune-industries.json';
import RuneGlyph from '../RuneGlyph';

/*
 * The decision engine: real inputs from different industries go in, the rune fires, a typed decision
 * comes out. Every answer is a real Rune response recorded by labs/spaces/record_industries.py.
 *
 * It advances on its own every few seconds, pauses when off screen or hovered, and each industry can be
 * picked directly. With reduced motion each example is shown finished and you step through them.
 */

const EXAMPLES = data.examples;
const HOLD_MS = 5200;
const pct = (p) => `${Math.round(p * 100)}%`;

export default function DecisionEngine() {
  const [i, setI] = useState(0);
  const root = useRef(null);
  const paused = useRef(false);
  const visible = useRef(false);
  const reduced = useRef(false);
  const ex = EXAMPLES[i];

  const next = useCallback(() => setI((n) => (n + 1) % EXAMPLES.length), []);

  // Advance on a timer while visible and not hovered.
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = root.current;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.35 });
    io.observe(el);
    const t = setInterval(() => {
      if (!reduced.current && visible.current && !paused.current && !document.hidden) next();
    }, HOLD_MS);
    return () => { clearInterval(t); io.disconnect(); };
  }, [next]);

  // One timeline per example: input in, beam, the rune fires, decision out.
  useEffect(() => {
    const el = root.current;
    if (reduced.current) return undefined;
    const ctx = gsap.context(() => {
      const text = el.querySelector('.de-text');
      const full = ex.input;
      const o = { n: 0 };
      const tl = gsap.timeline();
      tl.fromTo('.de-in', { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' })
        .to(o, { n: full.length, duration: Math.min(1.1, 0.012 * full.length), ease: 'none',
          onUpdate: () => { text.textContent = full.slice(0, Math.round(o.n)); } }, 0.15)
        .fromTo('.de-q', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, '>-0.1')
        .fromTo('.de-beam-in', { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.45, ease: 'power2.in' })
        .fromTo('.de-spark-in', { attr: { cx: 0 }, opacity: 1 }, { attr: { cx: 100 }, duration: 0.45, ease: 'power2.in' }, '<')
        .to('.de-spark-in', { opacity: 0, duration: 0.1 })
        .addLabel('fire')
        .fromTo('.de-core .rg-s', { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 'fire')
        .fromTo('.de-core .rune-glyph', { '--glow': 0.3 }, { '--glow': 1, duration: 0.3 }, 'fire')
        .fromTo('.de-ring', { scale: 0.7, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.9, stagger: 0.18, ease: 'power2.out', transformOrigin: '50% 50%' }, 'fire')
        .fromTo('.de-dial', { rotate: 0 }, { rotate: 120, duration: 0.9, ease: 'power3.out', transformOrigin: '50% 50%' }, 'fire')
        .fromTo('.de-beam-out', { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.4, ease: 'power2.out' }, 'fire+=0.45')
        .fromTo('.de-spark-out', { attr: { cx: 0 }, opacity: 1 }, { attr: { cx: 100 }, duration: 0.4, ease: 'power2.out' }, '<')
        .to('.de-spark-out', { opacity: 0, duration: 0.1 })
        .fromTo('.de-out', { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' }, 'fire+=0.7')
        .fromTo('.de-bar em', { scaleX: 0 }, { scaleX: (k, t) => Number(t.dataset.p), duration: 0.8, stagger: 0.06, ease: 'power3.out' }, 'fire+=0.85')
        .to('.de-core .rune-glyph', { '--glow': 0.45, duration: 0.8 }, 'fire+=0.6');
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
      <div className="de-tabs" role="tablist" aria-label="Industries">
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
          <p className="de-text" key={i}>{ex.input}</p>
          <p className="de-q"><span>Question</span>{ex.question}</p>
        </div>

        <svg className="de-beam" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
          <line className="de-beam-in" x1="0" y1="5" x2="100" y2="5" pathLength="1" strokeDasharray="1" />
          <circle className="de-spark-in" cx="0" cy="5" r="2.2" />
        </svg>

        <div className="de-core" aria-hidden="true">
          <svg className="de-dial" viewBox="0 0 200 200">
            {Array.from({ length: 36 }, (_, k) => (
              <line key={k} x1="100" y1="6" x2="100" y2={k % 3 === 0 ? 18 : 12} transform={`rotate(${k * 10} 100 100)`} />
            ))}
          </svg>
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

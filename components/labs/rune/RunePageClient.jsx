'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { RUNE, RUNE_CALIBRATION, RUNE_DEMOS, RUNE_FACTS } from '@/lib/labs';
import story from '@/lib/labs/rune-story.json';
import LabsSubnav from '../LabsSubnav';
import RuneGlyph from '../RuneGlyph';
import DemoRow from '../DemoRow';

/*
 * surogate.ai/labs/rune. A scroll story in six scenes; every number on it is from a real run
 * recorded by labs/spaces/record_story.py (lib/labs/rune-story.json) or from the public model card.
 *
 * Desktop scrubs each scene's timeline with the scroll (the scene's visual is sticky). Phones play
 * each scene once as it arrives. Reduced motion shows every scene's final state.
 */

const pct = (p) => `${(p * 100).toFixed(p > 0.995 || p < 0.005 ? 1 : 0)}%`;
const DOODLE = RUNE_DEMOS.find((d) => d.slug === 'doodle-decoder');

const { ticket, sees, thinking } = story;
const TONE = Object.entries(ticket.answers.tone.probabilities);
const URGENCY = ticket.request.questions.urgency.criteria.map((label, i) => [label, ticket.answers.urgency.probabilities[String(i)]]);
const THINK_Q = thinking.request.questions.q;
const THINK_KEYS = Object.keys(THINK_Q.criteria);

/* Fit a box to the frame's aspect ratio around its centre, for the camera's viewBox. */
function fit([x0, y0, x1, y1], aspect) {
  let w = x1 - x0, h = y1 - y0;
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  if (w / h > aspect) h = w / aspect; else w = h * aspect;
  return `${cx - w / 2} ${cy - h / 2} ${w} ${h}`;
}

const cellsOf = ([x0, y0, x1, y1]) => {
  const xs = [0, 1, 2, 3].map((i) => x0 + ((x1 - x0) * i) / 3);
  const ys = [0, 1, 2, 3].map((i) => y0 + ((y1 - y0) * i) / 3);
  return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => [xs[i % 3], ys[Math.floor(i / 3)], xs[(i % 3) + 1], ys[Math.floor(i / 3) + 1]]);
};

let pulses = 0;
function pulse(tl, scene, at) {
  const label = `pulse${(pulses += 1)}`;
  tl.addLabel(label, at)
    .to(scene.querySelectorAll('.rune-glyph'), { '--glow': 1, duration: 0.25 }, label)
    .fromTo(scene.querySelectorAll('.rg-ring'), { scale: 0.6, opacity: 0.9 }, { scale: 1.35, opacity: 0, duration: 0.6, transformOrigin: '50% 50%' }, label)
    .to(scene.querySelectorAll('.rune-glyph'), { '--glow': 0.25, duration: 0.5 }, `${label}+=0.4`);
}

function typeInto(tl, el, text, at, duration) {
  const o = { n: 0 };
  tl.to(o, { n: text.length, duration, ease: 'none', onUpdate: () => { el.textContent = text.slice(0, Math.round(o.n)); } }, at);
}

function countTo(tl, el, to, at, duration, format) {
  const o = { v: 0 };
  tl.to(o, { v: to, duration, ease: 'power2.out', onUpdate: () => { el.textContent = format(o.v); } }, at);
}

/* One timeline per scene, built from the scene's own DOM. */
const SCENES = {
  state(scene) {
    const tl = gsap.timeline();
    typeInto(tl, scene.querySelector('.st-ticket'), ticket.request.state.ticket, 0, 1.2);
    tl.from(scene.querySelectorAll('.st-chip'), { y: 18, opacity: 0, stagger: 0.18, duration: 0.4 }, 1.1);
    return tl;
  },
  pass(scene) {
    const tl = gsap.timeline();
    pulse(tl, scene, 0);
    scene.querySelectorAll('[data-p]').forEach((bar) => {
      tl.fromTo(bar, { scaleX: 0 }, { scaleX: Number(bar.dataset.p), duration: 0.9, ease: 'power3.out', transformOrigin: '0 50%' }, 0.2);
    });
    scene.querySelectorAll('[data-count]').forEach((el) => countTo(tl, el, Number(el.dataset.count), 0.2, 0.9, pct));
    tl.from(scene.querySelectorAll('.ps-ans'), { opacity: 0, y: 8, stagger: 0.12, duration: 0.3 }, 0.9);
    return tl;
  },
  sees(scene) {
    const tl = gsap.timeline();
    const svg = scene.querySelector('.sees-svg');
    const aspect = sees.size[0] / sees.size[1];
    sees.steps.forEach((step, i) => {
      const at = i * 1.4;
      const g = scene.querySelector(`.sees-step-${i}`);
      tl.set(g, { opacity: 1 }, at)
        .fromTo(g.querySelectorAll('.sees-line'), { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.35, stagger: 0.05 }, at)
        .fromTo(g.querySelector('.sees-pick'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, at + 0.4)
        .fromTo(g.querySelector('.sees-tag'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, at + 0.45);
      pulse(tl, scene, at + 0.4);
      tl.to(svg, { attr: { viewBox: fit(step.next, aspect) }, duration: 0.7, ease: 'power2.inOut' }, at + 0.75)
        .to(g, { opacity: 0, duration: 0.3 }, at + 1.15);
    });
    tl.to(svg, { attr: { viewBox: fit([0, 0, ...sees.size], aspect) }, duration: 0.7, ease: 'power2.inOut' })
      .fromTo(scene.querySelector('.sees-hit'), { opacity: 0, scale: 2.2 }, { opacity: 1, scale: 1, duration: 0.45, svgOrigin: `${sees.point[0]} ${sees.point[1]}` })
      .from(scene.querySelector('.sees-out'), { opacity: 0, y: 10, duration: 0.3 });
    return tl;
  },
  calib(scene) {
    const tl = gsap.timeline();
    const dot = scene.querySelector('.cal-dot');
    const { before, after } = RUNE_CALIBRATION;
    tl.fromTo(scene.querySelector('.cal-diag'), { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.6 })
      .fromTo(dot, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, transformOrigin: '50% 50%' })
      .from(scene.querySelector('.cal-gap'), { opacity: 0, duration: 0.3 });
    pulse(tl, scene, '+=0.2');
    tl.to(dot, { attr: { cx: X(after.confidence) }, duration: 0.9, ease: 'power2.inOut' }, '+=0.1')
      .to(scene.querySelector('.cal-gap'), { attr: { x1: X(after.confidence) }, duration: 0.9, ease: 'power2.inOut' }, '<');
    const ece = scene.querySelector('.cal-ece');
    const o = { v: before.ece };
    tl.to(o, { v: after.ece, duration: 0.9, onUpdate: () => { ece.textContent = `${o.v.toFixed(1)}%`; } }, '<');
    return tl;
  },
  think(scene) {
    const tl = gsap.timeline();
    const bars = scene.querySelectorAll('.th-bar');
    const tokens = scene.querySelector('.th-tokens');
    const arc = scene.querySelector('.th-arc');
    bars.forEach((b) => tl.fromTo(b, { scaleX: 0 }, { scaleX: Number(b.dataset.one), duration: 0.6, transformOrigin: '0 50%' }, 0));
    tl.from(scene.querySelector('.th-gate'), { opacity: 0, duration: 0.3 }, 0.5)
      .from(scene.querySelector('.th-unsure'), { opacity: 0, y: 8, duration: 0.3 }, 0.7);
    const o = { n: 0 };
    tl.to(o, { n: thinking.answer.thinking.tokens, duration: 1.6, ease: 'none', onUpdate: () => {
      tokens.textContent = Math.round(o.n);
      arc.setAttribute('stroke-dashoffset', String(1 - o.n / thinking.answer.thinking.tokens));
    } }, 1.0);
    pulse(tl, scene, 2.6);
    bars.forEach((b) => tl.to(b, { scaleX: Number(b.dataset.final), duration: 0.8, ease: 'power3.out' }, 2.7));
    scene.querySelectorAll('[data-final-count]').forEach((el) => {
      const from = Number(el.dataset.one), to = Number(el.dataset.finalCount), v = { p: from };
      tl.to(v, { p: to, duration: 0.8, onUpdate: () => { el.textContent = pct(v.p); } }, 2.7);
    });
    tl.from(scene.querySelector('.th-sure'), { opacity: 0, y: 8, duration: 0.3 }, 3.3);
    return tl;
  },
  api(scene) {
    const tl = gsap.timeline();
    typeInto(tl, scene.querySelector('.api-req'), API_REQ, 0, 1.6);
    pulse(tl, scene, 1.6);
    typeInto(tl, scene.querySelector('.api-res'), API_RES, 1.8, 1.4);
    return tl;
  },
};

function roundAnswers(answers) {
  const r = (x) => Math.round(x * 10000) / 10000;
  return Object.fromEntries(Object.entries(answers).map(([k, a]) => {
    const out = { ...a };
    for (const f of ['noul', 'confidence', 'score']) if (f in out) out[f] = r(out[f]);
    if (out.probabilities) out.probabilities = Object.fromEntries(Object.entries(out.probabilities).map(([o, p]) => [o, r(p)]));
    delete out.legend;
    return [k, out];
  }));
}

/* JSON with the top two levels expanded and everything deeper on one line, so both panes fit. */
function compact(obj) {
  const one = (v) => JSON.stringify(v).replace(/":/g, '": ').replace(/,"/g, ', "');
  return `{\n${Object.entries(obj).map(([k, v]) => {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      return `  "${k}": {\n${Object.entries(v).map(([k2, v2]) => `    "${k2}": ${one(v2)}`).join(',\n')}\n  }`;
    }
    return `  "${k}": ${one(v)}`;
  }).join(',\n')}\n}`;
}

const API_REQ = compact({ model: ticket.request.model, state: ticket.request.state, questions: ticket.request.questions });
const API_RES = compact({ answers: roundAnswers(ticket.answers) });

/* Calibration chart coordinates: 50–100% on both axes into a 320 x 320 plot. */
const X = (v) => 40 + ((v - 50) / 50) * 260;
const Y = (v) => 290 - ((v - 50) / 50) * 260;

export default function RunePageClient() {
  const root = useRef(null);
  useReveal();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const hero = gsap.timeline();
      hero.fromTo('.rune-hero .rg-s', { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.9, stagger: 0.25, ease: 'power2.inOut' })
        .fromTo('.rune-hero .rg-ring', { scale: 0.6, opacity: 0.9 }, { scale: 1.4, opacity: 0, duration: 0.9, transformOrigin: '50% 50%' }, '-=0.2')
        .to('.rune-hero .rune-glyph', { '--glow': 1, duration: 0.4 }, '<');

      const mm = gsap.matchMedia();
      mm.add(
        {
          scrub: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
          play: '(max-width: 899px) and (prefers-reduced-motion: no-preference)',
          still: '(prefers-reduced-motion: reduce)',
        },
        ({ conditions }) => {
          if (conditions.still) hero.progress(1);
          document.querySelectorAll('[data-scene]').forEach((scene) => {
            const tl = SCENES[scene.dataset.scene](scene);
            if (conditions.still) { tl.progress(1).pause(); return; }
            if (conditions.scrub) {
              tl.pause();
              ScrollTrigger.create({ trigger: scene, start: 'top top', end: 'bottom bottom', scrub: 0.6, animation: tl });
            } else {
              tl.pause();
              ScrollTrigger.create({ trigger: scene, start: 'top 70%', once: true, onEnter: () => tl.play() });
            }
          });
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const one = thinking.onepass.probabilities;
  const fin = thinking.answer.probabilities;

  return (
    <div ref={root} className="st-home st-labs st-rune bg-white text-brand-aubergine antialiased overflow-x-clip">
      <Nav />
      <LabsSubnav />

      <main id="top">
        <header className="hero rune-hero">
          <div className="hero-glow" />
          <div className="wrap rune-hero-in">
            <div>
              <p className="hero-kicker">Surogate Rune</p>
              <h1 className="hero-title">
                A decision model <span className="amber">that sees.</span>
              </h1>
              <p className="hero-sub">
                Give Rune text, data or an image, a question and your options. It answers with one of them and a
                calibrated probability for every one, in a single pass. Open weights, so it runs on your own cards.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#story" onClick={() => track('rune_cta_clicked', { cta: 'story' })}>
                  See it decide
                  <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                </a>
                <a className="btn btn-ghost" href={RUNE.blog} target="_blank" rel="noopener noreferrer"
                   onClick={() => track('rune_cta_clicked', { cta: 'launch_post' })}>
                  Read the launch post
                  <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>
            <RuneGlyph className="rune-hero-glyph" label="Rune" />
          </div>
        </header>

        <div id="story" className="rune-story">
          <section className="scene" data-scene="state" aria-labelledby="sc-state">
            <div className="scene-sticky wrap">
              <div className="scene-text">
                <p className="scene-n">State in</p>
                <h2 id="sc-state" className="scene-h">You bring the input and the questions.</h2>
                <p className="scene-p">
                  A support ticket, as-is. Three questions, each with its own type: a true-or-false, a pick-one and a
                  point on a scale. No prompt, no output format to police.
                </p>
              </div>
              <div className="scene-vis">
                <div className="st-card">
                  <div className="st-label">state.ticket</div>
                  <p className="st-ticket">{ticket.request.state.ticket}</p>
                  <div className="st-chips">
                    <span className="st-chip"><b>noul</b> Is a refund requested?</span>
                    <span className="st-chip"><b>choice</b> What is the tone? calm · annoyed · furious</span>
                    <span className="st-chip"><b>score</b> How urgent is this? 0 → 2</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="scene" data-scene="pass" aria-labelledby="sc-pass">
            <div className="scene-sticky wrap">
              <div className="scene-text">
                <RuneGlyph className="scene-glyph" />
                <p className="scene-n">One pass</p>
                <h2 id="sc-pass" className="scene-h">Every answer, with every probability.</h2>
                <p className="scene-p">
                  One request, {ticket.ms} ms from a laptop to the hosted model. A close call and a clear one look
                  different, so a threshold means something.
                </p>
              </div>
              <div className="scene-vis ps-grid">
                <div className="ps-q">
                  <div className="ps-name">Refund requested?</div>
                  <div className="ps-row"><span>yes</span><i className="ps-bar"><em data-p={ticket.answers.refund.noul} style={{ transform: `scaleX(${ticket.answers.refund.noul})` }} /></i><b data-count={ticket.answers.refund.noul}>{pct(ticket.answers.refund.noul)}</b></div>
                  <div className="ps-row"><span>no</span><i className="ps-bar"><em data-p={1 - ticket.answers.refund.noul} style={{ transform: `scaleX(${1 - ticket.answers.refund.noul})` }} /></i><b data-count={1 - ticket.answers.refund.noul}>{pct(1 - ticket.answers.refund.noul)}</b></div>
                  <div className="ps-ans">→ refund</div>
                </div>
                <div className="ps-q">
                  <div className="ps-name">Tone</div>
                  {TONE.map(([k, p]) => (
                    <div className="ps-row" key={k}><span>{k}</span><i className="ps-bar"><em data-p={p} style={{ transform: `scaleX(${p})` }} /></i><b data-count={p}>{pct(p)}</b></div>
                  ))}
                  <div className="ps-ans">→ {ticket.answers.tone.choice}</div>
                </div>
                <div className="ps-q">
                  <div className="ps-name">Urgency</div>
                  {URGENCY.map(([k, p]) => (
                    <div className="ps-row" key={k}><span>{k}</span><i className="ps-bar"><em data-p={p} style={{ transform: `scaleX(${p})` }} /></i><b data-count={p}>{pct(p)}</b></div>
                  ))}
                  <div className="ps-ans">→ {ticket.answers.urgency.score.toFixed(2)} on 0–2</div>
                </div>
              </div>
            </div>
          </section>

          <section className="scene" data-scene="sees" aria-labelledby="sc-sees">
            <div className="scene-sticky wrap">
              <div className="scene-text">
                <RuneGlyph className="scene-glyph" />
                <p className="scene-n">It sees</p>
                <h2 id="sc-sees" className="scene-h">Pixels in, a decision out.</h2>
                <p className="scene-p">
                  “{sees.task}” on a settings screen. Rune picks one of nine cells, the view zooms in, and it picks
                  again. No detector, no OCR, no page code. {sees.steps.length} decisions, and it lands on the toggle.
                </p>
              </div>
              <div className="scene-vis">
                <div className="sees-frame" style={{ aspectRatio: `${sees.size[0]} / ${sees.size[1]}` }}>
                  <svg className="sees-svg" viewBox={`0 0 ${sees.size[0]} ${sees.size[1]}`} role="img"
                       aria-label={`A settings screen; Rune zooms ${sees.steps.map((s) => s.choice).join(', ')} and marks the dark mode toggle`}>
                    <image href={sees.image} width={sees.size[0]} height={sees.size[1]} />
                    {sees.steps.map((step, i) => {
                      const cells = cellsOf(step.box);
                      const [x0, y0, x1, y1] = step.box;
                      const pick = cells['ABCDEFGHI'.indexOf(step.choice)];
                      const w = x1 - x0, h = y1 - y0;
                      return (
                        <g key={i} className={`sees-step sees-step-${i}`} opacity="0">
                          {[1, 2].map((k) => (
                            <line key={`v${k}`} className="sees-line" pathLength="1" strokeDasharray="1" x1={x0 + (w * k) / 3} y1={y0} x2={x0 + (w * k) / 3} y2={y1} vectorEffect="non-scaling-stroke" />
                          ))}
                          {[1, 2].map((k) => (
                            <line key={`h${k}`} className="sees-line" pathLength="1" strokeDasharray="1" x1={x0} y1={y0 + (h * k) / 3} x2={x1} y2={y0 + (h * k) / 3} vectorEffect="non-scaling-stroke" />
                          ))}
                          <rect className="sees-pick" x={pick[0]} y={pick[1]} width={pick[2] - pick[0]} height={pick[3] - pick[1]} vectorEffect="non-scaling-stroke" />
                          <text className="sees-tag" x={pick[0] + (pick[2] - pick[0]) * 0.04} y={pick[1] + (pick[3] - pick[1]) * 0.22}
                                style={{ fontSize: `${(pick[3] - pick[1]) * 0.16}px` }}>
                            {step.choice} · {pct(step.probabilities[step.choice])}
                          </text>
                        </g>
                      );
                    })}
                    <g className="sees-hit">
                      <circle cx={sees.point[0]} cy={sees.point[1]} r="22" vectorEffect="non-scaling-stroke" />
                      <line x1={sees.point[0] - 40} y1={sees.point[1]} x2={sees.point[0] - 12} y2={sees.point[1]} vectorEffect="non-scaling-stroke" />
                      <line x1={sees.point[0] + 12} y1={sees.point[1]} x2={sees.point[0] + 40} y2={sees.point[1]} vectorEffect="non-scaling-stroke" />
                      <line x1={sees.point[0]} y1={sees.point[1] - 40} x2={sees.point[0]} y2={sees.point[1] - 12} vectorEffect="non-scaling-stroke" />
                      <line x1={sees.point[0]} y1={sees.point[1] + 12} x2={sees.point[0]} y2={sees.point[1] + 40} vectorEffect="non-scaling-stroke" />
                    </g>
                  </svg>
                </div>
                <p className="sees-out">
                  Zoom path {sees.steps.map((s) => s.choice).join(' → ')}, then click at ({sees.point.join(', ')}).
                </p>
              </div>
            </div>
          </section>

          <section className="scene" data-scene="calib" aria-labelledby="sc-calib">
            <div className="scene-sticky wrap">
              <div className="scene-text">
                <RuneGlyph className="scene-glyph" />
                <p className="scene-n">Calibrated</p>
                <h2 id="sc-calib" className="scene-h">When it says 90%, it means 90%.</h2>
                <p className="scene-p">
                  Out of the box Rune is a little overconfident. Served at temperature {RUNE_CALIBRATION.after.t}, its
                  confidence matches its accuracy. The chosen option never changes, only how sure it says it is.
                </p>
                <p className="scene-src">{RUNE_CALIBRATION.source}.</p>
              </div>
              <div className="scene-vis">
                <svg className="cal-svg" viewBox="-6 0 346 330" role="img"
                     aria-label={`Confidence ${RUNE_CALIBRATION.before.confidence}% against accuracy ${RUNE_CALIBRATION.before.accuracy}% at temperature 1; ${RUNE_CALIBRATION.after.confidence}% against ${RUNE_CALIBRATION.after.accuracy}% at temperature 2`}>
                  <line className="cal-axis" x1="40" y1="290" x2="300" y2="290" />
                  <line className="cal-axis" x1="40" y1="30" x2="40" y2="290" />
                  {[50, 60, 70, 80, 90, 100].map((v) => (
                    <g key={v}>
                      <text className="cal-tick" x={X(v)} y="310" textAnchor="middle">{v}</text>
                      <text className="cal-tick" x="30" y={Y(v) + 4} textAnchor="end">{v}</text>
                    </g>
                  ))}
                  <text className="cal-lab" x="170" y="328" textAnchor="middle">stated confidence, %</text>
                  <text className="cal-lab" x="-160" y="12" transform="rotate(-90)" textAnchor="middle">actual accuracy, %</text>
                  <line className="cal-diag" pathLength="1" strokeDasharray="1" x1={X(50)} y1={Y(50)} x2={X(100)} y2={Y(100)} />
                  <text className="cal-lab" x={X(92)} y={Y(96)} textAnchor="end">honest</text>
                  <line className="cal-gap" x1={X(RUNE_CALIBRATION.before.confidence)} y1={Y(RUNE_CALIBRATION.before.accuracy)}
                        x2={X(RUNE_CALIBRATION.before.accuracy)} y2={Y(RUNE_CALIBRATION.before.accuracy)} />
                  <circle className="cal-dot" cx={X(RUNE_CALIBRATION.before.confidence)} cy={Y(RUNE_CALIBRATION.before.accuracy)} r="9" />
                  <text className="cal-lab" x="48" y="46">T = {RUNE_CALIBRATION.before.t} → {RUNE_CALIBRATION.after.t}, accuracy stays {RUNE_CALIBRATION.before.accuracy}%</text>
                </svg>
                <p className="cal-read">Calibration error <b className="cal-ece">{RUNE_CALIBRATION.before.ece.toFixed(1)}%</b></p>
              </div>
            </div>
          </section>

          <section className="scene" data-scene="think" aria-labelledby="sc-think">
            <div className="scene-sticky wrap">
              <div className="scene-text">
                <RuneGlyph className="scene-glyph" />
                <p className="scene-n">Thinks when unsure</p>
                <h2 id="sc-think" className="scene-h">Fast when it knows. Careful when it doesn't.</h2>
                <p className="scene-p">
                  Turn thinking on and only the questions Rune is less than 70% sure of reason before answering. Every
                  other answer stays one pass.
                </p>
              </div>
              <div className="scene-vis th-card">
                <p className="th-q">{thinking.request.state.problem}</p>
                <div className="th-bars">
                  {THINK_KEYS.map((k) => (
                    <div className="ps-row" key={k}>
                      <span>{THINK_Q.criteria[k]}</span>
                      <i className="ps-bar"><em className="th-bar" data-one={one[k]} data-final={fin[k]} style={{ transform: `scaleX(${fin[k]})` }} /></i>
                      <b data-one={one[k]} data-final-count={fin[k]}>{pct(fin[k])}</b>
                    </div>
                  ))}
                  <span className="th-gate" aria-hidden="true"><em>70%</em></span>
                </div>
                <p className="th-unsure">One pass: {pct(Math.max(...Object.values(one)))} sure. Under the line, so it thinks.</p>
                <div className="th-meter">
                  <svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18" /><circle className="th-arc" cx="22" cy="22" r="18" pathLength="1" strokeDasharray="1" strokeDashoffset="0" /></svg>
                  <span><b className="th-tokens">{thinking.answer.thinking.tokens}</b> thinking tokens</span>
                </div>
                <p className="th-sure">
                  After thinking: {THINK_Q.criteria[thinking.answer.choice]}, {pct(fin[thinking.answer.choice])} sure.
                </p>
              </div>
            </div>
          </section>

          <section className="scene" data-scene="api" aria-labelledby="sc-api">
            <div className="scene-sticky wrap">
              <div className="scene-text">
                <RuneGlyph className="scene-glyph" />
                <p className="scene-n">The API</p>
                <h2 id="sc-api" className="scene-h">One request. Typed answers back.</h2>
                <p className="scene-p">
                  The ticket from the start, exactly as it went over the wire. Nothing to parse: the answer is always
                  one of your options.
                </p>
              </div>
              <div className="scene-vis api-grid">
                <pre className="api-pane"><span className="api-h">POST /v1/decisions</span><code className="api-req">{API_REQ}</code></pre>
                <pre className="api-pane"><span className="api-h">200 · {ticket.ms} ms</span><code className="api-res">{API_RES}</code></pre>
              </div>
            </div>
          </section>
        </div>

        <section className="sec dark rune-facts">
          <div className="wrap">
            <div className="lab-facts rune-facts-grid">
              {RUNE_FACTS.map((f) => (
                <div className="lab-fact" key={f.n}>
                  <div className="lab-fact-n">{f.n}</div>
                  <div className="lab-fact-l">{f.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="try">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Try it</p>
              <h2 className="h-section">Draw something. Rune is watching.</h2>
            </div>
            <div className="lab-demos rune-try">
              <DemoRow demo={DOODLE} />
            </div>
            <div className="rune-next reveal">
              <a className="btn btn-primary" href="/labs/rune-examples/">
                All five live demos
                <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
              </a>
              {[
                ['Get the weights', RUNE.model],
                ['Launch post', RUNE.blog],
                ['API docs', RUNE.docs],
              ].map(([label, href]) => (
                <a key={label} className="lab-textlink" href={href} target="_blank" rel="noopener noreferrer"
                   onClick={() => track('rune_link_clicked', { label })}>
                  {label}
                  <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                </a>
              ))}
              <a className="lab-textlink" href="/labs/speech/">
                Surogate Speech
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

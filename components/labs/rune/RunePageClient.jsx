'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, ArrowUpRight, Bot, Play, Trophy, CircleCheck, ClipboardCheck, Cloud, Gauge, Layers, Route, Server, ShieldAlert, TextSearch,
} from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { track } from '@/lib/analytics';
import { LEADERBOARD, RUNE } from '@/lib/labs';
import { CAPABILITIES, DEPLOY, KINDS, SEES, USES } from '@/lib/labs/rune-page';
import LabsSubnav from '../LabsSubnav';
import RuneGlyph from '../RuneGlyph';
import RuneIcon from './RuneIcons';
import SeesArt from './SeesArt';
import Calibration from './Calibration';
import DecisionEngine from './DecisionEngine';

/*
 * surogate.ai/labs/rune. What Rune is, what it does and where it fits, from the launch post and the
 * model card (content in lib/labs/rune-page.js).
 *
 * Motion: one pinned moment on desktop (a paragraph collapsing into a decision); everything else
 * animates once as it arrives, and the rune beside each section heading fires when that section lands.
 * With reduced motion every element is shown in its final state.
 */

const USE_ICONS = { Route, CircleCheck, Gauge, Bot, Layers, ShieldAlert, ClipboardCheck, TextSearch };
const pctOf = (p) => `${Math.round(p * 100)}%`;


function fire(glyph) {
  const tl = gsap.timeline();
  tl.to(glyph, { '--glow': 1, duration: 0.25 })
    .fromTo(glyph.querySelector('.rg-ring'), { scale: 0.6, opacity: 0.9 }, { scale: 1.45, opacity: 0, duration: 0.7, transformOrigin: '50% 50%' }, 0)
    .to(glyph, { '--glow': 0.3, duration: 0.6 }, 0.45);
  return tl;
}

function SectionHead({ eyebrow, title, lead }) {
  return (
    <div className="rn-head" data-reveal>
      <RuneGlyph className="rn-glyph" />
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h-section">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}


/* The public Decision Index, with Rune's row from the model card, and the live board on demand. */
function Leaderboard() {
  const [open, setOpen] = useState(false);
  return (
    <section className="sec rn-board" id="leaderboard">
      <div className="wrap">
        <SectionHead
          eyebrow="Measured in public"
          title="Ranked on an open leaderboard of decision models."
          lead={`The Decision Index scores decision models on ${LEADERBOARD.benchmarks} benchmarks in five areas, rescaled so that guessing scores zero. Its maintainers reran our submission of the open weights and matched it bit for bit.`}
        />
        <div className="lb-grid">
          <div className="lb-score" data-reveal>
            <Trophy size={26} strokeWidth={1.8} aria-hidden="true" />
            <div className="lb-n" data-count={LEADERBOARD.index}>{LEADERBOARD.index.toFixed(2)}</div>
            <p className="lb-l">
              Decision Index {LEADERBOARD.edition}, <b>#{LEADERBOARD.rank}</b> on the board as published on {LEADERBOARD.date}.
            </p>
          </div>
          <div className="lb-areas" data-reveal>
            {LEADERBOARD.areas.map((a) => (
              <div className="lb-area" key={a.name}>
                <span>{a.name}</span>
                <b>{a.skill.toFixed(1)}</b>
                <i><em data-p={a.skill / 100} style={{ transform: `scaleX(${a.skill / 100})` }} /></i>
              </div>
            ))}
            <p className="lb-note">Skill per area, 0 = guessing, 100 = perfect.</p>
          </div>
        </div>
        <div className="lb-embed" data-reveal>
          {open ? (
            <iframe className="lb-frame" src={LEADERBOARD.embed} title="Decision Index leaderboard, live" loading="lazy" />
          ) : (
            <button type="button" className="lb-open" onClick={() => { setOpen(true); track('rune_leaderboard_opened'); }}>
              <Play size={18} strokeWidth={2} aria-hidden="true" />
              Open the live leaderboard here
            </button>
          )}
          <a className="lab-textlink" href={LEADERBOARD.page} target="_blank" rel="noopener noreferrer">
            Open it on Hugging Face <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function RunePageClient() {
  const root = useRef(null);

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
          motion: '(prefers-reduced-motion: no-preference)',
          wide: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
        },
        ({ conditions }) => {
          if (!conditions.motion) { hero.progress(1); return undefined; }

          // Things that arrive: fade and rise once.
          gsap.set('[data-reveal]', { opacity: 0, y: 26 });
          ScrollTrigger.batch('[data-reveal]', {
            start: 'top 88%',
            once: true,
            onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', overwrite: true }),
          });

          // Each section's rune fires as the section lands.
          gsap.utils.toArray('.rn-glyph').forEach((g) => {
            ScrollTrigger.create({ trigger: g, start: 'top 82%', once: true, onEnter: () => fire(g) });
          });

          // Question cards: the distributions fill once the card is in view.
          gsap.utils.toArray('.qk').forEach((card) => {
            const tl = gsap.timeline({ paused: true });
            card.querySelectorAll('[data-p]').forEach((b) => tl.fromTo(b, { scaleX: 0 }, { scaleX: Number(b.dataset.p), duration: 0.9, ease: 'power3.out' }, 0.2));
            tl.fromTo(card.querySelector('.qk-get'), { opacity: 0.2 }, { opacity: 1, duration: 0.4 }, 0.05);
            ScrollTrigger.create({ trigger: card, start: 'top 82%', once: true, onEnter: () => { tl.play(); fire(card.querySelector('.qk-glyph')); } });
          });

          // Leaderboard: the skill bars fill and the index counts up.
          gsap.utils.toArray('.lb-area em').forEach((b) => {
            ScrollTrigger.create({ trigger: b, start: 'top 90%', once: true,
              onEnter: () => gsap.fromTo(b, { scaleX: 0 }, { scaleX: Number(b.dataset.p), duration: 1, ease: 'power3.out' }) });
          });
          gsap.utils.toArray('.lb-n').forEach((el) => {
            const to = Number(el.dataset.count), o = { v: 0 };
            ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true,
              onEnter: () => gsap.to(o, { v: to, duration: 1.2, ease: 'power2.out', onUpdate: () => { el.textContent = o.v.toFixed(2); } }) });
          });

          // Capability icons draw themselves.
          gsap.utils.toArray('.cap').forEach((cap) => {
            const tl = gsap.timeline({ paused: true });
            tl.fromTo(cap.querySelectorAll('.ri-path'), { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.7, stagger: 0.1, ease: 'power2.out' });
            ScrollTrigger.create({ trigger: cap, start: 'top 88%', once: true, onEnter: () => tl.play() });
          });

          // Rune looks at each image: a scan line sweeps while the tile is on screen.
          gsap.utils.toArray('.sees-tile').forEach((tile, i) => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, paused: true, delay: i * 0.25 });
            tl.fromTo(tile.querySelector('.sa-scan'), { attr: { y: 4 } }, { attr: { y: 113 }, duration: 1.6, ease: 'sine.inOut' })
              .to(tile, { '--hit': 1, duration: 0.2 }, '-=0.15')
              .to(tile, { '--hit': 0, duration: 0.7 });
            ScrollTrigger.create({ trigger: tile, start: 'top 92%', end: 'bottom 8%', onToggle: (self) => (self.isActive ? tl.play() : tl.pause()) });
          });

          // Calibration: the ticks flip over, one by one.
          gsap.utils.toArray('.cal-row').forEach((row) => {
            ScrollTrigger.create({ trigger: row, start: 'top 82%', once: true,
              onEnter: () => gsap.fromTo(row.querySelectorAll('.cal-chip b'), { rotateX: 90, opacity: 0 },
                { rotateX: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: 'back.out(2)' }) });
          });
          return undefined;
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

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
                <a className="btn btn-primary" href="#what" onClick={() => track('rune_cta_clicked', { cta: 'what' })}>
                  See how it works
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

        <section className="sec rn-pd" id="what">
          <div className="wrap">
            <SectionHead
              eyebrow="What it is"
              title="Real questions in. Typed decisions out."
              lead="Rune reads the input, answers your question with one of your options, and tells you how sure it is. A bank complaint, an insurance claim, a phishing email, a contract clause, an invoice, a chart: the same model, the same kind of answer."
            />
            <div data-reveal><DecisionEngine /></div>
          </div>
        </section>

        <section className="sec rn-kinds">
          <div className="wrap">
            <SectionHead
              eyebrow="How you ask"
              title="Three kinds of question cover most decisions."
              lead="Each question names its type, the instruction and the options. The answer is always one of your options, never free text."
            />
            <div className="qk-grid">
              {KINDS.map((k) => {
                const dist = k.type === 'noul' ? [{ label: 'True', p: k.p }, { label: 'False', p: 1 - k.p }] : k.options;
                return (
                  <article className="qk" key={k.type} data-reveal>
                    <div className="qk-top">
                      <span className="qk-type">{k.type}</span>
                      <h3 className="qk-title">{k.title}</h3>
                      <p className="qk-line">{k.line}</p>
                    </div>
                    <div className="qk-send">
                      <span className="qk-lab">You send</span>
                      <p className="qk-input">{k.input}</p>
                      <p className="qk-q">{k.question}</p>
                      <div className="qk-opts">
                        {(k.type === 'noul' ? [{ label: 'True' }, { label: 'False' }] : k.options).map((o) => (
                          <span key={o.label}>{o.label}</span>
                        ))}
                      </div>
                    </div>
                    <div className="qk-link" aria-hidden="true"><RuneGlyph className="qk-glyph" /></div>
                    <div className="qk-get">
                      <span className="qk-lab">Rune returns</span>
                      <p className="qk-answer">{k.answer}</p>
                      <p className="qk-sub">{k.sub}</p>
                      {dist.map((o) => (
                        <div className="qk-row" key={o.label}>
                          <span>{o.label}</span>
                          <b>{pctOf(o.p)}</b>
                          <i><em data-p={o.p} style={{ transform: `scaleX(${o.p})` }} /></i>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="rn-aside" data-reveal>Ask all three about the same input at once: one request, one pass, three answers.</p>
          </div>
        </section>

        <section className="sec rn-caps">
          <div className="wrap">
            <SectionHead eyebrow="What comes back" title="Built to sit inside software." />
            <div className="cap-grid">
              {CAPABILITIES.map((c) => (
                <article className="cap" key={c.title} data-reveal>
                  <RuneIcon name={c.icon} />
                  <h3 className="cap-t">{c.title}</h3>
                  <p className="cap-d">{c.line}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec rn-thr">
          <div className="wrap rn-split">
            <SectionHead
              eyebrow="Calibrated"
              title="A threshold that means what it says."
              lead="A probability is only useful if it is honest. Rune's is: when it says 90%, it is right about nine times in ten, and when it says 60%, about six."
            />
            <div data-reveal><Calibration /></div>
          </div>
        </section>

        <Leaderboard />

        <section className="sec rn-sees">
          <div className="wrap">
            <SectionHead
              eyebrow="It sees"
              title="The same questions work on an image."
              lead="Scanned forms, photos of meters, screenshots attached to a bug report, charts and tables. Send the picture, and ask what you would ask about the text."
            />
            <div className="sees-grid">
              {SEES.map((s) => (
                <figure className="sees-tile" key={s.kind} data-reveal>
                  <SeesArt kind={s.kind} />
                  <figcaption>{s.title}</figcaption>
                </figure>
              ))}
            </div>
            <a className="lab-textlink rn-link" href="/labs/rune-examples/" data-reveal>
              Try it on images, live <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="sec rn-uses">
          <div className="wrap">
            <SectionHead eyebrow="Where it fits" title="Anywhere software has to choose." />
            <div className="use-grid">
              {USES.map((u) => {
                const Icon = USE_ICONS[u.icon];
                return (
                  <article className="use" key={u.title} data-reveal>
                    <span className="use-ic"><Icon size={20} strokeWidth={1.9} aria-hidden="true" /></span>
                    <h3 className="use-t">{u.title}</h3>
                    <p className="use-d">{u.line}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="sec dark rn-deploy">
          <div className="wrap">
            <SectionHead
              eyebrow="Run it where your data lives"
              title="Use our API, or keep everything on your own cards."
              lead="In banking, healthcare, insurance and other regulated work, sending data to someone else's API can rule a model out before accuracy comes up. Rune runs inside your environment, offline if you need it."
            />
            <div className="dep-grid">
              <article className="dep" data-reveal>
                <Cloud size={24} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="dep-t">Hosted API</h3>
                <p className="dep-d">{DEPLOY.hosted}</p>
              </article>
              <article className="dep" data-reveal>
                <Server size={24} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="dep-t">Your own hardware</h3>
                <p className="dep-d">{DEPLOY.own}</p>
              </article>
              <div className="dep-speed" data-reveal>
                <div className="dep-n">{DEPLOY.speed.n}</div>
                <p className="dep-l">{DEPLOY.speed.l}</p>
              </div>
            </div>
            <ul className="dep-terms" data-reveal>
              {DEPLOY.terms.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <div className="lab-pane dep-cmd" data-reveal>
              <div className="lab-pane-h"><span><b>Serve</b> Rune with Surogate</span></div>
              <pre>{DEPLOY.command}</pre>
            </div>
            <p className="dep-note" data-reveal>{DEPLOY.hardware} {DEPLOY.note}</p>
          </div>
        </section>

        <section className="sec tight rn-next">
          <div className="wrap rn-next-in" data-reveal>
            <a className="btn btn-primary" href="/labs/rune-examples/">
              Try the live demos
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
        </section>
      </main>

      <Footer />
    </div>
  );
}

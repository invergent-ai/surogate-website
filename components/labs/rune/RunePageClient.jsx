'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Button from '@/components/site/Button';
import Section, { H2, SectionHead } from '@/components/site/Section';
import { track } from '@/lib/analytics';
import { LEADERBOARD, RUNE } from '@/lib/labs';
import { CAPABILITIES, DEPLOY, KINDS, SEES, USES } from '@/lib/labs/rune-page';
import LabsSubnav from '../LabsSubnav';
import LabsHero from '../LabsHero';
import RuneGlyph from '../RuneGlyph';
import RuneIcon from './RuneIcons';
import SeesArt from './SeesArt';
import Calibration from './Calibration';
import DecisionEngine, { pct } from './DecisionEngine';
import Segmented from '../Segmented';
import { CLOSING_RINGS } from '@/components/solutions/HeroRings';

/*
 * surogate.ai/labs/rune. What Rune is, what it does and where it fits, from the launch post and the
 * model card (content in lib/labs/rune-page.js).
 *
 * Motion: the hero rune draws itself once; everything else animates once as it arrives, and the rune between
 * a question and its answer fires when the card lands. With reduced motion every element is shown in its final state.
 */


// The rune fires: one flat ring opens out from it and fades. No glow.
const fire = (glyph) => gsap.fromTo(glyph.querySelector('.rg-ring'), { scale: 0.6, opacity: 0.9 },
  { scale: 1.45, opacity: 0, duration: 0.7, transformOrigin: '50% 50%' });


/* The public Decision Index, with Rune's row from the model card, and the live board on demand. */
function Leaderboard() {
  const [open, setOpen] = useState(false);
  return (
    <Section id="leaderboard">
        <SectionHead
          title="Ranked on an open leaderboard of decision models."
          sub={`The Decision Index scores decision models on ${LEADERBOARD.benchmarks} benchmarks in five areas, rescaled so that guessing scores zero. Its maintainers reran our submission of the open weights and matched it bit for bit.`}
        />
        <div className="lb-grid">
          <div className="lb-score" data-reveal>
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
    </Section>
  );
}

export default function RunePageClient() {
  const [kind, setKind] = useState(0);  // on a phone the three kinds show one at a time
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const hero = gsap.timeline();
      hero.fromTo('.rune-hero .rg-s', { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.9, stagger: 0.25, ease: 'power2.inOut' })
        .fromTo('.rune-hero .rg-ring', { scale: 0.6, opacity: 0.9 }, { scale: 1.4, opacity: 0, duration: 0.9, transformOrigin: '50% 50%' }, '-=0.2');

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: reduce)', () => { hero.progress(1); });
      mm.add(
        '(prefers-reduced-motion: no-preference)',
        () => {

          // Things that arrive: fade and rise once.
          gsap.set('[data-reveal]', { opacity: 0, y: 26 });
          ScrollTrigger.batch('[data-reveal]', {
            start: 'top 88%',
            once: true,
            onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', overwrite: true }),
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
    <div ref={root} className="v2 st-home st-labs st-rune w-full bg-white font-sans text-ink">
      <Nav />
      <LabsSubnav />

      <main id="top">
        <div className="rune-hero">
          <LabsHero
            title="A decision model that sees."
            sub="Give Rune text, data or an image, a question and your options. It answers with one of them and a calibrated probability for every one, in a single pass. Open weights, so it runs on your own cards."
            actions={<>
              <Button href="#what" size="lg" arrow event="rune_cta_clicked" eventProps={{ cta: 'what' }}>See how it works</Button>
              <Button href={RUNE.model} variant="secondary" size="lg" external event="rune_cta_clicked" eventProps={{ cta: 'huggingface' }}>Open on Hugging Face</Button>
            </>}
            visual={<RuneGlyph className="rune-hero-glyph" label="Rune" />}
          />
        </div>

        <Section id="what">
          <SectionHead title="Real questions in. Typed decisions out."
            sub="Rune reads the input, answers your question with one of your options, and tells you how sure it is. A bank complaint, an insurance claim, a phishing email, a contract clause, an invoice, a chart: the same model, the same kind of answer." />
          <div data-reveal><DecisionEngine /></div>
        </Section>

        <Section tone="grey">
          <SectionHead title="Three kinds of question cover most decisions."
            sub="Each question names its type, the instruction and the options. The answer is always one of your options, never free text." />
          <div className="qk-pick-phone">
            <Segmented label="Kind of question" value={kind} onPick={(n) => { setKind(n); track('rune_kind_picked', { kind: KINDS[n].short }); }}
                       options={KINDS.map((k) => k.short)} />
          </div>
          <div className="qk-grid">
            {KINDS.map((k, n) => {
              const dist = k.type === 'noul' ? [{ label: 'True', p: k.p }, { label: 'False', p: 1 - k.p }] : k.options;
              return (
                <article className="qk" key={k.type} data-reveal data-active={n === kind ? 'true' : 'false'}>
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
                      {dist.map((o) => <span key={o.label}>{o.label}</span>)}
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
                        <b>{pct(o.p)}</b>
                        <i><em data-p={o.p} style={{ transform: `scaleX(${o.p})` }} /></i>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
          <p className="rn-aside" data-reveal>Ask all three about the same input at once: one request, one pass, three answers.</p>
        </Section>

        <Section>
          <SectionHead title="Built to sit inside software." />
          <div className="cap-grid">
            {CAPABILITIES.map((c) => (
              <article className="cap" key={c.title} data-reveal>
                <RuneIcon name={c.icon} />
                <h3 className="cap-t">{c.title}</h3>
                <p className="cap-d">{c.line}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHead title="A threshold that means what it says."
            sub="A probability is only useful if it is honest. Rune's is: when it says 90%, it is right about nine times in ten, and when it says 60%, about six." />
          <div data-reveal><Calibration /></div>
        </Section>

        <Leaderboard />

        <Section tone="grey">
          <SectionHead title="The same questions work on an image."
            sub="Scanned forms, photos of meters, screenshots attached to a bug report, charts and tables. Send the picture, and ask what you would ask about the text." />
          <div className="sees-grid">
            {SEES.map((s) => (
              <figure className="sees-tile" key={s.kind} data-reveal>
                <SeesArt kind={s.kind} />
                <figcaption>{s.title}</figcaption>
              </figure>
            ))}
          </div>
          <a className="lab-textlink rn-link" href="/labs/rune-examples/">
            Watch it work on images <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
          </a>
        </Section>

        <Section>
          <SectionHead title="Anywhere software has to choose." />
          <div className="use-grid">
            {USES.map((u) => (
              <article className="use" key={u.title} data-reveal>
                <h3 className="use-t">{u.title}</h3>
                <p className="use-d">{u.line}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section className="rn-deploy">
          <SectionHead title="Use our API, or keep everything on your own cards."
            sub="In banking, healthcare, insurance and other regulated work, sending data to someone else's API can rule a model out before accuracy comes up. Rune runs inside your environment, offline if you need it." />
          <div className="dep-grid">
            <article className="dep" data-reveal>
              <h3 className="dep-t">Hosted API</h3>
              <p className="dep-d">{DEPLOY.hosted}</p>
            </article>
            <article className="dep" data-reveal>
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
        </Section>

        <Section tone="aubergine" rings={CLOSING_RINGS} inner="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className={H2.feature}>Watch Rune at work.</h2>
            <p className="m-0 mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-white/70">Cameras, robot arms, invoices and claims, with the answers Rune really gave.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {[['Get the weights', RUNE.model], ['API docs', RUNE.docs]].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" onClick={() => track('rune_link_clicked', { label })}
                   className="inline-flex min-h-11 items-center gap-1 text-[14px] font-medium !text-white/80 no-underline hover:!text-white">
                  {label}<ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <Button href="/labs/rune-examples/" variant="sun" size="lg" arrow className="shrink-0">Watch the films</Button>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { SPEECH_ABOUT, SPEECH_LINKS, SPEECH_MODELS, SPEECH_RUN, amamiSrc } from '@/lib/labs';
import LabsSubnav from '../LabsSubnav';
import SheetSelect from '../SheetSelect';
import { ICONS } from '../icons';

/*
 * surogate.ai/labs/speech. The waveforms are the real audio: when a voice plays, a WebAudio analyser
 * drives the bars in the hero and on that voice's card. Idle bars breathe unless reduced motion is on.
 */

const HERO_BARS = 56;
const CARD_BARS = 28;
const AMAMI = SPEECH_MODELS.find((m) => m.voices);
const RECOGNIZERS = SPEECH_MODELS.filter((m) => !m.voices);
const CATEGORIES = [...new Set(AMAMI.samples.map((x) => x.category))];

/* An illustration of what streaming recognition shows, not a recording: partial words while you
   speak, then one cased, punctuated sentence when you pause. */
const PARTIALS = ['buna', 'buna ziua', 'buna ziua as', 'buna ziua as dori sa', 'buna ziua as dori sa programez o',
  'buna ziua as dori sa programez o intalnire maine'];
const FINAL = 'Bună ziua, aș dori să programez o întâlnire mâine.';

function Bars({ count, className, barsRef }) {
  return (
    <div className={`sp-bars ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} ref={(el) => { barsRef.current[i] = el; }} />
      ))}
    </div>
  );
}

export default function SpeechPageClient() {
  useReveal();
  const heroBars = useRef([]);
  const cardBars = useRef({});
  const audios = useRef({});
  const engine = useRef(null);
  const [playing, setPlaying] = useState(null);
  const [sample, setSample] = useState(AMAMI.samples[0]);
  const lines = AMAMI.samples.filter((x) => x.category === sample.category);
  const playingRef = useRef(null);
  const streamRef = useRef(null);

  /* One AudioContext and analyser for the page, created on the first play (browsers require a gesture). */
  const ensureEngine = useCallback(() => {
    if (engine.current) return engine.current;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.72;
    analyser.connect(ctx.destination);
    engine.current = { ctx, analyser, sources: new Map(), data: new Uint8Array(analyser.frequencyBinCount) };
    return engine.current;
  }, []);

  /* A new sentence stops whatever is playing; the cards then play that sentence. */
  const pick = (next) => {
    Object.values(audios.current).forEach((a) => a.pause());
    setSample(next);
    track('labs_amami_sample_picked', { sample: next.slug });
  };

  const toggle = useCallback((name) => {
    const el = audios.current[name];
    if (!el) return;
    const e = ensureEngine();
    if (!e.sources.has(name)) {
      const src = e.ctx.createMediaElementSource(el);
      src.connect(e.analyser);
      e.sources.set(name, src);
    }
    if (e.ctx.state === 'suspended') e.ctx.resume();
    if (playingRef.current === name) {
      el.pause();
      return;
    }
    Object.entries(audios.current).forEach(([n, a]) => { if (n !== name) a.pause(); });
    el.currentTime = 0;
    el.play();
    track('labs_voice_played', { voice: name });
  }, [ensureEngine]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    // When nothing plays the bars only need to move while the hero is on screen and breathing, so
    // after one idle frame (which also rests the card bars) the loop skips its work.
    let heroOnScreen = true;
    let settled = false;
    const io = new IntersectionObserver(([entry]) => { heroOnScreen = entry.isIntersecting; });
    if (heroBars.current[0]) io.observe(heroBars.current[0].parentElement);
    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      const e = engine.current;
      const live = playingRef.current && e;
      if (!live && settled && (reduced || !heroOnScreen)) return;
      settled = !live;
      if (live) e.analyser.getByteFrequencyData(e.data);
      const level = (i, n) => {
        if (live) {
          const bin = Math.floor(3 + (i / n) * (e.data.length * 0.55));
          return 0.08 + (e.data[bin] / 255) * 0.92;
        }
        if (reduced) return 0.18;
        return 0.14 + 0.1 * Math.sin(t / 620 + i * 0.45) * Math.sin(t / 1300 + i * 0.13) + 0.04;
      };
      heroBars.current.forEach((b, i) => { if (b) b.style.transform = `scaleY(${level(i, HERO_BARS)})`; });
      Object.entries(cardBars.current).forEach(([name, list]) => {
        const on = playingRef.current === name;
        list.current.forEach((b, i) => { if (b) b.style.transform = `scaleY(${on ? level(i, CARD_BARS) : 0.12})`; });
      });
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  /* The streaming illustration plays each time it scrolls into view. */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = streamRef.current;
    if (!el) return undefined;
    const partial = el.querySelector('.sp-partial');
    const final = el.querySelector('.sp-final');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      partial.textContent = '';
      final.textContent = FINAL;
      return undefined;
    }
    const tl = gsap.timeline({ paused: true });
    tl.call(() => { final.textContent = ''; gsap.set(final, { opacity: 0 }); });  // cleared only once it plays
    PARTIALS.forEach((text) => tl.call(() => { partial.textContent = text; }, null, '+=0.42'));
    tl.to(partial, { opacity: 0, duration: 0.25 }, '+=0.64')
      .call(() => { final.textContent = FINAL; })
      .fromTo(final, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35 })
      .set(partial, { textContent: '', opacity: 1 }, '+=2.2')
      .to(final, { opacity: 0.35, duration: 0.3 });
    const st = ScrollTrigger.create({ trigger: el, start: 'top 80%', onEnter: () => tl.restart(), onEnterBack: () => tl.restart() });
    return () => { st.kill(); tl.kill(); };
  }, []);

  return (
    <div className="st-home st-labs st-speech bg-white text-brand-aubergine antialiased">
      <Nav />
      <LabsSubnav />

      <main id="top">
        <header className="hero sp-hero">
          <div className="hero-glow" />
          <div className="wrap">
            <p className="hero-kicker">Surogate Speech</p>
            <h1 className="hero-title">
              Romanian, <span className="amber">spoken and understood.</span>
            </h1>
            <p className="hero-sub">
              A voice model that reads Romanian aloud, and a recognizer that writes it down, from a file or live as you
              speak. Both run natively in the Surogate engine, on a CPU or a GPU.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => toggle('female')} aria-pressed={playing === 'female'}>
                {playing === 'female' ? <Pause size={18} strokeWidth={2} aria-hidden="true" /> : <Play size={18} strokeWidth={2} aria-hidden="true" />}
                {playing === 'female' ? 'Pause Amami' : 'Hear Amami'}
              </button>
              <a className="btn btn-ghost" href="#listen">Codes, names and more</a>
            </div>
            <div className="sp-family" aria-label="The Surogate Speech family">
              {[...RECOGNIZERS, AMAMI].map((m) => (
                <figure key={m.id}>
                  <img src={m.mark} alt="" width="80" height="80" />
                  <figcaption>{m.name}</figcaption>
                </figure>
              ))}
            </div>
            <Bars count={HERO_BARS} className="sp-hero-bars" barsRef={heroBars} />
          </div>
        </header>

        <section className="sec tight sp-about">
          <div className="wrap sp-about-in reveal">
            <p className="sp-about-line">{SPEECH_ABOUT.line}</p>
            <div className="sp-about-links">
              <a className="lab-textlink" href={SPEECH_ABOUT.article} target="_blank" rel="noopener noreferrer">
                Read the launch article <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
              </a>
              <a className="lab-textlink" href={SPEECH_ABOUT.collection} target="_blank" rel="noopener noreferrer">
                All models on Hugging Face <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
            <p className="sp-about-note">{SPEECH_ABOUT.license}</p>
          </div>
        </section>

        <section className="sec" id="listen">
          <div className="wrap">
            <div className="sec-head reveal sp-head">
              <img className="sp-head-mark" src={AMAMI.mark} alt="" width="72" height="72" />
              <p className="eyebrow">{AMAMI.kind}</p>
              <h2 className="h-section">{AMAMI.name}: a Romanian voice on two CPU cores.</h2>
              <p className="lead">{AMAMI.line}</p>
            </div>
            <div className="sp-picker reveal">
              <div className="sp-cats-phone">
                <SheetSelect label="What to hear" value={sample.category}
                             onPick={(c) => pick(AMAMI.samples.find((x) => x.category === c))}
                             options={CATEGORIES.map((c) => ({ key: c, label: c }))} />
              </div>
              <div className="sp-cats" role="group" aria-label="What to hear">
                {CATEGORIES.map((c) => (
                  <button type="button" key={c} aria-pressed={sample.category === c}
                          onClick={() => pick(AMAMI.samples.find((x) => x.category === c))}>{c}</button>
                ))}
              </div>
              {lines.length > 1 ? (
                <div className="sp-lines" role="group" aria-label="Sentences">
                  {lines.map((x) => (
                    <button type="button" key={x.slug} aria-pressed={sample.slug === x.slug} onClick={() => pick(x)} lang="ro">
                      {x.text}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="sp-said" lang="ro">{sample.text}</p>
              )}
              {sample.readAs && <p className="sp-readas"><span>Read out as</span> <span lang="ro">{sample.readAs}</span></p>}
            </div>
            <div className="sp-voices">
              {AMAMI.voices.map((v) => {
                if (!cardBars.current[v.key]) cardBars.current[v.key] = { current: [] };
                const on = playing === v.key;
                return (
                  <article className="sp-voice reveal" data-on={on ? 'true' : 'false'} key={v.name}>
                    <div className="sp-voice-top">
                      <h3 className="sp-voice-n">{v.name}</h3>
                      <button type="button" className="sp-play" onClick={() => toggle(v.key)} aria-pressed={on}
                              aria-label={`${on ? 'Pause' : 'Play'} the ${v.name.toLowerCase()} reading this sentence`}>
                        {on ? <Pause size={20} strokeWidth={2.2} aria-hidden="true" /> : <Play size={20} strokeWidth={2.2} aria-hidden="true" />}
                      </button>
                    </div>
                    <Bars count={CARD_BARS} className="sp-card-bars" barsRef={cardBars.current[v.key]} />
                    <audio
                      ref={(el) => { if (el) audios.current[v.key] = el; }}
                      src={amamiSrc(v.key, sample.slug)}
                      preload="none"
                      crossOrigin="anonymous"
                      onPlay={() => { playingRef.current = v.key; setPlaying(v.key); }}
                      onPause={() => { if (playingRef.current === v.key) { playingRef.current = null; setPlaying(null); } }}
                      onEnded={() => { playingRef.current = null; setPlaying(null); }}
                    />
                  </article>
                );
              })}
            </div>
            <div className="sp-stat reveal">
              <div className="lab-fact-n">{AMAMI.stat.n}</div>
              <p className="lab-fact-l">{AMAMI.stat.l}</p>
              <a className="lab-textlink" href={AMAMI.repo} target="_blank" rel="noopener noreferrer">
                Model card
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="sec dark" id="recognize">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Speech recognition · Romanian</p>
              <h2 className="h-section">Jackrabbit ASR writes it down.</h2>
              <p className="lead">
                A 116M-parameter recognizer that writes cased, punctuated Romanian, from a file or live over HTTP or
                WebSocket.
              </p>
            </div>

            <div className="sp-stream reveal" ref={streamRef}>
              <div className="sp-stream-h">
                <span className="sp-rec" aria-hidden="true" /> Live, as you speak
                <em>Illustration</em>
              </div>
              <p className="sp-partial" aria-hidden="true" />
              <p className="sp-final">{FINAL}</p>
            </div>

            <div className="sp-recs">
              {RECOGNIZERS.map((m) => {
                const Icon = ICONS[m.icon];
                return (
                  <article className="lab-sp reveal" key={m.id}>
                    <img className="sp-card-mark" src={m.mark} alt="" width="64" height="64" />
                    <span className="lab-tag"><Icon size={14} strokeWidth={2} aria-hidden="true" />{m.kind}</span>
                    <h3 className="lab-sp-t">{m.name}</h3>
                    <p className="lab-sp-d">{m.line}</p>
                    <div className="lab-sp-stat">
                      <div className="lab-sp-n">{m.stat.n}</div>
                      <div className="lab-sp-l">{m.stat.l}</div>
                    </div>
                    <a className="lab-textlink" href={m.repo} target="_blank" rel="noopener noreferrer">
                      Model card
                      <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="sec" id="run">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Run it</p>
              <h2 className="h-section">One container, one HTTP API.</h2>
              <p className="lead">From the model cards. Amami runs on CPU only and needs Surogate 1.5.5 or later; drop <code>--gpus all</code> to run Jackrabbit on a CPU too.</p>
            </div>
            <div className="lab-code reveal">
              <div className="lab-pane">
                <div className="lab-pane-h"><span><b>Speak</b> with Amami</span><span>text to speech</span></div>
                <pre>{SPEECH_RUN.tts}</pre>
              </div>
              <div className="lab-pane">
                <div className="lab-pane-h"><span><b>Listen</b> with Jackrabbit</span><span>speech to text</span></div>
                <pre>{SPEECH_RUN.stt}</pre>
              </div>
            </div>
            <div className="lab-reslinks sp-links reveal">
              {SPEECH_LINKS.map((l) => (
                <a className="lab-textlink" key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                   onClick={() => track('labs_link_clicked', { label: l.label })}>
                  {l.label}
                  <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                </a>
              ))}
              <a className="lab-textlink" href="/labs/rune/">
                Surogate Rune
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

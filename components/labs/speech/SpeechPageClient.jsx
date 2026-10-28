'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import Button from '@/components/site/Button';
import Section, { H2, SectionHead } from '@/components/site/Section';
import { track } from '@/lib/analytics';
import { SPEECH_ABOUT, SPEECH_LINKS, SPEECH_MODELS, SPEECH_RUN, amamiSrc } from '@/lib/labs';
import DEMOS from '@/lib/speech-demos.json';
import LabsSubnav from '../LabsSubnav';
import LabsHero, { BTN } from '../LabsHero';
import SheetSelect from '../SheetSelect';
import { ICONS } from '../icons';

/*
 * surogate.ai/labs/speech. Every demo is real model output: Amami's clips come from its own worker, the call is
 * seven of them back to back, and the recognizer demos are FLEURS recordings with the transcripts of the published
 * evaluation runs (the live partials were recorded from the streaming model over the same audio).
 * One <audio> element plays everything; while it plays, a WebAudio analyser drives the hero bars.
 */

const HERO_BARS = 56;
const AMAMI = SPEECH_MODELS.find((m) => m.voices);
const RECOGNIZERS = SPEECH_MODELS.filter((m) => !m.voices);
const CATEGORIES = [...new Set(AMAMI.samples.map((x) => x.category))];
const FLEURS = (id) => `/labs/audio/fleurs/${id}.m4a`;
const FINAL_DELAY = 720; // ms from the end of speech to the final: 640 ms pause detection + finalize, model card
const ASR_NAMES = { jackrabbit: 'Jackrabbit · 116M parameters', size1000: 'A 1B-parameter recognizer', size1550: 'A 1.55B-parameter recognizer' };

function Bars({ count, className, barsRef }) {
  return (
    <div className={`sp-bars ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} ref={(el) => { barsRef.current[i] = el; }} />
      ))}
    </div>
  );
}

/* The front end's reading: "+" comes before a stressed vowel; a code is the list of its recorded clips. */
function Reading({ pieces }) {
  return (
    <p className="sp-reading" lang="ro">
      {pieces.map((p, i) => (p.code ? (
        <span className="sp-code" key={i} title="Assembled from recorded clips">
          {p.code.map((u, j) => <i key={j}>{u}</i>)}
        </span>
      ) : (
        <span key={i}>
          {p.text.split(/\+(.)/).map((part, j) => (j % 2 ? <b key={j}>{part}</b> : part))}{' '}
        </span>
      )))}
    </p>
  );
}

const Words = ({ words }) => (
  <>{words.map(([w, ok], i) => <span key={i}>{i ? ' ' : ''}<span className={ok ? undefined : 'sp-miss'}>{w}</span></span>)}</>
);

function PlayBtn({ on, onClick, label }) {
  return (
    <button type="button" className="sp-play" onClick={onClick} aria-pressed={on} aria-label={`${on ? 'Pause' : 'Play'} ${label}`}>
      {on ? <Pause size={20} strokeWidth={2.2} aria-hidden="true" /> : <Play size={20} strokeWidth={2.2} aria-hidden="true" />}
    </button>
  );
}

export default function SpeechPageClient() {
  useReveal();
  const heroBars = useRef([]);
  const audio = useRef(null);
  const engine = useRef(null);
  const playingRef = useRef(null);
  const loadedRef = useRef(null);   // what the audio element holds, set before play() so its events see it
  const [playing, setPlaying] = useState(null);   // key of what is playing, e.g. "amami:rg-standup"
  const [loaded, setLoaded] = useState(null);     // key of what the audio element holds, playing or not
  const [t, setT] = useState(0);
  const [ended, setEnded] = useState(null);       // key whose audio has ended (the streaming final shows after it)
  const [voice, setVoice] = useState('female');
  const [cat, setCat] = useState(CATEGORIES[0]);
  const [stream, setStream] = useState(DEMOS.stream[0]);
  const [cmp, setCmp] = useState(DEMOS.compare[0]);

  /* One AudioContext and analyser for the page, created on the first play (browsers require a gesture). */
  const ensureEngine = useCallback(() => {
    if (engine.current) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.72;
    analyser.connect(ctx.destination);
    ctx.createMediaElementSource(audio.current).connect(analyser);
    engine.current = { ctx, analyser, data: new Uint8Array(analyser.frequencyBinCount) };
  }, []);

  /* Play `src` under `key`; the same key again pauses or resumes it. */
  const play = useCallback((key, src, event) => {
    const el = audio.current;
    ensureEngine();
    if (engine.current.ctx.state === 'suspended') engine.current.ctx.resume();
    if (loaded === key && !el.ended) {
      if (el.paused) el.play(); else el.pause();
      return;
    }
    el.src = src;
    loadedRef.current = key;
    setLoaded(key);
    setEnded(null);
    setT(0);
    el.play();
    track(event.name, event.props);
  }, [ensureEngine, loaded]);

  const sayAmami = (slug, v = voice) => play(`amami:${v}:${slug}`, amamiSrc(v, slug), { name: 'labs_voice_played', props: { voice: v, sample: slug } });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    // When nothing plays the bars only need to move while the hero is on screen and breathing.
    let heroOnScreen = true;
    let settled = false;
    const io = new IntersectionObserver(([entry]) => { heroOnScreen = entry.isIntersecting; });
    if (heroBars.current[0]) io.observe(heroBars.current[0].parentElement);
    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      const e = engine.current;
      const live = playingRef.current && e;
      if (!live && settled && (reduced || !heroOnScreen)) return;
      settled = !live;
      if (live) e.analyser.getByteFrequencyData(e.data);
      heroBars.current.forEach((b, i) => {
        if (!b) return;
        let level;
        if (live) level = 0.08 + (e.data[Math.floor(3 + (i / HERO_BARS) * (e.data.length * 0.55))] / 255) * 0.92;
        else if (reduced) level = 0.18;
        else level = 0.14 + 0.1 * Math.sin(now / 620 + i * 0.45) * Math.sin(now / 1300 + i * 0.13) + 0.04;
        b.style.transform = `scaleY(${level})`;
      });
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  /* The streaming final lands FINAL_DELAY after the recording ends, as it would after a real pause. */
  useEffect(() => {
    if (!ended?.startsWith('stream:') || ended.endsWith(':final')) return undefined;
    const id = setTimeout(() => setEnded(`${ended}:final`), FINAL_DELAY);
    return () => clearTimeout(id);
  }, [ended]);

  const isOn = (key) => playing === key;
  const streamKey = `stream:${stream.id}`;
  const streamLive = loaded === streamKey;
  const partial = streamLive ? [...stream.partials].reverse().find(([at]) => at <= t)?.[1] ?? '' : '';
  const streamFinal = ended === `${streamKey}:final`;
  const callOn = loaded === 'call';
  const turn = callOn ? DEMOS.call.findLastIndex((c) => c.start <= t + 0.05) : -1;

  return (
    <div className="v2 st-home st-labs st-speech w-full bg-white font-sans text-ink">
      <Nav />
      <LabsSubnav />
      <audio
        ref={audio}
        preload="none"
        crossOrigin="anonymous"
        onPlay={() => { playingRef.current = loadedRef.current; setPlaying(loadedRef.current); }}
        onPause={() => { playingRef.current = null; setPlaying(null); }}
        onEnded={() => { playingRef.current = null; setPlaying(null); setEnded(loadedRef.current); }}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
      />

      <main id="top">
        <LabsHero
          title="Low-latency speech models."
          sub="Streaming Speech-To-Text and Text-To-Speech that run natively in the Surogate engine, on a CPU or a GPU."
          actions={<>
            <button type="button" className={BTN.primary} onClick={() => sayAmami('rg-standup', 'female')} aria-pressed={isOn('amami:female:rg-standup')}>
              {isOn('amami:female:rg-standup') ? <Pause size={15} strokeWidth={2.2} aria-hidden="true" /> : <Play size={15} strokeWidth={2.2} aria-hidden="true" />}
              {isOn('amami:female:rg-standup') ? 'Pause Amami' : 'Hear Amami'}
            </button>
            <Button href="#listen" variant="secondary" size="lg">Hear all the demos</Button>
          </>}
          visual={(
            <div className="sp-family" aria-label="The Surogate Speech family">
              {[...RECOGNIZERS, AMAMI].map((m) => (
                <figure key={m.id}>
                  <img src={m.mark} alt="" width="80" height="80" />
                  <figcaption>{m.name}</figcaption>
                </figure>
              ))}
            </div>
          )}
        >
          <Bars count={HERO_BARS} className="sp-hero-bars" barsRef={heroBars} />
        </LabsHero>

        <Section tone="grey" inner="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <p className="m-0 max-w-[36ch] text-balance text-[22px] font-[450] leading-[1.35] tracking-[-0.01em] md:text-[28px]">{SPEECH_ABOUT.line}</p>
          <p className="m-0 max-w-[36ch] text-[14px] leading-[1.55] text-ink/60">{SPEECH_ABOUT.license}</p>
        </Section>

        <Section id="listen">
            <img className="sp-head-mark" src={AMAMI.mark} alt="" width="64" height="64" />
            <SectionHead title={`${AMAMI.name}: realtime voices on two CPU cores.`} sub={AMAMI.line} />

            <div className="sp-controls reveal">
              <div className="sp-voice-switch" role="group" aria-label="Voice">
                {AMAMI.voices.map((v) => (
                  <button type="button" key={v.key} aria-pressed={voice === v.key} onClick={() => setVoice(v.key)}>{v.name}</button>
                ))}
              </div>
              <div className="sp-cats-phone">
                <SheetSelect label="What to hear" value={cat} onPick={setCat} options={CATEGORIES.map((c) => ({ key: c, label: c }))} />
              </div>
              <div className="sp-cats" role="group" aria-label="What to hear">
                {CATEGORIES.map((c) => (
                  <button type="button" key={c} aria-pressed={cat === c} onClick={() => { setCat(c); track('labs_amami_category', { category: c }); }}>{c}</button>
                ))}
              </div>
            </div>

            <div className="sp-grid">
              {AMAMI.samples.filter((x) => x.category === cat).map((x) => {
                const key = `amami:${voice}:${x.slug}`;
                const here = loaded === key;
                return (
                  <article className="sp-say" data-on={here ? 'true' : 'false'} key={x.slug}>
                    <button type="button" className="sp-say-btn" onClick={() => sayAmami(x.slug)} aria-pressed={isOn(key)}>
                      <span className="sp-play" aria-hidden="true">
                        {isOn(key) ? <Pause size={18} strokeWidth={2.2} /> : <Play size={18} strokeWidth={2.2} />}
                      </span>
                      <span className="sp-say-t" lang="ro">{x.text}</span>
                    </button>
                    {here && (
                      <div className="sp-say-more">
                        <div className="sp-prog"><i style={{ transform: `scaleX(${Math.min(1, t / (audio.current?.duration || 1))})` }} /></div>
                        <p className="sp-reads">What Amami reads <span>stress in bold, codes from recorded clips</span></p>
                        <Reading pieces={DEMOS.readings[x.slug]} />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            <div className="sp-call reveal">
              <div className="sp-call-h">
                <div>
                  <h3 className="sp-call-t">Both sides of this call are Amami.</h3>
                  <p className="sp-call-d">
                    Seven lines, two voices, one bank support call: English words, an SMS code dictated from recorded
                    clips, an amount in lei and bani. Generated on a laptop CPU with 2 threads, first audio in about 40 ms per line.
                  </p>
                </div>
                <PlayBtn on={isOn('call')} label="the call"
                         onClick={() => play('call', '/labs/audio/amami/call.m4a', { name: 'labs_amami_call_played', props: {} })} />
              </div>
              <ol className="sp-bubbles" lang="ro">
                {DEMOS.call.map((c, i) => (
                  <li key={i} className={c.voice === 'female' ? 'agent' : 'caller'}
                      data-state={!callOn ? 'idle' : i === turn ? 'now' : i < turn ? 'past' : 'next'}>
                    <span>{c.role}</span>{c.text}
                  </li>
                ))}
              </ol>
            </div>

            <div className="sp-stat reveal">
              <div className="lab-fact-n">{AMAMI.stat.n}</div>
              <p className="lab-fact-l">{AMAMI.stat.l}</p>
              <a className="lab-textlink" href={AMAMI.repo} target="_blank" rel="noopener noreferrer">
                Model card
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
        </Section>

        <Section tone="aubergine" id="recognize" className="dark">
            <SectionHead title="Jackrabbit ASR writes it down."
              sub="A 116M-parameter recognizer that writes cased, punctuated text, from a file or live over HTTP or WebSocket. Below, real people reading real sentences." />

            <div className="sp-stream reveal">
              <div className="sp-stream-h">
                <span className="sp-rec" aria-hidden="true" data-on={isOn(streamKey) ? 'true' : 'false'} /> Live, as you speak
                <div className="sp-tabs" role="group" aria-label="Recording">
                  {DEMOS.stream.map((s) => (
                    <button type="button" key={s.id} aria-pressed={stream.id === s.id}
                            onClick={() => { audio.current?.pause(); setStream(s); }}>{s.topic}</button>
                  ))}
                </div>
              </div>
              <div className="sp-stream-body">
                <PlayBtn on={isOn(streamKey)} label={`the recording: ${stream.topic}`}
                         onClick={() => play(streamKey, FLEURS(stream.id), { name: 'labs_stream_played', props: { clip: stream.id } })} />
                <div className="sp-stream-text" aria-live="polite">
                  {!streamLive && <p className="sp-partial sp-hint">Press play. Words appear as the recording reaches them.</p>}
                  {streamLive && !streamFinal && <p className="sp-partial" lang="ro">{partial}<span className="sp-caret" /></p>}
                  {streamFinal && <p className="sp-final" lang="ro"><Words words={stream.final} /></p>}
                </div>
              </div>
              <p className="sp-note">
                Partials: Jackrabbit Streaming run over this recording, shown at the moment of audio it had heard.
                Final: from the published evaluation run, re-read with full context and a 4-gram LM after the pause;
                words it changed are underlined.
              </p>
            </div>

            <div className="sp-cmp reveal">
              <div className="sp-stream-h">
                Same recording, two recognizers 9 to 13 times bigger
                <div className="sp-tabs" role="group" aria-label="Recording">
                  {DEMOS.compare.map((c, i) => (
                    <button type="button" key={c.id} aria-pressed={cmp.id === c.id}
                            onClick={() => { audio.current?.pause(); setCmp(c); }}>Clip {i + 1}</button>
                  ))}
                </div>
              </div>
              <div className="sp-stream-body">
                <PlayBtn on={isOn(`cmp:${cmp.id}`)} label="the recording"
                         onClick={() => play(`cmp:${cmp.id}`, FLEURS(cmp.id), { name: 'labs_compare_played', props: { clip: cmp.id } })} />
                <p className="sp-ref" lang="ro"><span>What was said</span>{cmp.reference}</p>
              </div>
              <div className="sp-rows">
                {cmp.models.map((m) => (
                  <div className="sp-row" key={m.key} data-us={m.key === 'jackrabbit' ? 'true' : 'false'}>
                    <div className="sp-row-n">
                      {ASR_NAMES[m.key]}
                      <em>{m.errors ? `${m.errors} wrong word${m.errors > 1 ? 's' : ''}` : 'exact'}</em>
                    </div>
                    <p lang="ro"><Words words={m.words} /></p>
                  </div>
                ))}
              </div>
              <p className="sp-note">
                Clips picked to show the difference. Over all 883 FLEURS Romanian test clips the word error rate is
                5.69% for Jackrabbit (CTC + 4-gram), 5.95% for the 1B model and 8.42% for the 1.55B model, each run
                through the same harness; every transcript is in the evaluation dataset. Recordings: FLEURS by Google,
                CC BY 4.0.
              </p>
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
        </Section>

        <Section id="run">
          <SectionHead title="One container, one HTTP API."
            sub={<>From the model cards. Amami runs on CPU only and needs Surogate 1.5.5 or later; drop <code>--gpus all</code> to run Jackrabbit on a CPU too.</>} />
          <div className="lab-code">
            <div className="lab-pane">
              <div className="lab-pane-h"><span><b>Speak</b> with Amami</span><span>text to speech</span></div>
              <pre>{SPEECH_RUN.tts}</pre>
            </div>
            <div className="lab-pane">
              <div className="lab-pane-h"><span><b>Listen</b> with Jackrabbit</span><span>speech to text</span></div>
              <pre>{SPEECH_RUN.stt}</pre>
            </div>
          </div>
          <div className="lab-reslinks">
            {SPEECH_LINKS.map((l) => (
              <a className="lab-textlink" key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                 onClick={() => track('labs_link_clicked', { label: l.label })}>
                {l.label}
                <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
              </a>
            ))}
          </div>
        </Section>

        <Section tone="aubergine" rings inner="flex flex-col items-start gap-6">
          <div>
            <h2 className={H2.feature}>Run speech on your own servers.</h2>
            <p className="m-0 mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-white/70">Jackrabbit listens and Amami speaks, from one container, on a CPU or a GPU.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={SPEECH_ABOUT.collection} variant="sun" size="lg" external arrow event="labs_link_clicked" eventProps={{ label: 'speech_collection' }}>All models on Hugging Face</Button>
            <Button href={SPEECH_ABOUT.article} variant="glass" size="lg" external>Read the launch article</Button>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

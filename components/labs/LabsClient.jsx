'use client';

import { ArrowRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { ENGINE, RUNE_DEMOS, RUNE_FACTS, SPEECH_MODELS } from '@/lib/labs';
import EngineCores from './EngineCores';
import LabsSubnav from './LabsSubnav';
import RuneGlyph from './RuneGlyph';
import { ICONS } from './icons';

/*
 * surogate.ai/labs. The hub: one portal per model line and one for the engine that trains and serves
 * them, then the live examples. Each portal leads to its own page (/labs/rune, /labs/speech,
 * /labs/engine); the sub-nav links all of them.
 */
export default function LabsClient() {
  useReveal();

  return (
    <div className="st-home st-labs st-hub bg-white text-brand-aubergine antialiased">
      <Nav />
      <LabsSubnav />

      <main id="top">
        <header className="hero hub-hero">
          <div className="hero-glow" />
          <div className="wrap">
            <p className="hero-kicker reveal">Surogate Labs</p>
            <h1 className="hero-title reveal d1">
              Our models
            </h1>
            <p className="hero-sub reveal d2">
              A decision model that sees, SOTA Speech-To-Text and Text-To-Speech that run on edge devices, and
              the open-source engine we train and serve them with.
            </p>
          </div>
        </header>

        <section className="sec hub-portals">
          <div className="wrap hub-grid">
            <a className="hub-portal hub-rune reveal" href="/labs/rune/"
               onClick={() => track('labs_portal_clicked', { portal: 'rune' })}>
              <span className="hub-edge" aria-hidden="true" />
              <span className="hub-glyph-wrap" aria-hidden="true">
                <span className="hub-ripple" />
                <span className="hub-ripple" />
                <RuneGlyph className="hub-glyph" />
              </span>
              <span className="hub-kind">Decision model</span>
              <span className="hub-name">Surogate Rune</span>
              <span className="hub-line">
                Text or an image in, one of your options out, with a calibrated probability for every one.
              </span>
              <span className="hub-facts">
                {RUNE_FACTS.slice(0, 3).map((f) => (
                  <span key={f.n}><b>{f.n}</b> {f.l.split(',')[0]}</span>
                ))}
              </span>
              <span className="hub-go">See it decide <ArrowRight size={18} strokeWidth={2} aria-hidden="true" /></span>
            </a>

            <a className="hub-portal hub-speech reveal d1" href="/labs/speech/"
               onClick={() => track('labs_portal_clicked', { portal: 'speech' })}>
              <span className="hub-wave" aria-hidden="true">
                {Array.from({ length: 22 }, (_, i) => <i key={i} style={{ '--i': i }} />)}
              </span>
              <span className="hub-kind">Speech · Romanian</span>
              <span className="hub-name">Surogate Speech</span>
              <span className="hub-line">
                Small open speech models for agents that run on edge devices. Jackrabbit ASR listens, Amami TTS speaks.
              </span>
              <span className="hub-facts">
                {SPEECH_MODELS.map((m) => (
                  <span key={m.id}><b>{m.stat.n}</b> {m.name}</span>
                ))}
              </span>
              <span className="hub-go">Listen <ArrowRight size={18} strokeWidth={2} aria-hidden="true" /></span>
            </a>

            <a className="hub-portal hub-engine reveal d2" href="/labs/engine/"
               onClick={() => track('labs_portal_clicked', { portal: 'engine' })}>
              <EngineCores className="hub-cores" />
              <span className="hub-kind">Training &amp; serving · Open source</span>
              <span className="hub-name">Surogate Engine</span>
              <span className="hub-line">{ENGINE.line}</span>
              <span className="hub-facts">
                {ENGINE.facts.map((f) => (
                  <span key={f.n}><b>{f.n}</b> {f.l}</span>
                ))}
              </span>
              <span className="hub-go">See the numbers <ArrowRight size={18} strokeWidth={2} aria-hidden="true" /></span>
            </a>
          </div>
        </section>

        <section className="sec tight hub-examples">
          <div className="wrap">
            <div className="hub-ex-head reveal">
              <h2 className="h-section">Live Rune demos</h2>
              <a className="lab-textlink" href="/labs/rune-examples/">
                All the demos <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
            <div className="hub-ex reveal d1">
              {RUNE_DEMOS.slice(0, 6).map((d) => {
                const Icon = ICONS[d.icon];
                return (
                  <a className="hub-ex-card" key={d.slug} href={`/labs/rune-examples/?demo=${d.slug}`}>
                    <img src={d.shot} alt="" loading="lazy" width="1200" height="800" />
                    <span className="hub-ex-t"><Icon size={16} strokeWidth={2} aria-hidden="true" /> {d.title}</span>
                    <span className="hub-ex-k">{d.kind}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

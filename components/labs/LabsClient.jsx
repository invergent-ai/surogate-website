'use client';

import { ArrowRight, ArrowUpRight, Headphones } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { RUNE, RUNE_DEMOS, RUNE_FACTS, SPEECH_LINKS, SPEECH_MODELS } from '@/lib/labs';
import { ICONS } from './icons';

/*
 * surogate.ai/labs. The models the Surogate team trained and published, each
 * with its numbers and something to try. Data and numbers live in lib/labs.js.
 */
export default function LabsClient() {
  useReveal();

  return (
    <div className="st-home st-labs bg-white text-brand-aubergine antialiased overflow-x-hidden">
      <Nav />

      <main id="top">
        <header className="hero">
          <div className="hero-glow" />
          <div className="hero-rabbit" aria-hidden="true" />
          <div className="wrap">
            <p className="hero-kicker reveal">Surogate Labs</p>
            <h1 className="hero-title reveal d1">
              Models we trained, <span className="amber">running where you can try them.</span>
            </h1>
            <p className="hero-sub reveal d2">
              A decision model that looks at images, and Romanian speech in both directions. Each
              one comes with its model card, its numbers and something to try in the browser.
            </p>
            <div className="hero-actions reveal d3">
              <a
                className="btn btn-primary"
                href="/labs/rune-examples/"
                onClick={() => track('labs_cta_clicked', { cta: 'rune_examples', location: 'labs_hero' })}
              >
                <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                Try Rune live
              </a>
              <a
                className="btn btn-ghost"
                href="#speech"
                onClick={() => track('labs_cta_clicked', { cta: 'speech', location: 'labs_hero' })}
              >
                <Headphones size={18} strokeWidth={2} aria-hidden="true" />
                Listen to Amami
              </a>
            </div>
          </div>
        </header>

        <section className="sec" id="rune">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Decision model</p>
              <h2 className="h-section">
                Surogate Rune: <span className="amber">a decision, not prose.</span>
              </h2>
              <p className="lead">
                Give it text, structured data or an image, a question and your options. It returns
                one of your options with a calibrated probability for each, so a close call and a
                clear one look different, and a threshold means something.
              </p>
            </div>

            <div className="lab-feature">
              <div className="reveal d1">
                <div className="lab-facts">
                  {RUNE_FACTS.map((f) => (
                    <div className="lab-fact" key={f.n}>
                      <div className="lab-fact-n">{f.n}</div>
                      <div className="lab-fact-l">{f.l}</div>
                    </div>
                  ))}
                </div>
                <div className="lab-actions">
                  <a className="btn btn-primary" href="/labs/rune-examples/">
                    <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                    See all five demos
                  </a>
                  {[
                    ['Launch post', RUNE.blog],
                    ['Model card', RUNE.model],
                    ['API docs', RUNE.docs],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      className="lab-textlink"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('labs_link_clicked', { label })}
                    >
                      {label}
                      <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="lab-minis reveal d2">
                <p className="lab-minis-h">Live demos</p>
                {RUNE_DEMOS.map((d) => {
                  const Icon = ICONS[d.icon];
                  return (
                    <a className="lab-mini" href={`/labs/rune-examples/#${d.slug}`} key={d.slug}>
                      <span className="lab-mini-ic">
                        <Icon size={20} strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="lab-mini-t">{d.title}</span>
                        <br />
                        <span className="lab-mini-k">{d.kind}</span>
                      </span>
                      <ArrowRight className="lab-mini-go" size={18} strokeWidth={2} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="sec dark" id="speech">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Surogate Speech</p>
              <h2 className="h-section">
                Romanian speech, <span className="amber">in and out.</span>
              </h2>
              <p className="lead">
                A voice model that reads Romanian aloud and a recognizer that writes it down, live
                or from a file. Both are served natively by the Surogate engine, on CPU or GPU.
              </p>
            </div>

            <div className="lab-speech">
              {SPEECH_MODELS.map((m) => {
                const Icon = ICONS[m.icon];
                return (
                  <article className="lab-sp reveal d1" key={m.id}>
                    <span className="lab-tag">
                      <Icon size={14} strokeWidth={2} aria-hidden="true" />
                      {m.kind}
                    </span>
                    <h3 className="lab-sp-t">{m.name}</h3>
                    <p className="lab-sp-d">{m.line}</p>
                    {m.voices && (
                      <div className="lab-voices">
                        {m.voices.map((v) => (
                          <div className="lab-voice" key={v.name}>
                            <span className="lab-voice-n">{v.name}</span>
                            <audio
                              controls
                              preload="none"
                              src={v.src}
                              aria-label={`${v.name}, Amami voice sample`}
                              onPlay={() => track('labs_voice_played', { voice: v.name })}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="lab-sp-stat">
                      <div className="lab-sp-n">{m.stat.n}</div>
                      <div className="lab-sp-l">{m.stat.l}</div>
                    </div>
                    <a
                      className="lab-textlink"
                      href={m.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('labs_link_clicked', { label: m.id })}
                    >
                      Model card
                      <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>

            <div className="lab-reslinks reveal d2">
              {SPEECH_LINKS.map((l) => (
                <a
                  className="lab-textlink"
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('labs_link_clicked', { label: l.label })}
                >
                  {l.label}
                  <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

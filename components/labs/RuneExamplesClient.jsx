'use client';

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { RUNE, RUNE_DEMOS, RUNE_EXAMPLE, RUNE_FACTS } from '@/lib/labs';
import DemoRow from './DemoRow';

/*
 * surogate.ai/labs/rune-examples. Five live demos of Rune, each a public HF
 * Space embedded on click. The data, numbers and links live in lib/labs.js.
 */
export default function RuneExamplesClient() {
  useReveal();

  return (
    <div className="st-home st-labs bg-white text-brand-aubergine antialiased overflow-x-hidden">
      <Nav />

      <main id="top">
        <header className="hero">
          <div className="hero-glow" />
          <div className="hero-rabbit" aria-hidden="true" />
          <div className="wrap">
            <p className="hero-kicker reveal">Labs · Surogate Rune</p>
            <h1 className="hero-title reveal d1">
              Decisions you can <span className="amber">watch happen.</span>
            </h1>
            <p className="hero-sub reveal d2">
              Rune is an open decision model. Give it text or an image, a question and your
              options, and it answers with one of them and a probability for every one. Five
              demos, all live.
            </p>
            <div className="hero-actions reveal d3">
              <a
                className="btn btn-primary"
                href="#demos"
                onClick={() => track('labs_cta_clicked', { cta: 'try_demos' })}
              >
                <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
                Try the demos
              </a>
              <a
                className="btn btn-ghost"
                href={RUNE.blog}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('labs_cta_clicked', { cta: 'launch_post' })}
              >
                Read the launch post
                <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-meta reveal d3">
              {RUNE_FACTS.map((f) => (
                <div className="hm" key={f.n}>
                  <div className="hm-n">
                    <em>{f.n}</em>
                  </div>
                  <div className="hm-l">{f.l}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="sec" id="demos">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Five demos</p>
              <h2 className="h-section">
                Three that look, one that plays, <span className="amber">one that reads.</span>
              </h2>
              <p className="lead">
                Every result on screen is the model&apos;s full probability distribution, not a
                sentence to trust. Open one, and the Space runs right here.
              </p>
            </div>

            <div className="lab-demos">
              {RUNE_DEMOS.map((d) => (
                <DemoRow demo={d} key={d.slug} />
              ))}
            </div>

            <p className="lab-note reveal">
              The demos call a hosted Rune. Nothing you draw, upload or paste is stored.
            </p>
          </div>
        </section>

        <section className="sec dark" id="how">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">How it works</p>
              <h2 className="h-section">
                One request, <span className="amber">typed answers back.</span>
              </h2>
              <p className="lead">
                Every demo above is this call. The state is your input, each question names its
                type and its options, and each answer comes back with the probability of every
                option you offered.
              </p>
            </div>

            <div className="lab-code reveal d1">
              <div className="lab-pane">
                <div className="lab-pane-h">
                  <span>
                    <b>POST</b> /v1/decisions
                  </span>
                  <span>request</span>
                </div>
                <pre>{RUNE_EXAMPLE.request}</pre>
              </div>
              <div className="lab-pane">
                <div className="lab-pane-h">
                  <span>
                    <b>200</b> {RUNE_EXAMPLE.latency}
                  </span>
                  <span>response</span>
                </div>
                <pre>{RUNE_EXAMPLE.response}</pre>
              </div>
            </div>

            <div className="lab-actions reveal d2">
              <a
                className="btn btn-primary"
                href={RUNE.model}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('labs_cta_clicked', { cta: 'model_card' })}
              >
                Get the weights
                <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
              </a>
              <a
                className="btn btn-ghost"
                href={RUNE.docs}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('labs_cta_clicked', { cta: 'decisions_docs' })}
              >
                Read the API docs
                <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

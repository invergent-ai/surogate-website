'use client';

import { ArrowDown, ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { ENGINE } from '@/lib/labs';
import EngineCores from '../EngineCores';
import LabsSubnav from '../LabsSubnav';

/*
 * surogate.ai/labs/engine. The training and serving framework the models are built with. Every number and
 * capability comes from the repo's README; the code is lifted from its quickstart.
 */

const num = (n) => n.toLocaleString('en-US');
const value = (n, note) => (note ? `${num(n)} · ${note}` : num(n));

/* A bar with its value inside; a bar too short to hold the value carries it just past its end. */
const INSIDE = 0.4;

function Bar({ kind, name, w, v }) {
  return (
    <div className={`en-bar ${kind}`}>
      <span className="en-bar-n">{name}</span>
      <div className="en-track">
        <i style={{ '--w': w }}>{w >= INSIDE && <span className="en-bar-v">{v}</span>}</i>
        {w < INSIDE && <span className="en-bar-v out">{v}</span>}
      </div>
    </div>
  );
}

/* One benchmark as small multiples: each row is its own pair of bars from zero, Surogate against the
   baseline it names, because the rows are different models and loads and share no scale. The bars wipe
   in when the chart scrolls into view (.reveal.in). */
function Bench({ title, unit, rows }) {
  return (
    <figure className="en-chart reveal">
      <figcaption className="en-chart-h">
        <span className="exp-eye">{title}</span>
        <span className="en-legend" aria-hidden="true">
          <span><i className="us" />Surogate</span>
          <span><i className="base" />Baseline</span>
        </span>
      </figcaption>
      {rows.map((r, k) => {
        const said = `${r.label}: Surogate ${value(r.us, r.usNote)} ${unit}, ${r.baseName} ${value(r.base, r.baseNote)} ${unit}, ${r.gain}`;
        return (
          <div className="en-row" key={r.label} style={{ '--k': k }} role="img" aria-label={said} title={said}>
            <div className="en-row-h"><span>{r.label}</span><b>{r.gain}</b></div>
            <Bar kind="us" name="Surogate" w={1} v={value(r.us, r.usNote)} />
            <Bar kind="base" name={r.baseName} w={r.base / r.us} v={value(r.base, r.baseNote)} />
          </div>
        );
      })}
    </figure>
  );
}

export default function EnginePageClient() {
  useReveal();

  return (
    <div className="st-home st-labs st-engine bg-white text-brand-aubergine antialiased">
      <Nav />
      <LabsSubnav />

      <main id="top">
        <header className="hero en-hero">
          <div className="hero-glow" />
          <div className="wrap">
            <div className="en-hero-in">
              <div>
                <p className="hero-kicker">Surogate Engine</p>
                <h1 className="hero-title">
                  Train and serve on <span className="amber">one engine</span>
                </h1>
                <p className="hero-sub">
                  Native C++/CUDA engines for NVIDIA GPUs. Pretrain, fine-tune and run reinforcement learning, then serve
                  the result over the HTTP APIs your clients already speak.
                </p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href={ENGINE.repo} target="_blank" rel="noopener noreferrer"
                     onClick={() => track('engine_cta_clicked', { cta: 'github' })}>
                    <Star size={18} strokeWidth={2} aria-hidden="true" />
                    Star on GitHub
                  </a>
                  <a className="btn btn-ghost" href="#speed" onClick={() => track('engine_cta_clicked', { cta: 'numbers' })}>
                    <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
                    See the numbers
                  </a>
                </div>
              </div>
              <EngineCores className="en-hero-cores" rows={8} />
            </div>
            <div className="hero-meta">
              {ENGINE.headline.map((f) => (
                <div className="hm" key={f.l}>
                  <div className="hm-n">{f.n}</div>
                  <div className="hm-l">{f.l}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="sec tight en-install">
          <div className="wrap reveal">
            <p className="en-install-l">
              Open source under Apache 2.0. Install on Linux x86_64 with Python 3.12, CUDA 13 and a supported NVIDIA GPU:
            </p>
            <div className="lab-pane">
              <div className="lab-pane-h"><span><b>Install</b></span><span>linux · x86_64</span></div>
              <pre>{`${ENGINE.install}\nsource .venv/bin/activate`}</pre>
            </div>
          </div>
        </section>

        <section className="sec dark" id="speed">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Speed you can measure</p>
              <h2 className="h-section">Fast for one user. <span className="amber">Fast under load.</span></h2>
              <p className="lead">
                At 100 users, Qwen3.5-4B returns its first token in 40 ms at the median, against 230 ms for vLLM.
                Training Qwen3-0.6B with FP4 LoRA scales from 36,400 tok/s on one RTX 5090 to 136,200 on four.
              </p>
            </div>
            <div className="en-benches">
              <Bench title="Serving · decode tokens/s · RTX 5090" unit="tok/s" rows={ENGINE.serving} />
              <Bench title="Training · tokens/s" unit="tok/s" rows={ENGINE.training} />
            </div>
          </div>
        </section>

        <section className="sec en-engines" id="engines">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Two engines, one workflow</p>
              <h2 className="h-section">Train it, then serve what you trained.</h2>
            </div>
            <div className="en-cols">
              {ENGINE.engines.map((e) => (
                <article className="en-col reveal" key={e.t}>
                  <h3 className="en-col-t">{e.t}</h3>
                  <p className="en-col-d">{e.d}</p>
                  <ul className="en-list">
                    {e.items.map(([t, d]) => (
                      <li key={t}><b>{t}</b>{d}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="run">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Run it</p>
              <h2 className="h-section">One command to serve, one config to train.</h2>
              <p className="lead">
                From the quickstart. Training needs an Ada, Hopper or Blackwell GPU; serving targets the RTX 40 and
                50 series, L4/L40 and H100/H200.
              </p>
            </div>
            <div className="lab-code reveal">
              <div className="lab-pane">
                <div className="lab-pane-h"><span><b>Serve</b> a model</span><span>chat completions</span></div>
                <pre>{ENGINE.run.serve}</pre>
              </div>
              <div className="lab-pane">
                <div className="lab-pane-h"><span><b>Train</b>, then serve it</span><span>lora · sft</span></div>
                <pre>{ENGINE.run.train}</pre>
              </div>
            </div>
            <div className="lab-reslinks reveal">
              {ENGINE.links.map((l) => (
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

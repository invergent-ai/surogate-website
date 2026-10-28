'use client';

import { ArrowUpRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import Button from '@/components/site/Button';
import Section, { H2, SectionHead } from '@/components/site/Section';
import { track } from '@/lib/analytics';
import { ENGINE } from '@/lib/labs';
import EngineCores from '../EngineCores';
import LabsSubnav from '../LabsSubnav';
import LabsHero, { HeroFacts } from '../LabsHero';

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
        <span className="en-chart-t">{title}</span>
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
    <div className="v2 st-home st-labs st-engine w-full bg-white font-sans text-ink">
      <Nav />
      <LabsSubnav />

      <main id="top">
        <LabsHero
          title="Train and serve on one engine."
          sub="Native C++/CUDA engines for NVIDIA GPUs. Pretrain, fine-tune and run reinforcement learning, then serve the result over the HTTP APIs your clients already speak."
          actions={<>
            <Button href={ENGINE.repo} external size="lg" arrow event="engine_cta_clicked" eventProps={{ cta: 'github' }}>Star on GitHub</Button>
            <Button href="#speed" variant="secondary" size="lg" event="engine_cta_clicked" eventProps={{ cta: 'numbers' }}>See the numbers</Button>
          </>}
          visual={<EngineCores className="en-hero-cores" rows={8} />}
        >
          <HeroFacts items={ENGINE.headline} />
        </LabsHero>

        <Section tone="aubergine" id="speed">
          <SectionHead title="Fast for one user. Fast under load."
            sub="At 100 users, Qwen3.5-4B returns its first token in 40 ms at the median, against 230 ms for vLLM. Training Qwen3-0.6B with FP4 LoRA scales from 36,400 tok/s on one RTX 5090 to 136,200 on four." />
          <div className="en-benches">
            <Bench title="Serving · decode tokens/s · RTX 5090" unit="tok/s" rows={ENGINE.serving} />
            <Bench title="Training · tokens/s" unit="tok/s" rows={ENGINE.training} />
          </div>
        </Section>

        <Section tone="grey" id="engines">
          <SectionHead title="Train it, then serve what you trained." />
          <div className="en-cols">
            {ENGINE.engines.map((e) => (
              <article className="en-col" key={e.t}>
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
        </Section>

        <Section id="run">
          <SectionHead title="One command to serve, one config to train."
            sub="From the quickstart. Training needs an Ada, Hopper or Blackwell GPU; serving targets the RTX 40 and 50 series, L4/L40 and H100/H200." />
          <div className="lab-pane">
            <div className="lab-pane-h"><span><b>Install</b> on Linux x86_64, Python 3.12, CUDA 13</span><span>apache 2.0</span></div>
            <pre>{`${ENGINE.install}\nsource .venv/bin/activate`}</pre>
          </div>
          <div className="lab-code">
            <div className="lab-pane">
              <div className="lab-pane-h"><span><b>Serve</b> a model</span><span>chat completions</span></div>
              <pre>{ENGINE.run.serve}</pre>
            </div>
            <div className="lab-pane">
              <div className="lab-pane-h"><span><b>Train</b>, then serve it</span><span>lora · sft</span></div>
              <pre>{ENGINE.run.train}</pre>
            </div>
          </div>
          <div className="lab-reslinks">
            {ENGINE.links.map((l) => (
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
            <h2 className={H2.feature}>Run it on your own GPUs.</h2>
            <p className="m-0 mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-white/70">Open source under Apache 2.0, the engine we train our own models on.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={ENGINE.repo} variant="sun" size="lg" external arrow event="engine_cta_clicked" eventProps={{ cta: 'github_closing' }}>Star on GitHub</Button>
            <Button href="/labs/rune/" variant="glass" size="lg">Surogate Rune</Button>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

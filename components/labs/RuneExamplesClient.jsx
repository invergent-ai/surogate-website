'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { DEMO_FILTERS, FILMED, RUNE, RUNE_DEMOS, RUNE_FACTS, RUNE_MODEL, demosFor } from '@/lib/labs';
import DemoFilter from './DemoFilter';
import DemoRow from './DemoRow';
import LabsSubnav from './LabsSubnav';

/*
 * surogate.ai/labs/rune-examples. Rune at work: each demo filmed from its HF Space with the answers Rune
 * really gave, so nothing here needs Rune running. The data, numbers and links live in lib/labs.js.
 */
export default function RuneExamplesClient() {
  useReveal();
  // The filters live in ?sector= and ?input= so a filtered page can be linked. The static page renders
  // everything and applies them after load.
  const [filter, setFilter] = useState({});
  // A shared link (?demo=inbox) opens that demo's film.
  const [start, setStart] = useState(null);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setFilter(Object.fromEntries(DEMO_FILTERS.map((g) => [g.key, q.get(g.key) || 'all'])));
    if (RUNE_DEMOS.some((d) => d.slug === q.get('demo'))) setStart(q.get('demo'));
  }, []);
  const apply = (changes) => {
    const next = { ...filter, ...changes };
    setFilter(next);
    const url = new URL(window.location.href);
    for (const [k, v] of Object.entries(next)) {
      if (v === 'all') url.searchParams.delete(k); else url.searchParams.set(k, v);
    }
    window.history.replaceState(null, '', url);
    track('labs_filter_picked', changes);
  };
  const matching = demosFor(filter);
  const shown = new Set(matching.map((d) => d.slug));

  return (
    <div className="st-home st-labs bg-white text-brand-aubergine antialiased">
      <Nav />
      <LabsSubnav />

      <main id="top">
        <header className="hero">
          <div className="hero-glow" />
          <div className="hero-rabbit" aria-hidden="true" />
          <div className="wrap">
            <p className="hero-kicker reveal">Labs · Rune at work</p>
            <h1 className="hero-title reveal d1">
              Watch Rune <span className="amber">decide.</span>
            </h1>
            <p className="hero-sub reveal d2">
              Rune is an open decision model. Give it text or an image, a question and your
              options, and it answers with one of them and a probability for every one.
            </p>
            <div className="hero-actions reveal d3">
              <a
                className="btn btn-primary"
                href="#demos"
                onClick={() => track('labs_cta_clicked', { cta: 'try_demos' })}
              >
                <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
                Watch it work
              </a>
              <a
                className="btn btn-ghost"
                href={RUNE.model}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('labs_cta_clicked', { cta: 'huggingface' })}
              >
                Open on HuggingFace
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
              <p className="eyebrow">{FILMED.length} films · {RUNE_DEMOS.length} demos</p>
              <h2 className="h-section">
                Cameras, robot arms, invoices and claims, <span className="amber">and a couple of games.</span>
              </h2>
              <p className="lead">
                Every result on screen is the model&apos;s full probability distribution, not a
                sentence to trust.
              </p>
            </div>

            <DemoFilter value={filter} onPick={(group, key) => apply({ [group]: key })} onClear={() => apply({ sector: 'all', input: 'all' })} />

            <div className="lab-demos">
              {RUNE_DEMOS.map((d) => (
                <DemoRow demo={d} key={d.slug} hidden={!shown.has(d.slug)} start={start === d.slug} />
              ))}
              {matching.length === 0 && (
                <p className="lab-filter-none">
                  No demo does that yet.{' '}
                  <button type="button" onClick={() => apply({ sector: 'all', input: 'all' })}>Show all</button>
                </p>
              )}
            </div>

            <p className="lab-note reveal">
              Every Space is open source on Hugging Face. To run Rune yourself, get the weights below.
            </p>
          </div>
        </section>

        <section className="sec dark" id="model">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">The model</p>
              <h2 className="h-section">
                Open weights, <span className="amber hf-title">on{' '}
                  <img className="hf-title-logo" src="/labs/huggingface.svg" alt="Hugging Face" width="95" height="88" /></span>
              </h2>
            </div>

            <a
              className="hf-card reveal d1"
              href={RUNE.model}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('labs_cta_clicked', { cta: 'model_card' })}
            >
              <span className="hf-card-h">
                <img className="hf-avatar" src="/labs/surogate-hf-avatar.png" alt="Surogate" width="48" height="48" />
                <span className="hf-repo">
                  <span className="hf-org">{RUNE_MODEL.repo.split('/')[0]} /</span>
                  <b>{RUNE_MODEL.repo.split('/')[1]}</b>
                </span>
                <ArrowUpRight className="hf-go" size={22} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="hf-name">{RUNE_MODEL.name}</span>
              <span className="hf-line">{RUNE_MODEL.line}</span>
              <span className="hf-tags">
                {RUNE_MODEL.tags.map((t) => (
                  <span className="hf-tag" key={t}>{t}</span>
                ))}
              </span>
            </a>

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

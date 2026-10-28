'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import Button from '@/components/site/Button';
import Section, { H2, SectionHead } from '@/components/site/Section';
import { track } from '@/lib/analytics';
import { DEMO_FILTERS, FILMED, RUNE, RUNE_DEMOS, RUNE_FACTS, RUNE_MODEL, demosFor } from '@/lib/labs';
import DemoFilter from './DemoFilter';
import DemoRow from './DemoRow';
import LabsSubnav from './LabsSubnav';
import LabsHero, { HeroFacts } from './LabsHero';

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
    <div className="v2 st-home st-labs w-full bg-white font-sans text-ink">
      <Nav />
      <LabsSubnav />

      <main id="top">
        <LabsHero
          title="Watch Rune decide."
          sub="Rune is an open decision model. Give it text or an image, a question and your options, and it answers with one of them and a probability for every one."
          actions={<>
            <Button href="#demos" size="lg" arrow event="labs_cta_clicked" eventProps={{ cta: 'try_demos' }}>Watch it work</Button>
            <Button href={RUNE.model} variant="secondary" size="lg" external event="labs_cta_clicked" eventProps={{ cta: 'huggingface' }}>Open on Hugging Face</Button>
          </>}
        >
          <HeroFacts items={RUNE_FACTS} />
        </LabsHero>

        <Section id="demos">
          <SectionHead title="Cameras, robot arms, invoices and claims, and a couple of games."
            sub={`${FILMED.length} films and ${RUNE_DEMOS.length} demos. Every result on screen is the model's full probability distribution, not a sentence to trust.`} />

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
        </Section>

        <Section tone="grey" id="model">
          <SectionHead title="Open weights on Hugging Face." sub="Every Space is open source on Hugging Face. To run Rune yourself, get the weights." />
          <a className="hf-card" href={RUNE.model} target="_blank" rel="noopener noreferrer"
             onClick={() => track('labs_cta_clicked', { cta: 'model_card' })}>
            <span className="hf-card-h">
              <img className="hf-avatar" src="/labs/surogate-hf-avatar.png" alt="Surogate" width="48" height="48" />
              <span className="hf-repo">
                <span className="hf-org">{RUNE_MODEL.repo.split('/')[0]} /</span>
                <b>{RUNE_MODEL.repo.split('/')[1]}</b>
              </span>
              <ArrowUpRight className="hf-go" size={20} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="hf-name">{RUNE_MODEL.name}</span>
            <span className="hf-line">{RUNE_MODEL.line}</span>
            <span className="hf-tags">
              {RUNE_MODEL.tags.map((t) => <span className="hf-tag" key={t}>{t}</span>)}
            </span>
          </a>
        </Section>

        <Section tone="aubergine" rings inner="flex flex-col items-start gap-6">
          <div>
            <h2 className={H2.feature}>Run Rune on your own cards.</h2>
            <p className="m-0 mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-white/70">Weights under Apache 2.0, served by the Surogate engine.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={RUNE.model} variant="sun" size="lg" external arrow event="labs_cta_clicked" eventProps={{ cta: 'model_card_closing' }}>Get the weights</Button>
            <Button href={RUNE.docs} variant="glass" size="lg" external event="labs_cta_clicked" eventProps={{ cta: 'decisions_docs' }}>Read the API docs</Button>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

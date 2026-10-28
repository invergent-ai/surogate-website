import { ArrowUpRight, ChevronRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TrackedLink from '@/components/TrackedLink';
import Button from '@/components/site/Button';
import Rabbit from '@/components/site/Rabbit';
import Section, { CONTAINER, H2, SectionHead } from '@/components/site/Section';
import { H1 } from '@/components/solutions/Hero';
import HeroRings from '@/components/solutions/HeroRings';
import { ENGINE, RUNE_DEMOS, RUNE_FACTS, SPEECH_MODELS, SUROGATE_LM } from '@/lib/labs';
import LabsSubnav from './LabsSubnav';
import RuneFilms from './RuneFilms';
import RuneGlyph from './RuneGlyph';

/*
 * surogate.ai/labs, labelled Research in the menu. Our language models first, then one card per model
 * line and one for the engine that trains and serves them, each leading to its own page, then Rune at work.
 * Covers use our own marks in our palette, as on the home page's model cards.
 */

const SPEECH_MARKS = [['/labs/speech/jackrabbit.svg', 'Jackrabbit'], ['/labs/speech/jackrabbit-streaming.svg', 'Streaming'], ['/labs/speech/amami.svg', 'Amami']];

const LINES = [
  {
    key: 'rune', href: '/labs/rune/', kind: 'Decision model', name: 'Surogate Rune', go: 'See it decide',
    line: 'Text or an image in, one of your options out, with a calibrated probability for every one.',
    facts: RUNE_FACTS.slice(0, 3).map((f) => ({ n: f.n, l: f.l.split(',')[0] })),
    cover: (
      <span className="flex h-full items-center justify-center bg-night [&_.rg-ring]:fill-none [&_.rg-ring]:stroke-sun/30 [&_.rg-ring]:[stroke-width:2] [&_.rg-s]:fill-none [&_.rg-s]:stroke-sun [&_.rg-s]:[stroke-linecap:round] [&_.rg-s]:[stroke-linejoin:round] [&_.rg-s]:[stroke-width:9]">
        <RuneGlyph className="h-20 w-auto overflow-visible" />
      </span>
    ),
  },
  {
    key: 'speech', href: '/labs/speech/', kind: 'Speech for agents', name: 'Surogate Speech', go: 'Listen',
    line: 'Small open speech models that run on a CPU. Jackrabbit listens, Amami speaks.',
    facts: SPEECH_MODELS.map((m) => ({ n: m.stat.n, l: m.name })),
    cover: (
      <span className="grid h-full grid-cols-3 items-center bg-stone px-4">
        {SPEECH_MARKS.map(([src, label]) => (
          <span key={label} className="flex flex-col items-center gap-2">
            <img src={src} alt="" className="h-12 w-12 md:h-14 md:w-14" />
            <span className="text-[11px] text-aubergine/70">{label}</span>
          </span>
        ))}
      </span>
    ),
  },
  {
    key: 'engine', href: '/labs/engine/', kind: 'Training and serving, open source', name: 'Surogate Engine', go: 'See the numbers',
    line: ENGINE.line,
    facts: ENGINE.facts,
    cover: (
      <span className="flex h-full items-center justify-center bg-sun">
        <img src="/brand/logo-full-white.svg" alt="" className="h-8 w-auto" />
      </span>
    ),
  },
];

function Facts({ items, dark = false }) {
  return (
    <dl className={`m-0 mt-5 border-t ${dark ? 'border-white/10' : 'border-hairline'}`}>
      {items.map((f) => (
        <div key={f.l} className={`flex items-baseline gap-3 border-b py-2.5 text-[13px] ${dark ? 'border-white/10' : 'border-hairline'}`}>
          <dt className={`order-2 ${dark ? 'text-white/60' : 'text-ink/60'}`}>{f.l}</dt>
          <dd className={`order-1 m-0 min-w-[92px] font-medium tabular-nums ${dark ? 'text-white' : 'text-ink'}`}>{f.n}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function LabsClient() {
  const { flash, family } = SUROGATE_LM;
  return (
    <div className="v2 pg-v2 st-labs w-full overflow-x-clip bg-white font-sans text-ink">
      <Nav />
      <LabsSubnav />

      <main id="top">
        <section className="relative bg-white">
          <HeroRings at="right-[-24%] top-[-60%] h-[220%] lg:right-[2%] lg:top-[-70%] lg:h-[240%]" />
          <div className={`${CONTAINER} relative pt-14 pb-16 md:pt-24 md:pb-24`}>
            <div className="load-up max-w-[760px]">
              <h1 className={H1}>Our own models.</h1>
              <p className="m-0 mt-5 max-w-[56ch] text-[16px] leading-[1.6] text-ink/65 md:text-[18px]">
                Language models for Romanian and English, speech for agents, a decision model that sees, and the
                open-source engine that trains and serves them.
              </p>
              <div className="mt-8">
                <Button href="https://huggingface.co/surogate" external size="lg" arrow>Weights on Hugging Face</Button>
              </div>
            </div>
          </div>
        </section>

        <Section inner="grid gap-3 lg:grid-cols-[1.25fr_1fr]">
          <a href={flash.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col overflow-hidden rounded-2xl bg-aubergine !text-white no-underline">
            <span className="flex aspect-[16/9] items-center justify-center" aria-hidden="true">
              <span className="tile-media text-sun" style={{ '--rabbit-bg': '#2a102d' }}><Rabbit size={112} /></span>
            </span>
            <span className="block p-6 md:p-8">
              <span className="flex items-center justify-between gap-4">
                <span className="text-[22px] font-[500] tracking-[-0.01em]">{flash.name}</span>
                <span className="inline-flex items-center gap-1 text-[13px] text-white/70 group-hover:text-white">llm.buzz <ArrowUpRight size={14} className="nudge" /></span>
              </span>
              <span className="mt-2 block text-[15px] leading-[1.55] text-white/70">{flash.line}</span>
              <Facts items={flash.facts} dark />
            </span>
          </a>
          <div className="flex flex-col rounded-2xl bg-stone p-6 md:p-8">
            <h2 className="m-0 text-[22px] font-[500] tracking-[-0.01em]">{family.name}</h2>
            <p className="m-0 mt-2 text-[15px] leading-[1.55] text-ink/65">{family.line}</p>
            <ul className="m-0 mt-6 list-none border-t border-hairline p-0">
              {family.models.map((m) => (
                <li key={m.repo} className="border-b border-hairline">
                  <a href={`https://huggingface.co/${m.repo}`} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-4 !text-ink no-underline">
                    <span>
                      <span className="block text-[15px] font-medium">{m.name}</span>
                      <span className="mt-0.5 block text-[13px] text-ink/60"><span className="tabular-nums text-ink">{m.fact.n}</span> {m.fact.l}</span>
                    </span>
                    <ArrowUpRight size={15} className="nudge shrink-0 text-ink/40 group-hover:text-ink" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="m-0 mt-auto pt-6 text-[12px] leading-[1.5] text-ink/60">Measured by us, as each model card reports it.</p>
          </div>
        </Section>

        <Section>
          <SectionHead title="Decisions, speech and the engine." />
          <ul className="m-0 grid list-none gap-x-3 gap-y-10 p-0 md:grid-cols-3">
            {LINES.map((x) => (
              <li key={x.key}>
                <TrackedLink href={x.href} event="labs_portal_clicked" eventProps={{ portal: x.key }} className="group block !text-ink no-underline">
                  <span className="block aspect-[16/10] overflow-hidden rounded-xl" aria-hidden="true"><span className="tile-media block h-full">{x.cover}</span></span>
                  <span className="mt-4 block text-[12px] font-medium text-ink/60">{x.kind}</span>
                  <span className="mt-1 flex items-center gap-1 text-[18px] font-[500]">{x.name}<ChevronRight size={16} className="nudge text-ink/40 group-hover:text-ink" /></span>
                  <span className="mt-1.5 block text-[15px] leading-[1.55] text-ink/65">{x.line}</span>
                  <Facts items={x.facts} />
                </TrackedLink>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <SectionHead title="Rune at work." action={<a href="/labs/rune-examples/" className="inline-flex min-h-11 items-center text-[14px] font-medium !text-ink no-underline">All the films</a>} />
          <RuneFilms demos={RUNE_DEMOS.filter((d) => d.film).slice(0, 6)} />
        </Section>

        <Section tone="aubergine" rings inner="flex flex-col items-start gap-6">
          <div>
            <h2 className={H2.feature}>Call our models today.</h2>
            <p className="m-0 mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-white/70">Surogate 3.7 Flash is on llm.buzz, with one key for every model.</p>
          </div>
          <Button href="https://llm.buzz" variant="sun" size="lg" external arrow event="cta_api_key_clicked" eventProps={{ location: 'labs_closing' }}>Get an API key</Button>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

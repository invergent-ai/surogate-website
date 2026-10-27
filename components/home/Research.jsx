import { ChevronRight } from 'lucide-react';
import Section, { H2 } from '@/components/site/Section';
import RuneGlyph from '@/components/labs/RuneGlyph';
import { FLASH } from '@/lib/labs';

// Covers are typography in our palette, not photos. A date shows only where we have a published one.
const SPEECH_MARKS = [['/labs/speech/jackrabbit.svg', 'Jackrabbit'], ['/labs/speech/jackrabbit-streaming.svg', 'Streaming'], ['/labs/speech/amami.svg', 'Amami']];

export const MODELS = [
  { name: 'Surogate 3.7 Flash', title: 'Surogate 3.7 Flash: open weights, 1M context, served in the EU', category: 'Model', date: FLASH.since,
    href: FLASH.href, external: true,
    cover: (
      <span className="relative flex h-full flex-col items-center justify-center gap-1.5 overflow-hidden bg-aubergine">
        <img src="/surogate_ring_3.svg" alt="" className="absolute left-1/2 top-1/2 h-[220%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-40" />
        <span className="relative text-[15px] font-medium text-cream">Surogate 3.7 Flash</span>
        <span className="relative text-[12px] text-sun">{FLASH.facts.map((f) => `${f.n} ${f.l}`).slice(0, 2).join(' · ')}</span>
      </span>
    ) },
  { name: 'Speech', title: 'Jackrabbit and Amami, our Romanian speech models', category: 'Speech', date: 'Sep 25, 2026', href: '/labs/speech/',
    cover: (
      <span className="grid h-full grid-cols-3 items-center bg-cream px-4">
        {SPEECH_MARKS.map(([src, label]) => (
          <span key={label} className="flex flex-col items-center gap-2">
            <img src={src} alt="" className="h-12 w-12 md:h-14 md:w-14" />
            <span className="text-[11px] text-aubergine/60">{label}</span>
          </span>
        ))}
      </span>
    ) },
  { name: 'Engine', title: 'Train and serve on one open-source engine', category: 'Open source', href: '/labs/engine/',
    cover: (
      <span className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#ffd27a] via-sun to-[#e7772a]">
        <img src="/surogate_rings.svg" alt="" className="spin-slow absolute left-1/2 top-1/2 h-[180%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70" />
        <img src="/brand/logo-full-white.svg" alt="" className="relative h-8 w-auto" />
      </span>
    ) },
  { name: 'Rune', title: 'Rune, a decision model that sees', category: 'Research', href: '/labs/rune/',
    cover: (
      <span className="flex h-full items-center justify-center bg-night [&_.rg-ring]:fill-none [&_.rg-ring]:stroke-sun/30 [&_.rg-ring]:[stroke-width:2] [&_.rg-s]:fill-none [&_.rg-s]:stroke-sun [&_.rg-s]:[stroke-linecap:round] [&_.rg-s]:[stroke-linejoin:round] [&_.rg-s]:[stroke-width:9]">
        <RuneGlyph className="h-20 w-auto overflow-visible" />
      </span>
    ) },
];

export default function Research() {
  return (
    <Section>
      <div className="mb-8 flex items-end justify-between gap-6">
        <h2 className={H2.list}>Our own models.</h2>
        <a href="/labs/" className="group inline-flex min-h-11 items-center gap-0.5 text-[14px] font-medium !text-ink no-underline">All research <ChevronRight size={16} className="nudge" /></a>
      </div>
      <ul className="m-0 grid list-none gap-x-3 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {MODELS.map((m) => (
          <li key={m.name}>
            <a href={m.href} {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group block !text-ink no-underline">
              <span className="block aspect-[16/10] overflow-hidden rounded-xl" aria-hidden="true"><span className="tile-media block h-full">{m.cover}</span></span>
              <span className="mt-4 block text-[12px]"><span className="font-medium text-ink">{m.category}</span>{m.date && <span className="text-ink/45"> · {m.date}</span>}</span>
              <span className="mt-1.5 flex items-start gap-1 text-[16px] font-medium leading-[1.4]">
                <span>{m.title}</span><ChevronRight size={16} className="nudge mt-[3px] shrink-0 text-ink/40 group-hover:text-ink" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

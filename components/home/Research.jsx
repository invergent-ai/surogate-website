import { ChevronRight } from 'lucide-react';
import Section, { H2 } from '@/components/site/Section';
import RuneGlyph from '@/components/labs/RuneGlyph';
import Cover from '@/components/news/Cover';
import { FLASH } from '@/lib/labs';

// The same flat covers as the news posts, no rings and no gradients. A date shows only where we have a published one.

export const MODELS = [
  { name: 'Surogate 3.7 Flash', title: 'Surogate 3.7 Flash: open weights, 1M context, served in the EU', category: 'Model', date: FLASH.since,
    href: FLASH.href, external: true,
    cover: <Cover kind="flash" /> },
  { name: 'Speech', title: 'Jackrabbit and Amami, our Romanian speech models', category: 'Speech', date: 'Sep 25, 2026', href: '/labs/speech/',
    cover: <Cover kind="speech" /> },
  { name: 'Engine', title: 'Train and serve on one open-source engine', category: 'Open source', href: '/labs/engine/',
    cover: <Cover kind="engine" /> },
  { name: 'Rune', title: 'Rune, a decision model that sees', category: 'Research', href: '/labs/rune/',
    cover: (
      <span className="tile-media flex h-full items-center justify-center bg-night [&_.rg-ring]:fill-none [&_.rg-ring]:stroke-sun/30 [&_.rg-ring]:[stroke-width:2] [&_.rg-s]:fill-none [&_.rg-s]:stroke-sun [&_.rg-s]:[stroke-linecap:round] [&_.rg-s]:[stroke-linejoin:round] [&_.rg-s]:[stroke-width:9]">
        <RuneGlyph className="h-20 w-auto overflow-visible" />
      </span>
    ) },
];

export default function Research() {
  return (
    <Section divider="orbit">
      <div className="mb-8 flex items-end justify-between gap-6">
        <h2 className={H2.list}>Our own models.</h2>
        <a href="/labs/" className="group inline-flex min-h-11 items-center gap-0.5 text-[14px] font-medium !text-ink no-underline">All research <ChevronRight size={16} className="nudge" /></a>
      </div>
      <ul className="m-0 grid list-none gap-x-3 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {MODELS.map((m) => (
          <li key={m.name}>
            <a href={m.href} {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group block !text-ink no-underline">
              <span className="block aspect-[16/10] overflow-hidden rounded-xl" aria-hidden="true">{m.cover}</span>
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

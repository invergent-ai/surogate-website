import { ArrowRight } from 'lucide-react';
import Section, { SectionHead } from '@/components/site/Section';
import Button from '@/components/site/Button';

const MODELS = [
  { name: 'Rune', line: 'A decision model that sees.', href: '/labs/rune/' },
  { name: 'Jackrabbit', line: 'Romanian and English speech recognition.', href: '/labs/speech/' },
  { name: 'Amami', line: 'Local voices that run on a CPU.', href: '/labs/speech/' },
  { name: 'Engine', line: 'Train and serve on one open-source engine.', href: '/labs/engine/' },
];

export default function Research() {
  return (
    <Section>
      <SectionHead title="Built on our own research." sub="We train and measure the models our products run on, and publish them." action={<Button href="/labs/" variant="secondary">All research</Button>} />
      <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-4">
        {MODELS.map((m) => (
          <li key={m.name}>
            <a href={m.href} className="group flex h-full flex-col rounded-2xl bg-ivory p-6 !text-ink no-underline">
              <h3 className="m-0 text-[20px] font-[500]">{m.name}</h3>
              <p className="mt-2 mb-6 text-[15px] leading-[1.55] text-ink/65">{m.line}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-[14px] opacity-70 group-hover:opacity-100">Read more <ArrowRight size={14} /></span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

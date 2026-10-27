import { ArrowUpRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Button from '@/components/site/Button';
import Section, { H2, SectionHead } from '@/components/site/Section';
import { SplitHero, Values } from '@/components/company/parts';
import { meta } from '@/lib/company';
import { mailto } from '@/lib/site';

export const metadata = meta('/careers/', 'Careers - Surogate',
  'Work on agents, speech and language models, and the open-source engine that trains them, at Invergent in Bucharest.');

const WORK = [
  { title: 'Surogate Engine', line: 'Training and serving on native C++/CUDA, from LoRA to reinforcement learning.', href: 'https://github.com/invergent-ai/surogate' },
  { title: 'The agent runtime', line: 'Sessions, sandboxes, tools and channels for agents that whole teams use.', href: 'https://github.com/invergent-ai/surogates' },
  { title: 'Our models', line: 'Language, speech and decision models, starting with Romanian.', href: 'https://huggingface.co/surogate' },
  { title: 'llm.buzz', line: 'The open market for inference, where providers compete on price and speed.', href: 'https://llm.buzz' },
];

const APPLY = mailto('Careers');

export default function CareersPage() {
  return (
    <div className="v2 pg-v2 w-full overflow-x-clip bg-white font-sans text-ink">
      <Nav />
      <main>
        <SplitHero
          title="Build the AI people can keep."
          sub="We make agents, speech and language models, and the open-source engine that trains them, from Bucharest."
          actions={<Button href={APPLY} size="lg" arrow event="reach_out_clicked" eventProps={{ channel: 'email', location: 'careers_hero' }}>Write to us</Button>}
        />

        <Section inner="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 className={H2.list}>Open roles.</h2>
          <div>
            <p className="m-0 text-[17px] leading-[1.65] text-ink/75">
              No roles are listed right now. If you build what we build, send us your code, your models or your writing anyway.
            </p>
          </div>
        </Section>

        <Section>
          <SectionHead title="What you would work on." />
          <ul className="m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline p-0 sm:grid-cols-2">
            {WORK.map((w) => (
              <li key={w.title} className="bg-white">
                <a href={w.href} target="_blank" rel="noopener noreferrer" className="group flex h-full items-start justify-between gap-6 p-6 !text-ink no-underline transition-colors duration-150 ease-in-out hover:bg-ivory">
                  <span>
                    <span className="block text-[16px] font-medium">{w.title}</span>
                    <span className="mt-1.5 block text-[15px] leading-[1.55] text-ink/60">{w.line}</span>
                  </span>
                  <ArrowUpRight size={16} className="nudge mt-1 shrink-0 text-ink/40 group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <SectionHead title="What we hold to." />
          <Values />
        </Section>

        <Section tone="aubergine" inner="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className={H2.feature}>Show us what you built.</h2>
            <p className="m-0 mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-cream/70">A repository, a model card or a post you wrote. A short note is enough.</p>
          </div>
          <Button href={APPLY} variant="sun" size="lg" arrow event="reach_out_clicked" eventProps={{ channel: 'email', location: 'careers_closing' }}>Write to us</Button>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

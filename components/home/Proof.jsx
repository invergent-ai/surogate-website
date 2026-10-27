import Section from '@/components/site/Section';
import StatStrip from '@/components/site/StatStrip';
import { ENGINE } from '@/lib/labs';

const STATS = [
  { n: ENGINE.facts[0].n, l: 'faster training than Unsloth, on our open-source engine' },
  { n: ENGINE.facts[1].n, l: 'faster serving than llama.cpp, at 16 users' },
  { n: '0%', l: 'markup on model tokens, through llm.buzz' },
];

export default function Proof() {
  return (
    <Section>
      <p className="mx-auto mt-0 mb-12 max-w-[60ch] text-balance text-center text-[18px] leading-[1.55] text-ink/80 md:text-[20px]">
        Surogate is a European AI platform: agents for whole teams, a desktop agent, voice, business processes
        and the engine to train your own models, on your hardware or ours.
      </p>
      <StatStrip items={STATS} />
    </Section>
  );
}

import Section from '@/components/site/Section';
import StatStrip from '@/components/site/StatStrip';
import { ENGINE } from '@/lib/labs';

const STATS = [
  ...ENGINE.facts.slice(0, 2),
  { n: '0%', l: 'markup on model tokens, through llm.buzz' },
  { n: 'Apache 2.0', l: 'our training and serving engine, open source' },
];

export default function Proof() {
  return (
    <Section inner="!py-20">
      <p className="mx-auto mt-0 mb-14 max-w-[62ch] text-center text-[22px] leading-[1.5] text-ink/80">
        Surogate is a European AI platform: agents for whole teams, a desktop agent, voice, business processes
        and the engine to train your own models, on your hardware or ours.
      </p>
      <StatStrip items={STATS} />
    </Section>
  );
}

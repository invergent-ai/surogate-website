import Section, { SectionHead } from '@/components/site/Section';
import { story } from '@/lib/customers';

const who = (key) => { const w = story(key).who; return w[0].toLowerCase() + w.slice(1); };
const RUNNING = `Running at ${who('bank')}, ${who('insurer')} and ${who('regulator')}.`;

const SAME = [
  { name: 'Same agents', line: 'Skills, tools and schedules move with you.' },
  { name: 'Same audit trail', line: 'Every action logged the same way.' },
  { name: 'Same models', line: 'Your fine-tunes go where your data goes.' },
  { name: 'Same price per client', line: 'Where it runs does not change what you pay.' },
];

export default function Sovereign() {
  return (
    <Section tone="grey">
      <SectionHead title="Runs where your data must stay." />
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {SAME.map((s) => (
          <li key={s.name} className="rounded-2xl bg-white p-6">
            <h3 className="m-0 text-[16px] font-[500]">{s.name}</h3>
            <p className="m-0 mt-1.5 text-[15px] leading-[1.55] text-ink/60">{s.line}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-1.5 text-[15px] leading-[1.55] md:flex-row md:items-baseline md:justify-between md:gap-6">
        <p className="m-0 font-medium text-ink">Our EU cloud, your cloud, your hardware or air-gapped.</p>
        <p className="m-0 text-ink/60">{RUNNING}</p>
      </div>
    </Section>
  );
}

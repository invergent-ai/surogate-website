import Section, { SectionHead } from '@/components/site/Section';

const SAME = [
  { name: 'Same agents', line: 'Skills, tools and schedules carry over as they are.' },
  { name: 'Same audit trail', line: 'Every action logged the same way, wherever it runs.' },
  { name: 'Same models', line: 'Your fine-tunes go where your data goes.' },
  { name: 'Same price per client', line: 'Moving changes where it runs, not what you pay.' },
];

export default function Sovereign() {
  return (
    <Section tone="ivory">
      <SectionHead title="Sovereign by design." sub="The same platform runs wherever your data has to stay. When you move, this moves with you." />
      <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-4">
        {SAME.map((s) => (
          <li key={s.name} className="rounded-2xl bg-white p-6">
            <h3 className="m-0 mb-2 text-[20px] font-[500]">{s.name}</h3>
            <p className="m-0 text-[15px] leading-[1.55] text-ink/65">{s.line}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10 mb-0 text-[15px] text-ink/65">
        Running at a top-5 Romanian bank, an insurer and national regulators.
      </p>
    </Section>
  );
}

import Section, { SectionHead } from '@/components/site/Section';
import Rabbit from '@/components/site/Rabbit';

const STEPS = [
  { name: 'Our cloud', line: 'Hosted in the EU. Start in minutes.' },
  { name: 'Your cloud', line: 'Your account, your region, your keys.' },
  { name: 'Your hardware', line: 'On your servers, managed by your team.' },
  { name: 'Air-gapped', line: 'No connection out. Models included.' },
];

export default function Sovereign() {
  return (
    <Section tone="ivory">
      <SectionHead title="Sovereign by design." sub="The same platform runs wherever your data has to stay. Move between steps without rebuilding anything." />
      <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-4">
        {STEPS.map((s, n) => (
          <li key={s.name} className="flex flex-col rounded-2xl bg-white p-6" style={{ marginTop: `${(3 - n) * 18}px` }}>
            <span className="text-[13px] text-ink/40">0{n + 1}</span>
            <h3 className="mt-6 mb-2 text-[20px] font-[500]">{s.name}</h3>
            <p className="m-0 text-[15px] leading-[1.55] text-ink/65">{s.line}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 mb-0 flex items-center gap-3 text-[15px] text-ink/65">
        <Rabbit size={26} className="text-aubergine" />
        Running at a top-5 Romanian bank, an insurer and national regulators.
      </p>
    </Section>
  );
}

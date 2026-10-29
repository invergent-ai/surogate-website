import Section, { SectionHead } from '@/components/site/Section';

// Where it can run, each with what it changes for the business. The AI Gateway is not part of the air-gapped install.
const PLACES = [
  { name: 'Our EU cloud', line: 'Hosted and run by us in the EU. Your teams start working without an install project.' },
  { name: 'Your cloud', line: 'The whole platform on your Kubernetes, in your account and region, under your security policies.' },
  { name: 'Your hardware', line: 'Our models on your GPUs. Prompts and documents never leave your building.' },
  { name: 'Air-gapped', line: 'No connection out. Agents, Keel and the models run inside a closed network.' },
];

export default function Sovereign() {
  return (
    <Section tone="grey">
      <SectionHead title="Runs where your data is." />
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {PLACES.map((s) => (
          <li key={s.name} className="rounded-2xl bg-white p-6">
            <h3 className="m-0 text-[16px] font-[500]">{s.name}</h3>
            <p className="m-0 mt-1.5 text-[15px] leading-[1.55] text-ink/60">{s.line}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

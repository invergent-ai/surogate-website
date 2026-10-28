import Section, { SectionHead } from '@/components/site/Section';

// A real sequence, so it is numbered: the steps share one hairline rail, as the company values do.
const COLS = { 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' };

export default function Steps({ title, sub, steps, tone }) {
  return (
    <Section tone={tone}>
      <SectionHead title={title} sub={sub} />
      <ol className={`m-0 grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:gap-x-0 ${COLS[steps.length]}`}>
        {steps.map((s, i) => (
          <li key={s.name} className="border-t border-hairline pt-5 lg:pr-8">
            <span aria-hidden="true" className="block text-[13px] font-medium tabular-nums text-ink/45">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="m-0 mt-3 text-[16px] font-[500]">{s.name}</h3>
            <p className="m-0 mt-1.5 text-[15px] leading-[1.6] text-ink/60">{s.line}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

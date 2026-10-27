import Section, { SectionHead } from '@/components/site/Section';

// A real sequence, so it is numbered; the rail between numbers reads as one process.
export default function Steps({ title, sub, steps }) {
  return (
    <Section>
      <SectionHead title={title} sub={sub} />
      <ol className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {steps.map((s, i) => (
          <li key={s.name} className="lg:pr-8">
            <span className="flex items-center">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[13px] font-medium text-white [font-variant-numeric:tabular-nums]">{i + 1}</span>
              {i < steps.length - 1 && <span aria-hidden="true" className="ml-3 hidden h-px flex-1 bg-hairline lg:-mr-8 lg:block" />}
            </span>
            <h3 className="m-0 mt-5 text-[16px] font-[500]">{s.name}</h3>
            <p className="m-0 mt-1.5 text-[15px] leading-[1.6] text-ink/60">{s.line}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

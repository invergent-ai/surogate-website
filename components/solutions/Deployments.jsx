import Section, { SectionHead } from '@/components/site/Section';
import { DEPLOYMENTS } from '@/lib/solutions';

// The same product in four places, drawn as a ladder: each step keeps more inside your walls.
export default function Deployments({ title = 'Where it runs.', sub = 'The same agents, audit trail and models in each.' }) {
  return (
    <Section>
      <SectionHead title={title} sub={sub} />
      <ol className="m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline p-0 sm:grid-cols-2 lg:grid-cols-4">
        {DEPLOYMENTS.map((d, i) => (
          <li key={d.name} className="flex items-center gap-5 bg-white p-5 sm:flex-col sm:items-stretch sm:gap-0 sm:p-6">
            <span aria-hidden="true" className="flex h-10 shrink-0 items-end gap-1">
              {DEPLOYMENTS.map((_, j) => (
                <span key={j} className={`w-2.5 rounded-[3px] ${j <= i ? 'bg-ink' : 'bg-stone'}`} style={{ height: `${10 + j * 9}px` }} />
              ))}
            </span>
            <span>
              <h3 className="m-0 text-[16px] font-[500] sm:mt-6">{d.name}</h3>
              <p className="m-0 mt-1 text-[14px] leading-[1.55] text-ink/60 sm:mt-1.5">{d.line}</p>
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

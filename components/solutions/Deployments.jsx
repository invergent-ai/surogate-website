import Section, { SectionHead } from '@/components/site/Section';
import { DEPLOYMENTS } from '@/lib/solutions';

// The same product in four places, drawn as a ladder: each step keeps more inside your walls.
export default function Deployments({ title = 'Where it runs.', sub = 'The same agents, audit trail and models in each.' }) {
  return (
    <Section>
      <SectionHead title={title} sub={sub} />
      <ol className="m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline p-0 sm:grid-cols-2 lg:grid-cols-4">
        {DEPLOYMENTS.map((d, i) => (
          <li key={d.name} className="flex flex-col bg-white p-6">
            <span aria-hidden="true" className="flex h-10 items-end gap-1">
              {DEPLOYMENTS.map((_, j) => (
                <span key={j} className={`w-2.5 rounded-[3px] ${j <= i ? 'bg-ink' : 'bg-stone'}`} style={{ height: `${10 + j * 9}px` }} />
              ))}
            </span>
            <h3 className="m-0 mt-6 text-[16px] font-[500]">{d.name}</h3>
            <p className="m-0 mt-1.5 text-[14px] leading-[1.55] text-ink/60">{d.line}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

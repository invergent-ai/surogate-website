import { ArrowRight } from 'lucide-react';
import Section, { SectionHead } from '@/components/site/Section';
import { product } from '@/lib/solutions';

export default function Products({ keys, title = 'What it runs on.' }) {
  return (
    <Section tone="grey">
      <SectionHead title={title} />
      <ul className={`m-0 grid list-none gap-3 p-0 sm:grid-cols-2 ${keys.length > 2 ? 'lg:grid-cols-4' : ''}`}>
        {keys.map((k) => {
          const p = product(k);
          return (
            <li key={k}>
              <a href={p.href} className="group flex h-full flex-col rounded-2xl bg-white p-6 !text-ink no-underline">
                <span className="flex items-center justify-between text-[16px] font-medium">{p.name}<ArrowRight size={16} className="nudge text-ink/40 group-hover:text-ink" /></span>
                <span className="mt-2 block text-[14px] leading-[1.55] text-ink/60">{p.line}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

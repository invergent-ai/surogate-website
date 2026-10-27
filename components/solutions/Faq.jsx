import { JsonLd } from '@/app/structured-data';

export const faqJsonLd = (items, id) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': id,
  mainEntity: items.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
});

// Questions as native disclosure rows: no script, keyboard and find-in-page work.
export function FaqList({ items }) {
  return (
    <div className="border-t border-hairline">
      {items.map((x) => (
        <details key={x.q} className="group border-b border-hairline [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[16px] font-medium">
            {x.q}
            <span aria-hidden="true" className="relative h-3 w-3 shrink-0 text-ink/50">
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-150 ease-[cubic-bezier(.4,0,.2,1)] group-open:scale-y-0" />
            </span>
          </summary>
          <p className="m-0 max-w-[68ch] pb-5 text-[15px] leading-[1.65] text-ink/65">{x.a}</p>
        </details>
      ))}
    </div>
  );
}

export default function Faq({ title = 'Questions.', items, id }) {
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[4fr_8fr] lg:gap-16">
      {id && <JsonLd data={faqJsonLd(items, id)} />}
      <h2 className="m-0 text-[28px] font-[500] leading-[1.15] tracking-[-0.01em] md:text-[30px] md:leading-[36px]">{title}</h2>
      <FaqList items={items} />
    </div>
  );
}

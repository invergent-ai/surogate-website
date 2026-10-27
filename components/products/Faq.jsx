import Section, { H2 } from '@/components/site/Section';

// Sticky title on the left, the questions as native disclosure on the right, and the same text as FAQPage JSON-LD.
export default function Faq({ items, title = 'Questions' }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  return (
    <Section id="faq" inner="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
      <div><h2 className={`${H2.list} lg:sticky lg:top-28`}>{title}</h2></div>
      <div className="border-b border-hairline">
        {items.map(([q, a]) => (
          <details key={q} className="faq group border-t border-hairline">
            <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-[16px] font-medium [&::-webkit-details-marker]:hidden">
              {q}
              <span aria-hidden="true" className="relative h-3 w-3 shrink-0 text-ink/50">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                <span className="faq-v absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
              </span>
            </summary>
            <p className="m-0 max-w-[60ch] pb-6 text-[15px] leading-[1.65] text-ink/65">{a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </Section>
  );
}

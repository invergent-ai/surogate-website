import Section, { SectionHead } from '@/components/site/Section';

// The question a buyer brings, and the mechanism that answers it. A list split by hairlines, not cards.
export default function Problems({ title = 'What it answers.', items }) {
  return (
    <Section>
      <div className="grid items-start lg:grid-cols-[4fr_8fr] lg:gap-16">
        <SectionHead title={title} />
        <dl className="m-0 border-t border-hairline">
          {items.map((x) => (
            <div key={x.p} className="grid gap-2 border-b border-hairline py-6 md:grid-cols-[5fr_7fr] md:gap-8">
              <dt className="text-[16px] font-medium leading-[1.45]">{x.p}</dt>
              <dd className="m-0 text-[15px] leading-[1.6] text-ink/65">{x.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

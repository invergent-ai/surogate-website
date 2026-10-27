import Section, { SectionHead } from '@/components/site/Section';
import Button from '@/components/site/Button';
import { story } from '@/lib/customers';
import { CONTACT_SALES } from '@/lib/site';

// Who runs it, by sector only, until each customer approves its name. A reference call is the proof.
export default function Stories({ keys, title = 'Already running.', location }) {
  return (
    <Section tone="aubergine">
      <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className="m-0 text-[28px] font-[500] leading-[1.15] tracking-[-0.01em] md:text-[30px] md:leading-[36px]">{title}</h2>
          <p className="mt-3 mb-0 max-w-[40ch] text-[16px] leading-[1.6] text-cream/70">Names stay private until each customer approves them. We arrange a reference call on request.</p>
          <div className="mt-7"><Button href={CONTACT_SALES} variant="sun" size="lg" arrow event="contact_sales_clicked" eventProps={{ location }}>Ask for a reference</Button></div>
        </div>
        <ul className="m-0 list-none border-t border-cream/15 p-0">
          {keys.map((k) => {
            const s = story(k);
            return (
              <li key={k} className="flex items-baseline justify-between gap-6 border-b border-cream/15 py-6">
                <span className="text-[20px] font-[450] md:text-[24px]">{s.who}</span>
                <span className="shrink-0 text-[14px] text-cream/55">{s.sector}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

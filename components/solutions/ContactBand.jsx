import Section, { H2 } from '@/components/site/Section';
import Button from '@/components/site/Button';
import { CONTACT_SALES } from '@/lib/site';

// Every solution page ends here: one line, one note, one action.
export default function ContactBand({ title = 'Talk to us about your setup.', note = 'A partner near you, or our own engineers.', location }) {
  return (
    <Section tone="grey">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className={H2.feature}>{title}</h2>
          <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-ink/65">{note}</p>
        </div>
        <Button href={CONTACT_SALES} size="lg" arrow event="contact_sales_clicked" eventProps={{ location }} className="shrink-0">Contact Sales</Button>
      </div>
    </Section>
  );
}

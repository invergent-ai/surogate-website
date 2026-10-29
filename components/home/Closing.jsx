import Section, { H2 } from '@/components/site/Section';
import Button from '@/components/site/Button';
import { CONTACT_SALES } from '@/lib/site';

export default function Closing() {
  return (
    <Section tone="aubergine" rings>
      <h2 className={`${H2.feature} max-w-[16ch]`}>Bring one process. We&rsquo;ll show you the numbers.</h2>
      <div className="mt-8">
        <Button href={CONTACT_SALES} variant="sun" size="lg" arrow event="contact_sales_clicked" eventProps={{ location: 'home_closing' }}>Book a comparison</Button>
      </div>
    </Section>
  );
}

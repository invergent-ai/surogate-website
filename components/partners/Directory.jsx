import Section, { H2 } from '@/components/site/Section';
import Button from '@/components/site/Button';
import { mailto } from '@/lib/site';

export default function Directory() {
  return (
    <Section id="directory" inner="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
      <div>
        <h2 className={H2.list}>Find a partner.</h2>
        <p className="mt-3 mb-0 max-w-[56ch] text-[16px] leading-[1.6] text-ink/65">The directory opens with our first Gold partners. Looking for one now? Tell us what you need, and we introduce you.</p>
      </div>
      <Button href={mailto('Find a Surogate partner')} variant="secondary" size="lg" event="contact_sales_clicked" eventProps={{ location: 'partners_directory' }}>Ask for an introduction</Button>
    </Section>
  );
}

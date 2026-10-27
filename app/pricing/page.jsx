import Shell from '@/components/solutions/Shell';
import PricingTabs from '@/components/pricing/PricingTabs';
import Section, { H2, SectionHead } from '@/components/site/Section';
import Button from '@/components/site/Button';
import GetStarted from '@/components/site/GetStarted';
import { faqJsonLd } from '@/components/solutions/Faq';
import { JsonLd } from '../structured-data';
import { PRICING_TABS, PARTNER_SHARE } from '@/lib/pricing';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('/pricing/');

// Every tab's questions are in the page's one FAQPage, whichever tab is showing.
const faq = faqJsonLd(PRICING_TABS.flatMap((t) => t.faq), 'https://surogate.ai/pricing/#faq');

export default function PricingPage() {
  return (
    <Shell>
      <JsonLd data={faq} />
      <PricingTabs />
      <Section tone="aubergine" inner="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className={H2.feature}>Building for clients?</h2>
          <p className="mt-4 mb-0 max-w-[52ch] text-[16px] leading-[1.6] text-cream/70">
            Partners pay no plan fee for their own workspace, and earn {PARTNER_SHARE.base * 100}% of every client plan, every month, for as long as the client stays.
          </p>
        </div>
        <Button href="/partners/" variant="sun" size="lg" arrow event="cta_agency_clicked" eventProps={{ location: 'pricing' }} className="shrink-0">Become a partner</Button>
      </Section>
      <Section tone="ivory">
        <SectionHead title="Choose how to get started." align="center" />
        <GetStarted location="pricing_closing" />
      </Section>
    </Shell>
  );
}

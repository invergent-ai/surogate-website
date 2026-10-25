import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ClientPricing from '@/components/pricing/ClientPricing';
import PersonalFaq from '@/components/pricing/PersonalFaq';
import { JsonLd } from '../structured-data';
import { PRICING_FAQ } from '@/lib/pricing';
import { pageMetadata } from '@/lib/site';
import './pricing-page.css';

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://surogate.ai/pricing/#faq',
  mainEntity: PRICING_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export const metadata = pageMetadata('/pricing/');

export default function PricingPage() {
  return (
    <div className="pg-pricing font-sans text-brand-aubergine bg-white w-full overflow-x-hidden">
      <JsonLd data={faqPage} />
      <Nav />
      <main id="top">
        <ClientPricing />
        <PersonalFaq />
      </main>
      <Footer />
    </div>
  );
}

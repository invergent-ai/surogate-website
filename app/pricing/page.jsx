import PricingClient from './PricingClient';
import { JsonLd } from '../structured-data';
import { FAQS } from '../../components/pricing/PricingFAQ';

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://surogate.ai/pricing/#faq',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://surogate.ai/pricing/' },
  ],
};

export const metadata = {
  title: 'Pricing - Surogate',
  description:
    'Agents that get work done. One bill, no surprises. Free tier to try it out, paid plans from $19/mo with usage included. Bring your own LLM or train custom models on every paid plan.',
  alternates: {
    canonical: 'https://surogate.ai/pricing/',
  },
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/pricing/',
    title: 'Pricing - Surogate',
    description:
      'Agents that get work done. One bill, no surprises. Free tier to try it out, paid plans from $19/mo with usage included.',
    siteName: 'Surogate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - Surogate',
    description:
      'Agents that get work done. One bill, no surprises. Free tier to try it out, paid plans from $19/mo with usage included.',
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqPage} />
      <JsonLd data={breadcrumb} />
      <PricingClient />
    </>
  );
}

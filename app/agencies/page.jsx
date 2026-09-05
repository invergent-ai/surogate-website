import AgenciesClient from '@/components/agencies/AgenciesClient';
import { JsonLd } from '../structured-data';
import '../home.css';
import '../agencies.css';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'For agencies', item: 'https://surogate.ai/agencies/' },
  ],
};

const DESCRIPTION =
  'Ship AI agents your clients pay for. Build them on one platform - tools, knowledge, guardrails, deployment and monitoring - then charge for access, into your own Stripe account.';

export const metadata = {
  title: 'For agencies - Surogate',
  description: DESCRIPTION,
  keywords:
    'AI agency platform, white label AI agents, AI consultants, automation agency, sell AI agents, monetize AI agents, client AI agents, AI automation freelancer',
  alternates: {
    canonical: 'https://surogate.ai/agencies/',
  },
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/agencies/',
    title: 'For agencies - Surogate',
    description: DESCRIPTION,
    siteName: 'Surogate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For agencies - Surogate',
    description: DESCRIPTION,
  },
};

export default function AgenciesPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <AgenciesClient />
    </>
  );
}

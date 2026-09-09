import DoctorsClient from '@/components/for/DoctorsClient';
import { JsonLd } from '../../structured-data';
import '../../home.css';
import '../../for.css';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'For doctors', item: 'https://surogate.ai/for/doctors/' },
  ],
};

const DESCRIPTION =
  'Follow the patients you already have between visits. Agents that ask, remind, advise and escalate on WhatsApp, on the protocol you write - and patients subscribe monthly, directly to you.';

export const metadata = {
  title: 'For doctors - Surogate',
  description: DESCRIPTION,
  keywords:
    'remote patient monitoring, patient follow-up between visits, cardiology follow-up, WhatsApp patient monitoring, AI agents for doctors, patient adherence, chronic care management',
  alternates: {
    canonical: 'https://surogate.ai/for/doctors/',
  },
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/for/doctors/',
    title: 'For doctors - Surogate',
    description: DESCRIPTION,
    siteName: 'Surogate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For doctors - Surogate',
    description: DESCRIPTION,
  },
};

export default function DoctorsPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <DoctorsClient />
    </>
  );
}

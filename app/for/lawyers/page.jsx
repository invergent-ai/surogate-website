import LawyersClient from '@/components/for/LawyersClient';
import { JsonLd } from '../../structured-data';
import '../../home.css';
import '../../for.css';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'For lawyers', item: 'https://surogate.ai/for/lawyers/' },
  ],
};

const DESCRIPTION =
  'Keep every client informed, chase the documents they owe you, and watch the dates that matter - so the only thing reaching your desk is the work that needed a lawyer.';

export const metadata = {
  title: 'For lawyers - Surogate',
  description: DESCRIPTION,
  keywords:
    'law firm automation, client communication for lawyers, matter updates, document chasing, legal deadline reminders, conveyancing client updates, small law firm software',
  alternates: { canonical: 'https://surogate.ai/for/lawyers/' },
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/for/lawyers/',
    title: 'For lawyers - Surogate',
    description: DESCRIPTION,
    siteName: 'Surogate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For lawyers - Surogate',
    description: DESCRIPTION,
  },
};

export default function LawyersPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <LawyersClient />
    </>
  );
}

import AccountantsClient from '@/components/for/AccountantsClient';
import { JsonLd } from '../../structured-data';
import '../../home.css';
import '../../for.css';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'For accountants', item: 'https://surogate.ai/for/accountants/' },
  ],
};

const DESCRIPTION =
  'Agents that ask each client for what you need, when you need it, and keep asking until it arrives. One list of who is ready and who is not, instead of a month of reminders you send yourself.';

export const metadata = {
  title: 'For accountants - Surogate',
  description: DESCRIPTION,
  keywords:
    'accounting practice automation, chasing client records, bookkeeping reminders, VAT deadline reminders, client document collection, accountancy firm software, self assessment chasing',
  alternates: { canonical: 'https://surogate.ai/for/accountants/' },
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/for/accountants/',
    title: 'For accountants - Surogate',
    description: DESCRIPTION,
    siteName: 'Surogate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For accountants - Surogate',
    description: DESCRIPTION,
  },
};

export default function AccountantsPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <AccountantsClient />
    </>
  );
}

import CreatorsClient from '@/components/for/CreatorsClient';
import { JsonLd } from '../../structured-data';
import '../../home.css';
import '../../for.css';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'For creators', item: 'https://surogate.ai/for/creators/' },
  ],
};

const DESCRIPTION =
  'Build an agent on what you already teach and sell your followers access to it. It works with one of them at a time, in your voice, at a price you set - and it makes next week’s content while it does.';

export const metadata = {
  title: 'For creators - Surogate',
  description: DESCRIPTION,
  keywords:
    'monetize an audience, creator income, sell a course, coaching agent, community monetization, creator economy tools, paid newsletter alternative, audience to revenue',
  alternates: { canonical: 'https://surogate.ai/for/creators/' },
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/for/creators/',
    title: 'For creators - Surogate',
    description: DESCRIPTION,
    siteName: 'Surogate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For creators - Surogate',
    description: DESCRIPTION,
  },
};

export default function CreatorsPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <CreatorsClient />
    </>
  );
}

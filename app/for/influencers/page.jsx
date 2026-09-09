import InfluencersClient from '@/components/for/InfluencersClient';
import { JsonLd } from '../../structured-data';
import '../../home.css';
import '../../for.css';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'For influencers', item: 'https://surogate.ai/for/influencers/' },
  ],
};

const DESCRIPTION =
  'An agent that works your real account in a real browser - makes the post, puts it up on your schedule, and answers the comments in your voice. No API, no app review, no permissions anyone can take away.';

export const metadata = {
  title: 'For influencers - Surogate',
  description: DESCRIPTION,
  keywords:
    'social media automation, browser automation for creators, scheduled posting, comment replies, content calendar, multi-account management, creator workflow',
  alternates: { canonical: 'https://surogate.ai/for/influencers/' },
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/for/influencers/',
    title: 'For influencers - Surogate',
    description: DESCRIPTION,
    siteName: 'Surogate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For influencers - Surogate',
    description: DESCRIPTION,
  },
};

export default function InfluencersPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <InfluencersClient />
    </>
  );
}

import RunePageClient from '@/components/labs/rune/RunePageClient';
import { JsonLd } from '../../structured-data';
import '../../home.css';
import '../../labs.css';

const URL = 'https://surogate.ai/labs/rune/';
const TITLE = 'Surogate Rune - a decision model that sees';
const DESCRIPTION =
  'Rune answers questions about text and images with one of your options and a calibrated probability for every one, in a single pass. Open weights. See it decide on real inputs.';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'Labs', item: 'https://surogate.ai/labs/' },
    { '@type': 'ListItem', position: 3, name: 'Rune', item: URL },
  ],
};

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'Surogate Rune, decision model, open weights, typed decisions, image decisions, calibrated probabilities',
  alternates: { canonical: URL },
  openGraph: { type: 'website', url: URL, title: TITLE, description: DESCRIPTION, siteName: 'Surogate' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function RunePage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {/* .reveal starts hidden until useReveal runs; without JavaScript it must simply show. */}
      <noscript>
        <style>{'.st-home .reveal{opacity:1;transform:none}'}</style>
      </noscript>
      <RunePageClient />
    </>
  );
}

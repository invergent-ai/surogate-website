import RuneExamplesClient from '@/components/labs/RuneExamplesClient';
import { JsonLd } from '../../structured-data';
import '../../home.css';
import '../../labs.css';

const URL = 'https://surogate.ai/labs/rune-examples/';
const TITLE = 'Rune examples - Surogate Labs';
const DESCRIPTION =
  'Five live demos of Surogate Rune, an open decision model: it looks at text and images and answers with a probability for every option.';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'Labs', item: 'https://surogate.ai/labs/' },
    { '@type': 'ListItem', position: 3, name: 'Rune examples', item: URL },
  ],
};

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'Surogate Rune, decision model, open weights, image classification, typed decisions, Hugging Face Spaces',
  alternates: { canonical: URL },
  openGraph: { type: 'website', url: URL, title: TITLE, description: DESCRIPTION, siteName: 'Surogate' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function RuneExamplesPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {/* .reveal starts hidden until useReveal runs; without JavaScript it must simply show. */}
      <noscript>
        <style>{'.st-home .reveal{opacity:1;transform:none}'}</style>
      </noscript>
      <RuneExamplesClient />
    </>
  );
}

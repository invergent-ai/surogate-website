import LabsClient from '@/components/labs/LabsClient';
import { JsonLd } from '../structured-data';
import '../home.css';
import '../labs.css';

const URL = 'https://surogate.ai/labs/';
const TITLE = 'Labs - Surogate';
const DESCRIPTION =
  'Models the Surogate team trained and published: Rune, an open decision model for text and images, and Surogate Speech for Romanian, each with live demos and its numbers. Plus Surogate Engine, the open-source engine that trains and serves them.';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'Labs', item: URL },
  ],
};

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'Surogate Labs, Surogate Rune, decision model, Romanian text to speech, Romanian speech recognition, Amami, Jackrabbit, LLM training, LLM serving',
  alternates: { canonical: URL },
  openGraph: { type: 'website', url: URL, title: TITLE, description: DESCRIPTION, siteName: 'Surogate', images: [{ url: 'https://surogate.ai/og-image.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['https://surogate.ai/twitter-image.jpg'] },
};

export default function LabsPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {/* .reveal starts hidden until useReveal runs; without JavaScript it must simply show. */}
      <noscript>
        <style>{'.st-home .reveal{opacity:1;transform:none}'}</style>
      </noscript>
      <LabsClient />
    </>
  );
}

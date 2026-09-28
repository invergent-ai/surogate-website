import SpeechPageClient from '@/components/labs/speech/SpeechPageClient';
import { JsonLd } from '../../structured-data';
import '../../home.css';
import '../../labs.css';

const URL = 'https://surogate.ai/labs/speech/';
const TITLE = 'Surogate Speech - Romanian text to speech and speech recognition';
const DESCRIPTION =
  'Amami reads Romanian aloud in two voices; Jackrabbit writes Romanian down from a file or live. Both run natively in the Surogate engine, on CPU or GPU.';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'Labs', item: 'https://surogate.ai/labs/' },
    { '@type': 'ListItem', position: 3, name: 'Speech', item: URL },
  ],
};

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'Surogate Speech, Romanian text to speech, Romanian speech recognition, Amami, Jackrabbit, streaming ASR',
  alternates: { canonical: URL },
  openGraph: { type: 'website', url: URL, title: TITLE, description: DESCRIPTION, siteName: 'Surogate', images: [{ url: 'https://surogate.ai/og-image.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['https://surogate.ai/twitter-image.jpg'] },
};

export default function SpeechPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {/* .reveal starts hidden until useReveal runs; without JavaScript it must simply show. */}
      <noscript>
        <style>{'.st-home .reveal{opacity:1;transform:none}'}</style>
      </noscript>
      <SpeechPageClient />
    </>
  );
}

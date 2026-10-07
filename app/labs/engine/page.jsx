import EnginePageClient from '@/components/labs/engine/EnginePageClient';
import { JsonLd } from '../../structured-data';
import '../../home.css';
import '../../labs.css';

const URL = 'https://surogate.ai/labs/engine/';
const TITLE = 'Surogate Engine - train and serve LLMs on one engine';
const DESCRIPTION =
  'Open-source C++/CUDA engines for training and serving LLMs on NVIDIA GPUs: 2.53× the training throughput of Unsloth on an H100, 7× the serving throughput of llama.cpp on eight RTX 5090s.';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'Labs', item: 'https://surogate.ai/labs/' },
    { '@type': 'ListItem', position: 3, name: 'Engine', item: URL },
  ],
};

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'Surogate Engine, LLM training, LLM serving, LoRA, QLoRA, GRPO, FP8 training, NVFP4, GGUF, LLM inference server',
  alternates: { canonical: URL },
  openGraph: { type: 'website', url: URL, title: TITLE, description: DESCRIPTION, siteName: 'Surogate', images: [{ url: 'https://surogate.ai/og-image.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['https://surogate.ai/twitter-image.jpg'] },
};

export default function EnginePage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {/* .reveal starts hidden until useReveal runs; without JavaScript it must simply show. */}
      <noscript>
        <style>{'.st-home .reveal{opacity:1;transform:none} .st-engine .en-bar i{clip-path:none} .st-engine .en-bar-v,.st-engine .en-row-h b{opacity:1}'}</style>
      </noscript>
      <EnginePageClient />
    </>
  );
}

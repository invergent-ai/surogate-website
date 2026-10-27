import { ROUTES, pageMetadata } from '@/lib/site';

// The product pages' titles and descriptions. A page takes its metadata from ROUTES in lib/site.js once its
// entry there carries the same title; until then it uses this one, so a page never ships without metadata.
export const PRODUCT_META = {
  '/agents/': ['Surogate - AI colleagues for every team', 'Design, test, govern and run AI agents for whole teams without writing code, in your cloud or on your own hardware.'],
  '/surogate-desktop/': ['Surogate Desktop - Your AI with its own computer', 'Surogate Desktop connects your agent to your computer: it works on the files in folders you choose, runs commands in a sandbox and uses your browser, then hands back finished work.'],
  '/voice/': ['Surogate Voice - Voice agents that sound local', 'Speech recognition and a voice we train ourselves, for Romanian, on our cloud or inside your call center.'],
  '/keel/': ['Keel - Processes that run agents', 'Keel runs agents in well-defined processes. Agents, people and your systems each do their step, under rules your team owns.'],
  '/train/': ['Surogate Train - Train and serve your own model', 'One open-source engine to fine-tune, run RL and serve your own model, on native C++/CUDA. Apache 2.0.'],
  '/gateway/': ['AI Gateway - Every model, one key', 'llm.buzz, our open market for inference: every model on one OpenAI and Anthropic compatible key, providers competing on price with 0% markup, and EU-only routing on every plan.'],
};

export function productMetadata(path) {
  const [title, description] = PRODUCT_META[path];
  const r = ROUTES.find((x) => x.path === path);
  if (r && r.title === title) return pageMetadata(path);
  const url = `https://surogate.ai${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', url, title, description, siteName: 'Surogate', images: [{ url: 'https://surogate.ai/og-image.jpg', width: 1200, height: 630, alt: 'Surogate' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['https://surogate.ai/twitter-image.jpg'] },
  };
}

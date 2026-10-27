// What /company, /careers and /contact say about Invergent and Surogate. Every release in the
// timeline links the public record it is dated from.

import { CONTACT, mailto } from './site.js';

export const DEFINITION =
  'Surogate is the European platform for AI colleagues, made by Invergent S.A. Alongside it we make Surogate Desktop, Voice, Keel, the AI Gateway and the open-source engine we train our own models with, on your hardware or ours.';

// From llm.buzz/about (fetched 2026-10-27), the one public page that states them.
export const COMPANY = {
  legalName: 'INVERGENT S.A.',
  office: { street: 'Sos. Pipera 43', city: 'Bucharest', country: 'Romania' },
  number: 'RO31021453',
  source: 'https://llm.buzz/about',
  github: 'https://github.com/invergent-ai',
};

// Photos are each person's own public GitHub avatar; nobody without a real photo gets one guessed.
// `works` is what their commits across the invergent-ai repos show.
export const TEAM = [
  { name: 'Ovidiu Oancea', role: 'CEO', linkedin: 'https://www.linkedin.com/in/ovidiu-oancea-3961a71/' },
  { name: 'Flavius Burca', role: 'CTO', image: '/team/flavius-burca.jpg', linkedin: 'https://www.linkedin.com/in/flaviusburca/', x: 'flaviusburca', github: 'flaviusburca', works: 'the training engine and its CUDA kernels, Surogate Desktop, the agent runtime and Keel' },
  { name: 'Dan Chirila', role: 'CDO', image: '/team/dan-chirila.jpg', linkedin: 'https://www.linkedin.com/in/dan-chirila-897a7731/', github: '1danchirila' },
  { name: 'George Zaharia', role: 'BDD', image: '/team/george-zaharia.jpg', linkedin: 'https://www.linkedin.com/in/george-zaharia/', github: 'GeorgeZaharia1' },
  { name: 'Madalin Tatarciuc', role: 'Applied AI Researcher, full-stack', linkedin: 'https://www.linkedin.com/in/madalin-tatarciuc/', x: 'cetusian', github: 'madalintat', works: 'Studio, voice and channels, the llm.buzz console, and speech model training' },
  { name: 'Monica Girbea', role: 'Engineer', github: 'monicaandreea', works: 'the Studio copilot, the agent harness, GRPO training and evals' },
  { name: 'Luca Petre', role: 'Applied AI Researcher', image: '/team/luca-petre.jpg', github: 'luca-petre', works: 'Studio, training runs and agent benchmarks' },
  { name: 'Bogdan Lazar', role: 'LLM Engineer', linkedin: 'https://www.linkedin.com/in/bogdan-lazar-0b5427195/', github: 'bogdanlazar13', works: 'model evals and benchmarks, and images in chat' },
];

export const VALUES = [
  { title: 'Your data stays where you put it', line: 'Surogate, Keel and our models run in our EU cloud, in your cloud, on your hardware or air-gapped, with the same audit trail.' },
  { title: 'We train what we ship', line: 'Rune was trained on Surogate Engine, the same Apache 2.0 engine you can download and run.' },
  { title: 'Every number has a source', line: 'A benchmark names its hardware, its baseline and its date, or we do not publish it.' },
];

const REL = (tag) => `https://github.com/invergent-ai/surogate/releases/tag/${tag}`;

// Newest first. `date` is ISO; a month-only date ('2026-07') shows as the month.
export const RELEASES = [
  { date: '2026-10-25', title: 'Keel, processes that run agents', href: '/news/keel/' },
  { date: '2026-10-20', title: 'Surogate 3.7 Flash on llm.buzz', href: '/news/surogate-3-7-flash/' },
  { date: '2026-10-19', title: 'llm.buzz, our AI Gateway, goes public', href: '/news/llm-buzz/' },
  { date: '2026-09-26', title: 'Rune second on the Decision Index 0.2.1', href: '/labs/rune/' },
  { date: '2026-09-25', title: 'Jackrabbit and Amami, open Romanian speech models', href: '/news/jackrabbit-and-amami/' },
  { date: '2026-09-21', title: 'Surogate Engine 1.5 adds serving', href: '/news/engine-serving/' },
  { date: '2026-07', title: 'Surogate 3.5 2B, 4B and 9B on Hugging Face', href: 'https://huggingface.co/surogate/Surogate-3.5-9B' },
  { date: '2026-04-24', title: 'Surogate Engine 1.0', href: REL('v1.0.1') },
  { date: '2026-01-03', title: 'First public release of Surogate Engine', href: REL('v0.0.1') },
];

export function fmtRelease(date) {
  const [y, m, d] = date.split('-').map(Number);
  const opts = d ? { month: 'short', day: 'numeric' } : { month: 'short' };
  return new Date(Date.UTC(y, m - 1, d || 1)).toLocaleDateString('en-US', { ...opts, timeZone: 'UTC' });
}

// Contact routes. One inbox today, so each team is a subject line on it.
export const CHANNELS = [
  { key: 'sales', title: 'Sales', line: 'Pilots, deployment in your cloud or on your hardware, custom models.', href: mailto('Sales'), label: 'Email Sales', event: 'contact_sales_clicked' },
  { key: 'partners', title: 'Partners', line: 'Deliver Surogate to your clients and earn on every plan.', href: mailto('Surogate partner program'), label: 'Email Partners', event: 'cta_agency_clicked' },
  { key: 'support', title: 'Support', line: 'Help with an account, an agent or a deployment.', href: mailto('Support'), label: 'Email Support', event: 'reach_out_clicked' },
  { key: 'press', title: 'Press', line: 'Interviews, facts and images for a story.', href: mailto('Press'), label: 'Email Press', event: 'reach_out_clicked' },
];

export { CONTACT };

// Metadata for pages that are not in lib/site.js ROUTES yet.
export function meta(path, title, description, extra = {}) {
  const url = `https://surogate.ai${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: extra.type || 'website', url, title, description, siteName: 'Surogate',
      images: [{ url: 'https://surogate.ai/og-image.jpg', width: 1200, height: 630, alt: 'Surogate' }],
      ...(extra.publishedTime ? { publishedTime: extra.publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: ['https://surogate.ai/twitter-image.jpg'] },
  };
}

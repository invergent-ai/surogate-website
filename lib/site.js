// The site's routes, navigation and contact links. Pages take their metadata
// from ROUTES, the sitemap emits ROUTES, and every retired URL in REDIRECTS
// becomes a static redirect page (GitHub Pages cannot redirect on the server).

import { PRODUCTS } from './products.js';
import { SOLUTION_ROUTES } from './solutions.js';

export const CONTACT = {
  email: 'surogate@invergent.ai',
  discord: 'https://discord.gg/eVTq93BrQ4',
};

export function mailto(subject) {
  const base = `mailto:${CONTACT.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

// Labs pages keep their own metadata, so their entries carry no description.
export const ROUTES = [
  {
    path: '/',
    title: 'Surogate - Your AI, on your terms',
    description:
      'Agents, voice, process automation and your own models, on your hardware or ours. Built in Europe.',
  },
  {
    path: '/agents/',
    title: "Surogate - AI colleagues for every team",
    description:
      "Design, test, govern and run AI agents for whole teams without writing code, in your cloud or on your own hardware.",
  },
  {
    path: '/keel/',
    title: "Keel - Processes that run agents",
    description:
      "Keel runs agents in well-defined processes. Agents, people and your systems each do their step, under rules your team owns.",
  },
  {
    path: '/gateway/',
    title: "AI Gateway - Every model, one key",
    description:
      "llm.buzz, our open market for inference: every model on one OpenAI and Anthropic compatible key, providers competing on price with 0% markup, and EU-only routing on every plan.",
  },
  {
    path: '/partners/',
    title: 'Partners - Build a practice on Surogate',
    description:
      'Deliver Surogate, Keel and custom models to your clients, and earn 30% of what they pay every month, 40% at Diamond.',
  },
  {
    path: '/pricing/',
    title: 'Pricing - Plans for people, teams and enterprises',
    description:
      'Individual plans from $0, team plans per organisation, enterprise by quote, and the AI Gateway at 0% markup.',
  },
  ...SOLUTION_ROUTES,
  { path: '/surogate-desktop/', title: "Surogate Desktop - Your AI with its own computer", description: "Surogate Desktop connects your agent to your computer: it works on the files in folders you choose, runs commands in a sandbox and uses your browser, then hands back finished work." },
  { path: '/voice/', title: "Surogate Voice - Voice agents that sound local", description: "Speech recognition and a voice we train ourselves, for Romanian, on our cloud or inside your call center." },
  { path: '/train/', title: "Surogate Train - Train and serve your own model", description: "One open-source engine to fine-tune, run RL and serve your own model, on native C++/CUDA. Apache 2.0." },
  { path: '/labs/', title: 'Research', description: null },
  { path: '/company/', title: 'Company - Surogate by Invergent', description: 'Invergent S.A. makes Surogate, Surogate Desktop, Voice, Keel, the AI Gateway and our own models, on your hardware or ours. The team, our values and every release.' },
  { path: '/careers/', title: 'Careers - Surogate', description: 'Work on agents, speech and language models, and the open-source engine that trains them, at Invergent in Bucharest.' },
  { path: '/contact/', title: 'Contact - Surogate', description: 'Write to Sales, Partners, Support or Press at Surogate, or talk to the team on Discord.' },
  { path: '/news/', title: 'News - Surogate', description: 'Releases from Surogate: our own models, speech for Romanian, the open-source engine and Keel. Every post is dated and names its source.' },
  { path: '/labs/rune/', title: 'Surogate Rune', description: null },
  { path: '/labs/rune-examples/', title: 'Rune at work', description: null },
  { path: '/labs/speech/', title: 'Surogate Speech', description: null },
  { path: '/labs/engine/', title: 'Surogate Engine', description: null },
];

export function route(path) {
  const r = ROUTES.find((x) => x.path === path);
  if (!r) throw new Error(`No route ${path}`);
  return r;
}

// A live page's metadata. Next replaces the layout's openGraph and twitter
// objects instead of merging them, so the share image is repeated here.
export function pageMetadata(path) {
  const { title, description } = route(path);
  const url = `https://surogate.ai${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'Surogate',
      images: [{ url: 'https://surogate.ai/og-image.jpg', width: 1200, height: 630, alt: 'Surogate' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['https://surogate.ai/twitter-image.jpg'] },
  };
}

export const REDIRECTS = {
  '/agencies/': '/partners/',
  '/launch/': '/partners/',
  '/for/accountants/': '/solutions/professionals/#accountants',
  '/for/creators/': '/',
  '/for/doctors/': '/solutions/professionals/#doctors',
  '/for/influencers/': '/',
  '/for/lawyers/': '/solutions/professionals/#lawyers',
  '/for/teachers/': '/solutions/professionals/#teachers',
};

// Pages the nav already links to that later phases of the v2 build add. check-links skips them
// and lib/site.test.mjs keeps this list free of live pages; it is empty when v2 ships.
export const PENDING = [];

export const LINKS = {
  docs: 'https://docs.surogate.ai',
  apiKey: 'https://llm.buzz',
  console: 'https://llm.buzz/console',
  status: 'https://llm.buzz/status',
  github: 'https://github.com/invergent-ai',
  jackalope: 'https://github.com/invergent-ai/surogate-jackalope/releases',
  huggingface: 'https://huggingface.co/surogate',
};

export const ANNOUNCEMENT = {
  tag: 'New',
  title: 'Surogate 3.7 Flash',
  text: 'Our open model',
  href: 'https://llm.buzz/models/surogate/surogate3.7-flash',
};

// Products is drawn from lib/products.js; the other menus are plain lists.
export const MENUS = [
  { label: 'Products', mega: true },
  {
    label: 'Solutions',
    items: [
      { label: 'Customer Stories', href: '/customers/' },
      { label: 'Enterprise', href: '/solutions/enterprise/' },
      { label: 'Government', href: '/solutions/government/' },
      { label: 'Banking & Insurance', href: '/solutions/banking-insurance/' },
      { label: 'Professionals', href: '/solutions/professionals/' },
      { label: 'Custom Models', href: '/solutions/custom-models/' },
      { label: 'Security & Trust', href: '/security/' },
    ],
    more: { label: 'Explore all use cases', href: '/solutions/' },
  },
  {
    label: 'Developer',
    items: [
      { label: 'AI Gateway', href: '/gateway/' },
      { label: 'Documentation', href: LINKS.docs, external: true },
      { label: 'Console', href: LINKS.console, external: true },
      { label: 'Open Source', href: LINKS.github, external: true },
      { label: 'Status', href: LINKS.status, external: true },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About', href: '/company/' },
      { label: 'Research', href: '/labs/' },
      { label: 'Partners', href: '/partners/' },
      { label: 'Careers', href: '/careers/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'News', href: '/news/' },
];

export const CONTACT_SALES = '/contact/';

export const TRY_MENU = [
  { group: 'Use it', items: [
    { label: 'Surogate', href: 'https://ops.surogate.ai', external: true },
    { label: 'Surogate Desktop', href: '/surogate-desktop/' },
  ] },
  { group: 'Build', items: [
    { label: 'API key', href: LINKS.apiKey, external: true },
    { label: 'Train', href: '/train/' },
    { label: 'Jackalope', href: LINKS.jackalope, external: true },
  ] },
  { group: 'Business', items: [
    { label: 'Contact Sales', href: CONTACT_SALES },
    { label: 'Become a partner', href: '/partners/' },
  ] },
];

export const FOOTER = [
  { heading: 'Products', links: PRODUCTS.map((p) => ({ label: p.name, href: p.href })) },
  { heading: 'Solutions', links: [
    { label: 'Customer Stories', href: '/customers/' }, { label: 'Enterprise', href: '/solutions/enterprise/' },
    { label: 'Government', href: '/solutions/government/' }, { label: 'Banking & Insurance', href: '/solutions/banking-insurance/' },
    { label: 'Professionals', href: '/solutions/professionals/' }, { label: 'Custom Models', href: '/solutions/custom-models/' },
    { label: 'Security & Trust', href: '/security/' },
  ] },
  { heading: 'Developers', links: [
    { label: 'AI Gateway', href: '/gateway/' }, { label: 'Documentation', href: LINKS.docs },
    { label: 'Console', href: LINKS.console }, { label: 'Open Source', href: LINKS.github },
    { label: 'Status', href: LINKS.status },
  ] },
  { heading: 'Research', links: [
    { label: 'Research', href: '/labs/' }, { label: 'Rune', href: '/labs/rune/' },
    { label: 'Speech', href: '/labs/speech/' }, { label: 'Engine', href: '/labs/engine/' },
    { label: 'Rune at work', href: '/labs/rune-examples/' }, { label: 'Hugging Face', href: LINKS.huggingface },
  ] },
  { heading: 'Company', links: [
    { label: 'About', href: '/company/' }, { label: 'Partners', href: '/partners/' },
    { label: 'Partner directory', href: '/partners/#directory' }, { label: 'Careers', href: '/careers/' },
    { label: 'News', href: '/news/' }, { label: 'Pricing', href: '/pricing/' },
    { label: 'Contact', href: '/contact/' },
  ] },
  { heading: 'Social', links: [
    { label: 'YouTube', href: 'https://www.youtube.com/@Surogate_ai' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/showcase/surogate' },
    { label: 'Instagram', href: 'https://www.instagram.com/surogate.ai/' },
    { label: 'Discord', href: CONTACT.discord },
  ] },
];

export const SIGN_IN = 'https://ops.surogate.ai';

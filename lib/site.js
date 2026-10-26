// The site's routes, navigation and contact links. Pages take their metadata
// from ROUTES, the sitemap emits ROUTES, and every retired URL in REDIRECTS
// becomes a static redirect page (GitHub Pages cannot redirect on the server).

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
    title: 'Surogate - Your workforce, multiplied.',
    description:
      'Every team works with agents that read, check, draft and follow your processes, on your own infrastructure.',
  },
  {
    path: '/agents/',
    title: 'Surogate Agents - The factory for professional agents',
    description:
      'Design, test, govern and run agents for whole teams without writing code, in your cloud or on your own hardware.',
  },
  {
    path: '/keel/',
    title: 'Keel - Processes that run agents',
    description:
      'Keel runs agents in well-defined processes. Agents, people and your systems each do their step, under rules your team owns.',
  },
  {
    path: '/gateway/',
    title: 'AI Gateway - One endpoint for every model',
    description:
      'Put every model your company uses behind one gateway, with one API for your teams and agents, and access, spend, data and failover you control.',
  },
  {
    path: '/partners/',
    title: 'Partners - Build a practice on Surogate',
    description:
      'Deliver Surogate Agents, Keel, the AI Gateway and custom models to your clients, and earn 30% of what they pay, every month.',
  },
  {
    path: '/pricing/',
    title: 'Pricing - One plan per client, models at cost',
    description:
      "Each client gets its own organisation with unlimited users and agents. The client brings its own model and pays its provider directly, or uses ours at the provider's price with no markup.",
  },
  { path: '/labs/', title: 'Labs', description: null },
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
  '/for/accountants/': '/',
  '/for/creators/': '/',
  '/for/doctors/': '/',
  '/for/influencers/': '/',
  '/for/lawyers/': '/',
  '/for/teachers/': '/',
};

export const NAV = [
  { label: 'Agents', href: '/agents/' },
  { label: 'Keel', href: '/keel/' },
  { label: 'AI Gateway', href: '/gateway/' },
  { label: 'Partners', href: '/partners/' },
  { label: 'Labs', href: '/labs/' },
  { label: 'Docs', href: 'https://docs.surogate.ai', external: true },
  { label: 'Pricing', href: '/pricing/' },
];

export const SIGN_IN = 'https://ops.surogate.ai';

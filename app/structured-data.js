// Centralized JSON-LD structured data, server-rendered into the initial HTML so
// JS-blind AI crawlers (GPTBot, ClaudeBot, PerplexityBot) and search engines can
// build an entity graph for Surogate. Injected via a plain <script> tag.

import { CONTACT } from '@/lib/site';

const ORG_ID = 'https://surogate.ai/#organization';
const WEBSITE_ID = 'https://surogate.ai/#website';
const SOFTWARE_ID = 'https://surogate.ai/#software';

export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Surogate',
  legalName: 'INVERGENT S.A.',
  url: 'https://surogate.ai/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://surogate.ai/brand/logo-full-black.svg',
  },
  description:
    'Surogate is the European platform for AI colleagues, made by Invergent S.A. Alongside it: Surogate Desktop, Voice, Keel, the AI Gateway and the open-source engine we train our own models with. Surogate, Keel and our models run in our EU cloud, in your cloud, on your own hardware or air-gapped. The AI Gateway is llm.buzz, the open market for production inference.',
  email: CONTACT.email,
  // Add LinkedIn, HuggingFace, Discord, Wikidata, and X URLs here as they are confirmed.
  sameAs: [
    'https://www.wikidata.org/wiki/Q140385440',
    'https://github.com/invergent-ai',
    'https://www.linkedin.com/company/invergent',
    'https://www.linkedin.com/showcase/surogate',
    'https://x.com/surogate_ai',
    'https://x.com/invergentai',
    'https://huggingface.co/surogate',
    'https://www.crunchbase.com/organization/mware-cd0c',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT.email,
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: CONTACT.discord,
    },
  ],
};

export const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: 'https://surogate.ai/',
  name: 'Surogate',
  description:
    'Surogate, Surogate Desktop, Voice, Keel, Train and the AI Gateway: AI colleagues and the models behind them, on your hardware or ours.',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
};

export const softwareApplication = {
  '@type': 'SoftwareApplication',
  '@id': SOFTWARE_ID,
  name: 'Surogate',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web-based',
  url: 'https://surogate.ai/',
  description:
    'Surogate: AI colleagues for every team. Design, test, govern and run agents without code, in our EU cloud, in your cloud, on your own hardware or air-gapped.',
  publisher: { '@id': ORG_ID },
  offers: [
    { '@type': 'Offer', name: 'Pilot', price: '0', priceCurrency: 'USD', description: 'The first 60 days of every new client' },
    { '@type': 'Offer', name: 'Production', price: '990', priceCurrency: 'USD', category: 'monthly subscription per client organisation' },
    { '@type': 'Offer', name: 'Scale', price: '2990', priceCurrency: 'USD', category: 'monthly subscription per client organisation' },
  ],
};

// Global graph rendered on every page.
export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [organization, website, softwareApplication],
};

// Helper to embed a JSON-LD object as a script tag.
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD serialized from trusted static data, not user input - standard Next.js structured-data pattern
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

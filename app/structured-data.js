// Centralized JSON-LD structured data, server-rendered into the initial HTML so
// JS-blind AI crawlers (GPTBot, ClaudeBot, PerplexityBot) and search engines can
// build an entity graph for Surogate. Injected via a plain <script> tag.

const ORG_ID = 'https://surogate.ai/#organization';
const WEBSITE_ID = 'https://surogate.ai/#website';
const SOFTWARE_ID = 'https://surogate.ai/#software';

export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Surogate',
  legalName: 'INVERGENT SA',
  url: 'https://surogate.ai/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://surogate.ai/brand/logo-full-black.svg',
  },
  description:
    'The intelligence factory for autonomous agents — train and fine-tune custom expert LLMs you own and build, deploy, and observe autonomous cloud AI agents.',
  email: 'hello@surogate.ai',
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
      email: 'hello@surogate.ai',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@surogate.ai',
    },
  ],
};

export const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: 'https://surogate.ai/',
  name: 'Surogate',
  description:
    'Train and fine-tune LLMs at practical hardware limits; build and run autonomous cloud AI agents.',
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
    'Platform to train and fine-tune custom expert LLMs and to build, deploy, and observe autonomous cloud AI agents. Includes a git-backed model/dataset hub, agent runtime, and developer toolkit.',
  publisher: { '@id': ORG_ID },
  offers: [
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Standard', price: '30', priceCurrency: 'USD', category: 'monthly subscription' },
    { '@type': 'Offer', name: 'Pro', price: '72', priceCurrency: 'USD', category: 'monthly subscription' },
    { '@type': 'Offer', name: 'Max', price: '144', priceCurrency: 'USD', category: 'monthly subscription' },
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
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD serialized from trusted static data, not user input — standard Next.js structured-data pattern
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

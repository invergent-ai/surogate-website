// Generated sitemap (Next.js metadata route).
// Emits <lastmod> on every build so crawlers and AI indexers get an accurate
// recrawl signal - the one sitemap field search/AI engines actually trust.
// Add new routes here as pages are added.

// Required for `output: 'export'` - render the sitemap at build time.
export const dynamic = 'force-static';

const BASE_URL = 'https://surogate.ai';

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/pricing/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
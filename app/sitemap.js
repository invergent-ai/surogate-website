// Generated sitemap (Next.js metadata route), from the live routes in lib/site.js.
// Emits <lastmod> on every build so crawlers and AI indexers get an accurate
// recrawl signal - the one sitemap field search/AI engines actually trust.

// Required for `output: 'export'` - render the sitemap at build time.
export const dynamic = 'force-static';

import { ROUTES } from '@/lib/site';

const BASE_URL = 'https://surogate.ai';

export default function sitemap() {
  const lastModified = new Date();
  return ROUTES.map(({ path }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1.0 : 0.8,
  }));
}

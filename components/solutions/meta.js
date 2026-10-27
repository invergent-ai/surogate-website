import { ROUTES, pageMetadata } from '@/lib/site';
import { SOLUTION_ROUTES } from '@/lib/solutions';

// ponytail: falls back to title and description until lib/site.js ROUTES carries SOLUTION_ROUTES;
// then pageMetadata always answers and this is a plain alias.
export default function metaFor(path) {
  if (ROUTES.some((r) => r.path === path)) return pageMetadata(path);
  const { title, description } = SOLUTION_ROUTES.find((r) => r.path === path);
  return { title, description, alternates: { canonical: `https://surogate.ai${path}` } };
}

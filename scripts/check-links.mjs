// Checks the static export in out/ and fails, listing every offender, on:
//   - an internal href or src that resolves to no file,
//   - an #anchor with no element of that id on its target page,
//   - an id used twice on one page (inline SVGs share the page's ids),
//   - a signup, email or Discord link with no named PostHog event (data-event),
//   - a retired path whose page is not a redirect to its live target that keeps
//     the query string and names that target as its only canonical.
//
//   npm run build && npm run check:links
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { REDIRECTS } from '../lib/site.js';

const OUT = 'out';
const pages = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
};
walk(OUT);

const html = new Map(pages.map((p) => [p, readFileSync(p, 'utf8')]));
const idsOf = new Map();
for (const [p, s] of html) idsOf.set(p, [...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

const fileFor = (path) => {
  const p = join(OUT, decodeURIComponent(path));
  if (path.endsWith('/')) return join(p, 'index.html');
  if (existsSync(p) && statSync(p).isDirectory()) return join(p, 'index.html');
  return p;
};
const urlOf = (page) => '/' + relative(OUT, page).replace(/index\.html$/, '');

const problems = [];
for (const [page, s] of html) {
  const here = urlOf(page);
  const ids = idsOf.get(page);
  const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  if (dupes.length) problems.push(`${here}: duplicate ids ${dupes.join(', ')}`);

  for (const [, attr, raw] of s.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const ref = raw.replace(/&amp;/g, '&');
    if (!ref || /^(https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(ref)) continue;
    const [pathq, frag] = ref.split('#');
    const path = pathq.split('?')[0];
    let target = page;
    if (path) {
      if (!path.startsWith('/')) {
        problems.push(`${here}: relative ${attr} "${ref}"`);
        continue;
      }
      target = fileFor(path);
      if (!existsSync(target)) {
        problems.push(`${here}: ${attr} "${ref}" has no file in out/`);
        continue;
      }
    }
    if (frag && target.endsWith('.html') && !(idsOf.get(target) || []).includes(frag)) {
      problems.push(`${here}: "${ref}" points at #${frag}, which ${urlOf(target)} does not have`);
    }
  }
}

// Conversion links (signup, email, Discord) must carry a named PostHog event, so the
// funnels keyed on cta_signup_clicked, contact_sales_clicked and the rest keep counting.
// TrackedLink writes its event name as data-event.
const CONVERSION = /^(https:\/\/ops\.surogate\.ai|mailto:|https:\/\/discord\.gg\/)/;
for (const [page, s] of html) {
  if (s.includes('http-equiv="refresh"')) continue;
  for (const m of s.matchAll(/<a\s([^>]*)>/g)) {
    const href = (m[1].match(/href="([^"]*)"/) || [])[1] || '';
    if (CONVERSION.test(href.replace(/&amp;/g, '&')) && !/\sdata-event="[a-z_]+"/.test(' ' + m[1]))
      problems.push(`${urlOf(page)}: conversion link ${href} has no named event`);
  }
}

for (const [from, to] of Object.entries(REDIRECTS)) {
  const s = html.get(join(OUT, from, 'index.html'));
  const m = s && s.match(/http-equiv="refresh" content="0; ?url=([^"]+)"/i);
  if (!m) problems.push(`${from}: is not a redirect page`);
  else if (m[1] !== to) problems.push(`${from}: redirects to ${m[1]}, expected ${to}`);
  if (!s) continue;
  // A 0-second refresh already reads as a permanent redirect; noindex next to a canonical
  // that points elsewhere is a conflicting signal.
  if (/<meta name="robots" content="[^"]*noindex/.test(s)) problems.push(`${from}: is noindex`);
  // One canonical, the live page: two conflicting ones and search engines ignore both.
  const canon = [...s.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((c) => c[1]);
  if (canon.length !== 1 || canon[0] !== `https://surogate.ai${to}`)
    problems.push(`${from}: canonical ${JSON.stringify(canon)}, expected ["https://surogate.ai${to}"]`);
  // Ad click ids and UTM tags ride on the query string; the redirect has to carry them over.
  if (!s.includes(`location.replace(${JSON.stringify(to)}+location.search+location.hash)`))
    problems.push(`${from}: does not carry the query string and hash to ${to}`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} problem(s) in ${pages.length} pages`);
  process.exit(1);
}
console.log(`ok: ${pages.length} pages, links, anchors, ids and redirects`);

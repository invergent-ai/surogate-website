import test from 'node:test';
import assert from 'node:assert/strict';
import { ROUTES, REDIRECTS, mailto, pageMetadata, MENUS, TRY_MENU, FOOTER, PENDING, ANNOUNCEMENT } from './site.js';

const live = new Set(ROUTES.map((r) => r.path));

test('every redirect lands on a live route, so an old link never ends on a 404', () => {
  for (const [from, to] of Object.entries(REDIRECTS)) assert.ok(live.has(to.split('#')[0]), `${from} -> ${to}`);
});

test('no live route is also retired', () => {
  for (const from of Object.keys(REDIRECTS)) assert.ok(!live.has(from), from);
});

test('retired paths match the site map', () => {
  const forPages = ['accountants', 'creators', 'doctors', 'influencers', 'lawyers', 'teachers'].map((x) => `/for/${x}/`);
  assert.deepEqual(Object.keys(REDIRECTS).sort(), ['/agencies/', '/launch/', ...forPages].sort());
});

test('mailto encodes the subject', () => {
  assert.equal(mailto('Keel demo'), 'mailto:surogate@invergent.ai?subject=Keel%20demo');
  assert.equal(mailto(), 'mailto:surogate@invergent.ai');
});

test('page metadata keeps the share image the layout sets', () => {
  const m = pageMetadata('/agents/');
  assert.equal(m.openGraph.images[0].url, 'https://surogate.ai/og-image.jpg');
  assert.deepEqual(m.twitter.images, ['https://surogate.ai/twitter-image.jpg']);
});

const internal = (href) => href.startsWith('/') ? href.split('#')[0] : null;
const allLinks = () => [
  ...MENUS.flatMap((m) => [m.href, ...(m.items || []).map((i) => i.href), m.more?.href]),
  ...TRY_MENU.flatMap((g) => g.items.map((i) => i.href)),
  ...FOOTER.flatMap((c) => c.links.map((l) => l.href)),
  ANNOUNCEMENT.href,
].filter(Boolean);

test('every internal link in the nav, footer and announcement is a live or a pending page', () => {
  for (const href of allLinks()) {
    const path = internal(href);
    if (path) assert.ok(live.has(path) || PENDING.includes(path), href);
  }
});

test('a pending page is not also live, so the list empties as phases land', () => {
  for (const p of PENDING) assert.ok(!live.has(p), p);
});

test('outside links are marked external, so they open in a new tab with the arrow', () => {
  for (const m of MENUS) for (const i of m.items || []) if (/^https?:/.test(i.href)) assert.equal(i.external, true, i.href);
  for (const g of TRY_MENU) for (const i of g.items) if (/^https?:/.test(i.href)) assert.equal(i.external, true, i.href);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { ROUTES, REDIRECTS, mailto, pageMetadata } from './site.js';

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

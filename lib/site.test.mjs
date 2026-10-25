import test from 'node:test';
import assert from 'node:assert/strict';
import { ROUTES, REDIRECTS, mailto } from './site.js';

const live = new Set(ROUTES.map((r) => r.path));

test('every redirect lands on a live route, so an old link never ends on a 404', () => {
  for (const [from, to] of Object.entries(REDIRECTS)) assert.ok(live.has(to.split('#')[0]), `${from} -> ${to}`);
});

test('no live route is also retired', () => {
  for (const from of Object.keys(REDIRECTS)) assert.ok(!live.has(from), from);
});

test('retired paths match the site map', () => {
  const forPages = ['accountants', 'creators', 'doctors', 'influencers', 'lawyers', 'teachers'].map((x) => `/for/${x}/`);
  assert.deepEqual(Object.keys(REDIRECTS).sort(), ['/agencies/', '/launch/', '/pricing/personal/', ...forPages].sort());
});

test('mailto encodes the subject', () => {
  assert.equal(mailto('Keel demo'), 'mailto:surogate@invergent.ai?subject=Keel%20demo');
  assert.equal(mailto(), 'mailto:surogate@invergent.ai');
});

test('personal plans live on the pricing page now', () => {
  assert.equal(REDIRECTS['/pricing/personal/'], '/pricing/#personal');
});

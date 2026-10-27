import test from 'node:test';
import assert from 'node:assert/strict';
import { PERSONAL_PLANS, priceLines } from './pricing.js';

const plan = (id) => PERSONAL_PLANS.find((p) => p.id === id);

test('a paid plan billed monthly shows the monthly price and offers the yearly one', () => {
  assert.deepEqual(priceLines(plan('standard'), 'monthly'), { amount: 19, perMonth: true, note: 'or $18 / month billed yearly' });
});

test('a paid plan billed yearly shows the yearly price, the yearly total and the saving', () => {
  assert.deepEqual(priceLines(plan('max'), 'annual'), { amount: 180, perMonth: true, note: '$2,160 billed yearly, you save $120' });
});

test('the free plan has no billing period', () => {
  assert.deepEqual(priceLines(plan('free'), 'annual'), { amount: 0, perMonth: false, note: 'No card required' });
});

test('team plans show their yearly price the same way', async () => {
  const { TEAM_PLANS } = await import('./pricing.js');
  const prod = TEAM_PLANS.find((p) => p.id === 'production');
  assert.deepEqual(priceLines(prod, 'monthly'), { amount: 990, perMonth: true, note: 'or $940 / month billed yearly' });
  assert.equal(priceLines(TEAM_PLANS[0], 'monthly').note, 'For the first 60 days of every new client');
});

test("a partner's monthly share is computed from the plan price", async () => {
  const { TEAM_PLANS, partnerShare, PARTNER_SHARE } = await import('./pricing.js');
  const m = (id) => TEAM_PLANS.find((p) => p.id === id).price.monthly;
  assert.equal(partnerShare(m('production')), 297);
  assert.equal(partnerShare(m('scale')), 897);
  assert.equal(partnerShare(m('production'), PARTNER_SHARE.diamond), 396);
});

test('every pricing tab has its own questions', async () => {
  const { PRICING_TABS } = await import('./pricing.js');
  assert.deepEqual(PRICING_TABS.map((t) => t.id), ['individual', 'teams', 'enterprise', 'api']);
  for (const t of PRICING_TABS) assert.ok(t.faq.length >= 3, t.id);
});

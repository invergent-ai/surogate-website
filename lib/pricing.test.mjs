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

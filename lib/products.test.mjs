import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from './products.js';
import { ROUTES, PENDING } from './site.js';
import { POSES } from '../components/site/rabbit.js';

test('six products in menu order, each with its own key and rabbit pose', () => {
  assert.deepEqual(PRODUCTS.map((p) => p.key), ['agents', 'surogate', 'voice', 'keel', 'train', 'gateway']);
  for (const p of PRODUCTS) assert.ok(POSES.includes(p.pose), p.key);
  assert.equal(new Set(PRODUCTS.map((p) => p.pose)).size, PRODUCTS.length);
});

test('every product page is live or pending', () => {
  const live = new Set(ROUTES.map((r) => r.path));
  for (const p of PRODUCTS) assert.ok(live.has(p.href) || PENDING.includes(p.href), p.href);
});

test('menu lines stay one short sentence and make no unsourced speed claim', () => {
  for (const p of PRODUCTS) {
    assert.ok(p.line.length <= 70, p.key);
    assert.doesNotMatch(p.line, /\d+\s?ms/);
  }
});

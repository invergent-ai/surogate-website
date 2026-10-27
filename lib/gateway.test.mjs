import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FLASH_MARKET, PRESETS, pickFor } from './gateway.js';

test('each preset picks the provider its rule names', () => {
  const name = (k) => FLASH_MARKET.providers[pickFor(k)].name;
  assert.equal(name('smart'), 'Surogate Spark');
  assert.equal(name('cheapest'), 'Simpleminds EU');
  assert.equal(name('fastest'), 'Surogate Spark');
  assert.deepEqual(PRESETS.map((p) => p.key), ['smart', 'cheapest', 'fastest']);
});

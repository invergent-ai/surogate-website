import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WILDCLAW as W } from './results.js';

test('WildClawBench rows are the models Surogate 3.7 Flash is level with or ahead of, best first', () => {
  assert.deepEqual(W.rows.map((r) => r.n), [...W.rows.map((r) => r.n)].sort((a, b) => b - a));
  for (const r of W.rows) assert.ok(r.n <= W.surogate + 0.5 && r.runs, r.name);
  for (const r of W.above) assert.ok(r.n > W.surogate, r.name);
  assert.ok(W.rows.length + W.above.length <= W.listed);
});

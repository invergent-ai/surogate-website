import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as page from './rune-page.js';

const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0);

test('the three question kinds use the launch post examples, with real distributions', () => {
  assert.deepEqual(page.KINDS.map((k) => k.type), ['choice', 'noul', 'score']);
  for (const k of page.KINDS) {
    assert.ok(k.title && k.line && k.question && k.input, k.type);
    if (k.options) assert.ok(Math.abs(sum(Object.fromEntries(k.options.map((o) => [o.label, o.p]))) - 1) < 0.011, k.type);
  }
  assert.equal(page.KINDS[1].p, 0.97);
});

test('capabilities, uses and deployment are all filled in', () => {
  assert.equal(page.CAPABILITIES.length, 6);
  assert.equal(page.USES.length, 8);
  for (const c of [...page.CAPABILITIES, ...page.USES]) assert.ok(c.title.length > 3 && c.line.length > 30, c.title);
  assert.ok(page.DEPLOY.command.includes('surogate serve'));
});

test('no competitor names in the copy', () => {
  assert.doesNotMatch(JSON.stringify(page), /\b(jev|typesafe|openai|gpt|claude|gemini|whisper)\b/i);
});

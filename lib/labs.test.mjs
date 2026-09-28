import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as labs from './labs.js';

const PUBLIC = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const ICONS = new Set(['Pencil', 'Volleyball', 'MousePointerClick', 'ChartLine', 'Send', 'AudioLines', 'Mic', 'Radio']);

test('every demo points at its own Space', () => {
  assert.equal(labs.RUNE_DEMOS.length, 5);
  for (const d of labs.RUNE_DEMOS) {
    assert.match(d.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/);
    assert.equal(d.embed, `https://surogate-${d.slug}.hf.space`);
    assert.equal(d.page, `https://huggingface.co/spaces/surogate/${d.slug}`);
    assert.equal(d.shot, `/labs/${d.slug}.png`);
    assert.ok(ICONS.has(d.icon), `${d.slug} icon ${d.icon}`);
    for (const k of ['title', 'kind', 'line', 'proves']) assert.ok(d[k]?.length > 3, `${d.slug}.${k}`);
  }
});

test('every number carries its caveat', () => {
  for (const f of labs.RUNE_FACTS) assert.ok(f.n && f.l.length > 10, JSON.stringify(f));
  for (const m of labs.SPEECH_MODELS) assert.ok(m.stat.n && m.stat.l.length > 30, m.id);
});

test('speech models are the public ones, and their audio exists', () => {
  assert.deepEqual(labs.SPEECH_MODELS.map((m) => m.id),
    ['surogate/amami-357m-ro', 'surogate/jackrabbit-110m-ro', 'surogate/jackrabbit-110m-ro-streaming']);
  for (const m of labs.SPEECH_MODELS) {
    assert.equal(m.repo, `https://huggingface.co/${m.id}`);
    assert.ok(ICONS.has(m.icon), m.id);
    for (const v of m.voices ?? []) assert.ok(existsSync(path.join(PUBLIC, v.src)), v.src);
  }
  assert.deepEqual(labs.SPEECH_MODELS[0].voices.map((v) => v.name), ['Doina', 'Tudor', 'Radu']);
});

test('no private repos and no competitor names anywhere in the copy', () => {
  const all = JSON.stringify(labs);
  assert.doesNotMatch(all, /surogate-ro-/);
  assert.doesNotMatch(all, /\b(jev|typesafe|whisper|elevenlabs|openai|minimax|canary|parakeet|gpt|claude|gemini)\b/i);
});

test('the example is real JSON', () => {
  const req = JSON.parse(labs.RUNE_EXAMPLE.request);
  const res = JSON.parse(labs.RUNE_EXAMPLE.response);
  assert.equal(req.model, 'rune-v3');
  assert.deepEqual(Object.keys(res.answers), Object.keys(req.questions));
});

test('every demo has its screenshot', () => {
  for (const d of labs.RUNE_DEMOS) assert.ok(existsSync(path.join(PUBLIC, d.shot)), d.shot);
});

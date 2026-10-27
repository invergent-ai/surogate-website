import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';
import { POSTS, fmtDate } from './news.js';
import { RELEASES, TEAM, CHANNELS, fmtRelease } from './company.js';

register('../components/labs/jsx-loader.mjs', import.meta.url);

test('every post is dated, sourced, newest first, with a unique slug', () => {
  assert.ok(POSTS.length >= 4);
  assert.equal(new Set(POSTS.map((p) => p.slug)).size, POSTS.length);
  for (const p of POSTS) {
    assert.match(p.date, /^\d{4}-\d{2}-\d{2}$/, p.slug);
    assert.match(p.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/);
    assert.ok(p.source.href && p.source.label, p.slug);
    assert.ok(p.cta.href, p.slug);
  }
  const dates = POSTS.map((p) => p.date);
  assert.deepEqual(dates, [...dates].sort().reverse());
  assert.equal(fmtDate('2026-10-20'), 'Oct 20, 2026');
});

test('copy keeps the site rules: no dashes, dots or arrows typed in, no private router, no /api/ page', () => {
  const copy = JSON.stringify([POSTS, RELEASES, TEAM, CHANNELS]);
  assert.doesNotMatch(copy, /[—–→]| · /);
  assert.doesNotMatch(copy, /Surogate Router|self-hosted/i);
  assert.doesNotMatch(copy, /"\/api\//);
  assert.doesNotMatch(copy, /\b(seamless|leverage|unlock|empower|cutting-edge|excited to)\b/i);
});

test('every post renders: a cover that exists and Markdown that parses into blocks', async () => {
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: Cover } = await import('../components/news/Cover.jsx');
  const { blocks } = await import('../components/news/Markdown.jsx');
  for (const p of POSTS) {
    assert.ok(renderToStaticMarkup(React.createElement(Cover, { kind: p.cover })).length > 50, p.slug);
    const b = blocks(p.body);
    assert.ok(b.some((x) => x.type === 'h2') && b.some((x) => x.type === 'p'), p.slug);
    assert.ok(!b.some((x) => x.type === 'p' && x.text.startsWith('```')), p.slug);
  }
});

test('the team is the real people with real photos or none, and every release links its record', async () => {
  const { existsSync } = await import('node:fs');
  for (const n of ['Flavius Burca', 'Madalin Tatarciuc', 'Luca Petre', 'Monica Girbea', 'George Zaharia', 'Ovidiu Oancea', 'Dan Chirila', 'Bogdan Lazar']) {
    assert.ok(TEAM.some((t) => t.name === n), n);
  }
  for (const t of TEAM) {
    assert.ok(t.role, t.name);
    if (t.image) {
      assert.match(t.image, /^\/team\/[a-z-]+\.jpg$/, t.name);
      assert.ok(existsSync(new URL(`../public${t.image}`, import.meta.url)), t.image);
    }
    if (t.linkedin) assert.match(t.linkedin, /^https:\/\/www\.linkedin\.com\/in\/[^/]+\/$/, t.name);
  }
  assert.equal(TEAM.find((t) => t.name === 'Madalin Tatarciuc').x, 'cetusian');
  for (const r of RELEASES) assert.match(r.href, /^(\/|https:\/\/)/, r.title);
  assert.equal(fmtRelease('2026-07'), 'Jul');
  assert.equal(fmtRelease('2026-01-03'), 'Jan 3');
});

test('every contact channel is a mailto with a named event', () => {
  assert.deepEqual(CHANNELS.map((c) => c.title), ['Sales', 'Partners', 'Support', 'Press']);
  for (const c of CHANNELS) {
    assert.match(c.href, /^mailto:/);
    assert.match(c.event, /^[a-z_]+$/);
  }
});

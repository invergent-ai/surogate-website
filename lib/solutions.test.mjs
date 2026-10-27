import test from 'node:test';
import assert from 'node:assert/strict';
import { SOLUTIONS, SOLUTION_ROUTES, USE_CASES, PROFESSIONS, product } from './solutions.js';
import { STORIES, DEMOS, story } from './customers.js';
import { FILMS } from './films.js';

const films = new Set(FILMS.map((f) => f.slug));

test('every product a solution names exists, so no card links nowhere', () => {
  for (const s of Object.values(SOLUTIONS)) for (const k of s.products) assert.ok(product(k), k);
  for (const u of USE_CASES) assert.ok(product(u.product), u.job);
});

test('every solution page has a route entry with a title and description', () => {
  for (const s of Object.values(SOLUTIONS)) assert.ok(SOLUTION_ROUTES.some((r) => r.path === s.path && r.title && r.description), s.path);
});

test('a use case opens a page or a film that exists', () => {
  for (const u of USE_CASES) assert.ok(u.film ? films.has(u.film) : u.href?.endsWith('/'), u.job);
});

test('the four professions keep the old /for/ slugs and each has a demo film', () => {
  assert.deepEqual(PROFESSIONS.map((p) => p.id), ['lawyers', 'doctors', 'accountants', 'teachers']);
  for (const p of PROFESSIONS) assert.ok(films.has(p.film), p.id);
});

test('customers are named by sector only, and every story a page asks for exists', () => {
  for (const s of STORIES) assert.doesNotMatch(s.who, /^[A-Z][a-z]+ [A-Z]/, s.who);
  for (const s of Object.values(SOLUTIONS)) for (const k of s.stories || (s.story ? [s.story] : [])) assert.ok(story(k), k);
  assert.ok(DEMOS.every((f) => f.demo));
});

test('no page pitches a self-hosted gateway or names the private router', () => {
  const copy = JSON.stringify([SOLUTIONS, USE_CASES, PROFESSIONS]);
  assert.doesNotMatch(copy, /Router|self-host/i);
});

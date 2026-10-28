import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import { FILMS, filmFiles } from './films.js';

const MB = 1024 * 1024;

test('every film has its film, loop and poster on disk, small enough for a phone', () => {
  for (const f of FILMS) {
    const { film, film4k, loop, poster } = filmFiles(f.slug);
    for (const p of [film, loop, poster]) assert.ok(existsSync(`public${p}`), p);
    assert.ok(statSync(`public${film}`).size <= 2.5 * MB, film);
    if (film4k) assert.ok(existsSync(`public${film4k}`) && statSync(`public${film4k}`).size <= 6 * MB, film4k);
    assert.ok(statSync(`public${loop}`).size <= 1.5 * MB, loop);
  }
});

test('films are demos on fictional businesses, never a real client', () => {
  for (const f of FILMS) assert.equal(f.demo, true, f.slug);
  assert.ok(!FILMS.some((f) => /pretorian/i.test(f.slug)));
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./jsx-loader.mjs', import.meta.url);

test('a closed demo row is a real button with a name, and links the Space', async () => {
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: DemoRow } = await import('./DemoRow.jsx');
  const { RUNE_DEMOS } = await import('../../lib/labs.js');
  const d = RUNE_DEMOS[0];
  const html = renderToStaticMarkup(React.createElement(DemoRow, { demo: d }));
  assert.match(html, /<button[^>]*type="button"[^>]*class="lab-shot"/);
  assert.match(html, new RegExp(`aria-label="Open the live ${d.title} demo"`));
  assert.match(html, new RegExp(`href="${d.page}"`));
  assert.match(html, new RegExp(`src="${d.shot}"`));
  assert.doesNotMatch(html, /<iframe/);
});

test('opening a demo never rewrites the row class, so the reveal state survives', async () => {
  // useReveal adds `in` to the element's classList; if React re-rendered className on open, it would
  // drop `in` and the row would fade back to opacity 0 (the bug seen on 2026-09-28).
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: DemoRow } = await import('./DemoRow.jsx');
  const { RUNE_DEMOS } = await import('../../lib/labs.js');
  const html = renderToStaticMarkup(React.createElement(DemoRow, { demo: RUNE_DEMOS[1] }));
  assert.match(html, /<article class="lab-demo reveal" data-open="false"/);
  const src = (await import('node:fs')).readFileSync(new URL('./DemoRow.jsx', import.meta.url), 'utf8');
  assert.match(src, /className="lab-demo reveal"/);
});

test('an opened demo sizes its frame from the height the Space reports, and trusts only that frame', async () => {
  const src = (await import('node:fs')).readFileSync(new URL('./DemoRow.jsx', import.meta.url), 'utf8');
  assert.match(src, /'rune-labs:height'/);
  assert.match(src, /e\.source !== frame\.current\?\.contentWindow/);
  assert.match(src, /e\.origin !== new URL\(demo\.embed\)\.origin/);
  assert.match(src, /scrolling="no"/);
});

test('an opened demo may use the share sheet, so Doodle Decoder can share from inside the page', async () => {
  const src = (await import('node:fs')).readFileSync(new URL('./DemoRow.jsx', import.meta.url), 'utf8');
  assert.match(src, /allow="[^"]*\bweb-share\b[^"]*"/);
});

test('the engine gives every example, picked or automatic, a full hold before moving on', async () => {
  // A fixed interval ignored picks: on a phone (no hover to pause) the chosen tab could change a second later.
  const src = (await import('node:fs')).readFileSync(new URL('./rune/DecisionEngine.jsx', import.meta.url), 'utf8');
  assert.match(src, /shownAt\.current = Date\.now\(\)/);
  assert.match(src, /Date\.now\(\) - shownAt\.current >= HOLD_MS/);
});

test('the filters are two groups of real toggle buttons, each with how many demos it would show', async () => {
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: DemoFilter } = await import('./DemoFilter.jsx');
  const { demosFor } = await import('../../lib/labs.js');
  const html = renderToStaticMarkup(React.createElement(DemoFilter, { value: { sector: 'games', input: 'all' }, onPick: () => {} }));
  assert.equal((html.match(/role="group"/g) || []).length, 2);
  assert.match(html, /aria-label="Sector"/);
  assert.match(html, /aria-label="What Rune looks at"/);
  const { DEMO_FILTERS } = await import('../../lib/labs.js');
  assert.equal((html.match(/<button type="button"/g) || []).length, DEMO_FILTERS.reduce((n, g) => n + g.options.length, 0));
  assert.equal((html.match(/aria-pressed="true"/g) || []).length, 2);
  // counts are for that option combined with the other group's current choice
  assert.match(html, new RegExp(`aria-pressed="true"[^>]*>Games &amp; play<span[^>]*>${demosFor({ sector: 'games' }).length}</span>`));
  assert.match(html, new RegExp(`>Text<span[^>]*>${demosFor({ sector: 'games', input: 'text' }).length}</span>`));
});

test('a demo left out by the filter is hidden, not removed, so an open demo keeps running', async () => {
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: DemoRow } = await import('./DemoRow.jsx');
  const { RUNE_DEMOS } = await import('../../lib/labs.js');
  const html = renderToStaticMarkup(React.createElement(DemoRow, { demo: RUNE_DEMOS[0], hidden: true }));
  assert.match(html, /<article class="lab-demo reveal"[^>]*hidden=""/);
});

test('a demo that needs the camera opens its Space in a new tab instead of embedding it', async () => {
  // Embedded, the browser would block the camera; on the Space page it works.
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: DemoRow } = await import('./DemoRow.jsx');
  const { RUNE_DEMOS } = await import('../../lib/labs.js');
  const demo = { ...RUNE_DEMOS[0], newTab: true };
  const html = renderToStaticMarkup(React.createElement(DemoRow, { demo }));
  assert.match(html, new RegExp(`<a class="lab-shot" href="${demo.page}" target="_blank" rel="noopener noreferrer"`));
  assert.match(html, /Opens in a new tab/);
  assert.doesNotMatch(html, /<button[^>]*class="lab-shot"/);
});

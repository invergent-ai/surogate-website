import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./jsx-loader.mjs', import.meta.url);

test('a filmed demo is a real Watch button over its silent loop, and links the Space', async () => {
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: DemoRow } = await import('./DemoRow.jsx');
  const { RUNE_DEMOS } = await import('../../lib/labs.js');
  const d = RUNE_DEMOS[0];
  const html = renderToStaticMarkup(React.createElement(DemoRow, { demo: d }));
  assert.match(html, /<button[^>]*type="button"[^>]*class="lab-shot lab-film"/);
  assert.match(html, new RegExp(`aria-label="Watch ${d.title}"`));
  assert.match(html, new RegExp(`src="${d.film.loop}"[^>]*poster="${d.film.poster}"[^>]*muted=""[^>]*loop=""[^>]*playsInline=""[^>]*preload="none"`));
  assert.match(html, new RegExp(`href="${d.page}"`));
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
  const full = renderToStaticMarkup(React.createElement(DemoFilter, { value: { sector: 'games', input: 'all' }, onPick: () => {} }));
  const html = full.split('lab-filter-phone')[0];  // the desktop chips; the phone sheets are tested with SheetSelect
  assert.match(full, /Showing \d+ of \d+ demos/);
  assert.equal((html.match(/role="group"/g) || []).length, 2);
  // the chips sit in their own row, so on a phone each group is one swipeable line under its label
  assert.equal((html.match(/class="lab-filter-row"/g) || []).length, 2);
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

test('a demo with no film shows its screenshot and links to its Space, in a new tab', async () => {
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: DemoRow } = await import('./DemoRow.jsx');
  const { RUNE_DEMOS } = await import('../../lib/labs.js');
  const demo = RUNE_DEMOS.find((d) => !d.film);
  const html = renderToStaticMarkup(React.createElement(DemoRow, { demo }));
  assert.match(html, new RegExp(`<a class="lab-shot" href="${demo.page}" target="_blank" rel="noopener noreferrer"`));
  assert.match(html, new RegExp(`src="${demo.shot}"`));
  assert.doesNotMatch(html, /<button[^>]*class="lab-shot/);
});

test('on a phone a filter is one full-width trigger that opens a bottom sheet of options, not a strip to scroll', async () => {
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: SheetSelect } = await import('./SheetSelect.jsx');
  const options = [{ key: 'all', label: 'All', count: 15 }, { key: 'robotics', label: 'Robotics & physical AI', count: 3 }];
  const html = renderToStaticMarkup(React.createElement(SheetSelect, { label: 'Sector', options, value: 'robotics', onPick: () => {} }));
  assert.match(html, /<button type="button" class="sheet-trigger" aria-haspopup="dialog"/);
  assert.match(html, />Sector<\/span>/);
  assert.match(html, /class="sheet-trigger-v">Robotics &amp; physical AI</);
  assert.match(html, /<dialog class="sheet" aria-label="Sector"/);
  assert.equal((html.match(/role="radio"/g) || []).length, 2);
  assert.match(html, /aria-checked="true"[^>]*>.*Robotics &amp; physical AI/);
});

test('long text is clamped on a phone and says More only when something is cut off', async () => {
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: ClampedText } = await import('./ClampedText.jsx');
  const html = renderToStaticMarkup(React.createElement(ClampedText, { className: 'lab-demo-d' }, 'Some long description.'));
  assert.match(html, /<p class="lab-demo-d clamp" data-open="false">Some long description\.<\/p>/);
  assert.doesNotMatch(html, />More</);  // the button appears only after measuring shows the text is cut
});

test('a short set of choices is a segmented control on a phone: real toggle buttons, one pressed', async () => {
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: Segmented } = await import('./Segmented.jsx');
  const html = renderToStaticMarkup(React.createElement(Segmented, {
    label: 'Kind of question', value: 1, onPick: () => {}, options: ['Pick one', 'True or false', 'Scale'] }));
  assert.match(html, /<div class="segmented" role="group" aria-label="Kind of question">/);
  assert.equal((html.match(/<button type="button"/g) || []).length, 3);
  assert.match(html, /aria-pressed="true"[^>]*>True or false</);
  assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1);
});

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

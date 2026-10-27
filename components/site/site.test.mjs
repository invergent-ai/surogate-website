import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('../labs/jsx-loader.mjs', import.meta.url);

const render = async (path, props) => {
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const mod = await import(path);
  return renderToStaticMarkup(React.createElement(mod.default, props));
};

test('every pose renders from the official paths and declares no ids, so pages never get duplicates', async () => {
  const { POSES, RABBIT_EYE } = await import('./rabbit.js');
  for (const pose of POSES) {
    const html = await render('./Rabbit.jsx', { pose });
    assert.match(html, /<svg[^>]*aria-hidden="true"/, pose);
    assert.ok(html.includes(RABBIT_EYE), pose);
    assert.doesNotMatch(html, /\sid="/, pose);
  }
});

test('a titled rabbit is an image with a name; an unknown pose is a bug, not a blank', async () => {
  const html = await render('./Rabbit.jsx', { pose: 'plain', title: 'Surogate' });
  assert.match(html, /role="img"[^>]*aria-label="Surogate"/);
  await assert.rejects(render('./Rabbit.jsx', { pose: 'flying' }), /Unknown rabbit pose/);
});

test('a button is a pill link; a tracked one names its event, an outside one opens a new tab', async () => {
  const plain = await render('./Button.jsx', { href: '/agents/', children: 'Explore' });
  assert.match(plain, /^<a href="\/agents\/" class="[^"]*rounded-full/);
  const tracked = await render('./Button.jsx', { href: '/contact/', event: 'contact_sales_clicked', children: 'Contact Sales' });
  assert.match(tracked, /data-event="contact_sales_clicked"/);
  const out = await render('./Button.jsx', { href: 'https://llm.buzz', external: true, children: 'Get API key' });
  assert.match(out, /target="_blank" rel="noopener noreferrer"/);
});

test('the stat strip prints each number with its label', async () => {
  const html = await render('./StatStrip.jsx', { items: [{ n: '7.0×', l: 'serving vs. llama.cpp' }] });
  assert.match(html, /7\.0×/);
  assert.match(html, /serving vs\. llama\.cpp/);
});

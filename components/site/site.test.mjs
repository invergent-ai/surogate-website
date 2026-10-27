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

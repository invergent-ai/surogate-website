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

test('a loop never autoplays from markup, so reduced motion and offscreen tiles stay still', async () => {
  const html = await render('./LoopVideo.jsx', { src: '/media/films/x-loop.mp4', poster: '/media/films/x.jpg' });
  assert.match(html, /<video[^>]*muted=""[^>]*loop=""[^>]*playsInline=""[^>]*preload="none"/);
  assert.match(html, /poster="\/media\/films\/x\.jpg"/);
  assert.doesNotMatch(html, /autoplay/i);
});

test('every product has media, and a mock reads complete without animation', async () => {
  const { PRODUCTS } = await import('../../lib/products.js');
  for (const p of PRODUCTS) {
    const html = await render('./ProductMedia.jsx', { product: p });
    assert.ok(html.length > 200, p.key);
    assert.doesNotMatch(html, /opacity:\s*0/, p.key);
  }
});

test('the nav server-renders every menu trigger and both calls to action', async () => {
  const html = await render('../Nav.jsx', {});
  for (const label of ['Products', 'Solutions', 'Developer', 'Company']) assert.match(html, new RegExp(`aria-expanded="false"[^>]*>${label}`));
  assert.match(html, /href="\/pricing\/"/);
  assert.match(html, /data-event="contact_sales_clicked"[^>]*>Contact Sales/);
  assert.match(html, /data-event="cta_signup_clicked"[^>]*>Try for free/);
  assert.match(html, /aria-label="More ways to start"/);
});

test('the hero is static: one headline and four places to run it, the first chosen before script loads', async () => {
  const html = await render('../home/Hero.jsx', {});
  assert.match(html, /<h1[^>]*>\s*Your AI, on your terms\.\s*<\/h1>/);
  assert.match(html, /data-event="cta_signup_clicked"/);
  assert.match(html, /role="radiogroup"/);
  const radios = [...html.matchAll(/role="radio" aria-checked="(true|false)"[^>]*>([^<]+)</g)].map((m) => [m[2], m[1]]);
  assert.deepEqual(radios, [['Our EU cloud', 'true'], ['Your cloud', 'false'], ['Your hardware', 'false'], ['Air-gapped', 'false']]);
  assert.match(html, /Hosted in the EU\. Start in minutes\./);
});

test('the products menu is text only: no rabbit, no icon', async () => {
  const { PRODUCTS } = await import('../../lib/products.js');
  const { ProductsPanel } = await import('../Nav.jsx');
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const html = renderToStaticMarkup(React.createElement(ProductsPanel, { onPick: () => {} }));
  const list = html.slice(0, html.indexOf('</ul>'));
  for (const p of PRODUCTS) assert.ok(list.includes(p.name), p.key);
  assert.doesNotMatch(list, /<svg/);
});

test('the code window sits on the band with a hairline, not a gradient frame', async () => {
  const html = await render('../home/DevApi.jsx', {});
  assert.doesNotMatch(html, /bg-grad-/);
  assert.match(html, /border-white\/10[^"]*"[\s\S]*role="tablist"/);
});

test('the code tabs show the first snippet and mark one tab selected', async () => {
  const tabs = [{ label: 'Python', code: 'print(1)' }, { label: 'cURL', code: 'curl x' }];
  const html = await render('./CodeTabs.jsx', { tabs });
  assert.match(html, /role="tablist"/);
  assert.match(html, /aria-selected="true"[^>]*>Python/);
  assert.match(html, /print\(1\)/);
  assert.doesNotMatch(html, /curl x/);
});

test('every film card names its demo business and opens the film', async () => {
  const { FILMS } = await import('../../lib/films.js');
  const html = await render('../home/Films.jsx', {});
  for (const f of FILMS) {
    assert.ok(html.includes(f.business), f.slug);
    assert.match(html, new RegExp(`aria-label="Watch ${f.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
  }
});

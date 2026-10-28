import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('../labs/jsx-loader.mjs', import.meta.url);

const PAGES = {
  agents: './agents/AgentsPage.jsx', desktop: './desktop/DesktopPage.jsx', voice: './voice/VoicePage.jsx',
  keel: './keel/KeelPage.jsx', train: './train/TrainPage.jsx', gateway: './gateway/GatewayPage.jsx',
};

const html = {};
const render = async (key) => {
  if (html[key]) return html[key];
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const mod = await import(PAGES[key]);
  html[key] = renderToStaticMarkup(React.createElement(mod.default));
  return html[key];
};
// The page's own content, without the shared nav (whose menu previews every product) and footer.
const main = async (key) => (await render(key)).match(/<main>([\s\S]*)<\/main>/)[1];

test('every product page has one h1 and a FAQ that parses as FAQPage JSON-LD', async () => {
  for (const key of Object.keys(PAGES)) {
    const h = await render(key);
    assert.equal(h.match(/<h1[\s>]/g)?.length, 1, key);
    const ld = JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(ld['@type'], 'FAQPage', key);
    assert.ok(ld.mainEntity.length >= 5, key);
  }
});

test('the rabbit is a character on Surogate and Surogate Desktop only', async () => {
  const { RABBIT_EYE } = await import('../site/rabbit.js');
  for (const key of Object.keys(PAGES)) {
    assert.equal((await main(key)).includes(RABBIT_EYE), key === 'agents' || key === 'desktop', key);
  }
});

test('the gateway is llm.buzz: no private router, no self-hosted pitch, and the quickstart names the real base URL', async () => {
  const g = await main('gateway');
  assert.doesNotMatch(g, /router\b.*self-hosted|Surogate Router|self-hosted|#self-hosted/i);
  assert.match(g, /https:\/\/api\.llm\.buzz\/api\/v1/);
  assert.match(g, /surogate\/surogate3\.7-flash/);
  assert.match(g, /https:\/\/llm\.buzz\/providers\/join/);
});

test('no page says early access, names a voice, or uses a word the copy rules ban', async () => {
  for (const key of Object.keys(PAGES)) {
    const text = (await main(key)).replace(/<[^>]+>/g, ' ');
    assert.doesNotMatch(text, /\b(early access|Doina|Tudor|Radu|seamless|leverage|unlocks?|powerful|cutting-edge)\b|\u2014/i, key);
  }
});

test('products go by their names: Surogate at /surogate/, never Agents alone, and the desktop app at /surogate-desktop/', async () => {
  for (const key of Object.keys(PAGES)) {
    const h = await main(key);
    assert.doesNotMatch(h.replace(/<[^>]+>/g, ' '), /Surogate Agents|See Agents|Surogate Router/, key);
    assert.doesNotMatch(h, /href="\/agents\/|media\/loops\/surogate\.mp4/, key);
  }
  assert.match(await main('agents'), /Meet[\s\S]*Surogate\./);
  assert.match(await main('desktop'), /Surogate Desktop/);
});

test('the desktop page carries the released install line', async () => {
  assert.match(await main('desktop'), /curl -fsSL https:\/\/surogate\.ai\/desktop\/install\.sh \| bash/);
});

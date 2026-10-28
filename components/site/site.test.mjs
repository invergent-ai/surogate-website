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
    assert.doesNotMatch(html.replace(/<style>[\s\S]*?<\/style>/g, ''), /style="[^"]*opacity:\s*0[;"]/, p.key);
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

test('the hero server-renders the Agents headline as the h1, its typed brief with the sign-up link, and a live region', async () => {
  const html = await render('../home/Hero.jsx', {});
  assert.equal((html.match(/<h1/g) || []).length, 1);
  assert.match(html, /<h1[^>]*><span class="sr-only">AI colleagues for every team\.<\/span>/);
  assert.match(html, /id="hero-copy" aria-live="polite"/);
  assert.match(html, /data-action="brief"[\s\S]*Banking<\/span>[\s\S]*Check each loan file and flag what is missing/);
  assert.match(html, /href="https:\/\/ops\.surogate\.ai"[^>]*data-event="cta_signup_clicked"[^>]*>Build this agent/);
  assert.doesNotMatch(html, /role="tablist"|role="radiogroup"|Where should it run|Contact Sales/);
  assert.equal((html.match(/aria-label="Show /g) || []).length, 6);
});

test('Agents and Voice have a box; the others are plain calls to action', async () => {
  const { PRODUCTS } = await import('../../lib/products.js');
  const { SIGN_IN } = await import('../../lib/site.js');
  const kinds = Object.fromEntries(PRODUCTS.map((p) => [p.key, p.action.kind]));
  assert.deepEqual(kinds, { agents: 'brief', surogate: 'ctas', voice: 'audio', keel: 'ctas', train: 'ctas', gateway: 'ctas' });
  assert.equal(PRODUCTS[0].action.primary.href, SIGN_IN);
  for (const p of PRODUCTS) for (const [m, t] of p.action.briefs || []) assert.ok(`${m} · ${t}`.length <= 64, t);
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: HeroAction } = await import('../home/HeroAction.jsx');
  for (const p of PRODUCTS) {
    const html = renderToStaticMarkup(React.createElement(HeroAction, { product: p, onPlaying: () => {} }));
    const a = p.action;
    for (const l of [a.primary, a.secondary, a.link].filter(Boolean)) assert.ok(html.includes(`href="${l.href}"`), `${p.key} ${l.label}`);
    assert.equal(html.includes('rounded-xl border'), a.kind !== 'ctas', p.key);
    assert.doesNotMatch(html, /\u2014|base_url|curl -LsSf|early access|Doina|Tudor|Radu/i, p.key);
  }
});

test('Voice speaks a Romanian line per Agents market, the next one each time round, each a real Amami recording', async () => {
  const fs = await import('node:fs');
  const { PRODUCTS } = await import('../../lib/products.js');
  const { amamiSrc } = await import('../../lib/labs.js');
  const { lineFor } = await import('../home/HeroAction.jsx');
  const brief = PRODUCTS.find((p) => p.key === 'agents').action;
  const voice = PRODUCTS.find((p) => p.key === 'voice');
  const a = voice.action;
  assert.deepEqual(a.lines.map((l) => l.market), brief.briefs.map(([m]) => m));
  assert.deepEqual([0, 1, 2, 3].map((r) => lineFor(a, r).slug), [...a.lines.map((l) => l.slug), a.lines[0].slug]);
  for (const s of [...a.lines.map((l) => l.slug), a.sample]) {
    assert.ok(fs.existsSync(new URL(`../../public${amamiSrc(a.voice, s)}`, import.meta.url)), s);
  }
  for (const l of a.lines) {
    assert.match(l.ro, /[ăâîșț]/, l.slug);
    assert.ok(l.ro.length <= 100 && l.en.length <= 80, l.slug);
  }
  const React = (await import('react')).default;
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: HeroAction } = await import('../home/HeroAction.jsx');
  a.lines.forEach((l, round) => {
    const v = renderToStaticMarkup(React.createElement(HeroAction, { product: voice, round, onPlaying: () => {} }));
    assert.match(v, /<button type="button"[^>]*aria-label="Play: Hear Amami speak Romanian"/);
    assert.ok(v.includes(`>${l.market}</span>`) && v.includes(`lang="ro"`) && v.includes(l.en.replace(/'/g, '&#x27;')), l.slug);
    assert.ok(v.includes(l.ro), l.slug);
    assert.match(v, new RegExp(`<audio[^>]*src="${amamiSrc(a.voice, l.slug)}"[^>]*preload="none"`));
    assert.doesNotMatch(v, /autoplay/i);
  });
});

test('the announcement pill opens an outside link in a new tab and an inside one in place', async () => {
  const out = await render('./Pill.jsx', { tag: 'New', title: 'T', text: 'x', href: 'https://llm.buzz/models/x' });
  assert.match(out, /href="https:\/\/llm\.buzz\/models\/x" target="_blank" rel="noopener noreferrer"/);
  assert.match(out, /data-event="announcement_clicked"/);
  const inside = await render('./Pill.jsx', { tag: 'New', text: 'x', href: '/labs/' });
  assert.doesNotMatch(inside, /target=/);
});

test('every door links to a live or pending page', async () => {
  const { ROUTES, PENDING } = await import('../../lib/site.js');
  const { DOORS } = await import('../home/Doors.jsx');
  const live = new Set(ROUTES.map((r) => r.path));
  assert.equal(DOORS.length, 6);
  for (const d of DOORS) assert.ok(live.has(d.href) || PENDING.includes(d.href), d.href);
  const html = await render('../home/Doors.jsx', {});
  for (const d of DOORS) assert.ok(html.includes(`href="${d.href}"`), d.href);
});

test('research leads with Surogate 3.7 Flash, linked out to llm.buzz', async () => {
  const html = await render('../home/Research.jsx', {});
  assert.match(html, /href="https:\/\/llm\.buzz\/models\/surogate\/surogate3\.7-flash" target="_blank"[^>]*>[\s\S]*?Surogate 3\.7 Flash/);
  assert.ok(html.indexOf('Surogate 3.7 Flash') < html.indexOf('Jackrabbit'));
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
  const nav = await render('../Nav.jsx', {});
  assert.doesNotMatch(nav, /rabbit/i);
});

test('the code card is white with a hairline on a flat aubergine panel, its tabs under it, and the model is Surogate 3.7 Flash', async () => {
  const html = await render('../home/DevApi.jsx', {});
  assert.doesNotMatch(html, /bg-grad-/);
  assert.doesNotMatch(html, /warm-panel|gradient/);
  assert.match(html, /rounded-2xl bg-aubergine[\s\S]*border-hairline bg-white[\s\S]*role="tabpanel"[\s\S]*role="tablist"/);
  assert.match(html, /surogate\/surogate3\.7-flash/);
  for (const n of ['1M', '32K', '$0.15/M']) assert.ok(html.includes(n), n);
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
  const { SHOWN } = await import('../home/Films.jsx');
  const html = await render('../home/Films.jsx', {});
  assert.equal(SHOWN.length % 6, 0);
  for (const f of SHOWN) {
    assert.ok(html.includes(f.business), f.slug);
    assert.match(html, new RegExp(`aria-label="Watch ${f.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
  }
});

test('a partner mark names its tier by its rabbit: simple, with the star\'s arm, the logo star rabbit', async () => {
  const { partnerMarkSvg } = await import('./illustrations/partnerBadges.js');
  const { RABBIT_FILL } = await import('./rabbit.js');
  const { LOGO_RABBIT, LOGO_STAR } = await import('./logo.js');
  for (const [tier, name] of [['silver', 'Silver'], ['gold', 'Gold'], ['diamond', 'Diamond']]) {
    const html = await render('./PartnerMark.jsx', { tier });
    assert.match(html, new RegExp(`role="img" aria-label="Surogate ${name} partner"`));
    assert.doesNotMatch(html, /NaN|\sid="|Gradient|filter|blur/i, tier);
    assert.notEqual(partnerMarkSvg(tier, 'dark'), partnerMarkSvg(tier, 'light'), tier);
  }
  const [silver, gold, diamond] = ['silver', 'gold', 'diamond'].map((t) => partnerMarkSvg(t, 'light'));
  assert.ok(silver.includes(RABBIT_FILL) && !silver.includes('#ffaf10'));
  assert.ok(gold.includes(`d="${RABBIT_FILL} `) && gold.includes('fill="#ffaf10"') && /fill="none" stroke="#c27c00"/.test(gold));
  assert.ok(diamond.includes(`d="${LOGO_STAR}" fill="#0a0a0a"`) && diamond.includes(`d="${LOGO_RABBIT}" fill="#ffaf10"`));
  assert.ok(partnerMarkSvg('diamond', 'dark').includes(`d="${LOGO_STAR}" fill="#ffffff"`));
  assert.throws(() => partnerMarkSvg('platinum'), /Unknown partner tier/);
});

test('every tier sits in one ring, centred at the same size, facing right', async () => {
  const { partnerMarkSvg, artTransform } = await import('./illustrations/partnerBadges.js');
  const frames = ['silver', 'gold', 'diamond'].map((t) => partnerMarkSvg(t, 'dark').match(/<g class="pm-frame"><circle cx="48" cy="48" r="46"/));
  assert.ok(frames.every(Boolean));
  // Each art box, mapped through its transform, is centred on (48, 48) and no side exceeds the ring.
  // Diamond is the logo mirrored, so all three rabbits face right.
  const BOX = { silver: [1.79, 1.79, 67.48, 69.15], gold: [-6.8, 1.79, 76.07, 69.15], diamond: [496.01, 0, 206.57, 235.03] };
  for (const [tier, [x, y, w, h]] of Object.entries(BOX)) {
    const [tx, ty, sx, sy] = artTransform(tier).match(/-?[\d.]+/g).map(Number);
    assert.equal(sx < 0, tier === 'diamond', tier);
    assert.ok(Math.abs(tx + (x + w / 2) * sx - 48) < 0.05 && Math.abs(ty + (y + h / 2) * sy - 48) < 0.05, tier);
    assert.ok(Math.max(w, h) * sy > 53.9 && Math.max(w, h) * sy <= 60, tier);
  }
});

test('the logo is the official paths with a sun rabbit, and only a drawing logo carries the trace line', async () => {
  const { LOGO_RABBIT } = await import('./logo.js');
  const still = await render('./Logo.jsx', {});
  assert.match(still, /role="img" aria-label="Surogate"/);
  assert.ok(still.includes(`d="${LOGO_RABBIT}" fill="#ffaf10"`));
  assert.doesNotMatch(still, /logo-line|logo-draw/);
  assert.match(await render('./Logo.jsx', { draw: true }), /class="[^"]*logo-draw[\s\S]*class="logo-line"/);
});

test('structured data names the products right and never pitches a self-hosted gateway', async () => {
  const { readFile } = await import('node:fs/promises');
  const json = await readFile(new URL('../../app/structured-data.js', import.meta.url), 'utf8');
  assert.doesNotMatch(json, /Kubernetes|Surogate Router|Surogate Agents/);
  assert.match(json, /llm\.buzz/);
});

// Renders the brand's marks from the site's own modules into standalone SVGs in docs/brand/assets/.
// Run from the repo root: node docs/brand/tools/export-marks.mjs [outDir]
// Nothing is redrawn: every path comes from components/site/{logo,rabbit}.js, partnerBadges.js, Rings.jsx and
// Orbit.jsx, rendered with React the way the site renders them. Classes and CSS variables are resolved to the
// values app/v2.css gives them, because a standalone file has no stylesheet.
import { mkdirSync, writeFileSync } from 'node:fs';
import { register } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
register(path.join(ROOT, 'components/labs/jsx-loader.mjs'), import.meta.url);

const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'docs/brand/assets'));
mkdirSync(OUT, { recursive: true });

const React = (await import('react')).default;
const { renderToStaticMarkup } = await import('react-dom/server');
const site = (f) => import(path.join(ROOT, 'components/site', f));
const { LOGO_VIEWBOX, LOGO_STAR, LOGO_RABBIT } = await site('logo.js');
const { POSES } = await site('rabbit.js');
const { partnerMarkSvg, PARTNER_TIERS } = await site('illustrations/partnerBadges.js');
const { default: Logo } = await site('Logo.jsx');
const { default: Rabbit } = await site('Rabbit.jsx');
const { default: Transit } = await site('Rings.jsx');
const Orbit = await site('Orbit.jsx');
const { default: tw } = await import(path.join(ROOT, 'tailwind.config.js'));

const C = tw.theme.extend.colors;
const INK = C.ink, WHITE = '#ffffff', SUN = C.sun, AUB = C.aubergine;
const NS = 'xmlns="http://www.w3.org/2000/svg"';
const FONT = "Inter, 'Inter Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const html = (el, props = {}) => renderToStaticMarkup(React.createElement(el, props));
const inner = (svg) => svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
const ink = (svg, color, body = WHITE) => svg.replaceAll('currentColor', color).replaceAll('var(--rabbit-bg, #fff)', body);
const strip = (svg) => svg.replace(/\s(class|style|role|aria-hidden|aria-label|focusable)="[^"]*"/g, '');
const save = (name, svg) => { writeFileSync(path.join(OUT, name), `${svg}\n`); console.log(name); };
const doc = (w, h, body, title, bg) =>
  `<svg ${NS} viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ''}${body}</svg>`;

// Logo: the component as the nav and footer draw it at rest (no draw-in), on transparent and on aubergine.
const [, , LW, LH] = LOGO_VIEWBOX.split(' ').map(Number);
const logo = (color) => inner(strip(ink(html(Logo, { title: '' }), color)));
save('logo-ink.svg', `<svg ${NS} viewBox="${LOGO_VIEWBOX}" role="img" aria-label="Surogate"><title>Surogate</title>${logo(INK)}</svg>`);
save('logo-white.svg', `<svg ${NS} viewBox="${LOGO_VIEWBOX}" role="img" aria-label="Surogate"><title>Surogate</title>${logo(WHITE)}</svg>`);
// Clear space is half the logo's height on every side, the tightest the site places it (the footer).
const pad = LH / 2;
const onGround = (color, bg, title) =>
  doc(LW + pad * 2, LH + pad * 2, `<g transform="translate(${pad} ${pad})">${logo(color)}</g>`, title, bg);
save('logo-on-light.svg', onGround(INK, WHITE, 'Surogate logo on white, with its clear space'));
save('logo-on-dark.svg', onGround(WHITE, AUB, 'Surogate logo on aubergine, with its clear space'));

// The symbol: the star and the sun rabbit, cut from the logo's own viewBox.
const SYM = '496.01 0 206.58 235.03';
save('star-rabbit.svg', `<svg ${NS} viewBox="${SYM}" role="img" aria-label="Surogate star and rabbit"><title>Surogate star and rabbit</title><path d="${LOGO_STAR}" fill="${INK}"/><path d="${LOGO_RABBIT}" fill="${SUN}"/></svg>`);
save('star.svg', `<svg ${NS} viewBox="${SYM}" role="img" aria-label="Surogate star"><title>Surogate star</title><path d="${LOGO_STAR}" fill="${INK}"/></svg>`);

// The rabbit character, from Rabbit.jsx: ink outline, white body.
const rabbit = (pose, color = INK, body = WHITE) => strip(ink(html(Rabbit, { pose, size: 120 }), color, body));
save('rabbit.svg', rabbit('plain').replace('<svg', `<svg ${NS} role="img" aria-label="The Surogate rabbit"`).replace(/ width="120" height="120"/, ''));
save('rabbit-sun-on-aubergine.svg', (() => {
  const r = inner(rabbit('plain', SUN, AUB));
  return doc(160, 160, `<svg x="20" y="20" width="120" height="120" viewBox="-18 -18 107.04 108.72">${r}</svg>`, 'The rabbit as the Surogate 3.7 Flash mark, sun on aubergine', AUB);
})());
{
  const cell = 150;
  const body = POSES.map((p, i) => `<svg x="${i * cell + 15}" y="16" width="120" height="120" viewBox="-18 -18 107.04 108.72">${inner(rabbit(p))}</svg>`
    + `<text x="${i * cell + 75}" y="168" text-anchor="middle" font-family="${FONT}" font-size="14" fill="${INK}" fill-opacity=".6">${p}</text>`).join('');
  save('rabbit-poses.svg', doc(POSES.length * cell, 190, body, 'The seven rabbit poses from Rabbit.jsx', WHITE));
}

// Partner tiers, exactly as partnerMarkSvg draws them, on each ground they are made for.
for (const tier of PARTNER_TIERS) {
  for (const [tone, bg] of [['dark', AUB], ['light', WHITE]]) {
    const mark = partnerMarkSvg(tier, tone).replace('<svg', `<svg ${NS}`).replace(' style="display:block"', '');
    save(`partner-${tier}-${tone}.svg`, doc(112, 112, `<svg x="8" y="8" width="96" height="96" viewBox="0 0 96 96">${inner(mark).replace(/ class="[^"]*"/g, '')}</svg>`, `Surogate ${tier} partner mark on ${tone === 'dark' ? 'aubergine' : 'white'}`, bg));
  }
}

// Transit at rest: the reduced-motion frame, with v2.css's ring and arc styles written onto each circle. The site
// keeps strokes at 1px and 2px with non-scaling-stroke; a standalone file is drawn at a fixed 600px width instead,
// because Chrome drops pathLength under non-scaling-stroke and the arcs would draw as whole circles.
const transit = (color, ringOpacity) => html(Transit, {})
  .replace(/<svg[^>]*>/, `<svg ${NS} viewBox="0 0 1825 2592" width="600" height="852" role="img" aria-label="Transit, the Surogate brand rings"><title>Transit, the Surogate brand rings</title>`)
  .replace(/ class="ring"/g, ` fill="none" stroke="${color}" stroke-opacity="${ringOpacity}" stroke-width="3"`)
  .replace(/ class="arc"/g, ` fill="none" stroke="${SUN}" stroke-width="6" stroke-linecap="round" stroke-dasharray="5 95"`)
  .replace(/ style="[^"]*"/g, '');
save('transit-rings.svg', transit(INK, 0.16));
save('transit-rings-on-dark.svg', transit(WHITE, 0.14).replace('<title>', `<rect x="-200" y="-200" width="2225" height="2992" fill="${AUB}"/><title>`).replace('viewBox="0 0 1825 2592" width="600" height="852"', 'viewBox="-200 -200 2225 2992" width="600" height="807"'));

// Orbit pieces, rendered from Orbit.jsx at four times their size so the hairlines show.
const orbit = (name, el, props, w, h, title) => {
  const svg = strip(ink(html(el, props), INK)).replace(/<svg/, `<svg ${NS}`).replace(/ width="[^"]*" height="[^"]*"/, ` width="${w}" height="${h}"`);
  save(name, svg.replace(/>/, ` role="img" aria-label="${title}"><title>${title}</title>`));
};
orbit('orbit-marker.svg', Orbit.OrbitMarker, {}, 88, 88, 'Orbit marker');
orbit('orbit-bullet.svg', Orbit.OrbitBullet, {}, 40, 40, 'Orbit bullet');
orbit('orbit-progress.svg', Orbit.OrbitProgress, {}, 72, 72, 'Orbit progress, at rest');
orbit('orbit-corner.svg', Orbit.OrbitCorner, {}, 192, 192, 'Orbit corner');
{
  // The divider is a flex row in HTML: two hairlines either side of its glyph. Drawn here at 1:1 on 480px.
  const glyph = inner(html(Orbit.OrbitDivider).match(/<svg[\s\S]*<\/svg>/)[0].replace(/ class="[^"]*"/g, '')).replaceAll('currentColor', INK);
  save('orbit-divider.svg', doc(480, 16, `<rect x="0" y="7.5" width="219" height="1" fill="${C.hairline}"/><svg x="227" y="0" width="26" height="16" viewBox="0 0 26 16" fill="none" stroke-width="1">${glyph}</svg><rect x="261" y="7.5" width="219" height="1" fill="${C.hairline}"/>`, 'Orbit divider'));
}

// Palette sheet, read from tailwind.config.js. The legacy brand.* entries are shown struck out: they exist for
// pages not yet moved to v2 and are not for new work.
{
  const CORE = [
    ['ink', C.ink, 'Text, primary buttons'], ['white', '#ffffff', 'The page'], ['stone', C.stone, 'Grey bands, tiles, secondary buttons'],
    ['silver', C.silver, 'Ring silver; the AI Gateway tile'], ['hairline', C.hairline, 'Dividers and borders'],
    ['aubergine', C.aubergine, 'Brand bands, footer'], ['night', C.night, 'Dark tiles, terminals'], ['sun', C.sun, 'The one accent'],
  ];
  const EXTRA = [['deep gold', '#c27c00', 'Gold tier on white'], ['steel', '#5f6a74', 'Silver tier on white'], ['steel on dark', '#c3cad0', 'Silver tier on aubergine'], ['sun text', '#9a5b00', 'Sun-coloured words on white']];
  const sw = (x, y, [name, hex, use]) => {
    const edge = ['#ffffff', C.stone, C.silver, C.hairline].includes(hex) ? ` stroke="${C.hairline}"` : '';
    return `<rect x="${x}" y="${y}" width="200" height="120" rx="12" fill="${hex}"${edge}/>`
      + `<text x="${x}" y="${y + 146}" font-family="${FONT}" font-size="15" font-weight="500" fill="${INK}">${name}</text>`
      + `<text x="${x}" y="${y + 166}" font-family="${MONO}" font-size="12" fill="${INK}" fill-opacity=".6">${hex}</text>`
      + `<text x="${x}" y="${y + 184}" font-family="${FONT}" font-size="12" fill="${INK}" fill-opacity=".6">${use}</text>`;
  };
  let body = `<text x="40" y="56" font-family="${FONT}" font-size="28" font-weight="500" fill="${INK}">Surogate palette</text>`
    + `<text x="40" y="84" font-family="${FONT}" font-size="14" fill="${INK}" fill-opacity=".6">tailwind.config.js. Never cream, ivory, beige or a warm off-white.</text>`;
  CORE.forEach((s, i) => { body += sw(40 + (i % 4) * 230, 116 + Math.floor(i / 4) * 220, s); });
  body += `<text x="40" y="588" font-family="${FONT}" font-size="15" font-weight="500" fill="${INK}">Partner and text tints (partnerBadges.js, home.css)</text>`;
  EXTRA.forEach((s, i) => { body += sw(40 + i * 230, 610, s); });
  body += `<text x="40" y="852" font-family="${FONT}" font-size="15" font-weight="500" fill="${INK}">Legacy brand.* tokens: kept for old pages, never for new work</text>`
    + `<text x="40" y="${852 + 20}" font-family="${FONT}" font-size="12" fill="${INK}" fill-opacity=".6">brand.orange, brand.aubergine and brand.aubergine-2 are the same values as sun, aubergine and night, so they are left out.</text>`;
  const core = new Set(CORE.map(([, hex]) => hex));
  const legacy = Object.entries(C.brand).filter(([, hex]) => !core.has(hex));
  legacy.forEach(([n, hex], i) => {
    const x = 40 + (i % 9) * 100, y = 892 + Math.floor(i / 9) * 96;
    body += `<rect x="${x}" y="${y}" width="84" height="48" rx="8" fill="${hex}" stroke="${C.hairline}"/><line x1="${x}" y1="${y + 48}" x2="${x + 84}" y2="${y}" stroke="${INK}" stroke-opacity=".35"/>`
      + `<text x="${x}" y="${y + 64}" font-family="${MONO}" font-size="10" fill="${INK}" fill-opacity=".6">${n}</text>`
      + `<text x="${x}" y="${y + 78}" font-family="${MONO}" font-size="10" fill="${INK}" fill-opacity=".6">${hex}</text>`;
  });
  save('palette.svg', doc(1000, 892 + Math.ceil(legacy.length / 9) * 96 + 24, body, 'The Surogate palette with hex values', WHITE));
}

// Type specimen: the sizes, weights and tracking the site's classes set (Page.jsx H1, Section.jsx H2, body).
{
  const rows = [
    ['H1 · 56/58 · 450 · -0.01em (36 on phones)', 56, 450, '-0.56', 'Your AI, on your terms.'],
    ['H2 feature · 46/48 · 500 · -0.01em (30 on phones)', 46, 500, '-0.46', 'Build a practice on Surogate.'],
    ['H2 list · 30/36 · 500 · -0.01em (28 on phones)', 30, 500, '-0.3', 'Our own models.'],
    ['Lead · 18/29 · 400 · ink 65%', 18, 400, '0', 'Design, test and run agents for whole teams, on your own infrastructure.', 0.65],
    ['Body · 16/26 · 400 · ink 65%', 16, 400, '0', 'Tiers count the clients you have live. There is nothing to apply for.', 0.65],
    ['UI and buttons · 14 · 500', 14, 500, '0', 'Try for free · Contact Sales · Explore'],
    ['Meta · 13 · 400 · ink 50%', 13, 400, '0', 'Van Dijk Freight · demo', 0.5],
    ['Tile and chip · 12 · 500', 12, 500, '0', 'Banking · Public sector · Logistics'],
  ];
  let y = 72;
  let body = `<text x="40" y="${y - 20}" font-family="${FONT}" font-size="13" fill="${INK}" fill-opacity=".5">Inter for everything · JetBrains Mono for code · tabular figures for numbers</text>`;
  for (const [label, size, weight, track, text, op = 1] of rows) {
    y += 22;
    body += `<text x="40" y="${y}" font-family="${MONO}" font-size="11" fill="${INK}" fill-opacity=".5">${label}</text>`;
    y += size * 1.15 + 6;
    body += `<text x="40" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" letter-spacing="${track}" fill="${INK}" fill-opacity="${op}">${text}</text>`;
    y += 20;
  }
  y += 22;
  body += `<text x="40" y="${y}" font-family="${MONO}" font-size="11" fill="${INK}" fill-opacity=".5">Mono · 13/22 · code, shell lines, model ids</text>`;
  y += 26;
  body += `<text x="40" y="${y}" font-family="${MONO}" font-size="13" fill="${INK}"><tspan fill-opacity=".4">$ </tspan>curl -fsSL https://surogate.ai/desktop/install.sh | bash</text>`;
  y += 34;
  body += `<text x="40" y="${y}" font-family="${MONO}" font-size="11" fill="${INK}" fill-opacity=".5">Fact · 32 · 450 · tabular-nums</text>`;
  y += 40;
  body += `<text x="40" y="${y}" font-family="${FONT}" font-size="32" font-weight="450" letter-spacing="-0.32" fill="${INK}" style="font-variant-numeric: tabular-nums">0% · 30% · 40%</text>`;
  save('type-specimen.svg', doc(1000, y + 40, body, 'Surogate type specimen', WHITE));
}

# Site v2, Phase 1 (Foundation) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the v2 visual system, the rabbit character, the new nav (with the Products mega-menu and the Try-for-free split button), the new footer and the new home page on branch `feat/site-v2`.

**Architecture:**
- Content lives in plain data modules in `lib/`: `site.js`, `products.js` and `films.js`. They are tested with `node --test`.
- Shared UI lives in `components/site/`; home sections live in `components/home/`.
- Motion is CSS only, in `app/v2.css`. Every animation's resting style is its final frame, so reduced motion shows the finished state.
- Links to pages that later phases build are listed in `PENDING`, which `check-links` skips. `PENDING` must be empty by the end of Phase 4.

**Tech Stack:** Next.js 15 (static export), React 19, Tailwind 3, `node --test`, and ffmpeg (dev-time only). No new npm dependencies.

**Spec:** `docs/superpowers/specs/2026-10-27-site-v2-design.md`

**Rules that apply to every task:**
- Inter only.
- No comments unless they explain *why*.
- Every internal href ends in `/`.
- Every signup, mailto or Discord link goes through `TrackedLink` with an event, which check-links enforces.
- No em dashes in copy.
- No numbers on screen that are not in `lib/`.
- Commits use Conventional Commits with **no Claude attribution trailer** (workspace CLAUDE.md).

**Chrome for `check:layout`:** `google-chrome` is not installed. Use Playwright's Chromium:
`export CHROME=$HOME/.cache/ms-playwright/chromium-1248/chrome-linux/chrome`

---

## File map

| File | Status | Responsibility |
|---|---|---|
| `tailwind.config.js` | modify | v2 colour tokens |
| `app/globals.css` | modify | `.v2` headings inherit Inter instead of Fraunces |
| `app/v2.css` | create | Rabbit, sequence, cycling-word and mock keyframes, plus the reduced-motion stop |
| `app/layout.jsx` | modify | Import `v2.css`; new default title and description |
| `app/labs.css` | modify | The Labs sub-nav sticks below the now-sticky site nav |
| `components/site/rabbit.js` | create | Rabbit path data and `POSES` (plain JS, testable) |
| `components/site/Rabbit.jsx` | create | `<Rabbit>` and `<RabbitAvatar>` |
| `components/site/Button.jsx` | create | Pill link (`primary`, `secondary`, `sun`, `glass`) |
| `components/site/Section.jsx` | create | `Section` (tone and container) and `SectionHead` |
| `components/site/Pill.jsx` | create | Announcement pill |
| `components/site/LoopVideo.jsx` | create | Muted loop that plays only while visible and only without reduced motion |
| `components/site/CodeTabs.jsx` | create | Tabbed code window with Copy |
| `components/site/StatStrip.jsx` | create | Row of sourced numbers |
| `components/site/GetStarted.jsx` | create | The "Choose how to get started" pair |
| `components/site/mocks/*.jsx` | create | Five self-playing product mocks |
| `components/site/ProductMedia.jsx` | create | Picks a product's mock or loop (used by the bento and the mega-menu) |
| `components/site/site.test.mjs` | create | Markup tests for the components above |
| `lib/site.js` | modify | `MENUS`, `TRY_MENU`, `ANNOUNCEMENT`, `FOOTER`, `PENDING`, home route copy; `NAV` removed |
| `lib/site.test.mjs` | modify | Every link is live or pending |
| `lib/products.js` + `.test.mjs` | create | The six products |
| `lib/films.js` + `.test.mjs` | create | The seven use-case films and their files |
| `scripts/cut-media.sh` | create | ffmpeg: films, loops and posters into `public/media/films/` |
| `scripts/check-links.mjs` | modify | Skip `PENDING` paths |
| `components/Nav.jsx` | rewrite | v2 nav (desktop menus and mobile sheet) |
| `components/Footer.jsx` | rewrite | v2 aubergine footer |
| `components/home/*.jsx` | create / delete | New home sections; old sections and `home-page.css` deleted |
| `app/page.jsx` | rewrite | The v2 home page |
| `package.json` | modify | `test` script also runs `components/site/*.test.mjs` |

---

### Task 1: Tokens, base CSS and motion file

**Files:**
- Modify: `tailwind.config.js` (the `colors` block)
- Modify: `app/globals.css` (the `@layer base` block)
- Create: `app/v2.css`
- Modify: `app/layout.jsx` (imports)

- [ ] **Step 1: Add the v2 colours to Tailwind.** In `tailwind.config.js`, inside `theme.extend.colors`, next to `brand: {…}`, add:

```js
        ink: '#0a0a0a',
        ivory: '#f9f8f6',
        stone: '#f2f1ef',
        hairline: '#e4e4e7',
        aubergine: '#2a102d',
        night: '#1a0a1c',
        cream: '#f3ead8',
        sun: '#ffaf10',
```

- [ ] **Step 2: Let v2 headings keep Inter.** In `app/globals.css`, inside `@layer base`, directly after the `h1, h2, h3, h4 { @apply font-serif; }` rule, add:

```css
  /* Old pages still rely on the Fraunces default above; v2 pages opt out as a whole. */
  .v2 :is(h1, h2, h3, h4) {
    font-family: inherit;
  }
```

- [ ] **Step 3: Create `app/v2.css`:**

```css
/* Motion for the v2 components. Each animated element's resting style is its final frame,
   so stopping every animation under reduced motion leaves the finished picture. */

.rabbit-eye { transform-box: fill-box; transform-origin: center; animation: rabbit-blink 5s infinite; }
@keyframes rabbit-blink { 0%, 94%, 100% { transform: scaleY(1); } 97% { transform: scaleY(0.1); } }
.rabbit-think { animation: rabbit-hop 0.9s ease-in-out infinite; }
@keyframes rabbit-hop { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12%); } }

.word-in { display: inline-block; animation: word-in 0.5s ease both; }
@keyframes word-in { from { opacity: 0; filter: blur(6px); transform: translateY(0.15em); } }

/* One 9 s loop shared by every mock: step N appears at its slot and all clear together. */
.seq1, .seq2, .seq3, .seq4 { animation-duration: 9s; animation-iteration-count: infinite; animation-timing-function: ease; }
.seq1 { animation-name: seq1; } .seq2 { animation-name: seq2; } .seq3 { animation-name: seq3; } .seq4 { animation-name: seq4; }
@keyframes seq1 { 0% { opacity: 0; transform: translateY(6px); } 5%, 90% { opacity: 1; transform: none; } 100% { opacity: 0; } }
@keyframes seq2 { 0%, 15% { opacity: 0; transform: translateY(6px); } 20%, 90% { opacity: 1; transform: none; } 100% { opacity: 0; } }
@keyframes seq3 { 0%, 32% { opacity: 0; transform: translateY(6px); } 37%, 90% { opacity: 1; transform: none; } 100% { opacity: 0; } }
@keyframes seq4 { 0%, 50% { opacity: 0; transform: translateY(6px); } 55%, 90% { opacity: 1; transform: none; } 100% { opacity: 0; } }

.mock-bar { transform-origin: bottom; animation: mock-bar 1.1s ease-in-out infinite alternate; animation-delay: calc(var(--i) * -0.13s); }
@keyframes mock-bar { from { transform: scaleY(0.25); } }

.mock-move { animation: mock-move 9s ease infinite; }
@keyframes mock-move { 0%, 15% { left: 0%; } 25%, 45% { left: 33.333%; } 55%, 100% { left: 66.666%; } }

.mock-draw { stroke-dasharray: 400; animation: mock-draw 9s ease infinite; }
@keyframes mock-draw { 0%, 10% { stroke-dashoffset: 400; } 70%, 100% { stroke-dashoffset: 0; } }

@media (prefers-reduced-motion: reduce) {
  .rabbit-eye, .rabbit-think, .word-in, .seq1, .seq2, .seq3, .seq4, .mock-bar, .mock-move, .mock-draw { animation: none !important; }
}
```

- [ ] **Step 4: Import it.** In `app/layout.jsx`, under `import './globals.css';`, add:

```js
import './v2.css';
```

- [ ] **Step 5: Build.** Run `npm run build`. Expected: `✓ Compiled successfully` and the export finishes. Pages are unchanged at this point.

- [ ] **Step 6: Commit.**

```bash
git add tailwind.config.js app/globals.css app/v2.css app/layout.jsx
git commit -m "feat(site): v2 colour tokens and motion base"
```

---

### Task 2: Site data (menus, footer, pending routes)

**Files:**
- Modify: `lib/site.js` (home route copy; replace `NAV` with the exports below)
- Modify: `lib/site.test.mjs`
- Create: `lib/products.js`, `lib/products.test.mjs`
- Create: `components/site/rabbit.js` (`POSES` is needed by the products test)

- [ ] **Step 1: Write the failing tests.** Append to `lib/site.test.mjs` (and add `MENUS, TRY_MENU, FOOTER, PENDING, ANNOUNCEMENT` to its import line):

```js
const internal = (href) => href.startsWith('/') ? href.split('#')[0] : null;
const allLinks = () => [
  ...MENUS.flatMap((m) => [m.href, ...(m.items || []).map((i) => i.href), m.more?.href]),
  ...TRY_MENU.flatMap((g) => g.items.map((i) => i.href)),
  ...FOOTER.flatMap((c) => c.links.map((l) => l.href)),
  ANNOUNCEMENT.href,
].filter(Boolean);

test('every internal link in the nav, footer and announcement is a live or a pending page', () => {
  for (const href of allLinks()) {
    const path = internal(href);
    if (path) assert.ok(live.has(path) || PENDING.includes(path), href);
  }
});

test('a pending page is not also live, so the list empties as phases land', () => {
  for (const p of PENDING) assert.ok(!live.has(p), p);
});

test('outside links are marked external, so they open in a new tab with the arrow', () => {
  for (const m of MENUS) for (const i of m.items || []) if (/^https?:/.test(i.href)) assert.equal(i.external, true, i.href);
  for (const g of TRY_MENU) for (const i of g.items) if (/^https?:/.test(i.href)) assert.equal(i.external, true, i.href);
});
```

Create `lib/products.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from './products.js';
import { ROUTES, PENDING } from './site.js';
import { POSES } from '../components/site/rabbit.js';

test('six products in menu order, each with its own key and rabbit pose', () => {
  assert.deepEqual(PRODUCTS.map((p) => p.key), ['agents', 'surogate', 'voice', 'keel', 'train', 'api']);
  for (const p of PRODUCTS) assert.ok(POSES.includes(p.pose), p.key);
  assert.equal(new Set(PRODUCTS.map((p) => p.pose)).size, PRODUCTS.length);
});

test('every product page is live or pending', () => {
  const live = new Set(ROUTES.map((r) => r.path));
  for (const p of PRODUCTS) assert.ok(live.has(p.href) || PENDING.includes(p.href), p.href);
});

test('menu lines stay one short sentence and make no unsourced speed claim', () => {
  for (const p of PRODUCTS) {
    assert.ok(p.line.length <= 70, p.key);
    assert.doesNotMatch(p.line, /\d+\s?ms/);
  }
});
```

- [ ] **Step 2: Run them and see them fail.** `npm test`. Expected: FAIL, with `MENUS` not exported and `./products.js` not found.

- [ ] **Step 3: Create `components/site/rabbit.js`.** It holds the paths from `public/brand/rabbit.svg`, unchanged.

**Do not type the paths by hand.** Copy `RABBIT_FILL`, `RABBIT_OUTLINE` (the second `cls-1` path, the outline ring) and `RABBIT_EYE` (the third path) verbatim from `public/brand/rabbit.svg`, using this script:

```bash
node -e "const s=require('fs').readFileSync('public/brand/rabbit.svg','utf8');const d=[...s.matchAll(/ d=\"([^\"]+)\"/g)].map(m=>m[1]);console.log(JSON.stringify({fill:d[0],outline:d[1],eye:d[2]},null,1))"
```

Then write the file as:

```js
// The official rabbit silhouette from public/brand/rabbit.svg. Every pose starts from these paths;
// the rabbit is never redrawn by hand.
export const RABBIT_BOX = { w: 71.04, h: 72.72 };
export const RABBIT_FILL = '<d[0] from the script>';
export const RABBIT_OUTLINE = '<d[1] from the script>';
export const RABBIT_EYE = '<d[2] from the script>';

// One pose per product (spec §4.1), plus the bare mark.
export const POSES = ['plain', 'team', 'computer', 'voice', 'track', 'hat', 'stream'];
```

(The `<d[n] from the script>` markers are the script's output pasted as string literals. Nothing else in the file is left to fill in.)

- [ ] **Step 4: Create `lib/products.js`:**

```js
// The six products, in menu order: from what the widest audience uses to what builders use.
// The nav's Products menu, the home bento and the footer all read this list.
export const PRODUCTS = [
  { key: 'agents', name: 'Agents', href: '/agents/', pose: 'team', tone: 'ivory',
    line: 'AI colleagues for every team, on your own infrastructure.' },
  { key: 'surogate', name: 'Surogate', href: '/surogate/', pose: 'computer', tone: 'ivory',
    line: 'Your AI with its own computer. Works on your files and browser.' },
  { key: 'voice', name: 'Voice', href: '/voice/', pose: 'voice', tone: 'night',
    line: 'Voice agents that listen and answer in real time.' },
  { key: 'keel', name: 'Keel', href: '/keel/', pose: 'track', tone: 'ivory',
    line: 'Business processes that run agents, with approvals and audit.' },
  { key: 'train', name: 'Train', href: '/train/', pose: 'hat', tone: 'night',
    line: 'Train and serve your own model on one engine.' },
  { key: 'api', name: 'API', href: '/api/', pose: 'stream', tone: 'ivory',
    line: 'Every frontier model, one API, 0% markup.' },
];
```

- [ ] **Step 5: Update `lib/site.js`.**

**5a.** Change the `/` entry of `ROUTES` to:

```js
  {
    path: '/',
    title: 'Surogate - Your AI, on your terms',
    description:
      'Agents, voice, process automation and your own models, on your hardware or ours. Built in Europe.',
  },
```

**5b.** Delete the `NAV` export. In its place, add:

```js
// Pages the nav already links to that later phases of the v2 build add. check-links skips them
// and lib/site.test.mjs keeps this list free of live pages; it is empty when v2 ships.
export const PENDING = [
  '/surogate/', '/voice/', '/train/', '/api/',
  '/customers/', '/solutions/', '/solutions/enterprise/', '/solutions/government/',
  '/solutions/banking-insurance/', '/solutions/professionals/', '/solutions/custom-models/', '/security/',
  '/company/', '/careers/', '/contact/', '/news/',
];

export const LINKS = {
  docs: 'https://docs.surogate.ai',
  apiKey: 'https://llm.buzz',
  console: 'https://llm.buzz/console',
  status: 'https://llm.buzz/status',
  github: 'https://github.com/invergent-ai',
  jackalope: 'https://github.com/invergent-ai/surogate-jackalope/releases',
  huggingface: 'https://huggingface.co/surogate',
};

export const ANNOUNCEMENT = {
  tag: 'New',
  text: 'Jackrabbit and Amami, our Romanian speech models',
  href: '/labs/speech/',
};

// Products is drawn from lib/products.js; the other menus are plain lists.
export const MENUS = [
  { label: 'Products', mega: true },
  {
    label: 'Solutions',
    items: [
      { label: 'Customer Stories', href: '/customers/' },
      { label: 'Enterprise', href: '/solutions/enterprise/' },
      { label: 'Government', href: '/solutions/government/' },
      { label: 'Banking & Insurance', href: '/solutions/banking-insurance/' },
      { label: 'Professionals', href: '/solutions/professionals/' },
      { label: 'Custom Models', href: '/solutions/custom-models/' },
      { label: 'Security & Trust', href: '/security/' },
    ],
    more: { label: 'Explore all use cases', href: '/solutions/' },
  },
  {
    label: 'Developer',
    items: [
      { label: 'API Overview', href: '/api/' },
      { label: 'Documentation', href: LINKS.docs, external: true },
      { label: 'Console', href: LINKS.console, external: true },
      { label: 'Open Source', href: LINKS.github, external: true },
      { label: 'Status', href: LINKS.status, external: true },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About', href: '/company/' },
      { label: 'Research', href: '/labs/' },
      { label: 'Partners', href: '/partners/' },
      { label: 'Careers', href: '/careers/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'News', href: '/news/' },
];

export const CONTACT_SALES = '/contact/';

export const TRY_MENU = [
  { group: 'Use it', items: [
    { label: 'Agents', href: 'https://ops.surogate.ai', external: true },
    { label: 'Surogate desktop', href: '/surogate/' },
  ] },
  { group: 'Build', items: [
    { label: 'API key', href: LINKS.apiKey, external: true },
    { label: 'Train', href: '/train/' },
    { label: 'Jackalope', href: LINKS.jackalope, external: true },
  ] },
  { group: 'Business', items: [
    { label: 'Contact Sales', href: '/contact/' },
    { label: 'Become a partner', href: '/partners/' },
  ] },
];

export const FOOTER = [
  { heading: 'Products', links: [
    { label: 'Agents', href: '/agents/' }, { label: 'Surogate', href: '/surogate/' },
    { label: 'Voice', href: '/voice/' }, { label: 'Keel', href: '/keel/' },
    { label: 'Train', href: '/train/' }, { label: 'API', href: '/api/' },
  ] },
  { heading: 'Solutions', links: [
    { label: 'Customer Stories', href: '/customers/' }, { label: 'Enterprise', href: '/solutions/enterprise/' },
    { label: 'Government', href: '/solutions/government/' }, { label: 'Banking & Insurance', href: '/solutions/banking-insurance/' },
    { label: 'Professionals', href: '/solutions/professionals/' }, { label: 'Custom Models', href: '/solutions/custom-models/' },
    { label: 'Security & Trust', href: '/security/' },
  ] },
  { heading: 'Developers', links: [
    { label: 'API Overview', href: '/api/' }, { label: 'Documentation', href: LINKS.docs },
    { label: 'Console', href: LINKS.console }, { label: 'Open Source', href: LINKS.github },
    { label: 'Status', href: LINKS.status },
  ] },
  { heading: 'Research', links: [
    { label: 'Labs', href: '/labs/' }, { label: 'Rune', href: '/labs/rune/' },
    { label: 'Speech', href: '/labs/speech/' }, { label: 'Engine', href: '/labs/engine/' },
    { label: 'Rune at work', href: '/labs/rune-examples/' }, { label: 'Hugging Face', href: LINKS.huggingface },
  ] },
  { heading: 'Company', links: [
    { label: 'About', href: '/company/' }, { label: 'Partners', href: '/partners/' },
    { label: 'Partner directory', href: '/partners/#directory' }, { label: 'Careers', href: '/careers/' },
    { label: 'News', href: '/news/' }, { label: 'Pricing', href: '/pricing/' },
    { label: 'Contact', href: '/contact/' },
  ] },
  { heading: 'Social', links: [
    { label: 'YouTube', href: 'https://www.youtube.com/@Surogate_ai' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/showcase/surogate' },
    { label: 'Instagram', href: 'https://www.instagram.com/surogate.ai/' },
    { label: 'Discord', href: CONTACT.discord },
  ] },
];
```

**5c.** Keep `SIGN_IN` exactly as it is. `scripts/check-links.mjs` imports it.

- [ ] **Step 6: Run the tests.** `npm test`. Expected: PASS for every test in `lib/site.test.mjs` and `lib/products.test.mjs`. The build will now fail because `components/Nav.jsx` imports `NAV`; Task 8 fixes that. Do not build until then.

- [ ] **Step 7: Commit.**

```bash
git add lib/site.js lib/site.test.mjs lib/products.js lib/products.test.mjs components/site/rabbit.js
git commit -m "feat(site): v2 menus, footer, product list and pending routes"
```

---

### Task 3: check-links skips pending pages

**Files:**
- Modify: `scripts/check-links.mjs`

- [ ] **Step 1: Update the import.** Change the import line to `import { CONTACT, PENDING, REDIRECTS, SIGN_IN } from '../lib/site.js';`

- [ ] **Step 2: Skip pending paths.** In the href loop, directly after `const path = pathq.split('?')[0];`, add:

```js
    if (PENDING.includes(path)) continue;
```

- [ ] **Step 3: Commit.**

```bash
git add scripts/check-links.mjs
git commit -m "chore(site): check-links skips pages later v2 phases add"
```

---

### Task 4: The rabbit component

**Files:**
- Create: `components/site/Rabbit.jsx`
- Create: `components/site/site.test.mjs`
- Modify: `package.json` (the `test` script)

- [ ] **Step 1: Write the failing test.** Create `components/site/site.test.mjs`:

```js
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
```

In `package.json`, change the `test` script to:

```json
"test": "node --test \"lib/**/*.test.mjs\" \"components/labs/*.test.mjs\" \"components/site/*.test.mjs\"",
```

- [ ] **Step 2: Run it and see it fail.** `npm test`. Expected: FAIL, with `Cannot find module …/Rabbit.jsx`.

- [ ] **Step 3: Create `components/site/Rabbit.jsx`:**

```jsx
import { POSES, RABBIT_BOX, RABBIT_EYE, RABBIT_FILL, RABBIT_OUTLINE } from './rabbit';

// Each product's attribute, drawn around the mark in the mark's own units. The viewBox leaves room
// on every side so an attribute never clips.
const ATTRIBUTES = {
  plain: null,
  team: null,
  computer: (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="-8" y="-12" width="88" height="96" rx="8" />
      <path d="M-8 0H80" />
      <path d="M62 66l10 4-5 2-2 5z" fill="currentColor" />
    </g>
  ),
  voice: (
    <g fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
      <path d="M74 6a14 14 0 0 1 0 22" />
      <path d="M80 -2a24 24 0 0 1 0 38" />
    </g>
  ),
  track: (
    <g fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
      <path d="M-6 82H78" />
      <path d="M4 76v12M36 76v12M68 76v12" />
    </g>
  ),
  hat: (
    <g fill="currentColor">
      <rect x="6" y="64" width="60" height="22" rx="3" />
      <rect x="-4" y="60" width="80" height="6" rx="3" />
    </g>
  ),
  stream: (
    <g fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
      <path d="M-12 40h14M-16 52h12M-10 64h10" />
    </g>
  ),
};

function Mark({ x = 0, y = 0, scale = 1, think }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className={think ? 'rabbit-think' : undefined}>
      <path d={RABBIT_FILL} fill="var(--rabbit-bg, #fff)" />
      <path d={RABBIT_OUTLINE} fill="currentColor" />
      <path d={RABBIT_EYE} fill="currentColor" className="rabbit-eye" />
    </g>
  );
}

// The rabbit as a character (spec §4.1): ink is currentColor, the body is --rabbit-bg.
export default function Rabbit({ pose = 'plain', size = 24, title, think = false, className = '' }) {
  if (!POSES.includes(pose)) throw new Error(`Unknown rabbit pose "${pose}"`);
  const pad = 18;
  const label = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': 'true' };
  return (
    <svg
      viewBox={`${-pad} ${-pad} ${RABBIT_BOX.w + pad * 2} ${RABBIT_BOX.h + pad * 2}`}
      width={size}
      height={size}
      className={className}
      focusable="false"
      {...label}
    >
      {pose === 'team' ? (
        <>
          <Mark x={-14} y={22} scale={0.55} />
          <Mark x={46} y={22} scale={0.55} />
          <Mark x={10} y={-6} scale={0.7} think={think} />
        </>
      ) : (
        <Mark think={think} />
      )}
      {ATTRIBUTES[pose]}
    </svg>
  );
}

// The agent's avatar in chat mocks: the rabbit in a filled circle.
export function RabbitAvatar({ size = 22, bg = '#2a102d', ink = '#2a102d', body = '#f3ead8', think = false }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: bg, color: ink, '--rabbit-bg': body }}
    >
      <Rabbit size={size * 0.9} think={think} />
    </span>
  );
}
```

- [ ] **Step 4: Run the tests.** `npm test`. Expected: PASS.

- [ ] **Step 5: Look at the poses.** Build a contact sheet so the poses can be checked by eye. Each attribute must sit clear of the silhouette and must not clip:

```bash
mkdir -p /tmp/site-shots && node -e "
import('node:module').then(async ({register})=>{register('./components/labs/jsx-loader.mjs', 'file://'+process.cwd()+'/');
const React=(await import('react')).default;const {renderToStaticMarkup}=await import('react-dom/server');
const {default:R}=await import('./components/site/Rabbit.jsx');const {POSES}=await import('./components/site/rabbit.js');
const cells=POSES.map(p=>'<figure style=\"margin:8px;color:#2a102d\">'+renderToStaticMarkup(React.createElement(R,{pose:p,size:120}))+'<figcaption>'+p+'</figcaption></figure>').join('');
require('fs').writeFileSync('/tmp/site-shots/rabbits.html','<body style=\"display:flex;flex-wrap:wrap;background:#f9f8f6;font:14px Inter\">'+cells+'</body>')})"
"$CHROME" --headless --screenshot=/tmp/site-shots/rabbits.png --window-size=1100,220 file:///tmp/site-shots/rabbits.html
```

Open `/tmp/site-shots/rabbits.png`. If an attribute overlaps the body or clips, adjust only that pose's coordinates in `ATTRIBUTES`.

- [ ] **Step 6: Commit.**

```bash
git add components/site/Rabbit.jsx components/site/site.test.mjs package.json
git commit -m "feat(site): rabbit character with one pose per product"
```

---

### Task 5: Primitives (Button, Section, Pill, StatStrip, GetStarted)

**Files:**
- Create: `components/site/Button.jsx`, `components/site/Section.jsx`, `components/site/Pill.jsx`, `components/site/StatStrip.jsx`, `components/site/GetStarted.jsx`
- Modify: `components/site/site.test.mjs`

- [ ] **Step 1: Write the failing tests.** Append to `components/site/site.test.mjs`:

```js
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
```

- [ ] **Step 2: Run them and see them fail.** `npm test`. Expected: FAIL, with `Cannot find module …/Button.jsx`.

- [ ] **Step 3: Create `components/site/Button.jsx`:**

```jsx
import TrackedLink from '@/components/TrackedLink';

// Colours carry ! because Labs pages sit inside .st-home, whose a{color:inherit} outranks utilities.
const VARIANTS = {
  primary: 'bg-ink !text-white hover:bg-ink/85',
  secondary: 'bg-stone !text-ink hover:bg-hairline',
  sun: 'bg-sun !text-aubergine hover:brightness-95',
  glass: 'bg-white/10 !text-white hover:bg-white/15',
};
const SIZES = { md: 'h-10 px-[18px] text-[14px]', lg: 'h-11 px-5 text-[15px]' };

export default function Button({ href, variant = 'primary', size = 'md', event, eventProps, external, className = '', children }) {
  const cls = `inline-flex items-center justify-center gap-1.5 rounded-full font-medium no-underline whitespace-nowrap transition-colors ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  if (event) return <TrackedLink href={href} className={cls} event={event} eventProps={eventProps} {...ext}>{children}</TrackedLink>;
  return <a href={href} className={cls} {...ext}>{children}</a>;
}
```

- [ ] **Step 4: Create `components/site/Section.jsx`:**

```jsx
const TONES = {
  light: 'bg-white text-ink',
  ivory: 'bg-ivory text-ink',
  aubergine: 'bg-aubergine text-cream',
};

export default function Section({ tone = 'light', id, className = '', inner = '', children }) {
  return (
    <section id={id} className={`${TONES[tone]} ${className}`}>
      <div className={`max-w-[1200px] mx-auto px-6 py-24 md:py-32 ${inner}`}>{children}</div>
    </section>
  );
}

export function SectionHead({ title, sub, align = 'left', action }) {
  const center = align === 'center';
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 mb-12 ${center ? 'flex-col !items-center text-center' : ''}`}>
      <div className={`max-w-[760px] ${center ? 'mx-auto' : ''}`}>
        <h2 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.01em] font-[500]">{title}</h2>
        {sub && <p className="mt-4 mb-0 text-[18px] leading-[1.6] opacity-70">{sub}</p>}
      </div>
      {action}
    </div>
  );
}
```

- [ ] **Step 5: Create `components/site/Pill.jsx`:**

```jsx
import { ArrowUpRight } from 'lucide-react';

export default function Pill({ tag, text, href }) {
  return (
    <a href={href} className="inline-flex items-center gap-3 rounded-full border border-hairline bg-white py-1.5 pl-2 pr-1.5 text-[14px] !text-ink no-underline hover:bg-ivory">
      <span className="rounded-full bg-sun/20 px-2 py-0.5 text-[12px] font-medium !text-[#9a5b00]">{tag}</span>
      <span>{text}</span>
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-stone" aria-hidden="true">
        <ArrowUpRight size={14} />
      </span>
    </a>
  );
}
```

- [ ] **Step 6: Create `components/site/StatStrip.jsx`:**

```jsx
export default function StatStrip({ items }) {
  return (
    <dl className="m-0 grid grid-cols-2 md:grid-cols-4 border-y border-hairline">
      {items.map((s) => (
        <div key={s.l} className="px-6 py-8 border-hairline md:[&:not(:first-child)]:border-l">
          <dt className="sr-only">{s.l}</dt>
          <dd className="m-0 text-[40px] leading-none tracking-[-0.01em] font-[500]">{s.n}</dd>
          <dd className="m-0 mt-3 text-[14px] leading-[1.5] text-ink/60">{s.l}</dd>
        </div>
      ))}
    </dl>
  );
}
```

- [ ] **Step 7: Create `components/site/GetStarted.jsx`:**

```jsx
import { Check } from 'lucide-react';
import Button from './Button';
import { CONTACT_SALES, SIGN_IN } from '@/lib/site';

const PATHS = [
  { title: 'Build on your own', points: ['Start free, no card', 'Agents, API and engine in one account', 'Docs and Discord when you need them'],
    cta: { label: 'Try for free', href: SIGN_IN, variant: 'primary', event: 'cta_signup_clicked' } },
  { title: 'Work with us', points: ['Deployment in your cloud or on your hardware', 'Custom models trained on your data', 'A partner near you, or our own engineers'],
    cta: { label: 'Contact Sales', href: CONTACT_SALES, variant: 'secondary', event: 'contact_sales_clicked' } },
];

export default function GetStarted({ location }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {PATHS.map((p) => (
        <div key={p.title} className="flex flex-col rounded-2xl bg-ivory p-8">
          <h3 className="m-0 text-[24px] font-[500]">{p.title}</h3>
          <ul className="m-0 mt-6 mb-8 list-none p-0 flex flex-col gap-3 text-[15px] text-ink/75">
            {p.points.map((x) => <li key={x} className="flex gap-2"><Check size={18} className="shrink-0 text-ink" />{x}</li>)}
          </ul>
          <Button href={p.cta.href} variant={p.cta.variant} size="lg" event={p.cta.event} eventProps={{ location }} className="mt-auto w-full">
            {p.cta.label}
          </Button>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 8: Run the tests.** `npm test`. Expected: PASS.

- [ ] **Step 9: Commit.**

```bash
git add components/site/Button.jsx components/site/Section.jsx components/site/Pill.jsx components/site/StatStrip.jsx components/site/GetStarted.jsx components/site/site.test.mjs
git commit -m "feat(site): v2 buttons, sections, pill, stat strip and get-started cards"
```

---

### Task 6: Media (films, loops and posters) and LoopVideo

**Files:**
- Create: `scripts/cut-media.sh`
- Create: `lib/films.js`, `lib/films.test.mjs`
- Create: `components/site/LoopVideo.jsx`
- Create: `public/media/films/*` (generated)
- Modify: `components/site/site.test.mjs`

- [ ] **Step 1: Write the failing tests.** Create `lib/films.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import { FILMS, filmFiles } from './films.js';

const MB = 1024 * 1024;

test('every film has its film, loop and poster on disk, small enough for a phone', () => {
  for (const f of FILMS) {
    const { film, loop, poster } = filmFiles(f.slug);
    for (const p of [film, loop, poster]) assert.ok(existsSync(`public${p}`), p);
    assert.ok(statSync(`public${film}`).size <= 2.5 * MB, film);
    assert.ok(statSync(`public${loop}`).size <= 1.5 * MB, loop);
  }
});

test('films are demos on fictional businesses, never a real client', () => {
  for (const f of FILMS) assert.equal(f.demo, true, f.slug);
  assert.ok(!FILMS.some((f) => /pretorian/i.test(f.slug)));
});
```

Append to `components/site/site.test.mjs`:

```js
test('a loop never autoplays from markup, so reduced motion and offscreen tiles stay still', async () => {
  const html = await render('./LoopVideo.jsx', { src: '/media/films/x-loop.mp4', poster: '/media/films/x.jpg' });
  assert.match(html, /<video[^>]*muted=""[^>]*loop=""[^>]*playsInline=""[^>]*preload="none"/);
  assert.match(html, /poster="\/media\/films\/x\.jpg"/);
  assert.doesNotMatch(html, /autoplay/i);
});
```

- [ ] **Step 2: Run them and see them fail.** `npm test`. Expected: FAIL, with `./films.js` not found.

- [ ] **Step 3: Create `scripts/cut-media.sh`:**

```bash
#!/usr/bin/env bash
# Cuts the site's films, silent loops and posters from the rendered use-case shorts
# (../videos/renders/shorts, made with the product-videos playbook on the local stack).
#   bash scripts/cut-media.sh
set -euo pipefail
SRC=${SRC:-../videos/renders/shorts}
OUT=public/media/films
mkdir -p "$OUT"

# Where each loop starts, in seconds: past the title card, on the moment the film is about.
declare -A AT=( [ursu-whiteboard]=6 [clarke-knee-photo]=6 [vandijk-approval]=6 [pop-glossary-conflict]=6
                [mette-first-buyer]=6 [ortega-monday-leads]=6 [vandijk-ml-scoreboard]=6 )

for f in "$SRC"/*-1x1.mp4; do
  slug=$(basename "$f" -1x1.mp4); slug=${slug#??-}
  at=${AT[$slug]:-6}
  ffmpeg -y -v error -i "$f" -vf scale=720:720 -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p \
    -movflags +faststart -c:a aac -b:a 96k "$OUT/$slug.mp4"
  ffmpeg -y -v error -ss "$at" -t 6 -i "$f" -an -vf scale=480:480,fps=24 -c:v libx264 -crf 30 -preset slow \
    -pix_fmt yuv420p -movflags +faststart "$OUT/$slug-loop.mp4"
  ffmpeg -y -v error -ss "$at" -i "$f" -frames:v 1 -vf scale=720:720 -q:v 4 "$OUT/$slug.jpg"
  echo "$slug $(du -h "$OUT/$slug.mp4" | cut -f1) loop $(du -h "$OUT/$slug-loop.mp4" | cut -f1)"
done
```

- [ ] **Step 4: Run it.** `bash scripts/cut-media.sh`. Expected: 7 lines, each film at most about 2.5M and each loop at most about 1.5M.

- [ ] **Step 5: Check each loop's start by eye.** Open every `public/media/films/*.jpg`. A poster that shows a title card or a blank frame gets a later `AT` value. Re-run the script until every poster shows the product mid-action.

- [ ] **Step 6: Create `lib/films.js`:**

```js
// The use-case films: real product, filmed on the local stack, on fictional businesses
// (product-videos world seed). A real client's tenant is never filmed for the site.
export const FILMS = [
  { slug: 'vandijk-approval', business: 'Van Dijk Freight', title: 'An approval that waits for a person', product: 'agents', demo: true },
  { slug: 'clarke-knee-photo', business: 'Clarke Physio', title: 'A check-in after knee surgery', product: 'agents', demo: true },
  { slug: 'ortega-monday-leads', business: 'Ortega Properties', title: 'The Monday leads, sorted', product: 'agents', demo: true },
  { slug: 'pop-glossary-conflict', business: 'Traduceri Pop', title: 'Two glossaries that disagree', product: 'agents', demo: true },
  { slug: 'ursu-whiteboard', business: 'Meditații Ursu', title: 'A maths tutor at the whiteboard', product: 'agents', demo: true },
  { slug: 'mette-first-buyer', business: 'Bread by Mette', title: 'The first buyer of her agent', product: 'agents', demo: true },
  { slug: 'vandijk-ml-scoreboard', business: 'Van Dijk ML team', title: 'A model trained on their own chats', product: 'train', demo: true },
];

export const filmFiles = (slug) => ({
  film: `/media/films/${slug}.mp4`,
  loop: `/media/films/${slug}-loop.mp4`,
  poster: `/media/films/${slug}.jpg`,
});
```

- [ ] **Step 7: Create `components/site/LoopVideo.jsx`:**

```jsx
'use client';

import { useEffect, useRef } from 'react';

// Plays only while on screen and never under reduced motion; otherwise the poster stands in.
export default function LoopVideo({ src, poster, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-hidden="true" className={className} />;
}
```

- [ ] **Step 8: Run the tests.** `npm test`. Expected: PASS.

- [ ] **Step 9: Commit.** The media is committed too, because the static export ships it.

```bash
git add scripts/cut-media.sh lib/films.js lib/films.test.mjs components/site/LoopVideo.jsx components/site/site.test.mjs public/media/films
git commit -m "feat(site): use-case films, loops and posters for v2"
```

---

### Task 7: Product mocks and ProductMedia

**Files:**
- Create: `components/site/mocks/SurogateMock.jsx`, `VoiceMock.jsx`, `KeelMock.jsx`, `TrainMock.jsx`, `ApiMock.jsx`
- Create: `components/site/ProductMedia.jsx`
- Modify: `components/site/site.test.mjs`

The text in the mocks is illustrative UI, not a claim. It contains no prices, no latencies and no benchmark numbers.

- [ ] **Step 1: Write the failing test.** Append to `components/site/site.test.mjs`:

```js
test('every product has media, and a mock reads complete without animation', async () => {
  const { PRODUCTS } = await import('../../lib/products.js');
  for (const p of PRODUCTS) {
    const html = await render('./ProductMedia.jsx', { product: p });
    assert.ok(html.length > 200, p.key);
    assert.doesNotMatch(html, /opacity:\s*0/, p.key);
  }
});
```

- [ ] **Step 2: Run it and see it fail.** `npm test`. Expected: FAIL, with `Cannot find module …/ProductMedia.jsx`.

- [ ] **Step 3: Create `components/site/mocks/SurogateMock.jsx`:**

```jsx
import { RabbitAvatar } from '../Rabbit';

export default function SurogateMock() {
  return (
    <div className="flex h-full flex-col justify-end gap-3 p-5 text-[13px]">
      <p className="seq1 m-0 self-end max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-white">month-end is Friday, close out the card for me</p>
      <p className="seq2 m-0 self-center text-[11px] text-ink/45">Overnight · 06:12</p>
      <div className="seq3 flex max-w-[90%] gap-2">
        <RabbitAvatar />
        <div className="rounded-2xl rounded-bl-md bg-white px-4 py-2.5 leading-[1.7] shadow-[0_0_0_1px_#e4e4e7]">
          ✓ Read the statements<br />✓ Matched the receipts<br />✓ Three lines need you
        </div>
      </div>
      <span className="seq4 self-start ml-8 rounded-full bg-sun/25 px-3 py-1 text-[12px] font-medium text-[#7a4a00]">Held for your OK</span>
    </div>
  );
}
```

- [ ] **Step 4: Create `components/site/mocks/VoiceMock.jsx`:**

```jsx
import Rabbit from '../Rabbit';

const BARS = [6, 10, 16, 22, 14, 26, 30, 18, 24, 12, 20, 28, 16, 10, 22, 26, 14, 8, 18, 24, 12, 16, 8, 6];

export default function VoiceMock() {
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-5 text-[13px] text-cream">
      <div className="flex items-center gap-3" style={{ '--rabbit-bg': '#1a0a1c' }}>
        <Rabbit pose="voice" size={36} className="text-sun" />
        <div className="flex h-10 flex-1 items-end gap-[3px]" aria-hidden="true">
          {BARS.map((h, i) => <span key={i} className="mock-bar w-[4px] rounded-full bg-sun" style={{ height: h, '--i': i }} />)}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="seq1 m-0 text-cream/60">„Bună ziua, aș vrea să mut programarea de joi.”</p>
        <p className="seq2 m-0">„Sigur. Vineri la ora 10 vă convine?”</p>
        <span className="seq3 self-start rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] text-cream/80">tool · reschedule_appointment</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create `components/site/mocks/KeelMock.jsx`:**

```jsx
const STAGES = ['Intake', 'Review', 'Approve'];

export default function KeelMock() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 text-[12px]">
      <div className="grid grid-cols-3 gap-2 text-ink/50">
        {STAGES.map((s) => <span key={s} className="rounded-lg bg-white px-2 py-1.5 text-center shadow-[0_0_0_1px_#e4e4e7]">{s}</span>)}
      </div>
      <div className="relative h-[72px]">
        <div className="mock-move absolute top-0 w-1/3 px-1" style={{ left: '66.666%' }}>
          <div className="rounded-xl bg-white p-3 shadow-[0_6px_20px_-12px_rgba(0,0,0,.35),0_0_0_1px_#e4e4e7]">
            <p className="m-0 font-medium text-ink">Supplier onboarding</p>
            <p className="m-0 mt-1 text-ink/50">Case 4812</p>
          </div>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-1.5">
        <span className="seq2 self-start rounded-full bg-stone px-3 py-1 text-ink/70">Checked against the sanctions list</span>
        <span className="seq3 self-start rounded-full bg-stone px-3 py-1 text-ink/70">Within approval limit · routed to Finance</span>
        <span className="seq4 self-start rounded-full bg-sun/25 px-3 py-1 font-medium text-[#7a4a00]">Approved · audit entry saved</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create `components/site/mocks/TrainMock.jsx`:**

```jsx
export default function TrainMock() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 font-mono text-[12px] text-cream/85">
      <p className="m-0"><span className="text-sun">$</span> surogate sft config.yaml</p>
      <p className="seq1 m-0 text-cream/55">loading dataset · desk-chats</p>
      <p className="seq2 m-0 text-cream/55">training · LoRA · FP8</p>
      <svg viewBox="0 0 300 90" className="mt-auto h-[90px] w-full" aria-hidden="true">
        <path d="M0 85H300" stroke="rgba(243,234,216,.15)" />
        <path className="mock-draw" d="M0 10C40 14 60 40 90 52S150 70 190 76 260 80 300 81" fill="none" stroke="#ffaf10" strokeWidth="2.5" strokeDasharray="400" strokeDashoffset="0" />
      </svg>
      <p className="seq4 m-0 text-[#9ece6a]">✓ saved · ready for surogate serve</p>
    </div>
  );
}
```

- [ ] **Step 7: Create `components/site/mocks/ApiMock.jsx`:**

```jsx
import Rabbit from '../Rabbit';

const PROVIDERS = ['Surogate Spark EU', 'Scaleway', 'Simpleminds EU'];

export default function ApiMock() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 text-[12px]">
      <p className="m-0 rounded-lg bg-white px-3 py-2 font-mono text-ink/80 shadow-[0_0_0_1px_#e4e4e7]">
        POST /v1/chat/completions · deepseek/deepseek-v4.1-flash
      </p>
      <div className="flex items-center gap-2 text-ink/50">
        <Rabbit pose="stream" size={28} className="text-aubergine" />
        <span>routing to the provider that fits</span>
      </div>
      <ul className="m-0 list-none p-0 flex flex-col gap-1.5">
        {PROVIDERS.map((p, i) => (
          <li key={p} className={`flex items-center justify-between rounded-lg px-3 py-2 ${i === 0 ? 'seq2 bg-ink text-white' : 'bg-white text-ink/60 shadow-[0_0_0_1px_#e4e4e7]'}`}>
            {p}<span className={i === 0 ? 'text-sun' : ''}>{i === 0 ? 'chosen' : 'ready'}</span>
          </li>
        ))}
      </ul>
      <p className="seq3 m-0 mt-auto text-ink/70">Streaming the reply…</p>
    </div>
  );
}
```

- [ ] **Step 8: Create `components/site/ProductMedia.jsx`:**

```jsx
import LoopVideo from './LoopVideo';
import SurogateMock from './mocks/SurogateMock';
import VoiceMock from './mocks/VoiceMock';
import KeelMock from './mocks/KeelMock';
import TrainMock from './mocks/TrainMock';
import ApiMock from './mocks/ApiMock';
import { filmFiles } from '@/lib/films';

const MOCKS = { surogate: SurogateMock, voice: VoiceMock, keel: KeelMock, train: TrainMock, api: ApiMock };

// Agents is shown working in its real film; the products without footage yet play a mock of their UI.
export default function ProductMedia({ product }) {
  if (product.key === 'agents') {
    const f = filmFiles('vandijk-approval');
    return <LoopVideo src={f.loop} poster={f.poster} className="h-full w-full object-cover" />;
  }
  const Mock = MOCKS[product.key];
  return <Mock />;
}
```

- [ ] **Step 9: Run the tests.** `npm test`. Expected: PASS. If the `opacity: 0` assertion fails, an element's resting style is hidden; move the hidden state into the keyframes in `app/v2.css`.

- [ ] **Step 10: Commit.**

```bash
git add components/site/mocks components/site/ProductMedia.jsx components/site/site.test.mjs
git commit -m "feat(site): self-playing product mocks"
```

---

### Task 8: The nav

**Files:**
- Rewrite: `components/Nav.jsx`
- Modify: `app/labs.css:143` (the sub-nav `top`)
- Modify: `components/site/site.test.mjs`

**Behaviour:**
- **Desktop (lg and up):**
  - Hovering or focusing a menu opens it; leaving the header closes it.
  - Clicking toggles. Escape closes and returns focus to the trigger.
  - Products shows `PRODUCTS` on the left (pose glyph, name, line) and `ProductMedia` for the hovered or focused product on the right.
  - The other menus are lists; external items show ↗.
  - Contact Sales is a secondary pill.
  - Try for free is a split pill: the main part links to `SIGN_IN` (event `cta_signup_clicked`); the chevron opens `TRY_MENU`.
- **Mobile:** a sheet with native `<details>` accordions, then Contact Sales and Try for free at full width.
- The bar is sticky, white at 85% opacity with a blur, 64px tall, with a hairline bottom border.

- [ ] **Step 1: Write the failing test.** Append to `components/site/site.test.mjs`:

```js
test('the nav server-renders every menu trigger and both calls to action', async () => {
  const html = await render('../Nav.jsx', {});
  for (const label of ['Products', 'Solutions', 'Developer', 'Company']) assert.match(html, new RegExp(`aria-expanded="false"[^>]*>${label}`));
  assert.match(html, /href="\/pricing\/"/);
  assert.match(html, /data-event="contact_sales_clicked"[^>]*>Contact Sales/);
  assert.match(html, /data-event="cta_signup_clicked"[^>]*>Try for free/);
  assert.match(html, /aria-label="More ways to start"/);
});
```

- [ ] **Step 2: Run it and see it fail.** `npm test`. Expected: FAIL, with `NAV` not exported (the old Nav still imports it).

- [ ] **Step 3: Rewrite `components/Nav.jsx`:**

```jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics';
import TrackedLink from '@/components/TrackedLink';
import Button from '@/components/site/Button';
import Rabbit from '@/components/site/Rabbit';
import ProductMedia from '@/components/site/ProductMedia';
import { PRODUCTS } from '@/lib/products';
import { CONTACT_SALES, MENUS, SIGN_IN, TRY_MENU } from '@/lib/site';

const ext = (i) => (i.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

// Tracked, because the Try menu links the app's sign-in origin, which check-links counts as a conversion.
function MenuLink({ item, onPick }) {
  return (
    <TrackedLink href={item.href} {...ext(item)} event="nav_link_clicked" eventProps={{ label: item.label, location: 'desktop' }}
      onClick={() => onPick(item.label)}
      className="flex items-center justify-between gap-6 rounded-xl px-3 py-2 text-[15px] !text-ink no-underline hover:bg-stone">
      {item.label}
      {item.external && <ArrowUpRight size={14} className="text-ink/40" />}
    </TrackedLink>
  );
}

function ProductsPanel({ onPick }) {
  const [active, setActive] = useState(PRODUCTS[0]);
  return (
    <div className="grid w-[760px] grid-cols-[260px_1fr] gap-2 p-2">
      <ul className="m-0 list-none p-0">
        {PRODUCTS.map((p) => (
          <li key={p.key}>
            <a href={p.href} onMouseEnter={() => setActive(p)} onFocus={() => setActive(p)} onClick={() => onPick(p.name)}
              className={`flex gap-3 rounded-xl px-3 py-2.5 !text-ink no-underline ${active.key === p.key ? 'bg-stone' : ''}`}>
              <Rabbit pose={p.pose} size={28} className="mt-0.5 shrink-0 text-aubergine" />
              <span>
                <span className="block text-[15px] font-medium">{p.name}</span>
                <span className="block text-[13px] leading-[1.45] text-ink/55">{p.line}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className={`overflow-hidden rounded-xl ${active.tone === 'night' ? 'bg-night' : 'bg-ivory'}`} aria-hidden="true">
        <ProductMedia key={active.key} product={active} />
      </div>
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(null);
  const [sheet, setSheet] = useState(false);
  const pathname = usePathname() || '/';
  const header = useRef(null);

  useEffect(() => { setOpen(null); setSheet(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (open) header.current?.querySelector(`[data-menu="${open}"]`)?.focus();
      setOpen(null);
      setSheet(false);
    };
    const onDown = (e) => header.current && !header.current.contains(e.target) && setOpen(null);
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown); };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sheet]);

  const close = () => setOpen(null);
  const pick = (label) => { track('nav_link_clicked', { label, location: 'desktop' }); close(); };
  const toggle = (label) => {
    setOpen((cur) => (cur === label ? null : label));
    if (open !== label) track('nav_menu_open', { menu: label });
  };

  return (
    <header ref={header} onMouseLeave={() => setOpen(null)}
      className="sticky top-0 z-50 h-16 border-b border-hairline bg-white/85 backdrop-blur-md font-sans">
      <div className="mx-auto flex h-full max-w-[1248px] items-center gap-8 px-6">
        <a href="/" className="shrink-0" aria-label="Surogate home">
          <img src="/brand/logo-full-black.svg" alt="" className="block h-7 w-auto" />
        </a>

        <nav aria-label="Primary" className="hidden flex-1 lg:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {MENUS.map((m) => (
              <li key={m.label} className="relative" onMouseEnter={() => (m.href ? setOpen(null) : setOpen(m.label))}>
                {m.href ? (
                  <a href={m.href} onClick={() => pick(m.label)}
                    aria-current={pathname.startsWith(m.href) ? 'page' : undefined}
                    className="block rounded-full px-3 py-2 text-[15px] !text-ink no-underline hover:bg-stone">{m.label}</a>
                ) : (
                  <>
                    <button type="button" data-menu={m.label} aria-expanded={open === m.label} onClick={() => toggle(m.label)}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[15px] text-ink hover:bg-stone">{m.label}<ChevronDown size={14} className={`transition-transform ${open === m.label ? 'rotate-180' : ''}`} />
                    </button>
                    {open === m.label && (
                      <div className="absolute left-0 top-full pt-2">
                        <div className="rounded-2xl border border-hairline bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,.25)]">
                          {m.mega ? <ProductsPanel onPick={pick} /> : (
                            <div className="w-[260px] p-2">
                              {m.items.map((i) => <MenuLink key={i.label} item={i} onPick={close} />)}
                              {m.more && (
                                <a href={m.more.href} onClick={() => pick(m.more.label)}
                                  className="mt-1 flex items-center justify-between rounded-xl bg-stone px-3 py-2 text-[14px] !text-ink no-underline">
                                  {m.more.label}<ArrowUpRight size={14} />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Button href={CONTACT_SALES} variant="secondary" event="contact_sales_clicked" eventProps={{ location: 'nav' }}>Contact Sales</Button>
          <div className="relative flex" onMouseEnter={() => setOpen(null)}>
            <TrackedLink href={SIGN_IN} event="cta_signup_clicked" eventProps={{ location: 'nav' }}
              className="inline-flex h-10 items-center rounded-l-full bg-ink pl-[18px] pr-3 text-[14px] font-medium !text-white no-underline">Try for free</TrackedLink>
            <button type="button" aria-label="More ways to start" aria-expanded={open === 'try'} data-menu="try" onClick={() => toggle('try')}
              className="inline-flex h-10 items-center rounded-r-full border-l border-white/20 bg-ink pl-2 pr-3 text-white">
              <ChevronDown size={16} />
            </button>
            {open === 'try' && (
              <div className="absolute right-0 top-full pt-2">
                <div className="w-[240px] rounded-2xl border border-hairline bg-white p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,.25)]">
                  {TRY_MENU.map((g) => (
                    <div key={g.group} className="py-1">
                      <p className="m-0 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-ink/40">{g.group}</p>
                      {g.items.map((i) => <MenuLink key={i.label} item={i} onPick={(l) => { track('try_free_option', { option: l }); close(); }} />)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button type="button" className="ml-auto inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          aria-expanded={sheet} aria-controls="mobile-nav" aria-label={sheet ? 'Close menu' : 'Open menu'} onClick={() => setSheet((s) => !s)}>
          {sheet ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav id="mobile-nav" aria-label="Mobile" hidden={!sheet}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-white px-6 pb-10 lg:hidden">
        {MENUS.map((m) => m.href ? (
          <a key={m.label} href={m.href} className="block border-b border-hairline py-4 text-[17px] !text-ink no-underline">{m.label}</a>
        ) : (
          <details key={m.label} className="border-b border-hairline">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[17px]">{m.label}<ChevronDown size={16} /></summary>
            <div className="pb-3">
              {(m.mega ? PRODUCTS.map((p) => ({ label: p.name, href: p.href })) : [...m.items, ...(m.more ? [m.more] : [])]).map((i) => (
                <a key={i.label} href={i.href} {...ext(i)} className="block py-2 text-[15px] !text-ink/75 no-underline">{i.label}</a>
              ))}
            </div>
          </details>
        ))}
        <div className="mt-6 flex flex-col gap-3">
          <Button href={CONTACT_SALES} variant="secondary" size="lg" event="contact_sales_clicked" eventProps={{ location: 'nav_mobile' }}>Contact Sales</Button>
          <Button href={SIGN_IN} size="lg" event="cta_signup_clicked" eventProps={{ location: 'nav_mobile' }}>Try for free</Button>
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Move the Labs sub-nav below the sticky nav.** In `app/labs.css`, line 143, change `top:0;` to `top:64px;`. In `app/globals.css`, change `.st-labs section[id] { scroll-margin-top: 80px; }` to `scroll-margin-top: 144px;`.

- [ ] **Step 5: Run the tests.** `npm test`. Expected: PASS.

- [ ] **Step 6: Build and smoke-test.** Run `npm run build`. Expected: success. Then run `npm run dev`, open http://localhost:3000/ and check each of these by hand:
  - Hovering Products shows the preview changing as you move down the list.
  - Tab reaches every trigger, Enter opens it, and Escape closes it and puts focus back on the trigger.
  - The Try-for-free chevron opens the three groups.
  - At 390px the sheet opens and the accordions expand.
  - `/labs/` shows its sub-nav sticking under the bar.

- [ ] **Step 7: Commit.**

```bash
git add components/Nav.jsx app/labs.css app/globals.css components/site/site.test.mjs
git commit -m "feat(site): v2 nav with products mega-menu and try-for-free split"
```

---

### Task 9: The footer

**Files:**
- Rewrite: `components/Footer.jsx`

- [ ] **Step 1: Rewrite `components/Footer.jsx`:**

```jsx
import TrackedLink from '@/components/TrackedLink';
import { FOOTER, LINKS } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-aubergine text-cream font-sans">
      <div className="mx-auto max-w-[1200px] px-6 pt-20 pb-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(6,1fr)]">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <img src="/brand/logo-full-white.svg" alt="Surogate" className="block h-8 w-auto" />
            <p className="mt-4 max-w-[30ch] text-[14px] leading-[1.6] text-cream/60">Your AI, on your terms. Built in Europe by Invergent.</p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.heading}>
              <h2 className="m-0 mb-4 text-[13px] font-medium text-cream/45">{col.heading}</h2>
              <ul className="m-0 list-none p-0 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <TrackedLink href={l.href} event="footer_link_clicked" eventProps={{ label: l.label, section: col.heading }}
                      {...(/^https?:/.test(l.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-[14px] !text-cream/80 no-underline hover:!text-cream">{l.label}</TrackedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-cream/50">
          <span>© 2026 INVERGENT S.A.</span>
          <a href={LINKS.status} target="_blank" rel="noopener noreferrer" className="!text-cream/60 no-underline hover:!text-cream">Status ↗</a>
        </div>
      </div>
    </footer>
  );
}
```

The column headings are `h2`, not `h5`, so the heading order stays valid.

- [ ] **Step 2: Keep Fraunces off the footer headings.** In `app/globals.css`, change the `.v2 :is(h1, h2, h3, h4)` selector from Task 1 to:

```css
  .v2 :is(h1, h2, h3, h4), footer :is(h1, h2, h3, h4) {
```

- [ ] **Step 3: Build.** Run `npm run build`. Expected: success.

- [ ] **Step 4: Commit.**

```bash
git add components/Footer.jsx app/globals.css
git commit -m "feat(site): v2 aubergine footer"
```

---

### Task 10: Home page sections

**Files:**
- Create: `components/home/Hero.jsx`, `CyclingWord.jsx`, `Bento.jsx`, `DevApi.jsx`, `Proof.jsx`, `Sovereign.jsx`, `Films.jsx`, `Research.jsx`, `PartnersBand.jsx`
- Modify: `components/site/site.test.mjs`
- Create: `components/site/CodeTabs.jsx`

- [ ] **Step 1: Write the failing tests.** Append to `components/site/site.test.mjs`:

```js
test('the hero server-renders its first word, so the H1 reads whole without JavaScript', async () => {
  const html = await render('../home/Hero.jsx', {});
  assert.match(html, /<h1[^>]*>Your AI, on your terms,[\s\S]*for everything you[\s\S]*run/);
  assert.match(html, /data-event="cta_signup_clicked"/);
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
```

- [ ] **Step 2: Run them and see them fail.** `npm test`. Expected: FAIL, with `Cannot find module …/Hero.jsx`.

- [ ] **Step 3: Create `components/home/CyclingWord.jsx`:**

```jsx
'use client';

import { useEffect, useState } from 'react';

// The server renders the first word, so the headline is whole without script and for crawlers.
export default function CyclingWord({ words, every = 2400 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), every);
    return () => clearInterval(t);
  }, [words, every]);
  return (
    <span className="relative inline-block border-b-[6px] border-sun/70 leading-[0.95]">
      <span key={i} className="word-in">{words[i]}</span>
    </span>
  );
}
```

- [ ] **Step 4: Create `components/home/Hero.jsx`:**

```jsx
import Pill from '@/components/site/Pill';
import Button from '@/components/site/Button';
import CyclingWord from './CyclingWord';
import { ANNOUNCEMENT, CONTACT_SALES, SIGN_IN } from '@/lib/site';

const WORDS = ['run', 'automate', 'hear', 'train', 'own'];

export default function Hero() {
  return (
    <section className="bg-white px-6 pt-20 pb-16 text-center md:pt-28">
      <Pill {...ANNOUNCEMENT} />
      <h1 className="mx-auto mt-8 mb-0 max-w-[16ch] text-[clamp(44px,6.2vw,76px)] font-[460] leading-[1.02] tracking-[-0.015em] text-ink">
        Your AI, on your terms,<br />for everything you <CyclingWord words={WORDS} />.
      </h1>
      <p className="mx-auto mt-6 mb-0 max-w-[56ch] text-[18px] leading-[1.6] text-ink/70">
        Agents, voice and your own models, on your hardware or ours. Built in Europe.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href={SIGN_IN} size="lg" event="cta_signup_clicked" eventProps={{ location: 'home_hero' }}>Try for free ›</Button>
        <Button href={CONTACT_SALES} size="lg" variant="secondary" event="contact_sales_clicked" eventProps={{ location: 'home_hero' }}>Contact Sales</Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `components/home/Bento.jsx`:**

```jsx
import { ArrowRight } from 'lucide-react';
import Rabbit from '@/components/site/Rabbit';
import ProductMedia from '@/components/site/ProductMedia';
import { PRODUCTS } from '@/lib/products';

export default function Bento() {
  return (
    <section className="bg-white px-6 pb-24">
      <ul className="mx-auto m-0 grid max-w-[1232px] list-none gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => {
          const dark = p.tone === 'night';
          return (
            <li key={p.key}>
              <a href={p.href} className={`group flex h-[340px] flex-col overflow-hidden rounded-2xl no-underline ${dark ? 'bg-night !text-cream' : 'bg-ivory !text-ink'}`}>
                <div className="min-h-0 flex-1" aria-hidden="true"><ProductMedia product={p} /></div>
                <div className="flex items-center justify-between px-5 py-4 text-[15px]">
                  <span className="inline-flex items-center gap-2 font-medium">
                    <Rabbit pose={p.pose} size={22} className={dark ? 'text-sun' : 'text-aubergine'} />{p.name}
                  </span>
                  <span className="inline-flex items-center gap-1 opacity-70 group-hover:opacity-100">Explore <ArrowRight size={15} /></span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
```

- [ ] **Step 6: Create `components/site/CodeTabs.jsx`:**

```jsx
'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CodeTabs({ tabs }) {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(tabs[i].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="overflow-hidden rounded-2xl bg-white text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,.45)]">
      <div className="flex items-center justify-between border-b border-hairline px-3">
        <div role="tablist" aria-label="Language" className="flex">
          {tabs.map((t, n) => (
            <button key={t.label} type="button" role="tab" aria-selected={n === i} onClick={() => setI(n)}
              className={`px-3 py-3 text-[13px] ${n === i ? 'font-medium text-ink shadow-[inset_0_-2px_0_#0a0a0a]' : 'text-ink/50'}`}>{t.label}</button>
          ))}
        </div>
        <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 text-[13px] text-ink/60">
          {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre role="tabpanel" className="m-0 overflow-x-auto !bg-white p-5 font-mono text-[13px] leading-[1.7] text-ink">{tabs[i].code}</pre>
    </div>
  );
}
```

- [ ] **Step 7: Create `components/home/DevApi.jsx`:**

```jsx
import Section from '@/components/site/Section';
import Button from '@/components/site/Button';
import CodeTabs from '@/components/site/CodeTabs';
import { LINKS } from '@/lib/site';

const BASE = 'https://api.llm.buzz/api/v1';
const MODEL = 'deepseek/deepseek-v4.1-flash';
const TABS = [
  { label: 'Python', code: `import os\nfrom openai import OpenAI\n\nclient = OpenAI(base_url="${BASE}", api_key=os.environ["LLM_BUZZ_KEY"])\n\nreply = client.chat.completions.create(\n    model="${MODEL}",\n    messages=[{"role": "user", "content": "Hello"}],\n)` },
  { label: 'TypeScript', code: `import OpenAI from "openai";\n\nconst client = new OpenAI({ baseURL: "${BASE}", apiKey: process.env.LLM_BUZZ_KEY });\n\nconst reply = await client.chat.completions.create({\n  model: "${MODEL}",\n  messages: [{ role: "user", content: "Hello" }],\n});` },
  { label: 'cURL', code: `curl ${BASE}/chat/completions \\\n  -H "Authorization: Bearer $LLM_BUZZ_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model": "${MODEL}", "messages": [{"role": "user", "content": "Hello"}]}'` },
];

export default function DevApi() {
  return (
    <Section tone="aubergine" inner="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
      <div>
        <h2 className="m-0 text-[clamp(36px,4.4vw,52px)] font-[500] leading-[1.03] tracking-[-0.01em]">One API.<br />Every model.</h2>
        <p className="mt-5 mb-0 max-w-[44ch] text-[18px] leading-[1.6] text-cream/70">
          OpenAI and Anthropic compatible, with no markup on tokens. Change the base URL and keep your code.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={LINKS.apiKey} external variant="sun" size="lg">Get API key</Button>
          <Button href={LINKS.docs} external variant="glass" size="lg">Read the docs</Button>
        </div>
      </div>
      <div className="rounded-[22px] bg-grad-sun p-3 md:p-5"><CodeTabs tabs={TABS} /></div>
    </Section>
  );
}
```

- [ ] **Step 8: Create `components/home/Proof.jsx`.** This section holds the "Surogate is…" definition and the stat strip. The engine numbers are reused from `lib/labs.js`.

```jsx
import Section from '@/components/site/Section';
import StatStrip from '@/components/site/StatStrip';
import { ENGINE } from '@/lib/labs';

const STATS = [
  ...ENGINE.facts.slice(0, 2),
  { n: '0%', l: 'markup on model tokens, through llm.buzz' },
  { n: 'Apache 2.0', l: 'our training and serving engine, open source' },
];

export default function Proof() {
  return (
    <Section inner="!py-20">
      <p className="mx-auto mt-0 mb-14 max-w-[62ch] text-center text-[22px] leading-[1.5] text-ink/80">
        Surogate is a European AI platform: agents for whole teams, a desktop agent, voice, business processes
        and the engine to train your own models, on your hardware or ours.
      </p>
      <StatStrip items={STATS} />
    </Section>
  );
}
```

- [ ] **Step 9: Create `components/home/Sovereign.jsx`:**

```jsx
import Section, { SectionHead } from '@/components/site/Section';
import Rabbit from '@/components/site/Rabbit';

const STEPS = [
  { name: 'Our cloud', line: 'Hosted in the EU. Start in minutes.' },
  { name: 'Your cloud', line: 'Your account, your region, your keys.' },
  { name: 'Your hardware', line: 'On your servers, managed by your team.' },
  { name: 'Air-gapped', line: 'No connection out. Models included.' },
];

export default function Sovereign() {
  return (
    <Section tone="ivory">
      <SectionHead title="Sovereign by design." sub="The same platform runs wherever your data has to stay. Move between steps without rebuilding anything." />
      <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-4">
        {STEPS.map((s, n) => (
          <li key={s.name} className="flex flex-col rounded-2xl bg-white p-6" style={{ marginTop: `${(3 - n) * 18}px` }}>
            <span className="text-[13px] text-ink/40">0{n + 1}</span>
            <h3 className="mt-6 mb-2 text-[20px] font-[500]">{s.name}</h3>
            <p className="m-0 text-[15px] leading-[1.55] text-ink/65">{s.line}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 mb-0 flex items-center gap-3 text-[15px] text-ink/65">
        <Rabbit size={26} className="text-aubergine" />
        Running at a top-5 Romanian bank, an insurer and national regulators.
      </p>
    </Section>
  );
}
```

- [ ] **Step 10: Create `components/home/Films.jsx`:**

```jsx
'use client';

import { useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import Section, { SectionHead } from '@/components/site/Section';
import LoopVideo from '@/components/site/LoopVideo';
import { FILMS, filmFiles } from '@/lib/films';

export default function Films() {
  const dialog = useRef(null);
  const [film, setFilm] = useState(null);
  const open = (f) => { setFilm(f); dialog.current?.showModal(); };
  const close = () => { dialog.current?.close(); setFilm(null); };
  return (
    <Section>
      <SectionHead title="Watch it work." sub="Real product, filmed on demo businesses. Each one is a job a team hands to an agent." />
      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4">
        {FILMS.map((f) => {
          const files = filmFiles(f.slug);
          return (
            <li key={f.slug}>
              <button type="button" aria-label={`Watch ${f.title}`} onClick={() => open(f)} className="group block w-full text-left">
                <span className="relative block aspect-square overflow-hidden rounded-2xl bg-ivory">
                  <LoopVideo src={files.loop} poster={files.poster} className="h-full w-full object-cover" />
                  <span className="absolute bottom-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink"><Play size={16} /></span>
                </span>
                <span className="mt-3 block text-[15px] font-medium text-ink">{f.title}</span>
                <span className="block text-[13px] text-ink/50">{f.business} · demo</span>
              </button>
            </li>
          );
        })}
      </ul>
      <dialog ref={dialog} onClose={() => setFilm(null)} className="w-[min(92vw,720px)] rounded-2xl bg-night p-0 backdrop:bg-black/70">
        {film && (
          <>
            <video src={filmFiles(film.slug).film} poster={filmFiles(film.slug).poster} controls autoPlay playsInline className="block aspect-square w-full" />
            <button type="button" onClick={close} aria-label="Close film" className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink"><X size={18} /></button>
          </>
        )}
      </dialog>
    </Section>
  );
}
```

- [ ] **Step 11: Create `components/home/Research.jsx`:**

```jsx
import { ArrowRight } from 'lucide-react';
import Section, { SectionHead } from '@/components/site/Section';
import Button from '@/components/site/Button';

const MODELS = [
  { name: 'Rune', line: 'A decision model that sees.', href: '/labs/rune/' },
  { name: 'Jackrabbit', line: 'Romanian and English speech recognition.', href: '/labs/speech/' },
  { name: 'Amami', line: 'Local voices that run on a CPU.', href: '/labs/speech/' },
  { name: 'Engine', line: 'Train and serve on one open-source engine.', href: '/labs/engine/' },
];

export default function Research() {
  return (
    <Section>
      <SectionHead title="Built on our own research." sub="We train and measure the models our products run on, and publish them." action={<Button href="/labs/" variant="secondary">All research</Button>} />
      <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-4">
        {MODELS.map((m) => (
          <li key={m.name}>
            <a href={m.href} className="group flex h-full flex-col rounded-2xl bg-ivory p-6 !text-ink no-underline">
              <h3 className="m-0 text-[20px] font-[500]">{m.name}</h3>
              <p className="mt-2 mb-6 text-[15px] leading-[1.55] text-ink/65">{m.line}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-[14px] opacity-70 group-hover:opacity-100">Read more <ArrowRight size={14} /></span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 12: Create `components/home/PartnersBand.jsx`.** The copy follows the existing `/partners/` hero, and the badges are the existing ones.

```jsx
import Section from '@/components/site/Section';
import Button from '@/components/site/Button';
import InlineSvg from '@/components/site/InlineSvg';
import { partnerBadges } from '@/components/site/illustrations/partnerBadges';

export default function PartnersBand() {
  return (
    <Section tone="aubergine" inner="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <h2 className="m-0 text-[clamp(34px,4.2vw,50px)] font-[500] leading-[1.05] tracking-[-0.01em]">Build a practice on Surogate.</h2>
        <p className="mt-5 mb-0 max-w-[48ch] text-[18px] leading-[1.6] text-cream/70">
          Deliver Surogate Agents, Keel, a private AI Gateway and custom models to your clients, and earn 30% of what they pay, every month.
        </p>
        <div className="mt-8"><Button href="/partners/" variant="sun" size="lg">Become a partner</Button></div>
      </div>
      <div className="flex justify-center gap-4 [&_svg]:h-[110px] [&_svg]:w-[110px] md:[&_svg]:h-[140px] md:[&_svg]:w-[140px]">
        <InlineSvg className="contents" markup={partnerBadges.silver} />
        <InlineSvg className="contents" markup={partnerBadges.gold} />
        <InlineSvg className="contents" markup={partnerBadges.diamond} />
      </div>
    </Section>
  );
}
```

- [ ] **Step 13: Run the tests.** `npm test`. Expected: PASS.

- [ ] **Step 14: Commit.**

```bash
git add components/home components/site/CodeTabs.jsx components/site/site.test.mjs
git commit -m "feat(site): v2 home sections"
```

---

### Task 11: Assemble the home page and remove the old one

**Files:**
- Rewrite: `app/page.jsx`
- Delete: `components/home/HomeHero.jsx`, `Platform.jsx`, `CodeSample.jsx`, `Delivery.jsx`, `Deployment.jsx`, `PartnerProgram.jsx`, `illustrations.js`, and `app/home-page.css`
- Keep: `components/home/FilmPlayer.tsx` (the Agents tour film imports it)
- Modify: `app/layout.jsx` (`TITLE`, `DESCRIPTION`)

- [ ] **Step 1: Rewrite `app/page.jsx`:**

```jsx
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import Bento from '@/components/home/Bento';
import Proof from '@/components/home/Proof';
import DevApi from '@/components/home/DevApi';
import Sovereign from '@/components/home/Sovereign';
import Films from '@/components/home/Films';
import Research from '@/components/home/Research';
import PartnersBand from '@/components/home/PartnersBand';
import Section, { SectionHead } from '@/components/site/Section';
import GetStarted from '@/components/site/GetStarted';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('/');

export default function Home() {
  return (
    <div className="v2 pg-v2 w-full overflow-x-clip bg-white font-sans text-ink">
      <Nav />
      <main>
        <Hero />
        <Bento />
        <Proof />
        <DevApi />
        <Sovereign />
        <Films />
        <Research />
        <PartnersBand />
        <Section>
          <SectionHead title="Choose how to get started." align="center" />
          <GetStarted location="home_closing" />
        </Section>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Delete the old home files, after checking nothing else imports them.**

```bash
grep -rn "home/\(HomeHero\|Platform\|CodeSample\|Delivery\|Deployment\|PartnerProgram\|illustrations\)\|home-page.css" app components lib scripts
```

Expected: only `app/page.jsx` would have matched, and it no longer does after Step 1, so the output is empty. Then:

```bash
git rm components/home/HomeHero.jsx components/home/Platform.jsx components/home/CodeSample.jsx components/home/Delivery.jsx components/home/Deployment.jsx components/home/PartnerProgram.jsx components/home/illustrations.js app/home-page.css
```

- [ ] **Step 3: Update the default metadata.** In `app/layout.jsx`, set:

```js
const TITLE = 'Surogate - Your AI, on your terms';
const DESCRIPTION =
  'Agents, voice, process automation and your own models, on your hardware or ours. Built in Europe. Surogate Agents, Surogate desktop, Voice, Keel, Train and the API.';
```

- [ ] **Step 4: Run every check.**

```bash
npm test && npm run build && npm run check:links
export CHROME=$HOME/.cache/ms-playwright/chromium-1248/chrome-linux/chrome
npm run check:layout / /agents/ /labs/ /pricing/
```

Expected:
- `npm test`: all pass.
- `check:links`: `ok: N pages…`.
- `check:layout`: no sideways scroll at 360, 390 or 1440.

Screenshots are written to `/tmp/site-shots/`.

- [ ] **Step 5: Review the screenshots by eye.** Open `/tmp/site-shots/` and check the home page at 390 and 1440 (normal and reduced motion) against spec §3.1 and §4:
  - The hero headline is not clipped.
  - The bento is six tiles in 3 + 3 on desktop and stacked on phone.
  - The aubergine bands land at DevApi, PartnersBand and the footer.
  - In the reduced-motion shot every mock shows its final frame.
  - `/agents/`, `/labs/` and `/pricing/` still render under the new nav and footer, even though their own sections keep the old style until later phases.

- [ ] **Step 6: Commit.**

```bash
git add app/page.jsx app/layout.jsx
git commit -m "feat(site): v2 home page"
```

---

### Task 12: Hand-off for review

- [ ] **Step 1: Restart the dev server for the user.**

```bash
pkill -f 'next[ ]dev'
npm run dev
```

The user opens http://localhost:3000.

- [ ] **Step 2: Report.** Report what shipped, the screenshot paths, and what stays pending:
  - Product pages and the other pages in `PENDING`
  - The "Latest news" home section (Phase 4, when `/news/` exists)
  - `llms.txt` (Phase 4)
  - The new OG image (Phase 4)

---

## Deviations from the spec, on purpose

- **No "Latest news" section on the home page yet.** It needs `/news/` (Phase 4); a section that links nowhere would fail check-links.
- **The announcement pill points at the speech models.** That is a live, true page. The "Surogate 3.7 Flash, free this week" text in the spec is not confirmed live, so it is not used.
- **The sovereign ladder is new HTML cards, not the old HomeHero drawing re-inked.** The drawing's square, isometric style fights the v2 look; this is fewer lines and fully responsive.
- **Films ship as MP4 only, not WebM.** H.264 plays everywhere the site is supported; a second format doubles the media for no reach.
- **The rabbit's moving parts are the eye (blink) and a whole-body hop.** The official silhouette is one path, so an ear twitch would mean redrawing the mark, which §4.1 forbids.

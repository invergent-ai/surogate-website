import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as labs from './labs.js';

const PUBLIC = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const ICONS = new Set(['Pencil', 'Volleyball', 'MousePointerClick', 'ChartLine', 'Send', 'ReceiptText', 'House', 'MailWarning', 'Scale', 'MessageSquareWarning', 'Cctv', 'Bot', 'Webcam', 'AudioLines', 'Mic', 'Radio']);

test('every demo points at its own Space', () => {
  assert.ok(labs.RUNE_DEMOS.length >= 9);
  for (const d of labs.RUNE_DEMOS) {
    assert.match(d.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/);
    assert.equal(d.embed, `https://surogate-${d.slug}.hf.space/?__theme=light&embed=surogate`);
    assert.equal(d.page, `https://huggingface.co/spaces/surogate/${d.slug}`);
    assert.equal(d.shot, `/labs/${d.slug}.png`);
    assert.ok(ICONS.has(d.icon), `${d.slug} icon ${d.icon}`);
    for (const k of ['title', 'kind', 'line', 'proves']) assert.ok(d[k]?.length > 3, `${d.slug}.${k}`);
  }
});

test('every number carries its caveat', () => {
  for (const f of labs.RUNE_FACTS) assert.ok(f.n && f.l.length > 10, JSON.stringify(f));
  for (const m of labs.SPEECH_MODELS) assert.ok(m.stat.n && m.stat.l.length > 30, m.id);
});

test('speech models say what they are, and their numbers say what they measure', () => {
  assert.deepEqual(labs.SPEECH_MODELS.map((m) => m.name), ['Amami TTS', 'Jackrabbit ASR', 'Jackrabbit Streaming ASR']);
  assert.match(labs.SPEECH_MODELS[0].stat.n, /WER$/);
  assert.match(labs.SPEECH_MODELS[1].stat.n, /WER$/);
  for (const m of labs.SPEECH_MODELS) assert.ok(existsSync(path.join(PUBLIC, m.mark)), m.mark);
  assert.equal(labs.SPEECH_ABOUT.article, 'https://huggingface.co/blog/cetusian/surogate-speech');
  assert.match(labs.SPEECH_ABOUT.line, /agents/);
});

test('speech models are the public ones, and their audio exists', () => {
  assert.deepEqual(labs.SPEECH_MODELS.map((m) => m.id),
    ['surogate/amami-110m-ro', 'surogate/jackrabbit-110m-ro', 'surogate/jackrabbit-110m-ro-streaming']);
  for (const m of labs.SPEECH_MODELS) {
    assert.equal(m.repo, `https://huggingface.co/${m.id}`);
    assert.ok(ICONS.has(m.icon), m.id);
  }
  assert.deepEqual(labs.SPEECH_MODELS[0].voices.map((v) => v.key), ['female', 'male']);
});

test('every Amami sample has a clip in each voice, and every code sample says how it is read out', () => {
  const amami = labs.SPEECH_MODELS[0];
  assert.ok(amami.samples.length >= 8);
  assert.ok(new Set(amami.samples.map((x) => x.category)).size >= 5);
  for (const x of amami.samples) {
    assert.ok(x.text.length > 10, x.slug);
    for (const v of amami.voices) assert.ok(existsSync(path.join(PUBLIC, labs.amamiSrc(v.key, x.slug))), `${v.key} ${x.slug}`);
    if (x.category === 'Codes') assert.match(x.readAs, /^([A-ZȘȚĂÂÎ][a-zșțăâî]*\. )+[A-ZȘȚĂÂÎ][a-zșțăâî]*\.$/, x.slug);
  }
  assert.equal(amami.stat.n, '2.83% WER');
  assert.match(amami.stat.l, /ordinary Romanian sentences/);
});

test('no private repos and no competitor names anywhere in the copy', () => {
  // The public Decision Index leaderboard is embedded by the owner's decision (2026-09-28); its own
  // address is the one place a competitor's name may appear.
  const all = JSON.stringify(labs).replaceAll(labs.LEADERBOARD.embed, '').replaceAll(labs.LEADERBOARD.page, '');
  assert.doesNotMatch(all, /surogate-ro-/);
  assert.doesNotMatch(all, /\b(jev|typesafe|whisper|elevenlabs|openai|minimax|canary|parakeet|gpt|claude|gemini)\b/i);
});

test('the example is real JSON', () => {
  const req = JSON.parse(labs.RUNE_EXAMPLE.request);
  const res = JSON.parse(labs.RUNE_EXAMPLE.response);
  assert.equal(req.model, 'rune-v3');
  assert.deepEqual(Object.keys(res.answers), Object.keys(req.questions));
});

test('every demo has its screenshot', () => {
  for (const d of labs.RUNE_DEMOS) assert.ok(existsSync(path.join(PUBLIC, d.shot)), d.shot);
});

test('local previews embed the Spaces running on this machine', async () => {
  process.env.NEXT_PUBLIC_LABS_EMBED = 'local';
  try {
    const local = await import(`./labs.js?local=${Date.now()}`);
    const ports = local.RUNE_DEMOS.map((d) => d.embed);
    assert.deepEqual(ports, [
      'http://127.0.0.1:7870/?__theme=light&embed=surogate',
      'http://127.0.0.1:7871/?__theme=light&embed=surogate',
      'http://127.0.0.1:7873/?__theme=light&embed=surogate',
      'http://127.0.0.1:7862/?__theme=light&embed=surogate',
      'http://127.0.0.1:7867/?__theme=light&embed=surogate',
      'http://127.0.0.1:7865/?__theme=light&embed=surogate',
      'http://127.0.0.1:7866/?__theme=light&embed=surogate',
      'http://127.0.0.1:7868/?__theme=light&embed=surogate',
      'http://127.0.0.1:7861/?__theme=light&embed=surogate',
      'http://127.0.0.1:7869/?__theme=light&embed=surogate',
      'http://127.0.0.1:7860/?__theme=light&embed=surogate',
      'http://127.0.0.1:7863/?__theme=light&embed=surogate',
      'http://127.0.0.1:7864/?__theme=light&embed=surogate',
    ]);
    for (const d of local.RUNE_DEMOS) assert.equal(d.page, `https://huggingface.co/spaces/surogate/${d.slug}`);
  } finally {
    delete process.env.NEXT_PUBLIC_LABS_EMBED;
  }
});

test('the drawing demo is called Doodle Decoder', () => {
  assert.equal(labs.RUNE_DEMOS.find((d) => d.slug === 'doodle-decoder').title, 'Doodle Decoder');
});

test('the example latency says where it was measured', () => {
  assert.match(labs.RUNE_EXAMPLE.latency, /ms/);
  assert.match(labs.RUNE_EXAMPLE.latency, /laptop/);
});

test('both labs pages stay readable without JavaScript', async () => {
  const { readFileSync } = await import('node:fs');
  for (const page of ['app/labs/page.jsx', 'app/labs/rune-examples/page.jsx']) {
    const src = readFileSync(path.join(PUBLIC, '..', page), 'utf8');
    assert.match(src, /<noscript>/, page);
    assert.match(src, /\.st-home \.reveal\{opacity:1;transform:none\}/, page);
  }
});

test('the page does not promise limits the demos no longer have', async () => {
  const { readFileSync } = await import('node:fs');
  const src = readFileSync(path.join(PUBLIC, '..', 'components/labs/RuneExamplesClient.jsx'), 'utf8');
  assert.doesNotMatch(src, /limit/i);
});

test('"Try the demos" jumps to the demos section, not to one demo', async () => {
  const { readFileSync } = await import('node:fs');
  const src = readFileSync(path.join(PUBLIC, '..', 'components/labs/RuneExamplesClient.jsx'), 'utf8');
  assert.match(src, /href="#demos"/);
  assert.doesNotMatch(src, /href=\{`#\$\{RUNE_DEMOS\[0\]\.slug\}`\}/);
});

test('every labs sub-nav link is a real page', () => {
  assert.deepEqual(labs.LABS_NAV.map((l) => l.label), ['Labs', 'Rune', 'Speech', 'Rune examples']);
  for (const l of labs.LABS_NAV) {
    assert.match(l.href, /^\/labs\/([a-z-]+\/)?$/);
    const page = path.join(PUBLIC, '..', 'app', l.href, 'page.jsx');
    assert.ok(existsSync(page), page);
  }
});

test('the sitemap and footer list every labs page', async () => {
  const { readFileSync } = await import('node:fs');
  const sitemap = readFileSync(path.join(PUBLIC, '..', 'app', 'sitemap.js'), 'utf8');
  const footer = readFileSync(path.join(PUBLIC, '..', 'components', 'Footer.jsx'), 'utf8');
  for (const l of labs.LABS_NAV) {
    assert.ok(sitemap.includes('${BASE_URL}' + l.href), `sitemap ${l.href}`);
    assert.ok(footer.includes(`href: '${l.href}'`), `footer ${l.href}`);
  }
});

test('the leaderboard section carries the model card figures', () => {
  const lb = labs.LEADERBOARD;
  assert.equal(lb.index, 57.44);
  assert.equal(lb.rank, 2);
  assert.deepEqual(lb.areas.map((a) => a.name), ['Knowledge & Reasoning', 'Language', 'Retrieval & Classification', 'Tools & Automation', 'Arts & Human Taste']);
  assert.match(lb.embed, /^https:\/\/[a-z-]+\.static\.hf\.space\/?$/);
});

test('every demo names its input and the sectors it serves, from one small vocabulary', () => {
  const sectors = labs.SECTORS.map((x) => x.key);
  for (const d of labs.RUNE_DEMOS) {
    assert.ok(['image', 'text', 'video'].includes(d.input), `${d.slug} input`);
    assert.ok(d.sectors.length >= 1 && d.sectors.every((x) => sectors.includes(x)), `${d.slug} sectors`);
    const first = labs.SECTORS.find((x) => x.key === d.sectors[0]).label;
    assert.equal(d.kind, `${d.input[0].toUpperCase()}${d.input.slice(1)} · ${first}`);
  }
});

test('two filters, the sector and what Rune looks at, that combine', () => {
  assert.deepEqual(labs.DEMO_FILTERS.map((g) => g.key), ['sector', 'input']);
  const used = labs.SECTORS.filter((x) => labs.RUNE_DEMOS.some((d) => d.sectors.includes(x.key))).map((x) => x.key);
  assert.deepEqual(labs.DEMO_FILTERS[0].options.map((o) => o.key), ['all', ...used]);
  for (const o of labs.DEMO_FILTERS[0].options.slice(1)) assert.ok(labs.demosFor({ sector: o.key }).length > 0, o.key);
  assert.deepEqual(labs.DEMO_FILTERS[1].options.map((o) => o.key), ['all', 'image', 'text', 'video']);
  assert.deepEqual(labs.demosFor({}), labs.RUNE_DEMOS);
  assert.deepEqual(labs.demosFor({ sector: 'nonsense' }), labs.RUNE_DEMOS);  // an old or mistyped link shows everything
  for (const sector of used) for (const input of ['image', 'text', 'video']) {
    assert.deepEqual(labs.demosFor({ sector, input }),
      labs.RUNE_DEMOS.filter((d) => d.sectors.includes(sector) && d.input === input));
  }
  assert.deepEqual(labs.demosFor({ sector: 'games' }).map((d) => d.slug), ['doodle-decoder', 'rune-plays-volley']);
  // Volley is a game, not physical AI: robotics is for robots, drones and cameras.
  assert.ok(!labs.RUNE_DEMOS.find((d) => d.slug === 'rune-plays-volley').sectors.includes('robotics'));
});

test('an embedded Space is told which page to share, and gets the settings a shared link carried', () => {
  const doodle = labs.RUNE_DEMOS.find((d) => d.slug === 'doodle-decoder');
  const src = new URL(labs.embedSrc(doodle, 'https://surogate.ai/labs/rune-examples/', { word: 'sun' }));
  assert.equal(src.origin + src.pathname, 'https://surogate-doodle-decoder.hf.space/');
  assert.equal(src.searchParams.get('__theme'), 'light');
  assert.equal(src.searchParams.get('embed'), 'surogate');
  assert.equal(src.searchParams.get('share'), 'https://surogate.ai/labs/rune-examples/?demo=doodle-decoder');
  assert.equal(src.searchParams.get('word'), 'sun');
  // the page's own settings are not passed on
  const plain = new URL(labs.embedSrc(doodle, 'https://surogate.ai/labs/rune-examples/', { demo: 'x', sector: 'games', input: 'image', embed: 'no' }));
  assert.deepEqual([...plain.searchParams.keys()].sort(), ['__theme', 'embed', 'share']);
  assert.equal(plain.searchParams.get('embed'), 'surogate');
});

test('the demos lead with video and robotics, then work by sector, and end with the games', () => {
  const order = labs.RUNE_DEMOS.map((d) => d.slug);
  assert.deepEqual(order.slice(0, 2), ['rune-watchtower', 'so101-episode-judge']);
  assert.deepEqual(order.slice(-2), ['doodle-decoder', 'rune-plays-volley']);
  assert.deepEqual(labs.SECTORS.map((x) => x.key), ['robotics', 'security', 'agents', 'finance', 'legal', 'games']);
});

test('the camera demo opens in its own tab, since the browser blocks the camera inside an embed', () => {
  const camera = labs.RUNE_DEMOS.find((d) => d.slug === 'ask-your-camera');
  assert.equal(camera.newTab, true);
  assert.equal(labs.RUNE_DEMOS.filter((d) => d.newTab).length, 1);
});

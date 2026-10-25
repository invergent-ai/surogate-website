// Renders exported pages in headless Chrome at phone and desktop widths and
// fails when a page scrolls sideways or clips content sideways. Also writes full-page screenshots for
// review, including one with reduced motion, to /tmp/site-shots/.
//
//   npm run build && npm run check:layout / /keel/ /partners/
//
// Headless Chrome will not open a window narrower than 500 px, so each page
// renders inside an iframe of the exact width, on a wrapper page served here.
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { promisify } from 'node:util';

const OUT = 'out';
const SHOTS = '/tmp/site-shots';
const WIDTHS = [360, 390, 1440];
const CHROME = process.env.CHROME || 'google-chrome';
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain' };

const routes = process.argv.slice(2);
if (!routes.length) {
  console.error('usage: node scripts/check-layout.mjs <route> [<route>...]');
  process.exit(2);
}
mkdirSync(SHOTS, { recursive: true });

// The wrapper waits for the page to load and hydrate, grows the iframe to the
// page's height and reports both sizes in an <output> element.
const frame = (route, w) => `<!doctype html><html><body style="margin:0;background:#fff">
<iframe id="f" src="${route}" style="display:block;border:0;width:${w}px;height:900px"></iframe>
<script>
const f = document.getElementById('f');
f.addEventListener('load', () => setTimeout(() => {
  const d = f.contentDocument.documentElement;
  // Pages wrap everything in an overflow-x-hidden .pg-* element, which clips the
  // document's own scroll width, so the wrapper's overflow is measured as well.
  const wrap = f.contentDocument.querySelector('[class*="pg-"]');
  const over = wrap ? wrap.scrollWidth - wrap.clientWidth : 0;
  const o = document.createElement('output');
  o.id = 'probe';
  o.textContent = 'W' + (d.scrollWidth + Math.max(over, 0)) + 'H' + d.scrollHeight;
  f.style.height = d.scrollHeight + 'px';
  document.body.append(o);
}, 1200));
</script></body></html>`;

// A static server for out/, the way GitHub Pages serves it: /x/ is /x/index.html.
const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/__frame') {
    return res.writeHead(200, { 'content-type': 'text/html' }).end(frame(url.searchParams.get('route'), url.searchParams.get('w')));
  }
  let file = normalize(join(OUT, decodeURIComponent(url.pathname)));
  if (!file.startsWith(OUT)) return res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' }).end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const chrome = (args) =>
  promisify(execFile)(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=6000', ...args], {
    maxBuffer: 64 * 1024 * 1024,
  }).then((r) => r.stdout);

const name = (route) => route.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
let failed = 0;

for (const route of routes) {
  if (!existsSync(join(OUT, route, 'index.html'))) {
    console.error(`FAIL ${route}: not in ${OUT}/`);
    failed++;
    continue;
  }
  for (const w of WIDTHS) {
    const url = `${base}/__frame?w=${w}&route=${encodeURIComponent(route)}`;
    const win = Math.max(w, 500);
    const dom = await chrome([`--window-size=${win},1000`, '--dump-dom', url]);
    const [, sw, sh] = dom.match(/id="probe">W(\d+)H(\d+)</) || [];
    const ok = Number(sw) > 0 && Number(sw) <= w;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${route} at ${w}px: scrollWidth ${sw || '?'}`);
    if (!ok) failed++;
    const tall = Math.min(Number(sh) || 4000, 16000);
    await chrome([`--window-size=${win},${tall}`, `--screenshot=${SHOTS}/${name(route)}-${w}.png`, url]);
    if (w === 1440) {
      await chrome([`--window-size=${win},${tall}`, '--force-prefers-reduced-motion', `--screenshot=${SHOTS}/${name(route)}-1440-reduced.png`, url]);
    }
  }
}

server.close();
if (failed) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}

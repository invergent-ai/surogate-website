import { RABBIT_EYE, RABBIT_FILL } from '../rabbit.js';

// Partner tier marks: the official rabbit silhouette carved into flat facets. The cut gets finer
// with the tier (Silver a few planes, Gold polished, Diamond fine semi-clear facets with a few
// prismatic ones), and each facet carries two shades, one per light, so hover can move the light.
const CUT = {
  silver: { name: 'Silver', edge: 12, ridge: 3 },
  gold: { name: 'Gold', edge: 22, ridge: 7 },
  diamond: { name: 'Diamond', edge: 40, ridge: 12 },
};
export const PARTNER_TIERS = Object.keys(CUT);

// Ridge points along the rabbit's spine (ear, head, back, haunch), in the mark's own units.
const RIDGE = [[16, 11], [30, 12], [44, 15], [55, 19], [38, 27], [27, 38], [17, 52], [8, 63], [47, 38], [60, 44], [33, 20], [50, 27]];
const RAMP = {
  silver: ['#55606a', '#7f8b94', '#aeb8bf', '#d8dee2', '#f4f6f7'],
  gold: ['#6b3a00', '#a86405', '#e29a12', '#ffc54a', '#fff0c2'],
  // Steel-blue at the dark end so Diamond holds on ivory as well as on aubergine.
  diamond: ['#2c4562', '#5f86a8', '#a9cde3', '#e3f3fc', '#ffffff'],
};
const FIRE = ['#ff8fbf', '#ffcc66', '#7fe8c2', '#8fb8ff', '#c79bff'];
const LIGHT = { rest: [-0.6, -0.8, 0.85], hover: [0.75, -0.25, 0.7] };

// RABBIT_FILL uses only M, c, h, l and Z; curves are flattened to 8 segments each.
function outline() {
  const pts = [];
  let x = 0, y = 0;
  for (const [, cmd, args] of RABBIT_FILL.matchAll(/([MchlZ])([^MchlZ]*)/g)) {
    const n = (args.match(/-?(?:\d*\.\d+|\d+)/g) ?? []).map(Number);
    if (cmd === 'M') [x, y] = n;
    if (cmd === 'h') for (const d of n) x += d;
    if (cmd === 'l') for (let i = 0; i < n.length; i += 2) { x += n[i]; y += n[i + 1]; pts.push([x, y]); }
    if (cmd === 'c') {
      for (let i = 0; i < n.length; i += 6) {
        const [x1, y1, x2, y2, x3, y3] = n.slice(i, i + 6).map((v, k) => v + (k % 2 ? y : x));
        for (let s = 1; s <= 8; s++) {
          const t = s / 8, u = 1 - t;
          pts.push([u * u * u * x + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3, u * u * u * y + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3]);
        }
        [x, y] = [x3, y3];
      }
    }
    if (cmd !== 'c' && cmd !== 'l' && cmd !== 'Z') pts.push([x, y]);
  }
  return pts;
}

const OUTLINE = outline();
const inside = ([px, py]) => {
  let hit = false;
  for (let i = 0, j = OUTLINE.length - 1; i < OUTLINE.length; j = i++) {
    const [xi, yi] = OUTLINE[i], [xj, yj] = OUTLINE[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
};
const edgeDistance = ([px, py]) => Math.min(...OUTLINE.map(([x, y]) => Math.hypot(x - px, y - py)));

function alongOutline(count) {
  const seg = OUTLINE.map((p, i) => Math.hypot(...p.map((v, k) => OUTLINE[(i + 1) % OUTLINE.length][k] - v)));
  const total = seg.reduce((a, b) => a + b, 0);
  const out = [];
  let i = 0, walked = 0;
  for (let k = 0; k < count; k++) {
    const want = (total * k) / count;
    while (walked + seg[i] < want) walked += seg[i++];
    const t = (want - walked) / (seg[i] || 1), a = OUTLINE[i], b = OUTLINE[(i + 1) % OUTLINE.length];
    out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
  }
  return out;
}

// Bowyer-Watson; a few dozen points, so the quadratic walk is fine.
function delaunay(pts) {
  const P = [...pts, [-1e3, -1e3], [1e3, -1e3], [0, 1e3]];
  let tris = [[P.length - 3, P.length - 2, P.length - 1]];
  const circle = (t) => {
    const [a, b, c] = t.map((i) => P[i]);
    const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
    const s = (p) => p[0] * p[0] + p[1] * p[1];
    const ux = (s(a) * (b[1] - c[1]) + s(b) * (c[1] - a[1]) + s(c) * (a[1] - b[1])) / d;
    const uy = (s(a) * (c[0] - b[0]) + s(b) * (a[0] - c[0]) + s(c) * (b[0] - a[0])) / d;
    return [ux, uy, (a[0] - ux) ** 2 + (a[1] - uy) ** 2];
  };
  pts.forEach((p, pi) => {
    const bad = [], keep = [];
    for (const t of tris) {
      const [cx, cy, r] = circle(t);
      ((p[0] - cx) ** 2 + (p[1] - cy) ** 2 < r ? bad : keep).push(t);
    }
    const edges = [];
    for (const t of bad) for (const e of [[t[0], t[1]], [t[1], t[2]], [t[2], t[0]]]) {
      const k = edges.findIndex((f) => f[0] === e[1] && f[1] === e[0]);
      k >= 0 ? edges.splice(k, 1) : edges.push(e);
    }
    tris = keep.concat(edges.map((e) => [e[0], e[1], pi]));
  });
  return tris.filter((t) => t.every((i) => i < pts.length));
}

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => `#${hex(a).map((v, i) => Math.round(v + (hex(b)[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
const ramp = (r, v) => {
  const p = Math.max(0, Math.min(0.999, v)) * (r.length - 1), i = Math.floor(p);
  return mix(r[i], r[i + 1], p - i);
};

function carve(tier) {
  const { edge, ridge } = CUT[tier];
  const pts = [...alongOutline(edge).map((p) => [...p, 0]), ...RIDGE.slice(0, ridge).map((p) => [...p, edgeDistance(p) * 1.9])];
  const tris = delaunay(pts).filter((t) => inside([0, 1].map((k) => t.reduce((a, i) => a + pts[i][k], 0) / 3)));
  const shade = (light, i, [a, b, c]) => {
    const u = [0, 1, 2].map((k) => b[k] - a[k]), v = [0, 1, 2].map((k) => c[k] - a[k]);
    let n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    if (n[2] < 0) n = n.map((x) => -x);
    const ln = Math.hypot(...light), nn = Math.hypot(...n);
    const lam = Math.max(0, n.reduce((s, x, k) => s + (x / nn) * (light[k] / ln), 0));
    if (tier !== 'diamond') return { fill: ramp(RAMP[tier], lam * 0.98), opacity: 1 };
    if (lam > 0.9 && i % 2) return { fill: FIRE[(i * 7 + Math.round(light[0] * 5) + 9) % 5], opacity: 1 };
    return { fill: ramp(RAMP.diamond, lam * 0.8), opacity: +(0.72 + 0.28 * lam).toFixed(2) };
  };
  return tris.map((t, i) => {
    const corners = t.map((k) => pts[k]);
    return {
      points: corners.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' '),
      rest: shade(LIGHT.rest, i, corners),
      hover: shade(LIGHT.hover, i, corners),
    };
  });
}

export const PARTNER_FACETS = Object.fromEntries(PARTNER_TIERS.map((t) => [t, carve(t)]));

// `uid` keeps the clip id unique when a tier appears twice on one page.
export function partnerMarkSvg(tier, uid = tier) {
  if (!CUT[tier]) throw new Error(`Unknown partner tier "${tier}"`);
  const clip = `pm-${uid}`;
  const glass = tier === 'diamond';
  const facets = PARTNER_FACETS[tier]
    .map(({ points, rest, hover }) => {
      const stroke = glass ? '' : ` stroke="${rest.fill}"`;
      return `<polygon points="${points}" fill="${rest.fill}" fill-opacity="${rest.opacity}"${stroke} style="--b:${hover.fill};--bo:${hover.opacity}"/>`;
    })
    .join('');
  const edges = glass ? 'stroke="#fff" stroke-opacity=".6" stroke-width=".35"' : 'stroke-width=".3"';
  // A steel hairline around Diamond keeps its pale facets from dissolving into light grounds.
  const hairline = glass ? `<path d="${RABBIT_FILL}" fill="none" stroke="#2c4562" stroke-opacity=".55" stroke-width=".45"/>` : '';
  // deslop-ignore-next-line 18: a tier mark drawn on the page ground, with no tile behind it
  return `<svg role="img" aria-label="Surogate ${CUT[tier].name} partner" viewBox="-3 -3 77 79" width="96" height="96" style="display:block"><defs><clipPath id="${clip}"><path d="${RABBIT_FILL}"/></clipPath></defs><g clip-path="url(#${clip})" stroke-linejoin="round" ${edges}>${facets}</g>${hairline}<path d="${RABBIT_EYE}" fill="#1a0a1c"/></svg>`;
}

// Static markup for pages that inline the marks; PartnerMark adds the moving light.
export const partnerBadges = Object.fromEntries(PARTNER_TIERS.map((t) => [t, partnerMarkSvg(t)]));

import { RABBIT_EYE, RABBIT_FILL } from '../rabbit.js';

// Partner tier marks, "Orbits": the tier is a ring count (Silver one, Gold two, Diamond three), every ring
// pinned to the same point under the rabbit's tail like the brand rings. It reads without colour and at 40px.
const TIERS = { silver: ['Silver', 1], gold: ['Gold', 2], diamond: ['Diamond', 3] };
export const PARTNER_TIERS = Object.keys(TIERS);

// `dark` for aubergine and night grounds, `light` for white and stone.
const METAL = {
  dark: { silver: '#c3cad0', gold: '#ffaf10', diamond: '#e6f0f7' },
  light: { silver: '#6d7780', gold: '#d48a00', diamond: '#34506e' },
};

// The rabbit is 71 x 73 in its own units; centre it in the 96 box at a given height.
const place = (h, cx, cy) => {
  const s = h / 72.72;
  return `translate(${(cx - 35.5 * s).toFixed(2)} ${(cy - 36.4 * s).toFixed(2)}) scale(${s.toFixed(4)})`;
};

export function partnerRings(tier) {
  const n = TIERS[tier][1];
  const pin = [17, 79], dir = 0.7071;
  return Array.from({ length: n }, (_, k) => {
    const r = 44 - k * 6.5;
    return { cx: +(pin[0] + dir * r).toFixed(2), cy: +(pin[1] - dir * r).toFixed(2), r, width: k ? 2 : 2.6, opacity: +(1 - k * 0.22).toFixed(2) };
  });
}

export function partnerMarkSvg(tier, tone = 'dark') {
  if (!TIERS[tier]) throw new Error(`Unknown partner tier "${tier}"`);
  const c = METAL[tone][tier], n = TIERS[tier][1];
  const rings = partnerRings(tier)
    .map((o, k) => `<circle class="pm-ring" style="--k:${k}" cx="${o.cx}" cy="${o.cy}" r="${o.r}" fill="none" stroke="${c}" stroke-width="${o.width}" stroke-opacity="${o.opacity}"/>`)
    .join('');
  const rabbit = `<path d="${RABBIT_FILL} ${RABBIT_EYE}" fill="${c}" fill-rule="evenodd" transform="${place([44, 40, 34][n - 1], ...[[50, 48], [52, 46], [54, 44]][n - 1])}"/>`;
  // deslop-ignore-next-line 18: a tier mark drawn on the page ground, with no tile behind it
  return `<svg role="img" aria-label="Surogate ${TIERS[tier][0]} partner" viewBox="0 0 96 96" width="96" height="96" style="display:block">${rings}${rabbit}</svg>`;
}

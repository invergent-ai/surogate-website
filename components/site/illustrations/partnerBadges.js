import { RABBIT_EYE, RABBIT_FILL } from '../rabbit.js';

// Partner tier marks, "Orbits": the tier is a ring count (Silver one, Gold two, Diamond three), every ring
// pinned to the same point under the rabbit's tail like the brand rings. It reads without colour and at 40px.
const TIERS = { silver: ['Silver', 1], gold: ['Gold', 2], diamond: ['Diamond', 3] };
export const PARTNER_TIERS = Object.keys(TIERS);

// `dark` for aubergine and night grounds, `light` for white and stone. Diamond is ice on dark and ink on
// light, its innermost ring is sun, and it alone has a stone set in its band.
const METAL = {
  dark: { silver: '#c3cad0', gold: '#ffaf10', diamond: '#ffffff' },
  light: { silver: '#6d7780', gold: '#d48a00', diamond: '#0a0a0a' },
};
const SUN = { dark: '#ffaf10', light: '#d48a00' };

const PIN = [17, 79], DIR = 0.7071;
// The rabbit is 71 x 73 in its own units, 44 high and centred at (50, 48) in every tier. The rings step in by
// 4 so the third still clears its ears and nose.
export const RABBIT_AT = 'translate(28.52 25.98) scale(0.6051)';

export function partnerRings(tier) {
  return Array.from({ length: TIERS[tier][1] }, (_, k) => {
    const r = 44 - k * 4;
    return { cx: +(PIN[0] + DIR * r).toFixed(2), cy: +(PIN[1] - DIR * r).toFixed(2), r, width: k ? 1.8 : 2.6, opacity: +(1 - k * 0.25).toFixed(2) };
  });
}

// Opposite the pin on the outer ring: the stone is set there, and the arrival shine ends there.
const FAR = [+(PIN[0] + DIR * 88).toFixed(2), +(PIN[1] - DIR * 88).toFixed(2)];
const stone = (c, halo) => `<g class="pm-stone"><circle cx="${FAR[0]}" cy="${FAR[1]}" r="6.6" fill="none" stroke="${halo}" stroke-width=".8"/>`
  + `<circle cx="${FAR[0]}" cy="${FAR[1]}" r="4.2" fill="${c}"/></g>`;

export function partnerMarkSvg(tier, tone = 'dark') {
  if (!TIERS[tier]) throw new Error(`Unknown partner tier "${tier}"`);
  const c = METAL[tone][tier], top = tier === 'diamond';
  const all = partnerRings(tier);
  const rings = all
    .map((o, k) => {
      const stroke = top && k === all.length - 1 ? SUN[tone] : c;
      return `<circle class="pm-ring" style="--k:${k}" cx="${o.cx}" cy="${o.cy}" r="${o.r}" fill="none" stroke="${stroke}" stroke-width="${o.width}" stroke-opacity="${top && k === all.length - 1 ? 1 : o.opacity}"/>`;
    })
    .join('');
  const [o] = all;
  // Diamond: an engraved hairline inside the outer ring, a stone set opposite the pin, and a shine that runs to it once.
  const extra = top
    ? `<circle cx="${o.cx}" cy="${o.cy}" r="${o.r - 2.4}" fill="none" stroke="${c}" stroke-width=".6" stroke-opacity=".45"/>`
      + `<circle class="pm-shine" cx="${o.cx}" cy="${o.cy}" r="${o.r}" fill="none" stroke="${SUN[tone]}" stroke-width="2.6" stroke-linecap="round" pathLength="100" stroke-dasharray="9 91" opacity="0"/>`
      + stone(c, SUN[tone])
    : '';
  const rabbit = `<path d="${RABBIT_FILL} ${RABBIT_EYE}" fill="${c}" fill-rule="evenodd" transform="${RABBIT_AT}"/>`;
  // deslop-ignore-next-line 18: a tier mark drawn on the page ground, with no tile behind it
  return `<svg role="img" aria-label="Surogate ${TIERS[tier][0]} partner" viewBox="0 0 96 96" width="96" height="96" style="display:block;overflow:visible">${rings}${extra}${rabbit}</svg>`;
}

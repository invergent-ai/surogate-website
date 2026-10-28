import { RABBIT_EYE, RABBIT_FILL } from '../rabbit.js';
import { LOGO_RABBIT, LOGO_STAR } from '../logo.js';

// Partner tier marks: the tier is which rabbit you get, simple to complete. Silver the simple rabbit, Gold the
// same rabbit with one piece of the star, Diamond the star rabbit of the logo. All face right, sit the same
// size in the same ring, and read on aubergine and white at 40px.
const TIERS = { silver: 'Silver', gold: 'Gold', diamond: 'Diamond' };
export const PARTNER_TIERS = Object.keys(TIERS);

const SUN = '#ffaf10';
const DEEP = '#c27c00';
const STEEL = { dark: '#c3cad0', light: '#5f6a74' };
const INK = { dark: '#ffffff', light: '#0a0a0a' };
const RABBIT = `${RABBIT_FILL} ${RABBIT_EYE}`;
// Gold's one piece of the star: its long arm, a sweep along the rabbit's back.
const SWEEP = 'M-5.5 64C-3.5 45 5 30 20 18.5';

// Each tier's art: its bounding box [x, y, w, h] in its own units (measured from the paths), an optical size
// that evens a tall star against a wide rabbit (Diamond's is sized so its rabbit matches the others', the star
// filling the ring around it), whether it is mirrored so every rabbit faces right, and its
// layers per tone as [d, fill, extra attributes?]. Flat fills and fine strokes only.
const ART = {
  silver: {
    box: [1.79, 1.79, 67.48, 69.15], k: 1,
    layers: (tone) => [[RABBIT, STEEL[tone], 'fill-rule="evenodd"']],
  },
  gold: {
    box: [-6.8, 1.79, 76.07, 69.15], k: 1.04,
    layers: (tone) => [
      [SWEEP, 'none', `stroke="${tone === 'dark' ? SUN : DEEP}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"`],
      [RABBIT, SUN, `fill-rule="evenodd"${tone === 'light' ? ` stroke="${DEEP}" stroke-width="1.2" stroke-linejoin="round"` : ''}`],
    ],
  },
  // The logo's star rabbit, mirrored. The star's thin arms get a stroke of their own colour so they hold at 40px.
  diamond: {
    box: [496.01, 0, 206.57, 235.03], k: 1.24, flip: true,
    layers: (tone) => [[LOGO_STAR, INK[tone], `stroke="${INK[tone]}" stroke-width="6" stroke-linejoin="round"`], [LOGO_RABBIT, SUN, 'class="pm-sun"']],
  },
};
// One ring for every tier, in the tier's colour.
const FRAME = {
  silver: (tone) => [STEEL[tone], 0.55],
  gold: (tone) => [tone === 'dark' ? SUN : DEEP, 0.6],
  diamond: (tone) => [INK[tone], 0.5],
};

// Centre the art in the 96 box with its longer side at 54 times its optical size.
export function artTransform(tier) {
  const { box: [x, y, w, h], k, flip } = ART[tier];
  const s = (54 * k) / Math.max(w, h);
  const tx = flip ? 48 + (x + w / 2) * s : 48 - (x + w / 2) * s;
  return `translate(${tx.toFixed(2)} ${(48 - (y + h / 2) * s).toFixed(2)}) scale(${flip ? '-' : ''}${s.toFixed(4)} ${s.toFixed(4)})`;
}

export function partnerMarkSvg(tier, tone = 'dark') {
  if (!TIERS[tier]) throw new Error(`Unknown partner tier "${tier}"`);
  const paths = ART[tier].layers(tone)
    .map(([d, fill, more]) => `<path d="${d}" fill="${fill}"${more ? ` ${more}` : ''}/>`)
    .join('');
  const [ring, o] = FRAME[tier](tone);
  // deslop-ignore-next-line 18: a tier mark drawn on the page ground, with no tile behind it
  return `<svg role="img" aria-label="Surogate ${TIERS[tier]} partner" viewBox="0 0 96 96" width="96" height="96" style="display:block">`
    + `<g class="pm-frame"><circle cx="48" cy="48" r="46" fill="none" stroke="${ring}" stroke-opacity="${o}" stroke-width="1.5"/></g>`
    + `<g class="pm-art"><g transform="${artTransform(tier)}">${paths}</g></g></svg>`;
}

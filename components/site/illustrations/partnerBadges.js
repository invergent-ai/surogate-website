import { RABBIT_EYE, RABBIT_FILL } from '../rabbit.js';
import { LOGO_RABBIT, LOGO_STAR } from '../logo.js';

// Partner tier marks: the tier is which rabbit you get. Silver the simple rabbit, Gold the fuller Jackrabbit
// (public/labs/speech/jackrabbit.svg without its sound waves, flat), Diamond the star rabbit of the logo.
// Every tier sits the same size in the same thin ring, and reads on aubergine and white at 40px.
const TIERS = { silver: 'Silver', gold: 'Gold', diamond: 'Diamond' };
export const PARTNER_TIERS = Object.keys(TIERS);

const SUN = '#ffaf10';
const AUBERGINE = '#2a102d';
const JACK_RIM = 'm74.68 30.58c0-3.19-7.25-8.910-15.02-9.59-6.310-5.850-16.6-10.7-28.09-10.7-8.320 0-16.08 3.050-16.05 5.320 0 1.980 5.430 5.070 10.75 6-1.710 0.730-2.600 1.500-2.600 2.570 0 2 5.640 4.790 12.61 4.790 2.750 0 4.950-0.490 7.030-0.430-24.9 5.630-35.630 23.96-37.73 36.59-0.490 3.120 0.460 4.700 1.990 4.700 0.760 0 1.570-0.530 2.350-1.290 9.960-9.860 22.63-19.530 38.93-19.530 8.130 0 14.69 2.200 19.14 3.710 2.610 0.890 4.220-0.170 4.220-2.080 0-2.060-3.690-7.540-7.760-10.520 6.260-2.080 10.23-6.760 10.23-9.540z';
const JACK_BODY = 'm59.58 39.27c9.390-2.550 12.64-7.050 12.64-8.710 0-1.370-5.800-6.980-13.710-7.360-6.300-5.850-16.31-10.38-26.86-10.38-6.800 0-12.090 2.060-13.41 2.930 2.130 1.910 7.740 3.970 14.38 4.070 1.590-0.170 3.190-0.270 4.740-0.280 8.030 0.110 14.47 2.670 16.85 4.020-4.690-1.180-9.920-1.860-15.23-1.860-6.540 0-11.23 1.570-12.53 2.460 1.740 1.200 5.820 2.410 10.740 2.410 3.850 0 10.14-0.640 14.71 0.010-0.640 1.020-1.530 1.930-2.420 2.710-30.41 5.260-41.53 29.34-41.66 37.84 9.230-9.290 23.45-20.64 40.73-20.64 10.03 0 18.16 3.580 21.24 4.130-0.750-2.700-4.810-7.760-10.21-11.35z';
const JACK_EYE = 'm62.26 25.93c-1.090 0-1.800 0.850-1.800 1.890 0 1.160 0.920 1.870 1.920 1.870 0.760-0.140 1.610-0.380 2.280-0.630 0.210-1.810-0.970-3.030-2.400-3.130z';

// Each tier's art: its bounding box [x, y, w, h] in its own units (measured from the paths), an optical size
// that evens a tall star against a wide rabbit, and its layers per tone as [d, fill, extra attributes?].
// The star's thin arms get a stroke of their own colour so they hold at 40px, as the small logo does.
const ART = {
  silver: {
    box: [1.79, 1.79, 67.48, 69.15], k: 1,
    layers: (tone) => [[`${RABBIT_FILL} ${RABBIT_EYE}`, tone === 'dark' ? '#c3cad0' : '#6d7780', 'fill-rule="evenodd"']],
  },
  gold: {
    box: [5.45, 10.29, 69.23, 59.54], k: 1.08,
    layers: () => [[JACK_RIM, AUBERGINE], [JACK_BODY, SUN], [JACK_EYE, AUBERGINE]],
  },
  diamond: {
    box: [496.01, 0, 206.57, 235.03], k: 1.06,
    layers: (tone) => {
      const ink = tone === 'dark' ? '#ffffff' : '#0a0a0a';
      return [[LOGO_STAR, ink, `stroke="${ink}" stroke-width="6" stroke-linejoin="round"`], [LOGO_RABBIT, SUN, 'class="pm-sun"']];
    },
  },
};
const FRAME = { dark: 'rgba(255,255,255,.28)', light: 'rgba(10,10,10,.18)' };

// Centre the art in the 96 box with its longer side at 54 times its optical size.
export function artTransform(tier) {
  const { box: [x, y, w, h], k } = ART[tier];
  const s = (54 * k) / Math.max(w, h);
  return `translate(${(48 - (x + w / 2) * s).toFixed(2)} ${(48 - (y + h / 2) * s).toFixed(2)}) scale(${s.toFixed(4)})`;
}

export function partnerMarkSvg(tier, tone = 'dark') {
  if (!TIERS[tier]) throw new Error(`Unknown partner tier "${tier}"`);
  const paths = ART[tier].layers(tone)
    .map(([d, fill, more]) => `<path d="${d}" fill="${fill}"${more ? ` ${more}` : ''}/>`)
    .join('');
  // deslop-ignore-next-line 18: a tier mark drawn on the page ground, with no tile behind it
  return `<svg role="img" aria-label="Surogate ${TIERS[tier]} partner" viewBox="0 0 96 96" width="96" height="96" style="display:block">`
    + `<circle class="pm-frame" cx="48" cy="48" r="46" fill="none" stroke="${FRAME[tone]}" stroke-width="1.5"/>`
    + `<g class="pm-art"><g transform="${artTransform(tier)}">${paths}</g></g></svg>`;
}

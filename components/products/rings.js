// Where a page's own ring composition (RingField.jsx) sits, and the geometry the compositions are built from.

// Behind a hero's product: centred on it and wider than the page, but shown only outside the content column, so no
// hairline ever runs under the copy, the actions or the product (products.css, .rf-col).
const HERO_AT = 'rf-col absolute left-1/2 -z-10 !hidden w-[1600px] -translate-x-1/2 md:!block';
export const HERO_RINGS = `${HERO_AT} top-1/2 -translate-y-1/2`;
// AI Gateway: the rings meet just under the market, in white space kept for them, and show there too.
export const HERO_RINGS_UNDER = `${HERO_AT} rf-under bottom-[-235px]`;
// Behind an aubergine band: out of its top-right corner, shown only beyond the content's right edge (.rf-band).
export const BAND_CLIP = 'rf-band absolute inset-0 -z-10 hidden md:block';
export const BAND_RINGS = 'absolute right-[-16%] top-[-48%] h-[125%] w-auto';

const round = (n) => Math.round(n * 10) / 10;
// The point at `deg` degrees on a ring, clockwise from three o'clock as SVG draws it.
export const at = (cx, cy, r, deg) => [round(cx + r * Math.cos((deg * Math.PI) / 180)), round(cy + r * Math.sin((deg * Math.PI) / 180))];

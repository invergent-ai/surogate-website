// Where a page's own ring composition (RingField.jsx) sits, and the geometry the compositions are built from.

// Behind a hero's product: centred on it, wider than the page, faded out before it reaches the headline.
export const HERO_RINGS = 'rf-hero absolute left-1/2 top-1/2 -z-10 !hidden w-[1600px] -translate-x-1/2 -translate-y-1/2 md:!block';
// Behind an aubergine band: out of its top-right corner, faded out before the copy and the content below it.
export const BAND_RINGS = 'rf-band absolute -z-10 right-[-90%] top-[-18%] h-[60%] w-auto md:right-[-16%] md:top-[-48%] md:h-[125%]';

const round = (n) => Math.round(n * 10) / 10;
// The point at `deg` degrees on a ring, clockwise from three o'clock as SVG draws it.
export const at = (cx, cy, r, deg) => [round(cx + r * Math.cos((deg * Math.PI) / 180)), round(cy + r * Math.sin((deg * Math.PI) / 180))];

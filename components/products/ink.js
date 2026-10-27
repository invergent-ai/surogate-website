import { RABBIT_EYE, RABBIT_FILL, RABBIT_OUTLINE } from '@/components/site/rabbit';

// Our older drawings re-inked for v2: wine is retired, the second yellow folds into sun, and the rabbit leaves
// every drawing outside the two pages where it is a character (an agent step keeps its sun tile).
const MAP = { '#9b1f61': '#2a102d', '#ffe845': '#ffaf10', '#ff6b6b': '#ffaf10' };
const RABBIT = new RegExp(`<path d="(?:${[RABBIT_FILL, RABBIT_OUTLINE, RABBIT_EYE].map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})"[^>]*?(?:/>|></path>)`, 'g');

export const reink = (svg) => svg.replace(/#9b1f61|#ffe845|#ff6b6b/gi, (c) => MAP[c.toLowerCase()]).replace(RABBIT, '');

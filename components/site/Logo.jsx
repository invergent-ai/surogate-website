'use client';

import { useEffect, useState } from 'react';
import { LOGO_RABBIT, LOGO_REG, LOGO_STAR, LOGO_VIEWBOX, LOGO_WORD } from './logo.js';

// Client navigations remount the nav; the draw-in belongs to the page load, so only the first mount plays it.
let drawn = false;

// Ink and sun: the star and wordmark take the text colour, the rabbit is sun. Under 40px the star gets a
// stroke so its thin arms survive (`small`).
export default function Logo({ draw = false, small = false, title = 'Surogate', className = '' }) {
  const [play] = useState(() => draw && !drawn);
  useEffect(() => { if (play) drawn = true; }, [play]);
  const heavy = small ? { stroke: 'currentColor', strokeWidth: 3.2, strokeLinejoin: 'round' } : {};
  return (
    <svg viewBox={LOGO_VIEWBOX} {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })} className={`overflow-visible ${play ? 'logo-draw' : ''} ${className}`}>
      <g className="logo-wm" fill="currentColor">{LOGO_WORD.map((d) => <path key={d.slice(0, 24)} d={d} />)}</g>
      {play && <path className="logo-line" d={LOGO_STAR} pathLength="1" fill="none" stroke="currentColor" strokeWidth="1.6" />}
      <path className="logo-star" d={LOGO_STAR} fill="currentColor" {...heavy} />
      <path className="logo-sun" d={LOGO_RABBIT} fill="#ffaf10" />
      <path className="logo-wm" d={LOGO_REG} fill="currentColor" opacity=".9" />
    </svg>
  );
}

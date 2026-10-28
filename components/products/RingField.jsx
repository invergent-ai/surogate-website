'use client';

import { useRef } from 'react';
import { useLive } from '@/components/site/Rings';

// A product's own ring composition, in Transit's terms (app/v2.css): the rings hold still as hairlines and sun
// arcs travel them only while the drawing is on screen. rings: [cx, cy, r]; arcs: [cx, cy, r, seconds a turn,
// direction, offset in seconds]. Children are the page's own moving pieces (products.css, .rf-*).
export default function RingField({ rings, arcs = [], dark = false, className = '', viewBox = '0 0 1600 1000', children }) {
  const ref = useRef(null);
  useLive(ref);
  return (
    <svg ref={ref} viewBox={viewBox} aria-hidden="true" className={`transit transit-loop rf pointer-events-none max-w-none ${dark ? 'on-dark' : ''} ${className}`}>
      {rings.map(([cx, cy, r]) => <circle key={`${cx}-${cy}-${r}`} className="ring" cx={cx} cy={cy} r={r} />)}
      {arcs.map(([cx, cy, r, d, s = 1, del = 0]) => (
        <circle key={`a${cx}-${cy}-${r}`} className="arc" cx={cx} cy={cy} r={r} pathLength="100" style={{ '--d': `${d}s`, '--del': `-${del}s`, '--s': s }} />
      ))}
      {children}
    </svg>
  );
}

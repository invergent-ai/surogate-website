'use client';

import { useRef } from 'react';
import { useLive } from './Rings';
import { LOGO_RABBIT, LOGO_STAR } from './logo.js';

const ECHOES = [1.25, 1.55, 1.9];
// The star's inner contour alone: as hairlines the filled shape's two contours read as a doubled line.
const STAR = LOGO_STAR.split('M581.22,0')[0];

// The mark drawn as hairlines: the star and its rabbit trace themselves in once the footer is on screen, and the
// star's outline repeats outward as fading contours, the same gold-trace idea as the photos.
export default function FooterMark({ className = '' }) {
  const ref = useRef(null);
  useLive(ref, true);
  return (
    <svg ref={ref} viewBox="300 -110 590 450" aria-hidden="true" fill="none" className={`footer-mark pointer-events-none ${className}`}>
      {ECHOES.map((s, i) => (
        <path key={s} className="fm-line" d={STAR} pathLength="1" stroke="#fff" strokeOpacity={0.1 - i * 0.03}
          strokeWidth={1.3 / s} transform={`translate(595 115) scale(${s}) translate(-595 -115)`} style={{ '--del': `${600 + i * 250}ms` }} />
      ))}
      <path className="fm-line" d={STAR} pathLength="1" stroke="#fff" strokeOpacity=".28" strokeWidth="1.3" />
      <path className="fm-line" d={LOGO_RABBIT} pathLength="1" stroke="#ffaf10" strokeOpacity=".9" strokeWidth="1.3" style={{ '--del': '350ms' }} />
    </svg>
  );
}

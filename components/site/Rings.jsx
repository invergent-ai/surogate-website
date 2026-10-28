'use client';

import { useEffect, useRef } from 'react';

// The nine brand rings of public/surogate_circles.svg as [cx, cy, r]; they meet at the last one, the rabbit's eye.
export const RINGS = [[793, 1456, 793], [1030, 1797, 794], [1135, 381, 380], [1081, 979, 380], [1269, 924, 380], [1129, 1205, 373], [902, 1778, 794], [1135, 524, 380], [1014, 677, 39]];
// Three short sun arcs travel three of the rings: [ring, seconds per turn, direction].
const ARCS = [[0, 64, 1], [3, 46, -1], [5, 88, 1]];

// Sets data-live while the element is on screen, so a loop never runs where nobody sees it.
export function useLive(ref, once = false) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.dataset.live = '';
      else if (!once) delete el.dataset.live;
      if (e.isIntersecting && once) io.disconnect();
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once]);
}

// Transit: the rings hold still as hairlines and three sun arcs travel them. `loop` runs while on screen;
// `hover` runs each arc once when the surrounding .group is hovered.
export default function Transit({ mode = 'loop', className = '' }) {
  const ref = useRef(null);
  useLive(ref);
  return (
    <svg ref={ref} viewBox="0 0 1825 2592" aria-hidden="true" className={`transit transit-${mode} pointer-events-none ${className}`}>
      {RINGS.map(([cx, cy, r]) => <circle key={`${cx}-${cy}`} className="ring" cx={cx} cy={cy} r={r} />)}
      {ARCS.map(([i, d, s], k) => {
        const [cx, cy, r] = RINGS[i];
        return <circle key={i} className="arc" cx={cx} cy={cy} r={r} pathLength="100" style={{ '--d': `${d}s`, '--del': `-${k * 13}s`, '--s': s }} />;
      })}
    </svg>
  );
}

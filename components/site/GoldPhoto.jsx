'use client';

import { useRef } from 'react';
import { useLive } from './Rings';

// A photo in our look, filling its positioned parent: the black to gold duotone and its gold contours, both from
// docs/brand/tools/photo-layers.py. The first time it is on screen the contours draw out from the centre, the
// photo rises beneath them and the lines settle to a faint etch; the photo drifts slowly inside the still frame.
// tone 'plum' swaps the black duotone for the aubergine one; the contours stay gold either way.
export default function GoldPhoto({ slug, tone = 'duo', className = '' }) {
  const ref = useRef(null);
  useLive(ref, true);
  return (
    <div ref={ref} aria-hidden="true" className={`gold-photo absolute inset-0 overflow-hidden ${className}`}>
      <div className="gp-drift absolute inset-0">
        <img src={`/v3/photos/${slug}-${tone}.jpg`} alt="" loading="lazy" decoding="async" className="gp-duo absolute inset-0 h-full w-full object-cover" />
        <img src={`/v3/photos/${slug}-trace.png`} alt="" loading="lazy" decoding="async" className="gp-trace absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { partnerMarkSvg } from './illustrations/partnerBadges.js';
import { useLive } from './Rings';

// The markup is the finished mark. Once mounted it arms (hidden) and, the first time it is on screen, the
// ring fades in and the rabbit settles into it, once. Reduced motion never arms, so it keeps the finished mark.
export default function PartnerMark({ tier, tone = 'dark', size = 96, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) ref.current.dataset.arm = '';
  }, []);
  useLive(ref, true);
  return (
    <span ref={ref} className={`pm block [&_svg]:h-full [&_svg]:w-full ${className}`} style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: partnerMarkSvg(tier, tone) }} />
  );
}

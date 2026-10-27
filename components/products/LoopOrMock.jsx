'use client';

import { useEffect, useRef, useState } from 'react';

// A loop that may not exist yet. The live mock is the base layer; the footage fades in over it only once a frame
// has decoded, so a missing file, reduced motion or no JS all leave the mock, and nothing moves either way.
export default function LoopOrMock({ src, children, className = '' }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return v.pause();
      if (v.preload === 'none') { v.preload = 'auto'; v.src = src; }
      v.play().catch(() => {});
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return (
    <div className={`relative ${className}`}>
      <div className={`h-full w-full transition-opacity duration-500 ${ready ? 'opacity-0' : 'opacity-100'}`}>{children}</div>
      <video ref={ref} muted loop playsInline preload="none" aria-hidden="true" onPlaying={() => setReady(true)}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
}

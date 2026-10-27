'use client';

import { useEffect, useRef } from 'react';

// Plays only while on screen and never under reduced motion; otherwise the poster stands in.
export default function LoopVideo({ src, poster, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-hidden="true" className={className} />;
}

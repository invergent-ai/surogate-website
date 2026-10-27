'use client';

import { useEffect, useRef } from 'react';

// Plays only while on screen and never under reduced motion; otherwise the poster stands in.
// An array of srcs becomes <source>s: the browser falls through to the next when one is missing.
export default function LoopVideo({ src, poster, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  const many = Array.isArray(src);
  return (
    <video ref={ref} src={many ? undefined : src} poster={poster} muted loop playsInline preload="none" aria-hidden="true" className={className}>
      {many && src.map((s) => <source key={s} src={s} type="video/mp4" />)}
    </video>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

// Plays only while on screen and never under reduced motion; otherwise the poster stands in.
// A poster is fetched as soon as the tag exists, so below the fold it is set only once the window is near;
// `eager` is for footage that opens the page. An array of srcs becomes <source>s: the browser falls through
// to the next when one is missing.
export default function LoopVideo({ src, poster, className = '', eager = false }) {
  const ref = useRef(null);
  const [near, setNear] = useState(eager);
  useEffect(() => {
    const v = ref.current;
    if (!v || !('IntersectionObserver' in window)) return setNear(true);
    const soon = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); soon.disconnect(); } }, { rootMargin: '600px 0px' });
    soon.observe(v);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => soon.disconnect();
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => { soon.disconnect(); io.disconnect(); };
  }, []);
  const many = Array.isArray(src);
  return (
    <video ref={ref} src={many ? undefined : src} poster={near ? poster : undefined} muted loop playsInline preload="none" aria-hidden="true" className={className}>
      {many && src.map((s) => <source key={s} src={s} type="video/mp4" />)}
    </video>
  );
}

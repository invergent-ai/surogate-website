'use client';

import { useEffect, useRef, useState } from 'react';

const PARALLAX_FACTOR = 0.18;
const BG_PARALLAX_FACTOR = 0.08;
const VIDEO_SRC = '/surogate-app.mp4';

export default function AppDemoParallax() {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setParallaxEnabled(!mq.matches);

    const onMotionChange = () => {
      const enabled = !mq.matches;
      setParallaxEnabled(enabled);
      if (!enabled) setOffset(0);
    };
    mq.addEventListener('change', onMotionChange);

    let raf = 0;

    const update = () => {
      if (mq.matches) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setOffset(0);
        return;
      }

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setOffset((progress - 0.5) * scrollable * PARALLAX_FACTOR);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mq.removeEventListener('change', onMotionChange);
    };
  }, []);

  const bgOffset = offset * (BG_PARALLAX_FACTOR / PARALLAX_FACTOR);

  return (
    <section
      ref={sectionRef}
      aria-label="Surogate app demo"
      className="relative overflow-hidden bg-brand-aubergine h-[60vw] min-h-[280px] max-h-[480px] md:h-screen md:max-h-screen"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 will-change-transform motion-reduce:hidden"
        style={
          parallaxEnabled
            ? { transform: `translate3d(0, ${bgOffset}px, 0)` }
            : undefined
        }
      >
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={VIDEO_SRC}
          poster="/surogate-app-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
      </div>

<p className="sr-only">Screen recording of the Surogate app in use.</p>
    </section>
  );
}

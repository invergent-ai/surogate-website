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
      className="relative overflow-hidden bg-brand-aubergine py-10 sm:py-12 md:h-screen md:max-h-screen md:py-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden will-change-transform motion-reduce:hidden md:block"
        style={
          parallaxEnabled
            ? { transform: `translate3d(0, ${bgOffset}px, 0)` }
            : undefined
        }
      >
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-b from-brand-aubergine/50 via-brand-aubergine/70 to-brand-aubergine md:block"
      />

      <div className="relative z-10 flex h-full items-center md:py-10">
        <div className="max-w-container mx-auto w-full px-6 sm:px-8">
          <div
            className="reveal overflow-hidden rounded-lg border border-brand-border bg-brand-fog shadow-[0_16px_40px_-20px_rgba(42,16,45,0.35)] will-change-transform md:rounded-xl md:border-white/15 md:bg-brand-aubergine/40 md:shadow-[0_28px_64px_-20px_rgba(0,0,0,0.55)] md:backdrop-blur-sm"
            style={
              parallaxEnabled
                ? { transform: `translate3d(0, ${offset}px, 0)` }
                : undefined
            }
          >
            <video
              className="block w-full h-auto"
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              controls
              playsInline
              preload="metadata"
              aria-label="Surogate app demo"
            >
              Your browser does not support embedded video.{' '}
              <a href={VIDEO_SRC} className="underline">
                Download the demo
              </a>
              .
            </video>
          </div>
        </div>
      </div>

      <p className="sr-only">Screen recording of the Surogate app in use.</p>
    </section>
  );
}

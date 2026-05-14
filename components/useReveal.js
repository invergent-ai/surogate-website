'use client';

import { useEffect } from 'react';

export default function useReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '-40px 0px -10% 0px', threshold: 0.01 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

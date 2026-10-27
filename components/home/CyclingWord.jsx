'use client';

import { useEffect, useState } from 'react';

// The server renders the first word, so the headline is whole without script and for crawlers.
export default function CyclingWord({ words, every = 2400 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), every);
    return () => clearInterval(t);
  }, [words, every]);
  return (
    <span className="relative inline-block border-b-[6px] border-sun/70 leading-[0.95]">
      <span key={i} className="word-in">{words[i]}</span>
    </span>
  );
}

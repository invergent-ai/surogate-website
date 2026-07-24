'use client';

import { Fragment, useEffect, useState } from 'react';

const TARGET = Date.UTC(2026, 7, 8, 0, 0, 0); // Aug 8, 2026 00:00 UTC

function timeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [t, setT] = useState(null);

  useEffect(() => {
    setT(timeLeft());
    const id = setInterval(() => setT(timeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days', value: t?.days, accent: true },
    { label: 'Hours', value: t?.hours },
    { label: 'Minutes', value: t?.minutes },
    { label: 'Seconds', value: t?.seconds },
  ];

  return (
    <div className="flex items-start gap-3 sm:gap-5 justify-center">
      {units.map((u, i) => (
        <Fragment key={u.label}>
          {i > 0 && (
            <span className="font-mono text-[24px] sm:text-[36px] text-brand-aubergine pt-1 sm:pt-2">:</span>
          )}
          <div className="flex flex-col items-center gap-2 min-w-[56px] sm:min-w-[76px]">
            <span
              className={`font-serif font-bold text-[32px] sm:text-[48px] tabular-nums leading-none ${
                u.accent ? 'text-brand-orange' : 'text-brand-aubergine'
              }`}
            >
              {String(u.value ?? 0).padStart(2, '0')}
            </span>
            <span
              className={`font-sans text-[10px] sm:text-[11px] uppercase tracking-wider-2 ${
                u.accent ? 'text-brand-orange' : 'text-brand-aubergine'
              }`}
            >
              {u.label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

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

const SIZES = {
  default: {
    gap: 'gap-3 sm:gap-5',
    colon: 'text-[24px] sm:text-[36px]',
    minW: 'min-w-[56px] sm:min-w-[76px]',
    num: 'text-[32px] sm:text-[48px]',
    label: 'text-[10px] sm:text-[11px]',
  },
  lg: {
    gap: 'gap-2 sm:gap-3 lg:gap-4 xl:gap-7',
    colon: 'text-[20px] sm:text-[26px] lg:text-[32px] xl:text-[52px]',
    minW: 'min-w-[44px] sm:min-w-[56px] lg:min-w-[70px] xl:min-w-[100px]',
    num: 'text-[28px] sm:text-[36px] lg:text-[44px] xl:text-[68px]',
    label: 'text-[9px] sm:text-[10px] lg:text-[12px] xl:text-[13px]',
  },
};

export default function CountdownTimer({ theme = 'light', size = 'default' }) {
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

  const baseColor = theme === 'dark' ? 'text-white' : 'text-brand-aubergine';
  const colonColor = theme === 'dark' ? 'text-white' : 'text-brand-aubergine';
  const s = SIZES[size] || SIZES.default;

  return (
    <div className={`flex items-start ${s.gap} justify-center`}>
      {units.map((u, i) => (
        <Fragment key={u.label}>
          {i > 0 && (
            <span className={`font-mono ${s.colon} pt-1 sm:pt-2 ${colonColor}`}>:</span>
          )}
          <div className={`flex flex-col items-center gap-2 ${s.minW}`}>
            <span
              className={`font-serif font-bold ${s.num} tabular-nums leading-none ${
                u.accent ? 'text-brand-orange' : baseColor
              }`}
            >
              {String(u.value ?? 0).padStart(2, '0')}
            </span>
            <span
              className={`font-sans ${s.label} uppercase tracking-wider-2 ${
                u.accent ? 'text-brand-orange' : baseColor
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

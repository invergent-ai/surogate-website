'use client';

import { useEffect, useRef, useState } from 'react';

// A list of steps on the left; on wide screens one sticky panel on the right shows the step in the middle of the
// viewport. Every panel is stacked in the same box and crossfades, so the box never changes size. On phones each
// step carries its own panel inline: nothing pins. Without JS the first panel shows and every step still reads.
export default function Scroller({ steps, dark = false, panelClass = '' }) {
  const [on, setOn] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) setOn(Number(e.target.dataset.i));
    }, { rootMargin: '-45% 0px -45% 0px' });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const box = `relative w-full overflow-hidden rounded-2xl ${dark ? 'bg-night' : 'bg-white'} ${panelClass}`;
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
      <ol className="m-0 min-w-0 list-none p-0">
        {steps.map((s, i) => (
          <li key={s.title} ref={(el) => { refs.current[i] = el; }} data-i={i}
            className={`scroll-step border-t py-8 lg:flex lg:min-h-[52vh] lg:flex-col lg:justify-center lg:py-10 ${dark ? 'border-white/15' : 'border-hairline'} ${i === on ? 'is-on' : ''}`}>
            <p className={`m-0 text-[13px] tabular-nums ${dark ? 'text-white/50' : 'text-ink/45'}`}>{String(i + 1).padStart(2, '0')}</p>
            <h3 className="m-0 mt-2 text-[22px] font-[500] leading-[1.25] md:text-[24px]">{s.title}</h3>
            <p className={`mt-3 mb-0 max-w-[44ch] text-[16px] leading-[1.6] ${dark ? 'text-white/70' : 'text-ink/65'}`}>{s.line}</p>
            {s.points && (
              <ul className={`m-0 mt-4 flex list-none flex-col gap-1.5 p-0 text-[14px] leading-[1.5] ${dark ? 'text-white/60' : 'text-ink/55'}`}>
                {s.points.map((p) => <li key={p} className="flex gap-2"><span aria-hidden="true" className={`mt-[9px] h-px w-3 shrink-0 ${dark ? 'bg-white/40' : 'bg-ink/30'}`} />{p}</li>)}
              </ul>
            )}
            <div className={`${box} mt-6 grid min-h-[160px] md:min-h-[260px] lg:hidden [&>*]:min-w-0`}>{s.panel}</div>
          </li>
        ))}
      </ol>
      <div className="hidden lg:block">
        <div className="sticky top-[calc(50vh-min(20vw,250px))]">
          <div className={`${box} aspect-[16/11]`}>
            {steps.map((s, i) => (
              <div key={s.title} aria-hidden={i !== on} className={`scroll-panel absolute inset-0 ${i === on ? 'is-on' : ''}`}>{s.panel}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { ICONS } from './icons';

/* The filmed Rune demos: each poster in a 16:10 window; its silent loop plays while the pointer or focus is on it. */
export default function RuneFilms({ demos }) {
  const loop = (play) => (e) => {
    const v = e.currentTarget.querySelector('video');
    if (play) v.play().catch(() => {}); else v.pause();
  };
  return (
    <ul className="m-0 grid list-none gap-x-3 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {demos.map((d) => {
        const Icon = ICONS[d.icon];
        return (
          <li key={d.slug}>
            <a href={`/labs/rune-examples/?demo=${d.slug}`} className="group block !text-ink no-underline"
              onMouseEnter={loop(true)} onMouseLeave={loop(false)} onFocus={loop(true)} onBlur={loop(false)}>
              <span className="block aspect-[16/10] overflow-hidden rounded-xl bg-night">
                <video src={d.film.loop} poster={d.film.poster} muted loop playsInline preload="none"
                  width="960" height="540" aria-hidden="true" className="h-full w-full object-contain" />
              </span>
              <span className="mt-3 flex items-center gap-1.5 text-[14px] font-medium leading-[1.4]">
                <Icon size={15} strokeWidth={2} aria-hidden="true" className="text-ink/50" />{d.title}
              </span>
              <span className="mt-0.5 block text-[13px] text-ink/55">{d.kind.replace(' · ', ', ')}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

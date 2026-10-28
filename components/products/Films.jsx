'use client';

import { useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import LoopVideo from '@/components/site/LoopVideo';
import FilmVideo from '@/components/site/FilmVideo';
import { FILMS, filmFiles } from '@/lib/films';

// Film cards whose loop plays muted in place; a click opens the whole film with sound in a dialog.
export default function Films({ slugs, cols = 'sm:grid-cols-2 lg:grid-cols-3' }) {
  const dialog = useRef(null);
  const [film, setFilm] = useState(null);
  const shown = slugs.map((s) => FILMS.find((f) => f.slug === s));
  const open = (f) => { setFilm(f); dialog.current?.showModal(); };
  return (
    <>
      <ul className={`m-0 grid list-none gap-x-3 gap-y-8 p-0 ${cols}`}>
        {shown.map((f) => {
          const files = filmFiles(f.slug);
          return (
            <li key={f.slug}>
              <button type="button" aria-label={`Watch ${f.title}`} onClick={() => open(f)} className="group block w-full text-left">
                <span className="relative block aspect-[16/10] overflow-hidden rounded-xl bg-stone">
                  <span className="tile-media block h-full w-full"><LoopVideo src={files.loop} poster={files.poster} className="h-full w-full object-contain" /></span>
                  <span className="absolute bottom-3 left-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink"><Play size={14} /></span>
                </span>
                <span className="mt-3 block text-[14px] font-medium leading-[1.4] text-ink">{f.title}</span>
                <span className="mt-0.5 block text-[13px] text-ink/50">{f.business}, a demo business</span>
              </button>
            </li>
          );
        })}
      </ul>
      <dialog ref={dialog} onClose={() => setFilm(null)} className="w-[min(92vw,720px,85dvh)] rounded-2xl bg-night p-0 backdrop:bg-black/70">
        <div className="aspect-square w-full">
          {film && <FilmVideo slug={film.slug} />}
        </div>
        <button type="button" onClick={() => dialog.current?.close()} aria-label="Close film" className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink"><X size={18} /></button>
      </dialog>
    </>
  );
}

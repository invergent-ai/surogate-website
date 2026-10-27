'use client';

import { useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import Section, { SectionHead } from '@/components/site/Section';
import LoopVideo from '@/components/site/LoopVideo';
import { FILMS, filmFiles } from '@/lib/films';

export default function Films() {
  const dialog = useRef(null);
  const [film, setFilm] = useState(null);
  const open = (f) => { setFilm(f); dialog.current?.showModal(); };
  const close = () => { dialog.current?.close(); setFilm(null); };
  return (
    <Section>
      <SectionHead title="Watch it work." sub="Real product, filmed on demo businesses. Each one is a job a team hands to an agent." />
      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4">
        {FILMS.map((f) => {
          const files = filmFiles(f.slug);
          return (
            <li key={f.slug}>
              <button type="button" aria-label={`Watch ${f.title}`} onClick={() => open(f)} className="group block w-full text-left">
                <span className="relative block aspect-square overflow-hidden rounded-2xl bg-ivory">
                  <LoopVideo src={files.loop} poster={files.poster} className="h-full w-full object-cover" />
                  <span className="absolute bottom-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink"><Play size={16} /></span>
                </span>
                <span className="mt-3 block text-[15px] font-medium text-ink">{f.title}</span>
                <span className="block text-[13px] text-ink/50">{f.business} · demo</span>
              </button>
            </li>
          );
        })}
      </ul>
      <dialog ref={dialog} onClose={() => setFilm(null)} className="w-[min(92vw,720px,85dvh)] rounded-2xl bg-night p-0 backdrop:bg-black/70">
        <div className="aspect-square w-full">
          {film && <video src={filmFiles(film.slug).film} poster={filmFiles(film.slug).poster} controls autoPlay playsInline className="block h-full w-full" />}
        </div>
        <button type="button" onClick={close} aria-label="Close film" className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink"><X size={18} /></button>
      </dialog>
    </Section>
  );
}

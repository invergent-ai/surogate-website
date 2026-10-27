'use client';

import { useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import { VideoFrame } from '@/components/site/ProductMedia';
import { FILMS, filmFiles } from '@/lib/films';

// A film's 16:10 loop in its window; a click plays the full (square) film in a dialog.
// The business is fictional, so the caption always says demo.
export default function FilmCard({ slug, caption, id }) {
  const f = FILMS.find((x) => x.slug === slug);
  const files = filmFiles(slug);
  const dialog = useRef(null);
  const [open, setOpen] = useState(false);
  const close = () => { dialog.current?.close(); setOpen(false); };
  return (
    <figure id={id} className="m-0 scroll-mt-20">
      <button type="button" aria-label={`Watch ${f.title}`} onClick={() => { setOpen(true); dialog.current?.showModal(); }} className="group block w-full text-left">
        <VideoFrame src={files.loop} poster={files.poster} />
        <span className="mt-3 flex items-start justify-between gap-4">
          <span>
            <span className="block text-[14px] font-medium leading-[1.4] text-ink">{caption || f.title}</span>
            <span className="mt-0.5 block text-[13px] text-ink/55">{f.business}, a demo business</span>
          </span>
          <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-stone px-3 text-[13px] font-medium text-ink transition-colors duration-150 ease-[cubic-bezier(.4,0,.2,1)] group-hover:bg-hairline"><Play size={12} />Watch</span>
        </span>
      </button>
      <dialog ref={dialog} onClose={() => setOpen(false)} className="w-[min(92vw,720px,85dvh)] rounded-2xl bg-night p-0 backdrop:bg-black/70">
        <div className="aspect-square w-full">
          {open && <video src={files.film} poster={files.poster} controls autoPlay playsInline className="block h-full w-full" />}
        </div>
        <button type="button" onClick={close} aria-label="Close film" className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink"><X size={18} /></button>
      </dialog>
    </figure>
  );
}

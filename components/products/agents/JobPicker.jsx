'use client';

import { useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import LoopVideo from '@/components/site/LoopVideo';
import { RabbitAvatar } from '@/components/site/Rabbit';
import FilmVideo from '@/components/site/FilmVideo';
import { FILMS, filmFiles } from '@/lib/films';

// One job per demo business, each filmed on the local stack. The chip picks the job; the window shows that
// agent at work, and the full film opens with sound. Every window is stacked in one 16:10 box and crossfades.
export const JOBS = [
  { slug: 'vandijk-approval', job: 'Logistics', line: 'Checks a supplier statement against the payables policy, then holds the €12,400 payment until a person says yes.' },
  { slug: 'clarke-knee-photo', job: 'Health', line: 'Checks in on a patient after knee surgery, reads the photo they send and tells the physio what needs a look.' },
  { slug: 'ortega-monday-leads', job: 'Real estate', line: 'Turns the Monday leads into property viewings on the week\'s calendar.' },
  { slug: 'pop-glossary-conflict', job: 'Legal', line: 'Translates a contract with the client\'s glossaries, and marks the term where two of them disagree instead of picking one.' },
  { slug: 'ursu-whiteboard', job: 'Education', line: 'Works a maths problem on the whiteboard with a student, giving hints instead of the answer.' },
  { slug: 'mette-first-buyer', job: 'Small business', line: 'A baker sells her own agent. Her first buyer starts a trial on her Stripe checkout.' },
];
const COLORS = ['#2a102d', '#a85d00', '#5b4a3a', '#3d1d42', '#0a0a0a', '#6b4f2a'];

export default function JobPicker() {
  const [i, setI] = useState(0);
  // Only footage that has been picked is mounted, so the page opens with one poster, not six.
  const [seen, setSeen] = useState([0]);
  const pick = (n) => { setI(n); setSeen((s) => (s.includes(n) ? s : [...s, n])); };
  const dialog = useRef(null);
  const [open, setOpen] = useState(false);
  const film = FILMS.find((f) => f.slug === JOBS[i].slug);
  const play = () => { setOpen(true); dialog.current?.showModal(); };
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
      <div>
        <div role="tablist" aria-label="Markets" className="flex flex-wrap gap-2">
          {JOBS.map((j, n) => (
            <button key={j.slug} type="button" role="tab" aria-selected={n === i} onClick={() => pick(n)}
              className={`inline-flex h-9 items-center gap-2 rounded-full pr-3.5 text-[14px] transition-colors duration-150 ease-in-out ${n === i ? 'bg-ink pl-1.5 text-white' : 'bg-stone pl-3.5 text-ink hover:bg-hairline'}`}>
              {n === i && <RabbitAvatar size={24} bg="#fff" ink={COLORS[n]} body="#fff" />}
              {j.job}
            </button>
          ))}
        </div>
        {/* Every line sits in one cell, so the tallest sets the height and switching never moves the page. */}
        <div className="mt-8 grid">
          {JOBS.map((j, n) => (
            <div key={j.slug} aria-hidden={n !== i} className={`[grid-area:1/1] transition-opacity duration-300 ${n === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
              <p className="m-0 text-[17px] leading-[1.55] text-ink md:text-[18px]">{j.line}</p>
              <p className="m-0 mt-3 text-[14px] text-ink/50">{FILMS.find((f) => f.slug === j.slug).business}, a demo business</p>
            </div>
          ))}
        </div>
        <button type="button" onClick={play} className="group mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-white transition duration-150 ease-in-out hover:brightness-90">
          <Play size={14} fill="currentColor" />Watch the film
        </button>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-white shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_-12px_rgba(0,0,0,.25)] ring-1 ring-ink/[.08]">
        {JOBS.map((j, n) => {
          const f = filmFiles(j.slug);
          return (
            <div key={j.slug} aria-hidden="true" className={`absolute inset-0 transition-opacity duration-500 ${n === i ? 'opacity-100' : 'opacity-0'}`}>
              {seen.includes(n) && <LoopVideo src={f.loop} poster={f.poster} className="h-full w-full object-contain" />}
            </div>
          );
        })}
      </div>
      <dialog ref={dialog} onClose={() => setOpen(false)} className="w-[min(92vw,720px,85dvh)] rounded-2xl bg-night p-0 backdrop:bg-black/70">
        <div className="aspect-square w-full">
          {open && <FilmVideo slug={film.slug} />}
        </div>
        <button type="button" onClick={() => dialog.current?.close()} aria-label="Close film" className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink"><X size={18} /></button>
      </dialog>
    </div>
  );
}

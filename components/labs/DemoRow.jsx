'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { ICONS } from './icons';
import { track } from '@/lib/analytics';
import ClampedText from './ClampedText';

/* One demo. A filmed one shows a silent loop while it is on screen; a click opens the whole film in its
   place. The rest show their screenshot and link to their Space on Hugging Face. */
export default function DemoRow({ demo, hidden = false, start = false }) {
  const [open, setOpen] = useState(false);
  const row = useRef(null);
  const loop = useRef(null);
  const Icon = ICONS[demo.icon];
  const film = demo.film;

  // The loop plays only while it can be seen, and never for someone who asked for less motion.
  useEffect(() => {
    const v = loop.current;
    if (!v || open || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, [open]);

  // A shared link (?demo=inbox) opens that film and brings it into view.
  useEffect(() => {
    if (!start) return;
    if (film) setOpen(true);
    row.current?.scrollIntoView({ block: 'start' });
  }, [start]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // className stays constant: useReveal adds `in` to it directly, and a re-rendered className
    // would drop that and hide the row. Open state lives in data-open instead.
    <article className="lab-demo reveal" data-open={open ? 'true' : 'false'} id={demo.slug} hidden={hidden} ref={row}>
      <div className="lab-media">
        {open ? (
          <div className="lab-film-open">
            <video
              src={film.src}
              poster={film.poster}
              controls
              autoPlay
              muted
              playsInline
              width="1920"
              height="1080"
              onEnded={() => track('labs_film_finished', { demo: demo.slug })}
            />
          </div>
        ) : film ? (
          <button
            type="button"
            className="lab-shot lab-film"
            aria-label={`Watch ${demo.title}`}
            onClick={() => {
              setOpen(true);
              track('labs_film_opened', { demo: demo.slug });
            }}
          >
            <video ref={loop} src={film.loop} poster={film.poster} muted loop playsInline preload="none"
              width="960" height="540" aria-hidden="true" />
            <span className="lab-play">
              <Play size={18} strokeWidth={2.25} aria-hidden="true" />
              Watch
            </span>
          </button>
        ) : (
          <a
            className="lab-shot"
            href={demo.page}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('labs_space_link_clicked', { demo: demo.slug, from: 'shot' })}
          >
            <img src={demo.shot} alt="" loading="lazy" width="1200" height="800" />
            <span className="lab-play">
              <ArrowUpRight size={18} strokeWidth={2.25} aria-hidden="true" />
              See it on Hugging Face
            </span>
          </a>
        )}
      </div>

      <div className="lab-text">
        <span className="lab-tag">
          {Icon && <Icon size={14} strokeWidth={2} aria-hidden="true" />}
          {demo.kind}
        </span>
        <h3 className="lab-demo-t">{demo.title}</h3>
        <ClampedText className="lab-demo-d">{demo.line}</ClampedText>
        <p className="lab-proves">{demo.proves}</p>
        <a
          className="lab-textlink"
          href={demo.page}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('labs_space_link_clicked', { demo: demo.slug })}
        >
          The Space on Hugging Face
          <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

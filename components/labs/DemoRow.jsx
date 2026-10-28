'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { ICONS } from './icons';
import { track } from '@/lib/analytics';
import ClampedText from './ClampedText';

/* One demo. A filmed one shows a silent loop while it is on screen; Watch plays the whole film in the same
   window. The rest show their screenshot and link to their Space on Hugging Face. */
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
        {/* Every demo sits in the same 16:10 window, contained, so opening a film never moves the page. */}
        <div className="lab-window">
          {open ? (
            <video src={film.src} poster={film.poster} controls autoPlay muted playsInline width="1920" height="1080"
              onEnded={() => track('labs_film_finished', { demo: demo.slug })} />
          ) : film ? (
            <video ref={loop} src={film.loop} poster={film.poster} muted loop playsInline preload="none"
              width="960" height="540" aria-hidden="true" />
          ) : (
            <img src={demo.shot} alt="" loading="lazy" width="1200" height="800" />
          )}
        </div>
        <div className="lab-media-foot">
          {film ? (
            <button type="button" className="lab-watch" aria-label={`Watch ${demo.title}`} disabled={open}
              onClick={() => { setOpen(true); track('labs_film_opened', { demo: demo.slug }); }}>
              <Play size={12} aria-hidden="true" />{open ? 'Playing the film' : 'Watch the film'}
            </button>
          ) : (
            <a className="lab-watch" href={demo.page} target="_blank" rel="noopener noreferrer"
              onClick={() => track('labs_space_link_clicked', { demo: demo.slug, from: 'shot' })}>
              <ArrowUpRight size={12} aria-hidden="true" />Open the Space
            </a>
          )}
        </div>
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
          <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

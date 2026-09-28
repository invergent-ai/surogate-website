'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { ICONS } from './icons';
import { track } from '@/lib/analytics';
import { embedSrc } from '@/lib/labs';

/* One demo: a screenshot that becomes the live Space on click. The iframe is
   only created on click, so the page does not wake five Spaces on load, and
   the link to the Space page is always there for when a Space is asleep. */
export default function DemoRow({ demo, hidden = false, start = null }) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(demo.embed);
  const row = useRef(null);
  const [height, setHeight] = useState(null);
  const frame = useRef(null);
  const Icon = ICONS[demo.icon];

  /* Each Space posts {type: 'rune-labs:height', height} as its content grows (embed.js in the labs
     repo), so the frame fits the demo and nothing scrolls inside it. Only this frame is trusted. */
  useEffect(() => {
    if (!open) return undefined;
    const onMessage = (e) => {
      if (e.source !== frame.current?.contentWindow) return;
      if (e.origin !== new URL(demo.embed).origin) return;
      if (e.data?.type !== 'rune-labs:height') return;
      const h = Number(e.data.height);
      if (Number.isFinite(h)) setHeight(Math.min(Math.max(Math.round(h), 320), 4000));
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [open, demo.embed]);

  /* The page URL is only known in the browser, so the address (with the share link) is set on opening.
     start holds the settings of a shared link that asked for this demo: open it and bring it into view. */
  const openDemo = (params = {}) => {
    setSrc(embedSrc(demo, window.location.href, params));
    setOpen(true);
  };
  useEffect(() => {
    if (!start) return;
    openDemo(start);
    row.current?.scrollIntoView({ block: 'start' });
  }, [start]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // className stays constant: useReveal adds `in` to it directly, and a re-rendered className
    // would drop that and hide the row. Open state lives in data-open instead.
    <article className="lab-demo reveal" data-open={open ? 'true' : 'false'} id={demo.slug} hidden={hidden} ref={row}>
      <div className="lab-media">
        {open ? (
          <iframe
            ref={frame}
            className="lab-frame"
            src={src}
            title={`${demo.title}, live demo`}
            allow="clipboard-write; web-share"
            scrolling="no"
            style={height ? { height: `${height}px` } : undefined}
          />
        ) : (
          <button
            type="button"
            className="lab-shot"
            aria-label={`Open the live ${demo.title} demo`}
            onClick={() => {
              openDemo();
              track('labs_demo_opened', { demo: demo.slug });
            }}
          >
            <img src={demo.shot} alt="" loading="lazy" width="1200" height="800" />
            <span className="lab-play">
              <Play size={18} strokeWidth={2.25} aria-hidden="true" />
              Try it live
            </span>
          </button>
        )}
      </div>

      <div className="lab-text">
        <span className="lab-tag">
          {Icon && <Icon size={14} strokeWidth={2} aria-hidden="true" />}
          {demo.kind}
        </span>
        <h3 className="lab-demo-t">{demo.title}</h3>
        <p className="lab-demo-d">{demo.line}</p>
        <p className="lab-proves">{demo.proves}</p>
        <a
          className="lab-textlink"
          href={demo.page}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('labs_space_link_clicked', { demo: demo.slug })}
        >
          Open on Hugging Face
          <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

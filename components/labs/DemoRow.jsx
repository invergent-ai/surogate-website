'use client';

import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { ICONS } from './icons';
import { track } from '@/lib/analytics';

/* One demo: a screenshot that becomes the live Space on click. The iframe is
   only created on click, so the page does not wake five Spaces on load, and
   the link to the Space page is always there for when a Space is asleep. */
export default function DemoRow({ demo }) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[demo.icon];

  return (
    <article className={`lab-demo reveal${open ? ' is-open' : ''}`} id={demo.slug}>
      <div className="lab-media">
        {open ? (
          <iframe
            className="lab-frame"
            src={demo.embed}
            title={`${demo.title}, live demo`}
            allow="clipboard-write"
          />
        ) : (
          <button
            type="button"
            className="lab-shot"
            aria-label={`Open the live ${demo.title} demo`}
            onClick={() => {
              setOpen(true);
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

'use client';

import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductMedia, { isFootage } from '@/components/site/ProductMedia';
import Section, { SectionHead } from '@/components/site/Section';
import { PRODUCTS } from '@/lib/products';
import { amamiSrc } from '@/lib/labs';

function Explore() {
  return <span className="inline-flex items-center gap-1 text-[14px] opacity-70 transition-opacity duration-150 ease-in-out group-hover:opacity-100">Explore <ArrowRight size={14} className="nudge" /></span>;
}

// Amami speaks when the rabbit is pressed: the voice product's greeting sample. A sibling of the
// tile's link, laid over the visual, since a button cannot sit inside a link.
function Speak({ speak }) {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <button type="button" aria-label={playing ? `Pause: ${speak.label}` : `Play: ${speak.label}`}
        onClick={() => (audio.current.paused ? audio.current.play().catch(() => {}) : audio.current.pause())}
        className="absolute inset-x-0 top-0 bottom-14 rounded-t-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink/30" />
      <audio ref={audio} src={amamiSrc(speak.voice, speak.sample)} preload="none"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />
    </>
  );
}

// Three rows of two on 24 columns, the wider tile alternating sides so the grid never looks ruled.
// Each mini UI fills its tile; the name row sits on a soft fade of the tile's own colour. Agents carries a
// recording, so it sits whole in its 16:10 window above that row.
const SURFACE = { grey: 'bg-stone !text-ink', night: 'bg-night !text-white', silver: 'bg-silver !text-ink' };
const FADE = { grey: 'from-stone via-stone/90', night: 'from-night via-night/90', silver: 'from-silver via-silver/90' };
const SPAN = {
  agents: 'lg:col-[span_13/span_13]', surogate: 'lg:col-[span_11/span_11]',
  voice: 'lg:col-[span_11/span_11]', keel: 'lg:col-[span_13/span_13]',
  train: 'lg:col-[span_13/span_13]', gateway: 'lg:col-[span_11/span_11]',
};

export default function Bento() {
  return (
    <Section>
      <SectionHead title="The platform." />
      <ul className="m-0 grid list-none gap-x-3 gap-y-8 p-0 md:grid-cols-2 lg:grid-cols-[repeat(24,minmax(0,1fr))]">
        {PRODUCTS.map((p) => {
          const media = 'tile-media absolute opacity-[.85]';
          return (
            <li key={p.key} className={`group relative ${SPAN[p.key]}`}>
              <div className="relative">
                <a href={p.href} className={`group relative block h-[220px] overflow-hidden rounded-2xl no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 md:h-[280px] lg:h-[300px] ${SURFACE[p.tone]}`}>
                  {isFootage(p.key)
                    ? <div className={`${media} inset-x-5 top-5 bottom-14 flex items-center justify-center [container-type:size]`} aria-hidden="true"><ProductMedia product={p} fit="w-[min(100cqw,160cqh)]" /></div>
                    : <div className={`${media} inset-x-0 top-0 bottom-10`} aria-hidden="true"><ProductMedia product={p} /></div>}
                  <div className={`absolute inset-x-0 bottom-0 flex h-16 items-end justify-between bg-gradient-to-t px-5 pb-4 ${FADE[p.tone]} to-transparent`}>
                    <span className="text-[15px] font-medium">{p.name}</span>
                    <Explore />
                  </div>
                </a>
                {p.speak && <Speak speak={p.speak} />}
              </div>
              <p className="m-0 mt-3 text-[14px] leading-[1.5] text-ink/65">{p.line}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

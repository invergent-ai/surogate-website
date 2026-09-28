'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * Long text clamped to a few lines on a phone (the clamp itself is CSS, so desktops show it all), with a "More"
 * button only when something is actually cut off: measured, not guessed.
 */
export default function ClampedText({ className = '', children }) {
  const el = useRef(null);
  const [open, setOpen] = useState(false);
  const [cut, setCut] = useState(false);

  useEffect(() => {
    const p = el.current;
    if (!p) return undefined;
    const measure = () => setCut(p.scrollHeight > p.clientHeight + 1);
    measure();
    const watch = new ResizeObserver(measure);
    watch.observe(p);
    return () => watch.disconnect();
  }, []);

  return (
    <>
      <p ref={el} className={`${className} clamp`} data-open={open ? 'true' : 'false'}>{children}</p>
      {(cut || open) && (
        <button type="button" className="clamp-more" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
    </>
  );
}

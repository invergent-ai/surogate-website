'use client';

import { useRef } from 'react';
import { Check, ChevronDown } from 'lucide-react';

/*
 * The phone form of a filter or a tab strip: one full-width trigger showing the current choice, which opens a
 * bottom sheet of options (surogate-ops Studio's rule: a sheet beats a dense strip or a dropdown). Built on the
 * native <dialog>: the browser gives focus trapping, Escape and the backdrop. Tap outside, or drag the handle
 * down, to close.
 */
export default function SheetSelect({ label, options, value, onPick }) {
  const sheet = useRef(null);
  const drag = useRef(null);
  const current = options.find((o) => o.key === value) || options[0];

  const close = () => sheet.current?.close();
  const pick = (key) => { onPick(key); close(); };

  return (
    <div className="sheet-select">
      <button type="button" className="sheet-trigger" aria-haspopup="dialog" onClick={() => sheet.current?.showModal()}>
        <span className="sheet-trigger-l">{label}</span>
        <span className="sheet-trigger-v">{current.label}</span>
        {current.count !== undefined && <span className="sheet-count">{current.count}</span>}
        <ChevronDown size={18} strokeWidth={2} aria-hidden="true" />
      </button>
      <dialog
        className="sheet"
        aria-label={label}
        ref={sheet}
        onClick={(e) => { if (e.target === sheet.current) close(); }}  // a click on the backdrop lands on the dialog itself
      >
        <div
          className="sheet-handle"
          aria-hidden="true"
          onPointerDown={(e) => { drag.current = e.clientY; e.currentTarget.setPointerCapture(e.pointerId); }}
          onPointerMove={(e) => {
            if (drag.current === null) return;
            sheet.current.style.transform = `translateY(${Math.max(0, e.clientY - drag.current)}px)`;
          }}
          onPointerUp={(e) => {
            const moved = drag.current === null ? 0 : e.clientY - drag.current;
            drag.current = null;
            sheet.current.style.transform = '';
            if (moved > 80) close();
          }}
        />
        <p className="sheet-title">{label}</p>
        <div role="radiogroup" aria-label={label}>
          {options.map((o) => (
            <button type="button" role="radio" aria-checked={o.key === current.key} key={o.key} className="sheet-option"
                    onClick={() => pick(o.key)}>
              <span>{o.label}</span>
              {o.count !== undefined && <span className="sheet-count">{o.count}</span>}
              {o.key === current.key && <Check size={18} strokeWidth={2.25} aria-hidden="true" />}
            </button>
          ))}
        </div>
      </dialog>
    </div>
  );
}

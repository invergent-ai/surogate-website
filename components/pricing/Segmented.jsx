'use client';

import { useLayoutEffect, useRef, useState } from 'react';

// A segmented switch whose white thumb slides under the chosen option. The thumb is measured, so
// labels keep their natural widths; arrows move the choice, as in a native radio group.
export default function Segmented({ options, value, onChange, label, size = 'md', role = 'tablist', controls }) {
  const list = useRef(null);
  const [thumb, setThumb] = useState(null);
  const i = options.findIndex((o) => o.id === value);
  useLayoutEffect(() => {
    const measure = () => {
      const el = list.current?.children[i + 1];
      if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [i]);
  const onKey = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const n = (i + step + options.length) % options.length;
    onChange(options[n].id);
    list.current?.children[n + 1]?.focus();
  };
  const h = size === 'sm' ? 'h-8 px-3 text-[13px]' : 'h-9 px-4 text-[14px] md:px-5';
  const tab = role === 'tablist';
  return (
    <div ref={list} role={tab ? 'tablist' : 'radiogroup'} aria-label={label} onKeyDown={onKey}
      className="relative inline-flex rounded-full bg-stone p-1">
      <span aria-hidden="true" style={thumb ? { left: thumb.left, width: thumb.width } : { opacity: 0 }}
        className={`absolute top-1 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,.08),0_0_0_1px_rgba(0,0,0,.04)] transition-[left,width] duration-300 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none ${size === 'sm' ? 'h-8' : 'h-9'}`} />
      {options.map((o, n) => (
        <button key={o.id} type="button" role={tab ? 'tab' : 'radio'} {...(tab ? { 'aria-selected': n === i, 'aria-controls': controls?.(o.id) } : { 'aria-checked': n === i })}
          tabIndex={n === i ? 0 : -1} onClick={() => onChange(o.id)}
          className={`relative whitespace-nowrap rounded-full font-medium transition-colors duration-150 ease-[cubic-bezier(.4,0,.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 ${h} ${n === i ? 'text-ink' : 'text-ink/55 hover:text-ink'}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

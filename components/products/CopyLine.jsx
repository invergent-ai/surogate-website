'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { track } from '@/lib/analytics';

// A shell line with a copy button. The line scrolls sideways inside its box on a phone; the box never grows.
export default function CopyLine({ text, event, location, dark = false, className = '' }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    if (event) track(event, { location });
    setDone(true);
    setTimeout(() => setDone(false), 1500);
  };
  return (
    <div className={`flex h-12 min-w-0 items-center gap-2 rounded-full pl-5 pr-1.5 ${dark ? 'bg-night text-cream ring-1 ring-cream/15' : 'bg-white text-ink ring-1 ring-hairline'} ${className}`}>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[13px] [scrollbar-width:none]">
        <span className={dark ? 'text-sun' : 'text-ink/40'} aria-hidden="true">$ </span>{text}
      </code>
      <button type="button" onClick={copy} aria-label={done ? 'Copied' : 'Copy the command'}
        className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-colors duration-150 ease-in-out ${dark ? 'bg-cream/10 hover:bg-cream/15' : 'bg-stone hover:bg-hairline'}`}>
        {done ? <Check size={14} /> : <Copy size={14} />}<span className="w-[46px] text-left">{done ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}

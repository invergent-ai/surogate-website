'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

// Tall enough for the longest snippet plus a scrollbar, so switching tabs never moves the page.
const lines = (tabs) => Math.max(...tabs.map((t) => t.code.split('\n').length));

export default function CodeTabs({ tabs }) {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(tabs[i].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="min-w-0 overflow-hidden rounded-[12px] border border-white/10 bg-white text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,.45)]">
      <div className="flex items-center justify-between border-b border-hairline px-3">
        <div role="tablist" aria-label="Language" className="flex">
          {tabs.map((t, n) => (
            <button key={t.label} type="button" role="tab" aria-selected={n === i} onClick={() => setI(n)}
              className={`px-3 py-3 text-[13px] ${n === i ? 'font-medium text-ink shadow-[inset_0_-2px_0_#0a0a0a]' : 'text-ink/50'}`}>{t.label}</button>
          ))}
        </div>
        <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 text-[13px] text-ink/60">
          {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre role="tabpanel" style={{ height: `calc(${lines(tabs)} * 1.7em + 2.5rem + 16px)` }} className="m-0 overflow-auto !bg-white p-5 font-mono text-[13px] leading-[1.7] text-ink">{tabs[i].code}</pre>
    </div>
  );
}

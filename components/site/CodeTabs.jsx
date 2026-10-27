'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

// Tall enough for the longest snippet plus a scrollbar, so switching tabs never moves the page.
const lines = (tabs) => Math.max(...tabs.map((t) => t.code.split('\n').length));

// A light code card with its language tabs underneath as soft pills; the pill slides, the code swaps.
export default function CodeTabs({ tabs }) {
  const [i, setI] = useState(0);
  const [pill, setPill] = useState(null);
  const [copied, setCopied] = useState(false);
  const list = useRef(null);
  useLayoutEffect(() => {
    const measure = () => {
      const t = list.current?.children[i + 1];
      if (t) setPill({ left: t.offsetLeft, width: t.offsetWidth });
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [i]);
  const copy = async () => {
    await navigator.clipboard.writeText(tabs[i].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const onKey = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    const n = (i + step + tabs.length) % tabs.length;
    setI(n);
    list.current?.children[n + 1]?.focus();
  };
  return (
    <div className="min-w-0">
      <div className="overflow-hidden rounded-xl border border-hairline bg-white text-ink shadow-[0_24px_60px_-28px_rgba(26,10,28,.55)]">
        <div className="flex h-11 items-center justify-between border-b border-hairline pl-4 pr-1.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <button type="button" onClick={copy} className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] text-ink/60 transition-colors duration-150 ease-in-out hover:bg-stone hover:text-ink">
            {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre role="tabpanel" style={{ height: `calc(${lines(tabs)} * 1.7em + 2.5rem + 16px)` }} className="m-0 overflow-auto !bg-white p-5 font-mono text-[13px] leading-[1.7] text-ink">{tabs[i].code}</pre>
      </div>
      <div ref={list} role="tablist" aria-label="Language" onKeyDown={onKey} className="relative mx-auto mt-4 flex w-fit rounded-full bg-white/15 p-1 backdrop-blur-sm">
        <span aria-hidden="true" style={pill ? { left: pill.left, width: pill.width } : { opacity: 0 }}
          className="absolute top-1 h-8 rounded-full bg-white transition-[left,width] duration-150 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none" />
        {tabs.map((t, n) => (
          <button key={t.label} type="button" role="tab" aria-selected={n === i} tabIndex={n === i ? 0 : -1} onClick={() => setI(n)}
            className={`relative h-8 rounded-full px-3.5 text-[13px] font-medium transition-colors duration-150 ease-in-out ${n === i ? 'text-ink' : 'text-white/80 hover:text-white'}`}>{t.label}</button>
        ))}
      </div>
    </div>
  );
}

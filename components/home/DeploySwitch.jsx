'use client';

import { useRef, useState } from 'react';
import { track } from '@/lib/analytics';

export const DEPLOY_OPTIONS = [
  { name: 'Our EU cloud', line: 'Hosted in the EU. Start in minutes.' },
  { name: 'Your cloud', line: 'Your account, your region, your keys.' },
  { name: 'Your hardware', line: 'On your servers, managed by your team.' },
  { name: 'Air-gapped', line: 'No connection out. Models included.' },
];

export default function DeploySwitch() {
  const [i, setI] = useState(0);
  const group = useRef(null);
  const pick = (n) => {
    if (n === i) return;
    setI(n);
    track('deploy_option_selected', { option: DEPLOY_OPTIONS[n].name });
  };
  // Roving focus, as a native radio group does: arrows move and select, Tab leaves the group.
  const onKey = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const n = (i + step + DEPLOY_OPTIONS.length) % DEPLOY_OPTIONS.length;
    pick(n);
    group.current?.children[n]?.focus();
  };
  return (
    <div className="mx-auto mt-14 max-w-[640px]">
      <p id="deploy-q" className="m-0 text-[13px] font-medium uppercase tracking-[0.08em] text-ink/45">Where should it run?</p>
      <div ref={group} role="radiogroup" aria-labelledby="deploy-q" onKeyDown={onKey}
        className="mt-4 grid grid-cols-2 gap-1 rounded-[14px] border border-hairline bg-stone p-1 sm:grid-cols-4">
        {DEPLOY_OPTIONS.map((o, n) => (
          <button key={o.name} type="button" role="radio" aria-checked={n === i} tabIndex={n === i ? 0 : -1} onClick={() => pick(n)}
            className={`h-10 rounded-[10px] px-3 text-[14px] transition-colors ${n === i ? 'bg-white font-medium text-ink shadow-[0_1px_2px_rgba(0,0,0,.08),0_0_0_1px_#e4e4e7]' : 'text-ink/60 hover:text-ink'}`}>
            {o.name}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="m-0 mt-4 min-h-[1.6em] text-[16px] leading-[1.6] text-ink/70">{DEPLOY_OPTIONS[i].line}</p>
    </div>
  );
}

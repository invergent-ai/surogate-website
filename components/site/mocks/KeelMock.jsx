'use client';

import { useRef } from 'react';
import { useLive } from '@/components/site/Rings';
import { CASE, STAGES, STATUS } from '@/components/products/keel/vandijk';

// The Keel page's board (components/keel/BoardFlow.jsx) at tile size: the Van Dijk invoice walks the four
// stages on a 12 s loop while on screen. Its resting frame, and reduced motion, is the case paid and closed.
// The styles ride along with the tile because the home page doesn't load the Keel page's CSS.
const CSS = `
.km-lane { container-type: inline-size; }
.km-case { --x: calc((100cqw - 18px) / 4 + 6px); margin-left: 5px; width: calc((100cqw - 18px) / 4 - 10px); transform: translateX(calc(var(--x) * 3)); }
.km-st { opacity: 0; } .km-st5 { opacity: 1; }
.km[data-live] :is(.km-case, .km-st, .km-sel) { animation: 12s cubic-bezier(.16, 1, .3, 1) infinite both; }
.km[data-live] .km-case { animation-name: km-case; }
@keyframes km-case { 0% { opacity: 0; transform: translate(0, 6px); } 4%, 14% { opacity: 1; transform: translate(0, 0); }
  21%, 64% { opacity: 1; transform: translateX(var(--x)); } 71%, 80% { opacity: 1; transform: translateX(calc(var(--x) * 2)); }
  87%, 95% { opacity: 1; transform: translateX(calc(var(--x) * 3)); } 100% { opacity: 0; transform: translateX(calc(var(--x) * 3)); } }
.km[data-live] .km-sel { animation-name: km-sel; }
@keyframes km-sel { 0%, 18% { opacity: 0; } 22%, 64% { opacity: 1; } 68%, 100% { opacity: 0; } }
.km[data-live] .km-st1 { animation-name: km-st1; } .km[data-live] .km-st2 { animation-name: km-st2; }
.km[data-live] .km-st3 { animation-name: km-st3; } .km[data-live] .km-st4 { animation-name: km-st4; }
.km[data-live] .km-st5 { animation-name: km-st5; }
@keyframes km-st1 { 0%, 17% { opacity: 1; } 19%, 100% { opacity: 0; } }
@keyframes km-st2 { 0%, 17% { opacity: 0; } 19%, 34% { opacity: 1; } 36%, 100% { opacity: 0; } }
@keyframes km-st3 { 0%, 34% { opacity: 0; } 36%, 51% { opacity: 1; } 53%, 100% { opacity: 0; } }
@keyframes km-st4 { 0%, 51% { opacity: 0; } 53%, 68% { opacity: 1; } 70%, 100% { opacity: 0; } }
@keyframes km-st5 { 0%, 68% { opacity: 0; } 70%, 100% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .km[data-live] * { animation: none !important; } }
`;

export default function KeelMock() {
  const ref = useRef(null);
  useLive(ref);
  return (
    <div ref={ref} className="km flex h-full items-center justify-center px-5 py-4 text-ink">
      <style>{CSS}</style>
      <div className="w-full max-w-[460px]">
        <p className="m-0 mb-2 px-0.5 text-[12px] text-ink/55"><span className="font-medium text-ink">Supplier payments</span>, {CASE.business}</p>
        <div className="relative grid grid-cols-4 gap-1.5">
          {STAGES.map((s, i) => (
            <div key={s.name} className="relative min-w-0 rounded-lg bg-white p-[5px] pb-[62px]">
              <p className="m-0 px-0.5 pb-1 text-[12px] font-medium">{s.name}</p>
              <p className="m-0 hidden rounded-md bg-stone px-1.5 py-1 text-[11px] leading-[1.3] text-ink/70 sm:block">{s.steps[0][0]}</p>
              {i === 1 && <span className="km-sel pointer-events-none absolute inset-0 rounded-lg border-[1.5px] border-ink opacity-0" />}
            </div>
          ))}
          <div className="km-lane pointer-events-none absolute inset-x-0 bottom-[5px]">
            <div className="km-case flex h-[52px] flex-col justify-center rounded-md border-[1.5px] border-sun bg-white px-1 sm:px-1.5">
              <span className="whitespace-nowrap text-[10px] font-medium tabular-nums sm:text-[11px]">{CASE.amount}</span>
              <span className="grid text-[10px] leading-[1.15] text-ink/65">
                {STATUS.map((t, k) => <span key={t} className={`km-st km-st${k + 1} [grid-area:1/1]`}>{t}</span>)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

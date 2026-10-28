'use client';

import { useState } from 'react';
import { FLASH_MARKET, PRESETS, pickFor, price } from '@/lib/gateway';

const ROW = 52;

// One model, the providers that serve it, and the router's choice under each preset. The highlight slides to the
// provider that answers first; the rows never move. Every figure is the Flash model page on llm.buzz.
export default function Market() {
  const [preset, setPreset] = useState('smart');
  const pick = pickFor(preset);
  const p = PRESETS.find((x) => x.key === preset);
  return (
    <div className="rounded-2xl bg-white p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="m-0 flex items-center gap-2 text-[14px]">
          <span className="text-ink/50">Request</span>
          <code className="rounded-md bg-white px-2 py-1 font-mono text-[13px] ring-1 ring-ink/[.06]">{FLASH_MARKET.model}</code>
        </p>
        <div role="tablist" aria-label="Routing preset" className="flex rounded-full bg-stone p-1">
          {PRESETS.map((x) => (
            <button key={x.key} type="button" role="tab" aria-selected={x.key === preset} onClick={() => setPreset(x.key)}
              className={`h-8 rounded-full px-3.5 text-[13px] font-medium transition-colors duration-150 ease-in-out ${x.key === preset ? 'bg-white text-ink shadow-[0_0_0_1px_rgba(10,10,10,.06)]' : 'text-ink/60 hover:text-ink'}`}>{x.label}</button>
          ))}
        </div>
      </div>
      <div className="relative mt-6 overflow-x-auto">
        <table className="relative w-full border-collapse text-[13px] sm:text-[14px] tabular-nums">
          <thead>
            <tr className="h-9 text-left text-[12px] text-ink/50">
              <th className="px-2 sm:px-4 font-normal">Provider</th>
              <th className="hidden px-2 sm:px-4 font-normal sm:table-cell">Region</th>
              <th className="px-2 sm:px-4 text-right font-normal">Input / M</th>
              <th className="px-2 sm:px-4 text-right font-normal">Output / M</th>
              <th className="px-2 sm:px-4 text-right font-normal">First token</th>
            </tr>
          </thead>
          <tbody className="relative">
            {FLASH_MARKET.providers.map((x, i) => (
              <tr key={x.name} style={{ height: ROW }} className={`relative border-t border-ink/[.07] transition-colors duration-300 ${i === pick ? 'bg-white' : ''}`}>
                <td className="px-2 sm:px-4 font-medium">
                  {x.name}
                  <span className={`block text-[12px] sm:ml-2 sm:inline font-normal text-[#a85d00] transition-opacity duration-300 ${i === pick ? 'opacity-100' : 'opacity-0'}`}>answers first</span>
                </td>
                <td className="hidden px-2 sm:px-4 text-ink/60 sm:table-cell">{x.region}</td>
                <td className="px-2 sm:px-4 text-right">{price(x.input)}</td>
                <td className="px-2 sm:px-4 text-right">{price(x.output)}</td>
                <td className="px-2 sm:px-4 text-right">{x.firstToken.toFixed(2)} s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 grid">
        {PRESETS.map((x) => (
          <p key={x.key} aria-hidden={x !== p} className={`m-0 text-[14px] leading-[1.55] text-ink/65 transition-opacity duration-300 [grid-area:1/1] ${x === p ? 'opacity-100' : 'opacity-0'}`}>
            <span className="font-medium text-ink">{x.label}:</span> {x.line} If {FLASH_MARKET.providers[pickFor(x.key)].name} errors or times out, the next provider answers.
          </p>
        ))}
      </div>
      <p className="m-0 mt-4 text-[12px] text-ink/45">Surogate 3.7 Flash on llm.buzz, 27 Oct 2026. Prices in USD per million tokens; first token is the 24-hour median.</p>
    </div>
  );
}

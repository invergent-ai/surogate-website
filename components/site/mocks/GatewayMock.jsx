import { MARKET, PROMISE, RANKS } from '@/lib/llmbuzz';

// llm.buzz as a market: one model, its live providers and their posted prices. The list re-ranks by the
// cheapest preset, then the fastest, and whoever is on top takes the request. Rows grow with a tall box so
// the market fills it. Reduced motion holds the cheapest ranking.
const ORDER = { a: RANKS.cheapest, b: RANKS.fastest };
const rank = (set, p) => ORDER[set].indexOf(p);
const frame = (p, set) => `transform:translateY(calc(var(--row) * ${rank(set, p)}));color:${rank(set, p) ? 'rgba(243,234,216,.75)' : '#ffaf10'}`;
const CSS = MARKET.providers.map((p, i) => `@keyframes mk-${i}{0%,42%,100%{${frame(p, 'a')}}50%,92%{${frame(p, 'b')}}}.mk-${i}{${frame(p, 'a')};animation:mk-${i} 8s cubic-bezier(.16,1,.3,1) infinite}`).join('')
  + '@keyframes mk-a{0%,42%,100%{opacity:1}50%,92%{opacity:0}}@keyframes mk-b{0%,42%,100%{opacity:0}50%,92%{opacity:1}}'
  + '.mk-a{animation:mk-a 8s cubic-bezier(.16,1,.3,1) infinite}.mk-b{opacity:0;animation:mk-b 8s cubic-bezier(.16,1,.3,1) infinite}'
  + '@media (prefers-reduced-motion:reduce){[class*="mk-"]{animation:none!important}}';

const Swap = ({ a, b }) => (
  <span className="inline-grid">
    <span className="mk-a [grid-area:1/1]">{a}</span>
    <span className="mk-b [grid-area:1/1]">{b}</span>
  </span>
);

export default function GatewayMock() {
  const n = MARKET.providers.length;
  return (
    <div className="h-full [container-type:size]">
      <div className="flex h-full flex-col justify-center gap-4 px-5 py-5 text-cream [--row:clamp(22px,8cqh,36px)]">
        <style>{CSS}</style>
        <div className="[@container(max-height:200px)]:hidden">
          <p className="m-0 text-[16px] font-medium leading-[1.3]">Every model. Providers compete for each request.</p>
          <p className="m-0 mt-1 hidden text-[13px] text-cream/55 sm:block">{PROMISE}</p>
        </div>
        <div className="font-mono text-[13px]">
          <p className="m-0 flex gap-x-2 whitespace-nowrap border-b border-white/10 pb-2 text-cream/55">
            <span className="text-cream">{MARKET.model}</span>
            <span>· <Swap a="cheapest" b="fastest" /></span>
            <span>→ <span className="text-sun"><Swap a={ORDER.a[0].name} b={ORDER.b[0].name} /></span></span>
          </p>
          <div className="relative mt-1 min-h-0 overflow-hidden" style={{ height: `min(calc(var(--row) * ${n}), 50cqh)` }}>
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[var(--row)] rounded-md bg-white/[.07]" />
            {MARKET.providers.map((p, i) => (
              <p key={p.name} className={`mk-${i} absolute inset-x-0 top-0 m-0 grid h-[var(--row)] grid-cols-[1fr_9ch_7ch] items-center gap-3 whitespace-nowrap px-2`}>
                <span className="truncate">{p.name}</span>
                <span className="text-right tabular-nums">{p.input}</span>
                <span className="text-right tabular-nums">{p.firstToken.toFixed(2)} s</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

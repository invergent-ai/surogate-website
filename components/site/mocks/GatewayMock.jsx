// Both sides of the AI Gateway: llm.buzz hosted, Surogate Router self-hosted. A router log moves up a line
// at a time: who called, the alias they asked for, and where it went, with one failover and one budget stop.
// Aliases, failover on timeouts and budgets are what the Router README describes; the providers are ones it
// or llm.buzz lists. Reduced motion shows the first lines, still.
const LOG = [
  ['agent:ap-clerk', 'opus-5', [['Anthropic', 'ok']]],
  ['team:legal', 'surogate3.7-flash', [['Surogate Spark EU', 'ok']]],
  ['agent:support', 'sonnet-5', [['Bedrock', 'timeout'], ['Vertex AI', 'ok']]],
  ['team:marketing', 'opus-5', [['budget reached', 'stop']]],
  ['user:ana', 'gpt-6.1-sol', [['OpenAI', 'ok']]],
  ['agent:intake', 'surogate3.7-flash', [['Simpleminds EU', 'ok']]],
];
const LINE = 26;
// One beat per line, 1.2s each: hold, then slide up one line. Built from LOG so the beats follow its length.
const KEYS = LOG.map((_, i) => `${(i / LOG.length) * 100}%,${((i + 0.7) / LOG.length) * 100}%{transform:translateY(-${i * LINE}px)}`).join('')
  + `100%{transform:translateY(-${LOG.length * LINE}px)}`;

function Hop([name, how], last) {
  if (how === 'stop') return <span key={name} className="text-[#ff7a66]">{name} ✕</span>;
  if (how === 'ok') return <span key={name}><span className="text-cream">{name}</span> <span className="text-sun">✓</span></span>;
  return <span key={name} className="text-cream/40">{name} ✕ {how}{last ? '' : ' → '}</span>;
}

function Lines({ hidden }) {
  return (
    <div aria-hidden={hidden || undefined}>
      {LOG.map(([who, alias, hops], i) => (
        <p key={i} className="m-0 grid h-[26px] grid-cols-[17ch_1fr] items-center gap-4 whitespace-nowrap md:grid-cols-[14ch_17ch_1fr]">
          <span className="hidden truncate text-cream/40 md:block">{who}</span>
          <span className="truncate text-cream/75">{alias}</span>
          <span className="truncate">{hops.map((h, j) => Hop(h, j === hops.length - 1))}</span>
        </p>
      ))}
    </div>
  );
}

export default function GatewayMock() {
  return (
    <div className="flex h-full flex-col gap-4 px-5 pt-5 text-cream">
      <style>{`@keyframes router-log{${KEYS}}.router-log{animation:router-log ${LOG.length * 1.2}s cubic-bezier(.16,1,.3,1) infinite}@media (prefers-reduced-motion:reduce){.router-log{animation:none}}`}</style>
      <div>
        <p className="m-0 text-[16px] font-medium leading-[1.3]">One endpoint. Every model. Your rules.</p>
        <p className="m-0 mt-1 hidden text-[13px] text-cream/55 sm:block">Hosted on llm.buzz, or self-hosted with Surogate Router</p>
      </div>
      <div className="fade-y h-[78px] overflow-hidden font-mono text-[13px] md:h-[130px]">
        <div className="router-log"><Lines /><Lines hidden /></div>
      </div>
    </div>
  );
}

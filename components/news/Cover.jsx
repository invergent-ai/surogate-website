import Rabbit from '@/components/site/Rabbit';

// Post covers: our palette and our own marks, drawn in code, in the same language as the home page's
// "Our own models" cards. No photos, and no rings: covers stay clean. Light covers sit on stone so they
// read as a picture on the white page. `big` is the featured and post-page size.

const SPEECH_MARKS = [['/labs/speech/jackrabbit.svg', 'Jackrabbit'], ['/labs/speech/jackrabbit-streaming.svg', 'Streaming'], ['/labs/speech/amami.svg', 'Amami']];
const STAGES = [['Intake', 'System'], ['Checks', 'Agent'], ['Decision', 'Rule'], ['Offer', 'Person']];

// The simple rabbit mark is the Surogate model's own mark (owner's request), as on the home page's model card.
function Flash({ big }) {
  return (
    <span className="flex h-full flex-col items-center justify-center gap-3 bg-aubergine">
      <span className="text-sun" style={{ '--rabbit-bg': '#2a102d' }}><Rabbit size={big ? 136 : 64} /></span>
      <span className={`font-medium tracking-[0.01em] text-white/80 ${big ? 'text-[15px]' : 'text-[13px]'}`}>Surogate 3.7 Flash</span>
    </span>
  );
}

// llm.buzz as it is: one model slot, the providers that fill it with their own prices, the router's pick.
const OFFERS = [['Surogate Spark EU', '$0.15', '0.04 s', true], ['Simpleminds EU', '$0.10', '0.07 s', false]];
function Gateway({ big }) {
  return (
    <span className={`flex h-full flex-col justify-center bg-stone ${big ? 'px-[10%]' : 'px-5'}`}>
      <span className={`font-mono text-ink/60 ${big ? 'text-[13px]' : 'text-[10px]'}`}>surogate/surogate3.7-flash</span>
      <span className={`mt-2 flex flex-col overflow-hidden rounded-lg border border-hairline bg-white ${big ? 'text-[14px]' : 'text-[11px]'}`}>
        {OFFERS.map(([name, price, ttft, picked]) => (
          <span key={name} className={`flex items-center justify-between gap-3 border-hairline [&:not(:first-child)]:border-t ${big ? 'px-4 py-3' : 'px-3 py-2'} ${picked ? 'bg-sun/15' : ''}`}>
            <span className="font-medium text-ink">{name}</span>
            <span className="flex gap-3 tabular-nums text-ink/60"><span>{price}</span><span>{ttft}</span></span>
          </span>
        ))}
      </span>
    </span>
  );
}

function Speech({ big }) {
  return (
    <span className={`grid h-full grid-cols-3 items-center bg-stone ${big ? 'px-[12%]' : 'px-4'}`}>
      {SPEECH_MARKS.map(([src, label]) => (
        <span key={label} className="flex flex-col items-center gap-2">
          <img src={src} alt="" className={big ? 'h-16 w-16 md:h-24 md:w-24' : 'h-12 w-12 md:h-14 md:w-14'} />
          <span className={`text-aubergine/70 ${big ? 'text-[13px]' : 'text-[11px]'}`}>{label}</span>
        </span>
      ))}
    </span>
  );
}

function Engine({ big }) {
  return (
    <span className="flex h-full items-center justify-center bg-sun">
      <img src="/brand/logo-full-white.svg" alt="" className={`w-auto ${big ? 'h-10 md:h-14' : 'h-8'}`} />
    </span>
  );
}

// The fixed path from the Keel page, redrawn small: the agent works inside one step.
function Keel({ big }) {
  return (
    <span className={`flex h-full items-center justify-center bg-stone ${big ? 'px-[8%]' : 'px-3'}`}>
      <span className="flex w-full items-center">
        {STAGES.map(([stage, who], i) => (
          <span key={stage} className="contents">
            {i > 0 && <span className="h-px min-w-2 flex-1 bg-ink/25" />}
            <span className={`flex shrink-0 flex-col rounded-lg border bg-white ${who === 'Agent' ? 'border-sun' : 'border-hairline'} ${big ? 'gap-2 p-3 md:p-4' : 'gap-1.5 p-2'}`}>
              <span className={`font-medium text-ink ${big ? 'text-[13px] md:text-[15px]' : 'text-[11px]'}`}>{stage}</span>
              <span className={`self-start rounded-full px-1.5 py-px ${who === 'Agent' ? 'bg-sun text-aubergine' : 'bg-stone text-ink/60'} ${big ? 'text-[11px] md:text-[12px]' : 'text-[9px]'}`}>{who}</span>
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}

const COVERS = { flash: Flash, gateway: Gateway, speech: Speech, engine: Engine, keel: Keel };

export default function Cover({ kind, big = false }) {
  const C = COVERS[kind];
  return <span className="tile-media block h-full" aria-hidden="true"><C big={big} /></span>;
}

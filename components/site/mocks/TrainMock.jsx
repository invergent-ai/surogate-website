// A training run, start to curve, on one 7s loop: the trainer's own log streams in (the [Dataset] block and
// ":: step" lines use the engine's real formats), compacts to its last steps, and the loss curve draws below
// with a readout taken from the last step line. The numbers are illustrative. Everything rests on the last
// frame for reduced motion; the loop fades back in 300ms with the command still on screen.
const TOTAL = 3000;
const STEPS = [[200, 1.8421, 0.9312], [400, 1.5106, 0.884], [600, 1.3372, 0.7915], [800, 1.2264, 0.7408], [1000, 1.1593, 0.7021], [1200, 1.1207, 0.6833]];
const step = ([n, loss, norm]) => `:: step ${String(n).padStart(7)} [${((n / TOTAL) * 100).toFixed(1).padStart(5)}%] \\ loss ${loss.toFixed(4)} | norm  ${norm.toFixed(4)}`;
const LOG = ['[Dataset]', ' train:  2.4M tokens', ' eval:   120k tokens', "Starting training run 'support-ro'...", ...STEPS.map(step)];
const [lastStep, lastLoss] = STEPS[STEPS.length - 1];
const KEEP = 2;
const LH = 18;
const EASE = 'cubic-bezier(.16,1,.3,1)';
const UP = (LOG.length - KEEP) * LH;
const CSS = [
  ...LOG.map((_, i) => {
    const on = 4 + i * 2;
    const kept = i >= LOG.length - KEEP;
    return `@keyframes tr-l${i}{0%,${on}%{opacity:0;transform:translateY(4px)}${on + 2}%{opacity:1;transform:none}${kept ? '96%' : '32%'}{opacity:1}${kept ? '' : '38%,'}100%{opacity:0}}`
      + `.tr-l${i}{${kept ? '' : 'opacity:0;'}animation:tr-l${i} 7s ${EASE} infinite}`;
  }),
  `@keyframes tr-up{0%,32%{transform:none}40%,100%{transform:translateY(-${UP}px)}}.tr-up{transform:translateY(-${UP}px);animation:tr-up 7s ${EASE} infinite}`,
  `@keyframes tr-chart{0%,36%{opacity:0}44%,96%{opacity:1}100%{opacity:0}}.tr-chart{animation:tr-chart 7s ${EASE} infinite}`,
  `@keyframes tr-draw{0%,38%{stroke-dashoffset:400}62%,100%{stroke-dashoffset:0}}.tr-draw{animation:tr-draw 7s ${EASE} infinite}`,
  '@media (prefers-reduced-motion:reduce){[class*="tr-"]{animation:none!important}}',
].join('');

export default function TrainMock() {
  return (
    <div className="flex h-full flex-col gap-2 px-5 py-5 font-mono text-[12px] text-cream">
      <style>{CSS}</style>
      <p className="m-0 whitespace-nowrap"><span className="text-sun">$ </span>surogate sft config.yaml</p>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="tr-up absolute inset-x-0 top-0">
          {LOG.map((l, i) => (
            <p key={i} className={`tr-l${i} m-0 h-[18px] overflow-hidden whitespace-pre leading-[18px] ${l.startsWith('::') ? 'text-cream' : 'text-cream/65'}`}>{l}</p>
          ))}
        </div>
        <div className="tr-chart absolute inset-x-0 bottom-0 flex flex-col gap-1" style={{ top: KEEP * LH + 8 }}>
          <p className="m-0 text-right text-cream/65">step {lastStep}/{TOTAL} · loss {lastLoss.toFixed(2)}</p>
          <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="min-h-0 w-full flex-1" aria-hidden="true">
            <defs>
              <linearGradient id="train-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ffaf10" stopOpacity=".28" /><stop offset="1" stopColor="#ffaf10" stopOpacity="0" /></linearGradient>
            </defs>
            {[30, 60, 90].map((y) => <path key={y} d={`M0 ${y}H400`} stroke="rgba(243,234,216,.07)" />)}
            <path d="M0 8C50 12 80 52 130 72S220 98 280 104 360 108 400 109V120H0Z" fill="url(#train-fill)" />
            <path className="tr-draw" d="M0 8C50 12 80 52 130 72S220 98 280 104 360 108 400 109" fill="none" stroke="#ffaf10" strokeWidth="2.5" strokeLinecap="round" pathLength="400" strokeDasharray="400" strokeDashoffset="0" />
          </svg>
        </div>
      </div>
    </div>
  );
}

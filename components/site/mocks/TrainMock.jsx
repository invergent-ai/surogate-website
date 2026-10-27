// A training run, start to curve, on one 8s loop: the command types, the trainer's own log lines stream in
// (the [Dataset] block and ":: step" lines are the engine's real formats), the log compacts to its last
// steps and the loss curve draws in below. Everything rests on the last frame for reduced motion.
const LOG = [
  '[Dataset]',
  ' train:  2.4M tokens',
  ' eval:   120k tokens',
  "Starting training run 'support-ro'...",
  ':: step      10 [  0.3%] \\ loss 1.8421 | norm  0.9312',
  ':: step      20 [  0.7%] \\ loss 1.6107 | norm  0.8840',
];
const KEEP = 2;
const LH = 18;
const pct = (n) => `${n}%`;
const CSS = [
  '@keyframes tr-all{0%{opacity:0}3%,94%{opacity:1}100%{opacity:0}}.tr-all{animation:tr-all 8s infinite}',
  '@keyframes tr-type{0%,3%{max-width:0;animation-timing-function:steps(26,end)}16%,100%{max-width:26ch}}.tr-type{animation:tr-type 8s infinite}',
  ...LOG.map((_, i) => {
    const on = 19 + i * 5;
    const gone = i < LOG.length - KEEP ? `52%,100%{opacity:0}` : '';
    return `@keyframes tr-l${i}{0%,${pct(on)}{opacity:0;transform:translateY(4px)}${pct(on + 3)}{opacity:1;transform:none}${gone}}.tr-l${i}{${i < LOG.length - KEEP ? 'opacity:0;' : ''}animation:tr-l${i} 8s cubic-bezier(.16,1,.3,1) infinite}`;
  }),
  `@keyframes tr-up{0%,50%{transform:none}58%,100%{transform:translateY(-${(LOG.length - KEEP) * LH}px)}}.tr-up{transform:translateY(-${(LOG.length - KEEP) * LH}px);animation:tr-up 8s cubic-bezier(.16,1,.3,1) infinite}`,
  '@keyframes tr-chart{0%,54%{opacity:0}62%,100%{opacity:1}}.tr-chart{animation:tr-chart 8s cubic-bezier(.16,1,.3,1) infinite}',
  '@keyframes tr-draw{0%,56%{stroke-dashoffset:400}76%,100%{stroke-dashoffset:0}}.tr-draw{animation:tr-draw 8s cubic-bezier(.16,1,.3,1) infinite}',
  '@media (prefers-reduced-motion:reduce){[class*="tr-"]{animation:none!important}}',
].join('');

export default function TrainMock() {
  return (
    <div className="tr-all flex h-full flex-col gap-2 px-5 py-5 font-mono text-[12px] text-cream/85">
      <style>{CSS}</style>
      <p className="m-0 whitespace-nowrap"><span className="text-sun">$ </span><span className="tr-type inline-block overflow-hidden align-bottom">surogate sft config.yaml</span></p>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="tr-up absolute inset-x-0 top-0">
          {LOG.map((l, i) => (
            <p key={i} className={`tr-l${i} m-0 h-[18px] overflow-hidden whitespace-pre leading-[18px] ${l.startsWith('::') ? 'text-cream/85' : 'text-cream/45'}`}>{l}</p>
          ))}
        </div>
        <div className="tr-chart absolute inset-x-0 bottom-0 flex flex-col gap-1" style={{ top: KEEP * LH + 8 }}>
          <p className="m-0 text-right text-cream/50">step 1200/3000 · loss 1.12</p>
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

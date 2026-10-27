// The training run only: the command, where it has got to, and the loss curve as the picture.
export default function TrainMock() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-5 font-mono text-[12px] text-cream/85">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="m-0"><span className="text-sun">$</span> surogate sft config.yaml</p>
        <p className="seq2 m-0 text-cream/50">step 1200/3000 · loss 1.12</p>
      </div>
      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="h-[96px] w-full md:h-[132px]" aria-hidden="true">
        <defs>
          <linearGradient id="train-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ffaf10" stopOpacity=".28" /><stop offset="1" stopColor="#ffaf10" stopOpacity="0" /></linearGradient>
        </defs>
        {[30, 60, 90].map((y) => <path key={y} d={`M0 ${y}H400`} stroke="rgba(243,234,216,.07)" />)}
        <path d="M0 8C50 12 80 52 130 72S220 98 280 104 360 108 400 109V120H0Z" fill="url(#train-fill)" />
        <path className="mock-draw" d="M0 8C50 12 80 52 130 72S220 98 280 104 360 108 400 109" fill="none" stroke="#ffaf10" strokeWidth="2.5" strokeLinecap="round" pathLength="400" strokeDasharray="400" strokeDashoffset="0" />
      </svg>
    </div>
  );
}

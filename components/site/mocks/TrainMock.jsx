export default function TrainMock() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 font-mono text-[12px] text-cream/85">
      <p className="m-0"><span className="text-sun">$</span> surogate sft config.yaml</p>
      <p className="seq1 m-0 text-cream/55">loading dataset · desk-chats</p>
      <p className="seq2 m-0 text-cream/55">training · LoRA · FP8</p>
      <svg viewBox="0 0 300 90" className="mt-auto h-[90px] w-full" aria-hidden="true">
        <path d="M0 85H300" stroke="rgba(243,234,216,.15)" />
        <path className="mock-draw" d="M0 10C40 14 60 40 90 52S150 70 190 76 260 80 300 81" fill="none" stroke="#ffaf10" strokeWidth="2.5" strokeDasharray="400" strokeDashoffset="0" />
      </svg>
      <p className="seq4 m-0 text-[#9ece6a]">✓ saved · ready for surogate serve</p>
    </div>
  );
}

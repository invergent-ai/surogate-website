const BARS = [6, 10, 16, 22, 14, 26, 30, 18, 24, 12, 20, 28, 16, 10, 22, 26, 14, 8, 18, 24, 12, 16, 8, 6];

export default function VoiceMock() {
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-5 text-[13px] text-cream">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 shrink-0 rounded-full bg-sun" />
        <div className="flex h-10 flex-1 items-end gap-[3px]" aria-hidden="true">
          {BARS.map((h, i) => <span key={i} className="mock-bar w-[4px] rounded-full bg-sun" style={{ height: h, '--i': i }} />)}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="seq1 m-0 text-cream/60">„Bună ziua, aș vrea să mut programarea de joi.”</p>
        <p className="seq2 m-0">„Sigur. Vineri la ora 10 vă convine?”</p>
        <span className="seq3 self-start rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] text-cream/80">tool · reschedule_appointment</span>
      </div>
    </div>
  );
}

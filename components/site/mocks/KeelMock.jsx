const STAGES = ['Intake', 'Review', 'Approve'];

export default function KeelMock() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 text-[12px]">
      <div className="grid grid-cols-3 gap-2 text-ink/50">
        {STAGES.map((s) => <span key={s} className="rounded-lg bg-white px-2 py-1.5 text-center shadow-[0_0_0_1px_#e4e4e7]">{s}</span>)}
      </div>
      <div className="relative h-[72px]">
        <div className="mock-move absolute top-0 w-1/3 px-1" style={{ left: '66.666%' }}>
          <div className="rounded-xl bg-white p-3 shadow-[0_6px_20px_-12px_rgba(0,0,0,.35),0_0_0_1px_#e4e4e7]">
            <p className="m-0 font-medium text-ink">Supplier onboarding</p>
            <p className="m-0 mt-1 text-ink/50">Case 4812</p>
          </div>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-1.5">
        <span className="seq2 self-start rounded-full bg-stone px-3 py-1 text-ink/70">Checked against the sanctions list</span>
        <span className="seq3 self-start rounded-full bg-stone px-3 py-1 text-ink/70">Within approval limit · routed to Finance</span>
        <span className="seq4 self-start rounded-full bg-sun/25 px-3 py-1 font-medium text-[#7a4a00]">Approved · audit entry saved</span>
      </div>
    </div>
  );
}

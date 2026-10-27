import { RabbitAvatar } from '../Rabbit';

export default function SurogateMock() {
  return (
    <div className="flex h-full flex-col justify-end gap-3 p-5 text-[13px]">
      <p className="seq1 m-0 self-end max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-white">month-end is Friday, close out the card for me</p>
      <p className="seq2 m-0 self-center text-[11px] text-ink/45">Overnight · 06:12</p>
      <div className="seq3 flex max-w-[90%] gap-2">
        <RabbitAvatar />
        <div className="rounded-2xl rounded-bl-md bg-white px-4 py-2.5 leading-[1.7] shadow-[0_0_0_1px_#e4e4e7]">
          ✓ Read the statements<br />✓ Matched the receipts<br />✓ Three lines need you
        </div>
      </div>
      <span className="seq4 self-start ml-8 rounded-full bg-sun/25 px-3 py-1 text-[12px] font-medium text-[#7a4a00]">Held for your OK</span>
    </div>
  );
}

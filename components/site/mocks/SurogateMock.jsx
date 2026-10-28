const CHAT = [
  ['me', 'File these scanned invoices into the right folders.'],
  ['ai', 'On it. Reading the scans now.'],
  ['ai', 'Filed 38 of 40. Two need you: no PO number.'],
  ['me', 'Show me.'],
  ['ai', 'Here they are, side by side with the closest POs.'],
  ['me', 'File both under Pending.'],
  ['ai', 'Done. Both are in Pending, with a note on each.'],
  ['me', 'Add them to the invoice log too.'],
  ['ai', 'Logged. 40 rows, totals match the statements.'],
  ['me', 'Which one is due first?'],
  ['ai', 'Kroon Bandenservice, due Thursday. €2,132.02.'],
  ['me', 'Thanks.'],
];

function Thread({ hidden }) {
  return (
    <div className="flex flex-col gap-2.5 pb-2.5" aria-hidden={hidden || undefined}>
      {CHAT.map(([who, text], i) => (
        <p key={i} className={`m-0 max-w-[75%] rounded-[14px] px-3.5 py-2.5 leading-[1.4] ${who === 'me' ? 'self-end rounded-br-[4px] bg-ink text-white' : 'self-start rounded-bl-[4px] bg-silver text-ink'}`}>{text}</p>
      ))}
    </div>
  );
}

// The thread drifts upward on a loop. It is drawn twice and moves exactly one copy's height, and the
// window is shorter than one copy, so a message is never on screen twice.
export default function SurogateMock() {
  return (
    <div className="fade-y absolute inset-0 overflow-hidden px-6 text-[13px]">
      <div className="chat-scroll">
        <Thread />
        <Thread hidden />
      </div>
    </div>
  );
}

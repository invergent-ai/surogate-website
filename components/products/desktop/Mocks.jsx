import { FileSpreadsheet, FileText, Folder, Globe, Lock } from 'lucide-react';
import { RabbitAvatar } from '@/components/site/Rabbit';

// The desktop app playing itself on a 12 s loop (b1 to b6 in products.css). A bookkeeper's ask: real work on
// real files, the sandbox running the command, a new file landing in the folder, and a question before the
// network. Reduced motion and no JS show the finished frame.
const FILES = ['bank-export-october.csv', 'invoice-1041.pdf', 'invoice-1042.pdf', 'invoice-1043.pdf', 'invoice-1044.pdf', 'invoice-1045.pdf'];

export function DesktopMock() {
  return (
    <div className="flex h-full w-full overflow-hidden bg-white text-left text-[12px] text-ink md:text-[13px]">
      <aside className="hidden w-[30%] shrink-0 flex-col border-r border-hairline bg-white p-3 sm:flex">
        <p className="m-0 flex items-center gap-1.5 px-1 font-medium"><Folder size={14} />October</p>
        <ul className="m-0 mt-2 list-none p-0">
          {FILES.map((f) => (
            <li key={f} className="flex items-center gap-1.5 truncate rounded-md px-1 py-1 text-ink/65">
              {f.endsWith('.csv') ? <FileSpreadsheet size={13} className="shrink-0" /> : <FileText size={13} className="shrink-0" />}{f}
            </li>
          ))}
          <li className="b4 flex items-center gap-1.5 truncate rounded-md bg-white px-1 py-1 font-medium shadow-[0_0_0_1px_rgba(10,10,10,.06)]">
            <FileSpreadsheet size={13} className="shrink-0" />reconciliation.xlsx
          </li>
        </ul>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 p-3 md:gap-4 md:p-8 md:text-[14px]">
        <p className="b1 m-0 max-w-[85%] self-end rounded-[14px] rounded-br-[4px] bg-ink px-3.5 py-2.5 leading-[1.45] text-white">
          Match the October invoices against the bank export and list what has not been paid.
        </p>
        <div className="b2 flex gap-2.5">
          <RabbitAvatar size={22} />
          <div className="min-w-0 flex-1 rounded-lg bg-night px-3 py-2 font-mono text-[11px] leading-[1.6] text-white/80 md:text-[12px]">
            <span className="text-sun">$</span> python match.py bank-export-october.csv invoice-*.pdf<br />
            <span className="text-white/45">running in the sandbox</span>
          </div>
        </div>
        <div className="b3 ml-[32px] rounded-[14px] rounded-bl-[4px] bg-stone px-3.5 py-2.5 leading-[1.45]">
          Two invoices have no payment yet: 1043 and 1045. I wrote the table to reconciliation.xlsx in your folder.
        </div>
        <div className="b5 ml-[32px] flex flex-wrap items-center gap-2 rounded-xl px-3.5 py-2.5 ring-1 ring-hairline">
          <Lock size={13} className="shrink-0 text-ink/50" />
          <span className="flex-1">Open the supplier's portal to check 1045?</span>
          <span className="rounded-full bg-ink px-2.5 py-1 text-white">Allow once</span>
          <span className="rounded-full bg-stone px-2.5 py-1">Deny</span>
        </div>
      </div>
    </div>
  );
}

// Its own browser, and who holds it: the badge swaps as control passes.
export function BrowserMock() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white text-left text-[12px] text-ink md:text-[13px]">
      <div className="flex items-center gap-3 border-b border-hairline px-3 py-2.5">
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-stone px-3 py-1.5 text-ink/60"><Globe size={13} className="shrink-0" /><span className="truncate">portal.supplier.example/invoices</span></span>
        <span className="relative h-7 w-[148px] shrink-0">
          <span className="hold-a absolute inset-0 flex items-center justify-center rounded-full bg-ink text-white">The agent is driving</span>
          <span className="hold-b absolute inset-0 flex items-center justify-center rounded-full bg-sun/20 text-[#7a4300]">You're in control</span>
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white p-6">
        <div className="w-full max-w-[300px] rounded-xl bg-white p-5 shadow-[0_0_0_1px_rgba(10,10,10,.06)]">
          <p className="m-0 font-medium">Sign in</p>
          <span className="mt-4 block h-8 rounded-md ring-1 ring-hairline" />
          <span className="mt-2 block h-8 rounded-md ring-1 ring-hairline" />
          <span className="mt-4 flex h-8 items-center justify-center rounded-md bg-ink text-white">Continue</span>
          <p className="m-0 mt-3 text-center text-[11px] text-ink/45">You sign in. Then hand it back.</p>
        </div>
      </div>
    </div>
  );
}

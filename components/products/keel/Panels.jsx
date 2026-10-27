import { DEPLOYMENTS } from '@/lib/solutions';
import InlineSvg from '@/components/site/InlineSvg';
import { VideoFrame } from '@/components/site/ProductMedia';
import { partOfTheKeelBoardSvg } from '@/components/keel/illustrations';
import { filmFiles } from '@/lib/films';
import { reink } from '../ink';
import { CASE, AUDIT } from './vandijk';

// The scroller's panels: the Van Dijk supplier payment (./vandijk.js) at each part of the process, drawn small,
// and the deployments every product offers.
const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,.05),0_0_0_1px_rgba(10,10,10,.06)] ${className}`}>{children}</div>
);
const Frame = ({ children }) => <div className="flex h-full w-full items-center justify-center p-5 md:p-10">{children}</div>;

// The board drawing runs to the edge of its canvas; a margin in the viewBox keeps its right border on screen.
const board = reink(partOfTheKeelBoardSvg).replace('viewBox="0 0 1400 640"', 'viewBox="-12 -12 1424 664"');

export function ProcessPanel() {
  return (
    <Frame>
      <figure className="m-0 w-full max-w-[560px]">
        <div className="overflow-hidden rounded-xl bg-[#faf9f7] [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"><InlineSvg markup={board} /></div>
        <figcaption className="mt-3 text-[13px] text-ink/55">The board: a process is a row of stages. Open a stage to set how its steps connect.</figcaption>
      </figure>
    </Frame>
  );
}

const RULES = [['Matches the PO and the delivery', 'Within the approval limit', 'Pay'], ['Matches the PO and the delivery', 'Over the approval limit', 'A person decides'], ['Does not match', 'Any', 'Back to the agent']];
export function RulesPanel() {
  return (
    <Frame>
      <Card className="w-full max-w-[480px] overflow-hidden text-[13px]">
        <p className="m-0 px-4 py-3 font-medium">Supplier payment rule</p>
        <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-3 border-t border-hairline bg-ivory px-4 py-2 text-[12px] text-ink/50"><span>Invoice</span><span>Amount</span><span>Next step</span></div>
        {RULES.map((r) => (
          <div key={r.join()} className="grid grid-cols-[1.3fr_1fr_1fr] gap-3 border-t border-hairline px-4 py-2.5">
            {r.map((c, i) => <span key={i} className={i === 2 ? 'font-medium' : ''}>{c}</span>)}
          </div>
        ))}
        <p className="m-0 border-t border-hairline px-4 py-2.5 text-[12px] text-ink/45">Your finance team reads and changes it. Every version is kept.</p>
      </Card>
    </Frame>
  );
}

// The person's step, as filmed: the approval card in the inbox.
export function PersonPanel() {
  const f = filmFiles('vandijk-approval');
  return (
    <Frame>
      <figure className="m-0 w-full max-w-[560px]">
        <VideoFrame src={f.loop} poster={f.poster} />
        <figcaption className="mt-3 text-[13px] text-ink/55">The person's step at {CASE.business}, a demo business: approve payment of {CASE.amount} to {CASE.supplier}</figcaption>
      </figure>
    </Frame>
  );
}

export function AuditPanel() {
  return (
    <Card className="w-full overflow-hidden text-[14px]">
      <p className="m-0 px-5 py-3.5 font-medium">Invoice {CASE.invoice}, as Keel recorded it</p>
      <ol className="m-0 list-none p-0">
        {AUDIT.map(([who, what]) => (
          <li key={what} className="grid grid-cols-[64px_1fr] items-baseline gap-3 border-t border-hairline px-5 py-3">
            <span className="text-ink/50">{who}</span><span>{what}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export function InfraPanel() {
  return (
    <Frame>
      <div className="grid w-full max-w-[460px] grid-cols-2 gap-3">
        {DEPLOYMENTS.map((d, i) => (
          <Card key={d.name} className={`p-4 ${i === 3 ? '!bg-ink text-white' : ''}`}>
            <p className="m-0 text-[14px] font-medium">{d.name}</p>
            <p className={`m-0 mt-1.5 text-[12px] leading-[1.45] ${i === 3 ? 'text-white/60' : 'text-ink/55'}`}>{d.line}</p>
          </Card>
        ))}
      </div>
    </Frame>
  );
}

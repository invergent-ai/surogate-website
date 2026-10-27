import { DEPLOYMENTS } from '@/lib/solutions';

// The scroller's panels: what Keel records and decides, drawn small. Every figure comes from the Keel page's own
// examples (a mortgage application) and the deployments every product offers.
const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,.05),0_0_0_1px_rgba(10,10,10,.06)] ${className}`}>{children}</div>
);
const Frame = ({ children }) => <div className="flex h-full w-full items-center justify-center p-5 md:p-10">{children}</div>;

const STAGES = [['System', 'Intake'], ['Agent', 'Checks'], ['Rule', 'Score'], ['Person', 'Approve']];
const HANDED = [['Net income', '€4,210', 'payslip, page 1'], ['Monthly debt', '€980', 'bank statement, line 14'], ['Employer', 'Arcadia Ltd', 'contract, page 2']];

export function ProcessPanel() {
  return (
    <Frame>
      <div className="w-full max-w-[460px] text-[13px]">
        <div className="relative grid grid-cols-4 gap-2">
          <span aria-hidden="true" className="absolute inset-x-6 top-1/2 h-px bg-ink/15" />
          {STAGES.map(([who, step], i) => (
            <Card key={step} className={`relative px-2 py-2.5 text-center ${i === 1 ? '!bg-ink text-white' : ''}`}>
              <span className={`block text-[11px] ${i === 1 ? 'text-white/60' : 'text-ink/45'}`}>{who}</span>
              <span className="mt-0.5 block font-medium">{step}</span>
            </Card>
          ))}
        </div>
        <Card className="mt-5 overflow-hidden">
          <p className="m-0 border-b border-hairline px-4 py-2.5 text-ink/50">What the Checks agent handed back</p>
          {HANDED.map(([k, v, src]) => (
            <div key={k} className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-hairline px-4 py-2 first-of-type:border-t-0 tabular-nums">
              <span>{k}</span><span className="text-right font-medium">{v}</span>
              <span className="col-span-2 text-[12px] text-ink/45">{src}</span>
            </div>
          ))}
        </Card>
      </div>
    </Frame>
  );
}

const RULES = [['Under 35%', '700 or more', 'Approve'], ['Under 35%', 'Under 700', 'Review'], ['35% or more', 'Any', 'Decline']];
export function RulesPanel() {
  return (
    <Frame>
      <Card className="w-full max-w-[460px] overflow-hidden text-[13px]">
        <p className="m-0 px-4 py-3 font-medium">Mortgage scorecard, version 12</p>
        <div className="grid grid-cols-3 border-t border-hairline bg-ivory px-4 py-2 text-[12px] text-ink/50"><span>Debt to income</span><span>Credit score</span><span>Outcome</span></div>
        {RULES.map((r) => (
          <div key={r.join()} className="grid grid-cols-3 border-t border-hairline px-4 py-2.5">
            {r.map((c, i) => <span key={i} className={i === 2 ? 'font-medium' : ''}>{c}</span>)}
          </div>
        ))}
        <p className="m-0 border-t border-hairline px-4 py-2.5 text-[12px] text-ink/45">Live from 1 November. Your analysts read and change it.</p>
      </Card>
    </Frame>
  );
}

const LOG = [['09:41', 'Agent', 'Payslip and bank statement don\'t match'], ['10:17', 'Person', 'Loan officer picks the figure'], ['10:19', 'Rule', 'Credit score 721, scorecard v12'], ['14:05', 'Person', 'Approved within a €250,000 limit']];
export function OversightPanel() {
  return (
    <Frame>
      <Card className="w-full max-w-[460px] overflow-hidden text-[13px]">
        <p className="m-0 px-4 py-3 font-medium">A mortgage application, as Keel recorded it</p>
        {LOG.map(([t, who, what]) => (
          <div key={t} className="grid grid-cols-[48px_64px_1fr] items-baseline gap-2 border-t border-hairline px-4 py-2.5">
            <span className="tabular-nums text-ink/45">{t}</span>
            <span className="text-ink/60">{who}</span>
            <span>{what}</span>
          </div>
        ))}
      </Card>
    </Frame>
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

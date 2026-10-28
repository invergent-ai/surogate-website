import { CASE, STAGES, AUDIT } from './vandijk';

// One case moving through a Keel process, drawn in the board's own vocabulary (components/keel/illustrations.js):
// white stage columns, lilac step cards, the case's card edged in sun. The case card crossfades from stage to stage
// and the audit trail fills in under it, on one CSS loop (app/v2.css, .kf-*). Every layer always holds its place,
// so nothing moves the layout; reduced motion shows the end: the case paid and the whole trail written.
export default function CaseFlow() {
  return (
    <div className="rounded-2xl bg-white p-3 text-left text-[13px] sm:p-6 md:p-8">
      <p className="m-0 px-1 pb-3 text-ink/55 sm:pb-5">Supplier payments at {CASE.business}, a demo business</p>
      <ol className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:gap-3 lg:grid-cols-4">
        {STAGES.map((s, i) => (
          <li key={s.name} className="flex min-w-0 flex-col rounded-xl bg-white p-2.5 sm:p-3">
            <p className="m-0 flex items-baseline justify-between gap-2 px-0.5 font-medium text-aubergine">
              {s.name}<span className="text-[12px] font-normal text-ink/45">{s.who}</span>
            </p>
            <p className="m-0 mt-2 rounded-lg bg-[#ebe4ee] px-2.5 py-2 text-[12px] leading-[1.4] text-ink/75 sm:min-h-[52px] sm:text-[13px]">{s.step}</p>
            <div className="relative mt-2 grid h-[54px] sm:h-[58px]">
              <span aria-hidden="true" className="rounded-lg border border-dashed border-ink/15 [grid-area:1/1]" />
              <div className={`kf-case kf-c${i + 1} flex min-w-0 flex-col justify-center rounded-lg border border-sun bg-white px-2.5 [grid-area:1/1]`}>
                <span className="truncate text-[11px] tabular-nums text-ink/55 sm:text-[12px]">{CASE.invoice}</span>
                <span className="grid font-medium tabular-nums">
                  {i === 2 ? (
                    <>
                      <span className="kf-wait [grid-area:1/1]">Waiting for a person</span>
                      <span className="kf-ok [grid-area:1/1]">{s.status}</span>
                    </>
                  ) : <span>{s.status}{i === 3 ? `, ${CASE.amount}` : ''}</span>}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-2 rounded-xl bg-white px-3 py-3 sm:mt-3 sm:px-4">
        <p className="m-0 font-medium text-aubergine">Audit trail</p>
        <ol className="m-0 mt-1.5 list-none p-0">
          {AUDIT.map(([who, what], i) => (
            <li key={what} className={`kf-row kf-r${i + 1} grid grid-cols-[52px_1fr] gap-2 border-t border-hairline py-1.5 first:border-t-0 sm:grid-cols-[64px_1fr]`}>
              <span className="text-ink/45">{who}</span><span className="min-w-0">{what}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

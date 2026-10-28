'use client';

import { useRef } from 'react';
import { useLive } from '@/components/site/Rings';
import { VideoFrame } from '@/components/site/ProductMedia';
import { RABBIT_BOX, RABBIT_FILL } from '@/components/site/rabbit';
import { filmFiles } from '@/lib/films';
import { CASE, STAGES, STATUS, AUDIT } from '@/components/products/keel/vandijk';

// The old Keel board (stage columns, one stage opened into its flow) telling one case on a 20 s loop:
// the Van Dijk invoice enters Intake, moves to Check, the stage opens, the agent matches it, the limit routes it
// to a person, the person approves, and it moves on to Payment and Close while the audit trail fills.
// Every timed part is a CSS keyframe in app/keel/keel.css that runs only while the figure is on screen
// (data-live); the resting style of each part is the finished case, which is what reduced motion shows.
const CAPTIONS = [
  ['The board', 'Every process is a row of stages, and each stage holds its steps.'],
  ['The flow', 'Open a stage to set how its steps connect: who does each one, and where each decision sends the case.'],
  ['The work', 'Agents and people take the steps in turn. Keel moves each case only along the paths you set.'],
];

const INK = '#0a0a0a';
const SUN = '#ffaf10';
const SILVER = '#d4d4d8';

const Arrow = ({ id, fill }) => (
  <marker id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto">
    <path d="M0 0L8 4L0 8z" fill={fill} />
  </marker>
);

const Step = ({ x, y, w = 200, h = 54, title, children, on }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="8" fill="#f4f4f5" />
    <rect className={`kb-on ${on}`} x={x + 1} y={y + 1} width={w - 2} height={h - 2} rx="7" fill="none" stroke={SUN} strokeWidth="2" />
    <text x={x + 14} y={y + 23} fontSize="14" fontWeight="500" fill={INK}>{title}</text>
    {children}
  </g>
);

const Person = ({ x, y, color = INK }) => (
  <g fill="none" stroke={color} strokeWidth="1.4">
    <circle cx={x} cy={y} r="9" />
    <circle cx={x} cy={y - 2.5} r="3" />
    <path d={`M${x - 5.5} ${y + 6}c1.4-2.6 3.2-3.6 5.5-3.6s4.1 1 5.5 3.6`} />
  </g>
);

const Diamond = ({ cx, cy, on }) => {
  const pts = `${cx},${cy - 22} ${cx + 22},${cy} ${cx},${cy + 22} ${cx - 22},${cy}`;
  return (
    <g>
      <polygon points={pts} fill="#fff" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon className={`kb-on ${on}`} points={pts} fill={SUN} stroke={SUN} strokeWidth="1.5" strokeLinejoin="round" />
      <path d={`M${cx - 7} ${cy}h14`} stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
};

// The opened Check stage. Paths the case does not take stay dashed grey; the one it takes is laid over in sun.
function Flow() {
  const line = { fill: 'none', stroke: INK, strokeWidth: 1.5, markerEnd: 'url(#kb-a)' };
  const idle = { fill: 'none', stroke: SILVER, strokeWidth: 1.5, strokeDasharray: '4 4', markerEnd: 'url(#kb-ag)' };
  const taken = (cls) => ({ className: `kb-path ${cls}`, fill: 'none', stroke: SUN, strokeWidth: 2, markerEnd: 'url(#kb-as)' });
  const label = { fontSize: 12, fill: INK, fillOpacity: 0.55 };
  return (
    <svg viewBox="0 0 440 410" className="block h-auto w-full" role="img"
      aria-label={`The Check stage: an agent matches the invoice to the PO, the approval limit sends ${CASE.amount} to a person, finance approves, and it is ready to pay.`}>
      <defs>
        <Arrow id="kb-a" fill={INK} /><Arrow id="kb-ag" fill={SILVER} /><Arrow id="kb-as" fill={SUN} />
      </defs>

      <path d="M220 68V98" {...line} />
      <path d="M220 144V194" {...line} />
      <path d="M220 240V274" {...line} />
      <path d="M220 330V358" {...line} />
      <path d="M198 122H95V148" {...idle} />
      <path d="M242 218H400V378H292" {...idle} />

      <path d="M220 68V98" {...taken('kb-p1')} />
      <path d="M220 144V194" {...taken('kb-p2')} />
      <path d="M220 240V274" {...taken('kb-p3')} />
      <path d="M220 330V358" {...taken('kb-p4')} />

      <Step x={120} y={14} title="Match to the PO" on="kb-s1">
        <text x={134} y={56} {...label}>Agent</text>
        <rect x={286} y={24} width={22} height={22} rx="6" fill={SUN} />
        <path d={RABBIT_FILL} fill={INK} transform={`translate(289.5 27.6) scale(${15 / RABBIT_BOX.w})`} />
      </Step>

      <Diamond cx={220} cy={122} on="kb-d1" />
      <text x={252} y={126} fontSize="13" fill={INK}>Matches the PO?</text>
      <text x={176} y={114} {...label} textAnchor="end">No</text>
      <text x={228} y={176} {...label}>Yes</text>

      <g>
        <rect x={16} y={150} width={164} height={46} rx="8" fill="#fff" stroke={SILVER} strokeDasharray="4 4" />
        <text x={28} y={170} fontSize="13" fill={INK} fillOpacity=".55">Accounts payable</text>
        <text x={28} y={187} {...label} fillOpacity=".4">Person</text>
        <Person x={162} y={173} color={SILVER} />
      </g>

      <Diamond cx={220} cy={218} on="kb-d2" />
      <text x={188} y={222} fontSize="13" fill={INK} textAnchor="end">Approval limit</text>
      <text x={262} y={210} {...label}>Within</text>
      <text x={228} y={262} {...label}>Over</text>

      <Step x={120} y={276} title="Finance approves" on="kb-s2">
        <text className="kb-who" x={134} y={318} {...label}>Person</text>
        <text className="kb-wait" x={134} y={318} fontSize="12" fill={INK} fillOpacity=".7">Waiting for a person</text>
        <text className="kb-ok" x={134} y={318} fontSize="12" fill={INK} fontWeight="500">Approved {CASE.amount}</text>
        <Person x={294} y={296} />
      </Step>

      <g>
        <rect x={150} y={360} width={140} height={36} rx="18" fill="#fff" stroke={INK} strokeWidth="1.5" />
        <rect className="kb-end" x={150} y={360} width={140} height={36} rx="18" fill={SUN} stroke={SUN} strokeWidth="1.5" />
        <text x={220} y={383} fontSize="13" fontWeight="500" fill={INK} textAnchor="middle">Ready to pay</text>
      </g>
    </svg>
  );
}

export default function BoardFlow() {
  const ref = useRef(null);
  useLive(ref);
  const film = filmFiles('vandijk-approval');
  return (
    <figure ref={ref} className="kb m-0">
      <div className="grid gap-3 lg:grid-cols-[7fr_5fr]">
        <div className="flex flex-col rounded-2xl bg-stone p-2 sm:p-3 md:p-4">
          <p className="m-0 mb-3 flex flex-wrap justify-between gap-x-4 px-1 text-[12px] text-ink/55 md:text-[13px]">
            <span className="font-medium text-ink">Supplier payments</span><span>{CASE.business}, a demo business</span>
          </p>
          <div className="relative grid grid-cols-4 gap-2">
            {STAGES.map((s, i) => (
              <div key={s.name} className="relative min-w-0 rounded-xl bg-white p-1.5 pb-[84px] sm:p-2 sm:pb-[84px]">
                <p className="m-0 px-1 pt-0.5 pb-2 text-[12px] font-medium sm:text-[13px]">{s.name}</p>
                <ul className="m-0 grid list-none gap-1.5 p-0">
                  {s.steps.map(([step, who]) => (
                    <li key={step} className="rounded-lg bg-stone px-1.5 py-1.5 text-[10.5px] leading-[1.3] sm:px-2 sm:text-[12px]">
                      {step}<span className="mt-0.5 hidden text-[11px] text-ink/50 sm:block">{who}</span>
                    </li>
                  ))}
                </ul>
                {i === 1 && <span aria-hidden="true" className="kb-sel pointer-events-none absolute inset-0 rounded-xl border-[1.5px] border-ink" />}
              </div>
            ))}
            <div aria-hidden="true" className="kb-lane pointer-events-none absolute inset-x-0 bottom-2">
              <div className="kb-case flex h-[68px] flex-col justify-center rounded-lg border-[1.5px] border-sun bg-white px-1 sm:px-2.5">
                <span className="hidden truncate text-[11px] tabular-nums text-ink/55 sm:block">{CASE.invoice}</span>
                <span className="text-[10px] font-medium tabular-nums sm:text-[13px]">{CASE.amount}</span>
                <span className="grid text-[10px] leading-[1.25] text-ink/70 sm:text-[11.5px]">
                  {STATUS.map((t, k) => <span key={t} className={`kb-st kb-st${k + 1} [grid-area:1/1]`}>{t}</span>)}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2 rounded-xl bg-white px-3 py-3 text-[12.5px] sm:px-4 md:text-[13px]">
            <p className="m-0 font-medium">Invoice {CASE.invoice}, as Keel recorded it</p>
            <ol className="m-0 mt-2 list-none p-0">
              {AUDIT.map(([who, what], i) => (
                <li key={what} className={`kb-row kb-r${i + 1} grid grid-cols-[56px_1fr] gap-2 border-t border-hairline py-2 first:border-t-0 sm:grid-cols-[64px_1fr]`}>
                  <span className="text-ink/50">{who}</span><span className="min-w-0">{what}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="relative flex flex-col rounded-2xl bg-white p-3 ring-1 ring-silver md:p-4">
          <span aria-hidden="true" className="kb-sel pointer-events-none absolute inset-0 rounded-2xl border-[1.5px] border-ink" />
          <p className="m-0 mb-2 px-1 text-[12px] text-ink/55 md:text-[13px]"><span className="font-medium text-ink">Check</span>, opened: how its steps connect</p>
          <div className="kb-flow mx-auto my-auto w-full max-w-[420px]"><Flow /></div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[7fr_5fr]">
        <div className="grid content-center gap-6 px-1 py-2 md:grid-cols-3 md:gap-8 lg:grid-cols-1 lg:gap-7 lg:px-4">
          {CAPTIONS.map(([t, d], i) => (
            <div key={t} className={`kb-cap kb-c${i + 1} relative pt-4 lg:pt-0 lg:pl-6`}>
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-silver lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[2px]" />
              <span aria-hidden="true" className="kb-bar absolute inset-x-0 top-0 h-[2px] bg-sun lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[2px]" />
              <p className="m-0 text-[15px] font-medium">{t}</p>
              <p className="m-0 mt-1.5 max-w-[52ch] text-[14px] leading-[1.55] text-ink/60">{d}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-stone p-4 md:p-5">
          <VideoFrame src={film.loop} poster={film.poster} />
          <p className="m-0 mt-3 text-[13px] text-ink/55">The person's step, as filmed: approve payment of {CASE.amount} to {CASE.supplier}</p>
        </div>
      </div>
    </figure>
  );
}

'use client';

import { useState } from 'react';
import TrackedLink from '@/components/TrackedLink';
import { PERSONAL_PLANS, priceLines } from '@/lib/pricing';

// The single-user plans, drawn like the client plan cards above them.
export default function PersonalPlans() {
  const [billing, setBilling] = useState('monthly');

  return (
    <section id="personal" className="bg-brand-paper border-b border-b-brand-border">
      <div className="max-w-[1200px] my-0 mx-auto py-[72px] px-[24px] flex flex-col gap-[24px]">
        <div className="flex flex-wrap gap-y-[16px] gap-x-[40px] items-end justify-between">
          <div className="flex flex-col gap-[8px] flex-[1_1_480px] min-w-0">
            <h2 className="font-sans m-0 text-[clamp(28px,3vw,36px)] leading-[1.1] tracking-[-0.025em] font-extrabold">For one person</h2>
            <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">Single-user plans on the same runtime, with usage included.</p>
          </div>
          <div className="flex flex-col items-start gap-[8px]">
            <div role="group" aria-label="Billing period" className="inline-flex border border-brand-aubergine">
              {[
                ['monthly', 'Monthly'],
                ['annual', 'Yearly'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={billing === id}
                  onClick={() => setBilling(id)}
                  className={`min-h-[40px] px-[16px] text-[14px] font-semibold ${
                    billing === id ? 'bg-brand-aubergine text-white' : 'bg-white text-brand-aubergine'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className="text-[13px] text-brand-graphite">Save ~5% with yearly billing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[24px]">
          {PERSONAL_PLANS.map((plan) => {
            const { amount, perMonth, note } = priceLines(plan, billing);
            return (
              <article
                key={plan.id}
                className={`min-w-0 bg-white p-[28px] flex flex-col gap-[20px] ${
                  plan.featured ? 'border-2 border-brand-aubergine' : 'border border-brand-border'
                }`}
              >
                <div className="flex flex-col gap-[6px]">
                  <h3 className="font-sans m-0 text-[22px] font-bold flex flex-wrap items-center gap-[8px]">
                    {plan.name}
                    {plan.badge && (
                      <span className="inline-block py-[2px] px-[7px] text-[11.5px] font-bold bg-brand-orange text-brand-aubergine">{plan.badge}</span>
                    )}
                  </h3>
                  <p className="m-0 text-[48px] font-extrabold tracking-[-0.03em]">
                    ${amount}
                    {perMonth && <span className="text-[18px] font-semibold text-brand-graphite"> / month</span>}
                  </p>
                  <p className="m-0 text-[15px] text-brand-graphite">{note}</p>
                </div>
                <p className="m-0 text-[15px] leading-[1.5] text-brand-graphite">{plan.best}</p>
                <ul className="m-0 pl-[18px] flex flex-col gap-[8px] text-[15px] leading-[1.5] text-brand-graphite list-disc">
                  {plan.features.map((f) => (
                    <li key={f.text} className={f.strong ? 'font-semibold text-brand-aubergine' : ''}>
                      {f.text}
                      {f.mo && <span className="font-normal text-brand-graphite"> / month</span>}
                    </li>
                  ))}
                </ul>
                <TrackedLink
                  event="pricing_plan_selected"
                  eventProps={{ plan: plan.id, billing }}
                  href={plan.cta.href}
                  className={`mt-auto inline-flex items-center justify-center min-h-[48px] px-[20px] no-underline font-semibold ${
                    plan.featured ? 'bg-brand-aubergine text-white' : 'border border-brand-aubergine text-brand-aubergine'
                  }`}
                >
                  {plan.cta.label}
                </TrackedLink>
              </article>
            );
          })}
        </div>

        <p className="m-0 text-[14px] leading-[1.6] text-brand-graphite">
          Two frontier model levels on every plan: <strong>Surogate</strong> (Sonnet class), and <strong>Surogate Pro</strong> (Opus class).
          Pro is stronger, and draws ~2.5x faster from the plan allowance. Need more usage or browser time? You can always top up your wallet.
        </p>
      </div>
    </section>
  );
}

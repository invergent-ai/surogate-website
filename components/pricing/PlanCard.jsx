import { Check } from 'lucide-react';
import Button from '@/components/site/Button';
import { priceLines, usd } from '@/lib/pricing';

// A card the width of its column: name, price, who it is for, one button, then what it includes.
// The price figures are tabular, so switching the billing period never moves the text beside them.
export default function PlanCard({ plan, billing, tab }) {
  const { amount, perMonth, note } = priceLines(plan, billing);
  return (
    <article className={`flex w-[84%] shrink-0 snap-start flex-col rounded-2xl p-6 sm:w-[46%] md:w-auto ${plan.featured ? 'bg-white ring-1 ring-ink/15' : 'bg-white'}`}>
      <h3 className="m-0 flex items-baseline justify-between gap-3 text-[16px] font-[500]">
        {plan.name}
        {plan.badge && <span className="text-[12px] font-normal text-ink/50">{plan.badge}</span>}
      </h3>
      <p className="m-0 mt-4 flex items-baseline gap-1.5 [font-variant-numeric:tabular-nums]">
        <span className="text-[40px] font-[450] leading-none tracking-[-0.02em]">{usd(amount)}</span>
        {perMonth && <span className="text-[14px] text-ink/50">/ month</span>}
      </p>
      <p className="m-0 mt-2 min-h-[2.6em] text-[13px] leading-[1.3] text-ink/55">{note}</p>
      <p className="m-0 mt-3 min-h-[2.8em] text-[14px] leading-[1.4] text-ink/75">{plan.best}</p>
      <Button href={plan.cta.href} variant={plan.featured ? 'primary' : 'secondary'} size="lg" event="pricing_plan_selected"
        eventProps={{ plan: plan.id, billing, tab }} className="mt-5 w-full">{plan.cta.label}</Button>
      <ul className="m-0 mt-6 flex list-none flex-col gap-2.5 border-t border-hairline p-0 pt-5 text-[13px] leading-[1.45] text-ink/70">
        {plan.features.map((f) => (
          <li key={f.text} className={`flex gap-2 ${f.strong ? 'font-medium text-ink' : ''}`}>
            <Check size={14} className="mt-[2px] shrink-0 text-ink/60" />
            <span>{f.text}{f.mo && <span className="font-normal text-ink/50"> a month</span>}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

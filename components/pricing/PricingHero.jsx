'use client';

export default function PricingHero({ billing, setBilling }) {
  return (
    <section className="relative overflow-hidden bg-grad-sun-horiz pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
      <div className="max-w-container mx-auto px-8">
        <div className="font-serif text-[11px] font-semibold uppercase tracking-wider-2 text-brand-aubergine/70">
          <span className="font-mono text-brand-aubergine mr-2 font-bold">00</span>
          Pricing
        </div>
        <h1 className="reveal mt-3.5 max-w-[18ch] font-serif font-semibold leading-[0.92] text-brand-aubergine tracking-display text-[48px] sm:text-[72px] lg:text-[clamp(56px,8.4vw,120px)]">
          Run agents.{' '}
          <span className="relative inline-block isolate">
            Build models.
            <span
              aria-hidden="true"
              className="absolute -left-[1%] -right-[1%] bottom-[6%] h-[22%] -z-10 bg-brand-aubergine/0 rounded -rotate-[0.6deg]"
            />
          </span>{' '}
          <span className="italic font-medium">Own the stack.</span>
        </h1>
        <p className="reveal mt-7 max-w-[58ch] font-sans text-[17px] sm:text-[19px] leading-[1.55] text-brand-graphite">
          Most agent platforms make you pick: run their pre-built agents, or roll your own from scratch. We
          don&apos;t make you pick. Use our agent runtime for everyday work — and our developer tools
          when you want to go further. Same account, same bill, no hidden upgrades.
        </p>

        <div className="reveal mt-9 flex flex-wrap items-center gap-5">
          <BillingToggle billing={billing} setBilling={setBilling} />
          <span className="font-mono text-[11px] uppercase tracking-wider-2 text-brand-aubergine/70">
            {billing === 'annual' ? 'Save up to ~17% with annual billing' : 'First month discounted on every paid plan'}
          </span>
        </div>
      </div>
    </section>
  );
}

function BillingToggle({ billing, setBilling }) {
  return (
    <div
      role="tablist"
      aria-label="Billing cycle"
      className="inline-flex items-center bg-brand-aubergine p-1 border border-brand-aubergine"
    >
      {[
        { id: 'monthly', label: 'Monthly' },
        { id: 'annual', label: 'Annual' },
      ].map((opt) => {
        const on = billing === opt.id;
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={on}
            type="button"
            onClick={() => setBilling(opt.id)}
            className={`relative h-9 px-4 font-sans text-[11px] font-semibold uppercase tracking-wider-2 transition-colors ${
              on
                ? 'bg-brand-orange text-brand-aubergine'
                : 'bg-transparent text-white/70 hover:text-white'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-grad-sun-horiz pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
      <div className="max-w-container mx-auto px-8">
        <div className="font-serif text-[11px] font-semibold uppercase tracking-wider-2 text-brand-aubergine/70">
          <span className="font-mono text-brand-aubergine mr-2 font-bold">00</span>
          Pricing &nbsp;/&nbsp; v2.0
        </div>
        <h1 className="reveal mt-3.5 max-w-[18ch] font-serif font-semibold leading-[0.92] text-brand-aubergine tracking-display text-[48px] sm:text-[72px] lg:text-[clamp(56px,8.4vw,120px)]">
          Agents that{' '}
          <span className="relative inline-block isolate">
            get work done.
            <span
              aria-hidden="true"
              className="absolute -left-[1%] -right-[1%] bottom-[6%] h-[22%] -z-10 bg-brand-aubergine/0 rounded -rotate-[0.6deg]"
            />
          </span>
          <br />
          <span className="italic font-medium">One bill. No surprises.</span>
        </h1>
        <p className="reveal mt-7 max-w-[58ch] font-sans text-[17px] sm:text-[19px] leading-[1.55] text-brand-graphite">
          Pick a plan, sign up, and start building. Tokens are included by default. Advanced users
          can bring their own LLM provider or train custom models. Wallets stop at zero — no
          overage invoices, no auto-upgrades.
        </p>
      </div>
    </section>
  );
}

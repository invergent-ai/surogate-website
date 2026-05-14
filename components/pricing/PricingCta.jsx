export default function PricingCta() {
  return (
    <section
      data-screen-label="08 Ready"
      className="relative overflow-hidden bg-brand-aubergine text-white py-24 sm:py-28 lg:py-32"
    >
      <div className="absolute inset-0 bg-evening-glow pointer-events-none" />
      <div className="relative max-w-[880px] mx-auto px-8 text-center">
        <div className="font-serif text-[11px] font-semibold uppercase tracking-wider-2 text-white/55">
          <span className="font-mono text-brand-orange mr-2 font-bold">08</span>
          Ready to start?
        </div>
        <h2 className="reveal mt-4 mb-7 font-serif font-medium italic leading-[0.98] tracking-[-0.03em] text-[44px] sm:text-[60px] lg:text-[clamp(48px,7vw,88px)] text-white">
          500K tokens.{' '}
          <span className="not-italic font-semibold">No credit card.</span>
        </h2>
        <p className="reveal text-[18px] leading-[1.55] text-white/72 max-w-[52ch] mx-auto mb-9">
          Try the full feature set on the free tier. Upgrade when you want more tokens, more agents, or
          your own fine-tuned models.
        </p>

        <div className="reveal flex gap-3 flex-wrap justify-center">
          <a
            href="/#signup"
            className="inline-flex items-center justify-center gap-2.5 h-12 px-6 bg-grad-sun text-brand-aubergine font-sans text-xs font-semibold uppercase tracking-wider-2 border border-brand-orange hover:brightness-105 transition"
          >
            Start free{' '}
            <span className="font-serif font-normal text-lg leading-none translate-y-px">→</span>
          </a>
          <a
            href="#plans"
            className="inline-flex items-center justify-center gap-2.5 h-12 px-6 bg-transparent text-white font-sans text-xs font-semibold uppercase tracking-wider-2 border border-white/50 hover:bg-white hover:text-brand-aubergine hover:border-white transition-colors"
          >
            Pick a plan
          </a>
          <a
            href="mailto:sales@surogate.ai"
            className="inline-flex items-center justify-center gap-2.5 h-12 px-6 bg-transparent text-white/82 font-sans text-xs font-semibold uppercase tracking-wider-2 border border-white/20 hover:text-white hover:border-white/40 transition-colors"
          >
            Talk to a human
          </a>
        </div>
      </div>
    </section>
  );
}

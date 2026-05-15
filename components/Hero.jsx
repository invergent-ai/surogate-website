export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-grad-sun-horiz pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-[72px]">
      <div className="max-w-container mx-auto px-8 grid gap-12 lg:gap-[88px] items-center grid-cols-1 lg:[grid-template-columns:minmax(0,1.25fr)_minmax(360px,1fr)]">
        <div className="min-w-0 font-serif">
          <h1 className="reveal m-0 mb-7 font-serif font-semibold leading-[0.9] text-brand-aubergine tracking-display text-[60px] sm:text-[88px] lg:text-[clamp(60px,10.5vw,144px)]">
            <span className="inline-block">Multiply</span>{' '}
            <span className="relative inline-block isolate">
              yourself.
              <span
                aria-hidden="true"
                className="absolute -left-[1%] -right-[1%] bottom-[6%] h-[24%] -z-10 bg-brand-yellow rounded -rotate-[0.6deg]"
              />
            </span>
          </h1>
          <p className="reveal m-0 max-w-[36ch] font-sans text-[17px] sm:text-[19px] lg:text-[21px] leading-[1.55] text-brand-graphite font-normal">
            A Surogate agent is your cloud-based counterpart. Deploy one or deploy hundreds — they research, draft, and follow up nonstop, so progress keeps moving even when you step away.
          </p>
        </div>

        <SignupCard />
      </div>
    </section>
  );
}

function SignupCard() {
  return (
    <aside
      id="signup"
      aria-label="Create your account"
      className="flex flex-col align-middle reveal bg-white border border-brand-border rounded-lg p-7 shadow-card after:content-[''] after:absolute after:-inset-px after:rounded-[inherit] after:shadow-sun-glow after:pointer-events-none"
    >
      
       <a
        href="https://ops.surogate.ai"
        className="inline-flex items-center justify-center gap-2 h-9 px-4 bg-brand-aubergine text-white text-[11px] font-semibold uppercase tracking-wider-2 border border-brand-aubergine hover:bg-brand-aubergine-hover transition-colors"
        >
          Sign In
        </a>

      <p className="mt-3 text-center text-xs text-brand-steel leading-[1.45]">
        Try it out and see how it can supercharge your productivity. No credit card required.
      </p>
    </aside>
  );
}

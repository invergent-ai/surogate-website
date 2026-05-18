import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
      <div className="absolute inset-0 bg-grad-sun-horiz pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 hero-circles pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-container mx-auto px-8 grid gap-12 lg:gap-[88px] items-end grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="min-w-0 w-full font-serif">
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
          <p className="reveal m-0 w-full max-w-none font-sans text-[17px] sm:text-[19px] lg:text-[21px] leading-[1.55] text-brand-graphite font-normal">
            A Surogate agent is a version of you running in the cloud. <br/> Deploy one or deploy hundreds - they work for you 24/7.
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
      className="reveal flex w-full max-w-[22rem] flex-col items-start"
    >
      <h2 className="mb-5 font-serif text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-aubergine sm:text-[28px]">
        Ready when you are
      </h2>

      <a
        href="https://ops.surogate.ai"
        className="group inline-flex w-full items-center justify-start gap-3 h-12 rounded-md bg-grad-wine-horiz px-6 font-sans text-xs font-semibold uppercase tracking-wider-2 text-white border border-brand-wine/40 shadow-[0_14px_32px_-12px_rgba(42,16,45,0.45)] transition hover:brightness-110"
      >
        Sign in
        <ArrowRight
          className="h-4 w-4 shrink-0 opacity-90 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={2.25}
          aria-hidden="true"
        />
      </a>

      <p className="mt-4 text-left text-[13px] leading-[1.55] text-brand-graphite">
        Try it out and see how it can supercharge your productivity.{' '}
        <span className="text-brand-aubergine/75">No credit card required.</span>
      </p>
    </aside>
  );
}

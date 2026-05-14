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
      className="reveal relative bg-white border border-brand-border rounded-lg p-7 shadow-card after:content-[''] after:absolute after:-inset-px after:rounded-[inherit] after:shadow-sun-glow after:pointer-events-none"
    >
      <button
        type="button"
        className="flex items-center justify-center gap-2.5 h-11 w-full bg-white border border-brand-border font-sans text-sm font-medium text-brand-aubergine hover:bg-brand-fog hover:border-brand-aubergine transition-colors"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 18 18" aria-hidden="true">
          <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.79 2.72v2.26h2.9c1.7-1.57 2.69-3.88 2.69-6.63z" />
          <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.58-5.05-3.71H.95v2.33A9 9 0 0 0 9 18z" />
          <path fill="#FBBC05" d="M3.95 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.95a9 9 0 0 0 0 8.08l3-2.33z" />
          <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .95 4.96l3 2.33C4.66 5.16 6.65 3.58 9 3.58z" />
        </svg>
        Continue with Google
      </button>
      <button
        type="button"
        className="mt-2 flex items-center justify-center gap-2.5 h-11 w-full bg-white border border-brand-border font-sans text-sm font-medium text-brand-aubergine hover:bg-brand-fog hover:border-brand-aubergine transition-colors"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" aria-hidden="true">
          <path
            fill="currentColor"
            d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
        Continue with GitHub
      </button>

      <div className="flex items-center gap-3 my-3.5 text-brand-steel">
        <span className="flex-1 h-px bg-brand-border" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">or</span>
        <span className="flex-1 h-px bg-brand-border" />
      </div>

      <input
        type="email"
        placeholder="you@work.com"
        autoComplete="email"
        aria-label="Email"
        className="w-full h-11 px-3.5 border border-brand-border bg-white font-sans text-sm text-brand-aubergine outline-none transition-colors focus:border-brand-aubergine focus:shadow-[0_0_0_2px_rgba(255,175,16,0.25)] placeholder:text-brand-steel"
      />
      <button
        type="button"
        className="mt-2.5 w-full inline-flex items-center justify-center gap-2.5 h-12 px-6 bg-brand-aubergine text-white font-sans text-xs font-semibold uppercase tracking-wider-2 border border-brand-aubergine hover:bg-brand-aubergine-hover transition-colors"
      >
        Multiply yourself{' '}
        <span className="font-serif font-normal text-lg leading-none translate-y-px">→</span>
      </button>

      <p className="mt-3 text-center text-xs text-brand-steel leading-[1.45]">
        Free to start · no credit card · by continuing you agree to our{' '}
        <a href="#" className="underline underline-offset-2 decoration-brand-border">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="underline underline-offset-2 decoration-brand-border">
          Privacy
        </a>
        .
      </p>
    </aside>
  );
}

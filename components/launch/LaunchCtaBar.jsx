'use client';

import CountdownTimer from '@/components/launch/CountdownTimer';

export default function LaunchCtaBar({ onSignUp }) {
  return (
    <section className="w-full px-8 lg:pl-24 xl:pl-32 lg:pr-[6%] xl:pr-20 mb-16 sm:mb-20 lg:mb-24">
      <div className="relative overflow-hidden w-full rounded-[10px] bg-brand-aubergine py-14 sm:py-16 lg:py-20 px-8 lg:px-14">
        <img
          src="/surogate-orange.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-1/2 right-0 -translate-y-1/2 translate-x-[30%] w-[55%] max-w-[380px] h-auto opacity-15"
        />

        <div className="relative flex flex-col xl:flex-row items-center xl:items-start gap-10 xl:gap-8">
          <div className="xl:w-2/3 flex flex-col items-center xl:items-start gap-5">
            <p className="font-serif text-[16px] sm:text-[18px] uppercase tracking-[0.24em] text-white">
              Early access end in
            </p>
            <CountdownTimer theme="dark" size="lg" />
          </div>
          <div className="xl:w-1/3 flex flex-col items-center xl:items-start gap-5">
            <p
              aria-hidden="true"
              className="invisible hidden xl:block font-serif text-[16px] sm:text-[18px] uppercase tracking-[0.24em]"
            >
              Early access end in
            </p>
            <button
              type="button"
              onClick={onSignUp}
              className="reveal xl:mt-2 inline-flex items-center justify-center gap-4 h-16 pl-6 pr-10 bg-brand-orange text-brand-aubergine font-serif text-base font-semibold uppercase tracking-wider-2 border border-brand-orange hover:brightness-105 transition"
            >
              <img src="/surogate-icon.svg" alt="" aria-hidden="true" className="h-7 w-auto shrink-0" />
              Sign up now
            </button>
            <p className="font-serif italic text-[13px] text-white/60">No credit card required</p>
          </div>
        </div>
      </div>
    </section>
  );
}

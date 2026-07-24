'use client';

import { useState } from 'react';
import RevealRoot from '@/components/RevealRoot';
import SpotsClock from '@/components/launch/SpotsClock';
import CountdownTimer from '@/components/launch/CountdownTimer';
import SignupModal from '@/components/launch/SignupModal';

const DIAGONAL_CLIP = 'polygon(66.667% 0, 100% 0, 100% 100%, 15% 100%)';

export default function LaunchClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <RevealRoot>
      <div className="bg-brand-paper-warm text-brand-aubergine antialiased overflow-x-hidden">
        <section className="relative w-full lg:h-screen overflow-hidden bg-brand-paper-warm">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-0 bg-brand-paper"
            style={{ clipPath: DIAGONAL_CLIP }}
          />

          <div
            aria-hidden="true"
            className="hidden lg:block absolute z-[1] top-[30%] right-0 pointer-events-none"
            style={{
              width: 'min(34vw, 460px)',
              aspectRatio: '229 / 262',
              transform: 'translate(33%, -50%)',
              backgroundColor: 'rgba(20, 20, 20, 0.06)',
              WebkitMaskImage: 'url(/surogate-orange.svg)',
              maskImage: 'url(/surogate-orange.svg)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          />

          <div
            role="img"
            aria-label="Surogate"
            className="reveal hidden lg:block absolute z-10 top-10 left-24 xl:left-32 h-11 sm:h-12 bg-brand-aubergine"
            style={{
              WebkitMaskImage: 'url(/brand/logo-full-black.svg)',
              maskImage: 'url(/brand/logo-full-black.svg)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'left center',
              maskPosition: 'left center',
              aspectRatio: '702.57 / 227.69',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:h-full">
            {/* Left - brand intro */}
            <div className="order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left justify-center lg:justify-start px-8 py-20 lg:py-0 lg:pt-36 xl:pt-44 lg:flex-1 lg:pl-24 xl:pl-32 lg:pr-[6%] xl:pr-20">
              <p className="reveal font-mono text-[13px] sm:text-[14px] uppercase tracking-wider-2 text-brand-orange mb-2">
                Get 100 Autonomous Agents
              </p>
              <h1 className="reveal font-serif font-medium leading-[0.98] tracking-[-0.03em] text-[64px] sm:text-[92px] lg:text-[108px] mb-7">
                Multiply
                <br />
                <span className="text-brand-orange">yourself.</span>
              </h1>
              <p className="reveal text-[20px] leading-[1.55] text-brand-graphite max-w-[38ch]">
                AI agents trained on 100+ High Value Skills. Multiply productivity, efficiency &
                income overnight.
              </p>
            </div>

            {/* Right - spots + countdown */}
            <div className="order-1 lg:order-2 flex flex-col items-center justify-center px-8 py-20 lg:py-0 lg:flex-1 lg:pr-[10%] bg-brand-paper lg:bg-transparent">
              <div
                role="img"
                aria-label="Surogate"
                className="reveal lg:hidden mb-8 h-10 bg-brand-aubergine"
                style={{
                  WebkitMaskImage: 'url(/brand/logo-full-black.svg)',
                  maskImage: 'url(/brand/logo-full-black.svg)',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  aspectRatio: '702.57 / 227.69',
                }}
              />

              <div className="reveal mb-14 flex justify-center">
                <SpotsClock total={100} />
              </div>

              <p className="reveal font-serif text-[16px] sm:text-[18px] uppercase tracking-[0.24em] text-brand-aubergine mb-6">
                Early access end in
              </p>
              <div className="reveal mb-12">
                <CountdownTimer />
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="reveal inline-flex items-center justify-center gap-2.5 h-12 px-7 bg-brand-orange text-brand-aubergine font-serif text-sm font-semibold uppercase tracking-wider-2 border border-brand-orange hover:brightness-105 transition"
              >
                Sign up now
              </button>
              <p className="reveal mt-3 font-serif italic text-[13px] text-brand-steel">
                No credit card required
              </p>
            </div>
          </div>
        </section>
      </div>

      <SignupModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </RevealRoot>
  );
}

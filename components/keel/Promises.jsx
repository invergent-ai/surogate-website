import InlineSvg from '@/components/site/InlineSvg';
import { figure1Svg, figure2Svg, figure3Svg, figure4Svg } from './illustrations';

export default function Promises() {
  return (
    <>
      <section className="bg-brand-paper text-brand-aubergine">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Put agents to work on the processes that matter.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-brand-graphite">Move your most important work to agents, keep it compliant, and keep improving it as the business changes.</p>
          </div>
          <div className="flex flex-wrap gap-[24px]">
            <div className="flex-[1_1_440px] !box-border min-w-0 bg-white border border-brand-border text-brand-aubergine pt-[36px] px-[36px] pb-[28px] flex flex-col gap-[14px]">
              <InlineSvg className="contents" markup={figure1Svg} />
              <p className="mt-[10px] mx-0 mb-0 text-[14px] font-bold text-brand-wine">Run work end to end</p>
              <p className="m-0 text-[26px] leading-[1.2] font-extrabold tracking-[-0.015em]">Whole processes. Fully automated.</p>
              <p className="m-0 text-[16.5px] leading-[1.6] text-brand-graphite">Agents, people and your systems share one process, from the first form to the final payout. Every case keeps moving, and everyone can see where it stands.</p>
              <div className="mt-auto">
                <a className="inline-flex items-center min-h-[44px] text-brand-wine no-underline font-semibold text-[16px]" href="#pillars">See how a case is recorded<InlineSvg className="contents" markup={figure2Svg} />
                </a>
              </div>
            </div>
            <div className="flex-[1_1_440px] !box-border min-w-0 bg-white border border-brand-border text-brand-aubergine pt-[36px] px-[36px] pb-[28px] flex flex-col gap-[14px]">
              <InlineSvg className="contents" markup={figure3Svg} />
              <p className="mt-[10px] mx-0 mb-0 text-[14px] font-bold text-brand-wine">Change confidently</p>
              <p className="m-0 text-[26px] leading-[1.2] font-extrabold tracking-[-0.015em]">Fast changes. No surprises.</p>
              <p className="m-0 text-[16.5px] leading-[1.6] text-brand-graphite">Test every change on real scenarios before it goes live. Cases already in progress finish exactly as they started.</p>
              <div className="mt-auto">
                <a className="inline-flex items-center min-h-[44px] text-brand-wine no-underline font-semibold text-[16px]" href="#pillars">See how decisions are made<InlineSvg className="contents" markup={figure4Svg} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

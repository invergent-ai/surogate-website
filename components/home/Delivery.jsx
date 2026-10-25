import InlineSvg from '@/components/site/InlineSvg';
import { figure36Svg, figure37Svg, figure38Svg, figure39Svg, mortgageCasesMovingThroughFourSvg } from './illustrations';

export default function Delivery() {
  return (
    <>
      <section className="bg-brand-aubergine-2 text-white" id="keel">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[14px] max-w-[760px]">
            <h2 className="font-sans m-0 text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Agents that follow your process to the letter.</h2>
            <p className="m-0 text-[19px] leading-[1.5] text-[rgba(255,255,255,0.78)]">Define the process once. Agents work inside each step and stay on the path you set.</p>
          </div>
          <div className="flex flex-col gap-[14px]">
            <p className="m-0 text-[14px] text-[rgba(255,255,255,0.7)]">
              <strong className="text-[rgb(255,255,255)]">Mortgage applications</strong>, example case flow</p>
            <InlineSvg className="contents" markup={mortgageCasesMovingThroughFourSvg} />
          </div>
          <ul className="m-0 p-0 list-none flex flex-wrap gap-[16px]">
            <li className="flex-[1_1_300px] min-w-0 min-h-[170px] !box-border bg-brand-aubergine border-t-[3px] border-t-brand-yellow pt-[32px] px-[32px] pb-[36px] flex flex-col gap-[12px]">
              <p className="m-0 text-[24px] font-extrabold leading-[1.25] tracking-[-0.01em] text-white">Agents do whole steps.</p>
              <p className="m-0 text-[18px] leading-[1.55] text-[rgba(255,255,255,0.85)]">They read documents, use a browser and office files to complete their tasks like a human.</p>
            </li>
            <li className="flex-[1_1_300px] min-w-0 min-h-[170px] !box-border bg-brand-aubergine border-t-[3px] border-t-brand-yellow pt-[32px] px-[32px] pb-[36px] flex flex-col gap-[12px]">
              <p className="m-0 text-[24px] font-extrabold leading-[1.25] tracking-[-0.01em] text-white">Swap a person for an agent.</p>
              <p className="m-0 text-[18px] leading-[1.55] text-[rgba(255,255,255,0.85)]">Any step can move to an agent or back to a human, under the same approval limits.</p>
            </li>
            <li className="flex-[1_1_300px] min-w-0 min-h-[170px] !box-border bg-brand-aubergine border-t-[3px] border-t-brand-yellow pt-[32px] px-[32px] pb-[36px] flex flex-col gap-[12px]">
              <p className="m-0 text-[24px] font-extrabold leading-[1.25] tracking-[-0.01em] text-white">Stuck agents ask a person.</p>
              <p className="m-0 text-[18px] leading-[1.55] text-[rgba(255,255,255,0.85)]">It asks a question, shows what it found so far, and continues when it has the answer.</p>
            </li>
          </ul>
        </div>
      </section>
      <section className="bg-brand-paper border-t border-t-brand-border">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[14px] max-w-[760px]">
            <h2 className="font-sans m-0 text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.028em] font-extrabold">From idea to production in days.</h2>
            <p className="m-0 text-[19px] leading-[1.5] text-brand-graphite">One platform for every stage. Production is days away not months.</p>
          </div>
          <ol className="m-0 p-0 list-none flex flex-wrap gap-y-[32px] gap-x-[20px]">
            <li className="flex-[1_1_220px] min-w-0 flex flex-col gap-[16px]">
              <div className="flex items-center">
                <span className="flex-[0_0_auto] w-[40px] h-[40px] flex items-center justify-center bg-brand-aubergine text-white text-[17px] font-extrabold">1</span>
                <span className="flex-[1_1_auto] h-[2px] bg-brand-aubergine ml-[12px]" aria-hidden="true">
                </span>
              </div>
              <div className="h-[104px] bg-white border border-brand-border flex items-center justify-center">
                <InlineSvg className="contents" markup={figure36Svg} />
              </div>
              <h3 className="font-sans m-0 text-[22px] font-extrabold tracking-[-0.01em]">Build</h3>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Write skills and connect your tools and documents.</p>
            </li>
            <li className="flex-[1_1_220px] min-w-0 flex flex-col gap-[16px]">
              <div className="flex items-center">
                <span className="flex-[0_0_auto] w-[40px] h-[40px] flex items-center justify-center bg-brand-aubergine text-white text-[17px] font-extrabold">2</span>
                <span className="flex-[1_1_auto] h-[2px] bg-brand-aubergine ml-[12px]" aria-hidden="true">
                </span>
              </div>
              <div className="h-[104px] bg-white border border-brand-border flex items-center justify-center">
                <InlineSvg className="contents" markup={figure37Svg} />
              </div>
              <h3 className="font-sans m-0 text-[22px] font-extrabold tracking-[-0.01em]">Test</h3>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Try it with your people. Read every session step by step.</p>
            </li>
            <li className="flex-[1_1_220px] min-w-0 flex flex-col gap-[16px]">
              <div className="flex items-center">
                <span className="flex-[0_0_auto] w-[40px] h-[40px] flex items-center justify-center bg-brand-aubergine text-white text-[17px] font-extrabold">3</span>
                <span className="flex-[1_1_auto] h-[2px] bg-brand-aubergine ml-[12px]" aria-hidden="true">
                </span>
              </div>
              <div className="h-[104px] bg-white border border-brand-border flex items-center justify-center">
                <InlineSvg className="contents" markup={figure38Svg} />
              </div>
              <h3 className="font-sans m-0 text-[22px] font-extrabold tracking-[-0.01em]">Go live</h3>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Ship to web, Teams, WhatsApp or phone. Add Keel where needed.</p>
            </li>
            <li className="flex-[1_1_220px] min-w-0 flex flex-col gap-[16px]">
              <div className="flex items-center">
                <span className="flex-[0_0_auto] w-[40px] h-[40px] flex items-center justify-center bg-brand-aubergine text-white text-[17px] font-extrabold">4</span>
              </div>
              <div className="h-[104px] bg-white border border-brand-border flex items-center justify-center">
                <InlineSvg className="contents" markup={figure39Svg} />
              </div>
              <h3 className="font-sans m-0 text-[22px] font-extrabold tracking-[-0.01em]">Improve</h3>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Every change is a new version. Train a cheaper model on real sessions.</p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}

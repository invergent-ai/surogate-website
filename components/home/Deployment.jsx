import InlineSvg from '@/components/site/InlineSvg';
import { figure40Svg, figure41Svg, figure42Svg, figure43Svg, figure44Svg, figure45Svg, figure46Svg, figure47Svg, figure48Svg } from './illustrations';

export default function Deployment() {
  return (
    <>
      <section className="bg-white border-t border-t-brand-border" id="deployment">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <p className="m-0 font-mono text-[13px] tracking-[0.14em] text-brand-wine">DEPLOYMENT AND SECURITY</p>
            <h2 className="font-sans m-0 text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Runs where the client's data is</h2>
          </div>
          <div className="flex flex-wrap gap-[24px]">
            <div className="flex-[1_1_300px] min-w-0 p-0 flex flex-col gap-[12px]">
              <InlineSvg className="contents" markup={figure40Svg} />
              <h3 className="font-sans m-0 text-[20px] text-brand-aubergine font-bold">Surogate cloud</h3>
              <p className="m-0 text-[15.5px] leading-[1.55] text-brand-graphite">We run it, EU-hosted. The fastest way to a pilot.</p>
            </div>
            <div className="flex-[1_1_300px] min-w-0 p-0 flex flex-col gap-[12px]">
              <InlineSvg className="contents" markup={figure41Svg} />
              <h3 className="font-sans m-0 text-[20px] text-brand-aubergine font-bold">Your cloud or data centre</h3>
              <p className="m-0 text-[15.5px] leading-[1.55] text-brand-graphite">A single-tenant install on your own Kubernetes, on-premise or in the cloud.</p>
            </div>
            <div className="flex-[1_1_300px] min-w-0 p-0 flex flex-col gap-[12px]">
              <InlineSvg className="contents" markup={figure42Svg} />
              <h3 className="font-sans m-0 text-[20px] text-brand-aubergine font-bold">Air-gapped</h3>
              <p className="m-0 text-[15.5px] leading-[1.55] text-brand-graphite">No internet. Agents and Keel on the same install, with your own models.</p>
            </div>
          </div>
          <div className="bg-brand-aubergine text-white p-[40px] flex flex-col gap-[20px]">
            <div className="flex flex-wrap items-center gap-y-[12px] gap-x-[16px]">
              <h3 className="font-sans m-0 text-[28px] tracking-[-0.02em] leading-[1.2] font-bold">What your security team gets</h3>
              <span className="py-[4px] px-[10px] border border-white text-[13px] font-bold">ISO 27001</span>
            </div>
            <div className="flex flex-wrap gap-y-[0] gap-x-[40px]">
              <div className="flex-[1_1_340px] min-w-0 flex gap-[16px] items-start py-[20px] px-0 border-t border-t-[rgba(255,255,255,0.14)]">
                <span className="flex-[0_0_44px] h-[44px] flex items-center justify-center border border-[rgba(255,175,16,0.6)] text-brand-orange">
                  <InlineSvg className="contents" markup={figure43Svg} />
                </span>
                <div className="flex flex-col gap-[4px] min-w-0">
                  <span className="font-extrabold text-[18px] text-[rgb(255,255,255)]">Open-source runtime</span>
                  <span className="text-[15.5px] leading-[1.5] text-[rgba(255,255,255,0.8)]">Your security team can audit every line on GitHub.</span>
                </div>
              </div>
              <div className="flex-[1_1_340px] min-w-0 flex gap-[16px] items-start py-[20px] px-0 border-t border-t-[rgba(255,255,255,0.14)]">
                <span className="flex-[0_0_44px] h-[44px] flex items-center justify-center border border-[rgba(255,175,16,0.6)] text-brand-orange">
                  <InlineSvg className="contents" markup={figure44Svg} />
                </span>
                <div className="flex flex-col gap-[4px] min-w-0">
                  <span className="text-[18px] font-extrabold text-white">Your data stays home</span>
                  <span className="text-[15.5px] leading-[1.5] text-[rgba(255,255,255,0.8)]">Run it on your own Kubernetes with your own models.</span>
                </div>
              </div>
              <div className="flex-[1_1_340px] min-w-0 flex gap-[16px] items-start py-[20px] px-0 border-t border-t-[rgba(255,255,255,0.14)]">
                <span className="flex-[0_0_44px] h-[44px] flex items-center justify-center border border-[rgba(255,175,16,0.6)] text-brand-orange">
                  <InlineSvg className="contents" markup={figure45Svg} />
                </span>
                <div className="flex flex-col gap-[4px] min-w-0">
                  <span className="font-extrabold text-[18px] text-[rgb(255,255,255)]">Isolated agent sandboxes</span>
                  <span className="text-[15.5px] leading-[1.5] text-[rgba(255,255,255,0.8)]">Each agent session runs in its own container.</span>
                </div>
              </div>
              <div className="flex-[1_1_340px] min-w-0 flex gap-[16px] items-start py-[20px] px-0 border-t border-t-[rgba(255,255,255,0.14)]">
                <span className="flex-[0_0_44px] h-[44px] flex items-center justify-center border border-[rgba(255,175,16,0.6)] text-brand-orange">
                  <InlineSvg className="contents" markup={figure46Svg} />
                </span>
                <div className="flex flex-col gap-[4px] min-w-0">
                  <span className="text-[18px] font-extrabold text-white">Tools granted per agent</span>
                  <span className="text-[15.5px] leading-[1.5] text-[rgba(255,255,255,0.8)]">Each agent reaches only the tools it was given.</span>
                </div>
              </div>
              <div className="flex-[1_1_340px] min-w-0 flex gap-[16px] items-start py-[20px] px-0 border-t border-t-[rgba(255,255,255,0.14)]">
                <span className="flex-[0_0_44px] h-[44px] flex items-center justify-center border border-[rgba(255,175,16,0.6)] text-brand-orange">
                  <InlineSvg className="contents" markup={figure47Svg} />
                </span>
                <div className="flex flex-col gap-[4px] min-w-0">
                  <span className="text-[18px] font-extrabold text-[rgb(255,255,255)]">Encrypted credentials</span>
                  <span className="text-[15.5px] leading-[1.5] text-[rgba(255,255,255,0.8)]">Agents use credentials without seeing them.</span>
                </div>
              </div>
              <div className="flex-[1_1_340px] min-w-0 flex gap-[16px] items-start py-[20px] px-0 border-t border-t-[rgba(255,255,255,0.14)]">
                <span className="flex-[0_0_44px] h-[44px] flex items-center justify-center border border-[rgba(255,175,16,0.6)] text-brand-orange">
                  <InlineSvg className="contents" markup={figure48Svg} />
                </span>
                <div className="flex flex-col gap-[4px] min-w-0">
                  <span className="text-[18px] font-extrabold text-[rgb(255,255,255)]">Everything is recorded</span>
                  <span className="text-[15.5px] leading-[1.5] text-[rgba(255,255,255,0.8)]">Every session and case step is logged and exportable.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

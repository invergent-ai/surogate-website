import InlineSvg from '@/components/site/InlineSvg';
import { figure0Svg, figure1Svg, figure2Svg, figure3Svg } from './illustrations';

export default function HomeHero() {
  return (
    <>
      <section className="bg-brand-aubergine text-white" id="top">
        <div className="max-w-[1200px] my-0 mx-auto pt-[88px] px-[24px] pb-[104px] flex flex-wrap gap-[56px] items-center">
          <div className="flex-[1_1_480px] min-w-0 flex flex-col gap-[28px]">
            <p className="m-0 font-mono text-[13px] tracking-[0.14em] text-brand-orange">BUILD AI THAT WORKS FOR YOU</p>
            <h1 className="font-sans m-0 text-[clamp(44px,6vw,68px)] leading-[1.0] tracking-[-0.035em] font-extrabold">Your workforce, multiplied.</h1>
            <p className="m-0 text-[20px] leading-[1.5] text-[rgba(255,255,255,0.8)] max-w-[580px]">Every team works with agents that read, check, draft and follow your processes, on your own infrastructure.</p>
            <div className="flex flex-wrap gap-[12px]">
              <a className="inline-flex items-center min-h-[52px] py-0 px-[24px] bg-brand-orange text-brand-aubergine no-underline font-bold text-[16px]" href="https://ops.surogate.ai">Start building</a>
              <a className="inline-flex items-center min-h-[52px] py-0 px-[24px] border border-[rgba(255,255,255,0.4)] text-white no-underline font-semibold text-[16px]" href="https://docs.surogate.ai">Read the docs</a>
            </div>
          </div>
          <div className="flex-[1_1_540px] min-w-0 flex flex-col gap-[18px]" role="img" aria-label="What Surogate sells, drawn as three stacked layers. On top, Keel, agentic orchestration, where agents return only declared outcomes. In the middle, Surogate Agents, the agentic platform, an open-source harness that runs air-gapped. At the bottom, custom models drawn as chips on a circuit board: our own 35B-A3B language model and STT and TTS voice models. All of it runs on Surogate cloud, the client's Kubernetes or an air-gapped network.">
            <InlineSvg className="contents" markup={figure0Svg} />
            <div className="flex flex-col gap-[12px]">
              <p className="m-0 font-mono text-[11.5px] tracking-[0.14em] text-[rgba(255,255,255,0.6)]">RUNS WHERE YOUR DATA LIVES</p>
              <div className="flex flex-wrap gap-[10px]">
                <div className="sg-target flex-[1_1_150px] min-w-0 border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.02)] pt-[14px] px-[14px] pb-[16px] flex flex-col gap-[10px]" style={{ animationDelay: '2.4s' }}>
                  <InlineSvg className="contents" markup={figure1Svg} />
                  <span className="text-[14.5px] font-bold text-white">Surogate cloud</span>
                  <span className="text-[12.5px] leading-[1.45] text-[rgba(255,255,255,0.72)]">We run it. The fastest way to a pilot.</span>
                </div>
                <div className="sg-target flex-[1_1_150px] min-w-0 border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.02)] pt-[14px] px-[14px] pb-[16px] flex flex-col gap-[10px]" style={{ animationDelay: '5.4s' }}>
                  <InlineSvg className="contents" markup={figure2Svg} />
                  <span className="text-[14.5px] font-bold text-white">Kubernetes</span>
                  <span className="text-[12.5px] leading-[1.45] text-[rgba(255,255,255,0.72)]">Single-tenant, in your cloud or data centre.</span>
                </div>
                <div className="sg-target flex-[1_1_150px] min-w-0 border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.02)] pt-[14px] px-[14px] pb-[16px] flex flex-col gap-[10px]" style={{ animationDelay: '8.4s' }}>
                  <InlineSvg className="contents" markup={figure3Svg} />
                  <span className="text-[14.5px] font-bold text-white">Air-gapped</span>
                  <span className="text-[12.5px] leading-[1.45] text-[rgba(255,255,255,0.72)]">No internet. Runs on your own models.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

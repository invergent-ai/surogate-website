import InlineSvg from '@/components/site/InlineSvg';
import { withOnlyInstructionsAnAgentSvg } from './illustrations';

export default function Problem() {
  return (
    <>
      <section className="bg-brand-aubergine-2 text-white">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-wrap items-center gap-y-[48px] gap-x-[64px]">
          <div className="flex-[1_1_520px] min-w-0">
            <InlineSvg className="contents" markup={withOnlyInstructionsAnAgentSvg} />
          </div>
          <div className="flex-[1_1_400px] min-w-0 flex flex-col gap-[16px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">An agent with instructions still improvises.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-[rgba(255,255,255,0.78)]">It reads the prompt, then decides on its own what to do next. With Keel, every case follows a fixed path and the agent only does the step in front of it.</p>
          </div>
        </div>
      </section>
    </>
  );
}

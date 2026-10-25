import InlineSvg from '@/components/site/InlineSvg';
import { theImprovementLoopSessionsBecomeSvg } from './illustrations';

export default function Improve() {
  return (
    <>
      <section className="bg-brand-aubergine-2 text-white">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Agents that improve from their own sessions.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-[rgba(255,255,255,0.78)]">Mark sessions as good or bad, and the studio turns them into training data, fine-tunes, scores and experts.</p>
          </div>
          <InlineSvg className="contents" markup={theImprovementLoopSessionsBecomeSvg} />
          <div className="flex flex-wrap gap-y-[36px] gap-x-[40px]">
            <div className="flex-[1_1_300px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
              <p className="m-0 text-[18px] font-bold">Skill optimisation</p>
              <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">Rewrites a skill against generated tasks and keeps the best version. Nothing changes until you apply it.</p>
            </div>
            <div className="flex-[1_1_300px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
              <p className="m-0 text-[18px] font-bold">Experts</p>
              <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">A skill backed by its own fine-tuned model, which the agent consults in a bounded loop.</p>
            </div>
            <div className="flex-[1_1_300px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
              <p className="m-0 text-[18px] font-bold">Any GPU</p>
              <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">Connect AWS, Azure, GCP, Nebius, RunPod, Modal, Oracle, Vast.ai or your own servers.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

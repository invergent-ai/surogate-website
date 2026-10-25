import InlineSvg from '@/components/site/InlineSvg';
import { aProgramTimelineEnrolledOnSvg } from './illustrations';

export default function LongRunning() {
  return (
    <>
      <section className="bg-brand-paper text-brand-aubergine border-t border-t-brand-border">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Work that runs for hours, days or months.</h2>
          </div>
          <div className="flex flex-wrap gap-[16px]">
            <div className="flex-[1_1_250px] !box-border min-w-0 bg-white border border-brand-border p-[26px] flex flex-col gap-[12px]">
              <p className="m-0 font-mono text-[22px] font-semibold text-brand-wine">/goal</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Works until a separate evaluator, reading the evidence, says the goal is met.</p>
            </div>
            <div className="flex-[1_1_250px] !box-border min-w-0 bg-white border border-brand-border p-[26px] flex flex-col gap-[12px]">
              <p className="m-0 font-mono text-[22px] font-semibold text-brand-wine">/mission</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Splits an objective into tasks for sub-agents and judges the results against your rubric.</p>
            </div>
            <div className="flex-[1_1_250px] !box-border min-w-0 bg-white border border-brand-border p-[26px] flex flex-col gap-[12px]">
              <p className="m-0 font-mono text-[22px] font-semibold text-brand-wine">/loop</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Runs a prompt every few minutes, hours or days.</p>
            </div>
            <div className="flex-[1_1_250px] !box-border min-w-0 bg-white border border-brand-border p-[26px] flex flex-col gap-[12px]">
              <p className="m-0 font-mono text-[22px] font-semibold text-brand-wine">/deep-research</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Returns a cited report, researched and written by two sub-agents.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-y-[36px] gap-x-[40px]">
            <div className="flex-[1_1_420px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">Sub-agents that share notes</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Parallel helpers write to a board of checked notes, so a dead end one of them found is not repeated by the next.</p>
            </div>
            <div className="flex-[1_1_420px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">Tasks that survive crashes</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">A task is stored and retried up to three times, and each retry reads what went wrong before.</p>
            </div>
          </div>
          <div className="flex flex-col gap-[22px] p-[32px] bg-white border border-brand-border">
            <div className="flex flex-col gap-[8px] max-w-[760px]">
              <p className="m-0 text-[24px] font-extrabold">Programs: the agent writes first.</p>
              <p className="m-0 text-[17px] leading-[1.6] text-brand-graphite">Enrol people in a journey and the agent follows up on the days you choose, on WhatsApp, Slack, Telegram or by phone. It writes each message, reads the replies, and alerts your team when a person is needed.</p>
            </div>
            <InlineSvg className="contents" markup={aProgramTimelineEnrolledOnSvg} />
          </div>
        </div>
      </section>
    </>
  );
}

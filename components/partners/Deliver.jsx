import InlineSvg from '@/components/site/InlineSvg';
import { oneAgentBuiltOnceAndSvg } from './illustrations';

export default function Deliver() {
  return (
    <>
      <section className="bg-brand-paper text-brand-aubergine" id="deliver">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Deliver the whole stack.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-brand-graphite">Run it on our cloud, or on the client's own Kubernetes, air-gapped networks included.</p>
          </div>
          <div className="flex flex-wrap gap-[24px] items-stretch">
            <div className="flex-[999_1_520px] min-w-0 bg-brand-aubergine text-white pt-[44px] px-[44px] pb-[40px] flex flex-col gap-[14px]">
              <p className="m-0 text-[clamp(28px,3vw,36px)] font-extrabold tracking-[-0.02em]">Surogate Agents</p>
              <p className="m-0 text-[18px] leading-[1.6] text-[rgba(255,255,255,0.82)] max-w-[560px]">Agents with their own computer, browser and files, working with the client's skills, knowledge and channels. Your team builds an agent once and deploys it to every client.</p>
              <InlineSvg className="contents" markup={oneAgentBuiltOnceAndSvg} />
              <a className="mt-auto pt-[12px] text-[16px] font-bold text-brand-orange underline" href="/agents/">See Surogate Agents</a>
            </div>
            <div className="flex-[1_1_340px] min-w-0 flex flex-col gap-[24px]">
              <div className="flex-[1_1_auto] bg-white border border-brand-border p-[32px] flex flex-col gap-[10px]">
                <p className="m-0 text-[22px] font-extrabold tracking-[-0.01em]">Keel</p>
                <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">Processes where agents, people and systems each do their step, under rules and approval limits the client owns.</p>
                <a className="mt-auto pt-[8px] text-[15px] font-bold text-brand-wine underline" href="/keel/">See Keel</a>
              </div>
              <div className="flex-[1_1_auto] bg-white border border-brand-border p-[32px] flex flex-col gap-[10px]">
                <p className="m-0 text-[22px] font-extrabold tracking-[-0.01em]">Custom models</p>
                <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">Models trained on the client's data, from fine-tuning and evaluation to serving, speech included.</p>
                <a className="mt-auto pt-[8px] text-[15px] font-bold text-brand-wine underline" href="/labs/">See the models</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

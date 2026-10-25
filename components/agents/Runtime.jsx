import InlineSvg from '@/components/site/InlineSvg';
import { howATurnRunsASvg } from './illustrations';

export default function Runtime() {
  return (
    <>
      <section className="bg-brand-aubergine text-white">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">The runtime you would otherwise build yourself.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-[rgba(255,255,255,0.78)]">Sessions, sandboxes, credentials and rules are part of the platform, and the runtime is open source.</p>
          </div>
          <InlineSvg className="contents" markup={howATurnRunsASvg} />
          <div className="flex flex-wrap gap-y-[40px] gap-x-[56px]">
            <div className="flex-[1_1_460px] min-w-0 flex flex-col gap-[22px]">
              <p className="m-0 text-[22px] font-extrabold">It keeps working</p>
              <div className="flex flex-wrap gap-y-[18px] gap-x-[0]">
                <div className="flex-[1_1_400px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
                  <p className="m-0 text-[18px] font-bold">Sessions that survive crashes</p>
                  <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">If a worker dies mid-turn, another resumes from the log.</p>
                </div>
                <div className="flex-[1_1_400px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
                  <p className="m-0 text-[18px] font-bold">Saga rollback</p>
                  <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">When a step fails, finished steps are undone in reverse order.</p>
                </div>
                <div className="flex-[1_1_400px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
                  <p className="m-0 text-[18px] font-bold">A browser you can take over</p>
                  <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">Take control for a login or a CAPTCHA, then hand it back.</p>
                </div>
                <div className="flex-[1_1_400px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
                  <p className="m-0 text-[18px] font-bold">Office files, edited live</p>
                  <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">Word, Excel, PowerPoint and PDF beside the chat. Your edits win.</p>
                </div>
              </div>
            </div>
            <div className="flex-[1_1_460px] min-w-0 flex flex-col gap-[22px]">
              <p className="m-0 text-[22px] font-extrabold">It stays inside the rules</p>
              <div className="flex flex-wrap gap-y-[18px] gap-x-[0]">
                <div className="flex-[1_1_400px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
                  <p className="m-0 text-[18px] font-bold">Keys the agent never sees</p>
                  <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">The proxy adds credentials on the way out.</p>
                </div>
                <div className="flex-[1_1_400px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
                  <p className="m-0 text-[18px] font-bold">Rules fixed for each turn</p>
                  <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">Text injected mid-turn cannot loosen the tool policy.</p>
                </div>
                <div className="flex-[1_1_400px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
                  <p className="m-0 text-[18px] font-bold">Approvals</p>
                  <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">Sensitive calls wait in the inbox. A grant covers one call, for one hour.</p>
                </div>
                <div className="flex-[1_1_400px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
                  <p className="m-0 text-[18px] font-bold">Checked tools</p>
                  <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">Definitions are scanned for hidden instructions and fingerprinted against changes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

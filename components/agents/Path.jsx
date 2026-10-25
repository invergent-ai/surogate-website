export default function Path() {
  return (
    <>
      <section className="bg-brand-paper text-brand-aubergine">
        <div className="max-w-[1200px] my-0 mx-auto pt-[200px] px-[24px] pb-[104px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">From a blank page to a live agent in about ten minutes.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-brand-graphite">Every part of an agent is a screen in the studio, and the studio checks it as you go.</p>
          </div>
          <ol className="list-none m-0 p-0 flex flex-wrap gap-[28px]">
            <li className="flex-[1_1_190px] min-w-0 flex flex-col gap-[12px] pt-[20px] border-t-[3px] border-t-brand-aubergine">
              <span className="font-mono text-[14px] text-brand-wine">01</span>
              <p className="m-0 text-[22px] font-extrabold tracking-[-0.01em]">Create</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Start from a template or a blank agent. It is running in about 30 seconds.</p>
            </li>
            <li className="flex-[1_1_190px] min-w-0 flex flex-col gap-[12px] pt-[20px] border-t-[3px] border-t-brand-border">
              <span className="font-mono text-[14px] text-brand-wine">02</span>
              <p className="m-0 text-[22px] font-extrabold tracking-[-0.01em]">Teach</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Attach skills and knowledge bases. Upload your documents and build them into a wiki.</p>
            </li>
            <li className="flex-[1_1_190px] min-w-0 flex flex-col gap-[12px] pt-[20px] border-t-[3px] border-t-brand-border">
              <span className="font-mono text-[14px] text-brand-wine">03</span>
              <p className="m-0 text-[22px] font-extrabold tracking-[-0.01em]">Govern</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Choose the tools it may use, the calls that need approval and the sites it may browse.</p>
            </li>
            <li className="flex-[1_1_190px] min-w-0 flex flex-col gap-[12px] pt-[20px] border-t-[3px] border-t-brand-border">
              <span className="font-mono text-[14px] text-brand-wine">04</span>
              <p className="m-0 text-[22px] font-extrabold tracking-[-0.01em]">Test</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Chat with it in the studio and see every tool call, file and decision.</p>
            </li>
            <li className="flex-[1_1_190px] min-w-0 flex flex-col gap-[12px] pt-[20px] border-t-[3px] border-t-brand-border">
              <span className="font-mono text-[14px] text-brand-wine">05</span>
              <p className="m-0 text-[22px] font-extrabold tracking-[-0.01em]">Publish</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Put it on Slack, Teams, WhatsApp, the phone or your website.</p>
            </li>
          </ol>
          <div className="flex flex-wrap gap-y-[8px] gap-x-[24px] items-baseline py-[22px] px-[26px] bg-white border border-brand-border">
            <p className="m-0 text-[17px] font-bold">The Copilot can take any step for you.</p>
            <p className="m-0 flex-[1_1_420px] text-[16px] leading-[1.55] text-brand-graphite">It asks what the agent is for, shows a plan, and builds only what you approve. Anything that reaches people or money needs its own yes.</p>
          </div>
        </div>
      </section>
    </>
  );
}

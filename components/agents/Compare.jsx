export default function Compare() {
  return (
    <>
      <section className="bg-white text-brand-aubergine border-t border-t-brand-border">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">How it compares.</h2>
          </div>
          <div className="ag-wide flex gap-[40px] pt-0 px-0 pb-[12px] text-[14px] font-semibold text-brand-graphite">
            <span className="flex-[0_0_240px]">
            </span>
            <span className="flex-[1_1_0]">Elsewhere</span>
            <span className="flex-[1_1_0]">In Surogate Agents</span>
          </div>
          <div className="border-b border-b-brand-border">
            <div className="flex flex-wrap gap-y-[10px] gap-x-[40px] py-[24px] px-0 border-t border-t-brand-border">
              <div className="flex-[0_0_240px]">
                <p className="m-0 text-[19px] font-bold">Agent frameworks</p>
                <p className="mt-[4px] mx-0 mb-0 text-[14px] text-brand-graphite">LangChain, LangGraph</p>
              </div>
              <p className="m-0 flex-[1_1_280px] min-w-0 text-[16.5px] leading-[1.55] text-brand-graphite">You write the agent in code, then build sessions, sandboxes, channels and governance around it.</p>
              <p className="m-0 flex-[1_1_280px] min-w-0 text-[16.5px] leading-[1.55] font-semibold">Those come with the platform, and agents are built in the studio.</p>
            </div>
            <div className="flex flex-wrap gap-y-[10px] gap-x-[40px] py-[24px] px-0 border-t border-t-brand-border">
              <div className="flex-[0_0_240px]">
                <p className="m-0 text-[19px] font-bold">Coding agents</p>
                <p className="mt-[4px] mx-0 mb-0 text-[14px] text-brand-graphite">Claude Code, Codex</p>
              </div>
              <p className="m-0 flex-[1_1_280px] min-w-0 text-[16.5px] leading-[1.55] text-brand-graphite">One person, on one machine, in one terminal.</p>
              <p className="m-0 flex-[1_1_280px] min-w-0 text-[16.5px] leading-[1.55] font-semibold">Whole teams on nine channels, with governance and a record of every step. Claude Code and Codex can run inside a session.</p>
            </div>
            <div className="flex flex-wrap gap-y-[10px] gap-x-[40px] py-[24px] px-0 border-t border-t-brand-border">
              <div className="flex-[0_0_240px]">
                <p className="m-0 text-[19px] font-bold">Managed agent platforms</p>
              </div>
              <p className="m-0 flex-[1_1_280px] min-w-0 text-[16.5px] leading-[1.55] text-brand-graphite">The vendor builds and runs the agents on its own cloud.</p>
              <p className="m-0 flex-[1_1_280px] min-w-0 text-[16.5px] leading-[1.55] font-semibold">Your team builds them, in your cloud or air-gapped, with any model.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

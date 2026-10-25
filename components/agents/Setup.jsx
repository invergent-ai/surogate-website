export default function Setup() {
  return (
    <>
      <section className="bg-white text-brand-aubergine border-t border-t-brand-border">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Every part of an agent, on its own screen.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-brand-graphite">Eight tabs describe an agent. Change one and the next session uses it, with no rollout.</p>
          </div>
          <div className="flex flex-wrap gap-y-[36px] gap-x-[40px]">
            <div className="flex-[1_1_250px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <span className="self-start py-[4px] px-[9px] text-[13px] font-semibold border border-brand-border">Identity</span>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">The soul: who the agent is, how it speaks, what it refuses. Screened for prompt injection.</p>
            </div>
            <div className="flex-[1_1_250px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <span className="self-start py-[4px] px-[9px] text-[13px] font-semibold border border-brand-border">Skills</span>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Procedures in markdown or drawn on the canvas. Every version is kept, and each session records the one it used.</p>
            </div>
            <div className="flex-[1_1_250px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <span className="self-start py-[4px] px-[9px] text-[13px] font-semibold border border-brand-border">Knowledge Bases</span>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Your documents as a searchable wiki, with the source passage behind every answer.</p>
            </div>
            <div className="flex-[1_1_250px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <span className="self-start py-[4px] px-[9px] text-[13px] font-semibold border border-brand-border">Tools</span>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">MCP servers and more than 1,000 Composio toolkits, scanned before the agent sees them.</p>
            </div>
            <div className="flex-[1_1_250px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <span className="self-start py-[4px] px-[9px] text-[13px] font-semibold border border-brand-border">Model</span>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Ours, your fine-tunes, OpenRouter or any OpenAI-compatible endpoint.</p>
            </div>
            <div className="flex-[1_1_250px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <span className="self-start py-[4px] px-[9px] text-[13px] font-semibold border border-brand-border">Capabilities</span>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">The browser, Claude Code and Codex, deep research, goals, missions and schedules.</p>
            </div>
            <div className="flex-[1_1_250px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <span className="self-start py-[4px] px-[9px] text-[13px] font-semibold border border-brand-border">Coding</span>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Repositories the agent can branch, change and open pull requests on.</p>
            </div>
            <div className="flex-[1_1_250px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <span className="self-start py-[4px] px-[9px] text-[13px] font-semibold border border-brand-border">Governance</span>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Allowed tools, approvals, browsing rules and the EU AI Act notice.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

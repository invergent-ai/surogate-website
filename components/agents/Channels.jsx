export default function Channels() {
  return (
    <>
      <section className="bg-white text-brand-aubergine border-t border-t-brand-border">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">One agent on nine channels.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-brand-graphite">A person who moves from the web to Slack or WhatsApp keeps the same conversations, memory and allowance.</p>
          </div>
          <div className="flex flex-wrap gap-y-[28px] gap-x-[40px]">
            <div className="flex-[1_1_330px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">Web app</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Always on, with your agent's name and logo.</p>
            </div>
            <div className="flex-[1_1_330px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">Website widget</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">A chat bubble on your own site.</p>
            </div>
            <div className="flex-[1_1_330px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">API</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">OpenAI-compatible. Every call runs the whole agent.</p>
            </div>
            <div className="flex-[1_1_330px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">Slack</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Channels and DMs. It can follow a channel and speak up.</p>
            </div>
            <div className="flex-[1_1_330px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">Microsoft Teams</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">In your own Microsoft tenant.</p>
            </div>
            <div className="flex-[1_1_330px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">WhatsApp</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Templates, quick replies and native forms.</p>
            </div>
            <div className="flex-[1_1_330px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">Telegram</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Groups, threads and private chats.</p>
            </div>
            <div className="flex-[1_1_330px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">Discord</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Your own bot in your servers.</p>
            </div>
            <div className="flex-[1_1_330px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">Phone</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Inbound calls, in the voice you choose.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

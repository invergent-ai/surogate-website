export default function PricingMultiAgent() {
  return (
    <section
      data-screen-label="02 Multi-agent"
      className="relative bg-brand-fog py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-container mx-auto px-8">
        <div className="mb-12 max-w-[820px]">
          <h2 className="reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[36px] sm:text-[48px] lg:text-[60px] text-brand-aubergine">
            Running more than one agent costs you{' '}
            <span className="italic font-medium text-brand-orange">nothing extra</span>.
          </h2>
          <div className="reveal mt-5 text-[15.5px] leading-[1.6] text-brand-graphite max-w-[68ch] space-y-4">
            <p>
              A lot of agent platforms charge per agent — $50/month each. Five agents, $250/month.
              We think that&apos;s backwards. Once you have a useful agent, you want more of them: one
              watching your inbox, one writing the report, one monitoring a competitor&apos;s site.
            </p>
            <p>
              Every plan includes a generous number of agents at no extra cost —
              100 on Standard, 500 on Pro, 1,000 on Max. Spin up as many as your work needs;
              you pay for what your agents actually <em>do</em> (tokens, compute), not for how
              many you create.
            </p>
          </div>
        </div>

        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-brand-border p-9 lg:p-10 flex flex-col gap-4">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-wider-2 text-brand-steel">
              Typical agent platform
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-[52px] font-semibold leading-none tracking-display text-brand-aubergine">
                $50
              </span>
              <span className="font-mono text-[20px] text-brand-steel">× 5</span>
            </div>
            <p className="text-[14px] leading-[1.55] text-brand-graphite max-w-[52ch]">
              $250/month to run just 5 agents. Each new agent is a new line item. Tokens
              often bundled in, whether you use them or not.
            </p>
          </div>

          <div className="bg-brand-aubergine text-white border border-brand-aubergine p-9 lg:p-10 flex flex-col gap-4">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-wider-2 text-brand-yellow">
              Surogate Max plan
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-[52px] font-semibold leading-none tracking-display text-white">
                $144
              </span>
              <span className="font-mono text-[14px] text-white/55">/month</span>
            </div>
            <p className="text-[14px] leading-[1.55] text-white/72 max-w-[52ch]">
              Up to 1,000 agents, 22M tokens included, the developer toolkit, the hub,
              the browser — one bill. A fraction of what other platforms charge for a handful of
              agents.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

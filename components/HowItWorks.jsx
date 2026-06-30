export default function HowItWorks() {
  return (
    <section id="how" data-screen-label="05 How it works" className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="reveal mt-3.5 mx-auto max-w-[22ch] font-serif italic font-medium leading-[1.02] tracking-hl-tight text-[36px] sm:text-[48px] lg:text-[60px] text-brand-aubergine">
            The only thing that doesn&apos;t scale is you.
            <br />
            Here&apos;s how to fix that.
          </h2>
        </div>

        <div className="grid gap-px bg-brand-border border border-brand-border grid-cols-1 lg:grid-cols-3">
          <Step
            num="1"
            title="Build the version of you that never stops working."
            body="Define what your Surogate agent does - its goals, its tools, its rules. No code required. If you understand your workflow, you can build the agent that runs it."
          />
          <Step
            num="2"
            title="Deploy it to the cloud. It runs without you."
            body="Your Surogate agent lives in the cloud, not on your laptop. Once deployed, it executes continuously - processing, reporting, coordinating - whether you're there or not."
          />
          <Step
            num="3"
            title="Come back to results, not a blank screen."
            body="Your Surogate agent reports back when it's done, when something needs your attention, or when it's time to scale. You review. You decide. It keeps running."
            payoff
          >
            <div
              aria-hidden="true"
              className="mt-auto bg-white border border-brand-border shadow-sm py-3 px-3.5 flex items-center gap-2.5 font-mono text-[11px] text-brand-graphite"
            >
              <span className="w-6 h-6 inline-flex items-center justify-center text-brand-orange">
                <img src="/brand/rabbit-orange.svg" alt="" className="w-full h-full object-contain" />
              </span>
              <span className="text-brand-aubergine font-sans font-medium text-[13px]">
                Briefing ready · Q3 competitive watch
              </span>
              <span className="ml-auto font-mono text-brand-steel">07:14</span>
            </div>
          </Step>
        </div>
      </div>
    </section>
  );
}

function Step({ num, title, body, payoff, children }) {
  return (
    <div
      className={`reveal p-9 lg:px-8 lg:py-10 relative flex flex-col gap-3.5 min-h-[320px] ${
        payoff ? 'bg-grad-payoff' : 'bg-white'
      }`}
    >
      <div
        className={`font-serif text-7xl font-medium leading-none tracking-[-0.04em] mb-1 ${
          payoff ? 'text-brand-orange' : 'text-brand-steel'
        }`}
      >
        {num}
      </div>
      <h4 className="m-0 font-serif text-[22px] font-semibold tracking-[-0.012em] leading-[1.22] max-w-[22ch] text-brand-aubergine">
        {title}
      </h4>
      <p className="m-0 text-[14.5px] leading-[1.6] text-brand-graphite">{body}</p>
      {children}
    </div>
  );
}

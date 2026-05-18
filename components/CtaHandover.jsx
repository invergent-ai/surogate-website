const TIMELINE = [
  { time: '17:30', label: 'You close the laptop.', actor: 'you' },
  { time: '19:00', label: 'First drafts in your voice.', actor: 'writing agent' },
  { time: '22:00', label: 'Outreach delivered, replies tracked.', actor: 'outreach agent' },
  { time: '07:14', label: 'Morning briefing ready.', actor: 'research agent' },
];

export default function CtaHandover() {
  return (
    <section data-screen-label="07 CTA" className="relative overflow-hidden bg-brand-aubergine text-white pt-10 sm:pt-12 lg:pt-14 pb-24 sm:pb-28 lg:pb-32">
      <div className="absolute inset-0 bg-evening-glow pointer-events-none" />
      <div className="relative max-w-[880px] mx-auto px-8 text-center">
        <img
          src="/brand/Surogate-Logo-White.png"
          alt="Surogate"
          className="reveal block mx-auto -mt-10 sm:-mt-12 lg:-mt-14 mb-6 w-56 sm:w-72 lg:w-[clamp(220px,28vw,360px)] h-auto opacity-95"
        />
        <h2 className="reveal mt-4 mb-7 font-serif font-medium italic leading-[0.98] tracking-[-0.03em] text-[48px] sm:text-[64px] lg:text-[clamp(48px,7vw,96px)] text-white">
          The second shift starts
          <br />
          when you stop
        </h2>
        <p className="reveal text-[19px] leading-[1.55] text-white/72 max-w-[56ch] mx-auto mb-9">
          Your Surogate agent keeps working after you close the laptop. Set it up today - free, no code, ready in minutes.
        </p>

        <div className="reveal flex gap-3 flex-wrap justify-center">
          <a
            href="https://ops.surogate.ai"
            className="inline-flex items-center justify-center gap-2.5 h-12 px-6 bg-grad-sun text-brand-aubergine font-sans text-xs font-semibold uppercase tracking-wider-2 border border-brand-orange hover:brightness-105 transition"
          >
            Multiply your output - free{' '}
            <span className="font-serif font-normal text-lg leading-none translate-y-px">→</span>
          </a>
        </div>

        <div
          aria-hidden="true"
          className="relative mt-16 pt-7 border-t border-white/10 grid gap-6 text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 before:content-[''] before:absolute before:-top-px before:left-0 before:right-0 before:h-px before:bg-timeline-rail"
        >
          {TIMELINE.map((item) => (
            <div key={item.time} className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] text-brand-yellow font-semibold tracking-[0.05em]">
                {item.time}
              </span>
              <span className="font-sans text-[13px] text-white/82">{item.label}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider-2 text-white/45">
                - {item.actor}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

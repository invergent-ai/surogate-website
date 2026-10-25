export default function KeelHero() {
  return (
    <>
      <section className="bg-brand-aubergine text-white" id="top">
        <div className="max-w-[1200px] my-0 mx-auto pt-[88px] px-[24px] pb-[104px] flex flex-col gap-[26px]">
          <h1 className="font-sans m-0 max-w-[900px] text-[clamp(44px,6vw,72px)] leading-[1.0] tracking-[-0.035em] font-extrabold">Processes that run agents.<br />Not the other way around.</h1>
          <p className="m-0 max-w-[760px] text-[21px] leading-[1.5] text-[rgba(255,255,255,0.8)]">Keel runs agents in well-defined processes.</p>
          <div className="flex flex-wrap gap-[12px]">
            <a className="inline-flex items-center min-h-[52px] py-0 px-[24px] bg-brand-orange text-brand-aubergine no-underline font-bold text-[16px]" href="mailto:surogate@invergent.ai?subject=Keel%20demo">Book a demo</a>
            <a className="inline-flex items-center min-h-[52px] py-0 px-[24px] border border-[rgba(255,255,255,0.4)] text-white no-underline font-semibold text-[16px]" href="#pillars">How it works</a>
          </div>
        </div>
      </section>
    </>
  );
}

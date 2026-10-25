export default function PartnersClosing() {
  return (
    <>
      <section className="bg-brand-paper text-brand-aubergine" id="contact">
        <div className="max-w-[1200px] my-0 mx-auto pt-0 px-[24px] pb-[80px]">
          <div className="bg-brand-aubergine text-white py-[56px] px-[48px] flex flex-wrap gap-y-[28px] gap-x-[48px] items-center">
            <div className="flex-[1_1_520px] min-w-0 flex flex-col gap-[12px]">
              <h2 className="font-sans m-0 text-[clamp(30px,3.4vw,42px)] leading-[1.1] tracking-[-0.025em] font-extrabold">Start your practice.</h2>
              <p className="m-0 text-[18px] leading-[1.6] text-[rgba(255,255,255,0.8)]">Email us or join our Discord. The first 10 partners get Diamond terms for their first 12 months.</p>
            </div>
            <div className="flex flex-wrap gap-[12px]">
              <a className="inline-flex items-center min-h-[52px] py-0 px-[24px] bg-brand-orange text-brand-aubergine no-underline font-bold text-[16px]" href="mailto:surogate@invergent.ai?subject=Surogate%20partner%20program">Email surogate@invergent.ai</a>
              <a className="inline-flex items-center min-h-[52px] py-0 px-[24px] border border-[rgba(255,255,255,0.4)] text-white no-underline font-semibold text-[16px]" href="https://discord.gg/eVTq93BrQ4">Join our Discord</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

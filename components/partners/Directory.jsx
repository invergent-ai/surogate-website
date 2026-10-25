export default function Directory() {
  return (
    <>
      <section className="bg-brand-paper text-brand-aubergine" id="directory">
        <div className="max-w-[1200px] my-0 mx-auto pt-[72px] px-[24px] pb-[56px] flex flex-wrap gap-y-[24px] gap-x-[48px] items-center">
          <div className="flex-[1_1_360px] min-w-0 flex flex-col gap-[10px]">
            <h2 className="font-sans m-0 text-[clamp(28px,3vw,38px)] leading-[1.1] tracking-[-0.025em] font-extrabold">Find a partner.</h2>
            <p className="m-0 text-[17px] leading-[1.6] text-brand-graphite">The directory opens with our first Gold partners. Your company is listed here once your first client goes live.</p>
          </div>
          <div className="flex-[1_1_460px] min-w-0 bg-white border border-brand-border py-[24px] px-[28px] flex flex-wrap gap-y-[16px] gap-x-[24px] items-center justify-between">
            <div className="flex-[1_1_240px] min-w-0 flex flex-col gap-[4px]">
              <p className="m-0 text-[19px] font-extrabold">Looking for a partner?</p>
              <p className="m-0 text-[15px] leading-[1.55] text-brand-graphite">Tell us what you need, and we'll introduce you to one.</p>
            </div>
            <a className="inline-flex items-center min-h-[48px] py-0 px-[22px] border border-[rgba(42,16,45,0.35)] text-brand-aubergine no-underline font-semibold text-[16px]" href="mailto:surogate@invergent.ai?subject=Find%20a%20Surogate%20partner">Email us</a>
          </div>
        </div>
      </section>
    </>
  );
}

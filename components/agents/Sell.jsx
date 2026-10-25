export default function Sell() {
  return (
    <>
      <section className="bg-brand-paper text-brand-aubergine border-t border-t-brand-border">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Sell an agent you built.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-brand-graphite">Put a price on it and share a link. Buyers do not need a Surogate account.</p>
          </div>
          <div className="flex flex-wrap gap-y-[36px] gap-x-[40px]">
            <div className="flex-[1_1_300px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">Your Stripe account</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Subscriptions, usage packs or both, in seven currencies. You are the merchant of record.</p>
            </div>
            <div className="flex-[1_1_300px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">Pages made for you</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">A buy page at your agent's address, and a landing page you assemble from blocks.</p>
            </div>
            <div className="flex-[1_1_300px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-brand-border">
              <p className="m-0 text-[18px] font-bold">Packages</p>
              <p className="m-0 text-[16px] leading-[1.55] text-brand-graphite">Each offer unlocks the channels, tools, knowledge and model tier you choose.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

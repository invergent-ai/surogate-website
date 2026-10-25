export default function HowItWorks() {
  return (
    <>
      <section className="bg-white text-brand-aubergine" id="how">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">From first demo to monthly share.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-brand-graphite">Five steps, and the first three cost nothing.</p>
          </div>
          <ol className="list-none m-0 p-0 flex flex-wrap gap-y-[32px] gap-x-[0] relative">
            <li className="flex-[1_1_200px] min-w-0 flex flex-col gap-[12px] pr-[24px]">
              <div className="flex items-center">
                <span className="flex-[0_0_auto] w-[44px] h-[44px] inline-flex items-center justify-center bg-brand-aubergine text-white font-extrabold text-[18px]">1</span>
                <span className="flex-[1_1_auto] h-[2px] bg-brand-aubergine -mr-[24px]">
                </span>
              </div>
              <p className="m-0 text-[19px] font-extrabold">Get in touch</p>
              <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">Email us or join our Discord. You start at Silver the same day.</p>
            </li>
            <li className="flex-[1_1_200px] min-w-0 flex flex-col gap-[12px] pr-[24px]">
              <div className="flex items-center">
                <span className="flex-[0_0_auto] w-[44px] h-[44px] inline-flex items-center justify-center bg-brand-aubergine text-white font-extrabold text-[18px]">2</span>
                <span className="flex-[1_1_auto] h-[2px] bg-brand-aubergine -mr-[24px]">
                </span>
              </div>
              <p className="m-0 text-[19px] font-extrabold">Build</p>
              <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">Your own workspace has no plan fee. Build and demo as much as you need.</p>
            </li>
            <li className="flex-[1_1_200px] min-w-0 flex flex-col gap-[12px] pr-[24px]">
              <div className="flex items-center">
                <span className="flex-[0_0_auto] w-[44px] h-[44px] inline-flex items-center justify-center bg-brand-aubergine text-white font-extrabold text-[18px]">3</span>
                <span className="flex-[1_1_auto] h-[2px] bg-brand-aubergine -mr-[24px]">
                </span>
              </div>
              <p className="m-0 text-[19px] font-extrabold">Pilot</p>
              <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">Every new client gets 60 days free.</p>
            </li>
            <li className="flex-[1_1_200px] min-w-0 flex flex-col gap-[12px] pr-[24px]">
              <div className="flex items-center">
                <span className="flex-[0_0_auto] w-[44px] h-[44px] inline-flex items-center justify-center bg-brand-aubergine text-white font-extrabold text-[18px]">4</span>
                <span className="flex-[1_1_auto] h-[2px] bg-brand-aubergine -mr-[24px]">
                </span>
              </div>
              <p className="m-0 text-[19px] font-extrabold">Go live</p>
              <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">The client picks a plan or a licence.</p>
            </li>
            <li className="flex-[1_1_200px] min-w-0 flex flex-col gap-[12px] pr-[24px]">
              <div className="flex items-center">
                <span className="flex-[0_0_auto] w-[44px] h-[44px] inline-flex items-center justify-center bg-brand-orange text-brand-aubergine font-extrabold text-[18px]">5</span>
              </div>
              <p className="m-0 text-[19px] font-extrabold">Earn</p>
              <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">You earn your share every month the client stays.</p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}

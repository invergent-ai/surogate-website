import TrackedLink from '@/components/TrackedLink';

export default function Deploy() {
  return (
    <>
      <section className="bg-white text-brand-aubergine" id="deploy">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Keep every call inside your network.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-brand-graphite">Use it hosted on llm.buzz, or run it on your own Kubernetes so prompts and keys never leave your infrastructure.</p>
          </div>
          <div className="flex flex-wrap gap-[24px]">
            <div className="flex-[1_1_300px] min-w-0 bg-brand-paper border border-brand-border p-[32px] flex flex-col gap-[10px]">
              <p className="m-0 text-[22px] font-extrabold">llm.buzz</p>
              <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">Our hosted gateway, open to anyone. Sign up, buy credits and call every model with one key.</p>
              <TrackedLink event="llm_buzz_clicked" eventProps={{ location: 'gateway_deploy' }} className="mt-auto pt-[8px] text-[16px] font-bold text-brand-wine no-underline" href="https://llm.buzz">Go to llm.buzz</TrackedLink>
            </div>
            <div className="flex-[1_1_300px] min-w-0 bg-brand-paper border border-brand-border p-[32px] flex flex-col gap-[10px]">
              <p className="m-0 text-[22px] font-extrabold">Your Kubernetes</p>
              <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">One image per release, on your cluster and your network, with your own provider accounts.</p>
            </div>
            <div className="flex-[1_1_300px] min-w-0 bg-brand-aubergine text-white p-[32px] flex flex-col gap-[10px]">
              <p className="m-0 text-[22px] font-extrabold">One console for every team</p>
              <p className="m-0 text-[16px] leading-[1.6] text-[rgba(255,255,255,0.8)]">The model catalog, a playground, activity and request logs, and keys and budgets. Prompt logs are kept seven days, or turned off.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

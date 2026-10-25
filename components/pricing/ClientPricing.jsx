import PersonalPlans from './PersonalPlans';

export default function ClientPricing() {
  return (
    <>
      <section className="bg-brand-aubergine text-white">
        <div className="max-w-[1200px] my-0 mx-auto pt-[80px] px-[24px] pb-[72px] flex flex-col gap-[20px]">
          <p className="m-0 font-mono text-[13px] tracking-[0.14em] text-brand-orange">PRICING</p>
          <h1 className="font-sans m-0 text-[clamp(38px,5vw,60px)] leading-[1.04] tracking-[-0.033em] font-extrabold max-w-[860px]">One plan per client. Models at cost.</h1>
          <p className="m-0 text-[19px] leading-[1.55] text-[rgba(255,255,255,0.8)] max-w-[760px]">Each client gets its own organisation with unlimited users and agents. The client brings its own model and pays its provider directly, or uses ours at the provider's price with no markup.</p>
          <p className="mt-[8px] mx-0 mb-0 text-[16px] text-[rgba(255,255,255,0.86)]">
            <strong className="text-brand-orange">Partners earn 30%</strong> of every client plan and licence on this page, every month. 40% at Diamond.</p>
        </div>
      </section>
      <PersonalPlans />
      <section className="bg-brand-paper border-b border-b-brand-border">
        <div className="max-w-[1200px] my-0 mx-auto py-[72px] px-[24px] flex flex-col gap-[24px]">
          <h2 className="font-sans m-0 text-[clamp(28px,3vw,36px)] leading-[1.1] tracking-[-0.025em] font-extrabold">Per client organisation</h2>
          <div className="flex flex-wrap gap-[24px]">
            <article className="flex-[1_1_300px] min-w-0 bg-white border border-brand-border p-[32px] flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[6px]">
                <h2 className="font-sans m-0 text-[22px] font-bold">Pilot</h2>
                <p className="m-0 text-[48px] font-extrabold tracking-[-0.03em]">$0</p>
                <p className="m-0 text-[15px] text-brand-graphite">for the first 60 days of every new client</p>
              </div>
              <ul className="m-0 pt-0 pr-0 pb-0 pl-[18px] flex flex-col gap-[8px] text-[15px] leading-[1.5] text-brand-graphite list-disc">
                <li>Unlimited users and agents</li>
                <li>Up to 1,000 agents working at once</li>
                <li>40 hours web browsing</li>
                <li>50 GB workspace, 200 GB hub storage</li>
                <li>40 GPU-hours for fine-tuning and evals</li>
              </ul>
              <a className="mt-auto inline-flex items-center justify-center min-h-[48px] py-0 px-[20px] border border-brand-aubergine text-brand-aubergine no-underline font-semibold" href="https://ops.surogate.ai">Start a pilot</a>
            </article>
            <article className="flex-[1_1_300px] min-w-0 bg-white border-2 border-brand-aubergine p-[32px] flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[6px]">
                <h2 className="font-sans m-0 text-[22px] font-bold">Production</h2>
                <p className="m-0 text-[48px] font-extrabold tracking-[-0.03em]">$990<span className="text-[18px] font-semibold text-brand-graphite"> / month</span>
                </p>
                <p className="m-0 text-[15px] text-brand-graphite">or $940 / month billed yearly</p>
              </div>
              <ul className="m-0 pt-0 pr-0 pb-0 pl-[18px] flex flex-col gap-[8px] text-[15px] leading-[1.5] text-brand-graphite list-disc">
                <li>Unlimited users and agents</li>
                <li>Up to 1,000 agents working at once</li>
                <li>200 hours web browsing</li>
                <li>250 GB workspace, 1 TB hub storage</li>
                <li>40 GPU-hours for fine-tuning and evals</li>
                <li>Priority email support</li>
              </ul>
              <a className="mt-auto inline-flex items-center justify-center min-h-[48px] py-0 px-[20px] bg-brand-aubergine text-white no-underline font-semibold" href="https://ops.surogate.ai">Go to production</a>
            </article>
            <article className="flex-[1_1_300px] min-w-0 bg-white border border-brand-border p-[32px] flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[6px]">
                <h2 className="font-sans m-0 text-[22px] font-bold">Scale</h2>
                <p className="m-0 text-[48px] font-extrabold tracking-[-0.03em]">$2,990<span className="text-[18px] font-semibold text-brand-graphite"> / month</span>
                </p>
                <p className="m-0 text-[15px] text-brand-graphite">or $2,840 / month billed yearly</p>
              </div>
              <ul className="m-0 pt-0 pr-0 pb-0 pl-[18px] flex flex-col gap-[8px] text-[15px] leading-[1.5] text-brand-graphite list-disc">
                <li>Unlimited users and agents</li>
                <li>Up to 5,000 agents working at once</li>
                <li>600 hours web browsing</li>
                <li>750 GB workspace, 3 TB hub storage</li>
                <li>200 GPU-hours for fine-tuning and evals</li>
                <li>Single sign-on, roles and audit logs</li>
                <li>Priority support</li>
              </ul>
              <a className="mt-auto inline-flex items-center justify-center min-h-[48px] py-0 px-[20px] border border-brand-aubergine text-brand-aubergine no-underline font-semibold" href="https://ops.surogate.ai">Choose Scale</a>
            </article>
          </div>
          <p className="m-0 text-[15px] leading-[1.6] text-brand-graphite">Models on every plan: bring your own provider and pay it directly, or use ours at the provider's price. More at the usual rates: web browsing $0.08 an hour, GPU $2.00 a GPU-hour, storage $0.0605 per GB a month. Prices include VAT; EU businesses with a VAT ID and customers outside the EU pay the net price.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="max-w-[1200px] my-0 mx-auto py-[72px] px-[24px] flex flex-wrap gap-[24px]">
          <article className="flex-[1_1_460px] min-w-0 bg-brand-aubergine text-white p-[36px] flex flex-col gap-[18px]">
            <p className="m-0 font-mono text-[13px] tracking-[0.14em] text-brand-orange">THE CLIENT'S OWN INFRASTRUCTURE</p>
            <div className="flex flex-wrap gap-y-[8px] gap-x-[32px] items-baseline">
              <p className="m-0 text-[44px] font-extrabold tracking-[-0.03em]">$60,000<span className="text-[18px] font-semibold text-[rgba(255,255,255,0.74)]"> / year</span>
              </p>
              <p className="m-0 text-[17px] text-[rgba(255,255,255,0.86)]">$90,000 / year with Keel</p>
            </div>
            <ul className="m-0 pt-0 pr-0 pb-0 pl-[18px] flex flex-col gap-[8px] text-[15px] leading-[1.5] text-[rgba(255,255,255,0.84)] list-disc">
              <li>Single-tenant install on the client's Kubernetes, air-gapped networks included</li>
              <li>No usage metering: sessions, sandboxes and cases run on the client's hardware</li>
              <li>The client's own models, or its own provider account</li>
              <li>Installer and every update</li>
            </ul>
          </article>
          <article className="flex-[1_1_460px] min-w-0 border border-brand-border p-[36px] flex flex-col gap-[18px]">
            <p className="m-0 font-mono text-[13px] tracking-[0.14em] text-brand-wine">KEEL ON SUROGATE CLOUD</p>
            <p className="m-0 text-[17px] leading-[1.5]">Priced per completed case, on any cloud plan.</p>
            <div className="flex flex-col border-t border-t-brand-border">
              <div className="flex justify-between gap-[16px] py-[14px] px-0 border-b border-b-brand-border text-[16px]">
                <span>First 10,000 cases a month</span>
                <strong>$0.20</strong>
              </div>
              <div className="flex justify-between gap-[16px] py-[14px] px-0 border-b border-b-brand-border text-[16px]">
                <span>Up to 100,000</span>
                <strong>$0.10</strong>
              </div>
              <div className="flex justify-between gap-[16px] py-[14px] px-0 border-b border-b-brand-border text-[16px]">
                <span>Beyond 100,000</span>
                <strong>$0.05</strong>
              </div>
            </div>
            <p className="m-0 text-[15px] leading-[1.5] text-brand-graphite">Model calls inside a case are billed at cost, like any other session.</p>
          </article>
        </div>
      </section>
      <section className="bg-white border-t border-t-brand-border">
        <div className="max-w-[1200px] my-0 mx-auto py-[56px] px-[24px] flex flex-wrap gap-y-[24px] gap-x-[48px] items-center">
          <div className="flex-[1_1_520px] min-w-0 flex flex-col gap-[8px]">
            <h2 className="font-sans m-0 text-[24px] font-bold">Building for clients?</h2>
            <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">Partners pay no plan fee for their own workspace, and earn 30% of every client plan and licence, every month, for as long as the client stays.</p>
          </div>
          <a className="inline-flex items-center min-h-[52px] py-0 px-[24px] bg-brand-orange text-brand-aubergine no-underline font-bold text-[16px]" href="/partners/">Become a partner</a>
        </div>
      </section>
    </>
  );
}

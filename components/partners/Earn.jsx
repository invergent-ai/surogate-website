import InlineSvg from '@/components/site/InlineSvg';
import { yourWorkspaceOnTheLeftSvg } from './illustrations';

export default function Earn() {
  return (
    <>
      <section className="bg-white text-brand-aubergine" id="earn">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Your share grows with every client.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-brand-graphite">30% of each client's plan or licence, every month, for as long as the client stays. 40% at Diamond, with no 12-month cap.</p>
          </div>
          <figure className="m-0">
            <InlineSvg className="contents" markup={yourWorkspaceOnTheLeftSvg} />
          </figure>
          <dl className="m-0 flex flex-wrap gap-y-[28px] gap-x-[32px]">
            <div className="flex-[1_1_220px] min-w-0 flex flex-col gap-[6px] pt-[18px] border-t-[3px] border-t-brand-aubergine">
              <dt className="order-[2] text-[15px] leading-[1.5] text-brand-graphite">A client on Production, $990 a month</dt>
              <dd className="order-[1] m-0 text-[clamp(32px,3.4vw,42px)] leading-[1.05] font-extrabold tracking-[-0.03em] [font-variant-numeric:tabular-nums_lining-nums]">$297<span className="text-[17px] font-semibold tracking-[0] text-brand-graphite"> a month</span>
              </dd>
            </div>
            <div className="flex-[1_1_220px] min-w-0 flex flex-col gap-[6px] pt-[18px] border-t-[3px] border-t-brand-aubergine">
              <dt className="order-[2] text-[15px] leading-[1.5] text-brand-graphite">A client on Scale, $2,990 a month</dt>
              <dd className="order-[1] m-0 text-[clamp(32px,3.4vw,42px)] leading-[1.05] font-extrabold tracking-[-0.03em] [font-variant-numeric:tabular-nums_lining-nums]">$897<span className="text-[17px] font-semibold tracking-[0] text-brand-graphite"> a month</span>
              </dd>
            </div>
            <div className="flex-[1_1_220px] min-w-0 flex flex-col gap-[6px] pt-[18px] border-t-[3px] border-t-brand-aubergine">
              <dt className="order-[2] text-[15px] leading-[1.5] text-brand-graphite">A client on its own infrastructure, $60,000 a year</dt>
              <dd className="order-[1] m-0 text-[clamp(32px,3.4vw,42px)] leading-[1.05] font-extrabold tracking-[-0.03em] [font-variant-numeric:tabular-nums_lining-nums]">$18,000<span className="text-[17px] font-semibold tracking-[0] text-brand-graphite"> a year</span>
              </dd>
            </div>
            <div className="flex-[1_1_220px] min-w-0 flex flex-col gap-[6px] pt-[18px] border-t-[3px] border-t-brand-aubergine">
              <dt className="order-[2] text-[15px] leading-[1.5] text-brand-graphite">The same client with Keel, $90,000 a year</dt>
              <dd className="order-[1] m-0 text-[clamp(32px,3.4vw,42px)] leading-[1.05] font-extrabold tracking-[-0.03em] [font-variant-numeric:tabular-nums_lining-nums]">$27,000<span className="text-[17px] font-semibold tracking-[0] text-brand-graphite"> a year</span>
              </dd>
            </div>
          </dl>
          <p className="-mt-[24px] mx-0 mb-0 text-[14px] text-brand-graphite">Figures at 30%. Diamond partners earn 40%.</p>
        </div>
      </section>
    </>
  );
}

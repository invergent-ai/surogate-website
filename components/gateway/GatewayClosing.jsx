import TrackedLink from '@/components/TrackedLink';
import { CONTACT, mailto } from '@/lib/site';

export default function GatewayClosing() {
  return (
    <>
      <section className="bg-brand-paper text-brand-aubergine" id="contact">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px]">
          <div className="bg-brand-aubergine text-white py-[56px] px-[48px] flex flex-wrap gap-y-[28px] gap-x-[48px] items-center">
            <div className="flex-[1_1_520px] min-w-0 flex flex-col gap-[12px]">
              <h2 className="font-sans m-0 text-[clamp(30px,3.4vw,42px)] leading-[1.1] tracking-[-0.025em] font-extrabold">Put one gateway in front of every model.</h2>
              <p className="m-0 text-[18px] leading-[1.6] text-[rgba(255,255,255,0.8)]">Tell us which models and providers your teams use, and we&#39;ll set one up for a pilot.</p>
            </div>
            <div className="flex flex-wrap gap-[12px]">
              <TrackedLink event="contact_sales_clicked" eventProps={{ location: 'gateway_closing' }} className="inline-flex items-center min-h-[52px] py-0 px-[24px] bg-brand-orange text-brand-aubergine no-underline font-bold text-[16px]" href={mailto('AI Gateway demo')}>Book a demo</TrackedLink>
              <TrackedLink event="reach_out_clicked" eventProps={{ channel: 'discord', location: 'gateway_closing' }} className="inline-flex items-center min-h-[52px] py-0 px-[24px] border border-[rgba(255,255,255,0.4)] text-white no-underline font-semibold text-[16px]" href={CONTACT.discord}>Join our Discord</TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

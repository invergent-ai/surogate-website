import TrackedLink from '@/components/TrackedLink';
import { mailto } from '@/lib/site';
import InlineSvg from '@/components/site/InlineSvg';
import { partnerBadges } from '@/components/site/illustrations/partnerBadges';

export default function PartnerProgram() {
  return (
    <>
      <section className="bg-brand-aubergine text-white border-t border-t-[rgba(255,255,255,0.12)]" id="partners">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[860px]">
            <p className="m-0 font-mono text-[13px] tracking-[0.14em] text-brand-orange">PARTNER PROGRAM</p>
            <h2 className="font-sans m-0 text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.03em] font-extrabold">Build a practice on Surogate.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-[rgba(255,255,255,0.82)]">Deliver Surogate to your clients and earn a share of every plan or license they buy.</p>
          </div>
          <div className="flex flex-wrap gap-[24px]">
            <div className="flex-[1_1_340px] min-w-0 border border-[rgba(255,255,255,0.2)] p-[32px] flex flex-col gap-[8px]">
              <p className="m-0 font-mono text-[13px] text-[rgba(255,255,255,0.72)]">YOUR SHARE</p>
              <p className="m-0 text-[44px] font-extrabold tracking-[-0.03em] text-brand-orange">30%</p>
              <p className="m-0 text-[16px] leading-[1.6] text-[rgba(255,255,255,0.84)]">of every client's plan or licence, every month, for as long as the client pays. 40% at Diamond.</p>
            </div>
            <div className="flex-[1_1_340px] min-w-0 border border-[rgba(255,255,255,0.2)] p-[32px] flex flex-col gap-[8px]">
              <p className="m-0 text-[44px] font-extrabold tracking-[-0.03em] text-brand-orange">$0</p>
              <p className="m-0 text-[20px] font-extrabold text-white">to build and demo</p>
              <p className="m-0 text-[16px] leading-[1.6] text-[rgba(255,255,255,0.84)]">No plan fee for your own workspace, and 60 days free for every new client.</p>
            </div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <h3 className="font-sans m-0 text-[22px] font-bold">Your tier depends on how many clients you have live.</h3>
            <div className="flex flex-wrap gap-[1px] bg-[rgba(255,255,255,0.16)] border border-[rgba(255,255,255,0.16)]">
              <div className="flex-[1_1_280px] min-w-0 bg-brand-aubergine p-[28px] flex flex-col gap-[10px]">
                <InlineSvg className="contents" markup={partnerBadges.silver} />
                <p className="m-0 font-bold text-[18px]">Silver</p>
                <p className="m-0 font-mono text-[13px] text-brand-orange">sign up, no fee</p>
                <p className="m-0 text-[15px] leading-[1.6] text-[rgba(255,255,255,0.82)]">Partner prices and pilots.</p>
              </div>
              <div className="flex-[1_1_280px] min-w-0 bg-brand-aubergine p-[28px] flex flex-col gap-[10px]">
                <InlineSvg className="contents" markup={partnerBadges.gold} />
                <p className="m-0 font-bold text-[18px]">Gold</p>
                <p className="m-0 font-mono text-[13px] text-brand-orange">1 client live</p>
                <p className="m-0 text-[15px] leading-[1.6] text-[rgba(255,255,255,0.82)]">Listed in our partner directory, and we send you companies looking for a partner.</p>
              </div>
              <div className="flex-[1_1_280px] min-w-0 bg-brand-aubergine p-[28px] flex flex-col gap-[10px]">
                <InlineSvg className="contents" markup={partnerBadges.diamond} />
                <p className="m-0 font-bold text-[18px]">Diamond</p>
                <p className="m-0 font-mono text-[13px] text-brand-orange">3 clients live</p>
                <p className="m-0 text-[15px] leading-[1.6] text-[rgba(255,255,255,0.82)]">40% share, early access, and a direct line to our engineers.</p>
              </div>
            </div>
            <p className="m-0 text-[16px] leading-[1.6] text-[rgba(255,255,255,0.86)]">
              <strong className="text-brand-orange">Founding partners:</strong> the first 10 partners get Diamond terms for their first 12 months, whatever their tier.</p>
          </div>
          <div className="flex flex-wrap gap-y-[24px] gap-x-[48px] items-center pt-[8px]">
            <div className="flex flex-wrap gap-[12px]">
              <TrackedLink event="cta_agency_clicked" eventProps={{ location: 'home_partners' }} className="inline-flex items-center min-h-[52px] py-0 px-[24px] bg-brand-orange text-brand-aubergine no-underline font-bold text-[16px]" href="/partners/">Become a partner</TrackedLink>
              <a className="inline-flex items-center min-h-[52px] py-0 px-[24px] border border-[rgba(255,255,255,0.4)] text-white no-underline font-semibold text-[16px]" href="https://docs.surogate.ai">Read the docs</a>
            </div>
            <p className="m-0 flex-[1_1_320px] text-[15px] leading-[1.6] text-[rgba(255,255,255,0.76)]">Are you a bank, an insurer or another company looking for agents? <TrackedLink event="contact_sales_clicked" eventProps={{ location: 'home_partners' }} className="text-white underline" href={mailto('Find a Surogate partner')}>Tell us what you need</TrackedLink>, and we'll introduce you to a partner.</p>
          </div>
        </div>
      </section>
    </>
  );
}

import InlineSvg from '@/components/site/InlineSvg';
import { partnerBadges } from '@/components/site/illustrations/partnerBadges';

export default function Tiers() {
  return (
    <>
      <section className="bg-brand-aubergine text-white" id="tiers">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Your tier grows with your sales.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-[rgba(255,255,255,0.8)]">Tiers count the clients you have live. There is nothing to apply for.</p>
          </div>
          <div className="flex flex-wrap gap-[1px] bg-[rgba(255,255,255,0.16)] border border-[rgba(255,255,255,0.16)]">
            <div className="flex-[1_1_280px] min-w-0 bg-brand-aubergine p-[28px] flex flex-col gap-[10px]">
              <InlineSvg className="contents" markup={partnerBadges.silver} />
              <p className="m-0 font-extrabold text-[20px]">Silver</p>
              <p className="m-0 text-[15px] font-bold text-brand-orange">Sign up, no fee</p>
              <p className="m-0 text-[16px] leading-[1.6] text-[rgba(255,255,255,0.82)]">Partner prices and pilots.</p>
            </div>
            <div className="flex-[1_1_280px] min-w-0 bg-brand-aubergine p-[28px] flex flex-col gap-[10px]">
              <InlineSvg className="contents" markup={partnerBadges.gold} />
              <p className="m-0 font-extrabold text-[20px]">Gold</p>
              <p className="m-0 text-[15px] font-bold text-brand-orange">1 client live</p>
              <p className="m-0 text-[16px] leading-[1.6] text-[rgba(255,255,255,0.82)]">Listed in our partner directory, and we send you companies looking for a partner.</p>
            </div>
            <div className="flex-[1_1_280px] min-w-0 bg-brand-aubergine p-[28px] flex flex-col gap-[10px]">
              <InlineSvg className="contents" markup={partnerBadges.diamond} />
              <p className="m-0 font-extrabold text-[20px]">Diamond</p>
              <p className="m-0 text-[15px] font-bold text-brand-orange">3 clients live</p>
              <p className="m-0 text-[16px] leading-[1.6] text-[rgba(255,255,255,0.82)]">40% share, early access, and a direct line to our engineers.</p>
            </div>
          </div>
          <p className="-mt-[16px] mx-0 mb-0 text-[17px] leading-[1.6] text-[rgba(255,255,255,0.86)]">
            <strong className="text-brand-orange">Founding partners:</strong> the first 10 partners get Diamond terms for their first 12 months, whatever their tier.</p>
        </div>
      </section>
    </>
  );
}

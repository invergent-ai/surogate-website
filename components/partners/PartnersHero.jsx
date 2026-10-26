import TrackedLink from '@/components/TrackedLink';
import { CONTACT, mailto } from '@/lib/site';

export default function PartnersHero() {
  return (
    <>
      <section className="bg-brand-aubergine text-white" id="top">
        <div className="max-w-[1200px] my-0 mx-auto pt-[88px] px-[24px] pb-[104px] flex flex-col gap-[26px]">
          <h1 className="font-sans m-0 max-w-[900px] text-[clamp(44px,6vw,72px)] leading-[1.0] tracking-[-0.035em] font-extrabold">Build a practice on Surogate.</h1>
          <p className="m-0 max-w-[760px] text-[21px] leading-[1.5] text-[rgba(255,255,255,0.8)]">Deliver Surogate Agents, Keel, the AI Gateway and custom models to your clients, and earn 30% of what they pay, every month.</p>
          <div className="flex flex-wrap gap-[12px]">
            <TrackedLink event="cta_agency_clicked" eventProps={{ location: 'partners_hero' }} className="inline-flex items-center min-h-[52px] py-0 px-[24px] bg-brand-orange text-brand-aubergine no-underline font-bold text-[16px]" href={mailto('Surogate partner program')}>Become a partner</TrackedLink>
            <TrackedLink event="reach_out_clicked" eventProps={{ channel: 'discord', location: 'partners_hero' }} className="inline-flex items-center min-h-[52px] py-0 px-[24px] border border-[rgba(255,255,255,0.4)] text-white no-underline font-semibold text-[16px]" href={CONTACT.discord}>Join our Discord</TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}

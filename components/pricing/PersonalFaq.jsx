import TrackedLink from '@/components/TrackedLink';
import { PRICING_FAQ } from '@/lib/pricing';
import { mailto } from '@/lib/site';

export default function PersonalFaq() {
  return (
    <section id="faq" className="bg-white border-t border-t-brand-border">
      <div className="max-w-[1200px] my-0 mx-auto py-[72px] px-[24px] flex flex-wrap gap-y-[32px] gap-x-[64px]">
        <div className="flex-[1_1_300px] min-w-0 flex flex-col gap-[12px]">
          <h2 className="font-sans m-0 text-[clamp(28px,3vw,36px)] leading-[1.1] tracking-[-0.025em] font-extrabold">Questions about personal plans</h2>
          <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">
            Can&apos;t find what you&apos;re looking for?{' '}
            <TrackedLink event="contact_sales_clicked" eventProps={{ location: 'pricing_faq' }} href={mailto('Personal plans')} className="underline text-brand-wine hover:text-brand-aubergine">
              Ask us
            </TrackedLink>
            .
          </p>
        </div>
        <div className="flex-[2_1_520px] min-w-0 border-t border-t-brand-border">
          {PRICING_FAQ.map((item) => (
            <details key={item.q} className="group border-b border-b-brand-border py-[18px] [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-baseline gap-[16px] cursor-pointer list-none">
                <h3 className="font-sans m-0 flex-1 text-[17px] font-bold">{item.q}</h3>
                <span
                  aria-hidden="true"
                  className="shrink-0 w-[28px] h-[28px] inline-flex items-center justify-center border border-brand-border text-brand-graphite group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-[10px] mb-0 text-[15px] leading-[1.65] text-brand-graphite max-w-[64ch]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import Section, { SectionHead } from '@/components/site/Section';
import InlineSvg from '@/components/site/InlineSvg';
import { yourWorkspaceOnTheLeftSvg } from './illustrations';
import { TEAM_PLANS, PARTNER_SHARE, partnerShare, usd } from '@/lib/pricing';

const EXAMPLES = ['production', 'scale'].map((id) => TEAM_PLANS.find((p) => p.id === id));

export default function Earn() {
  return (
    <Section id="earn">
      <SectionHead title="Your share grows with every client."
        sub={`${PARTNER_SHARE.base * 100}% of each client's plan or licence, every month, for as long as the client stays. ${PARTNER_SHARE.diamond * 100}% at Diamond, with no 12-month cap.`} />
      <figure className="m-0 overflow-hidden rounded-2xl bg-ivory">
        <InlineSvg markup={yourWorkspaceOnTheLeftSvg} />
      </figure>
      <dl className="m-0 mt-10 grid gap-8 sm:grid-cols-2">
        {EXAMPLES.map((p) => (
          <div key={p.id} className="flex flex-col border-t border-hairline pt-5">
            <dt className="order-2 mt-2 text-[14px] text-ink/60">A client on {p.name}, {usd(p.price.monthly)} a month</dt>
            <dd className="order-1 m-0 text-[40px] font-[450] leading-none tracking-[-0.02em] [font-variant-numeric:tabular-nums]">
              {usd(partnerShare(p.price.monthly))}<span className="ml-1.5 text-[15px] tracking-normal text-ink/50">a month</span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="m-0 mt-5 text-[13px] text-ink/55">Figures at {PARTNER_SHARE.base * 100}%. Diamond partners earn {PARTNER_SHARE.diamond * 100}%.</p>
    </Section>
  );
}

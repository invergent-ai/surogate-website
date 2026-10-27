import Hero from '@/components/solutions/Hero';
import InlineSvg from '@/components/site/InlineSvg';
import { oneAgentBuiltOnceAndSvg } from './illustrations';
import { CONTACT, mailto } from '@/lib/site';
import { PARTNER_SHARE } from '@/lib/pricing';

export default function PartnersHero() {
  return (
    <Hero label="Partners" h1="Build a practice on Surogate." location="partners_hero"
      sub={`Deliver Surogate, Keel and custom models to your clients, and earn ${PARTNER_SHARE.base * 100}% of what they pay, every month.`}
      primary={{ label: 'Become a partner', href: mailto('Surogate partner program'), event: 'cta_agency_clicked' }}
      secondary={{ label: 'Join our Discord', href: CONTACT.discord, event: 'reach_out_clicked', external: true }}
      trust={['No fee to join', 'Your workspace has no plan fee', '60-day pilot for every client', `${PARTNER_SHARE.diamond * 100}% at Diamond`]}
      visual={(
        <figure className="m-0">
          <div className="rounded-2xl bg-aubergine p-8 md:p-10"><InlineSvg markup={oneAgentBuiltOnceAndSvg} /></div>
          <figcaption className="mt-3 text-[13px] text-ink/55">One agent, built once by your team, deployed to every client.</figcaption>
        </figure>
      )} />
  );
}

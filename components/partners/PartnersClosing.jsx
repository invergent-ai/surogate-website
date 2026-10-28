import Section, { H2 } from '@/components/site/Section';
import Button from '@/components/site/Button';
import { CONTACT, mailto } from '@/lib/site';
import { PARTNER_SHARE } from '@/lib/pricing';

export default function PartnersClosing() {
  return (
    <Section tone="aubergine" rings id="contact" inner="flex flex-col items-start gap-6">
      <div>
        <h2 className={H2.feature}>Start your practice.</h2>
        <p className="mt-4 mb-0 max-w-[52ch] text-[16px] leading-[1.6] text-white/70">
          The first {PARTNER_SHARE.founding} partners get Diamond terms for their first {PARTNER_SHARE.foundingMonths} months.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button href={mailto('Surogate partner program')} variant="sun" size="lg" arrow event="cta_agency_clicked" eventProps={{ location: 'partners_closing' }}>Email {CONTACT.email}</Button>
        <Button href={CONTACT.discord} variant="glass" size="lg" external event="reach_out_clicked" eventProps={{ channel: 'discord', location: 'partners_closing' }}>Join our Discord</Button>
      </div>
    </Section>
  );
}

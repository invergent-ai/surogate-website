import Section, { H2 } from '@/components/site/Section';
import Button from '@/components/site/Button';
import InlineSvg from '@/components/site/InlineSvg';
import { partnerBadges } from '@/components/site/illustrations/partnerBadges';

export default function PartnersBand() {
  return (
    <Section tone="aubergine" inner="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div>
        <h2 className={H2.feature}>Build a practice on Surogate.</h2>
        <p className="mt-4 mb-0 max-w-[46ch] text-[16px] leading-[1.6] text-cream/70">
          Deliver Surogate Agents, Keel and custom models to your clients, and earn 30% of what they pay every month, 40% at Diamond.
        </p>
        <div className="mt-7"><Button href="/partners/" variant="sun" size="lg" arrow>Become a partner</Button></div>
      </div>
      <div className="flex justify-center gap-3 [&_svg]:h-[80px] [&_svg]:w-[80px] sm:gap-4 sm:[&_svg]:h-[96px] sm:[&_svg]:w-[96px] lg:[&_svg]:h-[120px] lg:[&_svg]:w-[120px]">
        <InlineSvg className="contents" markup={partnerBadges.silver} />
        <InlineSvg className="contents" markup={partnerBadges.gold} />
        <InlineSvg className="contents" markup={partnerBadges.diamond} />
      </div>
    </Section>
  );
}

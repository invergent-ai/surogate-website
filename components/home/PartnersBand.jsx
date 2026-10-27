import Section from '@/components/site/Section';
import Button from '@/components/site/Button';
import InlineSvg from '@/components/site/InlineSvg';
import { partnerBadges } from '@/components/site/illustrations/partnerBadges';

export default function PartnersBand() {
  return (
    <Section tone="aubergine" inner="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <h2 className="m-0 text-[clamp(34px,4.2vw,50px)] font-[500] leading-[1.05] tracking-[-0.01em]">Build a practice on Surogate.</h2>
        <p className="mt-5 mb-0 max-w-[48ch] text-[18px] leading-[1.6] text-cream/70">
          Deliver Surogate Agents, Keel, a private AI Gateway and custom models to your clients, and earn 30% of what they pay, every month.
        </p>
        <div className="mt-8"><Button href="/partners/" variant="sun" size="lg">Become a partner</Button></div>
      </div>
      <div className="flex justify-center gap-4 [&_svg]:h-[110px] [&_svg]:w-[110px] md:[&_svg]:h-[140px] md:[&_svg]:w-[140px]">
        <InlineSvg className="contents" markup={partnerBadges.silver} />
        <InlineSvg className="contents" markup={partnerBadges.gold} />
        <InlineSvg className="contents" markup={partnerBadges.diamond} />
      </div>
    </Section>
  );
}

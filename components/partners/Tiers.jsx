import Section, { H2 } from '@/components/site/Section';
import InlineSvg from '@/components/site/InlineSvg';
import { partnerBadges } from '@/components/site/illustrations/partnerBadges';
import { PARTNER_SHARE } from '@/lib/pricing';

const TIERS = [
  { key: 'silver', name: 'Silver', when: 'Sign up, no fee', gets: 'Partner prices and pilots.' },
  { key: 'gold', name: 'Gold', when: '1 client live', gets: 'Listed in our partner directory, and we send you companies looking for a partner.' },
  { key: 'diamond', name: 'Diamond', when: '3 clients live', gets: `${PARTNER_SHARE.diamond * 100}% share, early access, and a direct line to our engineers.` },
];

export default function Tiers() {
  return (
    <Section tone="aubergine" id="tiers">
      <h2 className={H2.feature}>Your tier grows with your sales.</h2>
      <p className="mt-4 mb-0 max-w-[52ch] text-[16px] leading-[1.6] text-cream/70">Tiers count the clients you have live. There is nothing to apply for.</p>
      <ul className="m-0 mt-12 grid list-none border-t border-cream/15 p-0 md:grid-cols-3">
        {TIERS.map((t, i) => (
          <li key={t.key} className={`border-b border-cream/15 py-8 md:border-b-0 md:pr-8 ${i ? 'md:border-l md:pl-8' : ''} [&_svg]:h-[112px] [&_svg]:w-[112px]`}>
            <InlineSvg className="contents" markup={partnerBadges[t.key]} />
            <h3 className="m-0 mt-4 text-[18px] font-[500]">{t.name}</h3>
            <p className="m-0 mt-1 text-[14px] font-medium text-sun">{t.when}</p>
            <p className="m-0 mt-3 text-[15px] leading-[1.6] text-cream/75">{t.gets}</p>
          </li>
        ))}
      </ul>
      <p className="m-0 mt-8 text-[15px] leading-[1.6] text-cream/80">
        Founding partners: the first {PARTNER_SHARE.founding} partners get Diamond terms for their first {PARTNER_SHARE.foundingMonths} months, whatever their tier.
      </p>
    </Section>
  );
}

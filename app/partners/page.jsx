import Shell from '@/components/solutions/Shell';
import PartnersHero from '@/components/partners/PartnersHero';
import Earn from '@/components/partners/Earn';
import Deliver from '@/components/partners/Deliver';
import HowItWorks from '@/components/partners/HowItWorks';
import Tiers from '@/components/partners/Tiers';
import Directory from '@/components/partners/Directory';
import PartnersClosing from '@/components/partners/PartnersClosing';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('/partners/');

export default function PartnersPage() {
  return (
    <Shell>
      <PartnersHero />
      <Earn />
      <Deliver />
      <HowItWorks />
      <Tiers />
      <Directory />
      <PartnersClosing />
    </Shell>
  );
}

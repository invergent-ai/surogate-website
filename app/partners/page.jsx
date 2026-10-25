import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PartnersHero from '@/components/partners/PartnersHero';
import Earn from '@/components/partners/Earn';
import Deliver from '@/components/partners/Deliver';
import HowItWorks from '@/components/partners/HowItWorks';
import Tiers from '@/components/partners/Tiers';
import Directory from '@/components/partners/Directory';
import PartnersClosing from '@/components/partners/PartnersClosing';
import { pageMetadata } from '@/lib/site';
import './partners-page.css';

export const metadata = pageMetadata('/partners/');

export default function PartnersPage() {
  return (
    <div className="pg-partners font-sans text-brand-aubergine bg-white w-full overflow-x-hidden">
      <Nav />
      <main>
        <PartnersHero />
        <Earn />
        <Deliver />
        <HowItWorks />
        <Tiers />
        <Directory />
        <PartnersClosing />
      </main>
      <Footer />
    </div>
  );
}

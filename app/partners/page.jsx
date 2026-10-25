import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PartnersHero from '@/components/partners/PartnersHero';
import Earn from '@/components/partners/Earn';
import Deliver from '@/components/partners/Deliver';
import HowItWorks from '@/components/partners/HowItWorks';
import Tiers from '@/components/partners/Tiers';
import Directory from '@/components/partners/Directory';
import PartnersClosing from '@/components/partners/PartnersClosing';
import { route } from '@/lib/site';
import './partners-page.css';

const { title, description } = route('/partners/');

export const metadata = {
  title,
  description,
  alternates: { canonical: 'https://surogate.ai/partners/' },
  openGraph: { type: 'website', url: 'https://surogate.ai/partners/', title, description, siteName: 'Surogate' },
  twitter: { card: 'summary_large_image', title, description },
};

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

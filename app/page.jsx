import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import HomeHero from '@/components/home/HomeHero';
import Platform from '@/components/home/Platform';
import CodeSample from '@/components/home/CodeSample';
import Delivery from '@/components/home/Delivery';
import Deployment from '@/components/home/Deployment';
import PartnerProgram from '@/components/home/PartnerProgram';
import { route } from '@/lib/site';
import './home-page.css';

const { title, description } = route('/');

export const metadata = {
  title,
  description,
  alternates: { canonical: 'https://surogate.ai/' },
  openGraph: { type: 'website', url: 'https://surogate.ai/', title, description, siteName: 'Surogate' },
  twitter: { card: 'summary_large_image', title, description },
};

export default function Home() {
  return (
    <div className="pg-home font-sans text-brand-aubergine bg-white w-full overflow-x-hidden">
      <Nav />
      <main>
        <HomeHero />
        <Platform />
        <CodeSample />
        <Delivery />
        <Deployment />
        <PartnerProgram />
      </main>
      <Footer />
    </div>
  );
}

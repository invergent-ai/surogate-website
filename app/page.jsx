import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import HomeHero from '@/components/home/HomeHero';
import Platform from '@/components/home/Platform';
import CodeSample from '@/components/home/CodeSample';
import Delivery from '@/components/home/Delivery';
import Deployment from '@/components/home/Deployment';
import PartnerProgram from '@/components/home/PartnerProgram';
import { pageMetadata } from '@/lib/site';
import './home-page.css';

export const metadata = pageMetadata('/');

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

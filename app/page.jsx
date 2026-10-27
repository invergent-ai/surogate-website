import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import Bento from '@/components/home/Bento';
import Proof from '@/components/home/Proof';
import DevApi from '@/components/home/DevApi';
import Sovereign from '@/components/home/Sovereign';
import Films from '@/components/home/Films';
import Research from '@/components/home/Research';
import PartnersBand from '@/components/home/PartnersBand';
import Section, { SectionHead } from '@/components/site/Section';
import GetStarted from '@/components/site/GetStarted';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('/');

export default function Home() {
  return (
    <div className="v2 pg-v2 w-full overflow-x-clip bg-white font-sans text-ink">
      <Nav />
      <main>
        <Hero />
        <Bento />
        <Proof />
        <DevApi />
        <Sovereign />
        <Films />
        <Research />
        <PartnersBand />
        <Section>
          <SectionHead title="Choose how to get started." align="center" />
          <GetStarted location="home_closing" />
        </Section>
      </main>
      <Footer />
    </div>
  );
}

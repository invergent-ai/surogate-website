import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ChipsStrip from '@/components/ChipsStrip';
import Manifesto from '@/components/Manifesto';
import AppDemoParallax from '@/components/AppDemoParallax';
import UseCases from '@/components/UseCases';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import CtaHandover from '@/components/CtaHandover';
import Footer from '@/components/Footer';
import RevealRoot from '@/components/RevealRoot';

export default function Home() {
  return (
    <RevealRoot>
      <div className="bg-white text-brand-aubergine antialiased overflow-x-hidden">
        <Nav />
        <main id="top">
          <Hero />
          <ChipsStrip />
          <Manifesto />
          <AppDemoParallax />
          <UseCases />
          <HowItWorks />
          <Features />
          <CtaHandover />
        </main>
        <Footer />
      </div>
    </RevealRoot>
  );
}

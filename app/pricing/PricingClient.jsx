'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealRoot from '@/components/RevealRoot';
import PricingHero from '@/components/pricing/PricingHero';
import PricingPlans from '@/components/pricing/PricingPlans';
import PricingMultiAgent from '@/components/pricing/PricingMultiAgent';
import PricingDeveloperKit from '@/components/pricing/PricingDeveloperKit';
import PricingModels from '@/components/pricing/PricingModels';
import PricingDetails from '@/components/pricing/PricingDetails';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import PricingCta from '@/components/pricing/PricingCta';

export default function PricingClient() {
  const [billing, setBilling] = useState('monthly');

  return (
    <RevealRoot>
      <div className="bg-white text-brand-aubergine antialiased overflow-x-hidden">
        <Nav />
        <main id="top">
          <PricingHero />
          <PricingPlans billing={billing} setBilling={setBilling} />
          <PricingMultiAgent />
          <PricingDeveloperKit />
          <PricingModels />
          <PricingDetails />
          <PricingFAQ />
          <PricingCta />
        </main>
        <Footer />
      </div>
    </RevealRoot>
  );
}

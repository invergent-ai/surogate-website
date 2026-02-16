import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhatIsSurogate from '@/components/WhatIsSurogate';
import Recipes from '@/components/Recipes';
import Quickstart from '@/components/Quickstart';
import Hardware from '@/components/Hardware';
import Studio from '@/components/Studio';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-zinc-950 text-zinc-100 antialiased overflow-x-hidden">
      {/* Top Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,.35), transparent 60%)' }}
        ></div>
      </div>

      <Header />
      <Hero />
      <WhatIsSurogate />
      <Recipes />
      <Studio/>
      <Quickstart />
      <Hardware />
      <Footer />
    </div>
  );
}

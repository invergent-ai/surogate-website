import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import Results from '@/components/home/Results';
import Platform from '@/components/home/Platform';
import Layers from '@/components/home/Layers';
import Industries from '@/components/home/Industries';
import Doors from '@/components/home/Doors';
import Closing from '@/components/home/Closing';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('/');

export default function Home() {
  return (
    <div className="v2 pg-v2 w-full overflow-x-clip bg-white font-sans text-ink">
      <Nav />
      <main>
        <Hero />
        <Layers />
        <Platform />
        <Industries />
        <Results />
        <Doors />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}

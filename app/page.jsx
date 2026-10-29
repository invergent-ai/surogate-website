import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import Results from '@/components/home/Results';
import Films from '@/components/home/Films';
import Sovereign from '@/components/home/Sovereign';
import Platform from '@/components/home/Bento';
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
        <Results />
        <Films />
        <Sovereign />
        <Platform />
        <Doors />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}

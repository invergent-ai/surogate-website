import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import GatewayHero from '@/components/gateway/GatewayHero';
import Problem from '@/components/gateway/Problem';
import Routing from '@/components/gateway/Routing';
import Compatible from '@/components/gateway/Compatible';
import Controls from '@/components/gateway/Controls';
import Deploy from '@/components/gateway/Deploy';
import GatewayClosing from '@/components/gateway/GatewayClosing';
import { pageMetadata } from '@/lib/site';
import './gateway-page.css';

export const metadata = pageMetadata('/gateway/');

export default function GatewayPage() {
  return (
    <div className="pg-gateway font-sans text-brand-aubergine bg-white w-full overflow-x-hidden">
      <Nav />
      <main>
        <GatewayHero />
        <Problem />
        <Routing />
        <Compatible />
        <Controls />
        <Deploy />
        <GatewayClosing />
      </main>
      <Footer />
    </div>
  );
}

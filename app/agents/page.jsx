import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AgentsHero from '@/components/agents/AgentsHero';
import Path from '@/components/agents/Path';
import Sovereign from '@/components/agents/Sovereign';
import Setup from '@/components/agents/Setup';
import Runtime from '@/components/agents/Runtime';
import LongRunning from '@/components/agents/LongRunning';
import Channels from '@/components/agents/Channels';
import Improve from '@/components/agents/Improve';
import Compare from '@/components/agents/Compare';
import Sell from '@/components/agents/Sell';
import AgentsClosing from '@/components/agents/AgentsClosing';
import { route } from '@/lib/site';
import '../home.css';
import './agents-page.css';

const { title, description } = route('/agents/');

export const metadata = {
  title,
  description,
  alternates: { canonical: 'https://surogate.ai/agents/' },
  openGraph: { type: 'website', url: 'https://surogate.ai/agents/', title, description, siteName: 'Surogate' },
  twitter: { card: 'summary_large_image', title, description },
};

export default function AgentsPage() {
  return (
    <div className="pg-agents font-sans text-brand-aubergine bg-white w-full overflow-x-hidden">
      <Nav />
      <main id="top">
        <AgentsHero />
        <Path />
        <Sovereign />
        <Setup />
        <Runtime />
        <LongRunning />
        <Channels />
        <Improve />
        <Compare />
        <Sell />
        <AgentsClosing />
      </main>
      <Footer />
    </div>
  );
}

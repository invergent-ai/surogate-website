import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import KeelHero from '@/components/keel/KeelHero';
import Problem from '@/components/keel/Problem';
import Promises from '@/components/keel/Promises';
import Pillars from '@/components/keel/Pillars';
import BoardFlow from '@/components/keel/BoardFlow';
import KeelClosing from '@/components/keel/KeelClosing';
import { route } from '@/lib/site';
import './keel-page.css';

const { title, description } = route('/keel/');

export const metadata = {
  title,
  description,
  alternates: { canonical: 'https://surogate.ai/keel/' },
  openGraph: { type: 'website', url: 'https://surogate.ai/keel/', title, description, siteName: 'Surogate' },
  twitter: { card: 'summary_large_image', title, description },
};

export default function KeelPage() {
  return (
    <div className="pg-keel font-sans text-brand-aubergine bg-white w-full overflow-x-hidden">
      <Nav />
      <main>
        <KeelHero />
        <Problem />
        <Promises />
        <Pillars />
        <BoardFlow />
        <KeelClosing />
      </main>
      <Footer />
    </div>
  );
}

import Nav from '@/components/Nav';
import Lab from './Lab';

export const metadata = { title: 'Photo looks', robots: { index: false } };

export default function Page() {
  return (
    <div className="v2 pg-v2 w-full overflow-x-clip bg-white font-sans text-ink">
      <Nav />
      <Lab />
    </div>
  );
}

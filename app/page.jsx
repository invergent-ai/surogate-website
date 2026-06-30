import Nav from '@/components/Nav';
import ShowTell from '@/components/home/ShowTell';
import './home.css';

export default function Home() {
  return (
    <div className="bg-white text-brand-aubergine antialiased overflow-x-hidden">
      <Nav />
      <main id="top">
        <ShowTell />
      </main>
    </div>
  );
}

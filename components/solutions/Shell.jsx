import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function Shell({ children }) {
  return (
    <div className="v2 w-full overflow-x-clip bg-white font-sans text-ink">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

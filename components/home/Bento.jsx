import { ArrowRight } from 'lucide-react';
import Rabbit from '@/components/site/Rabbit';
import ProductMedia from '@/components/site/ProductMedia';
import { PRODUCTS } from '@/lib/products';

export default function Bento() {
  return (
    <section className="bg-white px-6 pb-24">
      <ul className="mx-auto m-0 grid max-w-[1232px] list-none gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => {
          const dark = p.tone === 'night';
          return (
            <li key={p.key}>
              <a href={p.href} className={`group flex h-[340px] flex-col overflow-hidden rounded-2xl no-underline ${dark ? 'bg-night !text-cream' : 'bg-ivory !text-ink'}`}>
                <div className="min-h-0 flex-1" aria-hidden="true"><ProductMedia product={p} /></div>
                <div className="flex items-center justify-between px-5 py-4 text-[15px]">
                  <span className="inline-flex items-center gap-2 font-medium">
                    <Rabbit pose={p.pose} size={22} className={dark ? 'text-sun' : 'text-aubergine'} />{p.name}
                  </span>
                  <span className="inline-flex items-center gap-1 opacity-70 group-hover:opacity-100">Explore <ArrowRight size={15} /></span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

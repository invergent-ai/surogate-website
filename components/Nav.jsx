'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onPricing = pathname?.startsWith('/pricing');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const home = (hash) => (onPricing ? `/${hash}` : hash);
  const baseLink =
    'font-sans text-[13px] font-medium transition-colors';
  const linkCls = (active) =>
    `${baseLink} ${active ? 'text-brand-aubergine' : 'text-brand-graphite hover:text-brand-aubergine'}`;

  return (
    <header
      className={`sticky top-0 z-50 bg-white/85 backdrop-blur-md backdrop-saturate-150 transition-[border-color,background] duration-200 border-b ${
        scrolled ? 'border-brand-border' : 'border-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <a href="/" aria-label="Surogate" className="inline-flex items-center h-7 text-brand-aubergine">
            <img src="/brand/logo-full-black.svg" alt="Surogate" className="h-7 w-auto block" />
          </a>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
            <a href={home('#how')} className={linkCls(false)}>
              How it works
            </a>
            <a href={home('#features')} className={linkCls(false)}>
              Features
            </a>
            <a href={home('#usecases')} className={linkCls(false)}>
              Use cases
            </a>
            <a href="/pricing" className={linkCls(onPricing)}>
              Pricing
            </a>
            <a
              href="https://docs.surogate.ai"
              className={linkCls(false)}
            >
              Docs
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={home('#signup')}
            className="hidden sm:inline-flex items-center text-[13px] text-brand-graphite hover:text-brand-aubergine px-3 py-2"
          >
            Sign in
          </a>
          <a
            href={home('#signup')}
            className="inline-flex items-center justify-center gap-2 h-9 px-4 bg-brand-aubergine text-white text-[11px] font-semibold uppercase tracking-wider-2 border border-brand-aubergine hover:bg-brand-aubergine-hover transition-colors"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}

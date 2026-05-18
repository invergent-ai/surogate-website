'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { key: 'how', hash: '#how', label: 'How it works' },
  { key: 'features', hash: '#features', label: 'Features' },
  { key: 'usecases', hash: '#usecases', label: 'Use cases' },
  { key: 'pricing', href: '/pricing', label: 'Pricing' },
  { key: 'docs', href: 'https://docs.surogate.ai', label: 'Docs', external: true },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onPricing = pathname?.startsWith('/pricing');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const home = (hash) => (onPricing ? `/${hash}` : hash);
  const baseLink = 'font-sans text-[13px] font-medium transition-colors';
  const linkCls = (active) =>
    `${baseLink} ${active ? 'text-brand-aubergine' : 'text-brand-graphite hover:text-brand-aubergine'}`;

  const resolveHref = (link) => {
    if (link.href) return link.href;
    return home(link.hash);
  };

  const isActive = (link) => link.key === 'pricing' && onPricing;

  return (
    <header
      className={`sticky top-0 z-50 bg-white/85 backdrop-blur-md backdrop-saturate-150 transition-[border-color,background] duration-200 border-b ${
        scrolled || menuOpen ? 'border-brand-border' : 'border-transparent'
      }`}
    >
      <div className="relative max-w-container mx-auto px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <a href="/" aria-label="Surogate" className="inline-flex items-center h-7 text-brand-aubergine">
            <img src="/brand/logo-full-black.svg" alt="Surogate" className="h-7 w-auto block" />
          </a>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={resolveHref(link)}
                className={linkCls(isActive(link))}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-md text-brand-aubergine hover:bg-brand-fog transition-colors"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 z-40 bg-brand-aubergine/15"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`md:hidden absolute left-0 right-0 top-full z-50 border-b border-brand-border bg-white/95 backdrop-blur-md transition-all duration-200 ease-out ${
          menuOpen
            ? 'visible opacity-100 translate-y-0'
            : 'invisible opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="max-w-container mx-auto px-8 py-5 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={resolveHref(link)}
              className={`rounded-md px-3 py-3 text-[15px] font-medium transition-colors ${
                isActive(link)
                  ? 'bg-brand-warm text-brand-aubergine'
                  : 'text-brand-graphite hover:bg-brand-fog hover:text-brand-aubergine'
              }`}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://ops.surogate.ai"
            className="mt-3 inline-flex items-center justify-center h-11 rounded-md bg-grad-wine-horiz px-5 text-xs font-semibold uppercase tracking-wider-2 text-white border border-brand-wine/40 transition hover:brightness-110"
            onClick={() => setMenuOpen(false)}
          >
            Sign in
          </a>
        </div>
      </nav>
    </header>
  );
}

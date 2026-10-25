'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics';
import { NAV, SIGN_IN } from '@/lib/site';

const external = (link) => (link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() || '/';
  const isCurrent = (link) => !link.external && pathname.startsWith(link.href);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Colours carry ! because Labs pages sit inside .st-home, whose `a{color:inherit}`
  // outranks a utility class.
  return (
    <header className="relative z-50 bg-brand-aubergine border-b border-white/[0.12] font-sans">
      {/* Positioned above the menu's backdrop, so the bar and its close button stay uncovered. */}
      <div className="relative z-50 max-w-[1248px] mx-auto px-6 py-4 flex flex-wrap items-center gap-x-8 gap-y-4">
        <a href="/" className="!text-white no-underline font-extrabold text-xl tracking-[-0.02em]">
          Surogate
        </a>
        <nav aria-label="Primary" className="hidden lg:flex flex-wrap gap-x-6 gap-y-1 flex-auto">
          {NAV.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={isCurrent(link) ? 'page' : undefined}
              className={`no-underline text-[15px] py-3 ${isCurrent(link) ? '!text-white font-bold' : '!text-white/80 hover:!text-white'}`}
              onClick={() => track('nav_link_clicked', { label: link.label, location: 'desktop' })}
              {...external(link)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={SIGN_IN}
            className="!text-white no-underline text-[15px] py-3"
            onClick={() => track('cta_signin_clicked', { location: 'nav' })}
          >
            Sign in
          </a>
          <a
            href="/partners/"
            className="inline-flex items-center min-h-[44px] px-[18px] bg-brand-orange !text-brand-aubergine no-underline font-semibold text-[15px]"
            onClick={() => track('cta_partner_clicked', { location: 'nav' })}
          >
            Become a partner
          </a>
        </div>
        <button
          type="button"
          className="lg:hidden ml-auto inline-flex items-center justify-center w-11 h-11 -mr-2 !text-white"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-brand-aubergine-2/60" aria-hidden="true" onClick={() => setMenuOpen(false)} />
      )}

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`lg:hidden absolute left-0 right-0 top-full z-50 bg-brand-aubergine border-b border-white/[0.12] transition-all duration-200 ease-out ${
          menuOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="px-6 pt-2 pb-6 flex flex-col">
          {NAV.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={isCurrent(link) ? 'page' : undefined}
              className={`no-underline text-[17px] py-3 border-b border-white/10 ${isCurrent(link) ? '!text-white font-bold' : '!text-white/80'}`}
              onClick={() => {
                track('nav_link_clicked', { label: link.label, location: 'mobile' });
                setMenuOpen(false);
              }}
              {...external(link)}
            >
              {link.label}
            </a>
          ))}
          <a href={SIGN_IN} className="no-underline text-[17px] py-3 !text-white" onClick={() => track('cta_signin_clicked', { location: 'nav_mobile' })}>
            Sign in
          </a>
          <a
            href="/partners/"
            className="mt-3 inline-flex items-center justify-center min-h-[48px] bg-brand-orange !text-brand-aubergine no-underline font-semibold text-base"
            onClick={() => track('cta_partner_clicked', { location: 'nav_mobile' })}
          >
            Become a partner
          </a>
        </div>
      </nav>
    </header>
  );
}

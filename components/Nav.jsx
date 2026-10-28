'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics';
import TrackedLink from '@/components/TrackedLink';
import Button from '@/components/site/Button';
import Logo from '@/components/site/Logo';
import ProductMedia, { isFootage } from '@/components/site/ProductMedia';
import { PRODUCTS } from '@/lib/products';
import { CONTACT_SALES, MENUS, SIGN_IN, TRY_MENU } from '@/lib/site';

const ext = (i) => (i.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

// Tracked, because the Try menu links the app's sign-in origin, which check-links counts as a conversion.
function MenuLink({ item, onPick }) {
  return (
    <TrackedLink href={item.href} {...ext(item)} event="nav_link_clicked" eventProps={{ label: item.label, location: 'desktop' }}
      onClick={() => onPick(item.label)}
      className="flex items-center justify-between gap-6 rounded-lg px-3 py-2 text-[14px] !text-ink no-underline transition-colors duration-150 ease-in-out hover:bg-stone">
      {item.label}
      {item.external && <ArrowUpRight size={14} className="text-ink/40" />}
    </TrackedLink>
  );
}

// All six previews stay mounted, stacked in one fixed box, and crossfade: no remount flash, no resize.
export function ProductsPanel({ onPick }) {
  const [active, setActive] = useState(PRODUCTS[0].key);
  return (
    <div className="grid h-[480px] w-[760px] grid-cols-[272px_1fr] gap-2 p-2">
      <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
        {PRODUCTS.map((p) => (
          <li key={p.key}>
            <a href={p.href} onMouseEnter={() => setActive(p.key)} onFocus={() => setActive(p.key)} onClick={() => onPick(p.name)}
              className={`block rounded-lg px-3 py-2 !text-ink no-underline transition-colors duration-150 ease-in-out ${active === p.key ? 'bg-stone' : ''}`}>
              <span className="block text-[14px] font-medium">{p.name}</span>
              <span className="mt-0.5 block text-[13px] leading-[1.45] text-ink/55">{p.line}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="relative h-full overflow-hidden rounded-lg" aria-hidden="true">
        {PRODUCTS.map((p) => (
          <div key={p.key} className={`absolute inset-0 transition-opacity duration-[170ms] ease-in-out ${{ night: 'bg-night', silver: 'bg-silver' }[p.tone] || 'bg-stone'} ${active === p.key ? 'opacity-100' : 'opacity-0'}`}>
            {isFootage(p.key)
              ? <div className="flex h-full items-center p-5"><ProductMedia product={p} still={active !== p.key} /></div>
              : <ProductMedia product={p} still={active !== p.key} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// Keeps Tab and Shift+Tab inside the open mobile sheet and its close button.
function trapFocus(e, nodes) {
  const items = nodes.filter((n) => n && n.getClientRects().length);
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  else if (!items.includes(document.activeElement)) { e.preventDefault(); first.focus(); }
}

const PANEL = 'rounded-xl border border-ink/[.06] bg-white shadow-[0_16px_48px_-8px_rgba(0,0,0,.22)]';

export default function Nav() {
  const [open, setOpen] = useState(null);
  const [sheet, setSheet] = useState(false);
  const [tryOpen, setTryOpen] = useState(false);
  // The products panel holds six live previews, so it is built on first open and then kept for its close animation.
  const [megaBuilt, setMegaBuilt] = useState(false);
  const pathname = usePathname() || '/';
  const header = useRef(null);
  const burger = useRef(null);
  const sheetRef = useRef(null);

  useEffect(() => { setOpen(null); setSheet(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Tab' && sheet) return trapFocus(e, [burger.current, ...sheetRef.current.querySelectorAll('a, summary, button')]);
      if (e.key !== 'Escape') return;
      if (open) header.current?.querySelector(`[data-menu="${open}"]`)?.focus();
      else if (sheet) burger.current?.focus();
      setOpen(null);
      setSheet(false);
    };
    const onDown = (e) => header.current && !header.current.contains(e.target) && setOpen(null);
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown); };
  }, [open, sheet]);

  useEffect(() => {
    const lg = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => e.matches && setSheet(false);
    lg.addEventListener('change', onChange);
    return () => lg.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!sheet) setTryOpen(false);
    document.body.style.overflow = sheet ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sheet]);

  const close = () => setOpen(null);
  const pick = (label) => { track('nav_link_clicked', { label, location: 'desktop' }); close(); };
  const show = (label) => {
    if (open !== label) track('nav_menu_open', { menu: label });
    if (label === 'Products') setMegaBuilt(true);
    setOpen(label);
  };
  const toggle = (label) => (open === label ? close() : show(label));
  // Hover already opened the menu, so a mouse click only opens; a keyboard press (detail 0) toggles.
  const press = (label) => (e) => (e.detail === 0 ? toggle(label) : show(label));

  return (
    <header ref={header} onMouseLeave={() => setOpen(null)}
      className="sticky top-0 z-50 h-16 border-b border-hairline bg-white/85 backdrop-blur-md font-sans">
      <div className="mx-auto flex h-full max-w-[1280px] items-center gap-8 px-4 md:px-6">
        <a href="/" className="shrink-0" aria-label="Surogate home">
          <Logo draw small title="" className="block h-7 w-auto text-ink" />
        </a>

        <nav aria-label="Primary" className="hidden flex-1 lg:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {MENUS.map((m) => (
              <li key={m.label} className="relative" onMouseEnter={() => (m.href ? close() : show(m.label))}>
                {m.href ? (
                  <a href={m.href} onClick={() => pick(m.label)}
                    aria-current={pathname.startsWith(m.href) ? 'page' : undefined}
                    className="block rounded-full px-3 py-2 text-[14px] font-medium !text-ink no-underline transition-colors duration-150 ease-in-out hover:bg-stone">{m.label}</a>
                ) : (
                  <>
                    <button type="button" data-menu={m.label} aria-expanded={open === m.label} onClick={press(m.label)}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-[14px] font-medium text-ink transition-colors duration-150 ease-in-out hover:bg-stone ${open === m.label ? 'bg-stone' : ''}`}>{m.label}<ChevronDown size={14} className={`text-ink/50 transition-transform duration-150 ease-in-out ${open === m.label ? 'rotate-180' : ''}`} />
                    </button>
                    {(!m.mega || megaBuilt) && (
                      <div className={`menu-pop absolute left-0 top-full pt-2 ${open === m.label ? 'is-open' : ''}`}>
                        <div className={PANEL}>
                          {m.mega ? <ProductsPanel onPick={pick} /> : (
                            <div className="w-[260px] p-2">
                              {m.items.map((i) => <MenuLink key={i.label} item={i} onPick={close} />)}
                              {m.more && (
                                <a href={m.more.href} onClick={() => pick(m.more.label)}
                                  className="mt-1 flex items-center justify-between rounded-lg bg-stone px-3 py-2 text-[14px] !text-ink no-underline transition-colors duration-150 ease-in-out hover:bg-hairline">
                                  {m.more.label}<ArrowUpRight size={14} />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Button href={CONTACT_SALES} variant="secondary" event="contact_sales_clicked" eventProps={{ location: 'nav' }}>Contact Sales</Button>
          <div className="relative flex" onMouseEnter={() => setOpen(null)}>
            <TrackedLink href={SIGN_IN} event="cta_signup_clicked" eventProps={{ location: 'nav' }}
              className="inline-flex h-10 items-center rounded-l-full bg-ink pl-[18px] pr-3 text-[14px] font-medium !text-white no-underline transition duration-150 ease-in-out hover:brightness-90">Try for free</TrackedLink>
            <button type="button" aria-label="More ways to start" aria-expanded={open === 'try'} data-menu="try" onClick={() => toggle('try')}
              className="inline-flex h-10 items-center rounded-r-full border-l border-white/20 bg-ink pl-2 pr-3 text-white transition duration-150 ease-in-out hover:brightness-90">
              <ChevronDown size={16} />
            </button>
            <div className={`menu-pop menu-r absolute right-0 top-full pt-2 ${open === 'try' ? 'is-open' : ''}`}>
              <div className={`w-[240px] p-2 ${PANEL}`}>
                {TRY_MENU.map((g) => (
                  <div key={g.group} className="py-1">
                    <p className="m-0 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-ink/40">{g.group}</p>
                    {g.items.map((i) => <MenuLink key={i.label} item={i} onPick={(l) => { track('try_free_option', { option: l }); close(); }} />)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button ref={burger} type="button" className="ml-auto inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          aria-expanded={sheet} aria-controls="mobile-nav" aria-label={sheet ? 'Close menu' : 'Open menu'} onClick={() => setSheet((s) => !s)}>
          {sheet ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* The header's backdrop-filter makes it the containing block for fixed children, so the sheet sizes to the viewport itself. */}
      {/* A tap on any link closes the sheet, so a same-page anchor does not leave it covering the page. */}
      <nav ref={sheetRef} id="mobile-nav" aria-label="Mobile" hidden={!sheet} onClick={(e) => e.target.closest('a') && setSheet(false)}
        className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-white px-6 pb-10 lg:hidden">
        {MENUS.map((m) => m.href ? (
          <a key={m.label} href={m.href} className="block border-b border-hairline py-4 text-[17px] !text-ink no-underline">{m.label}</a>
        ) : (
          <details key={m.label} className="group border-b border-hairline">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[17px] [&::-webkit-details-marker]:hidden">{m.label}<ChevronDown size={16} className="transition-transform group-open:rotate-180" /></summary>
            <div className="pb-3">
              {(m.mega ? PRODUCTS.map((p) => ({ label: p.name, href: p.href })) : [...m.items, ...(m.more ? [m.more] : [])]).map((i) => (
                <a key={i.label} href={i.href} {...ext(i)} className="block py-2.5 text-[15px] !text-ink/75 no-underline">{i.label}</a>
              ))}
            </div>
          </details>
        ))}
        <div className="mt-6 flex flex-col gap-3">
          <Button href={CONTACT_SALES} variant="secondary" size="lg" event="contact_sales_clicked" eventProps={{ location: 'nav_mobile' }}>Contact Sales</Button>
          <div className="flex">
            <TrackedLink href={SIGN_IN} event="cta_signup_clicked" eventProps={{ location: 'nav_mobile' }}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-l-full bg-ink pl-12 text-[14px] font-medium !text-white no-underline">Try for free</TrackedLink>
            <button type="button" aria-label="More ways to start" aria-expanded={tryOpen} aria-controls="mobile-try" onClick={() => setTryOpen((o) => !o)}
              className="inline-flex h-11 w-12 items-center justify-center rounded-r-full border-l border-white/20 bg-ink text-white">
              <ChevronDown size={16} className={`transition-transform duration-150 ease-in-out ${tryOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div id="mobile-try" hidden={!tryOpen} className="grid grid-cols-2 gap-x-4 gap-y-4 pt-2">
            {TRY_MENU.map((g) => (
              <div key={g.group}>
                <p className="m-0 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-ink/40">{g.group}</p>
                {g.items.map((i) => (
                  <TrackedLink key={i.label} href={i.href} {...ext(i)} event="try_free_option" eventProps={{ option: i.label, location: 'nav_mobile' }}
                    className="flex items-center gap-1 py-2.5 text-[15px] !text-ink/75 no-underline">
                    {i.label}{i.external && <ArrowUpRight size={13} className="text-ink/40" />}
                  </TrackedLink>
                ))}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

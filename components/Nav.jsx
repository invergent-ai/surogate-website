'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics';
import TrackedLink from '@/components/TrackedLink';
import Button from '@/components/site/Button';
import Rabbit from '@/components/site/Rabbit';
import ProductMedia from '@/components/site/ProductMedia';
import { PRODUCTS } from '@/lib/products';
import { CONTACT_SALES, MENUS, SIGN_IN, TRY_MENU } from '@/lib/site';

const ext = (i) => (i.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

// Tracked, because the Try menu links the app's sign-in origin, which check-links counts as a conversion.
function MenuLink({ item, onPick }) {
  return (
    <TrackedLink href={item.href} {...ext(item)} event="nav_link_clicked" eventProps={{ label: item.label, location: 'desktop' }}
      onClick={() => onPick(item.label)}
      className="flex items-center justify-between gap-6 rounded-xl px-3 py-2 text-[15px] !text-ink no-underline hover:bg-stone">
      {item.label}
      {item.external && <ArrowUpRight size={14} className="text-ink/40" />}
    </TrackedLink>
  );
}

function ProductsPanel({ onPick }) {
  const [active, setActive] = useState(PRODUCTS[0]);
  return (
    <div className="grid w-[760px] grid-cols-[260px_1fr] gap-2 p-2">
      <ul className="m-0 list-none p-0">
        {PRODUCTS.map((p) => (
          <li key={p.key}>
            <a href={p.href} onMouseEnter={() => setActive(p)} onFocus={() => setActive(p)} onClick={() => onPick(p.name)}
              className={`flex gap-3 rounded-xl px-3 py-2.5 !text-ink no-underline ${active.key === p.key ? 'bg-stone' : ''}`}>
              <Rabbit pose={p.pose} size={28} className="mt-0.5 shrink-0 text-aubergine" />
              <span>
                <span className="block text-[15px] font-medium">{p.name}</span>
                <span className="block text-[13px] leading-[1.45] text-ink/55">{p.line}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className={`flex flex-col justify-center overflow-hidden rounded-xl [&_video]:h-auto ${active.tone === 'night' ? 'bg-night' : 'bg-ivory'}`} aria-hidden="true">
        <ProductMedia key={active.key} product={active} />
      </div>
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(null);
  const [sheet, setSheet] = useState(false);
  const pathname = usePathname() || '/';
  const header = useRef(null);

  useEffect(() => { setOpen(null); setSheet(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (open) header.current?.querySelector(`[data-menu="${open}"]`)?.focus();
      setOpen(null);
      setSheet(false);
    };
    const onDown = (e) => header.current && !header.current.contains(e.target) && setOpen(null);
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown); };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sheet]);

  const close = () => setOpen(null);
  const pick = (label) => { track('nav_link_clicked', { label, location: 'desktop' }); close(); };
  const toggle = (label) => {
    setOpen((cur) => (cur === label ? null : label));
    if (open !== label) track('nav_menu_open', { menu: label });
  };

  return (
    <header ref={header} onMouseLeave={() => setOpen(null)}
      className="sticky top-0 z-50 h-16 border-b border-hairline bg-white/85 backdrop-blur-md font-sans">
      <div className="mx-auto flex h-full max-w-[1248px] items-center gap-8 px-6">
        <a href="/" className="shrink-0" aria-label="Surogate home">
          <img src="/brand/logo-full-black.svg" alt="" className="block h-7 w-auto" />
        </a>

        <nav aria-label="Primary" className="hidden flex-1 lg:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {MENUS.map((m) => (
              <li key={m.label} className="relative" onMouseEnter={() => (m.href ? setOpen(null) : setOpen(m.label))}>
                {m.href ? (
                  <a href={m.href} onClick={() => pick(m.label)}
                    aria-current={pathname.startsWith(m.href) ? 'page' : undefined}
                    className="block rounded-full px-3 py-2 text-[15px] !text-ink no-underline hover:bg-stone">{m.label}</a>
                ) : (
                  <>
                    <button type="button" data-menu={m.label} aria-expanded={open === m.label} onClick={() => toggle(m.label)}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[15px] text-ink hover:bg-stone">{m.label}<ChevronDown size={14} className={`transition-transform ${open === m.label ? 'rotate-180' : ''}`} />
                    </button>
                    {open === m.label && (
                      <div className="absolute left-0 top-full pt-2">
                        <div className="rounded-2xl border border-hairline bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,.25)]">
                          {m.mega ? <ProductsPanel onPick={pick} /> : (
                            <div className="w-[260px] p-2">
                              {m.items.map((i) => <MenuLink key={i.label} item={i} onPick={close} />)}
                              {m.more && (
                                <a href={m.more.href} onClick={() => pick(m.more.label)}
                                  className="mt-1 flex items-center justify-between rounded-xl bg-stone px-3 py-2 text-[14px] !text-ink no-underline">
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
              className="inline-flex h-10 items-center rounded-l-full bg-ink pl-[18px] pr-3 text-[14px] font-medium !text-white no-underline">Try for free</TrackedLink>
            <button type="button" aria-label="More ways to start" aria-expanded={open === 'try'} data-menu="try" onClick={() => toggle('try')}
              className="inline-flex h-10 items-center rounded-r-full border-l border-white/20 bg-ink pl-2 pr-3 text-white">
              <ChevronDown size={16} />
            </button>
            {open === 'try' && (
              <div className="absolute right-0 top-full pt-2">
                <div className="w-[240px] rounded-2xl border border-hairline bg-white p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,.25)]">
                  {TRY_MENU.map((g) => (
                    <div key={g.group} className="py-1">
                      <p className="m-0 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-ink/40">{g.group}</p>
                      {g.items.map((i) => <MenuLink key={i.label} item={i} onPick={(l) => { track('try_free_option', { option: l }); close(); }} />)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button type="button" className="ml-auto inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          aria-expanded={sheet} aria-controls="mobile-nav" aria-label={sheet ? 'Close menu' : 'Open menu'} onClick={() => setSheet((s) => !s)}>
          {sheet ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* The header's backdrop-filter makes it the containing block for fixed children, so the sheet sizes to the viewport itself. */}
      <nav id="mobile-nav" aria-label="Mobile" hidden={!sheet}
        className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-white px-6 pb-10 lg:hidden">
        {MENUS.map((m) => m.href ? (
          <a key={m.label} href={m.href} className="block border-b border-hairline py-4 text-[17px] !text-ink no-underline">{m.label}</a>
        ) : (
          <details key={m.label} className="border-b border-hairline">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[17px]">{m.label}<ChevronDown size={16} /></summary>
            <div className="pb-3">
              {(m.mega ? PRODUCTS.map((p) => ({ label: p.name, href: p.href })) : [...m.items, ...(m.more ? [m.more] : [])]).map((i) => (
                <a key={i.label} href={i.href} {...ext(i)} className="block py-2 text-[15px] !text-ink/75 no-underline">{i.label}</a>
              ))}
            </div>
          </details>
        ))}
        <div className="mt-6 flex flex-col gap-3">
          <Button href={CONTACT_SALES} variant="secondary" size="lg" event="contact_sales_clicked" eventProps={{ location: 'nav_mobile' }}>Contact Sales</Button>
          <Button href={SIGN_IN} size="lg" event="cta_signup_clicked" eventProps={{ location: 'nav_mobile' }}>Try for free</Button>
        </div>
      </nav>
    </header>
  );
}

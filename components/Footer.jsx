import TrackedLink from '@/components/TrackedLink';
import Logo from '@/components/site/Logo';
import FooterMark from '@/components/site/FooterMark';
import { FOOTER, LINKS } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-aubergine bg-[linear-gradient(180deg,#2a102d_0%,#1a0a1c_100%)] text-white font-sans shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
      <div className="relative mx-auto max-w-[1280px] px-4 md:px-6">
        {/* An aubergine closing band runs straight into the footer; this hairline keeps them two things. */}
        <div aria-hidden="true" className="mb-16 h-px bg-white/10 md:mb-20" />
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(6,1fr)]">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo small className="block h-8 w-auto text-white" />
            <p className="mt-4 max-w-[30ch] text-[14px] leading-[1.6] text-white/60">Your AI, on your terms. Built in Europe by Invergent.</p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.heading}>
              <h2 className="m-0 mb-2 text-[13px] md:mb-4 font-medium text-white/60">{col.heading}</h2>
              <ul className="m-0 list-none p-0 flex flex-col md:gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <TrackedLink href={l.href} event="footer_link_clicked" eventProps={{ label: l.label, section: col.heading }}
                      {...(/^https?:/.test(l.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="block py-2.5 text-[14px] !text-white/80 no-underline hover:!text-white md:inline md:py-0">{l.label}</TrackedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto mt-16 h-[220px] max-w-[1280px] overflow-hidden px-4 md:h-[280px] md:px-6">
        <div aria-hidden="true" className="absolute inset-x-4 top-0 h-px bg-white/10 md:inset-x-6" />
        <FooterMark className="absolute left-1/2 top-[-40px] h-[300px] w-auto -translate-x-1/2 md:top-[-90px] md:h-[460px]" />
        <div className="absolute inset-x-4 bottom-8 flex items-center justify-between gap-4 text-[13px] text-white/60 md:inset-x-6">
          <span>© 2026 INVERGENT S.A.</span>
          <a href={LINKS.status} target="_blank" rel="noopener noreferrer" className="!text-white/60 no-underline hover:!text-white">Status ↗</a>
        </div>
      </div>
    </footer>
  );
}

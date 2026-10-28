import TrackedLink from '@/components/TrackedLink';
import Logo from '@/components/site/Logo';
import { FOOTER, LINKS } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-aubergine text-white font-sans">
      <div className="mx-auto max-w-[1280px] px-4 pb-10 md:px-6">
        {/* An aubergine closing band runs straight into the footer; this hairline keeps them two things. */}
        <div aria-hidden="true" className="mb-16 h-px bg-white/10 md:mb-20" />
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(6,1fr)]">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo small className="block h-8 w-auto text-white" />
            <p className="mt-4 max-w-[30ch] text-[14px] leading-[1.6] text-white/60">Your AI, on your terms. Built in Europe by Invergent.</p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.heading}>
              <h2 className="m-0 mb-4 text-[13px] font-medium text-white/60">{col.heading}</h2>
              <ul className="m-0 list-none p-0 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <TrackedLink href={l.href} event="footer_link_clicked" eventProps={{ label: l.label, section: col.heading }}
                      {...(/^https?:/.test(l.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-[14px] !text-white/80 no-underline hover:!text-white">{l.label}</TrackedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-white/60">
          <span>© 2026 INVERGENT S.A.</span>
          <a href={LINKS.status} target="_blank" rel="noopener noreferrer" className="!text-white/60 no-underline hover:!text-white">Status ↗</a>
        </div>
      </div>
    </footer>
  );
}

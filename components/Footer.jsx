export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-border pt-12 pb-10">
      <div className="max-w-container mx-auto px-8">
        <div className="grid gap-10 grid-cols-2 lg:[grid-template-columns:2fr_1fr_1fr_1fr] items-start">
          <div>
            <a href="#top" className="inline-flex items-center text-brand-aubergine">
              <img src="/brand/logo-full-black.svg" alt="Surogate" className="h-9 w-auto block" />
            </a>
            <p className="mt-4 text-[13px] text-brand-steel max-w-[32ch] leading-[1.55]">
              The intelligence factory for autonomous agents. Build, deploy, observe. By Invergent SA.
            </p>
          </div>
          <FootCol heading="Product" links={[
            { href: '#features', label: 'Features' },
            { href: '#usecases', label: 'Use cases' },
            { href: '#how', label: 'How it works' },
            { href: '#', label: 'Pricing' },
          ]} />
          <FootCol heading="Resources" links={[
            { href: 'https://docs.surogate.ai', label: 'Docs' },
            { href: '#', label: 'Changelog' },
            { href: '#', label: 'Status' },
            { href: '#', label: 'Security' },
          ]} />
          <FootCol heading="Company" links={[
            { href: '#', label: 'About' },
            { href: '#', label: 'Careers' },
            { href: '#', label: 'Contact' },
            { href: '#', label: 'Privacy' },
          ]} />
        </div>

        <div className="mt-14 pt-6 border-t border-brand-border flex flex-wrap justify-between items-center gap-6 font-mono text-[11px] text-brand-steel tracking-[0.06em]">
          <span>© 2026 INVERGENT SA · ALL RIGHTS RESERVED</span>
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.18)]" />
            ALL SYSTEMS NORMAL
          </span>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ heading, links }) {
  return (
    <div>
      <h5 className="m-0 mb-3.5 font-mono text-[10px] uppercase tracking-wider-2 text-brand-steel font-semibold">
        {heading}
      </h5>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          className="block text-[13.5px] text-brand-graphite py-1 hover:text-brand-aubergine transition-colors"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

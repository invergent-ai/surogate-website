'use client';

import { usePathname } from 'next/navigation';
import { LABS_NAV } from '@/lib/labs';

/* A slim bar under the site nav on every labs page: where you are, and one click to the others. */
export default function LabsSubnav() {
  const here = (usePathname() || '').replace(/\/$/, '');
  return (
    <nav className="lab-subnav" aria-label="Labs">
      <div className="wrap lab-subnav-in">
        {LABS_NAV.map((l) => (
          <a key={l.href} href={l.href} aria-current={here === l.href.replace(/\/$/, '') ? 'page' : undefined}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

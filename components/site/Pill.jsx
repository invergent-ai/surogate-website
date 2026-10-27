import { ArrowUpRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';

export default function Pill({ tag, title, text, href, event = 'announcement_clicked', className = '', style }) {
  const ext = /^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <TrackedLink href={href} {...ext} event={event} eventProps={{ title }} style={style}
      className={`group inline-flex h-9 max-w-full items-center gap-2 rounded-full border border-hairline bg-white pl-1.5 pr-1.5 text-[13px] !text-ink no-underline transition-colors duration-150 ease-in-out hover:border-ink/25 ${className}`}>
      <span className="shrink-0 rounded-full bg-sun/15 px-2 py-0.5 text-[12px] font-medium !text-[#a85d00]">{tag}</span>
      <span className="shrink-0 font-semibold">{title}</span>
      {text && <span className="truncate text-ink/50">· {text}</span>}
      <span className="ml-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone" aria-hidden="true">
        <ArrowUpRight size={13} className="nudge" />
      </span>
    </TrackedLink>
  );
}

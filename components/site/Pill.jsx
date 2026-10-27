import { ArrowUpRight } from 'lucide-react';

export default function Pill({ tag, text, href }) {
  return (
    <a href={href} className="inline-flex items-center gap-3 rounded-full border border-hairline bg-white py-1.5 pl-2 pr-1.5 text-[14px] !text-ink no-underline hover:bg-ivory">
      <span className="rounded-full bg-sun/20 px-2 py-0.5 text-[12px] font-medium !text-[#9a5b00]">{tag}</span>
      <span>{text}</span>
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-stone" aria-hidden="true">
        <ArrowUpRight size={14} />
      </span>
    </a>
  );
}

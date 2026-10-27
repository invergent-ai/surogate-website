import { ChevronRight } from 'lucide-react';
import Cover from './Cover';
import { fmtDate } from '@/lib/news';

export default function NewsCard({ post }) {
  return (
    <a href={`/news/${post.slug}/`} className="group block !text-ink no-underline">
      <span className="block aspect-[16/10] overflow-hidden rounded-xl"><Cover kind={post.cover} /></span>
      <span className="mt-4 flex gap-3 text-[12px]">
        <span className="font-medium text-ink">{post.category}</span>
        <time dateTime={post.date} className="text-ink/55">{fmtDate(post.date)}</time>
      </span>
      <span className="mt-1.5 flex items-start gap-1 text-[16px] font-medium leading-[1.4]">
        <span>{post.title}</span><ChevronRight size={16} className="nudge mt-[3px] shrink-0 text-ink/40 group-hover:text-ink" />
      </span>
    </a>
  );
}

export function NewsGrid({ posts }) {
  // Four fill one row, as the home page's model cards do; otherwise rows of three.
  return (
    <ul className={`m-0 grid list-none gap-x-3 gap-y-10 p-0 sm:grid-cols-2 ${posts.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {posts.map((p) => <li key={p.slug}><NewsCard post={p} /></li>)}
    </ul>
  );
}

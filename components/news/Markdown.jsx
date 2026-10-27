// The Markdown subset lib/news.js posts are written in: ## headings, paragraphs, - lists,
// ``` blocks, and inline `code`, **keys** and [links](url). Anything else renders as text.

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

function inline(text) {
  return text.split(INLINE).map((part, i) => {
    if (part.startsWith('`')) return <code key={i} className="rounded bg-stone px-1 py-px font-mono text-[0.88em]">{part.slice(1, -1)}</code>;
    if (part.startsWith('**')) return <strong key={i} className="font-medium text-ink">{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const ext = /^https?:/.test(link[2]) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
      return <a key={i} href={link[2]} {...ext} className="!text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink">{link[1]}</a>;
    }
    return part;
  });
}

export function blocks(src) {
  const out = [];
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!l.trim()) continue;
    if (l.startsWith('```')) {
      const code = [];
      while (++i < lines.length && !lines[i].startsWith('```')) code.push(lines[i]);
      out.push({ type: 'code', text: code.join('\n') });
    } else if (l.startsWith('## ')) out.push({ type: 'h2', text: l.slice(3) });
    else if (l.startsWith('- ')) {
      const items = [l.slice(2)];
      while (lines[i + 1]?.startsWith('- ')) items.push(lines[++i].slice(2));
      out.push({ type: 'ul', items });
    } else {
      const para = [l];
      while (lines[i + 1]?.trim() && !/^(## |- |```)/.test(lines[i + 1])) para.push(lines[++i]);
      out.push({ type: 'p', text: para.join(' ') });
    }
  }
  return out;
}

export default function Markdown({ source }) {
  return blocks(source).map((b, i) => {
    if (b.type === 'h2') return <h2 key={i} className="m-0 mt-12 text-[22px] font-[500] leading-[1.25] tracking-[-0.01em] text-ink md:text-[24px]">{b.text}</h2>;
    if (b.type === 'code') return <pre key={i} className="m-0 mt-6 overflow-x-auto rounded-xl bg-night p-5 font-mono text-[13px] leading-[1.6] text-cream/90"><code>{b.text}</code></pre>;
    if (b.type === 'ul') return (
      <ul key={i} className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
        {b.items.map((x, j) => <li key={j} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-ink/40">{inline(x)}</li>)}
      </ul>
    );
    return <p key={i} className="m-0 mt-5">{inline(b.text)}</p>;
  });
}

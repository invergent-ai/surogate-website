export default function StatStrip({ items }) {
  return (
    <dl className="m-0 grid grid-cols-2 md:grid-cols-4 border-y border-hairline">
      {items.map((s) => (
        <div key={s.l} className="px-6 py-8 border-hairline md:[&:not(:first-child)]:border-l">
          <dt className="sr-only">{s.l}</dt>
          <dd className="m-0 text-[40px] leading-none tracking-[-0.01em] font-[500]">{s.n}</dd>
          <dd className="m-0 mt-3 text-[14px] leading-[1.5] text-ink/60">{s.l}</dd>
        </div>
      ))}
    </dl>
  );
}

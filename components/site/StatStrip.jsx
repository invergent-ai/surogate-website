export default function StatStrip({ items }) {
  return (
    <dl className="m-0 grid border-y border-hairline md:grid-cols-3">
      {items.map((s) => (
        <div key={s.l} className="border-hairline px-2 py-8 [&:not(:first-child)]:border-t md:px-8 md:py-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-t-0">
          <dt className="sr-only">{s.l}</dt>
          <dd className="m-0 text-[44px] font-[400] leading-none tracking-[-0.02em] md:text-[56px]">{s.n}</dd>
          <dd className="m-0 mt-3 text-[14px] leading-[1.5] text-ink/55">{s.l}</dd>
        </div>
      ))}
    </dl>
  );
}

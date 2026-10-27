const TONES = {
  light: 'bg-white text-ink',
  ivory: 'bg-ivory text-ink',
  aubergine: 'bg-aubergine text-cream',
};

export default function Section({ tone = 'light', id, className = '', inner = '', children }) {
  return (
    <section id={id} className={`${TONES[tone]} ${className}`}>
      <div className={`max-w-[1200px] mx-auto px-6 py-24 md:py-32 ${inner}`}>{children}</div>
    </section>
  );
}

export function SectionHead({ title, sub, align = 'left', action }) {
  const center = align === 'center';
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 mb-12 ${center ? 'flex-col !items-center text-center' : ''}`}>
      <div className={`max-w-[760px] ${center ? 'mx-auto' : ''}`}>
        <h2 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.01em] font-[500]">{title}</h2>
        {sub && <p className="mt-4 mb-0 text-[18px] leading-[1.6] opacity-70">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

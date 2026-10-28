const TONES = {
  light: 'bg-white text-ink',
  grey: 'bg-stone text-ink',
  aubergine: 'bg-aubergine text-white',
};

export const CONTAINER = 'mx-auto max-w-[1280px] px-4 md:px-6';

// Light sections are told apart by a hairline that stays inside the page: a little wider than the content,
// never reaching the viewport edges. Coloured sections are told apart by their colour, so a light section
// right after one drops its hairline (app/v2.css, .section-rule).
export default function Section({ tone = 'light', divider = tone === 'light', id, className = '', inner = '', children }) {
  return (
    <section id={id} data-tone={tone} className={`${TONES[tone]} ${className}`}>
      {divider && <div aria-hidden="true" className="section-rule mx-auto h-px w-[calc(100%-32px)] max-w-[1328px] bg-hairline" />}
      <div className={`${CONTAINER} py-16 md:py-24 ${inner}`}>{children}</div>
    </section>
  );
}

// Feature size for the big split sections, list size for sections that head a grid.
export const H2 = {
  feature: 'm-0 text-[30px] font-[500] leading-[1.1] tracking-[-0.01em] md:text-[46px] md:leading-[1.05]',
  list: 'm-0 text-[28px] font-[500] leading-[1.15] tracking-[-0.01em] md:text-[30px] md:leading-[36px]',
};

export function SectionHead({ title, sub, align = 'left', action }) {
  const center = align === 'center';
  return (
    <div className={`mb-10 flex flex-wrap items-end justify-between gap-6 ${center ? 'flex-col !items-center text-center' : ''}`}>
      <div className={`max-w-[640px] ${center ? 'mx-auto' : ''}`}>
        <h2 className={H2.list}>{title}</h2>
        {sub && <p className="mt-3 mb-0 text-balance text-[16px] leading-[1.6] opacity-65">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

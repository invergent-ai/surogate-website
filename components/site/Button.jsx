import TrackedLink from '@/components/TrackedLink';

// Colours carry ! because Labs pages sit inside .st-home, whose a{color:inherit} outranks utilities.
const VARIANTS = {
  primary: 'bg-ink !text-white hover:brightness-90',
  secondary: 'bg-stone !text-ink hover:bg-hairline',
  sun: 'bg-sun !text-aubergine hover:brightness-90',
  glass: 'bg-white/10 !text-white hover:bg-white/15',
};
const SIZES = { md: 'h-10 px-[18px] text-[14px] gap-1.5', lg: 'h-11 px-5 text-[14px] gap-1.5' };

// A chevron whose stem fades in on hover, so it reads as › at rest and → on intent.
export function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="nudge shrink-0">
      <path className="arrow-stem" d="M2.5 8h9.5" />
      <path d="M7.5 3.5 12 8l-4.5 4.5" />
    </svg>
  );
}

export default function Button({ href, variant = 'primary', size = 'md', arrow = false, event, eventProps, external, className = '', children }) {
  const cls = `group inline-flex items-center justify-center rounded-full font-medium no-underline whitespace-nowrap transition duration-150 ease-in-out ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const body = <>{children}{arrow && <Arrow />}</>;
  if (event) return <TrackedLink href={href} className={cls} event={event} eventProps={eventProps} {...ext}>{body}</TrackedLink>;
  return <a href={href} className={cls} {...ext}>{body}</a>;
}

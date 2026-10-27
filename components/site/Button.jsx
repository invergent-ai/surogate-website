import TrackedLink from '@/components/TrackedLink';

// Colours carry ! because Labs pages sit inside .st-home, whose a{color:inherit} outranks utilities.
const VARIANTS = {
  primary: 'bg-ink !text-white hover:bg-ink/85',
  secondary: 'bg-stone !text-ink hover:bg-hairline',
  sun: 'bg-sun !text-aubergine hover:brightness-95',
  glass: 'bg-white/10 !text-white hover:bg-white/15',
};
const SIZES = { md: 'h-10 px-[18px] text-[14px]', lg: 'h-11 px-5 text-[15px]' };

export default function Button({ href, variant = 'primary', size = 'md', event, eventProps, external, className = '', children }) {
  const cls = `inline-flex items-center justify-center gap-1.5 rounded-full font-medium no-underline whitespace-nowrap transition-colors ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  if (event) return <TrackedLink href={href} className={cls} event={event} eventProps={eventProps} {...ext}>{children}</TrackedLink>;
  return <a href={href} className={cls} {...ext}>{children}</a>;
}

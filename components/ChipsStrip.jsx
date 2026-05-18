const CHIPS = [
  { label: 'Your workflow, multiplied' },
  { label: 'Runs in the cloud' },
  { label: 'No code required' },
  { label: 'Works while you chill', lateral: true },
  { label: 'Anyone can build an agent' },
  { label: 'Free to start' },
];

export default function ChipsStrip() {
  return (
    <section aria-label="Quick value props" className="py-10 sm:py-12 lg:py-14 bg-white relative">
      <div className="max-w-container mx-auto px-8">
        <div className="flex flex-wrap gap-2.5 justify-center">
          {CHIPS.map((chip) => (
            <span
              key={chip.label}
              className={
                chip.lateral
                  ? 'inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-[11px] sm:text-[13px] font-semibold italic bg-brand-orange border border-brand-orange text-brand-aubergine transition-colors'
                  : 'inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-[11px] sm:text-[13px] font-medium bg-brand-aubergine border border-brand-aubergine text-white hover:bg-brand-aubergine-hover transition-colors'
              }
            >
              <span
                className={
                  chip.lateral
                    ? 'w-[5px] h-[5px] rounded-full bg-brand-aubergine shadow-[0_0_0_3px_rgba(42,16,45,0.18)]'
                    : 'w-[5px] h-[5px] rounded-full bg-brand-yellow'
                }
              />
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

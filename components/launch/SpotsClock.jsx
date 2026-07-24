const CLOCK_ORANGE = '#FFB00F';

// Static for now - decrements automatically once a real signup backend is wired up.
export default function SpotsClock({ total = 100 }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative inline-flex items-center justify-center w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-full"
        style={{
          background: 'linear-gradient(180deg, #FFFAF2 0%, #FFFFFF 100%)',
          border: `1px solid ${CLOCK_ORANGE}`,
          boxShadow: '0px 9px 10px rgba(255, 176, 15, 0.1)',
        }}
      >
        <style>{`
          @keyframes launchClockTick {
            0%, 100% { opacity: 0.55; }
            45% { opacity: 0.95; }
          }
          .launch-clock-tick {
            animation: launchClockTick 1.8s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .launch-clock-tick { animation: none; opacity: 0.7; }
          }
        `}</style>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const outer = 44;
            const inner = i % 3 === 0 ? 36 : 39.5;
            const x1 = 50 + outer * Math.sin(angle);
            const y1 = 50 - outer * Math.cos(angle);
            const x2 = 50 + inner * Math.sin(angle);
            const y2 = 50 - inner * Math.cos(angle);
            return (
              <line
                key={i}
                className="launch-clock-tick"
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={CLOCK_ORANGE}
                strokeWidth={i % 3 === 0 ? 2.5 : 1.25}
                strokeLinecap="round"
                style={{ animationDelay: `${(i * 1.8) / 12}s` }}
              />
            );
          })}
        </svg>

        <div className="relative z-10 flex flex-col items-center gap-1">
          <span
            className="font-serif font-bold text-[48px] sm:text-[56px] tabular-nums leading-none"
            style={{ color: CLOCK_ORANGE }}
          >
            {total}
          </span>
          <span className="font-sans text-[12px] sm:text-[13px]" style={{ color: CLOCK_ORANGE }}>
            free agents left
          </span>
        </div>
      </div>
    </div>
  );
}

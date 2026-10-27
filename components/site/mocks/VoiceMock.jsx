import Rabbit from '../Rabbit';

const BARS = [5, 9, 14, 20, 12, 22, 26, 16, 20, 10, 18, 24, 14, 8, 12, 18];

// Both sides of a call: Jackrabbit listens, Amami speaks. The rabbit is Amami's character, breathing,
// with sound rings going out from it.
export default function VoiceMock() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-5">
      <span className="relative flex h-20 w-20 items-center justify-center text-aubergine" style={{ '--rabbit-bg': '#f2f1ef' }}>
        <span className="voice-ring absolute inset-1 rounded-full border border-sun/50" />
        <span className="voice-ring absolute inset-1 rounded-full border border-sun/50" style={{ animationDelay: '1.2s' }} />
        <span className="rabbit-breathe relative"><Rabbit pose="voice" size={72} /></span>
      </span>
      <span className="flex h-4 items-center gap-[2px]" aria-hidden="true">
        {BARS.map((h, i) => <span key={i} className="mock-bar w-[2px] rounded-full bg-aubergine/60" style={{ height: h * 0.55, '--i': i }} />)}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
        <span className="whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-ink/70">Listens · Jackrabbit ASR</span>
        <span className="whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-ink/70">Speaks · Amami TTS</span>
      </div>
    </div>
  );
}

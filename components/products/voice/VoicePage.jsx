import Section, { H2 } from '@/components/site/Section';
import Button from '@/components/site/Button';
import { CONTACT_SALES } from '@/lib/site';
import { SPEECH_ABOUT, SPEECH_RUN } from '@/lib/labs';
import { AMAMI, FLEURS_WER, JACKRABBIT, STREAMING } from '@/lib/voice';
import Page, { Hero, Lead, Facts, UseCases, Closing } from '../Page';
import Faq from '../Faq';
import { Call, Voices } from './Audio';

const FACTS = [
  { n: '5.69%', l: 'word error rate for Jackrabbit on the FLEURS Romanian test' },
  { n: '0.72 s', l: 'from the end of speech to the final sentence, streaming, on one RTX 5090' },
  { n: '2 CPU cores', l: 'run Amami about 2.7 times faster than real time, no GPU' },
];

// In the words of the solution pages (lib/solutions.js).
const USES = [
  { market: 'Banking', job: 'A call center that reads codes right', line: 'Amounts and dates in words, IBANs and codes one character at a time.', href: '/solutions/banking-insurance/' },
  { market: 'Insurance', job: 'Claims lines that answer in Romanian', line: 'Jackrabbit writes each call down as cased, punctuated Romanian, ready for the claim file.', href: '/solutions/banking-insurance/' },
  { market: 'Public sector', job: 'Citizens who call in Romanian', line: 'Both models run on a CPU, inside your network, with no connection out.', href: '/solutions/government/' },
  { market: 'Any team', job: 'A phone number for an agent', line: 'Phone is one of the nine channels in Surogate, with the agent\'s skills and approvals behind it.', href: '/agents/' },
];

const MODELS = [
  { m: JACKRABBIT, does: 'Listens', line: 'Writes cased, punctuated Romanian text from recordings. 116M parameters, comfortable on a CPU.' },
  { m: STREAMING, does: 'Listens live', line: 'Shows words as you speak, then a final sentence when you pause, over HTTP or WebSocket.' },
  { m: AMAMI, does: 'Speaks', line: 'Stress where native speakers put it, the English words Romanians use at work said the English way, and codes dictated one character at a time.' },
];

const FAQ = [
  ['Which languages?', 'Romanian today: Jackrabbit listens and Amami speaks. Amami also says the English words Romanians use at work (meeting, call, update, backup) the English way. Surogate Speech ships language by language.'],
  ['How accurate is the recognizer?', `Jackrabbit scores 5.69% word error rate over all ${FLEURS_WER.clips} FLEURS Romanian test clips, against 5.95% for a 1B-parameter recognizer and 8.42% for a 1.55B one, each run through the same evaluation code. Every transcript is in the published evaluation dataset.`],
  ['Will it read a code or an IBAN wrong?', 'Amami dictates codes, IBANs and phone numbers one character at a time, from recorded clips, so a voice agent reads them the same way every time.'],
  ['Does it need a GPU?', 'Amami runs about 2.7 times faster than real time on two CPU threads, with first audio after about 120 ms. Jackrabbit runs comfortably on a CPU; the 0.72 s streaming figure was measured on one RTX 5090.'],
  ['Can it run inside our call center?', 'Yes. Both models are served by the Surogate engine, on your servers or on our cloud.'],
  ['How is it licensed?', SPEECH_ABOUT.license],
];

export default function VoicePage() {
  return (
    <Page>
      <Hero name="Surogate Voice" title="Voice agents that sound local."
        sub="Romanian speech we train ourselves: a recognizer that listens and a voice that speaks. On our cloud, or inside your call center."
        actions={<>
          <Button href={CONTACT_SALES} size="lg" arrow event="contact_sales_clicked" eventProps={{ location: 'voice_hero' }}>Contact Sales</Button>
          <Button href="#voices" size="lg" variant="secondary">Listen to the voices</Button>
        </>}>
        <Call />
      </Hero>

      <Section id="uses">
        <Lead title="For calls that have to go right." sub="Where a misheard word or a misread code costs money." />
        <UseCases items={USES} />
      </Section>

      <Section id="models">
        <Lead title="Three small models, one job each." sub="Jackrabbit to listen and Amami to speak, open on Hugging Face." />
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
          {MODELS.map(({ m, does, line }) => (
            <li key={m.id} className="flex flex-col rounded-2xl bg-white p-6">
              <img src={m.mark} alt="" width="48" height="48" className="h-12 w-12" />
              <p className="m-0 mt-5 text-[13px] text-ink/50">{does}</p>
              <h3 className="m-0 mt-1 text-[15px] font-[500]">{m.name}</h3>
              <p className="m-0 mt-2 text-[14px] leading-[1.55] text-ink/65">{line}</p>
              <p className="m-0 mt-auto pt-5 text-[14px]"><span className="font-medium tabular-nums">{m.stat.n}</span></p>
              <p className="m-0 mt-1 text-[12px] leading-[1.5] text-ink/50">{m.stat.l}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="voices" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.list}>Hear it read what agents read.</h2>
          <p className="mt-3 mb-0 max-w-[40ch] text-[16px] leading-[1.6] text-ink/65">Greetings, appointments, IBANs, codes, the news and the English words of an office. Each clip is one take from the model.</p>
          <p className="mt-6 mb-0 text-[13px] text-ink/50"><a href="/labs/speech/" className="!text-ink/70 underline decoration-ink/25 underline-offset-4 hover:decoration-ink">More samples in Research</a></p>
        </div>
        <Voices />
      </Section>

      <Section id="benchmark">
        <Lead title="Smaller, and more accurate." sub="Measured, and every transcript published." />
        <Facts items={FACTS} />
        <p className="m-0 mt-16 mb-5 text-[15px] font-[500] md:mt-20">Word error rate over all {FLEURS_WER.clips} FLEURS Romanian test clips. Lower is better.</p>
        <ul className="m-0 max-w-[880px] list-none border-b border-hairline p-0">
          {FLEURS_WER.rows.map((r) => (
            <li key={r.name} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-t border-hairline py-5 sm:grid-cols-[260px_1fr_auto]">
              <span className={`text-[15px] ${r.us ? 'font-medium' : 'text-ink/65'}`}>{r.name}</span>
              <span aria-hidden="true" className="order-last col-span-2 h-1.5 rounded-full bg-stone sm:order-none sm:col-span-1">
                <span className={`block h-full rounded-full ${r.us ? 'bg-ink' : 'bg-ink/30'}`} style={{ width: `${(r.wer / 10) * 100}%` }} />
              </span>
              <span className="text-right text-[18px] font-[450] tabular-nums">{r.wer.toFixed(2)}%</span>
            </li>
          ))}
        </ul>
        <p className="m-0 mt-5 max-w-[880px] text-[13px] leading-[1.55] text-ink/50">Jackrabbit with CTC decoding and a 4-gram language model; each model through the same evaluation code. Every transcript is in the <a href={FLEURS_WER.source} target="_blank" rel="noopener noreferrer" className="!text-ink/70 underline decoration-ink/25 underline-offset-4">evaluation dataset</a>. Recordings: FLEURS by Google, CC BY 4.0.</p>
      </Section>

      <Section tone="aubergine" id="on-prem" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.feature}>Inside your call center.</h2>
          <p className="mt-4 mb-0 max-w-[42ch] text-[16px] leading-[1.6] text-white/70">Both models are served by the Surogate engine, on your own servers, so recordings stay in your network.</p>
          <div className="mt-7"><Button href={CONTACT_SALES} variant="sun" size="lg" arrow event="contact_sales_clicked" eventProps={{ location: 'voice_onprem' }}>Contact Sales</Button></div>
          <p className="m-0 mt-5 text-[14px] text-white/60"><a href="/pricing/#enterprise" className="!text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">Enterprise pricing</a></p>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          {[['Speak', SPEECH_RUN.tts], ['Listen', SPEECH_RUN.stt]].map(([t, code]) => (
            <div key={t} className="min-w-0 rounded-xl bg-night">
              <p className="m-0 border-b border-white/10 px-4 py-2.5 text-[12px] text-white/50">{t}</p>
              <pre className="m-0 overflow-x-auto !bg-transparent p-4 font-mono text-[12px] leading-[1.7] text-white/85">{code}</pre>
            </div>
          ))}
        </div>
      </Section>

      <Faq items={FAQ} />

      <Closing title="Put a local voice on your line." line="Tell us about your calls. We will set up a pilot on our cloud or on your servers."
        action={<Button href={CONTACT_SALES} size="lg" arrow event="contact_sales_clicked" eventProps={{ location: 'voice_closing' }}>Contact Sales</Button>} />
    </Page>
  );
}

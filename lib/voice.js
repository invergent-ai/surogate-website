// What the Voice page shows, from the speech models' cards (lib/labs.js SPEECH_MODELS, huggingface.co/surogate) and
// the evaluation runs behind /labs/speech/ (huggingface.co/datasets/surogate/surogate-speech-evals).
import DEMOS from './speech-demos.json' with { type: 'json' };
import { SPEECH_MODELS, amamiSrc } from './labs.js';

const model = (name) => SPEECH_MODELS.find((m) => m.name === name);
export const AMAMI = model('Amami TTS');
export const JACKRABBIT = model('Jackrabbit ASR');
export const STREAMING = model('Jackrabbit Streaming ASR');

// Word error rate over all 883 FLEURS Romanian test clips, every model through the same harness.
export const FLEURS_WER = {
  clips: 883,
  rows: [
    { name: 'Jackrabbit, 116M parameters', wer: 5.69, us: true },
    { name: 'A 1B-parameter recognizer', wer: 5.95 },
    { name: 'A 1.55B-parameter recognizer', wer: 8.42 },
  ],
  source: 'https://huggingface.co/datasets/surogate/surogate-speech-evals',
};

// The whole-call demo: both sides are Amami, seven recorded lines back to back, with the start of each line.
// The English is ours, for readers who do not speak Romanian.
const GLOSS = [
  'Good afternoon, you have reached Banca Livada support. How can I help?',
  'Hi! I can\'t get into the app since the last update.',
  'I\'m sending you a code by SMS now. Please read it to me.',
  'The code is 7XK-492-QPA.',
  'Thank you, you\'re verified. I\'ve reset your access, and the 249.90 lei payment to Raftul shows as completed.',
  'Great, thanks! I have another call at ten, so I\'ll hang up.',
  'You\'re welcome! Have a good day, and good luck with the meeting.',
];
export const CALL = { src: '/labs/audio/amami/call.m4a', duration: 37.1, lines: DEMOS.call.map((c, i) => ({ ...c, en: GLOSS[i] })) };

// One sample per kind of line a voice agent says, in both voices.
const PICKS = ['assistant-hello', 'ag-doctor', 'code-iban', 'code-verify', 'nw-bulletin', 'rg-standup'];
export const SAMPLES = PICKS.map((slug) => {
  const s = AMAMI.samples.find((x) => x.slug === slug);
  return { ...s, src: (voice) => amamiSrc(voice, slug) };
});
export const VOICES = AMAMI.voices;

// The phone channel of a Surogate agent, as the product has it (paths in the surogate-ops and surogates repos).
export const PHONE = [
  { t: 'A number per agent', d: 'An admin adds numbers to a pool, and each agent takes one. Calls come in over SIP.',
    src: ['surogate-ops/frontend/src/features/work/voice-channel-view.tsx', 'surogate-ops/surogate_ops/server/routes/admin_phone_numbers.py', 'surogates/surogates/voice/__init__.py'] },
  { t: 'Romanian built in', d: 'Jackrabbit hears callers and Amami answers them, included with the agent.',
    src: ['surogates/surogates/voice/providers.py', 'surogate-ops/frontend/src/features/work/voice-speech-section.tsx'] },
  { t: 'English and more, your provider', d: 'For other languages, connect ElevenLabs, Cartesia, Deepgram, OpenAI, Gradium, Fish Audio or your own server.',
    src: ['surogates/surogates/voice/providers.py', 'surogates/surogates/voice/lines.py'] },
  { t: 'Calls out, from a program', d: 'A step in a program can ring a customer from the agent\'s number. Quiet hours apply.',
    src: ['surogate-ops/frontend/src/features/work/journey-step-drawer.tsx', 'surogates/surogates/voice/outbound.py'] },
  { t: 'A room behind the voice', d: 'Background sound such as a school office or a clinic desk, pronunciations for your names, and call limits.',
    src: ['surogate-ops/frontend/src/features/work/voice-background-section.tsx', 'surogate-ops/frontend/src/features/work/voice-channel-view.tsx'] },
  { t: 'Callers remembered, if you choose', d: 'The agent can keep what a caller said for their next call. It never treats a number as proof of who called.',
    src: ['surogate-ops/frontend/src/features/work/voice-channel-view.tsx'] },
];

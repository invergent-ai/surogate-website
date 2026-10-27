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
  'Good afternoon, you have reached Revolut support. How can I help?',
  'Hi! I can\'t get into the app since the last update.',
  'I\'m sending you a code by SMS now. Please read it to me.',
  'The code is 7XK-492-QPA.',
  'Thank you, you\'re verified. I\'ve reset your access, and the 249.90 lei payment to eMAG shows as completed.',
  'Great, thanks! I have another call at ten, so I\'ll hang up.',
  'You\'re welcome! Have a good day, and good luck with the meeting.',
];
export const CALL = { src: '/labs/audio/amami/call.m4a', duration: 40.4, lines: DEMOS.call.map((c, i) => ({ ...c, en: GLOSS[i] })) };

// One sample per kind of line a voice agent says, in both voices.
const PICKS = ['assistant-hello', 'ag-doctor', 'code-iban', 'code-verify', 'nw-bulletin', 'rg-standup'];
export const SAMPLES = PICKS.map((slug) => {
  const s = AMAMI.samples.find((x) => x.slug === slug);
  return { ...s, src: (voice) => amamiSrc(voice, slug) };
});
export const VOICES = AMAMI.voices;

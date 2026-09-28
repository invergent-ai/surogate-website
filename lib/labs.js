/*
 * Everything /labs and /labs/rune-examples show, in one place, so the two pages
 * cannot disagree. Every number is copied from a public page and keeps its
 * caveat: the Rune launch post (invergent.ai/blog/rune) and the model cards on
 * huggingface.co/surogate. lib/labs.test.mjs guards the rules.
 */

export const space = (name) => ({
  page: `https://huggingface.co/spaces/surogate/${name}`,
  embed: `https://surogate-${name}.hf.space`,
});

export const RUNE = {
  blog: 'https://invergent.ai/blog/rune/',
  model: 'https://huggingface.co/surogate/rune-26b-a4b-GGUF',
  docs: 'https://github.com/invergent-ai/surogate/blob/main/docs/inference/decisions.md',
  spaces: 'https://huggingface.co/surogate',
};

export const RUNE_FACTS = [
  { n: '26B', l: 'parameters, a mixture of experts with 4B active per token' },
  { n: '262k', l: 'tokens of context, for text, structured data and images' },
  { n: '0.18 s', l: 'median for a decision about an image, on one NVIDIA RTX PRO 6000' },
  { n: 'Open', l: 'weights under Apache 2.0, served by the Surogate engine' },
];

const demo = (d) => ({ ...d, ...space(d.slug), shot: `/labs/${d.slug}.png` });

export const RUNE_DEMOS = [
  demo({
    slug: 'rune-draws-back',
    title: 'Rune Draws Back',
    kind: 'Image · play',
    icon: 'Pencil',
    line: 'You draw the word you are given. Every time you lift the pen, Rune looks at the canvas and gives a probability for each of 50 words, so you watch it change its mind stroke by stroke.',
    proves: 'Image decisions fast enough to feel live.',
  }),
  demo({
    slug: 'rune-plays-volley',
    title: 'Rune Plays Volley',
    kind: 'Image · game',
    icon: 'Volleyball',
    line: 'Slime Volleyball against Rune. Every few frames the game pauses, Rune looks at the screen and says where the ball is, and its slime moves. You watch the probabilities behind every step.',
    proves: 'Rune as the eyes of a control loop, reading pixels.',
  }),
  demo({
    slug: 'where-do-i-click',
    title: 'Where Do I Click?',
    kind: 'Image · useful',
    icon: 'MousePointerClick',
    line: 'A screenshot and a task. Rune zooms through a labelled grid, one choice per round, and lands on the control. If the thing is not on the screen, it says so instead of guessing.',
    proves: 'Finding a target on a screen with no detector and no OCR.',
  }),
  demo({
    slug: 'chart-check',
    title: 'Chart Check',
    kind: 'Image · useful',
    icon: 'ChartLine',
    line: 'A chart from a post and the claim made about it. Rune says whether the chart backs the claim, whether the axis is cropped, and how misleading the pair is.',
    proves: 'Several decisions about one image in a single request.',
  }),
  demo({
    slug: 'should-i-send-this',
    title: 'Should I Send This?',
    kind: 'Text · useful',
    icon: 'Send',
    line: 'Paste a draft before you send it. Five decisions in one request: passive-aggressive, likely to start a fight, written angry, how warm it reads, and what to do with it.',
    proves: 'Typed answers you can act on, with nothing to parse.',
  }),
];

/* A real request and response from rune.surogate.ai (2026-09-28), probabilities
   rounded to four places for reading. */
export const RUNE_EXAMPLE = {
  request: `{
  "model": "rune-v3",
  "state": {
    "ticket":
      "Order 8812 arrived late and the box was crushed. I want a refund."
  },
  "questions": {
    "refund": {
      "type": "noul",
      "instructions": "Is a refund requested?"
    },
    "tone": {
      "type": "choice",
      "instructions": "What is the tone?",
      "criteria": {"calm": "Calm", "annoyed": "Annoyed",
                   "furious": "Furious"}
    },
    "urgency": {
      "type": "score",
      "instructions": "How urgent is this?",
      "criteria": ["Not urgent", "Somewhat urgent",
                   "Very urgent"]
    }
  }
}`,
  response: `{
  "answers": {
    "refund": {"type": "noul", "noul": 1.0},
    "tone": {
      "type": "choice",
      "choice": "annoyed",
      "confidence": 0.941,
      "probabilities": {"calm": 0.0329,
                        "annoyed": 0.9607,
                        "furious": 0.0065}
    },
    "urgency": {
      "type": "score",
      "score": 0.9479,
      "confidence": 0.742,
      "probabilities": {"0": 0.1121, "1": 0.828,
                        "2": 0.06}
    }
  }
}`,
};

export const SPEECH_MODELS = [
  {
    id: 'surogate/amami-357m-ro',
    name: 'Amami 357M',
    kind: 'Text to speech · Romanian',
    icon: 'AudioLines',
    line: 'Reads Romanian aloud, numbers, dates and abbreviations included, in three built-in voices. Runs natively on CPU or GPU and streams audio as it is synthesized.',
    stat: { n: '2.02%', l: 'word error rate when an independent recognizer transcribes it back, mean of the three voices, 100-sentence Romanian test set' },
    repo: 'https://huggingface.co/surogate/amami-357m-ro',
    voices: [
      { name: 'Doina', src: '/labs/audio/doina.m4a' },
      { name: 'Tudor', src: '/labs/audio/tudor.m4a' },
      { name: 'Radu', src: '/labs/audio/radu.m4a' },
    ],
  },
  {
    id: 'surogate/jackrabbit-110m-ro',
    name: 'Jackrabbit 110M',
    kind: 'Speech recognition · Romanian',
    icon: 'Mic',
    line: 'Writes cased, punctuated Romanian from recordings. A 116M-parameter model that runs comfortably on a CPU, with no Python in the serving path.',
    stat: { n: '5.69%', l: 'word error rate on the FLEURS Romanian test, CTC decoding with a 4-gram language model, Open ASR Leaderboard runner' },
    repo: 'https://huggingface.co/surogate/jackrabbit-110m-ro',
  },
  {
    id: 'surogate/jackrabbit-110m-ro-streaming',
    name: 'Jackrabbit Streaming',
    kind: 'Live speech recognition · Romanian',
    icon: 'Radio',
    line: 'Shows words as you speak, then writes a final, punctuated sentence when you pause. Live audio over HTTP or WebSocket.',
    stat: { n: '0.72 s', l: 'from the moment you stop talking to the final sentence, on one RTX 5090, including 640 ms to detect the pause' },
    repo: 'https://huggingface.co/surogate/jackrabbit-110m-ro-streaming',
  },
];

export const SPEECH_LINKS = [
  { label: 'Surogate Speech toolkit', href: 'https://github.com/invergent-ai/surogate-speech' },
  { label: 'Evaluation transcripts', href: 'https://huggingface.co/datasets/surogate/surogate-speech-evals' },
  { label: 'Serving speech with Surogate', href: 'https://github.com/invergent-ai/surogate/blob/main/docs/inference/tts.md' },
];

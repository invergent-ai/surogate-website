/*
 * Everything /labs and /labs/rune-examples show, in one place, so the two pages
 * cannot disagree. Every number is copied from a public page and keeps its
 * caveat: the Rune launch post (invergent.ai/blog/rune) and the model cards on
 * huggingface.co/surogate. lib/labs.test.mjs guards the rules.
 */

/* A copy of the port table in the labs repo's spaces/local.sh, which is the source of truth; change both. With
   NEXT_PUBLIC_LABS_EMBED=local (in .env.local), `npm run dev` embeds those
   local Spaces instead of the published ones, so the page can be tried before
   anything is on Hugging Face. Production builds never set it. */
const LOCAL_PORTS = {
  'should-i-send-this': 7860,
  'chart-check': 7861,
  'where-do-i-click': 7862,
  'doodle-decoder': 7863,
  'rune-plays-volley': 7864,
};

export const space = (name) => ({
  page: `https://huggingface.co/spaces/surogate/${name}`,
  // ?__theme=light keeps Gradio white in a dark-mode browser; the static Spaces ignore it.
  // ?embed=surogate tells the Space it is inside surogate.ai, so it drops its own header and footer.
  embed:
    process.env.NEXT_PUBLIC_LABS_EMBED === 'local' && LOCAL_PORTS[name]
      ? `http://127.0.0.1:${LOCAL_PORTS[name]}/?__theme=light&embed=surogate`
      : `https://surogate-${name}.hf.space/?__theme=light&embed=surogate`,
});

export const RUNE = {
  blog: 'https://invergent.ai/blog/rune/',
  model: 'https://huggingface.co/surogate/rune-26b-a4b-GGUF',
  docs: 'https://github.com/invergent-ai/surogate/blob/main/docs/inference/decisions.md',
};

export const RUNE_FACTS = [
  { n: '26B', l: 'parameters, a mixture of experts with 4B active per token' },
  { n: '262k', l: 'tokens of context, for text, structured data and images' },
  { n: '0.18 s', l: 'median for a decision about an image, on one NVIDIA RTX PRO 6000' },
  { n: 'Open', l: 'weights under Apache 2.0, served by the Surogate engine' },
];

// input: what Rune looks at (image or text); use: what the demo is for (game or work). The label and the
// filter tags both come from these two, so they cannot disagree.
const demo = (d) => ({
  ...d,
  ...space(d.slug),
  shot: `/labs/${d.slug}.png`,
  kind: `${d.input[0].toUpperCase()}${d.input.slice(1)} · ${d.use}`,
  tags: [d.input, d.use],
});

export const RUNE_DEMOS = [
  demo({
    slug: 'doodle-decoder',
    title: 'Doodle Decoder',
    input: 'image',
    use: 'game',
    icon: 'Pencil',
    line: 'You draw the word you are given. Every time you lift the pen, Rune looks at the canvas and gives a probability for each of 50 words, so you watch it change its mind stroke by stroke.',
    proves: 'Image decisions fast enough to feel live.',
  }),
  demo({
    slug: 'rune-plays-volley',
    title: 'Rune Plays Volley',
    input: 'image',
    use: 'game',
    icon: 'Volleyball',
    line: 'Slime Volleyball against Rune, in real time. Several times a second Rune looks at the court and says where the ball is, and its slime moves. You watch the probabilities behind every step.',
    proves: 'Rune as the eyes of a control loop, reading pixels.',
  }),
  demo({
    slug: 'where-do-i-click',
    title: 'Where Do I Click?',
    input: 'image',
    use: 'work',
    icon: 'MousePointerClick',
    line: 'A screenshot and a task. Rune zooms through a labelled grid, one choice per round, and lands on the control. If the thing is not on the screen, it says so instead of guessing.',
    proves: 'Finding a target on a screen with no detector and no OCR.',
  }),
  demo({
    slug: 'chart-check',
    title: 'Chart Check',
    input: 'image',
    use: 'work',
    icon: 'ChartLine',
    line: 'A chart from a post and the claim made about it. Rune says whether the chart backs the claim, whether the axis is cropped, and how misleading the pair is.',
    proves: 'Several decisions about one image in a single request.',
  }),
  demo({
    slug: 'should-i-send-this',
    title: 'Should I Send This?',
    input: 'text',
    use: 'work',
    icon: 'Send',
    line: 'Paste a draft before you send it. Five decisions in one request: passive-aggressive, likely to start a fight, written angry, how warm it reads, and what to do with it.',
    proves: 'Typed answers you can act on, with nothing to parse.',
  }),
];

/* The chips above the demos on /labs/rune-examples. */
export const DEMO_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'game', label: 'Games' },
  { key: 'work', label: 'Work' },
  { key: 'image', label: 'Images' },
  { key: 'text', label: 'Text' },
];

/* The demos a filter shows. Anything unknown (an old or mistyped link) shows them all. */
export const demosFor = (key) => {
  const shown = RUNE_DEMOS.filter((d) => d.tags.includes(key));
  return shown.length ? shown : RUNE_DEMOS;
};

/* A real request and response from rune.surogate.ai (2026-09-28), probabilities
   rounded to four places for reading. */
export const RUNE_EXAMPLE = {
  latency: '160 ms, from a laptop to the hosted Rune',
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
    name: 'Amami TTS',
    kind: 'Text to speech · Amami 357M · Romanian',
    mark: '/labs/speech/amami.svg',
    icon: 'AudioLines',
    line: 'Reads Romanian aloud, numbers, dates and abbreviations included, in three built-in voices. Runs natively on CPU or GPU and streams audio as it is synthesized.',
    stat: { n: '2.02% WER', l: 'word error rate when an independent recognizer transcribes it back, mean of the three voices, 100-sentence Romanian test set' },
    repo: 'https://huggingface.co/surogate/amami-357m-ro',
    voices: [
      { name: 'Doina', src: '/labs/audio/doina.m4a' },
      { name: 'Tudor', src: '/labs/audio/tudor.m4a' },
      { name: 'Radu', src: '/labs/audio/radu.m4a' },
    ],
  },
  {
    id: 'surogate/jackrabbit-110m-ro',
    name: 'Jackrabbit ASR',
    kind: 'Speech recognition · Jackrabbit 110M · Romanian',
    mark: '/labs/speech/jackrabbit.svg',
    icon: 'Mic',
    line: 'Writes cased, punctuated Romanian from recordings. A 116M-parameter model that runs comfortably on a CPU, with no Python in the serving path.',
    stat: { n: '5.69% WER', l: 'word error rate on the FLEURS Romanian test, CTC decoding with a 4-gram language model, Open ASR Leaderboard runner' },
    repo: 'https://huggingface.co/surogate/jackrabbit-110m-ro',
  },
  {
    id: 'surogate/jackrabbit-110m-ro-streaming',
    name: 'Jackrabbit Streaming ASR',
    kind: 'Live speech recognition · Jackrabbit 110M Streaming · Romanian',
    mark: '/labs/speech/jackrabbit-streaming.svg',
    icon: 'Radio',
    line: 'Shows words as you speak, then writes a final, punctuated sentence when you pause. Live audio over HTTP or WebSocket.',
    stat: { n: '0.72 s to text', l: 'from the moment you stop talking to the final sentence, on one RTX 5090, including 640 ms to detect the pause' },
    repo: 'https://huggingface.co/surogate/jackrabbit-110m-ro-streaming',
  },
];

/* What Surogate Speech is, from the launch article on Hugging Face (2026-09-25). */
export const SPEECH_ABOUT = {
  line: 'Surogate Speech is our line of small, open speech models for agents: a model family per job, Jackrabbit to listen and Amami to speak, shipped language by language. Romanian is the first language out, because our first agents take calls in it. More languages and more families are on the way.',
  article: 'https://huggingface.co/blog/cetusian/surogate-speech',
  collection: 'https://huggingface.co/collections/surogate/surogate-speech-6ab680eb84c7ff75fb73ad5a',
  license: 'Weights under CC-BY-NC-4.0 for research and non-commercial use; commercial licences through Invergent.',
};

export const SPEECH_LINKS = [
  { label: 'Surogate Speech toolkit', href: 'https://github.com/invergent-ai/surogate-speech' },
  { label: 'Evaluation transcripts', href: 'https://huggingface.co/datasets/surogate/surogate-speech-evals' },
  { label: 'Serving speech with Surogate', href: 'https://github.com/invergent-ai/surogate/blob/main/docs/inference/tts.md' },
];

/* The labs sub-nav, shown on every labs page. */
export const LABS_NAV = [
  { href: '/labs/', label: 'Labs' },
  { href: '/labs/rune/', label: 'Rune' },
  { href: '/labs/speech/', label: 'Speech' },
  { href: '/labs/rune-examples/', label: 'Rune examples' },
];

/* Calibration, from the Rune model card: the Decision Index's 33 benchmarks with a right or wrong
   answer per field, each weighted equally. The temperature changes the probabilities, never the choice. */
export const RUNE_CALIBRATION = {
  confidence: 73.6,
  accuracy: 73.9,
  source: '33 Decision Index benchmarks with a right answer per field',
};

/* How to run the speech models, from their public model cards. */
export const SPEECH_RUN = {
  tts: `docker run --gpus all -p 8000:8000 ghcr.io/invergent-ai/surogate:1.5.4 \\
  serve --tts surogate/amami-357m-ro --device 0 --host 0.0.0.0 --port 8000

curl http://localhost:8000/v1/audio/speech -H "Content-Type: application/json" \\
  -d '{"model": "surogate/amami-357m-ro", "voice": "Doina", "input": "Bună ziua!"}' -o doina.wav`,
  stt: `docker run --gpus all -p 8000:8000 ghcr.io/invergent-ai/surogate:1.5.4 \\
  serve --stt surogate/jackrabbit-110m-ro-streaming --host 0.0.0.0 --port 8000

curl http://localhost:8000/v1/audio/transcriptions -F file=@recording.wav`,
};

/* The public Decision Index leaderboard (0.2.1, as published on 26 September 2026), from the Rune model
   card: Rune v3's row is the maintainers' reproduction of our submitted bf16 run, matched bit for bit.
   Skill scores rescale each benchmark so guessing scores 0. */
export const LEADERBOARD = {
  page: 'https://huggingface.co/spaces/multimodalart/jev-decision-index',
  embed: 'https://multimodalart-jev-decision-index.static.hf.space',
  edition: '0.2.1',
  date: '26 September 2026',
  index: 57.44,
  rank: 2,
  benchmarks: 38,
  areas: [
    { name: 'Knowledge & Reasoning', skill: 43.4 },
    { name: 'Language', skill: 63.1 },
    { name: 'Retrieval & Classification', skill: 63.5 },
    { name: 'Tools & Automation', skill: 71.2 },
    { name: 'Arts & Human Taste', skill: 41.9 },
  ],
};

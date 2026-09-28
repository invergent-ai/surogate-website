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
  'three-way-match': 7865,
  covered: 7866,
  inbox: 7867,
  'complaint-x-ray': 7868,
  'contract-risk-map': 7869,
  'rune-watchtower': 7870,
  'so101-episode-judge': 7871,
  'rune-duck': 7872,
  'ask-your-camera': 7873,
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

/* The sectors a demo serves, shown as its label and used by the filter. A demo can serve several. */
export const SECTORS = [
  { key: 'robotics', label: 'Robotics & physical AI' },
  { key: 'security', label: 'Security & trust' },
  { key: 'agents', label: 'Agents & automation' },
  { key: 'finance', label: 'Finance & insurance' },
  { key: 'legal', label: 'Legal & communication' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'games', label: 'Games & play' },
];

// input: what Rune looks at (image, text or video); sectors: who it is for, the first being the main one.
const demo = (d) => ({
  ...d,
  ...space(d.slug),
  shot: `/labs/${d.slug}.png`,
  kind: `${d.input[0].toUpperCase()}${d.input.slice(1)} · ${SECTORS.find((x) => x.key === d.sectors[0]).label}`,
});

export const RUNE_DEMOS = [
  demo({
    slug: 'rune-watchtower',
    title: 'Rune Watchtower',
    input: 'video',
    sectors: ['security', 'robotics'],
    icon: 'Cctv',
    line: 'Security, drone and traffic footage, watched by Rune about once a second. A grid marks where things are, and code writes a timestamped event log: a person on foot in cell H, a vehicle in the lane, a crew near a roof edge. Replay recorded answers, run it live, or upload your own clip.',
    proves: 'Video as a stream of typed decisions, with marking and an event log built in code.',
  }),
  demo({
    slug: 'so101-episode-judge',
    title: 'SO-101 Episode Judge',
    input: 'video',
    sectors: ['robotics'],
    icon: 'Bot',
    line: 'Real SO-101 robot-arm episodes from open LeRobot datasets. Rune watches every second: which phase the arm is in, whether it holds the object, whether a human hand reaches in. Then it says which episodes to keep and which to delete from the dataset, with the command to do it.',
    proves: 'Curating robot training data by looking, with no reward model to train.',
  }),
  demo({
    slug: 'rune-duck',
    title: 'Rune and the Duck',
    input: 'video',
    sectors: ['robotics', 'games'],
    icon: 'Bird',
    line: 'Microduck, the open-source duck robot everyone is building. Guess its mood from a clip, then see how Rune read it. Or let Rune drive the simulated duck: it looks at the frame, says where the ball is and how close, and code walks the duck over and kicks.',
    proves: 'Rune as the eyes of a walking robot, on an open robot and its open policies.',
  }),
  demo({
    slug: 'ask-your-camera',
    title: 'Ask Your Camera',
    input: 'video',
    sectors: ['agents', 'security'],
    icon: 'Webcam',
    newTab: true,
    line: 'Point your webcam at anything and ask it questions of your own: is someone at the desk, is the door open, am I smiling, how many fingers am I holding up. Rune answers about once a second with a live probability, logs every change, and can flash an alarm when the answer you care about turns yes.',
    proves: 'Any yes/no or pick-one question becomes a live sensor, with no model to train.',
  }),
  demo({
    slug: 'where-do-i-click',
    title: 'Where Do I Click?',
    input: 'image',
    sectors: ['agents', 'security'],
    icon: 'MousePointerClick',
    line: 'A screenshot and a task. Rune zooms through a labelled grid, one choice per round, and lands on the control. If the thing is not on the screen, it says so instead of guessing.',
    proves: 'Finding a target on a screen with no detector and no OCR.',
  }),
  demo({
    slug: 'inbox',
    title: 'What the Inbox Sees',
    input: 'image',
    sectors: ['security', 'agents'],
    icon: 'MailWarning',
    line: 'Attackers hide the message in a picture, a QR code or a phone number, because filters read text. Rune reads the email the way the person does: who it pretends to be, what it wants you to do, and whether it really comes from your domain.',
    proves: 'Sight catches what text filters are built to miss.',
  }),
  demo({
    slug: 'three-way-match',
    title: 'Three-Way Match',
    input: 'image',
    sectors: ['finance', 'agents'],
    icon: 'ReceiptText',
    line: 'A phone photo of an invoice, the purchase order and the vendor\'s bank account. Rune checks every PO line and the bank details on the paper itself. Clean invoices post; a changed price goes to a clerk by line; new bank details hold the payment.',
    proves: 'Rune confirms the record instead of reading numbers out, so it cannot invent one.',
  }),
  demo({
    slug: 'covered',
    title: 'Covered?',
    input: 'image',
    sectors: ['finance', 'agents'],
    icon: 'House',
    line: 'A photo of the damage, the claim as the customer wrote it, and the policy wording. Rune says what the photo shows, which section covers it and whether an exclusion bites. Edit the wording and the verdict follows it.',
    proves: 'A photo and a long document in one decision, and a claim is routed, never declined.',
  }),
  demo({
    slug: 'complaint-x-ray',
    title: 'Complaint X-ray',
    input: 'text',
    sectors: ['finance', 'legal'],
    icon: 'MessageSquareWarning',
    line: 'Paste a bank complaint. Rune names the product, the issue and what the customer wants, and flags what compliance must see: discrimination, a servicemember or older customer, a legal threat. Measured on 320 real public complaints against the regulator\'s own labels, with a slider for how much to automate.',
    proves: 'Calibrated confidence you can set a threshold on: auto-route the sure ones, and know how many will be right.',
  }),
  demo({
    slug: 'chart-check',
    title: 'Chart Check',
    input: 'image',
    sectors: ['finance'],
    icon: 'ChartLine',
    line: 'A chart from a post and the claim made about it. Rune says whether the chart backs the claim, whether the axis is cropped, and how misleading the pair is.',
    proves: 'Several decisions about one image in a single request.',
  }),
  demo({
    slug: 'contract-risk-map',
    title: 'Contract Risk Map',
    input: 'text',
    sectors: ['legal'],
    icon: 'Scale',
    line: 'Paste a contract and say which side you are on. Rune reads every clause with the whole contract as context and ranks them by the risk they put on you: what is standard, what to negotiate, what a lawyer should read first.',
    proves: 'Many decisions in parallel, one per clause, in seconds.',
  }),
  demo({
    slug: 'should-i-send-this',
    title: 'Should I Send This?',
    input: 'text',
    sectors: ['legal'],
    icon: 'Send',
    line: 'Paste a draft and say who you are, who it is for and where it goes. Rune checks it the way that reader will read it: the tone, a vague ask, jargon, blame, a leak, a promise you can\'t keep, and what to do before you send it.',
    proves: 'Typed answers you can act on, with nothing to parse.',
  }),
  demo({
    slug: 'doodle-decoder',
    title: 'Doodle Decoder',
    input: 'image',
    sectors: ['games'],
    icon: 'Pencil',
    line: 'You draw the word you are given. Every time you lift the pen, Rune looks at the canvas and gives a probability for each of 50 words, so you watch it change its mind stroke by stroke.',
    proves: 'Image decisions fast enough to feel live.',
  }),
  demo({
    slug: 'rune-plays-volley',
    title: 'Rune Plays Volley',
    input: 'image',
    sectors: ['games'],
    icon: 'Volleyball',
    line: 'Slime Volleyball against Rune, in real time. Several times a second Rune looks at the court and says where the ball is, and its slime moves. You watch the probabilities behind every step.',
    proves: 'Rune as the eyes of a control loop, reading pixels.',
  }),
];

/* The address an opened demo loads. share is the page it sits on, so a share made inside the Space links
   back to this demo there (the Space trusts only surogate.ai). params come from a shared link, such as
   ?demo=doodle-decoder&word=sun; the page's own settings are not passed on, and the Space checks the rest. */
const PAGE_PARAMS = ['demo', 'sector', 'input', 'share', 'embed', '__theme'];
export const embedSrc = (demo, page, params = {}) => {
  const url = new URL(demo.embed);
  const back = new URL(page);
  back.search = '';
  back.searchParams.set('demo', demo.slug);
  url.searchParams.set('share', String(back));
  for (const [k, v] of Object.entries(params)) if (!PAGE_PARAMS.includes(k)) url.searchParams.set(k, v);
  return String(url);
};

/* The two filters above the demos on /labs/rune-examples: the sector, and what Rune looks at. */
export const DEMO_FILTERS = [
  // Only sectors that have a demo, so no chip ever shows 0.
  { key: 'sector', label: 'Sector', options: [{ key: 'all', label: 'All' },
    ...SECTORS.filter((x) => RUNE_DEMOS.some((d) => d.sectors.includes(x.key)))] },
  { key: 'input', label: 'What Rune looks at', options: [{ key: 'all', label: 'All' },
    ...[{ key: 'image', label: 'Images' }, { key: 'text', label: 'Text' }, { key: 'video', label: 'Video' }]
      .filter((x) => RUNE_DEMOS.some((d) => d.input === x.key))] },
];

/* The demos matching both filters. A missing or unknown value (an old or mistyped link) means "all". */
const matches = { sector: (d, v) => d.sectors.includes(v), input: (d, v) => d.input === v };
export const demosFor = (value) =>
  RUNE_DEMOS.filter((d) => DEMO_FILTERS.every((g) => {
    const v = value[g.key];
    return !g.options.some((o) => o.key === v && v !== 'all') || matches[g.key](d, v);
  }));

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

/* Where an Amami sample clip lives, per voice. */
export const amamiSrc = (voice, slug) => `/labs/audio/amami/${voice}-${slug}.m4a`;

export const SPEECH_MODELS = [
  {
    // Private until release; the model card link works once it is public.
    id: 'surogate/amami-110m-ro',
    name: 'Amami TTS',
    kind: 'Text to speech · Amami 110M · Romanian',
    mark: '/labs/speech/amami.svg',
    icon: 'AudioLines',
    line: 'A 110M-parameter Romanian voice that runs in real time on two CPU cores, no GPU. It puts the stress where Romanians put it, reads numbers, dates and amounts in words, and dictates codes, IBANs and phone numbers one character at a time from recorded clips, so a voice agent never reads a code wrong.',
    stat: { n: '2.83% WER', l: 'word error rate on a set of ordinary Romanian sentences, transcribed back by the Surogate Romanian speech recognizer' },
    speed: 'About 2.7× faster than real time on 2 CPU threads, first audio after about 120 ms',
    repo: 'https://huggingface.co/surogate/amami-110m-ro',
    voices: [{ key: 'female', name: 'Female voice' }, { key: 'male', name: 'Male voice' }],
    // Recorded from the model on CPU, one take each, loudness levelled. Codes are read from certified clips.
    samples: [
      { slug: 'assistant-hello', category: 'Assistant', text: 'Bună ziua! Sunt asistentul virtual al băncii. Cu ce vă pot ajuta astăzi?' },
      { slug: 'assistant-parcel', category: 'Assistant', text: 'Am verificat comanda dumneavoastră: coletul a plecat din depozit și ajunge mâine între orele zece și douăsprezece.' },
      { slug: 'names-trip', category: 'Names and stress', text: 'Dragoș a ajuns la Brașov, iar Ioana îl așteaptă la Sibiu.' },
      { slug: 'stress-copii', category: 'Names and stress', text: 'Am doi copii și trei nepoți.' },
      { slug: 'stress-copii2', category: 'Names and stress', text: 'Faceți, vă rog, două copii după contract.' },
      { slug: 'code-verify', category: 'Codes', text: 'Codul de verificare este 7XK-492-QPA.', readAs: 'Șapte. Ics. Ca. Patru. Nouă. Doi. Chiu. Pe. A.' },
      { slug: 'code-iban', category: 'Codes', text: 'IBAN-ul dumneavoastră este RO49 AAAA 1B31 0075 9384 0000.', readAs: 'Er. O. Patru. Nouă. A. A. A. A. Unu. Be. Trei. Unu. Zero. Zero. Șapte. Cinci. Nouă. Trei. Opt. Patru. Zero. Zero. Zero. Zero.' },
      { slug: 'code-phone', category: 'Codes', text: 'Numărul de telefon este 0722 123 456.', readAs: 'Zero. Șapte. Doi. Doi. Unu. Doi. Trei. Patru. Cinci. Șase.' },
      { slug: 'foreign', category: 'Foreign names', text: 'Joaquín ne-a trimis contractul semnat.' },
      { slug: 'story', category: 'Longer passages', text: 'Era o dimineață liniștită de toamnă. Pe ulițele satului, oamenii se grăbeau spre târg, iar copiii alergau râzând după căruțe.' },
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
  tts: `hf download surogate/amami-110m-ro --local-dir amami-110m-ro
SUROGATE_TTS_PYTHON=/path/to/venv/bin/python surogate serve --tts amami-110m-ro --port 8080

curl localhost:8080/v1/audio/speech -H "Content-Type: application/json" \\
  -d '{"input": "Bună ziua! Codul de confirmare este 4B7X9.", "voice": "male"}' -o out.wav`,
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

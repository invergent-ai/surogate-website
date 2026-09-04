import type React from "react";
import type { CaptionPlacement } from "./components/Caption";
import { SceneCapabilities } from "./scenes/SceneCapabilities";
import { SceneChannels } from "./scenes/SceneChannels";
import { SceneCompute } from "./scenes/SceneCompute";
import { SceneCreate } from "./scenes/SceneCreate";
import { SceneDataset } from "./scenes/SceneDataset";
import { SceneEval } from "./scenes/SceneEval";
import { SceneGovern } from "./scenes/SceneGovern";
import { SceneHub } from "./scenes/SceneHub";
import { SceneKnowledge } from "./scenes/SceneKnowledge";
import { SceneModel } from "./scenes/SceneModel";
import { SceneTools } from "./scenes/SceneTools";
import { SceneSkills } from "./scenes/SceneSkills";
import { SceneTemplates } from "./scenes/SceneTemplates";
import { SceneTrace } from "./scenes/SceneTrace";
import { SceneTrainMethods } from "./scenes/SceneTrainMethods";

/**
 * The cut.
 *
 * This is a **feature showcase**, not a story. No problem is posed in the
 * opening and there is no thesis to resolve — each beat shows one capability at
 * its best and the caption names it. A viewer who looks away for five seconds
 * has missed one feature, not the plot.
 *
 * An earlier version opened on a problem ("agents go stale") the film then
 * didn't solve: stale *facts* are fixed by recompiling a knowledge base, while
 * the climax was fine-tuning, which fixes voice and behaviour. Setup and payoff
 * didn't match. Rather than patch the opening, the arc came out.
 *
 * The fiction stays light — an agent called Northwind Marketing and plausible
 * panel content, no plot for anyone to track.
 *
 * Every shot is a hand-built React scene; there are no screen recordings.
 * Timeline, captions, VO and the 30-second cut all derive from this array.
 */

export type Shot = {
  id: number;
  name: string;
  /** Seconds in the finished film. */
  duration: number;
  /** The built scene. Absent = placeholder. */
  scene?: React.FC;
  /** Names the capability. Carries the film when it autoplays muted. */
  caption?: string;
  captionSub?: string;
  /** Per shot — a fixed slot collides with whatever the scene puts there. */
  captionAt?: CaptionPlacement;
  /** Frames before the caption appears. */
  captionDelay?: number;
  /** Voiceover. Short: the caption is doing the work. */
  vo?: string;
  /** What the scene has to show — the brief for building it. */
  build: string;
  short?: boolean;
  shortDuration?: number;
  /**
   * Tutorial step chrome: "STEP 03 / 06" in the corner.
   *
   * Only the tutorials set these. A showcase beat is self-contained, but a
   * tutorial is a sequence and someone arriving mid-way has to be told so.
   */
  step?: number;
  steps?: number;
};

export const SHOTS: Shot[] = [
  {
    id: 1,
    name: "templates",
    duration: 3.5,
    scene: SceneTemplates,
    caption: "100+ agents, ready to run",
    captionSub: "Every role, already built",
    captionAt: "bottom-center",
    vo: "Start from a catalogue of ready-made agents.",
    build: "A wall of template cards with per-row parallax. Breadth is the message.",
    short: true,
    shortDuration: 3,
  },
  {
    id: 2,
    name: "create",
    duration: 7,
    scene: SceneCreate,
    caption: "Describe it in plain English",
    captionSub: "Name it, say who it is, and it's live",
    captionAt: "bottom-center",
    captionDelay: 70,
    vo: "Name it, say who it is, and it's live.",
    build:
      "Two screens in one beat: the create form (name types, slug derives itself), then a slide hand-off into the SOUL.md editor scrolling.",
    short: true,
    shortDuration: 4.5,
  },
  {
    id: 3,
    name: "model",
    duration: 7,
    scene: SceneModel,
    caption: "Deploy any model",
    captionSub: "Your hub, Hugging Face, OpenRouter or a URL",
    captionAt: "bottom-center",
    vo: "Point it at any model — public, private, or one of your own.",
    build:
      "The four deploy sources, Hugging Face chosen, then its form filling in and deploying to a serving endpoint.",
    short: true,
    shortDuration: 3.5,
  },
  {
    id: 4,
    name: "capabilities",
    duration: 6,
    scene: SceneCapabilities,
    caption: "Turn on what it can do",
    captionSub: "Browser, deep research, missions, loops",
    captionAt: "bottom-center",
    vo: "Give it a browser, deep research, missions, loops.",
    build:
      "The capabilities section scrolling — three capability toggles, then the built-in slash commands, each flipping on as it passes.",
    short: true,
    shortDuration: 3.5,
  },
  {
    id: 5,
    name: "skills",
    duration: 5,
    scene: SceneSkills,
    caption: "200+ reusable skills",
    captionSub: "Attach the ones this agent needs",
    captionAt: "bottom-center",
    vo: "Attach the skills it needs.",
    build:
      "Skill cards landing into an attached list, the template browser's category rail scrolling behind them.",
  },
  {
    id: 6,
    name: "tools",
    duration: 5,
    scene: SceneTools,
    caption: "1000+ tools, ready to connect",
    captionSub: "The systems your team already runs",
    captionAt: "bottom-center",
    vo: "Connect the tools your team already runs.",
    build:
      "The toolkit catalogue filtering to a search term as recognisable logos land, then one MCP server connecting.",
    short: true,
    shortDuration: 2.5,
  },
  {
    id: 7,
    name: "knowledge",
    duration: 5,
    scene: SceneKnowledge,
    caption: "Knowledge bases",
    captionSub: "Grounded answers from your own sources",
    captionAt: "bottom-center",
    vo: "Ground it in your own documents.",
    build:
      "Sources dropping into a knowledge base, compile progressing, status flipping to active, a wiki page appearing.",
  },
  {
    id: 8,
    name: "channels",
    duration: 5,
    scene: SceneChannels,
    caption: "Wherever your team works",
    captionSub: "One agent, every place people ask",
    captionAt: "bottom-center",
    vo: "Put it where your team already is.",
    build: "Five channel cards landing in sequence, two flipping to Active. The logos do the talking.",
    short: true,
    shortDuration: 2.5,
  },
  {
    id: 9,
    name: "trace",
    duration: 7,
    scene: SceneTrace,
    caption: "A chat with real capabilities",
    captionSub: "Knowledge, the web, a live browser, your tools",
    captionAt: "bottom-center",
    vo: "It reaches for your knowledge, the web, a real browser, your tools — and every step is on the record.",
    build:
      "The trace building live — knowledge base, web, a real browser pane sliding in beside it, then a Slack post. Dots turn green as each tool returns.",
    short: true,
    shortDuration: 3.5,
  },
  {
    id: 10,
    name: "govern",
    duration: 5,
    scene: SceneGovern,
    caption: "Govern what it may do",
    captionSub: "Allow, deny, and every call on the record",
    captionAt: "bottom-center",
    vo: "Review what it did. Allow what it may do.",
    build:
      "Sessions filtering by quality chip, then a governance card — allowed and denied tools, a blocked call.",
  },
  {
    id: 11,
    name: "dataset",
    duration: 5.5,
    scene: SceneDataset,
    caption: "Build it from existing chats",
    captionSub: "Filter the good ones into a dataset",
    captionAt: "bottom-center",
    vo: "Mark the good ones.",
    build:
      "The From your chats build form filling in, Build dataset firing, the dataset landing Ready with a row count.",
    short: true,
    shortDuration: 2.5,
  },
  {
    id: 12,
    name: "hub",
    duration: 6,
    scene: SceneHub,
    caption: "A private Hugging Face",
    captionSub: "Every model, dataset and skill, versioned",
    captionAt: "bottom-center",
    vo: "All of it lands in your own hub — versioned, private, yours.",
    build:
      "The Data Hub repo list with its type filters, one repo opening to show the sg:// path and files at that revision.",
    short: true,
    shortDuration: 3,
  },
  {
    id: 13,
    name: "train",
    duration: 5.5,
    scene: SceneTrainMethods,
    caption: "Train a model on your own work",
    captionSub: "Supervised, preference, reinforcement, distillation",
    captionAt: "bottom-center",
    vo: "Then train a model of your own on them.",
    build: "The real method picker, all four cards, SFT selected.",
    short: true,
    shortDuration: 3.5,
  },
  {
    id: 14,
    name: "compute",
    duration: 5,
    scene: SceneCompute,
    caption: "On any cloud you like",
    captionSub: "Nine providers, or your own machines",
    captionAt: "bottom-center",
    vo: "Pick where it runs — nine providers, or your own machines.",
    build:
      "The Connect a provider grid landing, one provider selected, and the instance it offers for the run.",
    short: true,
    shortDuration: 3,
  },
  {
    id: 15,
    name: "eval",
    duration: 6,
    scene: SceneEval,
    caption: "Prove it got better",
    captionSub: "Public benchmarks, scored against the base",
    captionAt: "bottom-center",
    vo: "Then measure it against the model you started from.",
    build:
      "The benchmark catalogue with two ticking, handing over to the report — headline scores over a ghost of the base, then the per-category breakdown drawing.",
    short: true,
    shortDuration: 4.5,
  },
];

export const totalSeconds = (shots: Shot[]) =>
  shots.reduce((n, s) => n + s.duration, 0);

export const SHORT_CUT: Shot[] = SHOTS.filter((s) => s.short).map((s) => ({
  ...s,
  duration: s.shortDuration ?? s.duration,
}));

/** How much of the film is actually built. */
export const builtCount = (shots: Shot[]) => shots.filter((s) => s.scene).length;

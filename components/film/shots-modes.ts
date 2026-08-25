import { SceneAgents } from "./scenes/SceneAgents";
import { SceneCapabilities } from "./scenes/SceneCapabilities";
import { SceneChannels } from "./scenes/SceneChannels";
import { SceneDataset } from "./scenes/SceneDataset";
import { SceneDatasetSources } from "./scenes/SceneDatasetSources";
import { SceneEval } from "./scenes/SceneEval";
import { SceneFeedback } from "./scenes/SceneFeedback";
import { SceneHub } from "./scenes/SceneHub";
import { SceneInbox } from "./scenes/SceneInbox";
import { SceneKnowledge } from "./scenes/SceneKnowledge";
import { SceneLoops } from "./scenes/SceneLoops";
import { SceneMissions } from "./scenes/SceneMissions";
import { SceneDistillConfig } from "./scenes/SceneDistillConfig";
import { SceneEnvironment } from "./scenes/SceneEnvironment";
import { SceneGrpoCharts } from "./scenes/SceneGrpoCharts";
import { SceneRlMode } from "./scenes/SceneRlMode";
import { SceneRollouts } from "./scenes/SceneRollouts";
import { SceneSecurity } from "./scenes/SceneSecurity";
import { SceneSession } from "./scenes/SceneSession";
import { SceneToolsConnect } from "./scenes/SceneToolsConnect";
import { SceneUsers } from "./scenes/SceneUsers";
import { SceneBuyLink } from "./scenes/SceneBuyLink";
import { SceneModel } from "./scenes/SceneModel";
import { ScenePricing, SceneStripe } from "./scenes/SceneMonetize";
import { SceneStorefront } from "./scenes/SceneStorefront";
import { SceneSynthetic } from "./scenes/SceneSynthetic";
import { SceneTrace } from "./scenes/SceneTrace";
import { SceneTrainMethods } from "./scenes/SceneTrainMethods";
import { SceneTrainSFT } from "./scenes/SceneTrainRun";
import type { Shot } from "./shots";

/**
 * The two mode films.
 *
 * Each is its own arc rather than a slice of the platform tour, because the
 * modes answer different questions. Work mode is a *day*: the agents you have,
 * asking one to do something, the long-running work, the thing that needs you,
 * the places people reach it, and the judgement that feeds tomorrow. Develop
 * mode is the model pipeline: deploy one, get data from wherever you have it,
 * version it, train, and prove the result moved. The agent-configuration
 * screens — persona, skills, tools, knowledge, guardrails — belong to the
 * platform tour; putting them here made this the same film twice.
 *
 * Scenes are shared with the platform tour where the screen genuinely is the
 * same screen — that is what the component library is for. The pacing, order,
 * captions and camera are not shared; those are the film.
 */

export const WORK_SHOTS: Shot[] = [
  {
    id: 1,
    name: "agents",
    duration: 3,
    scene: SceneAgents,
    caption: "The agents you already have",
    captionSub: "Running, reachable, and busy",
    captionAt: "bottom-center",
    build: "The agents grid: what is running, how many chats, which channels.",
  },
  {
    id: 2,
    name: "capabilities",
    duration: 6,
    scene: SceneCapabilities,
    caption: "Turn on what it can do",
    captionSub: "Browser, deep research, missions, loops",
    captionAt: "bottom-center",
    build:
      "The capabilities section scrolling — three capability toggles, then the built-in slash commands, each flipping on as it passes.",
  },
  {
    id: 3,
    name: "tools",
    duration: 7,
    scene: SceneToolsConnect,
    caption: "1000+ tools, ready to connect",
    captionSub: "Your library, a Composio toolkit, or any MCP server",
    captionAt: "bottom-center",
    build:
      "The three ways to connect a tool, then the Composio catalogue running the alphabet and stopping on one that attaches.",
  },
  {
    id: 4,
    name: "knowledge",
    duration: 6,
    scene: SceneKnowledge,
    caption: "Knowledge bases",
    captionSub: "Grounded answers from your own sources",
    captionAt: "bottom-center",
    build:
      "Sources landing in a knowledge base, the compile running through its phases, the base going live.",
  },
  {
    id: 5,
    name: "chat",
    duration: 7,
    scene: SceneTrace,
    caption: "Hand one a task",
    captionSub: "Knowledge, the web, a live browser, your tools",
    captionAt: "bottom-center",
    build: "The chat working a real request end to end, with the browser pane.",
  },
  {
    id: 6,
    name: "session",
    duration: 8,
    scene: SceneSession,
    caption: "Every run leaves a record",
    captionSub: "The thread, the tools, and what each one cost",
    captionAt: "bottom-center",
    build:
      "The session detail: header stats and tabs, the thread with a chip per tool call, then the Tools table with elapsed times.",
  },
  {
    id: 7,
    name: "missions",
    duration: 6,
    scene: SceneMissions,
    caption: "Long work, judged",
    captionSub: "A goal, a rubric, and iterations until it passes",
    captionAt: "bottom-center",
    build:
      "The mission dashboard, trimmed: status, iterations, last verdict, the goal, the rubric and the task groups — with an iteration completing on camera.",
  },
  {
    id: 8,
    name: "loops",
    duration: 6,
    scene: SceneLoops,
    caption: "Work that repeats itself",
    captionSub: "One command schedules it — every 5 minutes, or hourly",
    captionAt: "bottom-center",
    build:
      "The /loop palette opening over the composer, the selection walking the list, and one scheduled.",
  },
  {
    id: 9,
    name: "inbox",
    duration: 5,
    scene: SceneInbox,
    caption: "It stops and asks",
    captionSub: "Approvals and questions wait for a human",
    captionAt: "bottom-center",
    build: "Three inbox items, one approved on camera.",
  },
  {
    id: 10,
    name: "channels",
    duration: 5,
    scene: SceneChannels,
    caption: "Wherever your team works",
    captionSub: "One agent, every place people ask",
    captionAt: "bottom-center",
    build: "The channel cards landing, one flipping to Active.",
  },
  {
    id: 11,
    name: "users",
    duration: 5,
    scene: SceneUsers,
    caption: "Decide who gets in",
    captionSub: "The people who chat with it, separate from your team",
    captionAt: "bottom-center",
    build: "The Users screen: public signup, the list, and a user added on camera.",
  },
  {
    id: 12,
    name: "security",
    duration: 8,
    scene: SceneSecurity,
    caption: "Set the blast radius",
    captionSub: "Which tools, which URLs, which keys",
    captionAt: "bottom-center",
    build:
      "The governance page scrolling: policy enforcement, allowed and denied tools, egress defaulting to Deny with its allow-list, and the SSH keys.",
  },
  {
    id: 13,
    name: "feedback",
    duration: 5,
    scene: SceneFeedback,
    caption: "Flag the good ones",
    captionSub: "A thumbs-up is a row in the next dataset",
    captionAt: "bottom-center",
    build: "A turn is flagged and lands in a dataset.",
  },
];

export const DEVELOP_SHOTS: Shot[] = [
  {
    id: 1,
    name: "model",
    duration: 7,
    scene: SceneModel,
    caption: "Deploy any model",
    captionSub: "Your hub, Hugging Face, OpenRouter or a URL",
    captionAt: "bottom-center",
    build: "The four deploy sources, then the Hugging Face form deploying.",
  },
  {
    id: 2,
    name: "dataset-sources",
    duration: 4,
    scene: SceneDatasetSources,
    caption: "Data from wherever you have it",
    captionSub: "Real chats, your files, synthetic, or the Hub",
    captionAt: "bottom-center",
    build: "The four dataset sources, From chats chosen.",
  },
  {
    id: 3,
    name: "dataset",
    duration: 5.5,
    scene: SceneDataset,
    caption: "Build it from existing chats",
    captionSub: "Filter the good ones into a dataset",
    captionAt: "bottom-center",
    build: "The build form filled in, the dataset ready.",
  },
  {
    id: 4,
    name: "synthetic",
    duration: 6,
    scene: SceneSynthetic,
    caption: "Or design the data itself",
    captionSub: "A pipeline of generators, column by column, with a judge",
    captionAt: "bottom-center",
    build:
      "Data Designer: the pipeline strip filling in, then the New column menu opening on the generator types.",
  },
  {
    id: 5,
    name: "train-methods",
    duration: 5.5,
    scene: SceneTrainMethods,
    caption: "Four ways to train it",
    captionSub: "Supervised, preference, reinforcement, distillation",
    captionAt: "bottom-center",
    build: "The real method picker, all four cards, SFT selected.",
  },
  {
    id: 6,
    name: "train-sft",
    duration: 4,
    scene: SceneTrainSFT,
    caption: "Supervised fine-tune",
    captionSub: "Teach it format, tone and task from labelled examples",
    captionAt: "bottom-center",
    build: "The run detail: train loss, gradient norm, eval loss.",
  },
  {
    id: 7,
    name: "grpo-mode",
    duration: 4.5,
    scene: SceneRlMode,
    caption: "Reinforcement · GRPO",
    captionSub: "Three ways to score a rollout",
    captionAt: "bottom-center",
    build: "The RL mode control — Environment, Agent, RULER — with what each means.",
  },
  {
    id: 8,
    name: "grpo-env",
    duration: 7,
    scene: SceneEnvironment,
    caption: "The reward is code you own",
    captionSub: "A versioned environment, validated and published",
    captionAt: "bottom-center",
    build:
      "The environment editor: version bar, branch and tabs, and the verifiers module scrolling.",
  },
  {
    id: 9,
    name: "grpo-charts",
    duration: 5.5,
    scene: SceneGrpoCharts,
    caption: "Reward climbing",
    captionSub: "Mean reward, KL mismatch, reward std",
    captionAt: "bottom-center",
    build: "The RL metric set: six tiles and five charts, two up.",
  },
  {
    id: 10,
    name: "grpo-rollouts",
    duration: 6,
    scene: SceneRollouts,
    caption: "Read what it actually sampled",
    captionSub: "Every rollout, its reward and its advantage",
    captionAt: "bottom-center",
    build:
      "The rollouts tab: step picker, reward filters, cards with R and A, one opened on its prompt and completion.",
  },
  {
    id: 11,
    name: "train-distill",
    duration: 7,
    scene: SceneDistillConfig,
    caption: "Knowledge distillation",
    captionSub: "A teacher's whole distribution, not just its answer",
    captionAt: "bottom-center",
    build:
      "The distillation config: teacher capture, the top-K storage table, and the loss mixing hard labels with the teacher's soft ones.",
  },
  {
    id: 12,
    name: "eval",
    duration: 6,
    scene: SceneEval,
    caption: "Prove it got better",
    captionSub: "Public benchmarks, scored against the base",
    captionAt: "bottom-center",
    build: "Two benchmarks picked, then the report.",
  },
  {
    id: 13,
    name: "hub",
    duration: 6,
    scene: SceneHub,
    caption: "A private Hugging Face",
    captionSub: "Everything it made, versioned in one place",
    captionAt: "bottom-center",
    build:
      "The Data Hub index, then the repo browser page — branch, tabs, sg:// path and the tree of checkpoints at that revision.",
  },
];

/**
 * Monetization.
 *
 * Three screens and one idea: the agent you built is a product. Set it up,
 * copy the link, and the link opens a storefront that belongs to the seller —
 * their page, their theme, their Stripe account.
 */
export const MONETIZE_SHOTS: Shot[] = [
  {
    id: 1,
    name: "stripe",
    duration: 3,
    scene: SceneStripe,
    caption: "Charge for access",
    captionSub: "Buyers pay into your own Stripe account",
    captionAt: "bottom-center",
    build:
      "The five-step checklist and the Stripe connection — how the money reaches you.",
  },
  {
    id: 2,
    name: "pricing",
    duration: 4.5,
    scene: ScenePricing,
    caption: "Pick how they pay",
    captionSub: "Subscription, one-time packs, or both",
    captionAt: "bottom-center",
    build: "The four pricing models, with the selection moving off Free.",
  },
  {
    id: 3,
    name: "buy-link",
    duration: 4,
    scene: SceneBuyLink,
    caption: "One link to share",
    captionSub: "Styled the way you want buyers to see it",
    captionAt: "bottom-center",
    build: "The buy link copied, and the storefront themes beside it.",
  },
  {
    id: 4,
    name: "storefront",
    duration: 6.5,
    scene: SceneStorefront,
    caption: "A storefront of your own",
    captionSub: "Landing page, plans and checkout — hosted for you",
    captionAt: "bottom-center",
    build:
      "What the link opens: the agent's landing page in its theme — hero, features, and the plans a buyer picks from.",
  },
];

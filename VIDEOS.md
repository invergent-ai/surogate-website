# Videos

Every video on this list is built in **Remotion**, as React scenes in
[`components/film/`](components/film/) — the same components the website mounts
live through `@remotion/player`. There are no screen recordings anywhere in the
catalogue, and adding one would break the two properties that make this work:

- **The UI can't drift out of sync with a recording.** When a screen changes we
  edit a component and re-render; nobody re-shoots anything.
- **The same scenes serve the site and the file.** A scene runs in the page at
  `ground={false}` (drawn onto the section, captions in the page's ink) and
  renders to MP4 at `ground={true}` (the film's own dark ground, white captions).

## How to render

```bash
npm run film                        # Remotion Studio — preview and scrub
npm run film:render:all             # every composition → films/
npm run film:render <id> <out.mp4>  # one composition
bash scripts/render-films.sh t24-sft t29-hub   # a named few
```

The encode is YouTube-ready and set in [`remotion.config.mjs`](remotion.config.mjs):
H.264 in MP4, `yuv420p`, CRF 16, PNG frames. The compositions are already
1920×1080 at 30fps, so nothing is scaled or letterboxed on upload.

Two things in there are not obvious:

- **`yuv420p`, not Remotion's default.** The default `yuv444p` is higher
  fidelity and is either rejected or silently re-encoded by most players and by
  YouTube's ingest.
- **Rec. 709 is a command-line flag, not a config setting.**
  `Config.setColorSpace("bt709")` is ignored in Remotion 4.0.516 — a render made
  with it still comes out `yuvj420p` at full range, tagged `bt470bg`. Passing
  `--color-space=bt709` produces `yuv420p` / `tv` / `bt709` as intended, so
  `scripts/render-films.sh` passes the flag on every render. A one-off
  `npm run film:render` without it will be full-range.

Written as `.mjs` rather than `.ts`: a TypeScript Remotion config makes the CLI
demand a `tsconfig.json` in the project root, and this project deliberately has
only a `jsconfig.json`.

Compositions are registered in [`remotion/Root.tsx`](remotion/Root.tsx), which
maps over `CUTS` — add a cut and it appears in the studio and the CLI with no
other change. Output goes to `films/`, which is gitignored: these are large
binaries and they regenerate from source. Do **not** render into `out/` — that
is Next's static export directory and `npm run build` erases it.

## Conventions

**Five seconds a shot, three for the title** — unless a shot has a sequence to
show, in which case give it the time (the delegation thread in 10 runs 8s).
Every scene is authored *for* its length via `useTimeScale` — retiming a cut without respreading its beats
collapses the staggered entrances into the first second and leaves the rest of
the shot static.

**Every video ends with something working.** The title names a task the viewer
wants done ("Put your agent in Slack"), never a feature area ("Channels").

**Captions carry the video.** These autoplay muted on the site and in most
feeds. Anything essential that exists only in narration is lost.

**The staging is idealised; the UI inside a panel is the product verbatim.**
That line is what keeps these honest — invent the layout around a screen, never
the screen.

---

## Season 0 — Orientation · shipped

Already rendered from the existing cuts. These need narration and an end card,
not rebuilding.

| Composition | File | Length |
|---|---|---|
| `full` | `surogate-platform-tour.mp4` | 1:24 |
| `work` | `surogate-work-mode.mp4` | 1:17 |
| `develop` | `surogate-develop-mode.mp4` | 1:14 |
| `monetize` | `surogate-monetize.mp4` | 0:18 |

`short` (0:40) is also registered — a cut-down of the tour, currently unused on
the site.

## Shipped tutorials

**18 · Users and access** — composition `t18-users`, 0:39. Completes Season 2.

From `work/channels/users.md` and `work-publish-users.png`. Five steps — three on the seller's side, two on the buyer's: the four
access patterns, the Users tab (8s), channel identity linking (8s, both
sides — Slack issuing the code and the /link page consuming it), and the usage
limit.

Accounts are fictional (`@northwind.example`) — the docs screenshot for this
page has its one row redacted for the same reason. The doc's own lead is the
line the video repeats: these users are **separate from your operator account**.

**24 · Fine-tune with SFT** — composition `t24-sft`, 1:05.

From `dev-training-sft-source.png`, `dev-training-sft-hyperparams.png` and
`develop/features/training.md`. Eight steps: the source form (8s), hyperparameters
(8s), the **experiment compare surface** (8s), the run (8s), the Configuration
tab (8s), the Datasets tab, Checkpoints, and lineage.

Four of those shots came from reading the components rather than the docs, and
each corrected something the docs got wrong:

- The run detail tab list in `develop/features/training.md` is stale. `SFT_DETAIL_TABS` in `run-detail.tsx` is the real one: Overview, Configuration, Datasets, Checkpoints, Lineage, Repository — no Logs, Metrics, Rollouts or Output.
- **Overview carries three charts, not one** (`training-tab.tsx`): Training Loss, Gradient Norm, and Evaluation Loss — the last only when the run has an eval split — over four KPIs: Last Train Loss, Last Eval Loss, Step, TPS.
- **Configuration leads with Compute**, not with hyperparameters. The shot is one
  scrolling column in the page's own order: Compute (cloud backend select, a live
  GPU offer table — Instance · GPU · vCPUs · RAM · Region · $/hr — and a CUDA
  Version filtered by the backend), then General, LoRA, Optimization, Schedule and
  MoE. Every label and value is the real one; the values are `SFT_DEFAULTS`, so it
  is what a fresh run actually shows. Two details worth keeping: `SFT_CUDA_BY_CLOUD`
  gives Nebius `13.0+` only, so that select is settled and disabled, and Precision —
  BF16 / FP8 / NVFP4 — sits in General rather than beside the GPU, even though
  FP8 needs Hopper+ and NVFP4 Blackwell+.
- **Checkpoints** (`checkpoints-tab.tsx`) is undocumented altogether: STEP · TRAIN
  LOSS · EVAL LOSS · SIZE · SAVED, losses to two decimals, the step name linking
  into the run's Repository tab, and an `is_best` green **Best** pill on the
  lowest-loss checkpoint. The pill is the beat the shot holds on — the last
  checkpoint is not always the one to ship.

Built from `features/training/` rather than the docs: `experiment-detail.tsx`
("a two-column compare surface… the right Compare panel overlays the selected
runs' metrics"), `training-config-sections.tsx` (General / LoRA / Optimization
/ Schedule / MoE / Compute), `dataset-tab.tsx` (Training datasets, Validation
datasets, Dataloader), `SFT_DEFAULTS` for every value, and `training-tab.tsx`
for the Overview stat labels (Last Train Loss, Last Eval Loss, Step, TPS).

**Reading `features/training/` corrected three things the docs and screenshots
got wrong**: the run detail has six tabs (Overview, Configuration, Datasets,
Checkpoints, **Lineage**, Repository), not the doc's OVERVIEW/LOGS/METRICS/…;
`SFT_PRECISIONS` is BF16 / FP8 / **NVFP4**, not the screenshot's two-way
BF16 / FP8-hybrid; and Lineage is undocumented entirely.

Step 3 exists because **creating a run and launching it are two separate
steps** — NEW RUN records a queued run, START validates it and provisions GPUs.
A bad config returns 422 and the run stays queued rather than failing on a GPU
you are paying for.

**23 · Generate synthetic training data** — composition `t23-synthetic`, 0:39.

From `develop/features/datasets.md` §3. Five steps — three on the seller's side, two on the buyer's: the teacher → judge → keep
chips, the form (8s), the pipeline it composes running (8s), and what each of
the seven column types does (8s).

The sequel to 22: **Build composes a runnable starter pipeline and lands you on
the PIPELINE tab with the run already in flight**, so this reuses that video's
table and strip. The four composed columns are the doc's own — `topic`
(sampled, then *dropped from the output*), `instruction` (teacher at temp 1.0),
`response` (teacher at temp 0.7) and `quality` (judge, 1–10) — the shot shows the 0.8 threshold become a cutoff of
8 that rejects a row scoring 6, and then opens the same **add-column menu** over
the composed pipeline — because "everything is an ordinary pipeline afterwards".

That menu is a shared `AddColumnMenu` exported from `t21-build-a-dataset.tsx`,
so both pipeline videos show the same seven addable types. The Panel clips its
children, so any scene opening it needs bottom padding or the last items are
cut.

**21 · Build a dataset** — composition `t21-build-a-dataset`, 0:41.

From `dev-dataset-sources.png`, `dev-dataset-from-chats.png` and
`dev-dataset-detail.png`. Five steps — three on the seller's side, two on the buyer's: the four sources, the build form (8s),
and the finished dataset.

Two lines from the form the video keeps verbatim: the default filter is **"Only
good chats — no crashes, denials, overrides or thumbs-down"**, and scrubbing PII
**does not keep the original, so it cannot be undone**. The detail page's banner
offers both doors — "Train on this" and "Use as benchmark" — which is the link
into the fine-tuning and evaluation videos.

**20 · Deploy any model** — composition `t20-deploy-a-model`, 0:43. First of
Season 3, so its title card passes `SEASON.develop`.

From `dev-models-deploy-sources.png`, `dev-models-hf-form.png`,
`dev-models-detail.png`, `dev-models-config.png` and
`dev-playground-parameters.png`. Six steps: the four sources, the form (8s), the
serving screen, then the Performance, Config and Playground tabs.

The Config tab's `api_key` serving parameter is rendered **masked** — the docs
screenshot blurs it for the same reason. Performance has no screenshot; its five
KPIs and four sparklines come from the tab's description in
`develop/features/models.md`.

The form's **Deploy button is disabled until a repository is chosen**, and
Revision reads "Select a repository first" before that — the video animates
both, because a form that gates itself teaches the dependency better than a
caption would. The serving banner carries the caveat worth repeating: new chats
pick the model up, in-progress ones keep the old.

**18 · The agent's own web app** — composition `t18-web-app`, 0:28.

From `work/channels/web.md`. Five steps — three on the seller's side, two on the buyer's: the URL, the app itself (8s), and who
can sign in.

The Web channel is **always on** for every deployed agent — no hosting, no
switch. Two facts the video carries: the slug is fixed at deploy and only the
**Rename** button changes it, and on a monetized agent this is the one channel a
buyer's package can never exclude.

**17 · Governance** — composition `t17-governance`, 0:33. First of Season 2, so
its title card passes `SEASON.safe`.

From `work/workflow/governance.md`, `work-governance-tools.png` and
`work-governance-egress.png`. Five steps — three on the seller's side, two on the buyer's: the two layers, tool access (8s), web
egress, and the frozen gate.

Three claims the video has to state precisely, because each is testable:
composition only ever **narrows** (deny beats allow, and switching policy
enforcement off still leaves the floor); the gate is **frozen per wake**, so
nothing mid-turn — prompt injection included — can weaken it; and
"Default action: Deny" on the egress card governs only the URL arguments of
`web_extract` and `browser_navigate`, not web_search, the terminal or MCP.

**16 · Approvals and the inbox** — composition `t16-approvals`, 0:28.

From `work/tools/inbox.md`. Five steps — three on the seller's side, two on the buyer's: the inbox in triage order, answering a
question (8s), a governance gate, and which kinds actually block the agent.

The doc's triage order is the spine — `input_required` → `action_required` →
`governance_gate` → informational — and step 4 makes the consequence explicit:
two block outright, an unanswered gate leaves the agent without a tool it asked
for, the rest are news. Step 2 carries the two facts people get wrong: a
question can be answered by typing the choice in the chat, and after **30
minutes** the agent is told it was cancelled and decides without you.

**15 · Goals** — composition `t15-goals`, 0:33.

`/goal` from `work/tools/goals.md`. Five steps — three on the seller's side, two on the buyer's: the command and its rubric, the
evaluator loop (8s), the four verdicts, and when not to use it.

A separate evaluator LLM marks every final response and only `needs_revision`
keeps the agent going — its feedback becomes the next prompt. The evaluator is
required to see **concrete evidence**, so "all requirements met" is not a pass,
it is another turn. That is the thing worth teaching, and step 2 shows it
happening: two turns sent back for lack of evidence, the third satisfied by a
quoted test result.



**14 · The whiteboard** — composition `t14-whiteboard`, 0:31.

From `work/tools/whiteboard.md`. Five steps — three on the seller's side, two on the buyer's: writing on the board, the answer
box (8s), and carrying on from the answer (8s) — hand-drawn brackets and an
exponent added around what the agent wrote, then a second box.

Step 2 shows what the board is *for*: you place a box, the answer is fitted into
it, and **the box disappears** — a turn that would leave one empty is rejected
before it reaches your board. Step 3 then writes *around* that answer, which is
the real claim: one surface, your ink and its type in the same expression.

Ink is Caveat (`hand` in `font.ts`, whiteboard only). What the agent writes is
always typeset — the board'''s grammar is that your marks are `A1` and its marks
are `B1`, and handwriting its answer would erase that.

**13 · Loops** — composition `t13-loops`, 0:30.

`/loop`, from `work/tools/scheduled-work.md` and `work-scheduled-work.png`.
Five steps — three on the seller's side, two on the buyer's: the three ways to write one, the cadence snapping, the Scheduled
work page, and what a tick actually does.

Step 2 exists because the cadence you type is not always the cadence you get —
under an hour it snaps to one that divides evenly into an hour, so `7m` becomes
every 6 minutes and `50m` becomes hourly. The confirmation says so and the doc
tells you to read it.

**12 · Coding agents** — composition `t12-coding-agents`, 0:38.

`/code` runs the genuine Claude Code or Codex CLI in the session sandbox on
**your own** plan. Five steps: connecting a plan
(`work-settings-coding-agents.png`), the command and its flags, the run itself
(8s, from `code-run-tool.tsx` — "Running claude…" shimmering, then "Ran claude"
with token counts), a `--repo` run that opens a pull request, and where the
credential actually goes.

The security beat is the one to keep honest: the platform never runs an OAuth
flow and never calls the providers. The credential is injected only into the
spawned CLI's process environment, conflicting provider variables are scrubbed
first, and it is removed after the run.

**11 · Research missions** — composition `t11-research-missions`, 0:38.

`/auto-research`. Five steps: what a research run does, the command and what
it must carry, the idea tree growing (8s), dev versus held-out scores, and the
merge gate.

From `work/tools/commands.md` (`/auto-research` in detail) and
`missions/mission-research-tab.tsx` — dotted-decimal node keys, per-node status
pills (merged emerald, done sky, running amber, pruned struck through), and the
two score cards.

`repo=` is required and the `Rubric:` block is mandatory — a command without one
is rejected outright. There is an `arbor-research` intake skill that drafts the
whole command, but it is a skill invoked by name, not a built-in command, so it
only exists when attached; the video teaches the command instead.

**10 · Deep research** — composition `t10-deep-research`, 0:33.

Five steps — three on the seller's side, two on the buyer's: switching the capability on, the command, the delegation chain, and
the cited report. From `work/tools/deep-research.md` and
`research/research-sources-panel.tsx` — the sources strip is a collapsed
"SOURCES · N" bar above the composer whose `[S#]` chips deep-link into it.

Capability card titles, commands and descriptions are verbatim from the list in
`work-agent-settings-page.tsx` — the same list supplies videos 11, 12 and 13.

**09 · Correct it and redeploy** — composition `t09-correct-and-redeploy`, 0:35.

Picks up exactly where 08 stops. Five steps: the triage (wrong facts →
knowledge, wrong procedure → skill, no access → tool, wrong identity →
SOUL.md, **a habit that keeps coming back → train it**), the Identity tab
(`work-configure-identity.png`), the same question
answered right, the four training methods (`dev-training-methods.png`), and
scoring a benchmark before and after (`dev-eval-benchmarks.png`).

The last two matter: config fixes what the agent is *told*, training fixes what
it *is*, and an evaluation is the only thing that turns "it feels better" into a
number. This is the one Work-mode video that reaches into Develop mode, which is
also how a viewer discovers Season 3 exists.



**08 · Read a session** — composition `t08-read-a-session`, 0:30.

Five steps — three on the seller's side, two on the buyer's: filtering the list by quality flag (`work-sessions-list.png`,
`work-sessions-filters.png`), the review thread (`work-session-thread.png` —
not the live chat: the user's turn is a cream bubble, tool calls are amber chips
inside the agent's, and every turn carries its own 👍 👎), the tool table
(`work-session-tools.png`) where the cause actually shows, and what a
thumbs-down buys you.

Work mode has three tabs — THREAD / TOOLS / SKILLS. Develop mode's
`session-detail.tsx` has seven.

**07 · Let it use a browser** — composition `t07-use-a-browser`, 0:30.

Five steps: browser profiles (`work-settings-browser-profiles.png`), capturing
a login (`browser-profile-setup-dialog.tsx` — a full-screen dialog where you
sign in by hand; the component hard-codes `hasControl`, so the agent inherits
the session and never sees the password), the pane opening, and taking control. Built from
`surogates/sdk/agent-chat-react/src/components/browser/*` plus a current
screenshot — **both docs screenshots for the browser are stale**, showing a
TAKE CONTROL / CLOSE footer bar the product no longer has.

The two session shots are one session in two windows, each with its own
150-frame beat map rather than a slice of a longer timeline: a shot has to read
on its own if someone joins mid-video. They share a layout, so each carries its
own camera framing — wide as the pane comes alive, then tight on the toolbar
where the pointer changes colour. Without that they cut together as one static
two-column screen.

**06 · Hand it a mission** — composition `t06-hand-it-a-mission`, 0:35.

Five steps: starting one with `/mission` from a chat (the entry point named by
`work-missions.png`'s empty state), the dashboard, the workers tab, the inbox
question that pauses it, and completion — status `satisfied` with the verdict
against the rubric. Missions are rubric-judged, so they finish when a judge
agrees the objective is met, not when the task list empties. Dashboard structure — status pill, iteration
counter, tab bar with count badges, tasks rail grouped Running / Blocked /
Queued / Done — from
`surogates/sdk/agent-chat-react/src/components/missions/*`.

**05 · Put it in Slack** — composition `t05-put-it-in-slack`, 0:30.

Five steps — three on the seller's side, two on the buyer's: the Channels page (`work-publish-channels.png`), the connect wizard
(`work-agent-channels-tab.tsx`), the Slack options
(`work-channel-slack-options.png`), and **Slack itself** — the only scene in the
catalogue that is not our product, drawn to Slack's own chrome rather than our
tokens: aubergine rail, channel column, and the thread pane open on the right.

The agent replies **in the thread**, so the channel shows only the question
plus Slack's "2 replies" affordance. That is what the options screen's *Reply in
thread* buys, and the unticked "Also send to #support" box matches *Reply
broadcast* being off — the two screens have to agree or the video contradicts
itself.

**04 · Connect your tools** — composition `t04-connect-tools`, 0:35.

Deliberately *not* an MCP tutorial — MCP is one of three routes. Five steps: an
**editorial** board of the eight built-in capabilities (tool names from
`builtin-tools.ts`, but drawn on the ground, not as a panel — the built-ins have
no page in the app), the Tools tab and its three cards
(`work-configure-tools.png`), the 1000+ ready-made toolkits
(`work-toolkits-catalog.png` + `agent-toolkits.tsx`), the MCP server form
(`work-configure-add-mcp.png`), and the agent calling the tool for real.

**03 · Give it skills** — composition `t03-add-skills`, 0:40.

Six steps: the three-way picker (`work-configure-add-skill.png`), the 254
template library (`work-configure-skill-templates.png`), editing your own copy,
turning it into an **expert** — a skill backed by its own deployed model the
base LLM delegates to — the attached list
(`work-configure-skills-attached.png`), and the skill firing on its trigger.
Form fields, help text and `EXPERT_TOOL_GROUPS` are verbatim from
`skill-form.tsx`.

**02 · Give it your knowledge** — composition `t02-add-knowledge`, 0:40.

Six steps: create the KB (`work-kb-create.png`), add a source, compile, browse
the wiki, attach it, ask it. Everything after the create form comes from
`agent-knowledge-base-*.tsx`; the three attach modes come from
`AttachKBRequest` in `surogate_ops/server/models/knowledge.py`, the only place
they are explained.

**01 · Create your first agent** — composition `t01-create-agent`, 0:40.

Nine shots: a 3s title, six product screens at 5s each carrying step chrome,
the capability board, and the brand card. Sources, in order: the agents grid and
templates page from `work-agents-grid.png` / `work-templates-browse.png`; the
new-agent form from `work-create-agent-form.png`; the provisioning screen ported
from `create-progress.tsx`; the overview page mirrored from
`work-agent-overview-page.tsx` including its Recent chats empty state; and the
chat from `work-chat-thread.png` / `work-chat-composer.png`.

**25 · Train with reinforcement learning** — composition `t25-train-with-rl`, 1:36 — the longest in the catalogue.

Rebuilt from scratch after two failed cuts. The first explained what RL *is*;
the second enumerated Surogate's RL options. Both were feature tours — you
finished them knowing the vocabulary and still unable to start a run.

This one follows **one job from start to finish**: a support agent reaches for
`search_orders` when it should call `get_refund_policy`, and by the last shot it
doesn't. Every screen is a consequence of the one before it — the same
environment `tool-routing`, the same run `tool-use-grpo-001`, the same mean
reward climbing 0.31 → 0.79 — so it is something a viewer can repeat on their
own project.

Twelve numbered steps, bookended by the failing turn and the fixed one:

1. **Add the thing that will score it** — New environment → the catalogue →
   Tool Use → `tool-routing`. Adding it copies the module into your own Data Hub
   repo as an editable file, which is why the run can pin a version of it later.
2. **What a rubric actually is** — the forked module, in the shape every curated
   environment has: a scoring function returning a float, and a
   `load_environment` handing `verifiers` a dataset, the tools and a
   `vf.Rubric(funcs=[...])` wrapping the scorer. "Its rubric is your reward"
   means nothing until you have seen that it is a dozen lines of Python you can
   open and change — and the 0 / 0.5 / 1.0 it returns are the same numbers that
   land in the Rollouts tab five shots later.
3. **New training run → Reinforcement (GRPO).**
4. **Name it and point it at the environment** — run name, experiment, base
   model, then RL mode and the environment at version `v3`. RULER gets one
   sentence here, where the fork actually is, rather than a shot of its own.
5. **RULER** — taught where you actually meet it: the second position on the
   `RL mode` toggle step 4 just walked past. It isn't a rival philosophy, it's a
   different set of fields. The environment picker is replaced by three:
   **Dataset** (prompts, "must contain an `input` column"), **System prompt**
   ("Sent to the policy model for every rollout; the judge scores what comes
   back"), and **Judge** — the model that does the scoring, since `ruler_task`
   ships an intentionally empty rubric and there is nothing else to score with.
   Judge carries its own External / Colocated toggle with the form's blurbs:
   external is "any OpenAI-compatible endpoint … cheapest, no fleet GPU cost",
   colocated "spins up a vLLM judge on the same fleet. Eats one GPU block by
   default." The judge is shown the whole group and *ranks* it rather than
   scoring each attempt absolutely, which is why `RULER_MIN_GROUP_SIZE = 4`: a
   group of one is not a comparison, scores 0.0 on every metric, and reads as a
   broken run.
6. **Group size and the fleet split** — eight attempts per prompt, and the
   inference/trainer GPU split that pays for them. Both of the form's real
   warnings appear: the group-size floor, and "GRPO needs at least two GPUs".
7. **Watch it try and get scored** — the Rollouts tab at step 20. This is where
   the mechanism is taught: four attempts at one prompt, two right and two
   wrong, with `A` showing the gap from the group's average. No diagram
   explains that better than the numbers do, which is why the abstract "what is
   RL" slide came out.
8. **Open one and read it** — the same card the list just showed, expanded.
   `rollouts-tab.tsx` splits it into a cyan **PROMPT** box of chat turns and a
   blue **COMPLETION** box; here that completion is the tool call, the tool's
   result, and an answer grounded in it. Same step, same `#0`, same R and A as
   the row above it, so the two shots read as one gesture.
9. **0.31 to 0.79** — the Overview's KPIs and curves, with reward std called out
   as the number that says whether the run is still learning.
10. **Evaluate, then Merge** — score it against the model you started from, then
   write a servable one at `sg://models/tool-use-grpo-001`.
11. **Serve it** — `deploy-model-page.tsx`'s four sources, and Local Hub is the
    one this run needs: "A model already in your hub — trained runs land here."
    Then its form — model, revision, file, display name — and Deploy.
12. **Point the agent at it** — the agent's Configure → **Model** section.
    Serving Model swaps to the new one, the "Currently using …" line still shows
    what it is replacing, and the caveat that matters on save: new chats pick the
    model up, conversations already running keep the old one.

The closing beat replays the opening turn on the deployed model. A tutorial that
doesn't end where it started never proved anything.


**26 · Distill a smaller, cheaper model** — composition `t26-distill`, 0:52.

The same shape as 25: one job, followed end to end, rather than a tour of the
distillation options. The agent runs on an 8B that answers well and costs what
an 8B costs; by the last shot it runs a 1.7B that answers the same way. The
numbers carry through every screen — 12,000 rows, 24.6M tokens, top-K 64, 9.4 GB
of sidecars.

It opens and closes on the same screen: the served model's **Performance** tab
(`performance-tab.tsx` — Tokens/sec, Avg Latency, Requests, Success Rate). The
opening states the problem as numbers rather than a claim; the close puts the
student's beside the teacher's, because a smaller model is only good news if it
still answers.

Five steps:

1. **New training run → Knowledge Distillation** — the method card's own bullets
   are the outline of the rest: teacher → student (same tokenizer), offline
   top-K logit capture, combined CE + KL loss.
2. **The base model is the student.** That is the thing people get backwards, so
   the shot labels it. The teacher is its own field, and its hint carries both
   the constraint — "Must share the student's tokenizer (same model family, e.g.
   Qwen3-1.7B → Qwen3-0.6B)" — and the fact the next step depends on: it is
   "captured once over the dataset before training".
3. **TOP-K & STORAGE** (`distillation-controls.tsx`, shared verbatim between the
   create form and the run's Config tab). The table *is* the argument: a sidecar
   stores K uint32 ids + K fp16 logprobs = 6·K bytes per token, so the choice is
   a disk bill. 64 carries the RECOMMENDED tag, and the THIS DATASET column only
   exists once the form knows how many tokens it is about to capture — here
   9.4 GB against 24.6M tokens.
4. **DISTILLATION LOSS** — the card states the objective outright, `L =
   ce_weight·CE + kd_weight·τ²·KL(teacher ‖ student)`, per valid token. The
   weight-mix bar and the resolved objective are the same two numbers twice on
   purpose: one to feel, one to read. τ gets its own note — 1.0 matches the
   teacher as-is, 1.5–2.0 softens for more "dark knowledge".
5. **The Overview** — distillation trains through the SFT trainer, so this is
   `training-tab.tsx`: four KPIs over Training Loss, Gradient Norm and
   Evaluation Loss, with eval tracking train as the sign the student learned the
   teacher rather than memorising the rows.


**27 · Evaluate against benchmarks** — composition `t27-evaluate`, 0:50.

A standalone video about one feature. It assumes nothing — no earlier video, no
training run, no fine-tune. The only premise is the smallest situation in which
a benchmark is worth running at all: you have two models and have to choose
between them.

It opens on the **catalogue** rather than a definition, because "what is a
benchmark" is answered better by the real list — nine categories from
`CATEGORY_META`, each with the one line it carries about what it measures.

Five steps, following the wizard's own **Select → Configure → Run** stepper:

1. **Pick the benchmarks.** They land as chips and the picker groups them by
   category. The three chosen each have a reason `benchmark-info.ts` states
   outright: MMLU is the catastrophic-forgetting check, GSM8K the "quick
   regression check after fine-tuning", IFEval the test of whether a model
   "preserved instruction-following ability".
2. **Choose the model to score.** The Configure step in the app's own field
   order: Target (a Model / Agent / Adapter toggle), Run Name, **Compare model
   (optional)** and Subset (optional). The compare is what makes it a
   comparison — "Runs a second eval and reports the delta" — but the label says
   optional and so does the video.

   The shot also says what is *not* there. `LLM Judge` renders only when a
   selected benchmark carries `needsJudge` (MT-Bench, TruthfulQA, ToxiGen, Red
   Team, Guardrails, TAU-Bench…), and `Pass threshold` only when one is graded
   out of ten. GSM8K, MMLU and IFEval are scored programmatically, so neither
   field appears — which is why the review card two shots later reads "Not
   needed".
3. **Check the estimate.** The Review card lists every benchmark as
   `name · subset · N samples`, then Target, Compare and Judge; the Estimated
   card below it gives samples, time and cost.
4. **The verdict.** `eval-detail.tsx`'s comparison view: the Pass-rate drift and
   Categories improved tiles, the banner that says it in a sentence, and the
   Comparison / Result cards.
5. **Where it moved.** The per-category table with Δ coloured by sign. One
   category goes backwards by 0.7 points, and the video says so — that is the
   number worth arguing about, and the reason to run a compare rather than
   trust a headline.

The three wizard shots are drawn narrow because the page is narrow — the whole
flow lives in one `max-w-[600px]` column, one field at a time, and widening it
into a dashboard would have been a different product.

Two deliberate divergences, both because the app's copy assumes a fine-tune and
this video does not:

- The Pass-rate drift tile's sub-label is hardcoded to "fine-tune wins" /
  "base wins". With two ordinary deployed models that would misdescribe the
  screen, so the shot says "candidate wins".
- The result banner's subtitle is keyed only on the overall delta, so it reads
  "no regressions vs base" whenever the total is positive — even when a category
  regressed. Reproducing that would put a claim on screen that the next shot's
  table contradicts, so the shot says "1 category to review" instead.


**28 · Bring your own compute** — composition `t28-compute`, 0:47.

Standalone, and the premise is not that you have nowhere to run. Surogate
provides compute by default: `modal-platform` is "infrastructure, not something
the user connected" per `cloud-tab.tsx`, and `provider-label.ts` maps it to
**Default** in every picker. The opening shot names the eleven GPU types that
come with it — B300 down to T4 — rather than the vendor behind it, since the
vendor is an implementation detail and the GPU list is what a viewer is actually
weighing their own account against. It closes on the same picker with RunPod
in it.

The provider marks are the product's own SVGs, copied from the ops frontend's
`public/` into `public/providers/`. SSH has no logo in the catalogue, so it
falls back to the server glyph the connect page uses.

RunPod is the worked example because its connect flow is a single API key, so
the video spends its time on the shape of the thing rather than a provider's
paperwork. Five steps — three on the seller's side, two on the buyer's:

1. **Pick a provider.** All nine from `SUPPORTED_PROVIDERS`, with the taglines
   that file gives them — AWS "Broadest GPU instance selection", Modal
   "Serverless GPUs, scale to zero", Vast.ai "Cheapest GPU marketplace", and
   SSH / On-prem, which is not a cloud at all.
2. **Paste the key and click Connect.** The connect page is another 600px
   column: the provider's header, its own instructions from
   `connect-instructions.ts` (RunPod's five, with "it is only shown once"), then
   the masked API key field and the Include Community Cloud switch with its
   warning that it "is cheaper but less reliable".
3. **Open the backend to see its instances.** The Available Instances table, in
   the same shape every GPU picker in the product uses: Instance, GPU, vCPUs,
   RAM, Region, $/hr, with spot rows marked.
4. **Or your own hardware.** `connect-ssh.tsx` — a user, a port, a private key
   and a host. No account, no hourly rate.

The close shows both places the connection turns up, because the video would be
half-told with only one: a training run's Compute field, and a served model's
**Deployment configuration** card, which uses the same `ComputePicker` beside
the vLLM / llama.cpp Engine toggle. It carries that card's own caveat too —
serving settings are locked while the model is serving, so stop it before you
switch.


**29 · Version everything in the Hub** — composition `t29-hub`, 0:39.

Standalone, and the last of Season 3. The Hub is where everything you make
already lands, so the video is about finding it, reading its history, pinning a
version, and what that pin buys you.

Five steps — three on the seller's side, two on the buyer's:

1. **Open the Data Hub.** `hub-page.tsx` — the repository count as the subtitle,
   and a rail of type filters built from `TYPE_META` with per-type counts and
   its colours: Models blue, Datasets green, Skills violet, Experiments pink,
   Environments teal. The shot's point is that nothing was uploaded; training
   runs, datasets, skills and environments write here as they go.
2. **Open a repo.** `repo-explorer.tsx` — tabs that carry their counts in the
   label, Files (6) · Commits (12) · Branches (2) · Tags (3) · Info, and
   `file-browser.tsx`'s bold `sg://` at the head of the path.
3. **Check Commits.** `commits-tab.tsx` — the dotted timeline, short SHA in
   green, message, then committer and relative time. Every checkpoint the
   trainer wrote is its own commit.
4. **Tag one.** `tags-tab.tsx` gives the tag name and the commit it points at;
   the shot then shows the reference that produces, `sg://support-sft-001@v3`,
   and the rule that matters: a tag gets the same bytes every time, a branch
   gets whatever landed last.

The close is two runs of the same job — one pinned to `@v3`, one on the branch —
scoring 0.79 and 0.61. The pinned one is the one that can tell you the
environment didn't move.


**30 · Connect Stripe and set your pricing** — composition `t30-stripe`, 0:55.
First of Season 4, so its title card passes `SEASON.monetize`.

The Monetize tab already ships a checklist — `SETUP_STEPS` in
`agent-commerce-panel.tsx` — so the video walks it rather than inventing an
order. The opening shot is that checklist, quoted whole, and the close is the
same list with four items ticked. The video gives its own shot to three of them
— the third, "Enable buyer sign-in", is a one-off Firebase Auth setup in
Settings that has nothing to do with Stripe, so the checklist names it and the
video moves on. Its fifth item, sharing the buy link, is
video 31; this one stops where money can reach you.

Five steps — three on the seller's side, two on the buyer's:

1. **Connect Stripe.** The Stripe Connect card, whose subtitle swaps with its
   status: "Connect a Stripe account to start charging for this agent." becomes
   "Payments and payouts run through your Stripe account." The pill comes from
   `STATUS_LABEL` — Not connected → Active — and the shot flips it mid-way,
   which is what the step's own detail describes: do Stripe's identity and
   bank-account form in the tab it opens, then come back and the status updates
   on its own.
2. **Pick a pricing model.** All four `MODE_OPTIONS` with their own details:
   Free, Subscription, One-time packs ("bought once. They never expire"), Both.
3. **Add an offer.** Name, Price, Currency, Billing interval, Usage included —
   and `USAGE_EXPLAINER` quoted, because it is written for builders with no AI
   background and it is the difference between pricing an agent and guessing:
   one message is a question plus the agent's answer, ~100 suits a trial,
   ~1,000 suits daily use, ~5,000 and up suits a team.
4. **The buy page.** `buy-page.tsx` with `public-agent-paywall.tsx` inside it —
   the other side of everything just configured. The offer card is generated
   from the offer written one shot earlier: the name, the price with
   `/ {billing_interval}`, and a usage line the paywall composes itself
   ("~1,000 messages every period" for a subscription, "of extra usage ·
   one-time" for a pack), plus `Includes:` for anything packaged with it. The
   button reads Subscribe or Buy for the same reason. Above it sits the
   platform's own free-trial note, not the seller's.
5. **After they pay.** The activation banner — "Payment received — your access
   is being activated…" — while `buy-page.tsx` polls the entitlement, then the
   chat opens and the paywall collapses to a **Manage subscription** button
   that drops the buyer into Stripe's own billing portal.

Steps 4 and 5 exist because the video would otherwise stop at a config form:
you would have priced an agent without ever seeing what a customer meets.
Video 32 goes further into the buyer's side; this is the part that closes the
loop on the offer you just wrote.


**31 · Your agent's landing page and buy link** — composition `t31-buy-link`, 1:06.

Standalone. Video 30 priced the agent; this one builds the page that sells it,
and it starts on the **Identity tab** because that is where the words a customer
reads actually come from — `buy-page.tsx` renders `commerce.agent_name` as its
title and `commerce.agent_description` under it. Six steps:

1. **The Identity tab.** `work-agent-settings-page.tsx`'s Basic info card: Name,
   Slug and Description. The slug sits behind an explicit Rename toggle, and the
   shot says why — renaming an existing agent can break channel routing,
   integrations and links already sent.
2. **Start from a layout.** `landing-editor.tsx`'s Layouts section, with its own
   warning ("Preview one first — applying replaces what is there") over the five
   in `landing-layouts.ts`: The practitioner, One screen, The product, The long
   read, The profile. Each row shows the block stack it would apply.
3. **Or add blocks yourself.** All eight kinds from `BLOCK_META`, labels and
   blurbs quoted — Hero "Headline, a sentence, a photo", Portrait "A person:
   round photo, name, bio", Section, Steps, Features, Quote, Socials, Call to
   action. Up to `MAX_BLOCKS` of them.
4. **Pick how it looks.** All six themes in `buy-page-themes.ts` with their real
   blurbs ("Plum night, gold star dust", "Pure black, drenched in gold") and
   swatches built from each spec's own `preview` colours. The theme is shared:
   `buy-page.tsx`'s comment says the themed root "is shared with the landing
   page so a look chosen once renders identically on both".
5. **Switch it Live.** The landing link card and its Live / Off switch, carrying
   the subtitle that matters: unpublished, the link "returns 'not found' until
   you publish", and publishing "also saves what you have written".
6. **Copy the buy link.** The share card, whose own comment says why Copy is the
   primary action: "this link IS how builders" get paid. It uses the agent's
   slug when it has one and falls back to `/buy/<project>/<agent>`.

Publishing is followed straight away by **the page it put up** — the landing
page as `landing-render.tsx` actually draws it, with **The product**'s blocks in
the Midnight theme — hero, a three-up features row, and a section band. That is
the layout the shot two steps earlier highlights, so the two agree; a draft that
rendered a portrait while the picker had selected a portrait-less layout would
have been showing a page the video never built.

The worked example is an **Interview Coach** sold by a hiring manager. Season 4
is about selling an agent, and a support desk answering your own customers is
not a thing anyone buys — the practitioner layout exists for someone packaging
their own expertise, so the example is one. It is deliberately a job anybody
recognises without being told: an earlier draft used an IELTS coach, which is
only obvious if you already know the acronym.

Two more beats close: the buy page in the same theme, so the picker's effect is
visible on both surfaces; and the embed panel, whose origin allowlist is the
point — "Only these sites may load your widget."


**32 · What a buyer sees** — composition `t32-buyer`, 0:46. Last of the catalogue.

Every shot is a buyer's screen, so every shot is drawn in the agent's own theme
rather than the studio's white panels — Midnight, the theme picked in video 31.
The worked example carries over too: the Interview Coach at €19 a month.

Six steps, in the order a buyer meets them:

1. **They open the buy link.** `buy-page.tsx` signed out: the name and
   description from the Identity tab, a Sign in button, the platform's
   free-trial note, and the offer.
2. **They sign in.** `buyer-sign-in.tsx` — "Sign in to continue", email,
   password, and "New here? Create an account". This runs against the seller's
   own Firebase project.
3. **Subscribe sends them to Stripe.** The button reads "Redirecting…" while
   `createPublicAgentCheckout` runs, then Stripe Checkout takes the card. No
   payment form is ever on the seller's page.
4. **They come back.** The activation banner — "Payment received — your access
   is being activated…" — while the page polls the entitlement, then the
   subscription and its Manage subscription button.
5. **They chat.** `buyer-chat.tsx`: the header reads "Chat with {agentName}"
   with the balance beside it, and the balance drops as they send.
6. **They run low.** The return visit: balance down to ~12 messages, a one-time
   top-up pack, and the note that packs never expire — plus the error the API
   returns if they try to subscribe twice, "You already have an active
   subscription. Use Manage subscription to change plans."


## Season 1 — Get an agent doing real work

Follows [`work/quickstart.md`](https://docs.surogate.ai/work/quickstart/) in the
docs. This is where new users drop off, so it is where the videos earn the most.

| # | Video | Length | Ends with | Scenes |
|---|---|---|---|---|
| 1 | ✅ **Create your first agent from a template** | 0:40 | A running agent you can talk to | `t01-create-agent.tsx`, `work-screens.tsx` |
| 2 | ✅ **Give it your knowledge** | 0:40 | It answers from your documents, with citations | `t02-add-knowledge.tsx` |
| 3 | ✅ **Give it skills** | 0:40 | It follows your procedure, not a generic one | `t03-add-skills.tsx` |
| 4 | ✅ **Connect your tools** | 0:35 | It acts in a real system | `t04-connect-tools.tsx` |
| 5 | ✅ **Put it in Slack** | 0:30 | Your team is using it | `t05-put-it-in-slack.tsx` |
| 6 | ✅ **Hand it a mission** | 0:35 | Multi-step work finished while you were away | `t06-hand-it-a-mission.tsx` |
| 7 | ✅ **Let it use a browser** | 0:30 | It drove a real page, and you took over | `t07-use-a-browser` |
| 8 | ✅ **Read a session** | 0:30 | You found the cause, and kept it as a signal | `t08-read-a-session.tsx` |
| 9 | ✅ **Correct it and redeploy** | 0:35 | The loop closed once | `t09-correct-and-redeploy.tsx` |
| 10 | ✅ **Deep research** | 0:33 | A sourced answer to a question worth an afternoon | `t10-deep-research.tsx` |
| 11 | ✅ **Research missions** | 0:38 | A verified improvement, merged by the machine | `t11-research-missions.tsx` |
| 12 | ✅ **Coding agents** | 0:38 | It changed the code and opened a PR | `t12-coding-agents.tsx` |
| 13 | ✅ **Loops** | 0:30 | Work that runs without being asked | `t13-loops.tsx` |
| 14 | ✅ **The whiteboard** | 0:31 | You and the agent thinking on one surface | `t14-whiteboard.tsx` |
| 15 | ✅ **Goals** | 0:33 | An outcome it keeps working toward | `t15-goals.tsx` |
| 16 | ✅ **Approvals and the inbox** | 0:28 | Nothing consequential happens unwatched | `t16-approvals.tsx` |

№ 8 is the highest-leverage video in the catalogue. Reading a session — the
thread, the tool calls, the quality flags — is the core operating skill for
anyone running an agent, and it is the one thing no competitor's docs teach.

## Season 2 — Run it safely

The governance story. Also what an enterprise buyer needs before they will adopt.

| # | Video | Length | Ends with | Scenes |
|---|---|---|---|---|
| 17 | ✅ **Governance** | 0:33 | An agent that cannot reach what you did not permit | `t17-governance.tsx` |
| 18 | ✅ **The agent's own web app** | 0:28 | A URL you can send someone | `t18-web-app.tsx` |
| 19 | ✅ **Users and access** | 0:36 | Your team in, everyone else out | `t18-users.tsx` (composition `t19-users`) |

№ 9 is one video, not two. Deny-by-default only makes sense taught together with
the allow-list that opens it back up.

## Season 3 — Develop mode

The deepest content and the smallest audience. Build it last: it is also the
part most likely to move as the training UI evolves.

| # | Video | Length | Ends with | Scenes |
|---|---|---|---|---|
| 21 | ✅ **Deploy any model** | 0:43 | A model serving, from any of four sources | `t20-deploy-a-model.tsx` (composition `t20-…`) |
| 22 | ✅ **Build a dataset** | 0:41 | A dataset ready to train on | `t21-build-a-dataset.tsx` (composition `t21-…`) |
| 23 | ✅ **Generate synthetic training data** | 0:39 | Rows you did not have to write | `t23-synthetic.tsx` |
| 24 | ✅ **Fine-tune with SFT** | 1:05 | A model trained on your own work | `t24-sft.tsx` |
| 25 | ✅ **Train with reinforcement learning** | 1:36 | One GRPO run, start to finish | `t25-rl-run.tsx` |
| 26 | ✅ **Distill a smaller, cheaper model** | 0:52 | The same behaviour, less money | `t26-distill.tsx` |
| 27 | ✅ **Evaluate against benchmarks** | 0:50 | Proof it got better | `t27-evaluate.tsx` |
| 28 | ✅ **Bring your own compute** | 0:47 | Training on your cloud | `t28-compute.tsx` |
| 29 | ✅ **Version everything in the Hub** | 0:39 | A change you can bisect | `t29-hub.tsx` |

There is no separate "why RL" video. An earlier plan split the decision from the
run; both cuts of the decision film turned out to be feature tours, and the
mechanism teaches itself far better inside a real run — you watch eight attempts
get scored — so 25 carries the whole story: the environment, the rollouts, the
reward, and the model at the end of it.

## Season 4 — Monetize

| # | Video | Length | Ends with | Scenes |
|---|---|---|---|---|
| 30 | ✅ **Connect Stripe and set your pricing** | 0:55 | Money reaching your own account | `t30-stripe.tsx` |
| 31 | ✅ **Your agent's landing page and buy link** | 1:06 | A page you can send someone | `t31-buy-link.tsx` |
| 32 | ✅ **What a buyer sees** | 0:46 | The purchase, from the other side | `t32-buyer.tsx` |

**Catalogue total: 31 videos, 21:23 — all built**, plus Season 0's 4:13.

---

## Production order

1. **1, 2, 3, 5** — signup to an agent the viewer's team uses in Slack. The
   conversion that matters most.
2. **8** — reduces support load more than any other single video.
3. **17** — removes the objection that blocks enterprise adoption.
4. **10–16** — the rest of Season 1: research, code, loops, whiteboard, goals, approvals.
5. **18, 19** — the rest of Run it safely.
6. **30, 31, 32** — Monetize. Short, and the scenes are all built.
7. **21–29** — Develop mode.

## The tutorial grammar — built

Living in [`components/film/tutorials/`](components/film/tutorials/):

- **`ui/StepBadge.tsx`** — "03 / 06" chrome, driven by optional `step`/`steps`
  fields on `Shot`. Only tutorials set them, so no marketing shot renders it.
- **`cards.tsx`** — `titleCard`, `endCard`, `brandCard` and `nextStepsCard`
  factories. Each takes its text at authoring time; safe because scene lists
  live in code and never cross Remotion's `defaultProps` JSON boundary.
- **`work-screens.tsx`** — Work-mode product screens rebuilt for tutorials.

`CUTS` derives the variant union with `satisfies`, so adding a tutorial is one
entry and it appears in the studio and render CLI automatically.

### Accuracy is the hard constraint

**HARD RULE: check the real product screens whenever you draw a scene — both
the screenshots and the actual React components.** Never build from prose in
the docs, from memory, or from a marketing scene. Screenshots give layout and
copy; components give exact metrics, state variants and the zero-state a
tutorial usually needs. A screenshot shows one populated state and hides the
rest, so check both:
`/work/surogate-docs/src/assets/screenshots/` (96 of them) and
`/work/surogate-ops/frontend/src/`. Where a tutorial
needs a screen a marketing scene already covers, **duplicate it** rather than
change the shared one — the marketing films are published and correcting them
changes what ships.

Two consequences worth knowing: the product's literal colours sometimes differ
from the film's tokens (`create-progress.tsx` uses `#f5a624` and `#30d158`, not
`c.amber` / `c.success`), and screens designed for a white page need a `Panel`
wrapper or their dark text vanishes on the film's ground.

### New scenes still needed


## Deliberate divergences from the product

- **The research engine's internal name is never said on screen.** It appears in
  the product's own capability copy and in the docs; the videos say
  "`/auto-research`" or "a research run" instead.
- **The toolkit provider is never named.** The product says "Ready-made
  Composio toolkits" and "Attach a ready-made Composio toolkit"; the videos say
  "ready-made toolkits". Do not correct this back to the product string.

## Docs divergences found while building

Building against the code surfaces places the docs have drifted. Worth fixing
in surogate-docs:

- `develop/features/training.md`'s run-detail tab table is stale. The app's
  `SFT_DETAIL_TABS` are Overview, Configuration, Datasets, Checkpoints, Lineage
  and Repository — no Logs, Metrics, Rollouts or Output tabs, and **Lineage is
  not documented anywhere**.
- `work/library/knowledge-bases.md` says the source picker offers **five**
  types. `agent-knowledge-base-add-source.tsx` defines **three** — File upload,
  S3 / Object storage, URL list, the last two marked "Coming soon".
- The three KB attach modes (**Grounding**, **Grounding, no quotes**,
  **Reference**) are documented nowhere. The UI is a bare select and the only
  explanation lives in a comment in `surogate_ops/server/models/knowledge.py`.

## Open decisions

- **Narration.** `FilmProps` has a `voiceover` slot wired to `public/audio/`,
  and nothing to put in it. Recorded VO, synthesised, or captions only — this
  needs deciding before video 1, because it changes the pacing of every shot.
- **Where they are published.** The site, the docs, YouTube, or in-product. In-
  product placement argues for shorter cuts than the lengths above.
- **End card.** There is none. Every video wants a consistent last beat with a
  next step.

## Adding a video

Cuts live in `CUTS` in [`components/film/Film.tsx`](components/film/Film.tsx),
and `remotion/Root.tsx` registers everything in it automatically. Derive the
variant union from `CUTS` rather than hand-maintaining a list of 30 string
literals:

```ts
export const CUTS = { full, short, work, develop, monetize, ...TUTORIALS };
export type FilmProps = { variant: keyof typeof CUTS; /* … */ };
```

Two Remotion traps this codebase has already hit, both worth re-reading before
authoring a cut:

- `defaultProps` are JSON-serialised, which **silently strips a React
  component**. That is why a film takes a `variant` string and resolves its own
  scenes instead of being handed a shot array.
- `<TransitionSeries>` mis-assigned offsets when handed a mapped array of
  sequences. Sequences are placed explicitly by `layout()` instead.

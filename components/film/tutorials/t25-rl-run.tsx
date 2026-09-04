import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 25 — Train with reinforcement learning.
 *
 * One job, followed end to end: a support agent reaches for the wrong tool, and
 * by the last shot it doesn't. Every screen is a consequence of the one before
 * it — the same environment, the same run name, the same mean reward climbing
 * from 0.31 to 0.79 — so a viewer can do this on their own project afterwards.
 *
 * Earlier cuts of this video explained what reinforcement learning *is* and
 * enumerated the options Surogate offers. Both are feature tours: they leave
 * you knowing the vocabulary and unable to start a run. The mechanism is
 * taught here where it is visible instead — the group of scored attempts in
 * step 6 is the loop, and needs no diagram.
 *
 * Screens come from `new-environment-page.tsx`, `browse-environments.tsx`,
 * `new-run-page.tsx`, `rl-run-detail.tsx`, `rollouts-tab.tsx` and
 * `rl-training-tab.tsx`.
 */

const GREEN = "#22C55E";

/** The worked example, in one place so every shot stays consistent. */
const RUN = "tool-use-grpo-001";
const ENV = "tool-routing";
const BASE = "Qwen/Qwen3-8B-Instruct";

/* ── the job ────────────────────────────────────────────────────── */

/**
 * The problem, stated as one failing turn rather than as a claim.
 *
 * A tutorial needs a reason to exist in its first five seconds, and "the agent
 * calls the wrong tool" is one you can watch happen.
 */
export const SceneRlProblem: React.FC = () => {
  const t = useTimeScale(5);
  const ask = useEnterAt(t(3), 12);
  const call = useEnterAt(t(24), 12);
  const wrong = useEnterAt(t(48), 12);
  const goal = useEnterAt(t(76), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "28px 34px 30px" }}>
          <Turn role="user" text="Can I still return the jacket I got on the 3rd?" enter={ask} />

          <div style={{ opacity: call, marginTop: 16 }}>
            <ToolCall
              name="search_orders"
              args='{"q": "jacket"}'
              bad
              note="wrong tool — this never sees the policy"
              show={wrong}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 24,
              paddingTop: 22,
              borderTop: `1px solid ${c.border}`,
              opacity: goal,
            }}
          >
            <Text size={19} weight={600} style={{ flex: "0 0 auto" }}>
              The job
            </Text>
            <Text size={19} muted style={{ lineHeight: 1.5 }}>
              Train the agent to reach for the right tool. Not by writing out a
              thousand correct answers — by letting it try, and scoring it.
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 1 · pick an environment ───────────────────────────────── */

/**
 * `new-environment-page.tsx`: "Take a curated environment from the catalogue,
 * or scaffold a template." The catalogue groups by a free-form `domain` hint —
 * math, reasoning and tool-use are the three the browse page names — and the
 * four scaffolds are `single_turn_qa`, `code_with_tests`,
 * `multi_turn_tool_agent` and `blank`.
 *
 * The line that matters is ownership: adding an entry copies its module into
 * your own Data Hub repo as an editable file, which is why the run can pin a
 * version of it later.
 */
export const SceneRlEnvironment: React.FC = () => {
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const mode = useEnterAt(t(12), 10);
  const doms = [useEnterAt(t(22), 10), useEnterAt(t(29), 10), useEnterAt(t(36), 10)];
  const rows = [useEnterAt(t(52), 10), useEnterAt(t(60), 10), useEnterAt(t(68), 10)];
  const pick = useEnterAt(t(92), 12);
  const added = useEnterAt(t(118), 14);
  const tpl = useEnterAt(t(150), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1560} hot at={0} style={{ padding: "26px 34px 28px" }}>
          <div style={{ opacity: head }}>
            <Heading size={26}>New environment</Heading>
            <Text size={17} muted style={{ marginTop: 4 }}>
              Take a curated environment from the catalogue, or scaffold a
              template.
            </Text>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 16, opacity: mode }}>
            {["Add from the catalogue", "Start from a template"].map((k, i) => (
              <div
                key={k}
                style={{
                  flex: 1,
                  border: `1px solid ${i === 0 ? c.amber : c.border}`,
                  background: i === 0 ? `${c.amber}0f` : "transparent",
                  borderRadius: radius,
                  padding: "12px 18px",
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: i === 0 ? 600 : 400,
                  color: i === 0 ? c.amber600 : c.mutedFg,
                }}
              >
                {k}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
            {[
              ["Math", "Word problems & numeric answers", 12],
              ["Reasoning", "Multi-step logic & inference", 9],
              ["Tool Use", "Tool calls & multi-turn delegation", 7],
            ].map(([label, blurb, n], i) => (
              <div
                key={label as string}
                style={{
                  flex: 1,
                  border: `1px solid ${i === 2 ? c.amber : c.border}`,
                  borderRadius: radius,
                  padding: "12px 16px",
                  opacity: doms[i],
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Text size={17} weight={600} style={{ flex: 1 }}>
                    {label}
                  </Text>
                  <Text size={14} muted>
                    {n}
                  </Text>
                </div>
                <Text size={14} muted style={{ marginTop: 4 }}>
                  {blurb}
                </Text>
              </div>
            ))}
          </div>

          {/* the Tool Use drawer, open */}
          <div style={{ marginTop: 8, paddingLeft: 4 }}>
            {[
              [ENV, "Reward 1.0 when the call matches the reference tool and its args", "1,240 examples"],
              ["multi-turn-delegation", "Sub-agent hand-off, scored on the final answer", "860 examples"],
              ["calculator-tool-use", "Arithmetic it can't do unaided — generated, no dataset", "generated"],
            ].map(([name, desc, n], i) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "10px 14px",
                  borderRadius: 9,
                  borderTop: i === 0 ? "none" : `1px solid ${c.border}`,
                  background: i === 0 ? `rgba(245,158,11,${0.1 * pick})` : "transparent",
                  opacity: rows[i],
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text size={17} weight={500}>
                    {name}
                  </Text>
                  <Text size={14} muted style={{ marginTop: 1 }}>
                    {desc}
                  </Text>
                </div>
                <span style={{ fontFamily: mono, fontSize: 14, color: c.mutedFg }}>
                  {n}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              border: `1px solid ${c.border}`,
              background: "rgba(12,10,9,0.02)",
              borderRadius: radius,
              padding: "13px 18px",
              marginTop: 12,
              opacity: added,
            }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}>
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <Text size={16} muted style={{ lineHeight: 1.5 }}>
              Added as your own editable copy — the module lands in your Data Hub
              repo alongside its settings, yours to edit and publish from here.
            </Text>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 12, opacity: tpl }}>
            <Text size={15} muted style={{ flex: "0 0 auto" }}>
              Nothing fits? Scaffold one:
            </Text>
            {[
              ["Single-turn QA", "\\boxed{} + exact match"],
              ["Code + Tests", "scored by pytest"],
              ["Multi-turn Agent", "tool registry, binary reward"],
              ["Blank", "empty load_environment"],
            ].map(([k, sub]) => (
              <div
                key={k}
                style={{
                  flex: 1,
                  border: `1px solid ${c.border}`,
                  borderRadius: 9,
                  padding: "8px 12px",
                }}
              >
                <Text size={15} weight={500}>
                  {k}
                </Text>
                <Text size={13} muted style={{ marginTop: 1 }}>
                  {sub}
                </Text>
              </div>
            ))}
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · what is actually inside one ───────────────────────── */

/**
 * The module the fork just copied, in the shape every curated environment has:
 * a scoring function that returns a float, and a `load_environment` that hands
 * `verifiers` a dataset, the tools, and a `Rubric` wrapping the scorer.
 *
 * This is the shot the tutorial cannot skip. "Its rubric is your reward" means
 * nothing until you have seen that the rubric is twelve lines of Python you can
 * open and change — and the three numbers it returns here are the same 1.0 /
 * 0.5 / 0.0 that turn up in the Rollouts tab five shots later.
 */
const CODE: [string, string][] = [
  ["def", "def final_answer(completion, answer, **_) -> float:"],
  ["str", '    """Reward the call, not the prose around it."""'],
  ["plain", "    call = last_tool_call(completion)"],
  ["kw", "    if call is None or call.name != answer[\"tool\"]:"],
  ["num", "        return 0.0                  # wrong tool"],
  ["kw", "    if call.args != answer[\"args\"]:"],
  ["num", "        return 0.5                  # right tool, wrong args"],
  ["num", "    return 1.0"],
  ["blank", ""],
  ["def", "def load_environment(**kwargs) -> vf.Environment:"],
  ["plain", "    return vf.ToolEnv("],
  ["plain", "        dataset=build_dataset(**kwargs),"],
  ["plain", "        tools=[get_refund_policy, search_orders],"],
  ["plain", "        max_turns=4,"],
  ["plain", "        rubric=vf.Rubric(funcs=[final_answer]),"],
  ["plain", "    )"],
];

const CODE_COLOR: Record<string, string> = {
  def: "#8b5cf6",
  kw: "#c2410c",
  str: "#15803d",
  num: "#0891b2",
  plain: "#0c0a09",
  blank: "#0c0a09",
};

export const SceneRlRubric: React.FC = () => {
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const file = useEnterAt(t(12), 10);
  const code = useEnterAt(t(22), 16);
  /* the three return values are the point — they land last, together */
  const scores = useEnterAt(t(96), 16);
  const note = useEnterAt(t(140), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1560} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, opacity: head }}>
            <Heading size={24}>What a rubric actually is</Heading>
            <div style={{ flex: 1 }} />
            <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg, opacity: file }}>
              {ENV}/__init__.py
            </span>
          </div>

          <div
            style={{
              border: `1px solid ${c.border}`,
              borderRadius: radius,
              background: "rgba(12,10,9,0.025)",
              padding: "16px 22px",
              marginTop: 14,
              opacity: code,
            }}
          >
            {CODE.map(([kind, line], i) => {
              /* the reward values brighten once the eye has the shape */
              const isScore = kind === "num";
              return (
                <div
                  key={`${i}-${line}`}
                  style={{
                    fontFamily: mono,
                    fontSize: 16,
                    lineHeight: 1.5,
                    whiteSpace: "pre",
                    color: CODE_COLOR[kind],
                    fontWeight: isScore ? 600 : 400,
                    background: isScore ? `rgba(245,158,11,${0.16 * scores})` : "transparent",
                    borderRadius: 4,
                  }}
                >
                  {line || " "}
                </div>
              );
            })}
          </div>

          <Text size={17} muted style={{ marginTop: 16, lineHeight: 1.55, opacity: note }}>
            That is the whole reward: a function that looks at what the model
            did and returns a number. Wrong tool scores 0, right tool with the
            wrong arguments scores 0.5, exactly right scores 1.0 — and those are
            the numbers you will watch land in the Rollouts tab.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · start the run ─────────────────────────────────────── */

/** The method step of `new-run-page.tsx`. One click: GRPO, then Continue. */
const METHODS: { title: string; tag: string; blurb: string; points: string[]; badge?: string; icon: React.ReactNode; amber?: boolean }[] = [
  {
    title: "Supervised Fine-Tune",
    tag: "SFT",
    blurb: "Train a base model directly on labelled examples. The workhorse for teaching format, tone, and task behaviour.",
    points: ["One base model, one dataset", "Fastest to set up"],
    icon: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
  },
  {
    title: "Preference (DPO)",
    tag: "DPO",
    badge: "NEW",
    blurb: "Teach the model to prefer a chosen response over a rejected one — direct preference optimization, no reward model or rollouts.",
    points: ["{prompt, chosen, rejected} pairs", "No reward model required"],
    icon: (
      <>
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
      </>
    ),
  },
  {
    title: "Reinforcement (GRPO)",
    tag: "GRPO",
    blurb: "Optimise a policy against a reward signal or verifiable environment. Best for reasoning and tool-use gains.",
    points: ["Reward or environment driven", "No labelled targets required"],
    icon: (
      <>
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path d="m19 9-5 5-4-4-3 3" />
      </>
    ),
  },
  {
    title: "Knowledge Distillation",
    tag: "DISTILL",
    badge: "NEW",
    amber: true,
    blurb: "Transfer a large teacher's probability distribution into a smaller, cheaper student — richer signal than hard labels alone.",
    points: ["Teacher → student pairing", "Combined CE + KL loss"],
    icon: (
      <>
        <path d="m21 16-4 4-4-4M17 20V4" />
        <path d="M3 8l4-4 4 4M7 4v16" />
      </>
    ),
  },
];

export const SceneRlMethod: React.FC = () => {
  const t = useTimeScale(4);
  const head = useEnterAt(t(3), 10);
  const cards = [useEnterAt(t(10), 9), useEnterAt(t(16), 9), useEnterAt(t(22), 9), useEnterAt(t(28), 9)];
  const chosen = useEnterAt(t(50), 12);
  const footer = useEnterAt(t(66), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1680} hot at={0} style={{ padding: "28px 34px 28px" }}>
          <div style={{ opacity: head }}>
            <Heading size={27}>New training run</Heading>
            <Text size={17} muted style={{ marginTop: 5 }}>
              Choose a method to turn a dataset into a model.
            </Text>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 22 }}>
            {METHODS.map((m, i) => {
              const on = m.tag === "GRPO" ? chosen : 0;
              return (
                <div
                  key={m.tag}
                  style={{
                    position: "relative",
                    border: `1px solid ${on ? c.amber : c.border}`,
                    boxShadow: on
                      ? `0 0 0 1px ${c.amber}, 0 1px 2px rgba(20,20,18,0.05)`
                      : "0 1px 2px rgba(20,20,18,0.05)",
                    borderRadius: 18,
                    padding: "24px 24px 26px",
                    opacity: cards[i],
                  }}
                >
                  {m.badge ? (
                    <span
                      style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        borderRadius: 999,
                        background: `${c.amber}1a`,
                        color: "#b45309",
                        padding: "3px 10px",
                        fontFamily: sans,
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {m.badge}
                    </span>
                  ) : null}
                  <span
                    style={{
                      display: "flex",
                      width: 48,
                      height: 48,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 14,
                      background: "rgba(12,10,9,0.05)",
                    }}
                  >
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={m.amber ? c.amber : c.foreground} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      {m.icon}
                    </svg>
                  </span>
                  <Text size={23} weight={600} style={{ marginTop: 20 }}>
                    {m.title}
                  </Text>
                  <Text size={13} weight={600} style={{ marginTop: 2, letterSpacing: "0.08em", color: "rgba(124,109,103,0.6)" }}>
                    {m.tag}
                  </Text>
                  <Text size={16} muted style={{ marginTop: 12, lineHeight: 1.55 }}>
                    {m.blurb}
                  </Text>
                  <div style={{ marginTop: 16 }}>
                    {m.points.map((p) => (
                      <div key={p} style={{ display: "flex", gap: 10, marginTop: 8, alignItems: "flex-start" }}>
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={c.amber} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 3, flex: "0 0 auto" }}>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <Text size={16} style={{ lineHeight: 1.45 }}>
                          {p}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 24,
              paddingTop: 20,
              borderTop: `1px solid ${c.border}`,
              opacity: footer,
            }}
          >
            <Text size={17} muted>
              Selected:{" "}
              <span style={{ fontWeight: 600, color: c.foreground }}>
                Reinforcement (GRPO)
              </span>
            </Text>
            <span
              style={{
                background: c.amber,
                color: "#000",
                borderRadius: 10,
                padding: "11px 20px",
                fontFamily: sans,
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Continue →
            </span>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · fill the form ─────────────────────────────────────── */

/**
 * The top of the configure step: run name, experiment, base model — then the
 * `RL mode` field, where this run says what it trains against.
 *
 * Both halves are one shot because they are one scroll of one form. The hint
 * under each field is the product's own.
 */
export const SceneRlForm: React.FC = () => {
  const t = useTimeScale(8);
  const name = useEnterAt(t(3), 12);
  const exp = useEnterAt(t(28), 12);
  const base = useEnterAt(t(52), 12);
  const mode = useEnterAt(t(80), 12);
  const env = useEnterAt(t(104), 12);
  const other = useEnterAt(t(140), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "28px 34px 30px" }}>
          <Field label="Run name" required hint="Lowercase, hyphens. Names the run and its output model." enter={name}>
            <Box value={RUN} />
          </Field>

          <Field label="Experiment" required hint="Groups related runs so you can compare them side by side." enter={exp}>
            <Box value="tool-routing" select />
          </Field>

          <Field label="Base model" required enter={base}>
            <Box value={BASE} select />
          </Field>

          <div style={{ marginTop: 18, opacity: mode }}>
            <Text size={16} weight={500} style={{ marginBottom: 8 }}>
              RL mode
            </Text>
            <div style={{ display: "inline-flex", border: `1px solid ${c.border}`, borderRadius: 11, padding: 3, gap: 3 }}>
              {["Environment", "RULER"].map((k, i) => (
                <span
                  key={k}
                  style={{
                    padding: "9px 26px",
                    borderRadius: 8,
                    fontFamily: sans,
                    fontSize: 17,
                    fontWeight: i === 0 ? 600 : 400,
                    background: i === 0 ? "rgba(12,10,9,0.06)" : "transparent",
                    color: i === 0 ? c.foreground : c.mutedFg,
                  }}
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 16, opacity: env }}>
            <div style={{ flex: 2 }}>
              <Text size={16} weight={500} style={{ marginBottom: 8 }}>
                Environment <span style={{ color: c.destructive }}>*</span>
              </Text>
              <Box value={ENV} note="(tool-use)" select />
            </div>
            <div style={{ flex: 1 }}>
              <Text size={16} weight={500} style={{ marginBottom: 8 }}>
                Version
              </Text>
              <Box value="v3" select />
            </div>
          </div>

          <Text size={16} muted style={{ marginTop: 16, lineHeight: 1.55, opacity: other }}>
            Pin a version and the run is reproducible — the same environment,
            at the same revision, every time you clone it.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 5 · the other setting on that toggle ──────────────────── */

/**
 * RULER, taught where you would actually meet it: the second position on the
 * `RL mode` toggle the previous shot just walked past.
 *
 * It is not an alternative philosophy, it is a different set of fields. The
 * environment picker is replaced by three:
 *
 * - **Dataset** — prompts, and "must contain an `input` column".
 * - **System prompt** — "Sent to the policy model for every rollout; the judge
 *   scores what comes back."
 * - **Judge** — the model doing the scoring, since `ruler_task` ships an
 *   intentionally empty rubric and there is nothing else to score with.
 *   External is "any OpenAI-compatible endpoint … cheapest, no fleet GPU cost";
 *   Colocated "spins up a vLLM judge on the same fleet. Eats one GPU block by
 *   default."
 *
 * The judge is shown the whole group and ranks it rather than scoring each
 * attempt on an absolute scale, which is why `grpo-defaults.ts` sets
 * `RULER_MIN_GROUP_SIZE = 4`.
 */
export const SceneRlRuler: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 12);
  const toggle = useEnterAt(t(14), 12);
  const data = useEnterAt(t(30), 12);
  const sys = useEnterAt(t(48), 12);
  const judge = useEnterAt(t(68), 12);
  const rank = [
    useEnterAt(t(88), 9),
    useEnterAt(t(95), 9),
    useEnterAt(t(102), 9),
    useEnterAt(t(109), 9),
  ];
  const places = useEnterAt(t(122), 14);
  const floor = useEnterAt(t(146), 14);

  const GROUP: [string, string][] = [
    ['get_refund_policy(region="EU")', "1st"],
    ["get_refund_policy()", "2nd"],
    ['search_orders(q="jacket")', "3rd"],
    ['search_orders(q="EU jacket")', "4th"],
  ];

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1680} hot at={0} style={{ padding: "22px 32px 24px" }}>
          <Text size={18} weight={600} style={{ opacity: head }}>
            No rubric you can write? Flip the toggle.
          </Text>

          <div style={{ display: "flex", gap: 28, marginTop: 14, alignItems: "flex-start" }}>
            {/* the same field, the other position — and what it asks for */}
            <div style={{ flex: "0 0 900px" }}>
              <div style={{ opacity: toggle }}>
                <Text size={15} weight={500} style={{ marginBottom: 7 }}>
                  RL mode
                </Text>
                <div style={{ display: "inline-flex", border: `1px solid ${c.border}`, borderRadius: 10, padding: 3, gap: 3 }}>
                  {["Environment", "RULER"].map((k, i) => (
                    <span
                      key={k}
                      style={{
                        padding: "7px 22px",
                        borderRadius: 7,
                        fontFamily: sans,
                        fontSize: 16,
                        fontWeight: i === 1 ? 600 : 400,
                        background: i === 1 ? "rgba(12,10,9,0.06)" : "transparent",
                        color: i === 1 ? c.foreground : c.mutedFg,
                      }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              <RulerField
                label="Dataset"
                required
                enter={data}
                right={<SourceToggle options={["HuggingFace", "Local"]} active={1} />}
                hint="Must contain an input column (or customize user_template in the Config tab)."
              >
                <Box value="support-questions" note="(1,800 samples)" select />
              </RulerField>

              <RulerField
                label="System prompt"
                required
                enter={sys}
                hint="Sent to the policy model for every rollout; the judge scores what comes back."
              >
                <div
                  style={{
                    border: `1px solid ${c.border}`,
                    borderRadius: 8,
                    background: "rgba(12,10,9,0.04)",
                    padding: "10px 14px",
                    fontFamily: sans,
                    fontSize: 16,
                    lineHeight: 1.5,
                    height: 46,
                  }}
                >
                  You are Northwind&apos;s support agent. Use the tools; cite
                  policy by name.
                </div>
              </RulerField>

              {/* the judge is the model doing the scoring */}
              <RulerField
                label="Judge"
                required
                enter={judge}
                right={<SourceToggle options={["External", "Colocated"]} active={0} />}
                hint="Any OpenAI-compatible endpoint (OpenRouter, OpenAI, …). Cheapest, no fleet GPU cost."
              >
                <Box value="openai/gpt-4o-mini" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
                  <Box value="https://openrouter.ai/api/v1" />
                  <Box value="••••••••••••" />
                </div>
              </RulerField>
            </div>

            {/* what does the scoring instead */}
            <div style={{ flex: 1 }}>
              <Text size={13} muted style={{ letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 9 }}>
                It ranks the group
              </Text>
              {GROUP.map(([call, place], i) => (
                <div
                  key={call}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    border: `1px solid ${c.border}`,
                    borderRadius: 9,
                    padding: "9px 13px",
                    marginTop: i === 0 ? 0 : 7,
                    opacity: rank[i],
                  }}
                >
                  <span style={{ fontFamily: mono, fontSize: 13, color: "rgba(12,10,9,0.5)" }}>
                    #{i}
                  </span>
                  <span style={{ flex: 1, fontFamily: mono, fontSize: 13, color: c.mutedFg }}>
                    {call}
                  </span>
                  <span
                    style={{
                      fontFamily: sans,
                      fontSize: 14,
                      fontWeight: 600,
                      color: i === 0 ? GREEN : c.mutedFg,
                      opacity: places,
                    }}
                  >
                    {place}
                  </span>
                </div>
              ))}
              <Text size={15} muted style={{ marginTop: 12, lineHeight: 1.5, opacity: places }}>
                It never says what a good answer is worth in the abstract — only
                which of these is better than which.
              </Text>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 13,
              alignItems: "flex-start",
              marginTop: 14,
              paddingTop: 14,
              borderTop: `1px solid ${c.border}`,
              opacity: floor,
            }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={c.amber} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flex: "0 0 auto" }}>
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4M12 17h.01" />
            </svg>
            <Text size={15} muted style={{ lineHeight: 1.5 }}>
              Because it ranks the group against itself, keep group size at four
              or more. A group of one is not a comparison — it scores 0.0 on
              every metric and the curve reads as a broken run. Colocated is the
              other option, and it eats a GPU block off the fleet.
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/** A create-form field, with its source toggle sitting on the label line. */
const RulerField: React.FC<{
  label: string;
  hint: string;
  enter: number;
  required?: boolean;
  right?: React.ReactNode;
  children: React.ReactNode;
}> = ({ label, hint, enter, required, right, children }) => (
  <div style={{ marginTop: 12, opacity: enter }}>
    <div style={{ display: "flex", alignItems: "center", marginBottom: 7 }}>
      <Text size={15} weight={500} style={{ flex: 1 }}>
        {label}
        {required ? <span style={{ color: c.destructive }}> *</span> : null}
      </Text>
      {right}
    </div>
    {children}
    <Text size={14} muted style={{ marginTop: 6 }}>
      {hint}
    </Text>
  </div>
);

const SourceToggle: React.FC<{ options: string[]; active: number }> = ({
  options,
  active,
}) => (
  <div style={{ display: "inline-flex", border: `1px solid ${c.border}`, borderRadius: 8, padding: 2, gap: 2 }}>
    {options.map((k, i) => (
      <span
        key={k}
        style={{
          padding: "4px 12px",
          borderRadius: 6,
          fontFamily: sans,
          fontSize: 14,
          fontWeight: i === active ? 600 : 400,
          background: i === active ? "rgba(12,10,9,0.06)" : "transparent",
          color: i === active ? c.foreground : c.mutedFg,
        }}
      >
        {k}
      </span>
    ))}
  </div>
);

/* ── step 4 · the numbers, and the fleet ────────────────────────── */

/**
 * Hyperparameters and GPU allocation, together because they are decided
 * together: group size sets how many rollouts every prompt costs, and the
 * inference/trainer split is what pays for them.
 *
 * Both warnings here are the form's real ones — the group-size floor from
 * `grpo-defaults.ts`, and the fleet-size check from `new-run-page.tsx`.
 */
export const SceneRlTune: React.FC = () => {
  const t = useTimeScale(8);
  const hp = useEnterAt(t(3), 12);
  const vals = [useEnterAt(t(18), 10), useEnterAt(t(28), 10), useEnterAt(t(38), 10)];
  const why = useEnterAt(t(56), 12);
  const gpu = useEnterAt(t(84), 12);
  const split = [useEnterAt(t(96), 10), useEnterAt(t(106), 10), useEnterAt(t(118), 10)];
  const warn = useEnterAt(t(146), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "28px 34px 30px" }}>
          <Text size={17} weight={500} style={{ opacity: hp }}>
            Hyperparameters
          </Text>
          <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
            {[
              ["Group size", "8"],
              ["Learning rate", "1e-6"],
              ["Max steps", "400"],
            ].map(([label, v], i) => (
              <div key={label} style={{ flex: 1, opacity: vals[i] }}>
                <Text size={15} muted style={{ marginBottom: 6 }}>
                  {label}
                </Text>
                <Box value={v} />
              </div>
            ))}
          </div>

          <Text size={16} muted style={{ marginTop: 12, lineHeight: 1.55, opacity: why }}>
            Group size is how many times it attempts each prompt. Four is the
            floor — a group of one is not a comparison — and eight gives the
            update a wider spread to learn from.
          </Text>

          <div style={{ marginTop: 22, opacity: gpu }}>
            <Text size={17} weight={500}>
              GPU allocation
            </Text>
            <Text size={15} muted style={{ marginTop: 4, lineHeight: 1.5 }}>
              How the fleet&apos;s GPUs split between vLLM inference (rollout
              generation) and the trainer. Both are required for the run to
              start.
            </Text>
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 12 }}>
            {[
              ["Inference", "2 GPUs", true],
              ["Trainer", "2 GPUs", true],
              ["Total", "4 GPUs", false],
            ].map(([label, v, sel], i) => (
              <div key={label as string} style={{ flex: 1, opacity: split[i] }}>
                <Text size={15} muted style={{ marginBottom: 6 }}>
                  {label}
                </Text>
                {sel ? (
                  <Box value={v as string} select />
                ) : (
                  <div
                    style={{
                      border: `1px solid ${c.border}`,
                      background: "rgba(12,10,9,0.05)",
                      borderRadius: 8,
                      padding: "11px 15px",
                      fontFamily: sans,
                      fontSize: 17,
                      fontWeight: 700,
                    }}
                  >
                    {v}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              marginTop: 16,
              opacity: warn,
            }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={c.amber} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flex: "0 0 auto" }}>
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4M12 17h.01" />
            </svg>
            <Text size={16} muted style={{ lineHeight: 1.55 }}>
              Pick an instance too small and the form says so: GRPO needs at
              least two GPUs — one for vLLM to generate rollouts, one for the
              trainer.
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 6 · what it is doing ──────────────────────────────────── */

/**
 * `rollouts-tab.tsx`, at the first archived batch.
 *
 * This shot carries the mechanism: one prompt, eight attempts, each one scored
 * by the environment's rubric, and `A` — the advantage — showing how far each
 * sat from its own group's average. No diagram explains that better than the
 * numbers do.
 */
type Rollout = [number, string, number, number];
const ROLLOUTS: Rollout[] = [
  [0, "get_refund_policy(region=\"EU\") → cited, correct window", 1.0, 0.55],
  [1, "get_refund_policy() → right tool, missing region", 0.5, 0.05],
  [2, "search_orders(q=\"jacket\") → wrong tool", 0.0, -0.45],
  [3, "search_orders(q=\"jacket\", region=\"EU\") → wrong tool", 0.0, -0.45],
];

const rewardColor = (r: number) =>
  r > 0.5 ? GREEN : r > 0 ? c.amber : r < 0 ? c.destructive : "rgba(124,109,103,0.5)";
const advColor = (a: number) =>
  a > 0 ? GREEN : a < 0 ? c.destructive : "rgba(124,109,103,0.5)";

export const SceneRlRollouts: React.FC = () => {
  const t = useTimeScale(8);
  const tabs = useEnterAt(t(3), 10);
  const bar = useEnterAt(t(12), 10);
  const rows = [useEnterAt(t(24), 9), useEnterAt(t(36), 9), useEnterAt(t(48), 9), useEnterAt(t(60), 9)];
  const scores = useEnterAt(t(84), 14);
  const note = useEnterAt(t(138), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1620} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <RlTabs active={3} enter={tabs} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, opacity: bar }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <Text size={13} muted style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Step
              </Text>
              <div style={{ width: 150 }}>
                <Box value="20" select />
              </div>
              <Text size={14} style={{ color: "rgba(124,109,103,0.5)" }}>
                1-4 of 8
              </Text>
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              {["all", "rewarded", "zero"].map((f) => (
                <span
                  key={f}
                  style={{
                    fontFamily: sans,
                    fontSize: 14,
                    fontWeight: f === "all" ? 600 : 400,
                    padding: "5px 12px",
                    borderRadius: 8,
                    border: `1px solid ${f === "all" ? "rgba(29,24,22,0.2)" : "transparent"}`,
                    background: f === "all" ? "rgba(29,24,22,0.07)" : "transparent",
                    color: f === "all" ? c.primary : c.mutedFg,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {ROLLOUTS.map(([idx, text, r, a], i) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 11,
                border: `1px solid ${c.border}`,
                borderRadius: radius,
                padding: "14px 18px",
                opacity: rows[i],
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 15, color: "rgba(12,10,9,0.8)" }}>
                #{idx}
              </span>
              <span style={{ flex: 1, fontFamily: mono, fontSize: 16, color: c.mutedFg }}>
                {text}
              </span>
              <Badge k="R" v={r.toFixed(3)} color={rewardColor(r)} enter={scores} />
              <Badge k="A" v={`${a > 0 ? "+" : ""}${a.toFixed(3)}`} color={advColor(a)} enter={scores} />
            </div>
          ))}

          <Text size={17} muted style={{ marginTop: 20, lineHeight: 1.55, opacity: note }}>
            Eight attempts at the same prompt, scored by the
            environment&apos;s rubric. <strong>A</strong> is how far each sat
            from the group&apos;s average — positive gets reinforced, negative
            gets pushed down. That is the whole training signal.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 7 · is it working ─────────────────────────────────────── */

/* Opens on 0.31 and lands on 0.79 — the two numbers the caption promises. The
   wobble damps toward the end so the curve reads as converging, and so the last
   sample is the headline figure rather than a sine offset from it. */
const rewardMean = (i: number, n: number) => {
  const x = i / (n - 1);
  return 0.31 + 0.5111 * (1 - Math.exp(-2.8 * x)) + 0.02 * Math.sin(i / 1.6) * (1 - x);
};
const rewardStd = (i: number, n: number) => 0.36 - 0.07 * (i / (n - 1)) + 0.02 * Math.sin(i / 1.3);
const policyLoss = (i: number, n: number) => 0.42 * Math.exp(-1.9 * (i / (n - 1))) + 0.06 + 0.02 * Math.sin(i / 1.4);
const klMismatch = (i: number, n: number) => 0.02 + 0.014 * Math.sin(i / 2.1) + 0.01 * (i / (n - 1));

/**
 * `rl-training-tab.tsx`. Mean reward is the number the job is judged on — it
 * opens at 0.31, the rate the agent was already getting the tool right, and
 * ends at 0.79.
 *
 * Reward std is the one to watch beside it: it is the spread inside each group,
 * and a run whose attempts all score the same has nothing left to learn from,
 * however healthy the mean looks.
 */
export const SceneRlCurve: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const tabs = useEnterAt(t(3), 8);
  const kpis = useEnterAt(t(9), 8);
  const charts = [useEnterAt(t(16), 8), useEnterAt(t(21), 8), useEnterAt(t(26), 8), useEnterAt(t(31), 8)];
  const note = useEnterAt(t(116), 12);

  /* The curve is the point of the shot, not a thing to sit through: it draws
     in about a third of the runtime and the last beat is the number holding. */
  const n = 48;
  const drawn = interpolate(frame, [t(22), t(100)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shown = Math.max(2, Math.round(n * drawn));

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1660} hot at={0} style={{ padding: "26px 32px 26px" }}>
          <RlTabs active={0} enter={tabs} />

          <div style={{ display: "flex", gap: 10, marginTop: 18, opacity: kpis }}>
            {[
              ["Mean Reward", rewardMean(shown - 1, n).toFixed(3)],
              ["Policy Loss", policyLoss(shown - 1, n).toFixed(4)],
              ["KL Mismatch", klMismatch(shown - 1, n).toFixed(4)],
              ["Grad Norm", "0.41"],
              ["Step", Math.round((shown / n) * 400).toLocaleString()],
              ["TPS", "3.2k"],
            ].map(([label, value]) => (
              <div key={label} style={{ flex: 1, border: `1px solid ${c.border}`, borderRadius: 9, padding: "10px 13px" }}>
                <Text size={12} muted style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {label}
                </Text>
                <div style={{ fontFamily: sans, fontSize: 23, fontWeight: 700, marginTop: 4 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 14 }}>
            <RlChart title="Mean Reward" color={GREEN} f={rewardMean} n={n} shown={shown} enter={charts[0]} digits={3} />
            <RlChart title="Reward Std" color="#0EA5E9" f={rewardStd} n={n} shown={shown} enter={charts[1]} digits={3} />
            <RlChart title="Policy Loss" color="#F59E0B" f={policyLoss} n={n} shown={shown} enter={charts[2]} digits={4} />
            <RlChart title="KL Mismatch" color="#EF4444" f={klMismatch} n={n} shown={shown} enter={charts[3]} digits={4} />
          </div>

          <Text size={17} muted style={{ marginTop: 14, lineHeight: 1.5, opacity: note }}>
            0.31 to 0.79. Watch reward std beside it — if the spread collapses,
            every attempt is scoring the same and there is nothing left to
            learn from.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const RlChart: React.FC<{
  title: string;
  color: string;
  f: (i: number, n: number) => number;
  n: number;
  shown: number;
  enter: number;
  digits: number;
}> = ({ title, color, f, n, shown, enter, digits }) => {
  /* `metric-area-chart.tsx`: a 0.6 → 0 gradient under the line, a y-axis
     gutter, and exactly three x ticks — first step, middle, last. */
  const w = 700;
  const h = 104;
  const gutter = 46;
  const plot = w - gutter;
  const all = Array.from({ length: n }, (_, i) => f(i, n));
  const lo = Math.min(...all);
  const hi = Math.max(...all);
  const pad = (hi - lo) * 0.14;
  const y = (v: number) => h - ((v - lo + pad) / (hi - lo + pad * 2)) * h;
  const pts = Array.from({ length: shown }, (_, i) => [gutter + (i / (n - 1)) * plot, y(f(i, n))] as const);
  const line = pts.map(([x, yy], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${yy.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${h} L${gutter} ${h} Z`;
  const gradId = `fill-${title.replace(/\s+/g, "-")}`;
  const ticks: [number, string, string][] = [
    [gutter, "0", "start"],
    [gutter + plot / 2, "200", "middle"],
    [gutter + plot, "400", "end"],
  ];

  return (
    <div style={{ border: `1px solid ${c.border}`, borderRadius: 11, padding: "11px 15px 6px", opacity: enter }}>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <Text size={16} weight={600} style={{ flex: 1 }}>
          {title}
        </Text>
        <span style={{ fontFamily: mono, fontSize: 16, color, fontWeight: 700 }}>
          {f(shown - 1, n).toFixed(digits)}
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h + 22}`} style={{ width: "100%", height: 130, marginTop: 6 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.6} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {[hi, lo].map((v) => (
          <text
            key={v}
            x={gutter - 8}
            y={y(v) + 4}
            textAnchor="end"
            style={{ fontSize: 12, fill: c.mutedFg, fillOpacity: 0.6, fontFamily: sans }}
          >
            {v.toFixed(digits === 4 ? 3 : 2)}
          </text>
        ))}
        <path d={area} fill={`url(#${gradId})`} />
        <path d={line} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        {ticks.map(([x, label, anchor]) => (
          <text
            key={label}
            x={x}
            y={h + 17}
            textAnchor={anchor}
            style={{ fontSize: 12, fill: c.mutedFg, fillOpacity: 0.6, fontFamily: sans }}
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
};

/* ── step 8 · open one at the end ───────────────────────────────── */

/**
 * A rollout card expanded, at the last step rather than the first.
 *
 * `rollouts-tab.tsx` opens a card into two labelled boxes — a cyan **PROMPT**
 * holding the chat turns and a blue **COMPLETION** holding what the model
 * wrote — with the role names as small uppercase labels down the left.
 *
 * It opens the card the previous shot just listed — same step, same `#0`, same
 * R and A — so the two shots are one gesture rather than two screens. The list
 * says four attempts were scored; this says what one of them actually was.
 */
export const SceneRlRollout: React.FC = () => {
  const t = useTimeScale(5);
  const bar = useEnterAt(t(3), 10);
  const card = useEnterAt(t(14), 12);
  const prompt = useEnterAt(t(30), 12);
  const completion = useEnterAt(t(54), 12);
  const note = useEnterAt(t(86), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1560} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <RlTabs active={3} enter={bar} />

          <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 18, opacity: bar }}>
            <Text size={13} muted style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Step
            </Text>
            <div style={{ width: 150 }}>
              <Box value="20" select />
            </div>
            <Text size={14} style={{ color: "rgba(124,109,103,0.5)" }}>
              1-4 of 8
            </Text>
          </div>

          <div
            style={{
              border: `1px solid ${c.border}`,
              borderRadius: radius,
              padding: "14px 18px 16px",
              marginTop: 14,
              opacity: card,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2.6}>
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: mono, fontSize: 15, color: "rgba(12,10,9,0.8)" }}>#0</span>
              <span style={{ flex: 1, fontFamily: sans, fontSize: 16, color: c.mutedFg }}>
                Can I still return the jacket I got on the 3rd?
              </span>
              <Badge k="R" v="1.000" color={GREEN} enter={card} />
              <Badge k="A" v="+0.550" color={GREEN} enter={card} />
            </div>

            <LabeledBox label="Prompt" color="#0891b2" enter={prompt}>
              <ChatTurn role="system" text="You are Northwind's support agent. Use the tools; cite policy by name." />
              <ChatTurn role="user" text="Can I still return the jacket I got on the 3rd?" />
            </LabeledBox>

            <LabeledBox label="Completion" color="#2563eb" enter={completion}>
              <ChatTurn role="assistant" text={'get_refund_policy({"region": "EU"})'} />
              <ChatTurn role="tool" text='{"window_days": 14, "free_label": true}' />
              <ChatTurn
                role="assistant"
                text={
                  "Yes — under the EU Returns Policy the window is 14 days from\n" +
                  "delivery, so an order from the 3rd is still inside it. Unworn,\n" +
                  "tags on, and the return label is free within the EU."
                }
              />
            </LabeledBox>
          </div>

          <Text size={17} muted style={{ marginTop: 14, lineHeight: 1.5, opacity: note }}>
            Right tool, right argument, answer grounded in what the tool
            returned. Nobody wrote that reply — the rubric scored it 1.0 and the
            update made it likelier.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/** A labelled box inside an opened rollout card. */
const LabeledBox: React.FC<{
  label: string;
  color: string;
  enter: number;
  children: React.ReactNode;
}> = ({ label, color, enter, children }) => (
  <div style={{ marginTop: 14, opacity: enter }}>
    <Text
      size={13}
      weight={600}
      style={{ color, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 6 }}
    >
      {label}
    </Text>
    <div
      style={{
        background: "rgba(12,10,9,0.03)",
        borderRadius: 8,
        padding: "12px 14px",
      }}
    >
      {children}
    </div>
  </div>
);

const TURN_COLOR: Record<string, string> = {
  system: "#8b5cf6",
  user: "#0891b2",
  assistant: "#2563eb",
  tool: "#059669",
};

const ChatTurn: React.FC<{ role: string; text: string }> = ({ role, text }) => (
  <div style={{ display: "flex", gap: 14, padding: "4px 0" }}>
    <span
      style={{
        fontFamily: sans,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        color: TURN_COLOR[role],
        width: 100,
        flex: "0 0 auto",
        marginTop: 3,
      }}
    >
      {role}
    </span>
    <span
      style={{
        flex: 1,
        fontFamily: mono,
        fontSize: 15,
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
        color: "rgba(12,10,9,0.8)",
      }}
    >
      {text}
    </span>
  </div>
);

/* ── step 8 · ship it ───────────────────────────────────────────── */

/**
 * The two buttons on the finished run's header. `Evaluate` deep-links into the
 * evaluations wizard with this run's adapter pre-selected; `Merge` folds the
 * adapter into the base and writes a servable model — it reads `Promote`
 * instead when the trainer already merged during training.
 */
export const SceneRlShip: React.FC = () => {
  const t = useTimeScale(5);
  const header = useEnterAt(t(3), 12);
  const evalr = useEnterAt(t(24), 12);
  const merge = useEnterAt(t(52), 12);
  const out = useEnterAt(t(82), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "24px 30px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: header }}>
            <Heading size={26}>{RUN}</Heading>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                borderRadius: 999,
                padding: "6px 15px",
                fontFamily: sans,
                fontSize: 15,
                fontWeight: 500,
                background: `${GREEN}1f`,
                color: "#15803d",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 999, background: GREEN }} />
              Completed
            </span>
            <div style={{ flex: 1 }} />
            <Ghost label="Evaluate" enter={evalr} />
            <Ghost label="Merge" enter={merge} solid />
          </div>

          <div style={{ marginTop: 20, opacity: evalr }}>
            <Step
              n="1"
              title="Evaluate"
              body="Opens the evaluations wizard with this run's adapter already selected — score it against the model you started from before you ship anything."
            />
          </div>
          <div style={{ marginTop: 14, opacity: merge }}>
            <Step
              n="2"
              title="Merge"
              body="Folds the adapter into the base and writes a single servable model. It reads Promote instead when the trainer already merged during training."
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 20,
              border: `1px solid ${c.border}`,
              borderRadius: radius,
              padding: "14px 18px",
              opacity: out,
            }}
          >
            <Text size={15} muted style={{ flex: "0 0 auto" }}>
              Lands in your hub as
            </Text>
            <span style={{ fontFamily: mono, fontSize: 17, color: c.amber600 }}>
              sg://models/{RUN}
            </span>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 10 · serve it ─────────────────────────────────────────── */

/**
 * `deploy-model-page.tsx` — "Deploy model / Where is the model coming from?" —
 * and then `deploy-local-hub-form.tsx`.
 *
 * Local Hub is the card this tutorial takes, and its own description says why:
 * "A model already in your hub — trained runs land here." Merging wrote the
 * model; this is what turns it into something an agent can call.
 */
const SOURCES: [string, string, React.ReactNode][] = [
  [
    "Local Hub",
    "A model already in your hub — trained runs land here.",
    <>
      <path key="a" d="m7.5 4.27 9 5.15" />
      <path key="b" d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path key="c" d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </>,
  ],
  [
    "Hugging Face",
    "Pull a public model by repo + revision; pick a quantization.",
    <>
      <path key="a" d="M12 13v8M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path key="b" d="m8 17 4 4 4-4" />
    </>,
  ],
  [
    "OpenRouter",
    "Use OpenRouter as the backing endpoint.",
    <>
      <circle key="a" cx="12" cy="12" r="10" />
      <path key="b" d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
    </>,
  ],
  [
    "URL",
    "Any OpenAI-compatible endpoint — your vLLM, OpenAI, Anthropic…",
    <>
      <path key="a" d="M9 17H7A5 5 0 0 1 7 7h2" />
      <path key="b" d="M15 7h2a5 5 0 1 1 0 10h-2M8 12h8" />
    </>,
  ],
];

export const SceneRlDeploy: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 10);
  const cards = [useEnterAt(t(10), 9), useEnterAt(t(16), 9), useEnterAt(t(22), 9), useEnterAt(t(28), 9)];
  const pick = useEnterAt(t(44), 12);
  /* the picker hands over to the Local Hub form */
  const form = useEnterAt(t(72), 14);
  const onForm = frame >= t(72);
  const fields = [useEnterAt(t(84), 10), useEnterAt(t(94), 10), useEnterAt(t(104), 10), useEnterAt(t(114), 10)];
  const go = useEnterAt(t(130), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1500} hot at={0} style={{ padding: "28px 34px 30px" }}>
          <div style={{ opacity: head }}>
            <Heading size={26}>Deploy model</Heading>
            <Text size={17} muted style={{ marginTop: 4 }}>
              {onForm ? "Local Hub · serve a model from your hub." : "Where is the model coming from?"}
            </Text>
          </div>

          {onForm ? (
            <div style={{ opacity: form, marginTop: 18 }}>
              <DeployField label="Model" value={`sg://models/${RUN}`} enter={fields[0]} />
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <DeployField label="Revision" value="main" note="(branch)" enter={fields[1]} />
                </div>
                <div style={{ flex: 1 }}>
                  <DeployField label="File" value="merged/" enter={fields[2]} />
                </div>
              </div>
              <DeployField label="Display name" value={RUN} enter={fields[3]} plain />

              <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20, opacity: go }}>
                <span
                  style={{
                    background: c.amber,
                    color: "#000",
                    borderRadius: 10,
                    padding: "11px 24px",
                    fontFamily: sans,
                    fontSize: 17,
                    fontWeight: 600,
                  }}
                >
                  Deploy →
                </span>
                <Text size={16} muted>
                  Your model goes live in a few minutes.
                </Text>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginTop: 20 }}>
              {SOURCES.map(([title, desc, icon], i) => {
                const on = i === 0 ? pick : 0;
                return (
                  <div
                    key={title}
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                      border: `1px solid ${on ? c.amber : c.border}`,
                      boxShadow: on ? `0 0 0 1px ${c.amber}` : "none",
                      borderRadius: 14,
                      padding: "18px 20px",
                      opacity: cards[i],
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        width: 42,
                        height: 42,
                        flex: "0 0 auto",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 12,
                        background: "rgba(12,10,9,0.05)",
                      }}
                    >
                      <svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={c.foreground} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        {icon}
                      </svg>
                    </span>
                    <div>
                      <Text size={19} weight={600}>
                        {title}
                      </Text>
                      <Text size={15} muted style={{ marginTop: 4, lineHeight: 1.5 }}>
                        {desc}
                      </Text>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const DeployField: React.FC<{
  label: string;
  value: string;
  note?: string;
  enter: number;
  plain?: boolean;
}> = ({ label, value, note, enter, plain }) => (
  <div style={{ marginTop: 14, opacity: enter }}>
    <Text size={15} muted style={{ marginBottom: 6 }}>
      {label}
    </Text>
    <Box value={value} note={note} select={!plain} />
  </div>
);

/* ── step 11 · hand it to the agent ─────────────────────────────── */

/**
 * The agent's Configure → **Model** section (`features/agents/config-tab.tsx`).
 *
 * `Serving Model` is the one that matters here; the "Currently using …" line
 * under it is the product's own, and the summary / vision / image choosers
 * beside it are why this is a section rather than a single field.
 */
export const SceneRlUseIt: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const serving = useEnterAt(t(14), 12);
  const current = useEnterAt(t(44), 12);
  const rest = useEnterAt(t(64), 12);
  const save = useEnterAt(t(86), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "26px 32px 30px" }}>
          <Heading size={24} style={{ opacity: head }}>
            Model
          </Heading>

          <div style={{ marginTop: 16, opacity: serving }}>
            <Text size={15} muted style={{ marginBottom: 7 }}>
              Serving Model
            </Text>
            <Box value={RUN} note="(your hub)" select />
            <Text size={15} muted style={{ marginTop: 8, opacity: current }}>
              Currently using{" "}
              <span style={{ color: c.foreground, fontWeight: 500 }}>{BASE}</span>
            </Text>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
              marginTop: 20,
              paddingTop: 18,
              borderTop: `1px solid ${c.border}`,
              opacity: rest,
            }}
          >
            {["Summary Model", "Vision Model", "Image Model"].map((k) => (
              <div key={k}>
                <Text size={15} muted style={{ marginBottom: 6 }}>
                  {k}
                </Text>
                <Box value="Platform default" select />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20, opacity: save }}>
            <span
              style={{
                background: c.amber,
                color: "#000",
                borderRadius: 10,
                padding: "11px 24px",
                fontFamily: sans,
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Save
            </span>
            <Text size={16} muted>
              New chats pick the model up; conversations already running keep the
              old one.
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── the payoff ─────────────────────────────────────────────────── */

/**
 * The same turn as the opening shot, on the trained model. The film has to
 * close where it started or the run had no point.
 */
export const SceneRlPayoff: React.FC = () => {
  const t = useTimeScale(5);
  const ask = useEnterAt(t(4), 12);
  const call = useEnterAt(t(30), 12);
  const ok = useEnterAt(t(58), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "26px 34px 30px" }}>
          <Turn role="user" text="Can I still return the jacket I got on the 3rd?" enter={ask} />

          <div style={{ opacity: call, marginTop: 16 }}>
            <ToolCall
              name="get_refund_policy"
              args='{"region": "EU"}'
              note="the right call, first time"
              show={ok}
            />
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── shared chrome ──────────────────────────────────────────────── */

const RL_TABS = ["Overview", "Configuration", "Environment", "Rollouts", "Repository"];

const RlTabs: React.FC<{ active: number; enter: number }> = ({ active, enter }) => (
  <div
    style={{
      display: "flex",
      gap: 26,
      paddingBottom: 12,
      borderBottom: `1px solid ${c.border}`,
      opacity: enter,
    }}
  >
    {RL_TABS.map((tab, i) => (
      <span
        key={tab}
        style={{
          fontFamily: sans,
          fontSize: 18,
          fontWeight: i === active ? 600 : 400,
          color: i === active ? c.foreground : c.mutedFg,
          borderBottom: i === active ? `2px solid ${c.amber}` : "2px solid transparent",
          paddingBottom: 12,
          marginBottom: -13,
        }}
      >
        {tab}
      </span>
    ))}
  </div>
);

const Field: React.FC<{
  label: string;
  hint?: string;
  required?: boolean;
  enter: number;
  children: React.ReactNode;
}> = ({ label, hint, required, enter, children }) => (
  <div style={{ marginTop: 16, opacity: enter }}>
    <Text size={16} weight={500} style={{ marginBottom: 7 }}>
      {label}
      {required ? <span style={{ color: c.destructive }}> *</span> : null}
    </Text>
    {children}
    {hint ? (
      <Text size={15} muted style={{ marginTop: 6 }}>
        {hint}
      </Text>
    ) : null}
  </div>
);

const Box: React.FC<{ value: string; note?: string; select?: boolean }> = ({
  value,
  note,
  select,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "baseline",
      gap: 9,
      border: `1px solid ${c.border}`,
      borderRadius: 8,
      background: "rgba(12,10,9,0.04)",
      padding: "11px 15px",
    }}
  >
    <span style={{ flex: 1, fontFamily: sans, fontSize: 17 }}>
      {value}
      {note ? <span style={{ color: "rgba(124,109,103,0.5)", fontSize: 15 }}> {note}</span> : null}
    </span>
    {select ? (
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2.4}>
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : null}
  </div>
);

const Badge: React.FC<{ k: string; v: string; color: string; enter: number }> = ({
  k,
  v,
  color,
  enter,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "baseline",
      gap: 7,
      border: `1px solid ${c.border}`,
      borderRadius: 7,
      padding: "5px 11px",
      opacity: enter,
    }}
  >
    <span style={{ fontFamily: sans, fontSize: 13, color: "rgba(124,109,103,0.7)" }}>{k}</span>
    <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 700, color }}>{v}</span>
  </span>
);

const Turn: React.FC<{ role: string; text: string; enter: number }> = ({ role, text, enter }) => (
  <div style={{ display: "flex", gap: 16, opacity: enter }}>
    <span style={{ fontFamily: mono, fontSize: 14, color: "#0891b2", width: 92, flex: "0 0 auto" }}>
      {role}
    </span>
    <Text size={20} style={{ lineHeight: 1.5 }}>
      {text}
    </Text>
  </div>
);

/** A tool call as the trace renders it, with the verdict landing after. */
const ToolCall: React.FC<{
  name: string;
  args: string;
  bad?: boolean;
  note: string;
  show: number;
}> = ({ name, args, bad, note, show }) => (
  <div
    style={{
      border: `1px solid ${bad ? `rgba(239,68,68,${0.25 + 0.45 * show})` : `rgba(34,197,94,${0.25 + 0.45 * show})`}`,
      borderRadius: radius,
      padding: "15px 18px",
      background: bad ? `rgba(239,68,68,${0.05 * show})` : `rgba(34,197,94,${0.05 * show})`,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontFamily: mono, fontSize: 18, fontWeight: 600 }}>{name}</span>
      <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg }}>{args}</span>
      <div style={{ flex: 1 }} />
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          fontFamily: sans,
          fontSize: 16,
          fontWeight: 500,
          color: bad ? c.destructive : "#15803d",
          opacity: show,
        }}
      >
        <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          {bad ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M20 6L9 17l-5-5" />}
        </svg>
        {note}
      </span>
    </div>
  </div>
);

const Ghost: React.FC<{ label: string; enter: number; solid?: boolean }> = ({
  label,
  enter,
  solid,
}) => (
  <span
    style={{
      border: `1px solid ${solid ? c.amber : c.border}`,
      background: solid ? c.amber : "transparent",
      color: solid ? "#000" : c.foreground,
      borderRadius: 9,
      padding: "9px 20px",
      fontFamily: sans,
      fontSize: 16,
      fontWeight: solid ? 600 : 400,
      opacity: enter,
    }}
  >
    {label}
  </span>
);

const Step: React.FC<{ n: string; title: string; body: string }> = ({ n, title, body }) => (
  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
    <span
      style={{
        display: "flex",
        width: 30,
        height: 30,
        flex: "0 0 auto",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        background: "rgba(12,10,9,0.06)",
        fontFamily: mono,
        fontSize: 15,
        fontWeight: 600,
      }}
    >
      {n}
    </span>
    <div>
      <Text size={18} weight={600}>
        {title}
      </Text>
      <Text size={16} muted style={{ marginTop: 3, lineHeight: 1.55 }}>
        {body}
      </Text>
    </div>
  </div>
);

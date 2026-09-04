import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { Typed, useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";
import { useTone } from "../ui/tone";

/**
 * Tutorial 11 — Research missions.
 *
 * `/auto-research` — an autonomous optimization run that grows a hypothesis
 * tree, evaluates experiments in isolated worktrees, and merges only verified
 * gains (the capability card in `work-agent-settings-page.tsx`).
 *
 * One deliberate divergence: the engine's internal name is used throughout the
 * product's own copy and docs. The videos never say it. Do not "correct" this
 * back to the source string.
 *
 * The tree and the scores header come from
 * `sdk/agent-chat-react/src/components/missions/mission-research-tab.tsx`:
 * dotted-decimal node keys, a per-node status pill, the score with a delta, and
 * two score cards — "Dev (working)" and "Held-out test (authoritative)".
 */

/* Status tones, from statusToneClass. */
const TONE: Record<string, { fg: string; bg: string; strike?: boolean }> = {
  merged: { fg: "#059669", bg: "#0596691a" },
  done: { fg: "#0284c7", bg: "#0284c71a" },
  running: { fg: "#d97706", bg: "#d977061a" },
  failed: { fg: "#b42318", bg: "#b423181a" },
  pruned: { fg: "#7c6d67", bg: "#7c6d6714", strike: true },
};

/* ── step 1 · what a research run does ──────────────────────────── */

/**
 * From `work/tools/commands.md`: a research-kind mission — "an autonomous,
 * long-horizon optimization run that grows a hypothesis (Idea) tree, dispatches
 * experiments into isolated worktrees, and only merges an improvement after an
 * independently re-run held-out evaluation." A specialised variant of
 * `/mission`; every dispatched experiment runs as the `arbor-executor`
 * sub-agent.
 *
 * Editorial, because that sentence is the product and no screen states it.
 */
const RUN_DOES: [string, string][] = [
  ["Grows a hypothesis tree", "It proposes ideas, then proposes ideas from what the last ones taught it."],
  ["Runs each in its own worktree", "An isolated copy of the repo. Experiments cannot reach each other, or the trunk."],
  ["Re-runs a held-out evaluation", "Independently, on a split nothing was tuned against."],
  ["Merges only what verifiably won", "Everything else is pruned. The trunk only moves on proof."],
];

export const SceneResearchRun: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const head = useEnterAt(t(2), 12);
  const e = [
    useEnterAt(t(18), 12),
    useEnterAt(t(34), 12),
    useEnterAt(t(50), 12),
    useEnterAt(t(66), 12),
  ];
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 1520 }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: 34,
              opacity: head,
            }}
          >
            <div
              style={{
                fontFamily: mono,
                fontSize: 22,
                letterSpacing: "0.14em",
                color: c.amber,
              }}
            >
              /auto-research
            </div>
            <div
              style={{
                fontFamily: sans,
                fontSize: 34,
                fontWeight: 600,
                color: ink,
                marginTop: 14,
              }}
            >
              A research run that improves your agent for you
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {RUN_DOES.map(([head_, body], i) => (
              <div
                key={head_}
                style={{
                  display: "flex",
                  gap: 18,
                  padding: "24px 26px",
                  borderRadius: 15,
                  background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${light ? "rgba(12,10,9,0.08)" : "rgba(255,255,255,0.10)"}`,
                  opacity: e[i],
                  transform: `translateY(${(1 - e[i]) * 12}px)`,
                }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    background: `${c.amber}24`,
                    color: c.amber600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: sans,
                    fontSize: 17,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <div style={{ fontFamily: sans, fontSize: 24, fontWeight: 600, color: ink }}>
                    {head_}
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 18, color: dim, marginTop: 8, lineHeight: 1.5 }}>
                    {body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · the command, and what it must carry ───────────────── */

/**
 * `/auto-research` from `work/tools/commands.md`. Leading `key=value` tokens
 * configure the run — `repo=` is the only one required to create — and
 * everything after them is the objective, which **must** be followed by a
 * `Rubric:` block. A command without one is rejected outright with
 * "a research run needs a repo and a Rubric".
 *
 * `baseline=` and `baseline_test=` are the measured dev and held-out numbers;
 * the held-out one is the reference the merge gate compares against.
 */
const TOKENS: [string, string][] = [
  ["repo=", "The workspace repo the run operates on. Required."],
  ["max_iterations=", "How much rope the run gets."],
  ["baseline=", "The measured dev-split score it starts from."],
  ["baseline_test=", "The held-out baseline — what the merge gate compares against."],
];

export const SceneResearchRunCommand: React.FC = () => {
  const t = useTimeScale(5);
  const cmd = useEnterAt(t(3), 10);
  const rubric = useEnterAt(t(30), 10);
  const rows = [
    useEnterAt(t(48), 9),
    useEnterAt(t(56), 9),
    useEnterAt(t(64), 9),
    useEnterAt(t(72), 9),
  ];

  return (
    <Stage glow={{ x: 0.5, y: 0.43 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.44 } },
          { at: t(60), over: t(80), scale: 1.02, focus: { x: 0.5, y: 0.58 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1500} hot at={0} style={{ padding: "28px 32px 30px" }}>
            <div
              style={{
                border: `1px solid ${c.amber}`,
                background: "#fffdf7",
                borderRadius: 13,
                padding: "20px 22px",
                fontFamily: mono,
                fontSize: 18,
                lineHeight: 1.75,
                opacity: cmd,
              }}
            >
              <span style={{ color: c.amber600 }}>/auto-research</span>{" "}
              repo=/workspace/support-triage max_iterations=12
              <br />
              baseline=0.680 baseline_test=0.664
              <br />
              Raise the triage classifier&apos;s held-out F1.
              <div style={{ opacity: rubric, marginTop: 6 }}>
                <span style={{ color: c.amber600, fontWeight: 600 }}>Rubric:</span>{" "}
                <span style={{ color: c.mutedFg }}>
                  held-out F1 ≥ 0.80, no regression on latency.
                </span>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              {TOKENS.map(([token, body], i) => (
                <div
                  key={token}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 20,
                    padding: "9px 0",
                    opacity: rows[i],
                  }}
                >
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: 17,
                      color: c.amber600,
                      width: 200,
                    }}
                  >
                    {token}
                  </span>
                  {token === "repo=" ? (
                    <span
                      style={{
                        fontFamily: sans,
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: c.amber600,
                        background: `${c.amber}1f`,
                        borderRadius: 6,
                        padding: "3px 9px",
                      }}
                    >
                      required
                    </span>
                  ) : null}
                  <Text size={17} muted>
                    {body}
                  </Text>
                </div>
              ))}
            </div>

          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── step 2 · the hypothesis tree ───────────────────────────────── */

type Node = {
  at: number;
  key: string;
  depth: number;
  status: keyof typeof TONE;
  score: number | null;
  hypothesis: string;
};

const TREE: Node[] = [
  { at: 4, key: "ROOT", depth: 0, status: "done", score: 0.68, hypothesis: "Baseline — current prompt and skill" },
  { at: 18, key: "1", depth: 1, status: "running", score: null, hypothesis: "Add worked examples to the skill" },
  { at: 32, key: "2", depth: 1, status: "running", score: null, hypothesis: "Split intent detection from routing" },
  { at: 48, key: "1.1", depth: 2, status: "done", score: 0.712, hypothesis: "Three examples per intent class" },
  { at: 62, key: "1.2", depth: 2, status: "pruned", score: 0.641, hypothesis: "Ten examples — context crowded out the rules" },
  { at: 78, key: "2.1", depth: 2, status: "merged", score: 0.804, hypothesis: "Route after classifying, not during" },
  { at: 96, key: "2.2", depth: 2, status: "running", score: null, hypothesis: "Cache the classifier result per thread" },
];

export const SceneIdeaTree: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.97, focus: { x: 0.5, y: 0.46 } },
          { at: t(70), over: t(80), scale: 1.04, focus: { x: 0.5, y: 0.56 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1480} hot at={0} style={{ padding: "28px 34px 30px" }}>
            {TREE.map((n) => (
              <IdeaRow key={n.key} node={n} at={t(n.at)} frame={frame} t={t} />
            ))}
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const IdeaRow: React.FC<{
  node: Node;
  at: number;
  frame: number;
  t: (f: number) => number;
}> = ({ node, at, frame, t }) => {
  const e = useEnterAt(at, 9);
  if (e === 0) return null;

  // A node that lands running and later settles: the tree is alive, not a list.
  const settleAt = at + t(26);
  const settled = node.status !== "running" || frame < settleAt;
  const status = settled ? node.status : "done";
  const tone = TONE[status];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        borderBottom: `1px solid ${c.border}`,
        padding: "13px 0",
        paddingLeft: node.depth * 34,
        opacity: e,
        transform: `translateY(${(1 - e) * 8}px)`,
      }}
    >
      <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg, width: 62 }}>
        {node.key}
      </span>
      <span
        style={{
          borderRadius: 6,
          border: `1px solid ${tone.fg}4d`,
          background: tone.bg,
          color: tone.fg,
          padding: "4px 10px",
          fontFamily: mono,
          fontSize: 14,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          textDecoration: tone.strike ? "line-through" : "none",
          width: 92,
          textAlign: "center",
        }}
      >
        {status}
      </span>
      <span style={{ fontFamily: sans, fontSize: 18, width: 130 }}>
        {node.score !== null ? (
          <>
            {node.score.toFixed(3)}
            {node.score > 0.68 ? (
              <span style={{ color: "#059669" }}>
                {" "}
                +{(node.score - 0.68).toFixed(3)}
              </span>
            ) : (
              <span style={{ color: c.mutedFg }}>
                {" "}
                {(node.score - 0.68).toFixed(3)}
              </span>
            )}
          </>
        ) : (
          <span style={{ color: c.mutedFg }}>—</span>
        )}
      </span>
      <Text size={18} muted style={{ flex: 1 }}>
        {node.hypothesis}
      </Text>
    </div>
  );
};

/* ── step 3 · two scores, one of which counts ───────────────────── */

export const SceneHeldOut: React.FC = () => {
  const t = useTimeScale(5);
  const a = useEnterAt(t(4), 12);
  const b = useEnterAt(t(26), 12);
  const note = useEnterAt(t(58), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1400} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "Dev (working)", from: 0.68, to: 0.804, e: a, lit: false },
              { label: "Held-out test (authoritative)", from: 0.68, to: 0.781, e: b, lit: true },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  flex: 1,
                  border: `1px solid ${card.lit ? c.amber : c.border}`,
                  background: card.lit ? "#fffdf7" : c.card,
                  borderRadius: 13,
                  padding: "22px 24px",
                  opacity: card.e,
                  transform: `translateY(${(1 - card.e) * 10}px)`,
                }}
              >
                <Text size={16} muted>
                  {card.label}
                </Text>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 12 }}>
                  <span style={{ fontFamily: sans, fontSize: 26, color: c.mutedFg }}>
                    {card.from.toFixed(3)}
                  </span>
                  <span style={{ fontFamily: sans, fontSize: 20, color: c.mutedFg }}>→</span>
                  <span style={{ fontFamily: sans, fontSize: 38, fontWeight: 700 }}>
                    {card.to.toFixed(3)}
                  </span>
                  <span style={{ fontFamily: sans, fontSize: 20, color: "#059669", fontWeight: 500 }}>
                    +{(card.to - card.from).toFixed(3)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: 18,
              marginTop: 24,
              padding: "20px 24px",
              borderRadius: 13,
              border: `1px solid ${c.amber}59`,
              background: `${c.amber}14`,
              opacity: note,
            }}
          >
            <Text size={19} style={{ lineHeight: 1.55 }}>
              The working score is what it optimises against. The held-out score
              is the one it never trained on — and the only one that tells you
              the gain is real.
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 4 · only verified gains come back ─────────────────────── */

export const SceneMergeVerified: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const e = [useEnterAt(t(4), 12), useEnterAt(t(28), 12), useEnterAt(t(52), 12)];
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 1500 }}>
          {[
            {
              head: "Every experiment runs in its own worktree",
              body: "Nothing an idea does can touch the trunk, or another idea.",
              tone: c.amber,
            },
            {
              head: "Losers are pruned",
              body: "1.2 scored below baseline. It is struck through and left behind — the run does not carry it forward.",
              tone: "#7c6d67",
            },
            {
              head: "Only a verified gain is merged",
              body: "2.1 beat the baseline on the held-out set, so it becomes the new trunk. That is the whole loop.",
              tone: "#059669",
            },
          ].map((row, i) => (
            <div
              key={row.head}
              style={{
                display: "flex",
                gap: 22,
                padding: "24px 28px",
                marginBottom: 14,
                borderRadius: 15,
                background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${row.tone}59`,
                opacity: e[i],
                transform: `translateY(${(1 - e[i]) * 12}px)`,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: row.tone,
                  marginTop: 10,
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontFamily: sans, fontSize: 26, fontWeight: 600, color: ink }}>
                  {row.head}
                </div>
                <div style={{ fontFamily: sans, fontSize: 19, color: dim, marginTop: 8, lineHeight: 1.5 }}>
                  {row.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

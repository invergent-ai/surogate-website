import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 26 — Distill a smaller, cheaper model.
 *
 * Same discipline as 25: one job, followed end to end. The support agent runs
 * on an 8B that answers well and costs what an 8B costs; by the last shot it is
 * running a 1.7B that answers the same way. Every screen follows from the one
 * before it and the numbers carry through — 12,000 rows, 24.6M tokens, top-K
 * 64, 9.4 GB of sidecars.
 *
 * Screens come from `new-run-page.tsx`, `distillation-controls.tsx` (the
 * TOP-K & STORAGE table and the DISTILLATION LOSS card, shared verbatim between
 * the create form and the run's Config tab), `training-tab.tsx`,
 * `performance-tab.tsx` and `deploy-model-page.tsx`.
 */

const GREEN = "#22C55E";
const BLUE = "#3B82F6";

/** The worked example, in one place so every shot stays consistent. */
const RUN = "support-distill-001";
const TEACHER = "Qwen/Qwen3-8B-Instruct";
const STUDENT = "Qwen/Qwen3-1.7B";
const DATA = "support-conversations";

/* ── the job ────────────────────────────────────────────────────── */

/**
 * The Performance tab of the model the agent is on today
 * (`performance-tab.tsx` — Tokens/sec, Avg Latency, Requests, Success Rate).
 *
 * The agent is not wrong, it is expensive. That is a different problem from the
 * one video 25 solved, and it needs a different tool.
 */
export const SceneDistillProblem: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 12);
  const kpis = [
    useEnterAt(t(16), 10),
    useEnterAt(t(24), 10),
    useEnterAt(t(32), 10),
    useEnterAt(t(40), 10),
  ];
  const goal = useEnterAt(t(72), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1460} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, opacity: head }}>
            <Heading size={25}>{TEACHER}</Heading>
            <div style={{ flex: 1 }} />
            <Text size={15} muted>
              Last 30d
            </Text>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            {[
              ["Tokens/sec", "41.6", GREEN],
              ["Avg Latency", "3820ms", BLUE],
              ["Requests", "128,904", "#F59E0B"],
              ["Success Rate", "99.7%", GREEN],
            ].map(([label, value, color], i) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  border: `1px solid ${c.border}`,
                  borderRadius: 10,
                  padding: "13px 16px",
                  opacity: kpis[i],
                }}
              >
                <Text size={13} muted style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {label}
                </Text>
                <div style={{ fontFamily: sans, fontSize: 26, fontWeight: 700, marginTop: 4, color }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 22,
              paddingTop: 20,
              borderTop: `1px solid ${c.border}`,
              opacity: goal,
            }}
          >
            <Text size={19} weight={600} style={{ flex: "0 0 auto" }}>
              The job
            </Text>
            <Text size={19} muted style={{ lineHeight: 1.5 }}>
              Nothing here is wrong. It is just an 8B answering questions a 1.7B
              could answer — if the 1.7B knew what the 8B knows.
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 1 · the method ────────────────────────────────────────── */

const METHODS: {
  title: string;
  tag: string;
  blurb: string;
  points: string[];
  badge?: string;
  icon: React.ReactNode;
  amber?: boolean;
}[] = [
  {
    title: "Supervised Fine-Tune",
    tag: "SFT",
    blurb:
      "Train a base model directly on labelled examples. The workhorse for teaching format, tone, and task behaviour.",
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
    blurb:
      "Teach the model to prefer a chosen response over a rejected one — direct preference optimization, no reward model or rollouts.",
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
    blurb:
      "Optimise a policy against a reward signal or verifiable environment. Best for reasoning and tool-use gains.",
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
    blurb:
      "Transfer a large teacher's probability distribution into a smaller, cheaper student — richer signal than hard labels alone.",
    points: [
      "Teacher → student pairing (same tokenizer)",
      "Offline top-K logit capture",
      "Combined CE + KL loss",
    ],
    icon: (
      <>
        <path d="m21 16-4 4-4-4M17 20V4" />
        <path d="M3 8l4-4 4 4M7 4v16" />
      </>
    ),
  },
];

export const SceneDistillMethod: React.FC = () => {
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
              const on = m.tag === "DISTILL" ? chosen : 0;
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
                Knowledge Distillation
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

/* ── step 2 · who teaches whom ──────────────────────────────────── */

/**
 * The distillation branch of the configure step.
 *
 * The thing worth pausing on is that **Base model is the student**: the small
 * model being trained. The teacher is a separate field, and its hint carries
 * the constraint that catches people out — "Must share the student's tokenizer
 * (same model family, e.g. Qwen3-1.7B → Qwen3-0.6B)" — plus the fact that
 * shapes the rest of the video: it is "captured once over the dataset before
 * training".
 */
export const SceneDistillPair: React.FC = () => {
  const t = useTimeScale(8);
  const name = useEnterAt(t(3), 12);
  const exp = useEnterAt(t(24), 12);
  const student = useEnterAt(t(46), 12);
  const teacher = useEnterAt(t(76), 12);
  const data = useEnterAt(t(110), 12);
  const note = useEnterAt(t(140), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "26px 34px 28px" }}>
          <Field label="Run name" required hint="Lowercase, hyphens. Names the run and its output model." enter={name}>
            <Box value={RUN} />
          </Field>

          <Field label="Experiment" required enter={exp}>
            <Box value="support-cost" select />
          </Field>

          {/* the student is the base model — the small one being trained */}
          <Field label="Base model" required enter={student}>
            <Box value={STUDENT} note="— the student" select />
          </Field>

          <Field
            label="Teacher model"
            required
            hint="Captured once over the dataset before training. Must share the student's tokenizer (same model family, e.g. Qwen3-1.7B → Qwen3-0.6B)."
            enter={teacher}
          >
            <Box value={TEACHER} select />
          </Field>

          <Field label="Dataset" required enter={data}>
            <Box value={DATA} note="(12,000 samples)" select />
          </Field>

          <Text size={16} muted style={{ marginTop: 14, lineHeight: 1.55, opacity: note }}>
            Same family, so the same tokenizer — which is what lets the
            student&apos;s logits be compared to the teacher&apos;s at all.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · how much of the teacher to keep ───────────────────── */

/**
 * `KdTopKStorageCard` from `distillation-controls.tsx`, shared verbatim between
 * the create form and the run's Config tab.
 *
 * The table is the argument: a sidecar stores K uint32 ids + K fp16 logprobs =
 * 6·K bytes per token, so the choice is literally a disk bill. 64 carries the
 * RECOMMENDED tag; the THIS DATASET column only appears once the form knows how
 * many tokens it is about to capture.
 */
const TOP_K: [number, string, string, string, string][] = [
  [32, "192 B", "19.2 GB", "192 GB", "4.7 GB"],
  [64, "384 B", "38.4 GB", "384 GB", "9.4 GB"],
  [128, "768 B", "76.8 GB", "768 GB", "18.9 GB"],
];

export const SceneDistillTopK: React.FC = () => {
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const cols = useEnterAt(t(16), 10);
  const rows = [useEnterAt(t(28), 10), useEnterAt(t(38), 10), useEnterAt(t(48), 10)];
  const pick = useEnterAt(t(72), 12);
  const tip = useEnterAt(t(104), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1560} hot at={0} style={{ padding: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
              padding: "18px 24px",
              borderBottom: `1px solid ${c.border}`,
              opacity: head,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 34,
                height: 34,
                flex: "0 0 auto",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                background: `${c.amber}1a`,
              }}
            >
              <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={c.amber600} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="m7.5 4.27 9 5.15" />
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
              </svg>
            </span>
            <div>
              <Text size={16} weight={600} style={{ letterSpacing: "0.08em" }}>
                TOP-K &amp; STORAGE
              </Text>
              <Text size={16} muted style={{ marginTop: 2 }}>
                How much of the teacher distribution is preserved per token.
                Baked into the sidecars at capture time.
              </Text>
            </div>
          </div>

          <div style={{ padding: "18px 24px 22px" }}>
            <Text size={13} weight={600} style={{ letterSpacing: "0.08em", color: "rgba(124,109,103,0.8)", marginBottom: 10, opacity: cols }}>
              TOP_K · LOGPROBS STORED PER TOKEN
            </Text>

            <div style={{ display: "flex", padding: "0 10px 8px", opacity: cols }}>
              {["TOP_K", "BYTES / TOKEN", "100M TOKENS", "1B TOKENS", "THIS DATASET (24.6M)"].map(
                (h, i) => (
                  <span
                    key={h}
                    style={{
                      flex: i === 0 ? 1.4 : i === 4 ? 1.4 : 1,
                      fontFamily: sans,
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "rgba(124,109,103,0.7)",
                      textAlign: i === 0 ? "left" : "right",
                    }}
                  >
                    {h}
                  </span>
                ),
              )}
            </div>

            {TOP_K.map(([k, bytes, m100, b1, mine], i) => {
              const on = k === 64 ? pick : 0;
              return (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 9,
                    padding: "12px 10px",
                    background: `rgba(245,158,11,${0.1 * on})`,
                    opacity: rows[i],
                  }}
                >
                  <span style={{ flex: 1.4, display: "flex", alignItems: "center", gap: 11 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: on ? c.amber : "rgba(124,109,103,0.4)",
                      }}
                    />
                    <span style={{ fontFamily: sans, fontSize: 18, fontWeight: 500 }}>{k}</span>
                    {k === 64 ? (
                      <span
                        style={{
                          fontFamily: sans,
                          fontSize: 13,
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          color: "#b45309",
                          opacity: on,
                        }}
                      >
                        · RECOMMENDED
                      </span>
                    ) : null}
                  </span>
                  {[bytes, m100, b1].map((v) => (
                    <span
                      key={v}
                      style={{
                        flex: 1,
                        textAlign: "right",
                        fontFamily: sans,
                        fontSize: 17,
                        color: on ? c.foreground : c.mutedFg,
                      }}
                    >
                      {v}
                    </span>
                  ))}
                  <span
                    style={{
                      flex: 1.4,
                      textAlign: "right",
                      fontFamily: sans,
                      fontSize: 17,
                      fontWeight: on ? 700 : 400,
                      color: on ? "#b45309" : c.mutedFg,
                    }}
                  >
                    {mine}
                  </span>
                </div>
              );
            })}

            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                border: `1px solid ${c.border}`,
                background: "rgba(12,10,9,0.025)",
                borderRadius: 10,
                padding: "13px 16px",
                marginTop: 14,
                opacity: tip,
              }}
            >
              <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={c.amber600} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 3, flex: "0 0 auto" }}>
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6M10 22h4" />
              </svg>
              <Text size={16} muted style={{ lineHeight: 1.55 }}>
                <strong style={{ color: c.foreground }}>32</strong> captures the
                bulk of the mass for a confident teacher;{" "}
                <strong style={{ color: c.foreground }}>64</strong> is the
                default trade-off; go to{" "}
                <strong style={{ color: c.foreground }}>128</strong> for
                high-entropy targets or temperatures above 1.5.
              </Text>
            </div>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 4 · what it is actually optimising ────────────────────── */

/**
 * `KdLossCard`. The header states the objective outright —
 * `L = ce_weight·CE + kd_weight·τ²·KL(teacher ‖ student)`, per valid token —
 * and the two rows below it are the only things you set.
 *
 * The weight-mix bar and the resolved objective are the same numbers twice on
 * purpose: one to feel, one to read.
 */
export const SceneDistillLoss: React.FC = () => {
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const ce = useEnterAt(t(18), 12);
  const kd = useEnterAt(t(40), 12);
  const mix = useEnterAt(t(70), 14);
  const tau = useEnterAt(t(100), 12);
  const resolved = useEnterAt(t(122), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1560} hot at={0} style={{ padding: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
              padding: "18px 24px",
              borderBottom: `1px solid ${c.border}`,
              opacity: head,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 34,
                height: 34,
                flex: "0 0 auto",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                background: "rgba(12,10,9,0.05)",
              }}
            >
              <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={c.foreground} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
              </svg>
            </span>
            <div style={{ flex: 1 }}>
              <Text size={16} weight={600} style={{ letterSpacing: "0.08em" }}>
                DISTILLATION LOSS
              </Text>
              <Text size={16} muted style={{ marginTop: 2, fontFamily: mono }}>
                L = ce_weight·CE + kd_weight·τ²·KL(teacher ‖ student), per valid
                token.
              </Text>
            </div>
            <span
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 9,
                padding: "8px 15px",
                fontFamily: sans,
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Pure distillation
            </span>
          </div>

          <div style={{ padding: "18px 24px 22px" }}>
            <LossRow
              label="Cross-Entropy"
              tag="ce_weight"
              blurb="Standard hard-label loss on the ground-truth token (temperature 1)"
              weight={0.3}
              color={c.amber}
              enter={ce}
            />
            <div style={{ height: 16 }} />
            <LossRow
              label="KD · KL divergence"
              tag="kd_weight"
              blurb="τ²-scaled KL pulling the student toward the teacher's stored top-K distribution"
              weight={0.7}
              color={BLUE}
              enter={kd}
            />

            <div style={{ marginTop: 20, opacity: mix }}>
              <Text size={13} weight={600} style={{ letterSpacing: "0.08em", color: "rgba(124,109,103,0.8)", marginBottom: 8 }}>
                WEIGHT MIX
              </Text>
              <div style={{ display: "flex", height: 9, borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${30 * mix}%`, background: c.amber }} />
                <div style={{ width: `${70 * mix}%`, background: BLUE }} />
                <div style={{ flex: 1, background: "rgba(12,10,9,0.06)" }} />
              </div>
              <div style={{ display: "flex", gap: 24, marginTop: 9 }}>
                {[
                  ["CE · 0.30", c.amber],
                  ["KD (KL) · 0.70", BLUE],
                ].map(([label, color]) => (
                  <span key={label} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <span style={{ width: 11, height: 11, borderRadius: 3, background: color }} />
                    <Text size={15} muted>
                      {label}
                    </Text>
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
              <div style={{ opacity: tau }}>
                <Text size={13} weight={600} style={{ letterSpacing: "0.08em", color: "rgba(124,109,103,0.8)", marginBottom: 8 }}>
                  TEMPERATURE τ
                </Text>
                <Box value="1.5" />
                <Text size={15} muted style={{ marginTop: 8, lineHeight: 1.5 }}>
                  1.0 matches the teacher as-is; 1.5–2.0 softens for more
                  &ldquo;dark knowledge.&rdquo;
                </Text>
              </div>
              <div style={{ opacity: resolved }}>
                <Text size={13} weight={600} style={{ letterSpacing: "0.08em", color: "rgba(124,109,103,0.8)", marginBottom: 8 }}>
                  RESOLVED OBJECTIVE
                </Text>
                <div
                  style={{
                    border: `1px solid ${c.border}`,
                    background: "rgba(12,10,9,0.03)",
                    borderRadius: 9,
                    padding: "11px 15px",
                    fontFamily: mono,
                    fontSize: 17,
                  }}
                >
                  0.30·CE + 0.70·τ²KL
                </div>
                <Text size={15} muted style={{ marginTop: 8, lineHeight: 1.5 }}>
                  The trainer defaults ce_weight to{" "}
                  <span style={{ fontFamily: mono }}>1 − kd_weight</span>; this
                  form always sends both.
                </Text>
              </div>
            </div>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const LossRow: React.FC<{
  label: string;
  tag: string;
  blurb: string;
  weight: number;
  color: string;
  enter: number;
}> = ({ label, tag, blurb, weight, color, enter }) => (
  <div style={{ opacity: enter }}>
    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
      <div
        style={{
          width: 38,
          height: 21,
          borderRadius: 999,
          background: color,
          position: "relative",
          flex: "0 0 auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2.5,
            left: 19.5,
            width: 16,
            height: 16,
            borderRadius: 999,
            background: "#fff",
          }}
        />
      </div>
      <Text size={18} weight={600}>
        {label}
      </Text>
      <span style={{ fontFamily: mono, fontSize: 14, color: c.mutedFg }}>{tag}</span>
      <div style={{ flex: 1 }} />
      <span style={{ fontFamily: mono, fontSize: 18, fontWeight: 700, color }}>
        {weight.toFixed(2)}
      </span>
    </div>
    <Text size={15} muted style={{ marginTop: 5, marginLeft: 51, lineHeight: 1.5 }}>
      {blurb}
    </Text>
    {/* the slider each row carries */}
    <div style={{ marginLeft: 51, marginTop: 9, height: 5, borderRadius: 999, background: "rgba(12,10,9,0.08)" }}>
      <div style={{ width: `${weight * 100}%`, height: 5, borderRadius: 999, background: color }} />
    </div>
  </div>
);

/* ── step 5 · watch it converge ─────────────────────────────────── */

const trainLoss = (i: number, n: number) => {
  const x = i / (n - 1);
  return 0.24 + 1.46 * Math.exp(-3.1 * x) + 0.03 * Math.sin(i / 1.7) * (1 - x);
};
const evalLoss = (i: number, n: number) => {
  const x = i / (n - 1);
  return 0.31 + 1.38 * Math.exp(-2.7 * x) + 0.02 * Math.sin(i / 2.3) * (1 - x);
};
const gradNorm = (i: number, n: number) => {
  const x = i / (n - 1);
  return 0.28 + 0.85 * Math.exp(-1.5 * x) + 0.09 * Math.sin(i / 1.1);
};

/**
 * The SFT run surface — distillation trains through the same trainer, so the
 * Overview is `training-tab.tsx`: four KPIs over Training Loss, Gradient Norm
 * and Evaluation Loss.
 */
export const SceneDistillCurve: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(6);
  const tabs = useEnterAt(t(2), 7);
  const kpis = useEnterAt(t(7), 7);
  const charts = [useEnterAt(t(12), 7), useEnterAt(t(16), 7), useEnterAt(t(20), 7)];
  const note = useEnterAt(t(96), 10);

  /* The curves are a check, not a wait: they draw in the first half and the
     rest of the shot holds on the numbers they land on. */
  const n = 48;
  const drawn = interpolate(frame, [t(16), t(80)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shown = Math.max(2, Math.round(n * drawn));

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1620} hot at={0} style={{ padding: "24px 30px 24px" }}>
          <div style={{ display: "flex", gap: 26, paddingBottom: 12, borderBottom: `1px solid ${c.border}`, opacity: tabs }}>
            {["Overview", "Configuration", "Datasets", "Checkpoints", "Lineage", "Repository"].map(
              (tab, i) => (
                <span
                  key={tab}
                  style={{
                    fontFamily: sans,
                    fontSize: 18,
                    fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? c.foreground : c.mutedFg,
                    borderBottom: i === 0 ? `2px solid ${c.amber}` : "2px solid transparent",
                    paddingBottom: 12,
                    marginBottom: -13,
                  }}
                >
                  {tab}
                </span>
              ),
            )}
          </div>

          <div style={{ display: "flex", gap: 11, marginTop: 18, opacity: kpis }}>
            {[
              ["Last Train Loss", trainLoss(shown - 1, n).toFixed(4)],
              ["Last Eval Loss", evalLoss(shown - 1, n).toFixed(4)],
              ["Step", (shown * 24).toLocaleString()],
              ["TPS", "6.4k"],
            ].map(([label, value]) => (
              <div key={label} style={{ flex: 1, border: `1px solid ${c.border}`, borderRadius: 9, padding: "11px 15px" }}>
                <Text size={13} muted style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {label}
                </Text>
                <div style={{ fontFamily: sans, fontSize: 25, fontWeight: 700, marginTop: 4 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 14 }}>
            <Chart title="Training Loss" color={c.amber} f={trainLoss} n={n} shown={shown} enter={charts[0]} />
            <Chart title="Gradient Norm" color="#8B5CF6" f={gradNorm} n={n} shown={shown} enter={charts[1]} />
            <Chart title="Evaluation Loss" color={BLUE} f={evalLoss} n={n} shown={shown} enter={charts[2]} />
          </div>

          <Text size={16} muted style={{ marginTop: 12, lineHeight: 1.5, opacity: note }}>
            Eval loss tracking train loss means the student is learning the
            teacher, not memorising the rows.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const Chart: React.FC<{
  title: string;
  color: string;
  f: (i: number, n: number) => number;
  n: number;
  shown: number;
  enter: number;
}> = ({ title, color, f, n, shown, enter }) => {
  const w = 700;
  const h = 96;
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
  const gradId = `kd-${title.replace(/\s+/g, "-")}`;

  return (
    <div style={{ border: `1px solid ${c.border}`, borderRadius: 11, padding: "11px 15px 6px", opacity: enter }}>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <Text size={16} weight={600} style={{ flex: 1 }}>
          {title}
        </Text>
        <span style={{ fontFamily: mono, fontSize: 16, color, fontWeight: 700 }}>
          {f(shown - 1, n).toFixed(title === "Gradient Norm" ? 2 : 4)}
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h + 22}`} style={{ width: "100%", height: 118, marginTop: 6 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.6} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {[hi, lo].map((v) => (
          <text key={v} x={gutter - 8} y={y(v) + 4} textAnchor="end" style={{ fontSize: 12, fill: c.mutedFg, fillOpacity: 0.6, fontFamily: sans }}>
            {v.toFixed(2)}
          </text>
        ))}
        <path d={area} fill={`url(#${gradId})`} />
        <path d={line} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        {[
          [gutter, "0", "start"],
          [gutter + plot / 2, "576", "middle"],
          [gutter + plot, "1,152", "end"],
        ].map(([x, label, anchor]) => (
          <text key={label as string} x={x as number} y={h + 17} textAnchor={anchor as string} style={{ fontSize: 12, fill: c.mutedFg, fillOpacity: 0.6, fontFamily: sans }}>
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
};

/* ── the payoff ─────────────────────────────────────────────────── */

/**
 * The same Performance tab the film opened on, on the distilled student.
 *
 * Latency and throughput are the numbers the job was about, so they are the
 * numbers the film closes on — beside the teacher's, because a smaller model is
 * only good news if it still answers.
 */
export const SceneDistillPayoff: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 12);
  const rows = [useEnterAt(t(18), 12), useEnterAt(t(34), 12), useEnterAt(t(50), 12)];
  const note = useEnterAt(t(80), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1460} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ display: "flex", opacity: head, paddingBottom: 12, borderBottom: `1px solid ${c.border}` }}>
            <span style={{ flex: 1.4 }} />
            <span style={{ flex: 1, textAlign: "right", fontFamily: sans, fontSize: 15, color: c.mutedFg }}>
              Teacher · 8B
            </span>
            <span style={{ flex: 1, textAlign: "right", fontFamily: sans, fontSize: 15, fontWeight: 600, color: c.amber600 }}>
              Student · 1.7B
            </span>
          </div>

          {[
            ["Avg Latency", "3820ms", "1140ms"],
            ["Tokens/sec", "41.6", "138.2"],
            ["Success Rate", "99.7%", "99.5%"],
          ].map(([label, before, after], i) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "baseline",
                padding: "16px 0",
                borderBottom: `1px solid ${c.border}`,
                opacity: rows[i],
              }}
            >
              <span style={{ flex: 1.4, fontFamily: sans, fontSize: 18 }}>{label}</span>
              <span style={{ flex: 1, textAlign: "right", fontFamily: sans, fontSize: 20, color: c.mutedFg }}>
                {before}
              </span>
              <span
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontFamily: sans,
                  fontSize: 24,
                  fontWeight: 700,
                  color: i === 2 ? c.foreground : GREEN,
                }}
              >
                {after}
              </span>
            </div>
          ))}

          <Text size={18} muted style={{ marginTop: 20, lineHeight: 1.55, opacity: note }}>
            A quarter the size, three times the throughput, and it still answers
            like the model that taught it.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── shared chrome ──────────────────────────────────────────────── */

const Field: React.FC<{
  label: string;
  hint?: string;
  required?: boolean;
  enter: number;
  children: React.ReactNode;
}> = ({ label, hint, required, enter, children }) => (
  <div style={{ marginTop: 15, opacity: enter }}>
    <Text size={16} weight={500} style={{ marginBottom: 7 }}>
      {label}
      {required ? <span style={{ color: c.destructive }}> *</span> : null}
    </Text>
    {children}
    {hint ? (
      <Text size={15} muted style={{ marginTop: 6, lineHeight: 1.5 }}>
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
      {note ? <span style={{ color: "rgba(124,109,103,0.6)", fontSize: 15 }}> {note}</span> : null}
    </span>
    {select ? (
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2.4}>
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : null}
  </div>
);

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, PanelHead, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * Evaluation.
 *
 * Pick benchmarks, run them, read the result. Two screens: the browser, where
 * two benchmarks tick, and the report.
 *
 * MT-Bench and IFEval are the apt pair for an agent that writes — conversation
 * quality and instruction-following — and both are real entries in the
 * catalogue, with the product's own one-line descriptions and sample counts.
 *
 * The report is the payoff of the whole film: this is where "we trained a model
 * on our own chats" turns into a number that moved.
 */

const CATALOGUE = [
  {
    name: "MT-Bench",
    cat: "Chat",
    desc: "Multi-turn conversation quality across 8 categories, rated 1–10 by a judge.",
    samples: "80 samples",
    pick: true,
  },
  {
    name: "IFEval",
    cat: "Instruction",
    desc: "Instruction-following precision — format, length, keyword and structural constraints.",
    samples: "541 samples",
    pick: true,
  },
  {
    name: "TruthfulQA",
    cat: "Knowledge",
    desc: "Resistance to common misconceptions and imitative falsehoods.",
    samples: "817 samples",
    pick: false,
  },
  {
    name: "MMLU",
    cat: "Knowledge",
    desc: "Multitask accuracy across 57 subjects.",
    samples: "14,042 samples",
    pick: false,
  },
] as const;

const CATEGORIES = [
  ["writing", 94, 78],
  ["extraction", 91, 80],
  ["roleplay", 88, 72],
  ["reasoning", 79, 74],
  ["stem", 76, 73],
] as const;

const AUTHORED = 7;
/** The browser hands over to the report here. */
const SWAP = 74;

export const SceneEval: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const swap = t(SWAP);

  const hand = interpolate(frame, [swap, swap + t(20)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = hand < 0.5 ? 2 * hand * hand : 1 - Math.pow(-2 * hand + 2, 2) / 2;
  // Same pass as the create beat: one screen is gone before the next is legible.
  const outOpacity = Math.max(0, 1 - eased * 2.1);
  const inOpacity = Math.max(0, (eased - 0.5) / 0.5);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.95, focus: { x: 0.5, y: 0.5 } },
          { at: t(26), over: t(26), scale: 1.04, focus: { x: 0.5, y: 0.5 } },
          { at: swap, over: t(24), scale: 0.94, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        {/* ── the catalogue ──────────────────────────────────── */}
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: outOpacity,
            transform: `translateX(${-eased * 1080}px)`,
          }}
        >
          <Panel width={940} hot at={0} style={{ padding: "26px 32px 22px" }}>
            <Heading size={26}>Browse benchmarks</Heading>
            <Text size={16} muted style={{ marginTop: 8, marginBottom: 20 }}>
              9 categories · 40 public benchmarks · run one or more as a batch.
            </Text>
            {CATALOGUE.map((b, i) => (
              <BenchmarkRow
                key={b.name}
                bench={b}
                at={t(6 + i * 5)}
                checked={b.pick && frame >= t(b.name === "MT-Bench" ? 38 : 48)}
              />
            ))}
            <RunButton at={t(56)} live={frame >= t(48)} />
          </Panel>
        </AbsoluteFill>

        {/* ── the report ─────────────────────────────────────── */}
        {inOpacity > 0 ? (
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "center",
              opacity: inOpacity,
              transform: `translateX(${(1 - eased) * 1080}px)`,
            }}
          >
            <Report start={swap} t={t} />
          </AbsoluteFill>
        ) : null}
      </Camera>
    </Stage>
  );
};

/**
 * The report, as the product renders a completed A/B run.
 *
 * Four stat tiles — the tuned model's pass rate, the base's, the drift between
 * them and how many categories improved — then the verdict banner, then the
 * per-category breakdown. Labels are the app's own ("Pass-rate drift",
 * "Categories improved", "vs base"), not invented ones.
 */
const Report: React.FC<{ start: number; t: (f: number) => number }> = ({
  start,
  t,
}) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [start + t(10), start + t(52)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tuned = 91.4;
  const base = 83.5;
  const won = CATEGORIES.filter(([, a, b]) => a > b).length;

  return (
    <Panel width={1120} hot at={start}>
      <PanelHead
        right={
          <Pill tone="success" style={{ fontSize: 15, padding: "6px 14px" }}>
            Completed
          </Pill>
        }
      >
        <Heading size={24}>northwind-sft-001 · MT-Bench + IFEval</Heading>
      </PanelHead>

      <div style={{ display: "flex", gap: 12, padding: "22px 30px 0" }}>
        <StatTile
          at={start + t(12)}
          value={`${(tuned * draw).toFixed(1)}%`}
          label="Fine-tuned"
          sub="567/620 passed"
        />
        <StatTile
          at={start + t(15)}
          value={`${base.toFixed(1)}%`}
          label="Base"
          sub="518/620 base"
        />
        <StatTile
          at={start + t(18)}
          value={`+${((tuned - base) * draw).toFixed(1)} pp`}
          label="Pass-rate drift"
          sub="fine-tune wins"
          tone="good"
        />
        <StatTile
          at={start + t(21)}
          value={`${won}/${CATEGORIES.length}`}
          label="Categories improved"
          sub={`${CATEGORIES.length - won} unchanged`}
        />
      </div>

      {/* The verdict, in the product's own words. */}
      <div style={{ padding: "16px 30px 0" }}>
        <div
          style={{
            background: c.green50,
            border: "1px solid rgba(34,197,94,0.35)",
            borderRadius: radius,
            padding: "15px 20px",
            opacity: useSpringAt(start + t(26)),
          }}
        >
          <Text size={18} weight={600} style={{ color: c.green700 }}>
            Fine-tuned wins on {won} of {CATEGORIES.length} categories.
          </Text>
          <Text size={16} style={{ color: c.green700, marginTop: 4, opacity: 0.85 }}>
            +{(tuned - base).toFixed(1)} pp pass rate · no regressions vs base.
          </Text>
        </div>
      </div>

      <div style={{ padding: "20px 30px 28px" }}>
        <Text size={16} muted style={{ marginBottom: 14 }}>
          Benchmark breakdown · by category
        </Text>
        {CATEGORIES.map(([name, tunedPct, basePct], i) => (
          <CategoryBar
            key={name}
            name={name}
            tuned={tunedPct}
            base={basePct}
            draw={draw}
            at={start + t(28 + i * 4)}
          />
        ))}
      </div>
    </Panel>
  );
};

const StatTile: React.FC<{
  at: number;
  value: string;
  label: string;
  sub: string;
  tone?: "good";
}> = ({ at, value, label, sub, tone }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        flex: 1,
        border: `1px solid ${c.border}`,
        borderRadius: radius,
        padding: "16px 18px",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
      }}
    >
      <div
        style={{
          fontFamily: sans,
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: tone === "good" ? c.green700 : c.foreground,
        }}
      >
        {value}
      </div>
      <Text size={16} weight={500} style={{ marginTop: 6 }}>
        {label}
      </Text>
      <Text size={14} muted style={{ marginTop: 3 }}>
        {sub}
      </Text>
    </div>
  );
};

/**
 * One category's pass rate, with a tick where the base model sat.
 *
 * A ghost fill behind the bar disappears the moment the tuned score passes it —
 * which is always — so the comparison vanished exactly when it mattered. A tick
 * stays.
 */
const CategoryBar: React.FC<{
  name: string;
  tuned: number;
  base: number;
  draw: number;
  at: number;
}> = ({ name, tuned, base, draw, at }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        marginBottom: 12,
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [-16, 0])}px)`,
      }}
    >
      <span style={{ fontFamily: mono, fontSize: 16, width: 130, color: c.mutedFg }}>
        {name}
      </span>
      <div
        style={{
          flex: 1,
          position: "relative",
          height: 9,
          borderRadius: 999,
          background: "#e3dedc",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${tuned * draw}%`,
            background: c.amber,
            borderRadius: 999,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${base}%`,
            width: 2,
            background: "rgba(12,10,9,0.45)",
          }}
        />
      </div>
      <span style={{ fontFamily: mono, fontSize: 16, width: 54, textAlign: "right" }}>
        {Math.round(tuned * draw)}
      </span>
      <span style={{ fontFamily: mono, fontSize: 16, color: c.green700, width: 46 }}>
        +{tuned - base}
      </span>
    </div>
  );
};

const BenchmarkRow: React.FC<{
  bench: (typeof CATALOGUE)[number];
  at: number;
  checked: boolean;
}> = ({ bench, at, checked }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "14px 16px",
        marginBottom: 8,
        borderRadius: radius,
        background: checked ? c.amber50 : "transparent",
        border: `1px solid ${checked ? "rgba(245,158,11,0.4)" : "transparent"}`,
        borderBottom: checked ? undefined : `1px solid ${c.border}`,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          flexShrink: 0,
          background: checked ? c.amber : c.card,
          border: `1px solid ${checked ? c.amber : c.border}`,
          color: "#3b2a06",
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked ? "✓" : ""}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Text size={19} weight={500}>
            {bench.name}
          </Text>
          <span
            style={{
              fontFamily: sans,
              fontSize: 14,
              color: c.mutedFg,
              background: c.muted,
              borderRadius: 999,
              padding: "3px 10px",
            }}
          >
            {bench.cat}
          </span>
        </div>
        <Text size={15} muted style={{ marginTop: 4 }}>
          {bench.desc}
        </Text>
      </div>
      <Text size={15} muted>
        {bench.samples}
      </Text>
    </div>
  );
};

const RunButton: React.FC<{ at: number; live: boolean }> = ({ at, live }) => {
  const s = useSpringAt(at);
  return (
    <div style={{ marginTop: 14, opacity: s }}>
      <span
        style={{
          display: "inline-flex",
          background: live ? c.amber : c.muted,
          color: live ? "#3b2a06" : c.mutedFg,
          fontFamily: sans,
          fontSize: 19,
          fontWeight: 600,
          padding: "13px 24px",
          borderRadius: radius,
          boxShadow: live ? "0 0 30px rgba(245,158,11,0.35)" : undefined,
        }}
      >
        Run 2 benchmarks
      </span>
    </div>
  );
};

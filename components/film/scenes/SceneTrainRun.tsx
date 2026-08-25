import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * A training run, as the product shows it.
 *
 * Rebuilt from the real run detail: the method chip and status pill beside the
 * run name, the configuration line under it, the action row, the tab strip, the
 * completion banner, four stat tiles, then the charts.
 *
 * Which charts depends on the method, exactly as the app does it — reinforcement
 * runs have no labelled targets, so they plot mean reward and policy loss where
 * the others plot train and eval loss.
 */

export type Series = {
  label: string;
  color: string;
  value: string;
  from: number;
  to: number;
};

export type RunSpec = {
  name: string;
  method: string;
  /** The line under the title: method · base · dataset · backend · GPU · cost. */
  config: string;
  tiles: [string, string][];
  charts: Series[];
  steps: number;
};

const AMBER = "#f59e0b";
const VIOLET = "#8b5cf6";
const GREEN = "#22c55e";

export const RUNS: Record<string, RunSpec> = {
  SFT: {
    name: "northwind-sft-001",
    method: "SFT",
    config:
      "SFT · base Llama-3.1-8B-Instruct · northwind-marketing-v1 · MODAL-PLATFORM · H200:1 · Est. cost $2.14",
    tiles: [
      ["LAST TRAIN LOSS", "0.9177"],
      ["LAST EVAL LOSS", "0.8952"],
      ["STEP", "480"],
      ["TPS", "6.7k"],
    ],
    charts: [
      { label: "TRAINING LOSS", color: AMBER, value: "0.9177", from: 1.95, to: 0.92 },
      { label: "GRADIENT NORM", color: VIOLET, value: "0.77", from: 3.3, to: 0.77 },
      { label: "EVALUATION LOSS", color: GREEN, value: "0.8952", from: 1.26, to: 0.9 },
    ],
    steps: 480,
  },
  GRPO: {
    name: "northwind-grpo-003",
    method: "GRPO",
    config:
      "GRPO · base northwind-dpo-002 · brand-voice-rewards · MODAL-PLATFORM · H200:2 · Est. cost $6.40",
    tiles: [
      ["MEAN REWARD", "0.812"],
      ["POLICY LOSS", "0.0416"],
      ["STEP", "620"],
      ["TPS", "3.4k"],
    ],
    charts: [
      // Reward climbs; the others fall. The one chart in the film that goes up.
      { label: "MEAN REWARD", color: GREEN, value: "0.812", from: 0.21, to: 0.81 },
      { label: "POLICY LOSS", color: AMBER, value: "0.0416", from: 0.19, to: 0.04 },
      { label: "GRADIENT NORM", color: VIOLET, value: "0.58", from: 2.4, to: 0.58 },
    ],
    steps: 620,
  },
};

const AUTHORED = 4;

const Run: React.FC<{ spec: RunSpec }> = ({ spec }) => {
  const t = useTimeScale(AUTHORED);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.92, focus: { x: 0.5, y: 0.5 } },
          { at: t(14), over: t(60), scale: 0.99, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1480} hot at={0} style={{ padding: "26px 30px 28px" }}>
            {/* Title row. */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Heading size={26}>{spec.name}</Heading>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: c.mutedFg,
                  background: c.secondary,
                  borderRadius: 6,
                  padding: "5px 10px",
                }}
              >
                {spec.method}
              </span>
              <Pill tone="success" style={{ fontSize: 15, padding: "6px 14px" }}>
                <span style={{ fontSize: 9 }}>●</span> Completed
              </Pill>
              <span style={{ flex: 1 }} />
              {["Publish to Hub", "Evaluate", "Merge", "Clone"].map((a, i) => (
                <span
                  key={a}
                  style={{
                    fontFamily: sans,
                    fontSize: 15,
                    fontWeight: 600,
                    borderRadius: radius - 2,
                    padding: "9px 15px",
                    color: i === 0 ? c.green700 : i < 3 ? "#3b2a06" : c.foreground,
                    background: i === 0 ? c.card : i < 3 ? c.amber : c.card,
                    border: `1px solid ${i === 0 ? "rgba(34,197,94,0.4)" : i < 3 ? "transparent" : c.border}`,
                  }}
                >
                  {a}
                </span>
              ))}
            </div>

            <Text size={16} muted style={{ marginTop: 9 }}>
              {spec.config}
            </Text>

            {/* Tabs. */}
            <div
              style={{
                display: "flex",
                gap: 26,
                marginTop: 20,
                borderBottom: `1px solid ${c.border}`,
              }}
            >
              {["Overview", "Configuration", "Datasets", "Checkpoints", "Lineage", "Repository"].map(
                (tab, i) => (
                  <div
                    key={tab}
                    style={{
                      fontFamily: sans,
                      fontSize: 16,
                      fontWeight: i === 0 ? 600 : 400,
                      color: i === 0 ? c.foreground : c.mutedFg,
                      paddingBottom: 11,
                      borderBottom: `2px solid ${i === 0 ? c.amber : "transparent"}`,
                    }}
                  >
                    {tab}
                  </div>
                ),
              )}
            </div>

            {/* Completion banner. */}
            <div
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: radius,
                padding: "16px 20px",
                marginTop: 18,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 9, height: 9, borderRadius: 999, background: c.success }} />
                <Text size={17} weight={500} style={{ flex: 1 }}>
                  Training complete
                </Text>
                <Text size={15} style={{ color: c.amber }}>
                  View logs →
                </Text>
              </div>
              <Text size={15} muted style={{ marginTop: 5 }}>
                Finished {spec.steps} steps
              </Text>
              <div
                style={{
                  height: 6,
                  borderRadius: 999,
                  background: c.success,
                  marginTop: 13,
                }}
              />
            </div>

            {/* Stat tiles. */}
            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              {spec.tiles.map(([label, value], i) => (
                <Tile key={label} label={label} value={value} at={t(6 + i * 3)} />
              ))}
            </div>

            {/* Charts. */}
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              {spec.charts.map((s, i) => (
                <Chart key={s.label} s={s} at={t(14 + i * 5)} />
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

export const Tile: React.FC<{ label: string; value: string; at: number }> = ({
  label,
  value,
  at,
}) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        flex: 1,
        border: `1px solid ${c.border}`,
        borderRadius: radius,
        padding: "13px 16px",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
      }}
    >
      <div
        style={{
          fontFamily: sans,
          fontSize: 12,
          letterSpacing: "0.08em",
          color: c.mutedFg,
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: sans, fontSize: 26, fontWeight: 600, marginTop: 5 }}>
        {value}
      </div>
    </div>
  );
};

/**
 * One metric chart. The line draws left to right as the run replays — the whole
 * point of the beat is watching a number move, so nothing here is static.
 */
export const Chart: React.FC<{
  s: Series;
  at: number;
  authored?: number;
  /** Plot height. Denser grids need shorter plots to clear the caption. */
  height?: number;
}> = ({ s, at, authored = AUTHORED, height = 150 }) => {
  const frame = useCurrentFrame();
  const t = useTimeScale(authored);
  const spring = useSpringAt(at);
  const draw = interpolate(frame, [at, at + t(46)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const W = 420;
  const H = height;
  const N = 42;
  const rising = s.to > s.from;
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const p = i / N;
    // Exponential settle towards the final value, plus a little jitter so it
    // reads as a measurement rather than a curve.
    const eased = 1 - Math.pow(1 - p, 2.4);
    const jitter = Math.sin(i * 2.7) * (rising ? 0.02 : 0.035) * (1 - eased);
    const v = s.from + (s.to - s.from) * eased + (s.to - s.from) * jitter;
    const lo = Math.min(s.from, s.to);
    const hi = Math.max(s.from, s.to);
    const y = H - ((v - lo) / (hi - lo || 1)) * (H - 18) - 9;
    pts.push([p * W, y]);
  }
  const shown = pts.slice(0, Math.max(2, Math.round(pts.length * draw)));
  const line = shown.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${shown[shown.length - 1][0].toFixed(1)},${H} L0,${H} Z`;

  // The gradient id becomes part of a url(#…) reference, so it cannot carry the
  // spaces the chart labels have — an invalid reference falls back to a solid
  // black fill, which is exactly what it did.
  const gradId = `g-${s.label.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div
      style={{
        flex: 1,
        border: `1px solid ${c.border}`,
        borderRadius: radius,
        padding: "16px 18px 12px",
        opacity: spring,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <div
          style={{
            flex: 1,
            fontFamily: sans,
            fontSize: 13,
            letterSpacing: "0.08em",
            color: c.mutedFg,
          }}
        >
          {s.label}
        </div>
        <div style={{ fontFamily: mono, fontSize: 17, color: s.color }}>{s.value}</div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height, marginTop: 10 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gradId})`} />
        <path d={line} fill="none" stroke={s.color} strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export const SceneTrainSFT: React.FC = () => <Run spec={RUNS.SFT} />;
export const SceneTrainGRPO: React.FC = () => <Run spec={RUNS.GRPO} />;

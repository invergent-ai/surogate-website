import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useTimeScale } from "../ui/motion";
import { Chart, Tile, type Series } from "./SceneTrainRun";
import { c, radius } from "../ui/tokens";
import { sans } from "../font";

/**
 * A reinforcement run's metrics.
 *
 * The RL chart set is its own thing: no eval loss, because there are no
 * labelled targets. Mean reward is the one that goes up, and KL mismatch and
 * reward std are the two that tell you whether it is learning or collapsing.
 *
 * Six tiles and five charts, in the product's order.
 */

const TILES: [string, string][] = [
  ["MEAN REWARD", "0.812"],
  ["POLICY LOSS", "0.0416"],
  ["KL MISMATCH", "0.021"],
  ["GRAD NORM", "0.58"],
  ["STEP", "620"],
  ["TPS", "3.4k"],
];

const CHARTS: Series[] = [
  { label: "MEAN REWARD", color: "#22c55e", value: "0.812", from: 0.21, to: 0.81 },
  { label: "POLICY LOSS", color: "#f59e0b", value: "0.0416", from: 0.19, to: 0.04 },
  { label: "KL MISMATCH", color: "#ef4444", value: "0.021", from: 0.11, to: 0.02 },
  { label: "GRADIENT NORM", color: "#8b5cf6", value: "0.58", from: 2.4, to: 0.58 },
  { label: "REWARD STD", color: "#3b82f6", value: "0.164", from: 0.42, to: 0.16 },
];

const AUTHORED = 5.5;

export const SceneGrpoCharts: React.FC = () => {
  const t = useTimeScale(AUTHORED);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.9, focus: { x: 0.5, y: 0.5 } },
          { at: t(12), over: t(60), scale: 0.97, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1560} hot at={0} style={{ padding: "24px 28px 26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <Heading size={25}>northwind-grpo-003</Heading>
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
                GRPO
              </span>
              <Pill tone="success" style={{ fontSize: 15, padding: "6px 14px" }}>
                <span style={{ fontSize: 9 }}>●</span> Running
              </Pill>
              <span style={{ flex: 1 }} />
              <Text size={16} muted>
                step 620 / 800 · brand-voice-rewards
              </Text>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {TILES.map(([label, value], i) => (
                <Tile key={label} label={label} value={value} at={t(4 + i * 2)} />
              ))}
            </div>

            {/* Two up, as the page lays them out. */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginTop: 12,
              }}
            >
              {CHARTS.map((s, i) => (
                <Chart key={s.label} s={s} at={t(12 + i * 5)} authored={AUTHORED} height={84} />
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

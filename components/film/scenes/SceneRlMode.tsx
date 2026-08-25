import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { sans } from "../font";

/**
 * Where the reward comes from.
 *
 * The one decision that shapes a reinforcement run, and the product puts it in
 * a single segmented control with a one-line hint. The hint is the whole beat:
 * three genuinely different ways to score a rollout, and you pick one.
 *
 * Copy is verbatim from the new-run form.
 */

const MODES = [
  {
    label: "Environment",
    desc: "A registered sandbox with deterministic rewards.",
    mark: "▣",
  },
  {
    label: "Agent",
    desc: "Rollouts through a real agent, judged by an LLM.",
    mark: "✦",
  },
  {
    label: "RULER",
    desc: "An LLM judge scores each rollout group; no rubric needed.",
    mark: "⚖",
  },
] as const;

const PICK = 0;
const AUTHORED = 4.5;
const PICK_AT = 54;

export const SceneRlMode: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const picked = frame >= t(PICK_AT);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.5 } },
          { at: t(PICK_AT) - t(8), over: t(24), scale: 1.02, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1120} hot at={0} style={{ padding: "32px 36px 34px" }}>
            <Heading size={24}>RL mode</Heading>

            {/* The segmented control, as the form renders it. */}
            <div
              style={{
                display: "inline-flex",
                background: c.secondary,
                border: `1px solid ${c.border}`,
                borderRadius: radius,
                padding: 5,
                gap: 5,
                marginTop: 18,
              }}
            >
              {MODES.map((m, i) => (
                <Segment key={m.label} label={m.label} on={picked && i === PICK} at={t(4 + i * 5)} />
              ))}
            </div>

            {/* The hint, unpacked one line per mode so each gets read. */}
            <div style={{ marginTop: 26 }}>
              {MODES.map((m, i) => (
                <ModeLine
                  key={m.label}
                  mode={m}
                  at={t(16 + i * 9)}
                  on={picked && i === PICK}
                />
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Segment: React.FC<{ label: string; on: boolean; at: number }> = ({
  label,
  on,
  at,
}) => {
  const s = useSpringAt(at);
  return (
    <span
      style={{
        fontFamily: sans,
        fontSize: 19,
        fontWeight: on ? 600 : 400,
        color: on ? c.foreground : c.mutedFg,
        background: on ? c.card : "transparent",
        borderRadius: radius - 3,
        padding: "12px 28px",
        opacity: s,
        boxShadow: on ? "0 1px 3px rgba(0,0,0,0.08)" : undefined,
      }}
    >
      {label}
    </span>
  );
};

const ModeLine: React.FC<{
  mode: (typeof MODES)[number];
  at: number;
  on: boolean;
}> = ({ mode, at, on }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 18px",
        borderRadius: radius,
        marginBottom: 10,
        background: on ? c.amber50 : c.secondary,
        border: `1px solid ${on ? "rgba(245,158,11,0.4)" : "transparent"}`,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: on ? c.amber : c.card,
          color: on ? "#3b2a06" : c.mutedFg,
          fontSize: 17,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {mode.mark}
      </div>
      <Text size={19} weight={600} style={{ width: 190 }}>
        {mode.label}
      </Text>
      <Text size={18} muted style={{ flex: 1 }}>
        {mode.desc}
      </Text>
    </div>
  );
};

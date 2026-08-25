import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * Rollouts.
 *
 * Periodic samples the GRPO orchestrator archived, with the reward and
 * advantage beside each one. This is the screen that makes RL debuggable —
 * reward shape, length collapse and reward saturation are all visible here and
 * nowhere else — so the beat opens one card and shows the actual prompt and
 * completion that earned the number.
 *
 * Reward colouring follows the code: >0.5 green, >0 amber, 0 muted, <0 red.
 */

const ROWS = [
  { i: 0, head: "Draft a launch-week LinkedIn post for the pricing change, in our voice.", r: 0.812, a: 0.334 },
  { i: 1, head: "Rewrite the same post for a technical audience without losing the CTA.", r: 0.774, a: 0.201 },
  { i: 2, head: "Summarise what changed in the plan tiers for the changelog entry.", r: 0.503, a: 0.019 },
] as const;

const OPEN = 0;

const PROMPT = [
  { role: "SYSTEM", text: "You are Northwind's marketing voice. Lead with what changed and who it helps. No superlatives you can't defend." },
  { role: "USER", text: "Draft a launch-week LinkedIn post for the pricing change, in our voice." },
] as const;

const COMPLETION =
  "Pricing changed today: usage now bills per second, not per hour.\n\nIf your workloads are bursty, and most are, you stop paying for the idle tail. Same plans, same limits, smaller invoice.";

const AUTHORED = 6;
const OPEN_AT = 58;

export const SceneRollouts: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const openAt = t(OPEN_AT);
  const open = frame >= openAt;

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.5 } },
          { at: openAt - t(8), over: t(28), scale: 1.0, focus: { x: 0.5, y: 0.46 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1300} hot at={0} style={{ padding: "24px 28px 26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <Heading size={24}>Rollouts</Heading>
              <span style={{ flex: 1 }} />
              <Text size={15} muted>
                Step
              </Text>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 16,
                  border: `1px solid ${c.border}`,
                  borderRadius: radius - 2,
                  padding: "8px 14px",
                  minWidth: 110,
                }}
              >
                600
                <span style={{ float: "right", color: c.mutedFg }}>⌄</span>
              </span>
              <Text size={15} muted>
                1-20 of 128
              </Text>
              {["all", "rewarded", "zero"].map((f, i) => (
                <span
                  key={f}
                  style={{
                    fontFamily: sans,
                    fontSize: 15,
                    fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? c.amber600 : c.mutedFg,
                    background: i === 0 ? c.amber50 : "transparent",
                    border: `1px solid ${i === 0 ? "rgba(245,158,11,0.3)" : "transparent"}`,
                    borderRadius: radius - 3,
                    padding: "7px 13px",
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            <div style={{ marginTop: 18 }}>
              {ROWS.map((row, i) => (
                <RolloutCard
                  key={row.i}
                  row={row}
                  at={t(6 + i * 6)}
                  open={i === OPEN && open}
                  openAt={openAt}
                />
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/** >0.5 green, >0 amber, 0 muted, <0 red — the component's own thresholds. */
const rewardColor = (r: number) =>
  r > 0.5 ? c.success : r > 0 ? c.amber : r < 0 ? c.destructive : c.mutedFg;

const RolloutCard: React.FC<{
  row: (typeof ROWS)[number];
  at: number;
  open: boolean;
  openAt: number;
}> = ({ row, at, open, openAt }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        border: `1px solid ${open ? c.amber : c.border}`,
        borderRadius: 12,
        padding: "14px 18px",
        marginBottom: 9,
        background: open ? "#fffdf7" : c.card,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 14, color: c.mutedFg }}>{open ? "▾" : "▸"}</span>
        <span style={{ fontFamily: mono, fontSize: 15, color: c.mutedFg }}>#{row.i}</span>
        <Text size={17} muted style={{ flex: 1, minWidth: 0 }}>
          {row.head}
        </Text>
        <Metric label="R" value={row.r.toFixed(3)} color={rewardColor(row.r)} />
        <Metric
          label="A"
          value={`${row.a > 0 ? "" : ""}${row.a.toFixed(3)}`}
          color={row.a > 0 ? c.success : row.a < 0 ? c.destructive : c.mutedFg}
        />
      </div>

      {open ? <Detail start={openAt} /> : null}
    </div>
  );
};

const Metric: React.FC<{ label: string; value: string; color: string }> = ({
  label,
  value,
  color,
}) => (
  <span
    style={{
      fontFamily: mono,
      fontSize: 15,
      border: `1px solid ${c.border}`,
      borderRadius: 999,
      padding: "5px 12px",
      whiteSpace: "nowrap",
    }}
  >
    <span style={{ color: c.mutedFg }}>{label}</span>{" "}
    <span style={{ color, fontWeight: 700 }}>{value}</span>
  </span>
);

const Detail: React.FC<{ start: number }> = ({ start }) => {
  const s = useSpringAt(start + 4);
  return (
    <div
      style={{
        marginTop: 14,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [-8, 0])}px)`,
      }}
    >
      <Label color="#0891b2">PROMPT</Label>
      <div style={{ background: c.muted, borderRadius: 8, padding: "12px 14px", marginTop: 6 }}>
        {PROMPT.map((m) => (
          <div key={m.role} style={{ display: "flex", gap: 14, marginBottom: 8 }}>
            <span
              style={{
                fontFamily: sans,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.09em",
                width: 84,
                flexShrink: 0,
                color: m.role === "SYSTEM" ? "#8b5cf6" : "#0891b2",
              }}
            >
              {m.role}
            </span>
            <span style={{ fontFamily: mono, fontSize: 14.5, lineHeight: 1.5, flex: 1 }}>
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <Label color="#2563eb" style={{ marginTop: 12 }}>
        COMPLETION
      </Label>
      <div style={{ background: c.muted, borderRadius: 8, padding: "12px 14px", marginTop: 6 }}>
        <span
          style={{
            fontFamily: mono,
            fontSize: 14.5,
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
          }}
        >
          {COMPLETION}
        </span>
      </div>
    </div>
  );
};

const Label: React.FC<{
  color: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ color, children, style }) => (
  <div
    style={{
      fontFamily: sans,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.09em",
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

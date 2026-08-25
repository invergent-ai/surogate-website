import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Pill, Text } from "../ui/kit";
import { Typed, useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * Loops.
 *
 * Work that repeats without anyone asking. The whole feature is one command, so
 * the beat is the command palette: type `/loop`, the scheduled-task list opens
 * over the composer, the selection walks down it, and one is picked.
 *
 * Rows are the product's own suggestions, verbatim.
 */

const ROWS: [string, string][] = [
  ["/loop list", "List your active scheduled tasks"],
  ["/loop cancel <id>", "Cancel a scheduled task by ID"],
  ["/loop 5m deployment", "Every 5 minutes: poll deployment status"],
  ["/loop 10m build queue", "Every 10 minutes: review the build queue"],
  ["/loop 15m PR triage", "Every 15 minutes: triage incoming PRs"],
  ["/loop 30m support", "Every 30 minutes: summarize support traffic"],
  ["/loop 1h on-call", "Hourly: review the on-call dashboard"],
];

/** Where the selection lands, and what gets scheduled. */
const PICK = 5;
const ROW_H = 56;

const AUTHORED = 6;
const TYPE_AT = 8;
const WALK_AT = 44;
const ENTER_AT = 108;

export const SceneLoops: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);

  const open = frame >= t(TYPE_AT + 10);
  const entered = frame >= t(ENTER_AT);

  // The selection walks the list rather than jumping to the answer — and it
  // steps row to row. A continuous slide leaves the highlight sitting between
  // two rows, which reads as a rendering fault rather than as a keypress.
  const raw = interpolate(frame, [t(WALK_AT), t(WALK_AT + 42)], [0, PICK], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const step = Math.floor(raw);
  const into = Math.min(1, (raw - step) / 0.4);
  const cursor = Math.min(PICK, step + into * into * (3 - 2 * into));

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.5 } },
          { at: t(ENTER_AT), over: t(24), scale: 1.06, focus: { x: 0.5, y: 0.58 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 1180 }}>
            {/* The palette, over the composer. */}
            {open && !entered ? (
              <Panel width="100%" hot at={t(TYPE_AT + 10)} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "15px 24px",
                    borderBottom: `1px solid ${c.border}`,
                  }}
                >
                  <span style={{ color: c.mutedFg, fontSize: 18 }}>⌕</span>
                  <Text size={18} muted style={{ flex: 1 }}>
                    Search scheduled tasks…
                  </Text>
                  <Text size={15} muted>
                    ↑↓ navigate · Enter select · Esc dismiss
                  </Text>
                </div>

                <div style={{ padding: "10px 12px", position: "relative" }}>
                  {/* The highlight travels; the rows stay put. */}
                  <div
                    style={{
                      position: "absolute",
                      left: 12,
                      right: 12,
                      top: 10 + cursor * ROW_H,
                      height: ROW_H,
                      background: c.secondary,
                      borderRadius: 10,
                    }}
                  />
                  {ROWS.map(([cmd, desc], i) => (
                    <Row
                      key={cmd}
                      cmd={cmd}
                      desc={desc}
                      at={t(TYPE_AT + 14 + i * 4)}
                    />
                  ))}
                </div>
              </Panel>
            ) : null}

            {/* The composer. */}
            <Panel width="100%" hot={entered} at={0} style={{ padding: "18px 24px 16px" }}>
              <div style={{ minHeight: 34, fontFamily: sans, fontSize: 19 }}>
                {entered ? (
                  <span style={{ fontFamily: mono, color: c.amber }}>
                    {ROWS[PICK][0]}
                  </span>
                ) : (
                  <span style={{ color: c.mutedFg }}>
                    <Typed text="/loop" at={t(TYPE_AT)} cps={0.7} />
                    {frame < t(TYPE_AT) ? "Send a message…" : null}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", marginTop: 14 }}>
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: c.secondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    color: c.mutedFg,
                  }}
                >
                  +
                </span>
                <span style={{ flex: 1 }} />
                <div
                  style={{
                    display: "inline-flex",
                    background: c.secondary,
                    borderRadius: 999,
                    padding: 5,
                    marginRight: 14,
                  }}
                >
                  {["Simple", "Advanced"].map((mode) => {
                    const on = mode === "Advanced";
                    return (
                      <span
                        key={mode}
                        style={{
                          fontFamily: sans,
                          fontSize: 17,
                          fontWeight: on ? 600 : 400,
                          color: on ? c.foreground : c.mutedFg,
                          background: on ? c.card : "transparent",
                          borderRadius: 999,
                          padding: "9px 20px",
                        }}
                      >
                        {mode}
                      </span>
                    );
                  })}
                </div>
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 999,
                    background: c.amber,
                    color: "#3b2a06",
                    fontSize: 21,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: entered ? "0 0 28px rgba(245,158,11,0.5)" : undefined,
                  }}
                >
                  ↑
                </span>
              </div>
            </Panel>

            {/* What it became. */}
            {entered ? <Scheduled start={t(ENTER_AT) + 8} /> : null}
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Row: React.FC<{ cmd: string; desc: string; at: number }> = ({
  cmd,
  desc,
  at,
}) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 26,
        height: ROW_H,
        padding: "0 14px",
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [-10, 0])}px)`,
      }}
    >
      <span
        style={{
          fontFamily: mono,
          fontSize: 18,
          color: c.amber,
          width: 290,
          flexShrink: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {cmd}
      </span>
      <Text size={18} muted>
        {desc}
      </Text>
    </div>
  );
};

const Scheduled: React.FC<{ start: number }> = ({ start }) => {
  const s = useSpringAt(start);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: c.green50,
        border: "1px solid rgba(34,197,94,0.35)",
        borderRadius: radius,
        padding: "16px 22px",
        marginTop: 14,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
      }}
    >
      <Text size={18} weight={500} style={{ flex: 1 }}>
        Scheduled — summarize support traffic
      </Text>
      <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg }}>
        next run in 30m
      </span>
      <Pill tone="success" style={{ fontSize: 15, padding: "6px 14px" }}>
        Active
      </Pill>
    </div>
  );
};

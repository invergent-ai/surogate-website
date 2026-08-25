import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Pill, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono } from "../font";

/**
 * Feedback.
 *
 * The two smallest controls in the product and the reason the whole Develop
 * side has anything to train on. So the shot pushes right in on them — a thumb
 * at 40px on a 1080 frame is the punchline, and it has to be big enough to be
 * the punchline.
 *
 * The strip underneath is the point being made: a flag is not a rating, it is a
 * row in the next dataset.
 */

const REPLY =
  "Refund of $129.00 issued and ticket 4821 is updated. The draft reply is in your inbox for approval.";

const AUTHORED = 5;
const CLICK_AT = 52;

export const SceneFeedback: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const clickAt = t(CLICK_AT);
  const liked = frame >= clickAt;

  return (
    <Stage glow={{ x: 0.5, y: 0.46 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.98, focus: { x: 0.5, y: 0.5 } },
          { at: clickAt - t(14), over: t(28), scale: 1.26, focus: { x: 0.42, y: 0.58 } },
          { at: t(CLICK_AT + 24), over: t(20), scale: 1.0, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={900} hot at={0} style={{ padding: "30px 34px 32px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  background: c.secondary,
                  borderRadius: 18,
                  padding: "14px 18px",
                  fontSize: 18,
                  maxWidth: 520,
                }}
              >
                Refund ticket 4821 if policy allows, then draft the reply.
              </div>
            </div>

            <Text size={19} style={{ marginTop: 22, lineHeight: 1.5 }}>
              {REPLY}
            </Text>

            {/* The two controls the whole training loop hangs off. */}
            <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
              <Thumb up on={liked} at={clickAt} />
              <Thumb up={false} on={false} at={clickAt} />
            </div>

            {liked ? <Landed start={clickAt} /> : null}
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Thumb: React.FC<{ up: boolean; on: boolean; at: number }> = ({ up, on, at }) => {
  const pop = useSpringAt(at);
  return (
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: 11,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${on ? c.success : c.border}`,
        background: on ? c.green50 : c.card,
        transform: `scale(${on ? 0.86 + pop * 0.14 : 1})`,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        style={{
          width: 24,
          height: 24,
          transform: up ? undefined : "rotate(180deg)",
          fill: on ? c.green700 : "none",
          stroke: on ? c.green700 : c.mutedFg,
          strokeWidth: 1.8,
        }}
      >
        <path d="M7 10.5v9H4.5v-9H7zm2 9V10.5l4-6a2 2 0 0 1 3.4 2l-1.2 4h4.1a1.8 1.8 0 0 1 1.75 2.2l-1.3 5.6A2.4 2.4 0 0 1 17.4 20H9z" />
      </svg>
    </div>
  );
};

/** Where the flag actually goes. */
const Landed: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const s = useSpringAt(start + 8);
  const rows = Math.round(
    interpolate(frame, [start + 8, start + 30], [1284, 1285], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginTop: 22,
        background: c.green50,
        border: "1px solid rgba(34,197,94,0.35)",
        borderRadius: radius,
        padding: "14px 18px",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
      }}
    >
      <Text size={17} style={{ flex: 1 }}>
        Kept for training
      </Text>
      <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg }}>
        northwind-marketing-v1
      </span>
      <Pill tone="success" style={{ fontSize: 15, padding: "6px 14px" }}>
        {rows.toLocaleString()} rows
      </Pill>
    </div>
  );
};

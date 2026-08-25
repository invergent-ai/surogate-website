import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { serif } from "../font";
import { useTone } from "../ui/tone";
import { c } from "../ui/tokens";

/**
 * The on-screen line — what carries the film when it autoplays muted.
 *
 * Placement is per shot, not global: the caption has to sit where the scene
 * isn't. A fixed bottom-left slot collides with a composer, a Start button or
 * anything else that lives low in frame.
 *
 * Set in serif to match the product's own display type.
 */
export type CaptionPlacement =
  | "bottom-left"
  | "bottom-center"
  | "top-left"
  | "top-center"
  | "left"
  | "right"
  | "center";

export const Caption: React.FC<{
  text: string;
  sub?: string;
  placement?: CaptionPlacement;
  delay?: number;
  hold?: number;
}> = ({ text, sub, placement = "bottom-left", delay = 8, hold }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  // With no ground of its own the film sits directly on the page, so the caption
  // inherits the section's text colour rather than picking one. That is the only
  // version that survives the film being dropped on a light section and a dark
  // one — naming a colour here made it invisible on whichever it was not.
  const light = useTone() === "light";

  const local = frame - delay;
  const out = hold ?? durationInFrames - delay;
  if (local < 0) return null;

  const enter = spring({ frame: local, fps, config: { damping: 200 } });
  const exit = interpolate(local, [out - 9, out], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = enter * exit;
  const lift = interpolate(enter, [0, 1], [16, 0]);

  const box = boxes[placement];

  return (
    <AbsoluteFill
      style={{
        ...box.fill,
        // Less room under the type than beside it: the caption should sit low
        // in the frame, away from the UI it is describing.
        padding: "96px 96px 56px",
        opacity,
        pointerEvents: "none",
      }}
    >
      <div style={{ transform: `translateY(${lift}px)`, textAlign: box.align }}>
        <div
          style={{
            fontFamily: serif,
            fontSize: 78,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.06,
            color: light ? "currentColor" : "#fff",
            maxWidth: 1180,
            textShadow: light ? "none" : "0 4px 40px rgba(0,0,0,0.55)",
          }}
        >
          {text}
        </div>
        {sub ? (
          <div
            style={{
              marginTop: 16,
              fontSize: 40,
              lineHeight: 1.25,
              color: light ? "currentColor" : "rgba(255,255,255,0.66)",
              opacity: light ? 0.68 : 1,
              maxWidth: 1100,
              textShadow: light ? "none" : "0 2px 24px rgba(0,0,0,0.5)",
            }}
          >
            {sub}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

const boxes: Record<
  CaptionPlacement,
  { fill: React.CSSProperties; align: "left" | "center" | "right" }
> = {
  "bottom-left": {
    fill: { justifyContent: "flex-end", alignItems: "flex-start" },
    align: "left",
  },
  "bottom-center": {
    fill: { justifyContent: "flex-end", alignItems: "center" },
    align: "center",
  },
  "top-left": {
    fill: { justifyContent: "flex-start", alignItems: "flex-start" },
    align: "left",
  },
  "top-center": {
    fill: { justifyContent: "flex-start", alignItems: "center" },
    align: "center",
  },
  left: { fill: { justifyContent: "center", alignItems: "flex-start" }, align: "left" },
  right: { fill: { justifyContent: "center", alignItems: "flex-end" }, align: "right" },
  center: { fill: { justifyContent: "center", alignItems: "center" }, align: "center" },
};

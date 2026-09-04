import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { mono } from "../font";
import { c } from "./tokens";
import { useTone } from "./tone";

/**
 * "STEP 3 OF 6" — where the viewer is in a tutorial.
 *
 * The showcase films don't need this: each beat is its own point and missing
 * one costs nothing. A tutorial is a sequence, and someone who arrives in the
 * middle of one has to be told they're in the middle of one.
 *
 * Sits top-left, above everything, and stays for the whole shot — it is
 * orientation, not an event, so it doesn't animate beyond arriving.
 */
export const StepBadge: React.FC<{ n: number; of: number }> = ({ n, of }) => {
  const frame = useCurrentFrame();
  const light = useTone() === "light";
  const t = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (v) => 1 - Math.pow(1 - v, 3),
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 54,
        left: 64,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 20px",
        borderRadius: 999,
        fontFamily: mono,
        fontSize: 22,
        letterSpacing: "0.12em",
        background: light ? "rgba(20,20,18,0.05)" : "rgba(255,255,255,0.07)",
        border: `1px solid ${light ? c.border : "rgba(255,255,255,0.12)"}`,
        color: light ? c.mutedFg : "rgba(255,255,255,0.62)",
        opacity: t,
        transform: `translateY(${(1 - t) * 8}px)`,
        zIndex: 60,
      }}
    >
      <span style={{ color: c.amber, fontWeight: 600 }}>
        {String(n).padStart(2, "0")}
      </span>
      <span style={{ opacity: 0.5 }}>/</span>
      <span>{String(of).padStart(2, "0")}</span>
    </div>
  );
};

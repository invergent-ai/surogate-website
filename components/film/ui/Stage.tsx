import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { c } from "./tokens";
import { useTone } from "./tone";
import { sans } from "../font";

/**
 * A shot's light, over the film's ground.
 *
 * The product is a light UI. Floating it on a dark, slightly warm ground is
 * what turns a screenshot into a film: the panels read as objects with weight,
 * the amber pops, and the eye goes where the light is instead of scanning a
 * full browser window.
 *
 * The ground itself now lives at the film level (`Ground`) so it runs
 * continuously through the cuts. What is left here is per-shot: a key light
 * aimed at whatever this beat is about. So this paints no base colour — it must
 * stay transparent or it would cover the film's background sixteen times over.
 */
export const Stage: React.FC<{
  children: React.ReactNode;
  /** Where the warm light sits, in frame fractions. Moves the eye. */
  glow?: { x: number; y: number };
  /** Slow drift on the light, so a held shot never feels frozen. */
  drift?: boolean;
}> = ({ children, glow = { x: 0.5, y: 0.42 }, drift = true }) => {
  const frame = useCurrentFrame();
  const light = useTone() === "light";
  const wob = drift ? Math.sin(frame / 90) * 0.018 : 0;
  const gx = (glow.x + wob) * 100;
  const gy = (glow.y - wob * 0.6) * 100;

  return (
    <AbsoluteFill style={{ fontFamily: sans }}>
      {/* Warm key light. */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(78% 62% at ${gx}% ${gy}%, ${light ? "rgba(245,158,11,0.07)" : "rgba(245,158,11,0.13)"} 0%, ${light ? "rgba(245,158,11,0.02)" : "rgba(245,158,11,0.045)"} 34%, rgba(11,11,10,0) 68%)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};


/**
 * A floating fragment of the product. Not a browser window — one panel, the
 * one the shot is about.
 */
export const Panel: React.FC<{
  children: React.ReactNode;
  /** Frame it appears. */
  at?: number;
  width?: number | string;
  /** Amber rim, for the panel the shot is currently about. */
  hot?: boolean;
  /** Pushed back in space: dimmer, smaller, blurred. */
  behind?: boolean;
  style?: React.CSSProperties;
}> = ({ children, at = 0, width, hot, behind, style }) => {
  const frame = useCurrentFrame();
  // The dark-ground shadow is built to lift a white panel out of near-black.
  // Over paper the same shadow is a grey bruise, so it drops to something a
  // light UI would actually use.
  const light = useTone() === "light";
  const t = interpolate(frame, [at, at + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = 1 - Math.pow(1 - t, 3);

  return (
    <div
      style={{
        width,
        background: c.card,
        borderRadius: 20,
        border: `1px solid ${
          light
            ? hot
              ? "rgba(245,158,11,0.45)"
              : c.border
            : hot
              ? "rgba(245,158,11,0.55)"
              : "rgba(255,255,255,0.10)"
        }`,
        boxShadow: light
          ? hot
            ? "0 16px 40px rgba(28,22,18,0.11), 0 0 34px rgba(245,158,11,0.14)"
            : "0 12px 32px rgba(28,22,18,0.08)"
          : hot
            ? "0 50px 110px rgba(0,0,0,0.62), 0 0 0 1px rgba(245,158,11,0.10), 0 0 90px rgba(245,158,11,0.20)"
            : "0 50px 110px rgba(0,0,0,0.62)",
        overflow: "hidden",
        opacity: behind ? eased * 0.5 : eased,
        filter: behind ? "blur(2.5px)" : undefined,
        transform: `translateY(${(1 - eased) * 26}px) scale(${
          (behind ? 0.94 : 1) * (0.985 + eased * 0.015)
        })`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** A panel's title strip — replaces the app header, one line, no chrome. */
export const PanelHead: React.FC<{
  children: React.ReactNode;
  right?: React.ReactNode;
}> = ({ children, right }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 26px",
      borderBottom: `1px solid ${c.border}`,
    }}
  >
    {children}
    {right}
  </div>
);

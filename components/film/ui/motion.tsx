import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * The motion vocabulary. Every one is a pure function of useCurrentFrame() —
 * no CSS transitions anywhere, or the render stops being deterministic.
 */

/** Eased 0→1 over a window, clamped. */
export const useProgress = (from: number, to: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

/** Settled spring, the house curve. No bounce. */
export const useSpringAt = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 200 } });
};

/**
 * Fade + lift in. The default entrance for anything appearing on screen.
 */
export const Enter: React.FC<{
  at?: number;
  lift?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ at = 0, lift = 10, children, style }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [lift, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Typewriter. String slicing, never per-character opacity — a character that
 * fades in reads as a glitch, one that appears reads as typing.
 */
export const Typed: React.FC<{
  text: string;
  /** Frame typing starts. */
  at?: number;
  /** Characters per frame. 0.9 ≈ natural, 3 ≈ the guide's "ramp to 4×". */
  cps?: number;
  caret?: boolean;
}> = ({ text, at = 0, cps = 1.6, caret = true }) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.floor((frame - at) * cps));
  const shown = text.slice(0, n);
  const done = n >= text.length;
  // Caret blinks only once typing has finished; while typing it rides the end.
  const blink = done ? Math.floor(frame / 15) % 2 === 0 : true;
  return (
    <>
      {shown}
      {caret && blink ? (
        <span style={{ opacity: 0.75 }}>|</span>
      ) : null}
    </>
  );
};

/** Frames a Typed run needs, so scenes can schedule what follows. */
export const typedFrames = (text: string, cps = 1.6) =>
  Math.ceil(text.length / cps);

export type Point = { x: number; y: number };

/**
 * The cursor. Moves between waypoints with a settled spring, and pulses on
 * click. Coordinates are in *design* space (1440×810), so scenes can position
 * it against the same numbers they lay out with.
 */
export const Cursor: React.FC<{
  path: { at: number; to: Point; click?: boolean }[];
}> = ({ path }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Current leg: the last waypoint whose start frame has passed.
  let idx = 0;
  for (let i = 0; i < path.length; i++) {
    if (frame >= path[i].at) idx = i;
  }
  const target = path[idx];
  const prev = idx > 0 ? path[idx - 1] : path[0];

  const t = spring({
    frame: frame - target.at,
    fps,
    config: { damping: 200 },
    durationInFrames: 18,
  });
  const x = interpolate(t, [0, 1], [prev.to.x, target.to.x]);
  const y = interpolate(t, [0, 1], [prev.to.y, target.to.y]);

  // Click ripple, 12 frames after arrival.
  const clickAt = target.at + 14;
  const ring = interpolate(frame, [clickAt, clickAt + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showRing = Boolean(target.click) && frame >= clickAt && ring < 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {showRing ? (
        <div
          style={{
            position: "absolute",
            left: -18,
            top: -18,
            width: 36,
            height: 36,
            borderRadius: 999,
            border: "2px solid rgba(245,158,11,0.9)",
            opacity: 1 - ring,
            transform: `scale(${0.4 + ring * 1.1})`,
          }}
        />
      ) : null}
      {/* macOS-ish arrow, drawn so it needs no asset. */}
      <svg width={26} height={30} viewBox="0 0 26 30" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,.28))" }}>
        <path d="M4 2 L4 23 L9.5 18 L13 27 L17 25 L13.5 16.5 L21 16.5 Z" fill="#fff" stroke="#141412" strokeWidth={1.6} strokeLinejoin="round" />
      </svg>
    </div>
  );
};

/**
 * Scene beats that follow the cut.
 *
 * Scenes are authored against a nominal length. When the cut retimes a shot —
 * and it will, pacing is the last thing to settle — every beat inside scales
 * with it instead of running off the end of the sequence. Author against the
 * length that felt natural, then change durations freely in shots.ts.
 *
 *   const t = useTimeScale(6);   // this scene was written as a 6s shot
 *   <Thing at={t(22)} />
 */
export const useTimeScale = (authoredSeconds: number) => {
  const { durationInFrames, fps } = useVideoConfig();
  const k = durationInFrames / (authoredSeconds * fps);
  return (frame: number) => Math.round(frame * k);
};

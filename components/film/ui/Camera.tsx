import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export type CameraMove = {
  /** Frame this move starts. */
  at: number;
  /** Frames it takes. */
  over: number;
  /** 1 = frame as laid out. 1.6 = pushed in. */
  scale?: number;
  /** Where to centre, in frame fractions. 0.5/0.5 is the middle. */
  focus?: { x: number; y: number };
};

/**
 * The camera.
 *
 * Scenes lay out at rest and the camera decides what the film looks at — push
 * in on the moment that matters, drift back out for the reveal. This is the
 * main thing that separates a showcase from a screen recording: a recording
 * shows you a page, a film shows you a *detail* at the moment it matters.
 *
 * Moves are absolute (not relative), so a scene reads as a storyboard.
 */
export const Camera: React.FC<{
  moves: CameraMove[];
  children: React.ReactNode;
}> = ({ moves, children }) => {
  const frame = useCurrentFrame();

  const start: Required<CameraMove> = {
    at: 0,
    over: 1,
    scale: moves[0]?.scale ?? 1,
    focus: moves[0]?.focus ?? { x: 0.5, y: 0.5 },
  };

  // Fold the moves into the current transform.
  let scale = start.scale;
  let fx = start.focus.x;
  let fy = start.focus.y;

  for (const m of moves) {
    const t = interpolate(frame, [m.at, m.at + m.over], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    // Ease-in-out cubic: a camera never starts or stops abruptly.
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    scale = interpolate(e, [0, 1], [scale, m.scale ?? scale]);
    fx = interpolate(e, [0, 1], [fx, m.focus?.x ?? fx]);
    fy = interpolate(e, [0, 1], [fy, m.focus?.y ?? fy]);
  }

  // Translate so the focus point lands in the centre of frame at this scale.
  const tx = (0.5 - fx) * 100 * scale;
  const ty = (0.5 - fy) * 100 * scale;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translate(${tx / scale}%, ${ty / scale}%)`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/**
 * Slow continuous push. For shots with no specific detail to find — keeps a
 * held frame alive without asking the viewer to follow anything.
 */
export const SlowPush: React.FC<{
  from?: number;
  to?: number;
  children: React.ReactNode;
}> = ({ from = 1, to = 1.06, children }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 180], [from, to], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      {children}
    </AbsoluteFill>
  );
};

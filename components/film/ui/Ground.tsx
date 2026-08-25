import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * The film's ground.
 *
 * This renders once at the film level, *outside* the shot sequences, which is
 * the whole point: a background built inside each scene restarts its clock at
 * every cut, so its drift snapped back to zero sixteen times and the film read
 * as sixteen clips. Here the fields move continuously for the full duration and
 * the cuts happen in front of a background that never notices them.
 *
 * Everything is a radial gradient. No blur filters — a full-frame blur costs
 * more per frame than every panel in the film combined, and soft gradients get
 * to the same place for free.
 */

/** Colour fields, in frame fractions. Each drifts on its own slow path. */
type Field = {
  /** Path centre and how far it wanders. */
  x: number;
  y: number;
  ax: number;
  ay: number;
  /** Cycles across the whole film. Kept irrational-ish so they never re-sync. */
  sx: number;
  sy: number;
  size: [number, number];
  color: string;
  /** Peak opacity, reached mid-film. */
  alpha: number;
};

const FIELDS: Field[] = [
  // The warm key. Dominant, and the one the product's amber sits in.
  { x: 0.5, y: 0.4, ax: 0.16, ay: 0.09, sx: 1.0, sy: 1.7, size: [86, 70], color: "245,158,11", alpha: 0.26 },
  // Cool counterweight, opposite phase, so the frame is never one flat wash.
  { x: 0.44, y: 0.62, ax: 0.26, ay: 0.14, sx: 0.7, sy: 1.1, size: [70, 58], color: "120,140,255", alpha: 0.26 },
  // A slow magenta bloom that only shows in the middle third.
  { x: 0.62, y: 0.3, ax: 0.2, ay: 0.16, sx: 1.3, sy: 0.9, size: [58, 50], color: "236,72,153", alpha: 0.15 },
];

export const Ground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  /** 0 → 1 across the whole film. */
  const t = frame / Math.max(1, durationInFrames);

  return (
    <AbsoluteFill style={{ background: "#0a0a09" }}>
      {FIELDS.map((f, i) => {
        const x = (f.x + Math.sin(t * f.sx * Math.PI * 2) * f.ax) * 100;
        const y = (f.y + Math.cos(t * f.sy * Math.PI * 2) * f.ay) * 100;
        // Each field breathes in and out on its own cycle rather than sitting
        // at a fixed strength — that alone stops a held shot feeling frozen.
        const breathe = 0.72 + 0.28 * Math.sin(t * Math.PI * 2 * (1 + i * 0.6) + i);
        return (
          <AbsoluteFill
            key={f.color}
            style={{
              background: `radial-gradient(${f.size[0]}% ${f.size[1]}% at ${x}% ${y}%, rgba(${f.color},${(f.alpha * breathe).toFixed(4)}) 0%, rgba(${f.color},${(f.alpha * breathe * 0.32).toFixed(4)}) 38%, rgba(10,10,9,0) 70%)`,
            }}
          />
        );
      })}

      <Brand />
      <Grid />
      <Grain />

      {/* Seats the frame. Over the ground, under everything the shots draw. */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(128% 108% at 50% 45%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * The brand mark in the ground.
 *
 * `heroBg.svg` lifted from the website, so the film and the site carry the same
 * art rather than an approximation of it. The copy here has been re-exported to
 * the drawing's own bounds: the site's file has geometry outside its viewBox,
 * which clipped the rabbit down a hard vertical line — invisible on a page where
 * that edge sits off-screen, obvious as a seam in a 16:9 frame.
 *
 * It sits fully inside the frame rather than bleeding off it: any edge that
 * crosses the artwork reads as the mark being cut in half, which is what a
 * full-bleed watermark looks like once it is this legible. Masked out of the
 * middle, where every beat puts a panel.
 *
 * The file bakes opacity 0.15 into its own group, so the value here multiplies
 * down to it: 0.5 lands around 7% on screen, which on this ground reads as a
 * faint edge-light rather than a grey shape.
 */
const Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / Math.max(1, durationInFrames);

  // Drifts within the right of frame over the whole film, staying inside it.
  const x = interpolate(t, [0, 1], [2.5, -2.5]);
  const y = interpolate(t, [0, 1], [-2, 2]);
  const scale = interpolate(t, [0, 1], [1, 1.05]);

  return (
    <AbsoluteFill
      style={{
        opacity: 0.5,
        transform: `translate(${x}%, ${y}%) scale(${scale})`,
        maskImage:
          "radial-gradient(52% 46% at 50% 52%, transparent 0%, #000 74%)",
        WebkitMaskImage:
          "radial-gradient(52% 46% at 50% 52%, transparent 0%, #000 74%)",
      }}
    >
      <Img
        src={staticFile("heroBg.svg")}
        style={{
          position: "absolute",
          right: "3%",
          top: "6%",
          height: "84%",
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * The engineering grid, drifting for the full film rather than per shot — so
 * the parallax against the panels is continuous through the cuts.
 */
const Grid: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / Math.max(1, durationInFrames);
  const y = -t * 240;
  const x = Math.sin(t * Math.PI * 2) * 40;
  return (
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "68px 68px",
        transform: `translate(${x}px, ${y}px)`,
        maskImage: "radial-gradient(88% 76% at 50% 45%, #000 0%, transparent 78%)",
        WebkitMaskImage: "radial-gradient(88% 76% at 50% 45%, #000 0%, transparent 78%)",
      }}
    />
  );
};

/**
 * Film grain.
 *
 * Large flat gradients band badly at 8-bit — you can see the steps in the
 * corners of a dark frame. A little noise over the top dithers the banding out
 * and keeps the ground from looking like vector art. The tile is a static SVG
 * data URI, shifted a few pixels per frame so it never sits still (static grain
 * reads as a dirty lens).
 */
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
       <filter id="n">
         <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
         <feColorMatrix type="saturate" values="0"/>
       </filter>
       <rect width="180" height="180" filter="url(#n)" opacity="0.5"/>
     </svg>`,
  );

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  // Steps through a small set of offsets so the grain shimmers without
  // strobing — a fresh random field every frame is unwatchable.
  const step = frame % 6;
  const x = [0, 37, 74, 111, 148, 22][step];
  const y = [0, 91, 19, 128, 55, 164][step];
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url("${NOISE}")`,
        backgroundSize: "180px 180px",
        backgroundPosition: `${x}px ${y}px`,
        opacity: 0.055,
        mixBlendMode: "overlay",
      }}
    />
  );
};

/**
 * A one-shot light sweep across the frame. Used on the cut into the end card,
 * where the film needs a punctuation mark rather than another dissolve.
 */
export const Sweep: React.FC<{ at: number; over?: number }> = ({ at, over = 26 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + over], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (p <= 0 || p >= 1) return null;
  const eased = 1 - Math.pow(1 - p, 3);
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(105deg, rgba(255,255,255,0) 42%, rgba(255,235,200,0.16) 50%, rgba(255,255,255,0) 58%)",
        transform: `translateX(${(eased - 0.5) * 260}%)`,
        pointerEvents: "none",
      }}
    />
  );
};

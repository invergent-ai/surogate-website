import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { sans, serif } from "../font";
import { c } from "../ui/tokens";
import { useTone } from "../ui/tone";

/**
 * The open and close every tutorial shares.
 *
 * These are factories, not components with props: `Shot.scene` is a bare
 * `React.FC`, and a tutorial names its own title at authoring time. That is
 * safe here — the scene list lives in code and never crosses Remotion's
 * `defaultProps` JSON boundary, which is where components get silently
 * stripped.
 */

const useRise = (delay: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
};

/**
 * Opening card: the series mark, what this video teaches, and what you end up
 * with.
 *
 * The badge is `logo-badge.svg` rather than anything under `public/brand/` —
 * every `logo-full-*` and `mark-*` in that folder ships with an empty <defs>,
 * so the rule carrying their fill is gone and they render solid black whatever
 * their name says. The badge carries its own amber and dark, which also means
 * it needs no light/dark variant.
 */
export const SEASON = {
  work: "Get an agent doing real work",
  safe: "Run it safely",
  develop: "Build and train it",
  monetize: "Sell it",
} as const;

export const titleCard =
  (
    title: string,
    sub: string,
    /** Which season this belongs to. Season 1 is the default. */
    seasonLabel: string = SEASON.work,
  ): React.FC =>
  () => {
    const light = useTone() === "light";
    const mark = useRise(0);
    const series = useRise(3);
    const season = useRise(6);
    const rule = useRise(9);
    const a = useRise(12);
    const b = useRise(16);
    const ink = light ? c.foreground : "#fff";

    return (
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 180px",
        }}
      >
        <Img
          src={staticFile("logo-badge.svg")}
          style={{
            height: 88,
            opacity: mark,
            transform: `translateY(${(1 - mark) * 12}px)`,
          }}
        />
        <div
          style={{
            fontFamily: sans,
            fontSize: 23,
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: c.amber,
            marginTop: 22,
            opacity: series,
          }}
        >
          Surogate Tutorials
        </div>
        {/* The season, so a viewer knows which of four arcs they are inside.
            Set as a title in its own right — sans, so the serif below it still
            reads as the one thing this particular video is about. */}
        <div
          style={{
            fontFamily: sans,
            fontSize: 46,
            fontWeight: 600,
            letterSpacing: "-0.005em",
            lineHeight: 1.2,
            color: light ? c.mutedFg : "rgba(255,255,255,0.55)",
            marginTop: 16,
            opacity: season,
          }}
        >
          {seasonLabel}
        </div>
        <div
          style={{
            width: 84,
            height: 4,
            borderRadius: 2,
            background: c.amber,
            margin: "28px 0 34px",
            opacity: rule,
            transform: `scaleX(${0.3 + rule * 0.7})`,
          }}
        />
        <div
          style={{
            fontFamily: serif,
            fontSize: 74,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            color: ink,
            opacity: a,
            transform: `translateY(${(1 - a) * 18}px)`,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: sans,
            fontSize: 31,
            marginTop: 24,
            lineHeight: 1.4,
            color: light ? c.mutedFg : "rgba(255,255,255,0.66)",
            opacity: b,
            transform: `translateY(${(1 - b) * 14}px)`,
          }}
        >
          {sub}
        </div>
      </AbsoluteFill>
    );
  };

/** Closing card: the one thing to do next. */
export const endCard =
  (next: string): React.FC =>
  () => {
    const light = useTone() === "light";
    const a = useRise(0);
    const b = useRise(10);
    const ink = light ? c.foreground : "#fff";

    return (
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 180px",
        }}
      >
        <div
          style={{
            fontFamily: sans,
            fontSize: 26,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: c.amber,
            opacity: a,
          }}
        >
          Next
        </div>
        <div
          style={{
            fontFamily: serif,
            fontSize: 66,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.12,
            marginTop: 26,
            color: ink,
            opacity: b,
            transform: `translateY(${(1 - b) * 16}px)`,
          }}
        >
          {next}
        </div>
      </AbsoluteFill>
    );
  };

/**
 * Closing brand card: the logo and the address.
 *
 * The logo comes in two cuts because the film has two grounds — white over the
 * dark render, black when the scenes are drawn onto the page.
 */
export const brandCard =
  (url = "surogate.ai"): React.FC =>
  () => {
    const light = useTone() === "light";
    const mark = useRise(0);
    const addr = useRise(10);

    return (
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", gap: 44 }}
      >
        {/*
          Not the brand/logo-full-* pair: those ship with an empty <defs>, so
          the .cls-1 rule that carried the fill is gone and every path falls
          back to SVG's default black — the "white" one renders black. These two
          set fill explicitly.
        */}
        <Img
          src={staticFile(light ? "surogateBlack.svg" : "surogateWhite.svg")}
          style={{
            height: 132,
            opacity: mark,
            transform: `translateY(${(1 - mark) * 14}px)`,
          }}
        />
        <div
          style={{
            fontFamily: sans,
            fontSize: 40,
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: c.amber,
            opacity: addr,
            transform: `translateY(${(1 - addr) * 10}px)`,
          }}
        >
          {url}
        </div>
      </AbsoluteFill>
    );
  };

/**
 * A board of what to try next — the capability brag.
 *
 * Nine tiles in five seconds, so each gets about four frames of stagger: the
 * point is the breadth landing all at once, not any single item being read.
 * Labels are verbs, not feature names, because the shot is answering "what can
 * I do now?" rather than "what does this product have?".
 */
export const nextStepsCard =
  (items: { label: string; icon: React.FC }[], more?: string): React.FC =>
  () => {
    const light = useTone() === "light";
    const ink = light ? c.foreground : "#fff";
    const tail = useRise(items.length * 3 + 6);

    return (
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            width: 1680,
          }}
        >
          {items.map((item, i) => (
            <NextTile key={item.label} item={item} at={i * 3} ink={ink} light={light} />
          ))}
        </div>
        {more ? (
          <div
            style={{
              fontFamily: serif,
              fontSize: 38,
              fontStyle: "italic",
              marginTop: 34,
              color: c.amber,
              opacity: tail,
              transform: `translateY(${(1 - tail) * 10}px)`,
            }}
          >
            {more}
          </div>
        ) : null}
      </AbsoluteFill>
    );
  };

const NextTile: React.FC<{
  item: { label: string; icon: React.FC };
  at: number;
  ink: string;
  light: boolean;
}> = ({ item, at, ink, light }) => {
  const e = useRise(at);
  const Icon = item.icon;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "22px 24px",
        minHeight: 108,
        borderRadius: 16,
        background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${light ? "rgba(12,10,9,0.08)" : "rgba(255,255,255,0.10)"}`,
        opacity: e,
        transform: `translateY(${(1 - e) * 14}px)`,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 13,
          flexShrink: 0,
          background: `${c.amber}1f`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon />
      </div>
      <div
        style={{
          fontFamily: sans,
          fontSize: 23,
          fontWeight: 500,
          lineHeight: 1.25,
          color: ink,
        }}
      >
        {item.label}
      </div>
    </div>
  );
};

const tile = {
  fill: "none",
  stroke: c.amber,
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const Tile: React.FC<{ d: string }> = ({ d }) => (
  <svg width={27} height={27} viewBox="0 0 24 24" {...tile}>
    <path d={d} />
  </svg>
);

/** The nine things a fresh agent can be taken on to next. */
export const NEXT_STEPS = [
  {
    label: "Add knowledge",
    icon: () => (
      <Tile d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    ),
  },
  { label: "Add skills", icon: () => <Tile d="M4 14h7l-2 7 9-11h-7l2-7z" /> },
  {
    label: "Connect channels",
    icon: () => (
      <svg width={27} height={27} viewBox="0 0 24 24" {...tile}>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M12 2.5a14 14 0 0 0 0 19 14 14 0 0 0 0-19M2.5 12h19" />
      </svg>
    ),
  },
  {
    label: "Use a browser",
    icon: () => (
      <svg width={27} height={27} viewBox="0 0 24 24" {...tile}>
        <rect x="2.5" y="4" width="19" height="16" rx="2" />
        <path d="M2.5 9h19M6 6.5h.01M8.5 6.5h.01" />
      </svg>
    ),
  },
  {
    label: "Work with files",
    icon: () => (
      <svg width={27} height={27} viewBox="0 0 24 24" {...tile}>
        <path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z" />
        <path d="M14 2.5V8h5.5" />
      </svg>
    ),
  },
  {
    label: "Schedule tasks",
    icon: () => (
      <svg width={27} height={27} viewBox="0 0 24 24" {...tile}>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M12 6.5V12l3.5 2.5" />
      </svg>
    ),
  },
  {
    label: "Perform deep research",
    icon: () => (
      <svg width={27} height={27} viewBox="0 0 24 24" {...tile}>
        <circle cx="10.5" cy="10.5" r="7" />
        <path d="m21 21-5.6-5.6" />
      </svg>
    ),
  },
  {
    label: "Create missions",
    icon: () => (
      <Tile d="M4 15s1.5-1.5 4-1.5 4.5 3 8 3 4-1.5 4-1.5V4s-1.5 1.5-4 1.5-5-3-8-3S4 4 4 4zM4 22V4" />
    ),
  },
  {
    label: "Set goals",
    icon: () => (
      <svg width={27} height={27} viewBox="0 0 24 24" {...tile}>
        <circle cx="12" cy="12" r="9.5" />
        <circle cx="12" cy="12" r="5.5" />
        <circle cx="12" cy="12" r="1.6" />
      </svg>
    ),
  },
  {
    label: "Sell it to your customers",
    icon: () => (
      <svg width={27} height={27} viewBox="0 0 24 24" {...tile}>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-8-8V3h9.6l8.4 8.4a2 2 0 0 1 0 2z" />
        <path d="M7 7h.01" />
      </svg>
    ),
  },
  {
    label: "Train it",
    icon: () => (
      <svg width={27} height={27} viewBox="0 0 24 24" {...tile}>
        <path d="M3 17.5 9 11l4 4 8-8.5" />
        <path d="M15 6.5h6v6" />
      </svg>
    ),
  },
  {
    label: "Evaluate it",
    icon: () => (
      <svg width={27} height={27} viewBox="0 0 24 24" {...tile}>
        <path d="M9 3.5H6.5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-14a2 2 0 0 0-2-2H15" />
        <rect x="9" y="1.8" width="6" height="3.6" rx="1" />
        <path d="m9.5 13 2 2 3.5-4" />
      </svg>
    ),
  },
];

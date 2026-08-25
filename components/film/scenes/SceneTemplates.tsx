import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Stage } from "../ui/Stage";
import { Text } from "../ui/kit";

import { useTone } from "../ui/tone";
import { c } from "../ui/tokens";
import { mono, serif } from "../font";

/**
 * Shot 2 — the catalogue.
 *
 * Breadth is the message, so the shot is a *wall* of templates rather than a
 * page of them: three rows drifting upward at slightly different speeds, cards
 * fading at the edges. You aren't meant to read any one card — you're meant to
 * feel that there are a lot of them and that they're specific.
 */

const ROW_A = [
  ["Customer Support", "support", ["triage", "response-drafting", "escalation"]],
  ["Account Executive", "sales", ["discovery", "demo", "proposals"]],
  ["Brand & Content", "marketing", ["copywriting", "social", "ad-creative"]],
  ["Founder / CEO", "strategy", ["business-planning", "fundraising"]],
] as const;

const ROW_B = [
  ["Corporate Development", "strategy", ["partnerships", "comps-analysis"]],
  ["Data Analyst", "data", ["sql-analytics", "metrics-modeling"]],
  ["Recruiter", "hr", ["job-descriptions", "interviewing"]],
  ["Release Manager", "devops", ["ci-cd", "runbooks"]],
] as const;

const ROW_C = [
  ["Product Manager", "product", ["prd", "roadmap", "user-research"]],
  ["Legal Counsel", "legal", ["contract-review", "privacy"]],
  ["Controller", "finance", ["fpa", "board-reporting"]],
  ["Game Designer", "game-development", ["level-design"]],
] as const;

const EDGE_FADE =
  "linear-gradient(90deg, transparent 0%, #000 16%, #000 84%, transparent 100%)";

export const SceneTemplates: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Stage glow={{ x: 0.5, y: 0.46 }}>
      <Camera
        /*
          Scale and drift are bounded so the wall stays inside the frame: a row
          is 1586px wide and the frame is 1920, which leaves 167px a side —
          spend more than that on push and parallax and a card gets guillotined
          at the edge mid-word, which reads as a bug rather than as a wall
          running past the frame.
        */
        moves={[
          { at: 0, over: 1, scale: 1.04, focus: { x: 0.5, y: 0.5 } },
          { at: 20, over: 130, scale: 0.96, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        {/*
          The wall fades out at both edges so it reads as endless rather than as
          four cards. It is a mask, not a painted gradient: an overlay has to
          know what colour is behind it, and this film is drawn on the dark
          ground in one place and straight onto the page in another.
        */}
        <AbsoluteFill
          style={{
            justifyContent: "center",
            overflow: "hidden",
            maskImage: EDGE_FADE,
            WebkitMaskImage: EDGE_FADE,
          }}
        >
          <div style={{ transform: `translateY(${frame * -0.28}px)` }}>
            <TemplateRow items={ROW_A} delay={-6} drift={frame * -0.22} />
            <TemplateRow items={ROW_B} delay={-4} drift={frame * 0.3 - 100} />
            <TemplateRow items={ROW_C} delay={-2} drift={frame * -0.16 + 55} />
          </div>
        </AbsoluteFill>
      </Camera>

    </Stage>
  );
};

const TemplateRow: React.FC<{
  items: readonly (readonly [string, string, readonly string[]])[];
  delay: number;
  /** Horizontal parallax — each row slides at its own rate. */
  drift: number;
}> = ({ items, delay, drift }) => (
  <div
    style={{
      display: "flex",
      gap: 22,
      marginBottom: 22,
      transform: `translateX(${drift}px)`,
      justifyContent: "center",
    }}
  >
    {items.map(([name, cat, skills], i) => (
      <TemplateCard key={name} name={name} cat={cat} skills={skills} at={delay + i * 1.5} />
    ))}
  </div>
);

const TemplateCard: React.FC<{
  name: string;
  cat: string;
  skills: readonly string[];
  at: number;
}> = ({ name, cat, skills, at }) => {
  const frame = useCurrentFrame();
  const light = useTone() === "light";
  // Deliberately not the shared spring: this is the first thing on screen when
  // the page loads, and the wall has to be there, not arriving. Row delays are
  // negative for the same reason — at frame 0 the wall is already settling.
  const s = interpolate(frame, [at, at + 9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  return (
    <div
      style={{
        width: 380,
        flexShrink: 0,
        background: c.card,
        border: `1px solid ${light ? c.border : "rgba(255,255,255,0.10)"}`,
        borderRadius: 18,
        padding: 26,
        boxShadow: light
          ? "0 10px 26px rgba(28,22,18,0.07)"
          : "0 34px 74px rgba(0,0,0,0.55)",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [26, 0])}px) scale(${0.96 + s * 0.04})`,
      }}
    >
      <div
        style={{
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: 1.6,
          textTransform: "uppercase",
          color: c.amber,
          marginBottom: 12,
        }}
      >
        {cat}
      </div>
      <div style={{ fontFamily: serif, fontSize: 25, fontWeight: 600, marginBottom: 16 }}>
        {name}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {skills.map((sk) => (
          <span
            key={sk}
            style={{
              fontFamily: mono,
              fontSize: 12,
              padding: "5px 10px",
              borderRadius: 7,
              background: c.secondary,
              color: c.mutedFg,
            }}
          >
            {sk}
          </span>
        ))}
      </div>
    </div>
  );
};


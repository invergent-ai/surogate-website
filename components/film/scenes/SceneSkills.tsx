import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, PanelHead, Stage } from "../ui/Stage";
import { Heading, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c } from "../ui/tokens";
import { mono } from "../font";

/**
 * Skills.
 *
 * The library is the point, so the library is *behind* the panel: a column of
 * category tiles drifting past out of focus while the skills you picked land in
 * front. Depth does the work a caption would otherwise have to.
 *
 * The wall runs off every edge of frame on purpose — a grid that fits inside the
 * frame reads as a list of eight things, not as a library.
 */

const CATEGORIES = [
  ["marketing", 48], ["mlops", 26], ["productivity", 15], ["finance", 13],
  ["research", 13], ["sales", 8], ["devops", 7], ["health", 7],
  ["operations", 7], ["success", 7], ["design", 6], ["product", 6],
  ["github", 6], ["support", 6], ["strategy", 6], ["study", 5],
  ["legal", 5], ["security", 5], ["data", 5], ["writing", 4],
  ["hr", 4], ["growth", 4], ["engineering", 4], ["education", 3],
  ["analytics", 3], ["procurement", 3], ["recruiting", 3], ["compliance", 3],
  ["logistics", 2], ["partnerships", 2], ["community", 2], ["brand", 2],
  ["localization", 2], ["accessibility", 2], ["pricing", 2], ["onboarding", 2],
  ["forecasting", 2], ["qa", 2], ["billing", 2], ["reporting", 2],
  ["outreach", 2], ["retention", 2],
] as const;

/** Real template names, lifted from the marketing library. */
const ATTACHED = [
  "copywriting",
  "content-strategy",
  "ai-seo",
  "ads",
  "competitor-profiling",
  "cold-email",
  "analytics",
  "ab-testing",
  "community-marketing",
  "cro",
] as const;

/** Row height and how much of the list the panel shows at once. */
const ROW = 78;
const VIEWPORT = 5.4 * ROW;

const AUTHORED = 3;

export const SceneSkills: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);

  return (
    <Stage glow={{ x: 0.5, y: 0.46 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 1.06, focus: { x: 0.5, y: 0.5 } },
          { at: t(8), over: t(70), scale: 0.94, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        {/* The library, out of focus behind. */}
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            filter: "blur(3.5px)",
            opacity: 0.34,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 176px)",
              gap: 9,
              // Overscaled so the wall runs off every edge; a grid that fits reads
              // as a short list, not a library.
              transform: `scale(1.34) translateY(${interpolate(frame, [0, t(90)], [0, -70])}px)`,
            }}
          >
            {CATEGORIES.map(([name, n]) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: c.card,
                  borderRadius: 12,
                  padding: "11px 14px",
                  fontFamily: mono,
                  fontSize: 14,
                  color: c.mutedFg,
                }}
              >
                <span>{name}</span>
                <span style={{ color: c.amber }}>{n}</span>
              </div>
            ))}
          </div>
        </AbsoluteFill>

        {/* What you attached, in front. */}
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={820} hot at={t(4)}>
            <PanelHead
              right={
                <Text size={16} muted>
                  {ATTACHED.length} attached
                </Text>
              }
            >
              <Heading size={23}>Skills</Heading>
            </PanelHead>
            <SkillList t={t} />
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/**
 * The attached list, scrolling.
 *
 * Ten skills do not fit a panel this size, and that is the point — the list
 * scrolls so the beat shows more than the frame holds. Rows land as they come
 * into view, but fast enough that the scroll never arrives at an empty row —
 * a gap in the middle of a scrolling list reads as a loading bug.
 */
const SkillList: React.FC<{ t: (frame: number) => number }> = ({ t }) => {
  const frame = useCurrentFrame();
  const travel = ATTACHED.length * ROW - VIEWPORT;
  const scroll = interpolate(frame, [t(34), t(88)], [0, -travel], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ height: VIEWPORT, overflow: "hidden", position: "relative" }}>
      <div style={{ padding: "0 26px", transform: `translateY(${scroll}px)` }}>
        {ATTACHED.map((name, i) => (
          <SkillRow key={name} name={name} cat="marketing" at={t(8 + i * 4)} />
        ))}
      </div>
      {/* Soft edges so rows arrive and leave rather than being cut off. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(#fff 0%, rgba(255,255,255,0) 7%, rgba(255,255,255,0) 88%, #fff 100%)",
        }}
      />
    </div>
  );
};

const SkillRow: React.FC<{ name: string; cat: string; at: number }> = ({
  name,
  cat,
  at,
}) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        height: ROW,
        boxSizing: "border-box",
        borderBottom: `1px solid ${c.border}`,
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [-22, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: c.amber,
          opacity: 0.16,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: mono, fontSize: 19 }}>{name}</div>
        <Text size={15} muted style={{ marginTop: 3 }}>
          Your copy · from template · {cat}
        </Text>
      </div>
      <span style={{ color: c.success, fontSize: 20 }}>✓</span>
    </div>
  );
};

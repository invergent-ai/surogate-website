import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, PanelHead, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono } from "../font";

/**
 * Knowledge.
 *
 * Sources land, the compile runs, the base goes live. The phase label is the
 * product's own vocabulary — staging → summarizing → planning → uploading, the
 * strings the compile task actually writes — because the file counter sits at
 * 0/N through the corpus-wide phases and the phase is what tells you it's alive.
 */

const SOURCES = [
  { name: "product-handbook.pdf", meta: "PDF · 84 pages", mark: "PDF" },
  { name: "docs.northwind.com", meta: "Website · 212 pages", mark: "WEB" },
  { name: "Launch brief — Q3", meta: "Google Doc", mark: "DOC" },
  { name: "northwind/pricing", meta: "Repository · main", mark: "GIT" },
] as const;

const PHASES = ["staging", "summarizing", "planning", "uploading"] as const;

const AUTHORED = 3;

export const SceneKnowledge: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);

  const compileFrom = t(38);
  const compileTo = t(78);
  const progress = interpolate(frame, [compileFrom, compileTo], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const done = progress >= 1;
  const phase = PHASES[Math.min(PHASES.length - 1, Math.floor(progress * PHASES.length))];
  const pages = Math.round(progress * 296);

  return (
    <Stage glow={{ x: 0.46, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.95, focus: { x: 0.5, y: 0.5 } },
          { at: compileFrom, over: t(30), scale: 1.14, focus: { x: 0.5, y: 0.62 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={900} hot at={0}>
            <PanelHead
              right={
                done ? (
                  <Pill tone="success" style={{ fontSize: 15, padding: "6px 14px" }}>
                    Active
                  </Pill>
                ) : (
                  <Pill tone="amber" style={{ fontSize: 15, padding: "6px 14px" }}>
                    Compiling
                  </Pill>
                )
              }
            >
              <Heading size={24}>Northwind Product Docs</Heading>
            </PanelHead>

            <div style={{ padding: "16px 30px 8px" }}>
              {SOURCES.map((s, i) => (
                <SourceRow key={s.name} source={s} at={t(6 + i * 7)} />
              ))}
            </div>

            {/* The compile card. */}
            <div
              style={{
                margin: "12px 30px 28px",
                background: c.secondary,
                border: `1px solid ${done ? c.border : c.amber}`,
                borderRadius: radius,
                padding: "18px 22px",
                opacity: useSpringAt(compileFrom - t(6)),
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text size={17} weight={500}>
                  {done ? "Compiled" : "Compiling knowledge base"}
                </Text>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 16,
                    color: done ? c.green700 : c.mutedFg,
                  }}
                >
                  {done ? `${pages} pages` : phase}
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  borderRadius: 999,
                  background: "#e3dedc",
                  marginTop: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progress * 100}%`,
                    height: "100%",
                    background: done ? c.success : c.amber,
                  }}
                />
              </div>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const SourceRow: React.FC<{ source: (typeof SOURCES)[number]; at: number }> = ({
  source,
  at,
}) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "13px 0",
        borderBottom: `1px solid ${c.border}`,
        opacity: s,
        // Sources *drop in*: they came from somewhere else.
        transform: `translateY(${interpolate(s, [0, 1], [-26, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 46,
          height: 30,
          borderRadius: 7,
          background: c.amber50,
          color: c.amber600,
          fontFamily: mono,
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {source.mark}
      </div>
      <div style={{ flex: 1 }}>
        <Text size={18}>{source.name}</Text>
      </div>
      <Text size={15} muted>
        {source.meta}
      </Text>
    </div>
  );
};

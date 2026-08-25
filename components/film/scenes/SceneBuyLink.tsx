import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * The buy link.
 *
 * One URL is the whole distribution story, so the shot is the URL — copied on
 * camera, with the storefront theme picked beside it. The theme swatches are
 * the real ones from the buy-page themes; Midnight is the default.
 */

const URL = "https://ops.surogate.ai/buy/northwind-marketing";

const THEMES = [
  { name: "Midnight", page: "#120714", card: "#1e0f22", accent: "#ffaf10" },
  { name: "Ink", page: "#0c0a09", card: "#1d1816", accent: "#ffaf10" },
  { name: "Paper", page: "#faf7f4", card: "#ffffff", accent: "#d97706" },
  { name: "Ultraviolet", page: "#0f0a1f", card: "#191233", accent: "#a78bfa" },
] as const;

const AUTHORED = 5;
const COPY_AT = 62;

export const SceneBuyLink: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const copied = frame >= t(COPY_AT);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.5 } },
          { at: t(COPY_AT) - t(10), over: t(24), scale: 1.0, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1240} hot at={0} style={{ padding: "26px 32px 28px" }}>
            <Heading size={24}>Your buy link</Heading>
            <Text size={16} muted style={{ marginTop: 7 }}>
              Send this to customers — it&apos;s where they purchase access and chat with
              the agent.
            </Text>

            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
              <div
                style={{
                  flex: 1,
                  background: c.amber50,
                  border: `1px solid ${c.amber}`,
                  borderRadius: radius,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: mono,
                  fontSize: 18,
                }}
              >
                <span style={{ color: c.success, fontSize: 11 }}>●</span>
                {URL}
              </div>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 600,
                  color: copied ? c.green700 : "#3b2a06",
                  background: copied ? c.green50 : c.amber,
                  border: `1px solid ${copied ? "rgba(34,197,94,0.4)" : "transparent"}`,
                  borderRadius: radius,
                  padding: "13px 22px",
                  whiteSpace: "nowrap",
                }}
              >
                {copied ? "✓ Copied" : "Copy link"}
              </span>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 500,
                  border: `1px solid ${c.border}`,
                  borderRadius: radius,
                  padding: "13px 20px",
                  whiteSpace: "nowrap",
                }}
              >
                Preview ↗
              </span>
            </div>

            <div style={{ marginTop: 26 }}>
              <Text size={18} weight={600}>
                Storefront look
              </Text>
              <Text size={16} muted style={{ marginTop: 6 }}>
                The style buyers see on your buy page.
              </Text>
              <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                {THEMES.map((theme, i) => (
                  <Swatch key={theme.name} theme={theme} at={t(8 + i * 5)} on={i === 0} />
                ))}
              </div>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/** A theme, shown as the thing it produces rather than as a name in a select. */
const Swatch: React.FC<{
  theme: (typeof THEMES)[number];
  at: number;
  on: boolean;
}> = ({ theme, at, on }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        flex: 1,
        border: `1px solid ${on ? c.amber : c.border}`,
        borderRadius: 12,
        padding: 10,
        background: c.card,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
        boxShadow: on ? "0 0 26px rgba(245,158,11,0.2)" : undefined,
      }}
    >
      <div
        style={{
          height: 74,
          borderRadius: 8,
          background: theme.page,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ height: 8, width: "58%", borderRadius: 3, background: theme.accent }} />
        <div style={{ flex: 1, borderRadius: 5, background: theme.card }} />
      </div>
      <Text size={16} weight={on ? 600 : 400} style={{ marginTop: 10 }}>
        {theme.name}
      </Text>
    </div>
  );
};

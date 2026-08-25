import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, PanelHead, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono } from "../font";

/**
 * Tools.
 *
 * The catalogue's own screen — "Connect a tool", the search field, rows with a
 * mark and an Attach on the right. A search term types, the rows land under it,
 * and the row the camera is on flips to Attached. Real product copy throughout.
 *
 * There is no search field: a typed query is a fifth thing to read in a
 * three-second shot, and the caption already says what the screen is.
 *
 * Brand marks are monograms in each service's colour rather than the real
 * logos: the logos live in the running app, not in this repo, and a monogram in
 * the right colour reads at video size anyway.
 */

const TOOLS = [
  { name: "Slack", cat: "Team Communication", mark: "S", tint: "#4a154b" },
  { name: "GitHub", cat: "Developer Tools", mark: "G", tint: "#1f2328" },
  { name: "Notion", cat: "Productivity", mark: "N", tint: "#111111" },
  { name: "Google Drive", cat: "Document Management", mark: "D", tint: "#1a73e8" },
  { name: "Linear", cat: "Project Management", mark: "L", tint: "#5e6ad2" },
] as const;

const AUTHORED = 3;
/** The row the shot is about. */
const TARGET = 1;

export const SceneTools: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const attachAt = t(58);

  return (
    <Stage glow={{ x: 0.52, y: 0.4 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.53 } },
          { at: t(40), over: t(26), scale: 1.12, focus: { x: 0.5, y: 0.56 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={940} hot at={0} style={{ padding: "30px 36px 26px" }}>
            <Heading size={26}>Connect a tool</Heading>
            <Text size={17} muted style={{ marginTop: 8 }}>
              Give this agent access to outside services it can use in new chats.
            </Text>

            <div style={{ marginTop: 22 }}>
              {TOOLS.map((tool, i) => (
                <ToolRow
                  key={tool.name}
                  tool={tool}
                  at={t(16 + i * 6)}
                  attached={i === TARGET && frame >= attachAt}
                />
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const ToolRow: React.FC<{
  tool: (typeof TOOLS)[number];
  at: number;
  attached: boolean;
}> = ({ tool, at, attached }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        background: c.secondary,
        borderRadius: radius,
        padding: "16px 20px",
        marginBottom: 10,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [16, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: tool.tint,
          color: "#fff",
          fontFamily: mono,
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {tool.mark}
      </div>
      <div style={{ flex: 1 }}>
        <Text size={19} weight={500}>
          {tool.name}
        </Text>
        <Text size={15} muted style={{ marginTop: 3 }}>
          {tool.cat}
        </Text>
      </div>
      {attached ? (
        <Pill tone="success" style={{ fontSize: 15, padding: "7px 14px" }}>
          ✓ Attached
        </Pill>
      ) : (
        <Text size={17} style={{ color: c.amber, fontWeight: 500 }}>
          Attach
        </Text>
      )}
    </div>
  );
};

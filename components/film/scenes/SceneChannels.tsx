import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono } from "../font";

/**
 * Channels.
 *
 * The product's own Channels screen, card for card, with its real copy. The
 * only staging is the sequence: the cards land one after another and Telegram
 * flips Off → Active on camera, so the beat has an event in it rather than
 * being a list you read.
 *
 * No panel chrome here — the cards float directly on the stage. Five stacked
 * cards inside a panel would be a screenshot; floating them gives the shot the
 * depth the rest of the film has.
 */

const CHANNELS = [
  { name: "Web", sub: "Your always-on hosted chat page", state: "active" },
  { name: "Slack", sub: "Let people chat from your Slack workspace", state: "active" },
  { name: "Telegram", sub: "Reach people on Telegram", state: "flip" },
  { name: "WhatsApp", sub: "Reply to people on WhatsApp", state: "off" },
  { name: "Website", sub: "Embed a chat bubble on your site", state: "off" },
] as const;

const AUTHORED = 3;

export const SceneChannels: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const flipAt = t(62);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.91, focus: { x: 0.5, y: 0.5 } },
          { at: t(50), over: t(28), scale: 0.97, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <div style={{ width: 840 }}>
            {CHANNELS.map((ch, i) => (
              <ChannelCard
                key={ch.name}
                channel={ch}
                at={t(4 + i * 8)}
                live={ch.state === "active" || (ch.state === "flip" && frame >= flipAt)}
              />
            ))}
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const ChannelCard: React.FC<{
  channel: (typeof CHANNELS)[number];
  at: number;
  live: boolean;
}> = ({ channel, at, live }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: c.card,
        border: `1px solid ${live ? "rgba(34,197,94,0.35)" : c.border}`,
        borderRadius: 16,
        padding: "13px 24px",
        marginBottom: 8,
        boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [22, 0])}px) scale(${
          0.98 + s * 0.02
        })`,
      }}
    >
      <div style={{ flex: 1 }}>
        <Heading size={22}>{channel.name}</Heading>
        <Text size={16} muted style={{ marginTop: 4 }}>
          {channel.sub}
        </Text>
        {channel.name === "Web" ? (
          <div
            style={{
              marginTop: 12,
              display: "inline-block",
              background: c.secondary,
              border: `1px solid ${c.border}`,
              borderRadius: 8,
              padding: "8px 12px",
              fontFamily: mono,
              fontSize: 15,
              color: c.foreground,
            }}
          >
            https://northwind-marketing.cloud.surogate.ai
          </div>
        ) : null}
      </div>
      {live ? (
        <Pill tone="success" style={{ fontSize: 15, padding: "7px 15px" }}>
          Active
        </Pill>
      ) : (
        <div
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: "#3b2a06",
            background: c.amber,
            borderRadius: radius,
            padding: "10px 20px",
          }}
        >
          Connect
        </div>
      )}
    </div>
  );
};

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, PanelHead, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * How far into its own entrance the film opens.
 *
 * Frame 0 used to be genuinely empty — every entrance started there, so the
 * first thing painted was nothing, and `loop` came back to it every pass. The
 * opening beat starts part-way through instead: the panel is nearly in and its
 * contents are still arriving, so the first frame anyone sees is already moving.
 */
const LEAD = 6;
/** The panel's own fade is a longer window, so it needs a longer lead. */
const PANEL_LEAD = 12;

/**
 * Your agents.
 *
 * Where a Work-mode day starts: the ones already running, what they are for,
 * and where people can reach them. The product's own grid — the dashed Create
 * tile first, then a card per agent with its chat count, skills and channels.
 */

const AGENTS = [
  {
    name: "Northwind Marketing",
    mark: "N",
    chats: "128 chats",
    skills: "10 skills",
    channels: ["Web", "Slack", "Telegram"],
    active: "Active 2 minutes ago",
  },
  {
    name: "Support Triage",
    mark: "S",
    chats: "1,406 chats",
    skills: "6 skills",
    channels: ["Web", "WhatsApp"],
    active: "Active just now",
  },
  {
    name: "Contract Review",
    mark: "C",
    chats: "212 chats",
    skills: "4 skills",
    channels: ["Web"],
    active: "Active 1 hour ago",
  },
  {
    name: "Sales Research",
    mark: "R",
    chats: "540 chats",
    skills: "8 skills",
    channels: ["Web", "Slack"],
    active: "Active 12 minutes ago",
  },
  {
    name: "Onboarding Buddy",
    mark: "O",
    chats: "96 chats",
    skills: "5 skills",
    channels: ["Web", "Website"],
    active: "Active 3 hours ago",
  },
] as const;

const AUTHORED = 4;

export const SceneAgents: React.FC = () => {
  const t = useTimeScale(AUTHORED);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.5 } },
          { at: t(10), over: t(80), scale: 1.02, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1180} hot at={-PANEL_LEAD}>
            <PanelHead
              right={
                <Text size={16} muted>
                  All statuses
                </Text>
              }
            >
              <Heading size={25}>Your agents</Heading>
            </PanelHead>

            <div
              style={{
                padding: "22px 28px 28px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
              }}
            >
              <CreateTile at={t(1) - LEAD} />
              {AGENTS.map((a, i) => (
                <AgentCard key={a.name} agent={a} at={t(3 + i * 2) - LEAD} />
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const CreateTile: React.FC<{ at: number }> = ({ at }) => {
  const s = useEnterAt(at);
  return (
    <div
      style={{
        border: `1px dashed ${c.amber}`,
        background: "#fffdf7",
        borderRadius: 14,
        padding: "26px 22px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        minHeight: 168,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px)`,
      }}
    >
      <Text size={20} weight={600} style={{ color: c.amber }}>
        + Create agent
      </Text>
      <Text size={16} muted>
        Start from a template or from scratch.
      </Text>
    </div>
  );
};

const AgentCard: React.FC<{ agent: (typeof AGENTS)[number]; at: number }> = ({
  agent,
  at,
}) => {
  const s = useEnterAt(at);
  return (
    <div
      style={{
        border: `1px solid ${c.border}`,
        background: c.card,
        borderRadius: 14,
        padding: "20px 22px",
        minHeight: 168,
        display: "flex",
        flexDirection: "column",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [16, 0])}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 9,
            background: c.secondary,
            fontFamily: mono,
            fontSize: 17,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {agent.mark}
        </div>
        <Text size={19} weight={600} style={{ flex: 1 }}>
          {agent.name}
        </Text>
        <Pill tone="success" style={{ fontSize: 14, padding: "5px 12px" }}>
          <span style={{ fontSize: 9 }}>●</span> Running
        </Pill>
      </div>

      <Text size={16} muted style={{ marginTop: 14 }}>
        {agent.chats} · {agent.skills}
      </Text>

      <div style={{ display: "flex", gap: 7, marginTop: 12 }}>
        {agent.channels.map((ch) => (
          <span
            key={ch}
            style={{
              fontFamily: sans,
              fontSize: 14,
              color: c.mutedFg,
              background: c.secondary,
              borderRadius: radius - 3,
              padding: "5px 11px",
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      <Text size={15} muted style={{ marginTop: "auto", paddingTop: 14 }}>
        {agent.active}
      </Text>
    </div>
  );
};

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, PanelHead, Stage } from "../ui/Stage";
import { Heading, Text, Toggle } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c } from "../ui/tokens";
import { mono } from "../font";

/**
 * Capabilities.
 *
 * The settings section that answers "what can this thing actually do", scrolled
 * rather than summarised: three capability toggles, then the built-in slash
 * commands — every card the real screen has, in its order, with the product's
 * own titles and descriptions verbatim.
 *
 * The scroll is the shot. Toggles flip on as their row reaches the middle of
 * the panel, so the list arrives switched off and leaves switched on.
 */

type Row = {
  title: string;
  cmd?: string;
  desc: string;
  /** Fraction of the beat at which this row's toggle flips on. 1 = never. */
  flipAt: number;
};

const CAPABILITIES: Row[] = [
  {
    title: "Live browser support",
    desc: "Lets the agent drive a live browser — navigate, click, type and screenshot pages. When off, the browser tools are removed from the agent's sessions.",
    flipAt: 0.06,
  },
  {
    title: "Multi session",
    desc: "Lets each user open multiple sessions with the agent. When off, every user gets one dedicated conversation per channel.",
    flipAt: 0.12,
  },
  {
    title: "Brainstorming gate",
    desc: "Requires the agent to run a brief design pass with the user before creative or implementation work — writing code, drafting docs, building workflows.",
    flipAt: 1,
  },
];

const COMMANDS: Row[] = [
  {
    title: "Compress",
    cmd: "/compress",
    desc: "Lets users manually compress the conversation to free up context.",
    flipAt: 0.3,
  },
  {
    title: "Coding agents",
    cmd: "/code",
    desc: "Surfaces the /code commands so users can run Claude Code or Codex on the workspace using their own connected plan.",
    flipAt: 0.38,
  },
  {
    title: "Deep research workflow",
    cmd: "/deep-research",
    desc: "A planner + writer sub-agent that researches a topic across the web and produces a cited markdown report.",
    flipAt: 0.46,
  },
  {
    title: "Research missions",
    cmd: "/auto-research",
    desc: "An autonomous optimization run (Arbor) that grows a hypothesis tree, evaluates experiments in isolated worktrees, and merges only verified gains.",
    flipAt: 0.54,
  },
  {
    title: "Loops",
    cmd: "/loop",
    desc: "Lets users schedule recurring runs on a fixed interval or self-paced (e.g. /loop 5m /check).",
    flipAt: 0.62,
  },
  {
    title: "Missions",
    cmd: "/mission",
    desc: "Rubric-judged task orchestration that decomposes an objective into sub-agent tasks and evaluates completion.",
    flipAt: 0.7,
  },
  {
    title: "Goals",
    cmd: "/goal",
    desc: "Set a session goal the agent works toward across turns.",
    flipAt: 0.78,
  },
];

/** Fixed heights, so the scroll distance is arithmetic rather than measured. */
const CARD = 128;
const GROUP = 92;
const VIEWPORT = 452;
const AUTHORED = 6;

export const SceneCapabilities: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);

  const content = CAPABILITIES.length * CARD + GROUP + COMMANDS.length * CARD;
  const scroll = interpolate(frame, [t(30), t(168)], [0, -(content - VIEWPORT)], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  /** 0 → 1 across the scroll; what the rows' flipAt is measured against. */
  const through = interpolate(frame, [t(10), t(168)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.5 } },
          { at: t(20), over: t(150), scale: 1.04, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={960} hot at={0}>
            <PanelHead
              right={
                <Text size={16} muted>
                  Configure
                </Text>
              }
            >
              <Heading size={24}>Capabilities</Heading>
            </PanelHead>

            <div style={{ height: VIEWPORT, overflow: "hidden", position: "relative" }}>
              <div style={{ padding: "0 26px", transform: `translateY(${scroll}px)` }}>
                {CAPABILITIES.map((row, i) => (
                  <CapabilityCard
                    key={row.title}
                    row={row}
                    at={t(4 + i * 5)}
                    on={through >= row.flipAt}
                  />
                ))}

                <div
                  style={{
                    height: GROUP,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <Heading size={22}>Slash commands</Heading>
                      <Text size={15} muted style={{ marginTop: 6 }}>
                        Built-in chat commands for this agent.
                      </Text>
                    </div>
                    <div
                      style={{ width: 64, flexShrink: 0, display: "flex", justifyContent: "flex-end" }}
                    >
                      <div
                        style={{ transform: "scale(1.7)", transformOrigin: "right center" }}
                      >
                        <Toggle on={through >= 0.26} />
                      </div>
                    </div>
                  </div>
                </div>

                {COMMANDS.map((row, i) => (
                  <CapabilityCard
                    key={row.title}
                    row={row}
                    at={t(16 + i * 3)}
                    on={through >= row.flipAt}
                  />
                ))}
              </div>

              {/* Soft edges: rows arrive and leave rather than being cut off. */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(#fff 0%, rgba(255,255,255,0) 7%, rgba(255,255,255,0) 89%, #fff 100%)",
                }}
              />
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const CapabilityCard: React.FC<{ row: Row; at: number; on: boolean }> = ({
  row,
  at,
  on,
}) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        height: CARD,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        gap: 20,
        background: on ? c.amber50 : c.secondary,
        border: `1px solid ${on ? "rgba(245,158,11,0.35)" : c.border}`,
        borderRadius: 14,
        padding: "18px 24px",
        marginBottom: 12,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px)`,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Heading size={21}>{row.title}</Heading>
          {row.cmd ? (
            <span
              style={{
                fontFamily: mono,
                fontSize: 15,
                color: c.mutedFg,
                background: c.muted,
                borderRadius: 6,
                padding: "3px 9px",
              }}
            >
              {row.cmd}
            </span>
          ) : null}
        </div>
        <Text size={16} muted style={{ marginTop: 7, lineHeight: 1.4 }}>
          {row.desc}
        </Text>
      </div>
      {/* The switch is scaled up; the wrapper reserves the width it grows into,
          or the description runs underneath it. */}
      <div style={{ width: 64, flexShrink: 0, display: "flex", justifyContent: "flex-end" }}>
        <div style={{ transform: "scale(1.7)", transformOrigin: "right center" }}>
          <Toggle on={on} />
        </div>
      </div>
    </div>
  );
};

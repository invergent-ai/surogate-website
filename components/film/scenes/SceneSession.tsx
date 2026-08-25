import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * The session record.
 *
 * Every run leaves one of these, and it is the screen that makes an agent
 * answerable: the thread with a chip per tool call, and the Tools tab with what
 * each call cost in wall-clock. The beat shows both — the thread for what
 * happened, then the table for what it took.
 *
 * `ask_user_question · 30m 1s` is the row worth waiting for: the agent stopped
 * and waited half an hour for a person. That is the inbox beat, seen from the
 * other side.
 *
 * The header ends in "Add to dataset →", which is where the Develop film starts.
 */

const TITLE = "Launch Content Calendar for Marketing Team";
const SUB =
  "Northwind Marketing · Studio · 1 messages · 9 tool calls · 334.3k tokens · 33m 46s";

const TABS = ["THREAD", "EVENTS", "TOOLS", "SKILLS", "POLICIES", "METADATA"];

const ASK =
  "Give me a weekly content calendar for launch month for a five-person marketing team. The new pricing goes public 12 May. One flagship post a week, everything else supporting.";

type Turn = { tools: string[]; text?: string; at: string };

const THREAD: Turn[] = [
  { tools: ["skill_view"], at: "09:36 AM" },
  { tools: ["search_files", "skills_list"], at: "09:37 AM" },
  {
    tools: ["ask_user_question"],
    text: "A few quick things will shape this a lot — let me confirm before I build it out.",
    at: "09:37 AM",
  },
  { tools: ["kb_read_page", "kb_read_page", "kb_read_page"], at: "10:07 AM" },
  { tools: ["terminal"], at: "10:08 AM" },
];

const TOOLS: [string, string, string][] = [
  ["skill_view", "12:36:57.980", "2.5s"],
  ["search_files", "12:37:12.934", "7.6s"],
  ["skills_list", "12:37:12.936", "989ms"],
  ["ask_user_question", "12:37:41.628", "30m 1s"],
  ["kb_read_page", "13:07:53.619", "386ms"],
  ["kb_read_page", "13:07:54.301", "205ms"],
  ["terminal", "13:08:20.921", "189ms"],
  ["create_artifact", "13:10:06.118", "1.1s"],
];

const AUTHORED = 8;
/** The thread hands over to the tool table here. */
const SWAP = 112;

export const SceneSession: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const swap = t(SWAP);

  const hand = interpolate(frame, [swap, swap + t(12)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = hand < 0.5 ? 2 * hand * hand : 1 - Math.pow(-2 * hand + 2, 2) / 2;
  const onTools = eased >= 0.5;

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.92, focus: { x: 0.5, y: 0.5 } },
          { at: t(12), over: t(50), scale: 0.98, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1400} hot at={0} style={{ padding: "24px 30px 26px" }}>
            {/* Header. */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Heading size={26}>{TITLE}</Heading>
                <Text size={16} muted style={{ marginTop: 6 }}>
                  {SUB}
                </Text>
              </div>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: 500,
                  border: `1px solid ${c.border}`,
                  borderRadius: radius,
                  padding: "10px 18px",
                  whiteSpace: "nowrap",
                }}
              >
                Add to dataset →
              </span>
            </div>

            {/* Tabs — the underline travels rather than jumping. */}
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              {TABS.map((tab, i) => {
                const active = (onTools ? 2 : 0) === i;
                return (
                  <span
                    key={tab}
                    style={{
                      fontFamily: sans,
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: active ? c.foreground : c.mutedFg,
                      background: active ? c.secondary : "transparent",
                      borderRadius: radius - 3,
                      padding: "9px 15px",
                    }}
                  >
                    {tab}
                  </span>
                );
              })}
            </div>

            <div
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: radius,
                marginTop: 14,
                height: 466,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div style={{ opacity: 1 - Math.min(1, eased * 2) }}>
                <Thread t={t} />
              </div>
              {eased > 0.4 ? (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: Math.max(0, (eased - 0.4) / 0.6),
                  }}
                >
                  <ToolTable start={swap} t={t} />
                </div>
              ) : null}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Thread: React.FC<{ t: (f: number) => number }> = ({ t }) => (
  <div style={{ padding: "20px 24px" }}>
    {/* The ask. */}
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div
        style={{
          background: c.amber50,
          border: `1px solid rgba(245,158,11,0.3)`,
          borderRadius: 14,
          padding: "12px 16px",
          fontSize: 16.5,
          lineHeight: 1.45,
          maxWidth: 900,
        }}
      >
        {ASK}
      </div>
    </div>

    {THREAD.map((turn, i) => (
      <Turn key={`${turn.at}-${i}`} turn={turn} at={t(6 + i * 11)} />
    ))}
  </div>
);

const Turn: React.FC<{ turn: Turn; at: number }> = ({ turn, at }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        marginTop: 16,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 5,
            background: c.secondary,
            fontFamily: sans,
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          N
        </div>
        <Text size={15} weight={600}>
          Northwind Marketing
        </Text>
      </div>

      <div
        style={{
          display: "inline-flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
          background: turn.text ? c.muted : "transparent",
          borderRadius: 10,
          padding: turn.text ? "10px 12px" : "6px 0 0",
          marginTop: 6,
        }}
      >
        {turn.text ? (
          <div style={{ fontSize: 16, width: "100%", marginBottom: 8 }}>{turn.text}</div>
        ) : null}
        {turn.tools.map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: c.amber50,
              color: c.amber600,
              borderRadius: 8,
              padding: "6px 11px",
              fontFamily: mono,
              fontSize: 14.5,
            }}
          >
            🔧 {tool}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 7 }}>
        <Text size={13.5} muted>
          {turn.at}
        </Text>
        <span style={{ fontSize: 13, opacity: 0.55 }}>👍</span>
        <span style={{ fontSize: 13, opacity: 0.55 }}>👎</span>
      </div>
    </div>
  );
};

/** What each call cost. The table the thread cannot tell you. */
const ToolTable: React.FC<{ start: number; t: (f: number) => number }> = ({
  start,
  t,
}) => (
  <div style={{ padding: "18px 24px" }}>
    <div
      style={{
        display: "flex",
        padding: "0 14px 12px",
        borderBottom: `1px solid ${c.border}`,
      }}
    >
      {["TOOL", "CALLED AT", "ELAPSED"].map((h, i) => (
        <div
          key={h}
          style={{
            flex: i === 0 ? 2 : 1,
            textAlign: i === 0 ? "left" : "right",
            fontFamily: sans,
            fontSize: 13,
            letterSpacing: "0.09em",
            color: c.mutedFg,
          }}
        >
          {h}
        </div>
      ))}
    </div>

    {TOOLS.map(([tool, calledAt, elapsed], i) => (
      <ToolRow
        key={`${tool}-${i}`}
        tool={tool}
        calledAt={calledAt}
        elapsed={elapsed}
        at={start + t(6 + i * 4)}
        /* The half-hour wait is the point: it stopped and asked a person. */
        slow={elapsed.includes("m ")}
      />
    ))}
  </div>
);

const ToolRow: React.FC<{
  tool: string;
  calledAt: string;
  elapsed: string;
  at: number;
  slow: boolean;
}> = ({ tool, calledAt, elapsed, at, slow }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "11px 14px",
        borderBottom: `1px solid ${c.border}`,
        background: slow ? c.amber50 : "transparent",
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [-10, 0])}px)`,
      }}
    >
      <div style={{ flex: 2, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ color: c.mutedFg, fontSize: 12 }}>▸</span>
        <span style={{ fontFamily: sans, fontSize: 17, fontWeight: 500 }}>{tool}</span>
      </div>
      <div
        style={{
          flex: 1,
          textAlign: "right",
          fontFamily: mono,
          fontSize: 15,
          color: c.mutedFg,
        }}
      >
        {calledAt}
      </div>
      <div
        style={{
          flex: 1,
          textAlign: "right",
          fontFamily: mono,
          fontSize: 15,
          color: slow ? c.amber600 : c.mutedFg,
          fontWeight: slow ? 600 : 400,
        }}
      >
        {elapsed}
      </div>
    </div>
  );
};

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, PanelHead, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { sans } from "../font";

/**
 * The inbox.
 *
 * Agents that can act need somewhere to stop and ask. This is the shot that
 * says a human is still in it: three things waiting, and one of them approved
 * on camera so the beat has a decision in it rather than a list.
 */

const ITEMS = [
  {
    agent: "Northwind Marketing",
    ask: "Approve the launch-week draft before it posts to #launch-q3",
    why: "Publishing needs a human — set in Governance",
    action: "Approve",
  },
  {
    agent: "Support Triage",
    ask: "Refund $129.00 on ticket 4821",
    why: "Over your $100 auto-approve limit",
    action: "Approve",
  },
  {
    agent: "Contract Review",
    ask: "Which NDA template applies to a EU vendor?",
    why: "Asked you a question mid-run",
    action: "Answer",
  },
] as const;

const AUTHORED = 5;
const APPROVE_AT = 66;

export const SceneInbox: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const approveAt = t(APPROVE_AT);
  const approved = frame >= approveAt;

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.93, focus: { x: 0.5, y: 0.5 } },
          { at: approveAt - t(10), over: t(26), scale: 1.02, focus: { x: 0.5, y: 0.52 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={980} hot at={0}>
            <PanelHead
              right={
                <div style={{ display: "flex", gap: 8 }}>
                  {["Active", "Updates", "History"].map((tab, i) => (
                    <span
                      key={tab}
                      style={{
                        fontFamily: sans,
                        fontSize: 15,
                        fontWeight: i === 0 ? 600 : 400,
                        color: i === 0 ? c.foreground : c.mutedFg,
                        background: i === 0 ? c.secondary : "transparent",
                        borderRadius: radius - 3,
                        padding: "6px 13px",
                      }}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
              }
            >
              <div>
                <Heading size={24}>Inbox</Heading>
                <Text size={15} muted style={{ marginTop: 5 }}>
                  Questions and actions your agents need from you
                </Text>
              </div>
            </PanelHead>

            <div style={{ padding: "18px 28px 26px" }}>
              {ITEMS.map((item, i) => (
                <InboxItem
                  key={item.ask}
                  item={item}
                  at={t(8 + i * 10)}
                  done={i === 0 && approved}
                  doneAt={approveAt}
                />
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const InboxItem: React.FC<{
  item: (typeof ITEMS)[number];
  at: number;
  done: boolean;
  doneAt: number;
}> = ({ item, at, done, doneAt }) => {
  const s = useSpringAt(at);
  const settle = useSpringAt(doneAt);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        border: `1px solid ${done ? "rgba(34,197,94,0.4)" : c.border}`,
        background: done ? c.green50 : c.card,
        borderRadius: 13,
        padding: "18px 22px",
        marginBottom: 11,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px)`,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <Text size={15} muted>
          {item.agent}
        </Text>
        <Text size={19} weight={500} style={{ marginTop: 5 }}>
          {item.ask}
        </Text>
        <Text size={15} muted style={{ marginTop: 6 }}>
          {item.why}
        </Text>
      </div>
      {done ? (
        <Pill
          tone="success"
          style={{ fontSize: 16, padding: "9px 18px", transform: `scale(${0.9 + settle * 0.1})` }}
        >
          ✓ Approved
        </Pill>
      ) : (
        <span
          style={{
            fontFamily: sans,
            fontSize: 17,
            fontWeight: 600,
            color: "#3b2a06",
            background: c.amber,
            borderRadius: radius,
            padding: "11px 20px",
            whiteSpace: "nowrap",
          }}
        >
          {item.action}
        </span>
      )}
    </div>
  );
};

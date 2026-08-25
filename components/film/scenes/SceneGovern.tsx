import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Text, Toggle } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono } from "../font";

/**
 * Governance.
 *
 * Policy enforcement on, an allow list, a deny list — the product's own copy —
 * and then the thing a settings screenshot can never show: a call arriving and
 * being refused. The blocked chip is the payoff; the lists are the setup.
 */

const ALLOWED = ["web_search", "kb_search_pages", "slack_send_message", "browser_navigate"];
const DENIED = ["shell_exec", "send_email"];

const AUTHORED = 3;

export const SceneGovern: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const blockAt = t(62);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.97, focus: { x: 0.5, y: 0.5 } },
          { at: blockAt - t(8), over: t(26), scale: 1.12, focus: { x: 0.5, y: 0.56 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 860 }}>
            <Panel width="100%" at={0} style={{ padding: "22px 28px", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <Heading size={22}>Policy enforcement</Heading>
                  <Text size={16} muted style={{ marginTop: 6 }}>
                    Enforce this agent's governance policy — tool access, network
                    egress, and transparency.
                  </Text>
                </div>
                <div style={{ transform: "scale(1.7)", transformOrigin: "right center" }}>
                  <Toggle on />
                </div>
              </div>
            </Panel>

            <Panel width="100%" hot at={t(10)} style={{ padding: "24px 28px 26px" }}>
              <Heading size={22} style={{ marginBottom: 18 }}>
                Tool access
              </Heading>

              <Text size={16} muted style={{ marginBottom: 10 }}>
                Allowed tools
              </Text>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {ALLOWED.map((name, i) => (
                  <ToolChip key={name} name={name} at={t(16 + i * 5)} tone="allow" />
                ))}
              </div>

              <Text size={16} muted style={{ margin: "20px 0 10px" }}>
                Denied tools
              </Text>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {DENIED.map((name, i) => (
                  <ToolChip key={name} name={name} at={t(38 + i * 5)} tone="deny" />
                ))}
              </div>

              {frame >= blockAt ? <BlockedCall start={blockAt} /> : null}
            </Panel>
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const ToolChip: React.FC<{ name: string; at: number; tone: "allow" | "deny" }> = ({
  name,
  at,
  tone,
}) => {
  const s = useSpringAt(at);
  const allow = tone === "allow";
  return (
    <div
      style={{
        fontFamily: mono,
        fontSize: 16,
        padding: "8px 14px",
        borderRadius: 999,
        background: allow ? c.green50 : "#fef2f2",
        color: allow ? c.green700 : "#b91c1c",
        opacity: s,
        transform: `scale(${0.86 + s * 0.14})`,
      }}
    >
      {name}
    </div>
  );
};

/** The refusal, as the run log shows it. */
const BlockedCall: React.FC<{ start: number }> = ({ start }) => {
  const s = useSpringAt(start);
  return (
    <div
      style={{
        marginTop: 22,
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "#fef2f2",
        border: "1px solid #fecaca",
        borderRadius: radius,
        padding: "16px 20px",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px)`,
      }}
    >
      <span style={{ fontSize: 20, color: "#b91c1c" }}>⦸</span>
      <span style={{ fontFamily: mono, fontSize: 17, color: "#b91c1c" }}>
        shell_exec
      </span>
      <Text size={16} style={{ color: "#b91c1c" }}>
        blocked by policy
      </Text>
    </div>
  );
};

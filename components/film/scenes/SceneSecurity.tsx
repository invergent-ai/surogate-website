import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Text, Toggle } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * Governance.
 *
 * The page an agent's blast radius is set on, scrolled: policy enforcement,
 * which tools it may call, which URLs it may open, and the keys it holds.
 *
 * Egress defaults to Deny and the rules are an allow-list — that is the detail
 * worth the frame, because it is the difference between "we log what it did"
 * and "it could not have done that".
 */

const ALLOWED = ["web_search", "kb_search_pages", "slack_send_message", "browser_navigate"];
const DENIED = ["shell_exec", "send_email"];

const RULES: [string, string, string, string][] = [
  ["docs.northwind.com", "443", "https", "Allow"],
  ["*.linkedin.com", "443", "https", "Allow"],
  ["hooks.slack.com", "443", "https", "Allow"],
];

const AUTHORED = 8;

export const SceneSecurity: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);

  const scroll = interpolate(frame, [t(46), t(190)], [0, -586], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.92, focus: { x: 0.5, y: 0.5 } },
          { at: t(12), over: t(40), scale: 0.98, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1420} hot at={0} style={{ padding: "22px 26px 24px" }}>
            <div style={{ height: 500, overflow: "hidden", position: "relative" }}>
              <div style={{ transform: `translateY(${scroll}px)` }}>
                {/* Policy enforcement. */}
                <Card at={t(2)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ flex: 1 }}>
                      <Heading size={23}>Policy enforcement</Heading>
                      <Text size={16} muted style={{ marginTop: 7, lineHeight: 1.45 }}>
                        Enforce this agent&apos;s governance policy — tool access, network
                        egress, and transparency. When off, the agent runs without these
                        guardrails.
                      </Text>
                    </div>
                    <div
                      style={{ transform: "scale(1.6)", transformOrigin: "right center" }}
                    >
                      <Toggle on />
                    </div>
                  </div>
                </Card>

                {/* Tool access. */}
                <Card at={t(8)}>
                  <Heading size={23}>Tool access</Heading>

                  <Text size={17} weight={500} style={{ marginTop: 16 }}>
                    Allowed tools
                  </Text>
                  <Chips names={ALLOWED} tone="allow" at={t(14)} />

                  <Text size={17} weight={500} style={{ marginTop: 18 }}>
                    Denied tools
                  </Text>
                  <Chips names={DENIED} tone="deny" at={t(22)} />
                </Card>

                {/* Egress. */}
                <Card at={t(14)}>
                  <Heading size={23}>Web &amp; browser egress</Heading>
                  <Text size={16} muted style={{ marginTop: 8, lineHeight: 1.45 }}>
                    Governs the URLs the web-fetch and browser tools may open (web_extract,
                    browser_navigate). It does not restrict web_search — a search query is
                    not a URL.
                  </Text>

                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16 }}>
                    <Text size={17}>Default action</Text>
                    <span
                      style={{
                        fontFamily: sans,
                        fontSize: 17,
                        fontWeight: 600,
                        color: "#b91c1c",
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        borderRadius: radius,
                        padding: "9px 20px",
                      }}
                    >
                      Deny <span style={{ color: c.mutedFg, fontWeight: 400 }}>⌄</span>
                    </span>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <RuleRow cells={["DOMAIN", "PORTS", "PROTO", "ACTION"]} head />
                    {RULES.map((rule, i) => (
                      <RuleRow key={rule[0]} cells={rule} at={t(30 + i * 6)} />
                    ))}
                  </div>
                </Card>

                {/* SSH. */}
                <Card at={t(20)}>
                  <Heading size={23}>SSH remote access</Heading>
                  <Text size={16} muted style={{ marginTop: 8, lineHeight: 1.45 }}>
                    Private keys and remote targets this agent can SSH into, using the
                    agent&apos;s own credentials. Host keys are pinned on save so connections
                    fail closed on a changed fingerprint.
                  </Text>

                  <div
                    style={{
                      border: `1px solid ${c.border}`,
                      borderRadius: radius,
                      padding: "16px 20px",
                      marginTop: 16,
                    }}
                  >
                    <Text size={17} weight={600}>
                      SSH keys
                    </Text>
                    <Text size={15} muted style={{ marginTop: 5 }}>
                      Paste a private key (PEM/OpenSSH). Key material is stored securely and
                      never shown again.
                    </Text>
                    <Input>northwind-deploy</Input>
                    <Input mono muted>
                      -----BEGIN OPENSSH PRIVATE KEY-----
                    </Input>
                    <Input mono>••••••••••••••••••</Input>
                  </div>
                </Card>
              </div>

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(#fff 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 93%, #fff 100%)",
                }}
              />
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Card: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        padding: "20px 24px 22px",
        marginBottom: 14,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};

const Chips: React.FC<{ names: string[]; tone: "allow" | "deny"; at: number }> = ({
  names,
  tone,
  at,
}) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 10 }}>
    {names.map((name, i) => (
      <Chip key={name} name={name} tone={tone} at={at + i * 4} />
    ))}
    <span style={{ fontFamily: sans, fontSize: 16, color: c.mutedFg, alignSelf: "center" }}>
      + add ⌄
    </span>
  </div>
);

const Chip: React.FC<{ name: string; tone: "allow" | "deny"; at: number }> = ({
  name,
  tone,
  at,
}) => {
  const s = useSpringAt(at);
  const allow = tone === "allow";
  return (
    <span
      style={{
        fontFamily: mono,
        fontSize: 16,
        padding: "7px 13px",
        borderRadius: 999,
        background: allow ? c.green50 : "#fef2f2",
        color: allow ? c.green700 : "#b91c1c",
        opacity: s,
        transform: `scale(${0.9 + s * 0.1})`,
      }}
    >
      {name}
    </span>
  );
};

const RuleRow: React.FC<{ cells: string[]; head?: boolean; at?: number }> = ({
  cells,
  head,
  at = 0,
}) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "11px 16px",
        borderBottom: `1px solid ${c.border}`,
        opacity: head ? 1 : s,
        transform: head ? undefined : `translateX(${interpolate(s, [0, 1], [-10, 0])}px)`,
      }}
    >
      {cells.map((cell, i) => (
        <div
          key={cell}
          style={{
            flex: i === 0 ? 3 : 1,
            textAlign: i === 0 ? "left" : "right",
            fontFamily: head ? sans : mono,
            fontSize: head ? 13 : 16,
            letterSpacing: head ? "0.09em" : undefined,
            color: head
              ? c.mutedFg
              : i === 3
                ? c.green700
                : i === 0
                  ? c.foreground
                  : c.mutedFg,
          }}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

const Input: React.FC<{
  children: React.ReactNode;
  mono?: boolean;
  muted?: boolean;
}> = ({ children, mono: isMono, muted }) => (
  <div
    style={{
      background: c.secondary,
      borderRadius: radius,
      padding: "12px 16px",
      marginTop: 10,
      fontFamily: isMono ? mono : sans,
      fontSize: 16,
      color: muted ? c.mutedFg : c.foreground,
    }}
  >
    {children}
  </div>
);

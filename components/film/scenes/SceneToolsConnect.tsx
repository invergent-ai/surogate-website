import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * Connecting a tool.
 *
 * Two screens: the three ways in, then the catalogue behind one of them.
 *
 * The catalogue runs alphabetically and it is not curated — 0CodeKit, 1password,
 * 21risk, then eventually Slack and Stripe. Scrolling it from the odd end into
 * the familiar one is what sells the number: a shortlist of five famous logos
 * would read as five integrations.
 */

const WAYS = [
  {
    mark: "▦",
    title: "From your Library",
    desc: "Attach a server you've already added.",
  },
  {
    mark: "❖",
    title: "Toolkits",
    desc: "Attach a ready-made toolkit.",
  },
  {
    mark: "✎",
    title: "Add an MCP server",
    desc: "Connect a new tool by its web address.",
    recommended: true,
  },
] as const;

/** The one the shot follows. */
const WAY = 1;

type Kit = { name: string; cat: string; tint: string; ink?: string };

const KITS: Kit[] = [
  { name: "0CodeKit", cat: "Developer Tools", tint: "#6d4aff" },
  { name: "1password", cat: "Security & Identity Tools", tint: "#1f2328" },
  { name: "21risk", cat: "Business Intelligence", tint: "#0b3d2e" },
  { name: "2chat", cat: "Communication", tint: "#2563eb" },
  { name: "44API", cat: "Taxes", tint: "#111827" },
  { name: "7shifts", cat: "Human Resources", tint: "#e8562a" },
  { name: "Airtable", cat: "Productivity", tint: "#f59e0b", ink: "#3b2a06" },
  { name: "Asana", cat: "Project Management", tint: "#f06a6a" },
  { name: "Attio", cat: "CRM", tint: "#1f2328" },
  { name: "Calendly", cat: "Scheduling", tint: "#0069ff" },
  { name: "ClickUp", cat: "Project Management", tint: "#7b68ee" },
  { name: "Discord", cat: "Communication", tint: "#5865f2" },
  { name: "Dropbox", cat: "Document Management", tint: "#0061fe" },
  { name: "Figma", cat: "Design", tint: "#a259ff" },
  { name: "GitHub", cat: "Developer Tools", tint: "#1f2328" },
  { name: "Gmail", cat: "Email", tint: "#ea4335" },
  { name: "HubSpot", cat: "CRM", tint: "#ff7a59" },
  { name: "Intercom", cat: "Customer Support", tint: "#1f8ded" },
  { name: "Jira", cat: "Project Management", tint: "#2684ff" },
  { name: "Linear", cat: "Project Management", tint: "#5e6ad2" },
  { name: "Notion", cat: "Productivity", tint: "#111111" },
  { name: "Salesforce", cat: "CRM", tint: "#00a1e0" },
  { name: "Sentry", cat: "Developer Tools", tint: "#362d59" },
  { name: "Shopify", cat: "E-commerce", tint: "#5e8e3e" },
  { name: "Slack", cat: "Team Communication", tint: "#4a154b" },
  { name: "Stripe", cat: "Payments", tint: "#635bff" },
  { name: "Zendesk", cat: "Customer Support", tint: "#03363d" },
];

/** Which row attaches — Slack, three rows down once the scroll settles. */
const LAND = 24;
const ROW = 92;

const AUTHORED = 7;
const SWAP = 46;
const ATTACH_AT = 158;

export const SceneToolsConnect: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const swap = t(SWAP);

  const hand = interpolate(frame, [swap, swap + t(16)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = hand < 0.5 ? 2 * hand * hand : 1 - Math.pow(-2 * hand + 2, 2) / 2;
  const outOpacity = Math.max(0, 1 - eased * 2.1);
  const inOpacity = Math.max(0, (eased - 0.5) / 0.5);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.95, focus: { x: 0.5, y: 0.5 } },
          { at: swap, over: t(20), scale: 0.98, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        {/* ── the three ways in ──────────────────────────────── */}
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: outOpacity,
            transform: `translateX(${-eased * 1080}px)`,
          }}
        >
          <Panel width={1240} hot at={0} style={{ padding: "30px 34px 32px" }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <Heading size={26}>Tools</Heading>
                <Text size={17} muted style={{ marginTop: 7 }}>
                  Connect external systems like Slack, Stripe, or your own APIs.
                </Text>
              </div>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: 500,
                  color: c.amber600,
                  border: `1px solid ${c.amber}`,
                  borderRadius: radius,
                  padding: "10px 18px",
                  whiteSpace: "nowrap",
                }}
              >
                🔒 Key vault
              </span>
            </div>

            <div
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 14,
                padding: "22px 24px 20px",
                marginTop: 22,
              }}
            >
              <Text size={19} weight={500}>
                You haven&apos;t connected any tools yet — connect your first one:
              </Text>

              <div style={{ display: "flex", gap: 14, marginTop: 18 }}>
                {WAYS.map((way, i) => (
                  <Way key={way.title} way={way} at={t(6 + i * 6)} picked={i === WAY && frame >= t(34)} />
                ))}
              </div>

              <Text size={15} muted style={{ marginTop: 16 }}>
                Each adds the tool to this agent for new chats.
              </Text>
            </div>
          </Panel>
        </AbsoluteFill>

        {/* ── the catalogue ──────────────────────────────────── */}
        {inOpacity > 0 ? (
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "center",
              opacity: inOpacity,
              transform: `translateX(${(1 - eased) * 1080}px)`,
            }}
          >
            <Catalogue start={swap} t={t} />
          </AbsoluteFill>
        ) : null}
      </Camera>
    </Stage>
  );
};

const Way: React.FC<{
  way: (typeof WAYS)[number];
  at: number;
  picked: boolean;
}> = ({ way, at, picked }) => {
  const s = useSpringAt(at);
  const recommended = "recommended" in way && way.recommended;
  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        border: `1px solid ${picked ? c.amber : recommended ? "rgba(245,158,11,0.5)" : c.border}`,
        background: picked || recommended ? "#fffdf7" : c.card,
        borderRadius: 12,
        padding: "18px 20px 20px",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px) scale(${picked ? 1.02 : 1})`,
        boxShadow: picked ? "0 0 40px rgba(245,158,11,0.25)" : undefined,
      }}
    >
      {recommended ? (
        <span
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            fontFamily: sans,
            fontSize: 13,
            color: c.amber600,
            background: c.amber50,
            borderRadius: 6,
            padding: "3px 9px",
          }}
        >
          Recommended
        </span>
      ) : null}
      <div style={{ fontSize: 22, color: recommended ? c.amber600 : c.foreground }}>
        {way.mark}
      </div>
      <Text size={19} weight={600} style={{ marginTop: 14 }}>
        {way.title}
      </Text>
      <Text size={16} muted style={{ marginTop: 6 }}>
        {way.desc}
      </Text>
    </div>
  );
};

const Catalogue: React.FC<{ start: number; t: (f: number) => number }> = ({
  start,
  t,
}) => {
  const frame = useCurrentFrame();
  const attached = frame >= t(ATTACH_AT);

  // Runs the alphabet fast, then eases to a stop on the row that attaches.
  const scroll = interpolate(
    frame,
    [start + t(10), start + t(78)],
    [0, -(LAND - 3) * ROW],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (x) => 1 - Math.pow(1 - x, 3) },
  );

  return (
    <Panel width={1240} hot at={start} style={{ padding: "26px 30px 28px" }}>
      <Text size={16} muted>
        ← Skills &amp; Tools
      </Text>
      <Heading size={26} style={{ marginTop: 12 }}>
        Connect a tool
      </Heading>
      <Text size={17} muted style={{ marginTop: 7 }}>
        Give this agent access to outside services it can use in new chats.
      </Text>
      <Text size={16} muted style={{ marginTop: 12 }}>
        Ready-made toolkits — attach one to this agent.
      </Text>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: c.secondary,
          border: `1px solid ${c.border}`,
          borderRadius: radius,
          padding: "13px 18px",
          marginTop: 16,
          fontSize: 17,
          color: c.mutedFg,
        }}
      >
        <span>⌕</span> Search toolkits…
      </div>

      <div style={{ height: 372, overflow: "hidden", position: "relative", marginTop: 14 }}>
        <div style={{ transform: `translateY(${scroll}px)` }}>
          {KITS.map((kit, i) => (
            <KitRow
              key={kit.name}
              kit={kit}
              attached={i === LAND && attached}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(#fff 0%, rgba(255,255,255,0) 8%, rgba(255,255,255,0) 88%, #fff 100%)",
          }}
        />
      </div>
    </Panel>
  );
};

const KitRow: React.FC<{ kit: Kit; attached: boolean }> = ({ kit, attached }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 18,
      height: ROW - 10,
      boxSizing: "border-box",
      background: attached ? c.green50 : c.secondary,
      border: `1px solid ${attached ? "rgba(34,197,94,0.35)" : "transparent"}`,
      borderRadius: 12,
      padding: "0 22px",
      marginBottom: 10,
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: kit.tint,
        color: kit.ink ?? "#fff",
        fontFamily: mono,
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {kit.name[0]}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <Text size={19} weight={500}>
        {kit.name}
      </Text>
      <Text size={16} muted style={{ marginTop: 3 }}>
        {kit.cat}
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

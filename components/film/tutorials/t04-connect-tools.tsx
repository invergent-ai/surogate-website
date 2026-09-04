import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { useTone } from "../ui/tone";
import { c, radius } from "../ui/tokens";
import { Box, Hint, Label } from "./work-screens";

/**
 * Tutorial 04 — Connect your tools.
 *
 * Not an MCP tutorial: MCP is one of three routes. Sources —
 *   · the Tools tab and its three cards ... work-configure-tools.png
 *   · the toolkit catalog ................ work-toolkits-catalog.png +
 *                                          features/agents/agent-toolkits.tsx
 *
 * One deliberate divergence: the product names its toolkit provider on screen
 * ("Ready-made Composio toolkits", "Attach a ready-made Composio toolkit").
 * The videos do not name it. Do not "correct" this back to the product string.
 *   · the MCP form ....................... work-configure-add-mcp.png
 *   · the built-in catalog ............... features/agents/builtin-tools.ts,
 *                                          itself generated from
 *                                          server/constants/builtin_tools.py
 */

/* ── step 1 · what it already has ───────────────────────────────── */

/**
 * Not a product screen.
 *
 * The built-in tools have no single page in the app — they are a generated
 * catalog (`builtin-tools.ts`, from `server/constants/builtin_tools.py`) that
 * surfaces as chips inside a governance dropdown. Reproducing that dropdown
 * would show the viewer a control they are not being asked to touch, so this
 * beat is editorial: eight capabilities, each named in plain language with its
 * real tool names underneath as evidence.
 *
 * Drawn on the ground rather than in a Panel, so it reads as the film talking
 * rather than the product being demonstrated.
 */
const BUILTIN: {
  title: string;
  line: string;
  tools: string[];
  icon: React.FC;
}[] = [
  {
    title: "Files",
    line: "Reads, writes and patches files in its workspace.",
    tools: ["read_file", "write_file", "patch", "search_files"],
    icon: () => <G d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8zM14 2.5V8h5.5" />,
  },
  {
    title: "Terminal",
    line: "Runs commands and long-lived processes.",
    tools: ["terminal", "process", "run_coding_agent"],
    icon: () => <G d="M4 17.5 10 11 4 4.5M12 19h8" />,
  },
  {
    title: "Browser",
    line: "Drives a real browser, and can see the page.",
    tools: ["browser_navigate", "browser_click", "browser_screenshot"],
    icon: () => (
      <svg width={26} height={26} viewBox="0 0 24 24" {...tileStroke}>
        <rect x="2.5" y="4" width="19" height="16" rx="2" />
        <path d="M2.5 9h19M6 6.5h.01M8.5 6.5h.01" />
      </svg>
    ),
  },
  {
    title: "The web",
    line: "Searches the public web and reads what it finds.",
    tools: ["web_search", "web_extract"],
    icon: () => (
      <svg width={26} height={26} viewBox="0 0 24 24" {...tileStroke}>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M12 2.5a14 14 0 0 0 0 19 14 14 0 0 0 0-19M2.5 12h19" />
      </svg>
    ),
  },
  {
    title: "Memory",
    line: "Remembers across sessions and searches your docs.",
    tools: ["memory", "session_search", "kb_search_pages"],
    icon: () => <G d="M12 3a5 5 0 0 0-5 5v1a4 4 0 0 0 0 8 4 4 0 0 0 4 4h1zM12 3a5 5 0 0 1 5 5v1a4 4 0 0 1 0 8 4 4 0 0 1-4 4h-1z" />,
  },
  {
    title: "Sub-agents",
    line: "Spawns workers and hands them pieces of the job.",
    tools: ["spawn_worker", "delegate_task", "spawn_task"],
    icon: () => (
      <svg width={26} height={26} viewBox="0 0 24 24" {...tileStroke}>
        <circle cx="12" cy="5" r="2.8" />
        <circle cx="5" cy="18" r="2.8" />
        <circle cx="19" cy="18" r="2.8" />
        <path d="M12 7.8v4.4M12 12.2H5.5v3M12 12.2h6.5v3" />
      </svg>
    ),
  },
  {
    title: "Scheduling",
    line: "Wakes itself up on a schedule you set.",
    tools: ["cron_create", "cron_list", "cron_delete"],
    icon: () => (
      <svg width={26} height={26} viewBox="0 0 24 24" {...tileStroke}>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M12 6.5V12l4 2.5" />
      </svg>
    ),
  },
  {
    title: "Media",
    line: "Generates images and video, and describes what it sees.",
    tools: ["generate_image", "generate_video", "vision_analyze"],
    icon: () => (
      <svg width={26} height={26} viewBox="0 0 24 24" {...tileStroke}>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <circle cx="8.5" cy="10" r="1.8" />
        <path d="m3 17 5.5-5 4.5 4 3.5-3L21.5 17" />
      </svg>
    ),
  },
];

const tileStroke = {
  fill: "none",
  stroke: c.amber,
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const G: React.FC<{ d: string }> = ({ d }) => (
  <svg width={26} height={26} viewBox="0 0 24 24" {...tileStroke}>
    <path d={d} />
  </svg>
);

export const SceneBuiltinTools: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const e = [
    useEnterAt(t(2), 10),
    useEnterAt(t(8), 10),
    useEnterAt(t(14), 10),
    useEnterAt(t(20), 10),
    useEnterAt(t(26), 10),
    useEnterAt(t(32), 10),
    useEnterAt(t(38), 10),
    useEnterAt(t(44), 10),
  ];
  const ink = light ? c.foreground : "#fff";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            width: 1700,
          }}
        >
          {BUILTIN.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 13,
                  padding: "26px 26px 24px",
                  borderRadius: 17,
                  minHeight: 236,
                  background: light
                    ? "rgba(12,10,9,0.03)"
                    : "rgba(255,255,255,0.05)",
                  border: `1px solid ${
                    light ? "rgba(12,10,9,0.08)" : "rgba(255,255,255,0.10)"
                  }`,
                  opacity: e[i],
                  transform: `translateY(${(1 - e[i]) * 14}px)`,
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 13,
                    background: `${c.amber}1f`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon />
                </div>
                <div style={{ fontFamily: sans, fontSize: 26, fontWeight: 600, color: ink }}>
                  {b.title}
                </div>
                <div
                  style={{
                    fontFamily: sans,
                    fontSize: 18,
                    lineHeight: 1.45,
                    flex: 1,
                    color: light ? c.mutedFg : "rgba(255,255,255,0.60)",
                  }}
                >
                  {b.line}
                </div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: light ? "rgba(12,10,9,0.38)" : "rgba(255,255,255,0.34)",
                  }}
                >
                  {b.tools.join("  ·  ")}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · three ways to connect one ─────────────────────────── */

const WAYS = [
  {
    title: "From your Library",
    desc: "Attach a server you've already added.",
    tag: null,
  },
  {
    title: "Toolkits",
    desc: "Attach a ready-made toolkit.",
    tag: null,
  },
  {
    title: "Add an MCP server",
    desc: "Connect a new tool by its web address.",
    tag: "Recommended",
  },
];

export const SceneToolsTab: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const cards = [
    useEnterAt(t(18), 10),
    useEnterAt(t(28), 10),
    useEnterAt(t(38), 10),
  ];
  const foot = useEnterAt(t(56), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1420} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", opacity: head }}>
            <div style={{ flex: 1 }}>
              <Heading size={28}>Tools</Heading>
              <Text size={17} muted style={{ marginTop: 7 }}>
                Connect external systems like Slack, Stripe, or your own APIs.
              </Text>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                border: `1px solid ${c.amber}`,
                borderRadius: radius,
                padding: "11px 18px",
                fontFamily: sans,
                fontSize: 17,
                fontWeight: 500,
                color: c.amber600,
              }}
            >
              <Lock /> Key vault
            </div>
          </div>

          <Text size={18} weight={500} style={{ margin: "26px 0 16px", opacity: head }}>
            You haven&apos;t connected any tools yet — connect your first one:
          </Text>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {WAYS.map((w, i) => (
              <div
                key={w.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                  borderRadius: 13,
                  border: `1px solid ${w.tag ? c.amber : c.border}`,
                  background: w.tag ? "#fffdf7" : c.card,
                  padding: 22,
                  minHeight: 158,
                  opacity: cards[i],
                  transform: `translateY(${(1 - cards[i]) * 12}px)`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <WayGlyph n={i} />
                  {w.tag ? (
                    <span
                      style={{
                        borderRadius: 7,
                        background: `${c.amber}24`,
                        padding: "4px 12px",
                        fontFamily: sans,
                        fontSize: 14,
                        fontWeight: 500,
                        color: c.amber600,
                      }}
                    >
                      {w.tag}
                    </span>
                  ) : null}
                </div>
                <Text size={21} weight={600}>
                  {w.title}
                </Text>
                <Text size={16} muted style={{ lineHeight: 1.45 }}>
                  {w.desc}
                </Text>
              </div>
            ))}
          </div>

          <Text size={16} muted style={{ marginTop: 20, opacity: foot }}>
            Each adds the tool to this agent for new chats.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · the toolkit catalogue ─────────────────────────────── */

/**
 * Name, category, brand colour.
 *
 * The catalog fetches each toolkit's logo over the network, and
 * `ToolkitLogo` falls back to a rounded tile with the first letter when one
 * does not load. A render has no network, so the film draws that fallback —
 * tinted, so six rows do not read as six grey squares.
 */
const TOOLKITS: [string, string, string][] = [
  ["GitHub", "Developer Tools", "#24292f"],
  ["Slack", "Communication", "#4a154b"],
  ["Notion", "Productivity", "#111111"],
  ["Linear", "Project Management", "#5e6ad2"],
  ["HubSpot", "CRM", "#ff7a59"],
  ["Zendesk", "Support", "#03363d"],
];

export const SceneToolkits: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const search = useEnterAt(t(14), 10);
  const rows = [
    useEnterAt(t(26), 10),
    useEnterAt(t(34), 10),
    useEnterAt(t(42), 10),
    useEnterAt(t(50), 10),
    useEnterAt(t(58), 10),
    useEnterAt(t(66), 10),
  ];

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1500} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <Heading size={28} style={{ marginBottom: 7, opacity: head }}>
            Connect a tool
          </Heading>
          <Text size={17} muted style={{ marginBottom: 20, opacity: head }}>
            Ready-made toolkits — attach one to this agent.
          </Text>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#f7f7f6",
              border: `1px solid ${c.border}`,
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 18,
              opacity: search,
            }}
          >
            <SearchGlyph />
            <Text size={17} muted>
              Search 1000+ toolkits...
            </Text>
          </div>

          {TOOLKITS.map(([name, cat, brand], i) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                background: "#f7f7f6",
                border: `1px solid ${c.border}`,
                borderRadius: 11,
                padding: "15px 20px",
                marginBottom: 9,
                opacity: rows[i],
                transform: `translateY(${(1 - rows[i]) * 8}px)`,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 9,
                  background: brand,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: sans,
                  fontSize: 19,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <Text size={19} weight={500}>
                  {name}
                </Text>
                <Text size={15} muted style={{ marginTop: 4 }}>
                  {cat}
                </Text>
              </div>
              <Text size={17} weight={500} style={{ color: c.amber600 }}>
                Attach
              </Text>
            </div>
          ))}
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── glyphs ─────────────────────────────────────────────────────── */

const stroke = {
  fill: "none",
  strokeWidth: 1.85,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SearchGlyph = () => (
  <svg width={19} height={19} viewBox="0 0 24 24" {...stroke} stroke={c.mutedFg}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const Lock = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" {...stroke} stroke={c.amber600}>
    <rect x="4" y="10.5" width="16" height="10.5" rx="2" />
    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </svg>
);

const WayGlyph: React.FC<{ n: number }> = ({ n }) => {
  const col = n === 2 ? c.amber : c.mutedFg;
  if (n === 0) {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" {...stroke} stroke={col}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  }
  if (n === 1) {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" {...stroke} stroke={col}>
        <circle cx="12" cy="6" r="3.2" />
        <circle cx="6" cy="16" r="3.2" />
        <circle cx="18" cy="16" r="3.2" />
      </svg>
    );
  }
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...stroke} stroke={col}>
      <path d="M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
    </svg>
  );
};

/* ── step 4 · or add any MCP server ─────────────────────────────── */

/**
 * `work-configure-add-mcp.png`. Note the hints sit to the *right* of each
 * label rather than under the field — that split label row is what makes this
 * form read as dense-but-calm, and moving them under would change its whole
 * rhythm.
 */
const MCP_FIELDS: [string, string, string, boolean][] = [
  ["Name", "Lowercase, hyphens — e.g. stripe", "stripe", false],
  [
    "What it does",
    "One line — shown wherever this tool appears",
    "Process refunds, look up charges and customers.",
    false,
  ],
  [
    "Connection type",
    "How the agent reaches this tool",
    "Remote endpoint (HTTP)",
    true,
  ],
  ["Web address (URL)", "The tool's MCP endpoint", "https://mcp.stripe.com", false],
  [
    "How do you sign in?",
    "Stored securely in your vault — your agent never sees it.",
    "API key",
    true,
  ],
  ["API key", "Saved securely · you can rotate it later", "rk_live_••••••••••••••••", false],
];

export const SceneMcpForm: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const rows = [
    useEnterAt(t(12), 9),
    useEnterAt(t(20), 9),
    useEnterAt(t(28), 9),
    useEnterAt(t(36), 9),
    useEnterAt(t(44), 9),
    useEnterAt(t(52), 9),
  ];
  const cta = useEnterAt(t(64), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1400} hot at={0} style={{ padding: "30px 38px 30px" }}>
          <Heading size={27} style={{ marginBottom: 6, opacity: head }}>
            Connect a tool
          </Heading>
          <Text size={16} muted style={{ marginBottom: 20, opacity: head }}>
            Give this agent access to outside services it can use in new chats.
          </Text>

          {MCP_FIELDS.map(([label, hint, value, select], i) => (
            <div key={label} style={{ marginBottom: 14, opacity: rows[i] }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginBottom: 7,
                }}
              >
                <Text size={16} weight={500} style={{ flex: 1 }}>
                  {label}
                </Text>
                <Text size={15} muted>
                  {hint}
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#f7f7f6",
                  border: `1px solid ${c.border}`,
                  borderRadius: radius,
                  padding: "12px 15px",
                  minHeight: 42,
                  fontFamily: label === "API key" ? mono : sans,
                  fontSize: 17,
                  color: label === "API key" ? c.mutedFg : c.foreground,
                }}
              >
                <span style={{ flex: 1 }}>{value}</span>
                {select ? <Chevron /> : null}
              </div>
            </div>
          ))}

          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 20, opacity: cta }}>
            <div
              style={{
                background: c.amber,
                color: "#000",
                borderRadius: radius,
                padding: "13px 22px",
                fontFamily: sans,
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Add &amp; connect
            </div>
            <Text size={17} muted>
              Cancel
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 5 · it uses the tool ──────────────────────────────────── */

export const SceneToolUse: React.FC = () => {
  const t = useTimeScale(5);
  const ask = useEnterAt(t(4), 10);
  const call = useEnterAt(t(24), 10);
  const result = useEnterAt(t(44), 10);
  const reply = useEnterAt(t(66), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1260} hot at={0} style={{ padding: "36px 42px 38px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", opacity: ask }}>
            <div
              style={{
                background: "#f5f4f3",
                borderRadius: 16,
                padding: "18px 24px",
                maxWidth: "72%",
                fontFamily: sans,
                fontSize: 22,
                lineHeight: 1.5,
              }}
            >
              Refund order 4471 and tell the customer.
            </div>
          </div>

          {[
            ["stripe · refunds.create", call],
            ["Refunded $49.00 to card ending 4242", result],
          ].map(([label, o], i) => (
            <div
              key={label as string}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: i === 0 ? 26 : 10,
                padding: "13px 16px",
                borderRadius: 10,
                background: "#faf9f8",
                opacity: o as number,
              }}
            >
              <span
                style={{
                  flex: 1,
                  fontFamily: i === 0 ? mono : sans,
                  fontSize: 19,
                  fontStyle: i === 0 ? "normal" : "italic",
                  color: i === 0 ? c.foreground : c.mutedFg,
                }}
              >
                {label as string}
              </span>
              <Chevron />
            </div>
          ))}

          <Text size={22} style={{ marginTop: 22, lineHeight: 1.6, opacity: reply }}>
            Done — $49.00 is back on the card ending 4242, and it should land in
            five to ten business days. I&apos;ve emailed the customer to confirm.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const Chevron = () => (
  <svg width={19} height={19} viewBox="0 0 24 24" {...stroke} stroke={c.mutedFg}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

import React from "react";
import { AbsoluteFill } from "remotion";
import { sans } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Work-mode product screens, rebuilt for the tutorials.
 *
 * These deliberately duplicate what `SceneAgents` and `SceneTemplates` show.
 * Those two are tuned for the marketing films — idealised, fast, and already
 * published on the website — and correcting them there would change what ships.
 * The tutorials need the screen as it actually is, so they get their own.
 *
 * Built against `work-agents-grid.png` and `work-templates-browse.png` in
 * surogate-docs. Authored in frame pixels, roughly 1.33x the app's CSS px.
 */

/* ── shared chrome ──────────────────────────────────────────────── */

/* ── field chrome, matching work-create-agent-form.png ─────────── */

/**
 * Labels are muted and only the first two fields carry the required asterisk —
 * the slug and the model are optional in the real form.
 */
export const Label: React.FC<{
  text: string;
  required?: boolean;
  /** The greyed aside some labels carry: "(optional)", "locked after creation". */
  note?: string;
}> = ({ text, required, note }) => (
  <Text size={16} weight={500} muted style={{ marginBottom: 8 }}>
    {text}
    {required ? <span style={{ color: c.amber }}> *</span> : null}
    {note ? <span style={{ opacity: 0.65 }}> {note}</span> : null}
  </Text>
);

export const Hint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text size={14} muted style={{ marginTop: 7, opacity: 0.8 }}>
    {children}
  </Text>
);

export const Box: React.FC<{
  children: React.ReactNode;
  focused?: boolean;
  minHeight?: number;
}> = ({ children, focused, minHeight = 46 }) => (
  <div
    style={{
      background: "#f7f7f6",
      border: `1px solid ${focused ? c.amber : c.border}`,
      boxShadow: focused ? `0 0 0 3px ${c.amber}22` : "none",
      borderRadius: radius,
      padding: "13px 15px",
      minHeight,
      fontFamily: sans,
      fontSize: 17,
      lineHeight: 1.5,
      color: c.foreground,
    }}
  >
    {children}
  </div>
);


const Avatar: React.FC<{ ch: string }> = ({ ch }) => (
  <div
    style={{
      width: 46,
      height: 46,
      borderRadius: radius,
      background: "#f0efee",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: sans,
      fontSize: 19,
      fontWeight: 600,
      color: c.foreground,
      flexShrink: 0,
    }}
  >
    {ch}
  </div>
);

const Chip: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  outline?: boolean;
}> = ({ children, active, outline }) => (
  <div
    style={{
      fontFamily: sans,
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: active ? "0.06em" : "0.05em",
      padding: "7px 15px",
      borderRadius: 999,
      whiteSpace: "nowrap",
      background: active ? c.primary : outline ? c.card : "#f0efee",
      color: active ? c.primaryFg : c.foreground,
      border: `1px solid ${active ? c.primary : c.border}`,
    }}
  >
    {children}
  </div>
);

/* ── the agents grid ────────────────────────────────────────────── */

const AGENTS = [
  { ch: "T", name: "test-agent", channels: ["Web"] },
  { ch: "S", name: "Slack Marketing", channels: ["Web", "Slack"] },
] as const;

export const SceneAgentsGrid: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(2), 10);
  const bar = useEnterAt(t(10), 10);
  const tile = useEnterAt(t(20), 10);
  const a0 = useEnterAt(t(30), 10);
  const a1 = useEnterAt(t(40), 10);

  return (
    <Stage glow={{ x: 0.42, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.5 } },
          { at: t(50), over: t(85), scale: 1.02, focus: { x: 0.34, y: 0.56 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 1600 }}>
            <Heading
              size={32}
              style={{
                marginBottom: 20,
                opacity: head,
                transform: `translateY(${(1 - head) * 8}px)`,
              }}
            >
              Your agents
            </Heading>

            {/* search + status filter */}
            <div
              style={{
                display: "flex",
                gap: 14,
                marginBottom: 22,
                opacity: bar,
                transform: `translateY(${(1 - bar) * 8}px)`,
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "#f7f7f6",
                  border: `1px solid ${c.border}`,
                  borderRadius: radius,
                  padding: "14px 18px",
                }}
              >
                <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2} strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <Text size={17} muted>
                  Search agents...
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 34,
                  background: c.card,
                  border: `1px solid ${c.border}`,
                  borderRadius: radius,
                  padding: "14px 18px",
                }}
              >
                <Text size={17}>All statuses</Text>
                <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
              }}
            >
              {/* the create tile — what this step is pointing at */}
              <div
                style={{
                  background: "#fffdf7",
                  border: `1px dashed ${c.amber}`,
                  borderRadius: radius + 2,
                  minHeight: 250,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  opacity: tile,
                  transform: `translateY(${(1 - tile) * 12}px)`,
                }}
              >
                <Text size={22} weight={600} style={{ color: c.amber600 }}>
                  + Create agent
                </Text>
                <Text size={17} muted>
                  Start from a template or from scratch.
                </Text>
              </div>

              {AGENTS.map((a, i) => (
                <AgentCard key={a.name} agent={a} enter={i === 0 ? a0 : a1} />
              ))}
            </div>
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const AgentCard: React.FC<{
  agent: (typeof AGENTS)[number];
  enter: number;
}> = ({ agent, enter }) => (
  <div
    style={{
      background: c.card,
      border: `1px solid ${c.border}`,
      borderRadius: radius + 2,
      padding: "20px 22px 22px",
      minHeight: 250,
      opacity: enter,
      transform: `translateY(${(1 - enter) * 12}px)`,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <Avatar ch={agent.ch} />
      <Text size={20} weight={600} style={{ flex: 1 }}>
        {agent.name}
      </Text>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: c.green50,
          color: c.green700,
          fontFamily: sans,
          fontSize: 15,
          fontWeight: 500,
          padding: "6px 13px",
          borderRadius: 999,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: c.success,
          }}
        />
        Running
      </div>
    </div>

    <Text size={18} style={{ marginTop: 18 }}>
      0 chats
    </Text>
    <Text size={16} muted style={{ marginTop: 9 }}>
      No skills
    </Text>

    <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
      {agent.channels.map((ch) => (
        <div
          key={ch}
          style={{
            background: "#f0efee",
            borderRadius: 8,
            padding: "6px 13px",
            fontFamily: sans,
            fontSize: 15,
            color: c.foreground,
          }}
        >
          {ch}
        </div>
      ))}
    </div>

    <Text size={15} muted style={{ marginTop: 16 }}>
      Not active yet
    </Text>
  </div>
);

/* ── the templates page ─────────────────────────────────────────── */

const CATEGORIES = [
  "STRATEGY 4", "MARKETING 13", "SALES 5", "SUPPORT 4", "SUCCESS 4",
  "PRODUCT 4", "DESIGN 5", "WEB DEVELOPMENT 3", "ENGINEERING 2", "DEVOPS 2",
  "SECURITY 1", "IT SUPPORT 1", "AI ENGINEERING 4", "DATA 4", "RESEARCH 3",
  "GAME DEVELOPMENT 3", "HR 5", "FINANCE 4", "LEGAL 3", "OPERATIONS 4",
  "HEALTH 3", "STUDY 3", "PRODUCTIVITY 5",
];

const TEMPLATES = [
  {
    ch: "+",
    name: "Empty Agent",
    cat: null,
    desc: "Empty agent, ready to be configured. Start from scratch: pick your own model, skills, MCP servers, and system prompt.",
    skills: [] as string[],
    cta: "Start from scratch",
  },
  {
    ch: "C",
    name: "Corporate Development",
    cat: "STRATEGY",
    desc: "Drives partnerships, alliances, and corp-dev: builds the partner thesis, evaluates and structures deals, sizes the markets they open, and runs comps to value an...",
    skills: ["strategy-context", "partnerships", "market-analysis", "comps-analysis"],
    cta: "Use template",
  },
  {
    ch: "F",
    name: "Founder / CEO",
    cat: "STRATEGY",
    desc: "Thinks alongside a founder or CEO on the whole company: the business model and strategic plan, the market and where to play, how to win against...",
    skills: ["strategy-context", "business-planning", "market-analysis", "competitive-strategy", "fundraising"],
    cta: "Use template",
  },
];

export const SceneTemplatesPage: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(2), 10);
  const chips = useEnterAt(t(12), 10);
  const c0 = useEnterAt(t(24), 10);
  const c1 = useEnterAt(t(34), 10);
  const c2 = useEnterAt(t(44), 10);
  const enters = [c0, c1, c2];

  return (
    <Stage glow={{ x: 0.5, y: 0.4 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.93, focus: { x: 0.5, y: 0.48 } },
          { at: t(55), over: t(85), scale: 0.99, focus: { x: 0.5, y: 0.56 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 1660 }}>
            <div
              style={{
                opacity: head,
                transform: `translateY(${(1 - head) * 8}px)`,
              }}
            >
              <Text
                size={17}
                weight={600}
                muted
                style={{ letterSpacing: "0.09em" }}
              >
                OR BROWSE ALL TEMPLATES
              </Text>
              <Text size={17} muted style={{ marginTop: 7 }}>
                Pick a starting point — refine after.
              </Text>
            </div>

            <div
              style={{
                marginTop: 20,
                paddingBottom: 12,
                borderBottom: `1px solid ${c.border}`,
                width: 300,
                opacity: head,
              }}
            >
              <Text size={17} muted>
                Search templates...
              </Text>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 18,
                opacity: chips,
                transform: `translateY(${(1 - chips) * 8}px)`,
              }}
            >
              <Chip active>ALL 89</Chip>
              {CATEGORIES.map((cat) => (
                <Chip key={cat} outline>
                  {cat}
                </Chip>
              ))}
            </div>

            <Text
              size={16}
              muted
              style={{ textAlign: "right", marginTop: 12, opacity: chips }}
            >
              89 templates · 23 categories
            </Text>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
                marginTop: 16,
              }}
            >
              {TEMPLATES.map((tpl, i) => (
                <TemplateCard key={tpl.name} tpl={tpl} enter={enters[i]} />
              ))}
            </div>
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const TemplateCard: React.FC<{
  tpl: (typeof TEMPLATES)[number];
  enter: number;
}> = ({ tpl, enter }) => (
  <div
    style={{
      background: c.card,
      border: `1px solid ${c.border}`,
      borderRadius: radius + 2,
      padding: "22px 24px 24px",
      minHeight: 360,
      display: "flex",
      flexDirection: "column",
      opacity: enter,
      transform: `translateY(${(1 - enter) * 12}px)`,
    }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      <Avatar ch={tpl.ch} />
      <div>
        <Text size={20} weight={600}>
          {tpl.name}
        </Text>
        {tpl.cat ? (
          <div
            style={{
              display: "inline-block",
              marginTop: 8,
              background: "#f0efee",
              border: `1px solid ${c.border}`,
              borderRadius: 7,
              padding: "4px 11px",
              fontFamily: sans,
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.05em",
              color: c.foreground,
            }}
          >
            {tpl.cat}
          </div>
        ) : null}
      </div>
    </div>

    <Text size={17} muted style={{ marginTop: 18, lineHeight: 1.5 }}>
      {tpl.desc}
    </Text>

    {tpl.skills.length ? (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Text
            size={15}
            weight={600}
            style={{ color: c.amber600, letterSpacing: "0.07em" }}
          >
            SKILLS
          </Text>
          <div
            style={{
              background: "#f0efee",
              borderRadius: 6,
              padding: "2px 9px",
              fontFamily: sans,
              fontSize: 14,
              color: c.mutedFg,
            }}
          >
            {tpl.skills.length}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {tpl.skills.map((sk) => (
            <div
              key={sk}
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 7,
                padding: "5px 11px",
                fontFamily: sans,
                fontSize: 15,
                color: c.foreground,
              }}
            >
              {sk}
            </div>
          ))}
        </div>
      </>
    ) : null}

    <Text size={18} weight={500} style={{ marginTop: "auto", paddingTop: 20 }}>
      {tpl.cta} →
    </Text>
  </div>
);

/* ── the chat interface ─────────────────────────────────────────── */

/**
 * The agent chat, from `work-chat-thread.png` and `work-chat-composer.png`.
 *
 * The thread's shape is the product's: the user's turn is a grey bubble, the
 * agent's reply is plain text with no bubble at all, and a tool call is a
 * single collapsed row with a chevron — not a card. Below it the composer with
 * its Commands / Skills / Scheduled Tasks pills, the context meter, the
 * Simple/Advanced toggle and the amber send button.
 *
 * The exchange is what a just-created agent can honestly do: no knowledge base
 * yet, so it answers from general knowledge and says so — which is exactly the
 * gap the next tutorial closes.
 */
const ASK = "What can you help me with?";
const REPLY =
  "I'm the Acme support assistant. Right now I can answer general questions, draft replies to customers, and search the web when something is time-sensitive.";
const REPLY_2 =
  "Attach your product docs and I'll answer from those instead — with a citation for every claim.";

export const SceneChat: React.FC = () => {
  const t = useTimeScale(5);
  const ask = useEnterAt(t(6), 10);
  const tool = useEnterAt(t(30), 10);
  const r1 = useEnterAt(t(48), 12);
  const r2 = useEnterAt(t(66), 12);
  const composer = useEnterAt(t(2), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.95, focus: { x: 0.5, y: 0.5 } },
          { at: t(70), over: t(75), scale: 1.0, focus: { x: 0.5, y: 0.54 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1300} hot at={0} style={{ padding: "38px 44px 34px" }}>
            {/* the user's turn */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                opacity: ask,
                transform: `translateY(${(1 - ask) * 8}px)`,
              }}
            >
              <div
                style={{
                  background: "#f5f4f3",
                  borderRadius: 16,
                  padding: "18px 24px",
                  maxWidth: "68%",
                  fontFamily: sans,
                  fontSize: 22,
                  lineHeight: 1.5,
                  color: c.foreground,
                }}
              >
                {ASK}
              </div>
            </div>

            {/* a tool call: one collapsed row, not a card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 26,
                padding: "13px 16px",
                borderRadius: 10,
                background: "#faf9f8",
                opacity: tool,
              }}
            >
              <span
                style={{
                  flex: 1,
                  fontFamily: sans,
                  fontSize: 19,
                  fontStyle: "italic",
                  color: c.mutedFg,
                }}
              >
                Checked attached knowledge — none configured yet
              </span>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>

            {/* the agent's reply: plain text, no bubble */}
            <Text
              size={22}
              style={{
                marginTop: 22,
                lineHeight: 1.6,
                opacity: r1,
                transform: `translateY(${(1 - r1) * 6}px)`,
              }}
            >
              {REPLY}
            </Text>
            <Text
              size={22}
              style={{
                marginTop: 16,
                lineHeight: 1.6,
                opacity: r2,
                transform: `translateY(${(1 - r2) * 6}px)`,
              }}
            >
              {REPLY_2}
            </Text>

            <Composer enter={composer} />
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const ComposerPill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      border: `1px solid ${c.border}`,
      borderRadius: 11,
      background: c.card,
      padding: "10px 16px",
      fontFamily: sans,
      fontSize: 17,
      fontWeight: 500,
      color: c.foreground,
    }}
  >
    {children}
  </div>
);

const Composer: React.FC<{ enter: number }> = ({ enter }) => (
  <div
    style={{
      marginTop: 34,
      opacity: enter,
      transform: `translateY(${(1 - enter) * 10}px)`,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 12,
        marginBottom: 14,
      }}
    >
      <ComposerPill>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={c.foreground} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="m4 17 6-6-6-6M12 19h8" />
        </svg>
        Commands
      </ComposerPill>
      <ComposerPill>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={c.foreground} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3 10.5 7.5 15 9l-4.5 1.5L9 15l-1.5-4.5L3 9l4.5-1.5zM18 13l.9 2.6L21.5 17l-2.6.9L18 21l-.9-2.6L14.5 17l2.6-.9z" />
        </svg>
        Skills
      </ComposerPill>
      <ComposerPill>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={c.foreground} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        Scheduled Tasks
      </ComposerPill>
    </div>

    <div
      style={{
        border: `1px solid ${c.border}`,
        borderRadius: 20,
        background: c.card,
        padding: "22px 24px 18px",
      }}
    >
      <Text size={21} muted style={{ marginBottom: 26 }}>
        Send a message...
      </Text>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 11,
            border: `1px solid ${c.border}`,
            background: "#f7f7f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: sans,
            fontSize: 24,
            color: c.foreground,
          }}
        >
          +
        </div>
        <span
          style={{
            width: 15,
            height: 15,
            borderRadius: 999,
            border: `2px solid ${c.border}`,
          }}
        />
        <Text size={17} muted>
          9 %
        </Text>

        <div style={{ flex: 1 }} />

        {/* Simple | Advanced, with Advanced the raised one */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "#f3f1f1",
            borderRadius: 999,
            padding: 4,
          }}
        >
          <span
            style={{
              padding: "9px 18px",
              fontFamily: sans,
              fontSize: 18,
              color: c.mutedFg,
            }}
          >
            Simple
          </span>
          <span
            style={{
              padding: "9px 18px",
              borderRadius: 999,
              background: c.card,
              border: `1px solid ${c.border}`,
              fontFamily: sans,
              fontSize: 18,
              color: c.foreground,
            }}
          >
            Advanced
          </span>
        </div>

        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 999,
            background: "#f5b400",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#1a1408" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

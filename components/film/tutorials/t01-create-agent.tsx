import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Text } from "../ui/kit";
import { Typed, typedFrames, useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { Box, Hint, Label } from "./work-screens";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 01 — Create your first agent from a template.
 *
 * Paced for following along, not for showing off: one action per shot, held
 * long enough to copy. The showcase scenes this borrows from (SceneAgents,
 * SceneTemplates) move three times faster and are reused as-is for the two
 * shots that are pure navigation.
 *
 * Steps track `work/quickstart.md` §1 exactly — same fields, same hint text,
 * same order. If the form changes there, it changes here.
 */

const NAME = "Acme Support Bot";
const DESC =
  "Answers customer questions about Acme's products, pricing and returns. Escalates anything it can't source.";

/* ── step 3 · fill the form ─────────────────────────────────────── */

const FORM_AUTHORED = 5;
const NAME_AT = 20;
const NAME_CPS = 1.5;

export const SceneAgentForm: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(FORM_AUTHORED);

  const nameStart = t(NAME_AT);
  const nameDone = nameStart + typedFrames(NAME, NAME_CPS);
  const descStart = nameDone + t(6);
  const descDone = descStart + typedFrames(DESC, 5.5);

  const slug = NAME.slice(
    0,
    Math.max(0, Math.floor((frame - nameStart) * NAME_CPS)),
  )
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const typingName = frame >= nameStart && frame < nameDone;
  const typingDesc = frame >= descStart && frame < descDone;

  // Hoisted: useEnterAt is a hook, so it cannot live in a helper called from
  // JSX — the order would be an accident of how many rows happened to render.
  // Written out rather than mapped: `.map(useEnterAt)` hands the array index
  // in as the second argument, which is the entrance duration.
  const rows = [
    useEnterAt(t(4), 10),
    useEnterAt(t(12), 10),
    useEnterAt(t(20), 10),
    useEnterAt(t(28), 10),
    useEnterAt(t(36), 10),
  ];
  const row = (i: number) => ({
    opacity: rows[i],
    transform: `translateY(${(1 - rows[i]) * 8}px)`,
  });

  return (
    <Stage glow={{ x: 0.5, y: 0.46 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.92, focus: { x: 0.5, y: 0.5 } },
          { at: nameStart, over: t(90), scale: 0.98, focus: { x: 0.5, y: 0.52 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={900} hot at={0} style={{ padding: "34px 40px 32px" }}>
            <div style={{ marginBottom: 20, ...row(0) }}>
              <Label text="Agent name" required />
              <Box focused={typingName}>
                <Typed
                  text={NAME}
                  at={nameStart}
                  cps={NAME_CPS}
                  caret={typingName}
                />
              </Box>
              <Hint>This is how it appears in your dashboard.</Hint>
            </div>

            <div style={{ marginBottom: 20, ...row(1) }}>
              <Label text="What does this agent do?" required />
              <Box focused={typingDesc} minHeight={84}>
                <Typed text={DESC} at={descStart} cps={5.5} caret={typingDesc} />
              </Box>
              <Hint>
                One or two sentences. This shapes the agent&apos;s persona and
                appears on its overview page.
              </Hint>
            </div>

            {/* Split control: the host is a fixed grey segment, the slug is
                the editable half. One border around both. */}
            <div style={{ marginBottom: 20, ...row(2) }}>
              <Label text="URL slug" />
              <div
                style={{
                  display: "flex",
                  border: `1px solid ${c.border}`,
                  borderRadius: radius,
                  overflow: "hidden",
                  minHeight: 46,
                }}
              >
                <div
                  style={{
                    background: "#f0efee",
                    borderRight: `1px solid ${c.border}`,
                    padding: "13px 16px",
                    fontFamily: sans,
                    fontSize: 17,
                    color: c.mutedFg,
                    whiteSpace: "nowrap",
                  }}
                >
                  cloud.surogate.ai /
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "13px 16px",
                    fontFamily: sans,
                    fontSize: 17,
                    color: typingName ? c.amber : c.foreground,
                  }}
                >
                  {slug}
                </div>
              </div>
              <Hint>
                Locked after creation. Can be renamed later, but changes your
                agent&apos;s public URL and breaks existing integrations.
              </Hint>
            </div>

            <div style={{ marginBottom: 26, ...row(3) }}>
              <Label text="Model" />
              <Box>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 999,
                      background: c.amber,
                    }}
                  />
                  Surogate
                </span>
              </Box>
              <Hint>You can change this later in Configure.</Hint>
            </div>

            <div style={row(4)}>
              <CreateButton />
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/** The real button: sentence case, rocket, sized to its label. */
const CreateButton: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      background: c.amber,
      color: "#3b2a06",
      fontFamily: sans,
      fontSize: 17,
      fontWeight: 600,
      padding: "13px 20px",
      borderRadius: radius,
      transform: `scale(${scale})`,
    }}
  >
    <Rocket />
    Create agent
  </div>
);

const Rocket: React.FC = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#3b2a06" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
  </svg>
);

/* ── step 4 · the provisioning screen ───────────────────────────── */

const PROV_AUTHORED = 5;

/**
 * Ported from the product's own `CreateProgress`
 * (surogate-ops/frontend/src/components/create-progress.tsx): a branded
 * spinner, a headline and subtitle, and a checklist of provisioning steps.
 *
 * Not a card and not a progress bar — the real screen is a centred column on
 * the page. Colours are the component's literals, not the film's tokens: the
 * amber is the Figma brand value and the green is #30d158, neither of which is
 * what `c.amber` / `c.success` hold.
 */
const BRAND_AMBER = "#f5a624";
const STEP_GREEN = "#30d158";
const PROV_STEPS = ["Agent created", "Starting runtime", "Going live"];

export const SceneProvision: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(PROV_AUTHORED);

  // How many steps are done. The last lands with time left to read it.
  const completed =
    frame >= t(120) ? 3 : frame >= t(84) ? 2 : frame >= t(46) ? 1 : 0;

  const enter = useEnterAt(t(2), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: enter,
          transform: `translateY(${(1 - enter) * 12}px)`,
        }}
      >
        {/* The product draws this on a white page, so it needs no card. Over
            the film's dark ground its near-black heading vanished — the panel
            gives the screen the paper it was designed against. */}
        <Panel
          width={860}
          hot
          at={0}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            padding: "54px 64px 58px",
          }}
        >
          <Spinner frame={frame} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: sans,
                fontSize: 40,
                fontWeight: 700,
                lineHeight: 1.15,
                color: c.foreground,
              }}
            >
              Setting up your agent
            </div>
            <div style={{ fontFamily: sans, fontSize: 19, color: c.mutedFg }}>
              This takes about 30 seconds.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 19,
              paddingTop: 19,
            }}
          >
            {PROV_STEPS.map((label, i) => (
              <ProvStep
                key={label}
                label={label}
                status={i < completed ? "done" : i === completed ? "active" : "pending"}
                frame={frame}
              />
            ))}
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/** Faint full track, with a tapered amber arc sweeping round a centred logo. */
const Spinner: React.FC<{ frame: number }> = ({ frame }) => {
  const ring = 150;
  const band = 4;
  return (
    <div
      style={{
        position: "relative",
        width: ring,
        height: ring,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          border: `${band}px solid ${BRAND_AMBER}1f`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          transform: `rotate(${(frame * 9) % 360}deg)`,
          background: `conic-gradient(from 0deg, ${BRAND_AMBER} 0deg, ${BRAND_AMBER} 270deg, rgba(245,166,36,0) 360deg)`,
          WebkitMaskImage: `radial-gradient(farthest-side, transparent calc(100% - ${band}px), #000 calc(100% - ${band}px))`,
          maskImage: `radial-gradient(farthest-side, transparent calc(100% - ${band}px), #000 calc(100% - ${band}px))`,
        }}
      />
      <Img
        src={staticFile("progress-logo.svg")}
        style={{ position: "relative", height: 53 }}
      />
    </div>
  );
};

const ProvStep: React.FC<{
  label: string;
  status: "pending" | "active" | "done";
  frame: number;
}> = ({ label, status, frame }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    {status === "done" ? (
      <span
        style={{
          width: 35,
          height: 35,
          borderRadius: 999,
          border: `2px solid ${STEP_GREEN}73`,
          background: `${STEP_GREEN}1f`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke={STEP_GREEN} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
    ) : status === "active" ? (
      <span
        style={{
          width: 35,
          height: 35,
          borderRadius: 999,
          border: `3px solid ${BRAND_AMBER}40`,
          borderTopColor: BRAND_AMBER,
          transform: `rotate(${(frame * 12) % 360}deg)`,
        }}
      />
    ) : (
      <span
        style={{
          width: 35,
          height: 35,
          borderRadius: 999,
          border: `2px solid ${c.mutedFg}40`,
        }}
      />
    )}
    <span
      style={{
        fontFamily: sans,
        fontSize: 19,
        color:
          status === "done"
            ? STEP_GREEN
            : status === "active"
              ? c.foreground
              : c.mutedFg,
      }}
    >
      {label}
    </span>
  </div>
);

/* ── step 5 · the overview page ─────────────────────────────────── */

const OVERVIEW_AUTHORED = 5;

/**
 * Mirrors `work-agent-overview-page.tsx`.
 *
 * There is no card around this: a page header (name, status pill, copyable
 * endpoint) sits above a five-up grid of "health" cards, each a tinted panel
 * rather than a white one. Metrics are the component's own — 9px radius,
 * `foreground/3%` ground, `foreground/7%` border, an 11px uppercase label
 * tracked at 0.4px, a 15px semibold heading and a 12px description — scaled by
 * the film's 1.33x.
 *
 * Copy is the zero-state of each card, which is what a just-created agent has.
 */

/** foreground #0c0a09 at 3% / 7% over paper, and the amber the CTAs use. */
const CARD_BG = "#f8f8f7";
const CARD_BORDER = "#ececeb";
const AMBER_500 = "#f59e0b";
const EMERALD = "#10b981";
const RUNNING = "#22C55E";

type Health = {
  label: string;
  icon: React.FC;
  head: string;
  desc: string;
  cta: string;
  /** Knowledge/Skills/Tools get a filled button; Channels/Model a plain link. */
  solid: boolean;
  badges?: string[];
};

const HEALTH: Health[] = [
  {
    label: "Knowledge",
    icon: IconBook,
    head: "No docs attached",
    desc: "Your agent answers from general knowledge only.",
    cta: "Add your docs",
    solid: true,
  },
  {
    label: "Skills",
    icon: IconZap,
    head: "No skills",
    desc: "Skills teach your agent how to handle specific requests.",
    cta: "Add a skill",
    solid: true,
  },
  {
    label: "Tools",
    icon: IconWrench,
    head: "No tools",
    desc: "Connect Slack, Stripe, or your own APIs.",
    cta: "Add a tool",
    solid: true,
  },
  {
    label: "Channels",
    icon: IconGlobe,
    head: "Your agent is live",
    desc: "Hosted page requires sign-in — manage access on the Users tab.",
    cta: "Add Slack or widget",
    solid: false,
    badges: ["Web"],
  },
  {
    label: "Model",
    icon: IconSliders,
    head: "Surogate",
    desc: "Upgrade to use your own model — OpenAI, Anthropic, and more.",
    cta: "Manage model",
    solid: false,
  },
];

export const SceneAgentOverview: React.FC = () => {
  const t = useTimeScale(OVERVIEW_AUTHORED);
  const head = useEnterAt(t(2), 10);
  const e = [
    useEnterAt(t(10), 10),
    useEnterAt(t(18), 10),
    useEnterAt(t(26), 10),
    useEnterAt(t(34), 10),
    useEnterAt(t(42), 10),
  ];
  const chats = useEnterAt(t(54), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.95, focus: { x: 0.5, y: 0.5 } },
          { at: t(60), over: t(80), scale: 1.0, focus: { x: 0.5, y: 0.53 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 1660 }}>
            {/* page header: name + status, endpoint controls on the right */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 26,
                opacity: head,
                transform: `translateY(${(1 - head) * 8}px)`,
              }}
            >
              <Text size={30} weight={600} style={{ fontFamily: sans }}>
                {NAME}
              </Text>
              <StatusPill />
              <div style={{ flex: 1 }} />
              <EndpointControl />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 21,
              }}
            >
              {HEALTH.map((card, i) => (
                <HealthCard key={card.label} card={card} enter={e[i]} />
              ))}
            </div>

            <RecentChats enter={chats} />
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const StatusPill: React.FC = () => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      borderRadius: 999,
      padding: "6px 16px 6px 13px",
      fontFamily: sans,
      fontSize: 18,
      fontWeight: 500,
      lineHeight: 1,
      color: RUNNING,
      background: `${RUNNING}1f`,
    }}
  >
    <span
      style={{ width: 9, height: 9, borderRadius: 999, background: RUNNING }}
    />
    Running
  </span>
);

const EndpointControl: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 13,
        borderRadius: 12,
        border: `1px solid ${CARD_BORDER}`,
        background: CARD_BG,
        padding: "12px 16px",
      }}
    >
      <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg }}>
        acme-support-bot.cloud.surogate.ai
      </span>
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="12" height="12" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    </div>
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: 12,
        border: `1px solid ${CARD_BORDER}`,
        background: CARD_BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    </div>
  </div>
);

const HealthCard: React.FC<{ card: Health; enter: number }> = ({
  card,
  enter,
}) => {
  const Icon = card.icon;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 11,
        borderRadius: 12,
        border: `1px solid ${CARD_BORDER}`,
        background: CARD_BG,
        padding: 24,
        minHeight: 254,
        overflow: "hidden",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 12}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <Icon />
        <span
          style={{
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: c.mutedFg,
          }}
        >
          {card.label}
        </span>
      </div>

      <Text size={20} weight={600}>
        {card.head}
      </Text>
      <Text size={16} muted style={{ lineHeight: 1.6 }}>
        {card.desc}
      </Text>

      {card.badges ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {card.badges.map((b) => (
            <span
              key={b}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 8,
                background: `${EMERALD}1f`,
                color: EMERALD,
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 500,
                padding: "5px 15px 5px 12px",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: EMERALD,
                }}
              />
              {b}
            </span>
          ))}
        </div>
      ) : null}

      <div style={{ flex: 1 }} />

      {card.solid ? (
        <div
          style={{
            alignSelf: "flex-start",
            borderRadius: 9,
            background: AMBER_500,
            color: "#000",
            fontFamily: sans,
            fontSize: 17,
            fontWeight: 500,
            padding: "11px 16px",
          }}
        >
          {card.cta}
        </div>
      ) : (
        <div
          style={{
            fontFamily: sans,
            fontSize: 16,
            fontWeight: 500,
            color: AMBER_500,
          }}
        >
          {card.cta}
        </div>
      )}
    </div>
  );
};

/**
 * Recent chats, from `RecentSessionsPanel`.
 *
 * A minute-old agent has no sessions, so this is the panel's empty state — the
 * brand badge, "No chats yet", and the button through to a first chat. Showing
 * a populated list here would be inventing history the viewer cannot have.
 */
const RecentChats: React.FC<{ enter: number }> = ({ enter }) => (
  <div
    style={{
      marginTop: 21,
      display: "flex",
      flexDirection: "column",
      gap: 19,
      borderRadius: 19,
      border: `1px solid ${c.border}`,
      background: c.card,
      padding: "24px 29px",
      minHeight: 400,
      opacity: enter,
      transform: `translateY(${(1 - enter) * 12}px)`,
    }}
  >
    <span
      style={{
        fontFamily: sans,
        fontSize: 15,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.88px",
        lineHeight: 1.2,
        color: c.mutedFg,
      }}
    >
      Recent chats
    </span>

    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 13,
      }}
    >
      <Img src={staticFile("logo-badge.svg")} style={{ height: 64 }} />
      <Text size={20} weight={600}>
        No chats yet
      </Text>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 11,
          borderRadius: 13,
          border: "1px solid rgba(12,10,9,0.12)",
          background: "rgba(12,10,9,0.04)",
          padding: "13px 21px",
          fontFamily: sans,
          fontSize: 17,
          fontWeight: 600,
          color: c.foreground,
        }}
      >
        <svg width={21} height={21} viewBox="0 0 24 24" {...glyph} stroke={c.foreground}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        Start your first chat
        <svg width={21} height={21} viewBox="0 0 24 24" {...glyph} stroke={c.foreground}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
);

/* The five lucide glyphs those cards carry: BookOpen, Zap, Wrench, Globe,
   SlidersHorizontal — drawn rather than pulled in as a dependency. */
const glyph = {
  fill: "none",
  stroke: "#7c6d67",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconBook() {
  return (
    <svg width={21} height={21} viewBox="0 0 24 24" {...glyph}>
      <path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg width={21} height={21} viewBox="0 0 24 24" {...glyph}>
      <path d="M4 14h7l-2 7 9-11h-7l2-7z" />
    </svg>
  );
}

function IconWrench() {
  return (
    <svg width={21} height={21} viewBox="0 0 24 24" {...glyph}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width={21} height={21} viewBox="0 0 24 24" {...glyph}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
    </svg>
  );
}

function IconSliders() {
  return (
    <svg width={21} height={21} viewBox="0 0 24 24" {...glyph}>
      <path d="M21 4H14M10 4H3M21 12H12M8 12H3M21 20H16M12 20H3M14 2v4M8 10v4M16 18v4" />
    </svg>
  );
}

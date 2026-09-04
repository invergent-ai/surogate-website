import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { Typed, useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";
import { useTone } from "../ui/tone";

/**
 * Tutorial 18 — Users and access.
 *
 * From `work/channels/users.md` and `work-publish-users.png`.
 *
 * Accounts are fictional (`@northwind.example`). Real addresses do not go in a
 * film — the docs screenshot for this page has its one row redacted for the
 * same reason.
 *
 * The point the doc leads with, and the video repeats: these users are
 * **separate from your operator account**. Adding someone here lets them chat
 * with one agent; it does not give them the studio.
 */

const RED = "#b42318";
const GREEN = "#059669";

/* ── step 1 · decide who this agent is for ──────────────────────── */

const PATTERNS: [string, string, string][] = [
  ["Your team only", "Add nobody here", "Operators in your tenant reach it from the studio. The public endpoint stays shut."],
  ["Named customers", "Invite them one by one", "The web endpoint asks them to sign in. You choose every name on the list."],
  ["Open sign-up", "Let anyone sign up", "Visitors make their own account. Configure it once, then switch it on per agent."],
  ["Anyone at all", "Use the website widget", "Visitors stay anonymous, and identity stays in your own system."],
];

export const SceneAccessPatterns: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const e = [
    useEnterAt(t(4), 11),
    useEnterAt(t(18), 11),
    useEnterAt(t(32), 11),
    useEnterAt(t(46), 11),
  ];
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, width: 1560 }}>
          {PATTERNS.map(([who, how, body], i) => (
            <div
              key={who}
              style={{
                padding: "26px 28px",
                borderRadius: 16,
                minHeight: 196,
                background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${light ? "rgba(12,10,9,0.08)" : "rgba(255,255,255,0.10)"}`,
                opacity: e[i],
                transform: `translateY(${(1 - e[i]) * 12}px)`,
              }}
            >
              <div style={{ fontFamily: sans, fontSize: 26, fontWeight: 600, color: ink }}>
                {who}
              </div>
              <div
                style={{
                  fontFamily: sans,
                  fontSize: 18,
                  fontWeight: 500,
                  color: c.amber,
                  marginTop: 10,
                }}
              >
                {how}
              </div>
              <div
                style={{
                  fontFamily: sans,
                  fontSize: 18,
                  color: dim,
                  marginTop: 12,
                  lineHeight: 1.5,
                }}
              >
                {body}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · the users tab ─────────────────────────────────────── */

const USERS: [string, string, string][] = [
  ["dana@northwind.example", "Dana Okafor · Google", "3 weeks ago"],
  ["priya@northwind.example", "Priya Raman · Email & password", "3 weeks ago"],
  ["sam@harborlight.example", "Sam Iversen · Slack", "6 days ago"],
];

export const SceneUsersTab: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const bar = useEnterAt(t(16), 10);
  const rows = [useEnterAt(t(26), 9), useEnterAt(t(34), 9), useEnterAt(t(42), 9)];
  const form = useEnterAt(t(62), 12);
  const sent = frame >= t(122);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.44 } },
          { at: t(70), over: t(70), scale: 1.02, focus: { x: 0.5, y: 0.58 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1540} hot at={0} style={{ padding: "28px 34px 30px" }}>
            <div style={{ opacity: head }}>
              <Heading size={26}>Users</Heading>
              <Text size={17} muted style={{ marginTop: 7 }}>
                People who can chat with this agent — separate from your team.
              </Text>
            </div>

            {/* the self-registration switch, off and pointing at Settings */}
            <div style={{ display: "flex", gap: 16, marginTop: 20, opacity: head }}>
              <div
                style={{
                  width: 52,
                  height: 28,
                  borderRadius: 999,
                  background: "#e0dedd",
                  padding: 3,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <div style={{ width: 22, height: 22, borderRadius: 999, background: "#fff" }} />
              </div>
              <div>
                <Text size={18} muted>
                  Let anyone sign up
                </Text>
                <Text size={16} muted style={{ marginTop: 5, opacity: 0.8 }}>
                  Lets visitors create their own account and chat — no invite
                  needed.
                </Text>
                <Text size={16} style={{ marginTop: 5, color: c.amber600 }}>
                  Set up in Settings{" "}
                  <span style={{ color: c.mutedFg }}>to turn this on</span>
                </Text>
              </div>
            </div>

            <div style={{ display: "flex", gap: 14, marginTop: 20, opacity: bar }}>
              <div
                style={{
                  flex: 1,
                  border: `1px solid ${c.border}`,
                  background: "#f7f7f6",
                  borderRadius: 10,
                  padding: "13px 18px",
                  fontFamily: sans,
                  fontSize: 17,
                  color: c.mutedFg,
                }}
              >
                Search users...
              </div>
              <div
                style={{
                  background: c.amber,
                  color: "#000",
                  borderRadius: 10,
                  padding: "13px 24px",
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 600,
                }}
              >
                + Add user
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              {USERS.map(([email, meta, when], i) => (
                <div
                  key={email}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    background: "#f7f7f6",
                    border: `1px solid ${c.border}`,
                    borderRadius: 11,
                    padding: "15px 20px",
                    marginBottom: 10,
                    opacity: rows[i],
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Text size={19} weight={500}>
                      {email}
                    </Text>
                    <Text size={16} muted style={{ marginTop: 5 }}>
                      {meta} · added {when}
                    </Text>
                  </div>
                  <Text size={17} style={{ color: c.amber600 }}>
                    Edit
                  </Text>
                  <Text size={17} muted>
                    Disable
                  </Text>
                  <Text size={17} style={{ color: RED }}>
                    Delete
                  </Text>
                </div>
              ))}
            </div>

            {/* adding one */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 14,
                marginTop: 8,
                padding: "18px 20px",
                border: `1px solid ${c.amber}`,
                background: "#fffdf7",
                borderRadius: 12,
                opacity: form,
              }}
            >
              <div style={{ flex: 1 }}>
                <Text size={15} muted style={{ marginBottom: 7 }}>
                  Email
                </Text>
                <div
                  style={{
                    background: "#fff",
                    border: `1px solid ${c.border}`,
                    borderRadius: 9,
                    padding: "12px 15px",
                    fontFamily: sans,
                    fontSize: 17,
                    minHeight: 44,
                  }}
                >
                  <Typed text="marco@harborlight.example" at={t(76)} cps={2.6} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <Text size={15} muted style={{ marginBottom: 7 }}>
                  Display name <span style={{ opacity: 0.7 }}>optional</span>
                </Text>
                <div
                  style={{
                    background: "#fff",
                    border: `1px solid ${c.border}`,
                    borderRadius: 9,
                    padding: "12px 15px",
                    fontFamily: sans,
                    fontSize: 17,
                    minHeight: 44,
                    color: c.mutedFg,
                  }}
                >
                  Marco
                </div>
              </div>
              <div
                style={{
                  background: sent ? GREEN : c.amber,
                  color: sent ? "#fff" : "#000",
                  borderRadius: 10,
                  padding: "13px 24px",
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {sent ? "Invite sent ✓" : "Send invite"}
              </div>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── step 3 · one person, every channel ─────────────────────────── */

/**
 * The flow has two sides, and showing only one leaves it ambiguous: the bot
 * DMs an 8-character code **and a link to the agent app's `/link` page**, and
 * the user signs in there and enters it. So this scene is Slack on the left and
 * that page on the right, with the code travelling between them.
 *
 * Codes live 10 minutes, are single-use, and are minted at most once per user
 * per 10 minutes. Only prompted in Personal assistant mode.
 */
export const SceneIdentityLink: React.FC = () => {
  const t = useTimeScale(8);
  const left = useEnterAt(t(4), 12);
  const code = useEnterAt(t(24), 12);
  const right = useEnterAt(t(46), 12);
  const entered = useEnterAt(t(72), 12);
  const linked = useEnterAt(t(100), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.97, focus: { x: 0.5, y: 0.46 } },
          { at: t(90), over: t(60), scale: 1.02, focus: { x: 0.5, y: 0.54 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 1620 }}>
            <div style={{ display: "flex", gap: 22, alignItems: "stretch" }}>
              {/* where the code comes from */}
              <Panel width={760} hot at={0} style={{ padding: "26px 28px", opacity: left }}>
                <Text size={15} muted style={{ fontFamily: mono }}>
                  Slack · direct message from the agent
                </Text>
                <Text size={19} style={{ marginTop: 16, lineHeight: 1.55 }}>
                  We haven&apos;t met yet. Sign in and enter this code to
                  connect your account:
                </Text>

                <div
                  style={{
                    marginTop: 18,
                    display: "inline-block",
                    fontFamily: mono,
                    fontSize: 38,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    color: c.amber600,
                    background: `${c.amber}14`,
                    border: `1px solid ${c.amber}59`,
                    borderRadius: 12,
                    padding: "14px 24px",
                    opacity: code,
                  }}
                >
                  A3F7-K9M2
                </div>

                <Text size={16} style={{ marginTop: 16, color: c.amber600, opacity: code }}>
                  acme-support-bot.cloud.surogate.ai/link
                </Text>
                <Text size={15} muted style={{ marginTop: 10, opacity: code }}>
                  Ten minutes, one use.
                </Text>
              </Panel>

              {/* where it goes */}
              <Panel width={760} hot at={0} style={{ padding: "26px 28px", opacity: right }}>
                <Text size={15} muted style={{ fontFamily: mono }}>
                  The agent app · /link
                </Text>
                <Heading size={23} style={{ marginTop: 16 }}>
                  Link a channel
                </Heading>
                <Text size={17} muted style={{ marginTop: 10, lineHeight: 1.5 }}>
                  Signed in as dana@northwind.example
                </Text>

                <Text size={15} muted style={{ marginTop: 22, marginBottom: 8 }}>
                  Pairing code
                </Text>
                <div
                  style={{
                    border: `1px solid ${entered > 0.4 ? c.amber : c.border}`,
                    background: entered > 0.4 ? "#fffdf7" : "#f7f7f6",
                    borderRadius: 10,
                    padding: "15px 18px",
                    fontFamily: mono,
                    fontSize: 26,
                    letterSpacing: "0.12em",
                    minHeight: 62,
                  }}
                >
                  <Typed text="A3F7-K9M2" at={t(72)} cps={1.1} />
                </div>

                <div
                  style={{
                    display: "inline-block",
                    marginTop: 18,
                    background: entered > 0.9 ? c.amber : "#f0efee",
                    color: entered > 0.9 ? "#000" : c.mutedFg,
                    borderRadius: 10,
                    padding: "13px 26px",
                    fontFamily: sans,
                    fontSize: 17,
                    fontWeight: 600,
                  }}
                >
                  Connect
                </div>
              </Panel>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginTop: 20,
                padding: "18px 24px",
                borderRadius: 12,
                border: `1px solid ${GREEN}40`,
                background: `${GREEN}0f`,
                opacity: linked,
              }}
            >
              <span style={{ color: GREEN, fontSize: 21 }}>✓</span>
              <Text size={19} style={{ color: GREEN, flex: 1 }}>
                Linked — one identity now, with the same sessions on web and
                Slack.
              </Text>
              <Text size={16} muted>
                Only asked in Personal assistant mode
              </Text>
            </div>
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── step 4 · the limit follows the person ──────────────────────── */

/**
 * "Usage is tracked per (agent, end user) — and because channel identities
 * link, the limit follows the user across web, Slack, Telegram and WhatsApp;
 * switching channels doesn't reset it."
 *
 * The controls live on the **Monetize** tab, not this page, and there is no
 * per-row override — worth saying, because this is the page people look on.
 */
export const SceneUsageLimits: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const head = useEnterAt(t(4), 12);
  const chans = [
    useEnterAt(t(22), 10),
    useEnterAt(t(32), 10),
    useEnterAt(t(42), 10),
    useEnterAt(t(52), 10),
  ];
  const note = useEnterAt(t(78), 12);
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 1420, textAlign: "center" }}>
          <div
            style={{
              fontFamily: sans,
              fontSize: 32,
              fontWeight: 600,
              color: ink,
              opacity: head,
            }}
          >
            One allowance, wherever they turn up
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 34 }}>
            {["Web", "Slack", "Telegram", "WhatsApp"].map((chan, i) => (
              <div
                key={chan}
                style={{
                  flex: 1,
                  padding: "22px 18px",
                  borderRadius: 14,
                  background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${light ? "rgba(12,10,9,0.08)" : "rgba(255,255,255,0.10)"}`,
                  opacity: chans[i],
                  transform: `translateY(${(1 - chans[i]) * 10}px)`,
                }}
              >
                <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 600, color: ink }}>
                  {chan}
                </div>
                <div style={{ fontFamily: mono, fontSize: 17, color: c.amber, marginTop: 10 }}>
                  same count
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 30,
              padding: "20px 28px",
              borderRadius: 13,
              border: `1px solid ${c.amber}59`,
              background: `${c.amber}14`,
              fontFamily: sans,
              fontSize: 19,
              lineHeight: 1.55,
              color: ink,
              textAlign: "left",
              opacity: note,
            }}
          >
            Tracked per agent and per person, so switching channel does not
            reset it. The controls live on the <strong>Monetize</strong> tab —
            not here, and there is no per-row override.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

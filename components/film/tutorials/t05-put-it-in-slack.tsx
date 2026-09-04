import React from "react";
import { AbsoluteFill } from "remotion";
import { mono, sans } from "../font";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 05 — Put it in Slack.
 *
 * Product screens come from `work-publish-channels.png`,
 * `work-channel-slack-options.png` and the wizard in
 * features/work/work-agent-channels-tab.tsx.
 *
 * The payoff beat is Slack itself, which is not our product and has no
 * screenshot here — it is drawn from Slack's own well-known chrome: aubergine
 * sidebar, channel header with member count, avatar-left message rows, and the
 * APP tag Slack puts beside a bot's name.
 */

/* ── step 1 · the channels page ─────────────────────────────────── */

const CHANNELS: [string, string, "active" | "off"][] = [
  ["Web", "Your always-on hosted chat page", "active"],
  ["Slack", "Let people chat from your Slack workspace", "off"],
  ["Telegram", "Reach people on Telegram", "off"],
  ["WhatsApp", "Reply to people on WhatsApp", "off"],
  ["Website", "Embed a chat bubble on your site", "off"],
];

export const SceneChannelsList: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const rows = [
    useEnterAt(t(12), 10),
    useEnterAt(t(20), 10),
    useEnterAt(t(28), 10),
    useEnterAt(t(36), 10),
    useEnterAt(t(44), 10),
  ];

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1460} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <Heading size={28} style={{ marginBottom: 7, opacity: head }}>
            Channels
          </Heading>
          <Text size={17} muted style={{ marginBottom: 22, opacity: head }}>
            Connect this agent to the places your people already work.
          </Text>

          {CHANNELS.map(([name, desc, state], i) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: "#f7f7f6",
                border: `1px solid ${name === "Slack" ? c.amber : c.border}`,
                borderRadius: 12,
                padding: "18px 22px",
                marginBottom: 11,
                opacity: rows[i],
                transform: `translateY(${(1 - rows[i]) * 8}px)`,
              }}
            >
              <div style={{ flex: 1 }}>
                <Text size={22} weight={600}>
                  {name}
                </Text>
                <Text size={16} muted style={{ marginTop: 5 }}>
                  {desc}
                </Text>
              </div>
              {state === "active" ? (
                <span
                  style={{
                    background: "#d9f5e6",
                    color: "#14855c",
                    borderRadius: 999,
                    padding: "7px 16px",
                    fontFamily: sans,
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  Active
                </span>
              ) : (
                <>
                  <span
                    style={{
                      background: "#eceae9",
                      color: c.mutedFg,
                      borderRadius: 999,
                      padding: "7px 16px",
                      fontFamily: sans,
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    Off
                  </span>
                  <div
                    style={{
                      background: name === "Slack" ? c.amber : "#f59f0b",
                      color: "#000",
                      borderRadius: 9,
                      padding: "11px 22px",
                      fontFamily: sans,
                      fontSize: 17,
                      fontWeight: 600,
                    }}
                  >
                    Connect
                  </div>
                </>
              )}
            </div>
          ))}
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · the connect wizard ────────────────────────────────── */

const STEPS: [string, string][] = [
  ["Create a Slack app", "api.slack.com/apps → Create New App → From scratch"],
  ["Add Bot Token Scopes", "OAuth & Permissions → Bot Token Scopes → add each one"],
  ["Paste your tokens", "App ID, signing secret, and the bot token"],
];

export const SceneSlackWizard: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const rows = [
    useEnterAt(t(12), 10),
    useEnterAt(t(22), 10),
    useEnterAt(t(32), 10),
  ];
  const fields = useEnterAt(t(48), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1180} hot at={0} style={{ padding: "32px 40px 34px" }}>
          <Heading size={28} style={{ marginBottom: 7, opacity: head }}>
            Connect Slack
          </Heading>
          <Text size={17} muted style={{ marginBottom: 24, opacity: head }}>
            Follow these steps — it takes a few minutes.
          </Text>

          {STEPS.map(([title, detail], i) => (
            <div
              key={title}
              style={{
                display: "flex",
                gap: 18,
                marginBottom: 18,
                opacity: rows[i],
                transform: `translateY(${(1 - rows[i]) * 8}px)`,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 999,
                  border: `1.5px solid ${c.amber}`,
                  color: c.amber600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: sans,
                  fontSize: 18,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div>
                <Text size={20} weight={600}>
                  {title}
                </Text>
                <Text size={16} muted style={{ marginTop: 5 }}>
                  {detail}
                </Text>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 8, opacity: fields }}>
            {[
              ["App ID", "A0XXXXXXXX"],
              ["Bot Token", "xoxb-••••••••••••••••"],
            ].map(([label, value]) => (
              <div key={label} style={{ marginBottom: 13 }}>
                <Text size={16} weight={500} muted style={{ marginBottom: 7 }}>
                  {label}
                </Text>
                <div
                  style={{
                    background: "#f7f7f6",
                    border: `1px solid ${c.border}`,
                    borderRadius: radius,
                    padding: "12px 15px",
                    fontFamily: mono,
                    fontSize: 17,
                    color: c.mutedFg,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · how it behaves in Slack ───────────────────────────── */

const OPTIONS: [string, string, boolean][] = [
  [
    "Require @mention",
    "Only replies when @mentioned. Off = replies to every message in any channel it's added to.",
    true,
  ],
  ["Reply in thread", "Keeps replies inside the message thread.", true],
  ["Reply broadcast", "Also posts the threaded reply to the main channel.", false],
];

export const SceneSlackOptions: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const rows = [
    useEnterAt(t(14), 10),
    useEnterAt(t(26), 10),
    useEnterAt(t(38), 10),
  ];
  const free = useEnterAt(t(54), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1300} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 26,
              opacity: head,
            }}
          >
            <span
              style={{
                background: "#d9f5e6",
                color: "#14855c",
                borderRadius: 999,
                padding: "7px 16px",
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Active
            </span>
            <Text size={19} muted>
              Connected to your Slack workspace
            </Text>
          </div>

          <Heading size={24} style={{ marginBottom: 20, opacity: head }}>
            Options
          </Heading>

          {OPTIONS.map(([name, desc, on], i) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                marginBottom: 20,
                opacity: rows[i],
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 32,
                  borderRadius: 999,
                  background: on ? c.amber : "#e0dedd",
                  padding: 4,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 999,
                    background: "#fff",
                    transform: `translateX(${on ? 26 : 0}px)`,
                  }}
                />
              </div>
              <div>
                <Text size={20} weight={500}>
                  {name}
                </Text>
                <Text size={16} muted style={{ marginTop: 5, lineHeight: 1.45 }}>
                  {desc}
                </Text>
              </div>
            </div>
          ))}

          <div style={{ opacity: free }}>
            <Text size={20} weight={500}>
              Free-response channels
            </Text>
            <Text size={16} muted style={{ margin: "6px 0 10px" }}>
              Slack channel IDs (not names) where it answers without being
              @mentioned.
            </Text>
            <div
              style={{
                background: "#f7f7f6",
                border: `1px solid ${c.border}`,
                borderRadius: radius,
                padding: "12px 15px",
                fontFamily: mono,
                fontSize: 17,
                color: c.foreground,
              }}
            >
              C0123ABCD, C0456EFGH
            </div>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 4 · the agent, in Slack ───────────────────────────────── */

/**
 * Slack, drawn rather than screenshotted.
 *
 * This is the only scene in the catalogue that is not our product, so it
 * follows Slack's chrome instead of our tokens: the aubergine #3f0e40 rail,
 * white channel column, a channel header carrying the member count, and
 * avatar-left rows with a bold name and a light timestamp. The APP tag beside
 * the agent's name is Slack's own marker for a bot, and leaving it off would
 * misrepresent what a workspace actually shows.
 */
const SLACK_AUBERGINE = "#3f0e40";
const SLACK_ACTIVE = "#1164a3";
const SLACK_TEXT = "#1d1c1d";
const SLACK_MUTED = "#616061";

const RAIL: [string, boolean][] = [
  ["# general", false],
  ["# support", true],
  ["# eng-oncall", false],
  ["# design", false],
  ["# random", false],
];

const Avatar: React.FC<{ bg: string; ch: string }> = ({ bg, ch }) => (
  <div
    style={{
      width: 44,
      height: 44,
      borderRadius: 9,
      background: bg,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: sans,
      fontSize: 19,
      fontWeight: 700,
      flexShrink: 0,
    }}
  >
    {ch}
  </div>
);

const SlackMsg: React.FC<{
  who: string;
  bg: string;
  ch: string;
  time: string;
  app?: boolean;
  enter: number;
  children: React.ReactNode;
}> = ({ who, bg, ch, time, app, enter, children }) => (
  <div
    style={{
      display: "flex",
      gap: 14,
      padding: "12px 0",
      opacity: enter,
      transform: `translateY(${(1 - enter) * 8}px)`,
    }}
  >
    <Avatar bg={bg} ch={ch} />
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontFamily: sans,
            fontSize: 19,
            fontWeight: 700,
            color: SLACK_TEXT,
          }}
        >
          {who}
        </span>
        {app ? (
          <span
            style={{
              background: "#e8e8e8",
              color: SLACK_MUTED,
              borderRadius: 4,
              padding: "2px 7px",
              fontFamily: sans,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.03em",
            }}
          >
            APP
          </span>
        ) : null}
        <span style={{ fontFamily: sans, fontSize: 15, color: SLACK_MUTED }}>
          {time}
        </span>
      </div>
      <div
        style={{
          fontFamily: sans,
          fontSize: 19,
          lineHeight: 1.55,
          color: SLACK_TEXT,
          marginTop: 4,
        }}
      >
        {children}
      </div>
    </div>
  </div>
);

export const SceneSlackThread: React.FC = () => {
  const t = useTimeScale(5);
  const shell = useEnterAt(t(2), 10);
  const m1 = useEnterAt(t(14), 10);
  const pane = useEnterAt(t(30), 10);
  const reply = useEnterAt(t(46), 10);
  const back = useEnterAt(t(68), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 1660,
            height: 700,
            display: "flex",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 50px 110px rgba(0,0,0,0.45)",
            opacity: shell,
          }}
        >
          {/* workspace rail */}
          <div
            style={{
              width: 270,
              background: SLACK_AUBERGINE,
              padding: "22px 0",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                padding: "0 20px 18px",
                fontFamily: sans,
                fontSize: 21,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Acme
            </div>
            {RAIL.map(([name, active]) => (
              <div
                key={name}
                style={{
                  padding: "9px 20px",
                  background: active ? SLACK_ACTIVE : "transparent",
                  fontFamily: sans,
                  fontSize: 18,
                  color: active ? "#fff" : "rgba(255,255,255,0.72)",
                  fontWeight: active ? 600 : 400,
                }}
              >
                {name}
              </div>
            ))}
          </div>

          {/* the channel — the agent's reply is NOT here */}
          <div
            style={{
              width: 620,
              background: "#fff",
              borderRight: "1px solid #e2e2e2",
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                borderBottom: "1px solid #e2e2e2",
                padding: "18px 22px",
              }}
            >
              <span style={{ fontFamily: sans, fontSize: 21, fontWeight: 700, color: SLACK_TEXT }}>
                # support
              </span>
              <span style={{ fontFamily: sans, fontSize: 15, color: SLACK_MUTED }}>
                12 members
              </span>
            </div>

            <div style={{ flex: 1, padding: "14px 22px" }}>
              <SlackMsg who="Dana" bg="#2c7a5a" ch="D" time="9:41 AM" enter={m1}>
                <span style={{ color: SLACK_ACTIVE }}>@Surogate Agent</span>{" "}
                customer on order 4471 wants a refund — are they inside the
                window?
              </SlackMsg>

              {/* Slack's thread affordance: the channel shows a reply count,
                  not the replies. This is the whole point of the beat. */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  marginLeft: 58,
                  marginTop: -4,
                  opacity: back,
                }}
              >
                <div style={{ display: "flex", gap: 4 }}>
                  <MiniAvatar bg="#f5a624" ch="S" />
                  <MiniAvatar bg="#2c7a5a" ch="D" />
                </div>
                <span
                  style={{
                    fontFamily: sans,
                    fontSize: 16,
                    fontWeight: 600,
                    color: SLACK_ACTIVE,
                  }}
                >
                  2 replies
                </span>
                <span style={{ fontFamily: sans, fontSize: 15, color: SLACK_MUTED }}>
                  Last reply just now
                </span>
              </div>
            </div>

            <div style={{ padding: "0 22px 22px" }}>
              <div
                style={{
                  border: "1px solid #bdbdbd",
                  borderRadius: 10,
                  padding: "13px 16px",
                  fontFamily: sans,
                  fontSize: 17,
                  color: "#9a9a9a",
                }}
              >
                Message #support
              </div>
            </div>
          </div>

          {/* the thread pane — where the agent actually replies */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              opacity: pane,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #e2e2e2",
                padding: "14px 24px",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: sans, fontSize: 20, fontWeight: 700, color: SLACK_TEXT }}>
                  Thread
                </div>
                <div style={{ fontFamily: sans, fontSize: 15, color: SLACK_MUTED, marginTop: 2 }}>
                  # support
                </div>
              </div>
              <span style={{ fontFamily: sans, fontSize: 24, color: SLACK_MUTED }}>
                ✕
              </span>
            </div>

            <div style={{ flex: 1, padding: "12px 24px" }}>
              <SlackMsg who="Dana" bg="#2c7a5a" ch="D" time="9:41 AM" enter={pane}>
                <span style={{ color: SLACK_ACTIVE }}>@Surogate Agent</span>{" "}
                customer on order 4471 wants a refund — are they inside the
                window?
              </SlackMsg>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  margin: "6px 0 2px",
                  opacity: reply,
                }}
              >
                <span style={{ fontFamily: sans, fontSize: 15, color: SLACK_MUTED }}>
                  2 replies
                </span>
                <div style={{ flex: 1, height: 1, background: "#e2e2e2" }} />
              </div>

              <SlackMsg
                who="Surogate Agent"
                bg="#f5a624"
                ch="S"
                time="9:41 AM"
                app
                enter={reply}
              >
                Order 4471 was placed 21 days ago, so yes — inside the 30-day
                window. I can refund the $49.00 now if you want me to.
              </SlackMsg>

              <SlackMsg who="Dana" bg="#2c7a5a" ch="D" time="9:42 AM" enter={back}>
                yes please
              </SlackMsg>
            </div>

            <div style={{ padding: "0 24px 20px" }}>
              <div
                style={{
                  border: "1px solid #bdbdbd",
                  borderRadius: 10,
                  padding: "13px 16px",
                  fontFamily: sans,
                  fontSize: 17,
                  color: "#9a9a9a",
                }}
              >
                Reply…
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    border: "1.5px solid #9a9a9a",
                  }}
                />
                <span style={{ fontFamily: sans, fontSize: 16, color: SLACK_MUTED }}>
                  Also send to #support
                </span>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

const MiniAvatar: React.FC<{ bg: string; ch: string }> = ({ bg, ch }) => (
  <div
    style={{
      width: 26,
      height: 26,
      borderRadius: 6,
      background: bg,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: sans,
      fontSize: 13,
      fontWeight: 700,
    }}
  >
    {ch}
  </div>
);

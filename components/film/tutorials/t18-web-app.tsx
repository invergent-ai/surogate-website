import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";
import { useTone } from "../ui/tone";

/**
 * Tutorial 18 — The agent's own web app.
 *
 * From `work/channels/web.md`. The Web channel is **always on** for every
 * deployed agent: once it is running, `https://<slug>.cloud.surogate.ai` is a
 * real chat app you can send someone. It is a separate React app from the
 * studio, and each user sees only their own sessions and files.
 *
 * The two facts worth the video's time: the slug is fixed at deploy and can
 * only be changed by the Rename button, and on a monetized agent the web app is
 * the one channel a buyer's package can never exclude.
 */

const GREEN = "#059669";

/* ── step 1 · it already has an address ─────────────────────────── */

export const SceneAgentUrl: React.FC = () => {
  const t = useTimeScale(5);
  const card = useEnterAt(t(3), 10);
  const url = useEnterAt(t(20), 12);
  const note = useEnterAt(t(52), 12);
  const locked = useEnterAt(t(78), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: card,
            }}
          >
            <div style={{ flex: 1 }}>
              <Heading size={27}>Web</Heading>
              <Text size={17} muted style={{ marginTop: 8 }}>
                Your always-on hosted chat page
              </Text>
            </div>
            <span
              style={{
                background: "#d9f5e6",
                color: "#14855c",
                borderRadius: 999,
                padding: "7px 17px",
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Active
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 24,
              opacity: url,
            }}
          >
            <div
              style={{
                flex: 1,
                border: `1px solid ${c.border}`,
                background: "#f7f7f6",
                borderRadius: 10,
                padding: "16px 20px",
                fontFamily: mono,
                fontSize: 22,
              }}
            >
              https://
              <span style={{ color: c.amber600 }}>acme-support-bot</span>
              .cloud.surogate.ai
            </div>
            <div
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 10,
                padding: "16px 26px",
                fontFamily: sans,
                fontSize: 17,
                fontWeight: 500,
              }}
            >
              Copy
            </div>
          </div>

          <Text size={19} muted style={{ marginTop: 22, lineHeight: 1.55, opacity: note }}>
            Every deployed agent has this from the moment it starts running.
            Nothing to switch on, nothing to host.
          </Text>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 20,
              padding: "17px 22px",
              borderRadius: 12,
              border: `1px solid ${c.amber}59`,
              background: `${c.amber}14`,
              opacity: locked,
            }}
          >
            <Text size={18} style={{ lineHeight: 1.5 }}>
              The slug is set when you deploy, and fixed after — the{" "}
              <strong>Rename</strong> button on Configure is the only way to
              change it. Pick something readable.
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · what a visitor actually gets ──────────────────────── */

/**
 * The customer-facing app: agent name and avatar, their own session history,
 * a composer, file upload and download, the live browser pane when that
 * capability is on, and an inbox icon. A separate React app from the studio —
 * each user sees only their own sessions and files.
 */
export const SceneWebApp: React.FC = () => {
  const t = useTimeScale(8);
  const shell = useEnterAt(t(2), 10);
  const side = useEnterAt(t(14), 10);
  const rows = [useEnterAt(t(24), 9), useEnterAt(t(32), 9), useEnterAt(t(40), 9)];
  const ask = useEnterAt(t(56), 10);
  const reply = useEnterAt(t(78), 10);
  const composer = useEnterAt(t(20), 10);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.46 } },
          { at: t(70), over: t(70), scale: 1.02, focus: { x: 0.56, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1620} hot at={0} style={{ padding: 0, overflow: "hidden", opacity: shell }}>
            <div style={{ display: "flex", height: 560 }}>
              {/* their own sessions, nobody else's */}
              <div
                style={{
                  width: 340,
                  borderRight: `1px solid ${c.border}`,
                  background: "#fbfaf9",
                  padding: "20px 16px",
                  opacity: side,
                }}
              >
                <div
                  style={{
                    background: c.amber,
                    color: "#000",
                    borderRadius: 10,
                    padding: "12px 16px",
                    fontFamily: sans,
                    fontSize: 17,
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  New chat
                </div>
                <Text size={14} muted style={{ margin: "20px 6px 10px", letterSpacing: "0.09em" }}>
                  YOUR CHATS
                </Text>
                {[
                  "Refund on order 4471",
                  "Which plan includes SSO?",
                  "Invoice for March",
                ].map((title, i) => (
                  <div
                    key={title}
                    style={{
                      borderRadius: 9,
                      padding: "11px 13px",
                      marginBottom: 4,
                      background: i === 0 ? "rgba(12,10,9,0.06)" : "transparent",
                      fontFamily: sans,
                      fontSize: 16,
                      color: i === 0 ? c.foreground : c.mutedFg,
                      opacity: rows[i],
                    }}
                  >
                    {title}
                  </div>
                ))}
              </div>

              {/* the chat */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    borderBottom: `1px solid ${c.border}`,
                    padding: "18px 26px",
                    opacity: side,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 11,
                      background: `${c.amber}24`,
                      color: c.amber600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: sans,
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    A
                  </div>
                  <Text size={20} weight={600} style={{ flex: 1 }}>
                    Acme Support Bot
                  </Text>
                  {/* the inbox lives here too */}
                  <div style={{ position: "relative" }}>
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-6l-2 3h-4l-2-3H2M5.5 5.5h13l3.5 6.5v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z" />
                    </svg>
                    <span
                      style={{
                        position: "absolute",
                        top: -3,
                        right: -3,
                        width: 10,
                        height: 10,
                        borderRadius: 999,
                        background: c.amber,
                      }}
                    />
                  </div>
                </div>

                <div style={{ flex: 1, padding: "22px 26px" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", opacity: ask }}>
                    <div
                      style={{
                        background: "#f5f4f3",
                        borderRadius: 15,
                        padding: "15px 20px",
                        maxWidth: "72%",
                        fontFamily: sans,
                        fontSize: 19,
                        lineHeight: 1.5,
                      }}
                    >
                      Can I get a refund on order 4471?
                    </div>
                  </div>
                  <Text size={19} style={{ marginTop: 20, lineHeight: 1.6, opacity: reply }}>
                    Yes — you are 21 days in, and our window is 30 days. I can
                    put the £49 back on the card ending 4242 now.
                  </Text>
                </div>

                <div style={{ padding: "0 26px 22px", opacity: composer }}>
                  <div
                    style={{
                      border: `1px solid ${c.border}`,
                      borderRadius: 16,
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <span style={{ fontFamily: sans, fontSize: 22, color: c.mutedFg }}>
                      +
                    </span>
                    <Text size={18} muted style={{ flex: 1 }}>
                      Send a message...
                    </Text>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 999,
                        background: "#f5b400",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#1a1408" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── step 3 · who is allowed through the door ───────────────────── */

export const SceneWebAccess: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const a = useEnterAt(t(6), 12);
  const b = useEnterAt(t(32), 12);
  const note = useEnterAt(t(66), 12);
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 1500 }}>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              {
                head: "Anonymous",
                sub: "the default",
                body: "Visitors chat without an account. The browser keeps an id, so a return visit picks the same conversation back up.",
                e: a,
              },
              {
                head: "Authorised only",
                sub: "you hold the list",
                body: "They sign in with the credentials you set, or with Google or GitHub. Turns are metered against their own allowance.",
                e: b,
              },
            ].map((card) => (
              <div
                key={card.head}
                style={{
                  flex: 1,
                  padding: "28px 30px",
                  borderRadius: 16,
                  minHeight: 250,
                  background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${light ? "rgba(12,10,9,0.08)" : "rgba(255,255,255,0.10)"}`,
                  opacity: card.e,
                  transform: `translateY(${(1 - card.e) * 12}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                  <span style={{ fontFamily: sans, fontSize: 29, fontWeight: 600, color: ink }}>
                    {card.head}
                  </span>
                  <span style={{ fontFamily: sans, fontSize: 17, color: c.amber }}>
                    {card.sub}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: sans,
                    fontSize: 19,
                    color: dim,
                    marginTop: 16,
                    lineHeight: 1.55,
                  }}
                >
                  {card.body}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 24,
              padding: "20px 28px",
              borderRadius: 13,
              border: `1px solid ${GREEN}40`,
              background: `${GREEN}0f`,
              fontFamily: sans,
              fontSize: 19,
              lineHeight: 1.5,
              color: ink,
              opacity: note,
            }}
          >
            On an agent you sell, this is the one channel a buyer&apos;s package
            can never exclude — every purchase includes the web app.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

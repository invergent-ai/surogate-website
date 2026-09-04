import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 08 — Read a session.
 *
 * Sources: `work-sessions-list.png` and `work-sessions-filters.png` for the
 * list and its quality chips, `work-session-header.png` for the header and the
 * THREAD / TOOLS / SKILLS tabs (Work mode has three; Develop mode's
 * `session-detail.tsx` has seven), `work-session-thread.png` for the review
 * thread, and `work-session-tools.png` for the tool table.
 *
 * The review thread is not the live chat: the user's turn is a *cream* bubble
 * with "You" above it, agent turns carry an avatar and name, tool calls are
 * amber chips inside the bubble, and every turn has its own 👍 👎 beneath.
 */

const CREAM = "#fdf4e3";
const BUBBLE = "#f2f1f0";

/* ── step 1 · find the one that went wrong ──────────────────────── */

const CHIPS: [string, number, boolean][] = [
  ["All", 0, false],
  ["Needs attention", 2, false],
  ["👎 Negative", 1, true],
  ["Denied", 0, false],
  ["Crashed", 0, false],
  ["Overridden", 0, false],
  ["👍 Positive", 6, false],
];

const ROWS: [string, string, string | null][] = [
  ["Refund window for annual plans", "acme-support-bot · Slack · Dana · 12m · 41.2k tok", "👎 Negative"],
  ["Which plan includes SSO?", "acme-support-bot · Web · Priya · 1h · 22.8k tok", null],
  ["Can we invoice quarterly?", "acme-support-bot · Slack · Dana · 3h · 18.1k tok", null],
  ["Reset a customer's password", "acme-support-bot · Web · Sam · 5h · 30.4k tok", null],
];

export const SceneSessionsList: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const chips = useEnterAt(t(12), 10);
  const rows = [
    useEnterAt(t(24), 9),
    useEnterAt(t(32), 9),
    useEnterAt(t(40), 9),
    useEnterAt(t(48), 9),
  ];

  // Filtering to the negative one: the rest fade back.
  const filtered = frame >= t(88);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1560} hot at={0} style={{ padding: "30px 36px 32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#f7f7f6",
              border: `1px solid ${c.border}`,
              borderRadius: 11,
              padding: "13px 18px",
              marginBottom: 16,
              opacity: head,
            }}
          >
            <Search />
            <Text size={17} muted>
              Search title, id, model, or user
            </Text>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 18,
              opacity: chips,
            }}
          >
            {CHIPS.map(([label, n, active]) => {
              const lit = active && filtered;
              return (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    borderRadius: 999,
                    padding: "9px 17px",
                    background: lit ? `${c.amber}24` : "#f3f1f1",
                    border: `1px solid ${lit ? c.amber : "transparent"}`,
                    fontFamily: sans,
                    fontSize: 16,
                    color: lit ? c.amber600 : c.mutedFg,
                    fontWeight: lit ? 500 : 400,
                  }}
                >
                  {label}
                  <span style={{ opacity: 0.65 }}>{n}</span>
                </div>
              );
            })}
          </div>

          {ROWS.map(([title, meta, flag], i) => {
            const dimmed = filtered && !flag;
            return (
              <div
                key={title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  borderTop: `1px solid ${c.border}`,
                  padding: "18px 8px",
                  opacity: rows[i] * (dimmed ? 0.28 : 1),
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 999,
                    background: "#f0efee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: sans,
                    fontSize: 16,
                    color: c.mutedFg,
                    flexShrink: 0,
                  }}
                >
                  A
                </div>
                <div style={{ flex: 1 }}>
                  <Text size={19} weight={600}>
                    {title}
                  </Text>
                  <Text size={15} muted style={{ marginTop: 5 }}>
                    {meta}
                  </Text>
                </div>
                {flag ? (
                  <span
                    style={{
                      background: "#fdecec",
                      color: "#b42318",
                      borderRadius: 999,
                      padding: "7px 15px",
                      fontFamily: sans,
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  >
                    {flag}
                  </span>
                ) : null}
              </div>
            );
          })}
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · read the thread ───────────────────────────────────── */

export const SceneSessionThread: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const ask = useEnterAt(t(16), 10);
  const tools = useEnterAt(t(34), 10);
  const answer = useEnterAt(t(52), 10);
  const down = useEnterAt(t(88), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.95, focus: { x: 0.5, y: 0.48 } },
          { at: t(60), over: t(80), scale: 1.04, focus: { x: 0.5, y: 0.58 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1440} hot at={0} style={{ padding: "26px 32px 30px" }}>
            {/* header + tabs */}
            <div style={{ opacity: head }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Heading size={25} style={{ flex: 1 }}>
                  Refund window for annual plans
                </Heading>
                <span
                  style={{
                    background: "#fdecec",
                    color: "#b42318",
                    borderRadius: 999,
                    padding: "6px 15px",
                    fontFamily: sans,
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  👎 Negative
                </span>
              </div>
              <Text size={15} muted style={{ marginTop: 7 }}>
                acme-support-bot · Slack · 3 messages · 2 tool calls · 41.2k
                tokens · 1m 12s
              </Text>
              <div style={{ display: "flex", gap: 26, marginTop: 16, paddingBottom: 12, borderBottom: `1px solid ${c.border}` }}>
                {["THREAD", "TOOLS", "SKILLS"].map((tab, i) => (
                  <span
                    key={tab}
                    style={{
                      fontFamily: sans,
                      fontSize: 16,
                      fontWeight: i === 0 ? 600 : 400,
                      letterSpacing: "0.06em",
                      color: i === 0 ? c.foreground : c.mutedFg,
                    }}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>

            {/* the user's turn: cream, right */}
            <div style={{ marginTop: 20, opacity: ask }}>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10 }}>
                <Text size={16} weight={600}>
                  You
                </Text>
                <Dot ch="D" />
              </div>
              <div
                style={{
                  background: CREAM,
                  borderRadius: 12,
                  padding: "17px 22px",
                  marginTop: 8,
                  marginLeft: "22%",
                  fontFamily: sans,
                  fontSize: 19,
                  lineHeight: 1.5,
                }}
              >
                Customer on an annual plan wants a refund after 40 days — are we
                obliged?
              </div>
            </div>

            {/* the agent's turn: grey, left, tool chips inside */}
            <div style={{ marginTop: 20, opacity: tools }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Dot ch="A" />
                <Text size={16} weight={600}>
                  acme-support-bot
                </Text>
              </div>
              <div
                style={{
                  background: BUBBLE,
                  borderRadius: 12,
                  padding: "17px 22px",
                  marginTop: 8,
                  marginRight: "24%",
                }}
              >
                <Text size={19} style={{ lineHeight: 1.5 }}>
                  Let me check our published refund policy.
                </Text>
                <div style={{ display: "flex", gap: 9, marginTop: 12 }}>
                  {["web_search", "web_extract"].map((tool) => (
                    <span
                      key={tool}
                      style={{
                        background: `${c.amber}1f`,
                        color: c.amber600,
                        borderRadius: 8,
                        padding: "6px 13px",
                        fontFamily: mono,
                        fontSize: 15,
                      }}
                    >
                      🔧 {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18, opacity: answer }}>
              <div
                style={{
                  background: BUBBLE,
                  borderRadius: 12,
                  padding: "17px 22px",
                  marginRight: "24%",
                  fontFamily: sans,
                  fontSize: 19,
                  lineHeight: 1.55,
                }}
              >
                No — our refund window is 14 days, so a 40-day request falls
                outside it.
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10 }}>
                <Text size={15} muted>
                  09:41
                </Text>
                <span style={{ fontSize: 20, opacity: 0.4 }}>👍</span>
                <span
                  style={{
                    fontSize: 20,
                    background: down > 0.5 ? "#fdecec" : "transparent",
                    borderRadius: 6,
                    padding: "2px 6px",
                  }}
                >
                  👎
                </span>
              </div>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Dot: React.FC<{ ch: string }> = ({ ch }) => (
  <div
    style={{
      width: 30,
      height: 30,
      borderRadius: 8,
      background: "#f0efee",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: sans,
      fontSize: 14,
      color: c.mutedFg,
    }}
  >
    {ch}
  </div>
);

const Search = () => (
  <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2} strokeLinecap="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

/* ── step 3 · the tool table, where the cause is ────────────────── */

/**
 * `work-session-tools.png`: a TOOL / CALLED AT / ELAPSED table whose rows open
 * to ARGUMENTS and RESULT as raw JSON. It is the only view that shows what the
 * agent actually got back, which is why a wrong answer is usually diagnosed
 * here rather than in the thread.
 */
export const SceneSessionTools: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const r1 = useEnterAt(t(14), 9);
  const r2 = useEnterAt(t(24), 9);
  const args = useEnterAt(t(40), 10);
  const result = useEnterAt(t(58), 10);
  const cause = useEnterAt(t(92), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.46 } },
          { at: t(60), over: t(80), scale: 1.08, focus: { x: 0.5, y: 0.6 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1500} hot at={0} style={{ padding: "26px 30px 30px" }}>
            <div style={{ display: "flex", gap: 26, marginBottom: 18, opacity: head }}>
              {["THREAD", "TOOLS", "SKILLS"].map((tab, i) => (
                <span
                  key={tab}
                  style={{
                    fontFamily: sans,
                    fontSize: 16,
                    fontWeight: i === 1 ? 600 : 400,
                    letterSpacing: "0.06em",
                    color: i === 1 ? c.foreground : c.mutedFg,
                  }}
                >
                  {tab}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                borderBottom: `1px solid ${c.border}`,
                padding: "0 14px 11px",
                opacity: head,
              }}
            >
              {[["TOOL", 1], ["CALLED AT", 0], ["ELAPSED", 0]].map(([label, grow], i) => (
                <span
                  key={label as string}
                  style={{
                    flex: grow ? 1 : "0 0 190px",
                    fontFamily: sans,
                    fontSize: 14,
                    letterSpacing: "0.09em",
                    color: c.mutedFg,
                    textAlign: i === 0 ? "left" : "left",
                  }}
                >
                  {label as string}
                </span>
              ))}
            </div>

            <Row name="web_search" at="09:41:02.184" ms="1.3s" enter={r1} />

            <div style={{ opacity: r2 }}>
              <Row name="web_extract" at="09:41:04.902" ms="612ms" open enter={1} />

              <div style={{ padding: "4px 14px 0" }}>
                <Block label="ARGUMENTS" enter={args}>
                  {`{\n  "urls": ["https://acme.com/legal/refunds"]\n}`}
                </Block>
                <Block label="RESULT" enter={result} bad={cause > 0.4}>
                  {`{\n  "success": true,\n  "data": {\n    "text": "Refunds are accepted within 14 days of purchase.",\n    "fetched_at": "2024-11-02T10:14:00Z"\n  }\n}`}
                </Block>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 16,
                borderRadius: 11,
                border: `1px solid ${c.amber}`,
                background: "#fffdf7",
                padding: "15px 20px",
                opacity: cause,
                transform: `translateY(${(1 - cause) * 8}px)`,
              }}
            >
              <Text size={18} weight={500} style={{ color: c.amber600 }}>
                There it is
              </Text>
              <Text size={18} muted>
                It read a public page from 2024. The current policy is 30 days,
                and it is in your knowledge base.
              </Text>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Row: React.FC<{
  name: string;
  at: string;
  ms: string;
  open?: boolean;
  enter: number;
}> = ({ name, at, ms, open, enter }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      borderBottom: `1px solid ${c.border}`,
      padding: "15px 14px",
      opacity: enter,
    }}
  >
    <span style={{ width: 24, color: c.mutedFg, fontSize: 14 }}>
      {open ? "▼" : "▶"}
    </span>
    <span style={{ flex: 1, fontFamily: mono, fontSize: 18, fontWeight: 500 }}>
      {name}
    </span>
    <span style={{ flex: "0 0 190px", fontFamily: sans, fontSize: 16, color: c.mutedFg }}>
      {at}
    </span>
    <span style={{ flex: "0 0 190px", fontFamily: sans, fontSize: 16, color: c.mutedFg }}>
      {ms}
    </span>
  </div>
);

const Block: React.FC<{
  label: string;
  enter: number;
  bad?: boolean;
  children: string;
}> = ({ label, enter, bad, children }) => (
  <div style={{ marginTop: 12, opacity: enter }}>
    <Text size={14} muted style={{ letterSpacing: "0.09em", marginBottom: 7 }}>
      {label}
    </Text>
    <pre
      style={{
        margin: 0,
        border: `1px solid ${bad ? c.amber : c.border}`,
        background: bad ? "#fffdf7" : "#faf9f8",
        borderRadius: 9,
        padding: "14px 16px",
        fontFamily: mono,
        fontSize: 16,
        lineHeight: 1.55,
        color: c.foreground,
        whiteSpace: "pre",
      }}
    >
      {children}
    </pre>
  </div>
);

/* ── step 4 · turn it into a signal ─────────────────────────────── */

export const SceneSessionFlag: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const rows = [useEnterAt(t(20), 10), useEnterAt(t(38), 10), useEnterAt(t(56), 10)];

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1240} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <Heading size={27} style={{ marginBottom: 8, opacity: head }}>
            One thumbs-down is worth more than it looks
          </Heading>
          <Text size={17} muted style={{ marginBottom: 26, opacity: head }}>
            The flag stays on the session, so the answer you did not like is
            findable for good.
          </Text>

          {[
            ["It shows up as a chip", "Filter the whole list to 👎 Negative whenever you want."],
            ["It becomes your regression set", "The sessions you flagged are the ones to re-run after a change."],
            ["It survives the fix", "Come back after you edit the agent and check this exact case again."],
          ].map(([title, body], i) => (
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
              <span style={{ fontSize: 24 }}>👎</span>
              <div>
                <Text size={21} weight={600}>
                  {title}
                </Text>
                <Text size={17} muted style={{ marginTop: 6, lineHeight: 1.5 }}>
                  {body}
                </Text>
              </div>
            </div>
          ))}
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

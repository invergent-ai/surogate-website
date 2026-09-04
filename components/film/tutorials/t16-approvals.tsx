import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c } from "../ui/tokens";
import { useTone } from "../ui/tone";

/**
 * Tutorial 16 — Approvals and the inbox.
 *
 * From `work/tools/inbox.md`. Five item kinds, and a documented triage order:
 * `input_required` → `action_required` → `governance_gate` → informational.
 * The first two block the agent outright; an unanswered gate leaves it without
 * a tool it asked for; the rest are just news.
 *
 * The detail worth the video's time: a question can be answered by *typing in
 * the chat* as well as from the inbox, and if nobody answers within 30 minutes
 * the agent gets a `cancelled` signal and moves on — after which a typed reply
 * is an ordinary message, not an answer.
 */

const RED = "#b42318";
const GREEN = "#059669";

/* ── step 1 · what is waiting ───────────────────────────────────── */

/**
 * `work-agent-inbox-page.tsx`: a header with an Active / Updates / History
 * toggle, a **left list** of items, and a **detail pane** — master-detail, not
 * a full-width list.
 *
 * A row is an icon chip, then the kind's *human label* (never the raw slug —
 * `input_required` reads "Needs your answer"), a relative time on the right,
 * the title beneath, and the body under that. An unread row carries a 7px amber
 * dot and sets its label semibold, because the navbar badge counts exactly
 * those and the list has to say which ones it is counting.
 */
const KIND_META: Record<string, { label: string; tone: string; glyph: string }> = {
  input_required: {
    label: "Needs your answer",
    tone: "#f59e0b",
    glyph: "M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01",
  },
  action_required: {
    label: "Action needed",
    tone: "#f59e0b",
    glyph: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3",
  },
  governance_gate: {
    label: "Approval needed",
    tone: "#f59e0b",
    glyph: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
  },
  task_complete: {
    label: "Task done",
    tone: "#1d9e75",
    glyph: "M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4 12 14l-3-3",
  },
};

const ITEMS: [string, string, string, string, boolean][] = [
  ["input_required", "Which Stripe environment should I target?", "Acme Support Bot", "2m", true],
  ["action_required", "Sign in to the supplier portal — MFA needed", "Ops Agent", "6m", true],
  ["governance_gate", "Approval needed · stripe.refunds.create", "Acme Support Bot", "9m", false],
  ["task_complete", "Offsite plan finished", "Ops Agent", "1h", false],
];

const IconChip: React.FC<{ kind: string }> = ({ kind }) => {
  const meta = KIND_META[kind];
  return (
    <span
      style={{
        width: 42,
        height: 42,
        borderRadius: 11,
        background: "rgba(12,10,9,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={meta.tone} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d={meta.glyph} />
      </svg>
    </span>
  );
};

export const SceneInboxList: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const rows = [
    useEnterAt(t(14), 9),
    useEnterAt(t(22), 9),
    useEnterAt(t(30), 9),
    useEnterAt(t(38), 9),
  ];
  const detail = useEnterAt(t(52), 12);
  const choices = [
    useEnterAt(t(66), 9),
    useEnterAt(t(74), 9),
    useEnterAt(t(82), 9),
  ];
  const picked = frame >= t(104);
  const notes = useEnterAt(t(124), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1620} hot at={0} style={{ padding: 0, overflow: "hidden" }}>
          {/* header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              borderBottom: `1px solid ${c.border}`,
              padding: "24px 30px",
              opacity: head,
            }}
          >
            <div style={{ flex: 1 }}>
              <Heading size={26}>Inbox</Heading>
              <Text size={16} muted style={{ marginTop: 7 }}>
                Questions and actions your agents need from you
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                background: "#f0efee",
                borderRadius: 9,
                padding: 4,
                fontFamily: sans,
                fontSize: 15,
              }}
            >
              {["Active", "Updates", "History"].map((tab, i) => (
                <span
                  key={tab}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 7,
                    background: i === 0 ? c.card : "transparent",
                    fontWeight: i === 0 ? 500 : 400,
                    color: i === 0 ? c.foreground : c.mutedFg,
                  }}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", height: 520 }}>
            {/* the list */}
            <div style={{ width: 560, borderRight: `1px solid ${c.border}` }}>
              {ITEMS.map(([kind, title, agent, when, unread], i) => {
                const meta = KIND_META[kind];
                return (
                  <div
                    key={kind}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      padding: "15px 20px",
                      background: i === 0 ? "rgba(12,10,9,0.06)" : "transparent",
                      opacity: rows[i],
                    }}
                  >
                    <IconChip kind={kind} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        {unread ? (
                          <span
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 999,
                              background: c.amber,
                              flexShrink: 0,
                            }}
                          />
                        ) : null}
                        <span
                          style={{
                            flex: 1,
                            fontFamily: sans,
                            fontSize: 17,
                            fontWeight: unread ? 600 : 500,
                          }}
                        >
                          {meta.label}
                        </span>
                        <span style={{ fontFamily: sans, fontSize: 14, color: c.mutedFg }}>
                          {when}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: sans,
                          fontSize: 16,
                          color: c.mutedFg,
                          marginTop: 6,
                          lineHeight: 1.35,
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          fontFamily: sans,
                          fontSize: 14,
                          color: c.mutedFg,
                          opacity: 0.75,
                          marginTop: 5,
                        }}
                      >
                        {agent}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* the detail pane — where the question is actually answered */}
            <div style={{ flex: 1, padding: "24px 30px", opacity: detail }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <IconChip kind="input_required" />
                <div>
                  <Text size={18} weight={500}>
                    Needs your answer
                  </Text>
                  <Text size={15} muted style={{ marginTop: 3 }}>
                    Acme Support Bot · 2m ago
                  </Text>
                </div>
              </div>

              <Heading size={23} style={{ marginTop: 20, lineHeight: 1.25 }}>
                Which Stripe environment should I target?
              </Heading>

              <div style={{ marginTop: 18 }}>
                {["Live", "Test", "Other…"].map((choice, i) => {
                  const on = picked && i === 1;
                  return (
                    <div
                      key={choice}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        border: `1px solid ${on ? c.amber : c.border}`,
                        background: on ? "#fffdf7" : c.card,
                        borderRadius: 10,
                        padding: "13px 17px",
                        marginBottom: 9,
                        opacity: choices[i],
                      }}
                    >
                      <span
                        style={{
                          width: 19,
                          height: 19,
                          borderRadius: 999,
                          border: `2px solid ${on ? c.amber : c.border}`,
                          background: on ? c.amber : "transparent",
                        }}
                      />
                      <Text size={18} weight={on ? 600 : 400}>
                        {choice}
                      </Text>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  display: "inline-block",
                  marginTop: 6,
                  borderRadius: 9,
                  padding: "12px 24px",
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 600,
                  background: picked ? c.amber : "#f0efee",
                  color: picked ? "#000" : c.mutedFg,
                }}
              >
                Submit
              </div>

              {/* the two things people get wrong */}
              <Text size={16} muted style={{ marginTop: 20, lineHeight: 1.55, opacity: notes }}>
                Or type <span style={{ fontFamily: mono }}>Test</span> straight
                into the chat. Leave it 30 minutes and the agent is told the
                question was cancelled, and decides without you.
              </Text>
            </div>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · approve the tool call ─────────────────────────────── */

export const SceneGovernanceGate: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const card = useEnterAt(t(3), 10);
  const args = useEnterAt(t(26), 10);
  const buttons = useEnterAt(t(46), 10);
  const approveAt = t(80);
  const approved = frame >= approveAt;

  return (
    <Stage glow={{ x: 0.5, y: 0.43 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1340} hot at={0} style={{ padding: "30px 36px 32px" }}>
          <div style={{ opacity: card }}>
            <Text size={16} muted style={{ fontFamily: mono }}>
              governance_gate · Acme Support Bot
            </Text>
            <Heading size={26} style={{ marginTop: 12 }}>
              Approval needed
            </Heading>
            <Text size={19} muted style={{ marginTop: 10, lineHeight: 1.5 }}>
              This tool is marked approval-required by your governance policy.
            </Text>
          </div>

          <div
            style={{
              marginTop: 20,
              border: `1px solid ${c.border}`,
              borderRadius: 11,
              background: "#faf9f8",
              padding: "16px 20px",
              fontFamily: mono,
              fontSize: 17,
              lineHeight: 1.7,
              opacity: args,
            }}
          >
            <div style={{ color: c.amber600, fontWeight: 600 }}>
              stripe.refunds.create
            </div>
            <div style={{ color: c.mutedFg }}>
              {"{ charge: \"ch_3Q…\", amount: 4900, reason: \"requested_by_customer\" }"}
            </div>
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 22, opacity: buttons }}>
            <div
              style={{
                borderRadius: 10,
                padding: "14px 30px",
                fontFamily: sans,
                fontSize: 18,
                fontWeight: 600,
                background: approved ? GREEN : c.amber,
                color: approved ? "#fff" : "#000",
              }}
            >
              {approved ? "Approved ✓" : "Approve"}
            </div>
            <div
              style={{
                borderRadius: 10,
                padding: "14px 30px",
                fontFamily: sans,
                fontSize: 18,
                fontWeight: 500,
                border: `1px solid ${c.border}`,
                color: c.mutedFg,
                opacity: approved ? 0.4 : 1,
              }}
            >
              Reject
            </div>
          </div>

          <Text size={17} muted style={{ marginTop: 20, opacity: buttons }}>
            Either way the decision goes straight back into the session — the
            agent picks it up and carries on.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · which ones actually stop it ───────────────────────── */

/** The label is what the list shows; the slug is what the API calls it. */
const KINDS: [string, string, string, string][] = [
  ["Needs your answer", "input_required", "Blocks", "It asked you a question and cannot continue without one."],
  ["Action needed", "action_required", "Blocks", "Something only you can do — a login wall, MFA, a CAPTCHA."],
  ["Approval needed", "governance_gate", "Waits", "A tool your policy holds back. Unanswered, it goes without."],
  ["Task done", "task_complete", "News", "A goal, mission or loop finished."],
  ["Progress update", "progress_checkin", "News", "A status update mid-run, on API sessions that asked for one."],
];

export const SceneInboxKinds: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const e = [
    useEnterAt(t(4), 10),
    useEnterAt(t(14), 10),
    useEnterAt(t(24), 10),
    useEnterAt(t(34), 10),
    useEnterAt(t(44), 10),
  ];
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";
  const tone = (w: string) => (w === "Blocks" ? RED : w === "Waits" ? "#d97706" : "#7c6d67");

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 1560 }}>
          {KINDS.map(([label, slug, weight, body], i) => (
            <div
              key={slug}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "19px 28px",
                marginBottom: 10,
                borderRadius: 14,
                background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${tone(weight)}40`,
                opacity: e[i],
                transform: `translateY(${(1 - e[i]) * 10}px)`,
              }}
            >
              <span style={{ width: 300 }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: sans,
                    fontSize: 21,
                    fontWeight: 600,
                    color: tone(weight),
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: mono,
                    fontSize: 14,
                    color: dim,
                    marginTop: 4,
                  }}
                >
                  {slug}
                </span>
              </span>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 21,
                  fontWeight: 600,
                  color: ink,
                  width: 120,
                }}
              >
                {weight}
              </span>
              <span style={{ fontFamily: sans, fontSize: 18, color: dim, flex: 1 }}>
                {body}
              </span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

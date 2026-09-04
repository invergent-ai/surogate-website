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
 * Tutorial 09 — Correct it and redeploy.
 *
 * Follows straight on from 08: the agent quoted a stale public page instead of
 * the knowledge base. Sources: `work/workflow/improve-agent.md` for the triage
 * ("wrong facts → KB, wrong procedure → skill, can't reach a system → MCP") and
 * for the two rules that make or break this loop, and
 * `work-configure-identity.png` for the Identity tab.
 */

/* ── step 1 · pick the right fix ────────────────────────────────── */

const TRIAGE: { symptom: string; fix: string; note: string; icon: React.FC }[] = [
  {
    symptom: "Wrong facts",
    fix: "Add knowledge",
    note: "A fact it never had, or one that moved.",
    icon: () => <G d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />,
  },
  {
    symptom: "Wrong procedure",
    fix: "Write a skill",
    note: "It knew the facts and still did it the wrong way.",
    icon: () => <G d="M4 14h7l-2 7 9-11h-7l2-7z" />,
  },
  {
    symptom: "Cannot reach a system",
    fix: "Connect a tool",
    note: "It needed to act somewhere it has no access.",
    icon: () => <G d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  },
  {
    symptom: "Wrong tone or a broken rule",
    fix: "Edit SOUL.md",
    note: "Who it is, not how it does one task.",
    icon: () => <G d="M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z" />,
  },
  {
    symptom: "A habit that keeps coming back",
    fix: "Train it",
    note: "Instructions did not stick. Teach the model itself.",
    icon: () => <G d="M3 17.5 9 11l4 4 8-8.5M15 6.5h6v6" />,
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

/** Editorial, not a product screen — this mapping has no page in the app. */
export const SceneTriage: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const e = [
    useEnterAt(t(4), 10),
    useEnterAt(t(13), 10),
    useEnterAt(t(22), 10),
    useEnterAt(t(31), 10),
    useEnterAt(t(40), 10),
  ];
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 1560 }}>
          {TRIAGE.map((row, i) => {
            const Icon = row.icon;
            const first = i === 0;
            return (
              <div
                key={row.symptom}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  padding: "18px 26px",
                  marginBottom: 10,
                  borderRadius: 15,
                  background: first
                    ? `${c.amber}14`
                    : light
                      ? "rgba(12,10,9,0.03)"
                      : "rgba(255,255,255,0.05)",
                  border: `1px solid ${
                    first
                      ? `${c.amber}66`
                      : light
                        ? "rgba(12,10,9,0.08)"
                        : "rgba(255,255,255,0.10)"
                  }`,
                  opacity: e[i],
                  transform: `translateY(${(1 - e[i]) * 12}px)`,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 13,
                    background: `${c.amber}1f`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon />
                </div>
                <div style={{ width: 380, flexShrink: 0 }}>
                  <div style={{ fontFamily: sans, fontSize: 25, fontWeight: 600, color: ink }}>
                    {row.symptom}
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 17, color: dim, marginTop: 5 }}>
                    {row.note}
                  </div>
                </div>
                <div style={{ fontFamily: sans, fontSize: 22, color: dim }}>→</div>
                <div
                  style={{
                    fontFamily: sans,
                    fontSize: 25,
                    fontWeight: 600,
                    color: first ? c.amber : ink,
                  }}
                >
                  {row.fix}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · edit the persona ──────────────────────────────────── */

const RULE = "Check the knowledge base before the public web.";

export const SceneEditSoul: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const card = useEnterAt(t(3), 10);
  const typeAt = t(26);
  const dirty = frame >= typeAt + 6;
  const banner = useEnterAt(dirty ? typeAt + 6 : 1e6, 10);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.5 } },
          { at: t(30), over: t(90), scale: 1.0, focus: { x: 0.5, y: 0.54 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 1420 }}>
            {/* the banner only exists once something has changed */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                border: `1px solid ${c.amber}`,
                background: "#fffdf7",
                borderRadius: 13,
                padding: "16px 22px",
                marginBottom: 14,
                opacity: banner,
                transform: `translateY(${(1 - banner) * -8}px)`,
              }}
            >
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={c.amber600} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01" />
              </svg>
              <Text size={20} weight={600} style={{ flex: 1 }}>
                Unsaved changes
              </Text>
              <div
                style={{
                  border: `1px solid ${c.border}`,
                  background: c.card,
                  borderRadius: 9,
                  padding: "11px 20px",
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 500,
                }}
              >
                Discard changes
              </div>
              <div
                style={{
                  background: c.amber,
                  color: "#000",
                  borderRadius: 9,
                  padding: "11px 26px",
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 600,
                }}
              >
                Save
              </div>
            </div>

            <Panel width={1420} hot at={0} style={{ padding: "26px 30px 24px", opacity: card }}>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Heading size={24} style={{ flex: 1 }}>
                  Soul (SOUL.md)
                </Heading>
                <Text size={15} muted style={{ fontFamily: mono }}>
                  1,284 / 20,000
                </Text>
              </div>
              <Text size={16} muted style={{ marginTop: 8 }}>
                The agent&apos;s full persona — tone, rules, what it can and
                can&apos;t do. Injected into every session&apos;s system prompt.
              </Text>

              <div
                style={{
                  marginTop: 16,
                  border: `1px solid ${c.border}`,
                  background: "#f7f7f6",
                  borderRadius: 11,
                  padding: "18px 20px",
                  fontFamily: mono,
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: c.mutedFg,
                  minHeight: 210,
                }}
              >
                <div># Acme Support Agent</div>
                <div style={{ height: 12 }} />
                <div>## Things you must not do</div>
                <div>- Disclose another customer&apos;s information</div>
                <div>- Promise feature delivery dates</div>
                <div style={{ height: 12 }} />
                <div style={{ color: c.foreground }}>
                  - <Typed text={RULE} at={typeAt} cps={2.2} />
                </div>
              </div>

              <Text size={15} muted style={{ marginTop: 14 }}>
                Changes apply to new sessions only — in-progress sessions keep
                the old persona.
              </Text>
            </Panel>
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── step 3 · the same question, answered right ─────────────────── */

export const SceneVerified: React.FC = () => {
  const t = useTimeScale(5);
  const ask = useEnterAt(t(4), 10);
  const kb = useEnterAt(t(26), 10);
  const answer = useEnterAt(t(46), 10);
  const up = useEnterAt(t(78), 12);
  const closed = useEnterAt(t(96), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1300} hot at={0} style={{ padding: "34px 40px 36px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", opacity: ask }}>
            <div
              style={{
                background: "#fdf4e3",
                borderRadius: 14,
                padding: "17px 22px",
                maxWidth: "76%",
                fontFamily: sans,
                fontSize: 21,
                lineHeight: 1.5,
              }}
            >
              Customer on an annual plan wants a refund after 40 days — are we
              obliged?
            </div>
          </div>

          {/* the KB now, not the web */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 24,
              padding: "13px 16px",
              borderRadius: 10,
              background: "#faf9f8",
              opacity: kb,
            }}
          >
            <span
              style={{
                fontFamily: mono,
                fontSize: 16,
                color: c.amber600,
                background: `${c.amber}1f`,
                borderRadius: 7,
                padding: "5px 11px",
              }}
            >
              🔧 kb_search_pages
            </span>
            <Text size={18} muted style={{ fontStyle: "italic" }}>
              Acme Product Docs — “Refunds and cancellations”
            </Text>
          </div>

          <Text size={21} style={{ marginTop: 20, lineHeight: 1.6, opacity: answer }}>
            Yes — our window is 30 days on annual plans, and this is day 40, so
            we are not obliged. I&apos;d offer a pro-rata credit instead.
          </Text>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 18, opacity: up }}>
            <Text size={15} muted>
              09:58
            </Text>
            <span
              style={{
                fontSize: 21,
                background: "#f0fdf4",
                borderRadius: 6,
                padding: "3px 8px",
              }}
            >
              👍
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 24,
              borderRadius: 12,
              border: `1px solid ${c.success}59`,
              background: "#f0fdf4",
              padding: "16px 22px",
              opacity: closed,
              transform: `translateY(${(1 - closed) * 8}px)`,
            }}
          >
            <Text size={19} weight={600} style={{ color: c.green700 }}>
              Loop closed
            </Text>
            <Text size={18} muted>
              Found it in a session, fixed the cause, proved it on the same
              question.
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 4 · when instructions do not stick, train it ──────────── */

/**
 * `dev-training-methods.png`: four method cards, the selected one carrying an
 * amber outline, each with a code (SFT / DPO / GRPO / DISTILL), a paragraph,
 * and amber-ticked properties. DPO and DISTILL carry a NEW badge.
 *
 * SFT is preselected in the product, and it is the right one for this story:
 * the agent kept reaching for the web, so it is taught the behaviour from
 * sessions where it did the right thing.
 */
const METHODS: {
  name: string;
  code: string;
  body: string;
  ticks: string[];
  fresh?: boolean;
}[] = [
  {
    name: "Supervised Fine-Tune",
    code: "SFT",
    body: "Train a base model directly on labelled examples. The workhorse for teaching format, tone, and task behaviour.",
    ticks: ["One base model, one dataset", "Fastest to set up"],
  },
  {
    name: "Preference (DPO)",
    code: "DPO",
    body: "Teach the model to prefer a chosen response over a rejected one — no reward model or rollouts.",
    ticks: ["{prompt, chosen, rejected} pairs", "Minimal pairs give the cleanest signal"],
    fresh: true,
  },
  {
    name: "Reinforcement (GRPO)",
    code: "GRPO",
    body: "Optimise a policy against a reward signal or verifiable environment. Best for reasoning and tool-use gains.",
    ticks: ["Reward or environment driven", "No labelled targets required"],
  },
  {
    name: "Knowledge Distillation",
    code: "DISTILL",
    body: "Transfer a large teacher's probability distribution into a smaller, cheaper student.",
    ticks: ["Teacher → student pairing", "Combined CE + KL loss"],
    fresh: true,
  },
];

export const SceneTrainToFix: React.FC = () => {
  const t = useTimeScale(5);
  const cards = [
    useEnterAt(t(4), 10),
    useEnterAt(t(14), 10),
    useEnterAt(t(24), 10),
    useEnterAt(t(34), 10),
  ];
  const foot = useEnterAt(t(56), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1680} hot at={0} style={{ padding: "28px 32px 26px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {METHODS.map((m, i) => {
              const picked = i === 0;
              return (
                <div
                  key={m.code}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 11,
                    border: `1px solid ${picked ? c.amber : c.border}`,
                    borderRadius: 13,
                    padding: "20px 20px 22px",
                    minHeight: 356,
                    opacity: cards[i],
                    transform: `translateY(${(1 - cards[i]) * 12}px)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 11,
                        background: "#f3f1f1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MethodGlyph n={i} />
                    </div>
                    <div style={{ flex: 1 }} />
                    {m.fresh ? (
                      <span
                        style={{
                          background: `${c.amber}24`,
                          color: c.amber600,
                          borderRadius: 7,
                          padding: "4px 11px",
                          fontFamily: sans,
                          fontSize: 13,
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                        }}
                      >
                        NEW
                      </span>
                    ) : null}
                  </div>

                  <Heading size={23} style={{ marginTop: 6, lineHeight: 1.2 }}>
                    {m.name}
                  </Heading>
                  <Text size={14} muted style={{ letterSpacing: "0.09em", marginTop: -4 }}>
                    {m.code}
                  </Text>
                  <Text size={16} muted style={{ lineHeight: 1.5, marginTop: 4 }}>
                    {m.body}
                  </Text>
                  <div style={{ flex: 1 }} />
                  {m.ticks.map((tick) => (
                    <div key={tick} style={{ display: "flex", gap: 10, marginTop: 8 }}>
                      <span style={{ color: c.amber, fontSize: 16 }}>✓</span>
                      <Text size={15} style={{ lineHeight: 1.4 }}>
                        {tick}
                      </Text>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 20,
              paddingTop: 18,
              borderTop: `1px solid ${c.border}`,
              opacity: foot,
            }}
          >
            <Text size={17} muted style={{ flex: 1 }}>
              Selected: <span style={{ color: c.foreground, fontWeight: 600 }}>Supervised Fine-Tune</span>
            </Text>
            <div
              style={{
                background: c.amber,
                color: "#000",
                borderRadius: radius,
                padding: "13px 26px",
                fontFamily: sans,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Continue →
            </div>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const MethodGlyph: React.FC<{ n: number }> = ({ n }) => {
  const st = {
    fill: "none",
    stroke: c.mutedFg,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths = [
    "M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z",
    "M12 3v18M5 8l7-3 7 3M3 15h6l-3-7zM15 15h6l-3-7z",
    "M3 17.5 9 11l4 4 8-8.5M15 6.5h6v6",
    "M7 3v14l-3-3M17 21V7l3 3",
  ];
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...st}>
      <path d={paths[n]} />
    </svg>
  );
};

/* ── step 5 · prove it, do not assume it ────────────────────────── */

/**
 * `dev-eval-benchmarks.png`: nine category cards, each an amber-tinted glyph, a
 * name, a one-line description and an amber "N benchmarks ›" link, under a
 * header reading "9 categories · 40 public benchmarks · select one or more to
 * run as a batch."
 */
const CATEGORIES: [string, string, string][] = [
  ["Reasoning", "Multi-step logic & inference", "3 benchmarks"],
  ["Knowledge", "Facts & world knowledge", "4 benchmarks"],
  ["Instruction", "Does it follow the ask", "2 benchmarks"],
  ["Chat", "Chat quality & tone", "1 benchmark"],
  ["Safety", "Refusals & red-team", "4 benchmarks"],
  ["Agent", "Coding agents, tools & planning", "12 benchmarks"],
];

export const SceneEvaluate: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const cards = [
    useEnterAt(t(12), 9),
    useEnterAt(t(19), 9),
    useEnterAt(t(26), 9),
    useEnterAt(t(33), 9),
    useEnterAt(t(40), 9),
    useEnterAt(t(47), 9),
  ];
  const score = useEnterAt(t(70), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1620} hot at={0} style={{ padding: "28px 34px 30px" }}>
          <div style={{ opacity: head, marginBottom: 20 }}>
            <Heading size={27}>Browse benchmarks</Heading>
            <Text size={16} muted style={{ marginTop: 7 }}>
              9 categories · 40 public benchmarks · select one or more to run as
              a batch.
            </Text>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {CATEGORIES.map(([name, desc, n], i) => (
              <div
                key={name}
                style={{
                  border: `1px solid ${i === 1 ? c.amber : c.border}`,
                  background: i === 1 ? "#fffdf7" : c.card,
                  borderRadius: 12,
                  padding: "18px 20px",
                  opacity: cards[i],
                  transform: `translateY(${(1 - cards[i]) * 10}px)`,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${c.amber}1f`,
                    marginBottom: 12,
                  }}
                />
                <Text size={19} weight={600}>
                  {name}
                </Text>
                <Text size={15} muted style={{ marginTop: 6 }}>
                  {desc}
                </Text>
                <Text size={15} style={{ color: c.amber600, marginTop: 10 }}>
                  {n} ›
                </Text>
              </div>
            ))}
          </div>

          {/* the number that settles the argument */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
              marginTop: 22,
              borderRadius: 12,
              border: `1px solid ${c.success}59`,
              background: "#f0fdf4",
              padding: "18px 24px",
              opacity: score,
              transform: `translateY(${(1 - score) * 8}px)`,
            }}
          >
            <Text size={18} weight={600} style={{ color: c.green700 }}>
              Knowledge
            </Text>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <Text size={18} muted style={{ textDecoration: "line-through" }}>
                0.61
              </Text>
              <Text size={26} weight={700} style={{ color: c.green700 }}>
                0.88
              </Text>
            </div>
            <Text size={17} muted>
              Same benchmark, before and after. Now you know it worked.
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

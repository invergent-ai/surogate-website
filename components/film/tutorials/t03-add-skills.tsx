import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { Typed, typedFrames, useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";
import { Box, Hint, Label } from "./work-screens";

/**
 * Tutorial 03 — Give it skills.
 *
 * Sources: the three-way picker from `work-configure-add-skill.png`; the
 * template browser from `work-configure-skill-templates.png`; the attached
 * list from `work-configure-skills-attached.png`; the form's fields and their
 * help text verbatim from
 * surogate-ops/frontend/src/features/skills/skill-form.tsx.
 */

/* ── step 1 · how to add one ────────────────────────────────────── */

const WAYS = [
  {
    title: "Start from a template",
    desc: "Import a ready-made skill, then edit your own copy.",
    tag: "Recommended",
  },
  {
    title: "Write from scratch",
    desc: "Create a skill yourself in a quick form.",
    tag: null,
  },
  { title: "Import a file", desc: "Upload a SKILL.md or .zip.", tag: null },
];

export const SceneSkillAdd: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(4), 10);
  const cards = [
    useEnterAt(t(16), 10),
    useEnterAt(t(26), 10),
    useEnterAt(t(36), 10),
  ];
  const foot = useEnterAt(t(52), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1280} hot at={0} style={{ padding: "34px 40px 36px" }}>
          <Heading size={28} style={{ marginBottom: 8, opacity: head }}>
            Add a skill
          </Heading>
          <Text size={17} muted style={{ marginBottom: 26, opacity: head }}>
            It&apos;ll be saved to your Library and attached to this agent.
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
                  gap: 12,
                  borderRadius: 13,
                  border: `1px solid ${w.tag ? c.amber : c.border}`,
                  background: w.tag ? "#fffdf7" : c.card,
                  padding: 24,
                  minHeight: 172,
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

          <Text size={16} muted style={{ marginTop: 22, opacity: foot }}>
            All three save the skill to your Library and auto-attach it to this
            agent.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · the template library ──────────────────────────────── */

const CATS: [string, number][] = [
  ["All categories", 254],
  ["autonomous-ai-agents", 2],
  ["blockchain", 2],
  ["communication", 1],
  ["creative", 20],
  ["data", 6],
  ["data-science", 1],
  ["design", 6],
  ["devops", 7],
  ["finance", 13],
];

const TPLS: [string, string][] = [
  ["blackbox", "autonomous-ai-agents"],
  ["opencode", "autonomous-ai-agents"],
  ["base", "blockchain"],
  ["solana", "blockchain"],
  ["one-three-one-rule", "communication"],
  ["architecture-diagram", "creative"],
  ["ascii-video", "creative"],
];

export const SceneSkillTemplates: React.FC = () => {
  const t = useTimeScale(5);
  const shell = useEnterAt(t(3), 10);
  const left = useEnterAt(t(12), 10);
  const mid = useEnterAt(t(22), 10);
  const right = useEnterAt(t(36), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel
          width={1560}
          hot
          at={0}
          style={{ display: "flex", minHeight: 560, opacity: shell }}
        >
          {/* categories */}
          <div
            style={{
              width: 290,
              borderRight: `1px solid ${c.border}`,
              padding: "20px 14px",
              opacity: left,
            }}
          >
            {CATS.map(([name, n], i) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 9,
                  padding: "11px 13px",
                  background: i === 0 ? `${c.amber}1f` : "transparent",
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: i === 0 ? 500 : 400,
                  color: i === 0 ? c.amber600 : c.foreground,
                }}
              >
                <span style={{ flex: 1 }}>{name}</span>
                <span style={{ color: c.mutedFg, fontSize: 15 }}>{n}</span>
              </div>
            ))}
          </div>

          {/* template list */}
          <div
            style={{
              width: 430,
              borderRight: `1px solid ${c.border}`,
              padding: "20px 18px",
              opacity: mid,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                border: `1px solid ${c.border}`,
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <SearchGlyph />
              <Text size={16} muted>
                Search templates...
              </Text>
            </div>
            <Text size={15} muted style={{ margin: "14px 0 12px" }}>
              254 templates
            </Text>
            {TPLS.map(([name, cat], i) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  borderRadius: 10,
                  border: `1px solid ${i === 0 ? c.amber : c.border}`,
                  background: i === 0 ? "#fffdf7" : c.card,
                  padding: "13px 15px",
                  marginBottom: 9,
                }}
              >
                <Text size={17} weight={600} style={{ flex: 1 }}>
                  {name}
                </Text>
                <span
                  style={{
                    borderRadius: 7,
                    background: "#f0efee",
                    padding: "4px 10px",
                    fontFamily: sans,
                    fontSize: 13,
                    color: c.mutedFg,
                  }}
                >
                  {cat}
                </span>
              </div>
            ))}
          </div>

          {/* preview */}
          <div style={{ flex: 1, padding: "26px 30px", opacity: right }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Heading size={26}>blackbox</Heading>
              <Text size={15} muted>
                Read only
              </Text>
            </div>
            <span
              style={{
                display: "inline-block",
                marginTop: 12,
                borderRadius: 8,
                background: "#f0efee",
                padding: "5px 12px",
                fontFamily: sans,
                fontSize: 14,
                color: c.mutedFg,
              }}
            >
              autonomous-ai-agents
            </span>
            <Text size={17} muted style={{ marginTop: 18, lineHeight: 1.6 }}>
              Delegate coding tasks to Blackbox AI CLI agent. Multi-model agent
              with built-in judge that runs tasks through multiple LLMs and picks
              the best result.
            </Text>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 11,
                marginTop: 26,
                background: c.amber,
                color: "#000",
                borderRadius: radius,
                padding: "14px 22px",
                fontFamily: sans,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              + Add to this agent
            </div>
            <Text size={15} muted style={{ marginTop: 14 }}>
              Read only — edit your own copy after importing.
            </Text>
          </div>
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

const WayGlyph: React.FC<{ n: number }> = ({ n }) => {
  const col = n === 0 ? c.amber : c.mutedFg;
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
        <path d="M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
      </svg>
    );
  }
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...stroke} stroke={col}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v13M7 8l5-5 5 5" />
    </svg>
  );
};

/* ── step 3 · edit your copy ────────────────────────────────────── */

const SKILL_NAME = "refund-handling";
const SKILL_DESC =
  "Handle refund requests end to end: check eligibility against the 30-day window, apply the policy, and escalate anything outside it.";

export const SceneSkillEdit: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);

  const nameAt = t(16);
  const cps = 1.4;
  const nameDone = nameAt + typedFrames(SKILL_NAME, cps);
  const typing = frame >= nameAt && frame < nameDone;
  const descAt = nameDone + t(6);

  const rows = [
    useEnterAt(t(4), 10),
    useEnterAt(t(28), 10),
    useEnterAt(t(46), 10),
    useEnterAt(t(62), 10),
  ];
  const row = (i: number) => ({
    opacity: rows[i],
    transform: `translateY(${(1 - rows[i]) * 8}px)`,
  });

  return (
    <Stage glow={{ x: 0.5, y: 0.46 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.93, focus: { x: 0.5, y: 0.5 } },
          { at: nameAt, over: t(95), scale: 0.99, focus: { x: 0.5, y: 0.52 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={980} hot at={0} style={{ padding: "32px 40px 30px" }}>
            <Heading size={28} style={{ marginBottom: 24 }}>
              Your copy
            </Heading>

            <div style={{ marginBottom: 18, ...row(0) }}>
              <Label text="Name" />
              <Box focused={typing}>
                <span style={{ fontFamily: mono }}>
                  <Typed text={SKILL_NAME} at={nameAt} cps={cps} caret={typing} />
                </span>
              </Box>
              <Hint>
                Unique slug used to reference and invoke the skill. Lowercase
                letters, digits and hyphens; fixed after creation.
              </Hint>
            </div>

            <div style={{ marginBottom: 18, ...row(1) }}>
              <Label text="Description" />
              <Box minHeight={84}>
                <Typed text={SKILL_DESC} at={descAt} cps={5.5} caret={false} />
              </Box>
              <Hint>
                What the skill does and when to use it. The agent reads this to
                decide whether to apply the skill.
              </Hint>
            </div>

            <div style={{ marginBottom: 18, ...row(2) }}>
              <Label text="Trigger" />
              <Box>refund, money back, cancel my plan</Box>
              <Hint>
                Comma-separated keywords describing when the skill is relevant.
              </Hint>
            </div>

            <div style={row(3)}>
              <Label text="Content" />
              <Box minHeight={96}>
                <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg }}>
                  # Refund handling
                  <br />
                  1. Find the order and its purchase date.
                  <br />
                  2. Inside 30 days → approve and confirm the amount.
                </span>
              </Box>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── step 4 · what is attached ──────────────────────────────────── */

const ATTACHED = [
  ["refund-handling", "Your copy · edited · support"],
  ["market-analysis", "Your copy · from template · strategy"],
  ["partnerships", "Your copy · from template · strategy"],
  ["comps-analysis", "Your copy · from template · finance"],
];

export const SceneSkillAttached: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const rows = [
    useEnterAt(t(14), 10),
    useEnterAt(t(24), 10),
    useEnterAt(t(34), 10),
    useEnterAt(t(44), 10),
  ];

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1420} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 24,
              opacity: head,
            }}
          >
            <Heading size={28} style={{ flex: 1 }}>
              Attach a skill
            </Heading>
            <div
              style={{
                border: `1px solid ${c.amber}`,
                background: "#fffdf7",
                borderRadius: radius,
                padding: "11px 18px",
                fontFamily: sans,
                fontSize: 17,
                fontWeight: 500,
                color: c.amber600,
              }}
            >
              + Add skill
            </div>
          </div>

          {ATTACHED.map(([name, meta], i) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                background: "#f7f7f6",
                border: `1px solid ${c.border}`,
                borderRadius: 11,
                padding: "17px 20px",
                marginBottom: 11,
                opacity: rows[i],
                transform: `translateY(${(1 - rows[i]) * 8}px)`,
              }}
            >
              <DocGlyph />
              <div style={{ flex: 1 }}>
                <Text size={19} weight={500}>
                  {name}
                </Text>
                <Text size={16} muted style={{ marginTop: 5 }}>
                  {meta}
                </Text>
              </div>
              <Text size={17} style={{ color: c.amber600 }}>
                Edit
              </Text>
              <Text size={17} style={{ color: c.destructive }}>
                Detach
              </Text>
            </div>
          ))}
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 5 · it uses the skill ─────────────────────────────────── */

export const SceneSkillUse: React.FC = () => {
  const t = useTimeScale(5);
  const ask = useEnterAt(t(4), 10);
  const skill = useEnterAt(t(26), 10);
  const reply = useEnterAt(t(48), 12);
  const steps = useEnterAt(t(70), 12);

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
              I bought this three weeks ago and want my money back.
            </div>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginTop: 26,
              padding: "11px 17px",
              borderRadius: 9,
              background: `${c.amber}14`,
              border: `1px solid ${c.amber}3d`,
              opacity: skill,
            }}
          >
            <Text size={16} weight={500} style={{ color: c.amber600 }}>
              skill · refund-handling
            </Text>
          </div>

          <Text size={22} style={{ marginTop: 22, lineHeight: 1.6, opacity: reply }}>
            Three weeks is inside our 30-day window, so that refund is
            straightforward. Here is what I need:
          </Text>

          <div style={{ marginTop: 18, opacity: steps }}>
            {[
              "The order number, or the email you bought with.",
              "Confirmation you want the full amount back.",
            ].map((line, i) => (
              <div
                key={line}
                style={{ display: "flex", gap: 14, marginTop: 11 }}
              >
                <Text size={20} muted style={{ width: 26 }}>
                  {i + 1}.
                </Text>
                <Text size={20} style={{ lineHeight: 1.55 }}>
                  {line}
                </Text>
              </div>
            ))}
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const DocGlyph = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" {...stroke} stroke={c.mutedFg}>
    <path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z" />
    <path d="M14 2.5V8h5.5" />
  </svg>
);

/* ── experts · a skill backed by its own model ──────────────────── */

/**
 * The `Is Expert` branch of `skill-form.tsx`.
 *
 * Flipping the switch reveals a block behind an amber left rule — that rule is
 * in the product, and it is what makes the extra fields read as belonging to
 * the toggle rather than to the form. Tool groups and their members are the
 * form's `EXPERT_TOOL_GROUPS` verbatim.
 */
const TOOL_GROUPS: [string, string[]][] = [
  ["Inspect workspace", ["read_file", "search_files", "list_files"]],
  ["Mutate files", ["patch", "write_file"]],
  ["Run code and scripts", ["terminal"]],
  ["Lookup information", ["web_search", "web_extract"]],
];

export const SceneSkillExpert: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);

  const flipAt = t(26);
  const on = frame >= flipAt;
  const head = useEnterAt(t(4), 10);
  const model = useEnterAt(t(38), 10);
  const iters = useEnterAt(t(52), 10);
  const tools = useEnterAt(t(66), 12);

  // The switch knob slides rather than cuts.
  const knob = Math.min(1, Math.max(0, (frame - flipAt) / 7));

  return (
    <Stage glow={{ x: 0.5, y: 0.45 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1060} hot at={0} style={{ padding: "32px 40px 34px" }}>
          {/* the toggle row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              opacity: head,
            }}
          >
            <div style={{ flex: 1 }}>
              <Text size={21} weight={600}>
                Is Expert
              </Text>
              <Text size={17} muted style={{ marginTop: 6 }}>
                Back this skill with a deployed model the base LLM can delegate
                to
              </Text>
            </div>
            <div
              style={{
                width: 66,
                height: 36,
                borderRadius: 999,
                background: on ? c.amber : "#e0dedd",
                padding: 4,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: "#fff",
                  transform: `translateX(${knob * 30}px)`,
                }}
              />
            </div>
          </div>

          {on ? (
            <div
              style={{
                marginTop: 26,
                paddingLeft: 22,
                borderLeft: `2px solid ${c.amber}66`,
              }}
            >
              <div style={{ marginBottom: 20, opacity: model }}>
                <Label text="Deployed Model" />
                <Box>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ flex: 1 }}>
                      Refund Specialist{" "}
                      <span style={{ color: c.mutedFg, fontSize: 15 }}>
                        qwen3-8b
                      </span>
                    </span>
                    <ChevronGlyph />
                  </span>
                </Box>
                <Hint>Endpoint is derived from the selected model</Hint>
              </div>

              <div style={{ marginBottom: 20, opacity: iters }}>
                <Label text="Max Iterations" />
                <Box>10</Box>
                <Hint>Tool-call rounds the expert can take before giving up</Hint>
              </div>

              <div style={{ opacity: tools }}>
                <Text size={19} weight={600} style={{ marginBottom: 4 }}>
                  Allowed Tools
                </Text>
                <Text size={16} muted style={{ marginBottom: 14 }}>
                  Tools the expert may invoke during delegation
                </Text>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "14px 30px",
                  }}
                >
                  {TOOL_GROUPS.map(([group, list]) => (
                    <div key={group}>
                      <Text size={15} muted style={{ marginBottom: 7 }}>
                        {group}
                      </Text>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {list.map((tool) => (
                          <span
                            key={tool}
                            style={{
                              border: `1px solid ${c.border}`,
                              borderRadius: 7,
                              padding: "5px 11px",
                              fontFamily: mono,
                              fontSize: 15,
                              color: c.foreground,
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const ChevronGlyph = () => (
  <svg width={19} height={19} viewBox="0 0 24 24" {...stroke} stroke={c.mutedFg}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

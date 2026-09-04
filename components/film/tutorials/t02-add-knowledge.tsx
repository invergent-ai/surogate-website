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
 * Tutorial 02 — Give it your knowledge.
 *
 * Sources: the create form from `work-kb-create.png`; the source picker,
 * stat cards, processing banner, wiki and attach panel from
 * surogate-ops/frontend/src/features/agents/agent-knowledge-base-*.tsx.
 *
 * Note the docs and the code disagree on the source picker — the docs say five
 * types, `agent-knowledge-base-add-source.tsx` defines three. The code wins.
 */

const KB = "Acme Product Docs";
const KB_SLUG = "acme-product-docs";
const KB_DESC = "Public product documentation, release notes and pricing pages.";

/* ── step 1 · create the knowledge base ─────────────────────────── */

export const SceneKbCreate: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);

  const nameAt = t(18);
  const nameCps = 1.4;
  const nameDone = nameAt + typedFrames(KB, nameCps);
  const typing = frame >= nameAt && frame < nameDone;
  const slug = KB.slice(0, Math.max(0, Math.floor((frame - nameAt) * nameCps)))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const rows = [
    useEnterAt(t(4), 10),
    useEnterAt(t(14), 10),
    useEnterAt(t(26), 10),
    useEnterAt(t(38), 10),
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
          { at: nameAt, over: t(95), scale: 0.98, focus: { x: 0.5, y: 0.52 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={940} hot at={0} style={{ padding: "32px 40px 30px" }}>
            <Heading size={28} style={{ marginBottom: 10 }}>
              Create a knowledge base
            </Heading>
            <Text size={16} muted style={{ marginBottom: 24 }}>
              A knowledge base lets your agent search your docs at runtime. Add
              sources after creation, then compile.
            </Text>

            <div style={{ marginBottom: 18, ...row(0) }}>
              <Label text="Display Name" required />
              <Box focused={typing}>
                <Typed text={KB} at={nameAt} cps={nameCps} caret={typing} />
              </Box>
            </div>

            <div style={{ marginBottom: 18, ...row(1) }}>
              <Label text="Slug" note="(unique within project)" />
              <Box>
                <span style={{ fontFamily: mono, color: typing ? c.amber : c.foreground }}>
                  {slug || KB_SLUG.slice(0, 0)}
                </span>
              </Box>
              <Hint>Lowercase and hyphens only.</Hint>
            </div>

            <div style={{ marginBottom: 18, ...row(2) }}>
              <Label text="Description" note="(optional)" />
              <Box minHeight={78}>{KB_DESC}</Box>
            </div>

            <div style={{ marginBottom: 22, ...row(3) }}>
              <Label text="Curator model" note="locked after creation" />
              <Box>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ flex: 1 }}>Surogate</span>
                  <Chevron />
                </span>
              </Box>
              <Hint>
                The curator reads each ingested source and writes the wiki.
              </Hint>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <div
                style={{
                  border: `1px solid ${c.border}`,
                  borderRadius: radius,
                  padding: "12px 22px",
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 500,
                }}
              >
                Cancel
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: c.amber,
                  color: "#000",
                  borderRadius: radius,
                  padding: "12px 22px",
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 600,
                }}
              >
                Create <Arrow />
              </div>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── step 2 · add a source ──────────────────────────────────────── */

const SOURCES = [
  {
    title: "File upload",
    desc: "Upload PDF, Markdown, TXT, DOCX, or CSV files.",
    enabled: true,
  },
  {
    title: "S3 / Object storage",
    desc: "Sync from an S3-compatible bucket.",
    enabled: false,
  },
  { title: "URL list", desc: "Crawl a list of web URLs.", enabled: false },
];

export const SceneKbSource: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(4), 10);
  const cards = [
    useEnterAt(t(16), 10),
    useEnterAt(t(26), 10),
    useEnterAt(t(36), 10),
  ];

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1180} hot at={0} style={{ padding: "34px 40px 38px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
              opacity: head,
              fontFamily: sans,
              fontSize: 16,
              color: c.mutedFg,
            }}
          >
            <span>{KB}</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Curator · Surogate</span>
          </div>

          <Heading size={28} style={{ marginBottom: 8, opacity: head }}>
            Add a source
          </Heading>
          <Text size={16} muted style={{ marginBottom: 26, opacity: head }}>
            A source can be a single document or a batch of related files read
            and indexed together.
          </Text>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {SOURCES.map((src, i) => (
              <div
                key={src.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                  borderRadius: 13,
                  border: `1px solid ${src.enabled ? c.amber : c.border}`,
                  background: src.enabled ? "#fffdf7" : "#fafaf9",
                  padding: 22,
                  minHeight: 168,
                  opacity: cards[i] * (src.enabled ? 1 : 0.72),
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
                  <FileGlyph />
                  {src.enabled ? null : (
                    <span
                      style={{
                        borderRadius: 7,
                        background: "rgba(12,10,9,0.06)",
                        padding: "4px 11px",
                        fontFamily: sans,
                        fontSize: 14,
                        fontWeight: 500,
                        color: c.mutedFg,
                      }}
                    >
                      Coming soon
                    </span>
                  )}
                </div>
                <Text size={20} weight={600}>
                  {src.title}
                </Text>
                <Text size={16} muted style={{ lineHeight: 1.45 }}>
                  {src.desc}
                </Text>
              </div>
            ))}
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · compile ───────────────────────────────────────────── */

const STATS = [
  ["Sources", "documents you added"],
  ["Wiki pages", "what your agent searches"],
  ["Files", "individual files inside sources"],
  ["Attached to", "agents using this"],
] as const;

export const SceneKbCompile: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const banner = useEnterAt(t(20), 12);

  // 0 → 3 sources processed across the shot; wiki pages follow.
  const done = frame >= t(112) ? 3 : frame >= t(84) ? 2 : frame >= t(52) ? 1 : 0;
  const pages = [0, 6, 13, 21][done];
  const values = [3, pages, 3, 1];

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1240} hot at={0} style={{ padding: "32px 38px 36px" }}>
          <div style={{ opacity: head, marginBottom: 24 }}>
            <Heading size={28}>{KB}</Heading>
          </div>

          <div style={{ display: "flex", gap: 16, marginBottom: 26 }}>
            {STATS.map(([label, desc], i) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                  borderRadius: 12,
                  border: `1px solid ${c.border}`,
                  background: "#faf9f8",
                  padding: "18px 20px",
                  opacity: head,
                }}
              >
                <span
                  style={{
                    fontFamily: sans,
                    fontSize: 30,
                    fontWeight: 600,
                    lineHeight: 1,
                    color: values[i] > 0 ? c.foreground : c.mutedFg,
                  }}
                >
                  {values[i]}
                </span>
                <span
                  style={{
                    fontFamily: sans,
                    fontSize: 16,
                    fontWeight: 500,
                    color: c.mutedFg,
                  }}
                >
                  {label}
                </span>
                <span style={{ fontFamily: sans, fontSize: 14, color: c.mutedFg, opacity: 0.8 }}>
                  {desc}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              borderRadius: 13,
              border: `1px solid ${c.border}`,
              background: "#faf9f8",
              padding: "20px 24px",
              opacity: banner,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: c.amber,
                  opacity: done < 3 ? 0.55 + 0.45 * Math.sin(frame / 5) : 1,
                }}
              />
              <Text size={20} weight={600}>
                {done < 3 ? "Processing your docs" : "Ready"}
              </Text>
            </div>
            <Text size={16} muted>
              This takes 30 seconds to a few minutes per source. You can leave
              this page.
            </Text>
            <Text size={16} weight={500} muted>
              {done} / 3 sources processed
            </Text>
            <div
              style={{
                height: 7,
                borderRadius: 4,
                background: "rgba(12,10,9,0.09)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(done / 3) * 100}%`,
                  borderRadius: 4,
                  background: c.amber,
                }}
              />
            </div>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 4 · the wiki ──────────────────────────────────────────── */

const PAGES = [
  "Pricing across all plans",
  "Refunds and cancellations",
  "Release notes · 2026",
  "Known issues by severity",
  "Support escalation paths",
];

export const SceneKbWiki: React.FC = () => {
  const t = useTimeScale(5);
  const shell = useEnterAt(t(3), 10);
  const list = useEnterAt(t(14), 10);
  const doc = useEnterAt(t(30), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1360} hot at={0} style={{ display: "flex", minHeight: 520, opacity: shell }}>
          {/* page list */}
          <div
            style={{
              width: 400,
              borderRight: `1px solid ${c.border}`,
              padding: "24px 20px",
              opacity: list,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                border: `1px solid ${c.border}`,
                borderRadius: 10,
                padding: "11px 14px",
                marginBottom: 10,
              }}
            >
              <Search />
              <Text size={16} muted>
                Search wiki...
              </Text>
            </div>
            <Text size={14} muted style={{ marginBottom: 12, opacity: 0.8 }}>
              21 pages
            </Text>
            {PAGES.map((p, i) => (
              <div
                key={p}
                style={{
                  borderRadius: 9,
                  padding: "11px 13px",
                  marginBottom: 3,
                  background: i === 0 ? `${c.amber}1f` : "transparent",
                  fontFamily: sans,
                  fontSize: 16,
                  color: i === 0 ? c.amber600 : c.foreground,
                  fontWeight: i === 0 ? 500 : 400,
                }}
              >
                {p}
              </div>
            ))}
          </div>

          {/* reader */}
          <div style={{ flex: 1, padding: "26px 32px", opacity: doc }}>
            <Heading size={26} style={{ marginBottom: 6 }}>
              Pricing across all plans
            </Heading>
            <Text size={14} muted style={{ marginBottom: 20 }}>
              synthesis · 4 sources
            </Text>
            <Text size={17} style={{ lineHeight: 1.65, marginBottom: 14 }}>
              Acme sells three plans. Starter is $19 per seat per month, Team is
              $49 and includes SSO, and Enterprise is priced per contract.
            </Text>
            <Text size={17} style={{ lineHeight: 1.65, marginBottom: 14 }}>
              Annual billing takes 20% off every plan. Seats can be added
              mid-term and are prorated to the renewal date.
            </Text>
            <Text size={17} muted style={{ lineHeight: 1.65 }}>
              Refunds follow the 30-day window described in Refunds and
              cancellations.
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── small glyphs ───────────────────────────────────────────────── */

const line = {
  fill: "none",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Chevron = () => (
  <svg width={19} height={19} viewBox="0 0 24 24" {...line} stroke={c.mutedFg}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Arrow = () => (
  <svg width={19} height={19} viewBox="0 0 24 24" {...line} stroke="#000">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const Search = () => (
  <svg width={19} height={19} viewBox="0 0 24 24" {...line} stroke={c.mutedFg}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const FileGlyph = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" {...line} stroke={c.mutedFg}>
    <path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z" />
    <path d="M14 2.5V8h5.5" />
  </svg>
);

/* ── step 5 · attach it to the agent ────────────────────────────── */

export const SceneKbAttach: React.FC = () => {
  const t = useTimeScale(5);
  const shell = useEnterAt(t(3), 10);
  const rows = [useEnterAt(t(18), 10), useEnterAt(t(30), 10)];
  const picked = useEnterAt(t(48), 12);
  const modes = useEnterAt(t(70), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1120} hot at={0} style={{ padding: "32px 38px 34px", opacity: shell }}>
          <Heading size={26} style={{ marginBottom: 20 }}>
            Knowledge Bases
          </Heading>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              border: `1px solid ${c.border}`,
              borderRadius: 10,
              padding: "13px 16px",
              marginBottom: 18,
            }}
          >
            <Search />
            <Text size={17} muted>
              Search your Library…
            </Text>
          </div>

          {[KB, "Support Playbooks"].map((name, i) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                border: `1px solid ${i === 0 ? c.amber : c.border}`,
                background: i === 0 ? "#fffdf7" : c.card,
                borderRadius: 12,
                padding: "18px 20px",
                marginBottom: 12,
                opacity: rows[i],
                transform: `translateY(${(1 - rows[i]) * 8}px)`,
              }}
            >
              <Text size={20} weight={600} style={{ flex: 1 }}>
                {name}
              </Text>
              {i === 0 ? (
                <span style={{ opacity: picked }}>
                  <Text size={17} weight={500} style={{ color: c.amber600 }}>
                    ✓ Attached
                  </Text>
                </span>
              ) : (
                <Text size={17} muted>
                  Attach
                </Text>
              )}
            </div>
          ))}

          {/*
            The three attach modes, from AttachKBRequest in
            surogate_ops/server/models/knowledge.py. Grounding and its no-quotes
            variant carry identical authority — the difference is presentation.
            Reference is the one that changes behaviour: supporting material the
            agent consults at its own judgment.
          */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 20, opacity: picked }}>
            <Text size={17} muted>
              Usage
            </Text>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 40,
                border: `1px solid ${c.amber}`,
                background: "#fffdf7",
                borderRadius: 10,
                padding: "11px 16px",
              }}
            >
              <Text size={17}>Grounding</Text>
              <Chevron />
            </div>
          </div>

          <div style={{ marginTop: 14, opacity: modes }}>
            {[
              ["Grounding", "Authoritative. Consulted before answering, with inline quotes.", true],
              ["Grounding, no quotes", "Same authority, answered in plain prose.", false],
              ["Reference", "Optional supporting material, at the agent's judgment.", false],
            ].map(([name, desc, active]) => (
              <div
                key={name as string}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  borderRadius: 9,
                  padding: "10px 14px",
                  background: active ? `${c.amber}14` : "transparent",
                }}
              >
                <Text
                  size={17}
                  weight={500}
                  style={{
                    width: 250,
                    color: active ? c.amber600 : c.foreground,
                  }}
                >
                  {name as string}
                </Text>
                <Text size={16} muted>
                  {desc as string}
                </Text>
              </div>
            ))}
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 6 · ask it ────────────────────────────────────────────── */

export const SceneKbAsk: React.FC = () => {
  const t = useTimeScale(5);
  const ask = useEnterAt(t(4), 10);
  const tool = useEnterAt(t(26), 10);
  const reply = useEnterAt(t(48), 12);
  const cite = useEnterAt(t(76), 12);

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
                maxWidth: "70%",
                fontFamily: sans,
                fontSize: 22,
                lineHeight: 1.5,
              }}
            >
              What do we charge for the Team plan?
            </div>
          </div>

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
            <span style={{ flex: 1, fontFamily: sans, fontSize: 19, fontStyle: "italic", color: c.mutedFg }}>
              Searched Acme Product Docs — found “Pricing across all plans”
            </span>
            <Chevron />
          </div>

          <Text size={22} style={{ marginTop: 22, lineHeight: 1.6, opacity: reply }}>
            Team is $49 per seat per month, and it includes SSO. Annual billing
            takes 20% off, which brings it to $39.20 per seat.
          </Text>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginTop: 20,
              padding: "9px 15px",
              borderRadius: 9,
              background: `${c.amber}14`,
              border: `1px solid ${c.amber}3d`,
              opacity: cite,
            }}
          >
            <Text size={16} weight={500} style={{ color: c.amber600 }}>
              Pricing across all plans
            </Text>
            <Text size={16} muted>
              Acme Product Docs
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

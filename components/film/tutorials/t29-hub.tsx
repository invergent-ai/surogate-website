import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 29 — Version everything in the Hub.
 *
 * Standalone. Nothing here needs an earlier video: the Hub is where everything
 * you make already lands, and the video is about finding it, pinning it and
 * getting back to an older one.
 *
 * Screens from `features/hub/hub-page.tsx`, `components/repo-explorer/`
 * (`repo-explorer.tsx`'s tab set, `commits-tab.tsx`, `tags-tab.tsx`,
 * `file-browser.tsx`) and `repo-types.ts` for the type metadata and colours.
 */

const GREEN = "#22C55E";

/** `TYPE_META` — label, plural and colour, all from that file. */
const TYPES: [string, string, string, number][] = [
  ["Models", "M", "#3B82F6", 14],
  ["Datasets", "D", "#22C55E", 23],
  ["Skills", "S", "#8B5CF6", 61],
  ["Experiments", "E", "#EC4899", 9],
  ["Environments", "V", "#14B8A6", 7],
];

const REPOS: [string, string, string, string][] = [
  ["support-sft-001", "Models", "#3B82F6", "2h ago"],
  ["support-conversations", "Datasets", "#22C55E", "5h ago"],
  ["refund-policy-lookup", "Skills", "#8B5CF6", "yesterday"],
  ["tool-routing", "Environments", "#14B8A6", "3d ago"],
];

/* ── step 1 · everything is already in here ─────────────────────── */

/**
 * `hub-page.tsx` — "Data Hub", subtitled with the repository count, a search
 * box, and a rail of type filters built from `TYPE_META` with per-type counts.
 *
 * The point of the shot is that nothing had to be put here. Training runs,
 * datasets, skills and environments all write to the Hub as a side effect of
 * existing.
 */
export const SceneHubList: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 10);
  const filters = useEnterAt(t(14), 10);
  const rows = [
    useEnterAt(t(28), 9),
    useEnterAt(t(36), 9),
    useEnterAt(t(44), 9),
    useEnterAt(t(52), 9),
  ];
  const note = useEnterAt(t(84), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1520} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, opacity: head }}>
            <Heading size={25}>Data Hub</Heading>
            <Text size={17} muted>
              114 repositories
            </Text>
          </div>

          <div style={{ display: "flex", gap: 9, marginTop: 18, opacity: filters }}>
            <Chip label="All" count={114} on />
            {TYPES.map(([label, , color, n]) => (
              <Chip key={label} label={label} count={n} color={color} />
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            {REPOS.map(([name, type, color, when], i) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "13px 4px",
                  borderBottom: `1px solid ${c.border}`,
                  opacity: rows[i],
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 3,
                    background: color,
                    flex: "0 0 auto",
                  }}
                />
                <span style={{ flex: 1, fontFamily: mono, fontSize: 17 }}>{name}</span>
                <span style={{ fontFamily: sans, fontSize: 15, color, width: 160 }}>
                  {type}
                </span>
                <span style={{ fontFamily: sans, fontSize: 15, color: c.mutedFg, width: 130, textAlign: "right" }}>
                  {when}
                </span>
              </div>
            ))}
          </div>

          <Text size={16} muted style={{ marginTop: 16, lineHeight: 1.5, opacity: note }}>
            You never uploaded any of these. Training runs, datasets, skills and
            environments write here as they go.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const Chip: React.FC<{ label: string; count: number; color?: string; on?: boolean }> = ({
  label,
  count,
  color,
  on,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      border: `1px solid ${on ? c.amber : c.border}`,
      background: on ? `${c.amber}12` : "transparent",
      borderRadius: 9,
      padding: "8px 14px",
      fontFamily: sans,
      fontSize: 16,
      fontWeight: on ? 600 : 400,
      color: on ? c.amber600 : c.foreground,
    }}
  >
    {color ? (
      <span style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
    ) : null}
    {label}
    <span style={{ color: c.mutedFg, fontWeight: 400 }}>{count}</span>
  </span>
);

/* ── step 2 · open one ──────────────────────────────────────────── */

/**
 * `repo-explorer.tsx`. The tabs carry their counts in the label — Files (n),
 * Commits (n), Branches (n), Tags (n) — and `file-browser.tsx` puts the
 * `sg://` prefix in bold at the head of the path.
 */
const FILES: [string, string, boolean][] = [
  ["adapter/", "", true],
  ["merged/", "", true],
  ["adapter_config.json", "612 B", false],
  ["adapter_model.safetensors", "168 MB", false],
  ["README.md", "1.4 KB", false],
  ["train_config.yaml", "2.1 KB", false],
];

export const SceneHubRepo: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 10);
  const tabs = useEnterAt(t(12), 10);
  const path = useEnterAt(t(22), 10);
  const frame = useCurrentFrame();
  const note = useEnterAt(t(88), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1460} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13, opacity: head }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: "#3B82F6" }} />
            <Heading size={24}>support-sft-001</Heading>
            <span
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 7,
                padding: "4px 11px",
                fontFamily: mono,
                fontSize: 14,
                color: c.mutedFg,
              }}
            >
              main
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 26,
              marginTop: 18,
              paddingBottom: 11,
              borderBottom: `1px solid ${c.border}`,
              opacity: tabs,
            }}
          >
            {["Files (6)", "Commits (12)", "Branches (2)", "Tags (3)", "Info"].map(
              (tab, i) => (
                <span
                  key={tab}
                  style={{
                    fontFamily: sans,
                    fontSize: 17,
                    fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? c.foreground : c.mutedFg,
                    borderBottom: i === 0 ? `2px solid ${c.amber}` : "2px solid transparent",
                    paddingBottom: 11,
                    marginBottom: -12,
                  }}
                >
                  {tab}
                </span>
              ),
            )}
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginTop: 16, opacity: path }}>
            <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 700 }}>sg://</span>
            <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg }}>
              support-sft-001/main/
            </span>
          </div>

          <div style={{ marginTop: 10 }}>
            {FILES.map(([name, size, isDir], i) => {
              const enter = Math.max(0, Math.min(1, (frame - t(30 + i * 7)) / t(8)));
              return (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 13,
                    padding: "10px 4px",
                    borderBottom: `1px solid ${c.border}`,
                    opacity: enter,
                  }}
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={isDir ? c.amber600 : c.mutedFg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {isDir ? (
                      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                    ) : (
                      <>
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      </>
                    )}
                  </svg>
                  <span style={{ flex: 1, fontFamily: mono, fontSize: 16 }}>{name}</span>
                  <span style={{ fontFamily: sans, fontSize: 15, color: c.mutedFg }}>
                    {size}
                  </span>
                </div>
              );
            })}
          </div>

          <Text size={16} muted style={{ marginTop: 14, lineHeight: 1.5, opacity: note }}>
            Every file the run produced, at the revision you are looking at.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · what changed, and when ────────────────────────────── */

/**
 * `commits-tab.tsx`: a dotted timeline, the short SHA in green, the message,
 * then committer and a relative time.
 */
const COMMITS: [string, string, string, string][] = [
  ["a4f19c02", "merge adapter into base", "trainer", "2 hours ago"],
  ["7b3e0d51", "checkpoint step 1000", "trainer", "3 hours ago"],
  ["1c88af6e", "checkpoint step 750", "trainer", "3 hours ago"],
  ["e02d4471", "initial adapter weights", "trainer", "4 hours ago"],
];

export const SceneHubCommits: React.FC = () => {
  const t = useTimeScale(6);
  const tabs = useEnterAt(t(3), 10);
  const frame = useCurrentFrame();
  const note = useEnterAt(t(88), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1460} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div
            style={{
              display: "flex",
              gap: 26,
              paddingBottom: 11,
              borderBottom: `1px solid ${c.border}`,
              opacity: tabs,
            }}
          >
            {["Files (6)", "Commits (12)", "Branches (2)", "Tags (3)", "Info"].map(
              (tab, i) => (
                <span
                  key={tab}
                  style={{
                    fontFamily: sans,
                    fontSize: 17,
                    fontWeight: i === 1 ? 600 : 400,
                    color: i === 1 ? c.foreground : c.mutedFg,
                    borderBottom: i === 1 ? `2px solid ${c.amber}` : "2px solid transparent",
                    paddingBottom: 11,
                    marginBottom: -12,
                  }}
                >
                  {tab}
                </span>
              ),
            )}
          </div>

          <div style={{ marginTop: 16 }}>
            {COMMITS.map(([sha, msg, who, when], i) => {
              const enter = Math.max(0, Math.min(1, (frame - t(14 + i * 11)) / t(10)));
              return (
                <div
                  key={sha}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "12px 0",
                    borderBottom: i === COMMITS.length - 1 ? "none" : `1px solid ${c.border}`,
                    opacity: enter,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 16, flex: "0 0 auto" }}>
                    <span
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: 999,
                        background: GREEN,
                        border: `2px solid ${GREEN}`,
                        marginTop: 4,
                      }}
                    />
                    {i < COMMITS.length - 1 ? (
                      <span style={{ width: 1, flex: 1, background: c.border, marginTop: 5 }} />
                    ) : null}
                  </div>
                  <div>
                    <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 500, color: "#15803d" }}>
                      {sha}
                    </span>
                    <Text size={17} style={{ marginTop: 3 }}>
                      {msg}
                    </Text>
                    <Text size={15} muted style={{ marginTop: 2 }}>
                      {who} · {when}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>

          <Text size={16} muted style={{ marginTop: 14, lineHeight: 1.5, opacity: note }}>
            Every checkpoint the trainer wrote is its own commit, so you can go
            back to any of them.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 4 · pin one ───────────────────────────────────────────── */

/**
 * `tags-tab.tsx` — a tag icon, the tag name, and the short commit it points at.
 *
 * This is the step that makes the rest of the platform reproducible: a run
 * pinning `main` gets whatever `main` is that day, and a run pinning a tag gets
 * the same bytes forever.
 */
export const SceneHubTags: React.FC = () => {
  const t = useTimeScale(6);
  const tabs = useEnterAt(t(3), 10);
  const rows = [useEnterAt(t(16), 10), useEnterAt(t(26), 10), useEnterAt(t(36), 10)];
  const ref = useEnterAt(t(58), 12);
  const note = useEnterAt(t(86), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1460} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div
            style={{
              display: "flex",
              gap: 26,
              paddingBottom: 11,
              borderBottom: `1px solid ${c.border}`,
              opacity: tabs,
            }}
          >
            {["Files (6)", "Commits (12)", "Branches (2)", "Tags (3)", "Info"].map(
              (tab, i) => (
                <span
                  key={tab}
                  style={{
                    fontFamily: sans,
                    fontSize: 17,
                    fontWeight: i === 3 ? 600 : 400,
                    color: i === 3 ? c.foreground : c.mutedFg,
                    borderBottom: i === 3 ? `2px solid ${c.amber}` : "2px solid transparent",
                    paddingBottom: 11,
                    marginBottom: -12,
                  }}
                >
                  {tab}
                </span>
              ),
            )}
          </div>

          <div
            style={{
              border: `1px solid ${c.border}`,
              borderRadius: 12,
              overflow: "hidden",
              marginTop: 18,
            }}
          >
            {[
              ["v3", "a4f19c02"],
              ["v2", "1c88af6e"],
              ["v1", "e02d4471"],
            ].map(([tag, sha], i) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  padding: "13px 18px",
                  borderBottom: i === 2 ? "none" : `1px solid ${c.border}`,
                  opacity: rows[i],
                }}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                  <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
                <span style={{ flex: 1, fontFamily: sans, fontSize: 17 }}>{tag}</span>
                <span style={{ fontFamily: mono, fontSize: 15, color: c.mutedFg }}>{sha}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginTop: 18, opacity: ref }}>
            <span style={{ fontFamily: mono, fontSize: 18, fontWeight: 700 }}>sg://</span>
            <span style={{ fontFamily: mono, fontSize: 18 }}>support-sft-001</span>
            <span style={{ fontFamily: mono, fontSize: 18, color: c.amber600, fontWeight: 600 }}>
              @v3
            </span>
          </div>

          <Text size={16} muted style={{ marginTop: 12, lineHeight: 1.5, opacity: note }}>
            Point a run or an agent at a tag and it gets the same bytes every
            time. Point it at a branch and it gets whatever landed last.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── the payoff ─────────────────────────────────────────────────── */

/**
 * Two runs of the same job, one pinned and one not.
 *
 * This is what the versioning is for: when the second one behaves differently,
 * the tag tells you which artefact moved and the commit tells you when.
 */
export const SceneHubPayoff: React.FC = () => {
  const t = useTimeScale(5);
  const a = useEnterAt(t(3), 12);
  const b = useEnterAt(t(26), 12);
  const note = useEnterAt(t(62), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1360} hot at={0} style={{ padding: "26px 32px 28px" }}>
          {[
            ["tool-use-grpo-004", "sg://tool-routing@v3", "0.79", true, a],
            ["tool-use-grpo-005", "sg://tool-routing", "0.61", false, b],
          ].map(([name, refStr, score, pinned, enter]) => (
            <div
              key={name as string}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "15px 0",
                borderBottom: `1px solid ${c.border}`,
                opacity: enter as number,
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 17, width: 280, flex: "0 0 auto" }}>
                {name}
              </span>
              <span style={{ flex: 1, fontFamily: mono, fontSize: 16, color: pinned ? c.foreground : c.mutedFg }}>
                {refStr}
                {pinned ? null : (
                  <span style={{ fontFamily: sans, fontSize: 15, color: c.mutedFg }}>
                    {" "}
                    — whatever main was that day
                  </span>
                )}
              </span>
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 20,
                  fontWeight: 700,
                  color: pinned ? GREEN : c.destructive,
                }}
              >
                {score}
              </span>
            </div>
          ))}

          <Text size={18} muted style={{ marginTop: 20, lineHeight: 1.55, opacity: note }}>
            Same job, different result. The pinned run tells you the environment
            didn&apos;t move, so the difference is somewhere else.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

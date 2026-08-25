import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, PanelHead, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * The hub.
 *
 * Two screens, because the product has two: the index, where everything the
 * platform made is one list with a type filter, and the repo browser, which is
 * its own page — branch selector, Files/Commits/Branches/Tags, an sg:// path
 * and the tree at that revision.
 *
 * An earlier version expanded a row inline. That undersold it: the point is
 * that these are real git repositories with real checkpoints in them, and you
 * only see that on the browser page.
 */

const REPOS = [
  { name: "northwind/qwen2.5-coder-7b", kind: "MODEL", meta: "main · 2 minutes ago" },
  { name: "northwind/northwind-marketing-v1", kind: "DATASET", meta: "main · 6 minutes ago" },
  { name: "northwind/exp1-launch-voice", kind: "EXPERIMENT", meta: "main · 4 minutes ago" },
  { name: "northwind/agent-northwind-marketing", kind: "AGENT", meta: "main · 4 minutes ago" },
] as const;

const FILTERS = [
  ["All", 23],
  ["Models", 4],
  ["Datasets", 6],
  ["Skills", 12],
  ["Experiments", 3],
  ["Environments", 2],
] as const;

const TINTS: Record<string, [string, string]> = {
  MODEL: ["#eff6ff", "#1d4ed8"],
  DATASET: ["#f0fdf4", "#15803d"],
  EXPERIMENT: ["#fdf2f8", "#be185d"],
  AGENT: ["#fffbeb", "#b45309"],
  SKILL: ["#f5f3ff", "#6d28d9"],
};

/** The repo that opens. */
const OPEN = 2;

/** The tree at that revision — checkpoints, then the adapter and its logs. */
const TREE = [
  { name: "step_00000002/", dir: true },
  { name: "step_00000004/", dir: true },
  { name: "step_00000006/", dir: true },
  { name: "step_00000008/", dir: true },
  { name: "step_00000010/", dir: true },
  { name: "step_00000012/", dir: true },
  { name: "step_00000014/", dir: true },
  { name: "step_00000016/", dir: true },
  { name: "step_00000018/", dir: true },
  { name: "adapter_config.json", dir: false },
  { name: "adapter_model.safetensors", dir: false },
  { name: "log-sft1-20260824-071224.json", dir: false },
  { name: "training_plot.png", dir: false },
] as const;

const BRANCH = "run-sft-001-a3f9";
const REPO = "northwind/exp1-launch-voice";

const AUTHORED = 6;
const SWAP = 46;

export const SceneHub: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const swap = t(SWAP);

  const hand = interpolate(frame, [swap, swap + t(18)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = hand < 0.5 ? 2 * hand * hand : 1 - Math.pow(-2 * hand + 2, 2) / 2;
  // The same pass the create and model beats use: one screen is gone before
  // the next is legible, so the two never overlap.
  const outOpacity = Math.max(0, 1 - eased * 2.1);
  const inOpacity = Math.max(0, (eased - 0.5) / 0.5);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.5 } },
          { at: t(30), over: t(20), scale: 1.0, focus: { x: 0.5, y: 0.5 } },
          { at: swap, over: t(20), scale: 0.95, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        {/* ── the index ──────────────────────────────────────── */}
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: outOpacity,
            transform: `translateX(${-eased * 1080}px)`,
          }}
        >
          <Panel width={1000} hot at={0}>
            <PanelHead
              right={
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Pill tone="amber" style={{ fontSize: 14, padding: "5px 12px" }}>
                    Private
                  </Pill>
                  <Text size={16} muted>
                    23 repositories
                  </Text>
                </div>
              }
            >
              <Heading size={24}>Data Hub</Heading>
            </PanelHead>

            <div style={{ padding: "18px 28px 6px", display: "flex", gap: 9 }}>
              {FILTERS.map(([name, n], i) => (
                <Filter key={name} name={name} n={n} at={t(3 + i * 3)} active={i === 0} />
              ))}
            </div>

            <div style={{ padding: "10px 28px 26px" }}>
              {REPOS.map((r, i) => (
                <RepoRow key={r.name} repo={r} at={t(18 + i * 6)} open={i === OPEN} />
              ))}
            </div>
          </Panel>
        </AbsoluteFill>

        {/* ── the repo browser ───────────────────────────────── */}
        {inOpacity > 0 ? (
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "center",
              opacity: inOpacity,
              transform: `translateX(${(1 - eased) * 1080}px)`,
            }}
          >
            <RepoBrowser start={swap} t={t} />
          </AbsoluteFill>
        ) : null}
      </Camera>
    </Stage>
  );
};

const RepoBrowser: React.FC<{ start: number; t: (f: number) => number }> = ({
  start,
  t,
}) => {
  const frame = useCurrentFrame();
  // The tree is longer than the card; it scrolls rather than being trimmed,
  // because "nine checkpoints" is the thing worth seeing.
  const scroll = interpolate(frame, [start + t(26), start + t(84)], [0, -232], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Panel width={1180} hot at={start} style={{ padding: "24px 28px 26px" }}>
      {/* Title row. */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 11,
            background: "#fdf2f8",
            color: "#be185d",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ⚗
        </div>
        <Heading size={25}>{REPO}</Heading>
        <Badge kind="EXPERIMENT" />
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: sans, fontSize: 16, color: c.destructive }}>
          🗑 Delete
        </span>
      </div>

      <div style={{ marginTop: 18 }}>
        <span
          style={{
            fontFamily: sans,
            fontSize: 16,
            fontWeight: 500,
            border: `1px solid ${c.border}`,
            borderRadius: radius,
            padding: "10px 18px",
          }}
        >
          ← Back to Hub
        </span>
      </div>

      {/* Branch selector, tabs, and the write actions. */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 20 }}>
        <span
          style={{
            fontFamily: sans,
            fontSize: 16,
            background: c.secondary,
            border: `1px solid ${c.border}`,
            borderRadius: radius,
            padding: "10px 16px",
            minWidth: 250,
          }}
        >
          {BRANCH}
          <span style={{ float: "right", color: c.mutedFg }}>⌄</span>
        </span>
        {[`Files (${TREE.length})`, "Commits (3)", "Branches (6)", "Tags (1)", "Info"].map(
          (tab, i) => (
            <span
              key={tab}
              style={{
                fontFamily: sans,
                fontSize: 17,
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? c.foreground : c.mutedFg,
                background: i === 0 ? c.secondary : "transparent",
                borderRadius: radius - 2,
                padding: "9px 15px",
                whiteSpace: "nowrap",
              }}
            >
              {tab}
            </span>
          ),
        )}
        <span style={{ flex: 1 }} />
        <Text size={16} muted style={{ whiteSpace: "nowrap" }}>
          ⎘ Create file
        </Text>
        <span
          style={{
            fontFamily: sans,
            fontSize: 16,
            fontWeight: 500,
            color: c.green700,
            border: "1px solid rgba(34,197,94,0.4)",
            borderRadius: radius - 2,
            padding: "9px 16px",
            whiteSpace: "nowrap",
          }}
        >
          ↑ Upload
        </span>
      </div>

      {/* The tree at this revision. */}
      <div
        style={{
          marginTop: 18,
          border: `1px solid ${c.border}`,
          borderRadius: radius,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 17,
            padding: "15px 20px",
            borderBottom: `1px solid ${c.border}`,
          }}
        >
          <span style={{ fontWeight: 700 }}>sg://</span>
          <span style={{ color: c.success }}> {REPO} </span>
          <span style={{ color: c.mutedFg }}>/</span>
          <span style={{ color: c.success }}> {BRANCH} </span>
          <span style={{ color: c.mutedFg }}>/</span>
        </div>

        <div style={{ height: 300, overflow: "hidden", position: "relative" }}>
          <div style={{ transform: `translateY(${scroll}px)` }}>
            {TREE.map((row, i) => (
              <TreeRow key={row.name} row={row} at={start + t(12 + i * 3)} />
            ))}
          </div>
          {/* Soft edges so rows arrive and leave rather than being sliced. */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(#fff 0%, rgba(255,255,255,0) 7%, rgba(255,255,255,0) 87%, #fff 100%)",
            }}
          />
        </div>
      </div>
    </Panel>
  );
};

const TreeRow: React.FC<{ row: (typeof TREE)[number]; at: number }> = ({ row, at }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "13px 20px",
        borderBottom: `1px solid ${c.border}`,
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [-10, 0])}px)`,
      }}
    >
      <span style={{ fontSize: 17, color: row.dir ? "#3b82f6" : c.mutedFg }}>
        {row.dir ? "🗀" : "🗎"}
      </span>
      <span
        style={{
          fontFamily: sans,
          fontSize: 18,
          color: row.dir ? "#2563eb" : c.foreground,
        }}
      >
        {row.name}
      </span>
    </div>
  );
};

const Badge: React.FC<{ kind: string }> = ({ kind }) => {
  const [bg, fg] = TINTS[kind];
  return (
    <span
      style={{
        fontFamily: sans,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.04em",
        background: bg,
        color: fg,
        borderRadius: 999,
        padding: "4px 11px",
      }}
    >
      {kind}
    </span>
  );
};

const Filter: React.FC<{ name: string; n: number; at: number; active: boolean }> = ({
  name,
  n,
  at,
  active,
}) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: sans,
        fontSize: 16,
        fontWeight: active ? 600 : 400,
        color: active ? c.amber600 : c.mutedFg,
        background: active ? c.amber50 : c.secondary,
        border: `1px solid ${active ? "rgba(245,158,11,0.4)" : c.border}`,
        borderRadius: radius,
        padding: "8px 14px",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
      }}
    >
      {name}
      <span style={{ fontFamily: mono, fontSize: 14, opacity: 0.8 }}>{n}</span>
    </div>
  );
};

const RepoRow: React.FC<{
  repo: (typeof REPOS)[number];
  at: number;
  open: boolean;
}> = ({ repo, at, open }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        border: `1px solid ${open ? c.amber : c.border}`,
        borderRadius: 12,
        padding: "14px 18px",
        marginBottom: 9,
        background: open ? c.amber50 : c.card,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
      }}
    >
      <span style={{ fontFamily: sans, fontSize: 19, fontWeight: 600 }}>{repo.name}</span>
      <Badge kind={repo.kind} />
      <span style={{ flex: 1 }} />
      <span style={{ fontFamily: mono, fontSize: 15, color: c.mutedFg }}>{repo.meta}</span>
    </div>
  );
};

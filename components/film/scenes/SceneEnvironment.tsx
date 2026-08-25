import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * The environment.
 *
 * Where a deterministic reward actually comes from: a versioned repo holding a
 * verifiers module you can read. The file is the beat — a reward function with
 * a comment explaining why it only fires on \boxed{} — so the code gets the
 * frame and scrolls, and the chrome around it stays honest and small.
 */

const CODE = `"""Single-turn QA verifiers env — exact-match reward.

The dataset is a tiny inline list for the scaffold; replace it with a
HuggingFace \`\`load_dataset\`\` or local parquet load (keep the \`\`question\`\`
and \`\`answer\`\` columns).
"""

import re

import verifiers as vf
from datasets import Dataset


_BOXED = re.compile(r"\\\\boxed\\{([^}]+)\\}")

# The reward only fires when the model puts its answer in \\boxed{}, so the
# env instructs it to. Without this the reward can never score above 0.
SYSTEM_PROMPT = "Solve the problem. Put your final answer inside \\\\boxed{}."


def _assistant_text(completion) -> str:
    """Model text from a completion, which is a chat message list or a str."""
    if not completion:
        return ""
    if isinstance(completion, str):
        return completion
    for message in reversed(completion):
        if message.get("role") == "assistant":
            content = message.get("content") or ""
            if isinstance(content, list):  # multimodal content parts
                content = " ".join(p.get("text", "") for p in content if isinstance(p, dict))
            return content
    return ""`;

const AUTHORED = 7;

export const SceneEnvironment: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);

  const scroll = interpolate(frame, [t(40), t(180)], [0, -404], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.92, focus: { x: 0.5, y: 0.5 } },
          { at: t(12), over: t(40), scale: 0.98, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1440} hot at={0}>
            {/* The environment / version bar. */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 26,
                padding: "18px 28px",
                borderBottom: `1px solid ${c.border}`,
                background: c.sidebar,
              }}
            >
              <div>
                <Label>ENVIRONMENT</Label>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 6 }}>
                  <span style={{ color: "#8b5cf6", fontSize: 14 }}>▦</span>
                  <Text size={18} weight={500}>
                    My Env
                  </Text>
                  <Text size={16} muted>
                    (custom)
                  </Text>
                  <span style={{ color: c.mutedFg }}>⌄</span>
                </div>
              </div>
              <span style={{ flex: 1 }} />
              <div style={{ textAlign: "right" }}>
                <Label>VERSION</Label>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 6 }}>
                  <Text size={18} weight={500}>
                    main
                  </Text>
                  <Text size={15} muted>
                    (non-reproducible)
                  </Text>
                  <span style={{ color: c.mutedFg }}>⌄</span>
                </div>
              </div>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: "#fff",
                  background: "#8b8580",
                  borderRadius: radius - 3,
                  padding: "11px 22px",
                }}
              >
                SAVE
              </span>
            </div>

            {/* Title row. */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 28px 0" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Heading size={25}>My Env</Heading>
                  <Chip>custom</Chip>
                  <Chip>draft</Chip>
                </div>
                <Text size={15} muted style={{ marginTop: 4 }}>
                  module <span style={{ fontFamily: mono }}>my_env</span>
                </Text>
              </div>
              <span style={{ flex: 1 }} />
              {["Validate", "Publish", "Save"].map((a, i) => (
                <span
                  key={a}
                  style={{
                    fontFamily: sans,
                    fontSize: 16,
                    fontWeight: 600,
                    borderRadius: radius - 2,
                    padding: "10px 20px",
                    color: i === 2 ? "#3b2a06" : c.foreground,
                    background: i === 2 ? c.amber : c.card,
                    border: `1px solid ${i === 2 ? "transparent" : c.border}`,
                    opacity: i === 2 ? 0.75 : 1,
                  }}
                >
                  {a}
                </span>
              ))}
            </div>

            {/* Branch + tabs. */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "18px 28px 0",
              }}
            >
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 16,
                  background: c.secondary,
                  border: `1px solid ${c.border}`,
                  borderRadius: radius - 2,
                  padding: "9px 15px",
                  minWidth: 110,
                }}
              >
                main <span style={{ float: "right", color: c.mutedFg }}>⌄</span>
              </span>
              {["Files (1)", "Commits (2)", "Branches (1)", "Tags (0)", "Info"].map((tab, i) => (
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
              ))}
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

            {/* The file. */}
            <div style={{ padding: "16px 28px 26px" }}>
              <div
                style={{
                  border: `1px solid ${c.border}`,
                  borderRadius: radius,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "13px 18px",
                    borderBottom: `1px solid ${c.border}`,
                  }}
                >
                  <span style={{ color: c.success, fontFamily: sans, fontSize: 16 }}>← Back</span>
                  <span style={{ color: c.mutedFg }}>/</span>
                  <span style={{ fontFamily: sans, fontSize: 17 }}>🗎 my_env/__init__.py</span>
                  <span style={{ flex: 1 }} />
                  <Text size={15} muted>
                    1.9 KB
                  </Text>
                  <Ghost>✎ EDIT</Ghost>
                  <Ghost tone="bad">🗑 DELETE</Ghost>
                </div>

                <div style={{ height: 246, overflow: "hidden", position: "relative" }}>
                  <div
                    style={{
                      margin: 0,
                      padding: "16px 20px",
                      fontFamily: mono,
                      fontSize: 15,
                      lineHeight: 1.62,
                      whiteSpace: "pre",
                      transform: `translateY(${scroll}px)`,
                    }}
                  >
                    {CODE.split("\n").map((line, i) => (
                      <CodeLine key={`${i}-${line}`} line={line} />
                    ))}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background:
                        "linear-gradient(#fff 0%, rgba(255,255,255,0) 6%, rgba(255,255,255,0) 92%, #fff 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/** Just enough colour that it reads as source, not as a paragraph. */
const CodeLine: React.FC<{ line: string }> = ({ line }) => {
  const trimmed = line.trimStart();
  if (trimmed.startsWith("#"))
    return <div style={{ color: "#94a3b8" }}>{line || " "}</div>;
  if (trimmed.startsWith('"""') || trimmed.startsWith("HuggingFace") || trimmed.startsWith("and ") || trimmed.startsWith("The dataset"))
    return <div style={{ color: "#0f766e" }}>{line || " "}</div>;
  if (trimmed.startsWith("import ") || trimmed.startsWith("from ") || trimmed.startsWith("def ") || trimmed.startsWith("return") || trimmed.startsWith("if ") || trimmed.startsWith("for "))
    return <div style={{ color: "#7c3aed" }}>{line || " "}</div>;
  return <div>{line || " "}</div>;
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: sans,
      fontSize: 12.5,
      letterSpacing: "0.09em",
      color: c.mutedFg,
    }}
  >
    {children}
  </div>
);

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      fontFamily: mono,
      fontSize: 14,
      color: c.mutedFg,
      background: c.secondary,
      borderRadius: 6,
      padding: "4px 10px",
    }}
  >
    {children}
  </span>
);

const Ghost: React.FC<{ children: React.ReactNode; tone?: "bad" }> = ({
  children,
  tone,
}) => (
  <span
    style={{
      fontFamily: sans,
      fontSize: 14,
      fontWeight: 600,
      color: tone ? "#b91c1c" : c.foreground,
      background: tone ? "#fef2f2" : c.card,
      border: `1px solid ${tone ? "#fecaca" : c.border}`,
      borderRadius: radius - 3,
      padding: "7px 13px",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

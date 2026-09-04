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
 * Tutorial 12 — Coding agents.
 *
 * `/code` runs a real vendor CLI — Claude Code or Codex — inside the session's
 * sandbox, on **your own** plan. Sources: `work/tools/code.md`,
 * `work-settings-coding-agents.png`, and
 * `sdk/agent-chat-react/src/components/chat/tools/code-run-tool.tsx` for how a
 * run renders ("Running claude…" while live, "Ran claude" after, a foldable
 * output block, token counts).
 *
 * The claim worth being careful with: the platform never runs an OAuth flow and
 * never calls the providers itself. You paste a credential the vendor CLI minted
 * on your machine, and it is injected only into the spawned CLI's process
 * environment inside your own sandbox.
 */

/* ── step 1 · connect your own plan ─────────────────────────────── */

export const SceneCodeConnect: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const rows = [useEnterAt(t(16), 10), useEnterAt(t(30), 10)];
  const connectAt = t(72);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <div style={{ opacity: head }}>
            <Heading size={28}>Coding Agents</Heading>
            <Text size={17} muted style={{ marginTop: 8 }}>
              Connect your Claude or Codex plan so the agent can run{" "}
              <span style={{ fontFamily: mono }}>/code</span> on your behalf — no
              separate API billing.
            </Text>
          </div>

          {[
            ["CC", "Claude Code", "Run Claude Code on your workspace using your own plan.", true],
            ["CX", "Codex", "Run Codex on your workspace using your own plan.", false],
          ].map(([abbr, name, body, first], i) => {
            const on = first && frame >= connectAt;
            return (
              <div
                key={name as string}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  border: `1px solid ${on ? c.amber : c.border}`,
                  background: on ? "#fffdf7" : c.card,
                  borderRadius: 13,
                  padding: "20px 24px",
                  marginTop: 18,
                  opacity: rows[i],
                  transform: `translateY(${(1 - rows[i]) * 8}px)`,
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 10,
                    background: "#f0efee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: sans,
                    fontSize: 15,
                    fontWeight: 600,
                    color: c.mutedFg,
                    flexShrink: 0,
                  }}
                >
                  {abbr as string}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Text size={21} weight={600}>
                      {name as string}
                    </Text>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: on ? "#10b981" : c.mutedFg,
                        opacity: on ? 1 : 0.5,
                      }}
                    />
                    <Text size={16} muted>
                      {on ? "connected · subscription" : "not connected"}
                    </Text>
                  </div>
                  <Text size={17} muted style={{ marginTop: 6 }}>
                    {body as string}
                  </Text>
                </div>
                <div
                  style={{
                    border: `1px solid ${c.border}`,
                    borderRadius: 9,
                    padding: "12px 24px",
                    fontFamily: sans,
                    fontSize: 17,
                    fontWeight: 500,
                    color: on ? c.mutedFg : c.foreground,
                  }}
                >
                  {on ? "Disconnect" : "Connect"}
                </div>
              </div>
            );
          })}

          <Text size={16} muted style={{ marginTop: 20, opacity: head }}>
            Stored per user, encrypted in the vault. There is no shared
            fallback — it never borrows anyone else&apos;s plan.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · run it ────────────────────────────────────────────── */

const FLAGS: [string, string][] = [
  ["--model <m>", "Which model the coding agent uses"],
  ["--effort <level>", "low · medium · high · xhigh"],
  ["--allow read-only", "Run without write access"],
  ["--repo <name>", "Work on a configured repository instead"],
];

export const SceneCodeRunCommand: React.FC = () => {
  const t = useTimeScale(5);
  const cmd = useEnterAt(t(3), 10);
  const rows = [
    useEnterAt(t(40), 9),
    useEnterAt(t(48), 9),
    useEnterAt(t(56), 9),
    useEnterAt(t(64), 9),
  ];

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "30px 34px 32px" }}>
          <div
            style={{
              border: `1px solid ${c.amber}`,
              background: "#fffdf7",
              borderRadius: 14,
              padding: "20px 22px",
              fontFamily: mono,
              fontSize: 20,
              lineHeight: 1.6,
              opacity: cmd,
            }}
          >
            <span style={{ color: c.amber600 }}>/code claude</span>{" "}
            <Typed
              text={'"add retry logic to the HTTP client" --effort high'}
              at={t(12)}
              cps={2.4}
            />
          </div>

          <div style={{ marginTop: 22 }}>
            {FLAGS.map(([flag, body], i) => (
              <div
                key={flag}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 22,
                  padding: "10px 0",
                  opacity: rows[i],
                }}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 17,
                    color: c.amber600,
                    width: 230,
                  }}
                >
                  {flag}
                </span>
                <Text size={17} muted>
                  {body}
                </Text>
              </div>
            ))}
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · the run, in the thread ────────────────────────────── */

/**
 * `code-run-tool.tsx`: one foldable block. While live the header shimmers
 * "Running claude…"; afterwards it reads "Ran claude", with the streamed output
 * inside and input/output token counts at the foot.
 */
const OUTPUT: [number, string][] = [
  [26, "Reading src/http/client.ts"],
  [38, "Adding exponential backoff with jitter"],
  [50, "Wrapping fetch in retryable()"],
  [62, "Updating tests — 14 passed"],
];

export const SceneCodeRun: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const block = useEnterAt(t(3), 10);
  const doneAt = t(84);
  const running = frame < doneAt;
  const final = useEnterAt(t(92), 12);
  const tokens = useEnterAt(t(104), 12);

  // The shimmer while it works.
  const pulse = 0.55 + 0.45 * Math.sin(frame / 6);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.97, focus: { x: 0.5, y: 0.46 } },
          { at: t(70), over: t(70), scale: 1.03, focus: { x: 0.5, y: 0.55 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1420} hot at={0} style={{ padding: "28px 34px 30px" }}>
            <div
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 12,
                overflow: "hidden",
                opacity: block,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 20px",
                  background: "#faf9f8",
                  borderBottom: `1px solid ${c.border}`,
                }}
              >
                <span
                  style={{
                    fontFamily: sans,
                    fontSize: 20,
                    fontWeight: 600,
                    flex: 1,
                    opacity: running ? pulse : 1,
                  }}
                >
                  {running ? "Running claude…" : "Ran claude"}
                </span>
                <span style={{ color: c.mutedFg, fontSize: 18 }}>⌄</span>
              </div>

              <div style={{ padding: "16px 20px", minHeight: 200 }}>
                {OUTPUT.map(([at, line]) => (
                  <OutLine key={line} at={t(at)} text={line} />
                ))}
              </div>
            </div>

            <Text size={19} style={{ marginTop: 20, lineHeight: 1.6, opacity: final }}>
              Added a retryable wrapper with exponential backoff and jitter, and
              covered it with four new tests.
            </Text>

            <Text size={16} muted style={{ marginTop: 12, opacity: tokens }}>
              14.2k in · 3.1k out — billed to your plan, not ours.
            </Text>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const OutLine: React.FC<{ at: number; text: string }> = ({ at, text }) => {
  const e = useEnterAt(at, 8);
  if (e === 0) return null;
  return (
    <div
      style={{
        fontFamily: mono,
        fontSize: 17,
        lineHeight: 1.9,
        color: c.mutedFg,
        opacity: e,
      }}
    >
      {text}
    </div>
  );
};

/* ── step 4 · point it at a repository ──────────────────────────── */

/**
 * With `--repo <name>` the run stops working on `/workspace` and instead checks
 * the repository out, branches, and **opens a pull request**. Its three extra
 * requirements are all real rejections, not advice: a repo run must write so
 * `--allow read-only` is refused, a GitHub token must be connected, and an
 * unconfigured name is reported rather than guessed.
 */
export const SceneCodeRepo: React.FC = () => {
  const t = useTimeScale(5);
  const cmd = useEnterAt(t(3), 10);
  const steps = [useEnterAt(t(24), 10), useEnterAt(t(38), 10), useEnterAt(t(52), 10)];
  const pr = useEnterAt(t(74), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "30px 34px 32px" }}>
          <div
            style={{
              border: `1px solid ${c.amber}`,
              background: "#fffdf7",
              borderRadius: 14,
              padding: "18px 22px",
              fontFamily: mono,
              fontSize: 19,
              opacity: cmd,
            }}
          >
            <span style={{ color: c.amber600 }}>/code claude</span> &quot;bump the
            retry ceiling to 5&quot;{" "}
            <span style={{ color: c.amber600 }}>--repo</span> support-triage
          </div>

          <div style={{ margin: "22px 0 6px" }}>
            {[
              "Checked out support-triage",
              "Branched · code/bump-retry-ceiling",
              "Committed 2 files",
            ].map((line, i) => (
              <div
                key={line}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  padding: "9px 0",
                  fontFamily: sans,
                  fontSize: 18,
                  color: c.mutedFg,
                  opacity: steps[i],
                }}
              >
                <span style={{ color: c.amber }}>✓</span>
                {line}
              </div>
            ))}
          </div>

          {/* the deliverable */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              border: `1px solid ${c.success}59`,
              background: "#f0fdf4",
              borderRadius: 12,
              padding: "18px 22px",
              marginTop: 12,
              opacity: pr,
              transform: `translateY(${(1 - pr) * 8}px)`,
            }}
          >
            <span
              style={{
                background: "#15803d",
                color: "#fff",
                borderRadius: 999,
                padding: "5px 14px",
                fontFamily: sans,
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Pull request
            </span>
            <Text size={19} weight={500} style={{ flex: 1 }}>
              #418 · Bump the retry ceiling to 5
            </Text>
            <Text size={17} muted style={{ fontFamily: mono }}>
              +18 −4
            </Text>
          </div>

          <Text size={16} muted style={{ marginTop: 16 }}>
            A repo run has to write, so{" "}
            <span style={{ fontFamily: mono }}>--allow read-only</span> is
            refused — and it needs a GitHub token connected first.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 5 · where the credential goes ─────────────────────────── */

/**
 * The security story, straight from the doc: injected only into the spawned
 * CLI's process environment inside your own sandbox, conflicting provider
 * variables scrubbed first, removed after the run, and never present in any
 * event payload or log. `/code` text is also exempt from the prompt-injection
 * screen, because it is a command to your own coding agent and never reaches
 * the platform's chat model.
 */
const SAFEGUARDS: [string, string][] = [
  ["It runs in your sandbox", "The genuine vendor binary, in your own per-session sandbox."],
  ["The credential is scoped to the process", "Injected into the spawned CLI only, with conflicting provider variables scrubbed first."],
  ["It is removed after the run", "And never appears in an event payload or a log."],
  ["We never call the provider", "No OAuth flow on your behalf, no billing through us."],
];

export const SceneCodeSafety: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const e = [
    useEnterAt(t(4), 12),
    useEnterAt(t(20), 12),
    useEnterAt(t(36), 12),
    useEnterAt(t(52), 12),
  ];
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, width: 1540 }}>
          {SAFEGUARDS.map(([head, body], i) => (
            <div
              key={head}
              style={{
                display: "flex",
                gap: 18,
                padding: "26px 28px",
                borderRadius: 16,
                minHeight: 176,
                background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${light ? "rgba(12,10,9,0.08)" : "rgba(255,255,255,0.10)"}`,
                opacity: e[i],
                transform: `translateY(${(1 - e[i]) * 12}px)`,
              }}
            >
              <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={c.amber} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}>
                <path d="M12 2.5 20.5 6v6c0 5-3.6 8.6-8.5 9.5C7.1 20.6 3.5 17 3.5 12V6z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div>
                <div style={{ fontFamily: sans, fontSize: 24, fontWeight: 600, color: ink }}>
                  {head}
                </div>
                <div style={{ fontFamily: sans, fontSize: 18, color: dim, marginTop: 8, lineHeight: 1.5 }}>
                  {body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

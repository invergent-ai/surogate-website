import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans, serif } from "../font";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 31 — Your agent's landing page and buy link.
 *
 * Standalone. Video 30 priced the agent; this one builds the page that sells
 * it — starting from the Identity tab, because the name and description a
 * customer reads are the ones set there.
 *
 * Screens from `work-agent-settings-page.tsx` (the Identity tab),
 * `features/landing/` (`landing-editor.tsx`, `landing-layouts.ts`,
 * `BLOCK_META`), `buy-page-themes.ts`, `theme-picker.tsx`,
 * `agent-commerce-panel.tsx` (the share card) and `buyer-embed-panel.tsx`.
 */

const GREEN = "#1d9e75";

/* ── step 1 · who the agent says it is ──────────────────────────── */

/**
 * The Identity tab of `work-agent-settings-page.tsx`: a Basic info card with
 * Name, Slug and Description, then the Soul card.
 *
 * It leads the video because both public pages read from it —
 * `buy-page.tsx` renders `commerce.agent_name` as its title and
 * `commerce.agent_description` under it, and the slug is what the URL uses.
 *
 * The slug is locked behind an explicit Rename toggle for a reason worth
 * stating: renaming an existing agent can break channel routing, integrations
 * and saved URLs.
 */
export const SceneIdentity: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 12);
  const name = useEnterAt(t(18), 12);
  const slug = useEnterAt(t(38), 12);
  const desc = useEnterAt(t(60), 12);
  const note = useEnterAt(t(88), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1280} hot at={0} style={{ padding: "26px 30px 28px" }}>
          <Text size={19} weight={600} style={{ opacity: head }}>
            Basic info
          </Text>

          <div style={{ display: "flex", gap: 26, marginTop: 18 }}>
            <div style={{ flex: 1, opacity: name }}>
              <Text size={15} weight={500} style={{ marginBottom: 8 }}>
                Name
              </Text>
              <Box value="Interview Coach" />
            </div>
            <div style={{ flex: 1, opacity: slug }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Text size={15} weight={500} muted>
                  Slug
                </Text>
                <span
                  style={{
                    border: `1px solid ${c.border}`,
                    borderRadius: 6,
                    padding: "2px 10px",
                    fontFamily: sans,
                    fontSize: 13,
                    color: c.mutedFg,
                  }}
                >
                  Rename
                </span>
              </div>
              <Box value="interview-coach" locked />
            </div>
          </div>

          <div style={{ marginTop: 18, opacity: desc }}>
            <Text size={15} weight={500} style={{ marginBottom: 8 }}>
              Description
            </Text>
            <div
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 8,
                background: "rgba(12,10,9,0.04)",
                padding: "12px 15px",
                fontFamily: sans,
                fontSize: 17,
                lineHeight: 1.5,
                height: 62,
              }}
            >
              Practise real interview questions out loud, and hear exactly
              what to fix before the day.
            </div>
          </div>

          <Text size={16} muted style={{ marginTop: 16, lineHeight: 1.55, opacity: note }}>
            The slug is locked. Changing it breaks channel routing and any
            link you have already sent.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · start from a layout ───────────────────────────────── */

/**
 * `landing-editor.tsx`'s Layouts section — "A whole page, pre-arranged.
 * Preview one first — applying replaces …" — over the five in
 * `landing-layouts.ts`, named as that file names them.
 */
const LAYOUTS: [string, string[]][] = [
  ["The practitioner", ["Hero", "Portrait", "Steps", "Quote", "Call to action"]],
  ["One screen", ["Hero", "Call to action"]],
  ["The product", ["Hero", "Features", "Section", "Call to action"]],
  ["The long read", ["Hero", "Section", "Section", "Quote", "Call to action"]],
  ["The profile", ["Portrait", "Section", "Socials", "Call to action"]],
];

export const SceneLandingLayouts: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 12);
  const pick = useEnterAt(t(74), 12);
  const note = useEnterAt(t(94), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ opacity: head }}>
            <Text size={19} weight={600}>
              Landing page
            </Text>
            <Text size={16} muted style={{ marginTop: 4, lineHeight: 1.5 }}>
              A whole page, pre-arranged. Preview one first — applying replaces
              what is there.
            </Text>
          </div>

          <div style={{ marginTop: 18 }}>
            {LAYOUTS.map(([name, blocks], i) => {
              const enter = Math.max(0, Math.min(1, (frame - t(14 + i * 10)) / t(10)));
              const on = name === "The product" ? pick : 0;
              return (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    border: `1px solid ${on ? c.amber : c.border}`,
                    background: `rgba(245,158,11,${0.07 * on})`,
                    borderRadius: radius,
                    padding: "13px 17px",
                    marginTop: i === 0 ? 0 : 9,
                    opacity: enter,
                  }}
                >
                  <Text size={17} weight={600} style={{ width: 230, flex: "0 0 auto" }}>
                    {name}
                  </Text>
                  <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {blocks.map((b) => (
                      <span
                        key={b}
                        style={{
                          border: `1px solid ${c.border}`,
                          borderRadius: 999,
                          padding: "4px 12px",
                          fontFamily: sans,
                          fontSize: 14,
                          color: c.mutedFg,
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <span
                    style={{
                      border: `1px solid ${c.border}`,
                      borderRadius: 8,
                      padding: "7px 15px",
                      fontFamily: sans,
                      fontSize: 15,
                      flex: "0 0 auto",
                    }}
                  >
                    Preview
                  </span>
                </div>
              );
            })}
          </div>

          <Text size={16} muted style={{ marginTop: 16, lineHeight: 1.5, opacity: note }}>
            Each layout is a stack of blocks. You can edit them afterwards.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · or build it block by block ────────────────────────── */

/** `BLOCK_META` — eight kinds, labels and blurbs quoted from that record. */
const BLOCKS: [string, string][] = [
  ["Hero", "Headline, a sentence, a photo"],
  ["Portrait", "A person: round photo, name, bio"],
  ["Section", "Heading and prose, optional image"],
  ["Steps", "A numbered sequence"],
  ["Features", "A short grid of reasons"],
  ["Quote", "A pull quote with attribution"],
  ["Socials", "Icon links to your profiles"],
  ["Call to action", "A closing line and a button"],
];

export const SceneLandingBlocks: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 12);
  const note = useEnterAt(t(88), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <Text size={19} weight={600} style={{ opacity: head }}>
            Add a block
          </Text>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 13,
              marginTop: 18,
            }}
          >
            {BLOCKS.map(([label, blurb], i) => {
              const enter = Math.max(0, Math.min(1, (frame - t(12 + i * 7)) / t(9)));
              return (
                <div
                  key={label}
                  style={{
                    border: `1px solid ${c.border}`,
                    borderRadius: radius,
                    padding: "14px 16px",
                    opacity: enter,
                    transform: `translateY(${(1 - enter) * 7}px)`,
                  }}
                >
                  <Text size={17} weight={600}>
                    {label}
                  </Text>
                  <Text size={14} muted style={{ marginTop: 4, lineHeight: 1.45 }}>
                    {blurb}
                  </Text>
                </div>
              );
            })}
          </div>

          <Text size={16} muted style={{ marginTop: 18, lineHeight: 1.5, opacity: note }}>
            Any order, up to 32. Every button points at the buy link or the
            chat.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 5 · publish it ────────────────────────────────────────── */

/**
 * The landing editor's own link card — the same card as Monetize's share card,
 * per the comment above it — with the Live / Off switch.
 *
 * Its subtitle is the thing to carry: unpublished, the link "returns 'not
 * found' until you publish", and publishing "also saves what you have written".
 */
export const SceneLandingPublish: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 12);
  const url = useEnterAt(t(20), 12);
  const live = useEnterAt(t(58), 14);
  const isLive = frame >= t(58);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1280} hot at={0} style={{ padding: "26px 30px 28px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, opacity: head }}>
            <div style={{ flex: 1 }}>
              <Text size={18} weight={500}>
                Your landing link
              </Text>
              <Text size={16} muted style={{ marginTop: 5, lineHeight: 1.5 }}>
                {isLive
                  ? "Anyone with this link can see the page. Saving publishes your edits immediately."
                  : "This link returns “not found” until you publish. Publishing also saves what you have written."}
              </Text>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 11, flex: "0 0 auto" }}>
              <Text size={15} weight={500} style={{ color: isLive ? c.foreground : c.mutedFg }}>
                {isLive ? "Live" : "Off"}
              </Text>
              <div
                style={{
                  width: 38,
                  height: 21,
                  borderRadius: 999,
                  background: isLive ? c.amber : "rgba(12,10,9,0.16)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 2.5,
                    left: isLive ? 19.5 : 2.5,
                    width: 16,
                    height: 16,
                    borderRadius: 999,
                    background: "#fff",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              border: `1px solid ${c.amber}4d`,
              background: `${c.amber}0d`,
              borderRadius: 8,
              padding: "10px 14px",
              marginTop: 18,
              opacity: url,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: isLive ? GREEN : c.mutedFg,
                flex: "0 0 auto",
                opacity: Math.max(url, live),
              }}
            />
            <span style={{ fontFamily: mono, fontSize: 17 }}>
              surogate.ai/a/interview-coach
            </span>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── what publishing actually put up ────────────────────────────── */

/**
 * The landing page as `landing-render.tsx` draws it, in the chosen theme.
 *
 * The blocks are The product's — hero, features, section, call to action —
 * because that is the layout applied two shots earlier, and the video would be
 * asking a viewer to imagine the result otherwise. Type scale follows that
 * file: a serif hero and section heading, semibold feature titles over muted
 * bodies, and a pill button.
 */
export const SceneLandingRendered: React.FC = () => {
  const t = useTimeScale(8);
  const hero = useEnterAt(t(3), 14);
  const cta = useEnterAt(t(26), 12);
  const features = [useEnterAt(t(50), 12), useEnterAt(t(62), 12), useEnterAt(t(74), 12)];
  const band = useEnterAt(t(102), 14);

  const page = "#150f1c";
  const surface = "#1e1628";
  const accent = "#e8b64c";
  const ink = "#f3ecf7";
  const muted = "rgba(243,236,247,0.62)";

  return (
    <Stage glow={{ x: 0.5, y: 0.4 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 1180,
            background: page,
            borderRadius: 20,
            padding: "40px 52px 44px",
            boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
          }}
        >
          {/* hero */}
          <div style={{ opacity: hero }}>
            <div
              style={{
                fontFamily: serif,
                fontSize: 46,
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: ink,
              }}
            >
              Walk into the interview ready
            </div>
            <div
              style={{
                fontFamily: sans,
                fontSize: 18,
                lineHeight: 1.6,
                color: muted,
                marginTop: 14,
                maxWidth: 760,
              }}
            >
              Practise the questions you will actually be asked, out loud, and
              hear what to change before it counts.
            </div>
            <div
              style={{
                display: "inline-block",
                background: ink,
                color: page,
                borderRadius: 999,
                padding: "11px 26px",
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 500,
                marginTop: 20,
                opacity: cta,
              }}
            >
              See pricing
            </div>
          </div>

          {/* features */}
          <div style={{ display: "flex", gap: 22, marginTop: 36 }}>
            {[
              ["The questions you'll get", "It reads the job ad and asks what that role is actually asked."],
              ["Out loud, not on paper", "Speak the answer. Rambling only shows up when you hear it."],
              ["One thing at a time", "You get what worked and the single habit to drop next."],
            ].map(([title, body], i) => (
              <div key={title} style={{ flex: 1, opacity: features[i] }}>
                <div style={{ fontFamily: sans, fontSize: 18, fontWeight: 600, color: ink }}>
                  {title}
                </div>
                <div style={{ fontFamily: sans, fontSize: 16, lineHeight: 1.6, color: muted, marginTop: 8 }}>
                  {body}
                </div>
              </div>
            ))}
          </div>

          {/* section */}
          <div
            style={{
              display: "flex",
              gap: 34,
              alignItems: "center",
              background: surface,
              borderRadius: 14,
              padding: "26px 30px",
              marginTop: 32,
              opacity: band,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 600, color: ink }}>
                Built from a decade of hiring
              </div>
              <div style={{ fontFamily: sans, fontSize: 16, lineHeight: 1.62, color: muted, marginTop: 10 }}>
                Every question, follow-up and bit of feedback comes from how real
                interviews are run — not from a list of tips.
              </div>
            </div>
            <div style={{ height: 2, background: accent, width: 56, borderRadius: 2, flex: "0 0 auto" }} />
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 6 · the buy link ──────────────────────────────────────────── */

/**
 * The share card. Copy is the primary action, because as the file puts it,
 * "this link IS how builders" get paid — and the pretty slug form is used
 * whenever the agent has one, with the UUID route as a fallback that serves the
 * same page.
 */
export const SceneBuyLinkShare: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 12);
  const url = useEnterAt(t(22), 12);
  const copied = useEnterAt(t(62), 12);
  const isCopied = frame >= t(62);
  const fallback = useEnterAt(t(84), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1280} hot at={0} style={{ padding: "26px 30px 28px" }}>
          <div style={{ opacity: head }}>
            <Text size={18} weight={500}>
              Your buy link
            </Text>
            <Text size={16} muted style={{ marginTop: 5, lineHeight: 1.5 }}>
              Send this to customers — it&apos;s where they purchase access and
              chat with the agent.
            </Text>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, opacity: url }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 11,
                border: `1px solid ${c.amber}4d`,
                background: `${c.amber}0d`,
                borderRadius: 8,
                padding: "10px 14px",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 999, background: GREEN, flex: "0 0 auto" }} />
              <span style={{ fontFamily: mono, fontSize: 17 }}>
                surogate.ai/buy/interview-coach
              </span>
            </div>
            <span
              style={{
                background: isCopied ? "transparent" : c.amber,
                border: isCopied ? `1px solid ${c.border}` : "none",
                color: isCopied ? c.foreground : "#000",
                borderRadius: 8,
                padding: "10px 20px",
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 600,
                opacity: Math.max(url, copied),
              }}
            >
              {isCopied ? "Copied" : "Copy link"}
            </span>
          </div>

          <Text size={15} muted style={{ marginTop: 16, lineHeight: 1.55, opacity: fallback }}>
            Without a slug the link is{" "}
            <span style={{ fontFamily: mono }}>/buy/&lt;project&gt;/&lt;agent&gt;</span>.
            Both open the same page.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · how it looks ──────────────────────────────────────── */

/**
 * `theme-picker.tsx`, titled "Storefront look", over the six themes in
 * `buy-page-themes.ts`. Labels, blurbs and swatch colours are that file's.
 */
const THEMES: [string, string, string, string, string][] = [
  ["Light", "Clean, bright, minimal.", "#fdfcfa", "#ffffff", "#ffaf10"],
  ["Dark", "Quiet charcoal. Easy on the eyes.", "#17181a", "#202225", "#ffaf10"],
  ["Midnight", "Plum night, gold star dust.", "#150f1c", "#1e1628", "#e8b64c"],
  ["Ultraviolet", "Neon magenta on violet.", "#160a24", "#200e33", "#ff3ea5"],
  ["Midas", "Pure black, drenched in gold.", "#000000", "#0d0b06", "#e0a92a"],
  ["Surogate", "The house look — cream, plum ink, and the hat.", "#f7f2e8", "#fffdf7", "#f59e0b"],
];

export const SceneBuyLinkTheme: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 10);
  const pick = useEnterAt(t(80), 12);
  const note = useEnterAt(t(96), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1520} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <Text size={17} weight={500} style={{ opacity: head }}>
            Storefront look
          </Text>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
              marginTop: 16,
            }}
          >
            {THEMES.map(([label, blurb, page, card, accent], i) => {
              const enter = Math.max(0, Math.min(1, (frame - t(12 + i * 8)) / t(9)));
              const on = label === "Midnight" ? pick : 0;
              return (
                <div
                  key={label}
                  style={{
                    border: `1px solid ${on ? c.amber : c.border}`,
                    boxShadow: on ? `0 0 0 1px ${c.amber}` : "none",
                    borderRadius: radius,
                    overflow: "hidden",
                    opacity: enter,
                  }}
                >
                  {/* the swatch each theme carries for its own preview */}
                  <div
                    style={{
                      background: page,
                      padding: "16px 16px 20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 7,
                    }}
                  >
                    <div
                      style={{
                        background: card,
                        borderRadius: 6,
                        height: 26,
                        width: "72%",
                      }}
                    />
                    <div style={{ background: accent, borderRadius: 5, height: 12, width: "42%" }} />
                    <div style={{ background: card, borderRadius: 5, height: 9, width: "88%" }} />
                  </div>
                  <div style={{ padding: "11px 15px 14px" }}>
                    <Text size={17} weight={600}>
                      {label}
                    </Text>
                    <Text size={14} muted style={{ marginTop: 2, lineHeight: 1.45 }}>
                      {blurb}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>

          <Text size={16} muted style={{ marginTop: 16, lineHeight: 1.5, opacity: note }}>
            The theme is stored on the agent and used by both public pages.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · what the link opens ───────────────────────────────── */

/** The buy page in the chosen theme, so the picker's effect is not abstract. */
export const SceneBuyLinkPage: React.FC = () => {
  const t = useTimeScale(6);
  const frame = useCurrentFrame();
  const head = useEnterAt(t(3), 12);
  const card = useEnterAt(t(34), 12);
  const cta = useEnterAt(t(62), 12);
  const note = useEnterAt(t(90), 14);

  const page = "#150f1c";
  const surface = "#1e1628";
  const accent = "#e8b64c";
  const ink = "#f3ecf7";
  const muted = "rgba(243,236,247,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.4 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 1060,
            background: page,
            borderRadius: 20,
            padding: "34px 38px 38px",
            boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
            opacity: Math.min(1, head + 0.001 * frame),
          }}
        >
          <div style={{ opacity: head }}>
            <div style={{ fontFamily: serif, fontSize: 30, fontWeight: 600, color: ink }}>
              Interview Coach
            </div>
            <div style={{ fontFamily: sans, fontSize: 16, color: muted, marginTop: 8, lineHeight: 1.55 }}>
              Practise real interview questions out loud, and hear exactly
              what to fix before the day.
            </div>
          </div>

          <div
            style={{
              background: surface,
              borderRadius: 14,
              padding: "20px 22px",
              marginTop: 24,
              opacity: card,
            }}
          >
            <div style={{ fontFamily: sans, fontSize: 19, fontWeight: 600, color: ink }}>
              Daily practice
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginTop: 7 }}>
              <span style={{ fontFamily: sans, fontSize: 34, fontWeight: 700, color: ink }}>
                €19
              </span>
              <span style={{ fontFamily: sans, fontSize: 18, color: muted }}>/ month</span>
            </div>
            <div style={{ fontFamily: sans, fontSize: 16, color: muted, marginTop: 9 }}>
              ~1,000 messages every period
            </div>
            <div
              style={{
                background: accent,
                color: "#150f1c",
                borderRadius: 9,
                padding: "12px 0",
                marginTop: 16,
                textAlign: "center",
                fontFamily: sans,
                fontSize: 17,
                fontWeight: 600,
                opacity: cta,
              }}
            >
              Subscribe
            </div>
          </div>
        </div>

        <Text
          size={18}
          style={{
            marginTop: 26,
            textAlign: "center",
            maxWidth: 1200,
            lineHeight: 1.5,
            color: c.card,
            opacity: note,
          }}
        >
          Served at that address. Nothing to host.
        </Text>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 4 · or put it on your own site ────────────────────────── */

/**
 * `buyer-embed-panel.tsx` — "Embed on your website", with the origin allowlist
 * that decides who may load the widget.
 *
 * The blurb is the panel's own: visitors' chats come out of the purchased
 * usage, which is what makes an embed different from just linking out.
 */
export const SceneBuyLinkEmbed: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 12);
  const origin = useEnterAt(t(26), 12);
  const rule = useEnterAt(t(48), 12);
  const snippet = useEnterAt(t(72), 12);
  const note = useEnterAt(t(96), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1240} hot at={0} style={{ padding: "26px 30px 28px" }}>
          <div style={{ opacity: head }}>
            <Text size={18} weight={500}>
              Embed on your website
            </Text>
            <Text size={16} muted style={{ marginTop: 5, lineHeight: 1.55 }}>
              Put this agent on your own site so visitors&apos; chats come out of
              your purchased usage.
            </Text>
          </div>

          <div style={{ marginTop: 20, opacity: origin }}>
            <Text size={15} muted style={{ marginBottom: 7 }}>
              Your website address
            </Text>
            <div
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 8,
                background: "rgba(12,10,9,0.04)",
                padding: "11px 15px",
                fontFamily: mono,
                fontSize: 16,
              }}
            >
              https://martailie.example
            </div>
            <Text size={14} muted style={{ marginTop: 7, lineHeight: 1.5, opacity: rule }}>
              Separate multiple sites with commas. Only these sites may load your
              widget.
            </Text>
          </div>

          <div
            style={{
              border: `1px solid ${c.border}`,
              background: "rgba(12,10,9,0.03)",
              borderRadius: 10,
              padding: "14px 17px",
              marginTop: 18,
              opacity: snippet,
            }}
          >
            <div style={{ fontFamily: mono, fontSize: 15, lineHeight: 1.7, whiteSpace: "pre" }}>
              {'<script src="https://surogate.ai/embed.js"\n        data-agent="interview-coach"\n        data-token="pk_live_••••••••"></script>'}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14, opacity: snippet }}>
            <span
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 8,
                padding: "9px 20px",
                fontFamily: sans,
                fontSize: 16,
              }}
            >
              Copy
            </span>
          </div>

          <Text size={16} muted style={{ marginTop: 16, lineHeight: 1.55, opacity: note }}>
            The snippet only loads on the domains listed above.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const Box: React.FC<{ value: string; locked?: boolean }> = ({ value, locked }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      border: `1px solid ${c.border}`,
      borderRadius: 8,
      background: "rgba(12,10,9,0.04)",
      padding: "11px 15px",
      opacity: locked ? 0.65 : 1,
    }}
  >
    <span style={{ flex: 1, fontFamily: sans, fontSize: 17 }}>{value}</span>
  </div>
);

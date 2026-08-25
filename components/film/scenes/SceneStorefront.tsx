import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Stage } from "../ui/Stage";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { radius } from "../ui/tokens";
import { mono, sans, serif } from "../font";

/**
 * The storefront.
 *
 * What the buy link opens: the agent's own landing page, built from the same
 * blocks the editor offers — hero, features, steps, a pricing band — rendered
 * in the Midnight theme, whose values are the ones in buy-page-themes.ts.
 *
 * The whole scene sits in the theme rather than on the film's stage, because
 * the point of the beat is that this page belongs to the seller, not to us.
 */

const M = {
  page: "#120714",
  card: "#1e0f22",
  surface: "#2a102d",
  ink: "#f7f2ee",
  muted: "#b7a8b4",
  gold: "#ffaf10",
  onGold: "#1a0a1c",
  line: "rgba(255,255,255,0.12)",
};

const FEATURES = [
  ["Launch copy that sounds like you", "Trained on your own posts, not a generic voice."],
  ["Answers from your material", "Every claim cited from your docs and pricing pages."],
  ["Scheduled and approved", "Nothing publishes until a human says so."],
] as const;

const PLANS = [
  { name: "Starter", price: "$29", per: "/ month", d: "200 chats included", on: false },
  { name: "Studio", price: "$99", per: "/ month", d: "Unlimited chats, priority model", on: true },
] as const;

const AUTHORED = 8;

export const SceneStorefront: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);

  const scroll = interpolate(frame, [t(46), t(190)], [0, -420], {
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
          <div
            style={{
              width: 1280,
              height: 640,
              borderRadius: 20,
              overflow: "hidden",
              background: M.page,
              border: `1px solid ${M.line}`,
              boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
              position: "relative",
            }}
          >
            {/* The theme's star dust, as a wash rather than a texture. */}
            <AbsoluteFill
              style={{
                background:
                  "radial-gradient(60% 45% at 50% 0%, rgba(255,175,16,0.13) 0%, rgba(18,7,20,0) 70%)",
              }}
            />

            <div style={{ transform: `translateY(${scroll}px)`, padding: "44px 64px" }}>
              {/* Hero. */}
              <Enter at={t(4)}>
                <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: serif,
                        fontSize: 46,
                        fontWeight: 600,
                        lineHeight: 1.08,
                        letterSpacing: "-0.02em",
                        color: M.ink,
                      }}
                    >
                      Northwind Marketing
                    </div>
                    <div
                      style={{
                        fontFamily: sans,
                        fontSize: 19,
                        lineHeight: 1.6,
                        color: M.muted,
                        marginTop: 16,
                        maxWidth: "52ch",
                      }}
                    >
                      Launch copy, a content calendar that stays honest, and answers about
                      every campaign in flight — available whenever you are.
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
                      <Gold>Start chatting</Gold>
                      <Ghost>See pricing</Ghost>
                    </div>
                  </div>
                  <div
                    style={{
                      width: 300,
                      height: 225,
                      borderRadius: 14,
                      background: M.surface,
                      border: `1px solid ${M.line}`,
                      flexShrink: 0,
                    }}
                  />
                </div>
              </Enter>

              {/* Features. */}
              <Enter at={t(14)}>
                <div style={{ display: "flex", gap: 18, marginTop: 52 }}>
                  {FEATURES.map(([title, body]) => (
                    <div
                      key={title}
                      style={{
                        flex: 1,
                        border: `1px solid ${M.line}`,
                        borderRadius: 12,
                        padding: 22,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: sans,
                          fontSize: 18,
                          fontWeight: 600,
                          color: M.ink,
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          fontFamily: sans,
                          fontSize: 16,
                          lineHeight: 1.55,
                          color: M.muted,
                          marginTop: 8,
                        }}
                      >
                        {body}
                      </div>
                    </div>
                  ))}
                </div>
              </Enter>

              {/* The band the whole page exists for. */}
              <Enter at={t(24)}>
                <div style={{ marginTop: 54, textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: serif,
                      fontSize: 32,
                      fontWeight: 600,
                      letterSpacing: "-0.015em",
                      color: M.ink,
                    }}
                  >
                    Pick a plan
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 18,
                      marginTop: 26,
                      justifyContent: "center",
                    }}
                  >
                    {PLANS.map((plan) => (
                      <div
                        key={plan.name}
                        style={{
                          width: 320,
                          textAlign: "left",
                          background: M.card,
                          border: `1px solid ${plan.on ? M.gold : M.line}`,
                          borderRadius: 14,
                          padding: "24px 26px 26px",
                          boxShadow: plan.on ? "0 0 40px rgba(255,175,16,0.18)" : undefined,
                        }}
                      >
                        <div style={{ fontFamily: sans, fontSize: 17, color: M.muted }}>
                          {plan.name}
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 10 }}>
                          <span
                            style={{
                              fontFamily: sans,
                              fontSize: 40,
                              fontWeight: 600,
                              letterSpacing: "-0.02em",
                              color: M.ink,
                            }}
                          >
                            {plan.price}
                          </span>
                          <span style={{ fontFamily: mono, fontSize: 16, color: M.muted }}>
                            {plan.per}
                          </span>
                        </div>
                        <div
                          style={{
                            fontFamily: sans,
                            fontSize: 16,
                            color: M.muted,
                            marginTop: 10,
                          }}
                        >
                          {plan.d}
                        </div>
                        <div style={{ marginTop: 20 }}>
                          {plan.on ? <Gold wide>Subscribe</Gold> : <Ghost wide>Choose</Ghost>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Enter>
            </div>
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Enter: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const s = useSpringAt(at);
  return (
    <div style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [16, 0])}px)` }}>
      {children}
    </div>
  );
};

const Gold: React.FC<{ children: React.ReactNode; wide?: boolean }> = ({ children, wide }) => (
  <span
    style={{
      display: wide ? "block" : "inline-flex",
      textAlign: "center",
      fontFamily: sans,
      fontSize: 17,
      fontWeight: 600,
      color: M.onGold,
      background: M.gold,
      borderRadius: radius,
      padding: "13px 24px",
    }}
  >
    {children}
  </span>
);

const Ghost: React.FC<{ children: React.ReactNode; wide?: boolean }> = ({ children, wide }) => (
  <span
    style={{
      display: wide ? "block" : "inline-flex",
      textAlign: "center",
      fontFamily: sans,
      fontSize: 17,
      fontWeight: 500,
      color: M.ink,
      border: `1px solid ${M.line}`,
      borderRadius: radius,
      padding: "13px 24px",
    }}
  >
    {children}
  </span>
);

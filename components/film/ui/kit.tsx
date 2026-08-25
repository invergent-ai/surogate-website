import React from "react";
import { c, radius } from "./tokens";
import { headingLetterSpacing, mono, sans, serif } from "../font";

/**
 * Mock versions of the ops UI primitives.
 *
 * These are deliberately dumb — no state, no variants beyond what the film
 * needs. Every one is styled from tokens.ts so the mock tracks the product
 * rather than drifting into "a designer's idea of the product".
 */

export const Heading: React.FC<{
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 22, style }) => (
  <div
    style={{
      fontFamily: serif,
      fontWeight: 600,
      fontSize: size,
      letterSpacing: headingLetterSpacing,
      color: c.foreground,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Text: React.FC<{
  children: React.ReactNode;
  size?: number;
  muted?: boolean;
  weight?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 13, muted, weight = 400, style }) => (
  <div
    style={{
      fontFamily: sans,
      fontSize: size,
      fontWeight: weight,
      color: muted ? c.mutedFg : c.foreground,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Mono: React.FC<{
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 12, style }) => (
  <span style={{ fontFamily: mono, fontSize: size, ...style }}>{children}</span>
);

export const Button: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  style?: React.CSSProperties;
}> = ({ children, variant = "primary", style }) => {
  const base: React.CSSProperties = {
    fontFamily: sans,
    fontSize: 13,
    fontWeight: 500,
    padding: "9px 16px",
    borderRadius: radius,
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    whiteSpace: "nowrap",
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: c.amber, color: "#3b2a06", border: "1px solid transparent" },
    outline: { background: c.card, color: c.foreground, border: `1px solid ${c.border}` },
    ghost: { background: "transparent", color: c.mutedFg, border: "1px solid transparent" },
  };
  return <div style={{ ...base, ...variants[variant], ...style }}>{children}</div>;
};

export const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  /** Dashed amber outline, as on the "Create agent" tile. */
  dashed?: boolean;
}> = ({ children, style, dashed }) => (
  <div
    style={{
      background: dashed ? "#fffdf7" : c.card,
      border: dashed ? `1px dashed ${c.amber}` : `1px solid ${c.border}`,
      borderRadius: radius + 4,
      padding: 18,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Pill: React.FC<{
  children: React.ReactNode;
  tone?: "neutral" | "success" | "amber";
  active?: boolean;
  style?: React.CSSProperties;
}> = ({ children, tone = "neutral", active, style }) => {
  const tones: Record<string, React.CSSProperties> = {
    neutral: {
      background: active ? c.foreground : c.secondary,
      color: active ? c.primaryFg : c.mutedFg,
    },
    success: { background: c.green50, color: c.green700 },
    amber: { background: c.amber50, color: c.amber600 },
  };
  return (
    <div
      style={{
        fontFamily: sans,
        fontSize: 11,
        fontWeight: 500,
        padding: "4px 10px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        ...tones[tone],
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Dot: React.FC<{ color?: string }> = ({ color = c.success }) => (
  <div style={{ width: 6, height: 6, borderRadius: 999, background: color }} />
);

export const Field: React.FC<{
  label: string;
  hint?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ label, hint, children, style }) => (
  <div style={{ ...style }}>
    <Text size={12} weight={500} style={{ marginBottom: 7 }}>
      {label}
    </Text>
    {children}
    {hint ? (
      <Text size={11} muted style={{ marginTop: 6 }}>
        {hint}
      </Text>
    ) : null}
  </div>
);

export const Input: React.FC<{
  children?: React.ReactNode;
  placeholder?: string;
  focused?: boolean;
  multiline?: boolean;
  style?: React.CSSProperties;
}> = ({ children, placeholder, focused, multiline, style }) => (
  <div
    style={{
      background: c.secondary,
      border: `1px solid ${focused ? c.amber : c.border}`,
      borderRadius: radius,
      padding: multiline ? "11px 13px" : "10px 13px",
      minHeight: multiline ? 64 : 38,
      fontFamily: sans,
      fontSize: 13,
      color: children ? c.foreground : c.mutedFg,
      lineHeight: 1.5,
      ...style,
    }}
  >
    {children ?? placeholder}
  </div>
);

export const Tabs: React.FC<{ items: string[]; active: string }> = ({
  items,
  active,
}) => (
  <div style={{ display: "flex", gap: 22, borderBottom: `1px solid ${c.border}` }}>
    {items.map((t) => {
      const on = t === active;
      return (
        <div
          key={t}
          style={{
            fontFamily: sans,
            fontSize: 13,
            fontWeight: on ? 600 : 400,
            color: on ? c.foreground : c.mutedFg,
            paddingBottom: 9,
            borderBottom: `2px solid ${on ? c.amber : "transparent"}`,
          }}
        >
          {t}
        </div>
      );
    })}
  </div>
);

export const Toggle: React.FC<{ on: boolean }> = ({ on }) => (
  <div
    style={{
      width: 34,
      height: 20,
      borderRadius: 999,
      background: on ? c.amber : "#d9d4d2",
      padding: 2,
      display: "flex",
      justifyContent: on ? "flex-end" : "flex-start",
    }}
  >
    <div
      style={{ width: 16, height: 16, borderRadius: 999, background: "#fff" }}
    />
  </div>
);

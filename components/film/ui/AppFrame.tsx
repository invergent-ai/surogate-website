import React from "react";
import { AbsoluteFill } from "remotion";
import { c, DESIGN_H, DESIGN_W, layout, radius, SCALE } from "./tokens";
import { sans, serif } from "../font";
import { Dot, Heading, Text } from "./kit";

/**
 * The chrome every ops screen sits in: sidebar, header, content well.
 *
 * Scenes render *inside* this, so the sidebar never jumps between shots — the
 * film should feel like one continuous session in one app, which is the whole
 * illusion. Only `nav` and the header change.
 */

export type NavItem = { label: string; active?: boolean; badge?: string };

const WORK_NAV: NavItem[] = [
  { label: "Agents" },
  { label: "Sessions" },
  { label: "Getting started", badge: "1/8" },
];

const WORK_LIBRARY: NavItem[] = [
  { label: "Skills & Tools" },
  { label: "Knowledge Bases" },
  { label: "Sub-agents" },
];

const DEV_NAV: NavItem[] = [{ label: "Dashboard" }, { label: "Sessions" }];
const DEV_LIBRARY: NavItem[] = [
  { label: "Models" },
  { label: "Playground" },
  { label: "Data Hub" },
];
const DEV_TRAIN: NavItem[] = [
  { label: "Datasets" },
  { label: "Training" },
  { label: "Evaluations" },
];

export const AppFrame: React.FC<{
  mode?: "work" | "dev";
  /** Nav label to highlight. */
  active?: string;
  title: string;
  subtitle?: string;
  /** Right-hand side of the header. */
  headerRight?: React.ReactNode;
  /** Agent sub-navigation, when a shot is inside an agent. */
  agentNav?: { name: string; active: string };
  /** Rendered last, inside the scaled canvas, in design coordinates. */
  cursor?: React.ReactNode;
  children: React.ReactNode;
}> = ({ mode = "work", active, title, subtitle, headerRight, agentNav, cursor, children }) => {
  const isDev = mode === "dev";

  return (
    <AbsoluteFill style={{ background: c.background }}>
      {/* Author at 1440x810, present at 1920x1080. */}
      <div
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${SCALE})`,
          transformOrigin: "top left",
          display: "flex",
          fontFamily: sans,
          position: "relative",
        }}
      >
        <Sidebar mode={mode} active={active} agentNav={agentNav} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div
            style={{
              height: layout.headerHeight,
              borderBottom: `1px solid ${c.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: `0 ${layout.contentPadX}px`,
              flexShrink: 0,
            }}
          >
            <div>
              <Heading size={19}>{title}</Heading>
              {subtitle ? (
                <Text size={12} muted style={{ marginTop: 3 }}>
                  {subtitle}
                </Text>
              ) : null}
            </div>
            {headerRight}
          </div>

          <div
            style={{
              flex: 1,
              padding: `22px ${layout.contentPadX}px`,
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            {children}
          </div>
        </div>

        {cursor}
      </div>
    </AbsoluteFill>
  );
};

const Sidebar: React.FC<{
  mode: "work" | "dev";
  active?: string;
  agentNav?: { name: string; active: string };
}> = ({ mode, active, agentNav }) => {
  const isDev = mode === "dev";
  return (
    <div
      style={{
        width: layout.sidebarWidth,
        background: c.sidebar,
        borderRight: `1px solid ${c.sidebarBorder}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Brand */}
      <div
        style={{
          height: layout.headerHeight,
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "0 14px",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: c.amber,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
          }}
        >
          ★
        </div>
        <div>
          <div style={{ fontFamily: serif, fontSize: 13, fontWeight: 600 }}>
            Surogate
          </div>
          <div style={{ fontSize: 9.5, color: c.mutedFg }}>
            {isDev ? "Intelligence Factory" : "Agent Factory"}
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
          <ModePill label="Work" on={!isDev} />
          <span style={{ fontSize: 10, color: c.mutedFg }}>/</span>
          <ModePill label="Dev" on={isDev} />
        </div>
      </div>

      <div style={{ padding: "6px 10px", flex: 1, overflow: "hidden" }}>
        {isDev ? (
          <>
            <NavGroup label="Overview" items={DEV_NAV} active={active} />
            <NavGroup label="Library" items={DEV_LIBRARY} active={active} />
            <NavGroup label="Train" items={DEV_TRAIN} active={active} />
            <NavRow item={{ label: "Compute" }} active={active} />
          </>
        ) : (
          <>
            <NavRow item={{ label: "Agents" }} active={active} />
            {agentNav ? <AgentSubNav {...agentNav} /> : null}
            <NavRow item={{ label: "Sessions" }} active={active} />
            <NavRow item={{ label: "Getting started", badge: "1/8" }} active={active} />
            <NavGroup label="Library" items={WORK_LIBRARY} active={active} />
          </>
        )}
      </div>

      <div
        style={{
          padding: "10px 14px",
          borderTop: `1px solid ${c.sidebarBorder}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 999,
            background: c.secondary,
            fontSize: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: c.mutedFg,
          }}
        >
          FB
        </div>
        <Text size={12}>Flavius Burca</Text>
      </div>
    </div>
  );
};

const ModePill: React.FC<{ label: string; on: boolean }> = ({ label, on }) => (
  <div
    style={{
      fontSize: 10,
      fontWeight: 600,
      padding: "3px 8px",
      borderRadius: 999,
      background: on ? c.amber : "transparent",
      color: on ? "#3b2a06" : c.mutedFg,
    }}
  >
    {label}
  </div>
);

const NavGroup: React.FC<{
  label: string;
  items: NavItem[];
  active?: string;
}> = ({ label, items, active }) => (
  <div style={{ marginTop: 12 }}>
    <div
      style={{
        fontSize: 10,
        color: c.mutedFg,
        padding: "6px 10px 4px",
        letterSpacing: 0.2,
      }}
    >
      {label}
    </div>
    {items.map((i) => (
      <NavRow key={i.label} item={i} active={active} />
    ))}
  </div>
);

const NavRow: React.FC<{ item: NavItem; active?: string }> = ({ item, active }) => {
  const on = item.label === active;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "7px 10px",
        borderRadius: 8,
        background: on ? c.secondary : "transparent",
        marginBottom: 1,
      }}
    >
      <div
        style={{
          width: 13,
          height: 13,
          borderRadius: 3,
          border: `1.4px solid ${on ? c.foreground : c.mutedFg}`,
          opacity: on ? 0.9 : 0.55,
        }}
      />
      <div
        style={{
          fontSize: 12.5,
          fontWeight: on ? 600 : 400,
          color: on ? c.foreground : c.mutedFg,
        }}
      >
        {item.label}
      </div>
      {item.badge ? (
        <div style={{ marginLeft: "auto", fontSize: 10, color: c.amber }}>
          {item.badge}
        </div>
      ) : null}
    </div>
  );
};

const AgentSubNav: React.FC<{ name: string; active: string }> = ({
  name,
  active,
}) => (
  <div style={{ margin: "2px 0 6px 10px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px" }}>
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 6,
          background: c.secondary,
          fontSize: 9,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: c.mutedFg,
        }}
      >
        {name[0]}
      </div>
      <div style={{ fontSize: 12, fontWeight: 600 }}>{name}</div>
      <div style={{ marginLeft: "auto" }}>
        <Dot />
      </div>
    </div>
    {["Overview", "Configure", "Publish", "New chat", "Inbox", "Sessions"].map(
      (l) => {
        const on = l === active;
        return (
          <div
            key={l}
            style={{
              fontSize: 12,
              padding: "5px 8px 5px 26px",
              borderRadius: 7,
              color: on ? c.foreground : c.mutedFg,
              fontWeight: on ? 600 : 400,
              background: on ? c.secondary : "transparent",
            }}
          >
            {l}
          </div>
        );
      },
    )}
  </div>
);

/**
 * Design tokens lifted verbatim from the ops frontend
 * (surogate-ops/frontend/src/index.css). These are not eyeballed from
 * screenshots — if the product changes them, change them here too.
 */
export const c = {
  background: "#ffffff",
  foreground: "#0c0a09",
  card: "#ffffff",
  primary: "#1d1816",
  primaryFg: "#fbfaf9",
  secondary: "#f3f1f1",
  muted: "#f3f1f1",
  mutedFg: "#7c6d67",
  border: "#e8e4e3",
  input: "#e8e4e3",
  ring: "#aba09c",
  sidebar: "#fbfaf9",
  sidebarBorder: "#e8e4e3",
  destructive: "#ef4444",
  success: "#22c55e",
  /** The product's action colour. Tailwind amber-500, used ~266 times. */
  amber: "#f59e0b",
  amber400: "#fbbf24",
  amber600: "#d97706",
  amber50: "#fffbeb",
  green50: "#f0fdf4",
  green700: "#15803d",
  /** End card / marketing ground. */
  ink: "#141412",
} as const;

/** --radius: 0.625rem */
export const radius = 10;

/**
 * The UI is authored at 1440×810 and scaled to the 1920×1080 frame.
 *
 * Building at native 1920 would be truer to a real browser, but the product's
 * 14px body text then renders at 14/1080 of frame height — unreadable when the
 * film plays in a 600px-wide hero on a landing page. 1.333× is the compromise:
 * the layout keeps its real proportions, the type gets legible.
 */
export const DESIGN_W = 1440;
export const DESIGN_H = 810;
export const SCALE = 1920 / DESIGN_W;

/** Layout metrics measured off the running app. */
export const layout = {
  sidebarWidth: 264,
  headerHeight: 64,
  contentPadX: 26,
} as const;

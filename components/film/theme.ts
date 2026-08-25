/**
 * Brand tokens, lifted from the product and the docs site so the film sits
 * next to them without a colour clash.
 */
export const theme = {
  // Navbar / end-card ground. Same value the marketing site uses.
  ink: "#141412",
  paper: "#ffffff",
  // The product's action colour — the orange on every primary button.
  accent: "#f5a624",
  // Muted foreground for secondary caption lines.
  muted: "rgba(255,255,255,0.62)",
  mutedOnLight: "rgba(20,20,18,0.55)",
} as const;

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Seconds → frames. Every duration in shots.ts is authored in seconds. */
export const sec = (s: number) => Math.round(s * FPS);
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

/**
 * The product's three faces, from surogate-ops/frontend/src/index.css:
 *
 *   --serif: Fraunces   — every h1-h6, letter-spacing -0.01em
 *   --sans:  Inter      — everything else
 *   --mono:  JetBrains Mono
 *
 * Weights are pinned to what the film actually uses. Left unconstrained,
 * loadFont fires >100 network requests per render and an offline render fails.
 */
export const { fontFamily: sans } = loadInter("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

export const { fontFamily: serif } = loadFraunces("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

export const { fontFamily: mono } = loadMono("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

/** Headings in the product carry this tracking. */
export const headingLetterSpacing = "-0.01em";

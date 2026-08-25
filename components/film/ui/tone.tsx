import React from "react";

/**
 * Whether the film is drawn on its own dark ground, or straight onto the page.
 *
 * A context rather than a prop because it reaches leaves — panels, captions —
 * that sit twenty scenes deep, and threading a flag through every one of them
 * would touch every scene for a value none of them care about.
 */
export type Tone = "dark" | "light";

export const ToneContext = React.createContext<Tone>("dark");

export const useTone = () => React.useContext(ToneContext);

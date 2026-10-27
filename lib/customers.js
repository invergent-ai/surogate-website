import { FILMS } from './films.js';

// Customers we may describe only by sector until each one approves its name (spec §8). What is
// public is the home page's line, "a top-5 Romanian bank, an insurer and a national regulator", and
// the energy company the spec lists. Nothing else about them is said on the site.
export const STORIES = [
  { key: 'bank', sector: 'Banking', who: 'A top-5 Romanian bank' },
  { key: 'insurer', sector: 'Insurance', who: 'An insurer' },
  { key: 'energy', sector: 'Energy', who: 'An energy company' },
  { key: 'regulator', sector: 'Public sector', who: 'A national regulator' },
];

export const story = (key) => {
  const s = STORIES.find((x) => x.key === key);
  if (!s) throw new Error(`No story ${key}`);
  return s;
};

// The film businesses are fictional: every film is shown as a demo.
export const DEMOS = FILMS.filter((f) => f.demo);

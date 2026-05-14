'use client';

import useReveal from './useReveal';

export default function RevealRoot({ children }) {
  useReveal();
  return children;
}

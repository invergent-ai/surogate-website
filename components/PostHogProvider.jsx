'use client';

import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { initPostHog } from '@/lib/analytics';

export function PostHogProvider({ children }) {
  return <PHProvider client={initPostHog()}>{children}</PHProvider>;
}

import PricingClient from './PricingClient';

export const metadata = {
  title: 'Pricing — Surogate',
  description:
    'Agents that get work done. One bill, no surprises. Free tier with 500K tokens, paid plans from $30/mo with tokens included. Bring your own LLM or train custom models on every paid plan.',
  alternates: {
    canonical: 'https://surogate.ai/pricing/',
  },
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/pricing/',
    title: 'Pricing — Surogate',
    description:
      'Agents that get work done. One bill, no surprises. Free tier with 500K tokens, paid plans from $30/mo with tokens included.',
    siteName: 'Surogate',
  },
};

export default function PricingPage() {
  return <PricingClient />;
}

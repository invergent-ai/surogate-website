import PricingClient from './PricingClient';

export const metadata = {
  title: 'Pricing — Surogate',
  description:
    'Run agents and build models on a single platform. Free tier with 500K tokens, paid plans from $19/mo. Tokens are optional — bring your own LLM if you prefer.',
  alternates: {
    canonical: 'https://surogate.ai/pricing/',
  },
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/pricing/',
    title: 'Pricing — Surogate',
    description:
      'Run agents and build models on a single platform. Free tier with 500K tokens, paid plans from $19/mo. Tokens optional, BYO LLM supported.',
    siteName: 'Surogate',
  },
};

export default function PricingPage() {
  return <PricingClient />;
}

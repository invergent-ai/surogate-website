import PricingClient from './PricingClient';

export const metadata = {
  title: 'Pricing — Surogate',
  description:
    'Run agents and build models on a single platform. Free tier with 500K tokens, paid plans from $29/mo. Bring your own cloud for fine-tuning and serving.',
  alternates: {
    canonical: 'https://surogate.ai/pricing/',
  },
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/pricing/',
    title: 'Pricing — Surogate',
    description:
      'Run agents and build models on a single platform. Free tier with 500K tokens, paid plans from $29/mo.',
    siteName: 'Surogate',
  },
};

export default function PricingPage() {
  return <PricingClient />;
}

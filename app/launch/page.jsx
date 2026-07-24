import LaunchClient from './LaunchClient';

export const metadata = {
  title: 'Early Access - Surogate',
  description: 'Limited early access spots for Surogate. Claim yours before the offer closes.',
  alternates: {
    canonical: 'https://surogate.ai/launch/',
  },
};

export default function LaunchPage() {
  return <LaunchClient />;
}

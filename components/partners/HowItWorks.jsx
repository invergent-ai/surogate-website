import Steps from '@/components/solutions/Steps';

const STEPS = [
  { name: 'Get in touch', line: 'Email us or join our Discord. You start at Silver the same day.' },
  { name: 'Build', line: 'Your own workspace has no plan fee. Build and demo as much as you need.' },
  { name: 'Pilot', line: 'Every new client gets 60 days free.' },
  { name: 'Go live', line: 'The client picks a plan or a licence.' },
  { name: 'Earn', line: 'You earn your share every month the client stays.' },
];

export default function HowItWorks() {
  return <Steps title="From first demo to monthly share." sub="Five steps, and the first three cost nothing." steps={STEPS} />;
}

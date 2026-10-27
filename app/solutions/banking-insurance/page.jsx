import SolutionPage from '@/components/solutions/SolutionPage';
import metaFor from '@/components/solutions/meta';
import { SOLUTIONS } from '@/lib/solutions';

const s = SOLUTIONS.banking;

export const metadata = metaFor(s.path);

export default function BankingPage() {
  return <SolutionPage s={s} k="banking" visual="keel" secondary={{ label: 'See how Keel works', href: '/keel/' }} />;
}

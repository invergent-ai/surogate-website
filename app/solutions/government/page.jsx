import SolutionPage from '@/components/solutions/SolutionPage';
import metaFor from '@/components/solutions/meta';
import { SOLUTIONS } from '@/lib/solutions';

const s = SOLUTIONS.government;

export const metadata = metaFor(s.path);

export default function GovernmentPage() {
  return <SolutionPage s={s} k="government" visual="voice" secondary={{ label: 'Read about security', href: '/security/' }} />;
}

import SolutionPage from '@/components/solutions/SolutionPage';
import metaFor from '@/components/solutions/meta';
import { SOLUTIONS } from '@/lib/solutions';

const s = SOLUTIONS.enterprise;

export const metadata = metaFor(s.path);

export default function EnterprisePage() {
  return <SolutionPage s={s} k="enterprise" visual="agents" secondary={{ label: 'See Teams pricing', href: '/pricing/#teams' }} />;
}

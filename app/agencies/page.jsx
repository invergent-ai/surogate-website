import Redirect, { redirectMetadata } from '@/components/site/Redirect';
import { REDIRECTS } from '@/lib/site';

const to = REDIRECTS['/agencies/'];

export const metadata = redirectMetadata(to);

export default function Moved() {
  return <Redirect to={to} />;
}

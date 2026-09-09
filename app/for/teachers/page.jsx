import TeachersClient from '@/components/for/TeachersClient';
import { JsonLd } from '../../structured-data';
import '../../home.css';
import '../../for.css';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
    { '@type': 'ListItem', position: 2, name: 'For teachers', item: 'https://surogate.ai/for/teachers/' },
  ],
};

const DESCRIPTION =
  'Your students only have you for an hour. Agents that work with each student in the time in between, on your material and your rules, and report back where every one of them got to.';

export const metadata = {
  title: 'For teachers - Surogate',
  description: DESCRIPTION,
  keywords:
    'AI tutor for teachers, tutoring between lessons, student progress reports, exam preparation agent, bacalaureat, evaluare nationala, private tutor software, teaching assistant AI',
  alternates: {
    canonical: 'https://surogate.ai/for/teachers/',
  },
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/for/teachers/',
    title: 'For teachers - Surogate',
    description: DESCRIPTION,
    siteName: 'Surogate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For teachers - Surogate',
    description: DESCRIPTION,
  },
};

export default function TeachersPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <TeachersClient />
    </>
  );
}

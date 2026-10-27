import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Button from '@/components/site/Button';
import Section, { CONTAINER, SectionHead } from '@/components/site/Section';
import Cover from '@/components/news/Cover';
import Markdown from '@/components/news/Markdown';
import { NewsGrid } from '@/components/news/NewsCard';
import { POSTS, post, fmtDate } from '@/lib/news';
import { meta } from '@/lib/company';
import { JsonLd, organization } from '../../structured-data';

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const p = post((await params).slug);
  return meta(`/news/${p.slug}/`, `${p.title} - Surogate`, p.dek, { type: 'article', publishedTime: p.date });
}

const abs = (href) => (href.startsWith('/') ? `https://surogate.ai${href}` : href);

export default async function PostPage({ params }) {
  const p = post((await params).slug);
  if (!p) notFound();
  const url = `https://surogate.ai/news/${p.slug}/`;
  const updated = p.updated || p.date;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: p.title, description: p.dek, datePublished: p.date, dateModified: updated,
        mainEntityOfPage: url, url, image: 'https://surogate.ai/og-image.jpg', isBasedOn: abs(p.source.href),
        author: { '@id': organization['@id'] }, publisher: { '@id': organization['@id'] } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://surogate.ai/' },
        { '@type': 'ListItem', position: 2, name: 'News', item: 'https://surogate.ai/news/' },
        { '@type': 'ListItem', position: 3, name: p.title, item: url },
      ] },
    ],
  };
  const more = POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  const ext = /^https?:/.test(p.source.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <div className="v2 pg-v2 w-full overflow-x-clip bg-white font-sans text-ink">
      <Nav />
      <JsonLd data={ld} />
      <main>
        <article>
          <div className={`${CONTAINER} pt-8 md:pt-12`}>
            <div className="mx-auto flex max-w-[960px] items-center justify-between text-[14px]">
              <a href="/news/" className="group inline-flex min-h-11 items-center gap-1.5 !text-ink/65 no-underline hover:!text-ink">
                <ArrowLeft size={16} /> All news
              </a>
              <time dateTime={p.date} className="text-ink/60">{fmtDate(p.date)}</time>
            </div>
            <header className="mx-auto mt-10 max-w-[760px] text-center md:mt-16">
              <p className="m-0 text-[13px] font-medium">{p.category}</p>
              <h1 className="m-0 mt-3 text-balance text-[36px] font-[450] leading-[1.08] tracking-[-0.01em] md:text-[56px] md:leading-[1.04]">{p.title}</h1>
              <p className="mx-auto mt-5 mb-0 max-w-[560px] text-balance text-[16px] leading-[1.6] text-ink/65 md:text-[18px]">{p.dek}</p>
              <div className="mt-8"><Button href={p.cta.href} external={p.cta.external} size="lg" arrow>{p.cta.label}</Button></div>
            </header>
            <div className="mx-auto mt-12 aspect-[16/10] max-w-[960px] md:aspect-[2/1] overflow-hidden rounded-2xl md:mt-16"><Cover kind={p.cover} big /></div>
          </div>

          <div className={`${CONTAINER} pb-16 md:pb-24`}>
            {p.facts && (
              <dl className="mx-auto mt-12 grid max-w-[680px] border-y border-hairline sm:grid-cols-3">
                {p.facts.map((f) => (
                  <div key={f.l} className="border-hairline py-5 sm:px-5 sm:first:pl-0 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0">
                    <dt className="sr-only">{f.l}</dt>
                    <dd className="m-0 text-[28px] font-[450] leading-none tracking-[-0.01em] tabular-nums">{f.n}</dd>
                    <dd className="m-0 mt-2 text-[13px] leading-[1.45] text-ink/60">{f.l}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="mx-auto mt-6 max-w-[680px] text-[17px] leading-[1.7] text-ink/80">
              <Markdown source={p.body} />
            </div>
            <footer className="mx-auto mt-14 flex max-w-[680px] flex-col gap-1.5 border-t border-hairline pt-6 text-[13px] text-ink/60 sm:flex-row sm:justify-between">
              <span>Source: <a href={p.source.href} {...ext} className="!text-ink/80 underline decoration-ink/30 underline-offset-2">{p.source.label}</a></span>
              <span>Last updated <time dateTime={updated}>{fmtDate(updated)}</time></span>
            </footer>
          </div>
        </article>
        <Section>
          <SectionHead title="More news" action={<a href="/news/" className="inline-flex min-h-11 items-center text-[14px] font-medium !text-ink no-underline">All news</a>} />
          <NewsGrid posts={more} />
        </Section>
      </main>
      <Footer />
    </div>
  );
}

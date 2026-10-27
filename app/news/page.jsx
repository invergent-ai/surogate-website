import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Button from '@/components/site/Button';
import Section, { CONTAINER, SectionHead } from '@/components/site/Section';
import Cover from '@/components/news/Cover';
import { NewsGrid } from '@/components/news/NewsCard';
import { POSTS, fmtDate } from '@/lib/news';
import { meta } from '@/lib/company';
import { JsonLd } from '../structured-data';

export const metadata = meta('/news/', 'News - Surogate',
  'Releases from Surogate: our own models, speech for Romanian, the open-source engine and Keel. Every post is dated and names its source.');

const list = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: POSTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://surogate.ai/news/${p.slug}/`, name: p.title })),
};

export default function NewsPage() {
  const [top, ...rest] = POSTS;
  return (
    <div className="v2 pg-v2 w-full overflow-x-clip bg-white font-sans text-ink">
      <Nav />
      <JsonLd data={list} />
      <main>
        <section className="bg-white">
          <div className={`${CONTAINER} pt-12 pb-16 md:pt-20 md:pb-24`}>
            <h1 className="m-0 text-[36px] font-[450] leading-[1.1] tracking-[-0.01em] md:text-[48px]">News</h1>
            <article className="mt-10 grid items-center gap-8 md:mt-14 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
              <div className="order-2 lg:order-1">
                <p className="m-0 flex gap-3 text-[13px]">
                  <span className="font-medium">{top.category}</span>
                  <time dateTime={top.date} className="text-ink/60">{fmtDate(top.date)}</time>
                </p>
                <h2 className="m-0 mt-3 text-balance text-[28px] font-[500] leading-[1.15] tracking-[-0.01em] md:text-[40px]">
                  <a href={`/news/${top.slug}/`} className="!text-ink no-underline">{top.title}</a>
                </h2>
                <p className="m-0 mt-4 max-w-[44ch] text-[16px] leading-[1.6] text-ink/65 md:text-[17px]">{top.dek}</p>
                <div className="mt-7"><Button href={`/news/${top.slug}/`} size="lg" arrow>Read the post</Button></div>
              </div>
              <a href={`/news/${top.slug}/`} tabIndex={-1} aria-hidden="true" className="group order-1 block aspect-[16/10] overflow-hidden rounded-2xl lg:order-2">
                <Cover kind={top.cover} big />
              </a>
            </article>
          </div>
        </section>
        <Section>
          <SectionHead title="All posts" />
          <NewsGrid posts={rest} />
        </Section>
      </main>
      <Footer />
    </div>
  );
}

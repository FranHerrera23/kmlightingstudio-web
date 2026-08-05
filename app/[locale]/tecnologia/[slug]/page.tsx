import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import AddToSpec from '@/components/AddToSpec';
import { fixtureProduct, breadcrumbList } from '@/lib/structuredData';
import { social, localizedPath } from '@/lib/metadata';
import { FIX, DRAW, getFixture, isTodo, SITE_NAME, type Fixture } from '@/content';

export function generateStaticParams() {
  return FIX.map((f) => ({ slug: f.id }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const f = getFixture(slug);
  if (!f) return {};
  return social({
    title: `${f.name} — ${SITE_NAME}`,
    description: f.blurb,
    path: localizedPath(locale, `/tecnologia/${f.id}`)
  });
}

/** Sección técnica: si el dato está en TODO muestra el flag "Awaiting TRAZZO". */
function Tech({
  heading,
  pending,
  children
}: {
  heading: string;
  pending: string;
  children: ReactNode | null;
}) {
  return (
    <div className="techblock">
      <div className="micro">{heading}</div>
      {children ?? <div className="flag tech-todo">{pending}</div>}
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="taglist">
      {items.map((x) => (
        <span key={x}>{x}</span>
      ))}
    </div>
  );
}

export default async function ProductPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const f: Fixture | undefined = getFixture(slug);
  if (!f) notFound();

  const t = await getTranslations('products');
  const tn = await getTranslations('nav');
  const pending = t('technicalPending');
  const crumbs = breadcrumbList(locale, [
    { name: tn('home'), path: '/' },
    { name: tn('products'), path: '/tecnologia' },
    { name: f.name, path: `/tecnologia/${f.id}` }
  ]);

  return (
    <div>
      <JsonLd data={fixtureProduct(f)} />
      <JsonLd data={crumbs} />

      <section className="prodhead">
        <Link className="back" href="/tecnologia">
          {t('backToProducts')}
        </Link>
        <div className="micro">{f.family}</div>
        <h1>{f.name}</h1>
        <div className="pl">{f.diameter}</div>
      </section>

      <section className="prodmain">
        <div className="prodstage">
          <div dangerouslySetInnerHTML={{ __html: DRAW[f.draw] }} />
        </div>
        <div className="prodinfo">
          <div className="micro">{t('whySpecify')}</div>
          <p className="lead">{f.blurb}</p>
          <AddToSpec label={t('addToSpec')} added={t('addedToSpec')} />
        </div>
      </section>

      <section className="tech">
        <Tech heading={t('specsHeading')} pending={pending}>
          {isTodo(f.specs) ? null : (
            <dl className="techdl">
              {(f.specs as Array<[string, string]>).map(([k, v]) => (
                <div className="r" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </Tech>

        <Tech heading={t('cctHeading')} pending={pending}>
          {isTodo(f.cct) ? null : <TagList items={f.cct as string[]} />}
        </Tech>

        <Tech heading={t('opticsHeading')} pending={pending}>
          {isTodo(f.optics) ? null : <TagList items={f.optics as string[]} />}
        </Tech>

        <Tech heading={t('finishesHeading')} pending={pending}>
          {isTodo(f.finishes) ? null : <TagList items={f.finishes as string[]} />}
        </Tech>

        <Tech heading={t('accessoriesHeading')} pending={pending}>
          {isTodo(f.accessories) ? null : (
            <TagList items={f.accessories as string[]} />
          )}
        </Tech>

        <Tech heading={t('downloadsHeading')} pending={pending}>
          {isTodo(f.downloads) ? null : (
            <div className="downloads">
              {(f.downloads as Array<{ label: string; href: string }>).map(
                (d) => (
                  <a key={d.label} href={d.href}>
                    {d.label} ↓
                  </a>
                )
              )}
            </div>
          )}
        </Tech>
      </section>
    </div>
  );
}

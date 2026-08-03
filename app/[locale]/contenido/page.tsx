import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import MaskLines from '@/components/MaskLines';
import BuildNote from '@/components/BuildNote';
import { social, localizedPath } from '@/lib/metadata';
import { routing, CONTENT_LOCALES, type Locale } from '@/i18n/routing';
import { ARTICLES, isTodo } from '@/content';

/**
 * CONTENIDO · v3 — hub editorial ES/EN (fuera para PT/RU → 404).
 * Estado: índice de artículos con copy en el catálogo. El hub completo con
 * las cuatro pestañas (Artículos / Conversaciones / Recorridos / Prensa) y los
 * modelos de video llega en el paso siguiente.
 */
export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'meta.content' });
  return social({
    title: t('title'),
    description: t('description'),
    path: localizedPath(locale, '/contenido')
  });
}

export default async function ContentPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  // Contenido es editorial ES/EN. PT/RU son solo interfaz → 404.
  if (!(CONTENT_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('content');

  return (
    <div>
      <header className="mast">
        <div className="micro rise">{t('kicker')}</div>
        <h1>
          <MaskLines lines={t.raw('titleLines') as string[]} />
        </h1>
        <div className="mast-intro">
          <p className="lead rise d1">{t('introLead')}</p>
          <div className="note rise d2">{t('introNote')}</div>
        </div>
      </header>

      <section className="sec-s">
        <div className="jr">
          {ARTICLES.map((a) => (
            <Link className="jrow rise" key={a.slug} href={`/contenido/${a.slug}`}>
              <span>
                <h4>
                  {a.title}
                  <span className="lang-tag">{a.lang}</span>
                </h4>
                <span className="q">
                  <b>{t('answers')}</b>
                  {a.question}
                </span>
              </span>
              <span className="t">
                {a.tag}
                <i>{a.author}</i>
              </span>
              <span className="rd">
                {isTodo(a.read) ? '' : (a.read as string)}
              </span>
            </Link>
          ))}
        </div>
        <BuildNote
          title="Hub de contenido · en construcción"
          style={{ marginTop: 'clamp(36px,5vh,60px)' }}
        >
          Las cuatro pestañas (Artículos · Conversaciones · Recorridos · Prensa)
          y los modelos de video llegan en el paso siguiente. PT/RU quedan fuera
          del contenido editorial.
        </BuildNote>
      </section>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale: Locale) => ({ locale }));
}

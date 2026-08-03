import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import MaskLines from '@/components/MaskLines';
import BuildNote from '@/components/BuildNote';
import VideoCard from '@/components/VideoCard';
import { social, localizedPath } from '@/lib/metadata';
import { CONTENT_LOCALES } from '@/i18n/routing';
import {
  ARTICLES,
  CONVERSACIONES,
  RECORRIDOS,
  PRENSA,
  isTodo
} from '@/content';

/**
 * CONTENIDO · v3 — hub editorial ES/EN con cuatro pestañas:
 * Artículos · Conversaciones · Recorridos · Prensa.
 * El estado vive en el query param (?tab=conversaciones) para que sea
 * compartible e indexable. Todos los paneles se renderizan en el DOM (crawlean
 * igual); el tab solo controla cuál se muestra. PT/RU → 404 (solo interfaz).
 */
const TABS = ['articulos', 'conversaciones', 'recorridos', 'prensa'] as const;
type Tab = (typeof TABS)[number];

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
  searchParams: Promise<{ tab?: string }>;
}) {
  const { locale } = await props.params;
  if (!(CONTENT_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const { tab } = await props.searchParams;
  const active: Tab = (TABS as readonly string[]).includes(tab || '')
    ? (tab as Tab)
    : 'articulos';

  const t = await getTranslations('content');
  const panel = (id: Tab) => `panel${active === id ? ' on' : ''} sec-s`;
  const counts: Record<Tab, number> = {
    articulos: ARTICLES.length,
    conversaciones: CONVERSACIONES.length,
    recorridos: RECORRIDOS.length,
    prensa: PRENSA.length
  };
  const tabLabel: Record<Tab, string> = {
    articulos: t('tabWritten'),
    conversaciones: t('tabConversations'),
    recorridos: t('tabWalkthroughs'),
    prensa: t('tabPress')
  };
  const videoLabels = {
    source: t('videoSource'),
    verticalLabel: t('verticalLabel'),
    guestTBD: t('guestTBD'),
    studioTBC: t('studioTBC'),
    projectTBD: t('projectTBD'),
    placeTBC: t('placeTBC'),
    walkLabel: t('walkLabel')
  };

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

      {/* Barra de pestañas — Links con ?tab= (compartible, indexable) */}
      <div className="tabs">
        <div className="tabs-in">
          {TABS.map((id) => (
            <Link
              key={id}
              className={`tab${active === id ? ' on' : ''}`}
              href={{ pathname: '/contenido', query: { tab: id } }}
              scroll={false}
            >
              {tabLabel[id]}
              <sup>{counts[id]}</sup>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Artículos ── */}
      <section className={panel('articulos')} style={{ paddingTop: 0 }}>
        <div className="tabhead">
          <div>
            <div className="micro rise">{t('writtenMicro')}</div>
            <h3 className="rise d1">
              {t('writtenTitle1')}
              <br />
              {t('writtenTitle2')}
            </h3>
          </div>
          <div>
            <p className="lead rise d1">{t('writtenLead')}</p>
          </div>
        </div>
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
      </section>

      {/* ── Conversaciones ── */}
      <section className={panel('conversaciones')} style={{ paddingTop: 0 }}>
        <div className="tabhead">
          <div>
            <div className="micro rise">{t('conversationsMicro')}</div>
            <h3 className="rise d1">
              {t('conversationsTitle1')}
              <br />
              {t('conversationsTitle2')}
            </h3>
          </div>
          <div>
            <p className="lead rise d1">{t('conversationsLead')}</p>
          </div>
        </div>
        <div className="vrail">
          {CONVERSACIONES.map((v) => (
            <VideoCard key={v.id} v={v} labels={videoLabels} />
          ))}
        </div>
        <BuildNote
          title="Fase 2 · curaduría y transcripciones"
          style={{ marginTop: 'clamp(36px,5vh,60px)' }}
        >
          Sin embeds de Instagram — un iframe pesa ~500KB y rompe el LCP. Cada
          pieza es una entrada en <code>/content/conversaciones.ts</code> con
          thumbnail propio, transcripción completa en la página y{' '}
          <code>VideoObject</code> con <code>inLanguage</code>. Los videos en
          español llevan subtítulos en inglés.
        </BuildNote>
      </section>

      {/* ── Recorridos ── */}
      <section className={panel('recorridos')} style={{ paddingTop: 0 }}>
        <div className="tabhead">
          <div>
            <div className="micro rise">{t('walkthroughsMicro')}</div>
            <h3 className="rise d1">
              {t('walkthroughsTitle1')}
              <br />
              {t('walkthroughsTitle2')}
            </h3>
          </div>
          <div>
            <p className="lead rise d1">{t('walkthroughsLead')}</p>
          </div>
        </div>
        <div className="vrail">
          {RECORRIDOS.map((v) => (
            <VideoCard key={v.id} v={v} labels={videoLabels} />
          ))}
        </div>
      </section>

      {/* ── Prensa ── */}
      <section className={panel('prensa')} style={{ paddingTop: 0 }}>
        <div className="tabhead">
          <div>
            <div className="micro rise">{t('pressMicro')}</div>
            <h3 className="rise d1">
              {t('pressTitle1')}
              <br />
              {t('pressTitle2')}
            </h3>
          </div>
          <div>
            <p className="lead rise d1">{t('pressLead')}</p>
          </div>
        </div>

        <div className="feat rise">
          <div>
            <div className="micro">{t('featMicro')}</div>
            <h3>
              {t('featTitle1')}
              <br />
              <span style={{ color: 'var(--gold-lt)' }}>{t('featTitle2')}</span>
            </h3>
            <p>{t('featBody')}</p>
            <span className="out">
              {t('featOut')} <i>→</i>
            </span>
          </div>
          <div className="cov zin">
            <div className="ph" data-l="Forbes Perú · portada"></div>
          </div>
        </div>

        <div className="press">
          {PRENSA.map((p, i) => (
            <div className="prow rise" key={i}>
              <span className="out">
                {isTodo(p.outlet) ? (
                  <span className="flag">{t('outletTBD')}</span>
                ) : (
                  (p.outlet as string)
                )}
                <i>{isTodo(p.section) ? '—' : (p.section as string)}</i>
              </span>
              <h4>
                {isTodo(p.headline) ? (
                  <span className="flag">{t('headlineTBC')}</span>
                ) : (
                  (p.headline as string)
                )}
              </h4>
              <span className="dt">
                {isTodo(p.date) ? (
                  <span className="flag">{t('dateTBC')}</span>
                ) : (
                  (p.date as string)
                )}
              </span>
              <span className="go">{t('read')} →</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

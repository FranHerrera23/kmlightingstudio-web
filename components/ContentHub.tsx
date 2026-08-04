import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import MaskLines from './MaskLines';
import BuildNote from './BuildNote';
import VideoCard from './VideoCard';
import { social, localizedPath } from '@/lib/metadata';
import {
  ARTICLES,
  CONVERSACIONES,
  RECORRIDOS,
  PRENSA,
  SITE_NAME,
  isTodo
} from '@/content';

/**
 * CONTENIDO · v5 — hub editorial ES/EN en rutas reales indexables.
 *  · `/contenido` (hub): Masthead + tab bar + Artículos completo + tres bloques
 *    de acceso (dos piezas + "Ver todo →"). NO renderiza las secciones enteras.
 *  · `/contenido/articulos|conversaciones|recorridos|prensa`: cada una renderiza
 *    SOLO su sección. Así ningún par de URLs sirve el mismo listado (§6 brief 06).
 * PT/RU → 404 (solo interfaz).
 */
export const TABS = ['articulos', 'conversaciones', 'recorridos', 'prensa'] as const;
export type Tab = (typeof TABS)[number];
export type HubView = 'hub' | Tab;

/** Ruta real por tab. Artículos tiene su propia ruta; el hub vive en /contenido. */
export function tabHref(id: Tab): string {
  return `/contenido/${id}`;
}

export async function contentMeta(locale: string, view: HubView): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.content' });
  const tc = await getTranslations({ locale, namespace: 'content' });
  const label: Record<Tab, string> = {
    articulos: tc('tabWritten'),
    conversaciones: tc('tabConversations'),
    recorridos: tc('tabWalkthroughs'),
    prensa: tc('tabPress')
  };
  const path = view === 'hub' ? '/contenido' : `/contenido/${view}`;
  return social({
    title: view === 'hub' ? t('title') : `${label[view]} — ${SITE_NAME}`,
    description: t('description'),
    path: localizedPath(locale, path)
  });
}

export default async function ContentHub({ view }: { view: HubView }) {
  const t = await getTranslations('content');
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

  const isHub = view === 'hub';

  const sectionHead = (micro: string, title1: string, title2: string, lead: string) => (
    <div className="tabhead">
      <div>
        <div className="micro rise">{micro}</div>
        <h3 className="rise d1">
          {title1}
          <br />
          {title2}
        </h3>
      </div>
      <div>
        <p className="lead rise d1">{lead}</p>
      </div>
    </div>
  );

  const seeAll = (tab: Tab) => (
    <div style={{ marginTop: 'clamp(28px,4vh,48px)' }}>
      <Link className="lnk seeall" href={tabHref(tab)}>
        {t('seeAll')}
      </Link>
    </div>
  );

  const articlesBlock = (
    <section className="sec-s" style={{ paddingTop: isHub ? undefined : 0 }} key="art">
      {sectionHead(t('writtenMicro'), t('writtenTitle1'), t('writtenTitle2'), t('writtenLead'))}
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
              <i>{isTodo(a.author) ? '' : (a.author as string)}</i>
            </span>
            <span className="rd">{isTodo(a.read) ? '' : (a.read as string)}</span>
          </Link>
        ))}
      </div>
    </section>
  );

  const videoBlock = (
    tab: 'conversaciones' | 'recorridos',
    data: typeof CONVERSACIONES,
    micro: string,
    title1: string,
    title2: string,
    lead: string,
    extra?: ReactNode
  ) => {
    const list = isHub ? data.slice(0, 2) : data;
    return (
      <section className="sec-s" style={{ paddingTop: isHub ? undefined : 0 }} key={tab}>
        {sectionHead(micro, title1, title2, lead)}
        <div className="vrail">
          {list.map((v) => (
            <VideoCard key={v.id} v={v} labels={videoLabels} />
          ))}
        </div>
        {isHub ? seeAll(tab) : extra}
      </section>
    );
  };

  const prensaBlock = (
    <section className="sec-s" style={{ paddingTop: isHub ? undefined : 0 }} key="prensa">
      {sectionHead(t('pressMicro'), t('pressTitle1'), t('pressTitle2'), t('pressLead'))}
      {!isHub && (
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
      )}
      <div className="press">
        {(isHub ? PRENSA.slice(0, 2) : PRENSA).map((p, i) => (
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
      {isHub && seeAll('prensa')}
    </section>
  );

  const conversacionesExtra = (
    <BuildNote
      title="Fase 2 · curaduría y transcripciones"
      style={{ marginTop: 'clamp(36px,5vh,60px)' }}
    >
      Sin embeds de Instagram — un iframe pesa ~500KB y rompe el LCP. Cada pieza es
      una entrada en <code>/content/conversaciones.ts</code> con thumbnail propio,
      transcripción completa en la página y <code>VideoObject</code> con{' '}
      <code>inLanguage</code>. Los videos en español llevan subtítulos en inglés.
    </BuildNote>
  );

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

      <div className="tabs">
        <div className="tabs-in">
          {TABS.map((id) => (
            <Link
              key={id}
              className={`tab${view === id ? ' on' : ''}`}
              href={tabHref(id)}
            >
              {tabLabel[id]}
              <sup>{counts[id]}</sup>
            </Link>
          ))}
        </div>
      </div>

      {(isHub || view === 'articulos') && articlesBlock}
      {(isHub || view === 'conversaciones') &&
        videoBlock(
          'conversaciones',
          CONVERSACIONES,
          t('conversationsMicro'),
          t('conversationsTitle1'),
          t('conversationsTitle2'),
          t('conversationsLead'),
          conversacionesExtra
        )}
      {(isHub || view === 'recorridos') &&
        videoBlock(
          'recorridos',
          RECORRIDOS,
          t('walkthroughsMicro'),
          t('walkthroughsTitle1'),
          t('walkthroughsTitle2'),
          t('walkthroughsLead')
        )}
      {(isHub || view === 'prensa') && prensaBlock}
    </div>
  );
}

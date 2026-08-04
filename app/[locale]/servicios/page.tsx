import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Masthead from '@/components/Masthead';
import MaskLines from '@/components/MaskLines';
import { VERTICALS, PROJECTS } from '@/content';
import { social, localizedPath } from '@/lib/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'meta.services' });
  return social({
    title: t('title'),
    description: t('description'),
    path: localizedPath(locale, '/servicios')
  });
}

export default async function ServicesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const steps = t.raw('scopeSteps') as string[][];

  return (
    <div>
      {/* A.1 · APERTURA — capa emocional, trasladada desde "Sociedad" de la home */}
      <Masthead
        kicker={t('kicker')}
        titleLines={t.raw('openTitleLines') as string[]}
        lead={t('openBody1')}
        note={t('openBody2')}
      />

      {/* A.2 · LA DISCIPLINA — el titular anterior, ahora sección 2 (capa 2) */}
      <section className="sec-s">
        <div className="shead">
          <div>
            <h2>
              <MaskLines lines={t.raw('titleLines') as string[]} />
            </h2>
          </div>
          <div className="side">
            <p className="lead rise">{t('introLead')}</p>
            <p
              className="rise d1"
              style={{
                marginTop: 18,
                fontSize: 13.5,
                lineHeight: 1.72,
                color: 'var(--ink-3)'
              }}
            >
              {t('introNote')}
            </p>
          </div>
        </div>
      </section>

      {/* LAS 7 VERTICALES — cards (capa 1) */}
      <section className="sec-s" style={{ paddingTop: 0 }}>
        <div className="vgrid">
          {VERTICALS.map((v) => {
            const n = PROJECTS.filter((p) => p.typ === v.id).length;
            return (
              <Link className="vcard rise" href={`/servicios/${v.slug}`} key={v.id}>
                <div className="ph" data-l={v.title}></div>
                <span className="n">
                  {n === 1
                    ? t('projectCountOne', { count: n })
                    : t('projectCountOther', { count: n })}
                </span>
                <h3>{v.title}</h3>
                <span className="go">
                  {t('workProcess')} <i>→</i>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* A.3 · EL SCOPE — cómo trabajamos (tres etapas, un solo dossier) */}
      <section className="sec-s">
        <div className="shead">
          <div>
            <div className="micro rise">{t('scopeMicro')}</div>
            <h2>
              <MaskLines lines={t.raw('scopeTitleLines') as string[]} />
            </h2>
          </div>
          <div className="side">
            <p className="lead rise d1">{t('scopeBody')}</p>
          </div>
        </div>
        <div className="scope-steps rise">
          {steps.map(([et, ti, dl], i) => (
            <div className="scope-row" key={i}>
              <span className="et">{et}</span>
              <span className="ti">{ti}</span>
              <span className="dl">{dl}</span>
            </div>
          ))}
        </div>
        <p className="scope-close rise">{t('scopeClose')}</p>
      </section>
    </div>
  );
}

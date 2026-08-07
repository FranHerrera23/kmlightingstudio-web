import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import ProjectCard from '@/components/ProjectCard';
import DatoText from '@/components/DatoText';
import JsonLd from '@/components/JsonLd';
import { breadcrumbList } from '@/lib/structuredData';
import { social, localizedPath } from '@/lib/metadata';
import {
  VERTICALS,
  PROJECTS,
  SCOPE,
  DOSSIER,
  SITE_NAME,
  verticalHasDato,
  type Vertical
} from '@/content';

// El slug es en español (desacoplado del id de tipología, que sigue acoplando
// con Project.typ para filtrar la obra de la vertical).
function getVertical(slug: string): Vertical | undefined {
  return VERTICALS.find((v) => v.slug === slug);
}

export function generateStaticParams() {
  return VERTICALS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const v = getVertical(slug);
  if (!v) return {};
  // §2 brief 09 · <title> keyword (titleSeo) distinto del H1 humano; fallback al patrón.
  const titleSeo = (locale === 'en' ? v.titleSeoEn : v.titleSeo) || `${v.title} — ${SITE_NAME}`;
  return {
    ...social({
      title: titleSeo,
      description: v.sub,
      path: localizedPath(locale, `/servicios/${v.slug}`)
    }),
    // A.4 · si la narrativa tiene algún `[DATO]` sin confirmar → noindex
    // (tampoco entra al sitemap). El texto que rodea al dato sí se publica.
    robots: verticalHasDato(v) ? { index: false, follow: true } : undefined
  };
}

export default async function VerticalPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const v = getVertical(slug);
  if (!v) notFound();

  const t = await getTranslations('vertical');
  const tn = await getTranslations('nav');
  const projects = PROJECTS.filter((p) => p.typ === v.id);
  // A.4 · narrativa en el idioma del lector (EN para el arquitecto de afuera).
  // Los `[DATO]` son idénticos en ambas, así que verticalHasDato sigue valiendo.
  const story = locale === 'en' ? v.storyEn : v.story;
  // §1 brief 09 · answer capsules: cada párrafo narrativo encabezado por su
  // pregunta (H3). Se aparean por índice; la línea [DATO] suelta no lleva pregunta.
  const questions = locale === 'en' ? v.questionsEn : v.questions;
  const crumbs = breadcrumbList(locale, [
    { name: tn('home'), path: '/' },
    { name: tn('services'), path: '/servicios' },
    { name: v.title, path: `/servicios/${v.slug}` }
  ]);

  return (
    <div>
      <JsonLd data={crumbs} />
      <header className="vhero">
        <div className="ph" data-l={`${v.title} · hero`}></div>
        <div>
          <h1>{v.title}</h1>
          <p className="lead">{v.sub}</p>
        </div>
      </header>

      {/* A.4 · narrativa de la vertical — EN JUEGO → EL OBSTÁCULO → LO QUE
          CAMBIA (los rótulos no aparecen). Copy literal del brief 02. */}
      <section className="sec-s" style={{ paddingBottom: 0 }}>
        <div className="vnarr rise">
          {story.map((p, i) => (
            <div className="vcapsule" key={i}>
              {questions[i] && <h3>{questions[i]}</h3>}
              <p>
                <DatoText text={p} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec-s" style={{ paddingBottom: 0 }}>
        <Link className="back" href="/servicios">
          {t('back')}
        </Link>
        <div className="shead" style={{ marginTop: 'clamp(36px,5vh,60px)' }}>
          <div>
            <div className="micro">{t('wpMicro')}</div>
            <h2 style={{ marginTop: 24 }}>
              {t('wpTitle1')}
              <br />
              {t('wpTitle2')}
            </h2>
          </div>
          <div className="side">
            <p className="lead">{v.intro}</p>
          </div>
        </div>
      </section>

      <div className="wp" style={{ marginTop: 'clamp(50px,8vh,100px)' }}>
        <div className="im">
          <div className="ph" data-l={`${v.title} · proceso`}></div>
        </div>
        <div className="nv">
          {SCOPE.map((s) => (
            <div className="stg rise" key={s.n}>
              <div className="h">
                <span className="st">{t('stage', { n: s.n })}</span>
                <h3>{s.title}</h3>
                {s.delivery && <span className="dl">{s.delivery}</span>}
              </div>
              <p className="narr">{v.narr[s.n as 1 | 2 | 3]}</p>
              {s.steps.map(([i, title, items], k) => (
                <div className="step" key={k}>
                  <span className="i">{i}</span>
                  <div>
                    {title && <h4>{title}</h4>}
                    <ul>
                      {items.map((x, j) => (
                        <li key={j}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              {/* §4 brief 09 · molde de guía por pasos — capsule + entregable.
                  Renderiza solo cuando Fran llene los slots (question/deliverable). */}
              {(() => {
                const sq = locale === 'en' ? s.questionEn : s.question;
                const sa = locale === 'en' ? s.answerEn : s.answer;
                const sd = locale === 'en' ? s.deliverableEn : s.deliverable;
                if (!sq && !sd) return null;
                return (
                  <div className="stg-cap">
                    {sq && <h4 className="stg-q">{sq}</h4>}
                    {sa && <p>{sa}</p>}
                    {sd && (
                      <p className="stg-deliver">
                        <strong>{t('whatYouGet')}</strong> {sd}
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
          ))}
        </div>
      </div>

      <section className="sec-s">
        <div className="doss">
          <div className="micro">{t('dossierMicro')}</div>
          <h3>
            {t('dossierTitle1')}
            <br />
            {t('dossierTitle2')}
          </h3>
          <p className="lead">{t('dossierLead')}</p>
          <ul>
            {DOSSIER.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-s" style={{ paddingTop: 0 }}>
        <div className="micro">{t('selectedWork')}</div>
        <div
          className="pgrid"
          data-d="4"
          style={{ marginTop: 'clamp(26px,4vh,44px)' }}
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

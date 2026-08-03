import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import ProjectCard from '@/components/ProjectCard';
import { social, localizedPath } from '@/lib/metadata';
import {
  VERTICALS,
  PROJECTS,
  SCOPE,
  DOSSIER,
  SITE_NAME,
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
  return social({
    title: `${v.title} — ${SITE_NAME}`,
    description: v.sub,
    path: localizedPath(locale, `/servicios/${v.slug}`)
  });
}

export default async function VerticalPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const v = getVertical(slug);
  if (!v) notFound();

  const t = await getTranslations('vertical');
  const projects = PROJECTS.filter((p) => p.typ === v.id);

  return (
    <div>
      <header className="vhero">
        <div className="ph" data-l={`${v.title} · hero`}></div>
        <div>
          <h1>{v.title}</h1>
          <p className="lead">{v.sub}</p>
        </div>
      </header>

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

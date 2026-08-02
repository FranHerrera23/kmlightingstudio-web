import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import ProjectName from '@/components/ProjectName';
import SmartImage from '@/components/SmartImage';
import { creativeWork } from '@/lib/structuredData';
import {
  PROJECTS,
  getProject,
  nextProject,
  galleryOf,
  ratioClass,
  photoUrl,
  isTodo,
  isIndexable,
  typologyLabel,
  statusLabel,
  displayValue,
  SITE_NAME,
  type Project,
  type Ratio
} from '@/content';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) return {};
  const name = isTodo(p.name) ? 'Project' : (p.name as string);
  return {
    title: `${name} — ${SITE_NAME}`,
    description: isTodo(p.concept) ? undefined : (p.concept as string),
    // Los proyectos con TODO esenciales no se indexan (ni entran al sitemap).
    robots: isIndexable(p) ? undefined : { index: false, follow: true }
  };
}

/**
 * Slot de foto ratio-aware. El contenedor reserva el alto por aspect-ratio
 * (dato), así que aunque la imagen falle o tarde, el layout no salta.
 * La foto real va encima del placeholder; si no existe (404), SmartImage se
 * oculta y queda el placeholder con su caption.
 */
function Shot({
  p,
  n,
  ratio,
  caption,
  figure = false
}: {
  p: Project;
  n: number;
  ratio: Ratio;
  caption: string;
  figure?: boolean;
}) {
  const cls = `${ratioClass(ratio)} zin`;
  const inner = (
    <>
      <SmartImage src={photoUrl(p, n)} cover />
      <div className="ph" data-l={caption}></div>
    </>
  );
  return figure ? (
    <figure className={cls}>{inner}</figure>
  ) : (
    <div className={`full ${cls}`}>{inner}</div>
  );
}

export default async function ProjectPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const p: Project | undefined = getProject(slug);
  if (!p) notFound();

  const t = await getTranslations('project');
  const g = galleryOf(p);
  const nx = nextProject(p.id);

  const eyebrow =
    typologyLabel(p.typ) + (isTodo(p.partner) ? '' : ' · ' + p.partner);
  const place = isTodo(p.place) ? p.hint || '' : (p.place as string);

  const credits: Array<[string, string | null]> = [
    [t('credArchitecture'), displayValue(p.arch)],
    [t('credInterior'), displayValue(p.interior)],
    [t('credDeveloper'), displayValue(p.dev)],
    [t('credLighting'), t('lightingValue')],
    [t('credYear'), displayValue(p.year)]
  ];

  const specs: Array<[string, string | null]> = [
    [t('specTypology'), typologyLabel(p.typ)],
    [t('specLocation'), displayValue(p.place)],
    [t('specArchitecture'), displayValue(p.arch)],
    [t('specInterior'), displayValue(p.interior)],
    [t('specDeveloper'), displayValue(p.dev)],
    [t('specScale'), displayValue(p.scale)],
    [t('specYear'), displayValue(p.year)],
    [t('specStatus'), statusLabel(p.sta)],
    [t('specControl'), null], // TODO — se confirma en fase 2
    [t('specPhotography'), null] // TODO — se confirma en fase 2
  ];

  const nxSuffix = isTodo(nx.place) ? '' : ' · ' + nx.place;

  return (
    <div>
      <JsonLd data={creativeWork(p)} />

      {/* 1 · HERO */}
      <header className="phero">
        <div
          className="ph"
          data-l={`${isTodo(p.name) ? p.hint || 'Proyecto' : p.name} · hero`}
        ></div>
        <div className="micro">{eyebrow}</div>
        <h1>
          <ProjectName p={p} />
        </h1>
        <div className="pl">{place}</div>
      </header>

      {/* 2 · CRÉDITOS — arriba del primer scroll */}
      <section className="creds">
        {credits.map(([l, v]) => (
          <div key={l}>
            <span className="l">{l}</span>
            <span className={`v${v === null ? ' flag' : ''}`}>
              {v ?? t('credPending')}
            </span>
          </div>
        ))}
      </section>

      {/* 3 · Foto 01 — fachada */}
      <Shot p={p} n={1} ratio={g[0].ratio} caption={g[0].caption} />

      {/* 4 · CONCEPT */}
      <section className="pnarr">
        <div>
          <div className="micro rise">{t('conceptMicro')}</div>
          <h3 className="rise d1">
            {isTodo(p.name) ? t('conceptTitleTodo') : t('conceptTitleReal')}
          </h3>
        </div>
        <div className="rise d1">
          <p>
            {isTodo(p.concept) ? (
              <span className="flag">{t('conceptTodo')}</span>
            ) : (
              (p.concept as string)
            )}
          </p>
        </div>
      </section>

      {/* 5 · Fotos 02-03 — par asimétrico */}
      <div className="duo a">
        <Shot p={p} n={2} ratio={g[1].ratio} caption={g[1].caption} figure />
        <Shot p={p} n={3} ratio={g[2].ratio} caption={g[2].caption} figure />
      </div>
      <div className="gap"></div>

      {/* 6 · Foto 04 — sala principal */}
      <div className="wide">
        <Shot p={p} n={4} ratio={g[3].ratio} caption={g[3].caption} />
      </div>
      <div className="gap"></div>

      {/* 7 · Fotos 05-06 — par invertido */}
      <div className="duo b">
        <Shot p={p} n={5} ratio={g[4].ratio} caption={g[4].caption} figure />
        <Shot p={p} n={6} ratio={g[5].ratio} caption={g[5].caption} figure />
      </div>

      {/* 8 · CHALLENGE */}
      <section className="pnarr">
        <div>
          <div className="micro rise">{t('challengeMicro')}</div>
          <h3 className="rise d1">{t('challengeTitle')}</h3>
        </div>
        <div className="rise d1">
          <p>
            {isTodo(p.challenge) ? (
              <span className="flag">{t('challengeTodo')}</span>
            ) : (
              (p.challenge as string)
            )}
          </p>
        </div>
      </section>

      {/* 9 · Foto 07 — comedor / segundo ambiente */}
      <Shot p={p} n={7} ratio={g[6].ratio} caption={g[6].caption} />
      <div className="gap"></div>

      {/* 10 · Fotos 08-09 — par */}
      <div className="duo">
        <Shot p={p} n={8} ratio={g[7].ratio} caption={g[7].caption} figure />
        <Shot p={p} n={9} ratio={g[8].ratio} caption={g[8].caption} figure />
      </div>
      <div className="gapL"></div>

      {/* 11 · Foto 10 — cierre, con margen */}
      <div className="inset">
        <Shot p={p} n={10} ratio={g[9].ratio} caption={g[9].caption} />
      </div>

      {/* 12 · PULL QUOTE */}
      <section className="pull">
        <q>{t('pullQuote')}</q>
        <cite>{t('pullCite')}</cite>
      </section>

      {/* 13 · FICHA TÉCNICA */}
      <section className="pspec">
        <div className="micro">{t('specMicro')}</div>
        <dl>
          {specs.map(([lbl, val]) => (
            <div className="r" key={lbl}>
              <dt>{lbl}</dt>
              {val === null ? (
                <dd className="flag">{t('specPending')}</dd>
              ) : (
                <dd>{val}</dd>
              )}
            </div>
          ))}
        </dl>
      </section>

      {/* 14 · SIGUIENTE PROYECTO */}
      <Link className="pnext" href={`/projects/${nx.id}`}>
        <div className="ph" data-l="Siguiente proyecto"></div>
        <div className="micro">{t('nextMicro')}</div>
        <h3>
          <ProjectName p={nx} />
        </h3>
        <div className="m">
          {typologyLabel(nx.typ)}
          {nxSuffix}
        </div>
        <span className="go">
          {t('viewProject')} <i>→</i>
        </span>
      </Link>
    </div>
  );
}

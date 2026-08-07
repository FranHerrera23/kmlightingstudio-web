import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import ProjectName from '@/components/ProjectName';
import SmartImage from '@/components/SmartImage';
import { creativeWork, breadcrumbList } from '@/lib/structuredData';
import { social, localizedPath, projectOg } from '@/lib/metadata';
import {
  PROJECTS,
  VERTICALS,
  FIRMS,
  getProject,
  nextProject,
  galleryOf,
  buildGallery,
  narrativeAnchors,
  ratioClass,
  photoUrl,
  isTodo,
  isIndexable,
  isConfidential,
  typologyLabel,
  statusLabel,
  displayValue,
  SITE_NAME,
  type Project,
  type GalleryBlock
} from '@/content';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const p = getProject(slug);
  if (!p) return {};
  const name = isTodo(p.name) ? 'Project' : (p.name as string);
  const typ = typologyLabel(p.typ);
  const place = isTodo(p.place) ? '' : (p.place as string);
  // Descripción específica: concepto si está escrito, si no tipología · lugar.
  const description = isTodo(p.concept)
    ? `${typ}${place ? ` · ${place}` : ''} — architectural lighting by ${SITE_NAME}.`
    : (p.concept as string);
  // og:image = primera foto de galería, recortada a 1200×630. §7 brief 08: si el
  // proyecto es confidencial, NUNCA su foto — cae al /og genérico (photo=null).
  const photo = p.ph > 0 && !isConfidential(p) ? photoUrl(p, 1) : null;

  return {
    ...social({
      title: `${name} — ${SITE_NAME}`,
      description,
      path: localizedPath(locale, `/proyectos/${p.id}`),
      image: projectOg({ title: name, eyebrow: typ, photo }),
      type: 'article'
    }),
    // TODO esenciales → noindex (tampoco entran al sitemap).
    robots: isIndexable(p) ? undefined : { index: false, follow: true }
  };
}

/** Un bloque de la galería (full-bleed / con márgenes / inset / dúo). El ratio
 *  de cada foto viene del dato y reserva el alto (anti-CLS). */
function Block({ p, block }: { p: Project; block: GalleryBlock }) {
  if (block.kind === 'full') {
    const inner = (
      <div className={`full ${ratioClass(block.shot.ratio)} zin`}>
        <SmartImage src={photoUrl(p, block.shot.n)} cover />
        <div className="ph" data-l={block.shot.caption}></div>
      </div>
    );
    if (block.variant === 'wide') return <div className="wide">{inner}</div>;
    if (block.variant === 'inset') return <div className="inset">{inner}</div>;
    return inner;
  }
  const cls = block.variant === 'even' ? 'duo' : `duo ${block.variant}`;
  return (
    <div className={cls}>
      {block.shots.map((s, i) => (
        <figure key={i} className={`${ratioClass(s.ratio)} zin`}>
          <SmartImage src={photoUrl(p, s.n)} cover />
          <div className="ph" data-l={s.caption}></div>
        </figure>
      ))}
    </div>
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
  const tn = await getTranslations('nav');
  const crumbName = isTodo(p.name) ? typologyLabel(p.typ) : (p.name as string);
  const crumbs = breadcrumbList(locale, [
    { name: tn('home'), path: '/' },
    { name: tn('projects'), path: '/proyectos' },
    { name: crumbName, path: `/proyectos/${p.id}` }
  ]);
  const blocks = buildGallery(galleryOf(p));
  const { conceptAfter, challengeAfter } = narrativeAnchors(blocks.length);
  const nx = nextProject(p.id);
  // B.7 · destinos de los enlaces bidireccionales
  const verticalSlug = VERTICALS.find((v) => v.id === p.typ)?.slug;
  const studioPartner =
    !isTodo(p.partner) && FIRMS.some(([n]) => n === p.partner)
      ? (p.partner as string)
      : null;

  const eyebrow =
    typologyLabel(p.typ) + (isTodo(p.partner) ? '' : ' · ' + p.partner);
  const place = isTodo(p.place) ? p.hint || '' : (p.place as string);

  // B.4 · la barra del hero se reduce a tres campos; la ficha completa vive
  // solo al final (antes se repetían Arquitectura/Interiorismo/Desarrollador/Año).
  const credits: Array<[string, string | null]> = [
    [t('credArchitecture'), displayValue(p.arch)],
    [t('specLocation'), displayValue(p.place)],
    [t('specStatus'), statusLabel(p.sta)]
  ];

  // B.5 · atribución de iluminación. La obra anterior a 2023 se entregó bajo
  // TRAZZO, bajo dirección de Karen. Solo se muestra el rótulo TRAZZO cuando el
  // año es < 2023 (o el flag preTrazzo); con año TODO no se asume nada.
  const yearNum = isTodo(p.year) ? null : parseInt(p.year as string, 10);
  const preTrazzo = p.preTrazzo || (yearNum !== null && yearNum < 2023);
  const lightingCredit = preTrazzo ? t('lightingTrazzo') : t('lightingValue');

  const specs: Array<[string, string | null]> = [
    [t('specTypology'), typologyLabel(p.typ)],
    [t('specLocation'), displayValue(p.place)],
    [t('specArchitecture'), displayValue(p.arch)],
    [t('specInterior'), displayValue(p.interior)],
    [t('specDeveloper'), displayValue(p.dev)],
    [t('credLighting'), lightingCredit],
    [t('specScale'), displayValue(p.scale)],
    [t('specYear'), displayValue(p.year)],
    [t('specStatus'), statusLabel(p.sta)],
    [t('specControl'), null], // TODO fase 2
    [t('specPhotography'), null] // TODO fase 2
  ];

  // B.2 · la bisagra al cierre del concepto (variante EN si el lector es EN).
  const hinge = locale === 'en' ? p.hingeEn ?? p.hinge : p.hinge;

  const conceptSection = (
    <section className="pnarr" key="concept">
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
        {hinge && <p className="hinge">{hinge}</p>}
      </div>
    </section>
  );

  const challengeSection = (
    <section className="pnarr" key="challenge">
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
  );

  // Secuencia elástica: bloques de foto con las dos narrativas intercaladas.
  const seq: ReactNode[] = [];
  blocks.forEach((b, idx) => {
    seq.push(<Block key={`b${idx}`} p={p} block={b} />);
    if (idx === conceptAfter) seq.push(conceptSection);
    if (idx === challengeAfter) seq.push(challengeSection);
    const narrativeHere = idx === conceptAfter || idx === challengeAfter;
    if (idx < blocks.length - 1 && !narrativeHere) {
      const next = blocks[idx + 1];
      const nextInset = next.kind === 'full' && next.variant === 'inset';
      seq.push(
        <div key={`g${idx}`} className={nextInset ? 'gapL' : 'gap'}></div>
      );
    }
  });

  const nxSuffix = isTodo(nx.place) ? '' : ' · ' + nx.place;

  return (
    <div>
      <JsonLd data={creativeWork(p)} />
      <JsonLd data={crumbs} />

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

      {/* 3-11 · GALERÍA ELÁSTICA + narrativa (Concept / Challenge) */}
      {seq}

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

      {/* B.7 · enlaces bidireccionales: tipología → su vertical, estudio → su obra */}
      {(verticalSlug || studioPartner) && (
        <section className="prel">
          {verticalSlug && (
            <Link href={`/servicios/${verticalSlug}`}>
              {typologyLabel(p.typ)} <i>→</i>
            </Link>
          )}
          {studioPartner && (
            <Link
              href={{ pathname: '/proyectos', query: { estudio: studioPartner } }}
            >
              {t('moreFromStudio', { studio: studioPartner })} <i>→</i>
            </Link>
          )}
        </section>
      )}

      {/* 14 · SIGUIENTE PROYECTO — B.9: el placeholder llevaba data-l "Siguiente
          proyecto", que se solapaba con el eyebrow (doble render gris+dorado).
          Ahora el placeholder rotula el proyecto siguiente. */}
      <Link className="pnext" href={`/proyectos/${nx.id}`}>
        <div
          className="ph"
          data-l={isTodo(nx.name) ? nx.hint || 'Proyecto' : (nx.name as string)}
        ></div>
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

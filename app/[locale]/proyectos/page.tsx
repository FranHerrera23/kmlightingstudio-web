import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Masthead from '@/components/Masthead';
import ProjectFilters, { type Filters } from '@/components/ProjectFilters';
import { social, localizedPath } from '@/lib/metadata';
import { TYPOLOGIES, LOCATIONS, STATUSES, FIRMS } from '@/content';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'meta.projects' });
  return social({
    title: t('title'),
    description: t('description'),
    path: localizedPath(locale, '/proyectos')
  });
}

/** Valor de query válido contra la faceta, si no 'all'. */
function pick(list: Array<[string, string]>, v: string | undefined): string {
  return v && list.some(([k]) => k === v) ? v : 'all';
}

export default async function ProjectsPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    typ?: string;
    loc?: string;
    sta?: string;
    estudio?: string;
  }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');

  // Filtro inicial desde el query (redirects del dominio viejo + deep-link de
  // estudio §7). El grid se renderiza en el servidor con el filtro ya aplicado.
  const sp = await props.searchParams;
  // `estudio` se valida contra la lista de estudios (§7): un nombre real, no
  // texto libre. Si no matchea, se ignora.
  const partner = FIRMS.find(([name]) => name === sp.estudio)?.[0];
  const initial: Filters = {
    typ: pick(TYPOLOGIES, sp.typ),
    loc: pick(LOCATIONS, sp.loc),
    sta: pick(STATUSES, sp.sta),
    partner
  };

  return (
    <div>
      <Masthead
        kicker={t('kicker')}
        titleLines={t.raw('titleLines') as string[]}
        lead={t('introLead')}
        note={t('introNote')}
      />
      <section className="sec-s">
        <ProjectFilters initial={initial} />
      </section>
    </div>
  );
}

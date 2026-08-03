import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Masthead from '@/components/Masthead';
import ProjectFilters, { type Filters } from '@/components/ProjectFilters';
import { social, localizedPath } from '@/lib/metadata';
import { TYPOLOGIES, LOCATIONS, STATUSES } from '@/content';

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
  searchParams: Promise<{ typ?: string; loc?: string; sta?: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');

  // Filtro inicial desde el query (redirects del dominio viejo). El grid se
  // renderiza en el servidor con ese filtro ya aplicado → indexable.
  const sp = await props.searchParams;
  const initial: Filters = {
    typ: pick(TYPOLOGIES, sp.typ),
    loc: pick(LOCATIONS, sp.loc),
    sta: pick(STATUSES, sp.sta)
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

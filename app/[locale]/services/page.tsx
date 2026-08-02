import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Masthead from '@/components/Masthead';
import { VERTICALS, PROJECTS } from '@/content';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'meta.services' });
  return { title: t('title'), description: t('description') };
}

export default async function ServicesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('services');

  return (
    <div>
      <Masthead
        kicker={t('kicker')}
        titleLines={t.raw('titleLines') as string[]}
        lead={t('introLead')}
        note={t('introNote')}
      />
      <section className="sec-s">
        <div className="vgrid">
          {VERTICALS.map((v) => {
            const n = PROJECTS.filter((p) => p.typ === v.id).length;
            return (
              <Link className="vcard rise" href={`/services/${v.id}`} key={v.id}>
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
    </div>
  );
}

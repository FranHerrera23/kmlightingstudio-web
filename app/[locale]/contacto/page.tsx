import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Masthead from '@/components/Masthead';
import ContactForm from '@/components/ContactForm';
import { OFFICES } from '@/content';
import { social, localizedPath } from '@/lib/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  return social({
    title: t('title'),
    description: t('description'),
    path: localizedPath(locale, '/contacto')
  });
}

export default async function ContactPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <div>
      <Masthead
        kicker={t('kicker')}
        titleLines={t.raw('titleLines') as string[]}
        lead={t('introLead')}
        note={t('introNote')}
      />
      <section className="sec-s" style={{ paddingBottom: 0 }}>
        <div className="cf-wrap">
          <ContactForm />
        </div>
      </section>
      <section className="sec-s">
        <div
          className="firms"
          style={{ gridTemplateColumns: 'repeat(3,1fr)', marginTop: 0 }}
        >
          {OFFICES.map(([city, tag]) => (
            <div key={city}>
              <div className="nm">{city}</div>
              <div className="ty">{tag || t('officeFallback')}</div>
              <div style={{ marginTop: 16 }}>
                <span
                  className="flag"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase'
                  }}
                >
                  {t('addressPending')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

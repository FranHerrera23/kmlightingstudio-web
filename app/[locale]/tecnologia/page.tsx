import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import MaskLines from '@/components/MaskLines';
import { richTags } from '@/components/rich';
import ProductFilters from '@/components/ProductFilters';
import { social, localizedPath } from '@/lib/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'meta.products' });
  return social({
    title: t('title'),
    description: t('description'),
    path: localizedPath(locale, '/tecnologia')
  });
}

export default async function ProductsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('products');

  return (
    <div>
      {/* B.1 · apertura — lo que se pierde (capa emocional, va primero) */}
      <header className="mast">
        <div className="micro rise">{t('kicker')}</div>
        <h1>
          <MaskLines lines={t.raw('openTitleLines') as string[]} />
        </h1>
        <div className="mast-intro">
          <div className="lead rise d1">
            <p>{t('openBody1')}</p>
            <p style={{ marginTop: 14 }}>{t('openBody2')}</p>
          </div>
          <div className="note rise d2">{t('openBody3')}</div>
        </div>
      </header>

      {/* B.2 · declaración de independencia comercial + nota operativa */}
      <section className="indep sec-s">
        <h2 className="indep-t">{t('indepTitle')}</h2>
        <p className="indep-b">{t('indepBody')}</p>
        <p className="indep-note">{t('introNote')}</p>
      </section>

      {/* B.4 · la grilla — el titular baja a rótulo de sección (--t2); la única
          cursiva de la página va en la bajada ('pensó' / 'intended') */}
      <section className="sec-s" style={{ paddingTop: 0 }}>
        <div className="shead">
          <div>
            <h2 className="sm">
              <MaskLines lines={t.raw('titleLines') as string[]} />
            </h2>
          </div>
          <div className="side">
            <p className="lead rise d1">{t.rich('introLead', richTags)}</p>
          </div>
        </div>
        <div style={{ marginTop: 'clamp(40px,6vh,80px)' }}>
          <ProductFilters />
        </div>
      </section>
    </div>
  );
}

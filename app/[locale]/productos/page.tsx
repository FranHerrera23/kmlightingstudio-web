import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Masthead from '@/components/Masthead';
import BuildNote from '@/components/BuildNote';
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
    path: localizedPath(locale, '/productos')
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
      <Masthead
        kicker={t('kicker')}
        titleLines={t.raw('titleLines') as string[]}
        lead={t('introLead')}
        note={t('introNote')}
      >
        <BuildNote
          title="Decisión abierta · TRAZZO vs KMLS"
          style={{ marginTop: 'clamp(28px,4vh,44px)' }}
        >
          Si son dos marcas, un catálogo con códigos de parte pertenece a TRAZZO.
          Esta sección está armada como &laquo;qué especificamos y por qué&raquo;
          — sin SKUs ni precios — para que funcione bajo KMLS. Los campos técnicos
          quedan en TODO hasta que TRAZZO entregue los datos.
        </BuildNote>
      </Masthead>

      <section className="sec-s">
        <ProductFilters />
      </section>
    </div>
  );
}

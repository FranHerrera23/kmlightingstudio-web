import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { CONTENT_LOCALES } from '@/i18n/routing';
import ContentHub, { contentMeta } from '@/components/ContentHub';

// Ruta real e indexable del tab "conversaciones" (brief 05 §A.1). Reemplaza a
// /contenido?tab=conversaciones, que llega por 301 desde next.config.
export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  return contentMeta(locale, 'conversaciones');
}

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!(CONTENT_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  return <ContentHub active="conversaciones" />;
}

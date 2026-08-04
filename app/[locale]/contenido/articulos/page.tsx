import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { CONTENT_LOCALES } from '@/i18n/routing';
import ContentHub, { contentMeta } from '@/components/ContentHub';

// Listado completo de artículos (brief 06 §6). El hub /contenido lo muestra
// completo también, pero esta ruta tiene su canonical propio.
export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  return contentMeta(locale, 'articulos');
}

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!(CONTENT_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  return <ContentHub view="articulos" />;
}

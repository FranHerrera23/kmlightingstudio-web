import '../globals.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import {
  setRequestLocale,
  getTranslations,
  getMessages
} from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/content';
import { social, localizedPath } from '@/lib/metadata';
import { organizationGraph } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import ScrollProgress from '@/components/ScrollProgress';
import Buildbar from '@/components/Buildbar';
import Nav from '@/components/Nav';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// v2: Archivo para todo, Fraunces solo italic 300 (la cursiva es acento, una por página).
const FONTS =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Fraunces:ital,opsz,wght@1,9..144,300&display=swap';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  // Home + default. Cada página hija setea su propio social() (openGraph se
  // reemplaza por completo en el hijo, no se hereda campo por campo).
  return {
    metadataBase: new URL(SITE_URL),
    ...social({
      title: t('title'),
      description: t('description'),
      path: localizedPath(locale, '/')
    })
  };
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link href={FONTS} rel="stylesheet" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <JsonLd data={organizationGraph()} />
          <ScrollProgress />
          <Buildbar />
          <Nav />
          <main>{props.children}</main>
          <CTA />
          <Footer />
          <Reveal />
        </NextIntlClientProvider>
        {/* Sin cookies, sin banner de consentimiento — Vercel Analytics no las
            usa. Speed Insights vigila el LCP cuando entren las fotos reales. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

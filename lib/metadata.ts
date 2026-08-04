import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/content';

/** Imagen por defecto del estudio (tarjeta de marca 1200×630). */
export const DEFAULT_OG = `${SITE_URL}/og`;

/** Ruta con prefijo de idioma (EN sin prefijo) para canonical / og:url. */
export function localizedPath(locale: string, path: string): string {
  const clean = path === '/' ? '' : path;
  // brief 06 §1 · ES es el locale por defecto y va SIN prefijo (es lo que sirve
  // el sitio). EN/PT/RU van prefijados. Antes estaba invertido y el canonical
  // apuntaba a /es/... — una URL que no existe.
  return locale === 'es' ? clean || '/' : `/${locale}${clean}`;
}

/** Forma base (ES, sin prefijo) a partir de una ruta ya localizada — para hreflang. */
function basePath(localized: string): string {
  const m = localized.match(/^\/(en|pt|ru)(?=\/|$)/);
  const base = m ? localized.slice(m[0].length) : localized;
  return base === '' ? '/' : base;
}

/** URL de OG image para un proyecto: primera foto recortada a 1200×630. */
export function projectOg(opts: {
  title: string;
  eyebrow: string;
  photo?: string | null;
}): string {
  const q = new URLSearchParams({ t: opts.title, k: opts.eyebrow });
  if (opts.photo) q.set('img', opts.photo);
  return `${SITE_URL}/og?${q.toString()}`;
}

/**
 * Metadata social completa para una página. Open Graph (lo que lee LinkedIn,
 * el canal principal del estudio) + twitter:card summary_large_image como
 * fallback (lo que leen Slack y WhatsApp — no requiere cuenta en Twitter).
 * Título y descripción SIEMPRE específicos por página, nunca genéricos.
 * La OG image siempre es 1200×630 (ver /og).
 */
export function social(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = `${SITE_URL}${opts.path === '/' ? '' : opts.path}`;
  const image = opts.image || DEFAULT_OG;
  const { title, description } = opts;

  // hreflang (brief 06 §1 step 3): es sin prefijo, en con /en/, x-default → es.
  // PT/RU son interfaz (fase 2), no entran como alternativas indexables.
  const base = basePath(opts.path);
  const baseClean = base === '/' ? '' : base;
  const languages = {
    es: `${SITE_URL}${baseClean}`,
    en: `${SITE_URL}/en${baseClean}`,
    'x-default': `${SITE_URL}${baseClean}`
  };

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: opts.type || 'website',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  };
}

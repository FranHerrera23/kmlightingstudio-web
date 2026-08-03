import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/content';

/** Imagen por defecto del estudio (tarjeta de marca 1200×630). */
export const DEFAULT_OG = `${SITE_URL}/og`;

/** Ruta con prefijo de idioma (EN sin prefijo) para canonical / og:url. */
export function localizedPath(locale: string, path: string): string {
  const clean = path === '/' ? '' : path;
  return locale === 'en' ? clean || '/' : `/${locale}${clean}`;
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
  const url = `${SITE_URL}${opts.path}`;
  const image = opts.image || DEFAULT_OG;
  const { title, description } = opts;

  return {
    title,
    description,
    alternates: { canonical: url },
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

import { defineRouting } from 'next-intl/routing';

/**
 * i18n para KMLS · v3 — ESPAÑOL principal.
 *
 *  - ES es el idioma por defecto y va SIN prefijo:  /, /projects, /about ...
 *  - EN va prefijado:  /en/...  (catálogo completo en inglés).
 *  - PT / RU van prefijados con los catálogos vacíos (fase 2).
 *  - El hub editorial vive en /contenido (segmento único para todos los
 *    locales). Es contenido editorial solo ES/EN: /pt/contenido y /ru/contenido
 *    devuelven 404 (guard en la página). PT/RU son idiomas de interfaz.
 *
 * Nota: el segmento es /contenido en todos los locales (no /content para EN)
 * para no forzar el `pathnames` de next-intl, que rompería el tipado de todos
 * los <Link> a rutas dinámicas. El label del nav sí cambia (Contenido/Content).
 */
export const routing = defineRouting({
  locales: ['es', 'en', 'pt', 'ru'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  // El sitio abre SIEMPRE en español en la raíz (acceptance): sin auto-redirect
  // por Accept-Language. El inglés es opt-in (switcher / prefijo /en).
  localeDetection: false
});

export type Locale = (typeof routing.locales)[number];

/** Idiomas con contenido editorial. PT/RU son solo interfaz → /contenido 404. */
export const CONTENT_LOCALES = ['es', 'en'] as const;

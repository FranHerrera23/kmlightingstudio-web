import { defineRouting } from 'next-intl/routing';

/**
 * i18n para KMLS.
 *
 *  - EN es el idioma por defecto y va SIN prefijo:  /, /projects, /about ...
 *  - ES / PT / RU van prefijados:  /es/..., /pt/..., /ru/...
 *    Los catálogos de esos idiomas existen pero están vacíos (fase 2).
 *  - El Journal queda FUERA de este sistema: solo existe /journal (EN).
 *    Ver app/[locale]/journal/page.tsx — cualquier /es|pt|ru/journal → 404.
 */
export const routing = defineRouting({
  locales: ['en', 'es', 'pt', 'ru'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];

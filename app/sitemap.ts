import type { MetadataRoute } from 'next';
import {
  SITE_URL,
  PROJECTS,
  VERTICALS,
  FIX,
  ARTICLES,
  isIndexable,
  isArticleReady
} from '@/content';

/**
 * Sitemap dinámico.
 *
 *  - Solo EN (locale por defecto, sin prefijo). ES/PT/RU están vacíos en fase 1
 *    y no se indexan hasta que tengan traducción — así no se genera duplicado.
 *  - Los proyectos con campos TODO esenciales (nombre/concepto) se FILTRAN:
 *    la página existe pero va noindex y no entra al sitemap.
 *  - El Journal (EN-only) sí entra.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    '',
    '/projects',
    '/services',
    '/products',
    '/about',
    '/contact',
    '/contenido'
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7
  }));

  // Verticales — todas tienen contenido real.
  for (const v of VERTICALS) {
    entries.push({
      url: `${SITE_URL}/services/${v.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    });
  }

  // Proyectos — solo los que tienen contenido suficiente (sin TODO esencial).
  for (const p of PROJECTS.filter(isIndexable)) {
    entries.push({
      url: `${SITE_URL}/projects/${p.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    });
  }

  // Productos — todas las luminarias tienen name/family/blurb reales.
  for (const f of FIX) {
    entries.push({
      url: `${SITE_URL}/products/${f.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    });
  }

  // Journal — solo artículos con contenido real (answer escrito). Los seeds
  // en TODO quedan afuera hasta que se redacten. (EN-only, sin alternates.)
  for (const a of ARTICLES.filter(isArticleReady)) {
    entries.push({
      url: `${SITE_URL}/contenido/${a.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    });
  }

  return entries;
}

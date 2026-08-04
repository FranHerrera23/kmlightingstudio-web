import type { MetadataRoute } from 'next';
import {
  SITE_URL,
  PROJECTS,
  VERTICALS,
  FIX,
  ARTICLES,
  allVideos,
  isIndexable,
  isArticleReady,
  isVideoReady,
  verticalHasDato
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
    '/proyectos',
    '/servicios',
    '/tecnologia',
    '/estudio',
    '/contacto',
    // Hub editorial: el índice (= Artículos) y las tres pestañas en ruta real
    // (brief 05 §A.1). Cada una tiene canonical propio.
    '/contenido',
    '/contenido/articulos',
    '/contenido/conversaciones',
    '/contenido/recorridos',
    '/contenido/prensa'
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7
  }));

  // Verticales — solo las que no tienen `[DATO]` sin confirmar en su narrativa
  // (las que sí lo tienen van noindex hasta que Karen complete el dato).
  for (const v of VERTICALS.filter((v) => !verticalHasDato(v))) {
    entries.push({
      url: `${SITE_URL}/servicios/${v.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    });
  }

  // Proyectos — solo los que tienen contenido suficiente (sin TODO esencial).
  for (const p of PROJECTS.filter(isIndexable)) {
    entries.push({
      url: `${SITE_URL}/proyectos/${p.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    });
  }

  // Productos — todas las luminarias tienen name/family/blurb reales.
  for (const f of FIX) {
    entries.push({
      url: `${SITE_URL}/tecnologia/${f.id}`,
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

  // Videos con transcripción escrita (el texto es lo indexable). Seeds → afuera.
  for (const v of allVideos().filter(isVideoReady)) {
    entries.push({
      url: `${SITE_URL}/contenido/${v.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    });
  }

  return entries;
}

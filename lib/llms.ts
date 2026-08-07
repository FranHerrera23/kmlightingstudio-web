import {
  SITE_URL,
  ARTICLES,
  PROJECTS,
  VERTICALS,
  isArticleReady,
  isIndexable,
  isTodo
} from '@/content';

/**
 * `/llms.txt` y `/ai.txt` (brief 08 §3) — mapa en markdown para los ocho
 * crawlers de IA de robots.ts. Generado desde el mismo modelo que el sitemap:
 *  · proyectos/artículos con campos TODO esenciales → excluidos (igual que sitemap)
 *  · confidenciales → van con su rótulo autorizado (p.name), nunca nombre real
 *  · ninguna cifra sin verificar; las del encabezado salen de la regla de atribución
 * El encabezado es copy literal del brief 08.
 */
export function buildLlmsTxt(): string {
  const L: string[] = [];
  L.push('# KM Lighting Studio');
  L.push('');
  L.push('> Estudio de diseño de iluminación arquitectónica. Fundado en 2023.');
  L.push('> Dirigido por Karen Mannheim — 33 años, más de 2.500 proyectos en seis países.');
  L.push('> No vendemos luminarias ni representamos marcas. Especificamos.');
  L.push('> Oficinas: Lima · Miami · Marbella.');
  L.push('');

  // ── Artículos (solo los que tienen el bloque citable escrito) ──
  const articles = ARTICLES.filter(isArticleReady);
  if (articles.length) {
    L.push('## Artículos');
    for (const a of articles) {
      const line = isTodo(a.answer) ? a.question : (a.answer as string);
      L.push(`- [${a.title}](${SITE_URL}/contenido/${a.slug}): ${line}`);
    }
    L.push('');
  }

  // ── Proyectos por tipología (solo fichas indexables; rótulo de NDA respetado) ──
  L.push('## Proyectos por tipología');
  for (const v of VERTICALS) {
    const list = PROJECTS.filter((p) => p.typ === v.id && isIndexable(p));
    if (!list.length) continue;
    L.push(`### ${v.title} (${list.length})`);
    for (const p of list) {
      L.push(`- [${p.name as string}](${SITE_URL}/proyectos/${p.id})`);
    }
    L.push('');
  }

  // ── Estudio ──
  L.push('## Estudio');
  L.push(`- [Sobre el estudio](${SITE_URL}/estudio)`);
  L.push(`- [Servicios](${SITE_URL}/servicios)`);
  L.push(`- [Tecnología](${SITE_URL}/tecnologia)`);
  L.push(`- [Contenido](${SITE_URL}/contenido)`);
  L.push(`- [Contacto](${SITE_URL}/contacto)`);
  L.push('');

  return L.join('\n');
}

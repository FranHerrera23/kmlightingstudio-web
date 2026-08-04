/**
 * Redirects 301 del dominio viejo (karenmannheim.com) a las rutas nuevas.
 * Un 301 global pierde casi toda la autoridad acumulada; el mapeo por página la
 * conserva. Completá este archivo sin tocar next.config.
 *
 * Los `.html` quedan fuera del middleware de i18n (matcher excluye extensiones),
 * así que estos redirects los maneja next.config directamente.
 */
export interface LegacyRedirect {
  source: string;
  destination: string;
}

export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  // Rename interno /productos → /tecnologia (§2.1). 301 real (no 308).
  { source: '/productos', destination: '/tecnologia' },
  { source: '/productos/:slug', destination: '/tecnologia/:slug' },

  // Slug del artículo 1 a español (brief 04 §B.3): el inglés contradecía la
  // decisión de segmentos en español. 301 desde el slug viejo (es y /en).
  {
    source: '/contenido/what-lighting-costs-per-square-metre',
    destination: '/contenido/cuanto-cuesta-un-proyecto-de-iluminacion'
  },
  {
    source: '/en/contenido/what-lighting-costs-per-square-metre',
    destination: '/en/contenido/cuanto-cuesta-un-proyecto-de-iluminacion'
  },
  // Slugs artículos 2 y 3 a español (brief 06 §5), con 301 (es y /en).
  {
    source: '/contenido/lighting-designer-or-electrician',
    destination: '/contenido/disenador-de-iluminacion-o-electricista'
  },
  {
    source: '/en/contenido/lighting-designer-or-electrician',
    destination: '/en/contenido/disenador-de-iluminacion-o-electricista'
  },
  {
    source: '/contenido/why-exterior-lighting-fails-in-florida',
    destination: '/contenido/por-que-falla-la-iluminacion-exterior-en-florida'
  },
  {
    source: '/en/contenido/why-exterior-lighting-fails-in-florida',
    destination: '/en/contenido/por-que-falla-la-iluminacion-exterior-en-florida'
  },

  // Índices y filtros (el valor del filtro es la clave de taxonomía, en inglés)
  { source: '/project.html', destination: '/proyectos' },
  { source: '/projectBaseResidential.html', destination: '/proyectos?typ=residences' },
  { source: '/projectBaseHospitality.html', destination: '/proyectos?typ=hospitality' },
  { source: '/projectBaseInProgress.html', destination: '/proyectos?sta=progress' },

  // Fichas confirmadas
  { source: '/projectR1.html', destination: '/proyectos/pezet1' },
  { source: '/projectR4.html', destination: '/proyectos/pezet2' },
  { source: '/projectR5.html', destination: '/proyectos/blascerdena' },
  { source: '/projectR6.html', destination: '/proyectos/poseidon' },
  { source: '/projectR9.html', destination: '/proyectos/skyparadise' },
  { source: '/projectR16.html', destination: '/proyectos/mediterranean' },
  { source: '/projectR18.html', destination: '/proyectos/fourseasons' },
  { source: '/projectIN1.html', destination: '/proyectos/pezet3' },
  { source: '/projectIN4.html', destination: '/proyectos/porsche' },
  { source: '/projectIN5.html', destination: '/proyectos/fisher' },
  { source: '/projectH1.html', destination: '/proyectos/osaka' },
  { source: '/projectH2.html', destination: '/proyectos/carnaval' },
  { source: '/projectH3.html', destination: '/proyectos/maserati' },
  { source: '/projectH4.html', destination: '/proyectos/pescados' },
  { source: '/projectH5.html', destination: '/proyectos/roosevelt' }
];

/**
 * Cualquier otra ficha vieja `projectXX.html` sin destino claro → /proyectos
 * (el usuario buscaba un proyecto, no la home). Va DESPUÉS de las específicas.
 */
export const LEGACY_FALLBACK: LegacyRedirect = {
  source: '/:name(project[^.]+).html',
  destination: '/proyectos'
};

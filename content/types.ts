/* ═══════════════════════════════════════════════════════════════════
   DATA LAYER · v2 — tipos y sentinela TODO
   Portado del bloque DATA LAYER de la maqueta v2. Estructura cerrada.
   FASE 2: reemplazar valores TODO, no tocar la forma.
   ═══════════════════════════════════════════════════════════════════ */

/** Sentinela de campo pendiente. Se renderiza visible (rojo/.flag) y se
 *  excluye del sitemap. NUNCA inventar un valor para reemplazarlo. */
export const TODO = '__TODO__' as const;

export type Todoable<T> = T | typeof TODO;

export type TypologyKey =
  | 'all' | 'multifamily' | 'residences' | 'hospitality'
  | 'commercial' | 'cultural' | 'aviation' | 'yachts';

export type LocationKey =
  | 'all' | 'peru' | 'usa' | 'spain'
  | 'middle-east' | 'caribbean' | 'confidential';

export type StatusKey = 'all' | 'completed' | 'progress' | 'concept';

/**
 * Ratio de foto. TODAS las fotos son horizontales o cuadradas — nunca
 * panorámicas. El ratio vive en los datos (no en el CSS caso por caso):
 * el contenedor reserva el espacio antes de que cargue la imagen, así el
 * CLS no se rompe con 34 proyectos × ~10 fotos.
 */
export type Ratio = '4:3' | '3:2' | '1:1';

export interface Photo {
  /** Ratio del contenedor — reserva el alto antes de cargar (anti-CLS). */
  ratio: Ratio;
  /** Etiqueta interna del slot (fase 1) — p. ej. "01 · Fachada". */
  caption: string;
}

export interface Project {
  id: string;
  /**
   * Carpeta de assets si NO coincide con el id. Los ids de la v2 no siempre
   * calzan con las carpetas del repo de Arvida; cuando no está, cae al id.
   * Ver assetDirOf(). Se completa/verifica contra el host de assets.
   */
  assetDir?: string;
  typ: Exclude<TypologyKey, 'all'>;
  loc: Exclude<LocationKey, 'all'>;
  sta: Exclude<StatusKey, 'all'>;
  /** Cantidad de fotos reales disponibles hoy (0 = solo placeholders). */
  ph: number;
  name: Todoable<string>;
  /** Pista interna para los proyectos que Karen tiene que renombrar. */
  hint?: string;
  partner: Todoable<string>;
  place: Todoable<string>;
  /** Créditos (barra oscura arriba del primer scroll). */
  arch: Todoable<string>;
  dev: Todoable<string>;
  interior: Todoable<string>;
  year: Todoable<string>;
  scale: Todoable<string>;
  concept: Todoable<string>;
  challenge: Todoable<string>;
  /**
   * Secuencia de fotos con su ratio. Fase 1: usa el molde por defecto
   * (ver DEFAULT_GALLERY). Fase 2: cada proyecto trae su propia lista.
   */
  photos?: Photo[];
}

export interface Vertical {
  id: Exclude<TypologyKey, 'all'>;
  title: string;
  sub: string;
  intro: string;
  narr: Record<1 | 2 | 3, string>;
}

export interface ScopeStage {
  n: number;
  title: string;
  delivery: string;
  steps: Array<[index: string, title: string, items: string[]]>;
}

/**
 * Luminaria. Misma arquitectura que Project: tiene id (→ /products/[slug]),
 * campos vitrina (family/name/diameter/blurb/draw) y campos técnicos que
 * quedan TODO hasta que TRAZZO entregue los datos reales. Sin precios.
 */
export interface Fixture {
  id: string;
  /** Familia — se usa como faceta de filtro (valores únicos) y como label. */
  family: string;
  name: string;
  diameter: string;
  blurb: string;
  /** Clave del dibujo técnico (elevación) en DRAW. */
  draw: string;
  /** Ficha técnica: filas [label, valor]. TODO hasta TRAZZO. */
  specs: Todoable<Array<[label: string, value: string]>>;
  /** Descargables: {label, href} — IES, spec sheet, dwg. TODO hasta TRAZZO. */
  downloads: Todoable<Array<{ label: string; href: string }>>;
  accessories: Todoable<string[]>;
  finishes: Todoable<string[]>;
  optics: Todoable<string[]>;
  /** Temperaturas de color disponibles (2700K, 3000K, warm-dim…). */
  cct: Todoable<string[]>;
}

/* ── Journal · molde AEO ── */
export interface FaqItem {
  q: string;
  a: Todoable<string>;
}
export interface ArticleSection {
  /** Subheader = una afirmación, no una etiqueta. */
  heading: Todoable<string>;
  body: Todoable<string>;
}
export interface ComparisonTable {
  caption: Todoable<string>;
  headers: string[];
  rows: string[][];
}
export interface Article {
  slug: string;
  title: string;
  /** La pregunta que responde (search / AI). */
  question: string;
  tag: string;
  author: string;
  /** Credenciales del autor para el bloque de autor + JSON-LD. */
  credentials: Todoable<string>;
  reviewedBy: string;
  read: Todoable<string>;
  published: Todoable<string>;
  /** Answer capsule — 2 a 3 frases autocontenidas. El bloque que la IA levanta. */
  answer: Todoable<string>;
  takeaways: Todoable<string[]>;
  /** Cuerpo en secciones con subheaders-afirmación. */
  sections: ArticleSection[];
  table: Todoable<ComparisonTable>;
  faq: FaqItem[];
}

/** Oficina: [ciudad, etiqueta, timezone]. La dirección se confirma en fase 2. */
export type Office = [city: string, tag: string, tz: string];

/** Firma: [nombre, descriptor]. */
export type Firm = [name: string, descriptor: string];

/** Miembro del equipo: [nombre, rol]. */
export type TeamMember = [name: string, role: string];

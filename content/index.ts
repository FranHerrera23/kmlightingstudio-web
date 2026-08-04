/* ═══════════════════════════════════════════════════════════════════
   DATA LAYER · v2 — barrel + helpers de render
   ═══════════════════════════════════════════════════════════════════ */
import { TODO, type Project, type Todoable, type Photo, type Ratio } from './types';
import { TYPOLOGIES, LOCATIONS, STATUSES } from './taxonomy';
import { PROJECTS, DEFAULT_GALLERY } from './projects';
import { FIX } from './products';
import { ARTICLES } from './articles';
import { CONVERSACIONES } from './conversaciones';
import { RECORRIDOS } from './recorridos';
import { ASSET } from './site';
import type { Fixture, Article, Video } from './types';

export * from './types';
export * from './taxonomy';
export * from './projects';
export * from './gallery';
export * from './verticals';
export * from './scope';
export * from './studio';
export * from './products';
export * from './articles';
export * from './conversaciones';
export * from './recorridos';
export * from './prensa';
export * from './site';

/** ¿El campo está pendiente (TODO / undefined / null)? */
export function isTodo(v: unknown): v is typeof TODO | undefined | null {
  return v === TODO || v === undefined || v === null;
}

/** Etiqueta legible de una clave de taxonomía. */
export function label(list: Array<[string, string]>, k: string): string {
  return (list.find((x) => x[0] === k) || [, k])[1] as string;
}
export const typologyLabel = (k: string) => label(TYPOLOGIES, k);
export const locationLabel = (k: string) => label(LOCATIONS, k);
export const statusLabel = (k: string) => label(STATUSES, k);

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

/**
 * Carpeta de assets del proyecto (assetDir si está, si no el id).
 *
 * ⚠️ NDA — NUNCA setees assetDir en un proyecto confidencial (athlete,
 * musician, arvida). El valor termina en la URL de la imagen
 * (`/assets/<carpeta>/1.jpg`), que es visible en el HTML renderizado y en la
 * pestaña de red del navegador. Poner ahí el nombre real del cliente ES
 * incumplimiento de NDA, AUNQUE nunca se muestre en pantalla.
 *
 * Por eso los confidenciales quedan id-based aunque hoy las fotos vivan bajo
 * carpetas con nombre de cliente en el repo de Arvida: se renombran esas
 * carpetas en origen (fase 2), no se mapean acá. Si alguien "arregla" el 404
 * mapeando la carpeta original, está filtrando al cliente — de ahí este aviso.
 */
export function assetDirOf(p: Project): string {
  return p.assetDir ?? p.id;
}

/** URL de una foto: `${ASSET}/${assetDir}/${n}.jpg`. */
export function photoUrl(p: Project, n: number): string {
  return `${ASSET}/${assetDirOf(p)}/${n}.jpg`;
}

/** Siguiente proyecto en la lista (para el bloque "Next project"). */
export function nextProject(id: string): Project {
  const i = PROJECTS.findIndex((p) => p.id === id);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

/**
 * Galería de un proyecto. El ratio vive en los datos (Photo.ratio) para que
 * el contenedor reserve el alto antes de cargar la imagen (anti-CLS).
 * Fase 1: molde por defecto. Fase 2: cada proyecto trae su propia lista.
 */
export function galleryOf(p: Project): Photo[] {
  return p.photos ?? DEFAULT_GALLERY;
}

/** Ratio ('4:3') → clase CSS ('r43'). El CSS ya reserva el aspect-ratio. */
export function ratioClass(r: Ratio): 'r43' | 'r32' | 'r11' {
  return r === '4:3' ? 'r43' : r === '3:2' ? 'r32' : 'r11';
}

/**
 * ¿El proyecto tiene contenido real suficiente para indexarse?
 * Regla del sitemap: excluye lo que tenga nombre o concepto en TODO.
 * La página existe igual (para el grid) pero va noindex.
 */
export function isIndexable(p: Project): boolean {
  return !isTodo(p.name) && !isTodo(p.concept);
}

/** Valor real o null (para mostrar "Por confirmar" en fase 1). */
export function displayValue<T>(v: Todoable<T>): T | null {
  return isTodo(v) ? null : (v as T);
}

/* ── Products ── */
export function getFixture(id: string): Fixture | undefined {
  return FIX.find((f) => f.id === id);
}
/** Familias únicas, en orden de aparición — para la faceta de filtro. */
export function fixtureFamilies(): string[] {
  return [...new Set(FIX.map((f) => f.family))];
}

/* ── Verticales ── */
/** ¿La narrativa de la vertical tiene algún `[DATO — …]` sin completar?
 *  Si sí, la página va noindex y fuera del sitemap hasta que Karen lo dé. */
export function verticalHasDato(v: { story: string[] }): boolean {
  return v.story.some((s) => s.includes('[DATO'));
}

/* ── Journal ── */
export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
/** ¿El artículo tiene contenido real? Regla del sitemap/noindex: necesita al
 *  menos el answer capsule escrito. Los seeds (todo TODO) van noindex. */
export function isArticleReady(a: Article): boolean {
  return !isTodo(a.answer);
}

/* ── Contenido · Videos ── */
export function allVideos(): Video[] {
  return [...CONVERSACIONES, ...RECORRIDOS];
}
export function getVideo(id: string): Video | undefined {
  return allVideos().find((v) => v.id === id);
}
/** ¿El video tiene contenido real? Necesita título + transcripción (el texto
 *  es lo que se indexa). Los seeds (todo TODO) van noindex. */
export function isVideoReady(v: Video): boolean {
  return !isTodo(v.title) && !isTodo(v.transcript);
}
/** Un item de /contenido/[slug] es un artículo o un video. */
export function getContentItem(
  slug: string
): { type: 'article'; article: Article } | { type: 'video'; video: Video } | null {
  const a = getArticle(slug);
  if (a) return { type: 'article', article: a };
  const v = getVideo(slug);
  if (v) return { type: 'video', video: v };
  return null;
}

import type { Photo, Ratio } from './types';

/* ═══════════════════════════════════════════════════════════════════
   GALERÍA ELÁSTICA
   El molde absorbe entre 6 y 16 fotos (o más) sin romperse ni pedir un
   layout propio por proyecto:
    · menos fotos que el molde → se colapsan los bloques que sobran (el loop
      simplemente termina; un dúo con una sola foto restante cae a full-bleed).
    · más fotos que el molde → se repite el patrón de compases.
   El RATIO de cada foto vive en los datos (Photo.ratio); acá solo se decide
   el ritmo de anchos (full-bleed / con márgenes / dúo asimétrico / inset).
   ═══════════════════════════════════════════════════════════════════ */

export interface Shot {
  /** Número de archivo (1-based): `${id}/${n}.jpg`. */
  n: number;
  ratio: Ratio;
  caption: string;
}
export interface FullBlock {
  kind: 'full';
  variant: 'plain' | 'wide' | 'inset';
  shot: Shot;
}
export interface DuoBlock {
  kind: 'duo';
  variant: 'a' | 'b' | 'even';
  shots: [Shot, Shot];
}
export type GalleryBlock = FullBlock | DuoBlock;

/**
 * Un compás = 7 plantillas de bloque (full/dúo alternados) que consumen 10
 * fotos. Es el ritmo aprobado de la maqueta. Se repite para galerías largas.
 */
const COMPAS: Array<{ kind: 'full' | 'duo'; variant: string }> = [
  { kind: 'full', variant: 'plain' }, // 01 · fachada, borde a borde
  { kind: 'duo', variant: 'a' }, //     02-03 · par asimétrico
  { kind: 'full', variant: 'wide' }, //  04 · sala, con márgenes
  { kind: 'duo', variant: 'b' }, //      05-06 · par invertido
  { kind: 'full', variant: 'plain' }, // 07 · segundo ambiente
  { kind: 'duo', variant: 'even' }, //   08-09 · par simétrico
  { kind: 'full', variant: 'inset' } //  10 · cierre, con aire
];

export function buildGallery(photos: Photo[]): GalleryBlock[] {
  const blocks: GalleryBlock[] = [];
  const shot = (i: number): Shot => ({
    n: i + 1,
    ratio: photos[i].ratio,
    caption: photos[i].caption
  });

  let i = 0;
  let c = 0;
  while (i < photos.length) {
    const tpl = COMPAS[c % COMPAS.length];
    if (tpl.kind === 'duo' && i + 1 < photos.length) {
      blocks.push({
        kind: 'duo',
        variant: tpl.variant as DuoBlock['variant'],
        shots: [shot(i), shot(i + 1)]
      });
      i += 2;
    } else {
      // full, o un dúo con una sola foto restante → colapsa a full-bleed
      const variant = (
        tpl.kind === 'full' ? tpl.variant : 'plain'
      ) as FullBlock['variant'];
      blocks.push({ kind: 'full', variant, shot: shot(i) });
      i += 1;
    }
    c++;
  }
  return blocks;
}

/**
 * Dónde caen las dos secciones de narrativa (Concept / Challenge) dentro de la
 * secuencia de bloques, para que se acomoden a cualquier cantidad de fotos:
 * Concept después del 1er bloque; Challenge alrededor de la mitad.
 */
export function narrativeAnchors(blockCount: number) {
  return {
    conceptAfter: 0,
    challengeAfter: Math.min(
      Math.max(blockCount - 1, 0),
      Math.max(1, Math.floor(blockCount / 2))
    )
  };
}

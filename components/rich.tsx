import type { ReactNode } from 'react';

/**
 * Mapa de tags para next-intl `t.rich(...)`.
 * Los mensajes usan tags mínimos que replican la maqueta:
 *   <it>…</it>       → cursiva serif bronce (.it)
 *   <strong>…</strong> → negrita
 *   <hl>…</hl>       → strong resaltado en bronce claro
 *   <br></br>        → salto de línea
 * Se pasa el mapa completo siempre, así t.rich nunca falla por un tag faltante.
 */
export const richTags = {
  it: (chunks: ReactNode) => <span className="it">{chunks}</span>,
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
  hl: (chunks: ReactNode) => (
    <strong style={{ color: 'var(--gold-lt)' }}>{chunks}</strong>
  ),
  br: () => <br />
};

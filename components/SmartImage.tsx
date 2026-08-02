'use client';

import { useState } from 'react';

/**
 * <img> que se oculta si la foto no existe (404), dejando ver el placeholder
 * `.ph` que va detrás. Replica el `onerror="this.remove()"` de la maqueta.
 * El alto lo reserva el contenedor por aspect-ratio (dato), así que aunque la
 * imagen falle o tarde, el layout no salta (anti-CLS).
 *
 * FASE 6 (performance): migrar a next/image con sizes + blurDataURL cuando los
 * assets vivan en /public. Hoy son placeholders en un host externo.
 */
export default function SmartImage({
  src,
  alt = '',
  cover = false
}: {
  src: string;
  alt?: string;
  /** Rellena el contenedor (position:absolute inset:0) — para .iw/.full/figure. */
  cover?: boolean;
}) {
  const [broken, setBroken] = useState(false);
  if (broken) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setBroken(true)}
      style={cover ? { position: 'absolute', inset: 0, zIndex: 1 } : undefined}
    />
  );
}

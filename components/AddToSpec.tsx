'use client';

import { useState } from 'react';

/**
 * "Add to spec sheet" — la única acción de Products. SIN precios ni carrito.
 * En fase 1 es solo UI (no persiste). Fase 2+ puede engancharlo a una spec
 * sheet real del especificador.
 */
export default function AddToSpec({
  label,
  added
}: {
  label: string;
  added: string;
}) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className={`spec-btn${on ? ' on' : ''}`}
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
    >
      {on ? `✓ ${added}` : label}
    </button>
  );
}

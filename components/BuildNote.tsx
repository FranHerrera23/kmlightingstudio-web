import type { ReactNode } from 'react';

/**
 * Nota de build (.bn) — andamiaje interno en español, fuera del catálogo i18n.
 * Marca decisiones abiertas / material de fase 2. Se borra cuando se cierra.
 */
export default function BuildNote({
  title,
  children,
  style
}: {
  title: string;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="bn" style={style}>
      <b>{title}</b>
      {children}
    </div>
  );
}

import type { ReactNode } from 'react';
import MaskLines from './MaskLines';

/**
 * Masthead de páginas internas · v2 (.mast). Kicker micro, h1 enmascarado,
 * y un pie de dos columnas (lead + nota). `children` cuelga después del pie
 * (p. ej. la nota de build de Products).
 */
export default function Masthead({
  kicker,
  titleLines,
  lead,
  note,
  children
}: {
  kicker: string;
  titleLines: string[];
  lead: string;
  note: string;
  children?: ReactNode;
}) {
  return (
    <header className="mast">
      <div className="micro rise">{kicker}</div>
      <h1>
        <MaskLines lines={titleLines} />
      </h1>
      <div className="mast-intro">
        <p className="lead rise d1">{lead}</p>
        <div className="note rise d2">{note}</div>
      </div>
      {children}
    </header>
  );
}

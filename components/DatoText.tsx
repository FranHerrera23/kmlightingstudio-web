import { Fragment } from 'react';

/**
 * Renderiza un párrafo de la narrativa de vertical (A.4, brief 02). Los
 * marcadores `[DATO — …]` que Karen todavía no confirmó se pintan en rojo
 * (`.flag`, mismo patrón que TODO); el texto que los rodea se publica normal.
 * La página con algún `[DATO]` va noindex y fuera del sitemap vía
 * `verticalHasDato()` — este componente solo se ocupa del render.
 */
export default function DatoText({ text }: { text: string }) {
  const parts = text.split(/(\[DATO[^\]]*\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[DATO') ? (
          <span className="flag" key={i}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

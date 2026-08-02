/**
 * Renderiza un titular como líneas enmascaradas (.mask > i) — cada línea sube
 * desde detrás de un borde, escalonada con .d1/.d2/.d3. Es el gesto de la v2.
 * El heading (h1/h2/h3) lo pone el que llama; esto devuelve las líneas.
 */
export default function MaskLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={`mask${i ? ` d${i}` : ''}`}>
          <i>{line}</i>
        </span>
      ))}
    </>
  );
}

/**
 * Barra de estado de la maqueta (.bb) — andamiaje interno, fuera del catálogo
 * i18n. §C.4 brief 05: no se renderiza en producción (solo en `next dev`).
 */
export default function Buildbar() {
  if (process.env.NODE_ENV === 'production') return null;
  return (
    <div className="bb">
      <span>
        <span className="dot"></span>Maqueta v3
      </span>
      <span>Español principal</span>
      <span>Sin navy</span>
      <span className="r">
        Rojo = pendiente de fase 2. Los textos en español están escritos, no se
        traducen.
      </span>
    </div>
  );
}

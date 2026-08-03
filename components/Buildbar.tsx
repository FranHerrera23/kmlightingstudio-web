/**
 * Barra de estado de la maqueta (.bb) — SE BORRA en producción (fase 2).
 * Andamiaje interno en español, fuera del catálogo i18n.
 */
export default function Buildbar() {
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

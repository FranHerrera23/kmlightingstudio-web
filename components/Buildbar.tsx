/**
 * Barra de estado de la maqueta (.bb) — SE BORRA en producción (fase 2).
 * Andamiaje interno en español, fuera del catálogo i18n.
 */
export default function Buildbar() {
  return (
    <div className="bb">
      <span>
        <span className="dot"></span>Maqueta v2
      </span>
      <span>Fondo blanco roto · oro + navy</span>
      <span>EN</span>
      <span className="r">
        Rojo = pendiente de fase 2. Las fotos son placeholders.
      </span>
    </div>
  );
}

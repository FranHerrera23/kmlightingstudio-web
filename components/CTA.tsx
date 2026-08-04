'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import MaskLines from './MaskLines';

/** CTA global · v3 (aparece antes del footer en todas las vistas menos /contacto).
 *  Título y botón fijos; la entrada cambia por página (brief 02 §C / brief 04 §D.2).
 *  Lleva al formulario real de contacto, no a un mailto. */
export default function CTA() {
  const t = useTranslations('cta');
  const pathname = usePathname(); // sin prefijo de idioma (next-intl)

  // brief 04 §C.1 — en /contacto el bloque no se renderiza: la página ya es
  // el formulario y el botón apuntaría a sí mismo.
  if (pathname === '/contacto') return null;

  // brief 02 §C — la entrada es específica de Servicios y Tecnología; el resto
  // (Home, Proyectos, Estudio) usa la genérica hasta que Fran defina las suyas.
  const body = pathname.startsWith('/servicios')
    ? t('bodyServices')
    : pathname.startsWith('/tecnologia')
      ? t('bodyTech')
      : t('body');

  const lines = t.raw('titleLines') as string[];
  return (
    <section className="cta">
      <div className="micro">{t('kicker')}</div>
      <h2>
        <MaskLines lines={lines} />
      </h2>
      <p className="lead">{body}</p>
      <Link className="b" href="/contacto">
        {t('button')}
      </Link>
    </section>
  );
}

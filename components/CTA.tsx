'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import MaskLines from './MaskLines';

/** CTA global · v3 (aparece en todas las vistas, antes del footer).
 *  Lleva al formulario real de contacto, no a un mailto. */
export default function CTA() {
  const t = useTranslations('cta');
  const lines = t.raw('titleLines') as string[];
  return (
    <section className="cta">
      <div className="micro">{t('kicker')}</div>
      <h2>
        <MaskLines lines={lines} />
      </h2>
      <p className="lead">{t('body')}</p>
      <Link className="b" href="/contacto">
        {t('button')}
      </Link>
    </section>
  );
}

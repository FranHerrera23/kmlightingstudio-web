'use client';

import { useTranslations } from 'next-intl';
import { STUDIO_EMAIL } from '@/content';
import MaskLines from './MaskLines';

/** CTA global · v2 (aparece en todas las vistas, antes del footer). */
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
      <a className="b" href={`mailto:${STUDIO_EMAIL}`}>
        {t('button')}
      </a>
    </section>
  );
}

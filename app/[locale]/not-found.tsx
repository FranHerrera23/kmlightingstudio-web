'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import MaskLines from '@/components/MaskLines';

/**
 * 404 · v3 — sistema de diseño, ES/EN (una versión por locale vía catálogo).
 * Sin nav sólido forzado: hereda el comportamiento normal (mast → sólido).
 */
export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <section className="mast" style={{ paddingBottom: 'var(--sec-s)' }}>
      <div className="micro rise">{t('kicker')}</div>
      <h1>
        <MaskLines lines={t.raw('titleLines') as string[]} />
      </h1>
      <p className="lead rise d1" style={{ marginTop: 'clamp(24px,4vh,40px)' }}>
        {t('lead')}
      </p>
      <div className="nf-links rise d2">
        <Link href="/projects">{t('projects')}</Link>
        <Link href="/services">{t('services')}</Link>
        <Link href="/contact">{t('contact')}</Link>
      </div>
    </section>
  );
}

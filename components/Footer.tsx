'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { VERTICALS, OFFICES, STUDIO_EMAIL } from '@/content';

/** Reloj local por oficina (hora en la timezone de cada sede). */
function OfficeClock({ tz }: { tz: string }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Date().toLocaleTimeString('en-GB', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit'
          })
        );
      } catch {
        /* timezone inválida — se ignora */
      }
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [tz]);
  return <span className="hr">{time}</span>;
}

/** Footer global · v2. */
export default function Footer() {
  const tNav = useTranslations('nav');
  const t = useTranslations('footer');

  return (
    <footer className="foot">
      <div className="foot-t">
        <div className="foot-c">
          <h5>{t('navigate')}</h5>
          <Link href="/projects">{tNav('projects')}</Link>
          <Link href="/services">{tNav('services')}</Link>
          <Link href="/products">{tNav('products')}</Link>
          <Link href="/about">{tNav('about')}</Link>
          {/* Journal: fuera del sistema de idiomas, siempre /journal (EN) */}
          <a href="/journal">{tNav('journal')}</a>
        </div>

        <div className="foot-c">
          <h5>{t('verticals')}</h5>
          <div>
            {VERTICALS.map((v) => (
              <Link key={v.id} href={`/services/${v.id}`}>
                {v.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="foot-c">
          <h5>{t('studio')}</h5>
          {OFFICES.map(([city, , tz]) => (
            <p key={city}>
              {city}
              <OfficeClock tz={tz} />
            </p>
          ))}
        </div>

        <div className="foot-c">
          <h5>{t('follow')}</h5>
          <a href="#">{t('linkedin')}</a>
          <a href="#">{t('instagram')}</a>
          <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>
        </div>
      </div>

      <div className="foot-b">
        <div className="big">
          KM LIGHTING STUDIO<small>KAREN MANNHEIM</small>
        </div>
        <div>{t('tag')}</div>
        <div>{t('copyright')}</div>
      </div>
    </footer>
  );
}

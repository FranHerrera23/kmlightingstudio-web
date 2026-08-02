'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/**
 * Switcher de idioma · v2 (.lang-b / .lang-m). Está armado: cambia el locale
 * conservando la ruta. EN activo; ES/PT/RU marcados "pend" (strings vacíos).
 */
export default function LangSwitcher() {
  const t = useTranslations('languages');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="lang">
      <button
        className="lang-b"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        {locale.toUpperCase()}
      </button>
      <div className={`lang-m${open ? ' open' : ''}`}>
        {routing.locales.map((loc) => (
          <button
            key={loc}
            className={loc === locale ? 'on' : ''}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              router.replace(pathname, { locale: loc });
            }}
          >
            {t(loc)}
            {loc !== 'en' && <i>{t('pending')}</i>}
          </button>
        ))}
      </div>
    </div>
  );
}

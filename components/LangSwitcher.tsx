'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

/**
 * Switcher de idioma · v3 (brief 01 §1.4). Toggle explícito ES / EN, sin menú
 * desplegable: el locale activo va en peso 700, el otro en --ink-3. Conserva la
 * ruta al cambiar. PT/RU siguen accesibles por URL (interfaz fase 2), pero el
 * toggle expone solo los dos mercados con contenido.
 */
export default function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const to = (loc: 'es' | 'en') => {
    if (loc !== locale) router.replace(pathname, { locale: loc });
  };

  return (
    <div className="lang-toggle">
      <button
        className={`lang-o${locale === 'es' ? ' on' : ''}`}
        aria-current={locale === 'es'}
        onClick={() => to('es')}
      >
        ES
      </button>
      <span className="lang-sep">/</span>
      <button
        className={`lang-o${locale === 'en' ? ' on' : ''}`}
        aria-current={locale === 'en'}
        onClick={() => to('en')}
      >
        EN
      </button>
    </div>
  );
}

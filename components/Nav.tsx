'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LangSwitcher from './LangSwitcher';

/** Rutas con hero oscuro: la nav arranca transparente y se vuelve sólida al
 *  scrollear. Home, detalle de servicio y detalle de proyecto. */
function hasDarkHero(pathname: string) {
  return pathname === '/' || /^\/(proyectos|servicios)\/[^/]+$/.test(pathname);
}

export default function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [solid, setSolid] = useState(!hasDarkHero(pathname));
  const [menuOpen, setMenuOpen] = useState(false);

  // Solidez de la nav según ruta + scroll
  useEffect(() => {
    const dark = hasDarkHero(pathname);
    if (!dark) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.86);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Cerrar menú móvil al navegar
  useEffect(() => setMenuOpen(false), [pathname]);

  const isOn = (base: string) =>
    base === '/' ? pathname === '/' : pathname.startsWith(base);

  const links = (
    <>
      <Link className={`lnk${isOn('/proyectos') ? ' on' : ''}`} href="/proyectos">
        {t('projects')}
      </Link>
      <Link className={`lnk${isOn('/servicios') ? ' on' : ''}`} href="/servicios">
        {t('services')}
      </Link>
      <Link className={`lnk${isOn('/tecnologia') ? ' on' : ''}`} href="/tecnologia">
        {t('products')}
      </Link>
    </>
  );

  return (
    <>
      <nav className={`nav${solid ? ' solid' : ''}`} id="nav">
        <div className="nav-in">
          <div className="nav-l">{links}</div>

          <Link className="logo" href="/">
            <b>KM LIGHTING STUDIO</b>
            <small>KAREN MANNHEIM</small>
          </Link>

          <div className="nav-r">
            <Link className={`lnk${isOn('/estudio') ? ' on' : ''}`} href="/estudio">
              {t('about')}
            </Link>
            {/* Contenido: ES/EN (localizado). PT/RU → 404 en la página. */}
            <Link
              className={`lnk${isOn('/contenido') ? ' on' : ''}`}
              href="/contenido"
            >
              {t('content')}
            </Link>
            <Link className="lnk talk" href="/contacto">
              {t('letsTalk')}
            </Link>
            <LangSwitcher />
            <button
              className="burger"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mm${menuOpen ? ' open' : ''}`}>
        <Link href="/proyectos">{t('projects')}</Link>
        <Link href="/servicios">{t('services')}</Link>
        <Link href="/tecnologia">{t('products')}</Link>
        <Link href="/estudio">{t('about')}</Link>
        <Link href="/contenido">{t('content')}</Link>
        <Link href="/contacto">{t('contact')}</Link>
      </div>
    </>
  );
}

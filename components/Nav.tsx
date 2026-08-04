'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LangSwitcher from './LangSwitcher';
import { VERTICALS, PROJECTS } from '@/content';

/**
 * Nav · v4 (brief 01 §1). Logo a la izquierda en dos líneas; los links en una
 * sola corrida a la derecha, en orden de funnel. Sólida desde scrollTop=0 en
 * todas las vistas (§1.3 — resuelve la colisión del titular con el nav). El
 * link de SERVICIOS abre un panel con las 7 tipologías y su contador (§1.5).
 */
export default function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);

  // Cerrar menú móvil y panel al navegar
  useEffect(() => {
    setMenuOpen(false);
    setSvcOpen(false);
  }, [pathname]);

  const isOn = (base: string) =>
    base === '/' ? pathname === '/' : pathname.startsWith(base);

  // Contador por vertical — vive en la data (§1.5), se recalcula solo.
  const vcount = (id: string) => PROJECTS.filter((p) => p.typ === id).length;

  return (
    <>
      <nav className="nav solid" id="nav">
        <div className="nav-in">
          <Link className="logo" href="/">
            <b>KM LIGHTING STUDIO</b>
            <small>KAREN MANNHEIM</small>
          </Link>

          <div className="nav-r">
            <Link
              className={`lnk${isOn('/proyectos') ? ' on' : ''}`}
              href="/proyectos"
            >
              {t('projects')}
            </Link>

            {/* SERVICIOS · panel de tipologías — hover en desktop, tap en touch */}
            <div className="nav-svc">
              <Link
                className={`lnk${isOn('/servicios') ? ' on' : ''}`}
                href="/servicios"
                aria-expanded={svcOpen}
                onClick={(e) => {
                  // En touch, el primer tap abre el panel en vez de navegar.
                  if (
                    typeof window !== 'undefined' &&
                    window.matchMedia('(hover: none)').matches &&
                    !svcOpen
                  ) {
                    e.preventDefault();
                    setSvcOpen(true);
                  }
                }}
              >
                {t('services')}
              </Link>
              <div className={`svc-panel${svcOpen ? ' open' : ''}`}>
                {VERTICALS.map((v) => (
                  <Link
                    key={v.id}
                    className="svc-item"
                    href={`/servicios/${v.slug}`}
                  >
                    <span>{v.title}</span>
                    <sup>{vcount(v.id)}</sup>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              className={`lnk${isOn('/tecnologia') ? ' on' : ''}`}
              href="/tecnologia"
            >
              {t('products')}
            </Link>
            <Link
              className={`lnk${isOn('/estudio') ? ' on' : ''}`}
              href="/estudio"
            >
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

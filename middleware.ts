import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Corre en todas las rutas menos API, el generador de OG (/og), assets de
  // Next y archivos con extensión (robots.txt, sitemap.xml quedan afuera).
  matcher: ['/((?!api|og|_next|_vercel|.*\\..*).*)']
};

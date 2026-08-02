import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Corre en todas las rutas menos API, assets de Next y archivos con extensión
  // (robots.txt, sitemap.xml y demás quedan afuera).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

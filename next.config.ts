import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';
import { LEGACY_REDIRECTS, LEGACY_FALLBACK } from './config/legacy-redirects';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // FASE 2: cuando los assets pasen a /public/assets, esto ya no hace falta.
    remotePatterns: [
      { protocol: 'https', hostname: 'arvida.kmlightingstudio.com' }
    ]
  },
  // Redirects del dominio viejo. Específicas primero, fallback al final.
  // statusCode 301 (no `permanent:true`, que emite 308): la aceptación pide 301.
  async redirects() {
    // brief 05 §A.1 — /contenido?tab=X → /contenido/X (rutas reales indexables).
    // 'articulos' es el índice por defecto: no lleva redirect (queda en /contenido).
    const tabs = ['conversaciones', 'recorridos', 'prensa'] as const;
    const contentTabs = ['', '/en'].flatMap((prefix) =>
      tabs.map((tab) => ({
        source: `${prefix}/contenido`,
        has: [{ type: 'query' as const, key: 'tab', value: tab }],
        destination: `${prefix}/contenido/${tab}`,
        statusCode: 301 as const
      }))
    );
    const legacy = [...LEGACY_REDIRECTS, LEGACY_FALLBACK].map((r) => ({
      ...r,
      statusCode: 301 as const
    }));
    return [...contentTabs, ...legacy];
  }
};

export default withNextIntl(nextConfig);

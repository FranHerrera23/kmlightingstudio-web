import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // FASE 2: cuando los assets pasen a /public/assets, esto ya no hace falta.
    remotePatterns: [
      { protocol: 'https', hostname: 'arvida.kmlightingstudio.com' }
    ]
  }
};

export default withNextIntl(nextConfig);

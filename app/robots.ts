import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content';

/**
 * robots.txt.
 * Estrategia AEO: permitimos EXPLÍCITAMENTE a los crawlers de IA/answer-engines
 * (además del `*`), para que el estudio aparezca cuando alguien pregunta a un
 * asistente por diseño de iluminación arquitectónica.
 */
export default function robots(): MetadataRoute.Robots {
  // Nombrados explícitamente (brief §6): crawlers de IA / answer-engines.
  const aiBots = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended'
  ];

  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...aiBots.map((userAgent) => ({ userAgent, allow: '/' }))
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}

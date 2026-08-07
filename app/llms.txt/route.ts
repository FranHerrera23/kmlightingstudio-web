import { buildLlmsTxt } from '@/lib/llms';

// /llms.txt — mapa para crawlers de IA, generado desde el modelo de datos (§3 brief 08).
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}

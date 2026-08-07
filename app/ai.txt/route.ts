import { buildLlmsTxt } from '@/lib/llms';

// /ai.txt — mismo contenido que /llms.txt (§3 brief 08).
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}

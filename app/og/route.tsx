import { ImageResponse } from 'next/og';
import { ASSET } from '@/content';

/**
 * Generador de OG image · 1200×630 (el tamaño que LinkedIn espera).
 *
 * /og                        → tarjeta de marca por defecto (estudio)
 * /og?t=Nombre&k=Tipología   → tarjeta de marca con título específico
 * /og?...&img=<foto>         → la foto recortada a 1200×630 (cover) + overlay
 *
 * Recorta SIEMPRE a 1200×630: si la foto es 4:3 no se sirve la original (que
 * LinkedIn cortaría mal), se compone acá con object-fit:cover. Si la foto no
 * resuelve (404), cae a la tarjeta de marca. `img` se restringe al host de
 * assets (anti-SSRF: no se fetchea cualquier URL de un query param).
 */
export const runtime = 'nodejs';

const OK_ORIGIN = new URL(ASSET).origin;
const SIZE = { width: 1200, height: 630 };

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('t') || 'KM Lighting Studio').slice(0, 120);
  const eyebrow = (
    searchParams.get('k') || 'Architectural Lighting Design'
  ).slice(0, 90);
  const imgParam = searchParams.get('img');

  // Fetch de la foto (solo del host de assets) → data URL para el compositor.
  let bg: string | null = null;
  if (imgParam && imgParam.startsWith(OK_ORIGIN)) {
    try {
      const res = await fetch(imgParam, { cache: 'no-store' });
      if (res.ok) {
        const type = res.headers.get('content-type') || 'image/jpeg';
        const b64 = Buffer.from(await res.arrayBuffer()).toString('base64');
        bg = `data:${type};base64,${b64}`;
      }
    } catch {
      /* la foto no resolvió → tarjeta de marca */
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: '#14171C',
          color: '#FAFAF8',
          padding: 72
        }}
      >
        {bg && (
          <img
            src={bg}
            width={1200}
            height={630}
            style={{ position: 'absolute', inset: 0, objectFit: 'cover' }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: bg
              ? 'linear-gradient(180deg, rgba(14,16,19,0.25) 0%, rgba(14,16,19,0.55) 55%, rgba(14,16,19,0.9) 100%)'
              : 'radial-gradient(1100px 620px at 72% 18%, rgba(201,172,114,0.16), rgba(20,23,28,0) 60%)'
          }}
        />

        {/* wordmark */}
        <div
          style={{
            position: 'absolute',
            top: 72,
            left: 72,
            fontSize: 25,
            fontWeight: 800,
            letterSpacing: 3,
            color: '#FAFAF8'
          }}
        >
          KM LIGHTING STUDIO
        </div>

        {/* título */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 27,
              fontWeight: 600,
              letterSpacing: 7,
              textTransform: 'uppercase',
              color: '#C9AC72'
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.02,
              textTransform: 'uppercase',
              marginTop: 22,
              maxWidth: 1000
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      headers: {
        'Cache-Control':
          'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
      }
    }
  );
}

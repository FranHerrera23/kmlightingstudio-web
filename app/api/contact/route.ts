import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limit por IP · en memoria (por instancia). Suficiente para frenar spam
// básico en fase 1; para algo serio, mover a un store compartido (KV/Upstash).
const HITS = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_HITS = 3;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  HITS.set(ip, arr);
  return arr.length > MAX_HITS;
}

const TYPES = ['residential', 'multifamily', 'hospitality', 'commercial', 'cultural', 'aviation', 'yachts', 'other'];
const STAGES = ['concept', 'schematic', 'tender', 'construction', 'completed'];

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  // Honeypot: si el campo oculto viene lleno, es un bot. Fingimos éxito.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  // Validación en servidor (nunca confiar solo en el cliente).
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();
  const studio = String(body.studio || '').trim();
  const type = TYPES.includes(String(body.type)) ? String(body.type) : '';
  const stage = STAGES.includes(String(body.stage)) ? String(body.stage) : '';
  const referrer = String(body.referrer || '').slice(0, 500);
  const pathname = String(body.pathname || '').slice(0, 300);

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'required';
  if (!EMAIL_RE.test(email)) errors.email = 'invalid';
  if (!message) errors.message = 'required';
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'validation', errors }, { status: 422 });
  }

  const to = process.env.CONTACT_TO || 'studio@kmlightingstudio.com';
  const from = process.env.CONTACT_FROM || 'KM Lighting Studio <web@kmlightingstudio.com>';

  // El origen (referrer + pathname) alimenta el reporte mensual: importa saber
  // si el lead vino de un proyecto o de un artículo.
  const lines = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    studio && `Estudio: ${studio}`,
    type && `Tipo: ${type}`,
    stage && `Etapa: ${stage}`,
    '',
    message,
    '',
    '——',
    `Origen: ${pathname || '/'}`,
    referrer && `Referrer: ${referrer}`,
    `IP: ${ip}`
  ]
    .filter(Boolean)
    .join('\n');

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Fase 1 sin credenciales: registramos el lead y devolvemos ok para que el
    // flujo de UI funcione. Al setear RESEND_API_KEY se envía de verdad.
    console.log('[contact] (sin RESEND_API_KEY) lead:\n' + lines);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nuevo contacto · ${name}${studio ? ` · ${studio}` : ''}`,
      text: lines
    });
    if (error) throw error;
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error('[contact] resend error', e);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}

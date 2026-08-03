import { TODO, type Fixture } from './types';

/* ── Products · v2 ── (dibujos técnicos + fichas)
   Misma arquitectura que projects: cada luminaria tiene id y página propia.
   Los campos vitrina (family/name/diameter/blurb/draw) van cargados; TODA la
   ficha técnica queda TODO hasta que TRAZZO entregue los datos reales.
   "Qué especificamos y por qué" — sin SKUs ni precios. Ver la nota de build
   en Products (decisión TRAZZO vs KMLS). */
export const DRAW: Record<string, string> = {
  down: '<svg viewBox="0 0 120 90"><path d="M10 22h100M10 22v6h100v-6"/><path d="M34 28v34a26 26 0 0 0 52 0V28"/><ellipse cx="60" cy="62" rx="26" ry="7"/></svg>',
  adj: '<svg viewBox="0 0 120 90"><path d="M10 20h100M10 20v6h100v-6"/><path d="M36 26v20a24 24 0 0 0 48 0V26"/><path d="M44 48l30 24M74 48L44 72" opacity=".4"/></svg>',
  lin: '<svg viewBox="0 0 120 90"><path d="M8 26h104v14H8z"/><path d="M8 40v10h104V40"/><path d="M20 50v18M40 50v18M60 50v18M80 50v18M100 50v18" opacity=".35"/></svg>',
  wash: '<svg viewBox="0 0 120 90"><path d="M10 22h100M10 22v7h100v-7"/><path d="M38 29v18h44V29"/><path d="M82 40c8 14 16 26 24 34" opacity=".45"/><path d="M104 24v56"/></svg>',
  trk: '<svg viewBox="0 0 120 90"><path d="M8 18h104v9H8z"/><path d="M34 27v8h14v-8M74 27v8h14v-8"/><path d="M41 35l-9 22a10 10 0 0 0 18 0z"/><path d="M81 35l9 22a10 10 0 0 1-18 0z"/></svg>',
  ext: '<svg viewBox="0 0 120 90"><path d="M8 62h104"/><ellipse cx="60" cy="62" rx="20" ry="6"/><path d="M40 62V44a20 20 0 0 1 40 0v18"/><path d="M60 44V20M50 26l10-8 10 8" opacity=".4"/></svg>',
  pend: '<svg viewBox="0 0 120 90"><path d="M10 12h100"/><path d="M60 12v34"/><path d="M34 46h52l-8 26H42z"/><ellipse cx="60" cy="72" rx="18" ry="5"/></svg>',
  drv: '<svg viewBox="0 0 120 90"><rect x="14" y="30" width="92" height="30" rx="2"/><path d="M14 40h92M14 50h92" opacity=".28"/><path d="M6 45h8M106 45h8"/></svg>'
};

/** Campos técnicos, todos pendientes de TRAZZO (se completan en /content). */
const PENDING = {
  specs: TODO,
  downloads: TODO,
  accessories: TODO,
  finishes: TODO,
  optics: TODO,
  cct: TODO
} as const;

export const FIX: Fixture[] = [
  { id: 'trimless-downlight-57', family: 'Embutida · Sin marco', name: 'Downlight trimless', diameter: 'Ø57', draw: 'down',
    blurb: 'La de referencia del estudio. Lente profundamente embutido, sin borde visible, y la masa del cuerpo haciendo de disipador.', ...PENDING },
  { id: 'trimless-downlight-38', family: 'Embutida · Sin marco', name: 'Downlight trimless', diameter: 'Ø38', draw: 'down',
    blurb: 'Mismo rendimiento, apertura menor — para cielorrasos que no pueden con otro agujero.', ...PENDING },
  { id: 'adjustable-spot', family: 'Embutida · Orientable', name: 'Spot orientable', diameter: 'Ø57', draw: 'adj',
    blurb: 'Inclinación y giro enteramente por encima del plano del cielorraso.', ...PENDING },
  { id: 'trimless-wallwasher', family: 'Bañador · Sin marco', name: 'Bañador de pared', diameter: 'Ø74', draw: 'wash',
    blurb: 'Gradiente vertical parejo, del cielorraso al zócalo.', ...PENDING },
  { id: 'plaster-in-linear', family: 'Lineal · Sin marco', name: 'Lineal plaster-in', diameter: '25mm', draw: 'lin',
    blurb: 'Corrida continua sin cortes oscuros en las uniones.', ...PENDING },
  { id: 'magnetic-track', family: 'Riel · Magnético 48V', name: 'Riel magnético', diameter: '48V', draw: 'trk',
    blurb: 'Para colecciones que cambian. Cada cabezal se reubica a mano.', ...PENDING },
  { id: 'marine-uplight', family: 'Exterior · Empotrada', name: 'Uplight grado marino', diameter: 'Ø90', draw: 'ext',
    blurb: 'Acero inoxidable 316, encapsulada. Especificada donde la sal está de verdad.', ...PENDING },
  { id: 'warm-dim-driver', family: 'Control · Driver', name: 'Driver warm-dim', diameter: 'DALI-2', draw: 'drv',
    blurb: 'Donde falla en silencio la mayoría de la iluminación residencial. Atenúa al 1% sin salto visible.', ...PENDING }
];

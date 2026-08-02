import type { Fixture } from './types';

/* ── Products · v2 ── (portado tal cual de DRAW + FIX)
   "Qué especificamos y por qué" — sin SKUs ni precios.
   Ver la nota de build en Products (decisión TRAZZO vs KMLS). */
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

export const FIX: Fixture[] = [
  { draw: 'down', fam: 'Recessed · Trimless', name: 'Trimless Downlight', dia: 'Ø57', bl: 'The studio default. Deep-recessed lens, no visible edge, the mass of the body doing the cooling.' },
  { draw: 'down', fam: 'Recessed · Trimless', name: 'Trimless Downlight', dia: 'Ø38', bl: 'Same output, smaller aperture — for ceilings that can’t afford another hole.' },
  { draw: 'adj', fam: 'Recessed · Adjustable', name: 'Adjustable Spot', dia: 'Ø57', bl: 'Tilt and rotation entirely above the ceiling plane.' },
  { draw: 'wash', fam: 'Wallwash · Trimless', name: 'Trimless Wallwasher', dia: 'Ø74', bl: 'Even vertical gradient, ceiling to skirting.' },
  { draw: 'lin', fam: 'Linear · Trimless', name: 'Plaster-in Linear', dia: '25mm', bl: 'Continuous run with no dark gaps at the joints.' },
  { draw: 'trk', fam: 'Track · 48V magnetic', name: 'Magnetic Track', dia: '48V', bl: 'For collections that change. Every head repositions by hand.' },
  { draw: 'ext', fam: 'Exterior · In-ground', name: 'Marine-grade Uplight', dia: 'Ø90', bl: '316 stainless, fully potted. Specified where the salt actually is.' },
  { draw: 'drv', fam: 'Control · Driver', name: 'Warm-dim Driver', dia: 'DALI-2', bl: 'Where most residential lighting quietly fails. Dims to 1% without a visible step.' }
];

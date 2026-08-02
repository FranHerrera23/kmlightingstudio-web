import { TODO, type Article } from './types';

/* ── Journal · v2 · SOLO EN ──
   Ruta /journal/[slug] con molde AEO completo. Tres artículos de ejemplo con
   la ESTRUCTURA llena y el CONTENIDO en TODO — escribirlos requiere datos
   técnicos que todavía no tenemos, pero no requiere tocar código: se editan
   estos objetos y listo. El Journal queda fuera del sistema de idiomas.

   Molde por artículo:
   · answer capsule (2-3 frases, el bloque que la IA levanta)
   · 3 takeaways
   · cuerpo en secciones con subheaders-afirmación
   · una tabla comparativa
   · FAQ de 3 a 5 preguntas (las preguntas son la estructura AEO; las
     respuestas son contenido → TODO)
   · bloque de autor con credenciales + reviewedBy */

/** Molde en blanco compartido: todo el contenido pendiente de redacción. */
const DRAFT = {
  credentials: TODO,
  read: TODO,
  published: TODO,
  answer: TODO,
  takeaways: TODO,
  sections: [
    { heading: TODO, body: TODO },
    { heading: TODO, body: TODO },
    { heading: TODO, body: TODO }
  ],
  table: TODO
};

export const ARTICLES: Article[] = [
  {
    slug: 'what-lighting-costs-per-square-metre',
    title: 'What architectural lighting actually costs, per square metre',
    question: 'how much should I budget for lighting design',
    tag: 'Cost & value',
    author: 'Karen Mannheim',
    reviewedBy: 'Karen Mannheim',
    ...DRAFT,
    faq: [
      { q: 'How much does lighting design cost per square metre?', a: TODO },
      { q: 'Is lighting design charged as a percentage of the project budget?', a: TODO },
      { q: 'What drives the cost of a lighting scheme up?', a: TODO }
    ]
  },
  {
    slug: 'lighting-designer-or-electrician',
    title: 'Lighting designer or electrician — what the difference buys you',
    question: 'difference between a lighting designer and an electrician',
    tag: 'Cost & value',
    author: 'Karen Mannheim',
    reviewedBy: 'Karen Mannheim',
    ...DRAFT,
    faq: [
      { q: 'Can’t my electrician just design the lighting?', a: TODO },
      { q: 'What does a lighting designer deliver that an electrician doesn’t?', a: TODO },
      { q: 'When in a project do I need a lighting designer?', a: TODO }
    ]
  },
  {
    slug: 'why-exterior-lighting-fails-in-florida',
    title: 'Why exterior lighting fails in Florida — and what survives',
    question: 'what IP rating do I need for coastal lighting',
    tag: 'Climate',
    author: '[Lighting Designer]',
    reviewedBy: 'Karen Mannheim',
    ...DRAFT,
    faq: [
      { q: 'What IP rating do I need for coastal exterior lighting?', a: TODO },
      { q: 'Why do exterior fixtures fail near the sea?', a: TODO },
      { q: 'What fixture finish actually survives salt air?', a: TODO }
    ]
  }
];

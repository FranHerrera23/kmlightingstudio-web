import { TODO, type Article } from './types';

/* ── Contenido · Artículos · v3 ──
   Ruta /contenido/[slug] con molde AEO completo. Tres artículos con la
   ESTRUCTURA llena y el CONTENIDO en TODO — se escriben editando estos objetos,
   sin tocar componentes. Copy en español (v3), no se traduce.

   Molde por artículo:
   · answer capsule (2-3 frases, el bloque que la IA levanta)
   · 3 takeaways · cuerpo en secciones con subheaders-afirmación
   · una tabla comparativa · FAQ de 3 a 5 preguntas
   · bloque de autor con credenciales + reviewedBy */

/** Molde en blanco compartido: todo el contenido pendiente de redacción. */
const DRAFT = {
  credentials: TODO,
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
    slug: 'cuanto-cuesta-un-proyecto-de-iluminacion',
    title: 'Cuánto cuesta realmente un proyecto de iluminación, por metro cuadrado',
    question: 'cuánto cuesta un proyecto de iluminación arquitectónica',
    tag: 'Costo y valor',
    lang: 'ES',
    author: 'Karen Mannheim',
    reviewedBy: 'Karen Mannheim',
    // B.5 · el tiempo de lectura sale del texto real, que aún no existe (DRAFT).
    // TODO hasta que el artículo se escriba — no se inventa un número.
    read: TODO,
    ...DRAFT,
    faq: [
      { q: '¿Cuánto cuesta el diseño de iluminación por metro cuadrado?', a: TODO },
      { q: '¿Se cobra como un porcentaje del presupuesto del proyecto?', a: TODO },
      { q: '¿Qué hace subir el costo de un esquema de iluminación?', a: TODO }
    ]
  },
  {
    slug: 'disenador-de-iluminacion-o-electricista',
    title: 'Diseñador de iluminación o electricista: qué compra esa diferencia',
    question: 'diferencia entre un diseñador de iluminación y un electricista',
    tag: 'Costo y valor',
    lang: 'ES',
    author: 'Karen Mannheim',
    reviewedBy: 'Karen Mannheim',
    read: TODO,
    ...DRAFT,
    faq: [
      { q: '¿No puede mi electricista diseñar la iluminación?', a: TODO },
      { q: '¿Qué entrega un diseñador de iluminación que un electricista no?', a: TODO },
      { q: '¿En qué momento del proyecto necesito un diseñador de iluminación?', a: TODO }
    ]
  },
  {
    slug: 'por-que-falla-la-iluminacion-exterior-en-florida',
    title: 'Por qué la iluminación exterior falla en Florida — y qué sobrevive',
    question: 'qué grado IP necesito para iluminación costera',
    tag: 'Clima',
    lang: 'ES',
    // B.4 · antes renderizaba el placeholder "[Diseñador de iluminación]" en
    // negro, indistinguible de un dato real. Karen es autora como en los otros
    // dos (opción autorizada en brief 04 §B.4).
    author: 'Karen Mannheim',
    reviewedBy: 'Karen Mannheim',
    read: TODO,
    ...DRAFT,
    faq: [
      { q: '¿Qué grado IP necesito para iluminación exterior costera?', a: TODO },
      { q: '¿Por qué fallan las luminarias exteriores cerca del mar?', a: TODO },
      { q: '¿Qué terminación sobrevive de verdad al aire salino?', a: TODO }
    ]
  }
];

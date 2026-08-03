import type { ScopeStage } from './types';

/* ── Scope · v3 ── (portado tal cual, en español) */
export const SCOPE: ScopeStage[] = [
  {
    n: 1, title: 'Diseño de iluminación', delivery: '15 días hábiles',
    steps: [
      ['01', 'Relevamiento y briefing', ['Relevamiento en sitio y recopilación de los requerimientos del proyecto']],
      ['02', 'Concepto y estrategia', ['Concepto general de iluminación con moodboard completo por espacio']],
      ['03', 'Selección y ubicación de luminarias', ['Layouts con ubicación según el concepto', 'Leyenda con simbología y nomenclatura', 'Specbook de cada luminaria seleccionada']],
      ['04', 'Sistema de control', ['Plano de switching', 'Propuesta de distribución de keypads', 'Evaluación de sistemas avanzados — Ketra by Lutron y equivalentes']],
      ['05', 'Cálculos fotométricos', ['Cálculos para los espacios principales — DIALux con fotometría real']],
      ['06', 'Coordinación', ['Coordinación con arquitectura, interiorismo y demás especialidades técnicas']]
    ]
  },
  {
    n: 2, title: 'Gestión del diseño', delivery: '',
    steps: [['—', '', ['Reuniones de coordinación con arquitectos e interioristas', 'Gestión de cambios — modificaciones y actualizaciones de planos', 'Soporte durante la obra']]]
  },
  {
    n: 3, title: 'Gestión en obra', delivery: 'según cronograma de obra',
    steps: [['—', '', ['Visitas en hitos clave', 'Informes de supervisión', 'Resolución de consultas técnicas', 'Light testing para verificar la instalación']]]
  }
];

export const DOSSIER: string[] = [
  'Layouts de iluminación en AutoCAD por ambiente — dimensiones, distancias, anotaciones, cableado de bajo voltaje, ubicación de tableros y tomas',
  'Layouts en AutoCAD con switching y ubicación de keypads',
  'Leyenda de especificación completa por luminaria',
  'Detalles de referencia de construcción e instalación',
  'Specbook completo de cada luminaria seleccionada',
  'Vistas 3D fotorrealistas mostrando las capas de luz'
];

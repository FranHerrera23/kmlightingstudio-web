import type { ScopeStage } from './types';

/* ── Scope · v2 ── (portado tal cual del array SCOPE) */
export const SCOPE: ScopeStage[] = [
  {
    n: 1, title: 'Lighting Design', delivery: '15 business days',
    steps: [
      ['01', 'Site Assessment & Briefing', ['Site assessment and gathering of project requirements']],
      ['02', 'Lighting Concept & Strategy', ['General lighting concept with a complete moodboard per space']],
      ['03', 'Fixture Selection & Placement', ['Lighting layouts with fixture placement', 'Legend with fixture symbols & nomenclature', 'Specbook for each selected fixture']],
      ['04', 'Lighting Control System', ['Switching plan', 'Keypad distribution proposal layout', 'Advanced control systems evaluated — Ketra by Lutron and equivalents']],
      ['05', 'Photometric Calculations', ['Photometric calculations for principal spaces — DIALux with real photometry']],
      ['06', 'Coordination', ['Coordination with architecture, interior design and other technical trades']]
    ]
  },
  {
    n: 2, title: 'Lighting Design Management', delivery: '',
    steps: [['—', '', ['Coordination meetings with architects and interior designers', 'Change management — drawing modifications & updates', 'Support during construction']]]
  },
  {
    n: 3, title: 'On-Site Management', delivery: 'per construction schedule',
    steps: [['—', '', ['Site visits at key milestones', 'Supervision reports', 'Resolution of technical queries', 'Light testing to verify correct installation']]]
  }
];

export const DOSSIER: string[] = [
  'AutoCAD lighting layouts per room — dimensions, distances, annotations, low-voltage wiring, panel locations & electrical outlets',
  'AutoCAD layouts with switching and keypad locations',
  'Complete specification legend for each fixture',
  'Reference construction & lighting installation details',
  'Complete specbook for each selected fixture',
  'Photorealistic 3D views showing the lighting layers'
];

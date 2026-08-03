import type { Firm, TeamMember, Office } from './types';

/* ── Firmas · Equipo · Oficinas · v3 ── (portado tal cual, en español) */

export const FIRMS: Firm[] = [
  ['RAMSA', 'Robert A.M. Stern Architects'],
  ['MORPH Arquitectura', 'Top 100 mundial'],
  ['Oppenheim', 'Arquitectura'],
  ['Adriana Hoyos', 'Estudio de diseño'],
  ['Wecselman', 'Diseño · Florida'],
  ['Kobi Karp', 'Arquitectura e interiores'],
  ['Fernanda Márquez', 'São Paulo · Lisboa · Vancouver'],
  ['Legeard Studio', 'Nueva York'],
  ['2id Interiors', 'Miami'],
  ['Llosa Cortegana', 'Arquitectos'],
  ['Studio Valle de Valle', 'Interiores · Nueva York'],
  ['GC Studio', 'Marbella']
];

export const TEAM: TeamMember[] = [
  ['Karen Mannheim', 'CEO, fundadora y directora de diseño'],
  ['Tatiana Rodríguez', 'Ingeniera industrial · Directora comercial, España'],
  ['Fanny Rojas', 'Arquitecta líder y diseñadora sénior de iluminación'],
  ['Leonett Marcano', 'Ingeniero y especialista en integración lumínica']
];

export const OFFICES: Office[] = [
  ['Lima', 'Casa matriz', 'America/Lima'],
  ['Miami', '', 'America/New_York'],
  ['Madrid', '', 'Europe/Madrid']
];

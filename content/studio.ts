import type { Firm, TeamMember, Office } from './types';

/* ── Firmas · Equipo · Oficinas · v3 ── (portado tal cual, en español) */

/**
 * §7 brief 06 · cuatro destacados de la home, en pares estudio + proyecto con
 * link a la ficha. Un nombre solo es un claim; un nombre con proyecto es prueba.
 * (Coral Gables va como ubicación — la colaboración es con Studio Valle de Valle,
 * el interiorista; la identidad confidencial del cliente nunca aparece.)
 */
export const FEATURED_STUDIOS: Array<{
  studio: string;
  desc: string;
  projectId: string;
  label: string;
}> = [
  { studio: 'RAMSA', desc: 'Robert A.M. Stern Architects', projectId: 'pezet3', label: 'Pezet 3, San Isidro' },
  { studio: 'Oppenheim Architecture', desc: '', projectId: 'golden', label: 'Residencia privada, Golden Beach' },
  { studio: 'Adriana Hoyos', desc: '', projectId: 'fourseasons', label: 'Four Seasons Residences Brickell' },
  { studio: 'Studio Valle de Valle', desc: '', projectId: 'arvida', label: 'Coral Gables' }
];

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

// Oficinas: Lima · Miami · Marbella (§4.5). Madrid sale del listado de sedes
// (sin equipo ni oficina) y queda solo como ubicación de proyectos. Marbella
// comparte timezone con Madrid.
export const OFFICES: Office[] = [
  ['Lima', 'Casa matriz', 'America/Lima'],
  ['Miami', '', 'America/New_York'],
  ['Marbella', '', 'Europe/Madrid']
];

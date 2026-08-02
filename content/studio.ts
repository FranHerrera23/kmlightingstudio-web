import type { Firm, TeamMember, Office } from './types';

/* ── Firmas · Equipo · Oficinas · v2 ── (portado tal cual) */

export const FIRMS: Firm[] = [
  ['RAMSA', 'Robert A.M. Stern Architects'],
  ['MORPH Arquitectura', "World's Top 100 Firms"],
  ['Oppenheim', 'Architecture'],
  ['Adriana Hoyos', 'Design Studio'],
  ['Wecselman', 'Design · Florida'],
  ['Kobi Karp', 'Architecture & Interiors'],
  ['Fernanda Márquez', 'São Paulo · Lisboa · Vancouver'],
  ['Legeard Studio', 'New York'],
  ['2id Interiors', 'Miami'],
  ['Llosa Cortegana', 'Architects'],
  ['Studio Valle de Valle', 'Interiors · New York'],
  ['GC Studio', 'Marbella']
];

export const TEAM: TeamMember[] = [
  ['Karen Mannheim', 'CEO, Founder & Design Director'],
  ['Tatiana Rodriguez', 'Industrial Engineer · Commercial Director, Spain'],
  ['Fanny Rojas', 'Lead Architect & Senior Lighting Designer'],
  ['Leonett Marcano', 'Engineer & Lighting Integration Specialist']
];

export const OFFICES: Office[] = [
  ['Lima', 'Headquarters', 'America/Lima'],
  ['Miami', '', 'America/New_York'],
  ['Madrid', '', 'Europe/Madrid']
];

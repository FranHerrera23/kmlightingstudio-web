import type { TypologyKey, LocationKey, StatusKey } from './types';

/* ── Taxonomía · v3 ── (portada tal cual de la maqueta, en español) */

export const TYPOLOGIES: Array<[TypologyKey, string]> = [
  ['all', 'Todas'],
  ['multifamily', 'Multifamiliar'],
  ['residences', 'Residencias privadas'],
  ['hospitality', 'Hotelería'],
  ['commercial', 'Comercial'],
  ['cultural', 'Cultural'],
  ['aviation', 'Aviación'],
  ['yachts', 'Yates']
];

export const LOCATIONS: Array<[LocationKey, string]> = [
  ['all', 'Todas'],
  ['peru', 'Perú'],
  ['usa', 'Estados Unidos'],
  ['spain', 'España'],
  ['middle-east', 'Medio Oriente'],
  ['caribbean', 'Caribe'],
  ['confidential', 'Confidencial']
];

export const STATUSES: Array<[StatusKey, string]> = [
  ['all', 'Todos'],
  ['completed', 'Entregado'],
  ['progress', 'En proceso'],
  ['concept', 'Concepto']
];

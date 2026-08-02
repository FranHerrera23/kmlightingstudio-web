import type { TypologyKey, LocationKey, StatusKey } from './types';

/* ── Taxonomía ── (portada tal cual de la maqueta) */

export const TYPOLOGIES: Array<[TypologyKey, string]> = [
  ['all', 'All'],
  ['multifamily', 'Multifamily'],
  ['residences', 'Private Residences'],
  ['hospitality', 'Hospitality'],
  ['commercial', 'Commercial'],
  ['cultural', 'Cultural'],
  ['aviation', 'Aviation'],
  ['yachts', 'Yachts']
];

export const LOCATIONS: Array<[LocationKey, string]> = [
  ['all', 'All'],
  ['peru', 'Peru'],
  ['usa', 'United States'],
  ['spain', 'Spain'],
  ['middle-east', 'Middle East'],
  ['caribbean', 'Caribbean'],
  ['confidential', 'Confidential']
];

export const STATUSES: Array<[StatusKey, string]> = [
  ['all', 'All'],
  ['completed', 'Completed'],
  ['progress', 'In Progress'],
  ['concept', 'Concept']
];

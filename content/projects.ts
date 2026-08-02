import { TODO, type Project, type Photo } from './types';

/**
 * Molde de galería por defecto (fase 1) — la secuencia fija de la maqueta v2.
 * El ratio de cada slot vive acá (dato), no en el CSS. El componente lo lee
 * para reservar el alto del contenedor antes de que cargue la imagen.
 * TODAS horizontales o cuadradas. El ritmo (full/duo/wide/inset) lo pone el
 * componente; el ratio lo pone el dato.
 */
export const DEFAULT_GALLERY: Photo[] = [
  { ratio: '3:2', caption: '01 · Fachada' },
  { ratio: '4:3', caption: '02 · Entrada' },
  { ratio: '1:1', caption: '03 · Detalle' },
  { ratio: '3:2', caption: '04 · Sala principal' },
  { ratio: '1:1', caption: '05' },
  { ratio: '4:3', caption: '06 · Hall' },
  { ratio: '3:2', caption: '07 · Comedor o segundo ambiente' },
  { ratio: '4:3', caption: '08 · Habitación' },
  { ratio: '4:3', caption: '09 · Baño principal' },
  { ratio: '4:3', caption: '10 · Cierre' }
];

/*
 * AUDITORÍA DE ASSETS (contra https://arvida.kmlightingstudio.com/assets, hoy):
 *  · Resuelven 1.jpg (cargan foto real): pezet1/2/3, blascerdena, poseidon,
 *    collector, fisher, fourseasons, golden, palmbeach, moraleja, vivagym,
 *    saadiyat, yacht, jet. En todos el id v2 coincide con la carpeta → sin assetDir.
 *  · CONFIDENCIALES (NDA) — son TRES: athlete, musician y arvida.
 *    El nombre real nunca aparece (texto, URL, assetDir, alt, JSON-LD).
 *    NO se mapea assetDir aunque las fotos vivan bajo carpetas con nombre de
 *    cliente: eso pondría el nombre en la URL de la imagen (ver assetDirOf).
 *    Quedan id-based → 404 → placeholder. Fase 2 renombra las carpetas en
 *    origen a athlete/ · musician/ · arvida/.
 *  · arvida: además, la carpeta actual no sigue el patrón N.jpg (404 hoy) →
 *    placeholder. Se estandariza en fase 2.
 * El campo assetDir queda disponible para fase 2 (ver assetDirOf en content/index).
 */

/* ── Proyectos · v2 ── (portado tal cual del array P de la maqueta)
   Los name:TODO son los que Karen tiene que renombrar (hint = pista interna).
   Los 6 concept studies quedan por definir. NDA: nunca nombrar clientes. */
export const PROJECTS: Project[] = [
  { id: 'pezet1', typ: 'multifamily', loc: 'peru', sta: 'completed', ph: 5, name: 'Pezet 1', partner: 'RAMSA', place: '375 Av. Pezet · San Isidro, Lima', arch: 'Robert A.M. Stern Architects', dev: 'ACM', interior: TODO, year: TODO, scale: '15 storeys · 31 apartments · 4 townhouses',
    concept: "A 15-storey tower on Lima's most prestigious avenue, looking out over the 45 hectares of trees, lagoons and gardens of the Lima Golf Club. It set the standard the next two were built to match.", challenge: TODO },
  { id: 'pezet2', typ: 'multifamily', loc: 'peru', sta: 'completed', ph: 5, name: 'Pezet 2', partner: 'RAMSA', place: 'San Isidro, Lima', arch: 'Robert A.M. Stern Architects', dev: 'ACM', interior: TODO, year: TODO, scale: TODO,
    concept: 'The second phase, held to the standard the first one set. Continuity of detail — the same apertures, the same colour, the same shadow.', challenge: TODO },
  { id: 'pezet3', typ: 'multifamily', loc: 'peru', sta: 'completed', ph: 6, name: 'Pezet 3', partner: 'RAMSA', place: 'San Isidro, Lima', arch: 'Robert A.M. Stern Architects', dev: 'ACM', interior: TODO, year: TODO, scale: TODO,
    concept: 'A cohesive lighting identity from lobby to penthouse, resolved in RAMSA’s language.', challenge: TODO },
  { id: 'blascerdena', typ: 'multifamily', loc: 'peru', sta: 'completed', ph: 5, name: 'Blas Cerdeña', partner: 'RAMSA', place: 'San Isidro, Lima', arch: 'Robert A.M. Stern Architects', dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'A high-end multifamily tower — a single lighting identity that makes every shared space feel considered.', challenge: TODO },
  { id: 'skyparadise', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'Sky Paradise', partner: 'Fatima Bayly', place: 'San Isidro, Lima', arch: 'Fatima Bayly', dev: TODO, interior: 'Fernando Velasco · Manuel Risso', year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'mediterranean', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: TODO, hint: 'ex "Mediterranean Home"', partner: 'Llosa Cortegana', place: 'Lima', arch: 'Llosa Cortegana Arquitectos', dev: TODO, interior: 'Patricia Llosa', year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'poseidon', typ: 'residences', loc: 'peru', sta: 'completed', ph: 5, name: 'Poseidón Beach House', partner: 'Beachfront', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'A contemporary beach house facing the Pacific, where glare and salt are constant.', challenge: TODO },
  { id: 'collector', typ: 'residences', loc: 'peru', sta: 'completed', ph: 5, name: "A Private Art Collector's Residence", partner: 'Private Collection', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'A home built around a serious collection, where the art sets every constraint.', challenge: TODO },
  { id: 'fisher', typ: 'residences', loc: 'usa', sta: 'progress', ph: 5, name: 'Fisher Island Apartment', partner: 'Adriana Hoyos', place: 'Fisher Island · Miami', arch: TODO, dev: TODO, interior: 'Adriana Hoyos', year: '2026', scale: TODO,
    concept: 'A private apartment in one of the most exclusive addresses in the United States.', challenge: TODO },
  { id: 'fourseasons', typ: 'residences', loc: 'usa', sta: 'completed', ph: 5, name: 'Four Seasons Penthouse', partner: 'Adriana Hoyos', place: 'Brickell · Miami', arch: TODO, dev: TODO, interior: 'Adriana Hoyos', year: TODO, scale: 'One penthouse',
    concept: 'A single penthouse in the Four Seasons Residences.', challenge: TODO },
  { id: 'golden', typ: 'residences', loc: 'usa', sta: 'completed', ph: 6, name: 'A Private Residence', partner: 'Oppenheim Architecture', place: 'Golden Beach · Florida', arch: 'Oppenheim Architecture', dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'A waterfront residence open to the water on every side.', challenge: TODO },
  { id: 'palmbeach', typ: 'residences', loc: 'usa', sta: 'completed', ph: 5, name: 'A Palm Beach Residence', partner: 'Wecselman Design', place: 'Palm Beach · Florida', arch: TODO, dev: TODO, interior: 'Wecselman Design', year: TODO, scale: TODO,
    concept: 'A Florida residence with strong daylight and a cool material palette.', challenge: TODO },
  // CONFIDENCIAL (NDA). El nombre real no aparece en ningún lado (tampoco en
  // este comentario — el repo es público). Comparte rótulo 'Global Music
  // Artist' con `musician`; se distinguen por ciudad. interior 'Studio Valle de
  // Valle' se mantiene: es crédito de estudio, no identifica al cliente.
  // 'arvida' es solo el id/carpeta interna, no el nombre del cliente.
  { id: 'arvida', typ: 'residences', loc: 'usa', sta: 'progress', ph: 6, name: 'Confidential', partner: 'Global Music Artist', place: 'Coral Gables · Florida', arch: TODO, dev: TODO, interior: 'Studio Valle de Valle', year: '2026', scale: '12 renovated rooms',
    concept: 'Plaster, iroko, microcement and felt — surfaces chosen to be felt, not to shine.',
    challenge: 'The screening room is the heart of the house, not an amenity. Light built in scenes rather than switches, with a dome above the stair that stays dark on purpose.' },
  { id: 'moraleja', typ: 'residences', loc: 'spain', sta: 'completed', ph: 5, name: 'La Moraleja Residence', partner: 'MORPH Arquitectura', place: 'Madrid', arch: 'MORPH Arquitectura', dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'A contemporary residence with one of the world’s top-100 architecture firms.', challenge: TODO },
  { id: 'marbella', typ: 'residences', loc: 'spain', sta: 'progress', ph: 0, name: 'Marbella Residence', partner: 'GC Studio', place: 'Marbella · Málaga', arch: 'GC Studio', dev: TODO, interior: TODO, year: '2026', scale: '6 floors', concept: TODO, challenge: TODO },
  // CONFIDENCIAL (NDA). Nombre real nunca aparece. Rótulo por tipo de cliente,
  // sin nacionalidad ni disciplina específica (sería pista identificable).
  { id: 'athlete', typ: 'residences', loc: 'confidential', sta: 'progress', ph: 0, name: 'Confidential', partner: 'Global Football Star', place: 'Confidential', arch: TODO, dev: TODO, interior: TODO, year: '2026', scale: TODO,
    concept: 'A residence for a client whose name we do not publish. Discretion is part of the brief.', challenge: TODO },
  // CONFIDENCIAL (NDA). Comparte rótulo 'Global Music Artist' con `arvida`; se
  // distinguen por ciudad (Miami vs Coral Gables), no por descriptores.
  { id: 'musician', typ: 'residences', loc: 'confidential', sta: 'progress', ph: 0, name: 'Confidential', partner: 'Global Music Artist', place: 'Miami · Florida', arch: TODO, dev: TODO, interior: TODO, year: '2026', scale: TODO, concept: TODO, challenge: TODO },
  { id: 'osaka', typ: 'hospitality', loc: 'peru', sta: 'completed', ph: 0, name: 'Osaka Nikkei', partner: 'Fine Dining', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'A high-end Nikkei restaurant in a sophisticated basement setting, blending Japanese and Peruvian cuisine.', challenge: TODO },
  { id: 'pescados', typ: 'hospitality', loc: 'peru', sta: 'completed', ph: 0, name: 'Pescados Capitales', partner: 'Fine Dining', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'carnaval', typ: 'hospitality', loc: 'peru', sta: 'completed', ph: 0, name: 'Carnaval Bar', partner: 'Bar', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'gaia', typ: 'hospitality', loc: 'caribbean', sta: 'completed', ph: 0, name: 'GAIA House & Grill', partner: 'Fine Dining', place: 'Iberostar Aruba', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'porsche', typ: 'commercial', loc: 'peru', sta: 'progress', ph: 0, name: 'Porsche Flagship', partner: 'Automotive', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: '2026', scale: TODO,
    concept: 'A car body is a curved mirror, not a surface — it returns every source above it. The work was not lighting the car; it was removing the fixtures from its reflection.', challenge: TODO },
  { id: 'maserati', typ: 'commercial', loc: 'peru', sta: 'completed', ph: 0, name: 'Maserati Retail', partner: 'Automotive', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'vivagym', typ: 'commercial', loc: 'peru', sta: 'completed', ph: 4, name: 'Viva Gym Building', partner: 'Wellness', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'A wellness brand that lives or dies by how the space makes the body feel.', challenge: TODO },
  { id: 'roosevelt', typ: 'commercial', loc: 'peru', sta: 'completed', ph: 0, name: 'Roosevelt School', partner: 'Institutional', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'saadiyat', typ: 'cultural', loc: 'middle-east', sta: 'completed', ph: 5, name: 'Saadiyat Nights', partner: 'Cultural Venue', place: 'Abu Dhabi · UAE', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'Venue lighting for an international festival programme in the desert — shaping arrival, circulation and atmosphere around the performance.', challenge: TODO },
  { id: 'yacht', typ: 'yachts', loc: 'confidential', sta: 'progress', ph: 4, name: 'Superyacht', partner: 'Private Asset · Marine', place: 'Confidential', arch: TODO, dev: TODO, interior: TODO, year: '2026', scale: TODO,
    concept: 'Marine environment, constant movement, and no tolerance for glare on glass at night.', challenge: TODO },
  { id: 'jet', typ: 'aviation', loc: 'confidential', sta: 'progress', ph: 4, name: 'Private Jet', partner: 'Private Asset · Aviation', place: 'Confidential', arch: TODO, dev: TODO, interior: TODO, year: '2026', scale: TODO,
    concept: 'Cabin lighting that has to work at altitude, across time zones, in a very small volume.', challenge: TODO },

  /* ── LEGACY · karenmannheim.com (scrape) ──
     Solo name/typología/ubicación cargados; el resto TODO para completar en
     fase 2 (arquitecto, interiorista, año, escala, concept, challenge). La
     ubicación sale del scrape: el portfolio residencial es de Lima salvo el de
     Miami (Collins). ph:0 hasta subir fotos a /{id}/{n}.jpg. */
  { id: 'san-isidro-home', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'San Isidro Home', partner: TODO, place: 'San Isidro · Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'san-isidro-apartment', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'San Isidro Apartment', partner: TODO, place: 'San Isidro · Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'park-apartment', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'Park Apartment', partner: TODO, place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'collins-apartment', typ: 'residences', loc: 'usa', sta: 'completed', ph: 0, name: 'Collins Apartment', partner: TODO, place: 'Collins Ave · Miami', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'starman', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'Starman', partner: TODO, place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'multifamily-acm', typ: 'multifamily', loc: 'peru', sta: 'completed', ph: 0, name: 'Multifamily by ACM', partner: TODO, place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'stylish-duplex', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'Stylish Duplex', partner: TODO, place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'private-residence-lima', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'Private Residence Lima', partner: TODO, place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },

  /* ── CONCEPT STUDIES · 6 — todo por definir con Karen ── */
  { id: 'c1', typ: 'yachts', loc: 'confidential', sta: 'concept', ph: 0, name: TODO, hint: 'Concepto 01 · Superyacht', partner: 'Concept study', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'c2', typ: 'yachts', loc: 'confidential', sta: 'concept', ph: 0, name: TODO, hint: 'Concepto 02 · Sailing yacht', partner: 'Concept study', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'c3', typ: 'aviation', loc: 'confidential', sta: 'concept', ph: 0, name: TODO, hint: 'Concepto 03 · Cabina de jet', partner: 'Concept study', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'c4', typ: 'hospitality', loc: 'confidential', sta: 'concept', ph: 0, name: TODO, hint: 'Concepto 04 · Resort', partner: 'Concept study', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'c5', typ: 'hospitality', loc: 'confidential', sta: 'concept', ph: 0, name: TODO, hint: 'Concepto 05 · Fine dining', partner: 'Concept study', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'c6', typ: 'cultural', loc: 'confidential', sta: 'concept', ph: 0, name: TODO, hint: 'Concepto 06 · Museo', partner: 'Concept study', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO }
];

/* ── Home: proyectos destacados ── */
export const FEATURED = ['pezet3', 'golden', 'arvida', 'saadiyat'];

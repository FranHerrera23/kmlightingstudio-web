import { TODO, type Project, type Photo } from './types';

/**
 * Molde de galería por defecto (fase 1) — la secuencia fija de la maqueta.
 * El ratio de cada slot vive acá (dato), no en el CSS. El componente lo lee
 * para reservar el alto del contenedor antes de que cargue la imagen.
 */
export const DEFAULT_GALLERY: Photo[] = [
  { ratio: '3:2', caption: '01 · Fachada' },
  { ratio: '4:3', caption: '02 · Entrada' },
  { ratio: '1:1', caption: '03 · Detalle' },
  { ratio: '3:2', caption: '04 · Sala principal' },
  { ratio: '1:1', caption: '05' },
  { ratio: '4:3', caption: '06 · Hall' },
  { ratio: '3:2', caption: '07 · Comedor' },
  { ratio: '4:3', caption: '08 · Habitación' },
  { ratio: '4:3', caption: '09 · Baño principal' },
  { ratio: '4:3', caption: '10 · Cierre' }
];

/*
 * AUDITORÍA DE ASSETS (contra https://arvida.kmlightingstudio.com/assets):
 *  · Resuelven 1.jpg: pezet1/2/3, blascerdena, poseidon, collector, fisher,
 *    fourseasons, golden, palmbeach, moraleja, vivagym, saadiyat, yacht, jet.
 *    El id coincide con la carpeta → sin assetDir.
 *  · arvida: la carpeta no sigue N.jpg (404 hoy) → placeholder; se estandariza.
 *  · CONFIDENCIALES (NDA) — athlete, musician y arvida. El nombre real nunca
 *    aparece (texto, URL, assetDir, alt, JSON-LD). NO se mapea assetDir aunque
 *    las fotos vivan bajo carpetas con nombre de cliente (ver assetDirOf).
 *
 * Copy en español (v3), no se traduce.
 */
export const PROJECTS: Project[] = [
  { id: 'pezet1', typ: 'multifamily', loc: 'peru', sta: 'completed', ph: 5, name: 'Pezet 1', partner: 'RAMSA', place: 'Av. Pezet 375 · San Isidro, Lima', arch: 'Robert A.M. Stern Architects', dev: 'ACM', interior: TODO, year: TODO, scale: '15 pisos · 31 departamentos · 4 townhouses',
    concept: 'Una torre de 15 pisos sobre la avenida más prestigiosa de Lima, con vista a las 45 hectáreas de árboles, lagunas y jardines del Lima Golf Club. Fijó el estándar que las dos siguientes tuvieron que igualar.',
    hinge: 'Un edificio que se mira desde el parque tiene que verse tan resuelto de noche como de día.',
    hingeEn: 'A building people look at from the park has to read as resolved at night as it does by day.',
    challenge: TODO },
  { id: 'pezet2', typ: 'multifamily', loc: 'peru', sta: 'completed', ph: 5, name: 'Pezet 2', partner: 'RAMSA', place: 'San Isidro, Lima', arch: 'Robert A.M. Stern Architects', dev: 'ACM', interior: TODO, year: TODO, scale: TODO,
    concept: 'La segunda etapa, sostenida al estándar que fijó la primera. Continuidad de detalle: las mismas aperturas, el mismo color, la misma sombra.', challenge: TODO },
  { id: 'pezet3', typ: 'multifamily', loc: 'peru', sta: 'completed', ph: 6, name: 'Pezet 3', partner: 'RAMSA', place: 'San Isidro, Lima', arch: 'Robert A.M. Stern Architects', dev: 'ACM', interior: TODO, year: TODO, scale: TODO,
    concept: 'Una identidad de iluminación coherente del lobby al penthouse, resuelta en el lenguaje de RAMSA.', challenge: TODO },
  { id: 'blascerdena', typ: 'multifamily', loc: 'peru', sta: 'completed', ph: 5, name: 'Blas Cerdeña', partner: 'RAMSA', place: 'San Isidro, Lima', arch: 'Robert A.M. Stern Architects', dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'Una torre multifamiliar de alta gama — una sola identidad de luz que hace que cada espacio común se sienta pensado.', challenge: TODO },
  { id: 'skyparadise', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'Sky Paradise', partner: 'Fátima Bayly', place: 'San Isidro, Lima', arch: 'Fátima Bayly', dev: TODO, interior: 'Fernando Velasco · Manuel Risso', year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'mediterranean', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: TODO, hint: 'ex "Mediterranean Home"', partner: 'Llosa Cortegana', place: 'Lima', arch: 'Llosa Cortegana Arquitectos', dev: TODO, interior: 'Patricia Llosa', year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'poseidon', typ: 'residences', loc: 'peru', sta: 'completed', ph: 5, name: 'Poseidón Beach House', partner: TODO, subtipo: 'Frente al mar', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'Una casa de playa contemporánea frente al Pacífico, donde el deslumbramiento y la sal son constantes.', challenge: TODO },
  { id: 'collector', typ: 'residences', loc: 'peru', sta: 'completed', ph: 5, name: 'Residencia de un coleccionista', partner: TODO, subtipo: 'Colección privada', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'Una casa construida alrededor de una colección seria, donde el arte fija todas las restricciones.', challenge: TODO },
  { id: 'fisher', typ: 'residences', loc: 'usa', sta: 'progress', ph: 5, name: 'Fisher Island', partner: 'Adriana Hoyos', place: 'Fisher Island · Miami', arch: TODO, dev: TODO, interior: 'Adriana Hoyos', year: '2026', scale: TODO,
    concept: 'Un departamento privado en una de las direcciones más exclusivas de Estados Unidos.', challenge: TODO },
  { id: 'fourseasons', typ: 'residences', loc: 'usa', sta: 'completed', ph: 5, name: 'Four Seasons Penthouse', partner: 'Adriana Hoyos', place: 'Brickell · Miami', arch: TODO, dev: TODO, interior: 'Adriana Hoyos', year: TODO, scale: 'Un penthouse',
    concept: 'Un penthouse en las Four Seasons Residences.', challenge: TODO },
  { id: 'golden', typ: 'residences', loc: 'usa', sta: 'completed', ph: 6, name: 'Residencia privada', partner: 'Oppenheim Architecture', place: 'Golden Beach · Florida', arch: 'Oppenheim Architecture', dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'Una residencia frente al agua, abierta a la bahía por todos sus lados.', challenge: TODO },
  { id: 'palmbeach', typ: 'residences', loc: 'usa', sta: 'completed', ph: 5, name: 'Residencia en Palm Beach', partner: 'Wecselman Design', place: 'Palm Beach · Florida', arch: TODO, dev: TODO, interior: 'Wecselman Design', year: TODO, scale: TODO,
    concept: 'Una residencia en Florida con luz natural fuerte y una paleta de materiales fríos.', challenge: TODO },
  // CONFIDENCIAL (NDA). Nombre real nunca aparece (tampoco en este comentario —
  // el repo es público). Comparte rótulo 'Global Music Artist' con `musician`;
  // se distinguen por ciudad. interior 'Studio Valle de Valle' se mantiene: es
  // crédito de estudio. 'arvida' es solo el id/carpeta interna.
  { id: 'arvida', typ: 'residences', loc: 'usa', sta: 'progress', ph: 6, name: 'Confidencial', partner: 'Global Music Artist', place: 'Coral Gables · Florida', arch: TODO, dev: TODO, interior: 'Studio Valle de Valle', year: '2026', scale: '12 ambientes renovados',
    concept: 'Yeso, iroko, microcemento y fieltro — superficies elegidas para sentirse, no para brillar.',
    challenge: 'La sala de cine es el corazón de la casa, no una amenidad. Luz construida en escenas y no en interruptores, con una cúpula sobre la escalera que se mantiene oscura a propósito.' },
  { id: 'moraleja', typ: 'residences', loc: 'spain', sta: 'completed', ph: 5, name: 'La Moraleja', partner: 'MORPH Arquitectura', place: 'Madrid', arch: 'MORPH Arquitectura', dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'Una residencia contemporánea con uno de los cien mejores estudios de arquitectura del mundo.', challenge: TODO },
  { id: 'marbella', typ: 'residences', loc: 'spain', sta: 'progress', ph: 0, name: 'Residencia en Marbella', partner: 'GC Studio', place: 'Marbella · Málaga', arch: 'GC Studio', dev: TODO, interior: TODO, year: '2026', scale: '6 pisos', concept: TODO, challenge: TODO },
  // CONFIDENCIAL (NDA). Rótulo por tipo de cliente, sin nacionalidad ni disciplina.
  { id: 'athlete', typ: 'residences', loc: 'confidential', sta: 'progress', ph: 0, name: 'Confidencial', partner: 'Global Football Star', place: 'Confidencial', arch: TODO, dev: TODO, interior: TODO, year: '2026', scale: TODO,
    concept: 'Una residencia para un cliente cuyo nombre no publicamos. La discreción es parte del encargo.', challenge: TODO },
  // CONFIDENCIAL (NDA). Comparte rótulo 'Global Music Artist' con `arvida`; se distinguen por ciudad.
  { id: 'musician', typ: 'residences', loc: 'usa', sta: 'progress', ph: 0, name: 'Confidencial', partner: 'Global Music Artist', place: 'Miami · Florida', arch: TODO, dev: TODO, interior: TODO, year: '2026', scale: TODO, concept: TODO, challenge: TODO },
  { id: 'osaka', typ: 'hospitality', loc: 'peru', sta: 'completed', ph: 0, name: 'Osaka Nikkei', partner: TODO, subtipo: 'Alta cocina', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'Un restaurante nikkei de alta gama en un sótano sofisticado, donde se cruzan la cocina japonesa y la peruana.', challenge: TODO },
  { id: 'pescados', typ: 'hospitality', loc: 'peru', sta: 'completed', ph: 0, name: 'Pescados Capitales', partner: TODO, subtipo: 'Alta cocina', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'carnaval', typ: 'hospitality', loc: 'peru', sta: 'completed', ph: 0, name: 'Carnaval Bar', partner: TODO, subtipo: 'Bar', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'gaia', typ: 'hospitality', loc: 'caribbean', sta: 'completed', ph: 0, name: 'GAIA House & Grill', partner: TODO, subtipo: 'Alta cocina', place: 'Iberostar Aruba', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'porsche', typ: 'commercial', loc: 'peru', sta: 'progress', ph: 0, name: 'Porsche Flagship', partner: TODO, subtipo: 'Automotriz', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: '2026', scale: TODO,
    concept: 'La carrocería de un auto es un espejo curvo, no una superficie: devuelve cada fuente que tenga encima. El trabajo no era iluminar el auto, era sacar las luminarias de su reflejo.', challenge: TODO },
  { id: 'maserati', typ: 'commercial', loc: 'peru', sta: 'completed', ph: 0, name: 'Maserati', partner: TODO, subtipo: 'Automotriz', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'vivagym', typ: 'commercial', loc: 'peru', sta: 'completed', ph: 4, name: 'Edificio Viva Gym', partner: TODO, subtipo: 'Wellness', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'Una marca de bienestar que vive o muere por cómo el espacio hace sentir al cuerpo.', challenge: TODO },
  { id: 'roosevelt', typ: 'commercial', loc: 'peru', sta: 'completed', ph: 0, name: 'Colegio Roosevelt', partner: TODO, subtipo: 'Institucional', place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'saadiyat', typ: 'cultural', loc: 'middle-east', sta: 'completed', ph: 5, name: 'Saadiyat Nights', partner: TODO, subtipo: 'Venue cultural', place: 'Abu Dhabi · EAU', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO,
    concept: 'Iluminación del venue de un festival internacional en el desierto — dando forma a la llegada, la circulación y la atmósfera alrededor del espectáculo.', challenge: TODO },
  { id: 'yacht', typ: 'yachts', loc: 'confidential', sta: 'progress', ph: 4, name: 'Superyate', partner: 'Activo privado', subtipo: 'Marino', place: 'Confidencial', arch: TODO, dev: TODO, interior: TODO, year: '2026', scale: TODO,
    concept: 'Ambiente marino, movimiento constante, y cero tolerancia al reflejo sobre el vidrio de noche.', challenge: TODO },
  { id: 'jet', typ: 'aviation', loc: 'confidential', sta: 'progress', ph: 4, name: 'Jet privado', partner: 'Activo privado', place: 'Confidencial', arch: TODO, dev: TODO, interior: TODO, year: '2026', scale: TODO,
    concept: 'Iluminación de cabina que tiene que funcionar en altura, cruzando husos horarios, en un volumen muy chico.', challenge: TODO },

  /* ── LEGACY · karenmannheim.com (scrape) ── name/tipología/ubicación cargados; resto TODO. */
  { id: 'san-isidro-home', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'Casa en San Isidro', partner: TODO, place: 'San Isidro · Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'san-isidro-apartment', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'Departamento en San Isidro', partner: TODO, place: 'San Isidro · Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'park-apartment', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'Departamento Park', partner: TODO, place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'collins-apartment', typ: 'residences', loc: 'usa', sta: 'completed', ph: 0, name: 'Departamento en Collins', partner: TODO, place: 'Collins Ave · Miami', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'starman', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'Starman', partner: TODO, place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'multifamily-acm', typ: 'multifamily', loc: 'peru', sta: 'completed', ph: 0, name: 'Multifamiliar de ACM', partner: TODO, place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'stylish-duplex', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'Dúplex', partner: TODO, place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'private-residence-lima', typ: 'residences', loc: 'peru', sta: 'completed', ph: 0, name: 'Residencia privada en Lima', partner: TODO, place: 'Lima', arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },

  /* ── ESTUDIOS CONCEPTUALES · 6 — todo por definir ── */
  { id: 'c1', typ: 'yachts', loc: 'confidential', sta: 'concept', ph: 0, name: TODO, hint: 'Concepto 01 · Superyate', partner: TODO, subtipo: 'Estudio conceptual', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'c2', typ: 'yachts', loc: 'confidential', sta: 'concept', ph: 0, name: TODO, hint: 'Concepto 02 · Velero', partner: TODO, subtipo: 'Estudio conceptual', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'c3', typ: 'aviation', loc: 'confidential', sta: 'concept', ph: 0, name: TODO, hint: 'Concepto 03 · Cabina de jet', partner: TODO, subtipo: 'Estudio conceptual', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'c4', typ: 'hospitality', loc: 'confidential', sta: 'concept', ph: 0, name: TODO, hint: 'Concepto 04 · Resort', partner: TODO, subtipo: 'Estudio conceptual', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'c5', typ: 'hospitality', loc: 'confidential', sta: 'concept', ph: 0, name: TODO, hint: 'Concepto 05 · Alta cocina', partner: TODO, subtipo: 'Estudio conceptual', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO },
  { id: 'c6', typ: 'cultural', loc: 'confidential', sta: 'concept', ph: 0, name: TODO, hint: 'Concepto 06 · Museo', partner: TODO, subtipo: 'Estudio conceptual', place: TODO, arch: TODO, dev: TODO, interior: TODO, year: TODO, scale: TODO, concept: TODO, challenge: TODO }
];

/* ── Home: proyectos destacados ── */
// §8 brief 06 · 'arvida' es confidencial (nombre 'Confidencial', fotos 404) — un
// rectángulo negro en la fila destacada. Sale de "Obra seleccionada" hasta que
// haya foto de detalle aprobada; se reemplaza por Four Seasons Brickell (un
// destacado de §7). Sigue en el índice, donde el placeholder es legítimo.
export const FEATURED = ['pezet3', 'golden', 'fourseasons', 'saadiyat'];

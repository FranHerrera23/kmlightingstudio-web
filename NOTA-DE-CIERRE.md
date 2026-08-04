# KMLS — NOTA DE CIERRE DE SESIÓN CC

## ⚠️ `RESEND_API_KEY` sigue sin cargar — el formulario de /contacto NO envía (loguea).

Es variable de entorno en Vercel; CC no puede resolverlo. Todo lead que llegue se pierde
hasta que se cargue `RESEND_API_KEY` (+ `CONTACT_FROM` con dominio verificado).

---

## QUÉ SE EJECUTÓ (todo committeado y pusheado a `main` → deploy en Vercel)

| Commit | Qué |
|---|---|
| `7df9735` | **Servicios Part A** (brief 02 §A): DatoText + 7 narrativas A.4 con noindex por `[DATO]`, apertura A.1, disciplina A.2, scope A.3, entradas de CTA por página, quita "Sociedad" de la home |
| `9c49d94` | **Contenido rutas reales** (brief 05 §A.1): `/contenido?tab=X` → `/contenido/{conversaciones,recorridos,prensa}` con 301 real, canonical y sitemap. Slug artículo 1 → `cuanto-cuesta-un-proyecto-de-iluminacion` con 301. B.4 autor, B.5 tiempos de lectura → TODO |
| `6218486` | **Estudio** (brief 04 §A + brief 05 §B): apertura, origen "tocando puertas", trayectoria con sujeto Karen, barra de datos en dos bloques (Karen/KMLS, sin 80+), Forbes |
| `33c74a1` | **Nav v4** (brief 01 §1): logo izquierda, links en funnel, sólido desde top, toggle ES/EN, panel de Servicios con contadores live |
| `25d6a5f` | **Buildbar** fuera de producción (§C.4) |
| `ac48e83` | **EN canónico** (kmls-copy-en.md): `storyEn` de las 7 verticales, correcciones Servicios/CTA |
| `a52fabf` | **Home** §6.1: estudios sube junto a Obra seleccionada, título a --t2 |
| `60e56a7` | **Tecnología** (brief 02 §B): apertura B.1, grilla a --t2 con la única cursiva, filtros a 3 grupos, quita BuildNote TRAZZO de prod |
| `b9e549a` | **Contacto** §C.4 (bajada Lima/Florida/Marbella) + **Contenido** §B.1/§B.2 (sujeto Karen) |

### Brief 06 — auditoría de producción (todo committeado y pusheado)

| Commit | Qué |
|---|---|
| `3ec425e` | §3/§4/§9: `Seguinos`→`Síguenos`, regla de sujeto en home tech (`el nuestro`→`las fuentes que especificamos`) + link a /tecnologia, footer sin links muertos |
| `00ed3c6` | §1/§2 CRÍTICO: canonical/og:url a **www sin prefijo /es** (localizedPath estaba invertido) + hreflang; meta-description de /estudio corregida. Verificado: 3 canónicas dan 200 |
| `6aaec89` | §5/§8: slugs ES de artículos 2 y 3 + 301; tile confidencial fuera de la fila destacada |
| `709bd8f` | §6: índice de Contenido como hub (Artículos + 3 teasers), no acumulado; ruta /contenido/articulos; sin URLs duplicadas |
| `ee07665` | §7: grilla de estudios — 4 pares en home, links en /estudio, deep-link `/proyectos?estudio=` (server) |

**Auditoría de cierre (brief 05 §D + brief 06) — limpia:** cero voseo (incl. messages/aria/alt/metadata) ·
cero "80 personas"/"tres continentes" en copy · cero posesivos sobre el equipo · cero `href="#"` ·
Madrid solo como ubicación de proyecto · `foundingDate 2023` · SEIS PAÍSES · canonical www sin `/es`
(200, no redirect) · los 4 tabs de Contenido en ruta propia sin listados duplicados ·
`TODO`/`[DATO]` en rojo y fuera del sitemap · build limpio · gate NDA limpio · ningún dato inferido.

**Decisión de host cerrada por Fran:** `www` es la canónica.

---

## QUÉ FALTA (ejecutable por CC — no empezado o parcial)

**Proyectos — brief 03 (la unidad grande que queda).** Nada tocado aún. Ejecutable:
- A.1 voseo `Filtrá`→`Filtra` (verificar)
- A.3 ocultar los 6 conceptos del listado por defecto
- A.5 ubicación vacía → `TODO` rojo (hoy `—` gris)
- A.4 **[MODELO]** separar `partner` (solo estudios/NDA) de `subtipo` (rubro/descriptor)
- B.2 **[MODELO]** campo "bisagra" (una línea al cierre del concepto); escribir las 34 es **[FRAN]**
- B.4 créditos duplicados: barra del hero a 3 campos, ficha completa solo al final
- B.5 **[MODELO]** campo atribución pre-2023 (se muestra si `año < 2023`)
- B.7 enlaces bidireccionales (partner→proyectos, tipología→/servicios, proyecto→estudio)
- B.9 bugs: `SIGUIENTE PROYECTO` doble render (el de colisión con nav ya lo arregla el nav sólido)

**Contenido:**
- A.5 bloque de captura al pie de cada artículo (copy EN/ES ya está en kmls-copy-en.md §5 A.5) — pendiente
- A.2 jerarquía entre pestañas → resuelto por §6 (hub con Artículos primero + bloques de acceso)
- A.3 transcripciones de video (bloqueante para AEO, pero es trabajo de transcripción externo)

**Infra — §C/§D:**
- Gatear las BuildNote restantes fuera de producción (home mapa) — cuidando que no quede caja vacía
  (la de /tecnologia ya salió; la de conversaciones queda como nota de fase 2)
- BreadcrumbList en fichas de proyecto y artículos (no existe)

---

## BLOQUEADO — NO EJECUTAR

- **Bloque TRAZZO en /estudio** (§B.4): copy ES y EN listos en los briefs; NO se publica hasta
  que Fran y Karen aprueben. Sigue sin renderizar.

## NECESITA A FRAN

- Reconciliar **42 vs 40 proyectos** (el panel del nav ya muestra los contadores live = 42)
- Copy pendiente en ES: home §5.1 (a quién), §5.2 (cuándo), §7.5 (label ex-"Sociedad"),
  cierre de /estudio (§B.3), entradas de CTA de Proyectos y Estudio, reescritura del
  instrumento de Arvida al arquitecto (§B.3 tecnología)
- Las tres direcciones de oficina · headcount real de KMLS · rótulo de Tatiana (Marbella) ·
  orden de cards de Servicios · nombres de proyectos · tiempos de lectura de artículos
- **Revisar `en-strings-para-revision.md`**: apóstrofes restaurados del encoding de kmls-copy-en.md
- Infra Vercel: `RESEND_API_KEY`, `CONTACT_FROM`, canónica raíz vs www, noindex de arvida ($40K)

## NECESITA A KAREN

- 34 challenges de ficha · 4 `[DATO]` de verticales (multifamiliar, hotelería, comercial,
  aviación — hoy noindex) · quote por proyecto · rangos por m² del artículo 1

## NECESITA ASSETS

- ~340 fotos de proyecto · 7 imágenes de verticales · 5 retratos · 8 thumbnails de video · hero
- Sin fotos siguen bloqueados: §6.3 pares estudio+proyecto en home · §7.3 tile confidencial ·
  §7.4 clásica/contemporánea · cards de verticales

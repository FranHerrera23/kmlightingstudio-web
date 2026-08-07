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

### Proyectos — brief 03 + cierre (committeado y pusheado)

| Commit | Qué |
|---|---|
| `ddc8088` | brief 03: A.3 ocultar conceptos · A.4 partner/subtipo · A.5 ubicación roja · B.2 bisagra (Pezet 1) · B.4 créditos a 3 · B.5 atribución pre-2023 · B.7 enlaces bidireccionales · B.9 doble render |
| `146959d` | Contenido A.5 (captura al pie del artículo) + BuildNote fuera de producción (§C.4) |

### Brief 07 — verificaciones y cierre técnico (committeado y pusheado)

| Commit | Qué |
|---|---|
| `4784841` | §4 BreadcrumbList en las 4 rutas dinámicas · §2 meta-description de /proyectos · §3 /estudio 12 linkeados |

**Método de auditoría (nuevo, §5): contra el HTML servido, no contra el repo.**

- **§1 · el 29 vs 36 — resuelto.** En `projects.ts` hay **42** proyectos: 6 `concept`, 8 `progress`,
  28 `completed`. El índice con filtros en "Todas/Todas/Todos" oculta los 6 conceptos → **36**, y
  el contador visible dice **36 proyectos**: grid y contador coinciden. **No hay filtrado silencioso.**
  El "29" del reporte anterior fue un **artefacto de mi grep** (`href` con `sort -u` subcontó), no un
  número del sitio. El total de 42 sigue sin reconciliar contra el CONTEXT-BRIEF (~40) → **[FRAN]**.
- **§2 · metadata de /proyectos — presente.** El HTML servido trae `title`, `description`, `canonical`
  (www, sin `/es`), `og:*` y `alternates.languages`. El "solo meta-viewport" fue caché del fetcher.
  Se aplicó igual la meta-description literal nueva del brief (es+en).
- **§3 · brief 06 confirmado en todo el sitio** (HTML servido): canonical www sin `/es` y 200 en
  `/ · /estudio · /contenido · /tecnologia · /contacto · /servicios` + 4 dinámicas · `Síguenos` ·
  cero `href="#"` · sin `el nuestro` + link a /tecnologia · 301 de slugs 2 y 3 · 4 tabs con ruta
  propia sin listado duplicado · tile confidencial fuera de featured · 12 estudios linkeados.
- **§4 · BreadcrumbList** en `/proyectos/[slug]`, `/servicios/[slug]`, `/tecnologia/[slug]`,
  `/contenido/[slug]`, con item URLs en el host/prefijo del canonical.
- **§5 · auditoría de producción limpia:** 6 rutas (2 dinámicas) 200 + canonical + description ·
  cero voseo · cero atribución al estudio (incl. metadata) · cero `href="#"` · cero posesivos ·
  `foundingDate 2023` · SEIS países · build limpio · gate NDA limpio.

**Todo lo ejecutable por CC (briefs 01–07) está hecho y verificado contra producción.**

### Brief 08 — infraestructura de demanda / AEO (committeado y pusheado)

| Commit | Qué |
|---|---|
| `acc4f09` | §3 llms.txt/ai.txt desde datos · §7 og:image confidencial → genérico · §4 bloque citable por pregunta |

**Tarea 1 — auditoría contra HTML crudo (`curl`), ruta por ruta:**

*1.1 Hubs (links en crudo):* `/proyectos` **36** ✓ · `/tecnologia` **8** ✓ · `/servicios` **7** ✓ ·
`/contenido` hub con artículos + teasers ✓ · `/contenido/articulos` 3 artículos ✓.
**La trampa de `useSearchParams` NO se repitió** — los filtros client SSRean la lista completa.
Con JS deshabilitado se leen enteros; con JS los chips filtran sobre el DOM ya servido.

*1.2 Cuerpo en crudo (palabras · JSON-LD):* artículo 1 **2511** · artículo 2 **2508** · artículo 3
**2523** · pezet1 **2728** · arvida **2444** · servicios/aviacion **2900** · tecnologia/marine-uplight
**2246** · estudio **2932** · conversaciones **2301** · recorridos **2294**. Cada una con su JSON-LD
(`Article`+`BreadcrumbList` en artículos — `FAQPage` omite por respuestas en TODO; `CreativeWork`+
`BreadcrumbList` en proyectos).

*1.3 Metadata de rutas hijas de Contenido:* cada una con **title y canonical propios**
(Contenido/Artículos/Conversaciones/Recorridos/Prensa) — sin competencia entre URLs.

**Tarea 2** — nada que arreglar: los hubs ya sirven las listas en crudo.
**Tarea 3** — `/llms.txt` y `/ai.txt` generados desde el modelo (NDA con rótulo, TODO excluidos, 0 nombres reales).
**Tarea 4** — el slot citable existe (`.capsule`, marcado propio); se lo encabezó con la pregunta literal.
**Tarea 5** — `VideoObject` (inLanguage+transcript) y la transcripción en página ya existen; contenido [EXTERNO].
**Tarea 7** — og:image confidencial → `/og` genérico; proyectos no-confidenciales usan su foto.

*Pendiente de copy (no molde):* slots de pregunta en páginas comerciales para ¿en qué etapa? (home §5.2)
y ¿qué incluye el honorario? — el copy es **[FRAN]**. Después del deploy: re-indexar en Search Console
`/contenido`, las 4 hijas, los 3 artículos y 5 proyectos.

## QUÉ FALTA (ya no es de CC)

Nada ejecutable por CC. Lo pendiente depende de Fran, Karen, assets o servicios externos
(ver §5/§6 del brief 07 y las secciones de arriba). Nota de deviación menor: `/estudio` linkea
los 12 estudios; 4 no tienen obra catalogada en la data → su página filtrada muestra el estado
vacío honesto ("ningún proyecto coincide"). Si molesta, se decide caso por caso — **[FRAN]**.

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

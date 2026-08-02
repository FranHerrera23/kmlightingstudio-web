# KM LIGHTING STUDIO — BRIEF DE BUILD
### Para Claude Code · Fase 1
### v2 · agosto 2026

---

## QUÉ ES ESTO

`index.html` es la maqueta aprobada. **Estructura, navegación, taxonomía y sistema de diseño están cerrados.** Tu trabajo es convertirla a Next.js sin cambiar decisiones de diseño.

Lo que está en rojo se completa en fase 2. No lo inventes.

---

## 1 · CONVERSIÓN A NEXT.JS

**Stack:** Next.js 15 App Router · TypeScript · CSS Modules o Tailwind con los tokens de abajo · `next-intl`

### Rutas

```
/                          Home
/projects                  Índice filtrable
/projects/[slug]           Página de proyecto  ← indexable, no modal
/services                  Índice de verticales
/services/[slug]           Vertical + work process
/products                  Specification library
/about                     Estudio · Karen · equipo
/journal                   Índice — SOLO EN, sin prefijo de idioma
/journal/[slug]            Artículo
/contact
```

Idiomas: `/es/`, `/pt/`, `/ru/` sobre todo **menos** `/journal`. EN es la raíz sin prefijo.

### Datos

El bloque `DATA LAYER` del `<script>` pasa a `/content/`:

```
content/projects.ts      P[]      · ~34 entradas
content/verticals.ts     VERT[]   · 7
content/scope.ts         SCOPE[] + DOSS[]
content/firms.ts         FIRMS[] · TEAM[] · OFF[]
content/products.ts      FIX[] + DRAW{}
content/journal.ts       ART[]
```

`TODO = '__TODO__'` se mantiene como centinela. Todo campo `TODO`:
- se renderiza con la clase `.flag` (rojo) en desarrollo
- **excluye la página del `sitemap.ts`**
- nunca se completa por inferencia

---

## 2 · SISTEMA DE DISEÑO — no negociable

### Color

```css
--paper:#FAFAF8    /* fondo. Blanco roto, no blanco puro:
                      la mitad del portfolio es fotografía nocturna
                      y el blanco puro corta demasiado duro contra ella */
--paper-2:#F2F1ED  /* segundo plano */
--ink:#14171C      /* negro con un grado de azul */
--ink-2:#4A4F57
--ink-3:#8B9099
--rule:#E3E2DD
--gold:#A6853F     /* acento cálido — la luz */
--gold-lt:#C9AC72
--navy:#1B2A41     /* acento frío — la arquitectura */
--navy-lt:#33455F
```

**Los dos acentos tienen trabajos distintos.** Oro = todo lo que habla de luz: labels de sección, acentos en fondo oscuro, hover de dibujos técnicos. Navy = todo lo que habla de rigor: bloque de dossier, retrato de Karen, labels técnicos. **Nunca los dos en el mismo bloque.**

### Tipografía

Archivo para todo. Fraunces italic **una sola vez en toda la página**.

```css
--t1:clamp(42px,7.4vw,124px)   /* hero y títulos de sección */
--t2:clamp(26px,3.4vw,54px)    /* titulares de bloque */
--t3:clamp(17px,1.35vw,21px)   /* lead */
--t4:15px                      /* cuerpo */
--tm:10.5px                    /* micro labels */
```

**Cuatro pasos. No inventes tamaños intermedios.** Si algo no encaja, es problema de jerarquía, no de tipografía.

### Reglas que vienen de corregir la v1

**1 · Una cursiva por página.** En v1 estaba en seis titulares y se volvió textura. Si aparece en todos lados, deja de ser acento.

**2 · Cero numeración de sección.** El `01 —`, `02 —` venía de una propuesta comercial. Un sitio no es un documento.

**3 · Aire al doble.** `--sec:clamp(120px,17vh,230px)`. Si una sección se siente apretada, no achiques la tipografía: agregá aire.

**4 · Fondo antes que figura.** Cada bloque tiene UNA idea. Si hay dos, son dos bloques.

### Espaciado

```css
--pad:clamp(24px,5.6vw,96px)     /* margen lateral */
--sec:clamp(120px,17vh,230px)    /* entre secciones */
--sec-s:clamp(72px,10vh,130px)   /* secciones cortas */
```

---

## 3 · ANIMACIÓN

Tres gestos. Nada más. Todos con `cubic-bezier(.16,1,.3,1)`.

| Clase | Qué hace | Dónde |
|---|---|---|
| `.mask > i` | La línea sube desde detrás de un borde | Solo en `h1`/`h2`. Una línea por `<span class="mask">` |
| `.rise` | Bloque sube 30px con fade | Párrafos, cards, bloques |
| `.zin` | Imagen entra desde `scale(1.08)` | Todo contenedor de foto |

Escalonado con `.d1 .d2 .d3` = 70ms de paso.

**Un solo IntersectionObserver** para los tres, `threshold:.12`, `rootMargin:'0px 0px -8% 0px'`, y `unobserve` después de disparar. **Se anima una vez, no en cada scroll.**

`prefers-reduced-motion` desactiva todo. Ya está en el CSS.

### Lo que NO hacemos

Sin parallax. Sin scroll horizontal forzado. Sin cursor personalizado. Sin scroll-jacking. Sin contadores animados. Si necesita una librería, no va.

---

## 4 · PÁGINA DE PROYECTO

**La pieza más importante del sitio.** Se repite en ~34 proyectos, así que tiene que ser rígida.

### Secuencia fija

```
1  Hero              foto full-bleed, título, ubicación
2  Créditos          barra oscura — arquitecto, interiorista, developer, año
3  Foto 01           fachada
4  CONCEPT           2-3 frases
5  Fotos 02-03       par asimétrico
6  Foto 04           entrada / sala
7  Fotos 05-06       par invertido
8  CHALLENGE         2-3 frases con un dato duro
9  Foto 07           comedor
10 Fotos 08-09       par
11 Foto 10           cierre, con margen
12 Pull quote
13 Ficha técnica
14 Siguiente proyecto
```

**Los créditos van arriba, antes del primer scroll.** El arquitecto que llega a validar busca "RAMSA", no la narrativa. Yodezeen los pone al final; nosotros no.

### Ratios de imagen — crítico

**Las fotos son horizontales (4:3, 3:2) o cuadradas. NUNCA panorámicas.**

El contenedor se adapta a la foto, no al revés:

```css
.full.r43{aspect-ratio:4/3}
.full.r32{aspect-ratio:3/2}
.full.r11{aspect-ratio:1/1}
```

**Prohibido `object-fit:cover` sobre un contenedor 16:9 con una foto 4:3.** Se pierde un cuarto de la imagen, y en lighting lo que se pierde suele ser el techo — donde está el trabajo.

Cada entrada de foto declara su ratio en los datos. El componente lo lee.

El ritmo lo da el **ancho**: borde a borde → con márgenes → en par 1.5/1 → en par 1/1.5 → con aire. Nunca dos compases iguales seguidos.

### Orden de fotos

Cronológico de recorrido, igual en todos los proyectos:

**fachada → entrada → sala → hall → comedor → habitaciones → baños → exteriores**

Hospitality no tiene fachada: arranca en entrada.

---

## 5 · PERFORMANCE

Con 34 proyectos × 10 fotos, es donde el sitio se cae si no se cuida.

- `next/image` en todo. Nunca `<img>` crudo.
- `sizes` correcto por breakpoint — sin esto Next sirve la imagen full a un thumbnail
- AVIF + WebP con fallback
- `priority` solo en el hero. Todo lo demás lazy.
- `placeholder="blur"` con blurDataURL generado en build
- Objetivo: LCP < 2.5s en 4G, CLS < 0.1

El CLS se rompe si el contenedor no reserva espacio. Por eso el ratio va en los datos, no en el CSS por caso.

---

## 6 · SEO / AEO

```
app/robots.ts    GPTBot · OAI-SearchBot · ChatGPT-User · ClaudeBot
                 Claude-SearchBot · PerplexityBot · Google-Extended
                 Applebot-Extended — nombrados explícitamente

app/sitemap.ts   dinámico · lastModified real
                 EXCLUYE cualquier página con campos TODO
```

JSON-LD:
- Layout raíz → `Organization` + `Person` (Karen) + `LocalBusiness` por oficina
- `/projects/[slug]` → `CreativeWork` con `creator`, `locationCreated`, `dateCreated`, `contributor` (arquitecto)
- `/journal/[slug]` → `Article` + `FAQPage` + `author` + `reviewedBy`

`hreflang` en todas las rutas traducidas. **El Journal queda fuera** — solo EN, sin alternates.

---

## 7 · ORDEN DE TRABAJO

**Paso 1 · Scaffold**
Next.js, tokens, tipografía, layout, nav con router. Sin contenido.

**Paso 2 · Datos**
Migrar `DATA LAYER` a `/content/`. Tipar todo. `TODO` como centinela.

**Paso 3 · Home**
Todos los bloques. Acá se calibra el sistema de animación.

**Paso 4 · Proyectos**
Índice con filtro de 3 ejes + página de proyecto. **La pieza más importante.**

**Paso 5 · Resto**
Services, Products, About, Journal, Contact.

**Paso 6 · SEO + performance**
robots, sitemap, JSON-LD, auditoría de imágenes.

---

## 8 · ACEPTACIÓN

- [ ] Ninguna foto deformada ni recortada por forzar ratio
- [ ] Una sola cursiva por página
- [ ] Cero numeración de sección
- [ ] Animaciones disparan una vez, no en cada scroll
- [ ] `prefers-reduced-motion` desactiva todo
- [ ] Cada proyecto tiene URL propia e indexable
- [ ] Páginas con `TODO` fuera del sitemap
- [ ] LCP < 2.5s en 4G simulado
- [ ] Nav legible sobre hero oscuro y sobre fondo claro
- [ ] Sin nombres bajo NDA en ningún lado del HTML renderizado

---

## 9 · LO QUE VIENE DESPUÉS (no ahora)

**Fase 2 · Material** — ~340 fotos, nombres reales, Concept y Challenge, datos duros, imágenes de Services, los 6 conceptos.

**Fase 3 · Idiomas** — ES, PT, RU.

**Fase 4 · Journal** — los artículos, solo EN.

---

## DECISIÓN QUE SIGUE ABIERTA

**TRAZZO vs KMLS.** Todo el portfolio histórico está firmado "Lighting design: TRAZZO". Si son dos marcas separadas, `/products` con códigos de parte pertenece a TRAZZO, no al estudio de diseño.

Por eso `/products` está construido como *"qué especificamos y por qué"* — sin SKUs ni precios. Funciona bajo KMLS sin contradecir el posicionamiento de diseñador independiente.

**No cargar datos de fabricante hasta que esto se resuelva.**

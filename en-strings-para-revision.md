# EN — strings escritos por CC, para revisión de Fran

CONTEXT-BRIEF §4 dice literal: *"CC no traduce ni reescribe copy. Los textos llegan escritos."*
El catálogo inglés que promete `routing.ts` no puede quedar vacío, así que CC tradujo
los strings **funcionales** para no romper la página. Todos los que tradujo están acá,
con el ES al lado, para que Fran los revise en una pasada y ajuste tono.

**Regla aplicada de acá en adelante:**
- Funcional (labels, botones, eyebrows, scope, nav) → CC traduce y lo agrega acá.
- Narrativo (tiene una decisión de tono adentro) → CC **no** traduce, va `TODO` hasta que Fran lo escriba.

Los ítems marcados **⚠ NARRATIVO** abajo se tradujeron *antes* de que esta regla se cerrara
(quedan, por decisión de Fran: no revertir a `TODO`), pero son los que más piden ojo de Fran:
tienen decisión de tono adentro y bajo la regla nueva habrían ido `TODO`.

---

## Servicios · `/servicios` (`messages/*.json` → `services`)

### A.1 · Apertura — ⚠ NARRATIVO (capa emocional trasladada desde "Sociedad")

| key | ES (brief 02 §A.1, literal) | EN (CC, revisar tono) |
|---|---|---|
| `openTitleLines[0]` | Tu cliente nunca va a ver el plano. | Your client will never see the plan. |
| `openTitleLines[1]` | Va a ver el espacio a las ocho de la noche. | They'll see the space at eight at night. |
| `openBody1` | Pasas meses en la planta, en los materiales, en la proporción. Y el día de la entrega nada de eso se juzga con luz de mediodía. Se juzga con la luz encendida. | You spend months on the layout, the materials, the proportion. And on handover day none of it is judged in midday light. It's judged with the lights on. |
| `openBody2` | Si esa luz no entiende lo que dibujaste, el que queda expuesto no es el proveedor. Eres tú. | If that light doesn't understand what you drew, the one left exposed isn't the supplier. It's you. |

### A.3 · El scope — funcional

| key | ES (brief 02 §A.3, literal) | EN (CC) |
|---|---|---|
| `scopeMicro` | Cómo trabajamos | How we work |
| `scopeTitleLines[0]` | Tres etapas. | Three stages. |
| `scopeTitleLines[1]` | Un solo dossier. | One dossier. |
| `scopeBody` | Las tres etapas son iguales en las siete tipologías. Lo que cambia es lo que cada espacio te exige. | The three stages are the same across all seven typologies. What changes is what each space demands of you. |
| `scopeSteps[0]` | Etapa 1 · Diseño de iluminación · 15 días hábiles · 6 pasos | Stage 1 · Lighting design · 15 working days · 6 steps |
| `scopeSteps[1]` | Etapa 2 · Gestión del diseño | Stage 2 · Design management |
| `scopeSteps[2]` | Etapa 3 · Gestión en obra · según cronograma | Stage 3 · On-site management · per schedule |
| `scopeSteps[3]` | — · Dossier final | — · Final dossier |
| `scopeClose` | Cada plano, un solo dossier de cierre. No un conjunto de fragmentos entregados etapa por etapa — un dossier completo, del que nos puedes hacer responsables. | Every drawing, a single closing dossier. Not a set of fragments delivered stage by stage — one complete dossier you can hold us accountable to. |

---

## CTA global (`messages/*.json` → `cta`) — entradas por página

Funcional-transaccional (microcopy del funnel), con algo de tono en `bodyTech`. Revisar.

| key | ES (brief 02 §C, literal) | EN (CC) |
|---|---|---|
| `bodyServices` | Cuéntanos qué tipología, en qué etapa, y con qué equipo. Si no somos el estudio indicado para ese proyecto, te lo decimos en la primera llamada. | Tell us the typology, the stage, and the team. If we're not the right studio for that project, we'll tell you on the first call. |
| `bodyTech` | Si estás especificando y necesitas fotometrías, escríbenos. Y si todavía no sabes qué especificar, mejor — esa conversación es más corta al principio del proyecto que al final. | If you're specifying and need photometrics, write to us. And if you don't yet know what to specify, even better — that conversation is shorter at the start of a project than at the end. |

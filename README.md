# KM Lighting Studio — Web

Next.js (App Router) port of the approved KMLS mockup. **Phase 1**: structure, navigation, taxonomy and design system are closed. Fields marked `TODO` are completed in phase 2 with real material — they are **not invented here**.

## Stack

- **Next.js 15** (App Router, React 19, static rendering)
- **next-intl v4** — EN complete; ES/PT/RU wired with empty strings
- No CSS framework — the design tokens from the mockup live verbatim in [`app/globals.css`](app/globals.css)

## Routes

| Route | Source |
| --- | --- |
| `/` | `app/[locale]/page.tsx` (HOME) |
| `/projects` | filterable grid |
| `/projects/[slug]` | **one indexable page per project** (was a lightbox) |
| `/services` | verticals index |
| `/services/[slug]` | vertical detail + work process |
| `/products` | what we specify |
| `/about` | studio, founder, team |
| `/contact` | offices |
| `/journal` | **EN only, outside i18n** — see below |

## Content vs. translations (the split)

- **`/content/`** = the DATA LAYER from the mockup (projects, verticals, scope, scenes, articles, firms, team, offices, fixtures, taxonomy). English source data, shared across locales in phase 1. This is where you edit real data.
- **`/messages/`** = the next-intl catalog: page prose + UI chrome. `en.json` is complete; `es/pt/ru.json` have **identical keys with empty strings** (phase 2 translation). Regenerate the empty shells from EN with:

  ```bash
  node --input-type=module -e 'import fs from "fs";const en=JSON.parse(fs.readFileSync("messages/en.json"));const e=v=>typeof v==="string"?"":Array.isArray(v)?v.map(e):v&&typeof v=="object"?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,e(x)])):v;for(const l of["es","pt","ru"])fs.writeFileSync(`messages/${l}.json`,JSON.stringify(e(en),null,2)+"\n")'
  ```

## i18n

- `localePrefix: 'as-needed'` → EN is unprefixed (`/`, `/projects`), ES/PT/RU are prefixed (`/es/…`).
- The language switcher is armed; ES/PT/RU show a `pend.` tag until translated.
- **Journal is outside the language system**: only `/journal` exists (EN). `/es/journal`, `/pt/journal`, `/ru/journal` return 404 (guarded in the page). No duplicate content across locales.

## SEO / AEO

- [`app/robots.ts`](app/robots.ts) — explicitly names **GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended** (answer-engine strategy).
- [`app/sitemap.ts`](app/sitemap.ts) — dynamic. **Filters out projects with essential `TODO` fields** (name/concept). Those pages still exist but are `noindex`. Only EN URLs are emitted while ES/PT/RU are empty.
- **JSON-LD**: `Organization` + `Person` in the layout (every page); `CreativeWork` on each project (only real fields — TODOs are omitted, never faked). See [`lib/structuredData.ts`](lib/structuredData.ts).

## Phase-1 scaffolding (remove in production)

- The **buildbar** ([`components/Buildbar.tsx`](components/Buildbar.tsx)) and the dashed **build notes** ([`components/BuildNote.tsx`](components/BuildNote.tsx)) are internal notes in Spanish, kept out of the i18n catalog. Delete them when phase 2 closes.
- Photos load from `ASSET` (`https://arvida.kmlightingstudio.com/assets`). Phase 2 → move to `/public/assets` and set `ASSET = '/assets'` in [`content/site.ts`](content/site.ts).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

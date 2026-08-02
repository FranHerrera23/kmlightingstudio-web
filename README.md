# KM Lighting Studio — Web

Next.js (App Router) build of the approved KMLS mockup (**design system v2** — paper/ink/gold/navy). **Phase 1**: structure, navigation, taxonomy and design system are closed. Fields marked `TODO` are completed in phase 2 with real material — they are **never invented here**.

## The phase-2 contract (acceptance criterion)

> Adding a **project**, a **fixture** or an **article** must be *editing one file in `/content/` and uploading assets*. Nothing else — no touching components.

| To add a… | Edit | Upload |
| --- | --- | --- |
| Project | [`content/projects.ts`](content/projects.ts) | photos to `ASSET/{id}/{n}.jpg` |
| Fixture (product) | [`content/products.ts`](content/products.ts) | — (technical data are fields) |
| Journal article | [`content/articles.ts`](content/articles.ts) | — (content is fields) |

Every list page (grid + filters), detail page, sitemap entry and JSON-LD block is generated from those files. A new entry gets its own indexable route automatically.

## Photo file convention (fixed — phase 2 follows it)

**Path:** `ASSET/{id}/{n}.jpg` — where `{id}` is the project id and `{n}` is a **1-based** integer.

**Order = the chronological walk of the space**, the same in every project:

> **façade → entrance → living → hall → dining → bedrooms → bathrooms → exteriors**

(Hospitality has no façade: start at the entrance.)

- `1.jpg` is the first shot of the walk; number up from there with no gaps.
- Photos are **horizontal (4:3, 3:2) or square (1:1) — never panoramic**. Each photo's ratio lives in the **data**, not the CSS: the container reserves its height before the image loads, so CLS stays flat across 34 projects × ~10 photos. See `photos: Photo[]` in [`content/projects.ts`](content/projects.ts) (phase 1 uses `DEFAULT_GALLERY`; phase 2 gives each project its own list).
- `ASSET` is `https://arvida.kmlightingstudio.com/assets` today. Phase 2 → move photos to `/public/assets` and set `ASSET = '/assets'` in [`content/site.ts`](content/site.ts).
- **Arvida** currently has `hero.jpg`-style names; rename its folder to `arvida/1.jpg…` to comply.

### Elastic gallery

The project page molde **absorbs 6–16+ photos without a per-project layout** ([`content/gallery.ts`](content/gallery.ts)): fewer photos than the molde collapse the extra blocks; more repeat the compás (full-bleed → asymmetric duo → wide → inverted duo → …). Concept/Challenge narrative re-anchors to the photo count. Credits sit **above the first scroll** (architects validate on names, not narrative).

## Confidential projects (NDA) — read before touching assets

Three projects are confidential: `athlete`, `musician`, `arvida`. The real client name appears **nowhere** — not text, URL, `assetDir`, image `alt` or JSON-LD.

> ⚠️ **Never set `assetDir` on a confidential project.** Its value lands in the image URL (`/assets/<dir>/1.jpg`), visible in the HTML and the browser's network tab. A client name there is an NDA breach even if it never renders on screen. They stay id-based; the client-named folders get renamed at source in phase 2. See the comment on `assetDirOf` in [`content/index.ts`](content/index.ts).

## Stack

- **Next.js 15** (App Router, React 19, static rendering) · **next-intl v4** · no CSS framework — v2 tokens live verbatim in [`app/globals.css`](app/globals.css).
- **Animation**: three gestures (`.mask` / `.rise` / `.zin`) driven by a single `IntersectionObserver` that `unobserve`s after firing ([`components/Reveal.tsx`](components/Reveal.tsx)). `prefers-reduced-motion` disables all of it.

## Routes

| Route | Notes |
| --- | --- |
| `/` · `/projects` · `/services` · `/products` · `/about` · `/contact` | views |
| `/projects/[slug]` | one indexable page per project (14-step molde, credits-first) |
| `/services/[slug]` | vertical + work process |
| `/products/[slug]` | one page per fixture — filter by family, "add to spec sheet" (UI only, no prices/cart) |
| `/journal` · `/journal/[slug]` | **EN only, outside i18n** — full AEO molde (answer capsule, takeaways, sectioned body, comparison table, FAQ, author + reviewedBy) |

## Content vs. translations (the split)

- **`/content/`** = the DATA LAYER (English source data, shared across locales in phase 1). Edit real data here.
- **`/messages/`** = the next-intl catalog: page prose + UI chrome. `en.json` is complete; `es/pt/ru.json` have **identical keys with empty strings**. Regenerate the empty shells from EN:

  ```bash
  node --input-type=module -e 'import fs from "fs";const en=JSON.parse(fs.readFileSync("messages/en.json"));const e=v=>typeof v==="string"?"":Array.isArray(v)?v.map(e):v&&typeof v=="object"?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,e(x)])):v;for(const l of["es","pt","ru"])fs.writeFileSync(`messages/${l}.json`,JSON.stringify(e(en),null,2)+"\n")'
  ```

## i18n

- `localePrefix: 'as-needed'` → EN is unprefixed (`/`, `/projects`), ES/PT/RU prefixed (`/es/…`). Switcher armed; ES/PT/RU show a `pend` tag until translated.
- **Journal is outside the language system**: only `/journal` and `/journal/[slug]` exist (EN). `/es|pt|ru/journal…` → 404 (guarded). No duplicate content.

## SEO / AEO

- [`app/robots.ts`](app/robots.ts) — explicitly names **GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended**.
- [`app/sitemap.ts`](app/sitemap.ts) — dynamic, real `lastModified`. **Excludes anything with essential `TODO`s**: projects missing name/concept, and articles without a written answer capsule. Those pages exist but are `noindex`. EN URLs only.
- **JSON-LD** ([`lib/structuredData.ts`](lib/structuredData.ts)): `Organization` + `Person` + `LocalBusiness`/office in the layout; `CreativeWork` per project; `Product` per fixture (no `offers`); `Article` + `FAQPage` per journal article. TODO fields are omitted, never faked.

## Phase-1 scaffolding (remove in production)

The **buildbar** ([`components/Buildbar.tsx`](components/Buildbar.tsx)) and dashed **build notes** ([`components/BuildNote.tsx`](components/BuildNote.tsx)) are internal Spanish notes, kept out of the i18n catalog. Delete when phase 2 closes.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

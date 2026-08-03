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

## Routes (Spanish segments — see the note under i18n)

| Route | Notes |
| --- | --- |
| `/` · `/proyectos` · `/servicios` · `/productos` · `/estudio` · `/contacto` | views |
| `/proyectos/[slug]` | one indexable page per project (14-step molde, credits-first) |
| `/servicios/[slug]` | vertical + work process. Slug is Spanish (`residencias-privadas`, `multifamiliar`, `hoteleria`, `comercial`, `cultural`, `aviacion`, `yates`) and **decoupled** from the typology key (`Vertical.slug` vs `Vertical.id`) |
| `/productos/[slug]` | one page per fixture — filter by family, "add to spec sheet" (UI only, no prices/cart) |
| `/contenido` · `/contenido/[slug]` | editorial hub, **ES/EN only** (`/pt|ru/contenido` → 404). Four tabs via `?tab=`; `[slug]` serves an article (AEO molde) or a video (transcript + `VideoObject`) |

## Content vs. translations (the split)

- **`/content/`** = the DATA LAYER (**Spanish** source data, shared across locales; EN content localization is future). Edit real data here — adding a project / fixture / article / video is one file edit + assets.
- **`/messages/`** = the next-intl catalog: page prose + UI chrome. **`es.json` is complete**, `en.json` keeps the English strings, `pt/ru.json` mirror the keys with **empty strings**. Regenerate the empty shells from `es.json`:

  ```bash
  node --input-type=module -e 'import fs from "fs";const es=JSON.parse(fs.readFileSync("messages/es.json"));const e=v=>typeof v==="string"?"":Array.isArray(v)?v.map(e):v&&typeof v=="object"?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,e(x)])):v;for(const l of["pt","ru"])fs.writeFileSync(`messages/${l}.json`,JSON.stringify(e(es),null,2)+"\n")'
  ```

## Fase-1 closure

- **Contact form** ([`components/ContactForm.tsx`](components/ContactForm.tsx) + [`app/api/contact/route.ts`](app/api/contact/route.ts)): client + server validation, honeypot, per-IP rate limit, no captcha; logs `referrer`+`pathname`. Sends via **Resend** behind `RESEND_API_KEY` — set it in `.env.local` / Vercel (see [`.env.example`](.env.example)); without it, the endpoint logs the lead and returns ok.
- **Analytics**: `@vercel/analytics` + `@vercel/speed-insights` in the root layout (no cookies/consent).
- **Domain redirects**: **301** map in [`config/legacy-redirects.ts`](config/legacy-redirects.ts) (wired by [`next.config.ts`](next.config.ts)) — old `karenmannheim.com` `projectXX.html` → the new `/proyectos/…`; unmapped fall back to `/proyectos`. `.html` is outside the i18n middleware, so `next.config` handles it.

## i18n — Spanish-first (v3)

- **`defaultLocale: 'es'`**, `localePrefix: 'as-needed'`, **`localeDetection: false`** → **Spanish is the root, unprefixed** and `/` **always opens in Spanish** (no Accept-Language auto-redirect); EN is `/en/…`; PT/RU are `/pt/…` `/ru/…` with empty catalogs. Switcher armed; EN/PT/RU show a `pend` tag until filled.
- **`messages/es.json` is the complete catalog** (Spanish copy is authored — never machine-translated); `en.json` keeps the English strings; `pt/ru.json` mirror the keys with empty values.
- **Content hub** (`/contenido`) is editorial **ES/EN only** — `/pt/contenido` and `/ru/contenido` return **404** (PT/RU are interface languages, not content).

> **Why the route segments are Spanish for *every* locale — including English (`/en/proyectos`, not `/en/projects`).**
> The URL segments are Spanish (`/proyectos`, `/servicios`, `/productos`, `/estudio`, `/contacto`, `/contenido`) and used **as-is across all locales** — English only localizes the **nav label**, not the segment.
> The alternative, next-intl's per-locale `pathnames`, makes the `Link` href type the set of declared pathname *patterns* — which forces **every dynamic link** (`` `/proyectos/${id}` ``) to be rewritten to the object form (`{ pathname: '/proyectos/[slug]', params: { slug } }`), a churny, error-prone refactor of working routing. So we keep one Spanish segment per route across locales. **Don't "fix" this to `pathnames`** without re-typing every dynamic `<Link>`.

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

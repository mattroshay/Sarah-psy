# CLAUDE.md

Guidance for Claude Code working in this repository. The original V1 build brief — design rationale, page-content briefs, acceptance criteria, and the canonical SEO meta-title table — has shipped and now lives at [`docs/v1-brief.md`](docs/v1-brief.md). Refer to it when you need that history; do **not** treat its scaffold/punch-list sections as live work.

@AGENTS.md

## Status

V1 of sarah-psy.com is live on Vercel. The site is a bilingual (EN/FR) Next.js 16 site for Sarah Cousin Roshay (CBT therapist). Ongoing work is editorial revisions, copy tweaks, and small features — not architectural changes. Pushes to `master` auto-deploy via Vercel.

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (also enforces TS strict checks)
npm run lint     # ESLint
npm start        # serve production build locally
```

No test suite. Type errors surface during `npm run build`.

## Stack (installed — do not re-init)

- Next.js **16.2.4** App Router, React **19.2.4**, TypeScript strict
- Tailwind CSS **v4** — CSS-first config via `@theme` in `app/globals.css` (no `tailwind.config.js`)
- `next-mdx-remote` + `gray-matter` for MDX blog content, `zod` for frontmatter validation
- `clsx` + `tailwind-merge` for className composition (via `lib/cn.ts`)
- Font: **Jost** (Futura-style) via `next/font/google`, used for both headings and body — loaded once in `app/layout.tsx` and exposed via the `--font-jost` CSS variable. Note: the V1 brief in `docs/v1-brief.md` specifies Playfair + Inter; the site moved to single-family Jost to match Sarah's old site identity

> **Heed AGENTS.md.** Next.js 16 / React 19 / Tailwind v4 have breaking changes from prior versions. Before using middleware, `generateMetadata`, dynamic routes, sitemap/robots conventions, or `@theme`, read the relevant guide in `node_modules/next/dist/docs/` (or `node_modules/tailwindcss/`) — your training data likely predates these APIs.

## Architecture

```
app/
  [locale]/                # locale-prefixed routes (en | fr)
    about/                 # FR served at /fr/a-propos (rewrite in middleware)
    how-i-help/            # FR served at /fr/comment-je-vous-aide
    my-specialties/        # FR served at /fr/mes-specialites
    faq/                   # same slug both locales
    blog/[slug]/           # MDX-backed; slugs differ per locale
    contact/               # same slug both locales
    layout.tsx page.tsx
  layout.tsx page.tsx      # root layout + bare-/ redirect
  sitemap.ts robots.ts
middleware.ts              # Accept-Language redirect + FR slug rewrite
components/
  ui/                      # Button, Card, Carousel, ContactForm, CalendlyButton,
                           # AccordionSection, FeesBlock, Footer, Hero, Navigation,
                           # LanguageToggle, BlogPostCard, PullQuote, Banner,
                           # Testimonial, TintedImage, CopyrightYear
  sections/                # PageHeader, AlternatingSection, BlogIndex, BlogPost, ContactPage
content/blog/{en,fr}/      # MDX posts (zod-validated frontmatter, see lib/blog.ts)
lib/
  routes.ts                # locale ↔ public-slug map (single source of truth)
  i18n/                    # en.ts / fr.ts dictionaries + types.ts (compile-time keyed)
  blog.ts                  # MDX loading + frontmatter zod schema
  metadata.ts cn.ts fees.ts formatDate.ts types.ts
```

**Server vs client.** Default to RSC. `'use client'` is only needed in `LanguageToggle`, `ContactForm`, `Carousel`, `AccordionSection`, `Navigation` (mobile menu), and `CalendlyButton` (popup widget).

## i18n — non-obvious patterns

- Locale-specific slugs live **only** in `lib/routes.ts` (`FR_SLUG_OVERRIDES`). Routes that share a slug in both locales (`faq`, `contact`, `blog`) are not in that map.
- `middleware.ts` does two jobs: (1) Accept-Language redirect on locale-less paths, (2) **rewrite** `/fr/a-propos` → internal `/fr/about` so the file-system routes stay EN-named. Don't add a parallel `/fr/a-propos/` directory.
- `LanguageToggle` calls `getAlternatePath()` to swap to the equivalent route in the other locale without losing context. New routes with FR-specific slugs **must** be added to `FR_SLUG_OVERRIDES`.
- All UI text — including button labels, ARIA labels, form errors, blog metadata — must come from `lib/i18n/{en,fr}.ts`. **No inline English in JSX.** Dictionaries are typed in `lib/i18n/types.ts`; missing keys break the build.
- FR copy is parallel-idiomatic, not a literal translation. New FR strings are typically marked `[FR — Sarah to validate]` in commit messages or comments so she can pass over them.

## Blog content

- MDX files in `content/blog/{en,fr}/`, frontmatter zod-validated in `lib/blog.ts`.
- Required frontmatter: `title`, `slug`, `locale`, `topic` (`expats | professionals | parents`), `publishedAt`, `excerpt`, `keyword`, `heroImage`, `heroImageAlt`, `relatedSlugs`.
- Index page (`/blog`) renders three accordion sections (For Expats / Professionals / Parents). URL hashes (`#expats` etc.) auto-open the matching section.
- Authoring workflow lives in [`BLOG-AUTHORING.md`](BLOG-AUTHORING.md). Image credits in [`CREDITS.md`](CREDITS.md).
- Current posts: `english-speaking-therapist-france`, `expat-anxiety`, `burnout-or-tired`, `what-is-cbt`, `matrescence`, `why-your-child-triggers-you` (EN; FR equivalents have locale-specific slugs).

## Environment variables

Live in `.env.local` (gitignored). The committed `.env.local.example` is the source of truth:

```
NEXT_PUBLIC_SITE_URL=https://sarah-psy.com
NEXT_PUBLIC_CALENDLY_DISCOVERY_URL=    # free 15-min discovery call
NEXT_PUBLIC_CALENDLY_SESSION_URL=      # paid full session
NEXT_PUBLIC_FORMSPREE_ENDPOINT=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_PHONE=
```

When env vars are missing in dev, components render a graceful placeholder ("Booking link not configured") — never crash the build. GA4 only loads when the ID is set.

## Non-obvious patterns / gotchas

- **Calendly is two URLs, not one.** `CALENDLY_DISCOVERY_URL` and `CALENDLY_SESSION_URL` are passed as separate props (`discoveryCalendlyUrl`, `sessionCalendlyUrl`) into `ContactPage`. `CalendlyButton` opens the booking widget as a popup overlay (added in PRs #7–#8). There's a **legacy fallback** on the contact route that still accepts a single `NEXT_PUBLIC_CALENDLY_URL` if the dual vars aren't set — don't remove that until env is migrated everywhere.
- **Testimonials are commented out** on the home page (per Sarah's May 11 review — placeholders weren't credible). The block at `app/[locale]/page.tsx:133` has a re-enable comment that includes the required `Testimonial` import path. Restore it when Sarah supplies real client reviews; do not delete the dictionary entries.
- **Formspree honeypot** in `components/ui/ContactForm.tsx`: a hidden field that bots fill and humans don't. Positioned **off-screen** rather than `display:none` because some bots skip `display:none` fields. The form also short-circuits client-side if the honeypot is non-empty (saves a wasted Formspree submission). Don't "fix" either of those.
- **`_subject` field** is hardcoded in the form so Formspree emails arrive with a recognisable subject line. Comment in the file explains the tradeoff.
- **Draft markers.** Copy that needs Sarah's eyes is tagged `[DRAFT — Sarah to write]` or `[VERIFY WITH SARAH]` in commit messages and PR descriptions. Don't strip these in unrelated edits.
- **The fourth audience card ("Anyone feeling stuck")** on the home page links to `/contact` rather than a blog topic anchor — there's no matching blog hub, and the audience is a self-identification rather than a search query. Don't change the link without a plan for a target page.
- **Blog post `online-therapy-research` was removed** on May 19 (commit `83dd934`). Don't try to re-add the file or its FR equivalent unless Sarah asks for it back.
- **Publish-date format.** Posts use `"5 February 2026"` style (no comma, no ordinal). Helper in `lib/formatDate.ts`. Unified in commit `f93fe7d`; don't drift from it.

## Design system (live)

Tailwind v4 `@theme` tokens in `app/globals.css` — **palette shifted from the V1 brief's sage-green to a teal "sage"** (still called `sage` in the token names; the rename would ripple too far). Keep the token names; just know the colour is teal.

```
sage:       #46CCCF   (primary — teal)        # V1 brief said #7A9E7E sage-green
sage-light: #E5F1F0
sage-dark:  #3E7773
terra:      #C27050   (secondary accent)
terra-light:#FAF0EB
charcoal:   #2C2C2C   (body text)
warm:       #F7F4F0   (card / section bg)
muted:      #8A8580   (secondary text)
gold:       #B8960C   (tertiary accent)
purple:     #7B68C8   (optional feature accent)
border:     #E8E4DF
```

A commented-out `--color-sage: #5FA39E` line in `globals.css` is an intermediate palette — don't delete it without checking with Matt; it's load-bearing as a "we considered this" marker.

Typography: **Jost** for both headings and body (weights 300/400/500/600/700 loaded), base 16px, body line-height 1.6, headings 1.25 with `-0.01em` letter-spacing and weight 600. The `--font-heading` and `--font-body` CSS variables both resolve to Jost — keep the two variable names even though they point at the same family, so a future split-family redesign is one CSS change instead of a codebase grep.

Cards use `bg-warm` or white with 1px `border` color border, `rounded-xl`, hover shadow. 8px grid, generous whitespace. Button variants: primary sage/white, secondary terra/white, outline sage-border, plus a `white` variant (white bg, sage text) for dark-section CTAs.

## SEO

Per-page `generateMetadata` — the canonical title/description table is at `docs/v1-brief.md` §10. Blog posts derive title + description from frontmatter. ProfessionalService JSON-LD lives in the root layout. `app/sitemap.ts` covers every route × locale and every blog post. `app/robots.ts` allows all + points to sitemap. `hreflang` alternates are generated per page from the route map.

## Tone & voice

Warm, credible, specific. Lean on Sarah's lived-credibility angles: bilingual native, expat experience, 15 years in corporate, parenting cert, CBT-trained. Speak to intelligent, goal-oriented people in their own language ("burnout", "imposter syndrome", "culture shock", "matrescence").

- ❌ "Evidence-based cognitive behavioral interventions facilitate emotional regulation."
- ✅ "Burnout is real, and you're not broken — therapy can help you find your way back."

FR copy follows the same voice — parallel-idiomatic, not literal translation.

## When in doubt

- Architecture / page-content briefs / acceptance criteria → [`docs/v1-brief.md`](docs/v1-brief.md)
- Adding a blog post → [`BLOG-AUTHORING.md`](BLOG-AUTHORING.md)
- Image attribution → [`CREDITS.md`](CREDITS.md)
- Next.js 16 / Tailwind v4 specifics → `node_modules/next/dist/docs/`, `node_modules/tailwindcss/`

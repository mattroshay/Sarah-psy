# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run lint     # ESLint check
npm start        # serve production build
```

No test suite is configured for V1. TypeScript strict checks run as part of `npm run build`.

## Current scaffold state

The repo is a **stock Create Next App scaffold** — `app/page.tsx`, `app/layout.tsx`, and `app/globals.css` are the unmodified defaults. The architecture below (sections 3–17) is the **target state** to build toward, not the current state.

Pending cleanup before building (see §2):
- Replace `app/page.tsx`, `app/layout.tsx`, `app/globals.css`
- Delete `public/*.svg` template assets and the empty `Sarah-psy/` dir at root
- Install `next-mdx-remote`, `gray-matter`, `clsx`, `tailwind-merge`

---

# sarah-psy.com — V1 build brief

This file is the single source of truth for V1 of the Sarah Cousin Roshay therapy website. The full client comm plan (with positioning, channel strategy, SEO research, and the comm plan that produced the blog post briefs below) lives at `~/Documents/Claude/Projects/Sarah's BD, Website & SEO/sarah-comm-plan-complete.jsx` — open it for any context this file doesn't cover.

> **Heed AGENTS.md.** This repo runs Next.js 16, React 19, and Tailwind v4 — APIs, conventions, and file structure differ from prior versions. Read the relevant guide in `node_modules/next/dist/docs/` (and `node_modules/tailwindcss/` for v4's CSS-first config) **before** writing code that uses anything beyond plain JSX. Specifically verify how middleware, `generateMetadata`, dynamic routes with `[locale]`, sitemap/robots conventions, and `@theme` in CSS work in the installed versions.

---

## 1. Mission

Rebuild sarah-psy.com (currently Wix, single-page) as a modern multi-page Next.js site with full bilingual support (EN/FR) from day one. Sarah is a bilingual CBT therapist whose differentiator is **lived credibility**: bilingual native, expat experience, 15 years in corporate, certified parenting support, CBT-trained. Copy and design must radiate specificity — not generic therapist-speak.

Three primary audiences (use these consistently across the site):

- **Expats & global nomads** — isolation, culture shock, identity, relocation strain
- **Professionals & burnout** — anxiety, perfectionism, work stress
- **Parents (esp. mothers)** — perinatal anxiety, matrescence, parenting overwhelm

---

## 2. Stack (already installed — do not re-init)

- Next.js **16.2.4** App Router, React **19.2.4**, TypeScript
- Tailwind CSS **v4** (CSS-first config via `@theme` in `app/globals.css`, not `tailwind.config.js`)
- ESLint via `eslint-config-next` v16
- Geist font is the default — replace with **Playfair Display** (headings) + **Inter** (body) via `next/font/google`

Add (to be installed by the implementing agent):

- `next-mdx-remote` + `gray-matter` for MDX blog content (preferred over Contentlayer to avoid extra build tooling)
- `clsx` and `tailwind-merge` for className composition

Do **not** add a heavy CMS, a state library, or a UI kit. Keep the dependency surface small.

### Existing scaffold cleanup

- `app/page.tsx`, `app/layout.tsx`, `app/globals.css` are stock Next defaults — replace.
- `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` are template assets — delete.
- There is a stray empty `Sarah-psy/` directory at the repo root — delete it.
- `README.md` is the stock create-next-app template — replace with a project-specific README at the end (run instructions, env vars, blog authoring, deploy notes).

---

## 3. Site structure & URL map

Six pages, each in EN and FR. Routing under `app/[locale]/...` with locale-specific slugs.

| EN | FR |
|---|---|
| `/en` | `/fr` |
| `/en/about` | `/fr/a-propos` |
| `/en/how-i-help` | `/fr/comment-je-vous-aide` |
| `/en/faq` | `/fr/faq` |
| `/en/blog` | `/fr/blog` |
| `/en/blog/[slug]` | `/fr/blog/[slug]` (slugs differ per language) |
| `/en/contact` | `/fr/contact` |

Root `/` redirects via middleware based on `Accept-Language` (default `en`). Locale-specific slugs are kept in a single map (`lib/routes.ts`) so the LanguageToggle can swap to the equivalent page in the other language without losing context. Every page sets `<link rel="alternate" hrefLang="...">` for both locales + `x-default`.

### Audience pages — note

The brief originally specified separate audience pages (e.g. `/expat-therapy`). For V1, the **Blog index's three collapsible sections are the audience hubs**. Anchor links from the Home page audience cards go to `/{locale}/blog#expats` (and `#professionals`, `#parents`). If/when a true `/expat-therapy` landing page is needed for SEO, it can be added later — leave the route map flexible.

---

## 4. Design system

### Color palette (Tailwind v4 `@theme` tokens in `app/globals.css`)

```
sage:       #7A9E7E   (primary)
sage-light: #EAF2EB
sage-dark:  #4E6E52
terra:      #C27050   (secondary / warm accent)
terra-light:#FAF0EB
charcoal:   #2C2C2C   (body text)
warm:       #F7F4F0   (card / section backgrounds)
muted:      #8A8580   (secondary text)
gold:       #B8960C   (tertiary accent)
purple:     #7B68C8   (optional feature accent)
border:     #E8E4DF
```

### Typography

- **Headings**: Playfair Display (serif, weight 600–700)
- **Body**: Inter (sans, 400/500/700)
- Base size 16px, generous line-height (1.7 for body), tighter for headings

### Spacing & cards

- 8px grid throughout (Tailwind defaults are fine)
- Cards: `bg-warm` or white, 1px `border` color border, `rounded-xl`, subtle shadow on hover
- Generous whitespace in BeWell style

### Buttons

- Primary: solid sage with white text
- Secondary: solid terra with white text
- Outline: transparent with sage border + sage text
- All buttons accept bilingual labels (passed as props, never hardcoded English)

### Visual feel

Calming, trustworthy, professional. Inspired by **Therapy Clinic Health** (palette + clickable carousel) and **BeWell** (alternating image/text columns, banners, pull-quotes, candid imagery).

---

## 5. i18n architecture

- `app/[locale]/layout.tsx` sets `<html lang={locale}>` and loads locale-specific metadata
- `middleware.ts` at repo root: if a request has no `/en` or `/fr` prefix, detect `Accept-Language`, redirect to the appropriate locale (default `en`)
- `LanguageToggle` (client component): on click, looks up the equivalent slug in the other locale via `lib/routes.ts`, navigates there, and writes choice to `localStorage` under `sarah-psy-locale`. On page load, if a stored preference disagrees with the URL locale, do **not** auto-redirect (would break sharing) — but middleware honors `localStorage` only on the bare `/` path
- Translations live in `lib/i18n/{en,fr}.ts` as typed dictionaries, one per page-domain (`nav`, `home`, `about`, `howIHelp`, `faq`, `blog`, `contact`, `forms`, `cta`). Type the dictionary so missing keys fail at compile time
- All UI text — including button labels, form validation errors, accordion ARIA labels, blog metadata — must be in the dictionaries. No inline English in JSX

---

## 6. Component inventory

### Atomic (`components/ui/`)

`Button`, `Card`, `Hero`, `Carousel` (icon+text cards for How I Help), `ContactForm` (Formspree-wired), `BlogPostCard`, `PullQuote`, `Banner`, `Navigation` (responsive header — logo left, nav center, LanguageToggle + Calendly CTA right; collapses to hamburger on mobile), `LanguageToggle`, `Testimonial`, `AccordionSection`, `Footer` (logo, nav links, contact info, social, copyright).

### Page-level (`components/sections/`)

`PageHeader` (title + optional subtitle + optional hero image), `AlternatingSection` (BeWell pattern: image-left/text-right, then flip), `BlogIndex` (3 accordion sections), `BlogPost` (post body + metadata + related posts CTA), `ContactPage` (form + Calendly side-by-side desktop, stacked mobile).

### Server vs client

Default to React Server Components. Add `'use client'` **only** for: `LanguageToggle`, `ContactForm`, `Carousel`, `AccordionSection`, `Navigation` (mobile menu toggle).

---

## 7. Blog system

### Content layout

```
content/blog/
  en/
    english-speaking-therapist-france.mdx
    expat-anxiety.mdx
    burnout-or-tired.mdx
    what-is-cbt.mdx
    matrescence.mdx
    online-therapy-research.mdx
  fr/
    therapeute-anglophone-france.mdx
    anxiete-expatriation.mdx
    burnout-ou-fatigue.mdx
    cest-quoi-tcc.mdx
    matrescence.mdx
    therapie-en-ligne-recherche.mdx
```

### Frontmatter schema (zod-validated in `lib/blog.ts`)

```yaml
---
title: string
slug: string                 # must match filename
locale: "en" | "fr"
topic: "expats" | "professionals" | "parents"
publishedAt: ISO date        # use 2026-01-15 placeholders for V1
excerpt: string              # 140-180 chars, becomes meta description
keyword: string              # primary target keyword
heroImage: string            # /images/blog/<slug>.jpg path
heroImageAlt: string
relatedSlugs: string[]       # slugs in same locale, same topic
---
```

### Blog index behavior

- Three `<details>`-style accordion sections in this order: For Expats, For Professionals, For Parents
- Each section has a 2–3 sentence intro (in dictionaries) + list of `BlogPostCard`s for posts in that topic + locale
- Anchors `#expats`, `#professionals`, `#parents` open the matching section automatically (use URL hash → set `open` state)
- Each section also gets its own `<h2>` keyword-rich headline (bonus SEO; replaces dedicated audience pages for V1)

### Post page behavior

- MDX body rendered with `next-mdx-remote/rsc`
- Custom MDX components: heading anchors, `PullQuote`, `Banner`, links auto-styled
- After body: a "Read more" block of up to 3 related posts (same `topic`, same `locale`, excluding current)
- Reading time estimate (rough: words/200)
- Always end with a CTA card linking to Contact page + Calendly

### Authoring guide

Write `BLOG-AUTHORING.md` at repo root explaining: how to copy a template, the frontmatter fields, how to add an image to `/public/images/blog/`, how to preview locally, and how publishing works once on Vercel (push to main → auto-deploy).

---

## 8. The 6 blog posts to scaffold

Create all 12 MDX files (6 EN + 6 FR) with real titles, slugs, frontmatter, and the suggested H1/H2 structure pre-filled as headings. Body sections use light placeholder prose (1–2 sentences) marked `[DRAFT — Sarah to write]`. Sarah replaces only the prose; structure is locked.

Source: comm plan "Step 3 — 6 SEO Blog Posts". Slugs:

### Post 01 — Priority: Start first

- **EN** title: *How to find an English-speaking therapist in France*
  - slug: `english-speaking-therapist-france`
  - keyword: `english speaking therapist France`
  - topic: `expats`
- **FR** title: *Comment trouver un thérapeute anglophone en France*
  - slug: `therapeute-anglophone-france`
  - keyword: `thérapeute anglophone France`
  - topic: `expats`
- **Why**: Pure high-intent search. People type this exact phrase when they need a therapist right now.
- **Structure (H1 + H2s)**:
  1. Why it's hard to find English-speaking mental health support in France
  2. What to look for in a therapist (qualifications, approach, language)
  3. Online vs in-person — pros and cons for expats
  4. What CBT is and how it works
  5. How to book a free call with Sarah [CTA]

### Post 02 — Priority: Start first

- **EN** title: *Anxiety as an expat: why it feels different and what actually helps*
  - slug: `expat-anxiety`
  - keyword: `expat therapist France`
  - topic: `expats`
- **FR** title: *Anxiété et expatriation : pourquoi c'est différent et ce qui aide vraiment*
  - slug: `anxiete-expatriation`
  - keyword: `anxiété expatriation`
  - topic: `expats`
- **Why**: Sarah's signature post — uses her personal expat experience as authority and ranks for multiple expat search terms.
- **Structure**:
  1. The specific stressors of expat life (identity, isolation, language, partner dynamics)
  2. Why expat anxiety often goes unrecognised
  3. How CBT helps with transition and identity
  4. A short personal note from Sarah's own expat experience
  5. CTA: book a free discovery call

### Post 03 — Priority: Month 1

- **EN** title: *Burnout or just tired? How to tell the difference*
  - slug: `burnout-or-tired`
  - keyword: `burnout therapist online`
  - topic: `professionals`
- **FR** title: *Burnout ou simple fatigue ? Comment faire la différence*
  - slug: `burnout-ou-fatigue`
  - keyword: `thérapeute burnout en ligne`
  - topic: `professionals`
- **Why**: Evergreen, shareable, great on LinkedIn. Speaks to the professional audience.
- **Structure**:
  1. What burnout actually is (clinical vs pop-culture definition)
  2. 5 signs you're burning out, not just tired
  3. Why high performers are most at risk
  4. What CBT tools work for burnout recovery
  5. CTA: if this sounds familiar, let's talk

### Post 04 — Priority: Month 1

- **EN** title: *What is CBT and is it right for me?*
  - slug: `what-is-cbt`
  - keyword: `CBT therapist online France`
  - topic: `professionals`
- **FR** title: *C'est quoi la TCC et est-ce fait pour moi ?*
  - slug: `cest-quoi-tcc`
  - keyword: `TCC en ligne`
  - topic: `professionals`
- **Why**: Removes the education barrier. Many people don't know what CBT is — this converts curious visitors into confident enquirers.
- **Structure**:
  1. What CBT is (in plain language)
  2. How a session actually looks
  3. What it helps with — and what it doesn't
  4. CBT vs other therapy types
  5. How to know if it's right for you — CTA

### Post 05 — Priority: Month 2

- **EN** title: *Matrescence: the identity shift nobody prepares you for*
  - slug: `matrescence`
  - keyword: `matrescence therapy`
  - topic: `parents`
- **FR** title: *La matrescence : le bouleversement identitaire dont personne ne parle*
  - slug: `matrescence` (same word in French)
  - keyword: `matrescence thérapie`
  - topic: `parents`
- **Why**: Low-competition keyword, deeply resonant. Mums who Google "matrescence" already know what they need.
- **Structure**:
  1. What matrescence is (and why it's not postnatal depression)
  2. The identity, relationship, and career shifts it brings
  3. Why it often goes unspoken
  4. How CBT and parenting support can help
  5. CTA for parents

### Post 06 — Priority: Month 2

- **EN** title: *Does online therapy actually work? What the research says*
  - slug: `online-therapy-research`
  - keyword: `online therapist France`
  - topic: `parents` (cross-cutting, but assign to parents for V1 to balance topic counts; revisit later)
- **FR** title: *La thérapie en ligne, ça marche vraiment ? Ce que dit la recherche*
  - slug: `therapie-en-ligne-recherche`
  - keyword: `thérapie en ligne efficace`
  - topic: `parents`
- **Why**: Removes the last big objection. Reassures clients sceptical of remote therapy before they contact.
- **Structure**:
  1. The most common hesitations about online therapy
  2. What research says about online CBT effectiveness
  3. What makes online therapy work (or not)
  4. Who it's especially suitable for (expats, professionals, parents)
  5. How Sarah's sessions work in practice — CTA

---

## 9. Page content briefs

### 9.1 Home

- **Hero**
  - EN tagline: *"Therapy for the life you're actually living — expat pressures, career stress, and the weight of modern parenthood"*
  - FR tagline: *"Une thérapie pour votre vie réelle — expatriation, pression professionnelle, parentalité"*
  - Subhead positioning Sarah: bilingual CBT therapist with lived expat experience and 15 years in corporate
  - Primary CTA: "Book a free discovery call" / "Réserver un appel découverte" → Calendly
  - Secondary CTA: "Learn more about Sarah" → /about
- **About strip** — short bio with the lived-credibility angles (bilingual, expat, 15-yr corporate, parenting cert, CBT-certified)
- **Three audience cards** — clickable, link to `/blog#expats`, `/blog#professionals`, `/blog#parents`
  - Card 1: 🧳 *"I'm an expat navigating life abroad"* / *"Je suis expatrié·e à l'étranger"*
  - Card 2: 💼 *"I'm struggling with work stress or burnout"* / *"Je vis du stress ou un burn-out professionnel"*
  - Card 3: 🤱 *"I'm a parent feeling overwhelmed"* / *"Je suis parent et je me sens dépassé·e"*
- **Testimonials** — 3 placeholder quotes (mark clearly `[PLACEHOLDER]` so Sarah can swap):
  - "C., Expat in Paris" — *"Sarah's understanding of the expat experience was invaluable…"*
  - "J., Professional" — *"After months of burnout, her approach helped me find my footing again…"*
  - "M., Parent" — *"As a new parent I felt so alone until I found Sarah's support…"*
- **CTA banner** — book a free discovery call

### 9.2 About

Deeper bio with credentials, therapy approach, and the "why I got into therapy" arc. The brief story is **Draft this from the positioning anchors and mark `[DRAFT — review with Sarah]`**: 15 years corporate → personal experience of expat life and parenthood → professional retraining in CBT and parenting support → present practice. Include certifications, qualifications, memberships placeholder section. Use Sarah's professional photo prominently.

### 9.3 How I Help

Three icon+text cards in a clickable carousel (renamed from "What I Do"):

- **Therapy for Expats** — isolation, culture shock, identity, relocation strain. Icon: suitcase or globe outline.
- **Burnout & Work Stress** — anxiety, perfectionism, work-life integration. Icon: briefcase or candle motif.
- **Parenting Support** — perinatal anxiety, matrescence, parenting overwhelm. Icon: gentle hand/heart motif.

Each card: heading + 2–3 sentence description + "Learn more" link to the matching blog topic anchor. Click expands the card inline (preferred) or navigates — pick whichever has cleaner UX with the carousel pattern. Use sage/terra accents per audience.

### 9.4 FAQ

Accordion. Cover at minimum:

- How do sessions work? (online via secure video, 50 minutes, weekly or bi-weekly)
- What languages do you offer therapy in? (English and French, your choice per session)
- Where are you based and what time zones do you cover? (France-based; flexible across European and overlapping US zones)
- What is CBT? (link to the CBT post)
- Is online therapy effective? (link to the online-therapy post)
- What about confidentiality? (governed by professional ethics and applicable French/UK regs — Sarah to verify exact wording)
- How do I book? (link to Calendly + contact form)
- What does a free discovery call cover?

Mark anything regulatory or pricing-related with `[VERIFY WITH SARAH]`.

### 9.5 Blog

See section 7 above. Index page is three accordion sections (For Expats / For Professionals / For Parents), each with intro + list of posts. URL hash opens the matching section.

### 9.6 Contact

- Form: name, email, message, optional preferred-language radio (EN/FR), submit
- Form action posts to `process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT`. Show success state inline; show error with retry.
- Calendly inline embed beside (desktop) or below (mobile) the form
- Phone: `process.env.NEXT_PUBLIC_CONTACT_PHONE` (placeholder until Sarah provides)
- Email: `process.env.NEXT_PUBLIC_CONTACT_EMAIL`

---

## 10. SEO — exact meta titles and descriptions

Use these verbatim via `generateMetadata`. Source: comm plan, Step 2.

| Page | Title | Description |
|---|---|---|
| Homepage EN | CBT Therapist Online \| Expats & Professionals \| Sarah Cousin Roshay | Bilingual CBT therapy online in English & French. Specialising in expat life, work stress, burnout and anxiety. Book a free call today. |
| Homepage FR | Thérapeute TCC en ligne \| Expatriés & Professionnels \| Sarah Cousin Roshay | Thérapie TCC en ligne en français et anglais. Spécialisée en expatriation, stress professionnel et anxiété. Réservez un appel découverte. |
| Expat EN (blog #expats) | Therapy for Expats \| English-Speaking Therapist in France \| Online | Struggling with expat life in France? Anxiety, isolation, identity — therapy in English with a therapist who's lived it herself. |
| Expat FR | Thérapie pour expatriés \| Thérapeute en ligne \| Français & Anglais | Vous vivez à l'étranger et cherchez un soutien psychologique ? Thérapie en ligne pour expatriés, en français ou en anglais. |
| Burnout EN (blog #professionals) | Therapy for Burnout & Work Stress \| Online CBT \| Sarah Cousin Roshay | Burnout, anxiety at work, imposter syndrome. I spent 15 years in corporate before becoming a therapist — I understand your world. |
| Burnout FR | Thérapie burnout & stress professionnel \| TCC en ligne | Épuisement professionnel, anxiété au travail, syndrome de l'imposteur. Une thérapeute qui connaît le monde de l'entreprise de l'intérieur. |
| Parents EN (blog #parents) | Therapy for Parents \| Matrescence & Parenting Anxiety \| Online CBT | Parenting is hard. Certified in parenting support and a mum myself — I offer a safe space for the emotional weight of parenthood. |
| Parents FR | Soutien à la parentalité \| Anxiété parentale & matrescence \| En ligne | La parentalité est exigeante. Certifiée en soutien parental et maman moi-même, je vous accompagne dans ce qui est souvent tu. |
| Blog Index EN | Therapy Blog \| Expat, Burnout & Parenting Support \| Sarah Cousin Roshay | (write 140–155 chars) |
| Blog Index FR | Blog — Thérapie pour expatriés, burnout & parentalité | (write 140–155 chars) |

Each blog **post** uses its `title` and `excerpt` from frontmatter as title + description.

---

## 11. SEO foundation requirements

- `generateMetadata` per page using the table above
- ProfessionalService schema in root layout (name, image, url, telephone, areaServed, sameAs for socials, knowsLanguage `["en","fr"]`, serviceType `"Cognitive Behavioral Therapy"`)
- Open Graph + Twitter card on every page (blog posts use frontmatter `heroImage`)
- `app/sitemap.ts` covering all pages × 2 locales + every blog post × locale
- `app/robots.ts` — allow all, point to sitemap
- `<link rel="alternate" hrefLang="...">` per page (EN, FR, x-default) — generate from the route map
- Canonical URLs absolute (use `process.env.NEXT_PUBLIC_SITE_URL`)
- Image alt text mandatory and bilingual

---

## 12. Integrations — env vars

Provide `.env.local.example` checked into git:

```
NEXT_PUBLIC_SITE_URL=https://sarah-psy.com
NEXT_PUBLIC_CALENDLY_URL=                # Sarah-provided
NEXT_PUBLIC_FORMSPREE_ENDPOINT=          # Sarah-provided
NEXT_PUBLIC_GA4_ID=                      # Sarah-provided
NEXT_PUBLIC_CONTACT_EMAIL=               # Sarah-provided
NEXT_PUBLIC_CONTACT_PHONE=               # Sarah-provided
```

When env vars are missing in dev, render placeholder UI (e.g. Calendly slot shows "Booking link not configured"). Never crash the build. GA4 script loads only when ID is set.

---

## 13. Existing assets

Located at `~/Documents/Claude/Projects/Sarah's BD, Website & SEO/`:

- `Sarah Cousin Roshay.png` — professional headshot. Copy to `public/images/sarah-headshot.jpg` (re-encode to optimized JPG; keep PNG as fallback).
- `Logo Files/For Web/svg/Color logo - no background.svg` — primary logo. Copy to `public/logo.svg`.
- `Logo Files/For Web/svg/White logo - no background.svg` — for dark backgrounds. Copy to `public/logo-white.svg`.
- `Logo Files/For Web/svg/Black logo - no background.svg` — fallback. Copy to `public/logo-black.svg`.
- `Logo Files/For Web/Favicons/browser.png` — favicon source. Generate full favicon set (16, 32, 180 apple-touch, 192/512 PWA) and replace `app/favicon.ico`.

For all other imagery (blog hero images, How-I-Help icons, audience photography), source from Unsplash/Pexels with care for the sage/terra aesthetic. Use Unsplash CDN URLs in `public/images/blog/<slug>.jpg` after download — no hot-linking. Mark every sourced image with credit in `CREDITS.md` at repo root.

---

## 14. Tone & voice

Warm, credible, specific. Emphasize lived experience: bilingual, expat, corporate, parent. Professional but accessible — speak to intelligent, goal-oriented people. Use the audience's own language ("burnout", "imposter syndrome", "culture shock", "matrescence").

- ❌ "Evidence-based cognitive behavioral interventions facilitate emotional regulation."
- ✅ "Burnout is real, and you're not broken — therapy can help you find your way back."

All copy in dictionaries should follow this voice in **both** languages. French copy is not a literal translation — it's a parallel idiomatic version, equally warm and specific.

---

## 15. Acceptance criteria

Before considering V1 done, verify:

- [ ] `npm run build` completes cleanly (no errors, no warnings about missing metadata)
- [ ] `npm run lint` passes
- [ ] Every page renders in both `/en` and `/fr` with no untranslated strings
- [ ] LanguageToggle preserves the equivalent route across all 6 page types + blog posts
- [ ] Browser-language detection redirects `/` → `/fr` for `Accept-Language: fr`, otherwise `/en`
- [ ] All 8 meta titles/descriptions match section 10 verbatim
- [ ] All 12 blog MDX files exist and render (with placeholder bodies marked `[DRAFT]`)
- [ ] Blog index accordion auto-opens the matching topic when arriving via hash (`/blog#expats`)
- [ ] Lighthouse on Home, Blog index, and one sample blog post: Performance >85, SEO >95, Accessibility >90 (run via `npx lighthouse` or Chrome DevTools)
- [ ] Manual a11y check: keyboard navigation works on Navigation, Carousel, AccordionSection, ContactForm; visible focus rings; ARIA labels on language toggle and accordion triggers
- [ ] Responsive: works at 375px, 768px, 1024px, 1440px breakpoints
- [ ] `.env.local.example` committed; `.env.local` is gitignored
- [ ] Sitemap and robots.txt generated; hreflang tags present on every page
- [ ] `BLOG-AUTHORING.md`, `CREDITS.md`, and an updated `README.md` exist at repo root

---

## 16. Out of scope for V1

- GitHub repo init / Vercel deploy / DNS migration from Wix — separate session, after Matt's review
- Real client testimonials (placeholders only)
- Real photography beyond Sarah's headshot (Unsplash placeholders, flagged in CREDITS.md)
- Pricing or session-rate display anywhere
- Payment integration (V2 — SumUp)
- Lead magnets, email capture, client resources area (V2)
- Headless CMS (V2 if Sarah finds raw-MDX authoring painful)

---

## 17. Open questions to surface to Matt before/during build

These are flagged so the build agent doesn't silently invent answers:

1. **About page narrative**: confirm the "why I became a therapist" story arc is OK to draft from positioning anchors and mark `[DRAFT — review with Sarah]`, or wait for Sarah's input.
2. **FAQ regulatory wording** (confidentiality, professional body, jurisdiction): Sarah needs to provide accurate text — placeholder `[VERIFY WITH SARAH]` until then.
3. **Post 06 topic assignment**: "Does online therapy work?" is cross-cutting. Currently assigned to `parents` to keep topic counts even (2 posts each). If preferred, reassign to `expats` or add a fourth `general` topic.
4. **Audience pages** as dedicated routes (`/expat-therapy` etc) vs blog accordion sections — current default is accordion-only. Revisit if SEO performance after launch suggests dedicated landing pages would help.

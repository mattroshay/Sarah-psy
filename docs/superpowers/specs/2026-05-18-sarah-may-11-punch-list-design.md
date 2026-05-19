# Sarah's May 11 punch list — content overhaul + two site-wide tweaks

## Context

Sarah delivered her second editorial review on 11 May 2026 (source: `~/Library/Mobile Documents/com~apple~CloudDocs/M&S/Sarah website/Comments 11th may.docx`). It contains two site-wide tweaks plus final drafts for six blog articles (four substantial rewrites of existing posts, one rewrite of a post that was previously stub-only, and one entirely new post). The doc body is Sarah's *final copy*, not diff hints — the single phrase in red (`ambivalence of motherhood`) flags a specific concept she wants to land in the parents-section intro on the blog index.

This work ships separately from the unmerged `UI-animations` branch — they touch disjoint files (i18n + content vs. motion components), so there is no merge conflict; whichever lands first stands, the other rebases.

**Branch**: `sarah-comments-may-11`, off `master`.

---

## 1. Site-wide changes

### 1.1 Hide testimonials section

Sarah wants the "What patients say" home-page section hidden until she has real client quotes. The placeholder `[PLACEHOLDER]` testimonials currently shipping risk reading as fake reviews.

**Implementation:** simplest reversible hide — comment out the `<RevealSection>`/`<section>` block in `app/[locale]/page.tsx` (lines 134–146 on master) with a one-line note: `{/* TODO: re-enable when Sarah supplies real testimonials */}`. Do **not** delete the dictionary entries (`home.testimonialsHeading`, `home.testimonials`, the `<Testimonial>` import) — Sarah will be back here. Leaving the data lets the section come back with a one-line uncomment.

### 1.2 Add booking links inline in blog post bodies

Several of Sarah's new article bodies end with "book a free discovery call" / "book a free 15-minute discovery call" phrasing inline. Today the only Calendly link in a blog post is the closing `<Banner>` at the bottom of the rendered post page (in `app/[locale]/blog/[slug]/page.tsx`). Per Matt's direction, the closing Banner stays — we add an inline link on the phrase Sarah wrote into each body.

**Implementation:** plain markdown anchors inside each MDX file, pointing at `/[locale]/contact`. `MDXRemote` is rendered without a custom `components` map today (`app/[locale]/blog/[slug]/page.tsx:92`), and the project's prose styling already renders `<a>` in sage with hover underline (`prose-a:text-sage prose-a:no-underline hover:prose-a:underline` on the wrapper). No `mdx-components.tsx` or custom MDX component is needed — three lines added across six files beats a one-off abstraction.

The link target is `/[locale]/contact` rather than `process.env.NEXT_PUBLIC_CALENDLY_URL` because (a) MDX files can't read env vars at render time without plumbing through a component, and (b) the contact page already hosts the Calendly embed alongside the form — sending visitors there is equivalent to sending them to Calendly, plus gives them the email/form fallback. The closing `<Banner>` on the same page already routes to Calendly directly.

Locale is fixed per file (EN bodies link to `/en/contact`, FR bodies to `/fr/contact`) — hardcoded into the markdown link, not interpolated, since each MDX file is locale-specific.

---

## 2. Blog content updates

Two articles per topic. The existing `online-therapy-research.mdx` is **not** mentioned in Sarah's doc — keep as-is (no edits). The current `matrescence.mdx` is rewritten in place: new title, new body, slug stays `matrescence` for safety (zero risk of broken links since the site isn't in prod yet, and avoids a redirect we don't need). EN dates per Sarah's doc; FR dates mirror.

**FR strategy — full translation, not placeholder.** Every FR body is a complete, idiomatic French translation of the corresponding new EN body — same heading structure, same paragraph order, same length. The single `[FR — Sarah to validate]` tag goes at the top of each translated MDX body (just under the frontmatter, as an HTML comment so it never renders), signalling that Sarah's pass is to refine wording — not to write copy from scratch. Sarah reviews and tweaks; she does not have to translate.

Translation tone matches the May 4 work: warm, idiomatic, calibrated for a bilingual reader (not literal). Therapy terms use the established French equivalents already in the dictionaries (`TCC` for CBT, `burn-out`, `expatriation`, `matrescence` stays as-is per French usage). Keep Sarah's UK English idioms (e.g. "the body keeps score") rendered as their natural French equivalents, not transliterated.

### 2.1 Files modified

| Topic | EN slug | FR slug | Change |
|---|---|---|---|
| expats | `expat-anxiety` | `anxiete-expatriation` | Body rewrite (Sarah's draft, pg 1) |
| expats | `english-speaking-therapist-france` | `therapeute-anglophone-france` | Body rewrite (Sarah's draft, pg 2 starting "Finding English-speaking therapy in France: why it's so hard") |
| professionals | `what-is-cbt` | `cest-quoi-tcc` | Body rewrite |
| professionals | `burnout-or-tired` | `burnout-ou-fatigue` | Body rewrite + heavily expanded (Sarah's 5-signs section is now ~700 words longer) |
| parents | `matrescence` | `matrescence` | **Title + body replacement** to "Perinatal anxiety and the emotional weight of motherhood: you are not alone". Slug unchanged. Update frontmatter: `title`, `excerpt`, `keyword: "perinatal anxiety therapy"`, `heroImageAlt`. |
| parents | `why-your-child-triggers-you` | `pourquoi-votre-enfant-vous-declenche` | **NEW post** — Sarah's "2nd article" |

For all rewritten posts: strip the existing `[DRAFT — Sarah to write]` placeholders and replace bodies wholesale with Sarah's draft, mapped to `##` headings. Where Sarah uses bulleted lists (the 5-signs structure, the triggers list, the CBT-in-practice list), render as proper markdown bullets — not paragraphs of dashes.

Frontmatter `publishedAt`:
- `expat-anxiety` → 2026-01-22
- `english-speaking-therapist-france` → keep existing 2026-01-15 (current frontmatter). Sarah's doc didn't supply a new date for this rewrite, so the existing one stands; flagged in §6.
- `what-is-cbt` → 2026-02-12
- `burnout-or-tired` → 2026-02-05
- `matrescence` (now perinatal anxiety) → 2026-03-15
- `why-your-child-triggers-you` → **TBD — flag to Sarah**. Default: 2026-05-18 (today).

### 2.2 New post (`why-your-child-triggers-you`)

- Topic: `parents`
- Keyword: `parenting triggers therapy` (placeholder — Sarah to refine)
- `heroImage`: **flag to Sarah** — no image specified. Placeholder: reuse `/images/specialties-parenting.jpg` (already in use on matrescence post — fine for a sibling parents-topic article).
- `heroImageAlt`: "Parent and child"
- `relatedSlugs`: `["matrescence", "online-therapy-research"]`
- Excerpt: 140–180 chars drawn from Sarah's opening paragraph

### 2.3 Blog index parents-section intro (the red phrase)

In `lib/i18n/en.ts`, `blog.sections.parents.intro` currently reads:

> "Parenthood changes everything. These posts cover perinatal anxiety, matrescence, and the emotional weight of raising children — with honesty and no judgement."

Replace with Sarah's wording (note "ambivalence of motherhood" — her red phrase — substitutes for "matrescence"):

> "Parenthood changes everything. These posts cover perinatal anxiety, the **ambivalence of motherhood** and the emotional weight of raising children — with honesty and no judgement."

FR mirror in `lib/i18n/fr.ts` — full idiomatic translation, Sarah will refine, not write:

> "La parentalité change tout. Ces articles abordent l'anxiété périnatale, l'ambivalence de la maternité et le poids émotionnel d'élever des enfants — avec honnêteté et sans jugement."

The `[FR — Sarah to validate]` markers used in May 4 work were applied per dictionary key; for this content branch use a single HTML-comment marker at the top of each translated MDX body (under the frontmatter): `{/* FR — Sarah to validate */}`. The dict-level intros in `fr.ts` get an inline `// FR — Sarah to validate` comment on the line above the changed string. Either way, all translations are complete and shippable as-is; the markers only flag "Sarah's pass, not Matt's invention".

### 2.4 Related-posts cross-links

When swapping `matrescence` from "Matrescence: the identity shift" to "Perinatal anxiety…", check `relatedSlugs` arrays across the parents-topic MDX files and adjust so the new post and the new "child triggers" post cross-link to each other (each gets the other in its `relatedSlugs`, plus one outside-topic CBT or expat reference for variety).

---

## 3. Files touched

**New:**
- `content/blog/en/why-your-child-triggers-you.mdx`
- `content/blog/fr/pourquoi-votre-enfant-vous-declenche.mdx`
(No new components or `mdx-components.tsx` needed — inline markdown anchors are sufficient per §1.2.)

**Modified:**
- `app/[locale]/page.tsx` — comment out testimonials section.
- `content/blog/en/expat-anxiety.mdx` — body rewrite.
- `content/blog/fr/anxiete-expatriation.mdx` — full FR translation.
- `content/blog/en/english-speaking-therapist-france.mdx` — body rewrite.
- `content/blog/fr/therapeute-anglophone-france.mdx` — full FR translation.
- `content/blog/en/what-is-cbt.mdx` — body rewrite.
- `content/blog/fr/cest-quoi-tcc.mdx` — full FR translation.
- `content/blog/en/burnout-or-tired.mdx` — body rewrite + expansion.
- `content/blog/fr/burnout-ou-fatigue.mdx` — full FR translation.
- `content/blog/en/matrescence.mdx` — title + body + frontmatter (`title`, `excerpt`, `keyword`, `heroImageAlt`) replaced.
- `content/blog/fr/matrescence.mdx` — same shape, full FR translation.
- `lib/i18n/en.ts` — `blog.sections.parents.intro` updated.
- `lib/i18n/fr.ts` — `blog.sections.parents.intro` updated to the new FR translation.
- `lib/routes.ts` or wherever the new post's slug map lives — register the new EN/FR slugs.

**Unchanged:**
- `online-therapy-research.mdx` (EN + FR) — not in Sarah's doc.
- Banner CTAs on every page — unchanged.
- All UI components, motion work, styling.

---

## 4. Build sequence

1. **Branch**: `git checkout -b sarah-comments-may-11` from master.
2. **Testimonials hide** (§1.1) — one-file edit. Verify visually that the home page still renders cleanly with the section gone (no dangling empty space).
3. **Blog index intro** (§2.3) — two-file dict edit.
4. **Existing post rewrites** — work through them one at a time, EN then FR placeholder per post. Verify `npm run build` after each (frontmatter parsing fails loudly).
5. **New post** — create EN + FR, register slugs, link from related posts.
6. **Inline booking links** — pass through each rewritten post and wrap the "book a free discovery call" phrasing in `<BookingLink>` or markdown anchor.
7. **Verification** (§5).

Each step is reversible — content edits never touch routing or components beyond the testimonials hide.

---

## 5. Verification

- `npm run build` — passes cleanly. Catches malformed frontmatter / unregistered slugs / broken zod validation.
- `npm run lint` — passes.
- Browser smoke test on `npm run dev`:
  - `/en` and `/fr` home — testimonials section absent, page flows naturally (no orphan whitespace, no broken padding).
  - `/en/blog` and `/fr/blog` — parents-section intro shows the new "ambivalence" wording.
  - `/en/blog/expat-anxiety`, `/en/blog/english-speaking-therapist-france`, `/en/blog/what-is-cbt`, `/en/blog/burnout-or-tired`, `/en/blog/matrescence` (now perinatal-anxiety title), `/en/blog/why-your-child-triggers-you` — render with Sarah's bodies; hero images intact; related-posts cross-links resolve.
  - FR equivalents render with the full French translations as live body text (no visible markers — `{/* FR — Sarah to validate */}` lives in the MDX source as an HTML comment that MDX strips at render).
  - Inline "Book a free discovery call" links in each post point at the locale-specific contact page (`/en/contact` in EN files, `/fr/contact` in FR files).
  - Closing `<Banner>` CTA still present on every post — not removed by the rewrite.

---

## 6. Open items to surface to Sarah

These are flagged so the implementing agent does not silently invent answers:

1. **Hero image for the new "Why your child triggers you" post** — Sarah did not specify. Implementation will placeholder with `/images/specialties-parenting.jpg`; Sarah picks a final image at next review.
2. **Date for the new post** — not given in doc. Defaulting to today (2026-05-18) in `publishedAt`. Sarah confirms or replaces.
3. **`publishedAt` for the english-speaking-therapist-france rewrite** — Sarah's doc only dates the *expat anxiety* article (22 Jan 2026). This post keeps its existing 2026-01-15 date. Sarah confirms or replaces.
4. **Keyword for the new post** — placeholder `"parenting triggers therapy"`. Sarah may want something else.
5. **FR body wording** — every new FR body is a complete French translation of the new EN body, tagged with a top-of-file `{/* FR — Sarah to validate */}` comment. Sarah refines wording at her next review — she does not need to translate from scratch.

---

## 7. Out of scope

- Animations / motion work (lives on `UI-animations` branch, separate PR).
- Real photography for the new post (placeholder image).
- Redirects for renamed slugs (none renamed — `matrescence` stays `matrescence`).
- Any change to `online-therapy-research.mdx`.
- Pricing, Calendly URL config, Formspree, or any env vars.
- FR validation (Sarah's pass).

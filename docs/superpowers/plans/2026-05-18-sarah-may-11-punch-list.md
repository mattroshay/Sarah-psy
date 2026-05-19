# Sarah's May 11 punch list — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply Sarah Cousin Roshay's 11 May 2026 editorial review: hide the placeholder testimonials, add inline booking links inside updated blog post bodies, and ship rewrites of 5 existing blog posts plus 1 net-new post, with full French translations.

**Architecture:** Pure content/dictionary work on top of the existing MDX blog system. No new components, no routing changes, no schema changes. The only TypeScript/component touch is one commented-out section in `app/[locale]/page.tsx`. Verification is `npm run build` (catches frontmatter / zod errors) + a browser smoke pass on EN and FR.

**Tech Stack:** Next.js 16 App Router, MDX via `next-mdx-remote/rsc`, gray-matter + zod for frontmatter validation, Tailwind v4 typography plugin for prose styling.

**Spec:** `docs/superpowers/specs/2026-05-18-sarah-may-11-punch-list-design.md`

**Source of new content:** `~/Library/Mobile Documents/com~apple~CloudDocs/M&S/Sarah website/Comments 11th may.docx` (NOT needed during implementation — all final EN and FR content is embedded in this plan).

---

## File map

**Modify:**
- `app/[locale]/page.tsx` — comment out testimonials section
- `lib/i18n/en.ts` — `blog.sections.parents.intro` updated
- `lib/i18n/fr.ts` — `blog.sections.parents.intro` updated (FR translation)
- `content/blog/en/expat-anxiety.mdx` — body rewrite
- `content/blog/fr/anxiete-expatriation.mdx` — body rewrite (FR translation)
- `content/blog/en/english-speaking-therapist-france.mdx` — body rewrite, title change
- `content/blog/fr/therapeute-anglophone-france.mdx` — body rewrite, title change (FR translation)
- `content/blog/en/what-is-cbt.mdx` — body rewrite
- `content/blog/fr/cest-quoi-tcc.mdx` — body rewrite (FR translation)
- `content/blog/en/burnout-or-tired.mdx` — body rewrite + expansion, title change
- `content/blog/fr/burnout-ou-fatigue.mdx` — body rewrite + expansion, title change (FR translation)
- `content/blog/en/matrescence.mdx` — title + body replacement to "Perinatal anxiety…"
- `content/blog/fr/matrescence.mdx` — same (FR translation)

**Create:**
- `content/blog/en/why-your-child-triggers-you.mdx`
- `content/blog/fr/pourquoi-votre-enfant-vous-declenche.mdx`

**Untouched:**
- `content/blog/en/online-therapy-research.mdx` and FR equivalent (not in Sarah's doc)
- All UI components, routing, middleware, env config, motion work

---

## Conventions

- **Inline booking links** are plain markdown anchors: `[book a free discovery call](/en/contact)` (EN) and `[réserver un appel découverte](/fr/contact)` (FR). The `prose-a:text-sage` styling on the MDX wrapper handles colour and hover.
- **FR translation marker:** each FR MDX body gets a single `{/* FR — Sarah to validate */}` HTML-comment on the line directly under the frontmatter. Dict entries in `fr.ts` get `// FR — Sarah to validate` on the line above the changed string.
- **Commit cadence:** one commit per task. Conventional commits style (`feat(content):`, `feat(i18n):`, etc.). Co-author line on every commit.
- **Verification:** `npm run build` after every task that touches MDX (frontmatter parse errors fail loudly). `npm run lint` once at the end.

---

## Task 1: Create the branch

**Files:** (none)

- [ ] **Step 1: Verify clean working tree**

```bash
git status
```

Expected: `nothing to commit, working tree clean` and `On branch master`.

- [ ] **Step 2: Create and switch to the new branch**

```bash
git checkout -b sarah-comments-may-11
```

Expected: `Switched to a new branch 'sarah-comments-may-11'`.

- [ ] **Step 3: Confirm**

```bash
git branch --show-current
```

Expected: `sarah-comments-may-11`.

(No commit — branch creation is the work.)

---

## Task 2: Hide the home-page testimonials section

**Files:**
- Modify: `app/[locale]/page.tsx` (around lines 134–146 on master)

The current testimonials section uses placeholder copy that risks reading as fabricated reviews. Hide reversibly — keep the dict entries (`home.testimonialsHeading`, `home.testimonials`) and the `<Testimonial>` import intact so the section can return with a one-line uncomment.

- [ ] **Step 1: Read the current file to locate exact lines**

```bash
grep -n "Testimonials\|testimonials" "app/[locale]/page.tsx"
```

Note the line numbers — they should be in the 130s.

- [ ] **Step 2: Replace the testimonials block**

Find this block in `app/[locale]/page.tsx`:

```tsx
      {/* Testimonials */}
      <section className="bg-warm py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-8 text-center">
            {home.testimonialsHeading}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {home.testimonials.map((t) => (
              <Testimonial key={t.attribution} quote={t.quote} attribution={t.attribution} />
            ))}
          </div>
        </div>
      </section>
```

Replace with:

```tsx
      {/* Testimonials — hidden per Sarah's May 11 review; re-enable when she supplies real client reviews. */}
      {/*
      <section className="bg-warm py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-8 text-center">
            {home.testimonialsHeading}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {home.testimonials.map((t) => (
              <Testimonial key={t.attribution} quote={t.quote} attribution={t.attribution} />
            ))}
          </div>
        </div>
      </section>
      */}
```

- [ ] **Step 3: Build to confirm no regression**

```bash
npm run build
```

Expected: clean build, 32 pages generated. Watch for any "unused import" warning on `Testimonial` — if it appears, leave the import alone (the dictionary still references the type tree and Sarah will be back here).

- [ ] **Step 4: Visual smoke**

Start dev: `npm run dev`. Open `http://localhost:3000/en` and scroll to where the testimonials used to be (between audience cards and the CTA banner). Confirm no orphan whitespace or broken layout. Stop dev.

- [ ] **Step 5: Commit**

```bash
git add "app/[locale]/page.tsx"
git commit -m "$(cat <<'EOF'
feat(home): hide testimonials until real reviews land

Sarah flagged on 11 May that the placeholder testimonials risk reading
as fake reviews. Commented out reversibly so the section comes back with
a one-line uncomment once she supplies real client quotes — dict entries
and Testimonial import preserved.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Update the blog index parents-section intro

**Files:**
- Modify: `lib/i18n/en.ts` (`blog.sections.parents.intro`)
- Modify: `lib/i18n/fr.ts` (`blog.sections.parents.intro`)

Sarah flagged in red the phrase "ambivalence of motherhood" — it replaces "matrescence" in the parents-section intro on the blog index.

- [ ] **Step 1: Locate the EN string**

```bash
grep -n "matrescence\|Parents & New Mothers" lib/i18n/en.ts
```

- [ ] **Step 2: Edit `lib/i18n/en.ts`**

Find:

```ts
      parents: {
        heading: "For Parents & New Mothers",
        intro:
          "Parenthood changes everything. These posts cover perinatal anxiety, matrescence, and the emotional weight of raising children — with honesty and no judgement.",
      },
```

Replace the `intro` value with:

```ts
      parents: {
        heading: "For Parents & New Mothers",
        intro:
          "Parenthood changes everything. These posts cover perinatal anxiety, the ambivalence of motherhood and the emotional weight of raising children — with honesty and no judgement.",
      },
```

- [ ] **Step 3: Edit `lib/i18n/fr.ts`**

```bash
grep -n "parents:\|matrescence\|Parents et nouvelles mères\|parentalité change" lib/i18n/fr.ts
```

Find the parents section (similar shape) and replace the `intro` with:

```ts
      parents: {
        heading: "Pour les parents et les jeunes mères",
        // FR — Sarah to validate
        intro:
          "La parentalité change tout. Ces articles abordent l'anxiété périnatale, l'ambivalence de la maternité et le poids émotionnel d'élever des enfants — avec honnêteté et sans jugement.",
      },
```

(Adjust the `heading` value to whatever currently exists if different — change only the `intro`. The Sarah-to-validate comment goes only on the changed string.)

- [ ] **Step 4: Build**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 5: Smoke**

```bash
npm run dev
```

Open `http://localhost:3000/en/blog` — scroll to "For Parents & New Mothers" section, confirm the new wording ("the ambivalence of motherhood"). Open `http://localhost:3000/fr/blog`, same check for FR ("l'ambivalence de la maternité"). Stop dev.

- [ ] **Step 6: Commit**

```bash
git add lib/i18n/en.ts lib/i18n/fr.ts
git commit -m "$(cat <<'EOF'
feat(i18n): update blog parents-section intro per Sarah May 11

Replace 'matrescence' with 'the ambivalence of motherhood' in the
parents-section intro on the blog index, per Sarah's red-flagged
phrase in her 11 May review. FR mirror translated, tagged for
Sarah's validation.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Rewrite `expat-anxiety.mdx` (EN + FR)

**Files:**
- Modify: `content/blog/en/expat-anxiety.mdx`
- Modify: `content/blog/fr/anxiete-expatriation.mdx`

Sarah's draft refines the existing body. New title, refined excerpt to match new copy. No inline booking link — body doesn't naturally invite one; closing Banner CTA handles it.

- [ ] **Step 1: Replace `content/blog/en/expat-anxiety.mdx` with**

```mdx
---
title: "Expat anxiety: why it hits differently and what actually helps"
slug: "expat-anxiety"
locale: "en"
topic: "expats"
publishedAt: "2026-01-22"
excerpt: "Expat anxiety has its own texture — identity, isolation, language exhaustion, partner dynamics. A bilingual CBT therapist who has lived it explains why it goes unrecognised and how CBT helps."
keyword: "expat therapist France"
heroImage: "/images/blog/expat-anxiety.jpg"
heroImageAlt: "Sunlit street in a European city, quiet and calm"
relatedSlugs: ["english-speaking-therapist-france", "what-is-cbt"]
---

## The specific mental health stressors of expat life

Identity, isolation, language exhaustion, culture adaptation, partner dynamics when one person is more settled than the other, settling in, being out of our comfort zone — expat stress has a particular texture that general anxiety content rarely addresses.

## Why expat anxiety often goes unrecognised

From the outside, your life looks like an adventure, sometimes even a long holiday. Naming the difficulty can feel ungrateful. That gap between appearance and inner reality is itself exhausting. That feeling of "you have it all so you can't complain" — nobody can really understand what you are going through, so you don't talk about it.

## How CBT helps expats manage anxiety and transitions

CBT is particularly useful for the thought patterns that expat life amplifies: catastrophising, perfectionism in a new language, and comparison with people who seem more adapted than you. CBT helps you observe those thought patterns that lead to specific behaviours and allows you to change them in a practical and strategic way.

## My personal take on expat life

I moved countries as a child and as an adult, navigated a new language in professional settings, built a new support system and social life at every move, and worked through my own version of expat dislocation. Expat life is fulfilling; it tests you in many ways and forces you out of your comfort zone in several aspects of life. It teaches you resilience and perseverance. It does come with a lot of ups and downs, and that is why I personally think that being accompanied — whether socially or professionally — is crucial to a great experience. Talking about how we feel, observing our thoughts and our behaviours, and better understanding how we work helps in navigating expat anxiety.
```

- [ ] **Step 2: Replace `content/blog/fr/anxiete-expatriation.mdx` with**

```mdx
---
title: "L'anxiété des expatriés : pourquoi elle est différente et ce qui aide vraiment"
slug: "anxiete-expatriation"
locale: "fr"
topic: "expats"
publishedAt: "2026-01-22"
excerpt: "L'anxiété des expatriés a sa propre texture — identité, isolement, épuisement linguistique, dynamiques de couple. Une thérapeute TCC bilingue qui l'a vécue explique pourquoi elle passe inaperçue et comment la TCC aide."
keyword: "anxiété expatriation"
heroImage: "/images/blog/anxiete-expatriation.jpg"
heroImageAlt: "Rue ensoleillée d'une ville européenne, calme et apaisante"
relatedSlugs: ["therapeute-anglophone-france", "cest-quoi-tcc"]
---

{/* FR — Sarah to validate */}

## Les sources de stress spécifiques à la vie d'expatrié·e

Identité, isolement, fatigue linguistique, adaptation culturelle, dynamiques de couple lorsque l'un·e est plus installé·e que l'autre, l'installation elle-même, le fait d'être sorti·e de sa zone de confort — le stress de l'expatriation a une texture particulière que les contenus généralistes sur l'anxiété abordent rarement.

## Pourquoi l'anxiété de l'expatriation passe souvent inaperçue

De l'extérieur, votre vie ressemble à une aventure, parfois même à de longues vacances. Nommer la difficulté peut sembler ingrat. Cet écart entre l'apparence et la réalité intérieure est en soi épuisant. Ce sentiment du « tu as tout, tu ne peux pas te plaindre » — personne ne peut vraiment comprendre ce que vous traversez, alors vous n'en parlez pas.

## Comment la TCC aide les expatrié·es à gérer l'anxiété et les transitions

La TCC est particulièrement utile pour les schémas de pensée que la vie d'expatrié·e amplifie : la catastrophisation, le perfectionnisme dans une nouvelle langue, et la comparaison avec celles et ceux qui semblent mieux adaptés que vous. La TCC vous aide à observer ces schémas de pensée qui conduisent à des comportements spécifiques et vous permet de les changer de manière pratique et stratégique.

## Mon expérience personnelle de l'expatriation

J'ai changé de pays enfant puis adulte, j'ai navigué dans une nouvelle langue dans un cadre professionnel, j'ai construit un nouveau réseau de soutien et une vie sociale à chaque déménagement, et j'ai traversé ma propre version du décalage de l'expatriation. La vie d'expatrié·e est enrichissante ; elle vous teste de multiples façons et vous force à sortir de votre zone de confort dans plusieurs aspects de la vie. Elle apprend la résilience et la persévérance. Elle comporte aussi beaucoup de hauts et de bas, et c'est pour cela que je pense personnellement qu'être accompagné·e — socialement ou professionnellement — est essentiel à une bonne expérience. Parler de ce que l'on ressent, observer ses pensées et ses comportements, mieux comprendre comment on fonctionne : tout cela aide à traverser l'anxiété de l'expatriation.
```

- [ ] **Step 3: Build to verify frontmatter parses**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 4: Smoke**

```bash
npm run dev
```

Open `http://localhost:3000/en/blog/expat-anxiety` — confirm new title, body, hero image. Open `http://localhost:3000/fr/blog/anxiete-expatriation` — confirm FR title and body render with the FR-validate comment NOT visible (HTML comment is stripped at render). Stop dev.

- [ ] **Step 5: Commit**

```bash
git add content/blog/en/expat-anxiety.mdx content/blog/fr/anxiete-expatriation.mdx
git commit -m "$(cat <<'EOF'
feat(content): rewrite expat-anxiety per Sarah May 11

Replace draft body with Sarah's final copy. New title "Expat anxiety:
why it hits differently and what actually helps", refined excerpt.
Adds Sarah's personal experience section. FR translation tagged for
Sarah's validation.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Rewrite `english-speaking-therapist-france.mdx` (EN + FR)

**Files:**
- Modify: `content/blog/en/english-speaking-therapist-france.mdx`
- Modify: `content/blog/fr/therapeute-anglophone-france.mdx`

Title changes from "How to find an English-speaking therapist in France" to "Finding English-speaking therapy in France: why it's so hard". Date stays 2026-01-15 (flagged in spec §6). Closing section has an inline booking-link phrase.

- [ ] **Step 1: Replace `content/blog/en/english-speaking-therapist-france.mdx` with**

```mdx
---
title: "Finding English-speaking therapy in France: why it's so hard"
slug: "english-speaking-therapist-france"
locale: "en"
topic: "expats"
publishedAt: "2026-01-15"
excerpt: "Finding a therapist who works in your first language is hard. Finding one who understands expat life adds another layer. A bilingual CBT therapist explains what to look for."
keyword: "english speaking therapist France"
heroImage: "/images/blog/english-speaking-therapist-france.jpg"
heroImageAlt: "Person sitting in a calm, light-filled room, looking thoughtful"
relatedSlugs: ["expat-anxiety", "what-is-cbt"]
---

## Finding English-speaking therapy in France: why it's so hard

Finding a therapist who works in your first language is already difficult. Finding one who understands the specific pressures of expat life adds another layer. In France, most practitioners work best in French as it is their mother tongue, and words are extremely important in therapy — so fully understanding what patients say, even when it isn't in their native language, is crucial. That is why, even though many professionals do speak English, they don't necessarily practice in English: it requires a deeper understanding of the language.

## What to look for in a therapist

Qualifications, approach, and language fluency all matter. Being comfortable with your therapist is very important and that is, in my opinion, the number one criteria. Being able to speak freely, understood in your language — or a mix of languages if that is how you speak — is very important, because words should flow as naturally as possible in therapy. A certain level of understanding of your culture is also an added value.

## Online vs in-person — what works better for expats

Online therapy removes the geography problem entirely. For expats moving between countries or cities, this flexibility often matters more than the format. There is no right or wrong — bottom line, it is what you are most comfortable with that matters.

## If you are not sure, [book a free discovery call](/en/contact)

Most practitioners offer a free short call to talk through what you are looking for and to see if you feel comfortable with the therapist.
```

- [ ] **Step 2: Replace `content/blog/fr/therapeute-anglophone-france.mdx` with**

```mdx
---
title: "Trouver une thérapie en anglais en France : pourquoi c'est si difficile"
slug: "therapeute-anglophone-france"
locale: "fr"
topic: "expats"
publishedAt: "2026-01-15"
excerpt: "Trouver un·e thérapeute qui travaille dans votre langue maternelle est déjà difficile. Trouver quelqu'un qui comprend l'expatriation ajoute une couche. Une thérapeute TCC bilingue explique ce qu'il faut chercher."
keyword: "thérapeute anglophone France"
heroImage: "/images/blog/therapeute-anglophone-france.jpg"
heroImageAlt: "Personne assise dans une pièce calme et lumineuse"
relatedSlugs: ["anxiete-expatriation", "cest-quoi-tcc"]
---

{/* FR — Sarah to validate */}

## Trouver une thérapie en anglais en France : pourquoi c'est si difficile

Trouver un·e thérapeute qui travaille dans votre langue maternelle est déjà difficile. Trouver quelqu'un qui comprend les pressions spécifiques de la vie d'expatrié·e ajoute une couche supplémentaire. En France, la plupart des praticien·nes travaillent mieux en français car c'est leur langue maternelle, et les mots sont extrêmement importants en thérapie — alors bien comprendre ce que disent les patient·es, même quand ce n'est pas dans leur langue maternelle, est crucial. C'est pour cela que, même si beaucoup de professionnel·les parlent anglais, iels ne pratiquent pas nécessairement en anglais : cela demande une compréhension plus profonde de la langue.

## Ce qu'il faut chercher chez un·e thérapeute

Les qualifications, l'approche et l'aisance linguistique comptent toutes. Être à l'aise avec votre thérapeute est très important — c'est, à mon avis, le critère numéro un. Pouvoir parler librement, être compris·e dans votre langue — ou dans un mélange de langues si c'est ainsi que vous parlez — est essentiel, parce que les mots doivent circuler aussi naturellement que possible en thérapie. Une certaine compréhension de votre culture est aussi un atout.

## En ligne ou en cabinet — qu'est-ce qui marche le mieux pour les expatrié·es ?

La thérapie en ligne supprime entièrement le problème géographique. Pour les expatrié·es qui se déplacent entre pays ou villes, cette flexibilité compte souvent plus que le format. Il n'y a pas de bonne ou de mauvaise réponse — au fond, c'est ce avec quoi vous êtes le plus à l'aise qui compte.

## Si vous n'êtes pas sûr·e, [réservez un appel découverte gratuit](/fr/contact)

La plupart des praticien·nes proposent un court appel gratuit pour discuter de ce que vous cherchez et voir si vous vous sentez à l'aise avec le ou la thérapeute.
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Smoke**

```bash
npm run dev
```

Open `http://localhost:3000/en/blog/english-speaking-therapist-france` — confirm new title, "If you are not sure, book a free discovery call" link is sage-coloured and routes to `/en/contact` on hover/click. Open `http://localhost:3000/fr/blog/therapeute-anglophone-france` — same checks for FR. Stop dev.

- [ ] **Step 5: Commit**

```bash
git add content/blog/en/english-speaking-therapist-france.mdx content/blog/fr/therapeute-anglophone-france.mdx
git commit -m "$(cat <<'EOF'
feat(content): rewrite english-speaking-therapist-france per Sarah May 11

New title "Finding English-speaking therapy in France: why it's so hard".
Body rewritten with Sarah's final copy. Inline booking link added in
closing section, pointing at /contact. FR translation tagged for
Sarah's validation.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Rewrite `what-is-cbt.mdx` (EN + FR)

**Files:**
- Modify: `content/blog/en/what-is-cbt.mdx`
- Modify: `content/blog/fr/cest-quoi-tcc.mdx`

Title stays. Body fully replaced. No inline booking link in body — closing Banner CTA handles it.

- [ ] **Step 1: Replace `content/blog/en/what-is-cbt.mdx` with**

```mdx
---
title: "What is CBT and is it right for me?"
slug: "what-is-cbt"
locale: "en"
topic: "professionals"
publishedAt: "2026-02-12"
excerpt: "CBT works on the connection between thoughts, feelings, and behaviours. A plain-language guide to what a session actually looks like, what CBT helps with, and how to know if it is right for you."
keyword: "CBT therapist online France"
heroImage: "/images/blog/what-is-cbt.jpg"
heroImageAlt: "Calm therapeutic space"
relatedSlugs: ["burnout-or-tired", "online-therapy-research"]
---

## What CBT is, in plain language

Cognitive Behavioural Therapy works on the connection between thoughts, feelings, and behaviours. It makes you observe the thoughts that lead to specific feelings and behaviours. It allows you to change how you interpret a situation — and as you change that, you change how you feel and how you act.

## How a session actually looks

Sessions are structured but conversational. We set your objectives, work through something specific, and use concrete tools that you try in between sessions for a sustainable approach. For example, the "detective" tool helps you observe your thoughts and "play" detective by finding facts that are for and against those thoughts.

## What it helps with

CBT is well-suited to anxiety, phobias, burnout, and perfectionism, amongst others. The more we understand our thought patterns, the better we can adapt and change our behaviours.

## How to know if it is right for you

If you want a sustainable approach — something concrete and actionable, tools rather than just insight — and if you are willing to try things between sessions, CBT is likely a good fit.
```

- [ ] **Step 2: Replace `content/blog/fr/cest-quoi-tcc.mdx` with**

```mdx
---
title: "C'est quoi la TCC et est-ce fait pour moi ?"
slug: "cest-quoi-tcc"
locale: "fr"
topic: "professionals"
publishedAt: "2026-02-12"
excerpt: "La TCC travaille sur le lien entre les pensées, les émotions et les comportements. Un guide en langage clair sur le déroulement d'une séance, ce que la TCC aide à traiter, et comment savoir si elle vous convient."
keyword: "TCC en ligne"
heroImage: "/images/blog/cest-quoi-tcc.jpg"
heroImageAlt: "Espace thérapeutique apaisant"
relatedSlugs: ["burnout-ou-fatigue", "therapie-en-ligne-recherche"]
---

{/* FR — Sarah to validate */}

## La TCC en langage clair

La Thérapie Cognitivo-Comportementale travaille sur le lien entre les pensées, les émotions et les comportements. Elle vous fait observer les pensées qui mènent à des émotions et des comportements spécifiques. Elle vous permet de changer la façon dont vous interprétez une situation — et en changeant cela, vous changez ce que vous ressentez et la façon dont vous agissez.

## À quoi ressemble vraiment une séance

Les séances sont structurées mais conversationnelles. Nous définissons vos objectifs, travaillons sur quelque chose de spécifique, et utilisons des outils concrets que vous essayez entre les séances, pour une approche durable. Par exemple, l'outil du « détective » vous aide à observer vos pensées et à « jouer » au détective en cherchant les faits qui plaident pour et contre ces pensées.

## Ce qu'elle aide à traiter

La TCC est particulièrement adaptée à l'anxiété, aux phobies, au burn-out et au perfectionnisme, entre autres. Plus nous comprenons nos schémas de pensée, mieux nous pouvons adapter et changer nos comportements.

## Comment savoir si elle est faite pour vous

Si vous souhaitez une approche durable — quelque chose de concret et d'actionnable, des outils plutôt que de la simple introspection — et si vous êtes prêt·e à essayer des choses entre les séances, la TCC est probablement faite pour vous.
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Smoke**

```bash
npm run dev
```

Open `http://localhost:3000/en/blog/what-is-cbt` and `http://localhost:3000/fr/blog/cest-quoi-tcc` — confirm rewritten bodies. Stop dev.

- [ ] **Step 5: Commit**

```bash
git add content/blog/en/what-is-cbt.mdx content/blog/fr/cest-quoi-tcc.mdx
git commit -m "$(cat <<'EOF'
feat(content): rewrite what-is-cbt per Sarah May 11

Replace draft body with Sarah's final copy. Plain-language framing,
adds the 'detective tool' example. FR translation tagged for Sarah's
validation.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Rewrite `burnout-or-tired.mdx` (EN + FR)

**Files:**
- Modify: `content/blog/en/burnout-or-tired.mdx`
- Modify: `content/blog/fr/burnout-ou-fatigue.mdx`

Substantial expansion — Sarah's new draft adds a 5-signs-detailed breakdown plus burnout-vs-depression framing. New title. Inline booking link in closing section.

- [ ] **Step 1: Replace `content/blog/en/burnout-or-tired.mdx` with**

```mdx
---
title: "Burnout or just tired? Five signs it's more than exhaustion"
slug: "burnout-or-tired"
locale: "en"
topic: "professionals"
publishedAt: "2026-02-05"
excerpt: "Tiredness lifts after rest. Burnout doesn't. Five signs that what you are experiencing goes beyond ordinary fatigue, with the CBT tools that help — from a therapist with 15 years of corporate experience."
keyword: "burnout therapist online"
heroImage: "/images/issues-i-work-with.jpg"
heroImageAlt: "A reflective moment in a quiet space"
relatedSlugs: ["what-is-cbt", "online-therapy-research"]
---

## What burnout actually is — and is it the same as depression?

Burnout is a clinical state of chronic workplace stress that has not been successfully managed. It is not laziness, weakness, or just needing a holiday. It is different from depression even though there is some overlap — exhaustion, withdrawal, reduced concentration, diminished motivation. However, depression tends to be pervasive: it follows the person across all life domains and doesn't "take a break". Burnout though is related to the work context — someone burnt out may feel fine on holiday, for example. That said, burnout can potentially lead to depression.

## Five signs you are burning out, not just tired

Tiredness lifts after a good night's sleep or a quiet weekend. Burnout doesn't. Here are five signs that what you are experiencing goes beyond ordinary fatigue.

### 1. Emotional exhaustion

This is more than feeling tired at the end of a long day. Emotional exhaustion is a deep, persistent depletion that rest doesn't seem to touch. You wake up already drained. Small things that used to be manageable — an unexpected request, a difficult email, a conversation that requires energy — feel disproportionately heavy. You may notice yourself dreading the start of the week in a way that feels physical, not just mental.

### 2. Cynicism and detachment

You used to care about your work. Now you find yourself going through the motions, feeling increasingly distant from colleagues, clients, or the purpose behind what you do. This isn't laziness or ingratitude — it is a protective mechanism. When the emotional cost of caring feels too high, the mind begins to detach. If you notice sarcasm creeping in where there used to be investment, or indifference where there used to be meaning, that shift is worth paying attention to.

### 3. Reduced efficacy — feeling like you can't do anything right

Burnout erodes your sense of competence. Tasks that were once automatic start to feel effortful or even impossible. You may find yourself second-guessing decisions, struggling to concentrate, or finishing a day's work with a persistent feeling that none of it was good enough. For high performers, this is often one of the most distressing signs — because it contradicts the identity you have built around being capable and reliable.

### 4. Physical symptoms that don't have an obvious cause

The body keeps score. Persistent headaches, disrupted sleep, recurring illness, digestive issues, tension in the jaw or shoulders — these are common physical expressions of chronic stress. If you find yourself getting ill more often than usual, or waking at 3am with your mind already racing, your nervous system may be telling you something your conscious mind is still pushing through.

### 5. The inability to switch off

One of the clearest markers of burnout is that rest stops feeling restorative. You are on holiday but mentally still at your desk. You are with your family but not really present. You sit down to relax and feel guilty, restless, or unable to slow down. The boundary between work and recovery has collapsed — and without recovery, the depletion deepens.

## If several of these feel familiar

One sign in isolation doesn't mean burnout. But if you are reading this and nodding at three, four, or five of them — particularly if they have been present for weeks or months rather than days — it is worth taking seriously. Burnout doesn't resolve by pushing through.

## What CBT tools work for burnout recovery

Boundary-setting, cognitive restructuring around perfectionism, and behaviour activation are three approaches that make a practical difference during recovery. So basically, we work on self-worthiness, reframe certain beliefs and values, and talk about the fear of failure or shame.

## If this sounds familiar, we can talk

You can [book a free 15-minute discovery call](/en/contact) to talk through where you are and what might help.
```

- [ ] **Step 2: Replace `content/blog/fr/burnout-ou-fatigue.mdx` with**

```mdx
---
title: "Burn-out ou simple fatigue ? Cinq signes que c'est plus qu'un épuisement"
slug: "burnout-ou-fatigue"
locale: "fr"
topic: "professionals"
publishedAt: "2026-02-05"
excerpt: "La fatigue passe avec le repos. Le burn-out, non. Cinq signes que ce que vous vivez dépasse la fatigue ordinaire, avec les outils TCC qui aident — par une thérapeute avec 15 ans d'expérience en entreprise."
keyword: "thérapeute burnout en ligne"
heroImage: "/images/issues-i-work-with.jpg"
heroImageAlt: "Un moment de réflexion dans un espace calme"
relatedSlugs: ["cest-quoi-tcc", "therapie-en-ligne-recherche"]
---

{/* FR — Sarah to validate */}

## Qu'est-ce que le burn-out, vraiment — et est-ce la même chose que la dépression ?

Le burn-out est un état clinique de stress chronique au travail qui n'a pas été géré avec succès. Ce n'est ni de la paresse, ni de la faiblesse, ni juste un besoin de vacances. Il est différent de la dépression même s'il y a un certain chevauchement — épuisement, retrait, concentration réduite, motivation diminuée. Cependant, la dépression tend à être globale : elle suit la personne dans tous les domaines de sa vie et ne « prend pas de pause ». Le burn-out, lui, est lié au contexte professionnel — une personne en burn-out peut se sentir bien en vacances, par exemple. Cela dit, le burn-out peut potentiellement mener à la dépression.

## Cinq signes que vous êtes en burn-out, et pas juste fatigué·e

La fatigue passe après une bonne nuit de sommeil ou un week-end calme. Le burn-out, non. Voici cinq signes que ce que vous vivez dépasse la fatigue ordinaire.

### 1. L'épuisement émotionnel

Ce n'est pas seulement le fait de se sentir fatigué·e à la fin d'une longue journée. L'épuisement émotionnel est une dépletion profonde et persistante que le repos ne semble pas atteindre. Vous vous réveillez déjà vidé·e. Les petites choses qui étaient autrefois gérables — une demande imprévue, un mail difficile, une conversation qui demande de l'énergie — paraissent disproportionnellement lourdes. Vous remarquerez peut-être que vous redoutez le début de la semaine d'une manière qui semble physique, pas seulement mentale.

### 2. Le cynisme et le détachement

Vous teniez à votre travail. Maintenant, vous vous retrouvez à faire les choses machinalement, à vous sentir de plus en plus distant·e de vos collègues, de vos client·es, ou du sens de ce que vous faites. Ce n'est pas de la paresse ou de l'ingratitude — c'est un mécanisme de protection. Quand le coût émotionnel de s'investir devient trop élevé, l'esprit commence à se détacher. Si vous remarquez du sarcasme là où il y avait de l'engagement, ou de l'indifférence là où il y avait du sens, ce changement mérite votre attention.

### 3. L'efficacité réduite — avoir l'impression de ne rien faire correctement

Le burn-out érode votre sens de la compétence. Des tâches autrefois automatiques deviennent pénibles, voire impossibles. Vous vous mettez à douter de vos décisions, à avoir du mal à vous concentrer, à finir une journée avec le sentiment persistant que rien n'était assez bien. Pour les personnes à haut niveau d'exigence, c'est souvent l'un des signes les plus douloureux — parce qu'il contredit l'identité que vous avez construite autour du fait d'être capable et fiable.

### 4. Des symptômes physiques sans cause évidente

Le corps garde la trace. Maux de tête persistants, sommeil perturbé, maladies à répétition, troubles digestifs, tension dans la mâchoire ou les épaules — ce sont des expressions physiques courantes du stress chronique. Si vous tombez malade plus souvent que d'habitude, ou si vous vous réveillez à 3 heures du matin l'esprit déjà en course, votre système nerveux essaie peut-être de vous dire quelque chose que votre esprit conscient continue à ignorer.

### 5. L'incapacité à décrocher

L'un des marqueurs les plus clairs du burn-out est que le repos ne semble plus réparateur. Vous êtes en vacances mais mentalement encore à votre bureau. Vous êtes avec votre famille mais pas vraiment présent·e. Vous vous asseyez pour vous détendre et vous vous sentez coupable, agité·e, incapable de ralentir. La frontière entre travail et récupération s'est effondrée — et sans récupération, l'épuisement s'aggrave.

## Si plusieurs vous parlent

Un signe isolé ne signifie pas burn-out. Mais si vous lisez ceci et vous reconnaissez dans trois, quatre, ou cinq — surtout s'ils sont présents depuis des semaines ou des mois plutôt que des jours — cela mérite d'être pris au sérieux. Le burn-out ne se résout pas en serrant les dents.

## Quels outils TCC fonctionnent pour la récupération du burn-out

La pose de limites, la restructuration cognitive autour du perfectionnisme, et l'activation comportementale sont trois approches qui font une différence concrète pendant la récupération. En clair : nous travaillons sur l'estime de soi, nous réajustons certaines croyances et valeurs, et nous abordons la peur de l'échec ou la honte.

## Si cela vous parle, on peut en parler

Vous pouvez [réserver un appel découverte gratuit de 15 minutes](/fr/contact) pour discuter de votre situation et de ce qui pourrait aider.
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Smoke**

```bash
npm run dev
```

Open `http://localhost:3000/en/blog/burnout-or-tired` — confirm five signs render as H3 sub-headings under the H2 "Five signs…" parent. Confirm closing inline booking link is sage and routes to `/en/contact`. Repeat at `/fr/blog/burnout-ou-fatigue`. Stop dev.

- [ ] **Step 5: Commit**

```bash
git add content/blog/en/burnout-or-tired.mdx content/blog/fr/burnout-ou-fatigue.mdx
git commit -m "$(cat <<'EOF'
feat(content): rewrite burnout-or-tired per Sarah May 11

Substantial expansion — new title "Burnout or just tired? Five signs
it's more than exhaustion", new burnout-vs-depression framing, full
five-signs breakdown (each as its own H3 sub-section). Inline booking
link added in closing section. FR translation tagged for Sarah's
validation.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Replace `matrescence.mdx` body with "Perinatal anxiety…" (EN + FR)

**Files:**
- Modify: `content/blog/en/matrescence.mdx`
- Modify: `content/blog/fr/matrescence.mdx`

Title and frontmatter change (title, excerpt, keyword, heroImageAlt). Slug stays `matrescence` (per spec — no redirect needed, site isn't in prod). Body fully replaced. `relatedSlugs` updated to include the new `why-your-child-triggers-you` post.

- [ ] **Step 1: Replace `content/blog/en/matrescence.mdx` with**

```mdx
---
title: "Perinatal anxiety and the emotional weight of motherhood: you are not alone"
slug: "matrescence"
locale: "en"
topic: "parents"
publishedAt: "2026-03-15"
excerpt: "Motherhood is supposed to be the happiest time of your life — and yet many women carry profound disorientation, fear and exhaustion nobody talks about. A bilingual CBT therapist on perinatal anxiety and the ambivalence of motherhood."
keyword: "perinatal anxiety therapy"
heroImage: "/images/specialties-parenting.jpg"
heroImageAlt: "Tender moment between parent and child"
relatedSlugs: ["why-your-child-triggers-you", "online-therapy-research"]
---

Motherhood is supposed to be the happiest time of your life. That's what the cards say. And for many women, there are moments of extraordinary joy — but there are also moments of profound disorientation, fear, grief, and exhaustion that nobody talks about openly. If that is where you are, this article is for you.

## When joy and anxiety arrive together

Perinatal anxiety — anxiety during pregnancy or in the postpartum period — is more common than most people realise, and far less discussed than postnatal depression. It can look like intrusive thoughts about the baby's safety, difficulty sleeping even when the baby sleeps, a constant sense of dread or hypervigilance, or a feeling that something is about to go wrong. It is not a sign that you are a bad mother. It is a sign that your nervous system is working overtime in one of the most significant transitions of your life.

## The ambivalence nobody admits

Loving your child completely and sometimes missing your old self are not contradictory. Feeling overwhelmed does not mean you regret becoming a parent. The ambivalence of early motherhood — the loss of identity, the shift in couple dynamics, the invisible mental load — is real, and it is almost never given language in public conversation. What gets named gets easier to carry.

## The emotional weight of raising children

Parenting requires a level of emotional availability that is simply not sustainable without support. The mental load — remembering, planning, anticipating, worrying — falls disproportionately on mothers, often in silence. Over time, that weight accumulates. CBT is particularly helpful here because it helps you identify the thought patterns that increase that load: the belief that asking for help means failing, that good mothers don't struggle, or that your feelings are a burden to others.

## What CBT offers for perinatal anxiety and parenting stress

CBT works well in this context because it is concrete and relatively short-term. We work on the thoughts that are feeding anxiety, build practical tools for managing overwhelm, and make space to explore what kind of mother you want to be — rather than the one you feel you're supposed to be.

## You don't have to feel this way alone

If any of this resonates, a [free 15-minute discovery call](/en/contact) is a low-pressure way to start. You don't need to have a diagnosis or a crisis — you just need to feel like things are heavier than they should be.
```

- [ ] **Step 2: Replace `content/blog/fr/matrescence.mdx` with**

```mdx
---
title: "L'anxiété périnatale et le poids émotionnel de la maternité : vous n'êtes pas seule"
slug: "matrescence"
locale: "fr"
topic: "parents"
publishedAt: "2026-03-15"
excerpt: "La maternité est censée être le moment le plus heureux de votre vie — et pourtant, de nombreuses femmes portent un profond désorientement, de la peur et un épuisement dont personne ne parle. Une thérapeute TCC bilingue sur l'anxiété périnatale et l'ambivalence de la maternité."
keyword: "anxiété périnatale thérapie"
heroImage: "/images/specialties-parenting.jpg"
heroImageAlt: "Moment de tendresse entre un parent et son enfant"
relatedSlugs: ["pourquoi-votre-enfant-vous-declenche", "therapie-en-ligne-recherche"]
---

{/* FR — Sarah to validate */}

La maternité est censée être le moment le plus heureux de votre vie. C'est ce que disent les cartes de félicitations. Et pour beaucoup de femmes, il y a des moments de joie extraordinaire — mais il y a aussi des moments de profonde désorientation, de peur, de chagrin et d'épuisement dont personne ne parle ouvertement. Si c'est là où vous êtes, cet article est pour vous.

## Quand la joie et l'anxiété arrivent ensemble

L'anxiété périnatale — l'anxiété pendant la grossesse ou dans la période post-partum — est plus courante que la plupart des gens ne le pensent, et beaucoup moins discutée que la dépression post-partum. Elle peut prendre la forme de pensées intrusives sur la sécurité du bébé, de difficultés à dormir même quand le bébé dort, d'un sentiment constant d'appréhension ou d'hypervigilance, ou de l'impression que quelque chose va mal tourner. Ce n'est pas un signe que vous êtes une mauvaise mère. C'est un signe que votre système nerveux tourne à plein régime dans l'une des transitions les plus importantes de votre vie.

## L'ambivalence que personne n'admet

Aimer votre enfant entièrement et regretter parfois la personne que vous étiez ne sont pas contradictoires. Se sentir submergée ne veut pas dire que vous regrettez d'être devenue parent. L'ambivalence du début de la maternité — la perte d'identité, le changement dans la dynamique de couple, la charge mentale invisible — est réelle, et elle n'a presque jamais de mots dans la conversation publique. Ce qui est nommé devient plus facile à porter.

## Le poids émotionnel d'élever des enfants

La parentalité exige un niveau de disponibilité émotionnelle qui n'est tout simplement pas tenable sans soutien. La charge mentale — se souvenir, planifier, anticiper, s'inquiéter — pèse de façon disproportionnée sur les mères, souvent en silence. Avec le temps, ce poids s'accumule. La TCC est particulièrement utile ici parce qu'elle vous aide à identifier les schémas de pensée qui alourdissent cette charge : la croyance que demander de l'aide signifie échouer, que les bonnes mères ne galèrent pas, ou que vos émotions sont un fardeau pour les autres.

## Ce que la TCC offre pour l'anxiété périnatale et le stress parental

La TCC fonctionne bien dans ce contexte parce qu'elle est concrète et relativement courte. Nous travaillons sur les pensées qui nourrissent l'anxiété, nous construisons des outils pratiques pour gérer la surcharge, et nous faisons de la place pour explorer le type de mère que vous voulez être — plutôt que celle que vous pensez devoir être.

## Vous n'avez pas à traverser cela seule

Si quelque chose ici résonne, un [appel découverte gratuit de 15 minutes](/fr/contact) est un moyen sans pression de commencer. Vous n'avez pas besoin d'un diagnostic ou d'une crise — il suffit que les choses vous semblent plus lourdes qu'elles ne le devraient.
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Smoke**

```bash
npm run dev
```

Open `http://localhost:3000/en/blog/matrescence` — title now reads "Perinatal anxiety…". Confirm intro paragraph renders above the first H2. Inline booking link in last section routes to `/en/contact`. Repeat at `/fr/blog/matrescence`. Stop dev.

- [ ] **Step 5: Commit**

```bash
git add content/blog/en/matrescence.mdx content/blog/fr/matrescence.mdx
git commit -m "$(cat <<'EOF'
feat(content): replace matrescence body with Perinatal anxiety per Sarah May 11

Title becomes "Perinatal anxiety and the emotional weight of
motherhood: you are not alone". Body fully replaced with Sarah's
new draft (intro paragraph + 5 H2 sections including "The ambivalence
nobody admits"). Slug kept as "matrescence" — no redirect needed,
site isn't in prod. relatedSlugs point at the new "why-your-child-
triggers-you" post + online-therapy-research. Frontmatter updated
(title, excerpt, keyword, heroImageAlt). FR translation tagged for
Sarah's validation.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Create new post "Why your child triggers you" (EN + FR)

**Files:**
- Create: `content/blog/en/why-your-child-triggers-you.mdx`
- Create: `content/blog/fr/pourquoi-votre-enfant-vous-declenche.mdx`

Brand-new post, parents topic. Date defaults to today (2026-05-18) — flagged in spec §6. Hero image reuses `/images/specialties-parenting.jpg` (placeholder, flagged).

- [ ] **Step 1: Create `content/blog/en/why-your-child-triggers-you.mdx` with**

```mdx
---
title: "Why your child triggers you: what's really happening and how CBT helps"
slug: "why-your-child-triggers-you"
locale: "en"
topic: "parents"
publishedAt: "2026-05-18"
excerpt: "There is a particular kind of shame in being triggered by your own child. This article doesn't tell you to take a deep breath — it explains what's actually happening, and how CBT helps you interrupt the pattern."
keyword: "parenting triggers therapy"
heroImage: "/images/specialties-parenting.jpg"
heroImageAlt: "Parent and child in a quiet moment"
relatedSlugs: ["matrescence", "online-therapy-research"]
---

There is a particular kind of shame that comes with being triggered by your own child. The noise, the defiance, the clinginess, the whining — and suddenly you are not the calm, present parent you intended to be. You snap. You freeze. You feel a surge of anger that frightens you a little. And then comes the guilt.

This article is not going to tell you to take a deep breath. It is going to explain what is actually happening — and what you can do about it.

## Being triggered is not the same as being a bad parent

Let's name that first, clearly. Being triggered by your child is not a character flaw. It is not evidence that you are failing. It is a neurological and psychological response — and it is almost universal among parents, even if almost nobody admits it out loud.

What makes parenting uniquely activating is that children, by nature, push on exactly the places where we are least regulated. They are relentless, unpredictable, and completely indifferent to your capacity on any given day. That is just childhood.

## What is actually happening when you get triggered

When a parent gets triggered, what is often happening is not really about the child's behaviour in that moment. The child's behaviour is the spark. The fuel is older.

Triggers frequently connect to:

- **Your own childhood experiences** — the way anger, emotion, or conflict was handled in your family of origin. If raised voices meant danger, your child's tantrum may activate something much older than frustration.
- **Unmet needs in the present** — chronic exhaustion, lack of support, the invisible mental load. When your own cup is empty, you have nothing to offer and everything feels like too much.
- **Core beliefs about yourself as a parent** — if you hold a deep belief that good parents don't lose their temper, don't feel resentment, don't need space, then any moment that contradicts that belief becomes a threat, not just an inconvenience.

In CBT this is described as a core belief, formed early and often unconsciously, that gets switched on by a present-day situation. The emotional intensity feels disproportionate because in some ways it is — you are not just responding to right now.

## The specific triggers parents rarely talk about

Beyond tantrums and defiance, there are triggering situations that parents find harder to name:

- **Clinginess and the loss of self.** Needing to be touched, needed, or spoken to constantly can produce a genuine feeling of suffocation — even toward a child you love completely. That response is not monstrous. It is a signal that your need for autonomy and space is real and legitimate.
- **Witnessing your own traits in your child.** Seeing your anxiety, your perfectionism, your anger, or your sensitivity reflected back at you can be deeply uncomfortable. You may react not to the child but to the part of yourself you haven't fully made peace with.
- **The child who seems to prefer the other parent.** Rationally, you know this is normal and shifts constantly. Emotionally, it can touch something raw about worth, love, and adequacy.
- **Feeling unmoved or detached.** Perhaps the most taboo — the moments where you feel nothing, or wish you were somewhere else entirely. Emotional detachment in parenting is often a sign of depletion, not absence of love.

## What CBT offers here

CBT doesn't ask you to stop having reactions. It asks you to understand them well enough that they stop running the show.

In practice, this means:

- **Identifying your specific triggers** — not just "I lose it when she whines" but what thought that whining activates. *I can't cope. I'm failing. Nobody helps me. I'm becoming my mother.*
- **Recognising the physical early warning signs** — the tightening in the chest, the jaw clenching, the sudden heat — before the reaction is already out.
- **Separating the present moment from the older story** — learning to notice when a current situation has hooked something older, and gently unhooking it.
- **Challenging the beliefs that increase guilt** — because the shame spiral after a triggered reaction often does more damage than the reaction itself.

## A note on the guilt that comes after

Many parents spend more energy punishing themselves for having been triggered than actually addressing what caused it. The guilt is understandable. But it is not useful, and in CBT terms it is also often driven by an unrealistic belief about what good parenting looks like.

You are allowed to be a person while you are a parent. You are allowed to have limits. You are allowed to struggle with this — and still be exactly what your child needs.

## If this resonates

Being triggered by your children is workable. It is not something you simply endure or manage with willpower. Understanding where your reactions come from, and learning to interrupt the pattern before it escalates, is precisely what therapy is for. If you would like to talk through where you are, a [free 15-minute discovery call](/en/contact) is a good place to start.
```

- [ ] **Step 2: Create `content/blog/fr/pourquoi-votre-enfant-vous-declenche.mdx` with**

```mdx
---
title: "Pourquoi votre enfant vous déclenche : ce qui se passe vraiment et comment la TCC aide"
slug: "pourquoi-votre-enfant-vous-declenche"
locale: "fr"
topic: "parents"
publishedAt: "2026-05-18"
excerpt: "Il y a une honte particulière à être déclenché·e par son propre enfant. Cet article ne vous dit pas de respirer profondément — il explique ce qui se passe vraiment, et comment la TCC vous aide à interrompre le schéma."
keyword: "parentalité déclencheurs thérapie"
heroImage: "/images/specialties-parenting.jpg"
heroImageAlt: "Un parent et son enfant dans un moment calme"
relatedSlugs: ["matrescence", "therapie-en-ligne-recherche"]
---

{/* FR — Sarah to validate */}

Il y a une honte particulière qui accompagne le fait d'être déclenché·e par son propre enfant. Le bruit, l'opposition, l'attachement collant, les pleurnicheries — et soudain, vous n'êtes plus le parent calme et présent que vous vouliez être. Vous craquez. Vous vous figez. Vous ressentez une vague de colère qui vous fait un peu peur. Et puis vient la culpabilité.

Cet article ne va pas vous dire de respirer profondément. Il va vous expliquer ce qui se passe vraiment — et ce que vous pouvez y faire.

## Être déclenché·e n'est pas la même chose qu'être un mauvais parent

Nommons cela en premier, clairement. Être déclenché·e par votre enfant n'est pas un défaut de caractère. Ce n'est pas la preuve que vous échouez. C'est une réponse neurologique et psychologique — et c'est presque universel chez les parents, même si presque personne ne l'admet à voix haute.

Ce qui rend la parentalité uniquement activante, c'est que les enfants, par nature, appuient exactement sur les endroits où nous sommes le moins régulé·es. Iels sont incessants, imprévisibles, et complètement indifférents à votre capacité du moment. C'est juste l'enfance.

## Ce qui se passe vraiment quand vous êtes déclenché·e

Quand un parent est déclenché, ce qui se passe souvent n'est pas vraiment lié au comportement de l'enfant à ce moment-là. Le comportement de l'enfant est l'étincelle. Le combustible est plus ancien.

Les déclencheurs sont fréquemment liés à :

- **Vos propres expériences d'enfance** — la façon dont la colère, l'émotion ou le conflit étaient gérés dans votre famille d'origine. Si les voix qui s'élevaient signifiaient un danger, la crise de votre enfant peut activer quelque chose de beaucoup plus ancien que la frustration.
- **Des besoins non satisfaits dans le présent** — l'épuisement chronique, le manque de soutien, la charge mentale invisible. Quand votre propre coupe est vide, vous n'avez rien à offrir et tout semble être trop.
- **Des croyances fondamentales sur vous en tant que parent** — si vous portez la conviction profonde que les bons parents ne perdent jamais leur calme, ne ressentent jamais de ressentiment, n'ont jamais besoin d'espace, alors chaque moment qui contredit cette croyance devient une menace, pas juste un inconvénient.

En TCC, on appelle cela une croyance fondamentale, formée tôt et souvent inconsciemment, qui s'allume face à une situation présente. L'intensité émotionnelle paraît disproportionnée parce qu'en un sens elle l'est — vous ne répondez pas seulement à maintenant.

## Les déclencheurs spécifiques dont les parents parlent rarement

Au-delà des crises et de l'opposition, il existe des situations déclenchantes que les parents trouvent plus difficiles à nommer :

- **L'attachement collant et la perte de soi.** Avoir besoin d'être touché·e, sollicité·e ou écouté·e en permanence peut produire un véritable sentiment d'étouffement — même envers un enfant que vous aimez profondément. Cette réponse n'est pas monstrueuse. C'est un signal que votre besoin d'autonomie et d'espace est réel et légitime.
- **Voir vos propres traits chez votre enfant.** Voir votre anxiété, votre perfectionnisme, votre colère ou votre sensibilité vous être renvoyés peut être profondément inconfortable. Vous réagissez peut-être non pas à l'enfant mais à la partie de vous-même avec laquelle vous n'avez pas encore complètement fait la paix.
- **L'enfant qui semble préférer l'autre parent.** Rationnellement, vous savez que c'est normal et que cela change tout le temps. Émotionnellement, cela peut toucher quelque chose à vif sur la valeur, l'amour, l'adéquation.
- **Se sentir indifférent·e ou détaché·e.** Peut-être le plus tabou — ces moments où vous ne ressentez rien, ou souhaitez être ailleurs. Le détachement émotionnel en parentalité est souvent un signe d'épuisement, pas d'absence d'amour.

## Ce que la TCC offre ici

La TCC ne vous demande pas d'arrêter d'avoir des réactions. Elle vous demande de les comprendre assez bien pour qu'elles ne dirigent plus la scène.

Concrètement, cela signifie :

- **Identifier vos déclencheurs spécifiques** — pas seulement « je perds le contrôle quand elle pleurniche » mais quelle pensée cette pleurnicherie active. *Je n'y arrive pas. J'échoue. Personne ne m'aide. Je deviens ma mère.*
- **Reconnaître les signaux physiques d'alerte précoce** — la pression dans la poitrine, la mâchoire qui se serre, la chaleur soudaine — avant que la réaction ne soit déjà partie.
- **Séparer le moment présent de l'histoire plus ancienne** — apprendre à remarquer quand une situation actuelle a accroché quelque chose de plus vieux, et la décrocher doucement.
- **Remettre en question les croyances qui augmentent la culpabilité** — parce que la spirale de honte qui suit une réaction de déclenchement fait souvent plus de dégâts que la réaction elle-même.

## Un mot sur la culpabilité qui vient après

Beaucoup de parents passent plus d'énergie à se punir d'avoir été déclenché·es qu'à traiter ce qui l'a causé. La culpabilité est compréhensible. Mais elle n'est pas utile, et en termes TCC, elle est souvent portée par une croyance irréaliste sur ce à quoi ressemble une bonne parentalité.

Vous avez le droit d'être une personne tout en étant un parent. Vous avez le droit d'avoir des limites. Vous avez le droit de galérer avec cela — et d'être quand même exactement ce dont votre enfant a besoin.

## Si cela résonne

Être déclenché·e par ses enfants est quelque chose qui se travaille. Ce n'est pas quelque chose que l'on endure simplement ou que l'on gère par la volonté. Comprendre d'où viennent vos réactions, et apprendre à interrompre le schéma avant qu'il ne s'aggrave, c'est précisément à cela que sert la thérapie. Si vous souhaitez parler de votre situation, un [appel découverte gratuit de 15 minutes](/fr/contact) est un bon point de départ.
```

- [ ] **Step 3: Build**

```bash
npm run build
```

Expected: clean. The new files automatically appear in static-pages generation.

- [ ] **Step 4: Smoke**

```bash
npm run dev
```

Open:
- `http://localhost:3000/en/blog` — confirm new card appears in "For Parents & New Mothers" section.
- `http://localhost:3000/en/blog/why-your-child-triggers-you` — full post renders, intro paragraph appears above first H2, bullet lists render with markdown bullets (not paragraphs of dashes), inline booking link in final section is sage and routes to `/en/contact`.
- `http://localhost:3000/fr/blog` — same card in FR parents section.
- `http://localhost:3000/fr/blog/pourquoi-votre-enfant-vous-declenche` — full FR post.
- `http://localhost:3000/en/blog/matrescence` — confirm "You might also like" section at the bottom now includes the new "Why your child triggers you" card.

Stop dev.

- [ ] **Step 5: Commit**

```bash
git add content/blog/en/why-your-child-triggers-you.mdx content/blog/fr/pourquoi-votre-enfant-vous-declenche.mdx
git commit -m "$(cat <<'EOF'
feat(content): add new post 'Why your child triggers you' per Sarah May 11

New parents-topic article on parenting triggers and CBT, EN + FR.
Hero image reuses /images/specialties-parenting.jpg (placeholder,
flagged for Sarah). Date defaulted to today (flagged). Keyword
'parenting triggers therapy' (placeholder, flagged). Cross-linked
with the Perinatal anxiety post. FR translation tagged for Sarah's
validation.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Final verification + push

**Files:** (none)

- [ ] **Step 1: Clean build**

```bash
npm run build
```

Expected: zero errors, zero new warnings.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: clean (or only pre-existing warnings — the two known ones in `LanguageToggle.tsx:30` and `TintedImage.tsx:38`).

- [ ] **Step 3: Full browser smoke pass**

```bash
npm run dev
```

For each URL below, open in browser and verify visually:

| URL | What to verify |
|---|---|
| `/en` | Testimonials section absent; no orphan whitespace. |
| `/fr` | Same as EN. |
| `/en/blog` | Parents-section intro reads "the ambivalence of motherhood"; six parent-topic cards include the new "Why your child triggers you". |
| `/fr/blog` | Same in FR. |
| `/en/blog/expat-anxiety` | Renders with new title + body. |
| `/en/blog/english-speaking-therapist-france` | New title; closing inline link routes to `/en/contact`. |
| `/en/blog/what-is-cbt` | Rewritten body, detective-tool example present. |
| `/en/blog/burnout-or-tired` | Five signs render as H3 under the H2 "Five signs…"; closing inline link routes to `/en/contact`. |
| `/en/blog/matrescence` | Title now "Perinatal anxiety…"; intro paragraph above first H2; closing inline link to `/en/contact`. |
| `/en/blog/why-your-child-triggers-you` | New post renders fully; bullet lists are markdown bullets; closing inline link to `/en/contact`. |
| `/fr/blog/*` | All FR equivalents render with French body; FR HTML comments NOT visible at render. |

Stop dev (`pkill -f "next dev"` or kill the foreground process).

- [ ] **Step 4: Confirm commit history is clean**

```bash
git log --oneline master..HEAD
```

Expected: 8 commits — one each from Tasks 2–9, in order. (Task 1 was branch creation, no commit. Task 10 has no commits unless you find a fix during smoke.)

- [ ] **Step 5: Push the branch**

```bash
git push -u origin sarah-comments-may-11
```

Expected: branch pushed; gh CLI may print the PR-create URL.

- [ ] **Step 6: Surface open items**

Before opening a PR, write a short Slack/email/message to Sarah listing the 5 open items from the spec §6 — she'll need to resolve them at her next review:

1. Hero image for "Why your child triggers you" — placeholder used.
2. Date for the new post — 2026-05-18 default.
3. `publishedAt` for `english-speaking-therapist-france` — kept at 2026-01-15.
4. Keyword for the new post — `parenting triggers therapy` placeholder.
5. FR body wording — full translations provided, awaits Sarah's pass.

(No commit — this is communication, not code.)

---

## Out of scope (do not touch)

- Animations / motion work (lives on `UI-animations` branch, separate PR).
- `content/blog/en/online-therapy-research.mdx` and FR — not in Sarah's doc.
- Real photography for the new post (placeholder is fine until Sarah supplies).
- Any UI component, middleware, env config, or Calendly integration changes.
- Pricing or fee references.
- Re-organising the blog topic taxonomy.

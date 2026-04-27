# Blog Authoring Guide

This guide explains how to write and publish a new blog post on sarah-psy.com. No coding knowledge required.

---

## How the blog works

Each post is a plain text file stored in the `content/blog/` folder. There are two sub-folders:
- `content/blog/en/` — English posts
- `content/blog/fr/` — French posts

Each file ends in `.mdx` (a slightly enhanced version of Markdown). The site reads these files automatically — there is no CMS to log into.

---

## Step 1 — Copy a template post

The easiest way to start is to copy an existing post and rename it.

1. Open `content/blog/en/` (or `fr/` for French).
2. Copy any existing `.mdx` file.
3. Rename the copy to match your new post's URL slug — for example `online-burnout-tips.mdx`. Use only lowercase letters, numbers, and hyphens; no spaces or accents.

---

## Step 2 — Fill in the frontmatter

At the very top of every post file is a block between two sets of `---`. This is called **frontmatter** — it holds the metadata the site needs to display the post correctly. Replace every value in your copy with the correct details for the new post.

```yaml
---
title: Your full post title here
slug: the-url-slug-matching-the-filename
locale: en
topic: expats
publishedAt: 2026-06-01
excerpt: A 140–180 character summary of the post. This appears in Google results and on the blog index page.
keyword: the main search phrase this post targets
heroImage: /images/blog/the-url-slug-matching-the-filename.jpg
heroImageAlt: A short description of the image for screen readers
relatedSlugs:
  - another-post-slug
  - yet-another-post-slug
---
```

### What each field means

| Field | What to put here |
|---|---|
| `title` | The full headline of the post, exactly as it should appear on the page and in Google. |
| `slug` | Must exactly match the filename (without `.mdx`). Use lowercase letters, numbers, and hyphens only. |
| `locale` | `en` for English posts, `fr` for French posts. |
| `topic` | One of three values: `expats`, `professionals`, or `parents`. Determines which section of the blog index the post appears under. |
| `publishedAt` | The publication date in `YYYY-MM-DD` format, e.g. `2026-06-01`. |
| `excerpt` | 140–180 characters. This is shown on the blog index card and used as the Google meta description. Keep it punchy and informative. |
| `keyword` | The primary search phrase you want this post to rank for, e.g. `expat therapist France`. |
| `heroImage` | Path to the post's banner image. See Step 3 below. |
| `heroImageAlt` | A brief, accurate description of the image for accessibility and SEO, e.g. `A woman sitting alone in a Paris café looking out of the window`. |
| `relatedSlugs` | A list of 1–3 slugs (in the same language) that are thematically linked. These appear at the bottom of the post as "Read more". You can leave this as an empty list (`[]`) if there are no related posts yet. |

---

## Step 3 — Add the hero image

Every post needs a banner image stored at `/public/images/blog/`.

1. Choose or download a suitable photo (Unsplash is a good free source — see `CREDITS.md` for examples).
2. Resize the image to approximately **1200 × 630 px** and save it as a `.jpg`.
3. Name the file to match the post slug, e.g. `online-burnout-tips.jpg`.
4. Place it in `public/images/blog/`.
5. Update `heroImage` in the frontmatter to `/images/blog/online-burnout-tips.jpg`.
6. If the image is from Unsplash, add a credit line to `CREDITS.md` (photographer name + Unsplash URL).

---

## Step 4 — Write the post body

Everything below the closing `---` of the frontmatter is the post body. It uses standard Markdown:

```markdown
## This is a section heading

Normal paragraph text goes here. You can use **bold** and _italic_ text.

- Bullet point one
- Bullet point two

[Link text](https://example.com)
```

The post template already has the H2 headings pre-filled. Replace the `[DRAFT — Sarah to write]` placeholders with your real content, keeping the headings in place.

---

## Step 5 — Preview locally

Before publishing, you can preview the site on your own computer:

1. Open a Terminal window and navigate to the project folder:
   ```
   cd /path/to/sarah-psy
   ```
2. Run the development server:
   ```
   npm run dev
   ```
3. Open your browser and go to `http://localhost:3000`.
4. Navigate to the blog and find your new post. Changes save automatically as you edit the file.
5. When you are done, press `Ctrl + C` in the Terminal to stop the server.

---

## Step 6 — Publish

Publishing is automatic once your changes are pushed to GitHub:

1. Save all your files.
2. Commit and push to the `main` branch (ask Matt if you need help with this step).
3. Vercel detects the push and rebuilds the site automatically — usually takes 1–2 minutes.
4. Visit sarah-psy.com and your post will be live.

---

## Tips

- **Both languages**: If you write a post in English, consider writing the French version at the same time (or vice versa). Place the French file in `content/blog/fr/` with the French slug and set `locale: fr`.
- **Draft posts**: There is no draft system in V1. If a post is not ready to be public, simply do not commit the file until it is finished.
- **Updating a post**: Edit the `.mdx` file and push. The site rebuilds and shows the updated content.
- **Deleting a post**: Remove the `.mdx` file and push. The URL will return a 404.

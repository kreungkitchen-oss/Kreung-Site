# Kreung LA website

The website for **Kreung LA** (formerly Kreung Kitchen), Cambodian street BBQ catering in Culver City, Los Angeles. Live at **www.kreungla.com**.

It's built with [Astro](https://astro.build) as a plain static site: every page is real HTML, so it loads fast and Google and AI assistants can read all of it. Netlify hosts it for free and collects the quote requests. Square handles online ordering.

- **Putting it live:** see [`docs/DEPLOY.md`](docs/DEPLOY.md), a step-by-step guide.
- **What's still needed from Sam:** see [`TODO.md`](TODO.md).
- **Rules for editing the site (facts, brand, writing style):** see [`CLAUDE.md`](CLAUDE.md).

## Changing things

Most changes are one file: **`src/data/business.ts`**. It holds every fact the site uses, and every page reads from it.

| To change… | Edit this in `src/data/business.ts` |
| --- | --- |
| Catering package prices | `packages` (the estimator uses the same numbers) |
| Minimums, delivery, fees, lead time | `policies` |
| Market days, hours, addresses | `markets` |
| Market plate prices | `marketMenu` |
| Online ordering link | `links.order` (buttons appear once it's set) |
| Ratings and review counts | `ratings` |
| Review quotes | `reviews` |
| Clients and their logos | `clientTiles` |
| Press links | `press` |
| CBS video and hero background video | `videos` (Cloudflare Stream IDs) |
| Holiday special | `holidaySpecial` (set `active: true`) |

Merge a change into `main` on GitHub and Netlify publishes it in a minute or two. If something breaks, Netlify can roll back to any earlier version in one click (**Deploys → pick a deploy → Publish deploy**).

## What's in here

| Folder / file | What it is |
| --- | --- |
| `src/pages/` | One file per page. The file name is the web address (`catering-menu.astro` → `/catering-menu`). |
| `src/pages/guides/` | The four how-to guides |
| `src/components/` | Shared pieces: header, footer, estimator, FAQ, packages, reviews, the scroll color flood, the stamp logo |
| `src/data/business.ts` | All business facts (see above) |
| `src/data/schema.ts` | Structured data for Google (JSON-LD) |
| `src/data/tones.ts` | The section color combinations (all pass color-contrast checks) |
| `src/styles/global.css` | Site-wide styles. Brand colors are at the top. |
| `src/assets/` | Photos and logos. Astro shrinks and converts them when the site builds. |
| `public/` | Files served as-is: `robots.txt`, `_redirects` (old Square links → new pages), the hero GIF and client logos (`images/clients/`) |
| `scripts/check-nojs.mjs` | Checks that every page reads fully without JavaScript |
| `netlify.toml` | Netlify build and caching settings |
| `src/pages/styleguide.astro` | Internal design reference. Not linked or indexed. Delete before launch. |

## Forms

Two Netlify Forms, no extra services:

- `catering-quote`: the quote request with the price estimator. Sends people to `/thanks`.

Both use a hidden honeypot field to block spam. Set up email notifications in Netlify (see `docs/DEPLOY.md`, Step 2).

## For developers

Needs Node 20 or newer.

```bash
npm install
npm run dev          # local preview at http://localhost:4321
npm run build        # builds the site into dist/
npm run check:nojs   # after a build: checks every page's text, prices, FAQs and JSON-LD without JavaScript
```

Ground rules (details in `CLAUDE.md`):

- Static output only. Headings, copy, prices, FAQs and contact info must be in the HTML, never added by JavaScript. JavaScript is only for extras (estimator, scroll colors, mortar animation, mobile menu, hero video start).
- WCAG 2.1 AA: one H1 per page, labels on every field, 4.5:1 contrast, keyboard access, respects reduced motion.
- Never invent facts. Anything unknown gets a `TODO(Sam)` in the code and a line in `TODO.md`.
- `/corporate-catering` must keep that exact URL.

# Open TODOs for Sam

Everything the site still needs from Sam before (or after) launch. Each item is also marked `TODO(Sam)` in the code. Pages show a yellow striped "coming soon" marker, or hide the item, until it's filled in.

## Before launch

| # | What we need | Where it shows | Where to change it |
|---|---|---|---|
| 1 | **Square online ordering link** (ordering is turned off for now) | "Order ahead" buttons on Home and Find Us, the FAQ answer, and the `/order` redirects. All hidden until the link exists. | `links.order` in `src/data/business.ts`, and the three `/order` lines in `public/_redirects` |
| 3 | **Office Lunch Club pricing and terms** | `/office-lunch-club` | `lunchClub` in `src/data/business.ts` and the page |
| 4 | **Turn on the Netlify email** for new quote requests (backup copy of every lead to kreungkitchen@gmail.com). This is a Netlify setting, not code. | Netlify dashboard | See Step 2 in `docs/DEPLOY.md` |
| 5 | **Re-verify Google Search Console** (the old meta tag lives on the Square site). Easiest: add a DNS `TXT` record. Or send Claude the meta tag code. Then submit `sitemap-index.xml` to Google and Bing. | Search Console, Bing Webmaster Tools | Step 7 in `docs/DEPLOY.md`; meta tag code goes in `siteVerification` in `src/data/business.ts` |

## New from the catering upgrade (Nov 25, 2026)

On deploy previews these show as yellow striped boxes. They are hidden on the live site until filled in.

| # | What we need | Where it shows | Where to change it |
|---|---|---|---|
| A | **Real client quotes** (3 slots: a corporate client like Live Nation, SpaceX or Adobe; a film/TV client like Sony Pictures or DreamWorks; an office manager on booking speed). Name, title, company, and OK to publish. | "What clients say" on `/catering` | `reviews` in `src/data/business.ts`, then the `placeholders` list in `src/pages/catering.astro` |
| B | **Case study details**: Live Nation (event types, guest counts, package, a quote); Sony Pictures (team or occasion, date, a quote). Photos from those jobs if you have them. | "Recent catering jobs" on `/catering` | `caseStudies` in `src/data/business.ts` |
| C | **Logo files** for Rare Beauty, Altruist, Causeway Capital Management, Karney Properties, Layla Bagels (SVG best, or a large PNG) | Client logo bar (marked [LOGO NEEDED] on previews) | `public/images/clients/` + `clientTiles` |
| D | **More press outlets** (name, title, link, logo) and the **Eater LA link** | Press section on `/catering` | `press` in `src/data/business.ts` |
| E | **Street address and ZIP** (optional; city-only is fine for a caterer) | Google schema | `streetAddress`, `postalCode` in `src/data/business.ts` |
| F | **Santa Monica farmers market**: which market, day, hours, address | `/catering/santa-monica`, llms.txt, could join the markets list | `otherMarkets` / `markets` in `src/data/business.ts` |
| G | **Gluten-free**: which dishes (if any) are gluten-free | Menu labels | `src/components/MenuHighlights.astro` |
| H | **Grill footprint** (how much room, outdoor only?) | `/on-site-grill-catering` | that page |

## When you have them

| # | What we need | Where it shows | Where to change it |
|---|---|---|---|
| 6 | **Holiday special** (offer and end date) | Holiday block on `/holiday-party-catering` | `holidaySpecial` in `src/data/business.ts` (set `active: true`) |
| 7 | **Eater LA article link** | `/press` | `press` in `src/data/business.ts` |
| 8 | **Press kit** (logo files and high-res photos to download) | `/press` | `src/pages/press.astro` |
| 9 | **FAQ answers**: deposits and payment, cancellation policy, how far "most of LA County" reaches | Left off `/faq` until confirmed | `src/pages/faq.astro` |
| 10 | **Gift cards**: off for now. Add the Square gift card link if you set them up. | Hidden | `links.giftCards` in `src/data/business.ts` |
| 11 | **More client logos** (Rare Beauty, Altruist, Causeway, Karney, Layla Bagels show as text tiles) | Client tiles | Add an SVG to `public/images/clients/` and fill in `clientTiles` in `src/data/business.ts` |
| 12 | **Higher-resolution stacked logo** (current file is 288px wide) | Stamp logo and footer | `src/assets/brand/` |

## Before go-live housekeeping

- Delete `src/pages/styleguide.astro` (internal design reference, not linked or indexed).
- Update the ratings and review counts in `src/data/business.ts` when they change (currently as of Nov 2026).

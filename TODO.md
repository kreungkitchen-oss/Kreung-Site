# Open TODOs for Sam

Everything the site still needs from Sam before (or after) launch. Each item is also marked `TODO(Sam)` in the code. Pages show a yellow striped "coming soon" marker, or hide the item, until it's filled in.

## Before launch

| # | What we need | Where it shows | Where to change it |
|---|---|---|---|
| 1 | **Square online ordering link**: your Square Online `.square.site` address (Square Dashboard → Online → Website → Domains). Ordering is turned off for now. | "Order ahead" buttons on Home and Find Us, the FAQ answer, and the `/order` redirects. All hidden until the link exists. | `links.order` in `src/data/business.ts`, and the three `/order` lines in `public/_redirects` |
| 2 | **Grill space and power needs** for on-site events | `/catering/on-site-grill` | `src/pages/catering/on-site-grill.astro` |
| 3 | **Office Lunch Club pricing and terms** | `/catering/office-lunch-club` | `lunchClub` in `src/data/business.ts` and the page |
| 4 | **Turn on the Netlify email** for new quote requests (backup copy of every lead to kreungkitchen@gmail.com). This is a Netlify setting, not code. | Netlify dashboard | See Step 2 in `docs/DEPLOY.md` |
| 5 | **Re-verify Google Search Console** (the old meta tag lives on the Square site). Easiest: add a DNS `TXT` record. Or send Claude the meta tag code. Then submit `sitemap-index.xml` to Google and Bing. | Search Console, Bing Webmaster Tools | Step 7 in `docs/DEPLOY.md`; meta tag code goes in `siteVerification` in `src/data/business.ts` |
| 5a | **Catering portion numbers** per guest: ounces of chicken, short rib, corn salad, pickled vegetables, rice and sauces; number of beef and tofu skewers. Also how amounts change when a group picks 1, 2 or 4 proteins. | `/guides/how-much-food-for-50-people` (hidden from Google, the sitemap and menus until every number is in) | `portions` in `src/data/business.ts` |

## When you have them

| # | What we need | Where it shows | Where to change it |
|---|---|---|---|
| 6 | **Holiday special** (offer and end date) | Holiday block on `/catering/holiday-party` | `holidaySpecial` in `src/data/business.ts` (set `active: true`) |
| 7 | **Eater LA article link** | `/press` | `press` in `src/data/business.ts` |
| 8 | **Press kit** (logo files and high-res photos to download) | `/press` | `src/pages/press.astro` |
| 9 | **FAQ answers**: deposits and payment, cancellation policy, how far "most of LA County" reaches | Left off `/faq` until confirmed | `src/pages/faq.astro` |
| 10 | **Gift cards**: off for now. Add the Square gift card link if you set them up. | Hidden | `links.giftCards` in `src/data/business.ts` |
| 11 | **More client logos** (Rare Beauty, Altruist, Causeway, Karney, Layla Bagels show as text tiles) | Client tiles | Add an SVG to `public/images/clients/` and fill in `clientTiles` in `src/data/business.ts` |
| 12 | **Higher-resolution stacked logo** (current file is 288px wide) | Stamp logo and footer | `src/assets/brand/` |
| 13 | **LinkedIn profile link** for the author box on catering pages and guides | "By Sam Oum, founder" box | `people.sam.linkedin` in `src/data/business.ts` |

## Before go-live housekeeping

- Delete `src/pages/styleguide.astro` (internal design reference, not linked or indexed).
- Update the ratings and review counts in `src/data/business.ts` when they change (currently as of Nov 2026).

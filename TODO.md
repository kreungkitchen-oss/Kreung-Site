# Open TODOs for Sam

Everything the site still needs from Sam before (or after) launch. Each item is also marked `TODO(Sam)` in the code. Pages show a yellow striped "coming soon" marker, or hide the item, until it's filled in.

## Before launch

| # | What we need | Where it shows | Where to change it |
|---|---|---|---|
| 1 | **Square online ordering link** (ordering is turned off for now) | "Order ahead" buttons on Home and Find Us, the FAQ answer, and the `/order` redirects. All hidden until the link exists. | `links.order` in `src/data/business.ts`, and the three `/order` lines in `public/_redirects` |
| 2 | **Grill space and power needs** for on-site events | `/on-site-grill-catering` | `src/pages/on-site-grill-catering.astro` |
| 3 | **Office Lunch Club pricing and terms** | `/office-lunch-club` | `lunchClub` in `src/data/business.ts` and the page |

## When you have them

| # | What we need | Where it shows | Where to change it |
|---|---|---|---|
| 4 | **Holiday special** (offer and end date) | Holiday block on `/holiday-party-catering` | `holidaySpecial` in `src/data/business.ts` (set `active: true`) |
| 5 | **Eater LA article link** | `/press` | `press` in `src/data/business.ts` |
| 6 | **Press kit** (logo files and high-res photos to download) | `/press` | `src/pages/press.astro` |
| 7 | **FAQ answers**: deposits and payment, cancellation policy, how far "most of LA County" reaches | Left off `/faq` until confirmed | `src/pages/faq.astro` |
| 8 | **Gift cards**: off for now. Add the Square gift card link if you set them up. | Hidden | `links.giftCards` in `src/data/business.ts` |
| 9 | **More client logos** (Rare Beauty, Altruist, Causeway, Karney, Layla Bagels show as text tiles) | Client tiles | Add an SVG to `public/images/clients/` and fill in `clientTiles` in `src/data/business.ts` |
| 10 | **Higher-resolution stacked logo** (current file is 288px wide) | Stamp logo and footer | `src/assets/brand/` |

## Before go-live housekeeping

- Delete `src/pages/styleguide.astro` (internal design reference, not linked or indexed).
- Update the ratings and review counts in `src/data/business.ts` when they change (currently as of Nov 2026).

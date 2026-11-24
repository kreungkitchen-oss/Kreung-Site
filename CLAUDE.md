# Kreung LA website — project brief

## What this is
The marketing website for Kreung LA (kreungla.com), a Cambodian street BBQ caterer in Culver City, Los Angeles. The site's main job is to win catering leads (corporate, studio, events), and second, send market customers to our weekly markets and online ordering. Online ordering stays on Square; this site links to it.

## Tech rules (do not break these)
- Framework: Astro, static output only (`output: 'static'`). Every page must ship its real text in the HTML. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not run JavaScript, so headings, body copy, prices, FAQs and contact info must never depend on client-side JS. JavaScript is allowed only for interactive extras (estimator, mortar animation, mobile menu), and the page must still read completely without it.
- No iframes for content. No page builders.
- Hosting: Netlify. Forms: Netlify Forms (plain HTML form with `data-netlify="true"` and a honeypot field).
- Accessibility: WCAG 2.1 AA. Semantic HTML, one H1 per page, logical heading order, alt text on every image, visible focus states, color contrast at least 4.5:1 for body text, labels on every form field, keyboard-usable everything, respects prefers-reduced-motion.
- Performance: aim for Lighthouse 95+ on mobile. Optimized images (Astro Image, WebP/AVIF, width/height set, lazy-load below the fold), system or self-hosted fonts, minimal JS.
- SEO on every page: unique title (under 60 characters), meta description (under 155), canonical URL, Open Graph and Twitter tags, JSON-LD structured data, breadcrumbs on sub-pages, internal links to /catering and /catering-pricing.
- Writing style: plain, warm, confident; short sentences at a 5th to 7th grade reading level; speak to the reader ("you"); no hype words like "elevate", "curated", "unparalleled". Use "Kreung LA" (not "Kreung Kitchen" except as "formerly Kreung Kitchen").

## Brand
- Look: retro golden-era Khmer album cover (1960s Phnom Penh rock and roll posters), bold, warm, hand-made, fire and smoke. Not generic restaurant template.
- Colors: teal #2F95A1 (primary), yellow #F7D63B (primary), Khmer pink/magenta, orange #F4A100, red #E8454F; secondary soft mint #BCE6D1, sky blue #DFFBFF, coconut cream beige. Check contrast; put dark text on yellow and cream.
- Logo: stacked yellow "KREUNG" with a teal shadow over pink "LA". Use files in /images.
- Khmer accents: ក្រឿង (kreung), ម៉ាក់ (Mak). Ingredient labels with Khmer: Lemongrass ស្លឹកគ្រៃ, Galangal រំដេង, Turmeric រមៀត, Makrut lime leaves ស្លឹកក្រូចសើច, Garlic ខ្ទឹមស, Shallots ខ្ទឹមក្រហម. Set lang="km" on Khmer text.
- Taglines: "Cambodian Street BBQ" · "Rooted in culture. Built for community." · Footer: "Made for Mak."

## Business facts (single source of truth — never invent facts beyond these)
- Name: Kreung LA (formerly Kreung Kitchen). Founded January 1, 2024. Owners: Sam Oum and Christina. Based in Culver City, Los Angeles, CA.
- Contact: kreungkitchen@gmail.com · Phone/text (562) 726-5072 (floating "Text us" button, approved by Sam) · Instagram @kreung_la · Yelp: yelp.com/biz/kreung-kitchen-culver-city
- What we are: Cambodian street BBQ. Fire-grilled meats marinated in kreung, the Cambodian herb paste of lemongrass, galangal, turmeric, makrut lime leaves, garlic and shallots. Served with rice, coconut corn, pickled vegetables and house sauces.
- Weekly markets:
  - Thursday: Westwood Village Farmers Market, 1036 Broxton Ave, Los Angeles, 12–5 PM
  - Saturday: Playa Vista Farmers Market, 12775 Millennium Dr, Playa Vista, 9 AM–2 PM
  - Sunday: Smorgasburg LA at ROW DTLA, 777 S Alameda St, Los Angeles, 10 AM–4 PM
  - Note: schedules can change; check @kreung_la. Evening pop-ups at LA Aleworks (Hawthorne) and events.
- Market menu: Chicken Plate (grilled kreung chicken thigh), Skewer Plate (two beef skewers), Sampler Plate (chicken thigh, one skewer, pork belly), Pork Belly Plate, short rib by the rib ($7). Every plate comes with coconut corn and pickled veggies. [Plate prices: TBD — leave a clear TODO]
- Catering packages:
  - Classic $20/person: 1 protein; rice, coconut corn, pickled veggies. For simple team lunches.
  - Signature $25/person (most popular): 2 proteins; rice, coconut corn, pickled veggies. For office lunches and team events.
  - The Full Experience $33/person: all 4 meats including short rib; coconut lime leaf rice. For weddings and celebrations.
  - Every package includes house sauces.
- Catering menu items: grilled lemongrass chicken, beef skewers, tofu skewers (vegan), short rib, coconut chive corn salad, pickled vegetables, rice options incl. coconut lime leaf rice, house sauces. Drinks (bottled water, sodas, sparkling water) available separately.
- Minimums: $1,000 for pickup and drop-off; $2,000 for our grill on-site.
- Delivery: most of LA County, delivery starts at $75, includes setup.
- Production fee: 10% on drop-off orders for 100+ guests; 20% for on-site cooking (starting at $400). One-time charge, not a gratuity. Sales tax applies.
- Guest range: 30 to 300+.
- Lead time: book at least 14 days (2 weeks) ahead.
- Response time: reply within 24 hours, aiming for same day. Estimates in 24–48 hours.
- Allergy note: some dishes contain fish sauce, oyster sauce (shellfish, gluten), tamari (soy) and sesame oil. Our food contains no dairy or peanuts.
- Clients (logos only where Sam confirms permission — use a text list until then): SpaceX, Adobe, Amazon, Live Nation (booked 4 times in 12 months), Sony Pictures, DreamWorks, Rare Beauty, Cedars-Sinai, Caltech, Altruist, Truist, Shamrock Capital, Causeway Capital Management, Karney Properties, Layla Bagels.
- Ratings: 4.9 on Google (45 reviews), 4.9 on Yelp (54 reviews) — as of Nov 2026.
- Press: Los Angeles Times, CBS News Los Angeles, Time Out Los Angeles, L.A. TACO (https://lataco.com/cambodian-food-la-pop-up), Eater LA, Follow My Gut.
- Rewards: Kreung Rewards — $5 off when you join; earn a point every visit with a $15 minimum.
- Story: Sam was born in Khao-I-Dang, a refugee camp on the Thai-Cambodian border. His family resettled in North Carolina, far from any Cambodian community. He moved to Long Beach in 2011 and to Culver City in 2017, where he met Christina and started cooking his mother's dishes himself. For years he told his mother, Mak, "I'm gonna bring Cambodian food to LA." She passed in late November 2023; her last words to him were to stop talking and start doing. On January 1, 2024, her birthday, Kreung LA got its first catering order.

## Approved review quotes (use exactly, with attribution)
- "The food was an absolute hit. People have been raving that it's some of the best food we've ever had at an event. It was so many people's first time trying Cambodian food, and you definitely have many new fans!" — Events Coordinator, event for 150 guests (repeat client)
- "Ordered catering from Kreung Kitchen for our company, and the entire Rare Beauty team absolutely loved it… Sam was fantastic to work with. He was responsive, reliable, and made sure everything was delivered on time and beautifully presented." — Pauline F., Yelp
- "I hired Kreung Kitchen for an event for my office. Sam and team served the food and cleaned up and everyone raved about the incredible food! We will be using them again!" — Jane T., Yelp
- "If you have a chance to enjoy the Cambodian beef skewers don't pass it up." — Randall Hunt, Google
- "Best Cambodian Barbecue in Los Angeles. And it's not even close." — Pasqual Allen, Google

## External links
- Online ordering (Square): [ORDER_URL — TODO, Sam to provide the Square ordering link]
- Gift cards (Square): not set up yet. Hide gift card links until Sam sets them up.
- Instagram: https://www.instagram.com/kreung_la

## Site map
Home `/` · Catering hub `/catering` · `/corporate-catering` (keep this exact URL, it's already indexed) · `/catering-pricing` · `/catering-menu` · `/cambodian-catering-los-angeles` · `/southeast-asian-catering` · `/on-site-grill-catering` · `/production-catering` · `/aapi-heritage-month-catering` · `/holiday-party-catering` · `/office-lunch-club` · `/about` · `/find-us` · `/faq` · `/press` · `/guides/what-is-kreung` · `/guides/cambodian-vs-thai-food` · `/guides/office-lunch-ideas-los-angeles` · `/guides/catering-cost-los-angeles` · `/rewards` · `/404`

## Page rules
- Each page has ONE job and one primary button, repeated at top and bottom.
- Every catering page includes: specific H1 naming the search (e.g. "Cambodian BBQ Catering in Los Angeles"), who it's for, price range and minimums, proof (client list, 2–3 review quotes, press), a photo of a real spread, 5–8 FAQs with FAQPage JSON-LD, links to /catering-pricing, /catering-menu and /catering.
- Never invent clients, numbers, reviews, awards or policies. If something is missing, add a visible TODO comment and tell me.

## Repo notes
- All business facts live in `src/data/business.ts`. Pages import from there; update facts there (and in this file) only.
- Open TODOs are marked `TODO(Sam)` in code and listed in `TODO.md`.
- Photos live in `src/assets/photos` and are optimized at build time by Astro's `<Image>`/`<Picture>`.
- `npm run build` then `npm run check:nojs` verifies every page's key text is in the built HTML.

# Kreung LA website — project brief

## What this is
The marketing website for Kreung LA (kreungla.com), a Cambodian street BBQ caterer in Culver City, Los Angeles. The site's main job is to win catering leads (corporate, studio, events), and second, send market customers to our weekly markets and online ordering. Online ordering stays on Square; this site links to it.

## Tech rules (do not break these)
- Framework: Astro, static output only (`output: 'static'`). Every page must ship its real text in the HTML. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not run JavaScript, so headings, body copy, prices, FAQs and contact info must never depend on client-side JS. JavaScript is allowed only for interactive extras (estimator, mortar animation, mobile menu), and the page must still read completely without it.
- No iframes for content. No page builders. Exception (approved by Sam): Cloudflare Stream video players. The CBS segment loads its iframe only after a click (poster + play button first), and the hero background video is added by JS after load and skipped for reduced motion. Captions and text around them stay in the HTML.
- Hosting: Netlify. Forms: Netlify Forms (plain HTML form with `data-netlify="true"` and a honeypot field). The catering estimator also posts each quote request to Sam's existing Google Form ("Kreung LA Catering Inquiry", same form and field IDs as the old site; mapping in `src/data/googleForm.ts`) with fetch no-cors; Netlify Forms stays as the backup and the no-JS path.
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
- Contact: kreungkitchen@gmail.com · Phone/text (562) 726-5072 (floating "Text us" button, approved by Sam) · Instagram @kreung_la · Yelp: yelp.com/biz/kreung-la-culver-city
- What we are: Cambodian street BBQ. Fire-grilled meats marinated in kreung, the Cambodian herb paste of lemongrass, galangal, turmeric, makrut lime leaves, garlic and shallots. Served with rice, coconut corn, pickled vegetables and house sauces.
- Weekly markets:
  - Thursday: Westwood Village Farmers Market, 1036 Broxton Ave, Los Angeles, 12–5 PM
  - Saturday: Playa Vista Farmers Market, 12775 Millennium Dr, Playa Vista, 9 AM–2 PM
  - Sunday: Smorgasburg LA at ROW DTLA, 777 S Alameda St, Los Angeles, 10 AM–4 PM
  - Also a Santa Monica farmers market (Sam, Nov 25 2026; which market/day/hours still TODO).
  - Note: schedules can change; check @kreung_la. Evening pop-ups at LA Aleworks (Hawthorne) and events.
- Market menu (from Sam's menu board, Nov 2026): The Sampler $25 (chicken, pork belly, beef skewer; our three most popular meats), Lemongrass Chicken Plate $16.50 (best seller), Lemongrass Beef Skewer Plate $19 (two beef skewers), Pork Belly Plate $16.50 (slow roasted, finished on the grill). Every plate includes white rice, coconut corn and pickled veggies. Add a short rib to any plate $7; upgrade to coco-lime leaf rice $2. Small bites: pork belly $6.50, chicken thigh $6.50, beef skewer $7 (3 for $18), short rib $8 (2 for $15), pickled veggies $4.50, coconut corn $4.50, coco-lime leaf rice $4.50, white rice $3.50, extra sauce $0.75. Drinks: lemonade $7, soda $2.50, bottled water $3.50.
- Catering packages (Sam, Nov 27 2026):
  - Bowl Bar $16/person: stir-fried lemongrass chicken (cha kreung), white rice and one side, served build-your-own in trays (no individual bowls).
  - Classic $20/person: 1 protein; rice, coconut corn, pickled veggies. For simple team lunches.
  - Signature $25/person (most popular): 2 proteins; rice, coconut corn, pickled veggies. For office lunches and team events.
  - The Full Experience $35/person: all 4 meats including short rib; coconut lime leaf rice. For weddings and celebrations.
  - Every package includes house sauces.
- Catering menu items: grilled lemongrass chicken, beef skewers, tofu skewers (vegan), short rib, coconut chive corn salad, pickled vegetables, rice options incl. coconut lime leaf rice, house sauces. Drinks (bottled water, sodas, sparkling water) available separately.
- Pricing summary: packages $16–35 per person; most orders $20–25 per person; premium spread $35/person (Sam, Nov 27 2026).
- Minimums (Sam, Nov 27 2026): $500 for weekday (Mon–Fri) pickup and drop-off; $1,000 on weekends (Sat–Sun); $2,000 for our grill on-site. Reason for the weekend minimum: the crew is at farmers markets and Smorgasburg on weekends.
- Payment and cancellation (Sam, Nov 27 2026): corporate orders invoiced in full at booking. Private events: 50% deposit to hold the date, balance due 7 days before. Cancel more than 7 days out: refund everything except 30% of the order total. Within 7 days: 50% of the order total is non-refundable.
- Estimator shows the food total only (Sam, Nov 27 2026). Delivery, production fee and tax are explained in notices and the FAQ, and added in the quote.
- On-site events are self-sufficient: we bring our own generators and handwashing station (Sam, Nov 25 2026).
- Film/TV crews: drop-off, individually packaged skewer meals (Sam, Nov 25 2026).
- Delivery: most of LA County, delivery starts at $75, includes setup.
- Production fee: 10% on drop-off orders for 100+ guests; 20% for on-site cooking (starting at $400). One-time charge, not a gratuity. Sales tax applies.
- Guest range: 30 to 300+.
- Lead time: book at least 14 days (2 weeks) ahead.
- Response time: reply within 24 hours, aiming for same day. Estimates in 24–48 hours.
- Allergy note: some dishes contain fish sauce, oyster sauce (shellfish, gluten), tamari (soy) and sesame oil. Our food contains no dairy or peanuts.
- Case studies (Sam, Nov 25 2026): Live Nation, repeat client, 4 events in 12 months. Sony Pictures, beef and tofu skewer drop-off for about 50.
- Clients: SpaceX, Adobe, Live Nation (booked 4 times in 12 months), Amazon, Sony Pictures, DreamWorks, Caltech, Cedars-Sinai, Shamrock Capital, Truist, Rare Beauty, Altruist, Causeway Capital Management, Karney Properties, Layla Bagels. Sam approved showing these client names and logos (Nov 24, 2026; they are already on the current site). Logo files are in public/images/clients/; clients without a logo show as text tiles (`clientTiles` in business.ts).
- Ratings: 4.9 on Google (45 reviews), 4.9 on Yelp (60 reviews) — as of Nov 2026.
- Press:
  - CBS News Los Angeles, "Sharing Cambodian cuisine" (aired May 2026): video on our Cloudflare Stream account, ID f7f58326bcbddb0d8599ac0a488bd043 (player https://customer-ugajlzvkncemhxjh.cloudflarestream.com/f7f58326bcbddb0d8599ac0a488bd043/iframe?preload=metadata, poster .../thumbnails/thumbnail.jpg?width=1000)
  - Los Angeles Times, "The best pop-ups in LA": https://www.latimes.com/food/list/best-pop-up-chefs-restaurants-los-angeles
  - Time Out Los Angeles, "Kreung LA & Friends": https://www.timeout.com/los-angeles/things-to-do/kreung-la-friends
  - L.A. TACO, "Cambodian food in LA": https://lataco.com/cambodian-food-la-pop-up
  - Follow My Gut, "A pop-up you shouldn't miss": https://www.followmygut.com/why-kreung-kitchen-is-a-pop-up-you-shouldnt-miss-in-la/
  - Eater LA (no link yet)
- Hero background video (halftone, Cloudflare Stream): desktop ID bab5381544b22a2f7ae1a76cb9c7db48, mobile ID d528c1394beca3f29f256d42e5f91db3. Muted, autoplay, loop, no controls, grayscale/multiply; skipped for reduced motion.
- Rewards: Kreung Rewards — $5 off when you join; earn a point every visit with a $15 minimum. "How rewards work" link: https://squareup.com/loyalty/3PMJRQ6KW741N
- Family photos (from Sam, Nov 2026): Sam's baby photo, taken in the Khao-I-Dang refugee camp (chalkboard reads OUM SAMOEUN), and a photo of his mother, Mak, in a green lace top. Use with care.
- Story: Sam was born in Khao-I-Dang, a refugee camp on the Thai-Cambodian border. His family resettled in North Carolina, far from any Cambodian community. He moved to Long Beach in 2011 and to Culver City in 2017, where he met Christina and started cooking his mother's dishes himself. For years he told his mother, Mak, "I'm gonna bring Cambodian food to LA." She passed in late November 2023; her last words to him were to stop talking and start doing. On January 1, 2024, her birthday, Kreung LA got its first catering order.

## Approved review quotes (use exactly, with attribution)
- "The food was an absolute hit. People have been raving that it's some of the best food we've ever had at an event. It was so many people's first time trying Cambodian food, and you definitely have many new fans!" — Events Coordinator, event for 150 guests (repeat client)
- "Ordered catering from Kreung Kitchen for our company, and the entire Rare Beauty team absolutely loved it… Sam was fantastic to work with. He was responsive, reliable, and made sure everything was delivered on time and beautifully presented." — Pauline F., Yelp
- "I hired Kreung Kitchen for an event for my office. Sam and team served the food and cleaned up and everyone raved about the incredible food! We will be using them again!" — Jane T., Yelp
- "If you have a chance to enjoy the Cambodian beef skewers don't pass it up." — Randall Hunt, Google
- "Best Cambodian Barbecue in Los Angeles. And it's not even close." — Pasqual Allen, Google

## External links
- Online ordering (Square): [ORDER_URL — TODO] Online ordering is turned off for now; keep order buttons hidden until Sam sends the link before launch.
- Gift cards (Square): not set up yet. Hide gift card links until Sam sets them up.
- Instagram: https://www.instagram.com/kreung_la

## Site map
Home `/` · Catering hub `/catering` · `/corporate-catering` (keep this exact URL, it's already indexed) · `/catering-pricing` · `/catering-menu` · `/cambodian-catering-los-angeles` · `/southeast-asian-catering` · `/on-site-grill-catering` · `/production-catering` · city pages `/catering/culver-city`, `/catering/santa-monica`, `/catering/playa-vista`, `/catering/westwood`, `/catering/el-segundo`, `/catering/downtown-la` (copy in `src/data/cities.ts`) · `/aapi-heritage-month-catering` · `/holiday-party-catering` · `/office-lunch-club` · `/about` · `/find-us` · `/faq` · `/press` · `/guides/what-is-kreung` · `/guides/cambodian-vs-thai-food` · `/guides/office-lunch-ideas-los-angeles` · `/guides/catering-cost-los-angeles` · `/rewards` · `/404`

## Page rules
- Each page has ONE job and one primary button, repeated at top and bottom.
- Every catering page includes: specific H1 naming the search (e.g. "Cambodian BBQ Catering in Los Angeles"), who it's for, price range and minimums, proof (client list, 2–3 review quotes, press), a photo of a real spread, 5–8 FAQs with FAQPage JSON-LD, links to /catering-pricing, /catering-menu and /catering.
- Never invent clients, numbers, reviews, awards or policies. If something is missing, add a visible TODO comment and tell me.
- Placeholder slots for missing content use `<Placeholder>` ("[REAL QUOTE NEEDED]", "[LOGO NEEDED]"...). They show on deploy previews and local builds only, never on the live site (Netlify CONTEXT=production).
- Nothing is labeled gluten-free until Sam confirms which dishes are.

## Repo notes
- All business facts live in `src/data/business.ts`. Pages import from there; update facts there (and in this file) only.
- Open TODOs are marked `TODO(Sam)` in code and listed in `TODO.md`.
- Photos live in `src/assets/photos` and are optimized at build time by Astro's `<Image>`/`<Picture>`.
- `npm run build` then `npm run check:nojs` verifies every page's key text is in the built HTML.

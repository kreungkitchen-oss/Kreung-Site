# Upcoming events: moving from the Square embed to the new site

Status: plan only. Nothing in this note is built yet.

## Today

- Sam keeps every market and pop-up in one public Google Calendar.
- `netlify/functions/events.mjs` serves it as JSON at `/api/events` (next 8 weeks, Los Angeles time, cached 1 hour).
- The current Square Online site shows it with `embeds/square-events.html`, which fetches that JSON in the visitor's browser.
- The calendar logic (fetch, parse, repeat weekly markets, skip deleted dates, use moved dates) lives in one file, `src/lib/events.mjs`. The function and the future site both use it, so the two can never disagree.

## On the new site (after kreungla.com points to Netlify)

The new site must show events in the HTML itself, not with browser JavaScript. AI crawlers and many search bots don't run JavaScript (see CLAUDE.md), so the embed approach is not enough there.

1. **Get events at build time.** In an Astro component, call `getUpcomingEvents({ days: 56 })` from `src/lib/events.mjs`. It never throws. If Google is down, it returns `[]` and the page shows a friendly "Follow @kreung_la" note instead of breaking the build.
2. **Render plain HTML.** An `UpcomingEvents.astro` component outputs the same structure as the embed: `<ul>` of `<article>` cards, `<time datetime>` tags, a "Get directions" link (descriptive hidden text, opens in a new tab). Use it on `/find-us` (all events) and the homepage (next 3). Reuse the site's own fonts and color tokens instead of the embed's inline CSS.
3. **Add schema.org Event JSON-LD.** One `Event` per card, in a single `<script type="application/ld+json">` array:
   - `name` = title, `startDate` / `endDate` = the ISO times from the feed (they already carry the LA offset, e.g. `2026-12-03T12:00:00-08:00`; all-day events are plain dates)
   - `eventStatus`: `https://schema.org/EventScheduled`; `eventAttendanceMode`: `https://schema.org/OfflineEventAttendanceMode`
   - `location`: `Place` with `name` and `address` (the calendar's location text)
   - `organizer`: `{ "@type": "Organization", "name": "Kreung LA", "url": "https://www.kreungla.com" }`
   - `description` only when the calendar has one; `image`: a real market photo from `src/assets/photos`
   - Do not add `offers` or prices unless Sam gives them. Never invent details (CLAUDE.md rule).
4. **Keep it fresh.** A static page only changes when the site rebuilds, but markets repeat weekly and Sam may edit the calendar any day. Add a daily rebuild:
   - In Netlify: Site configuration → Build & deploy → Build hooks → add hook "Daily events refresh". Copy its URL.
   - Trigger it every morning with a Netlify scheduled function (`netlify/functions/daily-rebuild.mjs`, `export const config = { schedule: '0 13 * * *' }` = about 5–6 AM LA time) that POSTs to the hook URL, stored as the `BUILD_HOOK_URL` environment variable.
   - Optional: the page can also fetch `/api/events` after load to drop events that ended since the last build. The HTML stays complete without it.
5. **Keep `/api/events` running** as long as the Square site exists, and for anything else that wants the JSON. Once kreungla.com is on Netlify, the embed's `API_URL` can switch to `https://www.kreungla.com/api/events` (both work; the netlify.app address keeps working too).
6. **Check it.** Add the events heading and the "Follow @kreung_la" fallback text to `scripts/check-nojs.mjs`, and test a page with Google's Rich Results Test.

## Things to confirm with Sam before building

- Which pages get the list (suggested: `/find-us` all, homepage next 3).
- That the calendar's location text is a full street address for each market (it feeds both "Get directions" and the JSON-LD address).
- That weekly markets in `business.ts` and the calendar agree, or whether the calendar becomes the single source for market days and hours.

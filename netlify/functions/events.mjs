// GET /api/events — Kreung LA's upcoming events (next 8 weeks) as JSON.
// Data comes from the public Google Calendar (see src/lib/events.mjs).
// Used by the Square Online embed (embeds/square-events.html) and, later, the new site.
import { getUpcomingEvents, TIME_ZONE, WINDOW_DAYS } from '../../src/lib/events.mjs';

// Sites allowed to read this feed from a browser.
const ALLOWED_EXACT = new Set([
  'https://kreungla.com',
  'https://www.kreungla.com',
  'https://kreung-site.netlify.app',
  'http://localhost:4321', // local Astro dev
  'http://localhost:8888', // local netlify dev
]);
const ALLOWED_PATTERNS = [
  /^https:\/\/[a-z0-9-]+\.square\.site$/i, // Square Online sites (e.g. kreungla.square.site)
  /^https:\/\/[a-z0-9-]+--kreung-site\.netlify\.app$/i, // Netlify deploy previews
  // Square Online's editor and embed boxes are served from these Square-owned hosts.
  /^https:\/\/([a-z0-9-]+\.)*editmysite\.com$/i,
  /^https:\/\/([a-z0-9-]+\.)*squarecdn\.com$/i,
  /^https:\/\/([a-z0-9-]+\.)*squareup\.com$/i,
];

function allowedOrigin(origin) {
  if (!origin) return null;
  // Square Online can run "Embed code" inside a sandboxed frame, which sends Origin: null.
  // The feed is only our public calendar, so allowing that is safe.
  if (origin === 'null') return 'null';
  if (ALLOWED_EXACT.has(origin)) return origin;
  return ALLOWED_PATTERNS.some((re) => re.test(origin)) ? origin : null;
}

function headers(origin, { ok }) {
  const h = {
    'Content-Type': 'application/json; charset=utf-8',
    // Browsers keep it 1 hour; Netlify's CDN keeps it 1 hour, then serves the old copy
    // for up to a day while it refreshes in the background.
    'Cache-Control': ok ? 'public, max-age=3600' : 'public, max-age=300',
    'Netlify-CDN-Cache-Control': ok
      ? 'public, durable, s-maxage=3600, stale-while-revalidate=86400'
      : 'public, s-maxage=300',
    // The CORS header depends on the asking site, so cache one copy per site.
    Vary: 'Origin',
    'X-Content-Type-Options': 'nosniff',
  };
  const allow = allowedOrigin(origin);
  if (allow) {
    h['Access-Control-Allow-Origin'] = allow;
    h['Access-Control-Allow-Methods'] = 'GET, OPTIONS';
    h['Access-Control-Allow-Headers'] = 'Content-Type';
    h['Access-Control-Max-Age'] = '86400';
  }
  return h;
}

export default async (req) => {
  const origin = req.headers.get('origin');

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: headers(origin, { ok: true }) });
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...headers(origin, { ok: true }), Allow: 'GET, HEAD, OPTIONS' },
    });
  }

  const now = new Date();
  let events = [];
  let ok = true;
  try {
    events = await getUpcomingEvents({ from: now, days: WINDOW_DAYS });
  } catch (err) {
    // getUpcomingEvents already swallows feed errors; this is a last safety net.
    console.error('events function error:', err);
    ok = false;
  }
  // An empty list right after a feed failure gets a short cache so it recovers fast.
  if (events.length === 0) ok = false;

  const body = JSON.stringify({
    timeZone: TIME_ZONE,
    generatedAt: now.toISOString(),
    days: WINDOW_DAYS,
    events,
  });
  return new Response(req.method === 'HEAD' ? null : body, { status: 200, headers: headers(origin, { ok }) });
};

export const config = { path: '/api/events' };

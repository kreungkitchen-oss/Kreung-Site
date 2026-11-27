// Upcoming events from Kreung LA's public Google Calendar.
// One shared source for:
//   - the Netlify function at /api/events (netlify/functions/events.mjs), used by the Square Online embed
//   - later, the Astro site at build time (see docs/events-migration.md)
//
// Plain JavaScript (no TypeScript) so the Netlify function and Astro can both import it.
import ical from 'node-ical';

export const CALENDAR_ICS_URL =
  'https://calendar.google.com/calendar/ical/493205471f3753b4319df40db9021cac2c4a53c88957108fe491eab6a1327bb1%40group.calendar.google.com/public/basic.ics';

export const TIME_ZONE = 'America/Los_Angeles';
export const WINDOW_DAYS = 56; // 8 weeks

const DAY_MS = 24 * 60 * 60 * 1000;

/** Fetch the .ics text. Throws on network errors, timeouts and non-200 replies. */
export async function fetchCalendar(url = CALENDAR_ICS_URL, timeoutMs = 8000) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
    headers: { Accept: 'text/calendar' },
  });
  if (!res.ok) throw new Error(`Calendar fetch failed: HTTP ${res.status}`);
  const text = await res.text();
  if (!text.includes('BEGIN:VCALENDAR')) throw new Error('Calendar fetch returned something that is not iCal');
  return text;
}

/**
 * Turn .ics text into a sorted list of plain event objects between `from` and `from + days`.
 * Weekly (RRULE) events are expanded; deleted single dates (EXDATE or a cancelled
 * RECURRENCE-ID) are skipped; moved single dates (RECURRENCE-ID) use their new time.
 */
export function eventsFromIcs(icsText, { from = new Date(), days = WINDOW_DAYS } = {}) {
  const to = new Date(from.getTime() + days * DAY_MS);
  const data = ical.sync.parseICS(icsText);
  const out = [];

  for (const item of Object.values(data)) {
    if (!item || item.type !== 'VEVENT') continue;
    if (isCancelled(item)) continue;

    let instances;
    try {
      instances = ical.expandRecurringEvent(item, { from, to, expandOngoing: true });
    } catch (err) {
      console.error('Skipping event that could not be expanded:', text(item.summary), err?.message);
      continue;
    }

    for (const inst of instances) {
      if (isCancelled(inst.event)) continue;
      const start = inst.start;
      const end = inst.end && inst.end > start ? inst.end : start;
      // Keep events that have not ended yet and start before the window closes.
      if (end <= from && !(inst.isFullDay && sameLaDay(start, from))) continue;
      if (start > to) continue;
      out.push(toPlain(inst.event, start, end, inst.isFullDay));
    }
  }

  // Sort by start time, then title; drop exact duplicates (Google sometimes repeats overrides).
  out.sort((a, b) => a.sortKey - b.sortKey || a.title.localeCompare(b.title));
  const seen = new Set();
  return out
    .filter((e) => {
      const key = `${e.title}|${e.start}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(({ sortKey, ...e }) => e);
}

/** Fetch + parse in one call. Never throws: returns [] if anything goes wrong. */
export async function getUpcomingEvents(options = {}) {
  try {
    const ics = await fetchCalendar(options.url);
    return eventsFromIcs(ics, options);
  } catch (err) {
    console.error('Upcoming events unavailable:', err?.message || err);
    return [];
  }
}

// ---------- helpers ----------

function isCancelled(ev) {
  return String(text(ev?.status)).toUpperCase() === 'CANCELLED';
}

/** node-ical values can be plain strings or { val, params } objects. */
function text(value) {
  if (value == null) return '';
  if (typeof value === 'object' && 'val' in value) return String(value.val ?? '');
  return String(value);
}

/** Google Calendar descriptions can contain simple HTML. Make them plain text. */
export function cleanDescription(value) {
  let s = text(value);
  if (!s) return '';
  s = s
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h\d)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n');
  return s.trim();
}

export function mapsUrl(location) {
  if (!location) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

const partsFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

function laParts(date) {
  const p = Object.fromEntries(partsFmt.formatToParts(date).map((x) => [x.type, x.value]));
  return { y: p.year, m: p.month, d: p.day, h: p.hour === '24' ? '00' : p.hour, mi: p.minute, s: p.second };
}

function sameLaDay(a, b) {
  const x = laParts(a);
  const y = laParts(b);
  return x.y === y.y && x.m === y.m && x.d === y.d;
}

/** ISO 8601 in Los Angeles time with its offset, e.g. 2026-12-03T12:00:00-08:00 */
export function toLaIso(date) {
  const p = laParts(date);
  const wallAsUtc = Date.UTC(+p.y, +p.m - 1, +p.d, +p.h, +p.mi, +p.s);
  const offsetMin = Math.round((wallAsUtc - Math.floor(date.getTime() / 1000) * 1000) / 60000);
  const sign = offsetMin >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMin);
  const off = `${sign}${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`;
  return `${p.y}-${p.m}-${p.d}T${p.h}:${p.mi}:${p.s}${off}`;
}

/** YYYY-MM-DD for an all-day date (kept on the calendar day it was entered on). */
function dateOnly(date) {
  // node-ical gives all-day dates as local midnight in their own zone (or UTC if floating).
  const tz = date.tz && date.tz !== 'Etc/UTC' ? date.tz : 'UTC';
  return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

function toPlain(ev, start, end, allDay) {
  const location = text(ev.location).replace(/\\,/g, ',').trim();
  return {
    title: text(ev.summary).trim() || 'Kreung LA pop-up',
    start: allDay ? dateOnly(start) : toLaIso(start),
    // iCal all-day end dates are "the day after"; give the last day of the event instead.
    end: allDay ? dateOnly(end > start ? new Date(end.getTime() - DAY_MS) : start) : toLaIso(end),
    allDay: Boolean(allDay),
    location: location || null,
    description: cleanDescription(ev.description) || null,
    mapsUrl: mapsUrl(location),
    sortKey: start.getTime(),
  };
}

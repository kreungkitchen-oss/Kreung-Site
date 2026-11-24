#!/usr/bin/env node
/**
 * No-JavaScript check. Run after `npm run build`:  npm run check:nojs
 * Reads every built HTML page in dist/ as plain text (no JavaScript runs,
 * just like an AI crawler) and checks that the H1, main copy, prices and FAQs
 * are present. Also parses every JSON-LD block. Prints a Markdown table and
 * exits with code 1 if anything fails.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SKIP = new Set(['styleguide.html']);
// Small utility pages (not indexed) only need a short message.
const UTILITY = new Set(['404.html', 'thanks.html']);

// Text that must appear on specific pages (beyond the generic checks).
const MUST = {
  'index.html': ['Cambodian BBQ', '$20', 'Westwood Village Farmers Market', 'kreungkitchen@gmail.com', 'CBS News Los Angeles', 'Sharing Cambodian cuisine', 'Live Nation has booked us', 'Join and get $5 off'],
  'catering.html': ['$20', '$25', '$33', '$1,000', '$2,000'],
  'catering/corporate.html': ['$25', '$1,000', '$2,000', '$75', '14 days', 'Live Nation'],
  'catering/menu.html': ['Tofu skewers', 'Vegan', 'fish sauce', 'no dairy or peanuts'],
  'faq.html': ['$1,000', '14 days', 'Smorgasburg'],
  'catering/on-site-grill.html': ['$2,000', '20%', '$400'],
  'catering/film-production.html': ['Sony Pictures', 'DreamWorks', 'Live Nation'],
  'catering/aapi-heritage-month.html': ['May', 'Khao-I-Dang'],
  'catering/office-lunch-club.html': ['Ask about the Lunch Club'],
  'about.html': ['Khao-I-Dang', 'January 1, 2024', 'Mak'],
  'find-us.html': ['1036 Broxton Ave', '12775 Millennium Dr', '777 S Alameda St', 'The Sampler', '$25', '$16.50', '$19', '$7', 'Lemonade'],
  'press.html': ['Los Angeles Times', 'L.A. TACO', 'CBS News Los Angeles', 'Follow My Gut'],
  'rewards.html': ['$5 off', '$15 minimum', 'Join Kreung Rewards'],
  'thanks.html': ['24 hours'],
  'catering/pricing.html': ['$1,474', '$29', '11.25%', 'ZeroCater', 'Compare packages', 'Drop-off vs. on-site grill'],
  'guides/how-much-food-for-50-people.html': ['50 guests', 'Grilled lemongrass chicken', 'Rice'],
};

const TEMPLATE = ['By Sam Oum', 'Published', 'Last updated', 'Key takeaways', 'Frequently asked questions', 'Related pages'];

const files = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { if (f !== '_astro') walk(p); }
    else if (f.endsWith('.html')) files.push(p);
  }
})(DIST);

const strip = (h) => h
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&#39;|&#x27;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ').trim();

const rows = [];
let failed = 0;
for (const file of files.sort()) {
  const rel = relative(DIST, file);
  if (SKIP.has(rel)) continue;
  const html = readFileSync(file, 'utf8');
  const problems = [];

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]));
  if (h1s.length !== 1) problems.push(`${h1s.length} H1s`);
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [''])[0];
  const words = strip(main).split(' ').filter(Boolean).length;
  if (words < (UTILITY.has(rel) ? 20 : 80)) problems.push(`only ${words} words`);
  const prices = (strip(main).match(/\$\d[\d,]*/g) || []).length;
  const faqs = (main.match(/<details/g) || []).length;

  const types = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      const t = data['@type'];
      types.push(...(Array.isArray(t) ? t : [t]));
      if (t === 'FAQPage' && (!data.mainEntity?.length)) problems.push('empty FAQPage');
    } catch { problems.push('bad JSON-LD'); }
  }
  if (faqs > 0 && !types.includes('FAQPage') && !rel.startsWith('404')) problems.push('FAQs without FAQPage JSON-LD');

  const text = strip(html);
  for (const s of MUST[rel] || []) if (!text.includes(s)) problems.push(`missing "${s}"`);
  // Page template for every /catering/ page and guide (Sam's SEO checklist, Nov 2026).
  if (/^(catering|guides)\//.test(rel)) {
    for (const s of TEMPLATE) if (!text.includes(s)) problems.push(`template: missing "${s}"`);
    if (rel.startsWith('catering/') && !types.includes('Service')) problems.push('template: no Service JSON-LD');
    if (!types.includes('FAQPage')) problems.push('template: no FAQPage JSON-LD');
    if (!types.includes('BreadcrumbList')) problems.push('template: no BreadcrumbList JSON-LD');
  }

  if (problems.length) failed++;
  rows.push(`| /${rel.replace(/\.html$/, '').replace(/^index$/, '')} | ${h1s[0] ?? '—'} | ${words} | ${prices} | ${faqs} | ${[...new Set(types)].join(', ')} | ${problems.length ? '❌ ' + problems.join('; ') : '✅'} |`);
}

console.log('| Page | H1 | Words | Prices | FAQs | JSON-LD | Result |');
console.log('|---|---|---|---|---|---|---|');
console.log(rows.join('\n'));
console.log(`\n${rows.length - failed} of ${rows.length} pages pass.`);
process.exit(failed ? 1 : 0);

/**
 * Google Form connection ("Kreung LA Catering Inquiry"), the same form and
 * field IDs the current kreungla.com estimator uses (from the design export).
 * On submit, the estimator posts the answers here AND to Netlify Forms (backup).
 *
 * Choice questions in a Google Form only accept their exact option text, so the
 * estimator's answers are translated to the form's options below.
 */
export const GFORM = {
  id: '1FAIpQLSeHSil9cXpe-TvxOH_OJbCXX1cH-Sx1Xpabsf-4pwL_RiIB3A',
  name: 'entry.1280498238',
  phone: 'entry.6480798',
  company: 'entry.194476868',
  eventType: 'entry.1103371400',
  date: 'entry.86404607',
  time: 'entry.1023886092',
  loc: 'entry.78404453',
  guests: 'entry.365016961',
  budget: 'entry.2137323648',
  service: 'entry.358431795',
  diet: 'entry.1099203105',
  serve: 'entry.1343057339',
  details: 'entry.116745854',
  notes: 'entry.2095112026',
  source: 'entry.454830839',
  ack: 'entry.852977527',
} as const;

export const GFORM_URL = `https://docs.google.com/forms/d/e/${GFORM.id}/formResponse`;

/** Estimator event type → Google Form option. */
export const EVENT_TYPE: Record<string, string> = {
  'Corporate or office lunch': 'Corporate / Office Lunch',
  'Private celebration': 'Private Celebration',
  'Wedding or engagement': 'Wedding / Engagement',
  'Community event': 'Community Event',
  Other: 'Other',
};

/** Estimator service → Google Form option (same text as the current site). */
export const SERVICE_TEXT: Record<string, string> = {
  Pickup: 'Pickup — $1,000 food & beverage minimum; production fee applies for 100+ guests',
  'Drop-off': 'Drop-off — $1,000 food & beverage minimum + delivery starting at $75; production fee applies for 100+ guests',
  'On-site grill': 'On-site cooking + staffed service — $2,000 food & beverage minimum + 20% production fee ($400 minimum)',
};

/** "How did you hear about us?" → Google Form option (Sam added the AI and marketplace options, Nov 24, 2026). */
export const SOURCE: Record<string, string> = {
  Google: 'Google / Yelp',
  Yelp: 'Google / Yelp',
  Instagram: 'Instagram',
  Referral: 'Friend / Referral',
  'Saw us at a market': 'Farmers Market',
  'ChatGPT or other AI': 'ChatGPT or other AI',
  'Catering marketplace': 'Catering marketplace',
  Other: 'Other',
};

export const ACK_TEXT = 'I understand the applicable minimums and fees and would like to receive a catering estimate.';

export const guestRange = (g: number) => (g <= 50 ? '30-50' : g <= 99 ? '51-99' : g <= 199 ? '100-199' : g <= 299 ? '200-299' : '300+');
export const budgetFor = (t: number) => (t <= 2500 ? '$1,000-$2,500' : t <= 5000 ? '$2,501-$5,000' : t <= 7500 ? '$5,001-$7,500' : t <= 10000 ? '$7,501-$10,000' : '$10,001+');

/** Free-text dietary needs → the form's checkboxes (Vegan, Vegetarian, Gluten-Free, Pescatarian, Other, None). */
export const dietChoices = (text: string) => {
  const t = text.toLowerCase().trim();
  if (!t || /^(none|no|n\/a|na)\.?$/.test(t)) return ['None'];
  const out: string[] = [];
  if (/vegan/.test(t)) out.push('Vegan');
  if (/vegetarian/.test(t)) out.push('Vegetarian');
  if (/gluten/.test(t)) out.push('Gluten-Free');
  if (/pescatarian/.test(t)) out.push('Pescatarian');
  const rest = t.replace(/vegan|vegetarian|gluten[- ]?free|gluten|pescatarian|[\s\d,.;&/()]|and|people|guests?/g, '');
  if (rest.length > 0 || !out.length) out.push('Other');
  return out;
};

/** "14:30" → "2:30 PM" */
export const time12 = (v: string) => {
  const m = /^(\d{1,2}):(\d{2})/.exec(v || '');
  if (!m) return v || '';
  const h = +m[1];
  return `${((h + 11) % 12) + 1}:${m[2]} ${h < 12 ? 'AM' : 'PM'}`;
};

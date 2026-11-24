/**
 * Kreung LA — single source of truth for business facts.
 * Every page pulls from here. Mirrors the "Business facts" section of CLAUDE.md.
 * Never add facts that aren't in CLAUDE.md. Unknowns are marked TODO(Sam).
 */

export const SITE_URL = 'https://www.kreungla.com';
export const BUSINESS_ID = `${SITE_URL}/#business`;

export const business = {
  name: 'Kreung LA',
  alternateName: 'Kreung Kitchen',
  formerly: 'formerly Kreung Kitchen',
  foundingDate: '2024-01-01',
  founders: ['Sam Oum', 'Christina'],
  city: 'Culver City',
  region: 'Los Angeles, CA',
  locality: 'Culver City',
  state: 'CA',
  areaServed: 'Los Angeles County',
  email: 'kreungkitchen@gmail.com',
  // Phone from the current kreungla.com; Sam approved keeping the floating "Text us" button (2026-11-24).
  phone: { display: '(562) 726-5072', e164: '+15627265072' },
  instagram: { handle: '@kreung_la', url: 'https://www.instagram.com/kreung_la' },
  yelp: { url: 'https://www.yelp.com/biz/kreung-la-culver-city' },
  taglines: {
    main: 'Cambodian Street BBQ',
    mission: 'Rooted in culture. Built for community.',
    footer: 'Made for Mak.',
  },
  description:
    'Cambodian street BBQ from Culver City. Fire-grilled meats marinated in kreung, the Cambodian herb paste of lemongrass, galangal, turmeric, makrut lime leaves, garlic and shallots. Served with rice, coconut corn, pickled vegetables and house sauces.',
} as const;

/** External links. TODO(Sam): Square ordering and gift card links. */
/**
 * Catering portions per guest, used by the "How much food for 50 people"
 * calculator (/guides/how-much-food-for-50-people).
 * TODO(Sam): fill in perGuest for each row. Until every row has a number, the
 * calculator shows "coming soon", and the page stays out of search and the sitemap.
 * unit 'oz' totals are shown in pounds; 'count' and 'cup' totals as-is.
 */
export type Portion = { item: string; group: 'Proteins' | 'Sides' | 'Rice' | 'Sauces'; unit: 'oz' | 'count' | 'cup'; perGuest: number | null; note?: string };
export const portions: Portion[] = [
  { item: 'Grilled lemongrass chicken', group: 'Proteins', unit: 'oz', perGuest: null },
  { item: 'Beef skewers', group: 'Proteins', unit: 'count', perGuest: null },
  { item: 'Tofu skewers (vegan)', group: 'Proteins', unit: 'count', perGuest: null },
  { item: 'Short rib', group: 'Proteins', unit: 'oz', perGuest: null },
  { item: 'Coconut chive corn salad', group: 'Sides', unit: 'oz', perGuest: null },
  { item: 'Pickled vegetables', group: 'Sides', unit: 'oz', perGuest: null },
  { item: 'Rice', group: 'Rice', unit: 'oz', perGuest: null },
  { item: 'House sauces', group: 'Sauces', unit: 'oz', perGuest: null },
];
export const portionsReady = portions.every((x) => typeof x.perGuest === 'number');

/** Author info for the author box on catering pages and guides. */
export const people = {
  sam: {
    name: 'Sam Oum',
    role: 'founder',
    instagram: 'https://www.instagram.com/kreung_la',
    linkedin: '', // TODO(Sam): add your LinkedIn URL and it shows in every author box
  },
};

/**
 * Search engine verification codes (meta tag method). Leave blank if you
 * verify Google Search Console with a DNS TXT record instead (recommended).
 * Paste only the code from inside content="...", not the whole tag.
 * See docs/DEPLOY.md, Step 7.
 */
export const siteVerification = {
  google: '', // TODO(Sam): only if you choose the "HTML tag" method in Search Console
  bing: '', // optional: only if you verify Bing yourself instead of importing from Google
};

export const links = {
  order: '', // TODO(Sam): Square online ordering URL
  giftCards: '', // Not set up yet in Square (Sam, 2026-11-24). Gift card links stay hidden until this is filled in.
  instagram: business.instagram.url,
  yelp: business.yelp.url,
  rewardsJoin: 'https://squareup.com/loyalty/3PMJRQ6KW741N', // Kreung Rewards runs on Square Loyalty; "Join" buttons go here (from Sam 2026-11-24)
};

/**
 * Videos on Kreung LA's Cloudflare Stream account (IDs from Sam, 2026-11-24).
 * The CBS segment loads only when someone clicks play. The hero background
 * video loads after the page and is skipped for reduced motion.
 */
const STREAM = 'https://customer-ugajlzvkncemhxjh.cloudflarestream.com';
export const videos = {
  stream: STREAM,
  cbs: {
    id: 'f7f58326bcbddb0d8599ac0a488bd043',
    title: 'CBS News Los Angeles segment on Kreung LA',
    outlet: 'CBS News Los Angeles',
    caption: 'Sharing Cambodian cuisine',
    description: 'A CBS News Los Angeles segment on Kreung LA, the Cambodian street BBQ caterer in Culver City, sharing Cambodian cuisine.',
    player: `${STREAM}/f7f58326bcbddb0d8599ac0a488bd043/iframe?preload=metadata`,
    poster: `${STREAM}/f7f58326bcbddb0d8599ac0a488bd043/thumbnails/thumbnail.jpg?width=1000`,
    uploadDate: '2026-05', // aired May 2026 (Sam, 2026-11-24); exact day unknown
  },
  heroBg: {
    desktop: 'bab5381544b22a2f7ae1a76cb9c7db48',
    mobile: 'd528c1394beca3f29f256d42e5f91db3',
  },
} as const;

export const kreungIngredients = [
  { en: 'Lemongrass', km: 'ស្លឹកគ្រៃ' },
  { en: 'Galangal', km: 'រំដេង' },
  { en: 'Turmeric', km: 'រមៀត' },
  { en: 'Makrut lime leaves', km: 'ស្លឹកក្រូចសើច' },
  { en: 'Garlic', km: 'ខ្ទឹមស' },
  { en: 'Shallots', km: 'ខ្ទឹមក្រហម' },
] as const;

export const khmer = { kreung: 'ក្រឿង', mak: 'ម៉ាក់' } as const;

export type Market = {
  day: string;
  dayOfWeek: string;
  name: string;
  address: string;
  hours: string;
  opens: string;
  closes: string;
};

export const markets: Market[] = [
  {
    day: 'Thursday',
    dayOfWeek: 'Thursday',
    name: 'Westwood Village Farmers Market',
    address: '1036 Broxton Ave, Los Angeles',
    hours: '12–5 PM',
    opens: '12:00',
    closes: '17:00',
  },
  {
    day: 'Saturday',
    dayOfWeek: 'Saturday',
    name: 'Playa Vista Farmers Market',
    address: '12775 Millennium Dr, Playa Vista',
    hours: '9 AM–2 PM',
    opens: '09:00',
    closes: '14:00',
  },
  {
    day: 'Sunday',
    dayOfWeek: 'Sunday',
    name: 'Smorgasburg LA at ROW DTLA',
    address: '777 S Alameda St, Los Angeles',
    hours: '10 AM–4 PM',
    opens: '10:00',
    closes: '16:00',
  },
];

export const marketNote =
  'Schedules can change, so check @kreung_la on Instagram before you head out. We also do evening pop-ups at LA Aleworks in Hawthorne, plus events.';

export const mapsUrl = (m: Market) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${m.name}, ${m.address}`)}`;

/** Market menu and prices, from Sam's market menu board (sent 2026-11-24). */
export type MenuItem = { name: string; detail?: string; price: number; deal?: string; badge?: string };
export const marketMenu: MenuItem[] = [
  { name: 'The Sampler', detail: 'Chicken, pork belly and a beef skewer. Our three most popular meats on one plate.', price: 25, badge: 'New here? Start here' },
  { name: 'Lemongrass Chicken Plate', detail: 'Grilled kreung chicken thigh.', price: 16.5, badge: 'Best seller' },
  { name: 'Lemongrass Beef Skewer Plate', detail: 'Two beef skewers, marinated in kreung.', price: 19 },
  { name: 'Pork Belly Plate', detail: 'Slow roasted and finished on the grill.', price: 16.5 },
];
export const marketMenuNote = 'Every plate comes with white rice, coconut corn and pickled veggies.';
export const marketAddOns: MenuItem[] = [
  { name: 'Add a short rib to any plate', price: 7 },
  { name: 'Upgrade to coco-lime leaf rice', price: 2 },
];
export const marketSmallBites: MenuItem[] = [
  { name: 'Pork belly', price: 6.5 },
  { name: 'Chicken thigh', price: 6.5 },
  { name: 'Beef skewer', price: 7, deal: '3 for $18' },
  { name: 'Short rib', price: 8, deal: '2 for $15' },
  { name: 'Pickled veggies', price: 4.5 },
  { name: 'Coconut corn', price: 4.5 },
  { name: 'Coco-lime leaf rice', price: 4.5 },
  { name: 'White rice', price: 3.5 },
  { name: 'Extra sauce', price: 0.75 },
];
export const marketDrinks: MenuItem[] = [
  { name: 'Lemonade', price: 7 },
  { name: 'Soda', price: 2.5 },
  { name: 'Bottled water', price: 3.5 },
];
/** Formats menu prices: $25, $16.50 */
export const menuPrice = (n: number) => (Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`);

export type PackageId = 'classic' | 'signature' | 'full';
export const packages: {
  id: PackageId;
  name: string;
  price: number;
  proteins: string;
  sides: string;
  bestFor: string;
  popular?: boolean;
}[] = [
  {
    id: 'classic',
    name: 'Classic',
    price: 20,
    proteins: '1 protein',
    sides: 'Rice, coconut corn, pickled veggies',
    bestFor: 'Simple team lunches',
  },
  {
    id: 'signature',
    name: 'Signature',
    price: 25,
    proteins: '2 proteins',
    sides: 'Rice, coconut corn, pickled veggies',
    bestFor: 'Office lunches and team events',
    popular: true,
  },
  {
    id: 'full',
    name: 'The Full Experience',
    price: 33,
    proteins: 'All 4 meats, including short rib',
    sides: 'Coconut lime leaf rice',
    bestFor: 'Weddings and celebrations',
  },
];
export const packagesNote = 'Every package includes house sauces.';

export const cateringMenu = {
  proteins: [
    { name: 'Grilled lemongrass chicken', vegan: false },
    { name: 'Beef skewers', vegan: false },
    { name: 'Tofu skewers', vegan: true },
    { name: 'Short rib', vegan: false },
  ],
  sides: [
    { name: 'Coconut chive corn salad' },
    { name: 'Pickled vegetables' },
  ],
  rices: [{ name: 'Rice' }, { name: 'Coconut lime leaf rice' }],
  sauces: [{ name: 'House sauces' }],
  drinks: ['Bottled water', 'Sodas', 'Sparkling water'],
  drinksNote: 'Drinks are available separately.',
} as const;

export const policies = {
  minimumDropoff: 1000, // pickup and drop-off
  minimumOnsite: 2000, // our grill on-site
  deliveryFrom: 75,
  deliveryArea: 'most of LA County',
  deliveryIncludes: 'setup',
  productionFeeDropoffPct: 10, // drop-off orders, 100+ guests
  productionFeeDropoffThreshold: 100,
  productionFeeOnsitePct: 20,
  productionFeeOnsiteMin: 400,
  productionFeeNote: 'One-time charge, not a gratuity. Sales tax applies.',
  estimatedTaxPct: 11.25, // used only for the estimator; final tax confirmed in the quote
  guestsMin: 30,
  guestsLabel: '30 to 300+',
  leadTimeDays: 14,
  responseTime: 'We reply within 24 hours, aiming for same day.',
  estimateTime: 'Estimates in 24–48 hours.',
  allergyNote:
    'Some dishes contain fish sauce, oyster sauce (shellfish, gluten), tamari (soy) and sesame oil. Our food contains no dairy or peanuts.',
} as const;

/**
 * Clients, in display order. Sam approved showing these names and logos
 * (2026-11-24; they're on the current kreungla.com). To swap a text tile for a
 * logo, add an SVG to public/images/clients/ and fill in `logo`, `w` and `h`
 * (the SVG's width and height, or its viewBox size).
 */
export type Client = { name: string; logo?: string; w?: number; h?: number };
export const clientTiles: Client[] = [
  { name: 'SpaceX', logo: '/images/clients/client-spacex.svg', w: 400, h: 50 },
  { name: 'Adobe', logo: '/images/clients/client-adobe.svg', w: 265, h: 67 },
  { name: 'Live Nation', logo: '/images/clients/client-live-nation.svg', w: 200, h: 45 },
  { name: 'Amazon', logo: '/images/clients/client-amazon.svg', w: 603, h: 182 },
  { name: 'Sony Pictures', logo: '/images/clients/client-sony-pictures.svg', w: 644, h: 1000 },
  { name: 'DreamWorks', logo: '/images/clients/client-dreamworks.svg', w: 300, h: 39 },
  { name: 'Caltech', logo: '/images/clients/client-caltech.svg', w: 208, h: 50 },
  { name: 'Cedars-Sinai', logo: '/images/clients/client-cedars-sinai.svg', w: 99, h: 32 },
  { name: 'Shamrock Capital', logo: '/images/clients/client-shamrock-capital.svg', w: 225, h: 62 },
  { name: 'Truist', logo: '/images/clients/client-truist.svg', w: 250, h: 58 },
  { name: 'Rare Beauty', logo: '/images/clients/client-rare-beauty.svg', w: 206, h: 43 },
  { name: 'Altruist', logo: '/images/clients/client-altruist.svg', w: 85, h: 26 },
  { name: 'Causeway Capital Management', logo: '/images/clients/client-causeway-capital.svg', w: 205, h: 90 },
  { name: 'Karney Properties' },
  { name: 'Layla Bagels', logo: '/images/clients/client-layla-bagels.webp', w: 320, h: 180 },
];
export const clients = clientTiles.map((c) => c.name);
export const clientNote = 'Live Nation has booked us 4 times in 12 months.';

export const ratings = {
  google: { value: 4.9, count: 45 },
  yelp: { value: 4.9, count: 60 },
  asOf: 'Nov 2026',
} as const;

/** Press links confirmed by Sam (2026-11-24). Cards with a `logo` show in the 2x2 grid next to the CBS video. */
export const press: { name: string; title?: string; url?: string }[] = [
  { name: 'Los Angeles Times', title: 'The best pop-ups in LA', url: 'https://www.latimes.com/food/list/best-pop-up-chefs-restaurants-los-angeles' },
  { name: 'CBS News Los Angeles', title: 'Sharing Cambodian cuisine' }, // shown as the video card (see `videos.cbs`)
  { name: 'Time Out Los Angeles', title: 'Kreung LA & Friends', url: 'https://www.timeout.com/los-angeles/things-to-do/kreung-la-friends' },
  { name: 'L.A. TACO', title: 'Cambodian food in LA', url: 'https://lataco.com/cambodian-food-la-pop-up' },
  { name: 'Eater LA' }, // TODO(Sam): link to the Eater LA article
  { name: 'Follow My Gut', title: "A pop-up you shouldn't miss", url: 'https://www.followmygut.com/why-kreung-kitchen-is-a-pop-up-you-shouldnt-miss-in-la/' },
];

export const rewards = {
  name: 'Kreung Rewards',
  joinOffer: '$5 off when you join',
  earn: 'Earn a point every visit with a $15 minimum.',
} as const;

export type Review = { quote: string; author: string; source: string; short?: boolean };
export const reviews: Record<string, Review> = {
  repeatClient: {
    quote:
      "The food was an absolute hit. People have been raving that it's some of the best food we've ever had at an event. It was so many people's first time trying Cambodian food, and you definitely have many new fans!",
    author: 'Events Coordinator',
    source: 'event for 150 guests (repeat client)',
  },
  rareBeauty: {
    quote:
      'Ordered catering from Kreung Kitchen for our company, and the entire Rare Beauty team absolutely loved it… Sam was fantastic to work with. He was responsive, reliable, and made sure everything was delivered on time and beautifully presented.',
    author: 'Pauline F.',
    source: 'Yelp',
  },
  janeT: {
    quote:
      'I hired Kreung Kitchen for an event for my office. Sam and team served the food and cleaned up and everyone raved about the incredible food! We will be using them again!',
    author: 'Jane T.',
    source: 'Yelp',
  },
  randall: {
    quote: "If you have a chance to enjoy the Cambodian beef skewers don't pass it up.",
    author: 'Randall Hunt',
    source: 'Google',
    short: true,
  },
  pasqual: {
    quote: "Best Cambodian Barbecue in Los Angeles. And it's not even close.",
    author: 'Pasqual Allen',
    source: 'Google',
    short: true,
  },
};

export const story = {
  timeline: [
    { year: 'Born', place: 'Khao-I-Dang', text: 'A refugee camp on the Thai-Cambodian border.' },
    { year: 'Childhood', place: 'North Carolina', text: 'Resettled far from any Cambodian community.' },
    { year: '2011', place: 'Long Beach', text: 'Moved to the heart of Cambodian LA.' },
    { year: '2017', place: 'Culver City', text: "Met Christina and started cooking his mother's dishes." },
    { year: '2024', place: 'Kreung LA', text: 'First catering order on January 1, Mak’s birthday.' },
  ],
};

/** Approximate ZeroCater figure used on the pricing guide, with source. */
export const marketContext = {
  text: 'Typical LA office lunch catering programs run roughly $20–36 per person.',
  sourceUrl: 'https://zerocater.com/blog/office-catering-cost-los-angeles/',
  sourceName: 'ZeroCater',
};

export const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

/**
 * Seasonal holiday special shown on /catering/holiday-party.
 * TODO(Sam): confirm the offer (example idea from the plan: feeds 20 for $500 + tax).
 * Set `active: true` and fill in the fields to show it; set it back to false to hide it.
 */
export const holidaySpecial = {
  active: false,
  season: 'Holiday 2026',
  title: '',
  detail: '',
  validThrough: '', // e.g. 'December 31, 2026'
};

/** Office Lunch Club. TODO(Sam): pricing, frequency options and terms. */
export const lunchClub = {
  name: 'Office Lunch Club',
  pitch: 'A standing Cambodian BBQ lunch for your team, monthly or every other week.',
};

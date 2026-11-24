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
  yelp: { url: 'https://www.yelp.com/biz/kreung-kitchen-culver-city' },
  taglines: {
    main: 'Cambodian Street BBQ',
    mission: 'Rooted in culture. Built for community.',
    footer: 'Made for Mak.',
  },
  description:
    'Cambodian street BBQ from Culver City. Fire-grilled meats marinated in kreung, the Cambodian herb paste of lemongrass, galangal, turmeric, makrut lime leaves, garlic and shallots. Served with rice, coconut corn, pickled vegetables and house sauces.',
} as const;

/** External links. TODO(Sam): Square ordering and gift card links. */
export const links = {
  order: '', // TODO(Sam): Square online ordering URL
  giftCards: '', // Not set up yet in Square (Sam, 2026-11-24). Gift card links stay hidden until this is filled in.
  instagram: business.instagram.url,
  yelp: business.yelp.url,
};

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

/** Market menu. TODO(Sam): plate prices. */
export const marketMenu = [
  { name: 'Chicken Plate', detail: 'Grilled kreung chicken thigh', price: null },
  { name: 'Skewer Plate', detail: 'Two beef skewers', price: null },
  { name: 'Sampler Plate', detail: 'Chicken thigh, one skewer and pork belly', price: null },
  { name: 'Pork Belly Plate', detail: 'Grilled pork belly', price: null },
  { name: 'Short rib', detail: 'By the rib', price: 7 },
] as const;
export const marketMenuNote = 'Every plate comes with coconut corn and pickled veggies.';

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

export const clients = [
  'SpaceX',
  'Adobe',
  'Amazon',
  'Live Nation',
  'Sony Pictures',
  'DreamWorks',
  'Rare Beauty',
  'Cedars-Sinai',
  'Caltech',
  'Altruist',
  'Truist',
  'Shamrock Capital',
  'Causeway Capital Management',
  'Karney Properties',
  'Layla Bagels',
] as const;
export const clientNote = 'Live Nation has booked us 4 times in 12 months.';

export const ratings = {
  google: { value: 4.9, count: 45 },
  yelp: { value: 4.9, count: 54 },
  asOf: 'Nov 2026',
} as const;

/** Article URLs other than L.A. TACO come from the current kreungla.com press section. */
export const press: { name: string; title?: string; url?: string }[] = [
  { name: 'Los Angeles Times', title: 'The best pop-ups in LA', url: 'https://www.latimes.com/food/list/best-pop-up-chefs-restaurants-los-angeles' },
  { name: 'CBS News Los Angeles', title: 'Sharing Cambodian cuisine' }, // TODO(Sam): link to the CBS segment
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

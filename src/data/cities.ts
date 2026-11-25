/**
 * City landing pages: /catering/[slug]. Each city has its own copy.
 * Facts here come only from business.ts / CLAUDE.md and Sam's message
 * (2026-11-25). Don't claim we've catered a specific client in a specific city
 * unless Sam confirms it.
 */
import { policies, money } from './business';

export type City = {
  slug: string;
  name: string;
  title: string; // < 60 chars
  description: string; // < 155 chars
  h1: string;
  lede: string;
  photo: string; // file name in src/assets/photos
  photoAlt: string;
  /** Section 1: corporate catering in this city */
  corpHeading: string;
  corp: string[];
  /** Section 2: Cambodian / Southeast Asian catering in this city */
  cuisineHeading: string;
  cuisine: string[];
  goodFor: string[];
  /** Market or "taste us first" line, if we sell nearby */
  tasteFirst?: string;
  faqs: { q: string; a: string }[];
  nearby: string[]; // slugs
};

const deliveryA = (city: string) =>
  `Yes. ${city} is in our delivery area. Delivery starts at $${policies.deliveryFrom}, and we set up the food for you. We confirm the exact fee in your quote.`;
const leadA = `Please book at least ${policies.leadTimeDays} days ahead. We reply to every inquiry within 24 hours, usually the same day.`;
const minA = `${money(policies.minimumDropoff)} for drop-off and ${money(policies.minimumOnsite)} for on-site catering. Most orders run ${policies.typicalRange} per person.`;
const onsiteA = (where: string) =>
  `Yes. Our on-site setup is self-sufficient. ${policies.onsiteSetup} That makes it easy to cook at ${where}. On-site cooking has a ${policies.productionFeeOnsitePct}% production fee, starting at $${policies.productionFeeOnsiteMin}.`;

export const cities: City[] = [
  {
    slug: 'culver-city',
    name: 'Culver City',
    title: 'Corporate Catering in Culver City | Kreung LA',
    description: 'Cambodian BBQ catering from a Culver City team. Most orders $20–25 per person, $1,000 minimum, delivered and set up. Reply within 24 hours.',
    h1: 'Corporate catering in Culver City',
    lede: 'Culver City is home. We cook Cambodian street BBQ for the offices, studios and teams right here in our own neighborhood.',
    photo: 'event-office-lunch.jpg',
    photoAlt: 'Coworkers serving themselves from a Kreung LA catering spread at an office lunch',
    corpHeading: 'Your neighborhood caterer',
    corp: [
      "Kreung LA started in Culver City in 2024. When you book us for your Culver City office, your food doesn't have to cross town. It shows up hot, and we set it up so your team can just eat.",
      'Culver City has studios, media companies and tech offices packed close together. That means a lot of team lunches, screenings, launches and all-hands. We make those easy: pick a package, send one form, and we handle the rest.',
    ],
    cuisineHeading: 'Cambodian and Southeast Asian catering in Culver City',
    cuisine: [
      'Most office lunches in Culver City rotate through the same few cuisines. Cambodian BBQ gives your team something new. Our meats are marinated in kreung, a Cambodian herb paste of lemongrass, galangal, turmeric, makrut lime leaves, garlic and shallots, then grilled over fire.',
      'For many guests, it is their first time trying Cambodian food. It is bright and herby, with smoke from the grill, and every plate comes with rice, coconut corn and pickled veggies.',
    ],
    goodFor: ['Studio and production team lunches', 'Office all-hands and launches', 'Client days and screenings', 'Holiday and year-end parties'],
    faqs: [
      { q: 'Do you deliver in Culver City?', a: deliveryA('Culver City') },
      { q: 'Are you really based in Culver City?', a: 'Yes. Kreung LA was founded in Culver City in January 2024 by Sam Oum and Christina.' },
      { q: 'What is the minimum order?', a: minA },
      { q: 'How far ahead should we book?', a: leadA },
      { q: 'Can you grill on-site at our Culver City office or lot?', a: onsiteA('an office patio, parking lot or studio space') },
      { q: 'Do you cater film and TV crews?', a: 'Yes. Sony Pictures and DreamWorks have booked us. We drop off individually packed skewer meals so crews can grab and go. See our production catering page for details.' },
    ],
    nearby: ['playa-vista', 'santa-monica', 'westwood'],
  },
  {
    slug: 'santa-monica',
    name: 'Santa Monica',
    title: 'Corporate Catering in Santa Monica | Kreung LA',
    description: 'Cambodian BBQ catering for Santa Monica offices and events. $20–25 per person for most orders, $1,000 minimum. Delivered, set up, booked fast.',
    h1: 'Corporate catering in Santa Monica',
    lede: 'Fire-grilled Cambodian BBQ for Santa Monica startups, agencies and studios. Just a few miles from our Culver City home base.',
    photo: 'event-night-dinner.jpg',
    photoAlt: 'Guests at long tables under string lights at an evening dinner catered by Kreung LA',
    corpHeading: 'Lunch that beats another poke bowl',
    corp: [
      'Santa Monica teams eat well, and they notice when lunch is the same thing again. Cambodian BBQ is new to most people, and it lands. Grilled lemongrass chicken, beef skewers and vegan tofu skewers, with rice, coconut corn and pickled veggies.',
      'Booking is quick. Our prices are on this page, so you can plan your budget before you send anything. Send one form and we reply within 24 hours, usually the same day.',
    ],
    cuisineHeading: 'Southeast Asian catering in Santa Monica, without the usual tray',
    cuisine: [
      'If your team likes Thai or Vietnamese food, they will love Cambodian. It shares the lemongrass and lime, but it leans more on herbs and the grill than on heat or sugar.',
      'Our food has no dairy and no peanuts, and our tofu skewers are vegan. That makes it easy to feed a mixed group at a team lunch or an offsite.',
    ],
    goodFor: ['Startup and agency team lunches', 'Offsites and team-building days', 'Evening dinners and client events', 'Launch parties'],
    tasteFirst: 'Want to try us before you book? We also sell at a Santa Monica farmers market. Follow @kreung_la on Instagram for where and when.',
    faqs: [
      { q: 'Do you deliver to Santa Monica?', a: deliveryA('Santa Monica') },
      { q: 'What is the minimum order?', a: minA },
      { q: 'How far ahead should we book?', a: leadA },
      { q: 'Can you cook on-site for an evening event?', a: onsiteA('a patio, rooftop or courtyard event') },
      { q: 'Do you have vegan options?', a: `Yes. Our tofu skewers are vegan, and none of our food has dairy or peanuts. ${policies.allergyNote}` },
      { q: 'Where can I taste your food in Santa Monica?', a: 'We sell at a Santa Monica farmers market, plus weekly markets in Westwood, Playa Vista and Downtown LA. Check @kreung_la on Instagram for the latest schedule.' },
    ],
    nearby: ['culver-city', 'westwood', 'playa-vista'],
  },
  {
    slug: 'playa-vista',
    name: 'Playa Vista',
    title: 'Corporate Catering in Playa Vista | Kreung LA',
    description: 'Cambodian BBQ catering for Playa Vista tech teams. Most orders $20–25 per person, $1,000 minimum, delivered and set up. Book 14 days ahead.',
    h1: 'Corporate catering in Playa Vista',
    lede: "Cambodian street BBQ for Playa Vista tech and media teams. You may already know us from the Saturday farmers market.",
    photo: 'market-booth.jpg',
    photoAlt: 'The Kreung LA market booth with a Cambodian flag, serving a customer at sunset',
    corpHeading: 'Built for busy tech teams',
    corp: [
      'Playa Vista offices run on tight calendars. You need lunch that shows up on time, feeds everyone and does not take a week of emails to book. That is how we work.',
      'Our prices are right here: most orders are $20–25 per person. Send one short form and we reply within 24 hours, usually the same day. We deliver, set up and get out of your way.',
    ],
    cuisineHeading: 'Cambodian catering in Playa Vista',
    cuisine: [
      'Our meats are marinated in kreung, the Cambodian herb paste of lemongrass, galangal, turmeric, makrut lime leaves, garlic and shallots. Then they hit the grill. It is the same food we serve at the Playa Vista Farmers Market, scaled up for your whole team.',
      'Need options for every diet? Our tofu skewers are vegan, and none of our food has dairy or peanuts.',
    ],
    goodFor: ['Engineering and product team lunches', 'All-hands and demo days', 'New-hire welcomes', 'Company celebrations'],
    tasteFirst: 'Taste us first: find us at the Playa Vista Farmers Market, 12775 Millennium Dr, on Saturdays from 9 AM to 2 PM. Schedules can change, so check @kreung_la.',
    faqs: [
      { q: 'Do you deliver to Playa Vista?', a: deliveryA('Playa Vista') },
      { q: 'Can we try your food before we book?', a: 'Yes. We sell at the Playa Vista Farmers Market, 12775 Millennium Dr, on Saturdays from 9 AM to 2 PM. Schedules can change, so check @kreung_la on Instagram.' },
      { q: 'What is the minimum order?', a: minA },
      { q: 'How far ahead should we book?', a: leadA },
      { q: 'Is there a production fee for big orders?', a: `Drop-off orders for ${policies.productionFeeDropoffThreshold}+ guests have a one-time ${policies.productionFeeDropoffPct}% production fee. ${policies.productionFeeNote}` },
      { q: 'Can you grill on our campus?', a: onsiteA('an office campus or courtyard') },
    ],
    nearby: ['culver-city', 'el-segundo', 'santa-monica'],
  },
  {
    slug: 'westwood',
    name: 'Westwood',
    title: 'Corporate Catering in Westwood | Kreung LA',
    description: 'Cambodian BBQ catering in Westwood for offices, campus groups and events. Most orders $20–25 per person, $1,000 minimum. Reply in 24 hours.',
    h1: 'Corporate catering in Westwood',
    lede: 'Cambodian BBQ for Westwood offices, campus departments and events. We are at the Westwood Village Farmers Market every Thursday.',
    photo: 'event-campus-lawn.jpg',
    photoAlt: 'Guests lining up at a Kreung LA catering table on a sunny campus lawn',
    corpHeading: 'Catering for offices and campus groups',
    corp: [
      'Westwood mixes office towers, medical offices and a big university campus. We cater all of them: department lunches, staff meetings, student events and office parties.',
      'We have fed campus crowds before, including Caltech. For a big group, our drop-off is simple: hot food, set up and ready, with the price you saw on this page.',
    ],
    cuisineHeading: 'Cambodian and Southeast Asian catering in Westwood',
    cuisine: [
      'Westwood is full of people who love trying new food. Cambodian BBQ is a great place to start: fire-grilled meats marinated in kreung, with rice, coconut corn and pickled veggies.',
      "Many guests tell us it's their first time trying Cambodian food. It's bright, herby and smoky, and it works for mixed groups. Our tofu skewers are vegan, and none of our food has dairy or peanuts.",
    ],
    goodFor: ['Department and staff lunches', 'Student and alumni events', 'Medical office lunches', 'Conferences and receptions'],
    tasteFirst: 'Taste us first: find us at the Westwood Village Farmers Market, 1036 Broxton Ave, on Thursdays from 12 to 5 PM. Schedules can change, so check @kreung_la.',
    faqs: [
      { q: 'Do you deliver to Westwood?', a: deliveryA('Westwood') },
      { q: 'Where can we try your food in Westwood?', a: 'At the Westwood Village Farmers Market, 1036 Broxton Ave, on Thursdays from 12 to 5 PM. Schedules can change, so check @kreung_la on Instagram.' },
      { q: 'Can you feed a large campus event?', a: `Yes. We cater for ${policies.guestsLabel} guests. Drop-off orders for ${policies.productionFeeDropoffThreshold}+ guests have a one-time ${policies.productionFeeDropoffPct}% production fee. ${policies.productionFeeNote}` },
      { q: 'What is the minimum order?', a: minA },
      { q: 'How far ahead should we book?', a: leadA },
      { q: 'Can you cook outdoors at our event?', a: onsiteA('a lawn, plaza or courtyard') },
    ],
    nearby: ['santa-monica', 'culver-city', 'downtown-la'],
  },
  {
    slug: 'el-segundo',
    name: 'El Segundo',
    title: 'Corporate Catering in El Segundo | Kreung LA',
    description: 'Cambodian BBQ catering for El Segundo offices. Most orders $20–25 per person, $1,000 minimum, delivered and set up. Prices shown, reply in 24 hours.',
    h1: 'Corporate catering in El Segundo',
    lede: 'Cambodian BBQ for El Segundo aerospace, tech and media offices. Prices up front, booked in three steps.',
    photo: 'food-skewers-tray.jpg',
    photoAlt: 'A tray of glazed Kreung LA beef skewers',
    corpHeading: 'Feed big teams without the hassle',
    corp: [
      'El Segundo offices can be big, and so are their lunch orders. We cater for 30 to 300+ guests. Pick a package, send one form, and we will reply within 24 hours, usually the same day.',
      'Teams at SpaceX, Amazon and Adobe have booked Kreung LA. Whether it is a weekly team lunch or a company-wide celebration, we drop off hot food and set it up so your people can eat and get back to it.',
    ],
    cuisineHeading: 'Southeast Asian catering in El Segundo',
    cuisine: [
      "Tired of the same sandwich platters? Cambodian BBQ is new for most teams. Our grilled lemongrass chicken is our best seller, and our beef skewers are a favorite. One reviewer said, \"If you have a chance to enjoy the Cambodian beef skewers don't pass it up.\"",
      'Everything comes with rice, coconut corn, pickled veggies and our house sauces. Tofu skewers are vegan, and nothing has dairy or peanuts.',
    ],
    goodFor: ['Engineering and program team lunches', 'Company-wide celebrations', 'Milestone and launch parties', 'Recurring office lunches'],
    faqs: [
      { q: 'Do you deliver to El Segundo?', a: deliveryA('El Segundo') },
      { q: 'Can you handle a large office order?', a: `Yes. We cater for ${policies.guestsLabel} guests. Drop-off orders for ${policies.productionFeeDropoffThreshold}+ guests have a one-time ${policies.productionFeeDropoffPct}% production fee. ${policies.productionFeeNote}` },
      { q: 'What is the minimum order?', a: minA },
      { q: 'How far ahead should we book?', a: leadA },
      { q: 'Can you set up a live grill at our office?', a: onsiteA('an office lot, patio or event space') },
      { q: 'Do you offer recurring office lunches?', a: 'Yes. Ask about our Office Lunch Club for a standing Cambodian BBQ lunch for your team.' },
    ],
    nearby: ['playa-vista', 'culver-city', 'downtown-la'],
  },
  {
    slug: 'downtown-la',
    name: 'Downtown LA',
    title: 'Corporate Catering in Downtown LA | Kreung LA',
    description: 'Cambodian BBQ catering for Downtown LA offices and events. Most orders $20–25 per person, $1,000 minimum, delivered and set up. Reply in 24 hours.',
    h1: 'Corporate catering in Downtown LA',
    lede: 'Cambodian street BBQ for DTLA firms, studios and event spaces. Find us at Smorgasburg LA every Sunday.',
    photo: 'event-loft-party.jpg',
    photoAlt: 'Guests serving themselves from Kreung LA catering trays in an event space with exposed beams and red pipes',
    corpHeading: 'From the office tower to the Arts District',
    corp: [
      'Downtown LA has it all: law and finance offices, creative studios, lofts and event spaces. We cater all of them, from a team lunch for 30 to a launch party for 300+.',
      'Booking takes three steps. Our per-person prices are on this page, so you know your budget before you reach out. Send one form and we reply within 24 hours, usually the same day.',
    ],
    cuisineHeading: 'Cambodian and Southeast Asian catering in DTLA',
    cuisine: [
      'You might know us from Smorgasburg LA at ROW DTLA. Our catering is the same fire-grilled food: meats marinated in kreung, the Cambodian herb paste of lemongrass, galangal, turmeric, makrut lime leaves, garlic and shallots.',
      'Every order comes with rice, coconut corn, pickled veggies and house sauces. Tofu skewers are vegan, and none of our food has dairy or peanuts.',
    ],
    goodFor: ['Firm and office lunches', 'Event-space and loft parties', 'Creative studio and shoot days', 'Client receptions'],
    tasteFirst: 'Taste us first: find us at Smorgasburg LA at ROW DTLA, 777 S Alameda St, on Sundays from 10 AM to 4 PM. Schedules can change, so check @kreung_la.',
    faqs: [
      { q: 'Do you deliver to Downtown LA?', a: deliveryA('Downtown LA') },
      { q: 'Where can we try your food downtown?', a: 'At Smorgasburg LA at ROW DTLA, 777 S Alameda St, on Sundays from 10 AM to 4 PM. Schedules can change, so check @kreung_la on Instagram.' },
      { q: 'What is the minimum order?', a: minA },
      { q: 'How far ahead should we book?', a: leadA },
      { q: 'Can you cook on-site at an event space?', a: onsiteA('a loft, rooftop or event space') },
      { q: 'How do drinks work?', a: 'Drinks are sold separately. You can add bottled water, sodas and sparkling water to any order.' },
    ],
    nearby: ['culver-city', 'westwood', 'el-segundo'],
  },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);

/**
 * Page registry: the name and one-line summary of every page that can show up
 * in a "Related pages" list, plus the main search each page targets.
 * The full search map (main + secondary searches) is in CLAUDE.md.
 */
export type PageInfo = { name: string; blurb: string; mainSearch: string };

export const pageInfo: Record<string, PageInfo> = {
  '/about': { name: 'Our story', blurb: 'Sam, Christina and Mak, and why we cook.', mainSearch: 'kreung la story' },
  '/catering': { name: 'All catering', blurb: 'Every way we cater in LA, in one place.', mainSearch: 'catering los angeles' },
  '/catering/corporate': { name: 'Corporate catering', blurb: 'Office lunches, all-hands and client days.', mainSearch: 'corporate catering los angeles' },
  '/catering/cambodian': { name: 'Cambodian catering', blurb: 'Khmer food for your event, made by a Cambodian family.', mainSearch: 'cambodian catering los angeles' },
  '/catering/southeast-asian': { name: 'Southeast Asian BBQ catering', blurb: 'Bold, herby grilled food for a crowd.', mainSearch: 'southeast asian catering los angeles' },
  '/catering/on-site-grill': { name: 'On-site grill catering', blurb: 'We bring the grill and cook at your event.', mainSearch: 'bbq grill catering los angeles' },
  '/catering/film-production': { name: 'Film and production catering', blurb: 'Crew meals for film, TV and photo shoots.', mainSearch: 'film production catering los angeles' },
  '/catering/aapi-heritage-month': { name: 'AAPI Heritage Month catering', blurb: 'Celebrate with Cambodian food at work.', mainSearch: 'aapi heritage month catering' },
  '/catering/holiday-party': { name: 'Holiday party catering', blurb: 'Year-end parties your team will talk about.', mainSearch: 'holiday party catering los angeles' },
  '/catering/office-lunch-club': { name: 'Office Lunch Club', blurb: 'Recurring team lunches on a set schedule.', mainSearch: 'recurring office lunch catering los angeles' },
  '/catering/pricing': { name: 'Catering prices', blurb: 'Packages, minimums, fees and a worked example.', mainSearch: 'kreung la catering prices' },
  '/catering/menu': { name: 'Catering menu', blurb: 'Proteins, sides, rice, sauces and allergy info.', mainSearch: 'cambodian bbq catering menu' },
  '/guides': { name: 'Guides', blurb: 'Plain answers for planning food in LA.', mainSearch: 'kreung la guides' },
  '/guides/what-is-kreung': { name: 'What is kreung?', blurb: 'The Cambodian herb paste behind our BBQ.', mainSearch: 'what is kreung' },
  '/guides/cambodian-vs-thai-food': { name: 'Cambodian vs. Thai food', blurb: 'Where the two cuisines overlap and differ.', mainSearch: 'cambodian vs thai food' },
  '/guides/office-lunch-ideas-los-angeles': { name: 'Office lunch ideas in LA', blurb: 'A planner\'s guide for office managers.', mainSearch: 'office lunch ideas los angeles' },
  '/guides/catering-cost-los-angeles': { name: 'How much catering costs in LA', blurb: 'Typical prices and what drives them.', mainSearch: 'how much does catering cost los angeles' },
  '/guides/how-much-food-for-50-people': { name: 'How much food for 50 people', blurb: 'A calculator for how much food to order.', mainSearch: 'how much food for 50 people' },
};

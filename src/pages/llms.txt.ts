/**
 * /llms.txt — plain-text summary for AI assistants (llms.txt convention).
 * Built from src/data/business.ts so it never drifts from the site.
 */
import type { APIRoute } from 'astro';
import { business, packages, packagesNote, policies, markets, marketNote, otherMarkets, cateringMenu, clients, clientNote, caseStudies, ratings, rewards, money, SITE_URL, minimumsText } from '../data/business';
import { cities } from '../data/cities';

const u = (p: string) => `${SITE_URL}${p}`;

export const GET: APIRoute = () => {
  const body = `# ${business.name}

> ${business.name} (${business.formerly}) is a Cambodian street BBQ caterer in ${business.city}, Los Angeles, CA. We cook fire-grilled meats marinated in kreung, the Cambodian herb paste of lemongrass, galangal, turmeric, makrut lime leaves, garlic and shallots, served with rice, coconut corn, pickled vegetables and house sauces. We specialize in corporate catering for LA teams (offices, studios, film and TV crews and events) for ${policies.guestsLabel} guests, and we publish our prices up front. We also sell plates at weekly LA farmers markets and Smorgasburg LA.

Founded January 1, 2024 by Sam Oum and Christina. Contact: ${business.email}, text ${business.phone.display}, Instagram ${business.instagram.handle}. Ratings: ${ratings.google.value} on Google (${ratings.google.count} reviews) and ${ratings.yelp.value} on Yelp (${ratings.yelp.count} reviews), as of ${ratings.asOf}.

## Catering at a glance

- Price: most orders are ${policies.typicalRange} per person. Premium spread (all four meats including short rib, plus coconut lime leaf rice): $${policies.premiumTop} per person.
- Minimum order: ${minimumsText}.
- Book at least ${policies.leadTimeDays} days ahead. We reply within 24 hours, usually the same day.
- Delivery: ${policies.deliveryArea}, from $${policies.deliveryFrom}. We deliver and set up.
- On-site events are self-sufficient: ${policies.onsiteSetup.replace(/^We/, 'we')}
- Cuisine: Cambodian (Khmer) and Southeast Asian BBQ. Vegan tofu skewers. No dairy or peanuts in our food.

## How to book

1. Pick a package (see below or ${u('/catering-pricing')}).
2. Send the inquiry form at ${u('/catering#estimate')}. It shows a ballpark price right away. Or email ${business.email} or text ${business.phone.display}.
3. We reply within 24 hours with a quote, then deliver and set up on the day.

## Catering packages (per person)

${packages.map((p) => `- ${p.name}: $${p.price} per person. ${p.proteins}; ${p.sides}. Best for ${p.bestFor.toLowerCase()}.${p.popular ? ' Most popular.' : ''}`).join('\n')}
- ${packagesNote}

## Catering policies

- Minimums: ${minimumsText}.
- Delivery: ${policies.deliveryArea}. Delivery starts at $${policies.deliveryFrom} and includes ${policies.deliveryIncludes}.
- Production fee: ${policies.productionFeeDropoffPct}% on drop-off orders for ${policies.productionFeeDropoffThreshold}+ guests; ${policies.productionFeeOnsitePct}% for on-site cooking (starting at $${policies.productionFeeOnsiteMin}). ${policies.productionFeeNote}
- Guests: ${policies.guestsLabel}.
- Lead time: book at least ${policies.leadTimeDays} days (2 weeks) ahead.
- Response time: ${policies.responseTime} ${policies.estimateTime}
- Example: 50 guests, Signature package, drop-off is about $29 per guest including delivery and estimated tax.

## Catering menu

- Proteins: ${cateringMenu.proteins.map((p) => p.name + (p.vegan ? ' (vegan)' : '')).join(', ')}.
- Sides: ${cateringMenu.sides.map((s) => s.name).join(', ')}.
- Rice: ${cateringMenu.rices.map((r) => r.name).join(', ')}.
- Sauces: house sauces. Drinks (${cateringMenu.drinks.join(', ').toLowerCase()}) are sold separately.
- Film and TV crews: individually packed skewer meals, dropped off.
- Allergens: ${policies.allergyNote}

## Weekly markets

${markets.map((m) => `- ${m.day}: ${m.name}, ${m.address}, ${m.hours}`).join('\n')}
- We also sell at ${otherMarkets.join(', ')}.
- ${marketNote}

## Clients

${clients.join(', ')}.

${clientNote}

${caseStudies.map((c) => `- ${c.client}: ${c.text}`).join('\n')}

## Rewards

${rewards.name}: ${rewards.joinOffer}. ${rewards.earn}

## Key pages

- [Catering](${u('/catering')}): all catering options
- [Corporate catering](${u('/corporate-catering')}): office and team catering with a price estimator
- [Catering pricing](${u('/catering-pricing')}): how pricing works, with a worked example
- [Catering menu](${u('/catering-menu')}): full menu, vegan and allergy info
- [On-site grill catering](${u('/on-site-grill-catering')}): live grilling at events
- [Production catering](${u('/production-catering')}): film and TV crews, individually packed skewer meals
- [Office Lunch Club](${u('/office-lunch-club')}): recurring office catering
- [Find us](${u('/find-us')}): weekly markets and market menu
- [Our story](${u('/about')}): Sam, Christina and Mak
- [FAQ](${u('/faq')}): common questions

## Catering by area

${cities.map((c) => `- [${c.name} catering](${u('/catering/' + c.slug)})`).join('\n')}

## Guides

- [What is kreung?](${u('/guides/what-is-kreung')})
- [Cambodian vs. Thai food](${u('/guides/cambodian-vs-thai-food')})
- [Office lunch ideas in Los Angeles](${u('/guides/office-lunch-ideas-los-angeles')})
- [How much does catering cost in Los Angeles?](${u('/guides/catering-cost-los-angeles')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

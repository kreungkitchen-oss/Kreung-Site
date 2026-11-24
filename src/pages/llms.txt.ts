/**
 * /llms.txt — plain-text summary for AI assistants (llms.txt convention).
 * Built from src/data/business.ts so it never drifts from the site.
 */
import type { APIRoute } from 'astro';
import { business, packages, packagesNote, policies, markets, marketNote, cateringMenu, clients, ratings, rewards, money, SITE_URL, portionsReady } from '../data/business';
import { pageInfo } from '../data/pages';

const u = (p: string) => `${SITE_URL}${p}`;

export const GET: APIRoute = () => {
  const body = `# ${business.name}

> ${business.name} (${business.formerly}) is a Cambodian street BBQ caterer in ${business.city}, Los Angeles, CA. We cook fire-grilled meats marinated in kreung, the Cambodian herb paste of lemongrass, galangal, turmeric, makrut lime leaves, garlic and shallots, served with rice, coconut corn, pickled vegetables and house sauces. We cater events for ${policies.guestsLabel} guests and sell plates at three weekly LA farmers markets.

Founded January 1, 2024 by Sam Oum and Christina. Contact: ${business.email}, text ${business.phone.display}, Instagram ${business.instagram.handle}. Ratings: ${ratings.google.value} on Google (${ratings.google.count} reviews) and ${ratings.yelp.value} on Yelp (${ratings.yelp.count} reviews), as of ${ratings.asOf}.

## Catering packages (per person)

${packages.map((p) => `- ${p.name}: $${p.price} per person. ${p.proteins}; ${p.sides}. Best for ${p.bestFor.toLowerCase()}.${p.popular ? ' Most popular.' : ''}`).join('\n')}
- ${packagesNote}

## Catering policies

- Minimums: ${money(policies.minimumDropoff)} for pickup and drop-off; ${money(policies.minimumOnsite)} for our grill on-site.
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
- Sauces: house sauces. Drinks (${cateringMenu.drinks.join(', ').toLowerCase()}) available separately.
- Allergens: ${policies.allergyNote}

## Weekly markets

${markets.map((m) => `- ${m.day}: ${m.name}, ${m.address}, ${m.hours}`).join('\n')}
- ${marketNote}

## Clients

${clients.join(', ')}.

## Rewards

${rewards.name}: ${rewards.joinOffer}. ${rewards.earn}

## Key pages

- [Catering](${u('/catering')}): all catering options
${Object.entries(pageInfo).filter(([path]) => path.startsWith('/catering/')).map(([path, i]) => `- [${i.name}](${u(path)}): ${i.blurb}`).join('\n')}
- [Find us](${u('/find-us')}): weekly markets and market menu
- [Our story](${u('/about')}): Sam, Christina and Mak
- [FAQ](${u('/faq')}): common questions

## Guides

- [All guides](${u('/guides')})
${Object.entries(pageInfo).filter(([path]) => path.startsWith('/guides/')).filter(([path]) => portionsReady || path !== '/guides/how-much-food-for-50-people').map(([path, i]) => `- [${i.name}](${u(path)}): ${i.blurb}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

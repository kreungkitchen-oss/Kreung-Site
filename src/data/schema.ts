/** JSON-LD builders. Only use facts from business.ts. */
import { business, BUSINESS_ID, SITE_URL, ratings, videos, packages, packagesNote, policies } from './business';
import { cities } from './cities';

export const businessEntity = () => ({
  '@context': 'https://schema.org',
  '@type': ['FoodEstablishment', 'Caterer'],
  '@id': BUSINESS_ID,
  name: business.name,
  alternateName: business.alternateName,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  image: `${SITE_URL}/images/og-image.jpg`,
  slogan: business.taglines.mission,
  description: business.description,
  servesCuisine: ['Cambodian', 'Khmer', 'Southeast Asian', 'Barbecue'],
  foundingDate: business.foundingDate,
  founder: [
    { '@type': 'Person', '@id': `${SITE_URL}/about#sam-oum`, name: 'Sam Oum' },
    { '@type': 'Person', name: 'Christina' },
  ],
  email: business.email,
  telephone: business.phone.e164,
  // TODO(Sam): street address. Until then, city only (fine for a caterer with no storefront).
  address: {
    '@type': 'PostalAddress',
    ...(business.streetAddress ? { streetAddress: business.streetAddress } : {}),
    ...(business.postalCode ? { postalCode: business.postalCode } : {}),
    addressLocality: business.locality,
    addressRegion: business.state,
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: business.areaServed },
    ...cities.map((c) => ({ '@type': 'City', name: `${c.name}, CA`, url: `${SITE_URL}/catering/${c.slug}` })),
  ],
  priceRange: `$${packages[0].price}–$${packages[packages.length - 1].price} per person (catering)`,
  currenciesAccepted: 'USD',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Catering packages',
    url: `${SITE_URL}/catering-pricing`,
    itemListElement: packages.map((p) => ({
      '@type': 'Offer',
      name: `${p.name} catering package`,
      description: `${p.proteins}; ${p.sides}. ${packagesNote} Minimum order $${policies.minimumDropoff.toLocaleString('en-US')} (drop-off).`,
      priceSpecification: { '@type': 'UnitPriceSpecification', price: p.price, priceCurrency: 'USD', unitText: 'per person' },
    })),
  },
  sameAs: [business.instagram.url, business.yelp.url],
  // aggregateRating intentionally omitted: Google and Yelp ratings are separate
  // third-party platforms, and Google's guidelines don't allow self-serving
  // review markup copied from other sites. The ratings are shown as text instead.
});

export const faqPage = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const breadcrumbList = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: new URL(it.path, SITE_URL).href,
  })),
});

export const article = (o: { title: string; description: string; path: string; datePublished: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: o.title,
  description: o.description,
  mainEntityOfPage: new URL(o.path, SITE_URL).href,
  datePublished: o.datePublished,
  dateModified: o.datePublished,
  author: { '@type': 'Person', '@id': `${SITE_URL}/about#sam-oum`, name: 'Sam Oum', url: `${SITE_URL}/about` },
  publisher: { '@id': BUSINESS_ID },
  image: `${SITE_URL}/images/og-image.jpg`,
});

export const ratingsText = `${ratings.google.value} on Google (${ratings.google.count} reviews) and ${ratings.yelp.value} on Yelp (${ratings.yelp.count} reviews), as of ${ratings.asOf}`;

export const menuSchema = (sections: { name: string; items: { name: string; vegan?: boolean; description?: string }[] }[], path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Kreung LA Catering Menu',
  url: new URL(path, SITE_URL).href,
  inLanguage: 'en',
  provider: { '@id': BUSINESS_ID },
  hasMenuSection: sections.map((s) => ({
    '@type': 'MenuSection',
    name: s.name,
    hasMenuItem: s.items.map((it) => ({
      '@type': 'MenuItem',
      name: it.name,
      ...(it.description ? { description: it.description } : {}),
      ...(it.vegan ? { suitableForDiet: 'https://schema.org/VeganDiet' } : {}),
    })),
  })),
});

export const personSam = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/about#sam-oum`,
  name: 'Sam Oum',
  jobTitle: 'Co-owner',
  birthPlace: { '@type': 'Place', name: 'Khao-I-Dang refugee camp, Thai-Cambodian border' },
  worksFor: { '@id': BUSINESS_ID },
  url: `${SITE_URL}/about`,
});

/** The CBS News Los Angeles segment (Cloudflare Stream). */
export const videoObject = () => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: videos.cbs.title,
  description: videos.cbs.description,
  thumbnailUrl: videos.cbs.poster,
  embedUrl: videos.cbs.player,
  ...(videos.cbs.uploadDate ? { uploadDate: videos.cbs.uploadDate } : {}),
  publisher: { '@type': 'Organization', name: videos.cbs.outlet },
  about: { '@id': BUSINESS_ID },
});

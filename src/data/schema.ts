/** JSON-LD builders. Only use facts from business.ts. */
import { business, BUSINESS_ID, SITE_URL, ratings } from './business';

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
  servesCuisine: ['Cambodian', 'Khmer', 'Barbecue'],
  foundingDate: business.foundingDate,
  founder: [
    { '@type': 'Person', '@id': `${SITE_URL}/about#sam-oum`, name: 'Sam Oum' },
    { '@type': 'Person', name: 'Christina' },
  ],
  email: business.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: business.locality,
    addressRegion: business.state,
    addressCountry: 'US',
  },
  areaServed: { '@type': 'AdministrativeArea', name: business.areaServed },
  priceRange: '$20–$33 per person (catering)',
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

import {
  SITE_URL,
  STUDIO_EMAIL,
  OFFICES,
  isTodo,
  typologyLabel,
  statusLabel,
  type Project,
  type Fixture,
  type Article
} from '@/content';

const ORG_ID = `${SITE_URL}/#org`;
const PERSON_ID = `${SITE_URL}/#karen`;

/**
 * Organization + Person (Karen) + LocalBusiness por oficina.
 * Va en el layout raíz — toda página lo lleva. (Brief §6)
 */
export function organizationGraph() {
  const offices = OFFICES.map(([city, , tz]) => ({
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#office-${city.toLowerCase()}`,
    name: `KM Lighting Studio · ${city}`,
    parentOrganization: { '@id': ORG_ID },
    address: { '@type': 'PostalAddress', addressLocality: city },
    // La dirección exacta se confirma en fase 2; el timezone es dato real.
    areaServed: { '@type': 'Place', name: city },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'timeZone',
      value: tz
    }
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Karen Mannheim',
        jobTitle: 'Founder & Creative Director',
        worksFor: { '@id': ORG_ID },
        knowsAbout: [
          'architectural lighting design',
          'luxury residential lighting',
          'hospitality lighting',
          'photometric calculation',
          'glare control',
          'lighting controls'
        ]
      },
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': ORG_ID,
        name: 'Karen Mannheim Lighting Studio',
        alternateName: 'KM Lighting Studio',
        url: SITE_URL,
        email: STUDIO_EMAIL,
        foundingDate: '1993',
        founder: { '@id': PERSON_ID },
        numberOfEmployees: 80,
        areaServed: [
          { '@type': 'Place', name: 'Lima' },
          { '@type': 'Place', name: 'Miami' },
          { '@type': 'Place', name: 'Madrid' }
        ]
      },
      ...offices
    ]
  };
}

/**
 * CreativeWork por proyecto. Solo incluye campos con valor real — los TODO
 * se omiten (no se inventan). Va en cada página /projects/[slug]. (Brief §6)
 */
export function creativeWork(p: Project) {
  const url = `${SITE_URL}/projects/${p.id}`;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#creativework`,
    url,
    genre: typologyLabel(p.typ),
    creativeWorkStatus: statusLabel(p.sta),
    creator: [{ '@id': ORG_ID }, { '@id': PERSON_ID }],
    publisher: { '@id': ORG_ID }
  };

  if (!isTodo(p.name)) data.name = p.name;
  if (!isTodo(p.concept)) data.about = p.concept;
  if (!isTodo(p.place)) {
    data.locationCreated = { '@type': 'Place', name: p.place };
  }
  if (!isTodo(p.year)) data.dateCreated = p.year;

  // contributor = arquitecto · interiorista · developer (los que existan)
  const contributors = [p.arch, p.interior, p.dev]
    .filter((v) => !isTodo(v))
    .map((name) => ({ '@type': 'Organization', name }));
  if (contributors.length) data.contributor = contributors;

  return data;
}

/**
 * Product por luminaria. Sin `offers` — especificamos, no vendemos.
 * Los campos técnicos en TODO se omiten (no se inventan). (Brief §6)
 */
export function fixtureProduct(f: Fixture) {
  const url = `${SITE_URL}/products/${f.id}`;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    url,
    name: f.name,
    category: f.family,
    description: f.blurb,
    brand: { '@id': ORG_ID }
  };
  if (!isTodo(f.cct)) {
    data.additionalProperty = (f.cct as string[]).map((value) => ({
      '@type': 'PropertyValue',
      name: 'CCT',
      value
    }));
  }
  return data;
}

/**
 * Article + FAQPage por artículo del Journal. Solo campos con contenido real —
 * los TODO se omiten del JSON-LD (answer, faq sin responder, fecha…). (Brief §6)
 */
export function articleGraph(a: Article) {
  const url = `${SITE_URL}/contenido/${a.slug}`;

  const article: Record<string, unknown> = {
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    headline: a.title,
    about: a.question,
    author: { '@type': 'Person', name: a.author },
    reviewedBy: { '@type': 'Person', name: a.reviewedBy },
    publisher: { '@id': ORG_ID }
  };
  if (!isTodo(a.answer)) article.description = a.answer;
  if (!isTodo(a.published)) article.datePublished = a.published;

  const graph: Record<string, unknown>[] = [article];

  // FAQPage solo con las preguntas que ya tienen respuesta escrita.
  const answered = a.faq.filter((x) => !isTodo(x.a));
  if (answered.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: answered.map((x) => ({
        '@type': 'Question',
        name: x.q,
        acceptedAnswer: { '@type': 'Answer', text: x.a }
      }))
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

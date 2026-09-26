/* Prerender: turns the Vite client build into static pages.
   Run by `npm run build` after `vite build` (client, into ../dist) and
   `vite build --ssr` (server entry, into .ssr). Writes the full page markup
   and a complete <head> into dist/index.html and dist/404.html, plus
   sitemap.xml and robots.txt, and copies the site's images and favicon. */
import { readFileSync, writeFileSync, cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const APP = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(APP, '..');
const DIST = join(SITE, 'dist');
const SSR = join(APP, '.ssr');

const { render, renderNotFound, site, landing } = await import(
  pathToFileURL(join(SSR, 'entry-server.js')).href
);
const brand = JSON.parse(readFileSync(join(SITE, 'content', 'brand.json'), 'utf8'));

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const origin = site.meta.domain.replace(/\/$/, '');
const abs = (p) => origin + p;
const hasTodo = (v) => typeof v === 'string' && /TODO/.test(v);

/* ---- JSON-LD, built from the content JSON --------------------------------- */
const a = site.contact.address;
const types = site.meta.schemaType;
const business = {
  '@context': 'https://schema.org',
  '@type': types.length === 1 ? types[0] : types,
  '@id': `${origin}/#business`,
  name: site.meta.name,
  description: site.meta.description,
  slogan: site.meta.tagline,
  url: `${origin}/`,
  telephone: site.contact.phoneHref.replace(/^tel:/, ''),
  image: abs(site.meta.ogImage.src),
  logo: abs(site.meta.logo.src),
  priceRange: site.meta.priceRange,
  currenciesAccepted: site.meta.currency,
  areaServed: site.meta.areaServed.map((name) => ({ '@type': 'City', name })),
  address: {
    '@type': 'PostalAddress',
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postcode,
    addressCountry: a.country,
  },
  // The email is a placeholder address that does not exist yet
  // (site.json -> _placeholders), so it is kept out of structured data.
  ...(site.contact.emailIsPlaceholder ? {} : { email: site.contact.email }),
};
const faqSection = landing.sections.find((s) => s.type === 'faq');
const faq = faqSection && {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSection.faqs
    .filter((f) => !hasTodo(f.q) && !hasTodo(f.a))
    .map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
};
const ld = (o) =>
  `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

/* ---- <head> ---------------------------------------------------------------- */
function head({ title, description, path, schema = [], robots, preload = [] }) {
  const og = site.meta.ogImage;
  const url = abs(path);
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    robots ? `<meta name="robots" content="${robots}" />` : '',
    `<meta name="theme-color" content="${esc(brand.light.bg)}" />`,
    `<meta name="color-scheme" content="light" />`,
    `<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />`,
    ...preload.map((p) => `<link rel="preload" as="image" href="${p}" fetchpriority="high" />`),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.meta.name)}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(abs(og.src))}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(og.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(abs(og.src))}" />`,
    `<meta name="twitter:image:alt" content="${esc(og.alt)}" />`,
    ...schema.map(ld),
  ]
    .filter(Boolean)
    .join('\n    ');
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8');
if (!template.includes('<!--app-->') || !template.includes('<!--head-->')) {
  throw new Error('dist/index.html is missing the <!--app--> or <!--head--> marker');
}
const page = (headHtml, appHtml, bodyAttr = '') =>
  template
    .replace('<!--head-->', () => headHtml)
    .replace('<!--app-->', () => appHtml)
    .replace('<body>', `<body${bodyAttr}>`);

writeFileSync(
  join(DIST, 'index.html'),
  page(
    head({
      title: site.meta.title,
      description: site.meta.description,
      path: '/',
      schema: [business, faq].filter(Boolean),
      preload: [landing.hero.image.src],
    }),
    render(),
  ),
);

writeFileSync(
  join(DIST, '404.html'),
  page(
    head({
      title: `Page not found · ${site.meta.name}`,
      description: site.notFound.description,
      path: '/404.html',
      robots: 'noindex',
    }),
    renderNotFound(),
    ' data-page="404"',
  ),
);

writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${origin}/</loc></url>
</urlset>
`,
);
writeFileSync(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
);

/* ---- static assets ------------------------------------------------------- */
mkdirSync(join(DIST, 'assets'), { recursive: true });
cpSync(join(SITE, 'assets', 'images'), join(DIST, 'assets', 'images'), { recursive: true });
cpSync(join(SITE, 'assets', 'favicon.svg'), join(DIST, 'assets', 'favicon.svg'));
if (existsSync(SSR)) rmSync(SSR, { recursive: true, force: true });

console.log('Prerendered sites/tanus/dist: index.html, 404.html, sitemap.xml, robots.txt, assets/');

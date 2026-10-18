/** Build crawlable, translated HTML and reciprocal language sitemaps. */
import fs from 'node:fs';
import path from 'node:path';
import { buildPublicRoutes, renderCrawlableDocument } from '../src/pages/seo-landings.js';
import { buildLocalizedPageSeo, buildPageStructuredData } from '../src/utils/seo-geo.js';
import { escapeHtml, escapeAttr } from '../src/utils/security.js';
import { LANGUAGES, localizePath, translateText, loadTranslationCatalog } from '../src/utils/translation-catalog.js';

const SITE = 'https://www.elifcevrekimya.com.tr';
const dist = path.join(process.cwd(), 'dist');
const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
  .replace(/<div id="app">[\s\S]*?<\/div>/, '<div id="app"></div>');
const routes = buildPublicRoutes();

function decodeText(value) {
  const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (match, entity) => {
    if (entity.startsWith('#x')) return String.fromCodePoint(parseInt(entity.slice(2), 16));
    if (entity.startsWith('#')) return String.fromCodePoint(parseInt(entity.slice(1), 10));
    return entities[entity.toLowerCase()] ?? match;
  });
}

function localizedBody(record, code) {
  // Translate complete escaped text nodes, then escape catalog content again.
  return renderCrawlableDocument(record).split(/(<[^>]+>)/g).map((part) => {
    if (!part.startsWith('<')) {
      if (!part.trim()) return part;
      return escapeHtml(translateText(decodeText(part), code));
    }
    return part.replace(/\bhref="([^"]*)"/g, (attribute, href) => {
      const decoded = decodeText(href);
      return decoded.startsWith('/') && !decoded.startsWith('//')
        ? `href="${escapeAttr(localizePath(decoded, code))}"`
        : attribute;
    });
  }).join('');
}

function applyHead(template, seo) {
  let html = template
    .replace(/<html\b[^>]*>/i, `<html lang="${escapeAttr(seo.lang)}" dir="${escapeAttr(seo.dir)}">`)
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<link\b(?=[^>]*\brel="canonical")[^>]*>/gi, '')
    .replace(/<link\b(?=[^>]*\bhreflang=)[^>]*>/gi, '')
    .replace(/<script\b(?=[^>]*\bid="dynamic-seo-geo-schema")[^>]*>[\s\S]*?<\/script>/gi, '');
  const metas = [
    ['name', 'robots', seo.robots],
    ['name', 'description', seo.description],
    ['name', 'keywords', seo.keywords],
    ['property', 'og:title', seo.title],
    ['property', 'og:description', seo.description],
    ['property', 'og:url', seo.canonical],
    ['property', 'og:locale', seo.ogLocale],
    ['name', 'twitter:title', seo.title],
    ['name', 'twitter:description', seo.description],
    ['name', 'twitter:url', seo.canonical]
  ];
  for (const [attribute, name] of metas) {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(`<meta\\b(?=[^>]*\\b${attribute}="${escapedName}")[^>]*>`, 'gi'), '');
  }
  html = html.replace(/<meta\b(?=[^>]*\bproperty="og:locale:alternate")[^>]*>/gi, '');
  const head = [
    `<title>${escapeHtml(seo.title)}</title>`,
    ...metas.filter(([, , value]) => value).map(([attribute, name, value]) =>
      `<meta ${attribute}="${escapeAttr(name)}" content="${escapeAttr(value)}" />`),
    ...(seo.canonical ? [`<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`] : []),
    ...seo.alternates.map(({ hreflang, href }) =>
      `<link rel="alternate" hreflang="${escapeAttr(hreflang)}" href="${escapeAttr(href)}" />`)
  ];
  const graph = buildPageStructuredData(seo);
  if (graph) {
    // Catalog text cannot close the JSON script element.
    head.push(`<script id="dynamic-seo-geo-schema" type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`);
  }
  return html.replace('</head>', `${head.join('\n')}\n</head>`);
}

function writeRouteFile(routePath, html) {
  if (routePath === '/') {
    fs.writeFileSync(path.join(dist, 'index.html'), html);
    return;
  }
  const parts = routePath.split('/').filter(Boolean);
  const fileName = `${parts.pop()}.html`;
  const dir = path.join(dist, ...parts);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, fileName), html);
}

function sitemapXml(code) {
  const urls = routes.map((route) => {
    const seo = buildLocalizedPageSeo(route.path, null, code);
    return `  <url>\n    <loc>${escapeHtml(seo.canonical)}</loc>\n${seo.alternates.map(({ hreflang, href }) =>
      `    <xhtml:link rel="alternate" hreflang="${escapeAttr(hreflang)}" href="${escapeAttr(href)}" />`).join('\n')}\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

for (const { code } of LANGUAGES) {
  await loadTranslationCatalog(code);
  for (const route of routes) {
    const seo = buildLocalizedPageSeo(route.path, null, code);
    const html = applyHead(shell, seo).replace('<div id="app"></div>', `<div id="app">${localizedBody(route, code)}</div>`);
    writeRouteFile(seo.path, html);
  }
  fs.writeFileSync(path.join(dist, `sitemap-${code}.xml`), sitemapXml(code));
}

// Initial HTTP documents protect private pages before JavaScript executes.
for (const privatePath of ['/admin', '/portal']) {
  writeRouteFile(privatePath, applyHead(shell, buildLocalizedPageSeo(privatePath)));
}
const notFound = buildLocalizedPageSeo('/404');
const notFoundBody = `<main><h1>Sayfa bulunamadı</h1><p><a href="/">Ana Sayfa</a></p></main>`;
fs.writeFileSync(path.join(dist, '404.html'), applyHead(shell, notFound).replace('<div id="app"></div>', `<div id="app">${notFoundBody}</div>`));

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${LANGUAGES.map(({ code }) =>
  `  <sitemap><loc>${SITE}/sitemap-${code}.xml</loc></sitemap>`).join('\n')}\n</sitemapindex>\n`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemapIndex);
// Preserve public/sitemap.xml, which may contain the user's source edits.
console.log(`Prerender: ${routes.length} routes × ${LANGUAGES.length} languages, private noindex pages and 10 language sitemaps.`);

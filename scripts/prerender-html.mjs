/**
 * Vite çıktısındaki her indekslenebilir yol için ilk HTML'i üretir.
 * Firebase catch-all rewrite kalkınca bu dosyalar HTTP 200, diğer yollar 404.html olur.
 */
import fs from 'node:fs';
import path from 'node:path';
import { buildPublicRoutes, renderCrawlableDocument } from '../src/pages/seo-landings.js';

const root = process.cwd();
const dist = path.join(root, 'dist');
const shellPath = path.join(dist, 'index.html');

function escapeText(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applyHead(html, { title, description, canonical, robots }) {
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(title)}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeText(description)}" />`
  );
  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    canonical
      ? `<link rel="canonical" href="${escapeText(canonical)}" />`
      : ''
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeText(canonical || 'https://elifkimya.web.app/')}" />`
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeText(title)}" />`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeText(description)}" />`
  );
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeText(title)}" />`
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeText(description)}" />`
  );
  if (!out.includes('name="robots"')) {
    out = out.replace('</head>', `  <meta name="robots" content="${escapeText(robots)}" />\n</head>`);
  } else {
    out = out.replace(
      /<meta name="robots" content="[^"]*"\s*\/?>/,
      `<meta name="robots" content="${escapeText(robots)}" />`
    );
  }
  return out;
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

function sitemapXml(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes.map((route) => `  <url>
    <loc>${route.canonical}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const shell = fs.readFileSync(shellPath, 'utf8');
const routes = buildPublicRoutes();
const indexable = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

routes.forEach((route) => {
  const body = renderCrawlableDocument(route);
  let html = applyHead(shell, {
    title: route.title,
    description: route.description,
    canonical: route.canonical,
    robots: indexable
  });
  html = html.replace('<div id="app"></div>', `<div id="app">${body}</div>`);
  writeRouteFile(route.path, html);
});

const notFoundBody = `<main><h1>Sayfa bulunamadı</h1><p>Bu adres Elif Kimya sitesinde yok.</p><p><a href="/">Ana sayfa</a></p></main>`;
let notFound = applyHead(shell, {
  title: 'Sayfa bulunamadı | Elif Kimya',
  description: 'Bu adres Elif Kimya sitesinde yok.',
  canonical: '',
  robots: 'noindex, nofollow'
});
notFound = notFound.replace('<div id="app"></div>', `<div id="app">${notFoundBody}</div>`);
fs.writeFileSync(path.join(dist, '404.html'), notFound);

const xml = sitemapXml(routes);
fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml);
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml);

console.log(`Prerender: ${routes.length} sayfa + 404.html`);

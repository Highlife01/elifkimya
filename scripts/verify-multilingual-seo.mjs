/** Validate the built HTTP documents, not just client-side route metadata. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { buildPublicRoutes } from '../src/pages/seo-landings.js';
import { escapeHtml } from '../src/utils/security.js';
import {
  LANGUAGES,
  localizePath,
  translateText,
  hasTranslation,
  loadTranslationCatalog,
  normalizeTranslationSource
} from '../src/utils/translation-catalog.js';

const SITE = 'https://www.elifcevrekimya.com.tr';
const dist = path.join(process.cwd(), 'dist');
const routes = buildPublicRoutes();
const failures = [];
await Promise.all(LANGUAGES.map(({ code }) => loadTranslationCatalog(code)));
let documents = 0;
let catalogEntries = 0;

function check(context, operation) {
  try { operation(); } catch (error) { failures.push(`${context}: ${error.message}`); }
}

function decode(value = '') {
  return value.replace(/&(amp|lt|gt|quot|apos|#39);/g, (match, entity) =>
    ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'" })[entity]);
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
}

function routeFile(routePath) {
  return path.join(dist, routePath === '/' ? 'index.html' : `${routePath.slice(1)}.html`);
}

function alternateMap(markup, elementName = 'link') {
  const tags = [...markup.matchAll(new RegExp(`<${elementName}\\b[^>]*>`, 'g'))]
    .map(([tag]) => attributes(tag)).filter((attribute) => attribute.hreflang);
  assert.equal(tags.length, LANGUAGES.length + 1, 'must have exactly 11 language alternates');
  const map = new Map(tags.map((attribute) => [attribute.hreflang, attribute.href]));
  assert.equal(map.size, tags.length, 'duplicate hreflang');
  return map;
}

function checkAlternates(actual, basePath) {
  for (const { code } of LANGUAGES) {
    assert.equal(actual.get(code), SITE + localizePath(basePath, code), `${code} alternate differs`);
    assert.ok(fs.existsSync(routeFile(localizePath(basePath, code))), `${code} alternate target has no static document`);
  }
  assert.equal(actual.get('x-default'), SITE + basePath, 'x-default must use the Turkish source URL');
}

for (const { code, dir } of LANGUAGES) {
  for (const route of routes) {
    const routePath = localizePath(route.path, code);
    check(routePath, () => {
      const html = fs.readFileSync(routeFile(routePath), 'utf8');
      const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
      assert.ok(head, 'missing document head');
      const htmlAttributes = attributes(html.match(/<html\b[^>]*>/)?.[0] || '');
      assert.equal(htmlAttributes.lang, code, 'incorrect document language');
      assert.equal(htmlAttributes.dir, dir, 'incorrect text direction');
      const canonicals = [...head.matchAll(/<link\b[^>]*>/g)]
        .map(([tag]) => attributes(tag)).filter((attribute) => attribute.rel === 'canonical');
      assert.equal(canonicals.length, 1, 'must have exactly one canonical');
      assert.equal(canonicals[0].href, SITE + routePath, 'canonical must point to this locale URL');
      checkAlternates(alternateMap(head), route.path);

      const titles = [...head.matchAll(/<title>([^<]*)<\/title>/g)];
      assert.equal(titles.length, 1, 'must have exactly one title');
      assert.equal(decode(titles[0][1]), translateText(route.title, code), 'title is not translated');
      const metas = [...head.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
      const meta = (name) => metas.filter((attribute) => attribute.name === name || attribute.property === name);
      for (const name of ['description', 'robots', 'og:title', 'og:description', 'og:url', 'og:locale', 'twitter:title', 'twitter:description']) {
        assert.equal(meta(name).length, 1, `${name} must occur exactly once`);
      }
      assert.equal(meta('description')[0].content, translateText(route.description, code), 'description is not translated');
      assert.equal(meta('og:url')[0].content, SITE + routePath, 'Open Graph URL differs');
      assert.ok(meta('robots')[0].content.startsWith('index, follow'), 'public page is not indexable');
      assert.equal(meta('og:title')[0].content, decode(titles[0][1]), 'social title differs');

      const scripts = [...head.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
      assert.equal(scripts.length, 1, 'must have one current JSON-LD graph');
      const schema = JSON.parse(scripts[0][1]);
      assert.equal(schema['@context'], 'https://schema.org', 'unexpected schema context');
      const webpage = schema['@graph'].find((item) => item['@type'] === 'WebPage');
      assert.equal(webpage?.inLanguage, code, 'JSON-LD language differs');
      assert.equal(webpage?.url, SITE + routePath, 'JSON-LD URL differs');
      assert.equal(webpage?.name, decode(titles[0][1]), 'JSON-LD title differs');

      const app = html.match(/<div id="app">([\s\S]*?)<\/div>/)?.[1];
      assert.ok(app, 'missing crawlable public body');
      const heading = app.match(/<h1>([^<]*)<\/h1>/)?.[1];
      assert.equal(decode(heading), translateText(route.h1, code), 'crawlable heading is not translated');
      const bodySources = [
        ...(route.body.paragraphs || []),
        ...(route.body.items || []).flatMap((item) => [item.title, item.text, ...(item.facts || [])]),
        ...(route.body.links || []).map((link) => link.label)
      ].filter((source) => typeof source === 'string' && source.trim());
      for (const source of bodySources) {
        assert.ok(app.includes(escapeHtml(translateText(source, code))), `missing translated body content: ${source.slice(0, 70)}`);
      }
      for (const [, href] of app.matchAll(/\bhref="([^"]*)"/g)) {
        const link = decode(href);
        if (link.startsWith('/') && !link.startsWith('//')) {
          assert.equal(localizePath(link, code), link, `internal link exits locale: ${link}`);
        }
      }
      documents += 1;
    });
  }

  check(`sitemap-${code}.xml`, () => {
    const xml = fs.readFileSync(path.join(dist, `sitemap-${code}.xml`), 'utf8');
    assert.ok(xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"'), 'missing XHTML namespace');
    const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)];
    assert.equal(entries.length, routes.length, 'incorrect sitemap URL count');
    const expected = new Map(routes.map((route) => [SITE + localizePath(route.path, code), route.path]));
    for (const [, entry] of entries) {
      const loc = decode(entry.match(/<loc>([^<]*)<\/loc>/)?.[1]);
      assert.ok(expected.has(loc), `unexpected or duplicate URL: ${loc}`);
      checkAlternates(alternateMap(entry, 'xhtml:link'), expected.get(loc));
      expected.delete(loc);
    }
    assert.equal(expected.size, 0, 'missing sitemap URLs');
  });
}

check('sitemap.xml', () => {
  const xml = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
  assert.ok(xml.includes('<sitemapindex '), 'missing language sitemap index');
  const locations = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((match) => decode(match[1]));
  assert.deepEqual(locations.sort(), LANGUAGES.map(({ code }) => `${SITE}/sitemap-${code}.xml`).sort());
});

for (const privatePath of ['/admin', '/portal', '/404']) {
  check(`${privatePath} private/error response`, () => {
    const html = fs.readFileSync(routeFile(privatePath), 'utf8');
    const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] || '';
    const robots = [...head.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag)).find((attribute) => attribute.name === 'robots');
    assert.ok(robots?.content.includes('noindex'), 'initial HTML must be noindex');
    assert.ok(!head.includes('rel="canonical"'), 'stale public canonical on private/error page');
    assert.ok(!head.includes('hreflang='), 'stale public hreflang on private/error page');
    assert.ok(!head.includes('application/ld+json'), 'stale public schema on private/error page');
  });
}

if (!process.argv.includes('--skip-catalog')) {
  const inventory = JSON.parse(fs.readFileSync('src/data/translation-source.json', 'utf8'));
  for (const { code } of LANGUAGES.filter((language) => language.code !== 'tr')) {
    const missing = inventory.filter((source) => !hasTranslation(normalizeTranslationSource(source), code));
    if (missing.length) failures.push(`${code} catalog: ${missing.length} untranslated known source strings; first: ${missing.slice(0, 3).join(' / ')}`);
    catalogEntries += inventory.length - missing.length;
  }
}

if (failures.length) {
  console.error(`${failures.length} multilingual verification failures:\n${failures.slice(0, 30).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Multilingual SEO verified: ${documents} HTTP documents, 10 reciprocal sitemaps, private/error noindex${catalogEntries ? `, ${catalogEntries} catalog entries` : ''}.`);
}

/**
 * Build a deterministic inventory of public, repository-owned Turkish copy.
 * No Firebase reads or writes, browser data, customer records or network calls.
 *
 * Usage: node scripts/extract-translations.mjs [--check]
 * Source values are normalized in the same way as the translation catalog.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseAst } from 'rollup/parseAst';
import { buildPublicRoutes, renderCrawlableDocument, renderPublicLanding, renderNotFoundPage } from '../src/pages/seo-landings.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'src/data/translation-source.json');
const publicFiles = [
  'src/pages/home.js',
  'src/pages/public-pages.js',
  'src/pages/seo-landings.js',
  'src/components/navbar.js',
  'src/components/footer.js',
  'src/components/medipure-catalog.js',
  'src/components/lab-chemicals-catalog.js',
  'src/components/notification.js',
  'src/utils/seo-geo.js',
  ...fs.readdirSync(path.join(root, 'src/data'))
    .filter((name) => name.endsWith('.js') && !/translat|locale|catalog-(?:tr|en|ar|de|fr|ru|es|it|zh|fa)/iu.test(name))
    .map((name) => `src/data/${name}`)
];

const strings = new Set();
const byFile = new Map();
const placeholder = '\uE000';
const nonCopyProperties = new Set([
  'id', 'slug', 'code', 'group', 'categoryId', 'type', 'kind', 'path', 'href',
  'src', 'image', 'sourceUrl', 'url', 'canonical', 'icon', 'emoji', 'class',
  'className', 'style', 'color', 'gradient', 'bg', 'border', 'textColor',
  'field', 'nameKey', 'labelKey', 'data', 'filter', 'valueKey', 'date',
  'ctaLink', 'secondaryLink', 'imagePromptEn', 'phoneRaw', 'phoneDisplay',
  'phone', 'whatsappNumber', 'whatsappUrl', 'email', 'mapUrl'
]);
const htmlSkip = new Set(['script', 'style', 'svg', 'math', 'code', 'pre', 'noscript']);
const translatableAttributes = new Set(['alt', 'title', 'placeholder', 'aria-label']);

export function normalizeSource(value) {
  return String(value ?? '').replace(/\s+/gu, ' ').trim();
}

function decodeEntities(value) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', copy: '©', reg: '®' };
  return String(value).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, key) => {
    if (key[0] === '#') {
      const code = key[1].toLowerCase() === 'x' ? parseInt(key.slice(2), 16) : parseInt(key.slice(1), 10);
      return code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : entity;
    }
    return named[key.toLowerCase()] ?? entity;
  });
}

function isCopy(value) {
  if (!value || value.includes(placeholder) || /\$\{|\b(?:escapeHtml|escapeAttr|encodeURIComponent)\(/u.test(value)) return false;
  if (!/[\p{L}]{2}/u.test(value)) return false;
  if (/^(?:https?:|www\.|mailto:|tel:|\/|#|\.|\[|@)/iu.test(value)) return false;
  if (/^[&?][a-z][\w-]*=/iu.test(value)) return false;
  if (/\S+@\S+\.\S+/u.test(value)) return false;
  if (/^[A-Z]{1,5}-?\d{2,}(?:-[\dA-Z]+)?$/u.test(value)) return false;
  if (/^(?:[a-z][\w.-]*\s*)$/u.test(value) && !/^(?:saat|ton|model|firma|adres|stok|adet|numune|telefon|ay|hafta|bilgi|ve|ile|veya)$/u.test(value)) return false;
  if (/^[a-z]{2}(?:-[A-Z]{2})$/u.test(value)) return false;
  if (/^[\w.:[\]#%(),/\s-]+$/u.test(value) && /(?:flex|grid|rounded|border|font-|text-|padding|margin|display|var\(|querySelector)/u.test(value)) return false;
  if (/^[\w-]+\.(?:jpg|jpeg|png|webp|svg|pdf|js|css|json)$/iu.test(value)) return false;
  return true;
}

function add(value, origin, { decode = false } = {}) {
  const text = normalizeSource(decode ? decodeEntities(value) : value);
  if (!isCopy(text)) return;
  strings.add(text);
  if (!byFile.has(origin)) byFile.set(origin, new Set());
  byFile.get(origin).add(text);
}

/** Tokenize trusted source HTML without a DOM dependency or executing scripts. */
function extractHtml(html, origin) {
  const stack = [];
  const tokens = String(html).match(/<!--[\s\S]*?-->|<![^>]*>|<\/?[a-zA-Z][^>]*>|[^<]+|</gu) || [];
  for (const token of tokens) {
    if (/^<!(?:--)?/u.test(token)) continue;
    if (token[0] === '<') {
      const match = token.match(/^<(\/)?([a-zA-Z][\w:-]*)/u);
      if (!match) continue;
      const tag = match[2].toLowerCase();
      if (match[1]) {
        const index = stack.lastIndexOf(tag);
        if (index >= 0) stack.splice(index);
        continue;
      }
      if (!stack.some((name) => htmlSkip.has(name)) && !htmlSkip.has(tag)) {
        const attributePattern = /([^\s=<>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gu;
        for (const attr of token.matchAll(attributePattern)) {
          if (translatableAttributes.has(attr[1].toLowerCase())) {
            addFragments(attr[2] ?? attr[3] ?? attr[4] ?? '', origin, true);
          }
        }
      }
      if (!/\/>$/u.test(token) && !/^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/u.test(tag)) stack.push(tag);
      continue;
    }
    if (!stack.some((name) => htmlSkip.has(name))) addFragments(token, origin, true);
  }
}

function addFragments(value, origin, decode = false) {
  for (const fragment of value.split(placeholder)) add(fragment, origin, { decode });
}

function propertyName(property) {
  return property?.key?.name ?? property?.key?.value;
}

function inspectAst(node, origin, parent = null, ancestors = []) {
  if (!node || typeof node !== 'object') return;
  const isString = node.type === 'Literal' && typeof node.value === 'string';
  const isTemplate = node.type === 'TemplateLiteral';
  if (isString || isTemplate) {
    const property = parent?.type === 'Property' && parent.value === node ? parent : null;
    const excluded = (parent?.type === 'Property' && parent.key === node)
      || parent?.type === 'ImportDeclaration'
      || /^(?:Import|Export)/u.test(parent?.type || '')
      || nonCopyProperties.has(propertyName(property));
    if (!excluded) {
      const value = isString ? node.value : node.quasis.map((part) => part.value.cooked ?? part.value.raw).join(placeholder);
      if (/<\/?[a-zA-Z][^>]*>/u.test(value)) extractHtml(value, origin);
      else addFragments(value, origin);
    }
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === 'parent' || key === 'loc') continue;
    if (Array.isArray(value)) {
      for (const child of value) if (child?.type) inspectAst(child, origin, node, [...ancestors, node]);
    } else if (value?.type) inspectAst(value, origin, node, [...ancestors, node]);
  }
}

for (const file of publicFiles) {
  inspectAst(parseAst(fs.readFileSync(path.join(root, file), 'utf8')), file);
}

// Only Turkish values from the existing hand-reviewed UI dictionary are source copy.
function inspectUi(node, uiFile) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'Property' && propertyName(node) === 'tr') {
    if (node.value?.type === 'Literal') add(node.value.value, uiFile);
  }
  if (node.type === 'Property' && typeof node.key?.value === 'string' && /[ğüşöçıİĞÜŞÖÇ]/u.test(node.key.value)) add(node.key.value, uiFile);
  for (const child of Object.values(node)) {
    if (Array.isArray(child)) child.forEach((entry) => { if (entry?.type) inspectUi(entry, uiFile); });
    else if (child?.type) inspectUi(child, uiFile);
  }
}
for (const uiFile of ['src/utils/i18n.js', 'src/data/reviewed-translations.js']) {
  if (fs.existsSync(path.join(root, uiFile))) inspectUi(parseAst(fs.readFileSync(path.join(root, uiFile), 'utf8')), uiFile);
}

function collectPublicValues(value, origin, key = '') {
  if (typeof value === 'string') {
    if (nonCopyProperties.has(key)) return;
    if (/<\/?[a-zA-Z][^>]*>/u.test(value)) extractHtml(value, origin);
    else add(value, origin);
  } else if (Array.isArray(value)) {
    value.forEach((entry) => collectPublicValues(entry, origin));
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([name, entry]) => collectPublicValues(entry, origin, name));
  }
}

const routes = buildPublicRoutes();
for (const route of routes) {
  collectPublicValues(route, 'rendered-route-data');
  extractHtml(renderCrawlableDocument(route), 'rendered-crawlable-document');
  if (route.kind !== 'hub') extractHtml(renderPublicLanding(route), 'rendered-public-landing');
}
extractHtml(renderNotFoundPage(), 'rendered-not-found');

// Shared status text from the original prerender shell is also public copy.
add('Sayfa bulunamadı | Elif Kimya', 'prerender-404');
add('Bu adres Elif Kimya sitesinde yok.', 'prerender-404');

const inventory = [...strings].sort();
const serialized = `${JSON.stringify(inventory, null, 2)}\n`;
if (process.argv.includes('--check')) {
  if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== serialized) {
    console.error('Translation inventory is stale. Run node scripts/extract-translations.mjs.');
    process.exitCode = 1;
  }
} else fs.writeFileSync(output, serialized, 'utf8');

console.log(JSON.stringify({
  strings: inventory.length,
  characters: inventory.reduce((sum, value) => sum + value.length, 0),
  publicRoutes: routes.length,
  sourceFiles: publicFiles.length,
  byOrigin: Object.fromEntries([...byFile].map(([file, values]) => [file, values.size]))
}, null, 2));

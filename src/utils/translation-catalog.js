import { REVIEWED_TRANSLATIONS } from '../data/reviewed-translations.js';

export { REVIEWED_TRANSLATIONS } from '../data/reviewed-translations.js';

/** The same language and text data is used in the browser and static HTML. */
export const LANGUAGES = [
  { code: 'tr', apiCode: 'tr', native: 'Türkçe', english: 'Turkish', dir: 'ltr' },
  { code: 'en', apiCode: 'en', native: 'English', english: 'English', dir: 'ltr' },
  { code: 'ar', apiCode: 'ar', native: 'العربية', english: 'Arabic', dir: 'rtl' },
  { code: 'de', apiCode: 'de', native: 'Deutsch', english: 'German', dir: 'ltr' },
  { code: 'fr', apiCode: 'fr', native: 'Français', english: 'French', dir: 'ltr' },
  { code: 'ru', apiCode: 'ru', native: 'Русский', english: 'Russian', dir: 'ltr' },
  { code: 'es', apiCode: 'es', native: 'Español', english: 'Spanish', dir: 'ltr' },
  { code: 'it', apiCode: 'it', native: 'Italiano', english: 'Italian', dir: 'ltr' },
  { code: 'zh', apiCode: 'zh-CN', native: '中文', english: 'Chinese', dir: 'ltr' },
  { code: 'fa', apiCode: 'fa', native: 'فارسی', english: 'Persian', dir: 'rtl' }
];

const LANGUAGE_CODES = new Set(LANGUAGES.map(({ code }) => code));
const CATALOGS = Object.create(null);
const pendingCatalogs = new Map();
const LOADERS = {
  en: () => import('../data/translations/en.json', { with: { type: 'json' } }),
  ar: () => import('../data/translations/ar.json', { with: { type: 'json' } }),
  de: () => import('../data/translations/de.json', { with: { type: 'json' } }),
  fr: () => import('../data/translations/fr.json', { with: { type: 'json' } }),
  ru: () => import('../data/translations/ru.json', { with: { type: 'json' } }),
  es: () => import('../data/translations/es.json', { with: { type: 'json' } }),
  it: () => import('../data/translations/it.json', { with: { type: 'json' } }),
  zh: () => import('../data/translations/zh.json', { with: { type: 'json' } }),
  fa: () => import('../data/translations/fa.json', { with: { type: 'json' } })
};

/** Download only the chosen bundled language; translation lookup stays synchronous. */
export async function loadTranslationCatalog(code = 'tr') {
  if (code === 'tr') return;
  if (!Object.hasOwn(LOADERS, code)) throw new RangeError(`Unsupported language: ${code}`);
  if (CATALOGS[code]) return;
  if (!pendingCatalogs.has(code)) {
    const request = LOADERS[code]().then(({ default: catalog }) => {
      if (!catalog || typeof catalog !== 'object' || Array.isArray(catalog)) throw new TypeError(`Invalid translation catalog: ${code}`);
      CATALOGS[code] = catalog;
    }).finally(() => pendingCatalogs.delete(code));
    pendingCatalogs.set(code, request);
  }
  await pendingCatalogs.get(code);
}

export function normalizeTranslationSource(value) {
  return String(value ?? '').normalize('NFC').replace(/\s+/gu, ' ').trim();
}

export function hasTranslation(value, code) {
  const source = normalizeTranslationSource(value);
  if (code === 'tr') return true;
  const reviewed = REVIEWED_TRANSLATIONS[source]?.[code];
  const translated = reviewed || (CATALOGS[code] && Object.hasOwn(CATALOGS[code], source) ? CATALOGS[code][source] : undefined);
  return typeof translated === 'string' && Boolean(translated.trim());
}

/** Exact, offline lookup. Unknown records, model codes and user text stay intact. */
export function translateText(value, code = 'tr') {
  const raw = String(value ?? '');
  if (code === 'tr') return raw;
  const source = normalizeTranslationSource(raw);
  const catalog = CATALOGS[code];
  const reviewed = REVIEWED_TRANSLATIONS[source]?.[code];
  if (!reviewed && (!catalog || !Object.hasOwn(catalog, source))) return raw;
  const translated = reviewed || catalog[source];
  if (typeof translated !== 'string' || !translated.trim()) return raw;
  return `${raw.match(/^\s*/u)?.[0] || ''}${translated}${raw.match(/\s*$/u)?.[0] || ''}`;
}

function splitPath(value) {
  const raw = String(value || '/');
  const suffixIndex = raw.search(/[?#]/u);
  return suffixIndex === -1 ? [raw, ''] : [raw.slice(0, suffixIndex), raw.slice(suffixIndex)];
}

export function getLanguageFromPath(pathname = '/') {
  const [path] = splitPath(pathname);
  const prefix = path.split('/')[1];
  return LANGUAGE_CODES.has(prefix) ? prefix : 'tr';
}

export function stripLanguagePrefix(pathname = '/') {
  const [path, suffix] = splitPath(pathname);
  const prefix = path.split('/')[1];
  const stripped = LANGUAGE_CODES.has(prefix) ? path.slice(prefix.length + 1) : path;
  return `${stripped || '/'}${suffix}`;
}

export function isPrivatePath(pathname = '/') {
  const [path] = splitPath(stripLanguagePrefix(pathname));
  return /^\/(?:admin|portal)(?:\/|$)/u.test(path);
}

/** Query strings and anchors survive switching language; private URLs stay stable. */
export function localizePath(pathname = '/', code = 'tr') {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/iu.test(String(pathname))) return pathname;
  const [stripped, suffix] = splitPath(stripLanguagePrefix(pathname));
  const prefixed = stripped.startsWith('/') ? stripped : `/${stripped}`;
  const path = prefixed.length > 1 ? prefixed.replace(/\/+$/u, '') : prefixed;
  if (code === 'tr' || !LANGUAGE_CODES.has(code) || isPrivatePath(path)) return `${path}${suffix}`;
  return `/${code}${path === '/' ? '' : path}${suffix}`;
}

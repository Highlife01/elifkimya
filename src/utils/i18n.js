/** Offline public-page translation. Locale URLs remain authoritative. */
import {
  LANGUAGES,
  getLanguageFromPath,
  isPrivatePath,
  localizePath,
  normalizeTranslationSource,
  stripLanguagePrefix,
  translateText
} from './translation-catalog.js';
import { REVIEWED_TRANSLATIONS, UI } from '../data/reviewed-translations.js';

export { LANGUAGES };

const SEARCH_CLUSTERS = [
  ['soğutma kulesi', 'sogutma kulesi', 'cooling tower', 'kühlturm', 'kuehlturm', 'tour de refroidissement', 'градирня', 'torre de enfriamiento', 'torre di raffreddamento', '冷却塔', 'برج التبريد', 'برج خنک'],
  ['kazan', 'boiler', 'kessel', 'chaudiere', 'chaudière', 'котел', 'котёл', 'caldera', 'caldaia', '锅炉', 'غلاية', 'دیگ بخار'],
  ['ters ozmoz', 'reverse osmosis', 'umkehrosmose', 'osmose inverse', 'обратный осмос', 'osmosis inversa', 'osmosi inversa', '反渗透', 'التناضح العكسي', 'اسمز معکوس'],
  ['antiskalant', 'antiscalant', 'kireç önleyici', 'kirec onleyici', 'scale inhibitor', 'antitartre', 'антискалант', 'antiincrustante', 'antincrostante', '阻垢剂', 'مضاد الترسب', 'ضد رسوب'],
  ['korozyon', 'corrosion', 'korrosion', 'corrosion', 'коррозия', 'corrosion', 'corrosione', '腐蚀', 'تآكل', 'خوردگی', 'inhibitör', 'inhibitor'],
  ['laboratuvar', 'laboratory', 'labor', 'laboratoire', 'лаборатория', 'laboratorio', 'laboratorio', '实验室', 'مختبر', 'آزمایشگاه'],
  ['saf su', 'pure water', 'reines wasser', 'eau pure', 'чистая вода', 'agua pura', 'acqua pura', '纯水', 'مياه نقية', 'آب خالص'],
  ['ultra saf', 'ultrapure', 'ultrareines wasser', 'eau ultrapure', 'ультрачистая', 'agua ultrapura', 'acqua ultrapura', '超纯水', 'فائقة النقاء', 'فوق خالص'],
  ['deiyonize', 'deionized', 'deionisiert', 'deionisee', 'déionisée', 'деиониз', 'desionizada', 'deionizzata', '去离子', 'منزوعة الأيونات', 'دیونیزه'],
  ['distile', 'distilled', 'destilliert', 'distillee', 'distillée', 'дистилл', 'destilada', 'distillata', '蒸馏', 'مقطرة', 'تقطیر'],
  ['elektrodeiyonizasyon', 'electrodeionization', 'elektrodeionisation', 'électrodéionisation', 'электродеиониз', 'electrodesionizacion', 'elettrodeionizzazione', '电去离子', 'التأين الكهربائي', 'الکترودیونیزاسیون'],
  ['mobil', 'mobile', 'mobil', 'mobile', 'мобильн', 'movil', 'móvil', '移动', 'متنقل', 'سیار'],
  ['endüstri', 'endustri', 'industrial', 'industriell', 'industriel', 'промышлен', 'industrial', 'industriale', '工业', 'صناعي', 'صنعتی'],
  ['metal kaplama', 'metal plating', 'metallbeschichtung', 'revetement metallique', 'гальваник', 'recubrimiento metalico', 'rivestimento metallico', '金属电镀', 'طلاء المعادن', 'آبکاری'],
  ['kozmetik', 'cosmetic', 'kosmetik', 'cosmetique', 'косметик', 'cosmetica', 'cosmetico', '化妆品', 'مستحضرات', 'آرایشی'],
  ['sterilizasyon', 'sterilization', 'sterilisation', 'sterilisation', 'стерилиз', 'esterilizacion', 'sterilizzazione', '灭菌', 'تعقيم', 'استریلیزاسیون'],
  ['medikal', 'medical', 'medizinisch', 'medical', 'медицин', 'medico', 'medicale', '医疗', 'طبي', 'پزشکی'],
  ['biyokimya', 'biochemistry', 'biochemie', 'biochimie', 'биохим', 'bioquimica', 'biochimica', '生物化学', 'كيمياء حيوية', 'بیوشیمی'],
  ['mikrobiyoloji', 'microbiology', 'mikrobiologie', 'microbiologie', 'микробиолог', 'microbiologia', 'microbiologia', '微生物学', 'الأحياء الدقيقة', 'میکروبیولوژی'],
  ['jeotermal', 'geothermal', 'geothermie', 'geothermie', 'геотерм', 'geoterm', 'geoterm', '地热', 'حراري أرضي', 'زمین‌گرمایی'],
  ['emülsiyon', 'emulsion', 'emulsion', 'emulsion', 'эмульс', 'emulsion', 'emulsione', '乳液', 'مستحلب', 'امولسیون'],
  ['koku', 'odor', 'geruch', 'odeur', 'запах', 'olor', 'odore', '气味', 'رائحة', 'بو'],
  ['polimer', 'polymer', 'polymer', 'polymere', 'полимер', 'polimero', 'polimero', '聚合物', 'بوليمر', 'پلیمر'],
  ['hipoklorit', 'hypochlorite', 'hypochlorit', 'hypochlorite', 'гипохлорит', 'hipoclorito', 'ipoclorito', '次氯酸盐', 'هيبوكلوريت', 'هیپوکلریت'],
  ['kostik', 'caustic', 'natronlauge', 'soude caustique', 'каустическ', 'sosa caustica', 'soda caustica', '烧碱', 'صودا كاوية', 'سود سوزآور'],
  ['atıksu', 'atiksu', 'wastewater', 'abwasser', 'eaux usees', 'сточн', 'aguas residuales', 'acque reflue', '废水', 'مياه الصرف', 'فاضلاب'],
  ['kapalı devre', 'kapali devre', 'closed loop', 'geschlossener kreislauf', 'circuit ferme', 'замкнутый контур', 'circuito cerrado', 'circuito chiuso', '闭路', 'دائرة مغلقة', 'مدار بسته']
];

let currentCode = 'tr';
const listeners = new Set();
const textSources = new WeakMap();
const attributeSources = new WeakMap();
const linkValues = new WeakMap();
const observers = new WeakMap();
const TRANSLATED_ATTRIBUTES = ['alt', 'title', 'placeholder', 'aria-label'];
const SKIP_SELECTOR = [
  'script', 'style', 'noscript', 'code', 'pre', 'svg', 'math',
  '[data-lang-menu]', '[data-no-translate]', '[translate="no"]', '.notranslate',
  '[contenteditable]:not([contenteditable="false"])'
].join(', ');
const LINK_ROOTS = new Set(['urunler', 'sistemler', 'sektorler', 'hizmet-bolgeleri', 'teknik-bilgi', 'teklif-al', 'iletisim', 'admin', 'portal']);

// UI packs may already be localized when a component renders. Remember their
// Turkish source without ever feeding a translated label back as Turkish text.
const reviewedSources = new Map();
for (const { code } of LANGUAGES) {
  const reverse = new Map();
  for (const [source, translations] of Object.entries(REVIEWED_TRANSLATIONS)) {
    const translated = translations[code];
    if (!translated) continue;
    const key = normalizeTranslationSource(translated);
    reverse.set(key, reverse.has(key) && reverse.get(key) !== source ? null : source);
  }
  reviewedSources.set(code, reverse);
}

export function fold(value) {
  return String(value || '')
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i');
}

export function getLanguage() {
  if (typeof window !== 'undefined') {
    return isPrivatePath(window.location.pathname) ? 'tr' : getLanguageFromPath(window.location.pathname);
  }
  return currentCode;
}

export function getLanguageMeta(code = getLanguage()) {
  return LANGUAGES.find((lang) => lang.code === code) || LANGUAGES[0];
}

export function t(key) {
  const pack = UI[key];
  return pack ? pack[getLanguage()] || pack.tr || key : key;
}

export function applyDocumentLanguage() {
  if (typeof document === 'undefined') return;
  const meta = getLanguageMeta();
  document.documentElement.lang = meta.code;
  document.documentElement.dir = meta.dir;
}

/** The subscriber updates the URL before rendering the newly selected locale. */
export function setLanguage(code) {
  if (!LANGUAGES.some((lang) => lang.code === code) || code === getLanguage()) return false;
  currentCode = code;
  listeners.forEach((listener) => listener(code));
  return true;
}

export function subscribeLanguage(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function languageHaystack(lang) {
  return fold(`${lang.code} ${lang.native} ${lang.english}`);
}

export function withLanguageSearch(text) {
  const source = fold(text);
  const extra = [];
  SEARCH_CLUSTERS.forEach((cluster) => {
    const folded = cluster.map((term) => fold(term));
    if (folded.some((term) => term && source.includes(term))) extra.push(...folded);
  });
  return fold(`${source} ${extra.join(' ')}`);
}

function defaultRoot() {
  return typeof document === 'undefined' ? null : document.getElementById('app');
}

function isExcluded(element) {
  return !element || Boolean(element.closest(SKIP_SELECTOR));
}

function isExcludedText(element) {
  return isExcluded(element) || Boolean(element.closest('textarea'));
}

function originalSource(raw, code) {
  if (code === 'tr') return raw;
  const source = reviewedSources.get(code)?.get(normalizeTranslationSource(raw));
  return source
    ? `${raw.match(/^\s*/u)?.[0] || ''}${source}${raw.match(/\s*$/u)?.[0] || ''}`
    : raw;
}

function updateText(node, code) {
  const raw = node.nodeValue || '';
  if (!raw.trim()) return;
  let state = textSources.get(node);
  // Component updates (sliders, filtered results, validation) become the new
  // source. Our own previous writes are identified by their exact rendered text.
  if (!state || raw !== state.rendered) state = { source: originalSource(raw, code), rendered: raw };
  const translated = translateText(state.source, code);
  if (raw !== translated) node.nodeValue = translated; // Text only, never HTML.
  state.rendered = translated;
  textSources.set(node, state);
}

function updateAttributes(element, code) {
  if (isExcluded(element)) return;
  const states = attributeSources.get(element) || new Map();
  for (const attribute of TRANSLATED_ATTRIBUTES) {
    const raw = element.getAttribute(attribute);
    if (!raw?.trim()) continue;
    let state = states.get(attribute);
    if (!state || raw !== state.rendered) state = { source: originalSource(raw, code), rendered: raw };
    const translated = translateText(state.source, code);
    if (raw !== translated) element.setAttribute(attribute, translated);
    state.rendered = translated;
    states.set(attribute, state);
  }
  attributeSources.set(element, states);
}

function updateLink(element, code) {
  if (element.tagName !== 'A' || isExcluded(element)) return;
  const values = linkValues.get(element) || new Map();
  for (const attribute of ['href', 'data-nav']) {
    const value = element.getAttribute(attribute);
    if (!value?.startsWith('/') || value.startsWith('//')) continue;
    const path = stripLanguagePrefix(value).split(/[?#]/u)[0];
    if (path !== '/' && !LINK_ROOTS.has(path.split('/')[1])) continue;
    const localized = localizePath(value, code);
    if (value !== localized) element.setAttribute(attribute, localized);
    values.set(attribute, localized);
  }
  linkValues.set(element, values);
}

/** Synchronous catalog translation; no form values or text leave the browser. */
export function translatePageDom(root = defaultRoot()) {
  if (!root || typeof document === 'undefined' || isPrivatePath(window.location.pathname) || isExcluded(root)) return;
  const code = getLanguage();
  const walker = document.createTreeWalker(root, 4, {
    acceptNode(node) { return isExcludedText(node.parentElement) ? 2 : 1; }
  });
  let node;
  while ((node = walker.nextNode())) updateText(node, code);

  // querySelectorAll excludes the root itself; its accessible labels matter too.
  updateAttributes(root, code);
  root.querySelectorAll(TRANSLATED_ATTRIBUTES.map((attribute) => `[${attribute}]`).join(', '))
    .forEach((element) => updateAttributes(element, code));
  updateLink(root, code);
  root.querySelectorAll('a[href]').forEach((element) => updateLink(element, code));
}

function containsExternalChanges(records) {
  return records.some((record) => {
    if (record.type === 'childList') return record.addedNodes.length > 0;
    if (record.type === 'characterData') {
      return !isExcludedText(record.target.parentElement)
        && textSources.get(record.target)?.rendered !== record.target.nodeValue;
    }
    if (record.type === 'attributes') {
      const rendered = ['href', 'data-nav'].includes(record.attributeName)
        ? linkValues.get(record.target)?.get(record.attributeName)
        : attributeSources.get(record.target)?.get(record.attributeName)?.rendered;
      return !isExcluded(record.target)
        && rendered !== record.target.getAttribute(record.attributeName);
    }
    return false;
  });
}

/** Observe dynamic text and accessible labels without scheduling our own writes. */
export function initDomTranslator(root = defaultRoot()) {
  if (!root || observers.has(root) || typeof MutationObserver === 'undefined') return;
  let timer;
  const observer = new MutationObserver((records) => {
    if (isPrivatePath(window.location.pathname) || !containsExternalChanges(records)) return;
    clearTimeout(timer);
    timer = setTimeout(() => translatePageDom(root), 25);
  });
  observer.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...TRANSLATED_ATTRIBUTES, 'href', 'data-nav']
  });
  observers.set(root, { observer, cancel: () => clearTimeout(timer) });
}

export function disconnectDomTranslator(root = defaultRoot()) {
  const state = root && observers.get(root);
  if (!state) return;
  state.cancel();
  state.observer.disconnect();
  observers.delete(root);
}


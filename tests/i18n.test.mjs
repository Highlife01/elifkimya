import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  LANGUAGES,
  getLanguageFromPath,
  hasTranslation,
  isPrivatePath,
  loadTranslationCatalog,
  localizePath,
  stripLanguagePrefix,
  translateText
} from '../src/utils/translation-catalog.js';
import {
  applyDocumentLanguage,
  disconnectDomTranslator,
  getLanguage,
  initDomTranslator,
  setLanguage,
  subscribeLanguage,
  translatePageDom
} from '../src/utils/i18n.js';

test('locale URLs preserve page, query and anchor across all supported languages', () => {
  for (const { code } of LANGUAGES) {
    const path = localizePath('/de/urunler?grup=ro#katalog', code);
    assert.equal(getLanguageFromPath(path), code);
    assert.equal(stripLanguagePrefix(path), '/urunler?grup=ro#katalog');
    assert.equal(localizePath(path, 'tr'), '/urunler?grup=ro#katalog');
    assert.equal(localizePath('/fr', code), code === 'tr' ? '/' : `/${code}`);
    assert.equal(localizePath('/en/admin?tab=crm', code), '/admin?tab=crm');
    assert.equal(localizePath('/ar/portal/token#quote', code), '/portal/token#quote');
  }
  assert.equal(isPrivatePath('/en/admin/settings'), true);
  assert.equal(isPrivatePath('/portal-public'), false);
  assert.equal(localizePath('https://example.org/urunler', 'en'), 'https://example.org/urunler');
});

test('catalog lookup preserves unknown text, whitespace, model identifiers and HTML as text', () => {
  assert.equal(translateText('  Ana\n Sayfa  ', 'en'), '  Home  ');
  assert.equal(translateText('Ana Sayfa', 'ar'), 'الرئيسية');
  assert.equal(translateText('DT-5012', 'en'), 'DT-5012');
  assert.equal(translateText('Customer-specific unregistered record', 'fr'), 'Customer-specific unregistered record');
  assert.equal(translateText('<img src=x onerror=unsafe()>', 'en'), '<img src=x onerror=unsafe()>');
  assert.equal(translateText('Ana Sayfa', 'xx'), 'Ana Sayfa');
});

test('language catalog loads on demand and concurrent requests share its result', async () => {
  const catalog = JSON.parse(await readFile(new URL('../src/data/translations/en.json', import.meta.url), 'utf8'));
  const source = Object.keys(catalog).find((key) => !hasTranslation(key, 'en') && catalog[key] !== key);
  assert.ok(source, 'The English catalog must contain public copy beyond the immediate UI pack');
  assert.equal(translateText(source, 'en'), source);
  await Promise.all([loadTranslationCatalog('en'), loadTranslationCatalog('en')]);
  assert.equal(hasTranslation(source, 'en'), true);
  assert.equal(translateText(source, 'en'), catalog[source]);
  await assert.rejects(loadTranslationCatalog('unsupported'), /Unsupported language/u);
});

// A small DOM fixture provides asynchronous observer records without requiring
// a browser package. The assertions concern rendered behavior and regressions.
class Element {
  constructor(tagName, attributes = {}, children = []) {
    this.tagName = tagName.toUpperCase();
    this.attributes = new Map(Object.entries(attributes));
    this.childNodes = children;
    children.forEach((child) => { child.parentElement = this; });
  }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  setAttribute(name, value) { this.attributes.set(name, value); }
  closest(selector) {
    for (let element = this; element; element = element.parentElement) {
      if (selector === 'textarea') {
        if (element.tagName === 'TEXTAREA') return element;
        continue;
      }
      if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'SVG', 'MATH'].includes(element.tagName)
        || element.attributes.has('data-lang-menu')
        || element.attributes.has('data-no-translate')
        || element.getAttribute('translate') === 'no'
        || (element.getAttribute('class') || '').split(' ').includes('notranslate')
        || (element.attributes.has('contenteditable') && element.getAttribute('contenteditable') !== 'false')) return element;
    }
    return null;
  }
  querySelectorAll(selector = '*') {
    const elements = this.childNodes.flatMap((child) => child instanceof Element ? [child, ...child.querySelectorAll()] : []);
    if (selector === '*') return elements;
    if (selector === 'a[href]') return elements.filter((child) => child.tagName === 'A' && child.attributes.has('href'));
    return elements.filter((child) => ['alt', 'title', 'placeholder', 'aria-label'].some((name) => child.attributes.has(name)));
  }
}

class Text {
  constructor(value) { this.nodeValue = value; }
}

test('DOM translation handles changing text and attributes, avoids observer loops, protects input and private pages', () => {
  const savedGlobals = Object.fromEntries(['window', 'document', 'MutationObserver', 'localStorage', 'setTimeout', 'clearTimeout']
    .map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const timers = new Map();
  let nextTimer = 0;
  const text = new Text(' Ana Sayfa ');
  const input = new Element('input', { placeholder: 'Ana Sayfa' });
  input.value = 'Ana Sayfa';
  const textareaText = new Text('Ana Sayfa');
  const textarea = new Element('textarea', { placeholder: 'Ana Sayfa' }, [textareaText]);
  const link = new Element('a', { href: '/urunler?grup=ro#katalog', 'data-nav': '/urunler?grup=ro#katalog' });
  const privateLink = new Element('a', { href: '/portal' });
  const assetLink = new Element('a', { href: '/logo.svg' });
  const editableText = new Text('Ana Sayfa');
  const editable = new Element('div', { contenteditable: 'true' }, [editableText]);
  const excludedText = new Text('Ana Sayfa');
  const excluded = new Element('span', { 'data-no-translate': '' }, [excludedText]);
  const root = new Element('main', { alt: 'Ana Sayfa', title: 'Ana Sayfa' }, [text, input, textarea, link, privateLink, assetLink, editable, excluded]);
  const collectText = (element) => element.childNodes.flatMap((child) => child instanceof Text ? [child] : collectText(child));
  let observer;
  globalThis.window = { location: { pathname: '/en' } };
  globalThis.localStorage = {
    setItem() { throw new Error('Locale must not be persisted in browser storage'); },
    getItem() { throw new Error('Locale must come from URL'); }
  };
  globalThis.document = {
    documentElement: {},
    getElementById: () => root,
    createTreeWalker: (element, _what, filter) => {
      const nodes = collectText(element).filter((node) => filter.acceptNode(node) === 1);
      return { nextNode: () => nodes.shift() || null };
    }
  };
  globalThis.MutationObserver = class {
    constructor(callback) { this.callback = callback; observer = this; }
    observe(_element, options) { this.options = options; }
    disconnect() { this.disconnected = true; }
  };
  globalThis.setTimeout = (callback) => { const id = ++nextTimer; timers.set(id, callback); return id; };
  globalThis.clearTimeout = (id) => timers.delete(id);
  try {
    assert.equal(getLanguage(), 'en');
    applyDocumentLanguage();
    assert.equal(document.documentElement.lang, 'en');
    initDomTranslator(root);
    translatePageDom(root);
    assert.equal(text.nodeValue, ' Home ');
    assert.equal(root.getAttribute('alt'), 'Home');
    assert.equal(root.getAttribute('title'), 'Home');
    assert.equal(input.getAttribute('placeholder'), 'Home');
    assert.equal(input.value, 'Ana Sayfa');
    assert.equal(textarea.getAttribute('placeholder'), 'Home');
    assert.equal(textareaText.nodeValue, 'Ana Sayfa');
    assert.equal(link.getAttribute('href'), '/en/urunler?grup=ro#katalog');
    assert.equal(link.getAttribute('data-nav'), '/en/urunler?grup=ro#katalog');
    assert.equal(privateLink.getAttribute('href'), '/portal');
    assert.equal(assetLink.getAttribute('href'), '/logo.svg');
    assert.equal(editableText.nodeValue, 'Ana Sayfa');
    assert.equal(excludedText.nodeValue, 'Ana Sayfa');
    assert.ok(observer.options.attributeFilter.includes('alt'));

    observer.callback([
      { type: 'characterData', target: text },
      { type: 'attributes', target: root, attributeName: 'title' },
      { type: 'attributes', target: link, attributeName: 'href' }
    ]);
    assert.equal(timers.size, 0, 'Our own writes must not schedule another translation');

    text.nodeValue = 'İletişim';
    root.setAttribute('title', 'Ürünler');
    observer.callback([{ type: 'characterData', target: text }, { type: 'attributes', target: root, attributeName: 'title' }]);
    assert.equal(timers.size, 1);
    [...timers.values()][0]();
    timers.clear();
    assert.equal(text.nodeValue, 'Contact');
    assert.equal(root.getAttribute('title'), 'Products');

    window.location.pathname = '/';
    translatePageDom(root);
    assert.equal(getLanguage(), 'tr', 'Stored selection cannot override an unprefixed URL');
    assert.equal(text.nodeValue, 'İletişim');
    assert.equal(root.getAttribute('title'), 'Ürünler');
    assert.equal(link.getAttribute('href'), '/urunler?grup=ro#katalog');

    let selected;
    const unsubscribe = subscribeLanguage((code) => { selected = code; window.location.pathname = localizePath('/', code); });
    assert.equal(setLanguage('ar'), true);
    assert.equal(selected, 'ar');
    applyDocumentLanguage();
    assert.equal(document.documentElement.dir, 'rtl');
    assert.equal(setLanguage('ar'), false);
    unsubscribe();

    window.location.pathname = '/en/portal';
    text.nodeValue = 'Ana Sayfa';
    translatePageDom(root);
    assert.equal(getLanguage(), 'tr');
    assert.equal(text.nodeValue, 'Ana Sayfa');
    window.location.pathname = '/admin';
    translatePageDom(root);
    assert.equal(text.nodeValue, 'Ana Sayfa');
    disconnectDomTranslator(root);
    assert.equal(observer.disconnected, true);
  } finally {
    for (const [key, descriptor] of Object.entries(savedGlobals)) {
      if (descriptor === undefined) delete globalThis[key];
      else Object.defineProperty(globalThis, key, descriptor);
    }
  }
});

/**
 * Elif Kimya - Kurumsal Gezinme Çubuğu (Yüksek Kontrastlı B2B Tasarım Sistemi)
 * Bilgi Merkezi üst menüden kaldırılarak Footer'a taşınmıştır.
 */

import { escapeHtml, escapeAttr, renderSafeHtml } from '../utils/security.js';
import { LANGUAGES, fold, getLanguage, languageHaystack, setLanguage, t } from '../utils/i18n.js';
import { localizePath, stripLanguagePrefix } from '../utils/translation-catalog.js';

export const NAV_ITEMS = [
  { path: '/', labelKey: 'nav_home' },
  { path: '/urunler', labelKey: 'nav_products' },
  { path: '/sistemler', labelKey: 'nav_systems' },
  { path: '/sektorler', labelKey: 'nav_sectors' },
  { path: '/hizmet-bolgeleri', labelKey: 'nav_regions' },
  { path: '/iletisim', labelKey: 'nav_contact' }
];

function renderLanguageOptions() {
  return LANGUAGES.map((lang) => `
    <a
      href="${escapeAttr(localizePath(typeof window !== 'undefined' ? window.location.pathname + window.location.search + window.location.hash : '/', lang.code))}"
      hreflang="${escapeAttr(lang.code)}"
      lang="${escapeAttr(lang.code)}"
      class="lang-option"
      data-lang-option="${escapeAttr(lang.code)}"
      data-lang-hay="${escapeAttr(languageHaystack(lang))}"
      role="option"
      aria-selected="${lang.code === getLanguage() ? 'true' : 'false'}"
    >
      <span class="lang-option-code">${escapeHtml(lang.code.toUpperCase())}</span>
      <span class="lang-option-name" dir="auto">${escapeHtml(lang.native)}</span>
      <span class="lang-option-en">${escapeHtml(lang.english)}</span>
    </a>
  `).join('');
}

function renderLanguageMenu(variant) {
  const inline = variant === 'inline';
  return `
    <div class="lang-menu" data-lang-menu>
      ${inline ? '' : `
        <button type="button" class="lang-toggle" data-lang-toggle aria-haspopup="listbox" aria-expanded="false" aria-label="${escapeAttr(t('lang_menu'))}">
          <span aria-hidden="true">🌐</span>
          <span>${escapeHtml(getLanguage().toUpperCase())}</span>
        </button>
      `}
      <div class="lang-panel ${inline ? 'lang-panel--inline' : ''}" data-lang-panel ${inline ? '' : 'hidden'}>
        <input
          type="search"
          class="lang-search"
          data-lang-search
          placeholder="${escapeAttr(t('lang_search'))}"
          aria-label="${escapeAttr(t('lang_search'))}"
          autocomplete="off"
        />
        <p class="lang-empty" data-lang-empty hidden>${escapeHtml(t('lang_empty'))}</p>
        <div class="lang-options" role="listbox" aria-label="${escapeAttr(t('lang_menu'))}">
          ${renderLanguageOptions()}
        </div>
      </div>
    </div>
  `;
}

const ACTIVE_NAV_CLASS =
  'nav-item active rounded-xl px-4 py-2 text-sm font-extrabold transition-all duration-150 bg-gradient-to-r from-brand-green to-brand-teal !text-white shadow-md shadow-emerald-600/25';
const INACTIVE_NAV_CLASS =
  'nav-item rounded-xl px-4 py-2 text-sm font-bold transition-all duration-150 text-slate-900 hover:bg-emerald-50 hover:text-brand-green-dark';

export function renderNavbar(activeRoute = '/') {
  return `
    <header class="sticky top-0 z-50 border-b-2 border-emerald-500/30 bg-white/95 text-slate-900 backdrop-blur-xl shadow-md transition-all duration-300" id="header">
      <div class="container-x flex h-16 sm:h-20 items-center justify-between gap-4">
        <a class="flex items-center group py-1" aria-label="ELİF KİMYA Ana Sayfa" href="/" data-nav="/">
          <img
            alt="ELİF KİMYA"
            fetchpriority="high"
            width="220"
            height="52"
            decoding="async"
            class="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            src="/logo.svg"
          />
        </a>

        <nav class="hidden items-center gap-1.5 lg:flex" id="mainNav" aria-label="Ana Menü">
          ${NAV_ITEMS.map((link) => {
            const isActive =
              activeRoute === link.path ||
              (link.path !== '/' && activeRoute.startsWith(link.path));
            return `
              <a href="${escapeAttr(link.path)}"
                 data-nav="${escapeAttr(link.path)}"
                 class="${isActive ? ACTIVE_NAV_CLASS : INACTIVE_NAV_CLASS}">
                ${escapeHtml(t(link.labelKey))}
              </a>
            `;
          }).join('')}
        </nav>

        <div class="flex items-center gap-2.5">
          <div class="lang-menu-desktop">${renderLanguageMenu('dropdown')}</div>
          <a href="/portal"
             data-nav="/portal"
             class="hidden sm:flex items-center gap-1.5 rounded-xl border-2 border-slate-300 bg-slate-900 px-3.5 py-2 text-xs font-extrabold !text-white shadow-sm hover:bg-slate-800 hover:border-emerald-400 transition-all"
             title="Kurumsal Müşteri Portalı">
            <span aria-hidden="true" class="text-sm">🌐</span>
            <span class="uppercase tracking-wider">${escapeHtml(t('portal'))}</span>
          </a>

          <a class="btn-primary hidden !py-2.5 !px-5 text-xs sm:inline-flex shadow-cta" href="/teklif-al" data-nav="/teklif-al">
            <span>📋</span>
            <span>${escapeHtml(t('cta_quote'))}</span>
          </a>

          <button
            type="button"
            id="menuToggle"
            class="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-300 text-slate-900 hover:bg-emerald-50 lg:hidden transition"
            aria-label="Menüyü Aç/Kapat"
            aria-expanded="false">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobil Gezinme Çekmecesi -->
      <div id="mobileNavDrawer" class="hidden border-t border-slate-200 bg-white px-4 py-4 shadow-xl lg:hidden">
        <div class="flex flex-col gap-1.5">
          ${renderLanguageMenu('inline')}
          ${NAV_ITEMS.map((link) => {
            const isActive =
              activeRoute === link.path ||
              (link.path !== '/' && activeRoute.startsWith(link.path));
            return `
              <a href="${escapeAttr(link.path)}"
                 data-nav="${escapeAttr(link.path)}"
                 class="${isActive ? ACTIVE_NAV_CLASS : INACTIVE_NAV_CLASS} block">
                ${escapeHtml(t(link.labelKey))}
              </a>
            `;
          }).join('')}
          <div class="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-2">
            <a href="/teklif-al" data-nav="/teklif-al" class="btn-primary flex-1 text-center text-xs !py-2.5">
              <span>📋</span>
              <span>${escapeHtml(t('cta_quote'))}</span>
            </a>
            <a href="/portal" data-nav="/portal" class="btn-outline-dark flex-1 text-center text-xs !py-2.5">
              ${escapeHtml(t('portal_long'))}
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}

function bindLanguageMenus(root) {
  root.querySelectorAll('[data-lang-menu]').forEach((menu) => {
    const toggle = menu.querySelector('[data-lang-toggle]');
    const panel = menu.querySelector('[data-lang-panel]');
    const input = menu.querySelector('[data-lang-search]');
    const empty = menu.querySelector('[data-lang-empty]');
    const options = [...menu.querySelectorAll('[data-lang-option]')];

    menu.addEventListener('click', (event) => event.stopPropagation());

    const filter = (query) => {
      const folded = fold(query);
      let shown = 0;
      options.forEach((button) => {
        const match = !folded || (button.getAttribute('data-lang-hay') || '').includes(folded);
        button.hidden = !match;
        if (match) shown += 1;
      });
      if (empty) empty.hidden = shown !== 0;
    };

    toggle?.addEventListener('click', () => {
      const willOpen = Boolean(panel?.hidden);
      document.querySelectorAll('[data-lang-panel]:not(.lang-panel--inline)').forEach((item) => {
        item.hidden = true;
      });
      document.querySelectorAll('[data-lang-toggle]').forEach((item) => {
        item.setAttribute('aria-expanded', 'false');
      });
      if (panel && willOpen) {
        panel.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
        if (input) input.value = '';
        filter('');
        input?.focus();
      }
    });

    input?.addEventListener('input', () => filter(input.value));
    input?.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && panel) {
        panel.hidden = true;
        toggle?.setAttribute('aria-expanded', 'false');
      }
    });

    options.forEach((button) => {
      button.addEventListener('click', (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const code = button.getAttribute('data-lang-option') || 'tr';
        setLanguage(code);
      });
    });
  });
}

let outsideCloseBound = false;

export function createNavbar(navigate, currentPath = '/') {
  const wrapper = document.createElement('div');
  renderSafeHtml(wrapper, renderNavbar(currentPath));

  const drawer = wrapper.querySelector('#mobileNavDrawer');
  const toggleBtn = wrapper.querySelector('#menuToggle');
  bindLanguageMenus(wrapper);

  if (!outsideCloseBound) {
    outsideCloseBound = true;
    document.addEventListener('click', () => {
      document.querySelectorAll('[data-lang-panel]:not(.lang-panel--inline)').forEach((panel) => {
        panel.hidden = true;
      });
      document.querySelectorAll('[data-lang-toggle]').forEach((item) => {
        item.setAttribute('aria-expanded', 'false');
      });
    });
  }

  wrapper.querySelectorAll('a[data-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || link.getAttribute('data-nav');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        drawer?.classList.add('hidden');
        toggleBtn?.setAttribute('aria-expanded', 'false');
        navigate(href);
      }
    });
  });

  toggleBtn?.addEventListener('click', () => {
    const isHidden = drawer?.classList.toggle('hidden');
    toggleBtn.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
  });

  return wrapper.firstElementChild || wrapper;
}

export function updateActiveNav(currentPath = '/') {
  document.querySelectorAll('#header [data-lang-option]').forEach((option) => {
    const code = option.getAttribute('data-lang-option') || 'tr';
    option.setAttribute('href', localizePath(window.location.pathname, code) + window.location.search + window.location.hash);
  });
  document.querySelectorAll('#header a.nav-item').forEach((link) => {
    const path = stripLanguagePrefix(link.getAttribute('href') || '');
    const isActive =
      currentPath === path || (path !== '/' && currentPath.startsWith(path));
    link.className = isActive
      ? `${ACTIVE_NAV_CLASS}${link.closest('#mobileNavDrawer') ? ' block' : ''}`
      : `${INACTIVE_NAV_CLASS}${link.closest('#mobileNavDrawer') ? ' block' : ''}`;
  });
}

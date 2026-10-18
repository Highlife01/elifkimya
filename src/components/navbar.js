/**
 * Elif Kimya - Kurumsal Gezinme Çubuğu (Yüksek Kontrastlı B2B Tasarım Sistemi)
 * Bilgi Merkezi üst menüden kaldırılarak Footer'a taşınmıştır.
 */

import { escapeHtml, escapeAttr, renderSafeHtml } from '../utils/security.js';

export const NAV_ITEMS = [
  { path: '/', labelTr: 'Ana Sayfa', labelEn: 'Home' },
  { path: '/urunler', labelTr: 'Ürünler', labelEn: 'Products' },
  { path: '/sistemler', labelTr: '360° Su Arıtma & Otomasyon', labelEn: 'Water Systems' },
  { path: '/sektorler', labelTr: 'Sektörler', labelEn: 'Sectors' },
  { path: '/hizmet-bolgeleri', labelTr: 'Bölgeler & Lojistik', labelEn: 'Regions & Logistics' },
  { path: '/iletisim', labelTr: 'İletişim', labelEn: 'Contact' }
];

const ACTIVE_NAV_CLASS =
  'nav-item active rounded-xl px-4 py-2 text-sm font-extrabold transition-all duration-150 bg-gradient-to-r from-brand-green to-brand-teal !text-white shadow-md shadow-emerald-600/25';
const INACTIVE_NAV_CLASS =
  'nav-item rounded-xl px-4 py-2 text-sm font-bold transition-all duration-150 text-slate-900 hover:bg-emerald-50 hover:text-brand-green-dark';

export function renderNavbar(activeRoute = '/', currentLang = 'tr') {
  const isTr = currentLang === 'tr';

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
                ${escapeHtml(isTr ? link.labelTr : link.labelEn)}
              </a>
            `;
          }).join('')}
        </nav>

        <div class="flex items-center gap-2.5">
          <a href="/portal"
             data-nav="/portal"
             class="hidden sm:flex items-center gap-1.5 rounded-xl border-2 border-slate-300 bg-slate-900 px-3.5 py-2 text-xs font-extrabold !text-white shadow-sm hover:bg-slate-800 hover:border-emerald-400 transition-all"
             title="Kurumsal Müşteri Portalı">
            <span aria-hidden="true" class="text-sm">🌐</span>
            <span class="uppercase tracking-wider">Portal</span>
          </a>

          <a class="btn-primary hidden !py-2.5 !px-5 text-xs sm:inline-flex shadow-cta" href="/teklif-al" data-nav="/teklif-al">
            <span>📋</span>
            <span>${isTr ? 'Teklif İsteyin' : 'Request a Quote'}</span>
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
          ${NAV_ITEMS.map((link) => {
            const isActive =
              activeRoute === link.path ||
              (link.path !== '/' && activeRoute.startsWith(link.path));
            return `
              <a href="${escapeAttr(link.path)}"
                 data-nav="${escapeAttr(link.path)}"
                 class="${isActive ? ACTIVE_NAV_CLASS : INACTIVE_NAV_CLASS} block">
                ${escapeHtml(isTr ? link.labelTr : link.labelEn)}
              </a>
            `;
          }).join('')}
          <div class="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-2">
            <a href="/teklif-al" data-nav="/teklif-al" class="btn-primary flex-1 text-center text-xs !py-2.5">
              <span>📋</span>
              <span>Teklif İsteyin</span>
            </a>
            <a href="/portal" data-nav="/portal" class="btn-outline-dark flex-1 text-center text-xs !py-2.5">
              Müşteri Portalı
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}

export function createNavbar(navigate, currentPath = '/') {
  const wrapper = document.createElement('div');
  renderSafeHtml(wrapper, renderNavbar(currentPath, 'tr'));

  const drawer = wrapper.querySelector('#mobileNavDrawer');
  const toggleBtn = wrapper.querySelector('#menuToggle');

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
  document.querySelectorAll('#header a.nav-item').forEach((link) => {
    const path = link.getAttribute('href') || '';
    const isActive =
      currentPath === path || (path !== '/' && currentPath.startsWith(path));
    link.className = isActive
      ? `${ACTIVE_NAV_CLASS}${link.closest('#mobileNavDrawer') ? ' block' : ''}`
      : `${INACTIVE_NAV_CLASS}${link.closest('#mobileNavDrawer') ? ' block' : ''}`;
  });
}

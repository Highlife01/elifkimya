/**
 * Elif Kimya - Aydınlık Kurumsal Gezinme Çubuğu (Navbar)
 */

import { escapeHtml, escapeAttr, renderSafeHtml } from '../utils/security.js';
import { companyInfo } from '../data/products.js';

export const NAV_ITEMS = [
  { path: '/', labelTr: 'Ana Sayfa', labelEn: 'Home' },
  { path: '/urunler', labelTr: 'Kimyasal Ürünler', labelEn: 'Products' },
  { path: '/sistemler', labelTr: 'Su Arıtma Sistemleri', labelEn: 'Systems' },
  { path: '/sektorler', labelTr: 'Sektörel Proses & ROI', labelEn: 'Sectors & ROI' },
  { path: '/hizmet-bolgeleri', labelTr: 'Hizmet Bölgeleri', labelEn: 'Regions' },
  { path: '/teknik-bilgi', labelTr: 'Belge Merkezi', labelEn: 'Docs & GEO' },
  { path: '/iletisim', labelTr: 'İletişim', labelEn: 'Contact' }
];

export function renderNavbar(activeRoute = '/', currentLang = 'tr', generalSettings = {}) {
  const isTr = currentLang === 'tr';
  const brandName = generalSettings.brandTitle || 'ELİF';
  const brandAccent = generalSettings.brandAccent || 'KİMYA';

  return `
    <header class="site-header" id="header">
      <div class="top-info-strip">
        <div class="container top-info-inner">
          <div class="top-info-left">
            <span class="top-badge">ADANA MERKEZ &amp; BÖLGE LOJİSTİK</span>
            <span>Adana AOSB · Mersin · İskenderun · Gaziantep · Kayseri · Niğde Aynı Gün Sevkiyat</span>
          </div>
          <div class="top-info-right">
            <a href="tel:${escapeAttr(companyInfo.phoneRaw)}" class="top-contact-link">📞 ${escapeHtml(companyInfo.phoneDisplay)}</a>
            <a href="mailto:${escapeAttr(companyInfo.salesEmail)}" class="top-contact-link">✉️ ${escapeHtml(companyInfo.salesEmail)}</a>
            <a href="/portal" data-nav="/portal" class="top-portal-link">Müşteri Portalı</a>
            <a href="/admin" data-nav="/admin" class="top-portal-link">Yönetim (/admin)</a>
          </div>
        </div>
      </div>

      <div class="container navbar-inner">
        <a class="brand-logo" href="/" data-nav="/" aria-label="Elif Kimya Ana Sayfa">
          <img src="/brand-mark.svg" alt="Elif Kimya Logo" width="38" height="38" />
          <div class="brand-text">
            <span class="brand-name">${escapeHtml(brandName)} <strong>${escapeHtml(brandAccent)}</strong></span>
            <span class="brand-sub">${isTr ? 'Endüstriyel Kimyasal & Su Arıtma' : 'Industrial Chemicals & Water'}</span>
          </div>
        </a>

        <nav class="nav-links" id="mainNav" aria-label="Ana Menü">
          ${NAV_ITEMS.map((link) => {
            const isActive = activeRoute === link.path || (link.path !== '/' && activeRoute.startsWith(link.path));
            return `
              <a href="${escapeAttr(link.path)}"
                 data-nav="${escapeAttr(link.path)}"
                 class="nav-item ${isActive ? 'active' : ''}">
                ${escapeHtml(isTr ? link.labelTr : link.labelEn)}
              </a>
            `;
          }).join('')}
        </nav>

        <div class="nav-cta-group">
          <a class="btn btn-sm btn-secondary" href="/portal" data-nav="/portal">
            ${isTr ? 'Müşteri Portalı' : 'Client Portal'}
          </a>
          <a class="btn btn-sm btn-primary" href="/teklif-al" data-nav="/teklif-al">
            ${isTr ? 'Teklif & Jar-Test Al' : 'Request Quote'}
          </a>
          <button class="mobile-menu-toggle" id="menuToggle" type="button" aria-label="Menüyü Aç/Kapat" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `;
}

export function createNavbar(navigate, currentPath = '/') {
  const wrapper = document.createElement('div');
  renderSafeHtml(wrapper, renderNavbar(currentPath, 'tr'));

  wrapper.querySelectorAll('a[data-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || link.getAttribute('data-nav');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        const navMenu = wrapper.querySelector('#mainNav');
        navMenu?.classList.remove('mobile-open');
        navigate(href);
      }
    });
  });

  const toggleBtn = wrapper.querySelector('#menuToggle');
  const navMenu = wrapper.querySelector('#mainNav');
  toggleBtn?.addEventListener('click', () => {
    navMenu?.classList.toggle('mobile-open');
  });

  return wrapper.firstElementChild || wrapper;
}

export function updateActiveNav(currentPath = '/') {
  document.querySelectorAll('#mainNav .nav-item').forEach((link) => {
    const path = link.getAttribute('href') || '';
    const isActive = currentPath === path || (path !== '/' && currentPath.startsWith(path));
    link.classList.toggle('active', isActive);
  });
}

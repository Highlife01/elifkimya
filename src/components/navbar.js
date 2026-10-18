/**
 * Elif Kimya - Aydınlık Kurumsal Gezinme Çubuğu (Navbar)
 */

import { escapeHtml } from '../utils/security.js';

export function renderNavbar(activeRoute = '/', currentLang = 'tr', generalSettings = {}) {
  const isTr = currentLang === 'tr';

  const navLinks = [
    { path: '/', labelTr: 'Ana Sayfa', labelEn: 'Home' },
    { path: '/urunler', labelTr: 'Ürünler', labelEn: 'Products' },
    { path: '/sistemler', labelTr: 'Su Arıtma Sistemleri', labelEn: 'Systems' },
    { path: '/sektorler', labelTr: 'Mega Sanayi & ROI', labelEn: 'Sectors & ROI' },
    { path: '/hizmet-bolgeleri', labelTr: 'Hizmet Bölgeleri', labelEn: 'Regions' },
    { path: '/teknik-bilgi', labelTr: 'Belge Merkezi & GEO', labelEn: 'Docs & GEO' },
    { path: '/iletisim', labelTr: 'İletişim', labelEn: 'Contact' }
  ];

  const brandName = generalSettings.brandTitle || 'ELİF';
  const brandAccent = generalSettings.brandAccent || 'KİMYA';

  return `
    <header class="site-header" id="header">
      <div class="container nav-inner">
        <a class="brand" href="/" data-nav="/" aria-label="Elif Kimya Ana Sayfa">
          <img src="/brand-mark.svg" alt="Elif Kimya Logo" width="38" height="38" />
          <span>${escapeHtml(brandName)}<span>${escapeHtml(brandAccent)}</span></span>
          <span class="brand-tag">B2B</span>
        </a>

        <nav class="main-nav" id="mainNav" aria-label="Ana Menü">
          ${navLinks.map((link) => {
            const isActive = activeRoute === link.path || (link.path !== '/' && activeRoute.startsWith(link.path));
            return `
              <a href="${link.path}"
                 data-nav="${link.path}"
                 class="nav-link ${isActive ? 'active' : ''}">
                ${escapeHtml(isTr ? link.labelTr : link.labelEn)}
              </a>
            `;
          }).join('')}
        </nav>

        <div class="nav-actions">
          <button class="lang-switch-btn" id="langSwitch" type="button" aria-label="Dil Değiştir">
            <span class="${isTr ? 'active-lang' : ''}">TR</span>
            <span class="divider">/</span>
            <span class="${!isTr ? 'active-lang' : ''}">EN</span>
          </button>

          <a class="button button-small button-ghost-dark" href="/portal" data-nav="/portal">
            <span>${isTr ? 'Müşteri Portalı' : 'Client Portal'}</span>
          </a>

          <a class="button button-small button-primary quote-btn" href="/teklif-al" data-nav="/teklif-al">
            <span>${isTr ? 'Teklif Talebi' : 'Request RFQ'}</span>
            <svg viewBox="0 0 20 20" class="btn-arrow" aria-hidden="true">
              <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

          <button class="menu-toggle" id="menuToggle" type="button" aria-label="Menüyü Aç/Kapat" aria-expanded="false">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </div>
    </header>
  `;
}

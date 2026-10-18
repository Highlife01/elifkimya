/**
 * Elif Kimya - Kurumsal Alt Bilgi (Footer)
 */

import { escapeHtml, escapeAttr, renderSafeHtml } from '../utils/security.js';
import { companyInfo } from '../data/products.js';

export function renderFooter(currentLang = 'tr', generalSettings = {}) {
  const isTr = currentLang === 'tr';
  const rawPhone = generalSettings.phone || companyInfo.phoneDisplay;
  const phoneHref = generalSettings.phoneRaw || companyInfo.phoneRaw;
  const whatsappClean = (generalSettings.whatsapp || companyInfo.whatsappNumber || '905425903626').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappClean}`;
  const email = generalSettings.email || companyInfo.email;
  const salesEmail = generalSettings.salesEmail || companyInfo.salesEmail;
  const address = generalSettings.address || companyInfo.address;

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Kolon 1: Marka & Misyon -->
          <div class="footer-col">
            <a class="brand-logo" href="/" data-nav="/" aria-label="Elif Kimya Ana Sayfa">
              <img src="/brand-mark.svg" alt="Elif Kimya Logo" width="34" height="34" />
              <div class="brand-text">
                <span class="brand-name">ELİF <strong>KİMYA</strong></span>
                <span class="brand-sub">Endüstriyel Kimyasal & Su Arıtma</span>
              </div>
            </a>
            <p class="footer-desc">
              ${isTr
                ? 'Adana merkezli laboratuvar ve lojistik altyapısıyla Çukurova, Doğu Akdeniz, Güneydoğu, İç Anadolu ve Türkiye geneli endüstriyel su şartlandırma kimyasalları, proses polimerleri ve su arıtma sistemleri mühendisliği.'
                : 'Engineering industrial water conditioning chemicals, process polymers and water treatment systems from Adana to all industrial zones of Turkey and export markets.'}
            </p>
            <div class="footer-badges">
              <span class="f-badge">TDS &amp; SDS/GBF</span>
              <span class="f-badge">Parti Bazlı COA</span>
              <span class="f-badge">ADR Lojistik</span>
              <span class="f-badge">Yerinde Jar-Test</span>
            </div>
          </div>

          <!-- Kolon 2: Ürün ve Hizmet Grupları -->
          <div class="footer-col">
            <h4>${isTr ? 'Ürün & Hizmet Gruplarımız' : 'Products & Services'}</h4>
            <ul class="footer-links">
              <li><a href="/urunler?kategori=kazan-suyu-kimyasallari" data-nav="/urunler?kategori=kazan-suyu-kimyasallari">Kazan - Buhar ve Kondens Kimyasalları</a></li>
              <li><a href="/urunler?kategori=sogutma-kulesi-kimyasallari" data-nav="/urunler?kategori=sogutma-kulesi-kimyasallari">Soğutma Suyu &amp; Kapalı Devre Kimyasalları</a></li>
              <li><a href="/sistemler" data-nav="/sistemler">Reverse Osmosis (RO) &amp; EDI Sistemleri</a></li>
              <li><a href="/sistemler" data-nav="/sistemler">Su Filtrasyon &amp; Arıtım Ekipmanları</a></li>
              <li><a href="/urunler?kategori=atik-su-aritma-kimyasallari" data-nav="/urunler?kategori=atik-su-aritma-kimyasallari">Atık Su Polimerleri (A-PAM / C-PAM)</a></li>
              <li><a href="/urunler?kategori=fabrika-ve-proses-kimyasallari" data-nav="/urunler?kategori=fabrika-ve-proses-kimyasallari">Endüstriyel Bakım &amp; Proses Kimyasalları</a></li>
            </ul>
          </div>

          <!-- Kolon 3: Bölgesel Odak & Sanayi Aksı -->
          <div class="footer-col">
            <h4>${isTr ? 'Bölge Müdürlükleri & OSB Ağı' : 'Regional Industrial Hubs'}</h4>
            <ul class="footer-links">
              <li><a href="/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">Adana Merkez &amp; Hacı Sabancı OSB (AOSB)</a></li>
              <li><a href="/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">Mersin - Tarsus OSB &amp; Serbest Bölge</a></li>
              <li><a href="/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">İskenderun, Payas &amp; Osmaniye Haddehaneleri</a></li>
              <li><a href="/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">Gaziantep Başpınar &amp; Kahramanmaraş OSB</a></li>
              <li><a href="/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">Kayseri OSB &amp; Niğde Mikronize Kalsit</a></li>
              <li><a href="/sektorler#roi-calculators" data-nav="/sektorler#roi-calculators">Canlı Finansal ROI Hesaplayıcılar</a></li>
            </ul>
          </div>

          <!-- Kolon 4: İletişim & B2B Destek -->
          <div class="footer-col">
            <h4>${isTr ? 'Merkez İletişim & Portallar' : 'Contact & Portals'}</h4>
            <ul class="footer-contact-list">
              <li>
                <span class="fc-label">Merkez &amp; Fabrika/Depo</span>
                <span>${escapeHtml(address)}</span>
              </li>
              <li>
                <span class="fc-label">Kurumsal Telefon &amp; WhatsApp</span>
                <a href="tel:${escapeAttr(phoneHref)}" style="font-weight:700;color:var(--accent-teal);">${escapeHtml(rawPhone)}</a>
              </li>
              <li>
                <span class="fc-label">E-posta &amp; İhale Masası</span>
                <a href="mailto:${escapeAttr(email)}">${escapeHtml(email)}</a>
                <a href="mailto:${escapeAttr(salesEmail)}">${escapeHtml(salesEmail)}</a>
              </li>
            </ul>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem;">
              <a class="btn btn-sm btn-secondary" href="/portal" data-nav="/portal">Müşteri Portalı</a>
              <a class="btn btn-sm btn-secondary" href="/admin" data-nav="/admin">Yönetim (/admin)</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div>
            © 2026 ${escapeHtml(companyInfo.legalName)}. ${isTr ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
          </div>
          <div class="footer-bottom-links">
            <a href="/iletisim" data-nav="/iletisim">Sizi Arayalım</a>
            <a href="/teknik-bilgi" data-nav="/teknik-bilgi">SDS / TDS / COA Belge Merkezi</a>
            <a href="/portal" data-nav="/portal">Müşteri Portalı</a>
            <a href="/admin" data-nav="/admin">Yönetim Paneli</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

export function createFooter(navigate) {
  const wrapper = document.createElement('div');
  renderSafeHtml(wrapper, renderFooter('tr'));

  wrapper.querySelectorAll('a[data-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || link.getAttribute('data-nav');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        navigate(href);
      }
    });
  });

  return wrapper.firstElementChild || wrapper;
}

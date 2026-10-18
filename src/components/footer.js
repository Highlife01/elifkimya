/**
 * Elif Kimya - Kurumsal Alt Bilgi (Footer)
 */

export function renderFooter(currentLang = 'tr') {
  const isTr = currentLang === 'tr';
  const whatsappUrl = 'https://wa.me/905464992342';

  return `
    <footer class="site-footer">
      <div class="container footer-content">
        <!-- Kolon 1: Marka & Misyon -->
        <div class="footer-col brand-col">
          <a class="brand" href="#/" data-nav="/" aria-label="Elif Kimya Ana Sayfa">
            <img src="/brand-mark.svg" alt="Elif Kimya Logo" width="34" height="34" />
            <span>ELİF<span>KİMYA</span></span>
          </a>
          <p class="footer-desc">
            ${isTr 
              ? 'Adana merkezli laboratuvar ve lojistik altyapısıyla Türkiye geneline ve ihracat pazarlarına endüstriyel su şartlandırma kimyasalları ve proses sistemleri mühendisliği.' 
              : 'Engineering industrial water conditioning chemicals and process systems from Adana to all industrial regions of Turkey and international export markets.'}
          </p>
          <div class="footer-compliance">
            <span class="compliance-badge">ISO 9001:2015</span>
            <span class="compliance-badge">ISO 14001</span>
            <span class="compliance-badge">TDS & SDS</span>
          </div>
        </div>

        <!-- Kolon 2: Ürün Kategorileri -->
        <div class="footer-col">
          <h4>${isTr ? 'Ürün ve Çözümler' : 'Product Categories'}</h4>
          <ul class="footer-links">
            <li><a href="#/urunler" data-nav="/urunler">01 — Soğutma Kulesi Kimyasalları</a></li>
            <li><a href="#/sistemler" data-nav="/sistemler">02 — Endüstriyel Su Arıtma</a></li>
            <li><a href="#/sistemler" data-nav="/sistemler">03 — Saf Su & EDI Sistemleri</a></li>
            <li><a href="#/urunler" data-nav="/urunler">04 — Kazan Suyu Şartlandırma</a></li>
            <li><a href="#/urunler" data-nav="/urunler">05 — Atık Su Arıtma & Flokülant</a></li>
            <li><a href="#/urunler" data-nav="/urunler">06 — Fabrika & Proses Kimyasalları</a></li>
          </ul>
        </div>

        <!-- Kolon 3: Bölgesel Odak & Sanayi Aksı -->
        <div class="footer-col">
          <h4>${isTr ? 'Hizmet Bölgeleri' : 'Service Hubs'}</h4>
          <ul class="footer-links">
            <li><a href="#/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">Adana (AOSB & Ceyhan)</a></li>
            <li><a href="#/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">Mersin (Liman & Serbest Bölge)</a></li>
            <li><a href="#/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">İskenderun & Osmaniye Haddehaneleri</a></li>
            <li><a href="#/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">Gaziantep & Kayseri OSB</a></li>
            <li><a href="#/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">Türkiye Geneli (81 İl Lojistiği)</a></li>
            <li><a href="#/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">Global Export / Uluslararası</a></li>
          </ul>
        </div>

        <!-- Kolon 4: İletişim & B2B Destek -->
        <div class="footer-col contact-col">
          <h4>${isTr ? 'Teknik İletişim' : 'Contact & Support'}</h4>
          <p class="footer-contact-item">
            <strong>Adres:</strong> Adana · Türkiye (Sanayi ve Lojistik Merkezi)
          </p>
          <p class="footer-contact-item">
            <strong>Telefon / WhatsApp:</strong>
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="footer-tel">0546 499 23 42</a>
          </p>
          <p class="footer-contact-item">
            <strong>E-posta:</strong>
            <a href="mailto:iletisim@elifkimya.com" class="footer-mail">iletisim@elifkimya.com</a>
          </p>
          <a class="footer-admin-link" href="#/admin" data-nav="/admin">
            <span class="admin-dot"></span>
            <span>${isTr ? 'Yönetim Merkezi (Portal)' : 'Management Center'}</span>
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
              <path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="container footer-bottom">
        <div class="copy-text">
          © 2026 Elif Kimya Sanayi ve Ticaret. ${isTr ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
        </div>
        <div class="footer-meta">
          <span>KVKK Aydınlatma Metni</span>
          <span class="sep">·</span>
          <span>Gizlilik Politikası</span>
          <span class="sep">·</span>
          <a href="https://github.com/Highlife01/elifkimya" target="_blank" rel="noopener noreferrer" class="github-link">
            GitHub: Highlife01/elifkimya
          </a>
        </div>
      </div>
    </footer>

    <!-- WhatsApp Sabit Hızlı İletişim Butonu -->
    <a class="whatsapp-float" 
       href="${whatsappUrl}" 
       target="_blank" 
       rel="noopener noreferrer" 
       aria-label="WhatsApp ile Doğrudan İletişime Geç">
      <svg class="wa-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.19-.09-1.11-.55-1.28-.61-.17-.07-.3-.1-.42.1-.13.19-.49.61-.6.74-.11.13-.23.15-.42.05-.19-.09-.81-.3-1.54-.95-.57-.51-.95-1.14-1.06-1.33-.11-.19-.01-.3.08-.39.09-.08.19-.23.29-.34.09-.12.13-.19.19-.32.06-.13.03-.25-.01-.34-.05-.09-.42-1.02-.58-1.4-.15-.36-.31-.32-.42-.32h-.36c-.13 0-.32.05-.49.23-.17.19-.64.63-.64 1.53 0 .91.66 1.78.75 1.91.09.12 1.3 1.99 3.16 2.79.44.19.79.31 1.06.39.45.14.85.12 1.17.07.36-.05 1.11-.45 1.27-.89.15-.43.15-.81.11-.89-.04-.08-.17-.13-.36-.23z"/>
      </svg>
      <span class="wa-text">WhatsApp Teknik Destek</span>
    </a>
  `;
}

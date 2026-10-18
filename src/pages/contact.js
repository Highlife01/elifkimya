/**
 * Elif Kimya - İletişim ve Teknik Destek Merkezi (Contact View)
 */

export function renderContactPage(currentLang = 'tr') {
  const isTr = currentLang === 'tr';
  const whatsappUrl = 'https://wa.me/905464992342';

  return `
    <main class="page-contact">
      <div class="page-header-bar">
        <div class="container">
          <p class="kicker">BİRLİKTE ÇALIŞALIM</p>
          <h1>İletişim &<br/><span>Teknik Danışmanlık Merkezi</span></h1>
          <p class="page-lede">
            Su analizi, teknik teklif, acil kimyasal sevkiyatı veya yerinde saha ziyareti için uzman mühendislerimize doğrudan ulaşın.
          </p>
        </div>
      </div>

      <div class="container contact-body-layout">
        <!-- Sol Taraf: İletişim Kanalları & Adres -->
        <div class="contact-info-panel">
          <div class="info-card-item">
            <span class="info-icon">📍</span>
            <div>
              <h3>Genel Merkez & Lojistik</h3>
              <p>Adana · Türkiye<br/>(Organize Sanayi ve Çukurova Kimya Koridoru)</p>
            </div>
          </div>

          <div class="info-card-item">
            <span class="info-icon">📞</span>
            <div>
              <h3>Müşteri Hizmetleri & Satış</h3>
              <p><a href="tel:+905464992342" class="direct-link">0546 499 23 42</a></p>
              <small>Hafta içi 08:30 - 18:30 | Cumartesi 09:00 - 14:00</small>
            </div>
          </div>

          <div class="info-card-item">
            <span class="info-icon">💬</span>
            <div>
              <h3>WhatsApp Canlı Destek</h3>
              <p><a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="direct-link text-whatsapp">WhatsApp'tan Mesaj Gönderin →</a></p>
              <small>Teknik şartname ve su analiz raporlarınızı PDF olarak iletebilirsiniz.</small>
            </div>
          </div>

          <div class="info-card-item">
            <span class="info-icon">✉️</span>
            <div>
              <h3>Kurumsal E-posta</h3>
              <p><a href="mailto:iletisim@elifkimya.com" class="direct-link">iletisim@elifkimya.com</a></p>
              <p><a href="mailto:satis@elifkimya.com" class="direct-link">satis@elifkimya.com</a></p>
            </div>
          </div>

          <div class="emergency-support-card">
            <h4>🚨 Acil Su & Kule Müdahale Hattı</h4>
            <p>Kulelerde ani biyolojik patlama, membran tıkanması veya kazan kireç acil durumlarında 7/24 teknik nöbetçi mühendisimizle irtibata geçebilirsiniz.</p>
          </div>
        </div>

        <!-- Sağ Taraf: İletişim Mesaj Formu -->
        <div class="contact-form-panel">
          <div class="form-wrapper-box">
            <h3>Teknik Mesaj Formu</h3>
            <p class="form-sub-text">Mesajınız doğrudan teknik departmanımıza iletilir.</p>

            <form id="contactDirectForm" class="contact-styled-form" novalidate>
              <div class="form-row-2">
                <label>
                  Yetkili Adı Soyadı <span class="req">*</span>
                  <input type="text" name="name" id="contactName" placeholder="Adınız Soyadınız" required />
                </label>
                <label>
                  Firma Adı
                  <input type="text" name="company" id="contactCompany" placeholder="Firmanızın Unvanı" />
                </label>
              </div>

              <div class="form-row-2">
                <label>
                  Kurumsal E-posta <span class="req">*</span>
                  <input type="email" name="email" id="contactEmail" placeholder="ornek@firma.com" required />
                </label>
                <label>
                  Telefon Numarası <span class="req">*</span>
                  <input type="tel" name="phone" id="contactPhone" placeholder="05XX XXX XX XX" required />
                </label>
              </div>

              <label>
                Konu / İhtiyaç Alanı
                <select name="subject" id="contactSubject">
                  <option value="Teknik Ürün Bilgisi">Teknik Ürün Bilgisi & TDS Talebi</option>
                  <option value="Su Analizi ve Keşif">Ücretsiz Su Analizi & Saha Keşfi Talebi</option>
                  <option value="Soğutma Kulesi Şartlandırması">Soğutma Kulesi Şartlandırması</option>
                  <option value="Kazan Suyu Kimyasalları">Buhar Kazanı Şartlandırması</option>
                  <option value="Reverse Osmosis & Saf Su">Reverse Osmosis & Saf Su Sistemleri</option>
                  <option value="Diğer / Fason Üretim">Diğer Konular / Fason Formülasyon</option>
                </select>
              </label>

              <label>
                Mesajınız / Tesis Detayları <span class="req">*</span>
                <textarea name="message" id="contactMessage" rows="5" placeholder="Fabrikanızın su kaynağı, mevcut sorunlar veya ilgilendiğiniz kimyasallardan bahsediniz..." required></textarea>
              </label>

              <label class="consent">
                <input type="checkbox" id="contactConsent" required checked />
                <span>KVKK aydınlatma metnini okudum; iletişim ve teknik geri dönüş amacıyla verilerimin işlenmesini onaylıyorum.</span>
              </label>

              <div id="contactFormStatus" class="form-status-alert" style="display: none;"></div>

              <button type="submit" class="button button-primary" id="btnSubmitContact">
                <span>Mesajı Gönder (Firestore)</span>
                <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
                  <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>

              <p class="form-footnote">
                *Bu form Firestore <code>contactMessages</code> koleksiyonuyla entegredir; localStorage kullanılmaz.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  `;
}

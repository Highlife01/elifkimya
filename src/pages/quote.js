/**
 * Elif Kimya - Endüstriyel B2B Teklif Toplama Sihirbazı (RFQ View)
 */

import { productCategories } from '../data/products.js';

export function renderQuotePage(params = {}, currentLang = 'tr') {
  const isTr = currentLang === 'tr';
  const preCategory = params.kategori || '';
  const preProduct = params.urun || '';
  const preSystem = params.sistem || '';
  const preSector = params.sektor || '';
  const preRegion = params.bolge || '';

  return `
    <main class="page-quote">
      <div class="page-header-bar">
        <div class="container">
          <p class="kicker">B2B TEKNİK TEKLİF & ŞARTNAME SİHİRBAZI</p>
          <h1>Endüstriyel Ürün & Sistem<br/><span>Teklif Talebi (RFQ)</span></h1>
          <p class="page-lede">
            Fabrikanızın su analizi, tüketim miktarı ve proses gereksinimlerine göre en uygun kimyasal ve sistem şartlandırma teklifini 24 saat içinde hazırlıyoruz.
          </p>
          <div class="rfq-notice-box">
            <span class="lock-icon">🔒</span>
            <span>
              <strong>Gerçek Veri Güvencesi:</strong> Bu form girilen talepleri Firestore <code>quoteRequests</code> koleksiyonuna iletmek üzere doğrular; localStorage kullanılmaz.
            </span>
          </div>
        </div>
      </div>

      <div class="container rfq-wizard-container">
        <!-- İlerleme Çubuğu -->
        <div class="rfq-progress-steps">
          <div class="step-indicator active" data-step="1">
            <span class="num">1</span>
            <span class="label">Ürün & Sistem</span>
          </div>
          <div class="step-line"></div>
          <div class="step-indicator" data-step="2">
            <span class="num">2</span>
            <span class="label">Teknik Parametreler</span>
          </div>
          <div class="step-line"></div>
          <div class="step-indicator" data-step="3">
            <span class="num">3</span>
            <span class="label">Firma & Lokasyon</span>
          </div>
          <div class="step-line"></div>
          <div class="step-indicator" data-step="4">
            <span class="num">4</span>
            <span class="label">Özet & Onay</span>
          </div>
        </div>

        <!-- Form Kartı -->
        <div class="rfq-card">
          <form id="b2bQuoteForm" class="rfq-multi-form" novalidate>
            <!-- ADIM 1: ÜRÜN & SİSTEM SEÇİMİ -->
            <div class="rfq-step-pane active" data-pane="1">
              <h3>Adım 1: İhtiyaç Duyduğunuz Ürün veya Sistem Grubu</h3>
              <p class="step-help">Teklif almak istediğiniz ana kategoriyi ve spesifik çözüm alanını seçiniz.</p>

              <div class="form-grid">
                <div class="form-group full-width">
                  <label for="rfqCategory">Ana Kategori <span class="req">*</span></label>
                  <select id="rfqCategory" name="category" required>
                    <option value="">Lütfen kategori seçiniz...</option>
                    ${productCategories.map(cat => `
                      <option value="${cat.title}" ${preCategory.toLowerCase().includes(cat.id) || preCategory === cat.title ? 'selected' : ''}>
                        ${cat.code} — ${cat.title} (${cat.tag})
                      </option>
                    `).join('')}
                    <option value="Özel Tesis Şartlandırması" ${preSector ? 'selected' : ''}>
                      Özel Tesis Şartlandırması / Komple Mühendislik
                    </option>
                  </select>
                </div>

                <div class="form-group full-width">
                  <label for="rfqProductDetail">İlgilenilen Ürün / Sistem Adı veya Şartname</label>
                  <input type="text" id="rfqProductDetail" name="productDetail" 
                         placeholder="Örn: Korozyon inhibitörü, Ters Ozmoz RO ünitesi, Antiskalant, Tip I Saf Su..."
                         value="${preProduct || preSystem || (preSector ? preSector + ' Prosesi' : '')}" />
                </div>

                <div class="form-group full-width">
                  <label for="rfqPurpose">Kullanım Amacı & Tesis / Proses Alanı <span class="req">*</span></label>
                  <select id="rfqPurpose" name="purpose" required>
                    <option value="">Kullanım noktasını / tesis alanını seçiniz...</option>
                    <option value="Kağıt Fabrikası (Retansiyon C-PAM, Yağ Alkolü Köpük Kesici, Biyosit)">Kağıt Fabrikası (Retansiyon C-PAM, Köpük Kesici, Biyosit)</option>
                    <option value="Deterjan & Sülfonasyon (LABSA Ceket Soğutma, Dispersant, Scrubber)">Deterjan & Sülfonasyon (LABSA Soğutma, Dispersant, Scrubber)</option>
                    <option value="Cam Sanayi & Şişecam (Molibdat Elektrot Koruması, Rodaj Sıvısı)">Cam Sanayi & Şişecam (Molibdat Koruması, Rodaj Sıvısı, RO Durulama)</option>
                    <option value="Demir-Çelik Haddane (Pickling HCl İnhibitörü, Tufal Flokülantı 24M)">Demir-Çelik Haddane (Pickling HCl İnhibitörü, Tufal Flokülantı)</option>
                    <option value="Kalsit Mikronizasyon & Maden (Sodyum Poliakrilat Islak Öğütme)">Kalsit Mikronizasyon & Maden (Sodyum Poliakrilat Islak Öğütme)</option>
                    <option value="Metal Yüzey İşlem (Demir/Çinko Fosfatlama, Boya Kabini Çürütücü)">Metal Yüzey İşlem (Demir/Çinko Fosfatlama, Boya Çürütücü)</option>
                    <option value="Açık Soğutma Kulesi Şartlandırması (Korozyon, Kireç, Biyosit)">Açık Evaporatif Soğutma Kulesi (Korozyon, Kireç, Biyosit)</option>
                    <option value="Kapalı Devre Chiller / Isıtma Devresi">Kapalı Devre Chiller / Isıtma Devresi</option>
                    <option value="Buhar Kazanı & Kondens Hattı (DEHA, Amin, All-in-One)">Buhar Kazanı & Kondens Hattı (DEHA, Amin, All-in-One)</option>
                    <option value="Ters Ozmoz (RO) Girişi & Membran Koruma">Ters Ozmoz (RO) Girişi & Membran Koruma (Antiskalant)</option>
                    <option value="Laboratuvar / Analitik Saf Su & EDI">Laboratuvar / Analitik Saf Su (Tip I-II-III) & EDI</option>
                    <option value="Endüstriyel Atık Su Deşarjı & Çamur Susuzlaştırma (PAC, A-PAM, C-PAM)">Endüstriyel Atık Su Deşarjı & Çamur Susuzlaştırma (PAC, PAM)</option>
                    <option value="Membran CIP & Fabrika Hijyeni (pH 2 Asidik, pH 11 Alkali)">Membran CIP & Fabrika Hijyeni (pH 2 Asidik, pH 11 Alkali)</option>
                    <option value="Fabrikaya Özel Kimyasal Formülasyonu / AR-GE">Fabrikaya Özel Kimyasal Formülasyonu / AR-GE Sentez</option>
                  </select>
                </div>
              </div>

              <div class="step-nav-buttons right-only">
                <button type="button" class="button button-primary btn-next-step" data-target="2">
                  Teknik Parametrelere İlerle →
                </button>
              </div>
            </div>

            <!-- ADIM 2: TEKNİK PARAMETRELER VE KAPASİTE -->
            <div class="rfq-step-pane" data-pane="2">
              <h3>Adım 2: Teknik Kapasite ve Su Parametreleri</h3>
              <p class="step-help">Mühendislerimizin doğru dozaj ve kapasite hesabı yapabilmesi için tahmini verileri giriniz.</p>

              <div class="form-grid">
                <div class="form-group">
                  <label for="rfqSystemCapacity">Sistem Kapasitesi / Sirkülasyon Debisi</label>
                  <input type="text" id="rfqSystemCapacity" name="systemCapacity" 
                         placeholder="Örn: 50 m³/saat veya 200 m³/gün veya 10 ton buhar/saat" />
                </div>

                <div class="form-group">
                  <label for="rfqRequestedAmount">Talep Edilen Miktar / Aylık Tüketim <span class="req">*</span></label>
                  <input type="text" id="rfqRequestedAmount" name="requestedAmount" required
                         placeholder="Örn: 2 Ton/Ay, 4 Adet IBC, 1 Sistem" />
                </div>

                <div class="form-group">
                  <label for="rfqWaterSource">Ham Su Kaynağı</label>
                  <select id="rfqWaterSource" name="waterSource">
                    <option value="Kuyu Suyu (Yeraltı)">Kuyu Suyu (Yeraltı / Artezyen)</option>
                    <option value="Şebeke Suyu">Şehir Şebeke Suyu</option>
                    <option value="Yüzey Suyu (Baraj/Nehir)">Yüzey Suyu (Baraj, Göl, Nehir)</option>
                    <option value="Deniz Suyu">Deniz Suyu</option>
                    <option value="Arıtılmış Su (RO/Yumuşatılmış)">Zaten Yumuşatılmış / RO Suyu</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="rfqPackaging">Tercih Edilen Ambalaj Türü</label>
                  <select id="rfqPackaging" name="packaging">
                    <option value="1000 kg IBC Konteyner">1000 kg IBC Konteyner</option>
                    <option value="30 kg PE Bidon">30 kg PE Bidon</option>
                    <option value="25 Ton Dökme Tanker">25 Ton Dökme Tanker (ADR)</option>
                    <option value="Anahtar Teslim Sistem / Şasi">Anahtar Teslim Ekipman Şasisi</option>
                  </select>
                </div>

                <div class="form-group full-width">
                  <label for="rfqWaterReportNotes">Mevcut Su Analiz Değerleri veya İlave Notlar</label>
                  <textarea id="rfqWaterReportNotes" name="waterReportNotes" rows="3"
                            placeholder="Varsa pH, iletkenlik (µS/cm), sertlik (°Fr), silika veya mevcut sistemde yaşanan kireç/korozyon sorunlarını belirtiniz..."></textarea>
                </div>
              </div>

              <div class="step-nav-buttons">
                <button type="button" class="button button-ghost btn-prev-step" data-target="1">
                  ← Geri
                </button>
                <button type="button" class="button button-primary btn-next-step" data-target="3">
                  Firma Bilgilerine İlerle →
                </button>
              </div>
            </div>

            <!-- ADIM 3: FİRMA VE LOKASYON BİLGİLERİ -->
            <div class="rfq-step-pane" data-pane="3">
              <h3>Adım 3: Firma ve İletişim Bilgileri</h3>
              <p class="step-help">Fiyat teklifinin resmi olarak adınıza düzenlenmesi ve sevkiyat planlaması için bilgileri giriniz.</p>

              <div class="form-grid">
                <div class="form-group full-width">
                  <label for="rfqCompanyName">Firma Yasal Unvanı <span class="req">*</span></label>
                  <input type="text" id="rfqCompanyName" name="companyName" required
                         placeholder="Örn: ABC Gıda Sanayi ve Ticaret A.Ş." />
                </div>

                <div class="form-group">
                  <label for="rfqCity">Bulunduğunuz Şehir / OSB <span class="req">*</span></label>
                  <input type="text" id="rfqCity" name="city" required
                         placeholder="Örn: Adana (AOSB), Mersin, Hatay, Gaziantep..." 
                         value="${preRegion}" />
                </div>

                <div class="form-group">
                  <label for="rfqContactPerson">Yetkili Ad Soyad <span class="req">*</span></label>
                  <input type="text" id="rfqContactPerson" name="contactPerson" required
                         placeholder="Ad Soyad" />
                </div>

                <div class="form-group">
                  <label for="rfqEmail">Kurumsal E-posta <span class="req">*</span></label>
                  <input type="email" id="rfqEmail" name="email" required
                         placeholder="ad.soyad@firma.com" />
                </div>

                <div class="form-group">
                  <label for="rfqPhone">Telefon / GSM <span class="req">*</span></label>
                  <input type="tel" id="rfqPhone" name="phone" required
                         placeholder="05XX XXX XX XX" />
                </div>

                <div class="form-group full-width">
                  <label for="rfqTaxInfo">Vergi Dairesi ve Vergi No (Opsiyonel)</label>
                  <input type="text" id="rfqTaxInfo" name="taxInfo" 
                         placeholder="Resmi proforma teklif için vergi dairesi ve numarası" />
                </div>
              </div>

              <div class="step-nav-buttons">
                <button type="button" class="button button-ghost btn-prev-step" data-target="2">
                  ← Geri
                </button>
                <button type="button" class="button button-primary btn-next-step" data-target="4">
                  Özet ve Onaya İlerle →
                </button>
              </div>
            </div>

            <!-- ADIM 4: ÖZET VE GÖNDERİM -->
            <div class="rfq-step-pane" data-pane="4">
              <h3>Adım 4: Teklif Talebi Özeti ve Onay</h3>
              <p class="step-help">Bilgilerinizi kontrol edip onaylayınız. Talebiniz anında teknik ekibimize iletilecektir.</p>

              <div class="rfq-summary-card" id="rfqSummaryCard">
                <div class="summary-line">
                  <strong>Seçilen Kategori:</strong>
                  <span id="sumCategory">—</span>
                </div>
                <div class="summary-line">
                  <strong>Ürün / Sistem:</strong>
                  <span id="sumProduct">—</span>
                </div>
                <div class="summary-line">
                  <strong>Kullanım Amacı:</strong>
                  <span id="sumPurpose">—</span>
                </div>
                <div class="summary-line">
                  <strong>Talep Edilen Miktar:</strong>
                  <span id="sumAmount">—</span>
                </div>
                <div class="summary-line">
                  <strong>Firma & Şehir:</strong>
                  <span id="sumCompany">—</span>
                </div>
                <div class="summary-line">
                  <strong>İletişim:</strong>
                  <span id="sumContact">—</span>
                </div>
              </div>

              <label class="consent" style="margin: 20px 0;">
                <input type="checkbox" id="rfqKvkkConsent" required checked />
                <span>
                  6698 sayılı KVKK kapsamında firmama ait iletişim ve teknik verilerin fiyat teklifi hazırlanması ve mühendislik takibi amacıyla işlenmesini onaylıyorum.
                </span>
              </label>

              <div id="rfqStatusMessage" class="rfq-status-msg" style="display: none;"></div>

              <div class="step-nav-buttons">
                <button type="button" class="button button-ghost btn-prev-step" data-target="3">
                  ← Bilgileri Düzenle
                </button>
                <button type="submit" class="button button-primary" id="btnSubmitRfq">
                  <span>Teklif Talebini Gönder (Firestore)</span>
                  <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
                    <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>

          <!-- Başarı Ekranı (Form Gönderildikten Sonra Görünür) -->
          <div id="rfqSuccessCard" class="rfq-success-card" style="display: none;">
            <div class="success-icon">✓</div>
            <h2>Teklif Talebiniz Başarıyla Alındı!</h2>
            <p class="ref-code">Talep Takip Referansı: <strong id="rfqReferenceNo">RFQ-2026-0000</strong></p>
            <p class="success-desc">
              Teknik şartnameniz ve kimyasal gereksinimleriniz teknik mühendislerimize iletildi. 
              En geç 24 saat içinde detaylı proforma teklif e-posta adresinize ve telefonunuza ulaştırılacaktır.
            </p>

            <div class="success-actions">
              <a class="button button-primary" id="rfqWhatsAppDirectBtn" href="#" target="_blank" rel="noopener noreferrer">
                <span>💬 Aynı Talebi WhatsApp'tan Anında Bildir</span>
              </a>
              <button class="button button-ghost" id="rfqNewRequestBtn" type="button">
                Yeni Bir Teklif Talebi Oluştur
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;
}

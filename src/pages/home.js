/**
 * Elif Kimya - Ana Sayfa (Home View)
 * 5 Farklı Premium Hero Görseli & İnteraktif Görsel Seçici
 */

import { productCategories } from '../data/products.js';
import { industrialSectors } from '../data/sectors.js';
import { regionsList } from '../data/regions.js';

export const heroVisuals = [
  {
    id: 'ro',
    title: 'Ters Ozmoz & Membran',
    src: '/assets/hero-water-ro.jpg',
    tag: 'Endüstriyel Su Arıtma',
    caption: 'Reverse Osmosis ve Membran Filtrasyon Tesisi'
  },
  {
    id: 'chem-lab',
    title: 'Kimyasal Formülasyon',
    src: '/assets/hero-chemical-lab.jpg',
    tag: 'Reaktör Laboratuvarı',
    caption: 'Yüksek Teknolojili Kimyasal Sentez ve Analiz Laboratuvarı'
  },
  {
    id: 'cooling',
    title: 'Soğutma Kuleleri',
    src: '/assets/hero-cooling-towers.jpg',
    tag: 'Isı Değişim Tesisi',
    caption: 'Evaporatif Soğutma Kuleleri ve Şartlandırma Kompleksi'
  },
  {
    id: 'ultra-pure',
    title: 'Ultra Saf Su (EDI)',
    src: '/assets/hero-ultra-pure.jpg',
    tag: '18.2 MΩ·cm Saflık',
    caption: 'Elektro-deiyonizasyon (EDI) ve Analitik Saf Su Tesisi'
  },
  {
    id: 'process',
    title: 'Proses Reaktörleri',
    src: '/assets/hero-chemical.jpg',
    tag: 'Endüstriyel Üretim',
    caption: 'Endüstriyel Kimya Üretim ve Reaktör Hatları'
  }
];

export function renderHomePage(currentLang = 'tr') {
  const isTr = currentLang === 'tr';
  const defaultHeroImage = heroVisuals[0].src;
  const whatsappUrl = 'https://wa.me/905464992342';

  return `
    <main class="page-home">
      <!-- 1. BÜYÜK HERO ALANI & GÖRSEL SEÇİCİ -->
      <section class="hero" id="top" style="--hero-image: url('${defaultHeroImage}')">
        <div class="hero-grid"></div>
        <div class="container hero-content">
          <div class="eyebrow">
            <span class="pulse"></span> 
            <span>${isTr ? 'ENDÜSTRİYEL SU & PROSES ÇÖZÜMLERİ' : 'INDUSTRIAL WATER & PROCESS SOLUTIONS'}</span>
            <span class="badge-mini">B2B PARTNER</span>
          </div>

          <h1>
            ${isTr ? 'Suyun kalitesi,<br/><em>prosesin</em> güvenilirliğidir.' : 'Quality of water is the<br/><em>reliability</em> of process.'}
          </h1>

          <p class="hero-lede">
            ${isTr 
              ? 'Kağıt fabrikaları, deterjan sülfonasyon reaktörleri, Şişecam düzcam hatları, çelik haddehaneleri, kalsit mikronizasyon tesisleri, soğutma kuleleri ve ters ozmoz sistemlerinde Adana merkezli, Türkiye geneli endüstriyel kimya ve mühendislik partneriniz.'
              : 'Factory-tailored chemical solutions and water engineering for paper mills, detergent sulfonation, glass manufacturing, steel rolling mills, calcite processing, cooling towers and boilers across Turkey.'}
          </p>

          <div class="hero-actions">
            <a class="button button-primary" href="#/teklif-al" data-nav="/teklif-al">
              <span>${isTr ? 'Teklif Talebi' : 'Request RFQ'}</span>
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </a>

            <a class="text-link" href="#/urunler" data-nav="/urunler">
              <span>${isTr ? 'Çözümleri İncele' : 'Explore Solutions'}</span>
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </a>

            <a class="hero-wa-btn" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">
              <span class="wa-dot-small"></span>
              <span>${isTr ? 'WhatsApp Hızlı İletişim' : 'Instant WhatsApp'}</span>
            </a>
          </div>

          <!-- Hero Çoklu Görsel Seçici (5 Farklı Premium Görsel) -->
          <div class="hero-visual-selector-bar">
            <span class="selector-title">TESİS GÖRSELİ SEÇİN:</span>
            <div class="visual-buttons-row">
              ${heroVisuals.map((vis, idx) => `
                <button type="button" 
                        class="visual-select-btn ${idx === 0 ? 'active' : ''}" 
                        data-hero-src="${vis.src}"
                        data-hero-idx="${idx}"
                        title="${vis.caption}">
                  <span class="btn-idx">0${idx + 1}</span>
                  <span class="btn-title">${vis.title}</span>
                  <span class="btn-tag">${vis.tag}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="hero-foot">
            <span>ELİF KİMYA / 01</span>
            <span>ADANA · TÜRKİYE</span>
            <span class="hero-line"></span>
            <span>TEKNİK TEDARİK & SİSTEM ÇÖZÜMLERİ</span>
          </div>
        </div>

        <div class="hero-orbit" aria-hidden="true">
          <span class="orbit-label orbit-label-top">ANALİZ</span>
          <span class="orbit-label orbit-label-right">KONTROL</span>
          <span class="orbit-label orbit-label-bottom">SÜREKLİLİK</span>
          <span class="orbit-ring"></span>
          <span class="orbit-dot"></span>
        </div>
      </section>

      <!-- 2. METRİK VE GÜVEN ŞERİDİ -->
      <section class="metrics-banner">
        <div class="container metrics-container">
          <div class="metric-item">
            <span class="metric-num">10</span>
            <div class="metric-info">
              <strong>Endüstriyel Sektör</strong>
              <small>Kağıt, Deterjan, Şişecam, Haddehane, Kalsit, Enerji</small>
            </div>
          </div>
          <div class="metric-item">
            <span class="metric-num">06</span>
            <div class="metric-info">
              <strong>Kimya & Sistem Grubu</strong>
              <small>Soğutma, Kazan, RO, Atık Su, Saf Su, Proses</small>
            </div>
          </div>
          <div class="metric-item">
            <span class="metric-num">81</span>
            <div class="metric-info">
              <strong>İl Lojistik Sevkiyatı</strong>
              <small>Tanker, IBC ve Bidon Bazlı Hızlı Teslimat</small>
            </div>
          </div>
          <div class="metric-item">
            <span class="metric-num">24s</span>
            <div class="metric-info">
              <strong>Teknik Yanıt Süresi</strong>
              <small>Laboratuvar Jar-Test ve Reçete Desteği</small>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. ÜRÜN VE ÇÖZÜM MİMARİSİ (6 KATEGORİ) -->
      <section class="section solutions-section" id="solutions">
        <div class="container">
          <div class="section-head">
            <div>
              <p class="kicker">01 / ÇÖZÜM MİMARİSİ</p>
              <h2>Tek bir ürün değil,<br/><span>doğru kimyasal proses.</span></h2>
            </div>
            <p class="section-intro">
              Her tesisin su karakteristiği, reaktör sıcaklığı ve metalurjisi benzersizdir. Ham suyu laboratuvarda analiz eder, ihtiyaca tam uyan kimyasal şartlandırma programını kurgularız.
            </p>
          </div>

          <div class="solution-grid">
            ${productCategories.map(cat => `
              <div class="solution-card-b2b">
                <div class="card-head">
                  <span class="card-code">${cat.code}</span>
                  <span class="card-badge">${cat.tag}</span>
                </div>
                <h3>${cat.title}</h3>
                <p>${cat.shortDesc}</p>
                <ul class="subcat-list">
                  ${cat.subcategories.slice(0, 3).map(sub => `
                    <li><span class="bullet">▪</span> ${sub.name}</li>
                  `).join('')}
                </ul>
                <div class="card-footer-action">
                  <a class="card-link" href="#/urunler" data-nav="/urunler">
                    <span>Teknik Detay & TDS</span>
                    <svg viewBox="0 0 20 20" width="16" height="16">
                      <path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </a>
                  <a class="card-quote-cta" href="#/teklif-al?kategori=${cat.id}" data-nav="/teklif-al">
                    Teklif Al →
                  </a>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="section-cta-center">
            <a class="button button-dark" href="#/urunler" data-nav="/urunler">
              Tüm Ürün Kataloğunu ve TDS Belgelerini Gör →
            </a>
          </div>
        </div>
      </section>

      <!-- 4. UYGULAMA ALANLARI & SEKTÖREL ÇÖZÜMLER -->
      <section class="section applications-section" id="applications">
        <div class="container applications-layout">
          <div class="application-statement">
            <p class="kicker">02 / UYGULAMA ALANLARI</p>
            <h2>Ağır sanayiden<br/><em>yüksek teknolojiye,</em><br/>tesise özel kimya.</h2>
            <p>
              Kağıt ambalajdan deterjan sülfonasyonuna, Şişecam düzcam fırınlarından çelik haddehanelerine ve mikronize kalsit tesislerine kadar bölgesel dev sanayi kuruluşlarının proses döngüsünü şartlandırıyoruz.
            </p>
            <div class="statement-points">
              <div class="point-item">
                <strong>Kağıt Fabrikaları:</strong> C-PAM retansiyon polimeri ve yağ alkolü bazlı silikonsuz köpük kesicilerle sıfır elyaf kaybı.
              </div>
              <div class="point-item">
                <strong>Demir-Çelik Haddaneler:</strong> Mannich bazlı %20 HCl asitleme (pickling) inhibitörü ve 24M Da tufal flokülantı.
              </div>
              <div class="point-item">
                <strong>Cam Sanayi & Şişecam:</strong> Kalay elektrot ceketleri için nitritsiz molibdat inhibitörü ve sentetik rodaj soğutma sıvıları.
              </div>
              <div class="point-item">
                <strong>Deterjan & Kalsit Tesisleri:</strong> 120°C termal PBTC soğutma şartlandırması ve düşük MW sodyum poliakrilat dispersantı.
              </div>
            </div>
            <a class="button button-primary" href="#/sektorler" data-nav="/sektorler">
              10 Sektörel Çözümü İncele →
            </a>
          </div>

          <div class="application-cards-col">
            ${industrialSectors.map((sector, idx) => `
              <div class="sector-preview-card">
                <div class="sector-head">
                  <span class="sector-num">${idx < 9 ? '0' + (idx + 1) : idx + 1}</span>
                  <h4>${sector.name}</h4>
                  <span class="sector-badge">${sector.badge}</span>
                </div>
                <p>${sector.desc}</p>
                <div class="sector-chips">
                  ${sector.recommendedProducts.slice(0, 3).map(prod => `
                    <span class="chip">${prod}</span>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 5. BÖLGESEL LOJİSTİK VE SANAYİ AKSI (ADANA, MERSİN, OSB'LER) -->
      <section class="section regions-preview-section">
        <div class="container">
          <div class="section-head">
            <div>
              <p class="kicker">03 / HİZMET BÖLGELERİ</p>
              <h2>Adana'dan Türkiye'ye<br/><span>kesintisiz tedarik zinciri.</span></h2>
            </div>
            <p class="section-intro">
              Çukurova havzasında aynı gün yerinde servis; Mersin Limanı, İskenderun ağır sanayisi, Gaziantep ve Kayseri OSB hatlarına düzenli kimyasal sevkiyatı.
            </p>
          </div>

          <div class="regions-grid-preview">
            ${regionsList.slice(0, 4).map(reg => `
              <div class="region-card-summary">
                <div class="reg-priority">${reg.priority}</div>
                <h3>${reg.name}</h3>
                <p class="reg-tagline">${reg.tagline}</p>
                <div class="reg-meta">
                  <span><strong>Teslimat:</strong> ${reg.deliveryTime}</span>
                  <span><strong>Hizmet:</strong> ${reg.services[0]}</span>
                </div>
                <a class="text-link" href="#/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">
                  Bölge Detayı ve Sevkiyat Şartları →
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 6. TEKNİK GÜVEN VE LABORATUVAR METODOLOJİSİ -->
      <section class="section trust-section" id="insights">
        <div class="container trust-grid">
          <div class="trust-visual">
            <div class="technical-mark">
              <span class="mark-cross"></span>
              <span class="mark-circle"></span>
              <span class="mark-label">H₂O / ANALİZ</span>
            </div>
            <div class="trust-visual-caption">
              <span>SAHA + LABORATUVAR DOĞRULAMASI</span>
              <span>TS EN & ISO STANDARTLARI</span>
            </div>
          </div>

          <div class="trust-copy">
            <p class="kicker">04 / TEKNİK GÜVEN</p>
            <h2>Karar vermeden<br/><em>önce ölçeriz.</em></h2>
            <p>
              Teknik ekibimiz tesise gelerek su numunesini alır; pH, iletkenlik, sertlik, silika, demir, klorür ve mikrobiyal yükü tespit eder. Ezbere ürün satmak yerine veriye dayalı şartlandırma programı önerir.
            </p>

            <div class="trust-steps-horizontal">
              <div class="step-box">
                <strong class="step-num">01</strong>
                <strong>Su Analizi</strong>
                <small>Akredite test kitleri ve laboratuvar parametre tespiti.</small>
              </div>
              <div class="step-box">
                <strong class="step-num">02</strong>
                <strong>Proses Tasarımı</strong>
                <small>Sistem metalurjisine ve debisine özel kimyasal reçete.</small>
              </div>
              <div class="step-box">
                <strong class="step-num">03</strong>
                <strong>Düzenli Takip</strong>
                <small>Aylık rutin saha kontrolleri ve korozyon kuponu takibi.</small>
              </div>
            </div>

            <div class="trust-action-row">
              <a class="button button-dark" href="#/teklif-al" data-nav="/teklif-al">
                Ücretsiz Su Analizi & Teklif İste →
              </a>
              <a class="text-link" href="#/teknik-bilgi" data-nav="/teknik-bilgi">
                Teknik Bilgi & GEO Soru-Cevapları
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. HIZLI TEKLİF & İLETİŞİM ÇAĞRISI -->
      <section class="section quick-rfq-section">
        <div class="container quick-rfq-container">
          <div class="rfq-callout">
            <span class="badge-mini">HIZLI B2B ÇÖZÜM</span>
            <h2>Sisteminizin şartnamesine uygun<br/><em>fiyat teklifi hazırlayalım.</em></h2>
            <p>
              Soğutma kulesi, buhar kazanı, ters ozmoz ünitesi veya atık su deşarjı için ihtiyaç duyduğunuz kimyasalları ve sistem kapasitenizi belirtin; teknik satış mühendislerimiz 24 saat içinde detaylı teklifinizi iletsin.
            </p>
            <div class="rfq-actions">
              <a class="button button-primary" href="#/teklif-al" data-nav="/teklif-al">
                Endüstriyel Teklif Formunu Doldur →
              </a>
              <a class="button button-ghost" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">
                WhatsApp Üzerinden Hızlı Yazışma
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

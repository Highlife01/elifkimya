/**
 * Elif Kimya - Aydınlık Kurumsal Ana Sayfa (Home View)
 */

import { productCategories } from '../data/products.js';
import { regionsList } from '../data/regions.js';
import {
  megaIndustrialProcesses,
  b2bOfferPrograms,
  logisticsComparisonMatrix
} from '../data/industrial-playbook.js';
import { escapeHtml } from '../utils/security.js';

export function renderHomePage(currentLang = 'tr', liveProducts = []) {
  const isTr = currentLang === 'tr';
  const heroImage = '/assets/hero-chemical.jpg';
  const whatsappUrl = 'https://wa.me/905464992342';

  return `
    <main class="page-home">
      <!-- 1. AYDINLIK KURUMSAL BÜYÜK HERO ALANI -->
      <section class="hero hero-light" id="top" style="--hero-image: url('${heroImage}')">
        <div class="hero-grid"></div>
        <div class="container hero-layout">
          <div class="hero-content">
            <div class="eyebrow">
              <span class="pulse"></span>
              <span>${isTr ? 'ENDÜSTRİYEL SU ARITMA VE KİMYASAL ÇÖZÜMLER' : 'INDUSTRIAL WATER TREATMENT & CHEMICAL SOLUTIONS'}</span>
              <span class="badge-mini">ADANA AOSB &amp; TÜRKİYE GENELİ</span>
            </div>

            <h1>
              ${isTr
                ? 'Endüstriyel Su Arıtma ve<br/><em>Kimyasal Çözümler</em>'
                : 'Industrial Water Treatment &amp;<br/><em>Chemical Engineering</em>'}
            </h1>

            <p class="hero-slogan">
              ${isTr ? '“Suyun kalitesi, prosesin güvenilirliğidir.”' : '“Quality of water is the reliability of the process.”'}
            </p>

            <p class="hero-lede">
              ${isTr
                ? 'Demir-çelik haddehaneleri, sülfonasyon ve deterjan reaktörleri, kağıt fabrikaları, düzcam fırınları, kalsit değirmenleri ve galvaniz hatları için mikro seviyede formüle edilmiş şartlandırma kimyasalları ve anahtar teslim su arıtma sistemleri.'
                : 'Micro-engineered water conditioning formulations, high-MW flocculants, pickling inhibitors and turnkey RO/EDI water systems for heavy industrial facilities.'}
            </p>

            <div class="hero-actions">
              <a class="button button-primary" href="/teklif-al" data-nav="/teklif-al">
                <span>${isTr ? 'Teklif Talebi' : 'Request Quote'}</span>
                <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                  <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </a>

              <a class="button button-secondary-light" href="/urunler" data-nav="/urunler">
                <span>${isTr ? 'Çözümleri İncele' : 'Explore Solutions'}</span>
                <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                  <path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </a>

              <a class="hero-wa-btn" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">
                <span class="wa-dot-small"></span>
                <span>${isTr ? 'WhatsApp Mühendislik Hattı' : 'Instant Engineering WhatsApp'}</span>
              </a>
            </div>

            <div class="hero-foot">
              <span>ELİF KİMYA MÜHENDİSLİK</span>
              <span>ADANA · MERSİN · İSKENDERUN · KAYSERİ · NİĞDE</span>
              <span class="hero-line"></span>
              <span>2–4 SAATTE YERİNDE LOJİSTİK &amp; ANALİZ</span>
            </div>
          </div>

          <div class="hero-visual-card">
            <div class="hero-image-frame">
              <img src="${heroImage}" alt="Elif Kimya Endüstriyel Su Arıtma ve Kimyasal Tesis Çözümleri" />
              <div class="hero-floating-badge">
                <strong>6 Saatte</strong>
                <span>AOSB Laboratuvar Su &amp; LSI Raporu</span>
              </div>
            </div>
            <div class="hero-quick-programs">
              <div class="qp-title">FABRİKALAR İÇİN HIZLI BAŞLANGIÇ PROGRAMLARI</div>
              <a href="/teklif-al?program=korozyon-lsi-checkup" data-nav="/teklif-al?program=korozyon-lsi-checkup" class="qp-row">
                <span class="qp-num">01</span>
                <div>
                  <strong>Ücretsiz Korozyon (mpy) &amp; LSI Risk Raporu</strong>
                  <small>Sahadan 3 numune alımı ve mevcut tedarikçi performans denetimi</small>
                </div>
                <span class="qp-arrow">→</span>
              </a>
              <a href="/teklif-al?program=canli-jar-test" data-nav="/teklif-al?program=canli-jar-test" class="qp-row">
                <span class="qp-num">02</span>
                <div>
                  <strong>Fabrikanızda Canlı 6’lı Jar-Test Gösterimi</strong>
                  <small>Tufal ve atık suyunuzda saniye bazlı çöktürme karşılaştırması</small>
                </div>
                <span class="qp-arrow">→</span>
              </a>
              <a href="/teklif-al?program=pilot-30-gun" data-nav="/teklif-al?program=pilot-30-gun" class="qp-row">
                <span class="qp-num">03</span>
                <div>
                  <strong>Tali Ünitede 30 Günlük Sıfır Riskli Pilot Deneme</strong>
                  <small>&lt; 1 mpy korozyon hedefi sağlanmazsa 0 TL maliyet garantisi</small>
                </div>
                <span class="qp-arrow">→</span>
              </a>
              <a href="/teklif-al?program=vmi-konsinye-tank" data-nav="/teklif-al?program=vmi-konsinye-tank" class="qp-row">
                <span class="qp-num">04</span>
                <div>
                  <strong>VMI Konsinye Telemetrik Tank (Kullandıkça Öde)</strong>
                  <small>Ultrasonik GSM/IoT sensörlü 1000 kg tank ve otomatik ikmal</small>
                </div>
                <span class="qp-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. METRİK VE OPERASYONEL GÜVEN ŞERİDİ -->
      <section class="metrics-banner">
        <div class="container metrics-container">
          <div class="metric-item">
            <span class="metric-num">2–4s</span>
            <div class="metric-info">
              <strong>Çukurova &amp; Doğu Akdeniz Sevk</strong>
              <small>Adana, Mersin, Osmaniye, İskenderun Aynı Gün</small>
            </div>
          </div>
          <div class="metric-item">
            <span class="metric-num">&lt;0.1</span>
            <div class="metric-info">
              <strong>µS/cm Ultra Saf Su (EDI)</strong>
              <small>18.2 MΩ·cm Optik Cam &amp; Enerji Standardı</small>
            </div>
          </div>
          <div class="metric-item">
            <span class="metric-num">&gt;%98</span>
            <div class="metric-info">
              <strong>Asitleme Korozyon İnhibisyonu</strong>
              <small>HCl Banyolarında Ana Metal Kaybını Önleme</small>
            </div>
          </div>
          <div class="metric-item">
            <span class="metric-num">VMI</span>
            <div class="metric-info">
              <strong>Telemetrik Konsinye Stok</strong>
              <small>IoT Seviye Sensörlü Tank &amp; Kullandıkça Öde</small>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. BÜYÜK SANAYİ TESİSLERİ İÇİN 4 KAPI AÇICI PROGRAM -->
      <section class="section programs-section">
        <div class="container">
          <div class="section-head">
            <div>
              <p class="kicker">01 / KURUMSAL FABRİKA PENETRASYON &amp; GÜVENCE PROGRAMLARI</p>
              <h2>Tedarikçinizi değiştirmeden önce<br/><span>sahada kanıtımızı görün.</span></h2>
            </div>
            <p class="section-intro">
              Büyük ölçekli üretim tesislerinde kimyasal geçişi sıfır riskle yönetiyoruz. Önce laboratuvar verisi ve canlı Jar-Test ile kanıtlıyor, ardından 30 günlük pilot protokol ve konsinye tank modeliyle süreci güvenceye alıyoruz.
            </p>
          </div>

          <div class="programs-grid">
            ${b2bOfferPrograms.map((prog) => `
              <article class="program-card">
                <div class="program-top">
                  <span class="program-code">${escapeHtml(prog.code)}</span>
                  <span class="program-badge">${escapeHtml(prog.badge)}</span>
                </div>
                <h3>${escapeHtml(prog.title)}</h3>
                <p class="program-sub">${escapeHtml(prog.subtitle)}</p>
                <p class="program-desc">${escapeHtml(prog.description)}</p>
                <ul class="program-deliverables">
                  ${prog.deliverables.map((d) => `<li><span>✓</span> ${escapeHtml(d)}</li>`).join('')}
                </ul>
                <a class="button button-primary button-full" href="/teklif-al?program=${encodeURIComponent(prog.id)}" data-nav="/teklif-al?program=${encodeURIComponent(prog.id)}">
                  ${escapeHtml(prog.ctaLabel)} →
                </a>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 4. MİKRO SEVİYEDE SANAYİ PROSES VE FORMÜLASYON MATRİSİ -->
      <section class="section mega-sectors-section" id="applications">
        <div class="container">
          <div class="section-head">
            <div>
              <p class="kicker">02 / ÇUKUROVA &amp; DOĞU AKDENİZ MEGA SANAYİ PROSESLERİ</p>
              <h2>Fabrikanızın prosesine özel<br/><span>moleküler mühendislik.</span></h2>
            </div>
            <p class="section-intro">
              Standart ticari karışımlar yerine; haddehane tufal çukurları, ekzotermik sülfonasyon reaktörleri, kağıt kafa kutuları, float cam fırınları, kalsit değirmenleri ve galvaniz banyolarına özel etken madde ve molekül ağırlığı (MW) tasarımı.
            </p>
          </div>

          <div class="mega-process-grid">
            ${megaIndustrialProcesses.map((proc) => `
              <div class="mega-process-card">
                <div class="mp-header">
                  <span class="mp-code">${escapeHtml(proc.code)}</span>
                  <span class="mp-badge">${escapeHtml(proc.badge)}</span>
                </div>
                <h3>${escapeHtml(proc.sectorTitle)}</h3>
                <div class="mp-region">📍 ${escapeHtml(proc.regionFocus)}</div>
                <p class="mp-summary">${escapeHtml(proc.summary)}</p>
                <div class="mp-formulations">
                  ${proc.formulations.map((f) => `
                    <div class="mp-form-item">
                      <strong>${escapeHtml(f.name)}</strong>
                      <div class="mp-chem">Etken: ${escapeHtml(f.activeIngredient)}</div>
                      <div class="mp-spec">${escapeHtml(f.technicalSpecs)} · Dozaj: ${escapeHtml(f.dosage)}</div>
                    </div>
                  `).join('')}
                </div>
                <div class="mp-footer">
                  <a class="text-link" href="/sektorler" data-nav="/sektorler">Proses &amp; ROI Hesabını İncele →</a>
                  <a class="button button-small button-primary" href="/teklif-al?sektor=${encodeURIComponent(proc.id)}" data-nav="/teklif-al?sektor=${encodeURIComponent(proc.id)}">
                    Bu Prosese Teklif Al
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 5. ÜRÜN VE ÇÖZÜM MİMARİSİ (6 KATEGORİ) -->
      <section class="section solutions-section" id="solutions">
        <div class="container">
          <div class="section-head">
            <div>
              <p class="kicker">03 / ÜRÜN VE SİSTEM KATALOĞU</p>
              <h2>6 Ana Endüstriyel Grup,<br/><span>Tek Teknik Partner.</span></h2>
            </div>
            <p class="section-intro">
              Soğutma kuleleri, buhar kazanları, ters ozmoz (RO), ultra saf su (EDI), atık su flokülantları ve proses kimyasallarında TDS/SDS belgeli üretim ve tedarik.
              ${liveProducts.length > 0 ? `<br/><strong>Canlı Katalogda ${liveProducts.length} doğrulanmış ürün aktif.</strong>` : ''}
            </p>
          </div>

          <div class="solution-grid">
            ${productCategories.map((cat) => `
              <div class="solution-card-b2b">
                <div class="card-head">
                  <span class="card-code">${escapeHtml(cat.code)}</span>
                  <span class="card-badge">${escapeHtml(cat.tag)}</span>
                </div>
                <h3>${escapeHtml(cat.title)}</h3>
                <p>${escapeHtml(cat.shortDesc)}</p>
                <ul class="subcat-list">
                  ${cat.subcategories.slice(0, 4).map((sub) => `
                    <li><span class="bullet">▪</span> ${escapeHtml(sub.name)}</li>
                  `).join('')}
                </ul>
                <div class="card-footer-action">
                  <a class="card-link" href="/urunler?kategori=${encodeURIComponent(cat.id)}" data-nav="/urunler?kategori=${encodeURIComponent(cat.id)}">
                    <span>Teknik Detay &amp; TDS</span>
                  </a>
                  <a class="card-quote-cta" href="/teklif-al?kategori=${encodeURIComponent(cat.id)}" data-nav="/teklif-al?kategori=${encodeURIComponent(cat.id)}">
                    Teklif İste →
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 6. LOJİSTİK ÜSTÜNLÜK TABLOSU (ADANA AOSB VS MARMARA RAKİPLERİ) -->
      <section class="section logistics-advantage-section">
        <div class="container">
          <div class="section-head">
            <div>
              <p class="kicker">04 / BÖLGESEL LOJİSTİK VE MÜHENDİSLİK ÜSTÜNLÜĞÜ</p>
              <h2>Marmara’dan kamyon beklemeyin;<br/><span>Adana merkezden 2 saatte deponuzdayız.</span></h2>
            </div>
            <p class="section-intro">
              Çukurova, İskenderun Körfezi, Kayseri ve Niğde sanayi havzasındaki tesisler için şehir dışı tedarikçilerin navlun maliyetini ve kış/geçit duruş riskini ortadan kaldırıyoruz.
            </p>
          </div>

          <div class="comparison-table-wrap">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>Operasyonel Kriter</th>
                  <th>İstanbul / Kocaeli / Gebze Tedarikçisi</th>
                  <th class="highlight-col">Elif Kimya (Adana AOSB &amp; Bölge Lojistiği)</th>
                </tr>
              </thead>
              <tbody>
                ${logisticsComparisonMatrix.map((row) => `
                  <tr>
                    <td><strong>${escapeHtml(row.criterion)}</strong></td>
                    <td class="muted-cell">${escapeHtml(row.marmaraCompetitor)}</td>
                    <td class="highlight-cell"><strong>✓ ${escapeHtml(row.elifKimyaAdvantage)}</strong></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="regions-grid-preview" style="margin-top:36px;">
            ${regionsList.slice(0, 4).map((reg) => `
              <div class="region-card-summary">
                <div class="reg-priority">${escapeHtml(reg.priority)}</div>
                <h3>${escapeHtml(reg.name)}</h3>
                <p class="reg-tagline">${escapeHtml(reg.tagline)}</p>
                <div class="reg-meta">
                  <span><strong>Teslimat:</strong> ${escapeHtml(reg.deliveryTime)}</span>
                </div>
                <a class="text-link" href="/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">
                  OSB Sevkiyat &amp; Hizmet Detayı →
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 7. HIZLI TEKLİF & SAHA MÜHENDİSLİĞİ ÇAĞRISI -->
      <section class="section quick-rfq-section">
        <div class="container quick-rfq-container">
          <div class="rfq-callout">
            <span class="badge-mini">B2B TEKNİK TEKLİF &amp; SAHA DENETİMİ</span>
            <h2>Tesisinizin yıllık kimyasal, enerji ve su maliyetini<br/><em>birlikte düşürelim.</em></h2>
            <p>
              Ücretsiz Korozyon &amp; LSI Risk Raporu, fabrikanızda canlı 6’lı Jar-Test gösterimi, 30 günlük sıfır riskli pilot deneme veya doğrudan kurumsal ihale/fiyat teklifi için mühendislik ekibimizle iletişime geçin.
            </p>
            <div class="rfq-actions">
              <a class="button button-primary" href="/teklif-al" data-nav="/teklif-al">
                Kurumsal Teklif &amp; Numune Formu →
              </a>
              <a class="button button-secondary-light" href="/sektorler" data-nav="/sektorler">
                Canlı ROI &amp; Tasarruf Simülatörü
              </a>
              <a class="button button-ghost-dark" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">
                WhatsApp: 0546 499 23 42
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

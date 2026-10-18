/**
 * Elif Kimya - Sektörel Çözümler & Uygulama Alanları (Sectors View)
 * Ağır Sanayi, Kağıt, Deterjan, Cam/Şişecam, Haddehane ve Maden Tesisleri
 */

import { industrialSectors, sectorCategories } from '../data/sectors.js';

export function renderSectorsPage(currentLang = 'tr') {
  const isTr = currentLang === 'tr';

  return `
    <main class="page-sectors">
      <div class="page-header-bar">
        <div class="container">
          <p class="kicker">ENDÜSTRİYEL UYGULAMA ALANLARI</p>
          <h1>Fabrikanızın İhtiyaçlarına Özel<br/><span>Kimyasal & Proses Çözümleri</span></h1>
          <p class="page-lede">
            Kağıt fabrikalarından deterjan sülfonasyon hatlarına, Şişecam düzcam fırınlarından çelik haddehanelerine ve mikronize kalsit tesislerine kadar bölgesel ve ulusal sanayinin su, ısı transferi ve kimyasal proses dinamiklerini yönetiyoruz.
          </p>

          <!-- Sektörel Kategori Filtre Butonları -->
          <div class="sector-filter-bar">
            ${sectorCategories.map((cat, idx) => `
              <button class="sector-filter-tab ${idx === 0 ? 'active' : ''}" data-sector-cat="${cat.id}">
                ${cat.name}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="container sectors-body">
        <div class="sectors-detailed-list" id="sectorsListContainer">
          ${industrialSectors.map((sec, idx) => `
            <div class="sector-full-card" id="${sec.id}" data-sector-category="${sec.category}">
              <div class="sec-side-header">
                <div class="sec-index-row">
                  <span class="sec-index">${idx < 9 ? '0' + (idx + 1) : idx + 1}</span>
                  <span class="sec-badge">${sec.badge}</span>
                </div>
                <h2>${sec.name}</h2>
                <div class="sec-target-plants">
                  <strong>Hedef Tesisler & Havzalar:</strong>
                  <span>${sec.targetPlants}</span>
                </div>
                <p class="sec-summary">${sec.desc}</p>

                <!-- Etken Kimyasallar -->
                <div class="sec-key-chemicals">
                  <small>KULLANILAN ETKEN KİMYASALLAR:</small>
                  <div class="chem-tags-list">
                    ${sec.keyChemicals.map(chem => `<span class="chem-tag">⚗️ ${chem}</span>`).join('')}
                  </div>
                </div>

                <div class="sec-header-action">
                  <a class="button button-small button-primary" 
                     href="#/teklif-al?sektor=${encodeURIComponent(sec.name)}" 
                     data-nav="/teklif-al">
                    Bu Tesis İçin Teklif Al →
                  </a>
                </div>
              </div>

              <div class="sec-side-content">
                <div class="analysis-box challenges">
                  <h4>
                    <span class="icon">⚠️</span> Sektörel Kritik Zorluklar & Riskler
                  </h4>
                  <ul>
                    ${sec.challenges.map(ch => `<li>${ch}</li>`).join('')}
                  </ul>
                </div>

                <div class="analysis-box solutions">
                  <h4>
                    <span class="icon">✓</span> Elif Kimya Mühendislik ve Kimyasal Çözümü
                  </h4>
                  <ul>
                    ${sec.solutions.map(sol => `<li>${sol}</li>`).join('')}
                  </ul>
                </div>

                <div class="recommended-strip">
                  <strong>Önerilen Formülasyonlar & Teknik Ürünler:</strong>
                  <div class="chips-container">
                    ${sec.recommendedProducts.map(p => `
                      <a class="rec-chip" 
                         href="#/urunler" 
                         data-nav="/urunler" 
                         title="Ürün detayını gör">
                        ${p}
                      </a>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="sector-consult-banner">
          <div class="banner-text">
            <h3>Fabrikanız için yerinde su denetimi ve Jar-Test ister misiniz?</h3>
            <p>Laboratuvar ekibimiz fabrikanıza gelerek suyunuzu ve prosesinizi analiz eder, tesisinize özel kimyasal şartlandırma reçetesini ve tasarruf fizibilitesini ücretsiz hazırlar.</p>
          </div>
          <div class="banner-actions">
            <a class="button button-dark" href="#/iletisim" data-nav="/iletisim">
              Ücretsiz Saha Analizi Talep Et →
            </a>
            <a class="button button-ghost" href="https://wa.me/905464992342" target="_blank" rel="noopener noreferrer">
              WhatsApp Hızlı Danışma
            </a>
          </div>
        </div>
      </div>
    </main>
  `;
}

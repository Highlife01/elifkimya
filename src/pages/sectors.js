/**
 * Elif Kimya - Sektörel Çözümler & Uygulama Alanları (Sectors View)
 */

import { industrialSectors } from '../data/sectors.js';

export function renderSectorsPage(currentLang = 'tr') {
  const isTr = currentLang === 'tr';

  return `
    <main class="page-sectors">
      <div class="page-header-bar">
        <div class="container">
          <p class="kicker">ENDÜSTRİYEL UYGULAMA ALANLARI</p>
          <h1>Sektörünüze Özel<br/><span>Proses ve Kimyasal Çözümleri</span></h1>
          <p class="page-lede">
            Farklı endüstrilerin su kullanım noktalarını, ısı transfer dinamiklerini ve deşarj mevzuatlarını çok iyi biliyoruz. Tesisinizin operasyonel sürekliliğini koruyan terzi işi kimyasal şartlandırma programları sunuyoruz.
          </p>
        </div>
      </div>

      <div class="container sectors-body">
        <div class="sectors-detailed-list">
          ${industrialSectors.map((sec, idx) => `
            <div class="sector-full-card" id="${sec.id}">
              <div class="sec-side-header">
                <span class="sec-index">0${idx + 1}</span>
                <span class="sec-badge">${sec.badge}</span>
                <h2>${sec.name}</h2>
                <p class="sec-summary">${sec.desc}</p>
                <a class="button button-small button-primary" 
                   href="#/teklif-al?sektor=${encodeURIComponent(sec.name)}" 
                   data-nav="/teklif-al">
                  Bu Sektör İçin Teklif Al →
                </a>
              </div>

              <div class="sec-side-content">
                <div class="analysis-box challenges">
                  <h4>
                    <span class="icon">⚠️</span> Sektörel Kritik Zorluklar
                  </h4>
                  <ul>
                    ${sec.challenges.map(ch => `<li>${ch}</li>`).join('')}
                  </ul>
                </div>

                <div class="analysis-box solutions">
                  <h4>
                    <span class="icon">✓</span> Elif Kimya Mühendislik Çözümü
                  </h4>
                  <ul>
                    ${sec.solutions.map(sol => `<li>${sol}</li>`).join('')}
                  </ul>
                </div>

                <div class="recommended-strip">
                  <strong>Önerilen Kimyasal & Sistemler:</strong>
                  <div class="chips-container">
                    ${sec.recommendedProducts.map(p => `<span class="rec-chip">${p}</span>`).join('')}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="sector-consult-banner">
          <div class="banner-text">
            <h3>Sektörünüz listede yer almıyor mu?</h3>
            <p>Laboratuvar ekibimiz fabrikanıza gelerek suyunuzu analiz eder ve tesisinize özel kimyasal şartlandırma reçetesi geliştirir.</p>
          </div>
          <a class="button button-dark" href="#/iletisim" data-nav="/iletisim">
            Teknik Danışmanlık Alın →
          </a>
        </div>
      </div>
    </main>
  `;
}

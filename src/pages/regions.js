/**
 * Elif Kimya - Hizmet Bölgeleri & Lojistik Ağı (Regions View)
 */

import { regionsList } from '../data/regions.js';

export function renderRegionsPage(currentLang = 'tr') {
  const isTr = currentLang === 'tr';

  return `
    <main class="page-regions">
      <div class="page-header-bar">
        <div class="container">
          <p class="kicker">LOJİSTİK VE SAHA SERVİS AĞI</p>
          <h1>Adana Merkezli Bölgesel Güç,<br/><span>Türkiye Geneli ve İhracat Pazarları</span></h1>
          <p class="page-lede">
            Çukurova sanayisine dakikalar içinde acil müdahale; organize sanayi bölgelerine, limanlara ve ağır sanayi tesislerine ADR belgeli güvenli kimyasal sevkiyatı.
          </p>
        </div>
      </div>

      <div class="container regions-body">
        <div class="regions-accordion-list">
          ${regionsList.map((reg, idx) => `
            <div class="region-detail-block" id="${reg.id}">
              <div class="reg-head">
                <div>
                  <span class="reg-priority-tag">${reg.priority}</span>
                  <h2>${reg.name}</h2>
                  <p class="reg-main-tagline">${reg.tagline}</p>
                </div>
                <div class="reg-badge-box">
                  <span class="delivery-time-badge">⏱ ${reg.deliveryTime}</span>
                  <span class="hub-badge">${reg.badge}</span>
                </div>
              </div>

              <div class="reg-content-grid">
                <div class="reg-col">
                  <h4>Kapsanan Organize Sanayi Bölgeleri</h4>
                  <ul class="reg-zones-list">
                    ${reg.industrialZones.map(zone => `<li><span>🏢</span> ${zone}</li>`).join('')}
                  </ul>
                </div>

                <div class="reg-col">
                  <h4>Öne Çıkan Bölgesel Hizmetler</h4>
                  <ul class="reg-services-list">
                    ${reg.services.map(srv => `<li><span>✓</span> ${srv}</li>`).join('')}
                  </ul>
                </div>

                <div class="reg-col contact-col-card">
                  <h4>Bölgesel Sevkiyat ve İletişim</h4>
                  <p class="reg-contact-line">${reg.contactPerson}</p>
                  <p class="reg-seo-keywords">
                    <small>Bölgesel Arama Odakları:</small><br/>
                    ${reg.targetQueries.join(' · ')}
                  </p>
                  <a class="button button-small button-primary" 
                     href="#/teklif-al?bolge=${encodeURIComponent(reg.name)}" 
                     data-nav="/teklif-al">
                    Bu Bölge İçin Teklif İste →
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="regions-fleet-info">
          <h3>Lojistik & Sevkiyat Standartlarımız</h3>
          <div class="fleet-features">
            <div class="fleet-feat">
              <strong>ADR Belgeli Sevkiyat:</strong> Tehlikeli madde taşıma standartlarına uygun, onaylı sürücüler ve araç filosu.
            </div>
            <div class="fleet-feat">
              <strong>Ambalaj Çeşitliliği:</strong> 30 kg PE bidon, 1000 kg IBC konteyner veya 25 tonluk izolasyonlu paslanmaz tankerler.
            </div>
            <div class="fleet-feat">
              <strong>Numune ve Analiz:</strong> Sevkiyat öncesi her partiye ait COA (Analiz Sertifikası) dijital ve ıslak imzalı iletilir.
            </div>
          </div>
        </div>
      </div>
    </main>
  `;
}

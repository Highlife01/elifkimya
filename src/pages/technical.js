/**
 * Elif Kimya - Teknik Bilgi Kütüphanesi & Yapay Zeka Görünürlüğü (GEO)
 */

import { geoFaqList } from '../data/geo-faq.js';

export function renderTechnicalPage(currentLang = 'tr') {
  const isTr = currentLang === 'tr';

  return `
    <main class="page-technical">
      <div class="page-header-bar">
        <div class="container">
          <p class="kicker">MÜHENDİSLİK & GEO BİLGİ BANKASI</p>
          <h1>Endüstriyel Su Şartlandırma<br/><span>Teknik Rehber & SSS</span></h1>
          <p class="page-lede">
            Soğutma kulesi korozyon kontrolü, buhar kazanı besi suyu şartlandırması, membran antiskalant kimyası ve saf su standartlarına dair kaynaklandırılmış mühendislik dokümantasyonu.
          </p>
        </div>
      </div>

      <div class="container technical-body">
        <!-- 7 Teknik GEO Soru-Cevap Akordiyonu -->
        <section class="geo-faq-section">
          <div class="faq-header-line">
            <h3>Sık Sorulan Teknik Sorular ve Mühendislik Cevapları</h3>
            <span class="faq-count">${geoFaqList.length} Teknik Başlık</span>
          </div>

          <div class="faq-accordion-container" id="faqAccordion">
            ${geoFaqList.map((item, idx) => `
              <div class="faq-card" data-faq-id="${item.id}">
                <button class="faq-question-btn" type="button" aria-expanded="${idx === 0 ? 'true' : 'false'}">
                  <span class="faq-idx">0${idx + 1}</span>
                  <span class="faq-q-text">${item.question}</span>
                  <span class="faq-category-tag">${item.category}</span>
                  <span class="faq-chevron">▾</span>
                </button>
                <div class="faq-answer-drawer ${idx === 0 ? 'is-open' : ''}">
                  <div class="short-highlight">
                    <strong>Özet:</strong> ${item.shortAnswer}
                  </div>
                  <div class="detailed-text">
                    ${item.detailedAnswer.replace(/\n/g, '<br/>')}
                  </div>
                  <div class="faq-tags-line">
                    <small>Anahtar Terimler:</small>
                    ${item.tags.map(t => `<span class="faq-tag">#${t}</span>`).join(' ')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Teknik Terimler ve İndeksler Sözlüğü -->
        <section class="glossary-section">
          <h3>Mühendislik Terimleri Sözlüğü</h3>
          <div class="glossary-grid">
            <div class="glossary-item">
              <strong>LSI (Langelier Doygunluk İndeksi)</strong>
              <p>Suyun kalsiyum karbonat çöktürme (kışır) veya korozyon yapma eğilimini gösteren pH bazlı termodinamik denge formülü.</p>
            </div>
            <div class="glossary-item">
              <strong>SDI (Silt Yoğunluk İndeksi)</strong>
              <p>Suyun askıda katı ve kolloidal kirlilik seviyesini ölçen ve ters ozmoz membranlarının tıkanma riskini belirleyen 0.45 mikronluk test parametresi.</p>
            </div>
            <div class="glossary-item">
              <strong>TOC (Toplam Organik Karbon)</strong>
              <p>Ultra saf su ve laboratuvar sularında organik kirleticilerin ppb (milyarda bir) seviyesinde hassas saflık ölçütü.</p>
            </div>
            <div class="glossary-item">
              <strong>MΩ·cm (Direnç Değeri)</strong>
              <p>25°C'de saf suyun elektriksel direncidir. 18.2 MΩ·cm teorik olarak en yüksek saflıktaki Tip I ultra saf suya karşılık gelir.</p>
            </div>
          </div>
        </section>

        <!-- Su Analizi Rapor Talep Bannerı -->
        <div class="analysis-cta-banner">
          <div class="cta-inner">
            <h3>Tesisinizin Su Analiz Raporunu Birlikte Yorumlayalım</h3>
            <p>Elinizdeki kuyu veya ham su analizini bize gönderin; uzman kimya mühendislerimiz LSI hesabı yaparak hangi kimyasal programın gerekli olduğunu raporlasın.</p>
            <a class="button button-primary" href="#/teklif-al?konu=su-analiz-yorumlama" data-nav="/teklif-al">
              Analiz Raporu Gönder & Danış →
            </a>
          </div>
        </div>
      </div>
    </main>
  `;
}

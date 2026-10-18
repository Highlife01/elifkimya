/**
 * Elif Kimya - Ürün Kataloğu & Teknik Şartnameler (Products View)
 */

import { productCategories } from '../data/products.js';

export function renderProductsPage(activeCategoryFilter = 'all', currentLang = 'tr') {
  const isTr = currentLang === 'tr';

  return `
    <main class="page-products">
      <div class="page-header-bar">
        <div class="container">
          <p class="kicker">ÜRÜN VE HİZMET MİMARİSİ</p>
          <h1>Endüstriyel Kimyasallar &<br/><span>Teknik Çözüm Kataloğu</span></h1>
          <p class="page-lede">
            Fabrikanızın su arıtma, soğutma, buhar ve proses sistemlerinde kullanılan, TDS (Teknik Veri Föyü) ve SDS (Güvenlik Bilgi Formu) onaylı kimyasallar ve mühendislik ekipmanları.
          </p>

          <!-- Filtreleme Butonları -->
          <div class="catalog-filter-bar">
            <button class="filter-tab ${activeCategoryFilter === 'all' ? 'active' : ''}" data-cat-filter="all">
              Tümü (06 Kategori)
            </button>
            ${productCategories.map(cat => `
              <button class="filter-tab ${activeCategoryFilter === cat.id ? 'active' : ''}" data-cat-filter="${cat.id}">
                ${cat.code} — ${cat.title}
              </button>
            `).join('')}
          </div>

          <!-- Arama Kutusu -->
          <div class="catalog-search-wrapper">
            <div class="search-box">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" id="productSearchInput" placeholder="Ürün adı, etken madde veya teknik özellik ara..." />
            </div>
            <div class="search-tip">
              *Tüm ürünler ADR standartlarında ambalajlı (30kg bidon, 1000kg IBC veya dökme tanker) sevk edilir.
            </div>
          </div>
        </div>
      </div>

      <div class="container catalog-body">
        <div class="categories-list-container" id="productsCatalogContainer">
          ${productCategories
            .filter(cat => activeCategoryFilter === 'all' || activeCategoryFilter === cat.id)
            .map(cat => `
              <div class="category-block" data-category-id="${cat.id}">
                <div class="category-header">
                  <div class="cat-code-badge">${cat.code}</div>
                  <div>
                    <h2>${cat.title}</h2>
                    <p class="cat-sub-desc">${cat.shortDesc}</p>
                  </div>
                  <span class="cat-tag-pill">${cat.tag}</span>
                </div>

                <div class="subcategories-grid">
                  ${cat.subcategories.map(sub => `
                    <div class="product-item-card" data-product-name="${sub.name.toLowerCase()}">
                      <div class="item-head">
                        <h3>${sub.name}</h3>
                        <span class="badge-tds">TDS Hazır</span>
                      </div>
                      <p class="item-desc">${sub.desc}</p>
                      
                      <div class="item-specs">
                        <strong>Teknik Parametreler & Ambalaj:</strong>
                        <ul>
                          ${sub.specs.map(spec => `<li><span>✓</span> ${spec}</li>`).join('')}
                        </ul>
                      </div>

                      <div class="item-actions">
                        <button class="button button-small button-ghost btn-tds-request" 
                                data-product="${sub.name}" 
                                data-category="${cat.title}">
                          TDS / Şartname İste
                        </button>
                        <a class="button button-small button-primary btn-quote-redirect" 
                           href="#/teklif-al?urun=${encodeURIComponent(sub.name)}&kategori=${encodeURIComponent(cat.title)}" 
                           data-nav="/teklif-al">
                          Teklif İste →
                        </a>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
        </div>
      </div>

      <!-- TDS Talep Modalı -->
      <div class="modal-overlay" id="tdsModal" style="display: none;">
        <div class="modal-card">
          <div class="modal-header">
            <h3>Teknik Veri Föyü (TDS & SDS) Talebi</h3>
            <button class="modal-close" id="tdsModalClose" aria-label="Kapat">&times;</button>
          </div>
          <div class="modal-body">
            <p>Seçilen Ürün: <strong id="tdsSelectedProduct">—</strong></p>
            <form id="tdsRequestForm">
              <label>
                Firma Adı
                <input type="text" id="tdsCompany" placeholder="Firmanızın yasal unvanı" required />
              </label>
              <label>
                Yetkili E-posta (Şartname Gönderilecek)
                <input type="email" id="tdsEmail" placeholder="ad@firma.com" required />
              </label>
              <label>
                Telefon Numarası
                <input type="tel" id="tdsPhone" placeholder="05XX XXX XX XX" required />
              </label>
              <label class="consent">
                <input type="checkbox" required checked /> 
                Teknik dokümanların e-posta adresime iletilmesini onaylıyorum.
              </label>
              <button type="submit" class="button button-primary" style="width: 100%; margin-top: 10px;">
                TDS & SDS Dokümanını Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  `;
}

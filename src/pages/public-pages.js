import {
  companyInfo,
  productCategories,
  waterTreatmentSystems,
  fieldServices,
  sectorsData,
  serviceRegions,
  faqItems,
  geoKnowledgeArticles
} from '../data/products.js';
import {
  MEGA_INDUSTRIAL_SECTORS,
  B2B_OFFER_PROGRAMS,
  DECISION_MAKER_MATRIX,
  LOGISTICS_COMPARISON_MATRIX,
  calculatePicklingInhibitorRoi,
  calculateSludgePolymerRoi,
  calculateBoilerScaleRoi
} from '../data/industrial-playbook.js';
import {
  fetchPublicProducts,
  fetchPublicDocuments,
  submitPublicCrmForm,
  submitContactMessage,
  convertMassVolumeUnit
} from '../firebase.js';
import { showNotification } from '../components/notification.js';
import { escapeHtml, escapeAttr, renderSafeHtml } from '../utils/security.js';
import { fold, t, withLanguageSearch } from '../utils/i18n.js';
import { REGION_SLUGS } from './seo-landings.js';
import { bindMedipureCatalog, renderMedipureCatalog } from '../components/medipure-catalog.js';
import { TECHNICAL_BLOG_CATEGORIES, TECHNICAL_BLOG_POSTS } from '../data/technical-blog.js';

function attachSpaLinks(container, navigate) {
  container.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        navigate(href);
      }
    });
  });
}

/* ==========================================================================
   1. KİMYASAL ÜRÜNLER SAYFASI (/urunler)
   ========================================================================== */
export async function renderProductsPage(container, navigate) {
  const categoryImages = [
    '/assets/cat-cooling.jpg',
    '/assets/cat-boiler.jpg',
    '/assets/cat-ro-membrane.jpg',
    '/assets/cat-water-systems.jpg',
    '/assets/cat-acids.jpg',
    '/assets/cat-coagulants.jpg',
    '/assets/cat-caustic.jpg'
  ];
  const categoryEmojis = ['💧', '🌋', '⚙️', '🔬', '🔥', '♻️', '🏭'];

  const html = `
    <section class="hero-bg border-b border-slate-200/80 py-16 text-slate-900 sm:py-20">
      <div class="container-x">
        <p class="chip mb-3">Tam Katalog</p>
        <h1 class="font-display text-4xl font-black text-slate-900 sm:text-5xl">Ürün Yelpazesi ve Teknik Formülasyonlar</h1>
        <p class="mt-4 max-w-2xl text-slate-600 text-base sm:text-lg leading-relaxed">
          Toptan, kurumsal ve endüstriyel tesisler için spesifikasyona göre üretilir — her hatta bidon, 1000 kg IBC ve dökme tanker seçeneği.
        </p>
      </div>
    </section>

    <section class="section bg-white" style="padding-top:0;padding-bottom:0;">
      <div class="container-x">
        <a href="/sistemler#medipure-katalog" data-nav class="group flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5 hover:border-emerald-500">
          <div>
            <p class="text-xs font-black uppercase tracking-wider text-emerald-800">Medipure cihaz vitrini</p>
            <p class="mt-1 font-display text-lg font-extrabold text-slate-900">163 saf su ve ultra saf su modeli, kapasite ve liste fiyatıyla</p>
          </div>
          <span class="text-sm font-extrabold text-emerald-800 group-hover:translate-x-1 transition">Kataloğu aç →</span>
        </a>
      </div>
    </section>

    <section class="section bg-slate-50/60" style="padding-bottom:2rem;">
      <div class="container-x">
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          ${productCategories.map((cat, idx) => `
            <a href="/urunler/${escapeAttr(cat.id)}" data-nav class="group relative rounded-3xl border border-slate-200/80 bg-white p-4 shadow-card hover:shadow-card-hover hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div>
                <div class="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100">
                  <img src="${escapeAttr(categoryImages[idx % categoryImages.length])}" alt="${escapeAttr(cat.title)}" width="1200" height="896" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                  <span class="absolute top-3 left-3 text-2xl drop-shadow-sm">${categoryEmojis[idx % categoryEmojis.length]}</span>
                  <span class="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-emerald-800 border border-emerald-200/80 shadow-xs">${escapeHtml(cat.shortTitle)}</span>
                </div>
                <div class="pt-4 px-1">
                  <h3 class="font-display text-base font-bold text-slate-900 group-hover:text-brand-green transition">${escapeHtml(cat.title)}</h3>
                  <p class="mt-1.5 text-xs leading-relaxed text-slate-600 line-clamp-2">${escapeHtml(cat.description)}</p>
                </div>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-100 px-1 flex items-center justify-between text-xs font-bold text-brand-green">
                <span>Teknik Spesifikasyonlar</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section bg-white" style="padding-top:2.5rem;">
      <div class="container-x">
        <!-- Arama ve Kategori Filtre Barı -->
        <div class="catalog-toolbar">
          <div class="search-input-wrap">
            <input type="search" id="product-search-input" class="form-input" placeholder="${escapeAttr(t('search_products'))}" aria-label="${escapeAttr(t('search_products'))}" />
          </div>
          <div class="filter-pills" id="product-category-pills">
            <button type="button" class="filter-pill active" data-cat="all">${escapeHtml(t('all_product_groups'))}</button>
            ${productCategories.map((c) => `
              <button type="button" class="filter-pill" data-cat="${escapeAttr(c.id)}">${escapeHtml(c.shortTitle)}</button>
            `).join('')}
          </div>
        </div>

        <!-- Canlı Sunucu Ürünleri Durumu -->
        <div id="live-products-section" style="margin-bottom:2rem;">
          <div class="loading-banner">Doğrulanmış ürün kataloğu yükleniyor...</div>
        </div>

        <!-- Doğrulanmış Yoğunluklu Birim Dönüştürücü (kg <-> litre) -->
        <div class="density-converter-card">
          <div class="density-converter-header">
            <div>
              <span class="section-tag">Mühendislik Aracı</span>
              <h3>Doğrulanmış Yoğunluklu Birim Dönüşüm Hesaplayıcı (kg ↔ litre)</h3>
              <p>Sıvı kimyasallarda <strong>kg</strong> ile <strong>litre</strong> arasında dönüşüm yalnızca ürünün TDS/SDS belgesindeki doğrulanmış özgül ağırlık (yoğunluk) değeri girildiğinde yapılır.</p>
            </div>
          </div>
          <div class="density-converter-grid">
            <div class="form-group">
              <label class="form-label" for="conv-amount">Miktar</label>
              <input type="number" id="conv-amount" class="form-input" value="1000" min="0" step="0.01" />
            </div>
            <div class="form-group">
              <label class="form-label" for="conv-from">Mevcut Birim</label>
              <select id="conv-from" class="form-select">
                <option value="kg">Kilogram (kg)</option>
                <option value="litre">Litre (L)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="conv-to">Hedef Birim</label>
              <select id="conv-to" class="form-select">
                <option value="litre">Litre (L)</option>
                <option value="kg">Kilogram (kg)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="conv-density">Doğrulanmış Yoğunluk (kg/L veya g/cm³)</label>
              <input type="number" id="conv-density" class="form-input" placeholder="Örn: 1.32 (TDS'den girin)" min="0.1" max="5" step="0.001" />
            </div>
            <div class="form-group" style="display:flex;align-items:flex-end;">
              <button type="button" id="conv-calc-btn" class="btn btn-primary" style="width:100%;">Hesapla</button>
            </div>
          </div>
          <div id="conv-result-box" class="density-result-box">
            Yoğunluk bilgisi girilmeden kütle-hacim dönüşümü yapılmaz. Örneğin %32 HCl için ~1.16 kg/L, %48 Sıvı Kostik için ~1.50 kg/L değerini ürün TDS formundan doğrulayarak giriniz.
          </div>
        </div>

        <!-- Teknik Ürün Grupları Matrisi -->
        <div class="section-header" style="margin-top:3rem;">
          <span class="section-tag">Endüstriyel Ürün Grupları</span>
          <h2 class="section-title">Teknik Kimyasal Kategorilerimiz</h2>
          <p class="section-desc">Fiyatlandırma; talep edilen ambalaj tipi (25 kg bidon, 200 kg varil, 1000 kg IBC veya dökme tanker), saflık derecesi ve teslimat noktasına göre belirlenir.</p>
        </div>

        <div class="categories-detailed-list" id="static-categories-list">
          ${productCategories.map((cat, idx) => `
            <div class="category-detail-card" data-category-id="${escapeAttr(cat.id)}" id="${escapeAttr(cat.slug)}">
              <div class="category-detail-head" style="display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;">
                <div style="display:flex;align-items:center;gap:1.25rem;flex:1;min-width:280px;">
                  <img src="${escapeAttr(categoryImages[idx % categoryImages.length])}" alt="${escapeAttr(cat.title)}" width="140" height="96" loading="lazy" style="width:140px;height:96px;object-fit:cover;border-radius:14px;border:2px solid #cbd5e1;flex-shrink:0;" />
                  <div>
                    <span class="sector-region-pill">${escapeHtml(cat.shortTitle)}</span>
                    <h2>${escapeHtml(cat.title)}</h2>
                    <p>${escapeHtml(cat.description)}</p>
                  </div>
                </div>
                <a href="/teklif-al?product=${encodeURIComponent(cat.title)}" class="btn btn-primary" data-nav>
                  Teklif İste
                </a>
              </div>
              <div class="products-table-wrapper">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Ticari / Teknik Ürün Adı</th>
                      <th>Proses Uygulama ve Teknik Özellik</th>
                      <th>Ambalaj Seçenekleri</th>
                      <th>Fiyat / Tedarik</th>
                      <th>İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${cat.subProducts.map((sub) => `
                      <tr class="searchable-product-row" data-search="${escapeAttr(withLanguageSearch(`${sub.name} ${sub.detail} ${cat.title}`))}">
                        <td><strong>${escapeHtml(sub.name)}</strong></td>
                        <td>${escapeHtml(sub.detail)}</td>
                        <td><span class="badge badge-neutral">${escapeHtml(cat.packaging)}</span></td>
                        <td><span class="badge badge-teal">Teklif isteyin</span></td>
                        <td>
                          <a href="/teklif-al?product=${encodeURIComponent(sub.name)}" class="btn btn-sm btn-secondary" data-nav>
                            Teklif İste
                          </a>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  renderSafeHtml(container, html);
  attachSpaLinks(container, navigate);

  // Yoğunluk hesaplayıcı
  const calcBtn = container.querySelector('#conv-calc-btn');
  const resultBox = container.querySelector('#conv-result-box');
  if (calcBtn && resultBox) {
    calcBtn.addEventListener('click', () => {
      const amount = container.querySelector('#conv-amount')?.value;
      const fromUnit = container.querySelector('#conv-from')?.value;
      const toUnit = container.querySelector('#conv-to')?.value;
      const density = container.querySelector('#conv-density')?.value;
      try {
        const res = convertMassVolumeUnit(amount, fromUnit, toUnit, density ? Number(density) : null);
        resultBox.textContent = `Doğrulanmış Sonuç: ${Number(amount).toLocaleString('tr-TR')} ${fromUnit} = ${res.toLocaleString('tr-TR')} ${toUnit} (Baz alınan yoğunluk: ${density} kg/L)`;
        resultBox.className = 'density-result-box success';
      } catch (err) {
        resultBox.textContent = err.message;
        resultBox.className = 'density-result-box warning';
      }
    });
  }

  // Canlı Firestore ürünlerini yükle
  const liveBox = container.querySelector('#live-products-section');
  try {
    const liveProducts = await fetchPublicProducts();
    if (liveProducts.length === 0) {
      renderSafeHtml(liveBox, `
        <div class="info-callout">
          <strong>Canlı Ürün Kataloğu Bilgilendirmesi:</strong> Yönetim panelinden yayımlanan özel stok/ambalaj kartları burada listelenir. Aşağıdaki endüstriyel ürün gruplarımızdan ihtiyacınız olan kimyasal için doğrudan teknik teklif talep edebilirsiniz.
        </div>
      `);
    } else {
      renderSafeHtml(liveBox, `
        <div class="live-catalog-block">
          <div class="section-header" style="margin-bottom:1.25rem;">
            <span class="section-tag">Yayımlanmış Ürün Kartları</span>
            <h2 class="section-title" style="font-size:1.5rem;">Aktif Kimyasal Ürün Kataloğu (${liveProducts.length} Ürün)</h2>
          </div>
          <div class="categories-grid">
            ${liveProducts.map((p) => {
              const priceLabel = (p.unitPrice !== null && p.unitPrice !== undefined && Number(p.unitPrice) > 0)
                ? `${Number(p.unitPrice).toLocaleString('tr-TR')} ${escapeHtml(p.currency || 'TRY')} / ${escapeHtml(p.salesUnit || 'kg')}`
                : 'Teklif isteyin';
              return `
                <div class="category-card searchable-live-card" data-cat="${escapeAttr(p.category || 'all')}" data-search="${escapeAttr(withLanguageSearch(`${p.tradeName || ''} ${p.chemicalName || ''} ${p.productCode || ''} ${p.casNumber || ''} ${p.applicationArea || ''}`))}">
                  <div class="category-card-top">
                    <span class="badge badge-teal">${escapeHtml(p.productCode || 'ÜRÜN')}</span>
                    ${p.casNumber ? `<span class="badge badge-neutral">CAS: ${escapeHtml(p.casNumber)}</span>` : ''}
                  </div>
                  <h3>${escapeHtml(p.tradeName || p.name)}</h3>
                  ${p.chemicalName ? `<p style="font-size:0.84rem;color:var(--accent-teal);font-weight:600;margin-bottom:0.4rem;">Kimyasal Adı: ${escapeHtml(p.chemicalName)}</p>` : ''}
                  <p>${escapeHtml(p.applicationArea || p.technicalSpecs || '')}</p>
                  <div class="category-sublist">
                    ${p.concentrationPurity ? `<div class="subproduct-pill"><strong>Saflık/Konsantrasyon:</strong> ${escapeHtml(p.concentrationPurity)}</div>` : ''}
                    <div class="subproduct-pill"><strong>Ambalaj & Birim:</strong> ${escapeHtml(p.packagingType || 'Standart Endüstriyel Ambalaj')} (${escapeHtml(p.salesUnit || 'kg')})</div>
                    ${p.minOrderQty ? `<div class="subproduct-pill"><strong>Min. Sipariş:</strong> ${Number(p.minOrderQty).toLocaleString('tr-TR')} ${escapeHtml(p.salesUnit || 'kg')}</div>` : ''}
                    ${p.verifiedDensity ? `<div class="subproduct-pill"><strong>Doğrulanmış Yoğunluk:</strong> ${Number(p.verifiedDensity)} kg/L</div>` : ''}
                  </div>
                  <div class="category-card-footer">
                    <span class="packaging-badge" style="font-weight:700;color:var(--accent-teal);">${escapeHtml(priceLabel)}</span>
                    <a href="/teklif-al?product=${encodeURIComponent(p.tradeName || p.name)}" class="category-link" data-nav>Teklif İste →</a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `);
      attachSpaLinks(liveBox, navigate);
    }
  } catch (_err) {
    renderSafeHtml(liveBox, '');
  }

  // Arama & Kategori filtreleme
  const searchInput = container.querySelector('#product-search-input');
  const pills = container.querySelectorAll('#product-category-pills .filter-pill');
  let activeCat = 'all';

  function applyFilters() {
    const q = fold(searchInput?.value || '');
    container.querySelectorAll('.category-detail-card').forEach((card) => {
      const catMatch = activeCat === 'all' || card.dataset.categoryId === activeCat;
      let anyRowVisible = false;
      card.querySelectorAll('.searchable-product-row').forEach((row) => {
        const textMatch = !q || (row.dataset.search || '').includes(q);
        row.style.display = textMatch ? '' : 'none';
        if (textMatch) anyRowVisible = true;
      });
      card.style.display = (catMatch && anyRowVisible) ? '' : 'none';
    });

    container.querySelectorAll('.searchable-live-card').forEach((card) => {
      const catMatch = activeCat === 'all' || card.dataset.cat === activeCat;
      const textMatch = !q || (card.dataset.search || '').includes(q);
      card.style.display = (catMatch && textMatch) ? '' : 'none';
    });
  }

  searchInput?.addEventListener('input', applyFilters);
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeCat = pill.dataset.cat || 'all';
      applyFilters();
    });
  });
}

/* ==========================================================================
   2. SU ARITMA SİSTEMLERİ VE PROJELER (/sistemler)
   ========================================================================== */
export function renderSystemsPage(container, navigate) {
  const html = `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb">
          <a href="/" data-nav>Ana Sayfa</a> <span>/</span> <span>Su Arıtma Sistemleri</span>
        </div>
        <h1>Endüstriyel Su Arıtma ve Saf Su Sistemleri Mühendisliği</h1>
        <p>Kuyu, şebeke ve proses suları için ham su analizine dayalı RO, EDI ve yumuşatma tesisleri. Laboratuvar, medikal ve endüstriyel Medipure saf su cihazlarının model kataloğu aynı sayfadadır.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Mühendislik Prensibi Uyarısı -->
        <div class="engineering-guard-banner">
          <div>
            <strong>Mühendislik Doğrulama Prensibimiz:</strong> Eksik su analizi veya doğrulanmamış debi/iletkenlik verisiyle tahmini kapasite, membran dizilimi veya kimyasal dozaj önerisi üretmiyoruz. Tüm sistem tasarımlarımız ham su analiz raporunuzun yetkili mühendislerimizce incelenmesiyle oluşturulur.
          </div>
          <a href="#project-inquiry-form" class="btn btn-primary btn-sm">Keşif & Su Analizi İste</a>
        </div>

        <div class="systems-grid" style="margin-top:2rem;">
          ${fieldServices.map((service) => `
            <article class="system-card">
              <div class="system-card-header">
                <span class="system-capacity-tag">Saha hizmeti</span>
                <h3>${escapeHtml(service.title)}</h3>
              </div>
              <p class="system-summary">${escapeHtml(service.summary)}</p>
              <div style="margin-top:1.25rem;">
                <a href="${escapeAttr(service.href)}" class="btn btn-primary btn-sm" data-nav>Teklif / keşif</a>
              </div>
            </article>
          `).join('')}
        </div>

        <!-- 6 Adımlı Proje Süreci -->
        <div class="process-steps-grid" style="margin:2.5rem 0;">
          <div class="process-step-card">
            <span class="step-num">01</span>
            <h4>Saha Keşfi & Numune</h4>
            <p>Ham su kaynağı (kuyu, şebeke, yüzey suyu) ve mevcut tesis altyapısının incelenmesi.</p>
          </div>
          <div class="process-step-card">
            <span class="step-num">02</span>
            <h4>Su Analizi & LSI</h4>
            <p>İletkenlik, sertlik, silis, SDI, demir/mangan ve Langelier Doygunluk İndeksi hesabı.</p>
          </div>
          <div class="process-step-card">
            <span class="step-num">03</span>
            <h4>Mühendislik & P&ID</h4>
            <p>Membran projeksiyonu, ön arıtma hızları ve dozaj ekipmanlarının boyutlandırılması.</p>
          </div>
          <div class="process-step-card">
            <span class="step-num">04</span>
            <h4>Üretim & Montaj</h4>
            <p>Paslanmaz/epoksi şase imalatı, yüksek basınç hatları ve PLC otomasyon panosu kurulumu.</p>
          </div>
          <div class="process-step-card">
            <span class="step-num">05</span>
            <h4>Devreye Alma</h4>
            <p>Performans testleri, hedef iletkenlik doğrulaması ve operatör eğitimi.</p>
          </div>
          <div class="process-step-card">
            <span class="step-num">06</span>
            <h4>Periyodik Servis & CIP</h4>
            <p>Membran kimyasal yıkama (CIP), reçine/karbon değişimi ve sözleşmeli bakım takibi.</p>
          </div>
        </div>

        <!-- Sistem Kartları -->
        <div class="systems-grid">
          ${waterTreatmentSystems.map((sys) => `
            <article class="system-card" id="${escapeAttr(sys.id)}">
              <div class="system-card-header">
                <span class="system-capacity-tag">${escapeHtml(sys.capacityRange)}</span>
                <h3>${escapeHtml(sys.title)}</h3>
              </div>
              <p class="system-summary">${escapeHtml(sys.summary)}</p>
              <ul class="system-features">
                ${sys.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}
              </ul>
              <div class="system-usecases">
                <strong>Hedef Uygulamalar:</strong> ${escapeHtml(sys.useCases)}
              </div>
              <div style="margin-top:1.25rem;display:flex;gap:0.75rem;flex-wrap:wrap;">
                <a href="/sistemler/${escapeAttr(sys.id)}" class="btn btn-secondary btn-sm" data-nav>Sistem sayfası</a>
                <a href="/teklif-al?type=water_project&product=${encodeURIComponent(sys.title)}" class="btn btn-primary btn-sm" data-nav>
                  Proje Teklifi Al
                </a>
                <a href="#project-inquiry-form" class="btn btn-secondary btn-sm" data-select-system="${escapeAttr(sys.title)}">
                  Teknik Değerlendirme İste
                </a>
              </div>
            </article>
          `).join('')}
        </div>

        ${renderMedipureCatalog()}

        <!-- Su Arıtma Keşif & Proje Talep Formu -->
        <div class="card" id="project-inquiry-form" style="margin-top:3.5rem;padding:2.25rem;">
          <div class="section-header" style="text-align:left;margin-bottom:1.5rem;">
            <span class="section-tag">Projelendirme & Keşif Formu</span>
            <h2 class="section-title" style="font-size:1.6rem;">Su Arıtma Projesi Teknik Değerlendirme Talebi</h2>
            <p class="section-desc" style="margin:0;">Ham su kaynağınızı ve hedef kapasitenizi paylaşın; proje mühendislerimiz tesisinize özel proses tasarımını hazırlasın.</p>
          </div>

          <form id="systems-project-form" class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Firma / Tesis Adı *</label>
              <input type="text" name="companyName" class="form-input" required placeholder="Örn: Çukurova Tekstil Boyahane A.Ş." />
            </div>
            <div class="form-group">
              <label class="form-label">Yetkili Adı Soyadı & Görevi *</label>
              <input type="text" name="contactName" class="form-input" required placeholder="Örn: Ahmet Yılmaz - İşletme Müdürü" />
            </div>
            <div class="form-group">
              <label class="form-label">Telefon Numarası *</label>
              <input type="tel" name="phone" class="form-input" required placeholder="+90 5XX XXX XX XX" />
            </div>
            <div class="form-group">
              <label class="form-label">Kurumsal E-posta *</label>
              <input type="email" name="email" class="form-input" required placeholder="ornek@firma.com.tr" />
            </div>
            <div class="form-group">
              <label class="form-label">Proje Konumu (İl / OSB) *</label>
              <input type="text" name="cityCountry" class="form-input" required placeholder="Örn: Adana Hacı Sabancı OSB" />
            </div>
            <div class="form-group">
              <label class="form-label">İlgilenilen Sistem</label>
              <input type="text" name="relatedProductOrSystem" id="sys-form-product" class="form-input" placeholder="Örn: Çift Kademeli RO + EDI Saf Su Sistemi" />
            </div>
            <div class="form-group">
              <label class="form-label">Ham Su Kaynağı</label>
              <select name="waterSource" class="form-select">
                <option value="Kuyu Suyu (Yeraltı Suyu)">Kuyu Suyu (Yeraltı Suyu)</option>
                <option value="OSB / Belediye Şebeke Suyu">OSB / Belediye Şebeke Suyu</option>
                <option value="Nehir / Yüzey Suyu">Nehir / Yüzey Suyu</option>
                <option value="Proses / Atıksu Geri Kazanım">Proses / Atıksu Geri Kazanım</option>
                <option value="Deniz Suyu / Yüksek Tuzlu Su">Deniz Suyu / Yüksek Tuzlu Su</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">İstenen Kapasite ve Hedef Kullanım</label>
              <input type="text" name="capacityAndTarget" class="form-input" placeholder="Örn: 25 m³/saat - Buhar Kazanı Besleme Suyu" />
            </div>
            <div class="form-group full-width">
              <label class="form-label">Mevcut Su Analizi Verileri (İletkenlik, Sertlik, pH, Silis vb.) veya Notlarınız *</label>
              <textarea name="description" class="form-textarea" rows="4" required placeholder="Mevcut su analizi değerlerinizi (örn: İletkenlik 1450 µS/cm, Sertlik 38 Fr) veya yerinde su analizi / keşif talebinizi yazınız..."></textarea>
            </div>
            <div class="form-group full-width">
              <label class="checkbox-label">
                <input type="checkbox" name="kvkkConsent" required checked />
                <span>Proje değerlendirmesi kapsamında iletişim bilgilerimin işlenmesini kabul ediyorum.</span>
              </label>
            </div>
            <div class="form-group full-width">
              <button type="submit" class="btn btn-primary" id="sys-submit-btn">Proje Değerlendirme Talebini Gönder</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  renderSafeHtml(container, html);
  attachSpaLinks(container, navigate);
  bindMedipureCatalog(container);

  container.querySelectorAll('[data-select-system]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sysInput = container.querySelector('#sys-form-product');
      if (sysInput) {
        sysInput.value = btn.getAttribute('data-select-system') || '';
        sysInput.focus();
      }
    });
  });

  const form = container.querySelector('#systems-project-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = container.querySelector('#sys-submit-btn');
      const fd = new FormData(form);
      const waterSource = fd.get('waterSource') || '';
      const cap = fd.get('capacityAndTarget') || '';
      const rawDesc = fd.get('description') || '';

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sunucuya Kaydediliyor...';
        }
        await submitPublicCrmForm({
          companyName: fd.get('companyName'),
          contactName: fd.get('contactName'),
          phone: fd.get('phone'),
          email: fd.get('email'),
          cityCountry: fd.get('cityCountry'),
          requestType: 'water_project',
          relatedProductOrSystem: fd.get('relatedProductOrSystem') || 'Endüstriyel Su Arıtma Sistemi',
          description: `[Kaynak Su: ${waterSource}] [İstenen Kapasite: ${cap}] ${rawDesc}`,
          kvkkConsent: Boolean(fd.get('kvkkConsent')),
          sourcePage: '/sistemler'
        });
        showNotification('Su arıtma projesi değerlendirme talebiniz sunucuya kaydedildi. Mühendislik ekibimiz sizinle iletişime geçecektir.', 'success');
        form.reset();
      } catch (err) {
        showNotification(err.message || 'Talep gönderilirken hata oluştu.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Proje Değerlendirme Talebini Gönder';
        }
      }
    });
  }
}

/* ==========================================================================
   3. SEKTÖRLER, PROSES FORMÜLASYONLARI VE CANLI ROI SİMÜLATÖRLERİ (/sektorler)
   ========================================================================== */
export function renderSectorsPage(container, navigate) {
  const html = `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb">
          <a href="/" data-nav>Ana Sayfa</a> <span>/</span> <span>Sektörel Proses Çözümleri & ROI Mühendisliği</span>
        </div>
        <h1>Çukurova & Doğu Akdeniz Mega Sanayi Proses Çözümleri</h1>
        <p>Demir-çelik haddehaneleri, entegre deterjan/sülfonasyon tesisleri, kağıt ve oluklu mukavva fabrikaları, düzcam/cam ambalaj fırınları, Niğde mikronize kalsit madenleri ve Kayseri boru/galvaniz hatları için mikro seviyede kimyasal formülasyonlar.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Sektör Hızlı Geçiş Sekmeleri -->
        <div class="filter-pills" id="sector-filter-pills" style="margin-bottom:2rem;">
          <button type="button" class="filter-pill active" data-sector="all">Tüm Mega Sanayi Grupları (6)</button>
          ${MEGA_INDUSTRIAL_SECTORS.map((sec) => `
            <button type="button" class="filter-pill" data-sector="${escapeAttr(sec.id)}">${escapeHtml(sec.shortTitle)}</button>
          `).join('')}
        </div>

        <!-- 6 Mega Sanayi Proses Formülasyon Matrisi -->
        <div class="playbook-sectors-list" id="playbook-sectors-list">
          ${MEGA_INDUSTRIAL_SECTORS.map((sec) => `
            <article class="playbook-sector-card" data-sector-id="${escapeAttr(sec.id)}" id="${escapeAttr(sec.slug)}">
              <div class="playbook-sector-head">
                <div>
                  <span class="sector-region-pill">${escapeHtml(sec.regionFocus)}</span>
                  <h2>${escapeHtml(sec.title)}</h2>
                  <p class="target-complexes-line"><strong>Bölgesel Proses Kapsamı:</strong> ${escapeHtml(sec.targetComplexes)}</p>
                  <p>${escapeHtml(sec.summary)}</p>
                </div>
                <div class="playbook-sector-actions">
                  <a href="/teklif-al?sector=${encodeURIComponent(sec.title)}&program=program-jartest" class="btn btn-primary" data-nav>
                    Saha Jar-Test & Teklif İste
                  </a>
                </div>
              </div>

              <div class="products-table-wrapper" style="margin-top:1.25rem;">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Proses Uygulama Noktası & Kimyasal Adı</th>
                      <th>Aktif Bileşen & Teknik Спеk</th>
                      <th>Etki Mekanizması</th>
                      <th>Tipik İşletme Dozajı</th>
                      <th>İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${sec.UnitProcesses.map((proc) => `
                      <tr>
                        <td>
                          <strong>${escapeHtml(proc.name)}</strong>
                          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.2rem;">${escapeHtml(proc.code)} — ${escapeHtml(proc.applicationPoint)}</div>
                        </td>
                        <td>
                          <div style="font-weight:600;color:var(--text-primary);">${escapeHtml(proc.activeIngredient)}</div>
                          <div style="font-size:0.8rem;color:var(--accent-teal);margin-top:0.2rem;">${escapeHtml(proc.technicalSpecs)}</div>
                        </td>
                        <td style="font-size:0.85rem;">${escapeHtml(proc.mechanism)}</td>
                        <td>
                          <span class="badge badge-teal">${escapeHtml(proc.typicalDosage)}</span>
                          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;">${escapeHtml(proc.packaging)}</div>
                        </td>
                        <td>
                          <a href="/teklif-al?product=${encodeURIComponent(proc.name)}&sector=${encodeURIComponent(sec.shortTitle)}" class="btn btn-sm btn-secondary" data-nav>
                            Teklif Al
                          </a>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </article>
          `).join('')}
        </div>

        <!-- 3 CANLI FİNANSAL MÜHENDİSLİK (ROI) SİMÜLATÖRÜ -->
        <div class="section-header" id="roi-calculators" style="margin-top:4rem;">
          <span class="section-tag">Finansal Mühendislik & TCO Analizi</span>
          <h2 class="section-title">Canlı Proses Tasarrufu ve ROI Simülatörleri</h2>
          <p class="section-desc">Kimyasalı kilogram fiyatıyla değil, <strong>ton üretim başına toplam işletme maliyeti (TCO)</strong> ile değerlendirin. Tesisinizin parametrelerini girerek yıllık net tasarruf potansiyelinizi hesaplayın.</p>
        </div>

        <div class="roi-simulators-grid">
          <!-- ROI 1: Asitleme İnhibitörü -->
          <div class="roi-card">
            <div class="roi-card-head">
              <span class="badge badge-teal">Demir-Çelik & Boru/Galvaniz</span>
              <h3>1. Asitleme Hattı HCl İnhibitörü ROI Simülatörü</h3>
              <p>Yüksek sıcaklığa dayanıklı Mannich bazlı inhibitör ile ana metal (sac/boru) çözünme kaybını ve aşırı HCl tüketimini önleyin.</p>
            </div>
            <div class="roi-inputs">
              <div class="form-group">
                <label class="form-label">Yıllık Asitlenen Çelik Tonajı (ton/yıl)</label>
                <input type="number" id="roi1-tonnage" class="form-input" value="120000" min="1000" step="5000" />
              </div>
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Mevcut Metal Kaybı (%)</label>
                  <input type="number" id="roi1-cur-loss" class="form-input" value="0.65" min="0.1" max="5" step="0.05" />
                </div>
                <div class="form-group">
                  <label class="form-label">Hedef Metal Kaybı (%)</label>
                  <input type="number" id="roi1-target-loss" class="form-input" value="0.18" min="0.05" max="2" step="0.05" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Hurda/Sac Ton Maliyeti (USD/ton)</label>
                <input type="number" id="roi1-steel-price" class="form-input" value="620" min="100" step="10" />
              </div>
            </div>
            <div class="roi-results" id="roi1-results"></div>
            <button type="button" class="btn btn-primary" style="width:100%;margin-top:1rem;" id="roi1-quote-btn">
              Bu Hesaplamayla İnhibitör Numunesi & Teklif İste
            </button>
          </div>

          <!-- ROI 2: Çamur Susuzlaştırma Polimeri -->
          <div class="roi-card">
            <div class="roi-card-head">
              <span class="badge badge-teal">Kağıt, Tekstil & OSB Atıksu</span>
              <h3>2. Çamur Susuzlaştırma Polimeri (C-PAM) ROI Simülatörü</h3>
              <p>Çapraz bağlı katyonik polimer ile çamur keki kuruluk oranını artırarak günlük bertaraf/nakliye kamyon sayısını düşürün.</p>
            </div>
            <div class="roi-inputs">
              <div class="form-group">
                <label class="form-label">Günlük Kuru Çamur Katısı (ton KM/gün)</label>
                <input type="number" id="roi2-dry-solids" class="form-input" value="12" min="0.5" step="0.5" />
              </div>
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Mevcut Kek Kuruluğu (%)</label>
                  <input type="number" id="roi2-cur-dry" class="form-input" value="19" min="8" max="45" step="1" />
                </div>
                <div class="form-group">
                  <label class="form-label">Hedef Kek Kuruluğu (%)</label>
                  <input type="number" id="roi2-target-dry" class="form-input" value="26" min="10" max="55" step="1" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Yaş Çamur Bertaraf + Nakliye (TL/ton)</label>
                <input type="number" id="roi2-disp-cost" class="form-input" value="1450" min="100" step="50" />
              </div>
            </div>
            <div class="roi-results" id="roi2-results"></div>
            <button type="button" class="btn btn-primary" style="width:100%;margin-top:1rem;" id="roi2-quote-btn">
              Dekantör / Belt Pres Jar-Test & Teklif İste
            </button>
          </div>

          <!-- ROI 3: Kazan Kireç & Yakıt Cezası -->
          <div class="roi-card">
            <div class="roi-card-head">
              <span class="badge badge-teal">Buhar Kazanı & Soğutma Kulesi</span>
              <h3>3. Kazan Taşı (Kireç) Doğalgaz Yakıt Cezası Simülatörü</h3>
              <p>Isı transfer yüzeylerindeki 1–3 mm kalker/silikat tabakasının yol açtığı baca gazı ısı kaybını ve fazladan doğalgaz faturasını hesaplayın.</p>
            </div>
            <div class="roi-inputs">
              <div class="form-group">
                <label class="form-label">Buhar Kazanı Kapasitesi (ton buhar/saat)</label>
                <input type="number" id="roi3-steam" class="form-input" value="15" min="1" step="1" />
              </div>
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Ortalama Kireç Kalınlığı (mm)</label>
                  <input type="number" id="roi3-scale" class="form-input" value="2.0" min="0.2" max="10" step="0.2" />
                </div>
                <div class="form-group">
                  <label class="form-label">Silikatlı / Sert Kireç mi?</label>
                  <select id="roi3-silicate" class="form-select">
                    <option value="true">Evet (Yüksek Silis / Kuyu Suyu)</option>
                    <option value="false">Hayır (Standart CaCO₃)</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Sanayi Doğalgaz Birim Fiyatı (TL/Sm³)</label>
                <input type="number" id="roi3-gas-price" class="form-input" value="16.5" min="1" step="0.5" />
              </div>
            </div>
            <div class="roi-results" id="roi3-results"></div>
            <button type="button" class="btn btn-primary" style="width:100%;margin-top:1rem;" id="roi3-quote-btn">
              Kazan & RO Antiskalant Teklifi İste
            </button>
          </div>
        </div>

        <!-- Kurumsal Karar Verici & Müzakere Rehberi -->
        <div class="section-header" style="margin-top:4rem;">
          <span class="section-tag">Kurumsal Tedarik & Teknik Onay Süreci</span>
          <h2 class="section-title">Departmanlara Özel Mühendislik ve Tedarik Güvencemiz</h2>
          <p class="section-desc">Fabrikanızdaki satınalma, işletme, bakım, laboratuvar ve ÇSG/İSG birimlerinin her birine doğrulanabilir teknik ve finansal dosyalar sunuyoruz.</p>
        </div>
        <div class="decision-matrix-grid">
          ${DECISION_MAKER_MATRIX.map((dm) => `
            <div class="decision-card">
              <div class="decision-role">${escapeHtml(dm.roleTitle)}</div>
              <div class="decision-kpi"><strong>Odak KPI:</strong> ${escapeHtml(dm.primaryKpi)}</div>
              <p class="decision-value">${escapeHtml(dm.valueProposition)}</p>
              <div class="decision-proof"><strong>Sunulan Kanıt:</strong> ${escapeHtml(dm.proofDocument)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  renderSafeHtml(container, html);
  attachSpaLinks(container, navigate);

  // Sektör filtreleme
  const pills = container.querySelectorAll('#sector-filter-pills .filter-pill');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const secId = pill.dataset.sector || 'all';
      container.querySelectorAll('.playbook-sector-card').forEach((card) => {
        card.style.display = (secId === 'all' || card.dataset.sectorId === secId) ? '' : 'none';
      });
    });
  });

  // ROI 1 Hesaplama
  let lastRoi1Summary = '';
  function updateRoi1() {
    const res = calculatePicklingInhibitorRoi({
      annualPickledSteelTons: Number(container.querySelector('#roi1-tonnage')?.value || 120000),
      currentMetalLossPercent: Number(container.querySelector('#roi1-cur-loss')?.value || 0.65),
      targetMetalLossPercent: Number(container.querySelector('#roi1-target-loss')?.value || 0.18),
      steelScrapValueUsdPerTon: Number(container.querySelector('#roi1-steel-price')?.value || 620)
    });
    lastRoi1Summary = `Asitleme İnhibitör ROI: Yıllık Kurtarılan Metal ${res.savedSteelTonsPerYear} ton/yıl, Yıllık Net Tasarruf $${res.totalAnnualSavingsUsd.toLocaleString('tr-TR')} USD`;
    const box = container.querySelector('#roi1-results');
    if (box) {
      renderSafeHtml(box, `
        <div class="roi-metric-row"><span>Kurtarılan Sağlam Çelik:</span> <strong>${res.savedSteelTonsPerYear.toLocaleString('tr-TR')} ton/yıl</strong></div>
        <div class="roi-metric-row"><span>Metal Kaybı Önleme Kazancı:</span> <strong>$${res.savedSteelValueUsd.toLocaleString('tr-TR')} / yıl</strong></div>
        <div class="roi-metric-row"><span>Taze HCl Asit Tasarrufu:</span> <strong>${res.savedAcidTonsPerYear.toLocaleString('tr-TR')} ton ($${res.savedAcidValueUsd.toLocaleString('tr-TR')})</strong></div>
        <div class="roi-metric-highlight"><span>Yıllık Toplam Kazanç:</span> <strong>$${res.totalAnnualSavingsUsd.toLocaleString('tr-TR')} USD / yıl</strong></div>
      `);
    }
  }

  // ROI 2 Hesaplama
  let lastRoi2Summary = '';
  function updateRoi2() {
    const res = calculateSludgePolymerRoi({
      dailyDrySolidsTons: Number(container.querySelector('#roi2-dry-solids')?.value || 12),
      currentCakeDrynessPercent: Number(container.querySelector('#roi2-cur-dry')?.value || 19),
      targetCakeDrynessPercent: Number(container.querySelector('#roi2-target-dry')?.value || 26),
      disposalAndTransportTryPerTon: Number(container.querySelector('#roi2-disp-cost')?.value || 1450)
    });
    lastRoi2Summary = `Çamur Susuzlaştırma Polimer ROI: Günlük Yaş Çamur Azalımı ${res.dailyWetReductionTons} ton/gün, Yıllık Bertaraf Tasarrufu ₺${res.annualDisposalSavingsTry.toLocaleString('tr-TR')} TL`;
    const box = container.querySelector('#roi2-results');
    if (box) {
      renderSafeHtml(box, `
        <div class="roi-metric-row"><span>Mevcut → Hedef Yaş Çamur:</span> <strong>${res.currentWetSludgeTonsPerDay} → ${res.targetWetSludgeTonsPerDay} ton/gün</strong></div>
        <div class="roi-metric-row"><span>Yıllık Azalan Yaş Çamur:</span> <strong>${res.annualWetReductionTons.toLocaleString('tr-TR')} ton/yıl</strong></div>
        <div class="roi-metric-row"><span>İptal Edilen Nakliye Seferi:</span> <strong>${res.savedTruckTripsPerYear.toLocaleString('tr-TR')} kamyon/yıl</strong></div>
        <div class="roi-metric-highlight"><span>Yıllık Bertaraf Kazancı:</span> <strong>₺${res.annualDisposalSavingsTry.toLocaleString('tr-TR')} TL / yıl</strong></div>
      `);
    }
  }

  // ROI 3 Hesaplama
  let lastRoi3Summary = '';
  function updateRoi3() {
    const res = calculateBoilerScaleRoi({
      steamCapacityTonsPerHour: Number(container.querySelector('#roi3-steam')?.value || 15),
      scaleThicknessMm: Number(container.querySelector('#roi3-scale')?.value || 2.0),
      highSilicaOrIron: container.querySelector('#roi3-silicate')?.value === 'true',
      naturalGasPriceTryPerSm3: Number(container.querySelector('#roi3-gas-price')?.value || 16.5)
    });
    lastRoi3Summary = `Kazan Kireç Cezası ROI: Isı Transfer Verim Kaybı %${res.fuelPenaltyPercent}, Yıllık Fazladan Yakıt Cezası ₺${res.annualFuelPenaltyTry.toLocaleString('tr-TR')} TL`;
    const box = container.querySelector('#roi3-results');
    if (box) {
      renderSafeHtml(box, `
        <div class="roi-metric-row"><span>Kireç Kaynaklı Yakıt Cezası:</span> <strong>%${res.fuelPenaltyPercent} ek yakıt kaybı</strong></div>
        <div class="roi-metric-row"><span>Yıllık Boşa Yanan Doğalgaz:</span> <strong>${res.wastedGasSm3PerYear.toLocaleString('tr-TR')} Sm³/yıl</strong></div>
        <div class="roi-metric-highlight"><span>Yıllık Önlenebilir Yakıt Cezası:</span> <strong>₺${res.annualFuelPenaltyTry.toLocaleString('tr-TR')} TL / yıl</strong></div>
      `);
    }
  }

  ['#roi1-tonnage', '#roi1-cur-loss', '#roi1-target-loss', '#roi1-steel-price'].forEach((sel) => {
    container.querySelector(sel)?.addEventListener('input', updateRoi1);
  });
  ['#roi2-dry-solids', '#roi2-cur-dry', '#roi2-target-dry', '#roi2-disp-cost'].forEach((sel) => {
    container.querySelector(sel)?.addEventListener('input', updateRoi2);
  });
  ['#roi3-steam', '#roi3-scale', '#roi3-silicate', '#roi3-gas-price'].forEach((sel) => {
    container.querySelector(sel)?.addEventListener('input', updateRoi3);
    container.querySelector(sel)?.addEventListener('change', updateRoi3);
  });

  updateRoi1();
  updateRoi2();
  updateRoi3();

  container.querySelector('#roi1-quote-btn')?.addEventListener('click', () => {
    navigate(`/teklif-al?program=program-pilot&product=${encodeURIComponent('ELİF-INHIB HCl Asitleme İnhibitörü')}&roi=${encodeURIComponent(lastRoi1Summary)}`);
  });
  container.querySelector('#roi2-quote-btn')?.addEventListener('click', () => {
    navigate(`/teklif-al?program=program-jartest&product=${encodeURIComponent('ELİF-FLOC C-8560 Katyonik Poliakrilamid')}&roi=${encodeURIComponent(lastRoi2Summary)}`);
  });
  container.querySelector('#roi3-quote-btn')?.addEventListener('click', () => {
    navigate(`/teklif-al?program=program-audit&product=${encodeURIComponent('Kazan & RO Antiskalant Şartlandırma Programı')}&roi=${encodeURIComponent(lastRoi3Summary)}`);
  });
}

/* ==========================================================================
   4. HİZMET BÖLGELERİ VE LOJİSTİK ÜSTÜNLÜK (/hizmet-bolgeleri)
   ========================================================================== */
export function renderRegionsPage(container, navigate) {
  const html = `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb">
          <a href="/" data-nav>Ana Sayfa</a> <span>/</span> <span>Hizmet Bölgeleri & Lojistik Ağımız</span>
        </div>
        <h1>Seyhan/Adana merkezli sanayi sevkiyat ağı</h1>
        <p>Kayıtlı adres Seyhan/Adana’dır. Mersin, İskenderun-Payas-Osmaniye, Kayseri, Niğde, Gaziantep ve Kahramanmaraş sanayi hatlarına sevkiyat bu sayfadaki bölge kayıtlarına göredir. Ayrı şube adresi yayınlanmaz.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="regions-grid">
          ${serviceRegions.map((reg, regionIndex) => `
            <div class="region-card">
              <div class="region-badge">${escapeHtml(reg.badge)}</div>
              <h3>${escapeHtml(reg.region)}</h3>
              <p>${escapeHtml(reg.details)}</p>
              <div class="region-highlights">
                ${reg.highlights.map((h) => `<span class="highlight-chip">${escapeHtml(h)}</span>`).join('')}
              </div>
              <div style="margin-top:1.25rem;">
                <a href="/hizmet-bolgeleri/${escapeAttr(REGION_SLUGS[regionIndex] || '')}" class="btn btn-sm btn-secondary" data-nav>
                  Bölge sayfası
                </a>
                <a href="/teklif-al?city=${encodeURIComponent(reg.region)}" class="btn btn-sm btn-secondary" data-nav>
                  Bu Bölge İçin Teklif Al →
                </a>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Lojistik Karşılaştırma Tablosu -->
        <div class="section-header" style="margin-top:4rem;">
          <span class="section-tag">Bölgesel Rekabet Avantajı</span>
          <h2 class="section-title">Çukurova Lokal Tedarik vs. Marmara (Kocaeli/İstanbul) Tedarikçileri</h2>
          <p class="section-desc">850–1.000 km uzaktan su ve kimyasal taşıma navlununu sıfırlayın; emniyet stoğu yükünüzü Elif Kimya'nın Adana merkez deposuna devredin.</p>
        </div>

        <div class="products-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Kriter</th>
                <th>Marmara (Kocaeli / İstanbul) Tedarikçisi</th>
                <th style="background:var(--bg-teal-tint);color:var(--accent-teal);">Elif Kimya (Adana Merkezli Lokal Güç)</th>
                <th>Tesisinize Net Finansal & Operasyonel Etkisi</th>
              </tr>
            </thead>
            <tbody>
              ${LOGISTICS_COMPARISON_MATRIX.map((row) => `
                <tr>
                  <td><strong>${escapeHtml(row.criterion)}</strong></td>
                  <td style="color:var(--text-secondary);">${escapeHtml(row.marmaraSupplier)}</td>
                  <td style="background:var(--bg-teal-tint);font-weight:600;color:var(--text-primary);">${escapeHtml(row.elifKimyaLocal)}</td>
                  <td><span class="badge badge-teal">${escapeHtml(row.financialImpact)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;

  renderSafeHtml(container, html);
  attachSpaLinks(container, navigate);
}

/* ==========================================================================
   5. TEKNİK BELGE MERKEZİ VE BİLGİ KÜTÜPHANESİ (/teknik-bilgi)
   ========================================================================== */
export async function renderTechnicalCenterPage(container, navigate) {
  let activeBlogCategory = 'all';
  let blogSearchQuery = '';

  function getFilteredBlogPosts() {
    const q = fold(blogSearchQuery.trim());
    return TECHNICAL_BLOG_POSTS.filter((post) => {
      if (activeBlogCategory !== 'all' && post.category !== activeBlogCategory) return false;
      if (q) {
        const hay = fold([
          post.title,
          post.seoTitle,
          post.metaDescription,
          post.keyword,
          ...(post.keywords || []),
          post.summary,
          ...post.sections.flatMap((s) => [s.heading, ...(s.paragraphs || [])]),
          ...(post.fieldChecklist || [])
        ].join(' '));
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function renderBlogListRegion() {
    const listBox = container.querySelector('#tech-blog-list-region');
    if (!listBox) return;
    const filtered = getFilteredBlogPosts();

    if (filtered.length === 0) {
      renderSafeHtml(listBox, `
        <div class="empty-state-box">
          <h4>Arama Kriterinize Uygun Teknik Rehber Bulunamadı</h4>
          <p>Farklı bir anahtar kelime deneyebilir veya kategori filtresini sıfırlayabilirsiniz.</p>
        </div>
      `);
      return;
    }

    const cardsHtml = filtered.map((post) => `
      <article class="card" id="rehber-${escapeAttr(post.slug)}" style="padding:1.65rem;display:flex;flex-direction:column;justify-content:space-between;gap:1rem;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.65rem;">
            <div style="display:flex;gap:0.4rem;flex-wrap:wrap;align-items:center;">
              <span class="badge badge-teal">Rehber #${escapeHtml(String(post.number))}</span>
              <span class="badge badge-neutral">${escapeHtml(post.categoryLabel)}</span>
            </div>
            <span style="font-size:0.78rem;color:var(--text-muted);font-weight:600;">⏱️ ${escapeHtml(post.readingTime)}</span>
          </div>

          <h3 style="font-size:1.22rem;line-height:1.38;margin-bottom:0.5rem;">
            <a href="/teknik-bilgi/${escapeAttr(post.slug)}" data-nav style="color:var(--text-primary);">${escapeHtml(post.title)}</a>
          </h3>

          <p style="font-size:0.92rem;color:var(--text-secondary);line-height:1.6;margin-bottom:0.75rem;">
            ${escapeHtml(post.summary)}
          </p>

          <div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:0.85rem;">
            <span class="metric-tag">🎯 Anahtar Kelime: ${escapeHtml(post.keyword)}</span>
            <span class="metric-tag">🔗 /teknik-bilgi/${escapeHtml(post.slug)}</span>
          </div>

          <details style="background:var(--bg-secondary);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:0.85rem 1rem;margin-bottom:0.5rem;">
            <summary style="cursor:pointer;font-weight:700;font-size:0.88rem;color:var(--accent-teal-hover);">
              📖 Tam Metni, Saha Kontrol Listesini & 16:9 Görsel Promptunu Aç
            </summary>
            <div style="margin-top:1rem;padding-top:0.85rem;border-top:1px solid var(--border-subtle);display:flex;flex-direction:column;gap:1rem;">
              <div style="font-size:0.8rem;color:var(--text-muted);background:#ffffff;padding:0.6rem 0.8rem;border-radius:6px;border:1px solid var(--border-subtle);">
                <div><strong>SEO Başlığı:</strong> ${escapeHtml(post.seoTitle)}</div>
                <div style="margin-top:0.2rem;"><strong>Meta Açıklaması:</strong> ${escapeHtml(post.metaDescription)}</div>
              </div>

              ${post.sections.map((sec) => `
                <div>
                  <h4 style="font-size:1rem;color:var(--text-primary);margin-bottom:0.35rem;">${escapeHtml(sec.heading)}</h4>
                  ${(sec.paragraphs || []).map((p) => `<p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.65;margin-bottom:0.55rem;">${escapeHtml(p)}</p>`).join('')}
                </div>
              `).join('')}

              ${(post.fieldChecklist && post.fieldChecklist.length) ? `
                <div style="background:var(--bg-teal-tint);border:1px solid rgba(13,148,136,0.25);border-radius:6px;padding:0.8rem 1rem;">
                  <strong style="font-size:0.86rem;color:var(--accent-teal-hover);display:block;margin-bottom:0.4rem;">✅ Saha Kontrol ve İzleme Listesi:</strong>
                  <ul style="padding-left:1.15rem;font-size:0.84rem;color:var(--text-primary);display:flex;flex-direction:column;gap:0.25rem;">
                    ${post.fieldChecklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              <div style="background:#ffffff;border:1px solid var(--border-subtle);border-radius:6px;padding:0.8rem 1rem;font-size:0.82rem;">
                <div style="margin-bottom:0.35rem;"><strong>🖼️ Görsel Alt Metni:</strong> ${escapeHtml(post.imageAlt)}</div>
                <div style="color:var(--text-secondary);margin-bottom:0.5rem;"><strong>🎨 16:9 Fotoğraf Üretim Promptu:</strong> ${escapeHtml(post.imagePromptTr)}</div>
                <button type="button" class="btn btn-secondary btn-xs copy-prompt-btn" data-prompt="${escapeAttr(post.imagePromptTr)}">
                  📋 Fotoğraf Promptunu Kopyala
                </button>
              </div>
            </div>
          </details>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;flex-wrap:wrap;padding-top:0.75rem;border-top:1px solid var(--border-subtle);">
          <a href="/teknik-bilgi/${escapeAttr(post.slug)}" class="btn btn-secondary btn-sm" data-nav>
            🔗 Tam Sayfa Aç
          </a>
          <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
            <a href="${escapeAttr(post.ctaLink)}" class="btn btn-secondary btn-sm" data-nav>
              ${escapeHtml(post.ctaLabel)}
            </a>
            <a href="${escapeAttr(post.secondaryLink)}" class="btn btn-primary btn-sm" data-nav>
              Teklif / Analiz İste →
            </a>
          </div>
        </div>
      </article>
    `).join('');

    renderSafeHtml(listBox, `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:1.25rem;">${cardsHtml}</div>`);
    attachSpaLinks(listBox, navigate);

    listBox.querySelectorAll('.copy-prompt-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const promptText = btn.getAttribute('data-prompt') || '';
        if (!promptText) return;
        try {
          await navigator.clipboard.writeText(promptText);
          showNotification('16:9 fotoğraf üretim promptu panoya kopyalandı.', 'success');
        } catch (_err) {
          showNotification('Prompt kopyalanamadı.', 'error');
        }
      });
    });
  }

  const html = `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb">
          <a href="/" data-nav>Ana Sayfa</a> <span>/</span> <span>Teknik Belge Merkezi & Mühendislik Rehberi</span>
        </div>
        <h1>Teknik Belge Merkezi (SDS / GBF, TDS, COA) ve 20 Proses Mühendisliği Rehberi</h1>
        <p>Ürünlerimize ait güncel yayımlanmış Güvenlik Bilgi Formları (SDS/GBF), Teknik Bilgi Formları (TDS), Parti Analiz Sertifikaları (COA) ve soğutma kulesi, kazan, RO/EDI, atıksu, jeotermal ve ağır sanayi prosesleri için hazırlanan 20 kapsamlı teknik rehber.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Canlı Teknik Belgeler (Firestore documents koleksiyonu) -->
        <div class="section-header" style="text-align:left;margin-bottom:1.5rem;">
          <span class="section-tag">Doğrulanmış Teknik Dokümanlar</span>
          <h2 class="section-title" style="font-size:1.65rem;">Yayımlanmış Ürün Belgeleri (SDS / TDS / COA / Sertifika)</h2>
          <p class="section-desc" style="margin:0;">Güvenlik metinleri ve tehlike sınıfları yalnızca doğrulanmış resmi ürün belgelerinden sunulur; tahmini güvenlik verisi üretilmez.</p>
        </div>

        <div id="public-documents-container" style="margin-bottom:3.5rem;">
          <div class="loading-banner">Yayımlanmış teknik belgeler kontrol ediliyor...</div>
        </div>

        <!-- 20 Teknik Blog & Uygulama Rehberi Kütüphanesi -->
        <div class="section-header" id="teknik-blog-kutuphanesi">
          <span class="section-tag">Proses Mühendisliği & Uygulama Blogu (20 Rehber)</span>
          <h2 class="section-title">Endüstriyel Su Şartlandırma, Arıtma ve Sektörel Kimya Rehberleri</h2>
          <p class="section-desc">Kimyasal dozaj ve sistem kapasitesi kararları su/brine/atıksu analizi ve tesis koşullarıyla belirlenmelidir; içeriklerde sabit dozaj veya performans garantisi verilmez.</p>
        </div>

        <div class="card" style="padding:1.25rem;margin-bottom:1.5rem;display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;">
          <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
            ${TECHNICAL_BLOG_CATEGORIES.map((cat) => `
              <button
                type="button"
                class="btn btn-sm ${activeBlogCategory === cat.id ? 'btn-primary' : 'btn-secondary'} tech-blog-cat-btn"
                data-cat="${escapeAttr(cat.id)}"
              >
                ${escapeHtml(cat.label)}
              </button>
            `).join('')}
          </div>
          <div style="flex:1;min-width:250px;max-width:360px;">
            <input
              type="search"
              id="tech-blog-search"
              class="form-input"
              placeholder="20 rehber içinde konu, ürün veya proses ara..."
            />
          </div>
        </div>

        <div id="tech-blog-list-region" style="margin-bottom:3.5rem;"></div>

        <!-- Hızlı Mühendislik Özetleri -->
        <div class="section-header">
          <span class="section-tag">Saha Referans Notları</span>
          <h2 class="section-title">Kritik Proses Parametreleri ve Mühendislik Özetleri</h2>
        </div>

        <div class="knowledge-grid">
          ${geoKnowledgeArticles.map((art) => `
            <article class="knowledge-card">
              <h3>${escapeHtml(art.title)}</h3>
              <p>${escapeHtml(art.content)}</p>
              <div class="knowledge-metrics">
                ${art.metrics.map((m) => `<span class="metric-tag">${escapeHtml(m)}</span>`).join('')}
              </div>
            </article>
          `).join('')}
        </div>

        <!-- SSS -->
        <div class="section-header" style="margin-top:4rem;">
          <span class="section-tag">Sıkça Sorulan Teknik Sorular</span>
          <h2 class="section-title">Endüstriyel Tedarik ve Uygulama SSS</h2>
        </div>
        <div class="faq-list">
          ${faqItems.map((item, idx) => `
            <div class="faq-item ${idx === 0 ? 'open' : ''}">
              <button class="faq-question" type="button">
                <span>${escapeHtml(item.question)}</span>
                <span class="faq-toggle-icon">${idx === 0 ? '−' : '+'}</span>
              </button>
              <div class="faq-answer">
                <p>${escapeHtml(item.answer)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  renderSafeHtml(container, html);
  attachSpaLinks(container, navigate);
  renderBlogListRegion();

  container.querySelectorAll('.tech-blog-cat-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeBlogCategory = btn.getAttribute('data-cat') || 'all';
      container.querySelectorAll('.tech-blog-cat-btn').forEach((b) => {
        const isAct = (b.getAttribute('data-cat') || 'all') === activeBlogCategory;
        b.classList.toggle('btn-primary', isAct);
        b.classList.toggle('btn-secondary', !isAct);
      });
      renderBlogListRegion();
    });
  });

  container.querySelector('#tech-blog-search')?.addEventListener('input', (e) => {
    blogSearchQuery = e.target.value || '';
    renderBlogListRegion();
  });

  container.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const isOpen = parent.classList.contains('open');
      container.querySelectorAll('.faq-item').forEach((el) => {
        el.classList.remove('open');
        const icon = el.querySelector('.faq-toggle-icon');
        if (icon) icon.textContent = '+';
      });
      if (!isOpen) {
        parent.classList.add('open');
        const icon = parent.querySelector('.faq-toggle-icon');
        if (icon) icon.textContent = '−';
      }
    });
  });

  const docsBox = container.querySelector('#public-documents-container');
  try {
    const docs = await fetchPublicDocuments();
    if (docs.length === 0) {
      renderSafeHtml(docsBox, `
        <div class="empty-state-box">
          <h4>Kamuya Açık İndirilebilir Belge Bulunmuyor</h4>
          <p>Partiye özel Analiz Sertifikaları (COA) ve güncel Güvenlik Bilgi Formları (SDS/GBF), talep ettiğiniz kimyasalın parti numarasına ve konsantrasyonuna göre teknik ekibimiz tarafından paylaşılmaktadır.</p>
          <a href="/teklif-al?type=document_request" class="btn btn-primary btn-sm" data-nav style="margin-top:0.75rem;">
            SDS / TDS / COA Belgesi Talep Et
          </a>
        </div>
      `);
      attachSpaLinks(docsBox, navigate);
    } else {
      renderSafeHtml(docsBox, `
        <div class="products-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Belge Türü</th>
                <th>Belge Başlığı / İlgili Ürün</th>
                <th>Revizyon & Tarih</th>
                <th>Dil</th>
                <th>Parti / Lot No</th>
                <th>İndir / Görüntüle</th>
              </tr>
            </thead>
            <tbody>
              ${docs.map((d) => `
                <tr>
                  <td><span class="badge badge-teal">${escapeHtml(d.docType)}</span></td>
                  <td>
                    <strong>${escapeHtml(d.title)}</strong>
                    ${d.productName ? `<div style="font-size:0.8rem;color:var(--text-muted);">${escapeHtml(d.productName)}</div>` : ''}
                  </td>
                  <td>Rev. ${escapeHtml(String(d.revisionNo || 1))} (${escapeHtml(d.revisionDate || '-')})</td>
                  <td>${escapeHtml(d.language || 'TR')}</td>
                  <td>${escapeHtml(d.batchNumber || 'Genel')}</td>
                  <td>
                    <a href="${escapeAttr(d.fileUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">
                      Belgeyi Aç (${escapeHtml(d.fileName || 'PDF')})
                    </a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `);
    }
  } catch (_err) {
    renderSafeHtml(docsBox, `
      <div class="empty-state-box">
        <p>Teknik belgeler şu anda yüklenemedi. Ürün bazlı SDS/TDS/COA talepleriniz için teklif formunu kullanabilirsiniz.</p>
      </div>
    `);
  }
}

/* ==========================================================================
   6. KURUMSAL TEKLİF, SAHA JAR-TEST VE KEŞİF TALEBİ (/teklif-al)
   ========================================================================== */
export function renderQuotePage(container, navigate) {
  const params = new URLSearchParams(window.location.search);
  const preProgram = params.get('program') || '';
  const preProduct = params.get('product') || '';
  const preSector = params.get('sector') || params.get('sektor') || '';
  const preRoi = params.get('roi') || '';
  const preCity = params.get('city') || '';
  const preType = params.get('type') || 'product_quote';

  const selectedProgramObj = B2B_OFFER_PROGRAMS.find((p) => p.id === preProgram || p.aliasId === preProgram);
  const initialProductVal = [
    selectedProgramObj ? `[${selectedProgramObj.title}]` : '',
    preProduct,
    preSector ? `(${preSector})` : ''
  ].filter(Boolean).join(' ');

  const initialDescVal = preRoi
    ? `Hesaplanan ROI Özeti: ${preRoi}\n\nLütfen tesisimiz için teknik teklif ve saha değerlendirmesi planlayınız.`
    : '';

  const html = `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb">
          <a href="/" data-nav>Ana Sayfa</a> <span>/</span> <span>Kurumsal Sipariş, Teklif & Saha Jar-Test Formu</span>
        </div>
        <h1>Kurumsal Sipariş, Fiyat Teklifi ve Saha Etüdü Formu</h1>
        <p>Toptan kimyasal/cihaz siparişinizi veya teklif talebinizi iletin; başvurunuz anında Elif Çevre Kimya Yönetim Paneli (Dashboard) ekranına düşer ve mühendislerimiz hızla dönüş yapar.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- 4 Yüksek Dönüşümlü Program Seçici -->
        <div style="margin-bottom:2.5rem;">
          <span class="section-tag">Sıfır Riskli Saha Giriş Programları</span>
          <h2 style="font-size:1.45rem;margin:0.4rem 0 1rem;">Başvurmak İstediğiniz Programı Seçin (İsteğe Bağlı)</h2>
          <div class="offer-programs-grid">
            ${B2B_OFFER_PROGRAMS.map((prog) => `
              <div class="offer-program-card selectable-program ${(preProgram === prog.id || preProgram === prog.aliasId) ? 'selected-program' : ''}" data-prog-id="${escapeAttr(prog.id)}" data-prog-title="${escapeAttr(prog.title)}" style="cursor:pointer;">
                <div class="offer-program-badge">${escapeHtml(prog.badge)}</div>
                <h3 style="font-size:1.05rem;">${escapeHtml(prog.title)}</h3>
                <p style="font-size:0.86rem;">${escapeHtml(prog.description)}</p>
                <div class="offer-program-meta">
                  <span><strong>Teslimat:</strong> ${escapeHtml(prog.deliverable)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Ana Sipariş & CRM Başvuru Formu -->
        <div class="card" style="padding:2.5rem;">
          <div style="margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid var(--border-subtle);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;">
            <div>
              <span class="badge badge-teal">CANLI DASHBOARD ENTEGRASYONLU</span>
              <h3 style="margin:0.35rem 0 0;">Sipariş & Kurumsal Teklif Formu</h3>
            </div>
            <span style="font-size:0.82rem;color:var(--text-secondary);">Gönderilen tüm sipariş ve teklif formları anında merkez operasyon ekranına düşer.</span>
          </div>
          <form id="b2b-rfq-form" class="form-grid-2">
            <div class="form-group">
              <label class="form-label" for="rfq-company">Firma / Fabrika Ünvanı *</label>
              <input type="text" id="rfq-company" name="companyName" class="form-input" required placeholder="Örn: Baştuğ Metalurji San. A.Ş." />
            </div>
            <div class="form-group">
              <label class="form-label" for="rfq-contact">Yetkili Kişi ve Ünvanı *</label>
              <input type="text" id="rfq-contact" name="contactName" class="form-input" required placeholder="Örn: Mehmet Kaya - Satınalma Müdürü" />
            </div>
            <div class="form-group">
              <label class="form-label" for="rfq-phone">Telefon Numarası *</label>
              <input type="tel" id="rfq-phone" name="phone" class="form-input" required placeholder="+90 5XX XXX XX XX" />
            </div>
            <div class="form-group">
              <label class="form-label" for="rfq-email">Kurumsal E-posta Adresi *</label>
              <input type="email" id="rfq-email" name="email" class="form-input" required placeholder="satinalma@fabrika.com.tr" />
            </div>
            <div class="form-group">
              <label class="form-label" for="rfq-city">Sevk İli / OSB / Teslimat Adresi *</label>
              <input type="text" id="rfq-city" name="cityCountry" class="form-input" required value="${escapeAttr(preCity || 'Adana / Türkiye')}" placeholder="Örn: Adana Hacı Sabancı OSB / Türkiye" />
            </div>
            <div class="form-group">
              <label class="form-label" for="rfq-type">İşlem Türü (Sipariş / Teklif / Analiz) *</label>
              <select id="rfq-type" name="requestType" class="form-select">
                <option value="order_request" ${preType === 'order_request' || preType === 'order' ? 'selected' : ''}>🛒 Doğrudan Ürün / Cihaz Siparişi (Sevkiyat Talebi)</option>
                <option value="product_quote" ${!preType || preType === 'product_quote' ? 'selected' : ''}>📋 Endüstriyel Kimyasal / Sistem Fiyat Teklifi</option>
                <option value="jar_test_trial" ${preProgram === 'program-jartest' || preProgram === 'canli-jar-test' || preProgram === 'program-pilot' || preProgram === 'pilot-30-gun' ? 'selected' : ''}>🧪 Yerinde Jar-Test / 30 Günlük Pilot Deneme</option>
                <option value="water_audit" ${preProgram === 'program-audit' || preProgram === 'korozyon-lsi-checkup' ? 'selected' : ''}>💧 Ücretsiz Su Analizi & LSI Korozyon Risk Etüdü</option>
                <option value="water_project" ${preType === 'water_project' ? 'selected' : ''}>⚙️ Su Arıtma Sistemi Kurulum & Proje Teklifi</option>
                <option value="service_maintenance" ${preType === 'service_maintenance' ? 'selected' : ''}>🔧 Periyodik Servis, Membran CIP & Bakım Talebi</option>
                <option value="document_request" ${preType === 'document_request' ? 'selected' : ''}>📄 Teknik Belge (SDS / GBF / TDS / COA) Talebi</option>
              </select>
            </div>
            <div class="form-group full-width">
              <label class="form-label" for="rfq-product">Sipariş / Talep Edilen Kimyasal Ürün, Saf Su Cihazı veya Sistem *</label>
              <input type="text" id="rfq-product" name="relatedProductOrSystem" class="form-input" required value="${escapeAttr(initialProductVal)}" placeholder="Örn: Sodyum Hipoklorit, PAC %17, Anyonik Polielektrolit, RO Antiskalant veya Medipure Saf Su Cihazı" />
            </div>
            <div class="form-group">
              <label class="form-label" for="rfq-packaging">Sipariş Miktarı & Ambalaj Tipi</label>
              <input type="text" id="rfq-packaging" name="packagingInfo" class="form-input" placeholder="Örn: 5 Adet 1000 kg IBC Tank / Aylık 15 Ton" />
            </div>
            <div class="form-group">
              <label class="form-label" for="rfq-followup">İstenen Teslimat / Ziyaret Tarihi</label>
              <input type="date" id="rfq-followup" name="followUpDate" class="form-input" />
            </div>
            <div class="form-group full-width">
              <label class="form-label" for="rfq-desc">Sipariş Notu, Teknik Açıklama veya Su Analizi Detayları *</label>
              <textarea id="rfq-desc" name="description" class="form-textarea" rows="5" required placeholder="Sipariş miktarınız, teslimat adresiniz, kullandığınız mevcut kimyasal veya yaşadığınız proses problemi hakkında bilgi veriniz...">${escapeHtml(initialDescVal)}</textarea>
            </div>
            <div class="form-group full-width">
              <label class="checkbox-label">
                <input type="checkbox" name="kvkkConsent" required checked />
                <span>6698 sayılı KVKK kapsamında kurumsal iletişim, sipariş ve talep bilgilerimin işlenmesini kabul ediyorum.</span>
              </label>
            </div>
            <div class="form-group full-width" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
              <span style="font-size:0.85rem;color:var(--text-secondary);">Formunuz doğrudan Elif Çevre Kimya Yönetim Dashboard'una canlı olarak düşer.</span>
              <button type="submit" class="btn btn-primary btn-lg" id="rfq-submit-btn">
                Sipariş / Teklif Formunu Gönder
              </button>
            </div>
          </form>

          <div id="rfq-confirmation-box" style="display:none;margin-top:1.5rem;" class="confirmation-card"></div>
        </div>
      </div>
    </section>
  `;

  renderSafeHtml(container, html);
  attachSpaLinks(container, navigate);

  // Program kartı seçimi
  const progCards = container.querySelectorAll('.selectable-program');
  const prodInput = container.querySelector('#rfq-product');
  progCards.forEach((card) => {
    card.addEventListener('click', () => {
      progCards.forEach((c) => c.classList.remove('selected-program'));
      card.classList.add('selected-program');
      const title = card.getAttribute('data-prog-title') || '';
      if (prodInput) {
        const current = prodInput.value.replace(/^\[.*?\]\s*/, '');
        prodInput.value = `[${title}] ${current}`.trim();
        prodInput.focus();
      }
    });
  });

  const form = container.querySelector('#b2b-rfq-form');
  const confirmBox = container.querySelector('#rfq-confirmation-box');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = container.querySelector('#rfq-submit-btn');
      const fd = new FormData(form);
      const packInfo = String(fd.get('packagingInfo') || '').trim();
      const rawDesc = String(fd.get('description') || '').trim();
      const reqType = String(fd.get('requestType') || 'product_quote');
      const fullDesc = packInfo ? `[Miktar/Ambalaj: ${packInfo}] ${rawDesc}` : rawDesc;

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Dashboard’a İletiliyor...';
        }
        const saved = await submitPublicCrmForm({
          companyName: fd.get('companyName'),
          contactName: fd.get('contactName'),
          phone: fd.get('phone'),
          email: fd.get('email'),
          cityCountry: fd.get('cityCountry'),
          formChannel: reqType === 'order_request' ? 'order_form' : 'quote_form',
          requestType: reqType,
          relatedProductOrSystem: fd.get('relatedProductOrSystem'),
          packagingInfo: packInfo,
          requestedAmount: packInfo,
          description: fullDesc,
          message: fullDesc,
          followUpDate: fd.get('followUpDate') || '',
          kvkkConsent: Boolean(fd.get('kvkkConsent')),
          sourcePage: '/teklif-al'
        });

        showNotification(
          reqType === 'order_request'
            ? 'Sipariş formunuz doğrudan Yönetim Dashboard ekranına iletildi!'
            : 'Teklif talebiniz doğrudan Yönetim Dashboard ekranına iletildi!',
          'success'
        );
        form.reset();
        if (confirmBox) {
          confirmBox.style.display = 'block';
          renderSafeHtml(confirmBox, `
            <h4>${reqType === 'order_request' ? '🛒 Sipariş Talebiniz' : '📋 Teklif Başvurunuz'} Kayıt Altına Alındı (Ref No: <code>${escapeHtml(saved.id)}</code>)</h4>
            <p>Sayın <strong>${escapeHtml(saved.contactName)}</strong>, <strong>${escapeHtml(saved.companyName)}</strong> adına ilettiğiniz <em>${escapeHtml(saved.relatedProductOrSystem)}</em> kaydınız Yönetim Paneli (Dashboard) ekranımıza <strong>Yeni Talep</strong> olarak düşmüştür. İlgili satış ve proses mühendisimiz en kısa sürede sizinle iletişime geçecektir.</p>
          `);
        }
      } catch (err) {
        showNotification(err.message || 'Sunucu kaydı sırasında bir hata oluştu.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sipariş / Teklif Formunu Gönder';
        }
      }
    });
  }
}

/* ==========================================================================
   7. İLETİŞİM SAYFASI (/iletisim) — EFKİM & ALFACHEM KURUMSAL BÖLGE MİMARİSİ
   ========================================================================== */
export function renderContactPage(container, navigate) {
  const regionalOffices = [
    {
      badge: 'GENEL MÜDÜRLÜK · FABRİKA & MERKEZ DEPO',
      title: 'Adana Merkez Tesis & Lojistik Üssü',
      region: 'Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana',
      address: companyInfo.address,
      mapsUrl: companyInfo.mapsUrl,
      coverage: 'Adana Merkez, Hacı Sabancı OSB (AOSB), Ceyhan Enerji Endüstri Bölgesi ve Çukurova Sevkiyat',
      phone: companyInfo.phoneDisplay,
      email: companyInfo.email,
      sla: 'Aynı Gün 90–120 Dakika Acil Sevkiyat & Laboratuvar Su Analizi'
    },
    {
      badge: 'ÇUKUROVA & LİMAN BÖLGE İRTİBAT',
      title: 'Mersin – Tarsus OSB & Serbest Bölge Mühendislik Hattı',
      region: 'Mersin (MTOSB 1–4. Bölge & Liman Sanayi Koridoru)',
      address: 'Mersin-Tarsus Organize Sanayi Bölgesi Lojistik Aksı, Akdeniz / Mersin',
      coverage: 'Düzcam/Cam Ambalaj, Krom/Soda, Gıda, Bakliyat, Kağıt ve Liman Dolum Tesisleri',
      phone: companyInfo.phoneDisplay,
      email: companyInfo.salesEmail,
      sla: 'Günde 2 Rut Sevkiyat (2–3 Saat Teslimat) & Yerinde RO/Kule Servisi'
    },
    {
      badge: 'DOĞU AKDENİZ AĞIR SANAYİ İRTİBAT',
      title: 'İskenderun Körfezi & Osmaniye Demir-Çelik Saha Ekibi',
      region: 'Hatay (İskenderun · Payas · Dörtyol) & Osmaniye OSB',
      address: 'Osmaniye OSB – Payas/İskenderun Demir-Çelik Sanayi Koridoru Saha Koordinasyon',
      coverage: 'Sıcak/Soğuk Haddehaneler, Çelikhane Tufal Çukurları, Asitleme Hatları ve Boru Tesisleri',
      phone: companyInfo.phoneDisplay,
      email: companyInfo.salesEmail,
      sla: '2–4 Saatte IBC/Tanker İkmal & Sahada Canlı 6’lı Jar-Test'
    },
    {
      badge: 'GÜNEYDOĞU ANADOLU BÖLGE İRTİBAT',
      title: 'Gaziantep & Kahramanmaraş Bölge Mühendislik Hizmetleri',
      region: 'Gaziantep (Başpınar 1.–5. OSB) & Kahramanmaraş',
      address: 'Gaziantep Başpınar OSB – Kahramanmaraş Sanayi Havzası Teknik Servis Hattı',
      coverage: 'Tekstil Boyahaneleri, Halı/İplik, Kağıt, Enerji Santralleri ve Gıda Kompleksleri',
      phone: companyInfo.phoneDisplay,
      email: companyInfo.salesEmail,
      sla: 'Aynı Gün / 24 Saat ADR’li Sevkiyat & Periyodik Su Şartlandırma Kontrolleri'
    },
    {
      badge: 'İÇ ANADOLU BÖLGE İRTİBAT',
      title: 'Kayseri OSB & Niğde Kalsit/Maden Saha Koordinasyon',
      region: 'Kayseri (OSB · Mimarsinan · İncesu) & Niğde / Bor OSB',
      address: 'Niğde Bor – Kayseri Organize Sanayi Bölgesi Kuzey Lojistik Koridoru',
      coverage: 'Mikronize Kalsit (CaCO₃) Değirmenleri, Çelik Boru/Profil, Sıcak Daldırma Galvaniz ve Mobilya/Metal',
      phone: companyInfo.phoneDisplay,
      email: companyInfo.salesEmail,
      sla: 'Pozantı Otoyol Aksından Kesintisiz Sevkiyat & Banyo/Polimer Optimizasyonu'
    }
  ];

  const coreServicePillars = [
    {
      code: '01',
      title: 'Kazan - Buhar ve Kondens Sistemleri Kimyasalları',
      desc: 'Oksijen tutucular (DEHA, Karbohidrazid, Sülfit), kışır ve depozit önleyiciler, uçucu amin bazlı kondens hattı korozyon inhibitörleri.',
      link: '/urunler?kategori=kazan-kimyasallari'
    },
    {
      code: '02',
      title: 'Soğutma Suyu ve Kapalı Devre Kimyasalları',
      desc: 'Açık/kapalı devre korozyon ve kireç inhibitörleri (HEDP, PBTC, Molibdat), oksitleyici ve oksitleyici olmayan biyositler (DBNPA, CMIT/MIT) ve biyodispersantlar.',
      link: '/urunler?kategori=sogutma-kulesi-kimyasallari'
    },
    {
      code: '03',
      title: 'Reverse Osmosis (RO) & EDI Sistemleri Kimyasalları',
      desc: 'Yüksek silis ve sülfat toleranslı fosfatsız membran antiskalantları, asidik/alkali CIP membran yıkama kimyasalları ve membran koruyucular.',
      link: '/urunler?kategori=ro-endustriyel-su-aritma'
    },
    {
      code: '04',
      title: 'Su Filtrasyon, Arıtım Sistemleri ve Ekipmanları',
      desc: 'Endüstriyel Ters Ozmoz (RO), Elektrodeiyonizasyon (EDI), tam otomatik yumuşatma, aktif karbon/multimedya filtrasyon ve dozaj pompası istasyonları.',
      link: '/sistemler'
    },
    {
      code: '05',
      title: 'Endüstriyel Bakım, Yüzey İşlem ve Proses Ürünleri',
      desc: 'Haddehane tufal flokülantları (A-PAM/C-PAM), HCl asitleme inhibitörleri, yağ/emülsiyon kırıcılar, silikonsuz köpük kesiciler, LABSA/SLES ve kalsit dispersantları.',
      link: '/urunler?kategori=proses-endustriyel-hammaddeler'
    }
  ];

  const html = `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb">
          <a href="/" data-nav>Ana Sayfa</a> <span>/</span> <span>Kurumsal İletişim & Bölge Müdürlükleri</span>
        </div>
        <h1>Kurumsal İletişim, Sizi Arayalım & Bölge Mühendislik Noktaları</h1>
        <p>Adana merkez fabrika ve depomuz (<strong>${escapeHtml(companyInfo.address)}</strong>) ile Mersin, İskenderun/Osmaniye, Gaziantep ve Kayseri/Niğde saha mühendislik ekiplerimizle 7/24 kesintisiz endüstriyel destek.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- EFKİM TARZI 3'LÜ HIZLI AKSİYON ŞERİDİ: SİZİ ARAYALIM / WHATSAPP / HEMEN ARA -->
        <div class="roi-simulators-grid" style="margin-bottom:3.5rem;">
          <!-- 1. Sizi Arayalım (Hızlı Geri Arama Kartı) -->
          <div class="card" style="padding:1.75rem;border-top:4px solid var(--accent-teal);">
            <span class="badge badge-teal" style="margin-bottom:0.6rem;">SİZİ ARAYALIM</span>
            <h3 style="font-size:1.2rem;margin-bottom:0.4rem;">Mühendislerimiz Sizi Arasın</h3>
            <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1rem;">Numaranızı bırakın; ilgili kimya veya su arıtma mühendisimiz 30 dakika içinde sizi arasın.</p>
            <form id="quick-callback-form" style="display:flex;flex-direction:column;gap:0.65rem;">
              <input type="text" name="contactName" class="form-input" required placeholder="Adınız Soyadınız *" />
              <input type="text" name="companyName" class="form-input" required placeholder="Firma / Fabrika Adı *" />
              <input type="tel" name="phone" class="form-input" required placeholder="Telefon Numaranız (+90 5XX...) *" />
              <select name="relatedProductOrSystem" class="form-select">
                <option value="Genel Teknik Görüşme & Fiyat Teklifi">Konu: Genel Teknik Görüşme & Fiyat</option>
                <option value="Kazan - Buhar ve Kondens Kimyasalları">Kazan - Buhar ve Kondens Kimyasalları</option>
                <option value="Soğutma Suyu & Kapalı Devre Kimyasalları">Soğutma Suyu & Kapalı Devre Kimyasalları</option>
                <option value="Reverse Osmosis (RO) Kimyasalları & Sistemleri">Reverse Osmosis (RO) Kimyasalları & Sistemleri</option>
                <option value="Atıksu Polimerleri (PAM) & Saha Jar-Test">Atıksu Polimerleri (PAM) & Saha Jar-Test</option>
                <option value="Haddehane / Asitleme İnhibitörü / Proses Kimyasalları">Haddehane / Asitleme / Proses Kimyasalları</option>
              </select>
              <button type="submit" class="btn btn-primary" id="callback-submit-btn" style="width:100%;">
                Beni Arayın (Geri Arama Talebi)
              </button>
            </form>
          </div>

          <!-- 2. WhatsApp ile Hemen İletişime Geçin -->
          <div class="card" style="padding:1.75rem;border-top:4px solid #10b981;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span class="badge" style="background:#ecfdf5;color:#047857;margin-bottom:0.6rem;">WHATSAPP HIZLI HAT</span>
              <h3 style="font-size:1.2rem;margin-bottom:0.5rem;">WhatsApp ile Hemen İletişime Geçin</h3>
              <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:1rem;">
                Mevcut su analizi raporunuzun, kazan/kule etiketinizin veya aradığınız kimyasalın SDS/COA belgesinin fotoğrafını doğrudan WhatsApp mühendislik hattımıza gönderebilirsiniz.
              </p>
              <ul style="font-size:0.85rem;color:var(--text-secondary);padding-left:1.1rem;margin-bottom:1.25rem;line-height:1.7;">
                <li>Anında TDS / SDS (GBF) Belge Paylaşımı</li>
                <li>Su Analiz Raporu Üzerinden Hızlı Dozaj Önerisi</li>
                <li>Acil IBC / Bidon Stok ve Sevkiyat Sorgulama</li>
              </ul>
            </div>
            <a href="https://wa.me/${escapeAttr(companyInfo.whatsappNumber)}?text=${encodeURIComponent('Merhaba Elif Kimya, kurumsal ürün ve mühendislik çözümleriniz hakkında bilgi almak istiyorum.')}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width:100%;background:#059669;border-color:#059669;text-align:center;">
              WhatsApp Mühendislik Hattını Aç (${escapeHtml(companyInfo.phoneDisplay)})
            </a>
          </div>

          <!-- 3. Doğrudan Telefon & İhale Masası -->
          <div class="card" style="padding:1.75rem;border-top:4px solid var(--accent-blue);display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span class="badge" style="background:#f0f9ff;color:#0369a1;margin-bottom:0.6rem;">7/24 KURUMSAL DESTEK</span>
              <h3 style="font-size:1.2rem;margin-bottom:0.5rem;">Hemen Arayın veya İhale Dosyası İletin</h3>
              <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:1rem;">
                Yıllık kimyasal alım şartnameleriniz, su arıtma sistemi projeleriniz ve acil servis talepleriniz için doğrudan merkez ofisimizle görüşün.
              </p>
              <div style="background:var(--bg-surface-alt);padding:1rem;border-radius:10px;margin-bottom:1rem;">
                <div style="font-size:0.8rem;color:var(--text-muted);">Merkez Telefon & Operasyon:</div>
                <a href="tel:${escapeAttr(companyInfo.phoneRaw)}" style="font-size:1.25rem;font-weight:800;color:var(--text-primary);text-decoration:none;display:block;margin:0.2rem 0;">${escapeHtml(companyInfo.phoneDisplay)}</a>
                <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.5rem;">Satış & Kurumsal Teklif E-posta:</div>
                <a href="mailto:${escapeAttr(companyInfo.salesEmail)}" style="font-size:0.95rem;font-weight:600;color:var(--accent-teal);">${escapeHtml(companyInfo.salesEmail)}</a>
              </div>
            </div>
            <div style="display:flex;gap:0.5rem;">
              <a href="tel:${escapeAttr(companyInfo.phoneRaw)}" class="btn btn-primary" style="flex:1;text-align:center;">Hemen Ara</a>
              <a href="/teklif-al" class="btn btn-secondary" data-nav style="flex:1;text-align:center;">Teklif Formu</a>
            </div>
          </div>
        </div>

        <!-- MERKEZ VE BÖLGE MÜDÜRLÜKLERİ / SAHA İRTİBAT NOKTALARI -->
        <div class="section-header" style="margin-bottom:2rem;">
          <span class="section-tag">Genel Müdürlük & Bölge İrtibat Noktaları</span>
          <h2 class="section-title">Adana Merkez ve Bölgesel Saha Mühendislik Ağımız</h2>
          <p class="section-desc">Çukurova, Doğu Akdeniz, Güneydoğu Anadolu ve İç Anadolu sanayi koridorlarında yerinde su analizi, Jar-Test ve hızlı lojistik.</p>
        </div>

        <div class="regions-grid" style="margin-bottom:4rem;">
          ${regionalOffices.map((off) => `
            <div class="region-card">
              <div class="region-badge">${escapeHtml(off.badge)}</div>
              <h3>${escapeHtml(off.title)}</h3>
              <p style="font-weight:600;color:var(--accent-teal);margin-bottom:0.4rem;">📍 ${escapeHtml(off.region)}</p>
              <p style="font-size:0.88rem;margin-bottom:0.65rem;"><strong>Adres / Aks:</strong> ${escapeHtml(off.address)}</p>
              <p style="font-size:0.86rem;color:var(--text-secondary);margin-bottom:0.75rem;"><strong>Kapsam:</strong> ${escapeHtml(off.coverage)}</p>
              <div style="background:var(--bg-teal-tint);padding:0.65rem 0.85rem;border-radius:8px;font-size:0.82rem;color:var(--text-primary);margin-bottom:1rem;">
                <strong>Saha SLA:</strong> ${escapeHtml(off.sla)}
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;padding-top:0.75rem;border-top:1px solid var(--border-subtle);font-size:0.85rem;">
                <a href="tel:${escapeAttr(companyInfo.phoneRaw)}" style="font-weight:700;color:var(--text-primary);">📞 ${escapeHtml(off.phone)}</a>
                <div style="display:flex;gap:0.4rem;">
                  ${off.mapsUrl ? `<a href="${escapeAttr(off.mapsUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">📍 Haritada Aç</a>` : ''}
                  <a href="/teklif-al?city=${encodeURIComponent(off.region)}" class="btn btn-sm btn-secondary" data-nav>Bölge Teklifi Al →</a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- ANA İLETİŞİM PANELİ VE MESAJ FORMU -->
        <div class="contact-layout-grid">
          <!-- İletişim Bilgileri Kartı -->
          <div class="contact-info-panel">
            <span class="section-tag">Merkez & Lojistik</span>
            <h2>${escapeHtml(companyInfo.legalName)}</h2>
            <p style="color:var(--text-secondary);margin-bottom:1.5rem;">Adana merkez depomuzdan Çukurova, İç Anadolu, Güneydoğu ve tüm Türkiye sanayi bölgelerine ADR standartlarında sevkiyat.</p>

            <div class="contact-detail-list">
              <div class="contact-detail-item">
                <strong>Genel Müdürlük & Merkez Depo</strong>
                <a href="${escapeAttr(companyInfo.mapsUrl)}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-teal);font-weight:700;text-decoration:underline;">
                  📍 ${escapeHtml(companyInfo.address)}
                </a>
              </div>
              <div class="contact-detail-item">
                <strong>Kurumsal Telefon & WhatsApp</strong>
                <a href="tel:${escapeAttr(companyInfo.phoneRaw)}">${escapeHtml(companyInfo.phoneDisplay)}</a>
              </div>
              <div class="contact-detail-item">
                <strong>Genel E-posta</strong>
                <a href="mailto:${escapeAttr(companyInfo.email)}">${escapeHtml(companyInfo.email)}</a>
              </div>
              <div class="contact-detail-item">
                <strong>Satış & İhale Masası</strong>
                <a href="mailto:${escapeAttr(companyInfo.salesEmail)}">${escapeHtml(companyInfo.salesEmail)}</a>
              </div>
              <div class="contact-detail-item">
                <strong>Çalışma Saatleri</strong>
                <span>${escapeHtml(companyInfo.workingHours)}</span>
              </div>
            </div>

            <div style="margin-top:1.5rem;border-radius:12px;overflow:hidden;border:2px solid var(--border-color);">
              <iframe
                title="Elif Kimya Merkez Konumu - Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana"
                src="https://maps.google.com/maps?q=Ova%20Mah.%20%C5%9Eakirpa%C5%9Fa%20Cd.%20No:269,%2001080%20Seyhan/Adana&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                width="100%"
                height="220"
                style="border:0;display:block;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div style="margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid var(--border-subtle);display:flex;gap:0.75rem;flex-wrap:wrap;">
              <a href="${escapeAttr(companyInfo.mapsUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">📍 Google Haritalar'da Yol Tarifi</a>
              <a href="/teklif-al" class="btn btn-secondary" data-nav>Detaylı Teklif Formu</a>
              <a href="/portal" class="btn btn-secondary" data-nav>Müşteri Portalı</a>
            </div>
          </div>

          <!-- Doğrudan İletişim Formu -->
          <div class="card" style="padding:2.25rem;">
            <span class="badge badge-teal" style="margin-bottom:0.5rem;">CANLI DASHBOARD ENTEGRASYONLU</span>
            <h3 style="margin-bottom:0.5rem;">Kurumsal İletişim, Sipariş & Tedarikçi Formu</h3>
            <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1.5rem;">İletiniz doğrudan Elif Çevre Kimya Yönetim Paneli (Dashboard) ve CRM ekranımıza gerçek zamanlı düşer.</p>

            <form id="direct-contact-form" class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Adınız Soyadınız *</label>
                <input type="text" name="name" class="form-input" required placeholder="Adınız Soyadınız" />
              </div>
              <div class="form-group">
                <label class="form-label">Firma Adı *</label>
                <input type="text" name="companyName" class="form-input" required placeholder="Firma Ünvanı" />
              </div>
              <div class="form-group">
                <label class="form-label">Telefon Numarası *</label>
                <input type="tel" name="phone" class="form-input" required placeholder="+90 5XX XXX XX XX" />
              </div>
              <div class="form-group">
                <label class="form-label">E-posta Adresi *</label>
                <input type="email" name="email" class="form-input" required placeholder="ornek@firma.com" />
              </div>
              <div class="form-group">
                <label class="form-label">Şehir / OSB / Bölge</label>
                <input type="text" name="cityCountry" class="form-input" value="Adana" />
              </div>
              <div class="form-group">
                <label class="form-label">Konu / İşlem Türü *</label>
                <input type="text" name="subject" class="form-input" required placeholder="Örn: Kimyasal Siparişi / Ürün Bilgisi / İhale" />
              </div>
              <div class="form-group full-width">
                <label class="form-label">Mesajınız / Sipariş Detayınız *</label>
                <textarea name="message" class="form-textarea" rows="4" required placeholder="Mesajınızı, sipariş etmek istediğiniz kimyasalları veya su arıtma sistemi ihtiyacınızı buraya yazınız..."></textarea>
              </div>
              <div class="form-group full-width">
                <button type="submit" class="btn btn-primary" id="contact-submit-btn" style="width:100%;">Mesajı Yönetim Dashboard'una Gönder</button>
              </div>
            </form>

            <div id="contact-confirmation-box" style="display:none;margin-top:1.25rem;" class="confirmation-card"></div>
          </div>
        </div>

        <!-- 5 ANA HİZMET VE ÜRÜN GRUBU ÖZETİ (EFKİM & ALFACHEM HİZMET MİMARİSİ) -->
        <div class="section-header" style="margin-top:4rem;margin-bottom:2rem;">
          <span class="section-tag">Endüstriyel Su Şartlandırma & Proses Uzmanlığı</span>
          <h2 class="section-title">Hizmet ve Ürün Gruplarımız</h2>
        </div>
        <div class="regions-grid">
          ${coreServicePillars.map((pil) => `
            <div class="card" style="padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <span class="badge badge-teal" style="margin-bottom:0.5rem;">GRUP ${escapeHtml(pil.code)}</span>
                <h3 style="font-size:1.1rem;margin-bottom:0.5rem;">${escapeHtml(pil.title)}</h3>
                <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1rem;">${escapeHtml(pil.desc)}</p>
              </div>
              <a href="${escapeAttr(pil.link)}" class="btn btn-sm btn-secondary" data-nav style="align-self:flex-start;">
                Grubu İncele →
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  renderSafeHtml(container, html);
  attachSpaLinks(container, navigate);

  // Hızlı Geri Arama ("Sizi Arayalım") Formu
  const cbForm = container.querySelector('#quick-callback-form');
  if (cbForm) {
    cbForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = container.querySelector('#callback-submit-btn');
      const fd = new FormData(cbForm);
      try {
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Dashboard’a Kaydediliyor...';
        }
        await submitPublicCrmForm({
          companyName: fd.get('companyName'),
          contactName: fd.get('contactName'),
          phone: fd.get('phone'),
          email: 'info@elifcevrekimya.com.tr',
          cityCountry: 'Adana / Bölge',
          formChannel: 'callback_form',
          requestType: 'callback_30min',
          subject: `[SİZİ ARAYALIM TALEBİ] ${fd.get('relatedProductOrSystem') || 'Genel Görüşme'}`,
          relatedProductOrSystem: `[SİZİ ARAYALIM TALEBİ] ${fd.get('relatedProductOrSystem') || 'Genel Görüşme'}`,
          description: `Müşteri /iletisim sayfasındaki "Sizi Arayalım" hızlı geri arama formu üzerinden acil telefon dönüşü talep etti. Konu: ${fd.get('relatedProductOrSystem') || 'Genel Görüşme'}`,
          kvkkConsent: true,
          sourcePage: '/iletisim#sizi-arayalim'
        });
        showNotification('Geri arama talebiniz Yönetim Dashboard ekranına düştü! Mühendisimiz en kısa sürede sizi arayacaktır.', 'success');
        cbForm.reset();
      } catch (err) {
        showNotification(err.message || 'Geri arama talebi gönderilemedi.', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Beni Arayın (Geri Arama Talebi)';
        }
      }
    });
  }

  // Doğrudan İletişim Formu
  const form = container.querySelector('#direct-contact-form');
  const contactConfirmBox = container.querySelector('#contact-confirmation-box');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = container.querySelector('#contact-submit-btn');
      const fd = new FormData(form);
      try {
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Dashboard’a Gönderiliyor...';
        }
        const saved = await submitContactMessage({
          name: fd.get('name'),
          companyName: fd.get('companyName'),
          phone: fd.get('phone'),
          email: fd.get('email'),
          cityCountry: fd.get('cityCountry'),
          subject: fd.get('subject'),
          message: fd.get('message'),
          kvkkConsent: true,
          sourcePage: '/iletisim'
        });
        showNotification('Mesajınız Yönetim Dashboard ekranına başarıyla iletildi!', 'success');
        form.reset();
        if (contactConfirmBox) {
          contactConfirmBox.style.display = 'block';
          renderSafeHtml(contactConfirmBox, `
            <h4>📩 İletişim Mesajınız Dashboard’a İletildi (Ref No: <code>${escapeHtml(saved.id)}</code>)</h4>
            <p>Sayın <strong>${escapeHtml(saved.contactName)}</strong>, <strong>${escapeHtml(saved.companyName)}</strong> adına gönderdiğiniz <em>"${escapeHtml(saved.subject || saved.relatedProductOrSystem)}"</em> konulu mesajınız merkez operasyon ekranımıza düşmüştür.</p>
          `);
        }
      } catch (err) {
        showNotification(err.message || 'Mesaj gönderilemedi.', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Mesajı Yönetim Dashboard\'una Gönder';
        }
      }
    });
  }
}

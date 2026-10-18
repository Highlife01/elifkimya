/**
 * Elif Kimya - Aydınlık Kurumsal Ana Sayfa (Home View)
 * Referans Mimari: Kurumsal Mühendislik Mirası (Alfachem & Efkim İlhamlı) +
 * Çukurova & Doğu Akdeniz Mega Sanayi B2B Satış Playbook'u
 */

import { productCategories, waterSystems, serviceRegions, companyInfo } from '../data/products.js';
import {
  MEGA_INDUSTRIAL_SECTORS,
  B2B_OFFER_PROGRAMS,
  LOGISTICS_COMPARISON_MATRIX,
  DECISION_MAKER_MATRIX,
  calculatePicklingInhibitorRoi,
  calculateSludgePolymerRoi,
  calculateBoilerScaleRoi
} from '../data/industrial-playbook.js';
import { fetchPublicProducts, submitPublicCrmForm } from '../firebase.js';
import { showNotification } from '../components/notification.js';
import { escapeHtml, escapeAttr, renderSafeHtml } from '../utils/security.js';

function attachSpaLinks(root, navigate) {
  if (!root || typeof navigate !== 'function') return;
  root.querySelectorAll('a[data-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || link.getAttribute('data-nav');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      e.preventDefault();
      navigate(href);
    });
  });
}

export async function renderHomePage(container, navigate) {
  if (!container) return;

  const heroImage = '/assets/hero-chemical.jpg';
  const whatsappUrl = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent('Merhaba Elif Kimya, kurumsal kimyasal ve su arıtma çözümleriniz hakkında teklif almak istiyorum.')}`;

  const html = `
    <!-- 1. AYDINLIK KURUMSAL HERO & HIZLI FABRİKA GİRİŞ PROGRAMLARI -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid-layout">
          <div class="hero-copy">
            <div class="hero-eyebrow">
              <span class="status-dot"></span>
              <span>ADANA MERKEZ · MERSİN · İSKENDERUN · GAZİANTEP · KAYSERİ · NİĞDE</span>
            </div>

            <h1 class="hero-title">
              Endüstriyel Su Şartlandırma,<br/>
              Proses Kimyasalları ve <span>Su Arıtma Mühendisliği</span>
            </h1>

            <p class="hero-lead">
              Demir-çelik haddehaneleri, sülfonasyon ve deterjan reaktörleri, kağıt fabrikaları, düzcam fırınları, mikronize kalsit değirmenleri ve galvaniz hatları için <strong>mikro seviyede formüle edilmiş şartlandırma kimyasalları</strong> ve anahtar teslim <strong>RO / EDI su arıtma sistemleri</strong>.
            </p>

            <div class="hero-cta-group">
              <a href="/teklif-al" class="btn btn-primary btn-lg" data-nav>
                Kurumsal Teklif &amp; Jar-Test İste →
              </a>
              <a href="/urunler" class="btn btn-secondary btn-lg" data-nav>
                Teknik Ürün Kataloğu
              </a>
              <a href="${escapeAttr(whatsappUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-lg" style="border-color:#10b981;color:#047857;">
                WhatsApp Mühendislik Hattı
              </a>
            </div>

            <div class="hero-trust-strip">
              <div class="trust-metric">
                <strong>2–4 Saat</strong>
                <span>Çukurova &amp; Doğu Akdeniz Sevk</span>
              </div>
              <div class="trust-metric">
                <strong>&lt; 0.1 µS/cm</strong>
                <span>RO + EDI Ultra Saf Su Kalitesi</span>
              </div>
              <div class="trust-metric">
                <strong>&gt; %98</strong>
                <span>Asitleme Banyosu Metal Koruması</span>
              </div>
              <div class="trust-metric">
                <strong>6 Saatte</strong>
                <span>Adana Lab Su &amp; LSI Risk Raporu</span>
              </div>
            </div>
          </div>

          <!-- Sağ Panel: Görsel & 4 Kapı Açıcı Fabrika Programı -->
          <div class="hero-visual-panel">
            <div class="hero-image-card">
              <img src="${heroImage}" alt="Elif Kimya Endüstriyel Su Arıtma ve Kimyasal Proses Çözümleri" class="hero-img" />
              <div class="hero-img-overlay-badge">
                <strong>Elif Kimya Mühendislik</strong>
                <span>Suyun kalitesi, prosesin güvenilirliğidir.</span>
              </div>
            </div>

            <div class="card" style="padding:1.25rem;margin-top:1rem;background:var(--bg-surface);">
              <div style="font-size:0.75rem;font-weight:800;letter-spacing:0.06em;color:var(--accent-teal);margin-bottom:0.65rem;">
                FABRİKALAR İÇİN SIFIR RİSKLİ 4 GİRİŞ PROGRAMI
              </div>
              <div style="display:flex;flex-direction:column;gap:0.5rem;">
                ${B2B_OFFER_PROGRAMS.map((prog, idx) => `
                  <a href="/teklif-al?program=${encodeURIComponent(prog.id)}" data-nav class="quick-program-row">
                    <span class="qp-index">0${idx + 1}</span>
                    <div class="qp-text">
                      <strong>${escapeHtml(prog.title)}</strong>
                      <span>${escapeHtml(prog.deliverable)}</span>
                    </div>
                    <span class="qp-chevron">→</span>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. KURUMSAL MÜHENDİSLİK MİRASI & HIZLI "SİZİ ARAYALIM" BANDI (ALFACHEM & EFKİM MİMARİSİ) -->
    <section class="section" style="background:var(--bg-surface);border-top:1px solid var(--border-subtle);border-bottom:1px solid var(--border-subtle);padding:3rem 0;">
      <div class="container">
        <div class="contact-layout-grid" style="align-items:center;">
          <div>
            <span class="section-tag">Adana Merkez &amp; Bölge Mühendislik Gücü</span>
            <h2 class="section-title" style="margin-top:0.4rem;">Üretim, Su Şartlandırma ve Anahtar Teslim Arıtma Sistemlerinde Tek Muhatap</h2>
            <p style="color:var(--text-secondary);margin-bottom:1rem;line-height:1.7;">
              Elif Kimya; Adana merkez tesis ve deposundan Mersin, İskenderun/Osmaniye, Gaziantep, Kayseri ve Niğde sanayi bölgelerine <strong>kazan-buhar-kondens kimyasalları, soğutma kulesi şartlandırıcıları, Reverse Osmosis (RO) membran kimyasalları, yüksek molekül ağırlıklı flokülantlar ve anahtar teslim su arıtma sistemleri</strong> sunar.
            </p>
            <div class="filter-pills" style="margin-top:1rem;">
              <a href="/urunler?kategori=kazan-kimyasallari" class="filter-pill" data-nav>Kazan &amp; Buhar Kimyasalları</a>
              <a href="/urunler?kategori=sogutma-kulesi-kimyasallari" class="filter-pill" data-nav>Soğutma Suyu Kimyasalları</a>
              <a href="/urunler?kategori=ro-endustriyel-su-aritma" class="filter-pill" data-nav>Reverse Osmosis Kimyasalları</a>
              <a href="/sistemler" class="filter-pill" data-nav>Su Filtrasyon &amp; Arıtım Sistemleri</a>
              <a href="/urunler?kategori=proses-endustriyel-hammaddeler" class="filter-pill" data-nav>Endüstriyel Bakım &amp; Proses</a>
            </div>
          </div>

          <div class="card" style="padding:1.75rem;background:var(--bg-teal-tint);border-color:rgba(13,148,136,0.28);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
              <span class="badge badge-teal">SİZİ ARAYALIM</span>
              <a href="tel:${escapeAttr(companyInfo.phoneRaw)}" style="font-weight:800;color:var(--accent-teal);font-size:0.95rem;">📞 ${escapeHtml(companyInfo.phoneDisplay)}</a>
            </div>
            <h3 style="font-size:1.15rem;margin-bottom:0.35rem;">30 Dakikada Mühendislik Geri Dönüşü</h3>
            <p style="font-size:0.86rem;color:var(--text-secondary);margin-bottom:1rem;">Firma ve telefon bilginizi bırakın, ilgili kimya mühendisimiz sizi hemen arasın.</p>
            <form id="home-callback-form" class="form-grid-2" style="gap:0.65rem;">
              <input type="text" name="companyName" class="form-input" required placeholder="Firma / Fabrika Adı *" style="background:#fff;" />
              <input type="text" name="contactName" class="form-input" required placeholder="Yetkili Adı Soyadı *" style="background:#fff;" />
              <input type="tel" name="phone" class="form-input" required placeholder="Telefon (+90 5XX...) *" style="background:#fff;" />
              <select name="relatedProductOrSystem" class="form-select" style="background:#fff;">
                <option value="Endüstriyel Kimyasal Teklifi">Endüstriyel Kimyasal Teklifi</option>
                <option value="Saha Jar-Test & Su Analizi">Saha Jar-Test &amp; Su Analizi</option>
                <option value="RO / EDI Su Arıtma Sistemi">RO / EDI Su Arıtma Sistemi</option>
                <option value="Haddehane & Asitleme İnhibitörü">Haddehane &amp; Asitleme İnhibitörü</option>
              </select>
              <div class="full-width">
                <button type="submit" class="btn btn-primary" id="home-cb-btn" style="width:100%;">
                  Sizi Arayalım (Hızlı Kayıt)
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. BÜYÜK SANAYİ TESİSLERİ İÇİN 4 KAPI AÇICI PROGRAM -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">01 / Kurumsal Fabrika Penetrasyon &amp; Güvence Programları</span>
          <h2 class="section-title">Tedarikçinizi Değiştirmeden Önce Sahada Kanıtımızı Görün</h2>
          <p class="section-desc">
            Büyük ölçekli üretim tesislerinde kimyasal geçişi sıfır riskle yönetiyoruz. Önce laboratuvar verisi ve canlı Jar-Test ile kanıtlıyor, ardından 30 günlük pilot protokol ve konsinye tank modeliyle süreci güvenceye alıyoruz.
          </p>
        </div>

        <div class="offer-programs-grid">
          ${B2B_OFFER_PROGRAMS.map((prog) => `
            <article class="offer-program-card">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">
                <span style="font-size:0.75rem;font-weight:800;color:var(--text-muted);">${escapeHtml(prog.code)}</span>
                <span class="offer-program-badge" style="margin:0;">${escapeHtml(prog.badge)}</span>
              </div>
              <h3>${escapeHtml(prog.title)}</h3>
              <p style="font-weight:600;color:var(--accent-teal);font-size:0.88rem;margin-bottom:0.5rem;">${escapeHtml(prog.subtitle)}</p>
              <p>${escapeHtml(prog.description)}</p>
              <ul style="font-size:0.84rem;color:var(--text-secondary);padding-left:1.1rem;margin:0.85rem 0 1.25rem;line-height:1.65;">
                ${prog.deliverables.map((d) => `<li>${escapeHtml(d)}</li>`).join('')}
              </ul>
              <a href="/teklif-al?program=${encodeURIComponent(prog.id)}" class="btn btn-primary" data-nav style="width:100%;margin-top:auto;">
                ${escapeHtml(prog.ctaLabel)} →
              </a>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 4. ÇUKUROVA & DOĞU AKDENİZ 6 MEGA SANAYİ PROSES MATRİSİ -->
    <section class="section" style="background:var(--bg-surface-alt);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">02 / Çukurova &amp; Doğu Akdeniz Mega Sanayi Prosesleri</span>
          <h2 class="section-title">Fabrikanızın Prosesine Özel Moleküler Mühendislik</h2>
          <p class="section-desc">
            Standart ticari karışımlar yerine; haddehane tufal çukurları, ekzotermik sülfonasyon reaktörleri, kağıt kafa kutuları, float cam fırınları, kalsit değirmenleri ve galvaniz banyolarına özel etken madde ve molekül ağırlığı (MW) tasarımı.
          </p>
        </div>

        <div class="categories-grid">
          ${MEGA_INDUSTRIAL_SECTORS.map((sec) => `
            <article class="category-card" style="display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div class="category-card-top">
                  <span class="category-code">${escapeHtml(sec.code)}</span>
                  <span class="category-tag">${escapeHtml(sec.badge)}</span>
                </div>
                <h3>${escapeHtml(sec.sectorTitle)}</h3>
                <p style="font-size:0.82rem;font-weight:700;color:var(--accent-teal);margin-bottom:0.4rem;">📍 ${escapeHtml(sec.regionFocus)}</p>
                <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.65rem;"><strong>Kapsam:</strong> ${escapeHtml(sec.targetComplexes)}</p>
                <p style="font-size:0.9rem;margin-bottom:1rem;">${escapeHtml(sec.summary)}</p>

                <div style="background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;padding:0.85rem;margin-bottom:1.1rem;">
                  ${sec.formulations.map((f) => `
                    <div style="padding:0.45rem 0;border-bottom:1px dashed var(--border-subtle);">
                      <div style="font-weight:700;font-size:0.86rem;color:var(--text-primary);">${escapeHtml(f.name)}</div>
                      <div style="font-size:0.79rem;color:var(--accent-teal);">${escapeHtml(f.activeIngredient)}</div>
                      <div style="font-size:0.76rem;color:var(--text-muted);">Spek: ${escapeHtml(f.technicalSpecs)} · Dozaj: <strong>${escapeHtml(f.dosage)}</strong></div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="category-card-actions">
                <a href="/sektorler#${escapeAttr(sec.slug)}" class="btn btn-sm btn-secondary" data-nav>Proses &amp; ROI Analizi</a>
                <a href="/teklif-al?sector=${encodeURIComponent(sec.sectorTitle)}&program=canli-jar-test" class="btn btn-sm btn-primary" data-nav>Bu Prosese Teklif Al →</a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 5. 6 ANA KİMYASAL KATEGORİSİ & SU ARITMA SİSTEMLERİ -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">03 / Ürün ve Sistem Kataloğu</span>
          <h2 class="section-title">6 Ana Endüstriyel Kimyasal Grubu &amp; Su Arıtma Sistemleri</h2>
          <p class="section-desc">
            Soğutma kuleleri, buhar kazanları, ters ozmoz (RO), ultra saf su (EDI), atık su flokülantları ve proses kimyasallarında TDS/SDS ve parti bazlı COA belgeli tedarik.
            <span id="home-live-product-badge"></span>
          </p>
        </div>

        <div class="categories-grid">
          ${productCategories.map((cat) => `
            <div class="category-card">
              <div class="category-card-top">
                <span class="category-code">${escapeHtml(cat.code)}</span>
                <span class="category-tag">${escapeHtml(cat.tag)}</span>
              </div>
              <h3>${escapeHtml(cat.title)}</h3>
              <p>${escapeHtml(cat.shortDesc)}</p>
              <ul class="subcat-preview-list">
                ${cat.subcategories.slice(0, 4).map((sub) => `
                  <li><strong>${escapeHtml(sub.name)}:</strong> ${escapeHtml(sub.desc)}</li>
                `).join('')}
              </ul>
              <div class="category-card-actions">
                <a href="/urunler?kategori=${encodeURIComponent(cat.id)}" class="btn btn-sm btn-secondary" data-nav>Teknik Detay &amp; TDS</a>
                <a href="/teklif-al?product=${encodeURIComponent(cat.title)}" class="btn btn-sm btn-primary" data-nav>Teklif İste →</a>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Su Arıtma Sistemleri Önizleme -->
        <div style="margin-top:3.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem;">
            <div>
              <span class="section-tag">Mühendislik &amp; Kurulum</span>
              <h3 style="font-size:1.5rem;margin-top:0.25rem;">Endüstriyel Su Arıtma Sistemleri (RO · EDI · Yumuşatma · Filtrasyon)</h3>
            </div>
            <a href="/sistemler" class="btn btn-secondary" data-nav>Tüm Su Arıtma Sistemlerini İncele →</a>
          </div>
          <div class="systems-grid">
            ${waterSystems.slice(0, 3).map((sys) => `
              <div class="system-card">
                <div class="system-card-header">
                  <span class="system-code">${escapeHtml(sys.code)}</span>
                  <span class="system-cap-badge">${escapeHtml(sys.capacityRange)}</span>
                </div>
                <h3>${escapeHtml(sys.title)}</h3>
                <p>${escapeHtml(sys.summary)}</p>
                <div class="system-card-footer">
                  <a href="/teklif-al?type=water_project&product=${encodeURIComponent(sys.title)}" class="btn btn-sm btn-primary" data-nav>Proje Teklifi Al</a>
                  <a href="/sistemler" class="btn btn-sm btn-secondary" data-nav>Teknik Şartname</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- 6. LOJİSTİK ÜSTÜNLÜK TABLOSU (ADANA AOSB VS MARMARA TEDARİKÇİLERİ) -->
    <section class="section" style="background:var(--bg-surface-alt);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">04 / Bölgesel Lojistik ve Mühendislik Üstünlüğü</span>
          <h2 class="section-title">Marmara’dan Kamyon Beklemeyin; Adana Merkezden 2 Saatte Deponuzdayız</h2>
          <p class="section-desc">
            Çukurova, İskenderun Körfezi, Gaziantep, Kayseri ve Niğde sanayi havzasındaki tesisler için şehir dışı tedarikçilerin 40.000–65.000 TL navlun maliyetini ve kış/geçit duruş riskini ortadan kaldırıyoruz.
          </p>
        </div>

        <div class="products-table-wrapper" style="margin-bottom:2.5rem;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Operasyonel Kriter</th>
                <th>İstanbul / Kocaeli / Gebze Tedarikçisi</th>
                <th style="background:var(--bg-teal-tint);color:var(--accent-teal);">Elif Kimya (Adana AOSB &amp; Bölge Lojistiği)</th>
                <th>Tesisinize Net Finansal &amp; Operasyonel Etkisi</th>
              </tr>
            </thead>
            <tbody>
              ${LOGISTICS_COMPARISON_MATRIX.map((row) => `
                <tr>
                  <td><strong>${escapeHtml(row.criterion)}</strong></td>
                  <td style="color:var(--text-secondary);">${escapeHtml(row.marmaraCompetitor)}</td>
                  <td style="background:var(--bg-teal-tint);font-weight:700;color:var(--text-primary);">✓ ${escapeHtml(row.elifKimyaAdvantage)}</td>
                  <td><span class="badge badge-teal">${escapeHtml(row.financialImpact)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="regions-grid">
          ${serviceRegions.slice(0, 4).map((reg) => `
            <div class="region-card">
              <div class="region-badge">${escapeHtml(reg.badge)}</div>
              <h3>${escapeHtml(reg.region)}</h3>
              <p>${escapeHtml(reg.details)}</p>
              <div class="region-highlights">
                ${reg.highlights.map((h) => `<span class="highlight-chip">${escapeHtml(h)}</span>`).join('')}
              </div>
              <div style="margin-top:1rem;">
                <a href="/hizmet-bolgeleri" class="btn btn-sm btn-secondary" data-nav>OSB Teslimat Detayı →</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 7. KARAR VERİCİ MATRİSİ VE SON TEKLİF ÇAĞRISI -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">05 / Kurumsal Karar Verici Güvencesi</span>
          <h2 class="section-title">Fabrikanızdaki Her Departman İçin Doğrulanabilir Mühendislik Kanıtı</h2>
        </div>

        <div class="decision-matrix-grid" style="margin-bottom:3.5rem;">
          ${DECISION_MAKER_MATRIX.map((dm) => `
            <div class="decision-card">
              <div class="decision-role">${escapeHtml(dm.roleTitle)}</div>
              <div class="decision-kpi"><strong>Odak KPI:</strong> ${escapeHtml(dm.primaryKpi)}</div>
              <p class="decision-value">${escapeHtml(dm.valueProposition)}</p>
              <div class="decision-proof"><strong>Sunulan Kanıt:</strong> ${escapeHtml(dm.proofDocument)}</div>
            </div>
          `).join('')}
        </div>

        <div class="card" style="padding:2.5rem;background:linear-gradient(135deg,#f0fdfa 0%,#e0f2fe 100%);border-color:rgba(13,148,136,0.3);text-align:center;">
          <span class="badge badge-teal" style="margin-bottom:0.75rem;">KURUMSAL İHALE &amp; SAHA MÜHENDİSLİĞİ</span>
          <h2 style="font-size:1.85rem;margin-bottom:0.75rem;">Tesisinizin Yıllık Kimyasal, Enerji ve Su Maliyetini Birlikte Düşürelim</h2>
          <p style="max-width:720px;margin:0 auto 1.5rem;color:var(--text-secondary);">
            Ücretsiz Korozyon &amp; LSI Risk Raporu, fabrikanızda canlı 6’lı Jar-Test gösterimi, 30 günlük sıfır riskli pilot deneme veya doğrudan kurumsal fiyat teklifi için mühendislik ekibimizle hemen iletişime geçin.
          </p>
          <div style="display:flex;justify-content:center;gap:0.85rem;flex-wrap:wrap;">
            <a href="/teklif-al" class="btn btn-primary btn-lg" data-nav>Kurumsal Teklif &amp; Numune Formu →</a>
            <a href="/sektorler#roi-calculators" class="btn btn-secondary btn-lg" data-nav>Canlı ROI &amp; Tasarruf Simülatörleri</a>
            <a href="/iletisim" class="btn btn-secondary btn-lg" data-nav>Bölge Müdürlükleri &amp; Sizi Arayalım</a>
          </div>
        </div>
      </div>
    </section>
  `;

  renderSafeHtml(container, html);
  attachSpaLinks(container, navigate);

  // Hızlı "Sizi Arayalım" formu
  const cbForm = container.querySelector('#home-callback-form');
  if (cbForm) {
    cbForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = container.querySelector('#home-cb-btn');
      const fd = new FormData(cbForm);
      try {
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Sunucuya Kaydediliyor...';
        }
        await submitPublicCrmForm({
          companyName: fd.get('companyName'),
          contactName: fd.get('contactName'),
          phone: fd.get('phone'),
          email: 'geri-arama@elifkimya.com.tr',
          cityCountry: 'Adana / Bölge',
          requestType: 'product_quote',
          relatedProductOrSystem: `[ANA SAYFA SİZİ ARAYALIM] ${fd.get('relatedProductOrSystem')}`,
          description: 'Ana sayfadaki 30 Dakikada Mühendislik Geri Dönüşü ("Sizi Arayalım") formu üzerinden gönderildi.',
          kvkkConsent: true,
          sourcePage: '/'
        });
        showNotification('Geri arama talebiniz sunucuya kaydedildi. Mühendisimiz sizinle iletişime geçecektir.', 'success');
        cbForm.reset();
      } catch (err) {
        showNotification(err.message || 'Talep kaydedilemedi.', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Sizi Arayalım (Hızlı Kayıt)';
        }
      }
    });
  }

  // Canlı ürün sayısı rozetini güncelle
  try {
    const liveProducts = await fetchPublicProducts();
    const badgeEl = container.querySelector('#home-live-product-badge');
    if (badgeEl && liveProducts.length > 0) {
      badgeEl.textContent = ` (Canlı veritabanında ${liveProducts.length} doğrulanmış ürün yayında.)`;
    }
  } catch (_err) {
    // Sessizce geç
  }
}

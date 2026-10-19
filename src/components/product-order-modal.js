import { escapeAttr, escapeHtml, renderSafeHtml } from '../utils/security.js';
import { submitPublicCrmForm } from '../firebase.js';
import { showNotification } from './notification.js';
import { allMedipureProducts } from '../data/medipure-catalog.js';
import { companyInfo, productCategories } from '../data/products.js';
import { translatePageDom } from '../utils/i18n.js';

let modalHost = null;

function ensureModalHost() {
  if (modalHost && document.body.contains(modalHost)) {
    return modalHost;
  }
  modalHost = document.createElement('div');
  modalHost.id = 'global-product-order-modal-host';
  document.body.appendChild(modalHost);
  return modalHost;
}

export function closeProductOrderModal() {
  if (!modalHost) return;
  renderSafeHtml(modalHost, '');
  document.body.style.overflow = '';
}

function findMedipureByCode(code) {
  const norm = String(code || '').trim().toUpperCase();
  return allMedipureProducts().find((p) => String(p.code || '').toUpperCase() === norm) || null;
}

export function resolveChemicalProductData(raw = {}) {
  const queryTitle = String(raw.title || raw.name || '').trim();
  const querySlug = String(raw.slug || raw.id || '').trim();
  const queryCatId = String(raw.categoryId || raw.category || '').trim();

  // Search subcategories first
  for (const cat of productCategories) {
    for (const sub of cat.subcategories || []) {
      if (
        (querySlug && sub.slug === querySlug) ||
        (queryTitle && sub.name.toLowerCase() === queryTitle.toLowerCase()) ||
        (queryTitle && sub.name.toLowerCase().includes(queryTitle.toLowerCase())) ||
        (queryTitle && queryTitle.toLowerCase().includes(sub.name.toLowerCase()))
      ) {
        return {
          code: `KIM-${cat.code || '01'}`,
          title: raw.title || sub.name,
          categoryTitle: cat.title,
          activeChemical: raw.activeChemical || raw.materialSpec || sub.activeChemical || 'Endüstriyel Spesifikasyon Formülü',
          description: raw.description || raw.desc || sub.desc || cat.description,
          specs: Array.isArray(raw.specs) && raw.specs.length ? raw.specs : (sub.specs || []),
          packaging: raw.packaging || raw.moq || cat.packaging || '30 kg Bidon / 1000 kg IBC / Dökme Tanker',
          image: raw.image || '/assets/cat-cooling.jpg',
          priceLabel: raw.priceLabel || 'Ambalaj ve Tonajsal Sipariş Fiyatı'
        };
      }
    }
    if ((queryCatId && cat.id === queryCatId) || (querySlug && cat.id === querySlug) || (queryTitle && cat.title.toLowerCase() === queryTitle.toLowerCase())) {
      const subNames = (cat.subcategories || []).map((s) => `${s.name}: ${s.activeChemical}`);
      return {
        code: `KAT-${cat.code || '01'}`,
        title: raw.title || cat.title,
        categoryTitle: cat.shortTitle || 'Endüstriyel Kimyasal Grubu',
        activeChemical: raw.activeChemical || raw.materialSpec || (cat.subcategories?.[0]?.activeChemical) || 'Çoklu Proses Etken Maddeleri',
        description: raw.description || raw.desc || cat.shortDesc || cat.description,
        specs: Array.isArray(raw.specs) && raw.specs.length ? raw.specs : subNames,
        packaging: raw.packaging || raw.moq || cat.packaging || '30 kg Bidon / 1000 kg IBC / Dökme Tanker',
        image: raw.image || '/assets/cat-cooling.jpg',
        priceLabel: raw.priceLabel || 'Ambalaj ve Tonajsal Sipariş Fiyatı'
      };
    }
  }

  return {
    code: raw.code || 'ELIF-KIMYA',
    title: queryTitle || 'Endüstriyel Kimyasal Ürün',
    categoryTitle: raw.categoryTitle || raw.badgeText || 'Endüstriyel Proses & Arıtma Kimyasalı',
    activeChemical: raw.activeChemical || raw.materialSpec || 'Parti Bazlı COA & SDS Doğrulamalı Spesifikasyon',
    description: raw.description || raw.desc || 'Endüstriyel su şartlandırma, atıksu arıtma ve fabrika proses hatları için parti bazlı analiz sertifikalı (COA) ve güvenlik bilgi formlu (SDS/GBF) kimyasal ürün.',
    specs: Array.isArray(raw.specs) && raw.specs.length
      ? raw.specs
      : [
          'Belgelendirme: Parti Bazlı Analiz Sertifikası (COA) ve Türkçe SDS/GBF',
          'Sevkiyat: ADR Lisanslı Çukurova Merkez Depo & Türkiye Geneli Lojistik',
          `Ambalaj Seçenekleri: ${raw.packaging || raw.moq || '25-30 kg Bidon / 1000 kg IBC / Dökme Tanker'}`
        ],
    packaging: raw.packaging || raw.moq || '30 kg Bidon / 1000 kg IBC / Dökme Tanker',
    image: raw.image || '/assets/hero-chemical.jpg',
    priceLabel: raw.priceLabel || 'Toptan & Kurumsal Sipariş'
  };
}

export function openMedipureProductModal(productOrCode, { mode = 'detail' } = {}) {
  const product = typeof productOrCode === 'string'
    ? findMedipureByCode(productOrCode)
    : (productOrCode?.specs ? productOrCode : (findMedipureByCode(productOrCode?.code) || productOrCode));

  if (!product) return;

  const host = ensureModalHost();
  const descPoints = Array.isArray(product.descriptionPoints) && product.descriptionPoints.length
    ? product.descriptionPoints
    : [product.summary || `${product.code} ${product.name} (${product.capacity}) su saflaştırma cihazı.`];
  const usageAreas = Array.isArray(product.usageAreas) && product.usageAreas.length
    ? product.usageAreas
    : ['Laboratuvar & Analitik Uygulamalar', 'Medikal & Klinik Saf Su', 'Endüstriyel Proses Saf Suyu'];
  const specs = Array.isArray(product.specs) && product.specs.length
    ? product.specs
    : [
        { label: 'Marka', value: 'Medipure' },
        { label: 'Model', value: product.code },
        { label: 'Kategori', value: product.categoryTitle || product.name },
        { label: 'Kapasite', value: product.capacity },
        { label: 'Liste Fiyatı', value: `${product.listPriceEur} €` }
      ];

  const waClean = String(companyInfo.whatsappNumber || '905464992342').replace(/[^0-9]/g, '');
  const waText = `Merhaba Elif Çevre Kimya, Medipure ${product.code} ${product.name} (${product.capacity}) cihazı için sipariş ve teknik detay bilgisi almak istiyorum.`;
  const waUrl = `https://wa.me/${waClean}?text=${encodeURIComponent(waText)}`;

  const html = `
    <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/75 p-3 sm:p-6 backdrop-blur-sm overflow-y-auto" data-modal-backdrop>
      <div class="relative my-auto w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="medipure-modal-title">
        <!-- Üst Başlık Barı -->
        <div class="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-md">
          <div class="flex items-center gap-2.5">
            <span class="rounded-lg bg-emerald-700 px-3 py-1 font-mono text-xs font-black text-white">${escapeHtml(product.code)}</span>
            <span class="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-900">${escapeHtml(product.categoryTitle || 'Medipure Su Saflaştırma')}</span>
            <span class="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-emerald-300">${escapeHtml(product.capacity)}</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" data-scroll-order class="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow-sm hover:bg-emerald-700 transition">
              🛒 Hemen Sipariş Ver
            </button>
            <button type="button" data-modal-close class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold" aria-label="Kapat">
              ✕
            </button>
          </div>
        </div>

        <div class="p-5 sm:p-7 space-y-7">
          <!-- Üst Ürün Özeti & Görsel -->
          <div class="grid gap-6 lg:grid-cols-12 items-start">
            <div class="lg:col-span-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col items-center justify-center">
              <img
                src="${escapeAttr(product.image)}"
                alt="${escapeAttr(`${product.code} ${product.name}`)}"
                width="420"
                height="420"
                class="max-h-72 w-auto object-contain"
              />
              <div class="mt-4 w-full grid grid-cols-2 gap-2 text-center">
                <div class="rounded-xl border border-slate-200 bg-white p-2.5">
                  <p class="text-[10px] font-bold uppercase text-slate-500">Nominal Kapasite</p>
                  <p class="font-display text-sm font-black text-slate-900">${escapeHtml(product.capacity)}</p>
                </div>
                <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-2.5">
                  <p class="text-[10px] font-bold uppercase text-emerald-700">Gösterge Liste (KDV Hariç)</p>
                  <p class="font-display text-base font-black text-emerald-950">${escapeHtml(product.listPriceEur)} €</p>
                </div>
              </div>
              <p class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 text-center">
                💡 KDV, nakliye ve saha montajı hariçtir • Güncel kur, stok ve 2 yıl cihaz garantisi (sarf hariç) teklifte netleşir
              </p>
            </div>

            <div class="lg:col-span-7 space-y-4">
              <div>
                <p class="text-xs font-extrabold uppercase tracking-wider text-emerald-700">Medipure® GEN-6 Su Saflaştırma &amp; EDI Sistemleri</p>
                <h2 id="medipure-modal-title" class="mt-1 font-display text-2xl sm:text-3xl font-black text-slate-900">
                  ${escapeHtml(product.code)} — ${escapeHtml(product.name)} (${escapeHtml(product.capacity)})
                </h2>
              </div>

              <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2.5">
                <h3 class="text-xs font-black uppercase tracking-wider text-slate-900">📋 Cihaz Açıklaması ve Teknolojik Özellikler</h3>
                <ul class="space-y-2 text-sm leading-relaxed text-slate-700 list-disc pl-5">
                  ${descPoints.map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}
                </ul>
              </div>

              ${usageAreas.length ? `
                <div>
                  <h3 class="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">🔬 Kullanım ve Uygulama Alanları</h3>
                  <div class="flex flex-wrap gap-1.5">
                    ${usageAreas.map((area) => `
                      <span class="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">${escapeHtml(area)}</span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <div class="flex flex-wrap gap-2.5 pt-1">
                <button type="button" data-scroll-order class="rounded-xl bg-emerald-600 px-5 py-3 text-xs font-extrabold text-white shadow-sm hover:bg-emerald-700 transition">
                  🛒 Sipariş Ver (Dashboard'a İlet)
                </button>
                <a href="${escapeAttr(waUrl)}" target="_blank" rel="noopener noreferrer" class="rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-extrabold text-slate-800 hover:border-emerald-500 transition">
                  💬 WhatsApp Sipariş &amp; Destek
                </a>
              </div>
            </div>
          </div>

          <!-- Teknik Özellikler Tablosu -->
          <div class="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div class="bg-slate-900 px-5 py-3.5 text-white flex items-center justify-between">
              <h3 class="font-display text-sm font-extrabold uppercase tracking-wider">⚙️ ${escapeHtml(product.code)} ${escapeHtml(product.name)} — Teknik Özellikler Tablosu</h3>
              <span class="text-xs font-mono text-emerald-300">${specs.length} Teknik Parametre</span>
            </div>
            <div class="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
              <div class="divide-y divide-slate-100">
                ${specs.slice(0, Math.ceil(specs.length / 2)).map((row) => `
                  <div class="grid grid-cols-5 gap-2 px-4 py-2.5 text-xs">
                    <span class="col-span-2 font-bold text-slate-600">${escapeHtml(row.label)}</span>
                    <span class="col-span-3 font-semibold text-slate-900">${escapeHtml(row.value)}</span>
                  </div>
                `).join('')}
              </div>
              <div class="divide-y divide-slate-100">
                ${specs.slice(Math.ceil(specs.length / 2)).map((row) => `
                  <div class="grid grid-cols-5 gap-2 px-4 py-2.5 text-xs">
                    <span class="col-span-2 font-bold text-slate-600">${escapeHtml(row.label)}</span>
                    <span class="col-span-3 font-semibold text-slate-900">${escapeHtml(row.value)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Hızlı Sipariş & Teklif Talebi Formu -->
          <div id="modal-order-form-section" class="rounded-3xl border-2 border-emerald-500 bg-emerald-50/50 p-5 sm:p-6">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <span class="inline-block rounded-full bg-emerald-700 px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-white">Kurumsal Sipariş &amp; Teklif Talebi</span>
                <h3 class="mt-1 font-display text-xl font-black text-slate-900">🛒 ${escapeHtml(product.code)} ${escapeHtml(product.name)} — Sipariş Ver</h3>
                <p class="text-xs text-slate-600">Talebiniz Yönetim Paneli (Dashboard) ekranına iletilir; besleme suyu analizi, güncel kur, stok/termin, KDV, nakliye ve montaj kapsamı teyit edilerek resmi proforma teklif sunulur.</p>
              </div>
              <div class="text-right">
                <span class="text-[11px] font-bold text-slate-500 block">Gösterge Liste (KDV/Nakliye/Montaj Hariç)</span>
                <strong class="font-display text-lg font-black text-emerald-900">${escapeHtml(product.listPriceEur)} €</strong>
              </div>
            </div>

            <form id="modal-medipure-order-form" class="grid gap-3.5 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-slate-700 mb-1">Talep Edilen Cihaz &amp; Model</label>
                <input type="text" name="productLabel" readonly value="${escapeAttr(`${product.code} — ${product.name} (${product.capacity}) | Gösterge Liste: ${product.listPriceEur} EUR (KDV/Nakliye/Montaj Hariç)`)}" class="w-full rounded-xl border border-slate-300 bg-slate-100 px-3.5 py-2.5 text-xs font-bold text-slate-800" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Firma / Kurum / Laboratuvar Adı *</label>
                <input type="text" name="companyName" required placeholder="Örn: Çukurova Üniversitesi Merkez Lab. / ABC Sanayi A.Ş." class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Yetkili Ad Soyad *</label>
                <input type="text" name="contactName" required placeholder="Adınız Soyadınız" class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Telefon Numarası *</label>
                <input type="tel" name="phone" required placeholder="05XX XXX XX XX" class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Kurumsal E-posta *</label>
                <input type="email" name="email" required placeholder="ornek@firma.com.tr" class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Sipariş Adedi &amp; Kurulum Tercihi *</label>
                <select name="deliveryOption" class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900">
                  <option value="1 Adet Cihaz + Anahtar Teslim Kurulum & Devreye Alma">1 Adet Cihaz + Anahtar Teslim Kurulum &amp; Devreye Alma</option>
                  <option value="1 Adet Cihaz + Yedek Kartuş/Sarf Paketi + Kurulum">1 Adet Cihaz + Yedek Kartuş/Sarf Paketi + Kurulum</option>
                  <option value="2+ Adet Kurumsal Çoklu Cihaz Siparişi">2+ Adet Kurumsal Çoklu Cihaz Siparişi</option>
                  <option value="Yalnızca Cihaz Gönderimi (Ambar/Kargo)">Yalnızca Cihaz Gönderimi (Ambar/Kargo)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Teslimat Şehri / OSB *</label>
                <input type="text" name="cityCountry" required placeholder="Örn: Adana / Mersin / Gaziantep / İstanbul" value="Adana / Türkiye" class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-slate-700 mb-1">Sipariş &amp; Teknik Notunuz (Besleme suyu tipi, teslim tarihi vb.)</label>
                <textarea name="notes" rows="2" placeholder="Varsa şebeke/kuyu suyu iletkenliği, istenen opsiyonel modüller veya fatura/teslimat notunuzu yazabilirsiniz..." class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900"></textarea>
              </div>
              <div class="sm:col-span-2 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                <label class="flex items-start gap-2.5 cursor-pointer font-semibold">
                  <input type="checkbox" name="kvkkConsent" required class="mt-0.5 h-4 w-4 accent-emerald-600" />
                  <span>6698 sayılı KVKK kapsamında iletişim ve firma verilerimin kurumsal sipariş/teklif hazırlığı amacıyla işlenmesini kabul ediyorum. *</span>
                </label>
                <details class="mt-1.5 pl-6 text-[11px] text-slate-600">
                  <summary class="cursor-pointer font-bold text-emerald-800 hover:underline">KVKK Aydınlatma Özeti</summary>
                  <p class="mt-1 leading-relaxed">Veri Sorumlusu: Elif Çevre Kimya (Ova Mah. Şakirpaşa Cd. No:269 Seyhan/Adana, info@elifcevrekimya.com.tr). İletilen ad, firma, telefon, e-posta ve talep verileri yalnızca B2B tekliflendirme, teknik doğrulama ve sevkiyat iletişimi amacıyla KVKK m.5/2-c ve m.5/2-f hukuki sebeplerine dayanılarak işlenir; üçüncü taraf reklam ağlarıyla paylaşılmaz.</p>
                </details>
              </div>
              <div class="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-1">
                <span class="text-xs text-slate-600">🔒 Talebiniz doğrudan <strong>elifkimya</strong> veritabanına kaydedilir ve resmi proforma teklif ile teyit edilir.</span>
                <button type="submit" id="modal-order-submit-btn" class="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-extrabold text-white shadow-md hover:bg-emerald-800 transition">
                  ✅ Sipariş &amp; Teklif Talebini Gönder
                </button>
              </div>
              <div id="modal-order-feedback" class="sm:col-span-2" hidden></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  renderSafeHtml(host, html);
  document.body.style.overflow = 'hidden';

  bindModalCommonEvents(host, mode);

  const form = host.querySelector('#modal-medipure-order-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = host.querySelector('#modal-order-submit-btn');
    const feedback = host.querySelector('#modal-order-feedback');
    const fd = new FormData(form);

    const companyName = String(fd.get('companyName') || '').trim();
    const contactName = String(fd.get('contactName') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const deliveryOption = String(fd.get('deliveryOption') || '1 Adet Cihaz').trim();
    const cityCountry = String(fd.get('cityCountry') || 'Adana / Türkiye').trim();
    const notes = String(fd.get('notes') || '').trim();

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Talep Kaydediliyor...';
      }
      await submitPublicCrmForm({
        companyName,
        contactName,
        phone,
        email,
        cityCountry,
        formChannel: 'order_form',
        requestType: 'order_request',
        subject: `[MEDIPURE SİPARİŞ/TEKLİF] ${product.code} ${product.name} (${product.capacity})`,
        relatedProductOrSystem: `${product.code} — ${product.name} (${product.capacity})`,
        packagingInfo: `${deliveryOption} • Gösterge Liste: ${product.listPriceEur} EUR`,
        description: [
          `[MEDIPURE SU SAFLAŞTIRMA CİHAZ SİPARİŞ & TEKLİF TALEBİ]`,
          `Model Kodu: ${product.code}`,
          `Cihaz Adı: ${product.name}`,
          `Kategori: ${product.categoryTitle || '-'}`,
          `Kapasite: ${product.capacity}`,
          `Gösterge Liste Fiyatı (KDV/Nakliye/Montaj Hariç): ${product.listPriceEur} EUR`,
          `Kurulum / Paket Tercihi: ${deliveryOption}`,
          `Teslimat Şehri: ${cityCountry}`,
          `Müşteri Notu: ${notes || 'Belirtilmedi'}`
        ].join('\n'),
        sourcePage: window.location.pathname
      });

      showNotification(`${product.code} sipariş ve teklif talebiniz alındı, yönetim paneline iletildi.`, 'success');
      if (feedback) {
        feedback.hidden = false;
        renderSafeHtml(feedback, `
          <div class="rounded-2xl border border-emerald-300 bg-emerald-100 px-4 py-3 text-xs font-bold text-emerald-950">
            ✅ <strong>${escapeHtml(product.code)} — ${escapeHtml(product.name)}</strong> sipariş ve teklif talebiniz sunucuya doğrulandı. Satış mühendislerimiz stok, güncel kur ve teslimat kapsamını teyit ederek resmi teklifinizi iletecektir.
          </div>
        `);
      }
      form.reset();
    } catch (err) {
      showNotification(err.message || 'Sipariş gönderilirken bir hata oluştu.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '✅ Sipariş & Teklif Talebini Gönder';
      }
    }
  });
}

export function openChemicalProductModal(rawChemical, { mode = 'detail' } = {}) {
  const chem = resolveChemicalProductData(rawChemical);
  const host = ensureModalHost();

  const waClean = String(companyInfo.whatsappNumber || '905464992342').replace(/[^0-9]/g, '');
  const waText = `Merhaba Elif Çevre Kimya, "${chem.title}" ürünü için kurumsal sipariş/teklif ve güncel SDS/TDS/COA bilgisi almak istiyorum.`;
  const waUrl = `https://wa.me/${waClean}?text=${encodeURIComponent(waText)}`;

  const html = `
    <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/75 p-3 sm:p-6 backdrop-blur-sm overflow-y-auto" data-modal-backdrop>
      <div class="relative my-auto w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="chemical-modal-title">
        <!-- Üst Başlık Barı -->
        <div class="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-md">
          <div class="flex items-center gap-2.5">
            <span class="rounded-lg bg-slate-900 px-3 py-1 font-mono text-xs font-black text-emerald-300">${escapeHtml(chem.code)}</span>
            <span class="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-900">${escapeHtml(chem.categoryTitle)}</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" data-scroll-order class="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow-sm hover:bg-emerald-700 transition">
              🛒 Sipariş Ver
            </button>
            <button type="button" data-modal-close class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold" aria-label="Kapat">
              ✕
            </button>
          </div>
        </div>

        <div class="p-5 sm:p-7 space-y-6">
          <!-- Üst Ürün Detayı -->
          <div class="grid gap-6 lg:grid-cols-12 items-start">
            <div class="lg:col-span-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <img
                src="${escapeAttr(chem.image)}"
                alt="${escapeAttr(chem.title)}"
                width="600"
                height="420"
                class="h-56 w-full object-contain bg-white p-3"
              />
              <div class="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
                <div>
                  <span class="text-[10px] font-bold uppercase text-slate-500 block">Ambalaj &amp; Birim Yapısı</span>
                  <strong class="text-xs font-extrabold text-slate-900">${escapeHtml(chem.packaging)}</strong>
                </div>
                <div>
                  <span class="text-[10px] font-bold uppercase text-emerald-700 block">Teknik Dokümantasyon &amp; Sevk</span>
                  <strong class="text-xs font-extrabold text-emerald-900">Teklif/Sipariş Adımında Güncel SDS, TDS ve Mevcutsa Lot COA Paylaşımı</strong>
                </div>
              </div>
            </div>

            <div class="lg:col-span-7 space-y-4">
              <div>
                <p class="text-xs font-extrabold uppercase tracking-wider text-emerald-700">${escapeHtml(chem.categoryTitle)}</p>
                <h2 id="chemical-modal-title" class="mt-1 font-display text-2xl sm:text-3xl font-black text-slate-900">
                  ${escapeHtml(chem.title)}
                </h2>
              </div>

              <div class="rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-3">
                <span class="text-[11px] font-black uppercase tracking-wider text-emerald-800 block">Etken Madde / Katalog &amp; CAS Spesifikasyonu</span>
                <p class="mt-0.5 font-mono text-xs font-bold text-slate-900">${escapeHtml(chem.activeChemical)}</p>
              </div>

              <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <h3 class="text-xs font-black uppercase tracking-wider text-slate-900">📋 Ürün Açıklaması ve Proses Uygulaması</h3>
                <p class="text-sm leading-relaxed text-slate-700">${escapeHtml(chem.description)}</p>
              </div>

              ${chem.specs && chem.specs.length ? `
                <div class="rounded-2xl border border-slate-200 bg-white p-4">
                  <h3 class="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">⚙️ Doğrulanmış Katalog ve Uygulama Bilgileri</h3>
                  <ul class="space-y-1.5 text-xs font-semibold text-slate-700 list-disc pl-5">
                    ${chem.specs.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              <div class="flex flex-wrap gap-2.5 pt-1">
                <button type="button" data-scroll-order class="rounded-xl bg-emerald-600 px-5 py-3 text-xs font-extrabold text-white shadow-sm hover:bg-emerald-700 transition">
                  🛒 Sipariş Ver (Teklif &amp; Stok Teyidi)
                </button>
                <a href="${escapeAttr(waUrl)}" target="_blank" rel="noopener noreferrer" class="rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-extrabold text-slate-800 hover:border-emerald-500 transition">
                  💬 WhatsApp Sipariş &amp; TDS/SDS İste
                </a>
              </div>
            </div>
          </div>

          <!-- Hızlı Sipariş & Teklif Talebi Formu -->
          <div id="modal-order-form-section" class="rounded-3xl border-2 border-emerald-500 bg-emerald-50/50 p-5 sm:p-6">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <span class="inline-block rounded-full bg-emerald-700 px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-white">Kurumsal Sipariş &amp; Teklif Talebi</span>
                <h3 class="mt-1 font-display text-xl font-black text-slate-900">🛒 ${escapeHtml(chem.title)} — Sipariş Ver</h3>
                <p class="text-xs text-slate-600">Talebiniz Yönetim Paneli (Dashboard) ekranına düşer; stok durumu, minimum sipariş miktarı (MOQ), KDV, nakliye/ADR koşulları ve güncel parti belgeleri satış ekibimizce teyit edilir.</p>
              </div>
            </div>

            <form id="modal-chemical-order-form" class="grid gap-3.5 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-slate-700 mb-1">Talep Edilen Ürün &amp; Spesifikasyon</label>
                <input type="text" name="productLabel" readonly value="${escapeAttr(`${chem.title} (${chem.activeChemical})`)}" class="w-full rounded-xl border border-slate-300 bg-slate-100 px-3.5 py-2.5 text-xs font-bold text-slate-800" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Ambalaj / Birim Seçimi *</label>
                <select name="packType" class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900">
                  <option value="${escapeAttr(chem.packaging || 'Orijinal Katalog Ambalajı')}">Ürün Ambalajı: ${escapeHtml(chem.packaging || 'Orijinal Katalog Ambalajı')}</option>
                  <option value="30 kg / 60 kg UN Sertifikalı Bidon">30 kg / 60 kg UN Sertifikalı Bidon</option>
                  <option value="25 kg Kraft Torba (Paletli)">25 kg Kraft Torba (Paletli)</option>
                  <option value="200 kg Varil">200 kg Varil</option>
                  <option value="1000 kg / 1200 kg IBC Tank">1000 kg / 1200 kg IBC Tank</option>
                  <option value="Dökme ADR Kimyasal Tankeri">Dökme ADR Kimyasal Tankeri</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Talep Edilen Miktar / Adet *</label>
                <input type="text" name="amount" required placeholder="Örn: 2 Adet / 5 Şişe / 2 IBC (2.000 kg)" class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Firma / Kurum / Fabrika Adı *</label>
                <input type="text" name="companyName" required placeholder="Örn: Çukurova Demir Çelik A.Ş." class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Yetkili Ad Soyad *</label>
                <input type="text" name="contactName" required placeholder="Adınız Soyadınız" class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Telefon Numarası *</label>
                <input type="tel" name="phone" required placeholder="05XX XXX XX XX" class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Kurumsal E-posta *</label>
                <input type="email" name="email" required placeholder="satinalma@fabrika.com.tr" class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-slate-700 mb-1">Teslimat Şehri / OSB ve Sevk Notu *</label>
                <input type="text" name="cityCountry" required placeholder="Örn: Adana Hacı Sabancı OSB — Güncel parti COA ve SDS belgeleri teklifle iletilsin" class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900" />
              </div>
              <div class="sm:col-span-2 rounded-xl border border-emerald-200 bg-white p-3 text-xs text-slate-800 space-y-2">
                <label class="flex items-start gap-2.5 cursor-pointer font-semibold">
                  <input type="checkbox" name="requestDocs" value="Güncel Parti SDS/TDS/COA Talep Edildi" checked class="mt-0.5 h-4 w-4 accent-emerald-600" />
                  <span>📄 Teklifle birlikte bu ürünün güncel revizyon <strong>Güvenlik Bilgi Formu (SDS/GBF)</strong>, <strong>Teknik Bülteni (TDS)</strong> ve mevcutsa parti <strong>Analiz Sertifikasını (COA)</strong> talep ediyorum.</span>
                </label>
                <hr class="border-slate-100" />
                <label class="flex items-start gap-2.5 cursor-pointer font-semibold">
                  <input type="checkbox" name="kvkkConsent" required class="mt-0.5 h-4 w-4 accent-emerald-600" />
                  <span>6698 sayılı KVKK kapsamında iletişim ve firma verilerimin kurumsal sipariş/teklif hazırlığı amacıyla işlenmesini kabul ediyorum. *</span>
                </label>
                <details class="pl-6 text-[11px] text-slate-600">
                  <summary class="cursor-pointer font-bold text-emerald-800 hover:underline">KVKK Aydınlatma Özeti</summary>
                  <p class="mt-1 leading-relaxed">Veri Sorumlusu: Elif Çevre Kimya (Ova Mah. Şakirpaşa Cd. No:269 Seyhan/Adana, info@elifcevrekimya.com.tr). İletilen ad, firma, telefon, e-posta ve talep verileri yalnızca B2B tekliflendirme, teknik belge paylaşımı ve sevkiyat iletişimi amacıyla KVKK m.5/2-c ve m.5/2-f hukuki sebeplerine dayanılarak işlenir.</p>
                </details>
              </div>
              <div class="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-1">
                <span class="text-xs text-slate-600">🔒 Talebiniz doğrudan <strong>elifkimya</strong> veritabanına kaydedilir ve Yönetim Paneli (Dashboard) ekranına düşer.</span>
                <button type="submit" id="modal-chem-submit-btn" class="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-extrabold text-white shadow-md hover:bg-emerald-800 transition">
                  ✅ Sipariş &amp; Teklif Talebini Gönder
                </button>
              </div>
              <div id="modal-chem-feedback" class="sm:col-span-2" hidden></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  renderSafeHtml(host, html);
  document.body.style.overflow = 'hidden';

  bindModalCommonEvents(host, mode);

  const form = host.querySelector('#modal-chemical-order-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = host.querySelector('#modal-chem-submit-btn');
    const feedback = host.querySelector('#modal-chem-feedback');
    const fd = new FormData(form);

    const packType = String(fd.get('packType') || '').trim();
    const amount = String(fd.get('amount') || '').trim();
    const companyName = String(fd.get('companyName') || '').trim();
    const contactName = String(fd.get('contactName') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const cityCountry = String(fd.get('cityCountry') || 'Adana / Türkiye').trim();
    const requestDocs = String(fd.get('requestDocs') || 'Belirtilmedi').trim();

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Talep Kaydediliyor...';
      }
      await submitPublicCrmForm({
        companyName,
        contactName,
        phone,
        email,
        cityCountry,
        formChannel: 'order_form',
        requestType: 'order_request',
        subject: `[SİPARİŞ/TEKLİF TALEBİ] ${chem.title} (${amount})`,
        relatedProductOrSystem: `${chem.title} — ${chem.categoryTitle}`,
        packagingInfo: `${amount} • ${packType}`,
        description: [
          `[KURUMSAL ÜRÜN SİPARİŞ & TEKLİF TALEBİ]`,
          `Ürün Adı: ${chem.title}`,
          `Kategori: ${chem.categoryTitle}`,
          `Etken Madde / Spesifikasyon: ${chem.activeChemical}`,
          `Talep Edilen Miktar: ${amount}`,
          `Ambalaj Tipi: ${packType}`,
          `Teknik Belge Talebi: ${requestDocs}`,
          `Teslimat & Sevk Notu: ${cityCountry}`
        ].join('\n'),
        sourcePage: window.location.pathname
      });

      showNotification(`${chem.title} sipariş ve teklif talebiniz alındı, yönetim paneline iletildi.`, 'success');
      if (feedback) {
        feedback.hidden = false;
        renderSafeHtml(feedback, `
          <div class="rounded-2xl border border-emerald-300 bg-emerald-100 px-4 py-3 text-xs font-bold text-emerald-950">
            ✅ <strong>${escapeHtml(chem.title)}</strong> (${escapeHtml(amount)} - ${escapeHtml(packType)}) sipariş ve teklif talebiniz sunucuya doğrulandı. Satış ekibimiz stok, MOQ ve güncel parti belgeleriyle birlikte dönüş yapacaktır.
          </div>
        `);
      }
      form.reset();
    } catch (err) {
      showNotification(err.message || 'Sipariş gönderilirken bir hata oluştu.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '✅ Sipariş & Teklif Talebini Gönder';
      }
    }
  });
}

function bindModalCommonEvents(host, mode) {
  translatePageDom(host);
  const backdrop = host.querySelector('[data-modal-backdrop]');
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeProductOrderModal();
    }
  });

  host.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => closeProductOrderModal());
  });

  const scrollOrderSection = () => {
    const orderSec = host.querySelector('#modal-order-form-section');
    if (orderSec) {
      orderSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const firstInput = orderSec.querySelector('input:not([readonly]), select');
      if (firstInput) setTimeout(() => firstInput.focus(), 250);
    }
  };

  host.querySelectorAll('[data-scroll-order]').forEach((btn) => {
    btn.addEventListener('click', scrollOrderSection);
  });

  if (mode === 'order') {
    setTimeout(scrollOrderSection, 80);
  }
}

// Escape tuşu ile kapatma
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalHost && modalHost.children.length > 0) {
      closeProductOrderModal();
    }
  });
}

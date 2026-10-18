/**
 * Elif Kimya - Kurumsal A4 Teklif & Revizyon PDF Üretim Motoru
 *
 * Kurallar:
 * - Müşteri PDF'sinde iç maliyet (unitCost, totalCost), tedarikçi alış fiyatı,
 *   brüt kâr (grossProfit), kâr marjı (profitMarginPercent) ve yönetici notları
 *   (internalAdminNotes) KESİNLİKLE yer almaz; veri aşamasında filtrelenir.
 * - Türkçe karakterleri (Ğ, Ü, Ş, İ, Ö, Ç, ₺, µS/cm, MΩ·cm) tam UTF-8 vektörel
 *   tipografiyle işler.
 * - Çok sayfalı tablolarda başlık tekrarını (thead { display: table-header-group })
 *   ve sayfa taşmalarını (break-inside: avoid) kontrol eder.
 * - Belgeyi fatura olarak sunmaz; açıkça "TEKNİK VE TİCARİ FİYAT TEKLİFİ (FATURA YERİNE GEÇMEZ)" ibaresi taşır.
 */

import { escapeHtml, renderSafeHtml } from './security.js';

export function formatMoney(amount, currency = 'TRY') {
  const num = Number(amount);
  if (isNaN(num)) return '—';
  const symbolMap = { TRY: '₺', USD: '$', EUR: '€' };
  const sym = symbolMap[currency] || currency;
  return `${sym}${num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Teklif verisinden müşteri PDF'si için yalnızca paylaşılabilir alanları ayıklar.
 * İç maliyet, kâr marjı ve yönetici notlarını tamamen dışarıda bırakır.
 */
export function extractCustomerSafePdfModel(proposal, companySettings = {}) {
  const safeItems = Array.isArray(proposal.items)
    ? proposal.items.map((item, idx) => ({
        index: idx + 1,
        code: String(item.code || `KALEM-${idx + 1}`),
        description: String(item.description || ''),
        quantity: Number(item.quantity) || 0,
        unit: String(item.unit || 'kg'),
        unitPrice: Number(item.unitPrice) || 0,
        discountPercent: Number(item.discountPercent) || 0,
        vatRate: Number(item.vatRate ?? 20),
        lineNetExclVat: Number(item.lineNetExclVat) || 0
      }))
    : [];

  return {
    company: {
      name: companySettings.companyName || 'ELİF KİMYA SANAYİ VE TİCARET',
      subtitle: 'Endüstriyel Su Arıtma Sistemleri & Proses Kimyasalları Mühendisliği',
      address: companySettings.address || 'Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana',
      phone: '0546 499 23 42',
      email: companySettings.email || 'info@elifcevrekimya.com.tr',
      website: 'https://www.elifcevrekimya.com.tr',
      taxInfo: companySettings.taxInfo || 'Adana Vergi Dairesi'
    },
    proposalNo: String(proposal.proposalNo || 'EK-2026-001'),
    revisionNo: Number(proposal.revisionNo || 1),
    issueDate: String((proposal.updatedAtIso || proposal.createdAtIso || new Date().toISOString()).slice(0, 10)),
    validUntil: String(proposal.validUntil || ''),
    validityDays: Number(proposal.validityDays || 15),
    customerName: String(proposal.customerName || proposal.companyName || ''),
    contactName: String(proposal.contactName || 'Yetkili'),
    customerEmail: String(proposal.customerEmail || ''),
    customerPhone: String(proposal.customerPhone || ''),
    customerAddress: String(proposal.customerAddress || ''),
    currency: String(proposal.currency || 'TRY'),
    exchangeRate: proposal.exchangeRate ? Number(proposal.exchangeRate) : null,
    exchangeRateDate: String(proposal.exchangeRateDate || ''),
    items: safeItems,
    shippingPrice: Number(proposal.shippingPrice || 0),
    installationPrice: Number(proposal.installationPrice || 0),
    commissioningPrice: Number(proposal.commissioningPrice || 0),
    subtotalExclVat: Number(proposal.subtotalExclVat || 0),
    discountTotal: Number(proposal.discountTotal || 0),
    netExclVat: Number(proposal.netExclVat || 0),
    vatTotal: Number(proposal.vatTotal || 0),
    grandTotal: Number(proposal.grandTotal || 0),
    deliveryTerms: String(proposal.deliveryTerms || 'Adana fabrika teslim / ADR uyumlu lojistik sevk'),
    paymentTerms: String(proposal.paymentTerms || '%50 Sipariş avansı, %50 sevk öncesi nakit/havale'),
    scopeAndExclusions: String(proposal.scopeAndExclusions || 'Bu teklif mevcut su analizi ve beyan edilen kapasite verilerine göre hazırlanmıştır.')
  };
}

/**
 * A4 kurumsal teklif HTML şablonunu oluşturur (Çok sayfalı tablo ve Türkçe karakter uyumlu).
 */
export function buildA4ProposalMarkup(proposal, companySettings = {}) {
  const model = extractCustomerSafePdfModel(proposal, companySettings);
  const curr = model.currency;

  const extraRows = [];
  if (model.shippingPrice > 0) {
    extraRows.push({
      code: 'LOJ-NAK',
      description: 'ADR Uyumlu Lojistik & Nakliye Bedeli',
      quantity: 1,
      unit: 'Sefer',
      unitPrice: model.shippingPrice,
      discountPercent: 0,
      vatRate: 20,
      lineNetExclVat: model.shippingPrice
    });
  }
  if (model.installationPrice > 0) {
    extraRows.push({
      code: 'MUH-MON',
      description: 'Saha Mekanik/Elektrik Montaj ve Kurulum Hizmeti',
      quantity: 1,
      unit: 'Proje',
      unitPrice: model.installationPrice,
      discountPercent: 0,
      vatRate: 20,
      lineNetExclVat: model.installationPrice
    });
  }
  if (model.commissioningPrice > 0) {
    extraRows.push({
      code: 'MUH-DEV',
      description: 'Sistem Devreye Alma, Kalibrasyon ve Operatör Eğitimi',
      quantity: 1,
      unit: 'Hizmet',
      unitPrice: model.commissioningPrice,
      discountPercent: 0,
      vatRate: 20,
      lineNetExclVat: model.commissioningPrice
    });
  }

  const allRows = [...model.items, ...extraRows];

  return `
    <div class="a4-document" id="a4ProposalDoc">
      <!-- Üst Kurumsal Antet -->
      <header class="a4-header">
        <div class="a4-brand-block">
          <div class="a4-logo-row">
            <img src="/brand-mark.svg" alt="Elif Kimya" width="42" height="42" />
            <div>
              <div class="a4-company-title">${escapeHtml(model.company.name)}</div>
              <div class="a4-company-sub">${escapeHtml(model.company.subtitle)}</div>
            </div>
          </div>
          <div class="a4-company-contact">
            <span>${escapeHtml(model.company.address)}</span> ·
            <span>Tel: ${escapeHtml(model.company.phone)}</span> ·
            <span>${escapeHtml(model.company.email)}</span>
          </div>
        </div>

        <div class="a4-doc-meta">
          <div class="a4-doc-type-badge">TEKNİK VE TİCARİ TEKLİF BELGESİ</div>
          <div class="a4-meta-grid">
            <span>Teklif No:</span>
            <strong>${escapeHtml(model.proposalNo)}</strong>
            <span>Revizyon:</span>
            <strong>Rev.${escapeHtml(String(model.revisionNo).padStart(2, '0'))}</strong>
            <span>Tarih:</span>
            <strong>${escapeHtml(model.issueDate)}</strong>
            <span>Geçerlilik:</span>
            <strong>${escapeHtml(model.validUntil || `${model.validityDays} Gün`)}</strong>
          </div>
        </div>
      </header>

      <div class="a4-non-invoice-banner">
        BU BELGE BİR PROFORMA / FİYAT TEKLİFİDİR — VERGİ USUL KANUNU KAPSAMINDA FATURA YERİNE GEÇMEZ.
      </div>

      <!-- Müşteri Bilgileri -->
      <section class="a4-customer-box">
        <div class="a4-box-col">
          <div class="a4-box-label">SAYIN / FİRMA</div>
          <div class="a4-cust-name">${escapeHtml(model.customerName)}</div>
          <div class="a4-cust-line"><strong>İlgili Kişi:</strong> ${escapeHtml(model.contactName || '—')}</div>
          ${model.customerAddress ? `<div class="a4-cust-line"><strong>Adres / Sevk Yeri:</strong> ${escapeHtml(model.customerAddress)}</div>` : ''}
        </div>
        <div class="a4-box-col">
          <div class="a4-box-label">İLETİŞİM & PARA BİRİMİ</div>
          <div class="a4-cust-line"><strong>E-posta:</strong> ${escapeHtml(model.customerEmail || '—')}</div>
          <div class="a4-cust-line"><strong>Telefon:</strong> ${escapeHtml(model.customerPhone || '—')}</div>
          <div class="a4-cust-line"><strong>Teklif Para Birimi:</strong> ${escapeHtml(curr)} ${model.exchangeRate ? `(Kur: ${escapeHtml(model.exchangeRate)} / Tarih: ${escapeHtml(model.exchangeRateDate)})` : ''}</div>
        </div>
      </section>

      <!-- Çok Sayfalı Teklif Kalemleri Tablosu -->
      <table class="a4-items-table">
        <thead>
          <tr>
            <th style="width:36px;">#</th>
            <th style="width:95px;">Kod</th>
            <th>Ürün / Sistem ve Teknik Açıklama</th>
            <th style="width:78px;text-align:right;">Miktar</th>
            <th style="width:58px;">Birim</th>
            <th style="width:95px;text-align:right;">Birim Fiyat</th>
            <th style="width:55px;text-align:right;">İsk.%</th>
            <th style="width:55px;text-align:right;">KDV%</th>
            <th style="width:108px;text-align:right;">Net Tutar (KDV H.)</th>
          </tr>
        </thead>
        <tbody>
          ${allRows.map((row, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td class="mono-cell">${escapeHtml(row.code)}</td>
              <td>${escapeHtml(row.description)}</td>
              <td style="text-align:right;">${escapeHtml(row.quantity.toLocaleString('tr-TR'))}</td>
              <td>${escapeHtml(row.unit)}</td>
              <td style="text-align:right;">${escapeHtml(formatMoney(row.unitPrice, curr))}</td>
              <td style="text-align:right;">%${escapeHtml(row.discountPercent)}</td>
              <td style="text-align:right;">%${escapeHtml(row.vatRate)}</td>
              <td style="text-align:right;font-weight:600;">${escapeHtml(formatMoney(row.lineNetExclVat, curr))}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Mali Özet Tablosu (Müşteri Görünümü - İç Maliyet Yok!) -->
      <div class="a4-summary-section">
        <div class="a4-terms-col">
          <div class="a4-term-item">
            <strong>Teslimat Koşulları:</strong>
            <p>${escapeHtml(model.deliveryTerms)}</p>
          </div>
          <div class="a4-term-item">
            <strong>Ödeme Koşulları:</strong>
            <p>${escapeHtml(model.paymentTerms)}</p>
          </div>
          <div class="a4-term-item">
            <strong>Kapsam ve Teknik Şartlar:</strong>
            <p>${escapeHtml(model.scopeAndExclusions)}</p>
          </div>
        </div>

        <div class="a4-totals-box">
          <div class="a4-total-row">
            <span>Ara Toplam (KDV Hariç):</span>
            <strong>${escapeHtml(formatMoney(model.subtotalExclVat, curr))}</strong>
          </div>
          <div class="a4-total-row">
            <span>Toplam İskonto:</span>
            <strong>-${escapeHtml(formatMoney(model.discountTotal, curr))}</strong>
          </div>
          <div class="a4-total-row net-row">
            <span>KDV Hariç Net Toplam:</span>
            <strong>${escapeHtml(formatMoney(model.netExclVat, curr))}</strong>
          </div>
          <div class="a4-total-row">
            <span>Hesaplanan KDV Tutarı:</span>
            <strong>${escapeHtml(formatMoney(model.vatTotal, curr))}</strong>
          </div>
          <div class="a4-total-row grand-row">
            <span>GENEL TOPLAM (KDV DAHİL):</span>
            <strong>${escapeHtml(formatMoney(model.grandTotal, curr))}</strong>
          </div>
        </div>
      </div>

      <!-- İmza ve Onay Bloğu -->
      <footer class="a4-signatures">
        <div class="a4-sig-box">
          <div class="a4-sig-title">ELİF KİMYA TEKNİK VE TİCARİ ONAY</div>
          <p>Elif Kimya Endüstriyel Su &amp; Proses Çözümleri</p>
          <div class="a4-sig-space">Kaşe / İmza</div>
        </div>
        <div class="a4-sig-box">
          <div class="a4-sig-title">MÜŞTERİ SİPARİŞ KABUL ONAYI</div>
          <p>${escapeHtml(model.customerName)}</p>
          <div class="a4-sig-space">Tarih / Kaşe / Yetkili İmza</div>
        </div>
      </footer>
    </div>
  `;
}

/**
 * Kurumsal A4 PDF Önizleme Modalını açar ve doğrudan A4 Yazdır / PDF Kaydet imkanı sunar.
 */
export function openProposalA4Modal(proposal, companySettings = {}) {
  const existing = document.getElementById('a4PreviewModal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'a4PreviewModal';
  overlay.className = 'modal-overlay a4-modal-overlay';

  const wrapperHtml = `
    <div class="a4-modal-shell">
      <div class="a4-modal-toolbar no-print">
        <div>
          <strong>Kurumsal A4 Teklif Önizleme — ${escapeHtml(proposal.proposalNo)} (Rev.${escapeHtml(String(proposal.revisionNo || 1).padStart(2, '0'))})</strong>
          <small style="display:block;color:#475569;">İç maliyet, alış fiyatı, kâr marjı ve yönetici notları bu belgeden otomatik olarak çıkarılmıştır.</small>
        </div>
        <div class="a4-toolbar-actions">
          <button type="button" class="button button-primary button-small" id="btnPrintA4Pdf">
            A4 PDF Olarak Kaydet / Yazdır
          </button>
          <button type="button" class="button button-ghost-dark button-small" id="btnCloseA4Modal">
            Kapat
          </button>
        </div>
      </div>
      <div class="a4-scroll-viewport">
        ${buildA4ProposalMarkup(proposal, companySettings)}
      </div>
    </div>
  `;

  renderSafeHtml(overlay, wrapperHtml);
  document.body.appendChild(overlay);

  overlay.querySelector('#btnCloseA4Modal')?.addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  overlay.querySelector('#btnPrintA4Pdf')?.addEventListener('click', () => {
    window.print();
  });
}

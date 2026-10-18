/**
 * Yönetim Paneli (Dashboard) Analitik, Nakit Akışı Vade Takvimi, Global Arama,
 * Sipariş-Fatura Mutabakatı, Stok/Belge Denetimi ve CSV Raporlama Çekirdeği.
 *
 * AGENTS.md Kuralları:
 * - Yalnızca gerçek sunucu/store verileri üzerinden hesaplama yapar; sahte veri üretmez.
 * - Dışa aktarılan (CSV / A4 Yönetici Özeti) hiçbir veride iç maliyet alanları
 *   (unitCost, totalCost, grossProfit, profitMarginPercent, internalAdminNotes) yer almaz.
 */

import { TURKEY_81_PROVINCES } from '../data/provinces-81.js';
import { deriveOrderBilling } from './order-billing.js';

const money = (value) => Number(Number(value || 0).toFixed(2));

/**
 * 1. Gelen Kutusu Kanal & Ürün Grubu Sınıflandırması ve SLA Yanıt Süresi Hesabı
 */
export function classifyInboundRequest(req = {}) {
  const ch = String(req?.formChannel || '').toLowerCase();
  const rt = String(req?.requestType || '').toLowerCase();
  const src = String(req?.source || '').toLowerCase();
  const subj = `${req?.subject || ''} ${req?.relatedProductOrSystem || ''} ${req?.description || ''} ${req?.message || ''}`.toUpperCase();

  const isMedipure =
    subj.includes('MEDIPURE') ||
    subj.includes('MP-') ||
    subj.includes('EDI') ||
    subj.includes('ULTRA SAF') ||
    subj.includes('SAF SU') ||
    subj.includes('HEMODİYALİZ') ||
    subj.includes('HEMODIYALIZ');

  const isChemical =
    subj.includes('KİMYASAL') ||
    subj.includes('KIMYASAL') ||
    subj.includes('HİPOKLORİT') ||
    subj.includes('HIPOKLORIT') ||
    subj.includes('KOSTİK') ||
    subj.includes('KOSTIK') ||
    subj.includes('ASİT') ||
    subj.includes('ASIT') ||
    subj.includes('ANTİSKALANT') ||
    subj.includes('ANTISKALANT') ||
    subj.includes('POLİELEKTROLİT') ||
    subj.includes('POLIELEKTROLIT') ||
    subj.includes('IBC') ||
    subj.includes('BİDON') ||
    subj.includes('BIDON');

  if (ch === 'order_form' || rt === 'order_request' || rt.includes('siparis') || rt.includes('sipariş')) {
    if (isMedipure) {
      return {
        code: 'medipure_order',
        label: '💧 MEDIPURE CİHAZ SİPARİŞİ',
        badgeClass: 'badge-teal',
        isOrderOrQuote: true,
        isMedipureOrder: true,
        isChemicalOrder: false
      };
    }
    if (isChemical) {
      return {
        code: 'chemical_order',
        label: '🧪 KİMYASAL SİPARİŞİ',
        badgeClass: 'badge-teal',
        isOrderOrQuote: true,
        isMedipureOrder: false,
        isChemicalOrder: true
      };
    }
    return {
      code: 'order',
      label: '🛒 SİPARİŞ FORMU',
      badgeClass: 'badge-teal',
      isOrderOrQuote: true,
      isMedipureOrder: false,
      isChemicalOrder: false
    };
  }

  if (ch === 'quote_form' || src === 'website_rfq' || rt.includes('quote') || rt === 'water_project' || rt === 'technical_visit' || rt === 'periodic_supply') {
    return {
      code: 'quote',
      label: isMedipure ? '💧 MEDIPURE TEKLİF TALEBİ' : isChemical ? '🧪 KİMYASAL TEKLİF TALEBİ' : '📋 TEKLİF & PROJE FORMU',
      badgeClass: 'badge-teal',
      isOrderOrQuote: true,
      isMedipureOrder: isMedipure,
      isChemicalOrder: isChemical
    };
  }

  if (ch === 'callback_form' || rt === 'callback_30min' || src === 'website_callback') {
    return {
      code: 'callback',
      label: '📞 30 DK GERİ ARAMA',
      badgeClass: 'badge-amber',
      isOrderOrQuote: false,
      isMedipureOrder: false,
      isChemicalOrder: false
    };
  }

  if (ch === 'contact_form' || rt === 'general_contact' || src === 'website_contact') {
    return {
      code: 'contact',
      label: '📩 İLETİŞİM FORMU MESAJI',
      badgeClass: 'badge-amber',
      isOrderOrQuote: false,
      isMedipureOrder: false,
      isChemicalOrder: false
    };
  }

  return {
    code: 'crm',
    label: '📌 CRM / TİCARİ TALEP',
    badgeClass: 'badge-neutral',
    isOrderOrQuote: true,
    isMedipureOrder: isMedipure,
    isChemicalOrder: isChemical
  };
}

export function computeSlaBadge(req = {}, nowMs = Date.now()) {
  const stage = String(req?.stage || 'Yeni Talep');
  const res = String(req?.resolutionStatus || 'active');
  if (res !== 'active' || (stage !== 'Yeni Talep' && stage !== 'İlk Görüşme')) {
    return {
      status: 'handled',
      label: `✅ İşlemde (${stage})`,
      badgeClass: 'badge-teal',
      elapsedMinutes: 0
    };
  }

  const iso = req?.createdAtIso || req?.updatedAtIso || '';
  const createdMs = iso ? new Date(iso).getTime() : NaN;
  if (!Number.isFinite(createdMs)) {
    return {
      status: 'unknown',
      label: '⏱️ Süre bilgisi yok',
      badgeClass: 'badge-neutral',
      elapsedMinutes: 0
    };
  }

  const diffMin = Math.max(0, Math.round((nowMs - createdMs) / 60000));
  const meta = classifyInboundRequest(req);
  const slaLimitMin = meta.code === 'callback' ? 30 : 120; // Geri arama 30 dk, sipariş/teklif 120 dk

  let timeText;
  if (diffMin < 60) {
    timeText = `${diffMin} dk`;
  } else if (diffMin < 1440) {
    const hrs = Math.floor(diffMin / 60);
    const mins = diffMin % 60;
    timeText = mins > 0 ? `${hrs} sa ${mins} dk` : `${hrs} saat`;
  } else {
    const days = Math.floor(diffMin / 1440);
    timeText = `${days} gün`;
  }

  if (stage === 'Yeni Talep' && diffMin > slaLimitMin) {
    return {
      status: 'breached',
      label: `⚠️ ${timeText}dir yanıt bekliyor`,
      badgeClass: 'badge-error',
      elapsedMinutes: diffMin
    };
  }

  return {
    status: 'pending',
    label: `⏱️ ${timeText} önce geldi`,
    badgeClass: diffMin > 30 ? 'badge-amber' : 'badge-neutral',
    elapsedMinutes: diffMin
  };
}

/**
 * 2. Global Komut & Arama Çubuğu (Tüm ERP Koleksiyonlarında Anlık Arama)
 */
export function searchGlobalAdminStore(store = {}, rawQuery = '', limit = 18) {
  const q = String(rawQuery || '').trim().toLowerCase();
  if (q.length < 2) return [];

  const results = [];
  const pushHit = (hit) => {
    if (results.length < limit) results.push(hit);
  };

  for (const r of store.crmRequests || []) {
    const hay = `${r.companyName || ''} ${r.contactName || ''} ${r.phone || ''} ${r.email || ''} ${r.relatedProductOrSystem || ''} ${r.cityCountry || ''} ${r.description || ''}`.toLowerCase();
    if (hay.includes(q)) {
      pushHit({
        type: 'CRM / Gelen Kutusu',
        badgeClass: 'badge-teal',
        title: `${r.companyName || 'İsimsiz'} — ${r.relatedProductOrSystem || r.requestType || 'Talep'}`,
        subtitle: `${r.contactName || '-'} · ${r.phone || '-'} · Aşama: ${r.stage || 'Yeni Talep'}`,
        preset: {
          module: 'crm',
          label: `Arama sonucu: ${r.companyName || r.id}`,
          crmFocusId: r.id,
          crmFilterRes: 'all',
          crmFilterStage: 'all',
          crmViewMode: 'table',
          crmSearchQuery: '',
          anchor: '#crm-view-container'
        }
      });
    }
  }

  for (const o of store.orders || []) {
    const hay = `${o.orderNo || ''} ${o.companyName || ''} ${o.contactEmail || ''} ${o.status || ''} ${o.itemsSummary || ''}`.toLowerCase();
    if (hay.includes(q)) {
      pushHit({
        type: 'Sipariş',
        badgeClass: 'badge-teal',
        title: `${o.orderNo || 'Sipariş'} — ${o.companyName || ''}`,
        subtitle: `Durum: ${o.status || '-'} · Tutar: ₺${Number(o.grandTotal || 0).toLocaleString('tr-TR')}`,
        preset: {
          module: 'orders',
          label: `Sipariş: ${o.orderNo || o.companyName}`,
          ordersListFocus: 'all',
          anchor: '#orders-table-anchor'
        }
      });
    }
  }

  for (const inv of store.accountingInvoices || []) {
    const hay = `${inv.invoiceNo || ''} ${inv.companyName || ''} ${inv.taxNumber || ''} ${inv.description || ''} ${inv.orderNo || ''}`.toLowerCase();
    if (hay.includes(q)) {
      pushHit({
        type: inv.docCategory || 'E-Fatura',
        badgeClass: 'badge-teal',
        title: `${inv.invoiceNo || 'Fatura'} — ${inv.companyName || ''}`,
        subtitle: `${inv.invoiceType || 'SATIS'} · ₺${Number(inv.grandTotalTry || 0).toLocaleString('tr-TR')} · ${inv.paymentStatus || ''}`,
        preset: {
          module: 'accounting',
          label: `Fatura: ${inv.invoiceNo}`,
          accountingTab: 'invoices',
          accountingInvoiceFilter: 'all',
          anchor: '#accounting-invoices-anchor'
        }
      });
    }
  }

  for (const p of store.proposals || []) {
    const hay = `${p.proposalNo || ''} ${p.companyName || ''} ${p.contactName || ''} ${p.notes || ''}`.toLowerCase();
    if (hay.includes(q)) {
      pushHit({
        type: 'PDF Teklif',
        badgeClass: 'badge-neutral',
        title: `${p.proposalNo || 'Teklif'} — ${p.companyName || ''}`,
        subtitle: `Durum: ${p.status || 'draft'} · KDV Hariç: ₺${Number(p.netExclVat || 0).toLocaleString('tr-TR')}`,
        preset: {
          module: 'proposals',
          label: `Teklif: ${p.proposalNo || p.companyName}`,
          proposalListFocus: 'all',
          anchor: '#proposals-table-anchor'
        }
      });
    }
  }

  for (const chq of store.chequesAndNotes || []) {
    const hay = `${chq.portfolioNo || ''} ${chq.serialNumber || ''} ${chq.companyName || ''} ${chq.bankName || ''}`.toLowerCase();
    if (hay.includes(q)) {
      pushHit({
        type: 'Çek / Senet',
        badgeClass: 'badge-amber',
        title: `${chq.portfolioNo || chq.serialNumber || 'Evrak'} — ${chq.companyName || ''}`,
        subtitle: `Vade: ${chq.maturityDate || '-'} · ₺${Number(chq.amountTry || 0).toLocaleString('tr-TR')} · ${chq.status || ''}`,
        preset: {
          module: 'accounting',
          label: `Çek/Senet: ${chq.portfolioNo || chq.serialNumber}`,
          accountingTab: 'cheques',
          anchor: '#accounting-cheques-anchor'
        }
      });
    }
  }

  for (const prd of store.products || []) {
    const hay = `${prd.name || ''} ${prd.code || ''} ${prd.casNumber || ''} ${prd.category || ''} ${prd.shortDescription || ''}`.toLowerCase();
    if (hay.includes(q)) {
      pushHit({
        type: 'Ürün Kartı',
        badgeClass: 'badge-neutral',
        title: `${prd.name || 'Ürün'}`,
        subtitle: `${prd.category || ''} ${prd.casNumber ? `· CAS: ${prd.casNumber}` : ''}`,
        preset: {
          module: 'products',
          label: `Ürün: ${prd.name}`
        }
      });
    }
  }

  for (const stk of store.inventoryItems || []) {
    const hay = `${stk.sku || ''} ${stk.name || ''}`.toLowerCase();
    if (hay.includes(q)) {
      pushHit({
        type: 'Depo Stok',
        badgeClass: 'badge-neutral',
        title: `${stk.sku || 'SKU'} — ${stk.name || ''}`,
        subtitle: stk.stockInitialized ? `Mevcut: ${stk.currentStock} ${stk.unit || ''}` : 'Sayım girilmedi',
        preset: {
          module: 'orders',
          label: `Stok: ${stk.sku}`,
          ordersListFocus: 'all',
          anchor: '#inventory-table-anchor'
        }
      });
    }
  }

  for (const prj of store.projects || []) {
    const hay = `${prj.projectName || ''} ${prj.companyName || ''} ${prj.location || ''} ${prj.stage || ''}`.toLowerCase();
    if (hay.includes(q)) {
      pushHit({
        type: 'Su Arıtma Projesi',
        badgeClass: 'badge-teal',
        title: `${prj.projectName || 'Proje'} — ${prj.companyName || ''}`,
        subtitle: `Aşama: ${prj.stage || '-'} · Konum: ${prj.location || '-'}`,
        preset: {
          module: 'projects',
          label: `Proje: ${prj.projectName}`,
          projectListFocus: 'all',
          anchor: '#projects-table-anchor'
        }
      });
    }
  }

  return results;
}

/**
 * 3. 30 Günlük Finansal Nakit Akışı & Vade Takvimi
 */
function addDaysIso(baseIso, days) {
  const baseMs = Date.parse(`${baseIso}T00:00:00Z`);
  if (!Number.isFinite(baseMs)) return baseIso;
  return new Date(baseMs + days * 86400000).toISOString().slice(0, 10);
}

export function computeCashFlowCalendar({
  invoices = [],
  transactions = [],
  chequesAndNotes = [],
  todayIso = new Date().toISOString().slice(0, 10)
} = {}) {
  const day7Iso = addDaysIso(todayIso, 7);
  const day30Iso = addDaysIso(todayIso, 30);

  const cashInTry = transactions
    .filter((t) => t.direction === 'TAHSILAT')
    .reduce((sum, t) => sum + Number(t.amountTry || 0), 0);
  const cashOutTry = transactions
    .filter((t) => t.direction !== 'TAHSILAT')
    .reduce((sum, t) => sum + Number(t.amountTry || 0), 0);
  const currentLiquidTry = money(cashInTry - cashOutTry);

  let overdueReceivablesTry = 0;
  let overdueReceivablesCount = 0;
  let overduePayablesTry = 0;
  let overduePayablesCount = 0;

  let in7DaysTry = 0;
  let in30DaysTry = 0;
  let out7DaysTry = 0;
  let out30DaysTry = 0;

  const upcomingEvents = [];

  for (const inv of invoices) {
    const docCat = String(inv?.docCategory || '').toUpperCase();
    if (docCat === 'PROFORMA') continue;
    const rem = Number(inv?.remainingAmountTry || 0);
    if (rem <= 0) continue;
    const due = String(inv?.dueDate || '').slice(0, 10);
    if (!due) continue;

    if (inv.invoiceType === 'SATIS') {
      if (due < todayIso) {
        overdueReceivablesTry = money(overdueReceivablesTry + rem);
        overdueReceivablesCount += 1;
      } else {
        if (due <= day7Iso) in7DaysTry = money(in7DaysTry + rem);
        if (due <= day30Iso) in30DaysTry = money(in30DaysTry + rem);
      }
      if (due <= day30Iso) {
        upcomingEvents.push({
          dateIso: due,
          isOverdue: due < todayIso,
          direction: 'IN',
          kindLabel: 'Satış Faturası Tahsilatı',
          refNo: inv.invoiceNo || '-',
          companyName: inv.companyName || '-',
          amountTry: money(rem),
          accountingTab: 'invoices',
          accountingInvoiceFilter: due < todayIso ? 'OVERDUE' : 'SATIS',
          anchor: '#accounting-invoices-anchor'
        });
      }
    } else if (inv.invoiceType === 'ALIS') {
      if (due < todayIso) {
        overduePayablesTry = money(overduePayablesTry + rem);
        overduePayablesCount += 1;
      } else {
        if (due <= day7Iso) out7DaysTry = money(out7DaysTry + rem);
        if (due <= day30Iso) out30DaysTry = money(out30DaysTry + rem);
      }
      if (due <= day30Iso) {
        upcomingEvents.push({
          dateIso: due,
          isOverdue: due < todayIso,
          direction: 'OUT',
          kindLabel: 'Tedarikçi Faturası Ödemesi',
          refNo: inv.invoiceNo || '-',
          companyName: inv.companyName || '-',
          amountTry: money(rem),
          accountingTab: 'invoices',
          accountingInvoiceFilter: 'ALIS',
          anchor: '#accounting-invoices-anchor'
        });
      }
    }
  }

  for (const chq of chequesAndNotes) {
    const amt = Number(chq?.amountTry || 0);
    if (amt <= 0) continue;
    const mat = String(chq?.maturityDate || '').slice(0, 10);
    if (!mat) continue;
    const type = String(chq?.instrumentType || '');
    const status = String(chq?.status || '');

    if (type.startsWith('MUSTERI') && ['Portföyde', 'Tahsilatta'].includes(status)) {
      if (mat < todayIso) {
        overdueReceivablesTry = money(overdueReceivablesTry + amt);
        overdueReceivablesCount += 1;
      } else {
        if (mat <= day7Iso) in7DaysTry = money(in7DaysTry + amt);
        if (mat <= day30Iso) in30DaysTry = money(in30DaysTry + amt);
      }
      if (mat <= day30Iso) {
        upcomingEvents.push({
          dateIso: mat,
          isOverdue: mat < todayIso,
          direction: 'IN',
          kindLabel: 'Müşteri Çek/Senet Vadesi',
          refNo: chq.portfolioNo || chq.serialNumber || '-',
          companyName: chq.companyName || '-',
          amountTry: money(amt),
          accountingTab: 'cheques',
          accountingInvoiceFilter: 'all',
          anchor: '#accounting-cheques-anchor'
        });
      }
    } else if (type.startsWith('FIRMA') && status === 'Portföyde') {
      if (mat < todayIso) {
        overduePayablesTry = money(overduePayablesTry + amt);
        overduePayablesCount += 1;
      } else {
        if (mat <= day7Iso) out7DaysTry = money(out7DaysTry + amt);
        if (mat <= day30Iso) out30DaysTry = money(out30DaysTry + amt);
      }
      if (mat <= day30Iso) {
        upcomingEvents.push({
          dateIso: mat,
          isOverdue: mat < todayIso,
          direction: 'OUT',
          kindLabel: 'Firma Çek/Senet Ödemesi',
          refNo: chq.portfolioNo || chq.serialNumber || '-',
          companyName: chq.companyName || '-',
          amountTry: money(amt),
          accountingTab: 'cheques',
          accountingInvoiceFilter: 'all',
          anchor: '#accounting-cheques-anchor'
        });
      }
    }
  }

  upcomingEvents.sort((a, b) => a.dateIso.localeCompare(b.dateIso));

  const projected30DayNetTry = money(currentLiquidTry + in30DaysTry - out30DaysTry);

  return {
    currentLiquidTry,
    overdueReceivablesTry,
    overdueReceivablesCount,
    overduePayablesTry,
    overduePayablesCount,
    in7DaysTry,
    in30DaysTry,
    out7DaysTry,
    out30DaysTry,
    projected30DayNetTry,
    upcomingEvents: upcomingEvents.slice(0, 10)
  };
}

/**
 * 4. Sipariş -> Sevkiyat -> E-Fatura Mutabakat Denetimi
 */
export function computeOrderInvoiceReconciliation({
  orders = [],
  invoices = [],
  syncStatesByInvoiceId = new Map()
} = {}) {
  const salesInvoices = invoices.filter(
    (inv) => inv.invoiceType === 'SATIS' && String(inv.docCategory || '').toUpperCase() !== 'PROFORMA'
  );
  const billedOrderIds = new Set(salesInvoices.map((inv) => inv.orderId).filter(Boolean));
  const billedOrderNos = new Set(salesInvoices.map((inv) => inv.orderNo).filter(Boolean));

  const unbilledOrders = orders
    .filter((ord) => ord.status !== 'İptal' && !billedOrderIds.has(ord.id) && !billedOrderNos.has(ord.orderNo))
    .map((ord) => ({
      order: ord,
      billing: deriveOrderBilling(ord)
    }));

  const unbilledTotalTry = money(
    unbilledOrders.reduce((sum, item) => sum + Number(item.order.grandTotal || 0), 0)
  );

  const unsyncedInvoices = invoices
    .filter((inv) => String(inv.docCategory || '').toUpperCase() !== 'PROFORMA')
    .filter((inv) => {
      const st = syncStatesByInvoiceId.get(inv.id);
      return !st || st.status !== 'synced';
    });

  const erroredSyncInvoices = unsyncedInvoices.filter((inv) => {
    const st = syncStatesByInvoiceId.get(inv.id);
    return st && st.status === 'error';
  });

  return {
    unbilledOrders,
    unbilledTotalTry,
    unsyncedInvoices,
    erroredSyncInvoices
  };
}

/**
 * 5. Ürün Grubu (Medipure / Kimyasal / Proje / Servis) ve 81 İl Dönüşüm Analitiği
 */
export function computeCategoryAndCityAnalytics({
  crmRequests = [],
  orders = [],
  customers = []
} = {}) {
  const categories = [
    { key: 'chemical', label: '🧪 Endüstriyel Kimyasal Hammadde (IBC / Bidon / Tanker)', crmCount: 0, orderCount: 0, orderVolumeTry: 0 },
    { key: 'medipure', label: '💧 Medipure Saf Su, RO & EDI Cihazları', crmCount: 0, orderCount: 0, orderVolumeTry: 0 },
    { key: 'project', label: '🏗️ Anahtar Teslim Su & Atıksu Arıtma Projeleri', crmCount: 0, orderCount: 0, orderVolumeTry: 0 },
    { key: 'service', label: '🔧 Teknik Servis, Membran & Periyodik Bakım', crmCount: 0, orderCount: 0, orderVolumeTry: 0 }
  ];
  const catMap = Object.fromEntries(categories.map((c) => [c.key, c]));

  function detectCategoryKey(text = '', requestType = '') {
    const upper = `${text} ${requestType}`.toUpperCase();
    if (
      upper.includes('MEDIPURE') ||
      upper.includes('MP-') ||
      upper.includes('EDI') ||
      upper.includes('SAF SU') ||
      upper.includes('ULTRA SAF') ||
      upper.includes('HEMODİYALİZ') ||
      upper.includes('HEMODIYALIZ')
    ) {
      return 'medipure';
    }
    if (
      requestType === 'water_project' ||
      upper.includes('PROJE') ||
      upper.includes('TESİS') ||
      upper.includes('TESIS') ||
      upper.includes('ATIKSU') ||
      upper.includes('KEŞİF') ||
      upper.includes('KESIF')
    ) {
      return 'project';
    }
    if (
      upper.includes('SERVİS') ||
      upper.includes('SERVIS') ||
      upper.includes('BAKIM') ||
      upper.includes('MEMBRAN DEĞİŞİM') ||
      upper.includes('REÇİNE')
    ) {
      return 'service';
    }
    return 'chemical';
  }

  for (const req of crmRequests) {
    if ((req.resolutionStatus || 'active') === 'spam') continue;
    const key = detectCategoryKey(
      `${req.relatedProductOrSystem || ''} ${req.subject || ''} ${req.description || ''} ${req.message || ''}`,
      req.requestType || ''
    );
    catMap[key].crmCount += 1;
  }

  for (const ord of orders) {
    if (ord.status === 'İptal') continue;
    const summary = Array.isArray(ord.items)
      ? ord.items.map((i) => i.description || i.code || '').join(' ')
      : String(ord.itemsSummary || ord.notes || '');
    const key = detectCategoryKey(summary, '');
    catMap[key].orderCount += 1;
    catMap[key].orderVolumeTry = money(catMap[key].orderVolumeTry + Number(ord.grandTotal || 0));
  }

  // 81 İl Eşleştirme
  const cityCounts = new Map();
  const normalizeTr = (str) =>
    String(str || '')
      .trim()
      .toLocaleLowerCase('tr-TR')
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c');

  const provinceLookup = TURKEY_81_PROVINCES.map((p) => ({
    ...p,
    norm: normalizeTr(p.name)
  }));

  function matchProvinceOrLabel(rawCity = '') {
    const cleaned = String(rawCity || '').trim();
    if (!cleaned || cleaned === '-') return null;
    const norm = normalizeTr(cleaned);
    for (const p of provinceLookup) {
      if (norm.includes(p.norm)) {
        return { label: `${p.code} ${p.name}`, searchKeyword: p.name, region: p.region };
      }
    }
    return { label: cleaned.slice(0, 32), searchKeyword: cleaned.slice(0, 32), region: 'Diğer / Yurt Dışı' };
  }

  for (const req of crmRequests) {
    const matched = matchProvinceOrLabel(req.cityCountry);
    if (!matched) continue;
    const cur = cityCounts.get(matched.label) || { ...matched, crmCount: 0, customerCount: 0 };
    cur.crmCount += 1;
    cityCounts.set(matched.label, cur);
  }

  for (const cust of customers) {
    const matched = matchProvinceOrLabel(cust.city || cust.address);
    if (!matched) continue;
    const cur = cityCounts.get(matched.label) || { ...matched, crmCount: 0, customerCount: 0 };
    cur.customerCount += 1;
    cityCounts.set(matched.label, cur);
  }

  const topCities = Array.from(cityCounts.values())
    .sort((a, b) => (b.crmCount + b.customerCount) - (a.crmCount + a.customerCount))
    .slice(0, 10);

  return {
    categories,
    topCities
  };
}

/**
 * 6. Depo Stok İlerleme Çubukları & SDS/TDS Teknik Belge Tamlık Denetimi
 */
export function computeInventoryAndComplianceHealth({
  products = [],
  inventoryItems = [],
  documents = []
} = {}) {
  const initializedItems = inventoryItems
    .filter((it) => it.stockInitialized === true)
    .map((it) => {
      const current = Number(it.currentStock || 0);
      const min = Math.max(Number(it.minThreshold || 0), 1);
      const ratioPct = Math.min(200, Math.max(0, Math.round((current / min) * 100)));
      const isCritical = current <= Number(it.minThreshold || 0);
      return {
        ...it,
        current,
        minThreshold: Number(it.minThreshold || 0),
        ratioPct,
        isCritical
      };
    })
    .sort((a, b) => a.ratioPct - b.ratioPct);

  const publishedProducts = products.filter((p) => p.published === true);
  const docProductIds = new Set();
  const docTitlesNorm = documents.map((d) => String(d.title || d.productName || d.relatedProductId || '').toLowerCase());

  for (const d of documents) {
    if (d.productId) docProductIds.add(d.productId);
    if (d.relatedProductId) docProductIds.add(d.relatedProductId);
  }

  const productsMissingDocs = publishedProducts.filter((p) => {
    if (docProductIds.has(p.id)) return false;
    const pName = String(p.name || '').toLowerCase();
    if (!pName) return true;
    return !docTitlesNorm.some((t) => t.includes(pName.slice(0, 12)));
  });

  return {
    initializedItems,
    criticalItems: initializedItems.filter((i) => i.isCritical),
    publishedCount: publishedProducts.length,
    documentedCount: publishedProducts.length - productsMissingDocs.length,
    productsMissingDocs: productsMissingDocs.slice(0, 8)
  };
}

/**
 * 7. Yönetim Özeti CSV / Excel Dışa Aktarım (Sıfır İç Maliyet Sızıntısı)
 */
function csvCell(val) {
  const str = String(val ?? '').replace(/\r?\n/g, ' ').trim();
  if (str.includes(';') || str.includes('"') || str.includes(',')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function buildDashboardExecutiveCsv({
  periodLabel = 'Tüm Zamanlar',
  generatedAtIso = new Date().toISOString().slice(0, 10),
  kpis = {},
  cashFlow = {},
  categories = [],
  unbilledOrders = [],
  recentRequests = []
} = {}) {
  const rows = [
    ['ELİF KİMYA ERP — YÖNETİCİ VE FİNANS ÖZET RAPORU', '', '', '', ''],
    ['Rapor Tarihi', generatedAtIso, 'Dönem Filtresi', periodLabel, ''],
    ['', '', '', '', ''],
    ['1. GENEL OPERASYON VE FİNANS GÖSTERGELERİ', 'Değer / Adet', 'Tutar (TL)', '', ''],
    ['Gelen Sipariş & Teklif Formu Sayısı', kpis.orderAndQuoteCount ?? 0, '', '', ''],
    ['Gelen İletişim & Geri Arama Mesajı', kpis.contactCount ?? 0, '', '', ''],
    ['Aktif Teklif Hacmi (KDV Hariç)', kpis.activeProposalsCount ?? 0, money(kpis.totalQuoteVolumeTry), '', ''],
    ['Onaylanan Kesin Siparişler', kpis.confirmedOrdersCount ?? 0, money(kpis.totalApprovedOrdersTry), '', ''],
    ['Kesilen Satış Faturaları Toplamı', '', money(kpis.salesInvoicesTry), '', ''],
    ['Kesilen Alış Faturaları Toplamı', '', money(kpis.purchaseInvoicesTry), '', ''],
    ['Net Kasa / Banka Mevcut Bakiye', '', money(cashFlow.currentLiquidTry), '', ''],
    ['Vadesi Geçmiş Müşteri Alacağı', cashFlow.overdueReceivablesCount ?? 0, money(cashFlow.overdueReceivablesTry), '', ''],
    ['30 Günlük Beklenen Tahsilat (Fatura + Çek)', '', money(cashFlow.in30DaysTry), '', ''],
    ['30 Günlük Beklenen Ödeme (Alış + Firma Çeki)', '', money(cashFlow.out30DaysTry), '', ''],
    ['30 Gün Sonu Tahmini Net Nakit Pozisyonu', '', money(cashFlow.projected30DayNetTry), '', ''],
    ['', '', '', '', ''],
    ['2. İŞ KOLU DAĞILIMI (GERÇEK TALEPLER VE SİPARİŞLER)', 'CRM Talep Sayısı', 'Onaylı Sipariş Sayısı', 'Sipariş Hacmi (TL)', ''],
    ...categories.map((c) => [c.label, c.crmCount, c.orderCount, money(c.orderVolumeTry), '']),
    ['', '', '', '', ''],
    ['3. FATURASI KESİLMEMİŞ ONAYLI SİPARİŞLER', 'Sipariş No', 'Müşteri Firma', 'Durum', 'KDV Dahil Tutar (TL)'],
    ...(unbilledOrders.length === 0
      ? [['Tüm onaylı siparişler faturalandırılmıştır.', '', '', '', '']]
      : unbilledOrders.map(({ order }) => [
          order.createdAtIso?.slice(0, 10) || '-',
          order.orderNo || '-',
          order.companyName || '-',
          order.status || '-',
          money(order.grandTotal)
        ])),
    ['', '', '', '', ''],
    ['4. SON GELEN TALEPLER VE SİPARİŞ FORMLARI', 'Firma Adı', 'Yetkili & Telefon', 'Ürün / Sistem', 'Aşama'],
    ...recentRequests.slice(0, 20).map((r) => [
      (r.createdAtIso || '').slice(0, 16),
      r.companyName || '-',
      `${r.contactName || '-'} (${r.phone || '-'})`,
      r.relatedProductOrSystem || r.subject || r.requestType || '-',
      r.stage || '-'
    ])
  ];

  return '\uFEFF' + rows.map((r) => r.map(csvCell).join(';')).join('\r\n');
}

export function downloadDashboardExecutiveCsv(params = {}) {
  const csv = buildDashboardExecutiveCsv(params);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const datePart = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `ElifKimya_Dashboard_Ozet_${datePart}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

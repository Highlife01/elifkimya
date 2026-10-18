import test from 'node:test';
import assert from 'node:assert/strict';
import {
  classifyInboundRequest,
  computeSlaBadge,
  searchGlobalAdminStore,
  computeCashFlowCalendar,
  computeOrderInvoiceReconciliation,
  computeCategoryAndCityAnalytics,
  computeInventoryAndComplianceHealth,
  buildDashboardExecutiveCsv
} from '../src/utils/dashboard-analytics.js';

test('Gelen kutusu sınıflandırması: Medipure ve Kimyasal siparişlerini doğru ayırır', () => {
  const mp = classifyInboundRequest({
    formChannel: 'order_form',
    requestType: 'order_request',
    relatedProductOrSystem: '[MEDIPURE CİHAZ SİPARİŞİ] MP-RO-500 Çift Kademeli RO'
  });
  assert.equal(mp.code, 'medipure_order');
  assert.equal(mp.isMedipureOrder, true);
  assert.equal(mp.isChemicalOrder, false);

  const chem = classifyInboundRequest({
    formChannel: 'order_form',
    requestType: 'order_request',
    relatedProductOrSystem: '[KİMYASAL ÜRÜN SİPARİŞİ] Sodyum Hipoklorit IBC 1000L'
  });
  assert.equal(chem.code, 'chemical_order');
  assert.equal(chem.isChemicalOrder, true);
  assert.equal(chem.isMedipureOrder, false);

  const cb = classifyInboundRequest({
    formChannel: 'callback_form',
    requestType: 'callback_30min'
  });
  assert.equal(cb.code, 'callback');
  assert.equal(cb.isOrderOrQuote, false);
});

test('SLA sayacı: 30 dakikayı aşan geri arama ve 2 saati aşan yeni talepleri uyarır', () => {
  const nowMs = Date.parse('2026-10-19T12:00:00Z');
  const breachedCallback = computeSlaBadge(
    {
      formChannel: 'callback_form',
      stage: 'Yeni Talep',
      resolutionStatus: 'active',
      createdAtIso: '2026-10-19T11:15:00Z'
    },
    nowMs
  );
  assert.equal(breachedCallback.status, 'breached');
  assert.equal(breachedCallback.badgeClass, 'badge-error');

  const handled = computeSlaBadge(
    {
      formChannel: 'order_form',
      stage: 'Teklif Sunuldu',
      resolutionStatus: 'active',
      createdAtIso: '2026-10-18T10:00:00Z'
    },
    nowMs
  );
  assert.equal(handled.status, 'handled');
});

test('Global ERP arama: tüm koleksiyonlarda eşleşen kayıtları ve yönlendirme presetlerini döndürür', () => {
  const store = {
    crmRequests: [{ id: 'req1', companyName: 'Kıvanç Tekstil', relatedProductOrSystem: 'Medipure EDI', stage: 'Yeni Talep' }],
    orders: [{ id: 'ord1', orderNo: 'SIP-2026-0105', companyName: 'Bossa Sanayi', grandTotal: 145000, status: 'Hazırlanıyor' }],
    accountingInvoices: [{ id: 'inv1', invoiceNo: 'ELF2026000000012', companyName: 'Sanko Enerji', grandTotalTry: 240000, invoiceType: 'SATIS' }]
  };
  const hitsMp = searchGlobalAdminStore(store, 'medipure');
  assert.equal(hitsMp.length, 1);
  assert.equal(hitsMp[0].preset.module, 'crm');

  const hitsInv = searchGlobalAdminStore(store, 'ELF2026');
  assert.equal(hitsInv.length, 1);
  assert.equal(hitsInv[0].preset.module, 'accounting');
});

test('30 günlük nakit akışı ve vade takvimi: proformaları hariç tutar, alacak/borç ve çek vadelerini hesaplar', () => {
  const cal = computeCashFlowCalendar({
    todayIso: '2026-10-19',
    transactions: [
      { direction: 'TAHSILAT', amountTry: 200000 },
      { direction: 'TEDIYE', amountTry: 50000 }
    ],
    invoices: [
      { invoiceNo: 'ELF2026000000001', invoiceType: 'SATIS', docCategory: 'E-FATURA', companyName: 'Müşteri A', remainingAmountTry: 80000, dueDate: '2026-10-22' },
      { invoiceNo: 'PRO2026000000001', invoiceType: 'SATIS', docCategory: 'PROFORMA', companyName: 'Proforma Cari', remainingAmountTry: 999999, dueDate: '2026-10-22' },
      { invoiceNo: 'ALS2026000000002', invoiceType: 'ALIS', docCategory: 'E-FATURA', companyName: 'Tedarikçi B', remainingAmountTry: 30000, dueDate: '2026-11-05' },
      { invoiceNo: 'ELF2026000000003', invoiceType: 'SATIS', docCategory: 'E-FATURA', companyName: 'Geciken C', remainingAmountTry: 25000, dueDate: '2026-10-01' }
    ],
    chequesAndNotes: [
      { instrumentType: 'MUSTERI_CEKI', status: 'Portföyde', portfolioNo: 'PRT-1', companyName: 'Müşteri Çeki', amountTry: 40000, maturityDate: '2026-10-25' }
    ]
  });

  assert.equal(cal.currentLiquidTry, 150000);
  assert.equal(cal.overdueReceivablesTry, 25000);
  assert.equal(cal.in7DaysTry, 120000); // 80k fatura + 40k müşteri çeki
  assert.equal(cal.in30DaysTry, 120000);
  assert.equal(cal.out30DaysTry, 30000);
  assert.equal(cal.projected30DayNetTry, 240000); // 150k + 120k - 30k
});

test('Sipariş-Fatura mutabakatı: faturası kesilmemiş onaylı siparişleri ve senkron bekleyen faturaları bulur', () => {
  const rec = computeOrderInvoiceReconciliation({
    orders: [
      { id: 'o1', orderNo: 'SIP-101', companyName: 'Faturalanmış A.Ş.', status: 'Teslim Edildi', grandTotal: 50000 },
      { id: 'o2', orderNo: 'SIP-102', companyName: 'Bekleyen Sanayi', status: 'Onaylandı', grandTotal: 120000, vatRate: 20 }
    ],
    invoices: [
      { id: 'inv1', orderId: 'o1', orderNo: 'SIP-101', invoiceType: 'SATIS', docCategory: 'E-FATURA' }
    ],
    syncStatesByInvoiceId: new Map()
  });

  assert.equal(rec.unbilledOrders.length, 1);
  assert.equal(rec.unbilledOrders[0].order.orderNo, 'SIP-102');
  assert.equal(rec.unbilledTotalTry, 120000);
  assert.equal(rec.unsyncedInvoices.length, 1);
});

test('İş kolu ve 81 il analitiği + CSV raporlama: iç maliyet verisi sızdırmaz', () => {
  const { categories, topCities } = computeCategoryAndCityAnalytics({
    crmRequests: [
      { companyName: 'Adana Kimya', cityCountry: 'Adana', relatedProductOrSystem: 'Sodyum Hipoklorit IBC' },
      { companyName: 'Gaziantep Medikal', cityCountry: 'Gaziantep', relatedProductOrSystem: 'Medipure MP-EDI-1000 Saf Su' }
    ],
    orders: [
      { status: 'Onaylandı', grandTotal: 90000, itemsSummary: 'Medipure EDI Saf Su Sistemi' }
    ],
    customers: []
  });

  const mpCat = categories.find((c) => c.key === 'medipure');
  assert.equal(mpCat.crmCount, 1);
  assert.equal(mpCat.orderCount, 1);
  assert.equal(mpCat.orderVolumeTry, 90000);
  assert.equal(topCities.length, 2);

  const comp = computeInventoryAndComplianceHealth({
    products: [{ id: 'p1', name: 'Sodyum Hipoklorit', published: true }],
    inventoryItems: [{ id: 's1', sku: 'NAOCL-IBC', name: 'Hipoklorit', stockInitialized: true, currentStock: 200, minThreshold: 500, unit: 'kg' }],
    documents: []
  });
  assert.equal(comp.criticalItems.length, 1);
  assert.equal(comp.productsMissingDocs.length, 1);

  const csv = buildDashboardExecutiveCsv({
    periodLabel: 'Son 30 Gün',
    kpis: { orderAndQuoteCount: 2, confirmedOrdersCount: 1, totalApprovedOrdersTry: 90000 },
    cashFlow: { currentLiquidTry: 150000, projected30DayNetTry: 240000 },
    categories,
    unbilledOrders: [],
    recentRequests: [{ companyName: 'Adana Kimya', unitCost: 77777, internalAdminNotes: 'GIZLI_NOT' }]
  });
  assert.ok(csv.startsWith('\uFEFF'));
  assert.match(csv, /ELİF KİMYA ERP/);
  assert.doesNotMatch(csv, /77777/);
  assert.doesNotMatch(csv, /GIZLI_NOT/);
});

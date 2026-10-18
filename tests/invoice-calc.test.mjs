import test from 'node:test';
import assert from 'node:assert/strict';
import { computeInvoiceTotals, derivePaymentStatus, normalizeInvoiceLines, MAX_INVOICE_LINES } from '../src/utils/invoice-calc.js';

test('toplu fatura: iskonto, KDV ve tevkifat eski hesapla aynı sonucu verir', () => {
  const t = computeInvoiceTotals({ subtotal: 85000, discountTotal: 5000, vatRate: 20, withholdingRate: '5/10' });
  assert.equal(t.netExclVat, 80000);
  assert.equal(t.vatAmount, 16000);
  assert.equal(t.withholdingAmount, 8000);
  assert.equal(t.payableVat, 8000);
  assert.equal(t.grandTotal, 88000);
  assert.equal(t.grandTotalTry, 88000);
  assert.equal(t.lines.length, 0);
});

test('kalemli fatura: karışık KDV oranları kalem bazında hesaplanır', () => {
  const t = computeInvoiceTotals({
    lines: [
      { description: 'Antiskalant IBC', quantity: 2, unitPrice: 10000, vatRate: 20 },
      { description: 'Kitap', quantity: 1, unitPrice: 1000, vatRate: 10, discountPercent: 10 }
    ]
  });
  assert.equal(t.subtotal, 21000);
  assert.equal(t.discountTotal, 100);
  assert.equal(t.netExclVat, 20900);
  assert.equal(t.vatAmount, 4090);
  assert.equal(t.vatMixed, true);
  assert.equal(t.grandTotal, 24990);
});

test('kalemli fatura: tek KDV oranı korunur ve döviz TL karşılığı hesaplanır', () => {
  const t = computeInvoiceTotals({
    currency: 'EUR',
    exchangeRate: 35.5,
    lines: [{ description: 'Medipure cihaz', quantity: 1, unitPrice: 1000, vatRate: 20 }]
  });
  assert.equal(t.vatRate, 20);
  assert.equal(t.vatMixed, false);
  assert.equal(t.grandTotal, 1200);
  assert.equal(t.grandTotalTry, 42600);
});

test('geçersiz kalemler reddedilir', () => {
  assert.throws(() => normalizeInvoiceLines([{ description: '', quantity: 1, unitPrice: 1 }]), /açıklama/);
  assert.throws(() => normalizeInvoiceLines([{ description: 'x', quantity: 0, unitPrice: 1 }]), /miktar/);
  assert.throws(() => normalizeInvoiceLines([{ description: 'x', quantity: 1, unitPrice: -1 }]), /negatif/);
  assert.throws(() => normalizeInvoiceLines([{ description: 'x', quantity: 1, unitPrice: 1, vatRate: 120 }]), /KDV/);
  assert.throws(() => normalizeInvoiceLines(Array.from({ length: MAX_INVOICE_LINES + 1 }, () => ({ description: 'x', quantity: 1, unitPrice: 1 }))), /en fazla/);
});

import { buildUblTrInvoiceXml } from '../src/utils/ubl-tr-invoice.js';
import { INTEGRATION_PRESETS, configFromForm, configToFormValues } from '../src/utils/integration-config.js';
import { normalizeConfig } from '../functions/lib/config.js';

test('ödeme durumu: tam, kısmi, vadesi geçmiş ve bekleyen', () => {
  const now = Date.parse('2026-06-01');
  assert.equal(derivePaymentStatus({ grandTotalTry: 100, paidAmountTry: 100, now }), 'Ödendi');
  assert.equal(derivePaymentStatus({ grandTotalTry: 100, paidAmountTry: 40, now }), 'Kısmi Ödeme');
  assert.equal(derivePaymentStatus({ grandTotalTry: 100, paidAmountTry: 0, dueDate: '2026-05-01', now }), 'Vadesi Geçti');
  assert.equal(derivePaymentStatus({ grandTotalTry: 100, paidAmountTry: 0, dueDate: '2026-07-01', now }), 'Ödeme Bekliyor');
});

test('UBL-TR 2.1 XML: tevkifatlı, çok kalemli ve dövizli faturayı GİB TR1.2 şemasına uygun üretir ve iç maliyet sızdırmaz', () => {
  const totals = computeInvoiceTotals({
    currency: 'USD',
    exchangeRate: 34.25,
    withholdingRate: '5/10',
    lines: [
      { description: 'Sodyum Hipoklorit IBC 1000L', unit: 'IBC', quantity: 4, unitPrice: 250, vatRate: 20 },
      { description: 'Medipure EDI Saf Su Modülü', unit: 'Adet', quantity: 1, unitPrice: 1500, discountPercent: 10, vatRate: 20 }
    ]
  });
  const xml = buildUblTrInvoiceXml({
    ...totals,
    invoiceNo: 'ELF2026000000145',
    docCategory: 'E-FATURA',
    invoiceType: 'TEVKIFAT',
    withholdingCode: '604',
    companyName: 'Bossa Ticaret ve Sanayi İşletmeleri T.A.Ş.',
    taxOffice: 'Büyük Mükellefler V.D.',
    taxNumber: '1800012345',
    issueDate: '2026-10-19',
    dueDate: '2026-11-19',
    unitCost: 99999,
    internalAdminNotes: 'GIZLI_MALIYET_NOTU'
  }, { taxNumber: '1234567890', taxOffice: 'Seyhan Vergi Dairesi' });

  assert.match(xml, /<cbc:UBLVersionID>2\.1<\/cbc:UBLVersionID>/);
  assert.match(xml, /<cbc:CustomizationID>TR1\.2<\/cbc:CustomizationID>/);
  assert.match(xml, /<cbc:ProfileID>TICARIFATURA<\/cbc:ProfileID>/);
  assert.match(xml, /<cbc:InvoiceTypeCode>TEVKIFAT<\/cbc:InvoiceTypeCode>/);
  assert.match(xml, /<cbc:ID>ELF2026000000145<\/cbc:ID>/);
  assert.match(xml, /<cbc:CalculationRate>34\.2500<\/cbc:CalculationRate>/);
  assert.match(xml, /<cac:WithholdingTaxTotal>/);
  assert.match(xml, /<cbc:TaxTypeCode>604<\/cbc:TaxTypeCode>/);
  assert.match(xml, /<cbc:LineCountNumeric>2<\/cbc:LineCountNumeric>/);
  assert.doesNotMatch(xml, /99999/);
  assert.doesNotMatch(xml, /GIZLI_MALIYET_NOTU/);
});

test('entegrasyon hazır şablonları (INTEGRATION_PRESETS) hem istemci hem sunucu doğrulamasından hatasız geçer', () => {
  for (const [presetKey, preset] of Object.entries(INTEGRATION_PRESETS)) {
    const formValues = configToFormValues(preset.config);
    const roundTripped = configFromForm(formValues);
    const serverNormalized = normalizeConfig(roundTripped);
    assert.equal(serverNormalized.enabled, true, `${presetKey} şablonu sunucu doğrulamasından geçmelidir`);
    assert.ok(Object.keys(serverNormalized.outboundInvoiceMap).length > 0);
    assert.ok(Object.keys(serverNormalized.inboundInvoiceMap).length > 0);
  }
});


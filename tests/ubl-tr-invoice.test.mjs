import test from 'node:test';
import assert from 'node:assert/strict';
import { buildUblTrInvoiceXml } from '../src/utils/ubl-tr-invoice.js';

const seller = { taxNumber: '1234567890', taxOffice: 'Seyhan VD', companyName: 'Test A.Ş.' };
const base = {
  invoiceNo: 'ELF2026000000001', invoiceType: 'SATIS', docCategory: 'E-FATURA', issueDate: '2026-10-19',
  companyName: 'Alıcı Ltd.', taxNumber: '9876543210', currency: 'TRY', exchangeRate: 1,
  subtotal: 1000, discountTotal: 0, netExclVat: 1000, vatRate: 20, vatAmount: 200, withholdingRate: 'Yok', withholdingAmount: 0, payableVat: 200, grandTotal: 1200
};

test('satıcı VKN, vergi dairesi ve GİB numarası olmadan XML üretilmez', () => {
  assert.throws(() => buildUblTrInvoiceXml(base, {}), /VKN/);
  assert.throws(() => buildUblTrInvoiceXml(base, { taxNumber: '1234567890' }), /vergi dairesi/);
  assert.throws(() => buildUblTrInvoiceXml({ ...base, invoiceNo: 'F-1' }, seller), /GİB biçiminde/);
  assert.throws(() => buildUblTrInvoiceXml({ ...base, docCategory: 'PROFORMA' }, seller), /Proforma/);
  assert.throws(() => buildUblTrInvoiceXml({ ...base, invoiceType: 'ALIS' }, seller), /Alış/);
});

test('e-fatura alıcı VKN zorunlu, e-arşivde sabit TCKN kullanılır', () => {
  assert.throws(() => buildUblTrInvoiceXml({ ...base, taxNumber: '' }, seller), /VKN\/TCKN/);
  const xml = buildUblTrInvoiceXml({ ...base, docCategory: 'E-ARSIV', taxNumber: '' }, seller);
  assert.match(xml, /schemeID="TCKN">11111111111</);
});

test('tevkifat kodu ve KDV istisna kodu XML\'e yazılır', () => {
  const withheld = buildUblTrInvoiceXml({ ...base, withholdingRate: '7/10', withholdingNumerator: 7, withholdingAmount: 140, payableVat: 60, grandTotal: 1060, withholdingCode: '603' }, seller);
  assert.match(withheld, /<cbc:TaxTypeCode>603<\/cbc:TaxTypeCode>/);
  assert.doesNotMatch(withheld, /9015/);
  const exempt = buildUblTrInvoiceXml({ ...base, docCategory: 'IHRACAT', vatRate: 0, vatAmount: 0, payableVat: 0, grandTotal: 1000, vatExemptionCode: '301' }, seller);
  assert.match(exempt, /<cbc:TaxExemptionReasonCode>301<\/cbc:TaxExemptionReasonCode>/);
});

test('karışık KDV oranlı fatura oran bazında ayrı alt toplam üretir', () => {
  const xml = buildUblTrInvoiceXml({
    ...base,
    netExclVat: 1100, vatAmount: 210, grandTotal: 1310, payableVat: 210,
    lines: [
      { description: 'A', quantity: 1, unitPrice: 1000, net: 1000, vatRate: 20, vatAmount: 200 },
      { description: 'B', quantity: 1, unitPrice: 100, net: 100, vatRate: 10, vatAmount: 10 }
    ]
  }, seller);
  assert.match(xml, /<cbc:Percent>20<\/cbc:Percent>/);
  assert.match(xml, /<cbc:Percent>10<\/cbc:Percent>/);
  assert.ok(!xml.includes('3320000000'));
});

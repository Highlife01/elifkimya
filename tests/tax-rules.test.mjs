import test from 'node:test';
import assert from 'node:assert/strict';
import { computeInvoiceTotals } from '../src/utils/invoice-calc.js';
import {
  allowedVatRates,
  invoiceIssuanceLimit,
  invoiceSeriesFor,
  isValidEInvoiceNumber,
  nextInvoiceNumber,
  validateInvoiceCompliance
} from '../src/utils/tax-rules.js';

const check = (input) => validateInvoiceCompliance(
  { invoiceType: 'SATIS', docCategory: 'E-FATURA', issueDate: '2026-10-19', ...input },
  computeInvoiceTotals(input)
);

test('KDV oranları tarihe göre doğrulanır', () => {
  assert.deepEqual(allowedVatRates('2026-01-01'), [0, 1, 10, 20]);
  assert.deepEqual(allowedVatRates('2023-07-09'), [0, 1, 8, 18]);
  assert.deepEqual(allowedVatRates('2023-07-10'), [0, 1, 10, 20]);
  assert.match(check({ subtotal: 1000, vatRate: 18 }).errors.join(' '), /%18/);
  assert.equal(check({ subtotal: 1000, vatRate: 20 }).errors.length, 0);
  assert.equal(validateInvoiceCompliance({ invoiceType: 'SATIS', docCategory: 'E-FATURA', issueDate: '2023-03-01', invoiceNo: '' }, computeInvoiceTotals({ subtotal: 100, vatRate: 18 })).errors.length, 0);
  assert.match(check({ lines: [{ description: 'a', quantity: 1, unitPrice: 10, vatRate: 20 }, { description: 'b', quantity: 1, unitPrice: 10, vatRate: 7 }] }).errors.join(' '), /%7/);
});

test('GİB fatura numarası biçimi ve ardışık üretim', () => {
  assert.equal(isValidEInvoiceNumber('ELF2026000000001', '2026-10-19'), true);
  assert.equal(isValidEInvoiceNumber('ELF2025000000001', '2026-10-19'), false);
  assert.equal(isValidEInvoiceNumber('ELF20260001', '2026-10-19'), false);
  assert.equal(isValidEInvoiceNumber('EF-2026000000001', '2026-10-19'), false);
  assert.equal(nextInvoiceNumber({ year: '2026' }), 'ELF2026000000001');
  assert.equal(nextInvoiceNumber({ year: '2026', lastNumber: 'ELF2026000000041' }), 'ELF2026000000042');
  assert.equal(nextInvoiceNumber({ year: '2027', lastNumber: 'ELF2026000000041' }), 'ELF2027000000001');
  assert.equal(nextInvoiceNumber({ series: 'PRF', year: '2026', lastNumber: 'PRF2026000000009' }), 'PRF2026000000010');
  assert.equal(invoiceSeriesFor('PROFORMA'), 'PRF');
  assert.match(check({ subtotal: 100, vatRate: 20, invoiceNo: 'F-1' }).errors.join(' '), /GİB biçiminde/);
  assert.equal(check({ subtotal: 100, vatRate: 20, invoiceNo: 'ELF2026000000007' }).errors.length, 0);
});

test('alış faturasında tedarikçi numarası zorunlu, biçim serbesttir', () => {
  const base = { invoiceType: 'ALIS', docCategory: 'E-FATURA', issueDate: '2026-10-19', subtotal: 100, vatRate: 20 };
  assert.match(validateInvoiceCompliance(base, computeInvoiceTotals(base)).errors.join(' '), /zorunlu/);
  const withNo = { ...base, invoiceNo: 'ABC-123' };
  assert.equal(validateInvoiceCompliance(withNo, computeInvoiceTotals(withNo)).errors.length, 0);
});

test('%0 KDV ve ihracat kuralları', () => {
  assert.match(check({ subtotal: 100, vatRate: 0 }).errors.join(' '), /istisna kodu/);
  assert.equal(check({ subtotal: 100, vatRate: 0, vatExemptionCode: '301' }).errors.length, 0);
  assert.match(check({ docCategory: 'IHRACAT', subtotal: 100, vatRate: 20, vatExemptionCode: '301' }).errors.join(' '), /İhracat/);
  assert.equal(check({ docCategory: 'IHRACAT', subtotal: 100, vatRate: 0, vatExemptionCode: '301', currency: 'EUR', exchangeRate: 40 }).errors.length, 0);
});

test('tevkifat: kod zorunlu, oran koda uymalı, alt sınır uyarısı', () => {
  const base = { subtotal: 50000, vatRate: 20, withholdingRate: '7/10' };
  assert.match(check(base).errors.join(' '), /tevkifat kodu/);
  assert.equal(check({ ...base, withholdingCode: '603' }).errors.length, 0);
  assert.match(check({ ...base, withholdingCode: '624' }).errors.join(' '), /2\/10/);
  assert.match(check({ ...base, withholdingCode: '999' }).warnings.join(' '), /listede yok/);
  assert.match(check({ ...base, subtotal: 5000, withholdingCode: '603' }).warnings.join(' '), /alt sınır/);
  assert.equal(check({ ...base, subtotal: 50000, withholdingCode: '603' }).warnings.some((w) => /alt sınır/.test(w)), false);
  assert.match(check({ subtotal: 1000, vatRate: 0, vatExemptionCode: '301', withholdingRate: '5/10', withholdingCode: '604' }).errors.join(' '), /KDV tutarı olmayan/);
});

test('proforma vergi kontrollerinden muaftır ve uyarı verir', () => {
  const r = check({ docCategory: 'PROFORMA', subtotal: 100, vatRate: 7 });
  assert.equal(r.errors.length, 0);
  assert.match(r.warnings[0], /Proforma/);
});

test('fatura düzenleme sınırı yıllara göre', () => {
  assert.equal(invoiceIssuanceLimit(2026), 12000);
  assert.equal(invoiceIssuanceLimit(2025), 9900);
  assert.equal(invoiceIssuanceLimit(2031), null);
});

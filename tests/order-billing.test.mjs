import test from 'node:test';
import assert from 'node:assert/strict';
import { deriveOrderBilling, vatAmountFromGross } from '../src/utils/order-billing.js';

test('doğrulanmış KDV dağılımı olan sipariş faturaya hazırdır', () => {
  const b = deriveOrderBilling({ grandTotal: 1200, netExclVat: 1000, vatTotal: 200, currency: 'TRY' });
  assert.equal(b.ready, true);
  assert.equal(b.vatRate, 20);
  assert.equal(b.netExclVat, 1000);
  assert.equal(deriveOrderBilling({ grandTotal: 1100, netExclVat: 1000, vatTotal: 100 }).vatRate, 10);
  // %0 (istisna/ihracat) tek tıkla kesilmez: istisna kodu faturada girilmeli
  assert.equal(deriveOrderBilling({ grandTotal: 500, netExclVat: 500, vatTotal: 0 }).ready, false);
});

test('KDV dağılımı olmayan veya tutarsız sipariş hazır sayılmaz ve KDV üretilmez', () => {
  const unknown = deriveOrderBilling({ grandTotal: 1200 });
  assert.equal(unknown.ready, false);
  assert.equal(unknown.vatRate, null);
  assert.equal(unknown.netExclVat, 0);
  // Eski formun tahmini kaydı: matrah = toplam/1,2 ama KDV yazılmamış
  assert.equal(deriveOrderBilling({ grandTotal: 1200, netExclVat: 1000, vatTotal: 0 }).ready, false);
  assert.equal(deriveOrderBilling({ grandTotal: 1230, netExclVat: 1000, vatTotal: 230 }).ready, false);
  assert.equal(deriveOrderBilling({ grandTotal: 0 }).ready, false);
});

test('döviz siparişi kur bilinmeden hazır sayılmaz', () => {
  const b = deriveOrderBilling({ grandTotal: 1200, netExclVat: 1000, vatTotal: 200, currency: 'EUR' });
  assert.equal(b.ready, false);
  assert.match(b.reason, /EUR/);
});

test('kullanıcının seçtiği orandan matrah hesaplanır', () => {
  assert.deepEqual(vatAmountFromGross(1200, 20), { netExclVat: 1000, vatTotal: 200 });
  assert.deepEqual(vatAmountFromGross(1100, 10), { netExclVat: 1000, vatTotal: 100 });
  assert.deepEqual(vatAmountFromGross(1000, 0), { netExclVat: 1000, vatTotal: 0 });
});

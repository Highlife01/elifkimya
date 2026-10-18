import test from 'node:test';
import assert from 'node:assert/strict';
import { computePeriodComparison, computeReceivablesAging, createRenderScheduler, memoizeByRefs } from '../src/utils/dashboard-insights.js';

const inv = (over) => ({ invoiceType: 'SATIS', docCategory: 'E-FATURA', remainingAmountTry: 1000, companyName: 'A Ltd', dueDate: '2026-10-19', ...over });

test('tahsilat yaşlandırma dilimleri, proforma ve kapalı faturalar dışarıda', () => {
  const r = computeReceivablesAging({
    todayIso: '2026-10-19',
    invoices: [
      inv({ dueDate: '2026-11-01', remainingAmountTry: 100 }),
      inv({ dueDate: '2026-10-10', remainingAmountTry: 200, companyName: 'B AŞ' }),
      inv({ dueDate: '2026-09-01', remainingAmountTry: 300, companyName: 'B AŞ' }),
      inv({ dueDate: '2026-06-01', remainingAmountTry: 400, companyName: 'C Ltd' }),
      inv({ dueDate: '', remainingAmountTry: 50 }),
      inv({ remainingAmountTry: 0 }),
      inv({ docCategory: 'PROFORMA', dueDate: '2026-01-01', remainingAmountTry: 9999 }),
      inv({ invoiceType: 'ALIS', dueDate: '2026-01-01', remainingAmountTry: 9999 })
    ]
  });
  const by = Object.fromEntries(r.buckets.map((b) => [b.key, b.amountTry]));
  assert.deepEqual(by, { current: 100, d1_30: 200, d31_60: 300, d61_plus: 400, noDue: 50 });
  assert.equal(r.totalOpenTry, 1050);
  assert.equal(r.overdueTry, 900);
  assert.equal(r.topRiskCustomers[0].companyName, 'B AŞ');
  assert.equal(r.topRiskCustomers[0].overdueTry, 500);
  assert.equal(r.topRiskCustomers[0].invoiceCount, 2);
  assert.equal(r.topRiskCustomers[1].companyName, 'C Ltd');
  assert.equal(r.topRiskCustomers[1].oldestDays, 140);
});

test('dönem karşılaştırma son N gün ile önceki N günü ayırır', () => {
  const now = Date.parse('2026-10-19T12:00:00Z');
  const day = (n) => new Date(now - n * 86400000).toISOString();
  const items = [{ at: day(1), v: 100 }, { at: day(10), v: 100 }, { at: day(35), v: 100 }, { at: day(50), v: 50 }, { at: day(90), v: 999 }, { at: '', v: 5 }];
  const r = computePeriodComparison({ items, dateOf: (i) => i.at, getValue: (i) => i.v, days: 30, nowMs: now });
  assert.deepEqual(r, { current: 200, previous: 150, changePct: 33.3, hasPrevious: true });
  assert.equal(computePeriodComparison({ items, dateOf: (i) => i.at, days: 0 }), null);
  const none = computePeriodComparison({ items: [{ at: day(1) }], dateOf: (i) => i.at, days: 30, nowMs: now });
  assert.equal(none.changePct, null);
  assert.equal(none.hasPrevious, false);
});

test('memoizeByRefs aynı referanslarda yeniden hesaplamaz', () => {
  let calls = 0;
  const memo = memoizeByRefs((a, b) => { calls += 1; return a.length + b; });
  const arr = [1, 2];
  assert.equal(memo(arr, 1), 3);
  assert.equal(memo(arr, 1), 3);
  assert.equal(calls, 1);
  assert.equal(memo([1, 2], 1), 3);
  assert.equal(calls, 2);
});

test('render zamanlayıcı birleştirir ve gizli sekmede erteler', async () => {
  let renders = 0;
  let hidden = false;
  let visibleCb = null;
  const scheduler = createRenderScheduler(() => { renders += 1; }, { delayMs: 10, isHidden: () => hidden, onVisible: (cb) => { visibleCb = cb; } });
  scheduler.schedule(); scheduler.schedule(); scheduler.schedule();
  await new Promise((r) => setTimeout(r, 40));
  assert.equal(renders, 1);
  hidden = true;
  scheduler.schedule();
  await new Promise((r) => setTimeout(r, 40));
  assert.equal(renders, 1);
  hidden = false;
  visibleCb();
  assert.equal(renders, 2);
});

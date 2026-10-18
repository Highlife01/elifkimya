/**
 * Dashboard için saf analiz fonksiyonları: tahsilat yaşlandırma, dönem karşılaştırma ve hesap önbelleği.
 * Yalnızca store verisinden hesaplar; sahte veri üretmez, iç maliyet alanlarına dokunmaz.
 */

const DAY_MS = 86400000;
const money = (value) => Number(Number(value || 0).toFixed(2));
const toDayMs = (iso) => {
  const ms = Date.parse(`${String(iso || '').slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(ms) ? null : ms;
};

export const AGING_BUCKETS = [
  { key: 'current', label: 'Vadesi gelmemiş' },
  { key: 'd1_30', label: '1–30 gün gecikmiş' },
  { key: 'd31_60', label: '31–60 gün gecikmiş' },
  { key: 'd61_plus', label: '60+ gün gecikmiş' },
  { key: 'noDue', label: 'Vade tarihi yok' }
];

function bucketFor(daysOverdue) {
  if (daysOverdue === null) return 'noDue';
  if (daysOverdue <= 0) return 'current';
  if (daysOverdue <= 30) return 'd1_30';
  if (daysOverdue <= 60) return 'd31_60';
  return 'd61_plus';
}

/** Açık satış faturalarını vade gecikmesine göre dilimler; en riskli carileri listeler. */
export function computeReceivablesAging({ invoices = [], todayIso, topN = 5 } = {}) {
  const todayMs = toDayMs(todayIso) ?? toDayMs(new Date().toISOString());
  const buckets = Object.fromEntries(AGING_BUCKETS.map((b) => [b.key, { ...b, amountTry: 0, count: 0 }]));
  const customers = new Map();
  let totalOpenTry = 0;

  for (const inv of invoices) {
    if (inv.invoiceType !== 'SATIS' || String(inv.docCategory || '').toUpperCase() === 'PROFORMA') continue;
    const remaining = money(inv.remainingAmountTry);
    if (!(remaining > 0)) continue;
    const dueMs = toDayMs(inv.dueDate);
    const daysOverdue = dueMs === null ? null : Math.floor((todayMs - dueMs) / DAY_MS);
    const key = bucketFor(daysOverdue);
    buckets[key].amountTry = money(buckets[key].amountTry + remaining);
    buckets[key].count += 1;
    totalOpenTry = money(totalOpenTry + remaining);

    if (daysOverdue !== null && daysOverdue > 0) {
      const name = String(inv.companyName || inv.partyName || 'İsimsiz Cari').trim();
      const entry = customers.get(name.toUpperCase()) || { companyName: name, overdueTry: 0, invoiceCount: 0, oldestDays: 0 };
      entry.overdueTry = money(entry.overdueTry + remaining);
      entry.invoiceCount += 1;
      entry.oldestDays = Math.max(entry.oldestDays, daysOverdue);
      customers.set(name.toUpperCase(), entry);
    }
  }

  const overdueTry = money(buckets.d1_30.amountTry + buckets.d31_60.amountTry + buckets.d61_plus.amountTry);
  return {
    buckets: AGING_BUCKETS.map((b) => buckets[b.key]),
    totalOpenTry,
    overdueTry,
    topRiskCustomers: [...customers.values()].sort((a, b) => b.overdueTry - a.overdueTry).slice(0, topN)
  };
}

/**
 * Son `days` gün ile hemen önceki `days` günü karşılaştırır.
 * @param {{ items: object[], dateOf: (item: object) => string, getValue?: (item: object) => number, days: number, nowMs?: number }} params
 */
export function computePeriodComparison({ items = [], dateOf, getValue = () => 1, days, nowMs = Date.now() }) {
  if (!(days > 0) || typeof dateOf !== 'function') return null;
  const currentStart = nowMs - days * DAY_MS;
  const previousStart = nowMs - 2 * days * DAY_MS;
  let current = 0;
  let previous = 0;
  let previousCount = 0;

  for (const item of items) {
    const ms = Date.parse(dateOf(item) || '');
    if (Number.isNaN(ms)) continue;
    const value = Number(getValue(item)) || 0;
    if (ms > currentStart && ms <= nowMs) current += value;
    else if (ms > previousStart && ms <= currentStart) {
      previous += value;
      previousCount += 1;
    }
  }

  return {
    current: money(current),
    previous: money(previous),
    changePct: previous > 0 ? Math.round(((current - previous) / previous) * 1000) / 10 : null,
    hasPrevious: previousCount > 0
  };
}

/** Argüman referansları değişmedikçe sonucu yeniden hesaplamaz (store dizileri her yenilemede yeni referans alır). */
export function memoizeByRefs(fn) {
  let lastArgs = null;
  let lastResult;
  return (...args) => {
    if (lastArgs && args.length === lastArgs.length && args.every((arg, i) => arg === lastArgs[i])) return lastResult;
    lastResult = fn(...args);
    lastArgs = args;
    return lastResult;
  };
}

/** Ardışık çağrıları birleştirir; sekme gizliyse görünür olana kadar bekler. */
export function createRenderScheduler(render, { delayMs = 400, isHidden = () => false, onVisible } = {}) {
  let timer = null;
  let pending = false;

  const flush = () => {
    timer = null;
    if (isHidden()) {
      pending = true;
      return;
    }
    pending = false;
    render();
  };

  if (typeof onVisible === 'function') {
    onVisible(() => {
      if (pending && !isHidden()) {
        pending = false;
        render();
      }
    });
  }

  return {
    schedule() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(flush, delayMs);
    },
    cancel() {
      if (timer) clearTimeout(timer);
      timer = null;
      pending = false;
    }
  };
}

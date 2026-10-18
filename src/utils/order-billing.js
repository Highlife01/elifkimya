/**
 * Siparişten fatura hazırlarken KDV dağılımı yalnızca siparişte doğrulanabiliyorsa kullanılır.
 * Genel toplamdan "KDV dahil %20" gibi bir varsayımla matrah üretilmez.
 */

export const STANDARD_VAT_RATES = [0, 1, 10, 20];
const TOLERANCE = 0.05;
const money = (value) => Number(Number(value || 0).toFixed(2));

export function vatAmountFromGross(grossTotal, vatRate) {
  const gross = Math.max(Number(grossTotal) || 0, 0);
  const rate = Number(vatRate) || 0;
  const net = money(gross / (1 + rate / 100));
  return { netExclVat: net, vatTotal: money(gross - net) };
}

export function deriveOrderBilling(order = {}) {
  const currency = String(order.currency || 'TRY').toUpperCase();
  const grandTotal = money(order.grandTotal);
  const base = { currency, grandTotal, ready: false, reason: '', netExclVat: 0, vatAmount: 0, vatRate: null };

  if (!(grandTotal > 0)) return { ...base, reason: 'Sipariş tutarı girilmemiş.' };
  if (currency !== 'TRY') return { ...base, reason: `${currency} siparişi için fatura kuru ve KDV bilgisi faturada girilmelidir.` };

  const net = money(order.netExclVat);
  const vat = money(order.vatTotal ?? order.totalVat);
  if (!(net > 0)) return { ...base, reason: 'Siparişte KDV dağılımı kayıtlı değil; matrah ve KDV oranını faturada girin.' };
  if (vat < 0 || Math.abs(net + vat - grandTotal) > TOLERANCE) {
    return { ...base, reason: 'Siparişteki matrah ve KDV, genel toplamla uyuşmuyor; faturada kontrol edin.' };
  }

  const rate = (vat / net) * 100;
  const matched = STANDARD_VAT_RATES.find((standard) => Math.abs(standard - rate) <= TOLERANCE);
  if (matched === undefined) return { ...base, reason: 'Siparişteki KDV oranı standart bir orana denk gelmiyor; faturada girin.' };

  if (matched === 0) return { ...base, reason: 'Siparişte KDV %0 görünüyor; istisna/ihracat faturası için istisna kodunu faturada girin.' };

  return { ...base, ready: true, netExclVat: net, vatAmount: vat, vatRate: matched };
}

/**
 * Fatura hesaplama çekirdeği (saf fonksiyonlar). Sunucuya kayıt, canlı önizleme ve testler aynı kodu kullanır.
 * Kalem (lines) verilirse KDV kalem bazında hesaplanır; verilmezse eski tek tutarlı (toplu) fatura modeli korunur.
 */

export const MAX_INVOICE_LINES = 100;
export const WITHHOLDING_NUMERATORS = [0, 2, 3, 4, 5, 7, 9];

const money = (value) => Number(Number(value || 0).toFixed(2));
const finite = (value, fallback = 0) => (Number.isFinite(Number(value)) ? Number(value) : fallback);

export function parseWithholdingNumerator(input) {
  let numerator = finite(input?.withholdingNumerator, 0);
  const raw = String(input?.withholdingRate || '').trim();
  if (!numerator && raw.includes('/')) {
    const parsed = Number(raw.split('/')[0]);
    if (Number.isFinite(parsed) && parsed > 0) numerator = parsed;
  }
  return Math.min(Math.max(numerator, 0), 10);
}

export function normalizeInvoiceLines(lines) {
  if (!Array.isArray(lines)) return [];
  if (lines.length > MAX_INVOICE_LINES) throw new Error(`Bir faturada en fazla ${MAX_INVOICE_LINES} kalem olabilir.`);
  return lines.map((line, index) => {
    const description = String(line?.description ?? '').trim().slice(0, 300);
    const quantity = finite(line?.quantity, 0);
    const unitPrice = finite(line?.unitPrice, 0);
    const discountPercent = finite(line?.discountPercent, 0);
    const vatRate = finite(line?.vatRate, 20);
    if (!description) throw new Error(`${index + 1}. kalem için açıklama zorunludur.`);
    if (quantity <= 0) throw new Error(`${index + 1}. kalemde miktar sıfırdan büyük olmalıdır.`);
    if (unitPrice < 0) throw new Error(`${index + 1}. kalemde birim fiyat negatif olamaz.`);
    if (discountPercent < 0 || discountPercent > 100) throw new Error(`${index + 1}. kalemde iskonto %0–%100 arasında olmalıdır.`);
    if (vatRate < 0 || vatRate > 100) throw new Error(`${index + 1}. kalemde KDV oranı %0–%100 arasında olmalıdır.`);
    const gross = money(quantity * unitPrice);
    const discountAmount = money((gross * discountPercent) / 100);
    const net = money(gross - discountAmount);
    const vatAmount = money((net * vatRate) / 100);
    return {
      description,
      unit: String(line?.unit || 'Adet').trim().slice(0, 20),
      quantity,
      unitPrice,
      discountPercent,
      vatRate,
      gross,
      discountAmount,
      net,
      vatAmount
    };
  });
}

export function computeInvoiceTotals(input = {}) {
  const currency = String(input.currency || 'TRY').toUpperCase();
  const exchangeRate = currency === 'TRY' ? 1 : Math.max(finite(input.exchangeRate, 1), 0.0001);
  const lines = normalizeInvoiceLines(input.lines);

  let subtotal;
  let discountTotal;
  let netExclVat;
  let vatAmount;
  let vatRate;
  let vatMixed = false;

  if (lines.length > 0) {
    subtotal = money(lines.reduce((sum, l) => sum + l.gross, 0));
    discountTotal = money(lines.reduce((sum, l) => sum + l.discountAmount, 0));
    netExclVat = money(lines.reduce((sum, l) => sum + l.net, 0));
    vatAmount = money(lines.reduce((sum, l) => sum + l.vatAmount, 0));
    const rates = new Set(lines.map((l) => l.vatRate));
    vatMixed = rates.size > 1;
    vatRate = vatMixed ? (netExclVat > 0 ? money((vatAmount / netExclVat) * 100) : 0) : lines[0].vatRate;
  } else {
    subtotal = Math.max(finite(input.subtotal ?? input.subtotalExclVat, 0), 0);
    discountTotal = Math.max(finite(input.discountTotal, 0), 0);
    netExclVat = Math.max(subtotal - discountTotal, 0);
    vatRate = Math.max(finite(input.vatRate, 20), 0);
    vatAmount = money((netExclVat * vatRate) / 100);
  }

  const withholdingNumerator = parseWithholdingNumerator(input);
  const withholdingRate = withholdingNumerator > 0 ? `${withholdingNumerator}/10` : 'Yok';
  const withholdingAmount = withholdingNumerator > 0 ? money((vatAmount * withholdingNumerator) / 10) : 0;
  const payableVat = money(vatAmount - withholdingAmount);
  const grandTotal = money(netExclVat + payableVat);
  const grandTotalTry = money(grandTotal * exchangeRate);

  return {
    lines,
    currency,
    exchangeRate,
    subtotal,
    discountTotal,
    netExclVat,
    vatRate,
    vatMixed,
    vatAmount,
    withholdingRate,
    withholdingNumerator,
    withholdingAmount,
    payableVat,
    grandTotal,
    grandTotalTry
  };
}

export function derivePaymentStatus({ grandTotalTry, paidAmountTry, dueDate, now = Date.now(), fallback = 'Ödeme Bekliyor' }) {
  if (grandTotalTry > 0 && paidAmountTry >= grandTotalTry) return 'Ödendi';
  if (paidAmountTry > 0) return 'Kısmi Ödeme';
  if (dueDate && new Date(dueDate).getTime() < now) return 'Vadesi Geçti';
  return fallback;
}

import {
  INBOUND_CUSTOMER_FIELDS,
  INBOUND_INVOICE_FIELDS,
  OUTBOUND_LINE_FIELDS,
  OUTBOUND_SOURCE_FIELDS,
  applyInboundMap,
  applyOutboundMap,
  setPath,
  toNumber
} from './mapping.js';
import { derivePaymentStatus } from './invoice-calc.js';

/** Saf dönüşüm fonksiyonları (veritabanına dokunmaz, test edilebilir). */

const money = (value) => Number(Number(value).toFixed(2));
const DATE_RE = /^\d{4}-\d{2}-\d{2}/;
const LOCAL_TYPES = new Set(['SATIS', 'ALIS', 'IADE']);

export function buildOutboundPayload(invoice, invoiceId, config) {
  const source = { id: invoiceId };
  for (const field of OUTBOUND_SOURCE_FIELDS) {
    if (field !== 'id' && invoice[field] !== undefined) source[field] = invoice[field];
  }
  const payload = applyOutboundMap(config.outboundInvoiceMap, source);
  if (config.outboundLinesPath && Array.isArray(invoice.lines) && invoice.lines.length > 0) {
    const lines = invoice.lines.map((line) => applyOutboundMap(config.outboundLineMap, line, OUTBOUND_LINE_FIELDS));
    setPath(payload, config.outboundLinesPath, lines);
  }
  if (Object.keys(payload).length === 0) throw new Error('Giden fatura eşlemesi boş. Önce alan eşlemesini tanımlayın.');
  return payload;
}

export function externalInvoiceToLocal(external, config, { now = Date.now() } = {}) {
  const mapped = applyInboundMap(config.inboundInvoiceMap, external, INBOUND_INVOICE_FIELDS);
  const externalId = mapped.externalId !== undefined ? String(mapped.externalId).trim() : '';
  if (!externalId) throw new Error('Karşı sistem kaydında kimlik alanı yok.');

  const rawType = String(mapped.invoiceType ?? '').trim();
  const invoiceType = config.invoiceTypeValues[rawType] || (LOCAL_TYPES.has(rawType.toUpperCase()) ? rawType.toUpperCase() : '');
  if (!invoiceType) throw new Error(`${externalId}: fatura türü eşlenemedi ("${rawType.slice(0, 30)}").`);

  const invoiceNo = String(mapped.invoiceNo ?? '').trim();
  const partyName = String(mapped.partyName ?? '').trim();
  if (!invoiceNo) throw new Error(`${externalId}: fatura numarası yok.`);
  if (partyName.length < 2) throw new Error(`${externalId}: cari ünvanı yok.`);

  const currency = String(mapped.currency || 'TRY').toUpperCase().slice(0, 10);
  const rate = currency === 'TRY' ? 1 : toNumber(mapped.exchangeRate);
  if (!(rate > 0)) throw new Error(`${externalId}: ${currency} faturası için kur bilgisi yok.`);

  const grandTotal = toNumber(mapped.grandTotal);
  if (!Number.isFinite(grandTotal) || grandTotal < 0) throw new Error(`${externalId}: genel toplam okunamadı.`);
  const vatAmount = Number.isFinite(toNumber(mapped.vatAmount)) ? money(toNumber(mapped.vatAmount)) : 0;
  const netGiven = toNumber(mapped.netExclVat);
  const netExclVat = Number.isFinite(netGiven) ? money(netGiven) : money(Math.max(grandTotal - vatAmount, 0));
  const discountGiven = toNumber(mapped.discountTotal);
  const discountTotal = Number.isFinite(discountGiven) ? money(Math.max(discountGiven, 0)) : 0;
  const subtotalGiven = toNumber(mapped.subtotal);
  const subtotal = Number.isFinite(subtotalGiven) ? money(subtotalGiven) : money(netExclVat + discountTotal);

  const paidGiven = toNumber(mapped.paidAmount);
  const hasPaid = Number.isFinite(paidGiven) && paidGiven >= 0;
  const grandTotalTry = money(grandTotal * rate);
  const paidAmountTry = hasPaid ? money(paidGiven * rate) : 0;
  const dueDate = DATE_RE.test(String(mapped.dueDate || '')) ? String(mapped.dueDate).slice(0, 10) : '';
  const issueDate = DATE_RE.test(String(mapped.issueDate || '')) ? String(mapped.issueDate).slice(0, 10) : '';

  const payment = {
    paidAmount: hasPaid ? money(paidGiven) : 0,
    paidAmountTry,
    remainingAmountTry: Math.max(money(grandTotalTry - paidAmountTry), 0),
    paymentStatus: derivePaymentStatus({ grandTotalTry, paidAmountTry, dueDate, now })
  };

  return {
    externalId,
    hasPaid,
    payment,
    // Karşı sistemden gelen tutarlar olduğu gibi alınır; uyuşmazlık varsa inceleme bayrağı konur.
    needsReview: Math.abs(netExclVat + vatAmount - grandTotal) > 0.05,
    invoice: {
      invoiceNo: invoiceNo.slice(0, 95),
      invoiceType,
      eDocumentType: 'MUHASEBE PROGRAMI',
      docCategory: 'MUHASEBE PROGRAMI',
      partyType: invoiceType === 'ALIS' ? 'SUPPLIER' : 'CUSTOMER',
      partyName: partyName.slice(0, 240),
      companyName: partyName.slice(0, 240),
      taxNumber: String(mapped.taxNumber ?? '').slice(0, 45),
      taxOffice: String(mapped.taxOffice ?? '').slice(0, 140),
      contactEmail: String(mapped.contactEmail ?? '').slice(0, 160),
      issueDate,
      dueDate,
      currency,
      exchangeRate: rate,
      subtotal,
      subtotalExclVat: subtotal,
      discountTotal,
      netExclVat,
      netMatrah: netExclVat,
      vatRate: netExclVat > 0 ? money((vatAmount / netExclVat) * 100) : 0,
      vatAmount,
      withholdingRate: 'Yok',
      withholdingNumerator: 0,
      withholdingAmount: 0,
      payableVat: vatAmount,
      grandTotal: money(grandTotal),
      grandTotalTry,
      description: String(mapped.description ?? '').slice(0, 1500),
      ...payment
    }
  };
}

export function externalCustomerToLocal(external, config) {
  const mapped = applyInboundMap(config.inboundCustomerMap, external, INBOUND_CUSTOMER_FIELDS);
  const externalId = mapped.externalId !== undefined ? String(mapped.externalId).trim() : '';
  if (!externalId) throw new Error('Karşı sistem cari kaydında kimlik alanı yok.');
  const companyName = String(mapped.companyName ?? '').trim();
  if (companyName.length < 2) throw new Error(`${externalId}: cari ünvanı yok.`);
  const text = (value, max) => String(value ?? '').trim().slice(0, max);
  return {
    externalId,
    customer: {
      companyName: companyName.slice(0, 240),
      contactName: text(mapped.contactName, 150),
      email: text(mapped.email, 150),
      phone: text(mapped.phone, 50),
      city: text(mapped.city, 100),
      taxOffice: text(mapped.taxOffice, 140),
      taxNumber: text(mapped.taxNumber, 45),
      address: text(mapped.address, 500)
    }
  };
}

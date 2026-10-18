/** Eşleme (mapping) yardımcıları: yalnızca açıkça tanımlanmış alanlar dış sisteme gider / içeri alınır. */

const BLOCKED_SEGMENTS = new Set(['__proto__', 'constructor', 'prototype']);
const PATH_RE = /^[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*$/;
// Müşteriye ve dış sistemlere asla çıkmaması gereken iç maliyet alanları.
const INTERNAL_FIELD_RE = /(unitcost|totalcost|grossprofit|profitmargin|internaladminnotes)/i;

export const MAX_MAP_ENTRIES = 60;
export const OUTBOUND_SOURCE_FIELDS = new Set([
  'id', 'invoiceNo', 'invoiceType', 'docCategory', 'partyName', 'taxOffice', 'taxNumber', 'contactEmail',
  'issueDate', 'dueDate', 'currency', 'exchangeRate', 'subtotal', 'discountTotal', 'netExclVat', 'vatRate',
  'vatAmount', 'withholdingRate', 'withholdingAmount', 'payableVat', 'grandTotal', 'grandTotalTry',
  'paidAmount', 'paymentStatus', 'description', 'orderNo', 'lines'
]);
export const OUTBOUND_LINE_FIELDS = new Set([
  'description', 'unit', 'quantity', 'unitPrice', 'discountPercent', 'vatRate', 'gross', 'discountAmount', 'net', 'vatAmount'
]);
export const INBOUND_INVOICE_FIELDS = new Set([
  'externalId', 'invoiceNo', 'invoiceType', 'partyName', 'taxNumber', 'taxOffice', 'contactEmail', 'issueDate',
  'dueDate', 'currency', 'exchangeRate', 'subtotal', 'discountTotal', 'netExclVat', 'vatAmount', 'grandTotal',
  'paidAmount', 'description'
]);
export const INBOUND_CUSTOMER_FIELDS = new Set([
  'externalId', 'companyName', 'contactName', 'email', 'phone', 'city', 'taxOffice', 'taxNumber', 'address'
]);

export function assertSafePath(path, label = 'Alan yolu') {
  const value = String(path ?? '');
  if (!PATH_RE.test(value) || value.length > 80) throw new Error(`${label} geçersiz: "${value.slice(0, 40)}"`);
  if (value.split('.').some((segment) => BLOCKED_SEGMENTS.has(segment))) throw new Error(`${label} geçersiz.`);
  return value;
}

export function getPath(source, path) {
  if (path === '' || path === undefined || path === null) return source;
  let current = source;
  for (const segment of String(path).split('.')) {
    if (current === null || current === undefined || typeof current !== 'object') return undefined;
    if (BLOCKED_SEGMENTS.has(segment) || !Object.hasOwn(current, segment)) return undefined;
    current = current[segment];
  }
  return current;
}

export function setPath(target, path, value) {
  const segments = path.split('.');
  let current = target;
  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      current[segment] = value;
      return;
    }
    if (!Object.hasOwn(current, segment) || typeof current[segment] !== 'object' || current[segment] === null) {
      current[segment] = {};
    }
    current = current[segment];
  });
}

/** Ayar doğrulaması: kaydedilirken ve kullanılırken çalışır. */
export function validateOutboundMap(map, allowedRoots = OUTBOUND_SOURCE_FIELDS) {
  const entries = Object.entries(map || {});
  if (entries.length > MAX_MAP_ENTRIES) throw new Error('Giden eşleme en fazla 60 alan içerebilir.');
  for (const [externalPath, spec] of entries) {
    assertSafePath(externalPath, 'Karşı sistem alanı');
    if (typeof spec !== 'string' || spec.length === 0 || spec.length > 120) throw new Error('Giden eşleme değeri geçersiz.');
    if (spec.startsWith('=')) continue; // sabit değer
    if (INTERNAL_FIELD_RE.test(spec)) throw new Error('İç maliyet alanları dış sisteme gönderilemez.');
    const root = spec.split('.')[0];
    if (!allowedRoots.has(root)) throw new Error(`"${root}" alanı giden eşlemede kullanılamaz.`);
  }
  return Object.fromEntries(entries);
}

export function validateInboundMap(map, allowedFields) {
  const entries = Object.entries(map || {});
  if (entries.length > MAX_MAP_ENTRIES) throw new Error('Gelen eşleme en fazla 60 alan içerebilir.');
  for (const [localField, externalPath] of entries) {
    if (!allowedFields.has(localField)) throw new Error(`"${localField}" yerel alanı içeri alınamaz.`);
    assertSafePath(externalPath, 'Karşı sistem alanı');
  }
  return Object.fromEntries(entries);
}

export function applyOutboundMap(map, source, allowedRoots = OUTBOUND_SOURCE_FIELDS) {
  const payload = {};
  for (const [externalPath, spec] of Object.entries(validateOutboundMap(map, allowedRoots))) {
    const value = spec.startsWith('=') ? spec.slice(1) : getPath(source, spec);
    if (value === undefined || value === null) continue;
    setPath(payload, externalPath, value);
  }
  return payload;
}

export function applyInboundMap(map, external, allowedFields) {
  const record = {};
  for (const [localField, externalPath] of Object.entries(validateInboundMap(map, allowedFields))) {
    const value = getPath(external, externalPath);
    if (value === undefined || value === null || value === '') continue;
    record[localField] = value;
  }
  return record;
}

export function toNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : NaN;
  if (typeof value !== 'string') return NaN;
  const trimmed = value.trim();
  if (!trimmed) return NaN;
  // "1.234,56" (TR) ve "1234.56" biçimlerini ayırt et
  const normalized = trimmed.includes(',') ? trimmed.replace(/\./g, '').replace(',', '.') : trimmed;
  return Number(normalized);
}

import { assertSafeBaseUrl } from './net-guard.js';
import {
  INBOUND_CUSTOMER_FIELDS,
  INBOUND_INVOICE_FIELDS,
  OUTBOUND_LINE_FIELDS,
  assertSafePath,
  validateInboundMap,
  validateOutboundMap
} from './mapping.js';

export const CONFIG_DOC_PATH = 'siteSettings/accountingIntegration';
export const AUTH_TYPES = ['bearer', 'header', 'basic'];
export const ENDPOINT_KEYS = ['test', 'invoicePush', 'invoicePull', 'customerPull'];
const METHODS = new Set(['GET', 'POST', 'PUT', 'PATCH']);
const PATH_RE = /^\/[A-Za-z0-9_\-./{}]*$/;
const HEADER_RE = /^[A-Za-z0-9-]{1,40}$/;
const BLOCKED_HEADERS = new Set(['host', 'content-length', 'content-type', 'connection', 'transfer-encoding', 'cookie']);
const LOCAL_INVOICE_TYPES = new Set(['SATIS', 'ALIS', 'IADE']);

function normalizeEndpoint(key, raw) {
  if (!raw || typeof raw !== 'object' || !raw.path) return null;
  const method = String(raw.method || (key === 'invoicePush' ? 'POST' : 'GET')).toUpperCase();
  if (!METHODS.has(method)) throw new Error(`${key}: desteklenmeyen HTTP yöntemi.`);
  const path = String(raw.path).trim();
  if (!PATH_RE.test(path) || path.includes('..') || path.includes('//')) throw new Error(`${key}: yol geçersiz.`);
  const endpoint = { method, path };
  for (const field of ['listPath', 'sinceParam', 'pageParam', 'pageSizeParam', 'externalIdPath', 'updatePath']) {
    const value = raw[field];
    if (value === undefined || value === null || value === '') continue;
    if (field.endsWith('Param')) {
      if (!/^[A-Za-z0-9_.-]{1,40}$/.test(String(value))) throw new Error(`${key}.${field} geçersiz.`);
      endpoint[field] = String(value);
    } else if (field === 'updatePath') {
      const updatePath = String(value).trim();
      if (!PATH_RE.test(updatePath) || updatePath.includes('..') || updatePath.includes('//')) throw new Error(`${key}.updatePath geçersiz.`);
      endpoint.updatePath = updatePath;
    } else {
      endpoint[field] = assertSafePath(value, `${key}.${field}`);
    }
  }
  const pageSize = Number(raw.pageSize || 0);
  if (pageSize) endpoint.pageSize = Math.min(Math.max(Math.trunc(pageSize), 1), 500);
  return endpoint;
}

export function normalizeConfig(raw, options = {}) {
  const source = raw && typeof raw === 'object' ? raw : {};
  const enabled = source.enabled === true;
  const baseUrl = assertSafeBaseUrl(source.baseUrl, options);
  const authType = String(source.authType || 'bearer');
  if (!AUTH_TYPES.includes(authType)) throw new Error('Kimlik doğrulama türü geçersiz.');
  const authHeaderName = String(source.authHeaderName || 'X-Api-Key');
  if (authType === 'header' && (!HEADER_RE.test(authHeaderName) || BLOCKED_HEADERS.has(authHeaderName.toLowerCase()))) {
    throw new Error('Kimlik doğrulama başlık adı geçersiz.');
  }

  const endpoints = {};
  for (const key of ENDPOINT_KEYS) {
    const endpoint = normalizeEndpoint(key, source.endpoints?.[key]);
    if (endpoint) endpoints[key] = endpoint;
  }

  const invoiceTypeValues = {};
  for (const [externalValue, localValue] of Object.entries(source.invoiceTypeValues || {})) {
    if (!LOCAL_INVOICE_TYPES.has(localValue)) throw new Error('Fatura türü eşlemesi yalnızca SATIS, ALIS veya IADE olabilir.');
    invoiceTypeValues[String(externalValue).slice(0, 60)] = localValue;
  }

  return {
    enabled,
    providerLabel: String(source.providerLabel || '').trim().slice(0, 80),
    baseUrl: `${baseUrl.origin}${baseUrl.pathname.replace(/\/+$/, '')}`,
    authType,
    authHeaderName,
    endpoints,
    outboundInvoiceMap: validateOutboundMap(source.outboundInvoiceMap),
    outboundLinesPath: source.outboundLinesPath ? assertSafePath(source.outboundLinesPath, 'Kalem yolu') : '',
    outboundLineMap: validateOutboundMap(source.outboundLineMap, OUTBOUND_LINE_FIELDS),
    inboundInvoiceMap: validateInboundMap(source.inboundInvoiceMap, INBOUND_INVOICE_FIELDS),
    inboundCustomerMap: validateInboundMap(source.inboundCustomerMap, INBOUND_CUSTOMER_FIELDS),
    invoiceTypeValues,
    autoSync: source.autoSync === true
  };
}

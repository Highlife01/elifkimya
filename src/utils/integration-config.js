/** Entegrasyon ayar formu ↔ ayar belgesi dönüşümü (saf fonksiyonlar). Kesin doğrulama sunucuda yapılır. */

export const ENDPOINT_DEFS = [
  { key: 'test', label: 'Bağlantı testi', defaultMethod: 'GET', extras: [] },
  { key: 'invoicePush', label: 'Fatura gönder (panel → muhasebe)', defaultMethod: 'POST', extras: ['externalIdPath', 'updatePath'] },
  { key: 'invoicePull', label: 'Fatura çek (muhasebe → panel)', defaultMethod: 'GET', extras: ['listPath', 'sinceParam', 'pageParam', 'pageSizeParam', 'pageSize'] },
  { key: 'customerPull', label: 'Cari çek (muhasebe → panel)', defaultMethod: 'GET', extras: ['listPath', 'sinceParam', 'pageParam', 'pageSizeParam', 'pageSize'] }
];

export const EXTRA_LABELS = {
  externalIdPath: 'Yanıttaki kayıt kimliği yolu (örn. data.id)',
  updatePath: 'Güncelleme yolu (örn. /invoices/{id})',
  listPath: 'Yanıttaki liste yolu (örn. data.items)',
  sinceParam: 'Son değişiklik parametresi',
  pageParam: 'Sayfa parametresi',
  pageSizeParam: 'Sayfa boyutu parametresi',
  pageSize: 'Sayfa boyutu'
};

export const MAP_FIELDS = [
  { name: 'outboundInvoiceMap', label: 'Giden fatura eşlemesi', hint: '{"karşı.sistem.alanı": "yerelAlan"}  Sabit değer için "=değer".' },
  { name: 'outboundLineMap', label: 'Giden kalem eşlemesi', hint: '{"name": "description", "qty": "quantity", "price": "unitPrice"}' },
  { name: 'inboundInvoiceMap', label: 'Gelen fatura eşlemesi', hint: '{"externalId": "id", "invoiceNo": "number", "invoiceType": "type", "partyName": "customer.name", "grandTotal": "total"}' },
  { name: 'inboundCustomerMap', label: 'Gelen cari eşlemesi', hint: '{"externalId": "id", "companyName": "title", "taxNumber": "vkn"}' },
  { name: 'invoiceTypeValues', label: 'Fatura türü değer eşlemesi', hint: '{"sales": "SATIS", "purchase": "ALIS"}' }
];

export const INTEGRATION_PRESETS = {
  gib_integrator: {
    label: 'GİB Özel Entegratör REST (Uyumsoft / QNB eFinans / EDM / İzibiz)',
    config: {
      enabled: true,
      autoSync: false,
      providerLabel: 'GİB Özel Entegratör (E-Fatura / E-Arşiv)',
      baseUrl: 'https://api.entegrator-ornek.com.tr/v1',
      authType: 'bearer',
      authHeaderName: 'X-Api-Key',
      outboundLinesPath: 'invoiceLines',
      endpoints: {
        test: { method: 'GET', path: '/status' },
        invoicePush: { method: 'POST', path: '/einvoices', externalIdPath: 'data.ettn', updatePath: '/einvoices/{id}' },
        invoicePull: { method: 'GET', path: '/einvoices', listPath: 'data.items', sinceParam: 'updatedAfter', pageParam: 'page', pageSizeParam: 'pageSize', pageSize: 100 },
        customerPull: { method: 'GET', path: '/taxpayers', listPath: 'data.items', pageParam: 'page', pageSizeParam: 'pageSize', pageSize: 100 }
      },
      outboundInvoiceMap: {
        'documentNo': 'invoiceNo',
        'profileId': 'docCategory',
        'invoiceType': 'invoiceType',
        'issueDate': 'issueDate',
        'dueDate': 'dueDate',
        'currencyCode': 'currency',
        'exchangeRate': 'exchangeRate',
        'customer.title': 'partyName',
        'customer.taxNumber': 'taxNumber',
        'customer.taxOffice': 'taxOffice',
        'customer.email': 'contactEmail',
        'totals.lineExtensionAmount': 'subtotal',
        'totals.allowanceTotalAmount': 'discountTotal',
        'totals.taxExclusiveAmount': 'netExclVat',
        'totals.taxAmount': 'vatAmount',
        'totals.withholdingAmount': 'withholdingAmount',
        'totals.payableAmount': 'grandTotal',
        'note': 'description'
      },
      outboundLineMap: {
        'itemName': 'description',
        'unitCode': 'unit',
        'quantity': 'quantity',
        'unitPrice': 'unitPrice',
        'discountRate': 'discountPercent',
        'vatRate': 'vatRate',
        'lineNet': 'net',
        'vatAmount': 'vatAmount'
      },
      inboundInvoiceMap: {
        'externalId': 'ettn',
        'invoiceNo': 'documentNo',
        'invoiceType': 'invoiceType',
        'partyName': 'customer.title',
        'taxNumber': 'customer.taxNumber',
        'taxOffice': 'customer.taxOffice',
        'contactEmail': 'customer.email',
        'issueDate': 'issueDate',
        'dueDate': 'dueDate',
        'currency': 'currencyCode',
        'exchangeRate': 'exchangeRate',
        'subtotal': 'totals.lineExtensionAmount',
        'discountTotal': 'totals.allowanceTotalAmount',
        'netExclVat': 'totals.taxExclusiveAmount',
        'vatAmount': 'totals.taxAmount',
        'grandTotal': 'totals.payableAmount',
        'paidAmount': 'totals.paidAmount',
        'description': 'note'
      },
      inboundCustomerMap: {
        'externalId': 'id',
        'companyName': 'title',
        'taxNumber': 'taxNumber',
        'taxOffice': 'taxOffice',
        'email': 'email',
        'phone': 'phone',
        'city': 'city',
        'address': 'address'
      },
      invoiceTypeValues: {
        'SATIS': 'SATIS',
        'SALES': 'SATIS',
        'ALIS': 'ALIS',
        'PURCHASE': 'ALIS',
        'IADE': 'IADE',
        'RETURN': 'IADE'
      }
    }
  },
  cloud_accounting: {
    label: 'Bulut Ön Muhasebe (Paraşüt / KolayBi / BizimHesap)',
    config: {
      enabled: true,
      autoSync: true,
      providerLabel: 'Bulut Ön Muhasebe & E-Fatura',
      baseUrl: 'https://api.bulutmuhasebe-ornek.com/v4',
      authType: 'bearer',
      authHeaderName: 'X-Api-Key',
      outboundLinesPath: 'details',
      endpoints: {
        test: { method: 'GET', path: '/me' },
        invoicePush: { method: 'POST', path: '/sales_invoices', externalIdPath: 'data.id', updatePath: '/sales_invoices/{id}' },
        invoicePull: { method: 'GET', path: '/sales_invoices', listPath: 'data', sinceParam: 'updated_since', pageParam: 'page', pageSizeParam: 'per_page', pageSize: 50 },
        customerPull: { method: 'GET', path: '/contacts', listPath: 'data', pageParam: 'page', pageSizeParam: 'per_page', pageSize: 50 }
      },
      outboundInvoiceMap: {
        'invoice_no': 'invoiceNo',
        'issue_date': 'issueDate',
        'due_date': 'dueDate',
        'currency': 'currency',
        'exchange_rate': 'exchangeRate',
        'contact.name': 'partyName',
        'contact.tax_number': 'taxNumber',
        'contact.tax_office': 'taxOffice',
        'contact.email': 'contactEmail',
        'net_total': 'netExclVat',
        'total_vat': 'vatAmount',
        'gross_total': 'grandTotal',
        'description': 'description'
      },
      outboundLineMap: {
        'description': 'description',
        'unit': 'unit',
        'quantity': 'quantity',
        'unit_price': 'unitPrice',
        'discount_value': 'discountPercent',
        'vat_rate': 'vatRate'
      },
      inboundInvoiceMap: {
        'externalId': 'id',
        'invoiceNo': 'invoice_no',
        'invoiceType': 'item_type',
        'partyName': 'contact.name',
        'taxNumber': 'contact.tax_number',
        'taxOffice': 'contact.tax_office',
        'issueDate': 'issue_date',
        'dueDate': 'due_date',
        'currency': 'currency',
        'exchangeRate': 'exchange_rate',
        'netExclVat': 'net_total',
        'vatAmount': 'total_vat',
        'grandTotal': 'gross_total',
        'paidAmount': 'paid_total',
        'description': 'description'
      },
      inboundCustomerMap: {
        'externalId': 'id',
        'companyName': 'name',
        'taxNumber': 'tax_number',
        'taxOffice': 'tax_office',
        'email': 'email',
        'phone': 'phone',
        'city': 'city',
        'address': 'address'
      },
      invoiceTypeValues: {
        'invoice': 'SATIS',
        'sales_invoice': 'SATIS',
        'purchase_bill': 'ALIS',
        'refund': 'IADE'
      }
    }
  },
  erp_bridge: {
    label: 'Kurumsal ERP Köprüsü (Logo Tiger-Go / Mikro / Netsis / Dia)',
    config: {
      enabled: true,
      autoSync: true,
      providerLabel: 'Kurumsal ERP REST Servisi',
      baseUrl: 'https://erp.elifcevrekimya.com.tr/api/v1',
      authType: 'header',
      authHeaderName: 'X-Api-Key',
      outboundLinesPath: 'TRANSACTIONS.items',
      endpoints: {
        test: { method: 'GET', path: '/health' },
        invoicePush: { method: 'POST', path: '/invoices', externalIdPath: 'INTERNAL_REFERENCE', updatePath: '/invoices/{id}' },
        invoicePull: { method: 'GET', path: '/invoices', listPath: 'items', sinceParam: 'modifiedAfter', pageParam: 'offset', pageSizeParam: 'limit', pageSize: 100 },
        customerPull: { method: 'GET', path: '/arpCards', listPath: 'items', pageParam: 'offset', pageSizeParam: 'limit', pageSize: 100 }
      },
      outboundInvoiceMap: {
        'NUMBER': 'invoiceNo',
        'DOC_TYPE': 'invoiceType',
        'EBELGE_TYPE': 'docCategory',
        'DATE': 'issueDate',
        'DUE_DATE': 'dueDate',
        'CURR_INVOICE': 'currency',
        'TC_XRATE': 'exchangeRate',
        'ARP_TITLE': 'partyName',
        'TAX_ID': 'taxNumber',
        'TAX_OFFICE': 'taxOffice',
        'TOTAL_NET': 'netExclVat',
        'TOTAL_VAT': 'vatAmount',
        'TOTAL_GROSS': 'grandTotal',
        'NOTES1': 'description'
      },
      outboundLineMap: {
        'DESCRIPTION': 'description',
        'UNIT_CODE': 'unit',
        'QUANTITY': 'quantity',
        'PRICE': 'unitPrice',
        'DISCOUNT_RATE': 'discountPercent',
        'VAT_RATE': 'vatRate',
        'TOTAL_NET': 'net',
        'VAT_AMOUNT': 'vatAmount'
      },
      inboundInvoiceMap: {
        'externalId': 'INTERNAL_REFERENCE',
        'invoiceNo': 'NUMBER',
        'invoiceType': 'DOC_TYPE',
        'partyName': 'ARP_TITLE',
        'taxNumber': 'TAX_ID',
        'taxOffice': 'TAX_OFFICE',
        'issueDate': 'DATE',
        'dueDate': 'DUE_DATE',
        'currency': 'CURR_INVOICE',
        'exchangeRate': 'TC_XRATE',
        'netExclVat': 'TOTAL_NET',
        'vatAmount': 'TOTAL_VAT',
        'grandTotal': 'TOTAL_GROSS',
        'paidAmount': 'PAID_TOTAL',
        'description': 'NOTES1'
      },
      inboundCustomerMap: {
        'externalId': 'INTERNAL_REFERENCE',
        'companyName': 'TITLE',
        'taxNumber': 'TAX_ID',
        'taxOffice': 'TAX_OFFICE',
        'email': 'E_MAIL',
        'phone': 'TELEPHONE1',
        'city': 'CITY',
        'address': 'ADDRESS1'
      },
      invoiceTypeValues: {
        '8': 'SATIS',
        'SATIS': 'SATIS',
        '1': 'ALIS',
        'ALIS': 'ALIS',
        '3': 'IADE',
        'IADE': 'IADE'
      }
    }
  }
};

export function parseJsonObject(text, label) {
  const raw = String(text ?? '').trim();
  if (!raw) return {};
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`${label}: geçerli bir JSON nesnesi olmalıdır.`);
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error(`${label}: JSON nesnesi olmalıdır ({ ... }).`);
  return parsed;
}

export function configFromForm(form) {
  const baseUrl = String(form.baseUrl || '').trim();
  if (!baseUrl) throw new Error('API adresi zorunludur.');
  if (!/^https:\/\//i.test(baseUrl)) throw new Error('API adresi https:// ile başlamalıdır.');

  const endpoints = {};
  for (const def of ENDPOINT_DEFS) {
    const path = String(form[`ep_${def.key}_path`] || '').trim();
    if (!path) continue;
    const endpoint = { method: String(form[`ep_${def.key}_method`] || def.defaultMethod).toUpperCase(), path };
    for (const extra of def.extras) {
      const value = String(form[`ep_${def.key}_${extra}`] || '').trim();
      if (!value) continue;
      endpoint[extra] = extra === 'pageSize' ? Number(value) : value;
      if (extra === 'pageSize' && !(endpoint[extra] > 0)) throw new Error(`${def.label}: sayfa boyutu pozitif sayı olmalıdır.`);
    }
    endpoints[def.key] = endpoint;
  }

  const config = {
    enabled: form.enabled === true || form.enabled === 'on',
    autoSync: form.autoSync === true || form.autoSync === 'on',
    providerLabel: String(form.providerLabel || '').trim().slice(0, 80),
    baseUrl,
    authType: String(form.authType || 'bearer'),
    authHeaderName: String(form.authHeaderName || 'X-Api-Key').trim(),
    endpoints,
    outboundLinesPath: String(form.outboundLinesPath || '').trim()
  };
  for (const field of MAP_FIELDS) config[field.name] = parseJsonObject(form[field.name], field.label);
  return config;
}

export function configToFormValues(config) {
  const source = config || {};
  const values = {
    enabled: source.enabled === true,
    autoSync: source.autoSync === true,
    providerLabel: source.providerLabel || '',
    baseUrl: source.baseUrl || '',
    authType: source.authType || 'bearer',
    authHeaderName: source.authHeaderName || 'X-Api-Key',
    outboundLinesPath: source.outboundLinesPath || ''
  };
  for (const def of ENDPOINT_DEFS) {
    const endpoint = source.endpoints?.[def.key] || {};
    values[`ep_${def.key}_method`] = endpoint.method || def.defaultMethod;
    values[`ep_${def.key}_path`] = endpoint.path || '';
    for (const extra of def.extras) values[`ep_${def.key}_${extra}`] = endpoint[extra] ?? '';
  }
  for (const field of MAP_FIELDS) {
    const value = source[field.name];
    values[field.name] = value && Object.keys(value).length ? JSON.stringify(value, null, 2) : '';
  }
  return values;
}

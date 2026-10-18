import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { applyInboundMap, applyOutboundMap, assertSafePath, toNumber, validateOutboundMap, INBOUND_INVOICE_FIELDS } from '../lib/mapping.js';
import { assertSafeBaseUrl, isPrivateAddress } from '../lib/net-guard.js';
import { normalizeConfig } from '../lib/config.js';
import { createAdapter, redactSecrets } from '../lib/adapter.js';
import { buildOutboundPayload, externalCustomerToLocal, externalInvoiceToLocal } from '../lib/transform.js';

const baseConfig = {
  enabled: true,
  baseUrl: 'https://api.muhasebe.example/v1/',
  authType: 'bearer',
  endpoints: {
    test: { path: '/ping' },
    invoicePush: { method: 'POST', path: '/invoices', externalIdPath: 'data.id', updatePath: '/invoices/{id}' },
    invoicePull: { path: '/invoices', listPath: 'data.items', sinceParam: 'updated_since', pageParam: 'page', pageSizeParam: 'limit', pageSize: 2 },
    customerPull: { path: '/customers', listPath: 'data' }
  },
  outboundInvoiceMap: { number: 'invoiceNo', 'customer.name': 'partyName', 'amounts.total': 'grandTotal', currency: 'currency', source: '=elifkimya' },
  outboundLinesPath: 'items',
  outboundLineMap: { name: 'description', qty: 'quantity', price: 'unitPrice' },
  inboundInvoiceMap: { externalId: 'id', invoiceNo: 'number', invoiceType: 'type', partyName: 'customer.name', grandTotal: 'total', vatAmount: 'vat', paidAmount: 'paid', currency: 'currency', dueDate: 'due' },
  inboundCustomerMap: { externalId: 'id', companyName: 'title', taxNumber: 'vkn' },
  invoiceTypeValues: { sales: 'SATIS', purchase: 'ALIS' }
};

test('yol doğrulama prototype kirliliğini ve geçersiz yolları reddeder', () => {
  assert.throws(() => assertSafePath('__proto__.x'));
  assert.throws(() => assertSafePath('a b'));
  assert.throws(() => assertSafePath('a[0]'));
  assert.equal(assertSafePath('data.items'), 'data.items');
});

test('giden eşleme iç maliyet ve bilinmeyen kaynak alanlarını reddeder', () => {
  assert.throws(() => validateOutboundMap({ cost: 'unitCost' }), /maliyet/);
  assert.throws(() => validateOutboundMap({ x: 'internalAdminNotes' }), /maliyet/);
  assert.throws(() => validateOutboundMap({ x: 'secretField' }), /kullanılamaz/);
  assert.doesNotThrow(() => validateOutboundMap({ x: 'invoiceNo', y: '=sabit' }));
});

test('giden eşleme yalnızca tanımlı alanları gönderir', () => {
  const payload = applyOutboundMap({ 'a.b': 'invoiceNo', c: '=X' }, { invoiceNo: 'F-1', unitCost: 99, grossProfit: 5 });
  assert.deepEqual(payload, { a: { b: 'F-1' }, c: 'X' });
});

test('gelen eşleme izinli alanlarla sınırlıdır', () => {
  assert.throws(() => applyInboundMap({ paymentToken: 'x' }, {}, INBOUND_INVOICE_FIELDS), /içeri alınamaz/);
  assert.deepEqual(applyInboundMap({ invoiceNo: 'n.no' }, { n: { no: 'A1' } }, INBOUND_INVOICE_FIELDS), { invoiceNo: 'A1' });
});

test('sayı çözümleme TR ve US biçimlerini ayırt eder', () => {
  assert.equal(toNumber('1.234,56'), 1234.56);
  assert.equal(toNumber('1234.56'), 1234.56);
  assert.equal(toNumber(12), 12);
  assert.ok(Number.isNaN(toNumber('')));
  assert.ok(Number.isNaN(toNumber('abc')));
});

test('SSRF koruması özel adresleri ve güvensiz URL biçimlerini reddeder', () => {
  for (const ip of ['127.0.0.1', '10.1.2.3', '172.16.0.1', '192.168.1.1', '169.254.169.254', '::1', 'fd00::1', '::ffff:10.0.0.1', '100.64.0.1']) {
    assert.equal(isPrivateAddress(ip), true, ip);
  }
  assert.equal(isPrivateAddress('8.8.8.8'), false);
  for (const url of ['http://api.example.com', 'https://localhost/x', 'https://127.0.0.1', 'https://user:pw@api.example.com', 'https://api.example.com/?a=1', 'https://metadata.internal', 'ftp://x']) {
    assert.throws(() => assertSafeBaseUrl(url), undefined, url);
  }
  assert.doesNotThrow(() => assertSafeBaseUrl('https://api.example.com/v1'));
});

test('ayar normalizasyonu: geçerli ayarı temizler, hatalıyı reddeder', () => {
  const config = normalizeConfig(baseConfig);
  assert.equal(config.baseUrl, 'https://api.muhasebe.example/v1');
  assert.equal(config.endpoints.invoicePull.pageSize, 2);
  assert.throws(() => normalizeConfig({ ...baseConfig, authType: 'none' }), /türü/);
  assert.throws(() => normalizeConfig({ ...baseConfig, endpoints: { test: { path: '/../etc' } } }), /yol/);
  assert.throws(() => normalizeConfig({ ...baseConfig, authType: 'header', authHeaderName: 'Host' }), /başlık/);
  assert.throws(() => normalizeConfig({ ...baseConfig, invoiceTypeValues: { x: 'HACKED' } }), /SATIS/);
  assert.throws(() => normalizeConfig({ ...baseConfig, outboundInvoiceMap: { a: 'totalCost' } }), /maliyet/);
});

test('giden fatura yükü kalemleri eşler ve boş eşlemeyi reddeder', () => {
  const config = normalizeConfig(baseConfig);
  const payload = buildOutboundPayload(
    { invoiceNo: 'F-9', partyName: 'ACME', grandTotal: 1200, currency: 'TRY', unitCost: 5, lines: [{ description: 'Ürün', quantity: 2, unitPrice: 500 }] },
    'inv1',
    config
  );
  assert.deepEqual(payload, {
    number: 'F-9', customer: { name: 'ACME' }, amounts: { total: 1200 }, currency: 'TRY', source: 'elifkimya',
    items: [{ name: 'Ürün', qty: 2, price: 500 }]
  });
  assert.throws(() => buildOutboundPayload({ invoiceNo: 'x' }, 'i', { ...config, outboundInvoiceMap: {} }), /boş/);
});

test('gelen fatura dönüşümü doğrular ve ödeme durumunu hesaplar', () => {
  const config = normalizeConfig(baseConfig);
  const { externalId, invoice, hasPaid, needsReview } = externalInvoiceToLocal(
    { id: 77, number: 'A-1', type: 'sales', customer: { name: 'Beta Ltd' }, total: '1.200,00', vat: '200,00', paid: 1200, currency: 'TRY', due: '2026-01-10' },
    config,
    { now: Date.parse('2026-02-01') }
  );
  assert.equal(externalId, '77');
  assert.equal(invoice.invoiceType, 'SATIS');
  assert.equal(invoice.netExclVat, 1000);
  assert.equal(invoice.paymentStatus, 'Ödendi');
  assert.equal(invoice.remainingAmountTry, 0);
  assert.equal(hasPaid, true);
  assert.equal(needsReview, false);

  assert.throws(() => externalInvoiceToLocal({ id: 1, number: 'x', type: 'unknown', customer: { name: 'Beta' }, total: 1 }, config), /türü/);
  assert.throws(() => externalInvoiceToLocal({ id: 1, number: 'x', type: 'sales', customer: { name: 'Beta' }, total: 1, currency: 'USD' }, config), /kur/);
  assert.throws(() => externalInvoiceToLocal({ number: 'x', type: 'sales', customer: { name: 'Beta' }, total: 1 }, config), /kimlik/);
  assert.throws(() => externalInvoiceToLocal({ id: 1, number: 'x', type: 'sales', customer: { name: 'Beta' }, total: 'abc' }, config), /toplam/);
});

test('ödeme bilgisi yoksa ödenmiş sayılmaz', () => {
  const config = normalizeConfig(baseConfig);
  const { invoice, hasPaid } = externalInvoiceToLocal({ id: 2, number: 'B-1', type: 'purchase', customer: { name: 'Tedarikçi AŞ' }, total: 500 }, config, { now: Date.parse('2026-02-01') });
  assert.equal(hasPaid, false);
  assert.equal(invoice.invoiceType, 'ALIS');
  assert.equal(invoice.paidAmountTry, 0);
  assert.equal(invoice.remainingAmountTry, 500);
});

test('gelen cari dönüşümü ünvanı zorunlu tutar', () => {
  const config = normalizeConfig(baseConfig);
  assert.equal(externalCustomerToLocal({ id: 'c1', title: 'Gamma AŞ', vkn: '1234567890' }, config).customer.taxNumber, '1234567890');
  assert.throws(() => externalCustomerToLocal({ id: 'c2', title: '' }, config), /ünvan/);
});

test('adaptör: kimlik doğrulama, sorgu, hata ve gizli anahtar maskeleme', async () => {
  const seen = [];
  const server = http.createServer((req, res) => {
    seen.push({ url: req.url, auth: req.headers.authorization, key: req.headers['idempotency-key'] });
    if (req.url.startsWith('/v1/fail')) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('hata: Bearer sk-secret-123 geçersiz');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ data: { items: [{ id: 1 }, { id: 2 }] } }));
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  try {
    const config = { ...normalizeConfig({ ...baseConfig, baseUrl: `http://127.0.0.1:${port}/v1` }, { allowLocalForTests: true }) };
    config.endpoints.fail = { method: 'GET', path: '/fail' };
    const adapter = createAdapter(config, { apiKey: 'sk-secret-123', apiSecret: '' }, { allowLocalForTests: true });

    const { data } = await adapter.call('invoicePull', { query: { page: 1, updated_since: '2026-01-01T00:00:00Z' } });
    assert.equal(adapter.extractList('invoicePull', data).length, 2);
    assert.equal(seen[0].auth, 'Bearer sk-secret-123');
    assert.match(seen[0].url, /page=1/);

    await assert.rejects(() => adapter.call('fail'), (error) => {
      assert.match(error.message, /500/);
      assert.ok(!error.message.includes('sk-secret-123'));
      return true;
    });
    await assert.rejects(() => createAdapter(config, { apiKey: '' }, { allowLocalForTests: true }).call('test'), /API anahtarı/);
    await assert.rejects(() => adapter.call('invoicePush', { body: {}, useUpdatePath: true }), /Yol parametresi/);
  } finally {
    server.close();
  }
});

test('gizli değer maskeleme kısa değerleri atlar', () => {
  assert.equal(redactSecrets('abc sk-1234 xyz', ['sk-1234', 'ab']), 'abc *** xyz');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { configFromForm, configToFormValues, parseJsonObject } from '../src/utils/integration-config.js';
import { describeSyncState, indexSyncStates, syncErrorMessage } from '../src/utils/sync-status.js';
import fs from 'node:fs';

test('ayar formu -> belge -> form gidiş dönüşü veriyi korur', () => {
  const form = {
    enabled: 'on', baseUrl: 'https://api.example.com/v1', authType: 'header', authHeaderName: 'X-Api-Key', providerLabel: 'Test',
    ep_test_path: '/ping', ep_invoicePush_path: '/invoices', ep_invoicePush_externalIdPath: 'data.id',
    ep_invoicePull_path: '/invoices', ep_invoicePull_listPath: 'data.items', ep_invoicePull_pageSize: '50',
    outboundInvoiceMap: '{"number":"invoiceNo"}', inboundInvoiceMap: '{"externalId":"id"}', inboundCustomerMap: '', outboundLineMap: '', invoiceTypeValues: '{"s":"SATIS"}'
  };
  const config = configFromForm(form);
  assert.equal(config.enabled, true);
  assert.equal(config.autoSync, false);
  assert.equal(config.endpoints.invoicePull.pageSize, 50);
  assert.equal(config.endpoints.customerPull, undefined);
  assert.deepEqual(config.outboundInvoiceMap, { number: 'invoiceNo' });

  const back = configToFormValues(config);
  assert.equal(back.ep_invoicePull_listPath, 'data.items');
  assert.equal(JSON.parse(back.invoiceTypeValues).s, 'SATIS');
  assert.deepEqual(configFromForm({ ...back, enabled: back.enabled }).endpoints, config.endpoints);
});

test('ayar formu geçersiz girdileri reddeder', () => {
  assert.throws(() => configFromForm({ baseUrl: '' }), /zorunlu/);
  assert.throws(() => configFromForm({ baseUrl: 'http://x.com' }), /https/);
  assert.throws(() => configFromForm({ baseUrl: 'https://x.com', outboundInvoiceMap: '[1]' }), /nesnesi/);
  assert.throws(() => configFromForm({ baseUrl: 'https://x.com', inboundInvoiceMap: '{bozuk' }), /JSON/);
  assert.throws(() => configFromForm({ baseUrl: 'https://x.com', ep_invoicePull_path: '/a', ep_invoicePull_pageSize: '-3' }), /sayfa boyutu/);
  assert.deepEqual(parseJsonObject('', 'x'), {});
});

test('senkron durumu rozetleri', () => {
  const invoice = { updatedAtIso: '2026-03-02T10:00:00Z' };
  assert.equal(describeSyncState(invoice, undefined).code, 'none');
  assert.equal(describeSyncState(invoice, { status: 'error', lastError: 'x' }).code, 'error');
  assert.equal(describeSyncState(invoice, { status: 'synced', direction: 'push', syncedUpdatedAtIso: '2026-03-02T10:00:00Z' }).code, 'synced');
  assert.equal(describeSyncState(invoice, { status: 'synced', direction: 'push', syncedUpdatedAtIso: '2026-03-01T10:00:00Z' }).code, 'stale');
  assert.equal(describeSyncState(invoice, { status: 'synced', direction: 'pull', syncedUpdatedAtIso: '2026-03-01T10:00:00Z' }).label, 'Muhasebeden alındı');
  assert.equal(indexSyncStates([{ id: 'a', status: 'synced' }]).get('a').status, 'synced');
});

test('hata mesajları kullanıcı dostu çevrilir', () => {
  assert.match(syncErrorMessage({ code: 'functions/permission-denied' }), /yetkiniz/);
  assert.match(syncErrorMessage({ code: 'functions/not-found', message: 'x' }), /Cloud Functions/);
  assert.equal(syncErrorMessage({ code: 'functions/internal', message: 'Muhasebe API\'si 401 döndürdü' }), "Muhasebe API'si 401 döndürdü");
  assert.match(syncErrorMessage({ code: 'functions/internal', message: 'internal' }), /Cloud Functions henüz/);
});

test('functions/lib/invoice-calc.js, src/utils/invoice-calc.js ile birebir aynı kalır', () => {
  const normalize = (file) => fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  assert.equal(normalize('functions/lib/invoice-calc.js'), normalize('src/utils/invoice-calc.js'));
});

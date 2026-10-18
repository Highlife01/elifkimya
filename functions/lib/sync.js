import { getPath } from './mapping.js';
import { buildOutboundPayload, externalCustomerToLocal, externalInvoiceToLocal } from './transform.js';

/** Firestore (elifkimya veritabanı) üzerinde çalışan senkron işlemleri. */

export const COLLECTIONS = {
  INVOICES: 'accountingInvoices',
  CUSTOMERS: 'customers',
  STATE: 'accountingSyncState',
  LOGS: 'accountingSyncLogs'
};
const MAX_PAGES = 20;
const LOCK_MS = 5 * 60 * 1000;

export async function writeLog(db, entry) {
  try {
    await db.collection(COLLECTIONS.LOGS).add({
      action: String(entry.action).slice(0, 60),
      status: String(entry.status).slice(0, 30),
      detail: String(entry.detail || '').slice(0, 600),
      counts: entry.counts || null,
      actorEmail: String(entry.actorEmail || 'sistem').slice(0, 150),
      createdAtIso: new Date().toISOString()
    });
  } catch (error) {
    console.error('Senkron günlüğü yazılamadı', error.message);
  }
}

async function acquireLock(db, name) {
  const ref = db.collection(COLLECTIONS.STATE).doc(`_lock_${name}`);
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const until = snap.exists ? Number(snap.data().untilMs || 0) : 0;
    if (until > Date.now()) throw new Error('Bu senkron işlemi zaten çalışıyor. Birkaç dakika sonra tekrar deneyin.');
    tx.set(ref, { untilMs: Date.now() + LOCK_MS });
  });
  return async () => {
    await ref.set({ untilMs: 0 });
  };
}

async function fetchAllPages(adapter, config, endpointKey, since) {
  const endpoint = config.endpoints[endpointKey];
  const items = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const query = {};
    if (endpoint.sinceParam && since) query[endpoint.sinceParam] = since;
    if (endpoint.pageParam) query[endpoint.pageParam] = page;
    if (endpoint.pageSizeParam && endpoint.pageSize) query[endpoint.pageSizeParam] = endpoint.pageSize;
    const { data } = await adapter.call(endpointKey, { query });
    const list = adapter.extractList(endpointKey, data);
    items.push(...list);
    const hasMore = endpoint.pageParam && list.length > 0 && (!endpoint.pageSize || list.length >= endpoint.pageSize);
    if (!hasMore) break;
  }
  return items;
}

export async function pushInvoice({ db, adapter, config, invoiceId, actorEmail }) {
  const endpoint = config.endpoints.invoicePush;
  if (!endpoint) throw new Error('Fatura gönderme uç noktası (invoicePush) ayarlanmamış.');
  const snap = await db.collection(COLLECTIONS.INVOICES).doc(String(invoiceId)).get();
  if (!snap.exists) throw new Error('Fatura bulunamadı.');
  const invoice = snap.data();
  if (invoice.docCategory === 'PROFORMA') throw new Error('Proforma faturalar muhasebe programına gönderilmez.');

  const stateRef = db.collection(COLLECTIONS.STATE).doc(snap.id);
  const state = (await stateRef.get()).data() || {};
  const existingExternalId = state.externalId ? String(state.externalId) : '';
  if (existingExternalId && !endpoint.updatePath) {
    throw new Error('Bu fatura muhasebe programına zaten gönderilmiş. Güncelleme için güncelleme yolu (updatePath) tanımlanmamış.');
  }

  const nowIso = new Date().toISOString();
  try {
    const body = buildOutboundPayload(invoice, snap.id, config);
    const { data } = await adapter.call('invoicePush', {
      body,
      pathParams: { id: existingExternalId },
      useUpdatePath: Boolean(existingExternalId),
      idempotencyKey: existingExternalId ? `elifkimya-${snap.id}-${invoice.updatedAtIso || ''}` : `elifkimya-${snap.id}`
    });
    const externalId = existingExternalId || String(getPath(data, endpoint.externalIdPath) ?? '').trim();
    if (!externalId) {
      throw new Error('Muhasebe programı isteği kabul etti ancak yanıtta kayıt kimliği dönmedi. Karşı sistemde kontrol edin; tekrar göndermeyin.');
    }
    await stateRef.set({
      status: 'synced',
      direction: 'push',
      externalId,
      invoiceNo: invoice.invoiceNo || '',
      syncedAtIso: nowIso,
      syncedUpdatedAtIso: invoice.updatedAtIso || '',
      lastError: ''
    });
    await writeLog(db, { action: 'pushInvoice', status: 'ok', detail: `${invoice.invoiceNo} → ${externalId}`, actorEmail });
    return { externalId, syncedAtIso: nowIso };
  } catch (error) {
    await stateRef.set({
      ...state,
      status: 'error',
      direction: 'push',
      invoiceNo: invoice.invoiceNo || '',
      lastError: String(error.message).slice(0, 400),
      lastAttemptAtIso: nowIso
    });
    await writeLog(db, { action: 'pushInvoice', status: 'error', detail: `${invoice.invoiceNo}: ${error.message}`, actorEmail });
    throw error;
  }
}

async function findLocalInvoice(db, externalId, local) {
  const byExternal = await db.collection(COLLECTIONS.INVOICES).where('externalId', '==', externalId).limit(1).get();
  if (!byExternal.empty) return byExternal.docs[0];
  const byNo = await db.collection(COLLECTIONS.INVOICES).where('invoiceNo', '==', local.invoiceNo).limit(10).get();
  return byNo.docs.find((d) => {
    const data = d.data();
    return data.invoiceType === local.invoiceType &&
      (local.invoiceType !== 'ALIS' || String(data.partyName || '').toLowerCase() === local.partyName.toLowerCase());
  }) || null;
}

export async function pullInvoices({ db, adapter, config, actorEmail }) {
  if (!config.endpoints.invoicePull) throw new Error('Fatura çekme uç noktası (invoicePull) ayarlanmamış.');
  const release = await acquireLock(db, 'invoices');
  const startedIso = new Date().toISOString();
  const counts = { fetched: 0, created: 0, updated: 0, unchanged: 0, skipped: 0 };
  const problems = [];
  try {
    const metaRef = db.collection(COLLECTIONS.STATE).doc('_meta');
    const meta = (await metaRef.get()).data() || {};
    const items = await fetchAllPages(adapter, config, 'invoicePull', meta.lastInvoicePullIso || '');
    counts.fetched = items.length;

    for (const external of items) {
      let converted;
      try {
        converted = externalInvoiceToLocal(external, config);
      } catch (error) {
        counts.skipped += 1;
        if (problems.length < 5) problems.push(error.message);
        continue;
      }
      const { externalId, invoice, hasPaid, payment, needsReview } = converted;
      const existing = await findLocalInvoice(db, externalId, invoice);
      const nowIso = new Date().toISOString();
      if (!existing) {
        const ref = await db.collection(COLLECTIONS.INVOICES).add({
          ...invoice,
          source: 'external',
          externalId,
          needsReview,
          createdAtIso: nowIso,
          updatedAtIso: nowIso,
          updatedByEmail: 'muhasebe-entegrasyonu'
        });
        await db.collection(COLLECTIONS.STATE).doc(ref.id).set({
          status: 'synced', direction: 'pull', externalId, invoiceNo: invoice.invoiceNo, syncedAtIso: nowIso, syncedUpdatedAtIso: nowIso, lastError: ''
        });
        counts.created += 1;
        continue;
      }

      const current = existing.data();
      const changes = { externalId };
      // İçerik (kalemler, tutarlar) yerelde kalır; karşı sistemden yalnızca tahsilat/ödeme durumu alınır.
      if (hasPaid && (Number(current.paidAmountTry || 0) !== payment.paidAmountTry || current.paymentStatus !== payment.paymentStatus)) {
        Object.assign(changes, payment, { externalPaymentSyncedAtIso: nowIso });
      }
      const needsUpdate = Object.keys(changes).length > 1 || current.externalId !== externalId;
      if (needsUpdate) {
        await existing.ref.update({ ...changes, updatedAtIso: nowIso });
        await db.collection(COLLECTIONS.STATE).doc(existing.id).set({
          status: 'synced', direction: 'pull', externalId, invoiceNo: current.invoiceNo || invoice.invoiceNo, syncedAtIso: nowIso, syncedUpdatedAtIso: nowIso, lastError: ''
        });
        counts.updated += 1;
      } else {
        counts.unchanged += 1;
      }
    }

    await metaRef.set({ ...meta, lastInvoicePullIso: startedIso }, { merge: true });
    const detail = problems.length ? `Atlanan kayıtlar: ${problems.join(' | ')}` : '';
    await writeLog(db, { action: 'pullInvoices', status: counts.skipped ? 'partial' : 'ok', detail, counts, actorEmail });
    return { counts, problems };
  } catch (error) {
    await writeLog(db, { action: 'pullInvoices', status: 'error', detail: error.message, counts, actorEmail });
    throw error;
  } finally {
    await release();
  }
}

export async function pullCustomers({ db, adapter, config, actorEmail }) {
  if (!config.endpoints.customerPull) throw new Error('Cari çekme uç noktası (customerPull) ayarlanmamış.');
  const release = await acquireLock(db, 'customers');
  const startedIso = new Date().toISOString();
  const counts = { fetched: 0, created: 0, updated: 0, unchanged: 0, skipped: 0 };
  const problems = [];
  try {
    const metaRef = db.collection(COLLECTIONS.STATE).doc('_meta');
    const meta = (await metaRef.get()).data() || {};
    const items = await fetchAllPages(adapter, config, 'customerPull', meta.lastCustomerPullIso || '');
    counts.fetched = items.length;

    for (const external of items) {
      let converted;
      try {
        converted = externalCustomerToLocal(external, config);
      } catch (error) {
        counts.skipped += 1;
        if (problems.length < 5) problems.push(error.message);
        continue;
      }
      const { externalId, customer } = converted;
      const customers = db.collection(COLLECTIONS.CUSTOMERS);
      let existing = (await customers.where('externalId', '==', externalId).limit(1).get()).docs[0];
      if (!existing && customer.taxNumber) existing = (await customers.where('taxNumber', '==', customer.taxNumber).limit(1).get()).docs[0];
      const nowIso = new Date().toISOString();

      if (!existing) {
        await customers.add({ ...customer, country: 'Türkiye', externalId, source: 'external', createdAtIso: nowIso, updatedAtIso: nowIso });
        counts.created += 1;
        continue;
      }
      // Mevcut yerel bilgiler ezilmez; yalnızca boş alanlar doldurulur.
      const current = existing.data();
      const fill = {};
      for (const [field, value] of Object.entries(customer)) {
        if (value && !String(current[field] ?? '').trim()) fill[field] = value;
      }
      if (current.externalId !== externalId) fill.externalId = externalId;
      if (Object.keys(fill).length > 0) {
        await existing.ref.update({ ...fill, updatedAtIso: nowIso });
        counts.updated += 1;
      } else {
        counts.unchanged += 1;
      }
    }

    await metaRef.set({ ...meta, lastCustomerPullIso: startedIso }, { merge: true });
    const detail = problems.length ? `Atlanan kayıtlar: ${problems.join(' | ')}` : '';
    await writeLog(db, { action: 'pullCustomers', status: counts.skipped ? 'partial' : 'ok', detail, counts, actorEmail });
    return { counts, problems };
  } catch (error) {
    await writeLog(db, { action: 'pullCustomers', status: 'error', detail: error.message, counts, actorEmail });
    throw error;
  } finally {
    await release();
  }
}

import { initializeApp, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { defineSecret } from 'firebase-functions/params';
import { requireAccountingRole } from './lib/auth.js';
import { createAdapter } from './lib/adapter.js';
import { CONFIG_DOC_PATH, normalizeConfig } from './lib/config.js';
import { COLLECTIONS, pullCustomers, pullInvoices, pushInvoice, writeLog } from './lib/sync.js';

/**
 * Muhasebe programı köprüsü. Veri yalnızca izole `elifkimya` Firestore veritabanına yazılır.
 * Gizli anahtarlar: firebase functions:secrets:set ACCOUNTING_API_KEY (ve Basic için ACCOUNTING_API_SECRET)
 */

const REGION = 'europe-west1';
const DATABASE_ID = 'elifkimya';
const ACCOUNTING_API_KEY = defineSecret('ACCOUNTING_API_KEY');
const ACCOUNTING_API_SECRET = defineSecret('ACCOUNTING_API_SECRET');

initializeApp();
const db = getFirestore(getApp(), DATABASE_ID);

function readSecrets() {
  return { apiKey: ACCOUNTING_API_KEY.value() || '', apiSecret: ACCOUNTING_API_SECRET.value() || '' };
}

async function loadConfig() {
  const snap = await db.doc(CONFIG_DOC_PATH).get();
  if (!snap.exists) throw new HttpsError('failed-precondition', 'Muhasebe entegrasyon ayarları henüz kaydedilmemiş.');
  try {
    return normalizeConfig(snap.data());
  } catch (error) {
    throw new HttpsError('failed-precondition', `Entegrasyon ayarları geçersiz: ${error.message}`);
  }
}

function toHttpsError(error) {
  if (error instanceof HttpsError) return error;
  return new HttpsError('internal', String(error?.message || 'Beklenmeyen hata').slice(0, 400));
}

export const accountingSync = onCall(
  { region: REGION, secrets: [ACCOUNTING_API_KEY, ACCOUNTING_API_SECRET], timeoutSeconds: 300, memory: '256MiB', maxInstances: 3 },
  async (request) => {
    const action = String(request.data?.action || '');

    if (action === 'status') {
      await requireAccountingRole(request, db, 'view');
      const secrets = readSecrets();
      const meta = (await db.collection(COLLECTIONS.STATE).doc('_meta').get()).data() || {};
      return {
        secretConfigured: Boolean(secrets.apiKey),
        secondarySecretConfigured: Boolean(secrets.apiSecret),
        lastInvoicePullIso: meta.lastInvoicePullIso || '',
        lastCustomerPullIso: meta.lastCustomerPullIso || ''
      };
    }

    const actor = await requireAccountingRole(request, db, 'manage');
    try {
      const config = await loadConfig();
      if (!config.enabled) throw new HttpsError('failed-precondition', 'Entegrasyon kapalı. Önce ayarlardan etkinleştirin.');
      const adapter = createAdapter(config, readSecrets());
      const ctx = { db, adapter, config, actorEmail: actor.email };

      if (action === 'test') {
        const response = await adapter.call('test');
        await writeLog(db, { action: 'test', status: 'ok', detail: `HTTP ${response.status}`, actorEmail: actor.email });
        return { ok: true, httpStatus: response.status };
      }
      if (action === 'pushInvoice') {
        const invoiceId = String(request.data?.invoiceId || '');
        if (!invoiceId) throw new HttpsError('invalid-argument', 'Fatura kimliği gerekli.');
        return await pushInvoice({ ...ctx, invoiceId });
      }
      if (action === 'pullInvoices') return await pullInvoices(ctx);
      if (action === 'pullCustomers') return await pullCustomers(ctx);
      throw new HttpsError('invalid-argument', 'Bilinmeyen işlem.');
    } catch (error) {
      if (action === 'test') await writeLog(db, { action: 'test', status: 'error', detail: error.message, actorEmail: actor.email });
      throw toHttpsError(error);
    }
  }
);

// Otomatik iki yönlü senkron: ayar belgesinde enabled ve autoSync açıksa saat başı çalışır.
export const accountingAutoSync = onSchedule(
  { region: REGION, schedule: 'every 60 minutes', timeZone: 'Europe/Istanbul', secrets: [ACCOUNTING_API_KEY, ACCOUNTING_API_SECRET], timeoutSeconds: 300, memory: '256MiB', maxInstances: 1 },
  async () => {
    let config;
    try {
      const snap = await db.doc(CONFIG_DOC_PATH).get();
      if (!snap.exists) return;
      config = normalizeConfig(snap.data());
    } catch (error) {
      await writeLog(db, { action: 'autoSync', status: 'error', detail: `Ayarlar geçersiz: ${error.message}` });
      return;
    }
    if (!config.enabled || !config.autoSync) return;
    const ctx = { db, adapter: createAdapter(config, readSecrets()), config, actorEmail: 'otomatik' };
    for (const run of [config.endpoints.invoicePull && pullInvoices, config.endpoints.customerPull && pullCustomers]) {
      if (!run) continue;
      try {
        await run(ctx);
      } catch (error) {
        console.error('Otomatik senkron hatası', error.message);
      }
    }
  }
);

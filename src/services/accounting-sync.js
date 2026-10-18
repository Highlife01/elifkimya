import { getFunctions, httpsCallable } from 'firebase/functions';
import { collection, doc, getDocs, limit, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { COLLECTIONS, ROLES, app, db, writeAuditLog } from '../firebase.js';
import { syncErrorMessage } from '../utils/sync-status.js';

/** Muhasebe programı köprüsü istemcisi. Gizli anahtar tarayıcıya hiçbir zaman gelmez. */

const FUNCTIONS_REGION = 'europe-west1';
export const INTEGRATION_DOC_ID = 'accountingIntegration';
let callable = null;

export async function runAccountingSync(action, payload = {}) {
  if (!app) throw new Error('Firebase yapılandırılmamış.');
  try {
    callable ||= httpsCallable(getFunctions(app, FUNCTIONS_REGION), 'accountingSync');
    const { data } = await callable({ action, ...payload });
    return data;
  } catch (error) {
    throw new Error(syncErrorMessage(error));
  }
}

/** Ayar belgesi gizli bilgi içermez; anahtarlar yalnızca sunucuda (Secret Manager) tutulur. Eşlemeler tam değiştirilir. */
export async function saveIntegrationConfig(config, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (actor?.role !== ROLES.SUPERADMIN) throw new Error('Entegrasyon ayarlarını yalnızca Süperadmin değiştirebilir.');
  const nowIso = new Date().toISOString();
  const payload = {
    ...config,
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso,
    updatedBy: actor.email || actor.uid
  };
  await setDoc(doc(db, COLLECTIONS.SITE_SETTINGS, INTEGRATION_DOC_ID), payload);
  await writeAuditLog('UPDATE_ACCOUNTING_INTEGRATION', COLLECTIONS.SITE_SETTINGS, INTEGRATION_DOC_ID, { baseUrl: config.baseUrl, enabled: config.enabled }, actor);
  return payload;
}

export async function fetchSyncLogs(maxLogs = 25) {
  if (!db) return [];
  const snap = await getDocs(query(collection(db, COLLECTIONS.ACCOUNTING_SYNC_LOGS), orderBy('createdAtIso', 'desc'), limit(maxLogs)));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

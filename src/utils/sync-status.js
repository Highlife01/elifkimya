/** Fatura ↔ muhasebe programı senkron durumunu rozet bilgisine çevirir (saf fonksiyon). */

export function describeSyncState(invoice, state) {
  if (!state) return { code: 'none', label: 'Gönderilmedi', badgeClass: 'badge-neutral' };
  if (state.status === 'error') return { code: 'error', label: 'Hata', badgeClass: 'badge-error', detail: state.lastError || '' };
  const syncedVersion = state.syncedUpdatedAtIso || '';
  const currentVersion = invoice?.updatedAtIso || '';
  if (state.direction === 'push' && syncedVersion && currentVersion && currentVersion > syncedVersion) {
    return { code: 'stale', label: 'Değişti – yeniden gönder', badgeClass: 'badge-amber', detail: state.externalId || '' };
  }
  return {
    code: 'synced',
    label: state.direction === 'pull' ? 'Muhasebeden alındı' : 'Muhasebede',
    badgeClass: 'badge-teal',
    detail: state.externalId || ''
  };
}

export function indexSyncStates(states) {
  const map = new Map();
  for (const state of Array.isArray(states) ? states : []) {
    if (state?.id) map.set(state.id, state);
  }
  return map;
}

export const SYNC_ERROR_MESSAGES = {
  unauthenticated: 'Oturumunuz bulunamadı. Lütfen tekrar giriş yapın.',
  'permission-denied': 'Muhasebe entegrasyonu için yetkiniz bulunmuyor.',
  'failed-precondition': 'Entegrasyon henüz hazır değil.',
  unavailable: 'Entegrasyon servisine ulaşılamadı. İnternet bağlantınızı kontrol edin.',
  'not-found': 'Entegrasyon servisi bulunamadı. Cloud Functions yayına alınmamış olabilir.'
};

export function syncErrorMessage(error) {
  const code = String(error?.code || '').replace(/^functions\//, '');
  const detail = String(error?.message || '').trim();
  if (code === 'internal' || code === 'invalid-argument' || (code === 'failed-precondition' && detail)) {
    return detail && detail.toLowerCase() !== 'internal'
      ? detail
      : 'Entegrasyon servisine ulaşılamadı. Cloud Functions henüz yayına alınmamış olabilir.';
  }
  return SYNC_ERROR_MESSAGES[code] || detail || 'Muhasebe işlemi tamamlanamadı.';
}

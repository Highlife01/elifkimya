import { renderSafeHtml, escapeAttr, escapeHtml } from '../utils/security.js';
import { showNotification } from '../components/notification.js';
import { ROLES, hasPermission } from '../firebase.js';
import {
  ENDPOINT_DEFS,
  EXTRA_LABELS,
  MAP_FIELDS,
  INTEGRATION_PRESETS,
  configFromForm,
  configToFormValues
} from '../utils/integration-config.js';

/**
 * Muhasebe programı entegrasyonu sekmesi. Başarı mesajları yalnızca sunucu işlemi doğrulandıktan sonra gösterilir.
 * Gizli API anahtarı bu ekranda girilmez; yalnızca sunucuda (Firebase Secret Manager) tutulur.
 */

const service = () => import('../services/accounting-sync.js');

function field(name, label, value, { type = 'text', disabled = false, placeholder = '', span = 1 } = {}) {
  return `
    <div class="form-group" style="grid-column:span ${span};">
      <label class="form-label">${escapeHtml(label)}</label>
      <input type="${type}" name="${escapeAttr(name)}" class="form-input" value="${escapeAttr(value ?? '')}" placeholder="${escapeAttr(placeholder)}" ${disabled ? 'disabled' : ''} />
    </div>`;
}

function formatDate(iso) {
  if (!iso) return '—';
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString('tr-TR');
}

function renderLogs(logs) {
  if (!logs.length) return '<div class="empty-state-box"><p>Henüz senkron kaydı yok.</p></div>';
  return `
    <div class="products-table-wrapper">
      <table class="data-table">
        <thead><tr><th>Zaman</th><th>İşlem</th><th>Sonuç</th><th>Ayrıntı</th><th>Kullanıcı</th></tr></thead>
        <tbody>
          ${logs.map((log) => {
            const counts = log.counts ? ` (${Object.entries(log.counts).map(([k, v]) => `${k}: ${v}`).join(', ')})` : '';
            return `<tr>
              <td style="font-size:0.78rem;">${escapeHtml(formatDate(log.createdAtIso))}</td>
              <td><code>${escapeHtml(log.action)}</code></td>
              <td><span class="badge ${log.status === 'ok' ? 'badge-teal' : log.status === 'partial' ? 'badge-amber' : 'badge-error'}">${escapeHtml(log.status)}</span></td>
              <td style="font-size:0.8rem;">${escapeHtml(log.detail || '')}${escapeHtml(counts)}</td>
              <td style="font-size:0.78rem;">${escapeHtml(log.actorEmail || '')}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

/**
 * @param {HTMLElement} box
 * @param {{ store: object, profile: object, onChanged: (only?: string[]) => Promise<void> }} ctx
 */
export function renderIntegrationPanel(box, { store, profile, onChanged }) {
  const config = store.settings?.accountingIntegration || null;
  const isSuperAdmin = profile.role === ROLES.SUPERADMIN;
  const canManage = hasPermission(profile.role, 'manage_accounting');
  const values = configToFormValues(config);
  const disabled = !isSuperAdmin;

  const endpointRows = ENDPOINT_DEFS.map((def) => `
    <div class="card" style="padding:1rem;margin-bottom:0.75rem;background:#f8fafc;">
      <strong>${escapeHtml(def.label)}</strong>
      <div class="form-grid-4" style="margin-top:0.6rem;">
        <div class="form-group">
          <label class="form-label">Yöntem</label>
          <select name="ep_${escapeAttr(def.key)}_method" class="form-select" ${disabled ? 'disabled' : ''}>
            ${['GET', 'POST', 'PUT', 'PATCH'].map((m) => `<option value="${m}" ${values[`ep_${def.key}_method`] === m ? 'selected' : ''}>${m}</option>`).join('')}
          </select>
        </div>
        ${field(`ep_${def.key}_path`, 'Yol (örn. /invoices)', values[`ep_${def.key}_path`], { disabled, span: 3 })}
        ${def.extras.map((extra) => field(`ep_${def.key}_${extra}`, EXTRA_LABELS[extra], values[`ep_${def.key}_${extra}`], { disabled, span: 2 })).join('')}
      </div>
    </div>`).join('');

  const mapRows = MAP_FIELDS.map((map) => `
    <div class="form-group full-width">
      <label class="form-label">${escapeHtml(map.label)}</label>
      <textarea name="${escapeAttr(map.name)}" class="form-textarea" rows="4" spellcheck="false" ${disabled ? 'disabled' : ''} placeholder="${escapeAttr(map.hint)}" style="font-family:monospace;font-size:0.8rem;">${escapeHtml(values[map.name])}</textarea>
      <small style="color:var(--text-secondary);">${escapeHtml(map.hint)}</small>
    </div>`).join('');

  renderSafeHtml(box, `
    <div class="card" style="padding:1.5rem;margin-bottom:1.5rem;">
      <h3>Muhasebe Programı API Entegrasyonu (İki Yönlü Senkron & UBL-TR 2.1 XML)</h3>
      <p style="color:var(--text-secondary);margin:0.4rem 0 1rem;">
        Faturalar panelden muhasebe programına / özel entegratöre gönderilir; muhasebe programındaki faturalar, tahsilat durumları ve cariler panele alınır.
        Ayrıca “2. E-Fatura &amp; Tevkifat” sekmesinden her faturayı <strong>📥 GİB UBL-TR 2.1 XML</strong> veya <strong>🖨️ A4 Resmi E-Fatura PDF</strong> olarak indirebilirsiniz.
      </p>
      <div id="integration-status" class="loading-banner">Sunucu durumu okunuyor...</div>
      <details style="margin-top:1rem;">
        <summary style="cursor:pointer;font-weight:700;">Kurulum adımları (ilk seferde)</summary>
        <ol style="margin:0.6rem 0 0 1.2rem;line-height:1.7;font-size:0.88rem;">
          <li>Terminalde: <code>firebase functions:secrets:set ACCOUNTING_API_KEY</code> (Basic kimlik doğrulama için ayrıca <code>ACCOUNTING_API_SECRET</code>; kullanılmayacaksa boş bir değer girin).</li>
          <li><code>firebase deploy --only functions:elifkimya,firestore:rules</code> (Cloud Functions için Blaze planı gerekir).</li>
          <li>Aşağıdan hazır şablonlardan birini seçip API adresini güncelleyin veya kendi uç noktalarınızı girip kaydedin, ardından bağlantıyı test edin.</li>
        </ol>
      </details>
    </div>

    <form id="integration-config-form" class="card" style="padding:1.5rem;margin-bottom:1.5rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;">
        <h3>Bağlantı Ayarları ${isSuperAdmin ? '' : '<span class="badge badge-neutral">Yalnızca Süperadmin düzenler</span>'}</h3>
        ${isSuperAdmin ? `
          <div style="display:flex;gap:0.4rem;flex-wrap:wrap;align-items:center;">
            <span style="font-size:0.78rem;color:var(--text-secondary);font-weight:700;">Hızlı Şablon Yükle:</span>
            ${Object.entries(INTEGRATION_PRESETS).map(([key, preset]) => `
              <button type="button" class="btn btn-secondary btn-sm" data-load-preset="${escapeAttr(key)}">⚡ ${escapeHtml(preset.label)}</button>
            `).join('')}
          </div>
        ` : ''}
      </div>
      <div class="form-grid-4" style="margin-top:1rem;">
        ${field('providerLabel', 'Program adı (bilgi amaçlı)', values.providerLabel, { disabled, placeholder: 'Örn: Firma muhasebe yazılımı' })}
        ${field('baseUrl', 'API adresi (https)', values.baseUrl, { disabled, placeholder: 'https://api.firma.com/v1', span: 2 })}
        <div class="form-group">
          <label class="form-label">Kimlik doğrulama</label>
          <select name="authType" class="form-select" ${disabled ? 'disabled' : ''}>
            <option value="bearer" ${values.authType === 'bearer' ? 'selected' : ''}>Bearer token</option>
            <option value="header" ${values.authType === 'header' ? 'selected' : ''}>Özel başlık (API key)</option>
            <option value="basic" ${values.authType === 'basic' ? 'selected' : ''}>Basic (anahtar + şifre)</option>
          </select>
        </div>
        ${field('authHeaderName', 'Özel başlık adı', values.authHeaderName, { disabled })}
        <div class="form-group" style="display:flex;align-items:end;gap:0.5rem;">
          <label><input type="checkbox" name="enabled" ${values.enabled ? 'checked' : ''} ${disabled ? 'disabled' : ''} /> Entegrasyon açık</label>
        </div>
        <div class="form-group" style="display:flex;align-items:end;gap:0.5rem;">
          <label><input type="checkbox" name="autoSync" ${values.autoSync ? 'checked' : ''} ${disabled ? 'disabled' : ''} /> Saat başı otomatik çek</label>
        </div>
      </div>

      <h4 style="margin:1.25rem 0 0.6rem;">Uç noktalar</h4>
      ${endpointRows}

      <h4 style="margin:1.25rem 0 0.6rem;">Alan eşlemeleri</h4>
      <div class="form-grid-4">
        ${field('outboundLinesPath', 'Giden kalemlerin yazılacağı alan (örn. items)', values.outboundLinesPath, { disabled, span: 2 })}
        <div></div><div></div>
        ${mapRows}
      </div>
      <p style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.6rem;">
        İç maliyet ve kâr alanları (birim maliyet, brüt kâr vb.) hiçbir zaman dış sisteme gönderilemez.
      </p>
      ${isSuperAdmin ? '<div style="margin-top:1rem;"><button type="submit" class="btn btn-primary btn-sm" id="integration-save-btn">Ayarları Kaydet</button></div>' : ''}
    </form>

    <div class="card" style="padding:1.5rem;margin-bottom:1.5rem;">
      <h3>Senkron İşlemleri</h3>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.75rem;">
        <button type="button" class="btn btn-secondary btn-sm" data-sync-action="test" ${canManage ? '' : 'disabled'}>🔌 Bağlantıyı Test Et</button>
        <button type="button" class="btn btn-secondary btn-sm" data-sync-action="pullInvoices" ${canManage ? '' : 'disabled'}>⬇️ Faturaları Çek</button>
        <button type="button" class="btn btn-secondary btn-sm" data-sync-action="pullCustomers" ${canManage ? '' : 'disabled'}>⬇️ Carileri Çek</button>
      </div>
      <p style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.6rem;">
        Fatura göndermek için “E-Fatura &amp; Tevkifat” sekmesindeki fatura satırlarındaki <strong>Muhasebeye Gönder</strong> düğmesini kullanın.
        Çekilen faturalarda içerik yerelde kalır; yalnızca tahsilat durumu muhasebe programından güncellenir.
      </p>
    </div>

    <div class="card" style="padding:1.5rem;">
      <h3>Son Senkron Kayıtları</h3>
      <div id="integration-logs" class="loading-banner">Kayıtlar yükleniyor...</div>
    </div>
  `);

  const statusBox = box.querySelector('#integration-status');
  const logsBox = box.querySelector('#integration-logs');

  async function loadStatusAndLogs() {
    try {
      const { runAccountingSync, fetchSyncLogs } = await service();
      const [status, logs] = await Promise.allSettled([runAccountingSync('status'), fetchSyncLogs()]);
      if (status.status === 'fulfilled') {
        const s = status.value;
        renderSafeHtml(statusBox, `
          <div style="display:flex;gap:0.6rem;flex-wrap:wrap;align-items:center;">
            <span class="badge ${config?.enabled ? 'badge-teal' : 'badge-neutral'}">${config?.enabled ? 'Entegrasyon açık' : 'Entegrasyon kapalı'}</span>
            <span class="badge ${s.secretConfigured ? 'badge-teal' : 'badge-amber'}">${s.secretConfigured ? 'API anahtarı sunucuda tanımlı' : 'API anahtarı tanımlı değil'}</span>
            <span style="font-size:0.8rem;">Son fatura çekme: ${escapeHtml(formatDate(s.lastInvoicePullIso))}</span>
            <span style="font-size:0.8rem;">Son cari çekme: ${escapeHtml(formatDate(s.lastCustomerPullIso))}</span>
          </div>`);
      } else {
        renderSafeHtml(statusBox, `<div class="empty-state-box"><p>${escapeHtml(status.reason?.message || 'Sunucu durumu okunamadı.')}</p></div>`);
      }
      renderSafeHtml(logsBox, logs.status === 'fulfilled' ? renderLogs(logs.value) : '<div class="empty-state-box"><p>Kayıtlar okunamadı.</p></div>');
    } catch (error) {
      renderSafeHtml(statusBox, `<div class="empty-state-box"><p>${escapeHtml(error.message || 'Entegrasyon modülü yüklenemedi.')}</p></div>`);
    }
  }
  loadStatusAndLogs();

  const form = box.querySelector('#integration-config-form');
  box.querySelectorAll('[data-load-preset]').forEach((presetBtn) => {
    presetBtn.addEventListener('click', () => {
      const key = presetBtn.getAttribute('data-load-preset');
      const preset = INTEGRATION_PRESETS[key];
      if (!preset || !form) return;
      const presetValues = configToFormValues(preset.config);
      for (const [fieldName, fieldVal] of Object.entries(presetValues)) {
        const el = form.elements[fieldName];
        if (!el) continue;
        if (el.type === 'checkbox') el.checked = Boolean(fieldVal);
        else el.value = String(fieldVal ?? '');
      }
      showNotification(`"${preset.label}" şablonu forma yüklendi. API adresinizi kontrol edip "Ayarları Kaydet" butonuna basınız.`, 'info');
    });
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const saveBtn = box.querySelector('#integration-save-btn');
    try {
      const raw = Object.fromEntries(new FormData(form).entries());
      const nextConfig = configFromForm({ ...raw, enabled: form.elements.enabled.checked, autoSync: form.elements.autoSync.checked });
      if (saveBtn) saveBtn.disabled = true;
      const { saveIntegrationConfig } = await service();
      await saveIntegrationConfig(nextConfig, profile);
      showNotification('Entegrasyon ayarları sunucuya kaydedildi. Bağlantıyı test ederek doğrulayın.', 'success');
      await onChanged(['settings']);
    } catch (error) {
      showNotification(error.message || 'Ayarlar kaydedilemedi.', 'error');
      if (saveBtn) saveBtn.disabled = false;
    }
  });

  box.querySelectorAll('[data-sync-action]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const action = btn.getAttribute('data-sync-action');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Çalışıyor...';
      try {
        const { runAccountingSync } = await service();
        const result = await runAccountingSync(action);
        if (action === 'test') {
          showNotification(`Muhasebe API'si bağlantıyı doğruladı (HTTP ${result.httpStatus}).`, 'success');
        } else {
          const c = result.counts || {};
          const extra = result.problems?.length ? ` İlk sorun: ${result.problems[0]}` : '';
          showNotification(`${c.fetched || 0} kayıt okundu: ${c.created || 0} yeni, ${c.updated || 0} güncellendi, ${c.unchanged || 0} değişmedi, ${c.skipped || 0} atlandı.${extra}`, c.skipped ? 'info' : 'success');
          await onChanged(action === 'pullInvoices' ? ['accountingInvoices', 'accountingSyncStates'] : ['customers']);
        }
      } catch (error) {
        showNotification(error.message || 'İşlem tamamlanamadı.', 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = original;
        loadStatusAndLogs();
      }
    });
  });
}

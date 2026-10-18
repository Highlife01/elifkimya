import {
  ROLES,
  ROLE_LABELS,
  CRM_STAGES,
  CRM_RESOLUTION_STATUSES,
  PROPOSAL_STATUSES,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  STOCK_MOVEMENT_TYPES,
  PROJECT_STAGES,
  DATABASE_ID,
  hasPermission,
  loginWithEmail,
  loginWithGoogle,
  logoutCurrentUser,
  onAuthChange,
  updateStaffUserRole,
  loadAdminAllData,
  createOrUpdateCrmRequest,
  saveCustomerRecord,
  saveProduct,
  deleteProductRecord,
  convertMassVolumeUnit,
  uploadAndSaveTechnicalDocument,
  saveWaterProject,
  approveWaterProjectTechnical,
  calculateProposalFinancials,
  saveProposalOrCreateRevision,
  sendProposalAndPublishPortalShare,
  updateProposalCustomerStatus,
  saveOrderRecord,
  saveInventoryItemCard,
  executeStockMovementTransaction,
  saveSupplierRecord,
  saveServiceRecord,
  saveAccountingInvoice,
  saveAccountingTransaction,
  saveChequeOrNote,
  updateChequeOrNoteStatus,
  saveSiteSettingsDoc,
  sendTestNotificationLog,
  subscribeToAdminInbox,
  convertCrmRequestToOrder
} from '../firebase.js';
import { MEGA_INDUSTRIAL_SECTORS, DECISION_MAKER_MATRIX } from '../data/industrial-playbook.js';
import { SEO_KEYWORD_CLUSTERS } from '../utils/seo-geo.js';
import { openProposalA4Modal } from '../utils/pdf-proposal.js';
import { showNotification, showConfirmModal } from '../components/notification.js';
import { escapeHtml, escapeAttr, renderSafeHtml } from '../utils/security.js';

const CRM_INBOX_STAGES = ['Yeni Talep', 'İlk Görüşme', 'İhtiyaç Analizi'];
const CRM_STALE_DAYS = 3;
const ORDER_PREP_STATUSES = ['Sipariş Alındı', 'Hazırlanıyor'];
const FIELD_PROJECT_STAGES = ['Keşif', 'Uygulama & Montaj', 'Devreye Alma'];

function recordIso(item) {
  return item?.createdAtIso || item?.updatedAtIso || '';
}

function recordTimeMs(iso) {
  if (!iso) return null;
  const time = new Date(iso).getTime();
  return Number.isFinite(time) ? time : null;
}

function splitDated(arr, cutoffMs) {
  if (!cutoffMs) return { included: arr, undated: 0 };
  const included = [];
  let undated = 0;
  for (const item of arr) {
    const time = recordTimeMs(recordIso(item));
    if (time === null) undated += 1;
    else if (time >= cutoffMs) included.push(item);
  }
  return { included, undated };
}

function isStaleOpenCrm(req, nowMs) {
  if ((req.resolutionStatus || 'active') !== 'active') return false;
  if (req.stage === 'Tamamlandı') return false;
  const time = recordTimeMs(recordIso(req));
  if (time === null) return false;
  return nowMs - time >= CRM_STALE_DAYS * 86400000;
}

function tryMoney(amount) {
  return `₺${Number(amount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
}

const ADMIN_MODULES = [
  { id: 'dashboard', label: '1. Genel Bakış', badgeKey: 'crm' },
  { id: 'crm', label: '2. Müşteri & Talep (CRM)', badgeKey: 'crm' },
  { id: 'products', label: '3. Kimyasal Ürünler', badgeKey: 'products' },
  { id: 'documents', label: '4. Teknik Belge Merkezi', badgeKey: 'documents' },
  { id: 'projects', label: '5. Su Arıtma Projeleri', badgeKey: 'projects' },
  { id: 'proposals', label: '6. Maliyet & PDF Teklif', badgeKey: 'proposals' },
  { id: 'orders', label: '7. Sipariş, Stok & Tedarik', badgeKey: 'orders' },
  { id: 'accounting', label: '8. Gelişmiş Muhasebe & Finans', badgeKey: 'accounting' },
  { id: 'service', label: '9. Servis & Bakım', badgeKey: 'service' },
  { id: 'settings', label: '10. Sistem, SEO/GEO & Roller', badgeKey: null }
];

export function renderAdminPage(container, navigate) {
  let currentUser = null;
  let currentProfile = null;
  let activeModule = 'dashboard';
  let store = null;
  let dashboardDateDays = 0; // 0 = Tümü
  let dashboardInboxTab = 'all'; // 'all' | 'orders_quotes' | 'contacts' | 'unread'
  let dashboardInboxSearch = '';
  let lastSyncedTimeStr = '';
  let isSyncingStore = false;
  let lastInboxSignature = '';
  let dashPreset = null;
  let dashScrollOnce = false;
  let crmFocusId = '';
  let ordersListFocus = 'all';
  let proposalListFocus = 'all';
  let projectListFocus = 'all';
  let serviceListFocus = 'all';
  let unsubscribeInbox = null;
  let crmViewMode = 'table'; // 'table' | 'kanban' | 'customers' | 'playbook'
  let crmFilterStage = 'all';
  let crmFilterRes = 'active';
  let crmSearchQuery = '';
  let crmChannelFilter = 'all';
  let pendingProposalSeed = null;
  let accountingTab = 'overview'; // 'overview' | 'invoices' | 'cashbank' | 'cheques' | 'ledger'
  let accountingInvoiceFilter = 'all'; // 'all' | 'SATIS' | 'ALIS' | 'OVERDUE'

  function computeCrmSignature(list) {
    if (!Array.isArray(list)) return '';
    return list
      .map((r) => `${r.id}:${r.stage || ''}:${r.resolutionStatus || 'active'}:${r.updatedAtIso || r.createdAtIso || ''}`)
      .join('|');
  }

  function getModuleBadgeCounts() {
    return {
      crm: store ? store.crmRequests.filter((r) => (r.resolutionStatus || 'active') === 'active').length : 0,
      products: store ? store.products.length : 0,
      documents: store ? store.documents.length : 0,
      projects: store ? store.projects.length : 0,
      proposals: store ? store.proposals.length : 0,
      orders: store ? store.orders.length : 0,
      accounting: store ? (store.accountingInvoices?.length || 0) + (store.chequesAndNotes?.length || 0) : 0,
      service: store ? store.serviceRecords.length : 0
    };
  }

  function syncShellChrome() {
    const counts = getModuleBadgeCounts();
    container.querySelectorAll('.admin-nav-btn').forEach((btn) => {
      const modId = btn.getAttribute('data-module');
      btn.classList.toggle('active', modId === activeModule);
      const badgeEl = btn.querySelector('.admin-nav-badge[data-badge-key]');
      if (badgeEl) {
        const key = badgeEl.getAttribute('data-badge-key');
        badgeEl.textContent = String(counts[key] || 0);
      }
    });
    const refreshBtn = container.querySelector('#admin-refresh-btn');
    if (refreshBtn) {
      refreshBtn.disabled = isSyncingStore;
      refreshBtn.textContent = isSyncingStore ? 'Senkronize Ediliyor...' : '↻ Verileri Yenile';
    }
    const syncMetaEl = container.querySelector('#admin-sync-status');
    if (syncMetaEl) {
      syncMetaEl.textContent = isSyncingStore
        ? 'Canlı veritabanı senkronize ediliyor...'
        : (lastSyncedTimeStr ? `Son senkron: ${lastSyncedTimeStr} (Canlı)` : 'Canlı bağlantı aktif');
    }
  }

  function upsertCrmRequestInStore(updatedRecord) {
    if (!store || !updatedRecord || !updatedRecord.id) return;
    const list = Array.isArray(store.crmRequests) ? [...store.crmRequests] : [];
    const idx = list.findIndex((r) => r.id === updatedRecord.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...updatedRecord };
    } else {
      list.unshift(updatedRecord);
    }
    list.sort((a, b) => new Date(b.createdAtIso || 0).getTime() - new Date(a.createdAtIso || 0).getTime());
    store.crmRequests = list;
    lastInboxSignature = computeCrmSignature(store.crmRequests);
    lastSyncedTimeStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    syncShellChrome();
  }

  function getInboundChannelMeta(req) {
    const ch = String(req?.formChannel || '').toLowerCase();
    const rt = String(req?.requestType || '').toLowerCase();
    const src = String(req?.source || '').toLowerCase();
    if (ch === 'order_form' || rt === 'order_request' || rt.includes('siparis') || rt.includes('sipariş')) {
      return { code: 'order', label: '🛒 SİPARİŞ FORMU', badgeClass: 'badge-teal', isOrderOrQuote: true };
    }
    if (ch === 'quote_form' || src === 'website_rfq' || rt.includes('quote') || rt === 'water_project' || rt === 'technical_visit' || rt === 'periodic_supply') {
      return { code: 'quote', label: '📋 TEKLİF & PROJE FORMU', badgeClass: 'badge-teal', isOrderOrQuote: true };
    }
    if (ch === 'callback_form' || rt === 'callback_30min' || src === 'website_callback') {
      return { code: 'callback', label: '📞 30 DK GERİ ARAMA', badgeClass: 'badge-amber', isOrderOrQuote: false };
    }
    if (ch === 'contact_form' || rt === 'general_contact' || src === 'website_contact') {
      return { code: 'contact', label: '📩 İLETİŞİM FORMU MESAJI', badgeClass: 'badge-amber', isOrderOrQuote: false };
    }
    return { code: 'crm', label: '📌 CRM / TİCARİ TALEP', badgeClass: 'badge-neutral', isOrderOrQuote: true };
  }

  function renderAuthScreen() {
    const html = `
      <section class="admin-auth-wrapper">
        <div class="admin-auth-card card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <span class="section-tag">Elif Kimya Yönetim Sistemi</span>
            <span class="badge badge-teal">DB: ${escapeHtml(DATABASE_ID)}</span>
          </div>
          <h2>Kurumsal Yönetim Paneli Girişi</h2>
          <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1.5rem;">
            Bu alan yalnızca yetkili Elif Kimya personeli (Süperadmin, Satış, Teknik Ekip, Depo) içindir. Tüm işlemler sunucu zaman damgasıyla denetim günlüğüne kaydedilir.
          </p>
          <form id="admin-login-form">
            <div class="form-group">
              <label class="form-label">Kurumsal E-posta</label>
              <input type="email" name="email" class="form-input" required placeholder="info@elifcevrekimya.com.tr" />
            </div>
            <div class="form-group">
              <label class="form-label">Şifre</label>
              <input type="password" name="password" class="form-input" required placeholder="••••••••" />
            </div>
            <button type="submit" class="btn btn-primary" id="admin-login-btn" style="width:100%;margin-bottom:0.75rem;">
              Yönetim Paneline Giriş Yap
            </button>
            <button type="button" class="btn btn-secondary" id="admin-google-btn" style="width:100%;">
              Google Kurumsal Hesap ile Giriş Yap
            </button>
          </form>
          <div style="margin-top:1.25rem;text-align:center;">
            <a href="/" data-nav style="font-size:0.86rem;color:var(--text-secondary);">← Web Sitesine Dön</a>
          </div>
        </div>
      </section>
    `;
    renderSafeHtml(container, html);

    container.querySelector('[data-nav]')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigate('/');
    });

    const form = container.querySelector('#admin-login-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = container.querySelector('#admin-login-btn');
      const fd = new FormData(form);
      try {
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Doğrulanıyor...';
        }
        await loginWithEmail(String(fd.get('email') || ''), String(fd.get('password') || ''));
        showNotification('Yönetim oturumu açıldı.', 'success');
      } catch (err) {
        showNotification(err.message || 'Giriş başarısız.', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Yönetim Paneline Giriş Yap';
        }
      }
    });

    container.querySelector('#admin-google-btn')?.addEventListener('click', async () => {
      try {
        await loginWithGoogle();
        showNotification('Google hesabı ile oturum açıldı.', 'success');
      } catch (err) {
        showNotification(err.message || 'Google ile giriş yapılamadı.', 'error');
      }
    });
  }

  async function refreshStoreAndRender() {
    if (isSyncingStore) return;
    isSyncingStore = true;
    syncShellChrome();
    const mainArea = container.querySelector('#admin-module-content');
    if (mainArea && !store) {
      renderSafeHtml(mainArea, `<div class="loading-banner">İzole <strong>${escapeHtml(DATABASE_ID)}</strong> veritabanından gerçek kayıtlar yükleniyor...</div>`);
    }
    try {
      store = await loadAdminAllData();
      lastInboxSignature = computeCrmSignature(store?.crmRequests);
      lastSyncedTimeStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      isSyncingStore = false;
      renderShell();
    } catch (err) {
      isSyncingStore = false;
      syncShellChrome();
      showNotification(err.message || 'Veriler yüklenirken hata oluştu.', 'error');
    }
  }

  function renderShell() {
    if (!currentUser || !currentProfile) {
      renderAuthScreen();
      return;
    }

    if (!hasPermission(currentProfile.role, 'view_admin')) {
      renderSafeHtml(container, `
        <section class="section">
          <div class="container">
            <div class="empty-state-box">
              <h3>Yönetim Paneli Yetkisi Bulunmuyor</h3>
              <p>Oturum açtığınız hesap (<strong>${escapeHtml(currentUser.email || '')}</strong>) <code>${escapeHtml(currentProfile.role)}</code> rolündedir. Müşteri teklif ve siparişlerinizi görüntülemek için Müşteri Portalını kullanabilirsiniz.</p>
              <div style="margin-top:1rem;display:flex;gap:0.75rem;justify-content:center;">
                <a href="/portal" class="btn btn-primary" id="go-portal-btn">Müşteri Portalına Git</a>
                <button type="button" class="btn btn-secondary" id="unauth-logout-btn">Çıkış Yap</button>
              </div>
            </div>
          </div>
        </section>
      `);
      container.querySelector('#go-portal-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/portal');
      });
      container.querySelector('#unauth-logout-btn')?.addEventListener('click', async () => {
        await logoutCurrentUser();
      });
      return;
    }

    const shellKey = `${currentUser.uid || currentUser.email}:${currentProfile.role}`;
    const existingShell = container.querySelector('.admin-layout');
    if (!existingShell || existingShell.getAttribute('data-shell-key') !== shellKey) {
      const counts = getModuleBadgeCounts();
      const shellHtml = `
        <div class="admin-layout" data-shell-key="${escapeAttr(shellKey)}">
          <!-- Sol Menü -->
          <aside class="admin-sidebar">
            <div class="admin-sidebar-brand">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <strong>ELİF KİMYA ERP</strong>
                <span class="badge badge-teal">DB: ${escapeHtml(DATABASE_ID)}</span>
              </div>
              <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.35rem;">
                ${escapeHtml(currentProfile.displayName || currentUser.email)} — <strong>${escapeHtml(ROLE_LABELS[currentProfile.role] || currentProfile.role)}</strong>
              </div>
              <div id="admin-sync-status" class="admin-sync-meta">
                ${escapeHtml(lastSyncedTimeStr ? `Son senkron: ${lastSyncedTimeStr} (Canlı)` : 'Canlı bağlantı aktif')}
              </div>
            </div>

            <nav class="admin-nav-list">
              ${ADMIN_MODULES.map((m) => `
                <button type="button" class="admin-nav-btn ${activeModule === m.id ? 'active' : ''}" data-module="${escapeAttr(m.id)}">
                  <span>${escapeHtml(m.label)}</span>
                  ${m.badgeKey ? `<span class="admin-nav-badge" data-badge-key="${escapeAttr(m.badgeKey)}">${counts[m.badgeKey] || 0}</span>` : ''}
                </button>
              `).join('')}
            </nav>

            <div class="admin-sidebar-footer">
              <button type="button" class="btn btn-secondary btn-sm" id="admin-refresh-btn" style="width:100%;margin-bottom:0.5rem;">
                ↻ Verileri Yenile
              </button>
              <div style="display:flex;gap:0.5rem;">
                <a href="/" class="btn btn-secondary btn-sm" id="admin-home-btn" style="flex:1;text-align:center;">Siteyi Aç</a>
                <button type="button" class="btn btn-secondary btn-sm" id="admin-logout-btn" style="flex:1;">Çıkış</button>
              </div>
            </div>
          </aside>

          <!-- Sağ İçerik Alanı -->
          <div class="admin-main">
            <div id="admin-module-content"></div>
          </div>
        </div>
      `;

      renderSafeHtml(container, shellHtml);

      container.querySelectorAll('.admin-nav-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          clearDashPreset();
          activeModule = btn.getAttribute('data-module') || 'dashboard';
          renderShell();
        });
      });

      container.querySelector('#admin-refresh-btn')?.addEventListener('click', refreshStoreAndRender);
      container.querySelector('#admin-home-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/');
      });
      container.querySelector('#admin-logout-btn')?.addEventListener('click', async () => {
        await logoutCurrentUser();
      });
    } else {
      syncShellChrome();
    }

    const contentBox = container.querySelector('#admin-module-content');
    if (!store) {
      renderSafeHtml(contentBox, `<div class="loading-banner">Sunucu verileri yükleniyor...</div>`);
      return;
    }

    switch (activeModule) {
      case 'dashboard':
        renderDashboardModule(contentBox);
        break;
      case 'crm':
        renderCrmModule(contentBox);
        break;
      case 'products':
        renderProductsModule(contentBox);
        break;
      case 'documents':
        renderDocumentsModule(contentBox);
        break;
      case 'projects':
        renderProjectsModule(contentBox);
        break;
      case 'proposals':
        renderProposalsModule(contentBox);
        break;
      case 'orders':
        renderOrdersModule(contentBox);
        break;
      case 'accounting':
        renderAccountingModule(contentBox);
        break;
      case 'service':
        renderServiceModule(contentBox);
        break;
      case 'settings':
        renderSettingsModule(contentBox);
        break;
      default:
        renderDashboardModule(contentBox);
    }

    if (dashScrollOnce) {
      dashScrollOnce = false;
      const anchor = dashPreset?.anchor;
      if (anchor) container.querySelector(anchor)?.scrollIntoView({ block: 'start' });
    }
  }

  function clearDashPreset() {
    if (dashPreset?.crmFilterStage) crmFilterStage = 'all';
    if (dashPreset?.crmFilterRes) crmFilterRes = 'active';
    if (dashPreset && Object.prototype.hasOwnProperty.call(dashPreset, 'crmSearchQuery')) crmSearchQuery = '';
    if (dashPreset?.crmChannelFilter) crmChannelFilter = 'all';
    crmFocusId = '';
    ordersListFocus = 'all';
    proposalListFocus = 'all';
    projectListFocus = 'all';
    serviceListFocus = 'all';
    if (dashPreset?.accountingTab) accountingTab = 'overview';
    if (dashPreset?.accountingInvoiceFilter) accountingInvoiceFilter = 'all';
    dashPreset = null;
  }

  function applyDashPreset(preset) {
    clearDashPreset();
    dashPreset = preset;
    if (preset.crmFilterStage) crmFilterStage = preset.crmFilterStage;
    if (preset.crmFilterRes) crmFilterRes = preset.crmFilterRes;
    if (preset.crmViewMode) crmViewMode = preset.crmViewMode;
    if (Object.prototype.hasOwnProperty.call(preset, 'crmSearchQuery')) crmSearchQuery = preset.crmSearchQuery;
    if (preset.crmChannelFilter) crmChannelFilter = preset.crmChannelFilter;
    crmFocusId = preset.crmFocusId || '';
    if (preset.ordersListFocus) ordersListFocus = preset.ordersListFocus;
    if (preset.proposalListFocus) proposalListFocus = preset.proposalListFocus;
    if (preset.projectListFocus) projectListFocus = preset.projectListFocus;
    if (preset.serviceListFocus) serviceListFocus = preset.serviceListFocus;
    if (preset.accountingTab) accountingTab = preset.accountingTab;
    if (preset.accountingInvoiceFilter) accountingInvoiceFilter = preset.accountingInvoiceFilter;
    dashScrollOnce = Boolean(preset.anchor);
    activeModule = preset.module;
    renderShell();
  }

  function focusBannerHtml() {
    if (!dashPreset?.label || dashPreset.module !== activeModule) return '';
    return `
      <div class="dash-focus-banner">
        <span>${escapeHtml(dashPreset.label)}</span>
        <button type="button" class="btn btn-secondary btn-sm" data-clear-dash-focus>Filtreyi kaldır</button>
      </div>
    `;
  }

  function bindFocusBanner(box, rerender) {
    box.querySelector('[data-clear-dash-focus]')?.addEventListener('click', () => {
      clearDashPreset();
      rerender();
    });
  }

  /* ========================================================================
     MODÜL 1: GENEL BAKIŞ (DASHBOARD)
     ======================================================================== */
  function renderDashboardModule(box) {
    const nowMs = Date.now();
    const cutoffMs = dashboardDateDays > 0 ? nowMs - dashboardDateDays * 86400000 : 0;

    const crmSplit = splitDated(store.crmRequests, cutoffMs);
    const propSplit = splitDated(store.proposals, cutoffMs);
    const ordSplit = splitDated(store.orders, cutoffMs);
    const projSplit = splitDated(store.projects, cutoffMs);
    const srvSplit = splitDated(store.serviceRecords, cutoffMs);
    const invSplit = splitDated(store.accountingInvoices || [], cutoffMs);
    const trxSplit = splitDated(store.accountingTransactions || [], cutoffMs);
    const chqSplit = splitDated(store.chequesAndNotes || [], cutoffMs);
    const crmList = crmSplit.included;
    const propList = propSplit.included;
    const ordList = ordSplit.included;
    const projList = projSplit.included;
    const srvList = srvSplit.included;
    const invList = invSplit.included;
    const trxList = trxSplit.included;
    const chqList = chqSplit.included;
    const undatedCount = crmSplit.undated + propSplit.undated + ordSplit.undated + projSplit.undated + srvSplit.undated + invSplit.undated + trxSplit.undated + chqSplit.undated;
    const periodNote = (undated) => (cutoffMs && undated ? ` · tarihi olmayan ${undated} kayıt dışında` : '');

    const newPendingRequests = crmList.filter((r) => (r.resolutionStatus || 'active') === 'active' && ['Yeni Talep', 'İlk Görüşme', 'İhtiyaç Analizi'].includes(r.stage));
    const activeProposals = propList.filter((p) => ['draft', 'sent', 'revised', 'approved'].includes(p.status));
    const confirmedOrders = ordList.filter((o) => o.status !== 'İptal');
    const ongoingProjects = projList.filter((p) => p.stage !== 'Bakım / Tamamlandı');
    const plannedServices = srvList.filter((s) => s.status !== 'Tamamlandı');
    const activeProductsCount = store.products.filter((p) => p.published === true).length;

    const initializedInventory = store.inventoryItems.filter((i) => i.stockInitialized === true);
    const criticalStockItems = initializedInventory.filter((i) => Number(i.currentStock || 0) <= Number(i.minThreshold || 0));

    // Finansal Hesaplamalar (Teklif Hacmi vs Onaylanan Sipariş vs Tahsilat ayrı!)
    const totalQuoteVolumeTry = activeProposals.reduce((sum, p) => sum + Number(p.netExclVat || 0), 0);
    const totalApprovedOrdersTry = confirmedOrders.reduce((sum, o) => sum + Number(o.grandTotal || 0), 0);
    const totalCollectedOrdersTry = confirmedOrders.reduce((sum, o) => sum + Number(o.collectedAmount || 0), 0);

    // Muhasebe Modülü Gerçek Verileri
    const salesInvoicesTry = invList.filter((i) => i.invoiceType === 'SATIS').reduce((s, i) => s + Number(i.grandTotalTry || 0), 0);
    const purchaseInvoicesTry = invList.filter((i) => i.invoiceType === 'ALIS').reduce((s, i) => s + Number(i.grandTotalTry || 0), 0);
    const cashInTry = trxList.filter((t) => t.direction === 'TAHSILAT').reduce((s, t) => s + Number(t.amountTry || 0), 0);
    const cashOutTry = trxList.filter((t) => t.direction !== 'TAHSILAT').reduce((s, t) => s + Number(t.amountTry || 0), 0);
    const portfolioChequesTry = chqList.filter((c) => String(c.instrumentType || '').startsWith('MUSTERI') && c.status === 'Portföyde').reduce((s, c) => s + Number(c.amountTry || 0), 0);
    const todayIso = new Date().toISOString().slice(0, 10);
    const overdueSales = (store.accountingInvoices || []).filter((i) => i.invoiceType === 'SATIS' && Number(i.remainingAmountTry || 0) > 0 && i.dueDate && i.dueDate < todayIso);
    const overdueTry = overdueSales.reduce((sum, i) => sum + Number(i.remainingAmountTry || 0), 0);

    // Gelen Kutusu (Sipariş Formu vs İletişim Formu ayrımı)
    const orderAndQuoteInbox = crmList.filter((r) => getInboundChannelMeta(r).isOrderOrQuote);
    const contactAndCallbackInbox = crmList.filter((r) => !getInboundChannelMeta(r).isOrderOrQuote);
    const unreadInbox = crmList.filter((r) => (r.resolutionStatus || 'active') === 'active' && r.stage === 'Yeni Talep');

    function getFilteredDashboardInboxItems() {
      const q = String(dashboardInboxSearch || '').trim().toLowerCase();
      return crmList.filter((r) => {
        if (dashboardInboxTab === 'orders_quotes' && !getInboundChannelMeta(r).isOrderOrQuote) return false;
        if (dashboardInboxTab === 'contacts' && getInboundChannelMeta(r).isOrderOrQuote) return false;
        if (dashboardInboxTab === 'unread' && !((r.resolutionStatus || 'active') === 'active' && r.stage === 'Yeni Talep')) return false;
        if (q) {
          const hay = `${r.companyName || ''} ${r.contactName || ''} ${r.phone || ''} ${r.email || ''} ${r.cityCountry || ''} ${r.relatedProductOrSystem || ''} ${r.subject || ''} ${r.description || ''} ${r.message || ''} ${r.requestedAmount || ''}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
    }

    // Aşama dağılımı (Grafik verisi)
    const stageCounts = CRM_STAGES.map((st) => ({
      stage: st,
      count: crmList.filter((r) => (r.resolutionStatus || 'active') === 'active' && r.stage === st).length
    }));
    const maxStageCount = Math.max(...stageCounts.map((s) => s.count), 1);
    const role = currentProfile.role;
    const showSalesWork = role === ROLES.SUPERADMIN || role === ROLES.VIEWER || role === ROLES.SALES;
    const showWarehouseWork = role === ROLES.SUPERADMIN || role === ROLES.VIEWER || role === ROLES.WAREHOUSE;
    const showTechnicalWork = role === ROLES.SUPERADMIN || role === ROLES.VIEWER || role === ROLES.TECHNICAL;
    const staleCrm = store.crmRequests
      .filter((req) => isStaleOpenCrm(req, nowMs))
      .sort((a, b) => (recordTimeMs(recordIso(a)) || 0) - (recordTimeMs(recordIso(b)) || 0));
    const undatedOpenCrm = store.crmRequests.filter((req) => (req.resolutionStatus || 'active') === 'active' && req.stage !== 'Tamamlandı' && !recordIso(req)).length;
    const sentProposals = store.proposals.filter((p) => p.status === 'sent');
    const prepOrders = store.orders.filter((o) => ORDER_PREP_STATUSES.includes(o.status));
    const fieldProjects = store.projects.filter((prj) => FIELD_PROJECT_STAGES.includes(prj.stage));
    const openServices = store.serviceRecords
      .filter((s) => s.status !== 'Tamamlandı')
      .sort((a, b) => String(a.nextServiceDate || '9999-99-99').localeCompare(String(b.nextServiceDate || '9999-99-99')));
    const recentCrm = [...crmList].sort((a, b) => (recordTimeMs(recordIso(b)) || 0) - (recordTimeMs(recordIso(a)) || 0)).slice(0, 6);
    const jumps = [];
    const jump = (preset) => {
      const id = String(jumps.length);
      jumps.push(preset);
      return id;
    };

    const html = `
      <div class="admin-module-header">
        <div>
          <h2>1. Genel Bakış: Canlı Sipariş & İletişim Gelen Kutusu ve Operasyon Özeti</h2>
          <p>Web sitesindeki <strong>Sipariş & Teklif Formu (<code>/teklif-al</code>)</strong>, <strong>İletişim Formu (<code>/iletisim</code>)</strong> ve <strong>Sizi Arayalım</strong> formlarından gelen tüm mesajlar anlık olarak bu ekrana düşer.${cutoffMs && undatedCount ? ` Tarih filtresi, tarihi olmayan <strong>${undatedCount}</strong> kaydı dışarıda bırakır.` : ''}</p>
        </div>
        <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
          <button type="button" class="btn btn-secondary btn-sm" id="dash-go-crm-btn">📥 2. Tüm CRM & Talepler (${crmList.length})</button>
          <button type="button" class="btn btn-primary btn-sm" id="dash-go-accounting-btn">📊 8. Gelişmiş Muhasebe & Finans'ı Aç</button>
          <label style="font-size:0.85rem;font-weight:600;">Tarih Filtresi:</label>
          <select id="dash-date-filter" class="form-select" style="width:auto;">
            <option value="0" ${dashboardDateDays === 0 ? 'selected' : ''}>Tüm Zamanlar</option>
            <option value="7" ${dashboardDateDays === 7 ? 'selected' : ''}>Son 7 Gün</option>
            <option value="30" ${dashboardDateDays === 30 ? 'selected' : ''}>Son 30 Gün</option>
            <option value="90" ${dashboardDateDays === 90 ? 'selected' : ''}>Son 90 Gün</option>
            <option value="365" ${dashboardDateDays === 365 ? 'selected' : ''}>Son 1 Yıl</option>
          </select>
        </div>
      </div>

      <!-- 8 Operasyonel KPI Kartı -->
      <div class="admin-kpi-grid">
        <button type="button" class="admin-kpi-card ${unreadInbox.length > 0 ? 'kpi-alert' : ''}" data-inbox-jump="orders_quotes">
          <span class="kpi-title">Gelen Sipariş & Teklif Formları</span>
          <strong class="kpi-num">${orderAndQuoteInbox.length}</strong>
          <span class="kpi-sub">${unreadInbox.length > 0 ? `🔴 ${unreadInbox.length} yeni yanıt bekliyor` : `${newPendingRequests.length} açık ön görüşmede`}${periodNote(crmSplit.undated)}</span>
        </button>
        <button type="button" class="admin-kpi-card" data-inbox-jump="contacts">
          <span class="kpi-title">Gelen İletişim & Geri Arama Mesajları</span>
          <strong class="kpi-num">${contactAndCallbackInbox.length}</strong>
          <span class="kpi-sub">İletişim sayfası ve 30 dk geri arama${periodNote(crmSplit.undated)}</span>
        </button>
        <button type="button" class="admin-kpi-card" data-jump="${jump({ module: 'proposals', label: 'Hazırlanan ve gönderilen teklifler', proposalListFocus: 'pipeline', anchor: '#proposals-table-anchor' })}">
          <span class="kpi-title">Hazırlanan & Gönderilen Teklifler</span>
          <strong class="kpi-num">${activeProposals.length}</strong>
          <span class="kpi-sub">${propList.filter((p) => p.status === 'sent').length} gönderildi, ${propList.filter((p) => p.status === 'draft').length} taslak${periodNote(propSplit.undated)}</span>
        </button>
        <button type="button" class="admin-kpi-card" data-jump="${jump({ module: 'orders', label: 'Onaylanan siparişler (iptal hariç)', ordersListFocus: 'confirmed', anchor: '#orders-table-anchor' })}">
          <span class="kpi-title">Onaylanan Kesin Siparişler</span>
          <strong class="kpi-num">${confirmedOrders.length}</strong>
          <span class="kpi-sub">Yalnızca onaylı sipariş kayıtları${periodNote(ordSplit.undated)}</span>
        </button>
        <button type="button" class="admin-kpi-card" data-jump="${jump({ module: 'projects', label: 'Devam eden su arıtma projeleri', projectListFocus: 'ongoing', anchor: '#projects-table-anchor' })}">
          <span class="kpi-title">Devam Eden Su Arıtma Projeleri</span>
          <strong class="kpi-num">${ongoingProjects.length}</strong>
          <span class="kpi-sub">Keşif, projelendirme ve montaj${periodNote(projSplit.undated)}</span>
        </button>
        <button type="button" class="admin-kpi-card" data-jump="${jump({ module: 'service', label: 'Tamamlanmamış servis ve bakım', serviceListFocus: 'open', anchor: '#service-table-anchor' })}">
          <span class="kpi-title">Planlanan Servis & Bakım</span>
          <strong class="kpi-num">${plannedServices.length}</strong>
          <span class="kpi-sub">Periyodik bakım ve iş emirleri${periodNote(srvSplit.undated)}</span>
        </button>
        <button type="button" class="admin-kpi-card" data-jump="${jump({ module: 'products', label: '' })}">
          <span class="kpi-title">Yayımlanmış Aktif Ürünler</span>
          <strong class="kpi-num">${activeProductsCount}</strong>
          <span class="kpi-sub">Toplam ${store.products.length} ürün kartı · tarih filtresinden bağımsız</span>
        </button>
        <button type="button" class="admin-kpi-card ${criticalStockItems.length > 0 ? 'kpi-warn' : ''}" data-jump="${jump({ module: 'orders', label: 'Sayımı girilmiş ve eşiğin altındaki stok', ordersListFocus: 'critical', anchor: '#inventory-table-anchor' })}">
          <span class="kpi-title">Kritik Stok Uyarıları</span>
          <strong class="kpi-num">${initializedInventory.length === 0 ? '—' : criticalStockItems.length}</strong>
          <span class="kpi-sub">${initializedInventory.length === 0 ? 'Stok sayımı henüz girilmedi' : `${initializedInventory.length} stok kalemi izleniyor`} · tarih filtresinden bağımsız</span>
        </button>
      </div>

      <!-- CANLI GELEN KUTUSU: SİPARİŞ FORMLARI & İLETİŞİM MESAJLARI -->
      <div class="card" id="dash-inbox" style="margin-top:1.5rem;padding:1.5rem;border:2px solid var(--accent-teal);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;margin-bottom:1rem;">
          <div>
            <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.25rem;flex-wrap:wrap;">
              <span class="badge badge-teal">CANLI AKIŞ (GERÇEK ZAMANLI)</span>
              <span style="font-size:0.8rem;color:var(--text-muted);">DB: <code>${escapeHtml(DATABASE_ID)}/crmRequests</code></span>
              ${lastSyncedTimeStr ? `<span style="font-size:0.78rem;color:var(--text-muted);">• Son senkron: ${escapeHtml(lastSyncedTimeStr)}</span>` : ''}
            </div>
            <h3 style="margin:0;">📥 Web Sitesi Gelen Kutusu: Sipariş Formları & İletişim Mesajları</h3>
            <p style="font-size:0.86rem;color:var(--text-secondary);margin-top:0.2rem;">
              İletişim formu, 30 dakikada geri arama formu ve sipariş/teklif formlarından gönderilen tüm mesajların tam metni, miktarı ve iletişim bilgileri aşağıdadır.
            </p>
          </div>
          <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
            <button type="button" class="btn ${dashboardInboxTab === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm dash-inbox-tab" data-tab="all">
              Tümü (${crmList.length})
            </button>
            <button type="button" class="btn ${dashboardInboxTab === 'orders_quotes' ? 'btn-primary' : 'btn-secondary'} btn-sm dash-inbox-tab" data-tab="orders_quotes">
              🛒 Sipariş & Teklif Formları (${orderAndQuoteInbox.length})
            </button>
            <button type="button" class="btn ${dashboardInboxTab === 'contacts' ? 'btn-primary' : 'btn-secondary'} btn-sm dash-inbox-tab" data-tab="contacts">
              📩 İletişim & Geri Arama Mesajları (${contactAndCallbackInbox.length})
            </button>
            <button type="button" class="btn ${dashboardInboxTab === 'unread' ? 'btn-primary' : 'btn-secondary'} btn-sm dash-inbox-tab" data-tab="unread">
              🔴 Yeni / Yanıt Bekleyen (${unreadInbox.length})
            </button>
          </div>
        </div>

        <div class="dash-inbox-toolbar" style="margin-bottom:1rem;display:flex;gap:0.6rem;align-items:center;flex-wrap:wrap;">
          <input
            type="search"
            id="dash-inbox-search-input"
            class="form-input"
            style="max-width:380px;flex:1;"
            value="${escapeAttr(dashboardInboxSearch)}"
            placeholder="Gelen kutusunda firma, yetkili, telefon, ürün veya mesaj ara..."
          />
          <button type="button" class="btn btn-secondary btn-sm" id="dash-inbox-clear-search" style="${dashboardInboxSearch ? '' : 'display:none;'}">
            Aramayı Temizle
          </button>
        </div>

        <div id="dash-inbox-list-region"></div>
      </div>

      <!-- Finansal Ayrım Barı (Teklif Hacmi vs Onaylanan Sipariş vs Muhasebe & Kasa) -->
      <div class="financial-split-grid" style="margin-top:1.5rem;">
        <button type="button" class="financial-split-card" data-jump="${jump({ module: 'proposals', label: 'Teklif hacmi: taslak, gönderilmiş, revize ve onaylı', proposalListFocus: 'pipeline', anchor: '#proposals-table-anchor' })}">
          <span class="badge badge-neutral">1. Teklif Hacmi (KDV Hariç Net)</span>
          <h3>${tryMoney(totalQuoteVolumeTry)}</h3>
          <p>Hazırlanan ve müşteriye sunulan tekliflerin toplam hacmi. Bu tutar satış değildir.</p>
        </button>
        <div class="financial-split-card">
          <span class="badge badge-teal">2. Sipariş ve fatura, ayrı defter</span>
          <button type="button" class="dash-money-row" data-jump="${jump({ module: 'orders', label: 'Onaylanan siparişler (iptal hariç)', ordersListFocus: 'confirmed', anchor: '#orders-table-anchor' })}">
            <span>Onaylanan sipariş</span><strong>${tryMoney(totalApprovedOrdersTry)}</strong>
          </button>
          <button type="button" class="dash-money-row" data-jump="${jump({ module: 'accounting', label: 'Satış faturaları', accountingTab: 'invoices', accountingInvoiceFilter: 'SATIS', anchor: '#accounting-invoices-anchor' })}">
            <span>Satış faturası</span><strong>${tryMoney(salesInvoicesTry)}</strong>
          </button>
          <button type="button" class="dash-money-row" data-jump="${jump({ module: 'accounting', label: 'Alış faturaları', accountingTab: 'invoices', accountingInvoiceFilter: 'ALIS', anchor: '#accounting-invoices-anchor' })}">
            <span>Alış faturası</span><strong>${tryMoney(purchaseInvoicesTry)}</strong>
          </button>
        </div>
        <div class="financial-split-card">
          <span class="badge badge-teal">3. Tahsilat, kasa ve vadesi geçen alacak</span>
          <button type="button" class="dash-money-row" data-jump="${jump({ module: 'accounting', label: `Vadesi geçen ${overdueSales.length} satış faturası`, accountingTab: 'invoices', accountingInvoiceFilter: 'OVERDUE', anchor: '#accounting-invoices-anchor' })}">
            <span>Vadesi geçen alacak (tüm kayıtlar)</span><strong>${tryMoney(overdueTry)}</strong>
          </button>
          <button type="button" class="dash-money-row" data-jump="${jump({ module: 'orders', label: 'Tahsilatı girilmiş siparişler', ordersListFocus: 'collected', anchor: '#orders-table-anchor' })}">
            <span>Sipariş tahsilatı</span><strong>${tryMoney(totalCollectedOrdersTry)}</strong>
          </button>
          <button type="button" class="dash-money-row" data-jump="${jump({ module: 'accounting', label: 'Kasa ve banka hareketleri', accountingTab: 'cashbank', anchor: '#accounting-cash-anchor' })}">
            <span>Kasa/banka girişi</span><strong>${tryMoney(cashInTry)}</strong>
          </button>
          <button type="button" class="dash-money-row" data-jump="${jump({ module: 'accounting', label: 'Kasa ve banka hareketleri', accountingTab: 'cashbank', anchor: '#accounting-cash-anchor' })}">
            <span>Kasa/banka çıkışı</span><strong>${tryMoney(cashOutTry)}</strong>
          </button>
          <p>Portföy çek/senet tutarı tarih filtresine giren kayıtlardandır. Vadesi geçen alacak tüm faturalardan hesaplanır.</p>
          <button type="button" class="dash-money-row" data-jump="${jump({ module: 'accounting', label: 'Portföydeki müşteri çek ve senetleri', accountingTab: 'cheques', anchor: '#accounting-cheques-anchor' })}">
            <span>Portföy çek/senet</span><strong>${tryMoney(portfolioChequesTry)}</strong>
          </button>
        </div>
      </div>

      <div class="dash-work-grid">
        ${showSalesWork ? `
          <div class="card" style="padding:1.25rem;">
            <h3>Bugünkü iş — Satış</h3>
            <p class="kpi-sub">Tarih filtresinden bağımsız. Son hareketi ${CRM_STALE_DAYS} günü geçen açık talepler ve gönderilmiş teklifler.</p>
            ${undatedOpenCrm ? `<p class="kpi-sub">Tarihi olmayan ${undatedOpenCrm} açık talep yaş hesabına girmedi.</p>` : ''}
            ${staleCrm.length === 0 ? `<p class="kpi-sub">3 gündür bekleyen açık talep yok.</p>` : staleCrm.slice(0, 6).map((req) => `
              <button type="button" class="dash-work-item" data-jump="${jump({ module: 'crm', label: 'Seçilen talep', crmFocusId: req.id, crmFilterRes: 'all', crmFilterStage: 'all', crmViewMode: 'table', crmSearchQuery: '', anchor: '#crm-view-container' })}">
                <span><strong>${escapeHtml(req.companyName || 'İsimsiz')}</strong><br/><span class="kpi-sub">${escapeHtml(req.stage)} · ${escapeHtml(recordIso(req).slice(0, 10) || '-')}</span></span>
                <span class="badge badge-teal">Talep</span>
              </button>
            `).join('')}
            ${staleCrm.length > 6 ? `<button type="button" class="btn btn-secondary btn-sm" style="margin-top:0.6rem;" data-jump="${jump({ module: 'crm', label: '3 gündür aşaması duran açık talepler', crmFilterStage: '__stale', crmFilterRes: 'active', crmViewMode: 'table', crmSearchQuery: '', anchor: '#crm-view-container' })}">Tüm bekleyen talepler (${staleCrm.length})</button>` : ''}
            ${sentProposals.length === 0 ? `<p class="kpi-sub">Gönderilmiş ve onay bekleyen teklif yok.</p>` : sentProposals.slice(0, 4).map((p) => `
              <button type="button" class="dash-work-item" data-jump="${jump({ module: 'proposals', label: 'Gönderilmiş teklifler', proposalListFocus: 'sent', anchor: '#proposals-table-anchor' })}">
                <span><strong>${escapeHtml(p.proposalNo || 'Teklif')}</strong><br/><span class="kpi-sub">${escapeHtml(p.companyName || '')}</span></span>
                <span class="badge badge-neutral">Gönderildi</span>
              </button>
            `).join('')}
          </div>
        ` : ''}
        ${showWarehouseWork ? `
          <div class="card" style="padding:1.25rem;">
            <h3>Bugünkü iş — Depo</h3>
            <p class="kpi-sub">Tarih filtresinden bağımsız. Sayılmış kritik stok ve hazırlanacak siparişler.</p>
            ${initializedInventory.length === 0 ? `<p class="kpi-sub">Stok sayımı girilmediği için kritik liste boş.</p>` : criticalStockItems.length === 0 ? `<p class="kpi-sub">Eşiğin altında sayılmış stok yok.</p>` : `
              <button type="button" class="dash-work-item" data-jump="${jump({ module: 'orders', label: 'Sayımı girilmiş ve eşiğin altındaki stok', ordersListFocus: 'critical', anchor: '#inventory-table-anchor' })}">
                <span><strong>${criticalStockItems.length} kritik stok kalemi</strong><br/><span class="kpi-sub">${escapeHtml(criticalStockItems.slice(0, 2).map((it) => it.sku).join(', '))}</span></span>
                <span class="badge badge-neutral">Stok</span>
              </button>
            `}
            ${prepOrders.length === 0 ? `<p class="kpi-sub">Hazırlanacak sipariş yok.</p>` : prepOrders.slice(0, 6).map((o) => `
              <button type="button" class="dash-work-item" data-jump="${jump({ module: 'orders', label: 'Hazırlanacak siparişler', ordersListFocus: 'open', anchor: '#orders-table-anchor' })}">
                <span><strong>${escapeHtml(o.orderNo || 'Sipariş')}</strong><br/><span class="kpi-sub">${escapeHtml(o.companyName || '')} · ${escapeHtml(o.status || '')}</span></span>
                <span class="badge badge-teal">Sevkiyat</span>
              </button>
            `).join('')}
          </div>
        ` : ''}
        ${showTechnicalWork ? `
          <div class="card" style="padding:1.25rem;">
            <h3>Bugünkü iş — Teknik</h3>
            <p class="kpi-sub">Tarih filtresinden bağımsız. Keşif, montaj ve devreye alma projeleri ile açık servisler.</p>
            ${fieldProjects.length === 0 ? `<p class="kpi-sub">Keşif, montaj veya devreye alma aşamasında proje yok.</p>` : fieldProjects.slice(0, 6).map((prj) => `
              <button type="button" class="dash-work-item" data-jump="${jump({ module: 'projects', label: 'Keşif, montaj ve devreye alma', projectListFocus: 'field', anchor: '#projects-table-anchor' })}">
                <span><strong>${escapeHtml(prj.projectName || 'Proje')}</strong><br/><span class="kpi-sub">${escapeHtml(prj.companyName || '')} · ${escapeHtml(prj.stage || '')}</span></span>
                <span class="badge badge-teal">Proje</span>
              </button>
            `).join('')}
            ${openServices.length === 0 ? `<p class="kpi-sub">Tamamlanmamış servis yok.</p>` : openServices.slice(0, 4).map((s) => `
              <button type="button" class="dash-work-item" data-jump="${jump({ module: 'service', label: 'Tamamlanmamış servis ve bakım', serviceListFocus: 'open', anchor: '#service-table-anchor' })}">
                <span><strong>${escapeHtml(s.companyName || 'Servis')}</strong><br/><span class="kpi-sub">${escapeHtml(s.systemName || '')} · ${escapeHtml(s.nextServiceDate || 'tarih yok')}</span></span>
                <span class="badge badge-neutral">${escapeHtml(s.status || '')}</span>
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Gerçek Veri Grafiği & Son Kayıtlar -->
      <div class="admin-two-col" style="margin-top:1.75rem;">
        <div class="card" style="padding:1.5rem;">
          <h3 style="margin-bottom:0.75rem;">CRM Talep Hattı Dağılım Grafiği (Gerçek Kayıtlar)</h3>
          ${crmList.length === 0 ? `
            <div class="empty-state-box">
              <p>Henüz CRM talep kaydı bulunmuyor. Web sitesindeki formlardan veya CRM modülünden talep eklendiğinde aşama grafiği otomatik oluşturulur.</p>
            </div>
          ` : `
            <div class="real-bar-chart">
              ${stageCounts.map((item) => {
                const pct = Math.round((item.count / maxStageCount) * 100);
                return `
                  <button type="button" class="bar-chart-row" data-jump="${jump({ module: 'crm', label: `${item.stage} aşamasındaki açık talepler`, crmFilterStage: item.stage, crmFilterRes: 'active', crmViewMode: 'table', crmSearchQuery: '', crmChannelFilter: 'all', anchor: '#crm-view-container' })}">
                    <span class="bar-chart-label">${escapeHtml(item.stage)}</span>
                    <div class="bar-chart-track">
                      <div class="bar-chart-fill" style="width:${pct}%;"></div>
                    </div>
                    <strong class="bar-chart-val">${item.count}</strong>
                  </button>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <div class="card" style="padding:1.5rem;">
          <h3 style="margin-bottom:0.75rem;">Son Gelen Talepler ve Yaklaşan İşler</h3>
          ${crmList.length === 0 && plannedServices.length === 0 ? `
            <div class="empty-state-box">
              <p>Kayıtlı yeni mesaj, talep veya yaklaşan servis işlemi bulunmuyor.</p>
            </div>
          ` : `
            <div class="recent-activity-list">
              <h4 style="margin:0 0 0.35rem;">Son talepler</h4>
              ${recentCrm.length === 0 ? `<p class="kpi-sub">Bu tarih aralığında talebi olan kayıt yok.</p>` : recentCrm.map((req) => {
                const chMeta = getInboundChannelMeta(req);
                return `
                  <button type="button" class="recent-activity-item" data-jump="${jump({ module: 'crm', label: 'Seçilen talep', crmFocusId: req.id, crmFilterRes: 'all', crmFilterStage: 'all', crmViewMode: 'table', crmSearchQuery: '', anchor: '#crm-view-container' })}">
                    <div>
                      <span class="badge ${escapeAttr(chMeta.badgeClass)}" style="margin-right:0.35rem;">${escapeHtml(chMeta.label)}</span>
                      <strong>${escapeHtml(req.companyName)}</strong> — <span style="font-size:0.82rem;color:var(--text-secondary);">${escapeHtml(req.relatedProductOrSystem || req.requestType)}</span>
                      <div style="font-size:0.76rem;color:var(--text-muted);margin-top:0.15rem;">${escapeHtml(req.contactName || '')} | ${escapeHtml(req.phone || '')} | ${escapeHtml((req.createdAtIso || '').slice(0, 10) || 'tarih yok')}</div>
                    </div>
                    <span class="badge badge-teal">${escapeHtml(req.stage)}</span>
                  </button>
                `;
              }).join('')}
              <h4 style="margin:0.85rem 0 0.35rem;">Yaklaşan servisler</h4>
              ${openServices.length === 0 ? `<p class="kpi-sub">Tamamlanmamış servis kaydı yok.</p>` : openServices.slice(0, 4).map((s) => `
                <button type="button" class="recent-activity-item" data-jump="${jump({ module: 'service', label: 'Tamamlanmamış servis ve bakım', serviceListFocus: 'open', anchor: '#service-table-anchor' })}">
                  <div>
                    <strong>${escapeHtml(s.companyName || 'Servis')}</strong> — <span style="font-size:0.82rem;color:var(--text-secondary);">${escapeHtml(s.systemName || '')}</span>
                    <div style="font-size:0.76rem;color:var(--text-muted);margin-top:0.15rem;">Sonraki bakım: ${escapeHtml(s.nextServiceDate || 'tarih yok')}</div>
                  </div>
                  <span class="badge badge-neutral">${escapeHtml(s.status || '')}</span>
                </button>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;

    function renderInboxRegion() {
      const regionEl = box.querySelector('#dash-inbox-list-region');
      if (!regionEl) return;
      const visibleInboxItems = getFilteredDashboardInboxItems();
      const clearBtn = box.querySelector('#dash-inbox-clear-search');
      if (clearBtn) clearBtn.style.display = dashboardInboxSearch ? '' : 'none';

      if (visibleInboxItems.length === 0) {
        renderSafeHtml(regionEl, `
          <div class="empty-state-box">
            <h4>${dashboardInboxSearch ? 'Arama Kriterine Uygun Mesaj veya Talep Bulunamadı' : 'Bu Sekmede Kayıtlı Form Mesajı veya Sipariş Talebi Yok'}</h4>
            <p>Ziyaretçiler <code>/iletisim</code> veya <code>/teklif-al</code> sayfalarından form gönderdiğinde sayfa yenilenmesine gerek kalmadan anında burada listelenir.</p>
          </div>
        `);
        return;
      }

      const listHtml = `
        <div class="dash-inbox-grid">
          ${visibleInboxItems.slice(0, 24).map((req) => {
            const chMeta = getInboundChannelMeta(req);
            const dateStr = (req.createdAtIso || '').replace('T', ' ').slice(0, 16) || 'Tarih belirtilmedi';
            const cleanPhoneDigits = String(req.phone || '').replace(/\D/g, '');
            const waPhone = cleanPhoneDigits.length >= 10
              ? (cleanPhoneDigits.startsWith('90') ? cleanPhoneDigits : (cleanPhoneDigits.startsWith('0') ? `9${cleanPhoneDigits}` : `90${cleanPhoneDigits}`))
              : '';
            const fullMessage = req.description || req.message || 'Mesaj metni girilmedi.';
            const qtyLabel = req.requestedAmount || req.packaging || '';
            return `
              <div class="card dash-inbox-card">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.55rem;">
                    <span class="badge ${escapeAttr(chMeta.badgeClass)}">${escapeHtml(chMeta.label)}</span>
                    <span style="font-size:0.78rem;color:var(--text-muted);font-weight:600;">🕒 ${escapeHtml(dateStr)}</span>
                  </div>

                  <div style="margin-bottom:0.45rem;">
                    <strong style="font-size:1.02rem;color:var(--text-primary);">${escapeHtml(req.companyName || 'İsimsiz Firma / Ziyaretçi')}</strong>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:0.15rem;">
                      👤 Yetkili: <strong>${escapeHtml(req.contactName || '-')}</strong>
                      ${req.cityCountry ? ` • 📍 ${escapeHtml(req.cityCountry)}` : ''}
                    </div>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:0.15rem;">
                      📞 <strong>${escapeHtml(req.phone || '-')}</strong>
                      ${req.email ? ` • ✉️ <a href="mailto:${escapeAttr(req.email)}" style="color:var(--accent-teal);text-decoration:underline;">${escapeHtml(req.email)}</a>` : ''}
                    </div>
                  </div>

                  <div style="padding:0.55rem 0.75rem;background:var(--bg-surface);border-radius:8px;border-left:3px solid var(--accent-teal);margin-bottom:0.55rem;">
                    <div style="font-size:0.82rem;font-weight:700;color:var(--accent-teal);margin-bottom:0.2rem;">
                      📌 Konu / Ürün / Sistem: ${escapeHtml(req.relatedProductOrSystem || req.subject || req.requestType || 'Genel')}
                    </div>
                    ${qtyLabel ? `
                      <div style="font-size:0.8rem;font-weight:600;color:var(--text-primary);margin-bottom:0.25rem;">
                        📦 Talep Edilen Miktar / Ambalaj: <span class="badge badge-neutral">${escapeHtml(qtyLabel)}</span>
                      </div>
                    ` : ''}
                    <div style="font-size:0.85rem;color:var(--text-primary);white-space:pre-wrap;line-height:1.45;">${escapeHtml(fullMessage)}</div>
                  </div>
                </div>

                <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;flex-wrap:wrap;padding-top:0.45rem;border-top:1px solid var(--border-subtle);">
                  <div style="display:flex;align-items:center;gap:0.4rem;">
                    <label style="font-size:0.75rem;color:var(--text-muted);font-weight:600;">Aşama:</label>
                    <select class="form-select form-select-xs dash-inbox-stage" data-req-id="${escapeAttr(req.id)}" data-prev-stage="${escapeAttr(req.stage)}" style="width:auto;min-width:136px;">
                      ${CRM_STAGES.map((s) => `<option value="${escapeAttr(s)}" ${req.stage === s ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('')}
                    </select>
                  </div>
                  <div style="display:flex;gap:0.35rem;flex-wrap:wrap;">
                    ${waPhone ? `
                      <a href="https://wa.me/${escapeAttr(waPhone)}?text=${encodeURIComponent(`Merhaba ${req.contactName || req.companyName || ''}, Elif Çevre Kimya web sitemiz üzerinden ilettiğiniz "${req.relatedProductOrSystem || 'talebiniz'}" hakkında dönüş yapıyoruz.`)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-xs">
                        💬 WhatsApp
                      </a>
                    ` : ''}
                    <button type="button" class="btn btn-secondary btn-xs dash-open-crm-btn" data-req-id="${escapeAttr(req.id)}">
                      🔍 CRM'de Aç
                    </button>
                    <button type="button" class="btn btn-secondary btn-xs dash-prepare-proposal-btn" data-req-id="${escapeAttr(req.id)}">
                      📄 Teklif Hazırla
                    </button>
                    ${req.stage !== 'Onaylandı' ? `
                      <button type="button" class="btn btn-primary btn-xs dash-convert-order-btn" data-req-id="${escapeAttr(req.id)}">
                        🛒 Siparişe Aktar
                      </button>
                    ` : `
                      <span class="badge badge-teal">✅ Siparişe Aktarıldı</span>
                    `}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        ${visibleInboxItems.length > 24 ? `
          <button type="button" class="btn btn-secondary btn-sm" id="dash-inbox-more-btn" style="margin-top:0.85rem;">
            Kalan ${visibleInboxItems.length - 24} kaydı CRM’de aç
          </button>
        ` : ''}
      `;

      renderSafeHtml(regionEl, listHtml);

      regionEl.querySelector('#dash-inbox-more-btn')?.addEventListener('click', () => {
        applyDashPreset({
          module: 'crm',
          label: 'Gelen kutusunda listelenmeyen kayıtlar dahil',
          crmFilterStage: dashboardInboxTab === 'unread' ? 'Yeni Talep' : 'all',
          crmFilterRes: 'active',
          crmViewMode: 'table',
          crmSearchQuery: dashboardInboxSearch || '',
          crmChannelFilter: dashboardInboxTab === 'orders_quotes' ? 'order' : dashboardInboxTab === 'contacts' ? 'contact' : dashboardInboxTab === 'unread' ? 'unread' : 'all',
          anchor: '#crm-view-container'
        });
      });

      // Canlı Gelen Kutusu Aşama Güncelleyici (In-Place Store Güncelleme — 19 koleksiyonu tekrar çekmez)
      regionEl.querySelectorAll('.dash-inbox-stage').forEach((sel) => {
        sel.addEventListener('change', async () => {
          const reqId = sel.getAttribute('data-req-id');
          const prevStage = sel.getAttribute('data-prev-stage');
          const nextStage = sel.value;
          sel.disabled = true;
          try {
            const updated = await createOrUpdateCrmRequest({ id: reqId, stage: nextStage }, currentProfile);
            upsertCrmRequestInStore(updated);
            showNotification(`Mesaj / talep aşaması "${nextStage}" olarak sunucuda güncellendi.`, 'success');
            renderDashboardModule(box);
          } catch (err) {
            sel.disabled = false;
            sel.value = prevStage;
            showNotification(err.message || 'Aşama güncellenemedi.', 'error');
          }
        });
      });

      // CRM'de Detay Aç Butonu
      regionEl.querySelectorAll('.dash-open-crm-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const reqId = btn.getAttribute('data-req-id');
          const req = store.crmRequests.find((r) => r.id === reqId);
          applyDashPreset({
            module: 'crm',
            label: `Seçilen talep: ${req?.companyName || reqId}`,
            crmFocusId: reqId,
            crmFilterRes: 'all',
            crmFilterStage: 'all',
            crmViewMode: 'table',
            crmSearchQuery: '',
            anchor: '#crm-view-container'
          });
        });
      });

      // Teklif Hazırla Butonu
      regionEl.querySelectorAll('.dash-prepare-proposal-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const req = store.crmRequests.find((r) => r.id === btn.getAttribute('data-req-id'));
          if (!req) {
            showNotification('Talep kaydı bulunamadı.', 'error');
            return;
          }
          clearDashPreset();
          pendingProposalSeed = {
            crmRequestId: req.id,
            companyName: req.companyName || '',
            contactName: req.contactName || '',
            email: req.email && req.email !== '-' ? req.email : '',
            phone: req.phone && req.phone !== '-' ? req.phone : '',
            address: req.cityCountry || '',
            productName: req.relatedProductOrSystem || req.subject || req.requestType || '',
            description: req.description || req.message || '',
            quantityLabel: req.requestedAmount || req.packaging || ''
          };
          dashPreset = {
            module: 'proposals',
            label: `${req.companyName || 'Talep'} için teklif taslağı`,
            anchor: '#proposal-builder'
          };
          dashScrollOnce = true;
          activeModule = 'proposals';
          renderShell();
        });
      });

      // Tek Tıkla Onaylı Siparişe Aktar Butonu
      regionEl.querySelectorAll('.dash-convert-order-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const reqId = btn.getAttribute('data-req-id');
          const reqObj = store.crmRequests.find((r) => r.id === reqId);
          if (!reqObj) return;
          const amountRaw = await showConfirmModal({
            title: 'Talebi Onaylı Siparişe Aktar',
            message: `"${reqObj.companyName || 'Talep'}" sipariş kaydına aktarılacak ve CRM aşaması Onaylandı yapılacak. Tutar form metninden üretilmez.`,
            confirmText: 'Evet, Siparişe Aktar',
            cancelText: 'Vazgeç',
            inputLabel: 'KDV dahil sipariş tutarı (₺)',
            inputType: 'number',
            inputPlaceholder: 'Örn: 125000',
            inputRequired: true
          });
          if (amountRaw == null) return;
          const amount = Number(String(amountRaw).replace(',', '.'));
          if (!Number.isFinite(amount) || amount <= 0) {
            showNotification('Sipariş tutarı girilmeden aktarım yapılmaz.', 'error');
            return;
          }
          btn.disabled = true;
          try {
            await convertCrmRequestToOrder(reqObj, amount, currentProfile);
            showNotification(`"${reqObj.companyName}" siparişi oluşturuldu ve Sipariş & Sevkiyat modülüne aktarıldı.`, 'success');
            await refreshStoreAndRender();
          } catch (err) {
            btn.disabled = false;
            showNotification(err.message || 'Siparişe aktarım sırasında hata oluştu.', 'error');
          }
        });
      });
    }

    renderSafeHtml(box, html);
    renderInboxRegion();

    box.querySelectorAll('[data-jump]').forEach((el) => {
      el.addEventListener('click', () => {
        const preset = jumps[Number(el.getAttribute('data-jump'))];
        if (preset) applyDashPreset(preset);
      });
    });
    box.querySelectorAll('[data-inbox-jump]').forEach((el) => {
      el.addEventListener('click', () => {
        dashboardInboxTab = el.getAttribute('data-inbox-jump') || 'all';
        renderDashboardModule(box);
        box.querySelector('#dash-inbox')?.scrollIntoView({ block: 'start' });
      });
    });
    box.querySelector('#dash-date-filter')?.addEventListener('change', (e) => {
      dashboardDateDays = Number(e.target.value || 0);
      renderDashboardModule(box);
    });
    box.querySelector('#dash-go-accounting-btn')?.addEventListener('click', () => {
      applyDashPreset({
        module: 'accounting',
        label: '',
        accountingTab: 'overview'
      });
    });
    box.querySelector('#dash-go-crm-btn')?.addEventListener('click', () => {
      applyDashPreset({
        module: 'crm',
        label: '',
        crmFilterStage: 'all',
        crmFilterRes: 'active',
        crmViewMode: 'table',
        crmSearchQuery: '',
        crmChannelFilter: 'all',
        anchor: '#crm-view-container'
      });
    });

    // Canlı Gelen Kutusu Sekme Değiştirici
    box.querySelectorAll('.dash-inbox-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        dashboardInboxTab = btn.getAttribute('data-tab') || 'all';
        box.querySelectorAll('.dash-inbox-tab').forEach((b) => {
          const isAct = (b.getAttribute('data-tab') || 'all') === dashboardInboxTab;
          b.classList.toggle('btn-primary', isAct);
          b.classList.toggle('btn-secondary', !isAct);
        });
        renderInboxRegion();
      });
    });

    // Canlı Gelen Kutusu Anlık Arama (Focus kaybetmeden yalnızca kart listesini yeniler)
    box.querySelector('#dash-inbox-search-input')?.addEventListener('input', (e) => {
      dashboardInboxSearch = e.target.value;
      renderInboxRegion();
    });
    box.querySelector('#dash-inbox-clear-search')?.addEventListener('click', () => {
      dashboardInboxSearch = '';
      const searchInput = box.querySelector('#dash-inbox-search-input');
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      renderInboxRegion();
    });
  }

  /* ========================================================================
     MODÜL 2: MÜŞTERİ VE TALEP YÖNETİMİ (CRM)
     ======================================================================== */
  function renderCrmModule(box) {
    function getFilteredCrmRequests() {
      const q = String(crmSearchQuery || '').trim().toLowerCase();
      return store.crmRequests.filter((r) => {
        if (crmFocusId) return r.id === crmFocusId;
        const res = r.resolutionStatus || 'active';
        if (crmFilterRes !== 'all' && res !== crmFilterRes) return false;
        if (crmFilterStage === '__inbox') return CRM_INBOX_STAGES.includes(r.stage);
        if (crmFilterStage === '__stale') return isStaleOpenCrm(r, Date.now());
        if (crmFilterStage !== 'all' && r.stage !== crmFilterStage) return false;
        if (crmChannelFilter === 'order' && !getInboundChannelMeta(r).isOrderOrQuote) return false;
        if (crmChannelFilter === 'contact' && getInboundChannelMeta(r).isOrderOrQuote) return false;
        if (crmChannelFilter === 'unread' && !((r.resolutionStatus || 'active') === 'active' && r.stage === 'Yeni Talep')) return false;
        if (q) {
          const hay = `${r.companyName || ''} ${r.contactName || ''} ${r.email || ''} ${r.phone || ''} ${r.cityCountry || ''} ${r.relatedProductOrSystem || ''} ${r.description || ''} ${r.message || ''}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
    }

    const html = `
      <div class="admin-module-header">
        <div>
          <h2>2. Müşteri, İhale ve Talep Yönetimi (CRM)</h2>
          <p>Web sitesindeki iletişim, teklif, ROI hesaplayıcı, proje ve servis formları doğrudan bu modüle düşer. Tüm aşama geçişleri kullanıcı ve sunucu zamanıyla kaydedilir.</p>
        </div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <button type="button" class="btn btn-sm ${crmViewMode === 'table' ? 'btn-primary' : 'btn-secondary'}" data-crm-view="table">Tablo Görünümü</button>
          <button type="button" class="btn btn-sm ${crmViewMode === 'kanban' ? 'btn-primary' : 'btn-secondary'}" data-crm-view="kanban">Kanban Panosu</button>
          <button type="button" class="btn btn-sm ${crmViewMode === 'customers' ? 'btn-primary' : 'btn-secondary'}" data-crm-view="customers">Müşteri Kartları (${store.customers.length})</button>
          <button type="button" class="btn btn-sm ${crmViewMode === 'playbook' ? 'btn-primary' : 'btn-secondary'}" data-crm-view="playbook">B2B Satış Playbook Rehberi</button>
        </div>
      </div>
      ${focusBannerHtml()}

      <!-- Yeni Talep / Müşteri Ekleme Kartı -->
      <details class="card" style="padding:1.25rem;margin-bottom:1.5rem;">
        <summary style="font-weight:700;cursor:pointer;color:var(--accent-teal);">+ Yeni Kurumsal Talep veya Saha Ziyaret Kaydı Oluştur</summary>
        <form id="crm-new-req-form" class="form-grid-3" style="margin-top:1.25rem;">
          <div class="form-group">
            <label class="form-label">Firma Adı *</label>
            <input type="text" name="companyName" class="form-input" required placeholder="Örn: Tosyalı Demir Çelik A.Ş." />
          </div>
          <div class="form-group">
            <label class="form-label">Yetkili Kişi & Ünvan *</label>
            <input type="text" name="contactName" class="form-input" required placeholder="Örn: Ali Veli - Haddehane Şefi" />
          </div>
          <div class="form-group">
            <label class="form-label">Telefon *</label>
            <input type="tel" name="phone" class="form-input" required placeholder="+90 5XX XXX XX XX" />
          </div>
          <div class="form-group">
            <label class="form-label">E-posta *</label>
            <input type="email" name="email" class="form-input" required placeholder="yetkili@firma.com.tr" />
          </div>
          <div class="form-group">
            <label class="form-label">İl / OSB / Ülke</label>
            <input type="text" name="cityCountry" class="form-input" value="Osmaniye OSB / Türkiye" />
          </div>
          <div class="form-group">
            <label class="form-label">Talep Türü</label>
            <select name="requestType" class="form-select">
              <option value="product_quote">Kimyasal Ürün Teklifi</option>
              <option value="jar_test_trial">Saha Jar-Test / Pilot Deneme</option>
              <option value="water_project">Su Arıtma Projesi</option>
              <option value="service_maintenance">Servis & Bakım</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">İlgili Ürün / Sistem</label>
            <input type="text" name="relatedProductOrSystem" class="form-input" placeholder="Örn: ELİF-FLOC A-9020 Tufal Polimeri" />
          </div>
          <div class="form-group">
            <label class="form-label">Sorumlu Personel</label>
            <input type="text" name="assignedStaff" class="form-input" value="${escapeAttr(currentProfile.displayName || currentUser.email)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Takip Tarihi</label>
            <input type="date" name="followUpDate" class="form-input" />
          </div>
          <div class="form-group full-width">
            <label class="form-label">Açıklama & Saha Notları</label>
            <textarea name="description" class="form-textarea" rows="2" placeholder="Müşteri talebi ve teknik detaylar..."></textarea>
          </div>
          <div class="form-group full-width">
            <button type="submit" class="btn btn-primary btn-sm">Talebi Sunucuya Kaydet</button>
          </div>
        </form>
      </details>

      <!-- Arama ve Durum Filtreleri -->
      <div class="catalog-toolbar" style="margin-bottom:1.25rem;">
        <input type="search" id="crm-search-input" class="form-input" style="max-width:320px;" value="${escapeAttr(crmSearchQuery)}" placeholder="Firma, yetkili, ürün veya şehir ara..." />
        <select id="crm-stage-select" class="form-select" style="width:auto;">
          <option value="all">Tüm Aşamalar (10 Aşama)</option>
          <option value="__inbox" ${crmFilterStage === '__inbox' ? 'selected' : ''}>Yanıt bekleyen (Yeni Talep, İlk Görüşme, İhtiyaç Analizi)</option>
          <option value="__stale" ${crmFilterStage === '__stale' ? 'selected' : ''}>3 gündür aşaması duran açık talepler</option>
          ${CRM_STAGES.map((s) => `<option value="${escapeAttr(s)}" ${crmFilterStage === s ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('')}
        </select>
        <select id="crm-res-select" class="form-select" style="width:auto;">
          ${CRM_RESOLUTION_STATUSES.map((st) => `<option value="${escapeAttr(st.id)}" ${crmFilterRes === st.id ? 'selected' : ''}>Durum: ${escapeHtml(st.label)}</option>`).join('')}
          <option value="all" ${crmFilterRes === 'all' ? 'selected' : ''}>Tüm Kayıtlar (Aktif + Kaybedildi + İptal + Arşiv)</option>
        </select>
      </div>

      <div id="crm-view-container"></div>
    `;

    renderSafeHtml(box, html);
    bindFocusBanner(box, () => renderCrmModule(box));

    box.querySelectorAll('[data-crm-view]').forEach((btn) => {
      btn.addEventListener('click', () => {
        crmViewMode = btn.getAttribute('data-crm-view') || 'table';
        renderCrmModule(box);
      });
    });

    box.querySelector('#crm-search-input')?.addEventListener('input', (e) => {
      crmSearchQuery = e.target.value;
      renderCrmSubView(box.querySelector('#crm-view-container'), getFilteredCrmRequests());
    });
    box.querySelector('#crm-stage-select')?.addEventListener('change', (e) => {
      crmFilterStage = e.target.value;
      renderCrmModule(box);
    });
    box.querySelector('#crm-res-select')?.addEventListener('change', (e) => {
      crmFilterRes = e.target.value;
      renderCrmModule(box);
    });

    const newForm = box.querySelector('#crm-new-req-form');
    newForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(newForm);
      try {
        const created = await createOrUpdateCrmRequest({
          companyName: fd.get('companyName'),
          contactName: fd.get('contactName'),
          phone: fd.get('phone'),
          email: fd.get('email'),
          cityCountry: fd.get('cityCountry'),
          requestType: fd.get('requestType'),
          relatedProductOrSystem: fd.get('relatedProductOrSystem'),
          assignedStaff: fd.get('assignedStaff'),
          followUpDate: fd.get('followUpDate'),
          description: fd.get('description'),
          stage: 'Yeni Talep',
          resolutionStatus: 'active'
        }, currentProfile);
        upsertCrmRequestInStore(created);
        showNotification('CRM talebi sunucuya kaydedildi.', 'success');
        renderCrmModule(box);
      } catch (err) {
        showNotification(err.message || 'Talep kaydedilemedi.', 'error');
      }
    });

    renderCrmSubView(box.querySelector('#crm-view-container'), getFilteredCrmRequests());
  }

  function renderCrmSubView(subBox, requests) {
    if (!subBox) return;

    if (crmViewMode === 'playbook') {
      renderSafeHtml(subBox, `
        <div class="card" style="padding:1.75rem;">
          <h3>Çukurova & Doğu Akdeniz Kurumsal B2B Satış ve Müzakere Playbook'u</h3>
          <p style="color:var(--text-secondary);margin-bottom:1.25rem;">Saha ziyaretlerinde ve ihale masalarında departman müdürlerine sunulacak teknik kanıt ve KPI rehberi:</p>
          <div class="decision-matrix-grid">
            ${DECISION_MAKER_MATRIX.map((dm) => `
              <div class="decision-card">
                <div class="decision-role">${escapeHtml(dm.roleTitle)}</div>
                <div class="decision-kpi"><strong>KPI:</strong> ${escapeHtml(dm.primaryKpi)}</div>
                <p class="decision-value">${escapeHtml(dm.valueProposition)}</p>
                <div class="decision-proof"><strong>Kanıt Dosyası:</strong> ${escapeHtml(dm.proofDocument)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `);
      return;
    }

    if (crmViewMode === 'customers') {
      renderSafeHtml(subBox, `
        <div class="card" style="padding:1.5rem;margin-bottom:1.5rem;">
          <h4>Yeni Kurumsal Müşteri Cari Kartı Ekle</h4>
          <form id="new-customer-form" class="form-grid-3" style="margin-top:1rem;">
            <input type="text" name="companyName" class="form-input" required placeholder="Firma Resmi Ünvanı *" />
            <input type="text" name="contactName" class="form-input" placeholder="Yetkili Kişi" />
            <input type="tel" name="phone" class="form-input" placeholder="Telefon" />
            <input type="email" name="email" class="form-input" placeholder="Kurumsal E-posta" />
            <input type="text" name="city" class="form-input" placeholder="İl / OSB" value="Adana" />
            <input type="text" name="sector" class="form-input" placeholder="Sektör (Demir-Çelik, Kağıt vb.)" />
            <input type="text" name="taxOffice" class="form-input" placeholder="Vergi Dairesi" />
            <input type="text" name="taxNumber" class="form-input" placeholder="Vergi Numarası" />
            <button type="submit" class="btn btn-primary btn-sm">Müşteri Kartını Kaydet</button>
          </form>
        </div>
        ${store.customers.length === 0 ? `
          <div class="empty-state-box"><p>Henüz kayıtlı müşteri cari kartı bulunmuyor.</p></div>
        ` : `
          <div class="products-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Firma Ünvanı</th>
                  <th>Yetkili</th>
                  <th>İletişim</th>
                  <th>Şehir / Sektör</th>
                  <th>Vergi Dairesi / No</th>
                </tr>
              </thead>
              <tbody>
                ${store.customers.map((c) => `
                  <tr>
                    <td><strong>${escapeHtml(c.companyName)}</strong></td>
                    <td>${escapeHtml(c.contactName || '-')}</td>
                    <td>${escapeHtml(c.phone || '-')} <br/><small>${escapeHtml(c.email || '')}</small></td>
                    <td>${escapeHtml(c.city || '-')} / ${escapeHtml(c.sector || '-')}</td>
                    <td>${escapeHtml(c.taxOffice || '-')} / ${escapeHtml(c.taxNumber || '-')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      `);

      const custForm = subBox.querySelector('#new-customer-form');
      custForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(custForm);
        try {
          await saveCustomerRecord({
            companyName: fd.get('companyName'),
            contactName: fd.get('contactName'),
            phone: fd.get('phone'),
            email: fd.get('email'),
            city: fd.get('city'),
            sector: fd.get('sector'),
            taxOffice: fd.get('taxOffice'),
            taxNumber: fd.get('taxNumber')
          }, currentProfile);
          showNotification('Müşteri cari kartı sunucuya kaydedildi.', 'success');
          await refreshStoreAndRender();
        } catch (err) {
          showNotification(err.message || 'Müşteri kaydedilemedi.', 'error');
        }
      });
      return;
    }

    if (crmViewMode === 'kanban') {
      renderSafeHtml(subBox, `
        <div class="kanban-board">
          ${CRM_STAGES.map((stage) => {
            const items = requests.filter((r) => r.stage === stage);
            return `
              <div class="kanban-col">
                <div class="kanban-col-head">
                  <strong>${escapeHtml(stage)}</strong>
                  <span class="badge badge-neutral">${items.length}</span>
                </div>
                <div class="kanban-col-body">
                  ${items.length === 0 ? `<div class="kanban-empty">Kayıt yok</div>` : items.map((req) => {
                    const chMeta = getInboundChannelMeta(req);
                    return `
                      <div class="kanban-card">
                        <div style="margin-bottom:0.25rem;">
                          <span class="badge ${escapeAttr(chMeta.badgeClass)}">${escapeHtml(chMeta.label)}</span>
                        </div>
                        <strong>${escapeHtml(req.companyName)}</strong>
                        <p style="font-size:0.8rem;color:var(--text-secondary);margin:0.25rem 0;">${escapeHtml(req.relatedProductOrSystem || req.requestType)}</p>
                        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.5rem;">${escapeHtml(req.contactName || '')} • ${escapeHtml(req.cityCountry || '')}</div>
                        <select class="form-select form-select-xs crm-quick-stage" data-req-id="${escapeAttr(req.id)}" data-prev-stage="${escapeAttr(req.stage)}">
                          ${CRM_STAGES.map((s) => `<option value="${escapeAttr(s)}" ${req.stage === s ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('')}
                        </select>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `);
      bindStageSelectHandlers(subBox);
      return;
    }

    // Default: Tablo görünümü
    if (requests.length === 0) {
      renderSafeHtml(subBox, `
        <div class="empty-state-box">
          <h4>Seçili Filtreye Uygun CRM Talebi Bulunamadı</h4>
          <p>Web sitesindeki teklif ve iletişim formlarından gelen gerçek talepler burada listelenir.</p>
        </div>
      `);
      return;
    }

    renderSafeHtml(subBox, `
      <div class="products-table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Tarih & Kanal</th>
              <th>Firma & Yetkili</th>
              <th>İletişim & Şehir</th>
              <th>İlgili Ürün / Sistem & Mesaj</th>
              <th>Sorumlu & İşlem</th>
              <th>Talep Aşaması (10 Aşama)</th>
              <th>Durum (Aktif/Arşiv)</th>
            </tr>
          </thead>
          <tbody>
            ${requests.map((req) => {
              const chMeta = getInboundChannelMeta(req);
              const qtyLabel = req.requestedAmount || req.packaging || '';
              return `
                <tr>
                  <td style="font-size:0.8rem;white-space:nowrap;">
                    <div style="font-weight:600;margin-bottom:0.25rem;">${escapeHtml((req.createdAtIso || '').replace('T', ' ').slice(0, 16))}</div>
                    <span class="badge ${escapeAttr(chMeta.badgeClass)}">${escapeHtml(chMeta.label)}</span>
                  </td>
                  <td>
                    <strong>${escapeHtml(req.companyName)}</strong>
                    <div style="font-size:0.8rem;color:var(--text-secondary);">${escapeHtml(req.contactName || '-')}</div>
                  </td>
                  <td style="font-size:0.82rem;">
                    <div>${escapeHtml(req.phone || '-')}</div>
                    <div style="color:var(--text-muted);">${escapeHtml(req.email || '-')}</div>
                    <span class="badge badge-neutral">${escapeHtml(req.cityCountry || '-')}</span>
                  </td>
                  <td style="max-width:340px;">
                    <div style="font-weight:700;color:var(--accent-teal);">${escapeHtml(req.relatedProductOrSystem || req.subject || req.requestType)}</div>
                    ${qtyLabel ? `<div style="font-size:0.78rem;font-weight:600;margin:0.15rem 0;">📦 Miktar/Ambalaj: ${escapeHtml(qtyLabel)}</div>` : ''}
                    <div style="font-size:0.82rem;color:var(--text-secondary);white-space:pre-wrap;">${escapeHtml(req.description || req.message || '')}</div>
                  </td>
                  <td style="font-size:0.82rem;">
                    <div>${escapeHtml(req.assignedStaff || 'Atanmadı')}</div>
                    <div style="color:var(--text-muted);margin-bottom:0.35rem;">Takip: ${escapeHtml(req.followUpDate || '-')}</div>
                    ${req.stage !== 'Onaylandı' ? `
                      <button type="button" class="btn btn-primary btn-xs crm-convert-order-btn" data-req-id="${escapeAttr(req.id)}">
                        🛒 Siparişe Aktar
                      </button>
                    ` : `
                      <span class="badge badge-teal">✅ Siparişte</span>
                    `}
                  </td>
                  <td>
                    <select class="form-select crm-quick-stage" data-req-id="${escapeAttr(req.id)}" data-prev-stage="${escapeAttr(req.stage)}">
                      ${CRM_STAGES.map((s) => `<option value="${escapeAttr(s)}" ${req.stage === s ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('')}
                    </select>
                  </td>
                  <td>
                    <select class="form-select crm-quick-res" data-req-id="${escapeAttr(req.id)}" data-prev-res="${escapeAttr(req.resolutionStatus || 'active')}">
                      ${CRM_RESOLUTION_STATUSES.map((st) => `<option value="${escapeAttr(st.id)}" ${(req.resolutionStatus || 'active') === st.id ? 'selected' : ''}>${escapeHtml(st.label)}</option>`).join('')}
                    </select>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `);

    bindStageSelectHandlers(subBox);
  }

  function bindStageSelectHandlers(containerEl) {
    containerEl.querySelectorAll('.crm-quick-stage').forEach((sel) => {
      sel.addEventListener('change', async () => {
        const reqId = sel.getAttribute('data-req-id');
        const prevStage = sel.getAttribute('data-prev-stage');
        const nextStage = sel.value;
        sel.disabled = true;
        try {
          const updated = await createOrUpdateCrmRequest({ id: reqId, stage: nextStage }, currentProfile);
          upsertCrmRequestInStore(updated);
          showNotification(`Talep aşaması "${nextStage}" olarak sunucuda güncellendi.`, 'success');
          const contentBox = container.querySelector('#admin-module-content');
          if (contentBox && activeModule === 'crm') renderCrmModule(contentBox);
        } catch (err) {
          sel.disabled = false;
          sel.value = prevStage; // Hata durumunda arayüzü geri al!
          showNotification(err.message || 'Aşama güncellenemedi, değişiklik geri alındı.', 'error');
        }
      });
    });

    containerEl.querySelectorAll('.crm-quick-res').forEach((sel) => {
      sel.addEventListener('change', async () => {
        const reqId = sel.getAttribute('data-req-id');
        const prevRes = sel.getAttribute('data-prev-res');
        const nextRes = sel.value;
        sel.disabled = true;
        try {
          const updated = await createOrUpdateCrmRequest({ id: reqId, resolutionStatus: nextRes }, currentProfile);
          upsertCrmRequestInStore(updated);
          showNotification('Talep durumu sunucuda güncellendi.', 'success');
          const contentBox = container.querySelector('#admin-module-content');
          if (contentBox && activeModule === 'crm') renderCrmModule(contentBox);
        } catch (err) {
          sel.disabled = false;
          sel.value = prevRes; // Hata durumunda arayüzü geri al!
          showNotification(err.message || 'Durum güncellenemedi, değişiklik geri alındı.', 'error');
        }
      });
    });

    containerEl.querySelectorAll('.crm-convert-order-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const reqId = btn.getAttribute('data-req-id');
        const reqObj = store.crmRequests.find((r) => r.id === reqId);
        if (!reqObj) return;
        const amountRaw = await showConfirmModal({
          title: 'Talebi Onaylı Siparişe Aktar',
          message: `"${reqObj.companyName || 'Talep'}" sipariş kaydına aktarılacak ve CRM aşaması Onaylandı yapılacak. Tutar form metninden üretilmez.`,
          confirmText: 'Evet, Siparişe Aktar',
          cancelText: 'Vazgeç',
          inputLabel: 'KDV dahil sipariş tutarı (₺)',
          inputType: 'number',
          inputPlaceholder: 'Örn: 125000',
          inputRequired: true
        });
        if (amountRaw == null) return;
        const amount = Number(String(amountRaw).replace(',', '.'));
        if (!Number.isFinite(amount) || amount <= 0) {
          showNotification('Sipariş tutarı girilmeden aktarım yapılmaz.', 'error');
          return;
        }
        btn.disabled = true;
        try {
          await convertCrmRequestToOrder(reqObj, amount, currentProfile);
          showNotification(`"${reqObj.companyName}" siparişi oluşturuldu ve Sipariş & Sevkiyat modülüne aktarıldı.`, 'success');
          await refreshStoreAndRender();
        } catch (err) {
          btn.disabled = false;
          showNotification(err.message || 'Siparişe aktarım sırasında hata oluştu.', 'error');
        }
      });
    });
  }

  /* ========================================================================
     MODÜL 3: KİMYASAL ÜRÜNLER (PRODUCTS)
     ======================================================================== */
  function renderProductsModule(box) {
    const html = `
      <div class="admin-module-header">
        <div>
          <h2>3. Kimyasal Ürünler ve Teknik Katalog Yönetimi</h2>
          <p>Doğrulanmış yoğunluk bilgisi olmadan kg ↔ litre dönüşümü yapılmaz. Fiyat girilmeyen ürünlerde müşteriye "Teklif isteyin" gösterilir.</p>
        </div>
        <div>
          <button type="button" class="btn btn-secondary btn-sm" id="seed-verified-catalog-btn">
            Doğrulanmış Proses Kataloğunu Veritabanına Aktar (18 Ürün)
          </button>
        </div>
      </div>

      <!-- Ürün Ekleme / Düzenleme Formu -->
      <div class="card" style="padding:1.5rem;margin-bottom:1.5rem;">
        <h3 id="prod-form-title">Yeni Kimyasal Ürün Kartı Ekle / Düzenle</h3>
        <form id="admin-product-form" class="form-grid-3" style="margin-top:1rem;">
          <input type="hidden" name="id" id="prod-id" />
          <div class="form-group">
            <label class="form-label">Ticari Ürün Adı *</label>
            <input type="text" name="tradeName" id="prod-tradeName" class="form-input" required placeholder="Örn: ELİF-FLOC A-9020" />
          </div>
          <div class="form-group">
            <label class="form-label">Doğrulanmış Kimyasal Adı</label>
            <input type="text" name="chemicalName" id="prod-chemicalName" class="form-input" placeholder="Örn: Anyonik Poliakrilamid Kopolimeri" />
          </div>
          <div class="form-group">
            <label class="form-label">Ürün Kodu *</label>
            <input type="text" name="productCode" id="prod-productCode" class="form-input" required placeholder="Örn: ELF-PAM-9020" />
          </div>
          <div class="form-group">
            <label class="form-label">Kategori</label>
            <select name="category" id="prod-category" class="form-select">
              <option value="su-sartlandirma">Su Şartlandırma Kimyasalları</option>
              <option value="polimer-flokulant">Polimer, Koagülant & Flokülant</option>
              <option value="asitleme-metal">Demir-Çelik & Asitleme Kimyasalları</option>
              <option value="endustriyel-hammadde">Temel Endüstriyel Hammaddeler</option>
              <option value="endustriyel-bakim">Endüstriyel Bakım & CIP</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Konsantrasyon / Saflık</label>
            <input type="text" name="concentrationPurity" id="prod-concentration" class="form-input" placeholder="Örn: %99 Katı Granül veya %48 Sıvı" />
          </div>
          <div class="form-group">
            <label class="form-label">Doğrulanmış CAS Numarası (Biliniyorsa)</label>
            <input type="text" name="casNumber" id="prod-cas" class="form-input" placeholder="Uydurma CAS yazmayınız (Örn: 9003-05-8)" />
          </div>
          <div class="form-group">
            <label class="form-label">Ambalaj Türü</label>
            <input type="text" name="packagingType" id="prod-packaging" class="form-input" value="25 kg Kraft Torba / 1000 kg IBC" />
          </div>
          <div class="form-group">
            <label class="form-label">Satış Birimi *</label>
            <select name="salesUnit" id="prod-unit" class="form-select">
              <option value="kg">kg</option>
              <option value="litre">litre</option>
              <option value="ton">ton</option>
              <option value="adet">adet</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Doğrulanmış Yoğunluk (kg/L - Sıvılar İçin)</label>
            <input type="number" name="verifiedDensity" id="prod-density" class="form-input" step="0.001" min="0.1" max="5" placeholder="Boşsa kg↔L dönüşümü yapılmaz" />
          </div>
          <div class="form-group">
            <label class="form-label">Birim Fiyat (Boşsa "Teklif isteyin" görünür)</label>
            <input type="number" name="unitPrice" id="prod-price" class="form-input" step="0.01" min="0" placeholder="Fiyat belirsizse boş bırakın" />
          </div>
          <div class="form-group">
            <label class="form-label">Para Birimi</label>
            <select name="currency" id="prod-currency" class="form-select">
              <option value="TRY">TRY (₺)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Min. Sipariş Miktarı</label>
            <input type="number" name="minOrderQty" id="prod-minOrder" class="form-input" step="1" min="0" placeholder="Örn: 25" />
          </div>
          <div class="form-group full-width">
            <label class="form-label">Kullanım Alanı ve Teknik Özellikler</label>
            <textarea name="applicationArea" id="prod-appArea" class="form-textarea" rows="2" placeholder="Proses kullanım noktası ve teknik spesifikasyonlar..."></textarea>
          </div>
          <div class="form-group full-width" style="display:flex;justify-content:space-between;align-items:center;">
            <label class="checkbox-label">
              <input type="checkbox" name="published" id="prod-published" checked />
              <span>Web sitesinde yayımla (Aktif Ürün)</span>
            </label>
            <div style="display:flex;gap:0.5rem;">
              <button type="button" class="btn btn-secondary btn-sm" id="prod-reset-btn">Formu Temizle</button>
              <button type="submit" class="btn btn-primary btn-sm">Ürünü Sunucuya Kaydet</button>
            </div>
          </div>
        </form>
      </div>

      <!-- Ürün Listesi -->
      ${store.products.length === 0 ? `
        <div class="empty-state-box">
          <h4>Veritabanında Kayıtlı Ürün Kartı Bulunmuyor</h4>
          <p>Yukarıdaki formdan yeni ürün ekleyebilir veya <strong>"Doğrulanmış Proses Kataloğunu Veritabanına Aktar"</strong> butonuyla 18 endüstriyel proses kimyasalını tek tıkla yükleyebilirsiniz.</p>
        </div>
      ` : `
        <div class="products-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Kod</th>
                <th>Ticari Ad & Kimyasal Ad</th>
                <th>CAS No</th>
                <th>Ambalaj & Birim</th>
                <th>Yoğunluk</th>
                <th>Fiyat</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              ${store.products.map((p, idx) => `
                <tr>
                  <td><code>${escapeHtml(p.productCode)}</code></td>
                  <td>
                    <strong>${escapeHtml(p.tradeName)}</strong>
                    <div style="font-size:0.78rem;color:var(--text-secondary);">${escapeHtml(p.chemicalName || '-')}</div>
                  </td>
                  <td>${escapeHtml(p.casNumber || 'Belirtilmedi')}</td>
                  <td>${escapeHtml(p.packagingType || '-')} (${escapeHtml(p.salesUnit || 'kg')})</td>
                  <td>${p.verifiedDensity ? `${p.verifiedDensity} kg/L` : '<span style="color:var(--text-muted);">Tanımsız</span>'}</td>
                  <td>${p.unitPrice ? `${Number(p.unitPrice).toLocaleString('tr-TR')} ${escapeHtml(p.currency || 'TRY')}` : '<span class="badge badge-teal">Teklif isteyin</span>'}</td>
                  <td>
                    <span class="badge ${p.published ? 'badge-teal' : 'badge-neutral'}">${p.published ? 'Yayında' : 'Pasif'}</span>
                  </td>
                  <td>
                    <button type="button" class="btn btn-sm btn-secondary" data-edit-prod="${idx}">Düzenle</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    `;

    renderSafeHtml(box, html);

    const form = box.querySelector('#admin-product-form');
    box.querySelector('#prod-reset-btn')?.addEventListener('click', () => {
      form?.reset();
      const idEl = box.querySelector('#prod-id');
      if (idEl) idEl.value = '';
    });

    box.querySelectorAll('[data-edit-prod]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const p = store.products[Number(btn.getAttribute('data-edit-prod'))];
        if (!p) return;
        box.querySelector('#prod-id').value = p.id;
        box.querySelector('#prod-tradeName').value = p.tradeName || '';
        box.querySelector('#prod-chemicalName').value = p.chemicalName || '';
        box.querySelector('#prod-productCode').value = p.productCode || '';
        box.querySelector('#prod-category').value = p.category || 'su-sartlandirma';
        box.querySelector('#prod-concentration').value = p.concentrationPurity || '';
        box.querySelector('#prod-cas').value = p.casNumber || '';
        box.querySelector('#prod-packaging').value = p.packagingType || '';
        box.querySelector('#prod-unit').value = p.salesUnit || 'kg';
        box.querySelector('#prod-density').value = p.verifiedDensity || '';
        box.querySelector('#prod-price').value = p.unitPrice || '';
        box.querySelector('#prod-currency').value = p.currency || 'TRY';
        box.querySelector('#prod-minOrder').value = p.minOrderQty || '';
        box.querySelector('#prod-appArea').value = p.applicationArea || '';
        box.querySelector('#prod-published').checked = p.published !== false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      try {
        await saveProduct({
          id: fd.get('id') || null,
          tradeName: fd.get('tradeName'),
          chemicalName: fd.get('chemicalName'),
          productCode: fd.get('productCode'),
          category: fd.get('category'),
          concentrationPurity: fd.get('concentrationPurity'),
          casNumber: fd.get('casNumber'),
          packagingType: fd.get('packagingType'),
          salesUnit: fd.get('salesUnit'),
          verifiedDensity: fd.get('verifiedDensity'),
          unitPrice: fd.get('unitPrice'),
          currency: fd.get('currency'),
          minOrderQty: fd.get('minOrderQty'),
          applicationArea: fd.get('applicationArea'),
          published: box.querySelector('#prod-published')?.checked ?? true
        }, currentProfile);
        showNotification('Ürün kartı sunucuya kaydedildi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Ürün kaydedilemedi.', 'error');
      }
    });

    // Tek tıkla doğrulanmış proses kataloğunu içe aktar
    box.querySelector('#seed-verified-catalog-btn')?.addEventListener('click', async () => {
      const existingCodes = new Set(store.products.map((p) => p.productCode));
      let added = 0;
      try {
        for (const sec of MEGA_INDUSTRIAL_SECTORS) {
          for (const proc of sec.UnitProcesses) {
            if (!existingCodes.has(proc.code)) {
              await saveProduct({
                tradeName: proc.name,
                chemicalName: proc.activeIngredient,
                productCode: proc.code,
                category: 'su-sartlandirma',
                concentrationPurity: proc.technicalSpecs,
                packagingType: proc.packaging,
                salesUnit: 'kg',
                applicationArea: `${sec.shortTitle} — ${proc.applicationPoint}. ${proc.mechanism}`,
                unitPrice: null, // Fiyat uydurulmuyor -> "Teklif isteyin"
                published: true
              }, currentProfile);
              added++;
            }
          }
        }
        showNotification(`${added} doğrulanmış teknik ürün kartı sunucuya aktarıldı.`, 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Katalog aktarımı sırasında hata oluştu.', 'error');
      }
    });
  }

  /* ========================================================================
     MODÜL 4: TEKNİK BELGE MERKEZİ (DOCUMENTS)
     ======================================================================== */
  function renderDocumentsModule(box) {
    const html = `
      <div class="admin-module-header">
        <div>
          <h2>4. Teknik Belge Merkezi (SDS / GBF, TDS, COA, Sertifika)</h2>
          <p>Güvenlik metinleri ve tehlike sınıfları tahmin edilerek üretilmez. Yalnızca doğrulanmış resmi PDF/görsel belgeler Firebase Storage (<code>elifkimya/documents/</code>) üzerine yüklenir ve eski revizyonlar saklanır.</p>
        </div>
      </div>

      <div class="card" style="padding:1.5rem;margin-bottom:1.5rem;">
        <h3>Yeni Teknik Belge veya Yeni Revizyon Yükle</h3>
        <form id="admin-doc-form" class="form-grid-3" style="margin-top:1rem;">
          <div class="form-group">
            <label class="form-label">Belge Başlığı *</label>
            <input type="text" name="title" class="form-input" required placeholder="Örn: ELİF-RO AS-400 Güvenlik Bilgi Formu" />
          </div>
          <div class="form-group">
            <label class="form-label">Belge Türü *</label>
            <select name="docType" class="form-select">
              <option value="SDS/GBF">Güvenlik Bilgi Formu (SDS / GBF)</option>
              <option value="TDS">Teknik Bilgi Formu (TDS)</option>
              <option value="COA">Parti Analiz Sertifikası (COA)</option>
              <option value="CERTIFICATE">Uygunluk / Kalite Sertifikası</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">İlgili Ürün Adı</label>
            <input type="text" name="productName" class="form-input" placeholder="Örn: ELİF-RO AS-400" />
          </div>
          <div class="form-group">
            <label class="form-label">Parti / Lot Numarası (COA için)</label>
            <input type="text" name="batchNumber" class="form-input" placeholder="Örn: LOT-2026-041" />
          </div>
          <div class="form-group">
            <label class="form-label">Belge Dili</label>
            <select name="language" class="form-select">
              <option value="TR">Türkçe (TR)</option>
              <option value="EN">İngilizce (EN)</option>
              <option value="TR/EN">Çift Dilli (TR/EN)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Revizyon No & Tarihi</label>
            <div style="display:flex;gap:0.5rem;">
              <input type="number" name="revisionNo" class="form-input" value="1" min="1" style="width:80px;" />
              <input type="date" name="revisionDate" class="form-input" value="${new Date().toISOString().slice(0, 10)}" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Erişim Seviyesi</label>
            <select name="accessLevel" class="form-select">
              <option value="public">Herkese Açık (Teknik Belge Merkezinde Görünür)</option>
              <option value="portal_customer">Yalnızca Kayıtlı Müşteri Portalı</option>
              <option value="internal">Yalnızca Şirket İçi Personel</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Resmi Belge Dosyası (PDF / PNG / JPG - Max 12MB) *</label>
            <input type="file" name="docFile" id="doc-file-input" class="form-input" accept=".pdf,image/png,image/jpeg" required />
          </div>
          <div class="form-group" style="display:flex;align-items:flex-end;">
            <button type="submit" class="btn btn-primary" id="doc-upload-btn" style="width:100%;">Doğrula ve Storage'a Yükle</button>
          </div>
        </form>
      </div>

      ${store.documents.length === 0 ? `
        <div class="empty-state-box">
          <h4>Henüz Yüklenmiş Teknik Belge Bulunmuyor</h4>
          <p>Ürünlere ait gerçek SDS/GBF, TDS ve COA PDF dosyalarını yukarıdaki formdan yükleyebilirsiniz.</p>
        </div>
      ` : `
        <div class="products-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Tür</th>
                <th>Başlık & Ürün</th>
                <th>Parti No</th>
                <th>Dil & Revizyon</th>
                <th>Erişim</th>
                <th>Geçmiş Sürümler</th>
                <th>Dosya</th>
              </tr>
            </thead>
            <tbody>
              ${store.documents.map((d) => `
                <tr>
                  <td><span class="badge badge-teal">${escapeHtml(d.docType)}</span></td>
                  <td>
                    <strong>${escapeHtml(d.title)}</strong>
                    <div style="font-size:0.78rem;color:var(--text-secondary);">${escapeHtml(d.productName || '-')}</div>
                  </td>
                  <td>${escapeHtml(d.batchNumber || '-')}</td>
                  <td>${escapeHtml(d.language || 'TR')} — Rev.${escapeHtml(String(d.revisionNo || 1))} (${escapeHtml(d.revisionDate || '-')})</td>
                  <td><span class="badge badge-neutral">${escapeHtml(d.accessLevel)}</span></td>
                  <td>${Array.isArray(d.previousVersions) ? d.previousVersions.length : 0} eski sürüm</td>
                  <td><a href="${escapeAttr(d.fileUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">İndir / Aç</a></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    `;

    renderSafeHtml(box, html);

    const form = box.querySelector('#admin-doc-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = box.querySelector('#doc-upload-btn');
      const fileInput = box.querySelector('#doc-file-input');
      const file = fileInput?.files?.[0];
      const fd = new FormData(form);

      try {
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Magic Bytes & Sunucu Doğrulaması Yapılıyor...';
        }
        await uploadAndSaveTechnicalDocument({
          title: fd.get('title'),
          docType: fd.get('docType'),
          productName: fd.get('productName'),
          batchNumber: fd.get('batchNumber'),
          language: fd.get('language'),
          revisionNo: fd.get('revisionNo'),
          revisionDate: fd.get('revisionDate'),
          accessLevel: fd.get('accessLevel'),
          published: true
        }, file, currentProfile);
        showNotification('Teknik belge doğrulandı ve Firebase Storage üzerine kaydedildi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Belge yüklenemedi.', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Doğrula ve Storage'a Yükle";
        }
      }
    });
  }

  /* ========================================================================
     MODÜL 5: SU ARITMA PROJELERİ (PROJECTS)
     ======================================================================== */
  function renderProjectsModule(box) {
    const visibleProjects = store.projects.filter((prj) => {
      if (projectListFocus === 'ongoing') return prj.stage !== 'Bakım / Tamamlandı';
      if (projectListFocus === 'field') return FIELD_PROJECT_STAGES.includes(prj.stage);
      return true;
    });
    const html = `
      <div class="admin-module-header">
        <div>
          <h2>5. Endüstriyel Su Arıtma Projeleri ve Mühendislik Onayı</h2>
          <p>Eksik su analizi (pH, İletkenlik, Sertlik) ile kesin sistem kapasitesi veya dozaj önerisi kaydedilmesi sistem tarafından engellenir.</p>
        </div>
      </div>
      ${focusBannerHtml()}

      <div class="card" style="padding:1.5rem;margin-bottom:1.5rem;">
        <h3>Yeni Su Arıtma Projesi / Keşif Kaydı</h3>
        <form id="admin-project-form" class="form-grid-3" style="margin-top:1rem;">
          <div class="form-group">
            <label class="form-label">Proje Adı *</label>
            <input type="text" name="projectName" class="form-input" required placeholder="Örn: 30 m³/h Çift Kademe RO + EDI Tesisi" />
          </div>
          <div class="form-group">
            <label class="form-label">Müşteri / Fabrika Adı *</label>
            <input type="text" name="companyName" class="form-input" required placeholder="Örn: Ankutsan Kağıt A.Ş." />
          </div>
          <div class="form-group">
            <label class="form-label">Proje Konumu</label>
            <input type="text" name="location" class="form-input" value="Adana AOSB" />
          </div>
          <div class="form-group">
            <label class="form-label">Ham Su Kaynağı</label>
            <select name="rawWaterSource" class="form-select">
              <option value="Kuyu Suyu">Kuyu Suyu</option>
              <option value="OSB Şebeke Suyu">OSB Şebeke Suyu</option>
              <option value="Yüzey / Nehir Suyu">Yüzey / Nehir Suyu</option>
              <option value="Atıksu Geri Kazanım">Atıksu Geri Kazanım</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">İstenen Kapasite & Birim</label>
            <div style="display:flex;gap:0.5rem;">
              <input type="number" name="requestedCapacity" class="form-input" step="0.5" placeholder="Örn: 30" />
              <select name="capacityUnit" class="form-select" style="width:110px;">
                <option value="m³/saat">m³/saat</option>
                <option value="m³/gün">m³/gün</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Proje Aşaması</label>
            <select name="stage" class="form-select">
              ${PROJECT_STAGES.map((s) => `<option value="${escapeAttr(s)}">${escapeHtml(s)}</option>`).join('')}
            </select>
          </div>

          <!-- Ham Su Analizi Zorunlu Parametreleri -->
          <div class="form-group">
            <label class="form-label">Ham Su pH Değeri</label>
            <input type="number" name="pH" class="form-input" step="0.1" placeholder="Örn: 7.6" />
          </div>
          <div class="form-group">
            <label class="form-label">İletkenlik (µS/cm)</label>
            <input type="number" name="conductivityUsCm" class="form-input" step="1" placeholder="Örn: 1650" />
          </div>
          <div class="form-group">
            <label class="form-label">Toplam Sertlik (°Fr)</label>
            <input type="number" name="hardnessFr" class="form-input" step="0.5" placeholder="Örn: 42" />
          </div>

          <div class="form-group full-width">
            <label class="form-label">Önerilen Ekipman ve Sistem Bileşenleri (Yalnızca Su Analizi Tamamsa Doldurun)</label>
            <textarea name="recommendedEquipment" class="form-textarea" rows="2" placeholder="Su analizi girilmeden kesin ekipman/dozaj önerisi yazılamaz..."></textarea>
          </div>
          <div class="form-group full-width">
            <button type="submit" class="btn btn-primary btn-sm">Projeyi Doğrula ve Sunucuya Kaydet</button>
          </div>
        </form>
      </div>

      ${visibleProjects.length === 0 ? `
        <div class="empty-state-box" id="projects-table-anchor">
          <h4>${store.projects.length === 0 ? 'Kayıtlı Su Arıtma Projesi Bulunmuyor' : 'Seçilen filtreye uygun proje yok'}</h4>
          <p>${store.projects.length === 0 ? 'Keşif veya projelendirme aşamasındaki su arıtma sistemlerini yukarıdaki formdan oluşturabilirsiniz.' : 'Filtreyi kaldırınca tüm projeler listelenir.'}</p>
        </div>
      ` : `
        <div class="products-table-wrapper" id="projects-table-anchor">
          <table class="data-table">
            <thead>
              <tr>
                <th>Proje & Tesis</th>
                <th>Kaynak Su & Analiz</th>
                <th>İstenen Kapasite</th>
                <th>Önerilen Sistem</th>
                <th>Aşama</th>
                <th>Teknik Onay</th>
              </tr>
            </thead>
            <tbody>
              ${visibleProjects.map((prj) => `
                <tr>
                  <td>
                    <strong>${escapeHtml(prj.projectName)}</strong>
                    <div style="font-size:0.8rem;color:var(--text-secondary);">${escapeHtml(prj.companyName)} (${escapeHtml(prj.location || '-')})</div>
                  </td>
                  <td style="font-size:0.82rem;">
                    <div><strong>${escapeHtml(prj.rawWaterSource)}</strong></div>
                    ${prj.hasVerifiedWaterAnalysis
                      ? `<span class="badge badge-teal">pH:${prj.waterAnalysis?.pH} | ${prj.waterAnalysis?.conductivityUsCm} µS/cm | ${prj.waterAnalysis?.hardnessFr} Fr</span>`
                      : `<span class="badge badge-neutral">Su Analizi Bekleniyor</span>`}
                  </td>
                  <td>${prj.requestedCapacity ? `${prj.requestedCapacity} ${escapeHtml(prj.capacityUnit || 'm³/saat')}` : 'Belirlenmedi'}</td>
                  <td style="font-size:0.82rem;max-width:240px;">${escapeHtml(prj.recommendedEquipment || 'Analiz sonrası belirlenecek')}</td>
                  <td><span class="badge badge-teal">${escapeHtml(prj.stage)}</span></td>
                  <td>
                    ${prj.technicalApprovalStatus === 'approved'
                      ? `<span class="badge badge-teal">Onaylı (${escapeHtml(prj.approvedByEmail || '')})</span>`
                      : `<button type="button" class="btn btn-sm btn-secondary" data-approve-prj="${escapeAttr(prj.id)}">Teknik Onay Ver</button>`}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    `;

    renderSafeHtml(box, html);
    bindFocusBanner(box, () => renderProjectsModule(box));

    const form = box.querySelector('#admin-project-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      try {
        await saveWaterProject({
          projectName: fd.get('projectName'),
          companyName: fd.get('companyName'),
          location: fd.get('location'),
          rawWaterSource: fd.get('rawWaterSource'),
          requestedCapacity: fd.get('requestedCapacity'),
          capacityUnit: fd.get('capacityUnit'),
          stage: fd.get('stage'),
          pH: fd.get('pH'),
          conductivityUsCm: fd.get('conductivityUsCm'),
          hardnessFr: fd.get('hardnessFr'),
          recommendedEquipment: fd.get('recommendedEquipment'),
          assignedEngineer: currentProfile.displayName || currentUser.email
        }, currentProfile);
        showNotification('Su arıtma projesi sunucuya kaydedildi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Proje kaydedilemedi.', 'error');
      }
    });

    box.querySelectorAll('[data-approve-prj]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const prjId = btn.getAttribute('data-approve-prj');
        try {
          await approveWaterProjectTechnical(prjId, currentProfile);
          showNotification('Proje teknik onayı sunucuya kaydedildi.', 'success');
          await refreshStoreAndRender();
        } catch (err) {
          showNotification(err.message || 'Teknik onay verilemedi.', 'error');
        }
      });
    });
  }

  /* ========================================================================
     MODÜL 6: MALİYETLENDİRME VE PDF TEKLİF (PROPOSALS)
     ======================================================================== */
  function renderProposalsModule(box) {
    const seed = pendingProposalSeed;
    pendingProposalSeed = null;
    const qtyMatch = String(seed?.quantityLabel || '').match(/(\d+(?:[.,]\d+)?)/);
    const seededQty = qtyMatch ? Number(qtyMatch[1].replace(',', '.')) : 1;
    const linkedCrmRequestId = seed?.crmRequestId || '';
    let draftItems = [
      seed ? {
        productName: seed.productName || 'Talep edilen ürün',
        description: [seed.description, seed.quantityLabel].filter(Boolean).join(' — '),
        quantity: Number.isFinite(seededQty) && seededQty > 0 ? seededQty : 1,
        unit: 'kg',
        currency: 'TRY',
        unitCost: null,
        unitPrice: 0,
        discountPercent: 0,
        shippingCost: 0,
        installationCost: 0,
        commissioningCost: 0,
        vatRate: 20
      } : {
        productName: 'ELİF-FLOC A-9020 Haddehane Tufal Polimeri',
        description: '25 kg Kraft Torba - Yüksek IV Anyonik PAM',
        quantity: 1000,
        unit: 'kg',
        currency: 'TRY',
        unitCost: 92,
        unitPrice: 135,
        discountPercent: 5,
        shippingCost: 2500,
        installationCost: 0,
        commissioningCost: 0,
        vatRate: 20
      }
    ];

    const visibleProposals = store.proposals.filter((p) => {
      if (proposalListFocus === 'pipeline') return ['draft', 'sent', 'revised', 'approved'].includes(p.status);
      if (proposalListFocus === 'sent') return p.status === 'sent';
      return true;
    });

    const html = `
      <div class="admin-module-header">
        <div>
          <h2>6. Maliyetlendirme, Kâr Marjı ve Kurumsal A4 PDF Teklif Yönetimi</h2>
          <p>Eksik birim maliyetler sıfır (0) kabul edilmez. Gönderilen teklifler değiştirilemez (immutable) olarak kilitlenir ve müşteri PDF/Portal görünümünden tüm iç maliyetler otomatik temizlenir.</p>
        </div>
      </div>
      ${focusBannerHtml()}

      <!-- Yeni Teklif Oluşturucu -->
      <div class="card" id="proposal-builder" style="padding:1.5rem;margin-bottom:1.75rem;">
        <h3>Yeni Teklif / Maliyetlendirme Çalışması</h3>
        <form id="proposal-builder-form" style="margin-top:1rem;">
          <div class="form-grid-4">
            <div class="form-group">
              <label class="form-label">Teklif No</label>
              <input type="text" id="prop-no" class="form-input" value="TEK-${new Date().getFullYear()}-${String(store.proposals.length + 101).padStart(4, '0')}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Müşteri Firma Adı *</label>
              <input type="text" id="prop-company" class="form-input" required placeholder="Örn: Beyaz Kağıt Deterjan A.Ş." value="${escapeAttr(seed?.companyName || '')}" />
            </div>
            <div class="form-group">
              <label class="form-label">Yetkili Kişi & E-posta</label>
              <div style="display:flex;gap:0.4rem;">
                <input type="text" id="prop-contact" class="form-input" placeholder="Yetkili Adı" value="${escapeAttr(seed?.contactName || '')}" />
                <input type="email" id="prop-email" class="form-input" placeholder="E-posta" value="${escapeAttr(seed?.email || '')}" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Telefon ve sevkiyat adresi</label>
              <div style="display:flex;gap:0.4rem;">
                <input type="tel" id="prop-phone" class="form-input" placeholder="Telefon" value="${escapeAttr(seed?.phone || '')}" />
                <input type="text" id="prop-address" class="form-input" placeholder="İl / OSB / sevk adresi" value="${escapeAttr(seed?.address || '')}" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Teklif Para Birimi & Kur</label>
              <div style="display:flex;gap:0.4rem;">
                <select id="prop-currency" class="form-select" style="width:95px;">
                  <option value="TRY">TRY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
                <input type="number" id="prop-rate" class="form-input" step="0.0001" placeholder="Kur (Farklıysa)" />
                <input type="date" id="prop-rate-date" class="form-input" value="${new Date().toISOString().slice(0, 10)}" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Geçerlilik Tarihi</label>
              <input type="date" id="prop-valid" class="form-input" value="${new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10)}" />
            </div>
            <div class="form-group">
              <label class="form-label">Teslim Şekli</label>
              <input type="text" id="prop-delivery" class="form-input" value="Fabrika Teslim (ADR'li Sevkiyat)" />
            </div>
            <div class="form-group">
              <label class="form-label">Ödeme Koşulu</label>
              <input type="text" id="prop-payment" class="form-input" value="Fatura Tarihinden İtibaren 30 Gün" />
            </div>
            <div class="form-group">
              <label class="form-label">İç Yönetici Notu (Müşteri Görmez!)</label>
              <input type="text" id="prop-internal-note" class="form-input" placeholder="Yalnızca yönetici ekranında görünür" />
            </div>
          </div>

          <!-- Kalemler Tablosu -->
          <div style="margin-top:1rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <strong>Teklif Kalemleri (Ürün, Maliyet, Satış, Nakliye, Montaj, KDV)</strong>
              <button type="button" class="btn btn-secondary btn-sm" id="add-prop-line-btn">+ Yeni Kalem Ekle</button>
            </div>
            <div class="products-table-wrapper">
              <table class="data-table" id="prop-lines-table">
                <thead>
                  <tr>
                    <th>Ürün / Sistem Adı</th>
                    <th>Miktar</th>
                    <th>Birim</th>
                    <th>Birim Maliyet (İç)</th>
                    <th>Birim Satış</th>
                    <th>İsk.%</th>
                    <th>Nakliye+Montaj</th>
                    <th>KDV%</th>
                    <th>Sil</th>
                  </tr>
                </thead>
                <tbody id="prop-lines-tbody"></tbody>
              </table>
            </div>
          </div>

          <!-- Canlı Finansal & Kârlılık Özeti -->
          <div id="prop-live-summary" class="financial-split-grid" style="margin-top:1.25rem;"></div>

          <div style="margin-top:1.25rem;display:flex;justify-content:flex-end;gap:0.75rem;">
            <button type="button" class="btn btn-secondary" id="prop-preview-pdf">A4 PDF Teklif Oluştur</button>
            <button type="submit" class="btn btn-primary">Teklifi Taslak Olarak Sunucuya Kaydet</button>
          </div>
        </form>
      </div>

      <!-- Kayıtlı Teklifler Listesi -->
      <h3 id="proposals-table-anchor" style="margin-bottom:0.75rem;">Sunucudaki Teklif Kayıtları ve Versiyonlar (${visibleProposals.length}${proposalListFocus === 'all' ? '' : ` / ${store.proposals.length}`})</h3>
      ${visibleProposals.length === 0 ? `
        <div class="empty-state-box"><p>${store.proposals.length === 0 ? 'Henüz oluşturulmuş teklif kaydı bulunmuyor.' : 'Seçilen filtreye uygun teklif yok.'}</p></div>
      ` : `
        <div class="products-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Teklif No & Rev</th>
                <th>Müşteri Firma</th>
                <th>KDV Hariç Net</th>
                <th>Genel Toplam</th>
                <th>İç Maliyet & Brüt Kâr (Gizli)</th>
                <th>Durum</th>
                <th>İşlemler (PDF / Portal Paylaşım)</th>
              </tr>
            </thead>
            <tbody>
              ${visibleProposals.map((p, idx) => `
                <tr>
                  <td>
                    <strong>${escapeHtml(p.proposalNo)}</strong>
                    <span class="badge badge-neutral">Rev.${escapeHtml(String(p.revisionNo || 1))}</span>
                    ${p.isImmutable ? `<span class="badge badge-teal" title="Değiştirilemez Sürüm">Kilitli</span>` : ''}
                  </td>
                  <td>
                    <strong>${escapeHtml(p.companyName)}</strong>
                    <div style="font-size:0.78rem;color:var(--text-muted);">${escapeHtml(p.contactEmail || '')}</div>
                  </td>
                  <td>${Number(p.netExclVat || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(p.baseCurrency || 'TRY')}</td>
                  <td><strong>${Number(p.grandTotal || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(p.baseCurrency || 'TRY')}</strong></td>
                  <td>
                    ${p.hasMissingCost
                      ? `<span class="badge badge-neutral">Maliyet Eksik (Hesaplanamaz)</span>`
                      : `<div style="font-size:0.82rem;">Maliyet: ${Number(p.totalCost || 0).toLocaleString('tr-TR')} ${escapeHtml(p.baseCurrency || 'TRY')}<br/><strong style="color:var(--accent-teal);">Kâr: ${Number(p.grossProfit || 0).toLocaleString('tr-TR')} (%${p.profitMarginPercent})</strong></div>`}
                  </td>
                  <td>
                    <select class="form-select prop-status-select" data-prop-id="${escapeAttr(p.id)}" style="width:auto;">
                      ${PROPOSAL_STATUSES.map((st) => `<option value="${escapeAttr(st.id)}" ${p.status === st.id ? 'selected' : ''}>${escapeHtml(st.label)}</option>`).join('')}
                    </select>
                  </td>
                  <td>
                    <div style="display:flex;gap:0.4rem;flex-wrap:wrap;">
                      <button type="button" class="btn btn-sm btn-secondary" data-pdf-prop="${escapeAttr(p.id)}">A4 PDF</button>
                      <button type="button" class="btn btn-sm btn-primary" data-send-prop="${escapeAttr(p.id)}">Gönder & Portal Linki Üret</button>
                      ${p.portalShareToken ? `<button type="button" class="btn btn-sm btn-secondary" data-copy-token="${escapeAttr(p.portalShareToken)}">Linki Kopyala</button>` : ''}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    `;

    renderSafeHtml(box, html);
    bindFocusBanner(box, () => renderProposalsModule(box));

    const tbody = box.querySelector('#prop-lines-tbody');
    const summaryBox = box.querySelector('#prop-live-summary');

    function renderDraftLines() {
      if (!tbody) return;
      renderSafeHtml(tbody, draftItems.map((it, idx) => `
        <tr>
          <td><input type="text" class="form-input line-inp" data-idx="${idx}" data-field="productName" value="${escapeAttr(it.productName)}" /></td>
          <td><input type="number" class="form-input line-inp" data-idx="${idx}" data-field="quantity" value="${it.quantity}" style="width:85px;" /></td>
          <td><input type="text" class="form-input line-inp" data-idx="${idx}" data-field="unit" value="${escapeAttr(it.unit)}" style="width:65px;" /></td>
          <td><input type="number" class="form-input line-inp" data-idx="${idx}" data-field="unitCost" value="${it.unitCost ?? ''}" placeholder="Bilinmiyorsa boş" style="width:105px;" /></td>
          <td><input type="number" class="form-input line-inp" data-idx="${idx}" data-field="unitPrice" value="${it.unitPrice}" style="width:105px;" /></td>
          <td><input type="number" class="form-input line-inp" data-idx="${idx}" data-field="discountPercent" value="${it.discountPercent}" style="width:70px;" /></td>
          <td><input type="number" class="form-input line-inp" data-idx="${idx}" data-field="shippingCost" value="${it.shippingCost}" style="width:105px;" /></td>
          <td><input type="number" class="form-input line-inp" data-idx="${idx}" data-field="vatRate" value="${it.vatRate}" style="width:70px;" /></td>
          <td><button type="button" class="btn btn-sm btn-secondary" data-del-line="${idx}">×</button></td>
        </tr>
      `).join(''));

      tbody.querySelectorAll('.line-inp').forEach((inp) => {
        inp.addEventListener('input', () => {
          const i = Number(inp.getAttribute('data-idx'));
          const f = inp.getAttribute('data-field');
          if (!draftItems[i] || !f) return;
          if (f === 'productName' || f === 'unit') {
            draftItems[i][f] = inp.value;
          } else if (f === 'unitCost' && inp.value.trim() === '') {
            draftItems[i].unitCost = null;
          } else {
            draftItems[i][f] = Number(inp.value);
          }
          updateLiveSummary();
        });
      });

      tbody.querySelectorAll('[data-del-line]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const i = Number(btn.getAttribute('data-del-line'));
          if (draftItems.length > 1) {
            draftItems.splice(i, 1);
            renderDraftLines();
            updateLiveSummary();
          }
        });
      });

      updateLiveSummary();
    }

    function updateLiveSummary() {
      if (!summaryBox) return;
      try {
        const cur = box.querySelector('#prop-currency')?.value || 'TRY';
        const rate = box.querySelector('#prop-rate')?.value;
        const rateDate = box.querySelector('#prop-rate-date')?.value;
        const fin = calculateProposalFinancials(draftItems, cur, rate, rateDate);
        renderSafeHtml(summaryBox, `
          <div class="financial-split-card">
            <span class="badge badge-neutral">KDV Hariç Net & KDV</span>
            <h4>Net: ${fin.netExclVat.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(cur)}</h4>
            <p>KDV: ${fin.totalVat.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(cur)} | İskonto: ${fin.totalDiscount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(cur)}</p>
          </div>
          <div class="financial-split-card">
            <span class="badge badge-teal">Müşteri Genel Toplamı (KDV Dahil)</span>
            <h3>${fin.grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(cur)}</h3>
            <p>A4 PDF ve Müşteri Portalında yalnızca bu satış tutarları gösterilir.</p>
          </div>
          <div class="financial-split-card">
            <span class="badge badge-neutral">İç Maliyet & Brüt Kâr Marjı (Gizli)</span>
            ${fin.hasMissingCost
              ? `<h4 style="color:#d97706;">Maliyet Eksik (Sıfır Kabul Edilmez)</h4><p>Tüm kalemlerin birim maliyeti girildiğinde brüt kâr ve marj hesaplanır.</p>`
              : `<h4>Brüt Kâr: ${fin.grossProfit.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(cur)} (%${fin.profitMarginPercent})</h4><p>Toplam Maliyet: ${fin.totalCost.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(cur)}</p>`}
          </div>
        `);
      } catch (err) {
        renderSafeHtml(summaryBox, `<div class="info-callout">${escapeHtml(err.message)}</div>`);
      }
    }

    box.querySelector('#add-prop-line-btn')?.addEventListener('click', () => {
      draftItems.push({
        productName: 'Yeni Kimyasal / Sistem Kalemi',
        description: '',
        quantity: 100,
        unit: 'kg',
        currency: box.querySelector('#prop-currency')?.value || 'TRY',
        unitCost: null,
        unitPrice: 100,
        discountPercent: 0,
        shippingCost: 0,
        installationCost: 0,
        commissioningCost: 0,
        vatRate: 20
      });
      renderDraftLines();
    });

    renderDraftLines();

    const builderForm = box.querySelector('#proposal-builder-form');
    builderForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        await saveProposalOrCreateRevision({
          proposalNo: box.querySelector('#prop-no')?.value,
          companyName: box.querySelector('#prop-company')?.value,
          contactName: box.querySelector('#prop-contact')?.value,
          contactEmail: box.querySelector('#prop-email')?.value,
          baseCurrency: box.querySelector('#prop-currency')?.value || 'TRY',
          exchangeRate: box.querySelector('#prop-rate')?.value || null,
          exchangeRateDate: box.querySelector('#prop-rate-date')?.value || null,
          validUntil: box.querySelector('#prop-valid')?.value,
          deliveryTerms: box.querySelector('#prop-delivery')?.value,
          paymentTerms: box.querySelector('#prop-payment')?.value,
          internalAdminNotes: box.querySelector('#prop-internal-note')?.value,
          customerPhone: box.querySelector('#prop-phone')?.value,
          customerAddress: box.querySelector('#prop-address')?.value,
          crmRequestId: linkedCrmRequestId,
          items: draftItems,
          status: 'draft'
        }, currentProfile);
        showNotification('Teklif sunucuya kaydedildi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Teklif kaydedilemedi.', 'error');
      }
    });

    // PDF Önizleme
    box.querySelector('#prop-preview-pdf')?.addEventListener('click', () => {
      const companyName = String(box.querySelector('#prop-company')?.value || '').trim();
      if (!companyName || !draftItems.some((it) => String(it.productName || '').trim())) {
        showNotification('PDF için firma adı ve en az bir kalem adı gerekli. Satış fiyatını siz girin.', 'error');
        return;
      }
      try {
        const cur = box.querySelector('#prop-currency')?.value || 'TRY';
        const rate = box.querySelector('#prop-rate')?.value;
        const rateDate = box.querySelector('#prop-rate-date')?.value;
        const shippingPrice = draftItems.reduce((sum, it) => sum + Number(it.shippingCost || 0), 0);
        const installationPrice = draftItems.reduce((sum, it) => sum + Number(it.installationCost || 0), 0);
        const commissioningPrice = draftItems.reduce((sum, it) => sum + Number(it.commissioningCost || 0), 0);
        const fin = calculateProposalFinancials({
          items: draftItems.map((it) => ({ ...it, shippingCost: 0, installationCost: 0, commissioningCost: 0 })),
          currency: cur,
          exchangeRate: rate,
          exchangeRateDate: rateDate,
          shippingPrice,
          installationPrice,
          commissioningPrice,
          shippingCost: 0,
          installationCost: 0,
          commissioningCost: 0
        });
        openProposalA4Modal({
          proposalNo: box.querySelector('#prop-no')?.value || 'TASLAK',
          revisionNo: 1,
          companyName,
          contactName: box.querySelector('#prop-contact')?.value || '',
          customerEmail: box.querySelector('#prop-email')?.value || '',
          customerPhone: box.querySelector('#prop-phone')?.value || '',
          customerAddress: box.querySelector('#prop-address')?.value || '',
          currency: fin.currency,
          exchangeRate: fin.exchangeRate,
          exchangeRateDate: fin.exchangeRateDate,
          validUntil: box.querySelector('#prop-valid')?.value || '',
          deliveryTerms: box.querySelector('#prop-delivery')?.value || '',
          paymentTerms: box.querySelector('#prop-payment')?.value || '',
          items: fin.items,
          shippingPrice: fin.shippingPrice,
          installationPrice: fin.installationPrice,
          commissioningPrice: fin.commissioningPrice,
          subtotalExclVat: fin.subtotalExclVat,
          discountTotal: fin.discountTotal,
          netExclVat: fin.netExclVat,
          vatTotal: fin.vatTotal,
          grandTotal: fin.grandTotal
        }, {
          companyName: 'Elif Çevre Kimya',
          address: 'Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana',
          phone: '+90 (542) 590 36 26',
          email: 'info@elifkimya.com.tr'
        });
      } catch (err) {
        showNotification(err.message || 'PDF hazırlanamadı.', 'error');
      }
    });

    box.querySelectorAll('[data-pdf-prop]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const p = store.proposals.find((item) => item.id === btn.getAttribute('data-pdf-prop'));
        if (p) {
          openProposalA4Modal(p, {
            companyName: 'Elif Çevre Kimya',
            address: 'Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana',
            phone: '+90 (542) 590 36 26',
            email: 'info@elifkimya.com.tr'
          });
        }
      });
    });

    // Gönder & Portal Share üret
    box.querySelectorAll('[data-send-prop]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const propId = btn.getAttribute('data-send-prop');
        try {
          const res = await sendProposalAndPublishPortalShare(propId, currentProfile);
          const shareUrl = `${window.location.origin}/portal?token=${res.shareToken}`;
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareUrl);
          }
          showNotification('Teklif gönderildi olarak kilitlendi ve güvenli Müşteri Portalı linki panoya kopyalandı!', 'success');
          await refreshStoreAndRender();
        } catch (err) {
          showNotification(err.message || 'Teklif gönderilemedi.', 'error');
        }
      });
    });

    box.querySelectorAll('[data-copy-token]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const token = btn.getAttribute('data-copy-token');
        const url = `${window.location.origin}/portal?token=${token}`;
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
        }
        showNotification('Güvenli müşteri portalı bağlantısı kopyalandı.', 'success');
      });
    });

    box.querySelectorAll('.prop-status-select').forEach((sel) => {
      sel.addEventListener('change', async () => {
        const propId = sel.getAttribute('data-prop-id');
        try {
          await updateProposalCustomerStatus(propId, sel.value, currentProfile);
          showNotification('Teklif durumu güncellendi.', 'success');
          await refreshStoreAndRender();
        } catch (err) {
          showNotification(err.message || 'Durum güncellenemedi.', 'error');
        }
      });
    });
  }

  /* ========================================================================
     MODÜL 7: SİPARİŞ, STOK VE TEDARİK (ORDERS & INVENTORY)
     ======================================================================== */
  function renderOrdersModule(box) {
    const visibleOrders = store.orders.filter((o) => {
      if (ordersListFocus === 'open') return ORDER_PREP_STATUSES.includes(o.status);
      if (ordersListFocus === 'confirmed') return o.status !== 'İptal';
      if (ordersListFocus === 'collected') return Number(o.collectedAmount || 0) > 0;
      return true;
    });
    const visibleInventory = store.inventoryItems.filter((it) => {
      if (ordersListFocus !== 'critical') return true;
      return it.stockInitialized === true && Number(it.currentStock || 0) <= Number(it.minThreshold || 0);
    });
    const html = `
      <div class="admin-module-header">
        <div>
          <h2>7. Onaylanan Siparişler, Gerçek Stok Hareketleri ve Tedarik</h2>
          <p>Gerçek stok sayımı (<code>INITIAL_COUNT</code>) veya giriş (<code>INBOUND</code>) yapılmamış kalemlerde uydurma stok bakiyesi gösterilmez. Tüm stok hareketleri değiştirilemez işlem günlüğüne (<code>inventoryMovements</code>) yazılır.</p>
        </div>
      </div>
      ${focusBannerHtml()}

      <div class="admin-two-col" style="margin-bottom:1.75rem;">
        <!-- Onaylanan Sipariş Oluştur -->
        <div class="card" style="padding:1.5rem;">
          <h3>Yeni Onaylanan Sipariş Kaydı</h3>
          <form id="admin-order-form" class="form-grid-2" style="margin-top:1rem;">
            <div class="form-group">
              <label class="form-label">Sipariş No *</label>
              <input type="text" name="orderNo" class="form-input" value="SIP-${new Date().getFullYear()}-${String(store.orders.length + 101).padStart(4, '0')}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Müşteri Firma Adı *</label>
              <input type="text" name="companyName" class="form-input" required placeholder="Firma Adı" />
            </div>
            <div class="form-group">
              <label class="form-label">Müşteri E-posta (Portal İçin)</label>
              <input type="email" name="contactEmail" class="form-input" placeholder="ornek@firma.com.tr" />
            </div>
            <div class="form-group">
              <label class="form-label">Sipariş Durumu</label>
              <select name="status" class="form-select">
                ${ORDER_STATUSES.map((s) => `<option value="${escapeAttr(s)}">${escapeHtml(s)}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Genel Toplam (KDV Dahil) *</label>
              <input type="number" name="grandTotal" class="form-input" step="0.01" required placeholder="0.00" />
            </div>
            <div class="form-group">
              <label class="form-label">Tahsil Edilen Tutar</label>
              <input type="number" name="collectedAmount" class="form-input" step="0.01" value="0" />
            </div>
            <div class="form-group">
              <label class="form-label">Tahsilat Durumu</label>
              <select name="paymentStatus" class="form-select">
                ${PAYMENT_STATUSES.map((s) => `<option value="${escapeAttr(s)}">${escapeHtml(s)}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Planlanan Sevkiyat Tarihi</label>
              <input type="date" name="deliveryDate" class="form-input" />
            </div>
            <div class="form-group full-width">
              <button type="submit" class="btn btn-primary btn-sm">Onaylanan Siparişi Kaydet</button>
            </div>
          </form>
        </div>

        <!-- Depo Stok Kartı & Stok Hareketi -->
        <div class="card" style="padding:1.5rem;">
          <h3>Yeni Depo Stok Kartı & Gerçek Stok Hareketi</h3>
          <form id="admin-inv-card-form" class="form-grid-2" style="margin-top:0.75rem;padding-bottom:1rem;border-bottom:1px solid var(--border-subtle);">
            <input type="text" name="sku" class="form-input" required placeholder="Stok Kodu (SKU) *" />
            <input type="text" name="name" class="form-input" required placeholder="Stok Kalemi Adı *" />
            <select name="unit" class="form-select">
              <option value="kg">kg</option>
              <option value="litre">litre</option>
              <option value="ton">ton</option>
              <option value="adet">adet</option>
            </select>
            <input type="number" name="minThreshold" class="form-input" placeholder="Kritik Eşigi (Örn: 500)" value="500" />
            <button type="submit" class="btn btn-secondary btn-sm full-width">+ Stok Kartı Tanımla (Başlangıç Stoğu Sayım Bekler)</button>
          </form>

          <form id="admin-stock-move-form" class="form-grid-2" style="margin-top:1rem;">
            <div class="form-group">
              <label class="form-label">Stok Kalemi *</label>
              <select name="itemId" class="form-select" required>
                <option value="">Stok Kalemi Seçin...</option>
                ${store.inventoryItems.map((it) => `<option value="${escapeAttr(it.id)}">${escapeHtml(it.sku)} — ${escapeHtml(it.name)}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Hareket Türü *</label>
              <select name="movementType" class="form-select">
                ${STOCK_MOVEMENT_TYPES.map((m) => `<option value="${escapeAttr(m.id)}">${escapeHtml(m.label)}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Miktar *</label>
              <input type="number" name="quantity" class="form-input" step="0.01" min="0.01" required placeholder="Miktar" />
            </div>
            <div class="form-group">
              <label class="form-label">İrsaliye / Lot / Referans No</label>
              <input type="text" name="referenceNo" class="form-input" placeholder="Örn: IRS-2026-09" />
            </div>
            <div class="form-group full-width">
              <button type="submit" class="btn btn-primary btn-sm">Gerçek Stok Hareketini İşle (Transaction)</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Siparişler Tablosu -->
      <h3 id="orders-table-anchor" style="margin-bottom:0.75rem;">Onaylanan Siparişler (${visibleOrders.length}${ordersListFocus === 'all' || ordersListFocus === 'critical' ? '' : ` / ${store.orders.length}`})</h3>
      ${visibleOrders.length === 0 ? `
        <div class="empty-state-box" style="margin-bottom:1.5rem;"><p>${store.orders.length === 0 ? 'Henüz onaylanmış sipariş kaydı bulunmuyor.' : 'Seçilen filtreye uygun sipariş yok.'}</p></div>
      ` : `
        <div class="products-table-wrapper" style="margin-bottom:1.75rem;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Sipariş No</th>
                <th>Müşteri Firma</th>
                <th>Durum</th>
                <th>Genel Toplam</th>
                <th>Tahsil Edilen</th>
                <th>Ödeme Durumu</th>
                <th>Sevkiyat Tarihi</th>
              </tr>
            </thead>
            <tbody>
              ${visibleOrders.map((o) => `
                <tr>
                  <td><strong>${escapeHtml(o.orderNo)}</strong></td>
                  <td>${escapeHtml(o.companyName)}</td>
                  <td><span class="badge badge-teal">${escapeHtml(o.status)}</span></td>
                  <td><strong>₺${Number(o.grandTotal || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong></td>
                  <td>₺${Number(o.collectedAmount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                  <td><span class="badge badge-neutral">${escapeHtml(o.paymentStatus)}</span></td>
                  <td>${escapeHtml(o.deliveryDate || '-')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}

      <!-- Depo Stok Durumu -->
      <h3 id="inventory-table-anchor" style="margin-bottom:0.75rem;">Depo Stok Kalemleri (${visibleInventory.length}${ordersListFocus === 'critical' ? ` / ${store.inventoryItems.length}` : ''})</h3>
      ${visibleInventory.length === 0 ? `
        <div class="empty-state-box"><p>${store.inventoryItems.length === 0 ? 'Henüz tanımlanmış depo stok kartı bulunmuyor.' : 'Seçilen filtreye uygun stok kalemi yok.'}</p></div>
      ` : `
        <div class="products-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Stok Kalemi</th>
                <th>Mevcut Fiziksel Stok</th>
                <th>Rezerve</th>
                <th>Kullanılabilir</th>
                <th>Kritik Eşik</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              ${visibleInventory.map((it) => {
                const avail = it.stockInitialized ? Number(it.currentStock || 0) - Number(it.reservedStock || 0) : null;
                const isCrit = it.stockInitialized && Number(it.currentStock || 0) <= Number(it.minThreshold || 0);
                return `
                  <tr>
                    <td><code>${escapeHtml(it.sku)}</code></td>
                    <td><strong>${escapeHtml(it.name)}</strong></td>
                    <td>${it.stockInitialized ? `${Number(it.currentStock).toLocaleString('tr-TR')} ${escapeHtml(it.unit)}` : 'Sayım Bekleniyor'}</td>
                    <td>${it.stockInitialized ? `${Number(it.reservedStock || 0).toLocaleString('tr-TR')} ${escapeHtml(it.unit)}` : '-'}</td>
                    <td><strong>${avail !== null ? `${avail.toLocaleString('tr-TR')} ${escapeHtml(it.unit)}` : '-'}</strong></td>
                    <td>${Number(it.minThreshold || 0).toLocaleString('tr-TR')} ${escapeHtml(it.unit)}</td>
                    <td>
                      ${!it.stockInitialized
                        ? `<span class="badge badge-neutral">Stok Sayımı Girilmedi</span>`
                        : isCrit
                          ? `<span class="badge" style="background:#fee2e2;color:#b91c1c;">Kritik Stok!</span>`
                          : `<span class="badge badge-teal">Yeterli</span>`}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `}
    `;

    renderSafeHtml(box, html);
    bindFocusBanner(box, () => renderOrdersModule(box));

    const orderForm = box.querySelector('#admin-order-form');
    orderForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(orderForm);
      try {
        await saveOrderRecord({
          orderNo: fd.get('orderNo'),
          companyName: fd.get('companyName'),
          contactEmail: fd.get('contactEmail'),
          status: fd.get('status'),
          grandTotal: Number(fd.get('grandTotal') || 0),
          netExclVat: Number(fd.get('grandTotal') || 0) / 1.2,
          totalVat: Number(fd.get('grandTotal') || 0) - Number(fd.get('grandTotal') || 0) / 1.2,
          collectedAmount: Number(fd.get('collectedAmount') || 0),
          paymentStatus: fd.get('paymentStatus'),
          deliveryDate: fd.get('deliveryDate')
        }, currentProfile);
        showNotification('Onaylanan sipariş sunucuya kaydedildi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Sipariş kaydedilemedi.', 'error');
      }
    });

    const invCardForm = box.querySelector('#admin-inv-card-form');
    invCardForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(invCardForm);
      try {
        await saveInventoryItemCard({
          sku: fd.get('sku'),
          name: fd.get('name'),
          unit: fd.get('unit'),
          minThreshold: fd.get('minThreshold')
        }, currentProfile);
        showNotification('Stok kartı tanımlandı.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Stok kartı oluşturulamadı.', 'error');
      }
    });

    const moveForm = box.querySelector('#admin-stock-move-form');
    moveForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(moveForm);
      try {
        await executeStockMovementTransaction({
          itemId: fd.get('itemId'),
          movementType: fd.get('movementType'),
          quantity: Number(fd.get('quantity')),
          referenceNo: fd.get('referenceNo')
        }, currentProfile);
        showNotification('Stok hareketi transaction ile işlendi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Stok hareketi işlenemedi.', 'error');
      }
    });
  }

  /* ========================================================================
     MODÜL 8: GELİŞMİŞ MUHASEBE & FİNANS YÖNETİMİ (ACCOUNTING)
     ======================================================================== */
  function openInvoicePrintModal(inv) {
    const existing = document.getElementById('admin-invoice-print-modal');
    if (existing) existing.remove();

    const general = store.settings?.general || {};
    const modal = document.createElement('div');
    modal.id = 'admin-invoice-print-modal';
    modal.className = 'modal-backdrop';
    const curSym = inv.currency === 'USD' ? '$' : inv.currency === 'EUR' ? '€' : '₺';

    const modalHtml = `
      <div class="modal-card a4-modal-card" style="max-width:860px;width:95%;">
        <div class="modal-header no-print" style="display:flex;justify-content:space-between;align-items:center;padding:1rem 1.5rem;border-bottom:1px solid var(--border-color);background:#0f172a;color:#fff;">
          <div>
            <strong style="font-size:1rem;">A4 Resmi Belge & E-Fatura Önizleme: ${escapeHtml(inv.invoiceNo)}</strong>
            <span class="badge badge-teal" style="margin-left:0.5rem;">${escapeHtml(inv.docCategory || 'E-FATURA')}</span>
          </div>
          <div style="display:flex;gap:0.5rem;">
            <button type="button" class="btn btn-primary btn-sm" id="print-inv-btn">🖨️ A4 Yazdır / PDF Kaydet</button>
            <button type="button" class="btn btn-secondary btn-sm" id="close-inv-btn">Kapat</button>
          </div>
        </div>
        <div class="a4-sheet" style="padding:2rem;background:#fff;color:#0f172a;font-size:0.88rem;line-height:1.5;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #059669;padding-bottom:1.25rem;margin-bottom:1.5rem;">
            <div>
              <h2 style="margin:0;color:#0f172a;font-size:1.35rem;font-weight:900;">${escapeHtml(general.companyName || 'ELİF KİMYA SANAYİ VE TİCARET')}</h2>
              <p style="margin:0.25rem 0 0;color:#475569;font-size:0.82rem;">Endüstriyel Kimyasal Hammadde • Medipure Saf Su & Su Arıtma Mühendisliği</p>
              <p style="margin:0.15rem 0 0;color:#475569;font-size:0.8rem;">${escapeHtml(general.address || 'Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana')} | Tel: ${escapeHtml(general.phone || '+90 (542) 590 36 26')}</p>
            </div>
            <div style="text-align:right;">
              <div style="display:inline-block;padding:0.35rem 0.75rem;background:#0f172a;color:#34d399;font-weight:800;border-radius:6px;font-size:0.82rem;">
                ${escapeHtml(inv.docCategory || 'E-FATURA')} • ${escapeHtml(inv.invoiceType || 'SATIS')}
              </div>
              <div style="margin-top:0.5rem;font-size:0.82rem;"><strong>Fatura No:</strong> <code>${escapeHtml(inv.invoiceNo)}</code></div>
              <div style="font-size:0.82rem;"><strong>Düzenleme Tarihi:</strong> ${escapeHtml(inv.issueDate || '-')}</div>
              <div style="font-size:0.82rem;"><strong>Vade Tarihi:</strong> ${escapeHtml(inv.dueDate || '-')}</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.5rem;">
            <div style="padding:1rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;">
              <div style="font-size:0.74rem;font-weight:800;text-transform:uppercase;color:#059669;margin-bottom:0.35rem;">Sayın / Cari Hesap Bilgileri</div>
              <div style="font-size:1rem;font-weight:800;color:#0f172a;">${escapeHtml(inv.companyName)}</div>
              <div style="font-size:0.82rem;color:#334155;margin-top:0.25rem;"><strong>Vergi Dairesi:</strong> ${escapeHtml(inv.taxOffice || 'Belirtilmedi')}</div>
              <div style="font-size:0.82rem;color:#334155;"><strong>VKN / TCKN:</strong> ${escapeHtml(inv.taxNumber || 'Belirtilmedi')}</div>
              ${inv.contactEmail ? `<div style="font-size:0.82rem;color:#334155;"><strong>E-posta:</strong> ${escapeHtml(inv.contactEmail)}</div>` : ''}
            </div>
            <div style="padding:1rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;">
              <div style="font-size:0.74rem;font-weight:800;text-transform:uppercase;color:#059669;margin-bottom:0.35rem;">Finansal & Döviz Parametreleri</div>
              <div style="font-size:0.82rem;color:#334155;"><strong>Para Birimi:</strong> ${escapeHtml(inv.currency || 'TRY')} ${inv.currency !== 'TRY' ? `(TCMB Kur: ${Number(inv.exchangeRate || 1).toFixed(4)})` : ''}</div>
              <div style="font-size:0.82rem;color:#334155;"><strong>KDV Oranı:</strong> %${Number(inv.vatRate || 20)} ${inv.withholdingRate && inv.withholdingRate !== 'Yok' ? `| <strong>Tevkifat:</strong> ${escapeHtml(inv.withholdingRate)}` : ''}</div>
              <div style="font-size:0.82rem;color:#334155;"><strong>Ödeme Durumu:</strong> <strong>${escapeHtml(inv.paymentStatus || 'Ödeme Bekliyor')}</strong></div>
              ${inv.orderNo ? `<div style="font-size:0.82rem;color:#334155;"><strong>İlgili Sipariş No:</strong> <code>${escapeHtml(inv.orderNo)}</code></div>` : ''}
            </div>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;font-size:0.84rem;">
            <thead>
              <tr style="background:#0f172a;color:#fff;">
                <th style="padding:0.65rem;text-align:left;">Açıklama / Mal ve Hizmet Kalemi</th>
                <th style="padding:0.65rem;text-align:right;">KDV Hariç Tutar</th>
                <th style="padding:0.65rem;text-align:right;">İskonto</th>
                <th style="padding:0.65rem;text-align:right;">KDV (%${Number(inv.vatRate || 20)})</th>
                <th style="padding:0.65rem;text-align:right;">Tevkifat (${escapeHtml(inv.withholdingRate || 'Yok')})</th>
                <th style="padding:0.65rem;text-align:right;">Genel Toplam</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #cbd5e1;">
                <td style="padding:0.75rem;font-weight:700;">${escapeHtml(inv.description || `${inv.companyName} — Kimyasal / Su Arıtma Fatura Kalemleri`)}</td>
                <td style="padding:0.75rem;text-align:right;">${curSym}${Number(inv.subtotal || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                <td style="padding:0.75rem;text-align:right;">${curSym}${Number(inv.discountTotal || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                <td style="padding:0.75rem;text-align:right;">${curSym}${Number(inv.vatAmount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                <td style="padding:0.75rem;text-align:right;color:#b91c1c;">-${curSym}${Number(inv.withholdingAmount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                <td style="padding:0.75rem;text-align:right;font-weight:800;">${curSym}${Number(inv.grandTotal || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>

          <div style="display:flex;justify-content:flex-end;">
            <div style="width:340px;padding:1rem;background:#f8fafc;border:2px solid #0f172a;border-radius:8px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:0.35rem;">
                <span>Net Matrah (KDV Hariç):</span>
                <strong>${curSym}${Number(inv.netExclVat || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:0.35rem;">
                <span>Hesaplanan KDV (%${Number(inv.vatRate || 20)}):</span>
                <strong>${curSym}${Number(inv.vatAmount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
              </div>
              ${Number(inv.withholdingAmount || 0) > 0 ? `
                <div style="display:flex;justify-content:space-between;margin-bottom:0.35rem;color:#b91c1c;">
                  <span>KDV Tevkifat Kesintisi (${escapeHtml(inv.withholdingRate)}):</span>
                  <strong>-${curSym}${Number(inv.withholdingAmount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
                </div>
              ` : ''}
              <div style="display:flex;justify-content:space-between;padding-top:0.5rem;border-top:1px solid #cbd5e1;font-size:1rem;color:#059669;">
                <strong>Ödenecek Genel Toplam:</strong>
                <strong>${curSym}${Number(inv.grandTotal || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
              </div>
              <div style="display:flex;justify-content:space-between;margin-top:0.35rem;font-size:0.8rem;color:#334155;">
                <span>TL Karşılığı (Resmi Kayıt):</span>
                <strong>₺${Number(inv.grandTotalTry || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
              </div>
              <div style="display:flex;justify-content:space-between;margin-top:0.25rem;font-size:0.8rem;color:#0f172a;">
                <span>Kalan Açık Bakiye (TL):</span>
                <strong>₺${Number(inv.remainingAmountTry || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    renderSafeHtml(modal, modalHtml);
    document.body.appendChild(modal);

    modal.querySelector('#close-inv-btn')?.addEventListener('click', () => modal.remove());
    modal.querySelector('#print-inv-btn')?.addEventListener('click', () => window.print());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  function openLedgerStatementPrintModal(entry) {
    const existing = document.getElementById('admin-ledger-print-modal');
    if (existing) existing.remove();

    const general = store.settings?.general || {};
    const modal = document.createElement('div');
    modal.id = 'admin-ledger-print-modal';
    modal.className = 'modal-backdrop';

    const modalHtml = `
      <div class="modal-card a4-modal-card" style="max-width:860px;width:95%;">
        <div class="modal-header no-print" style="display:flex;justify-content:space-between;align-items:center;padding:1rem 1.5rem;border-bottom:1px solid var(--border-color);background:#0f172a;color:#fff;">
          <div>
            <strong style="font-size:1rem;">A4 Cari Hesap Mutabakat & Ekstre Raporu: ${escapeHtml(entry.companyName)}</strong>
          </div>
          <div style="display:flex;gap:0.5rem;">
            <button type="button" class="btn btn-primary btn-sm" id="print-ledger-btn">🖨️ A4 Ekstre Yazdır / PDF</button>
            <button type="button" class="btn btn-secondary btn-sm" id="close-ledger-btn">Kapat</button>
          </div>
        </div>
        <div class="a4-sheet" style="padding:2rem;background:#fff;color:#0f172a;font-size:0.86rem;line-height:1.5;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #059669;padding-bottom:1rem;margin-bottom:1.25rem;">
            <div>
              <h2 style="margin:0;font-size:1.3rem;font-weight:900;">${escapeHtml(general.companyName || 'ELİF KİMYA SANAYİ VE TİCARET')}</h2>
              <p style="margin:0.2rem 0 0;color:#475569;font-size:0.8rem;">Kurumsal Cari Hesap Ekstresi ve Bakiye Mutabakat Belgesi</p>
            </div>
            <div style="text-align:right;font-size:0.8rem;">
              <div><strong>Rapor Tarihi:</strong> ${new Date().toISOString().slice(0, 10)}</div>
              <div><strong>Cari Türü:</strong> ${escapeHtml(entry.partyRole)}</div>
            </div>
          </div>

          <div style="padding:1rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;margin-bottom:1.25rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
            <div>
              <div style="font-size:0.74rem;font-weight:800;color:#059669;text-transform:uppercase;">Cari Firma Ünvanı</div>
              <div style="font-size:1.05rem;font-weight:900;">${escapeHtml(entry.companyName)}</div>
              <div style="font-size:0.8rem;color:#475569;">Vergi No: ${escapeHtml(entry.taxNumber || '-')} | Tel/E-posta: ${escapeHtml(entry.contactInfo || '-')}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:0.75rem;color:#475569;">Net Cari Bakiye (TL)</div>
              <div style="font-size:1.2rem;font-weight:900;color:${entry.netBalanceTry > 0 ? '#059669' : entry.netBalanceTry < 0 ? '#b91c1c' : '#0f172a'};">
                ₺${Math.abs(entry.netBalanceTry).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} (${entry.netBalanceTry > 0 ? 'BORÇLU - Alacağımız' : entry.netBalanceTry < 0 ? 'ALACAKLI - Borcumuz' : 'KAPALI'})
              </div>
            </div>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:1.25rem;font-size:0.82rem;">
            <thead>
              <tr style="background:#0f172a;color:#fff;">
                <th style="padding:0.55rem;text-align:left;">Tarih</th>
                <th style="padding:0.55rem;text-align:left;">Evrak / Referans</th>
                <th style="padding:0.55rem;text-align:left;">İşlem Türü & Açıklama</th>
                <th style="padding:0.55rem;text-align:right;">Borç (₺)</th>
                <th style="padding:0.55rem;text-align:right;">Alacak (₺)</th>
              </tr>
            </thead>
            <tbody>
              ${entry.movements.length === 0 ? `
                <tr><td colspan="5" style="padding:1rem;text-align:center;color:#64748b;">Bu cariye ait fatura veya kasa/banka hareketi bulunmuyor.</td></tr>
              ` : entry.movements.map((m) => `
                <tr style="border-bottom:1px solid #e2e8f0;">
                  <td style="padding:0.55rem;">${escapeHtml(m.date || '-')}</td>
                  <td style="padding:0.55rem;"><code>${escapeHtml(m.refNo || '-')}</code></td>
                  <td style="padding:0.55rem;">${escapeHtml(m.label)}</td>
                  <td style="padding:0.55rem;text-align:right;font-weight:700;">${m.debitTry > 0 ? `₺${m.debitTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}` : '-'}</td>
                  <td style="padding:0.55rem;text-align:right;font-weight:700;color:#059669;">${m.creditTry > 0 ? `₺${m.creditTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}` : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="display:flex;justify-content:space-between;padding-top:1rem;border-top:2px solid #0f172a;font-size:0.85rem;">
            <div><strong>Toplam Borç (Satış/Tediye):</strong> ₺${entry.totalDebitTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
            <div><strong>Toplam Alacak (Tahsilat/Alış):</strong> ₺${entry.totalCreditTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
            <div><strong>Net Bakiye:</strong> ₺${Math.abs(entry.netBalanceTry).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} (${entry.netBalanceTry > 0 ? 'B' : entry.netBalanceTry < 0 ? 'A' : '-'})</div>
          </div>
        </div>
      </div>
    `;

    renderSafeHtml(modal, modalHtml);
    document.body.appendChild(modal);

    modal.querySelector('#close-ledger-btn')?.addEventListener('click', () => modal.remove());
    modal.querySelector('#print-ledger-btn')?.addEventListener('click', () => window.print());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  function renderAccountingModule(box) {
    const invoices = store.accountingInvoices || [];
    const transactions = store.accountingTransactions || [];
    const cheques = store.chequesAndNotes || [];
    const orders = store.orders || [];
    const todayIso = new Date().toISOString().slice(0, 10);

    // 1. Gerçek Zamanlı Finansal & Vergi Hesaplamaları (Sıfır Sahte Veri)
    const salesInvoices = invoices.filter((i) => i.invoiceType === 'SATIS');
    const purchaseInvoices = invoices.filter((i) => i.invoiceType === 'ALIS');
    const returnInvoices = invoices.filter((i) => i.invoiceType === 'IADE');

    const totalSalesTry = salesInvoices.reduce((s, i) => s + Number(i.grandTotalTry || 0), 0);
    const totalPurchasesTry = purchaseInvoices.reduce((s, i) => s + Number(i.grandTotalTry || 0), 0);
    const openReceivablesTry = salesInvoices.reduce((s, i) => s + Number(i.remainingAmountTry || 0), 0);
    const openPayablesTry = purchaseInvoices.reduce((s, i) => s + Number(i.remainingAmountTry || 0), 0);
    const overdueSalesInvoices = salesInvoices.filter((i) => Number(i.remainingAmountTry || 0) > 0 && i.dueDate && i.dueDate < todayIso);
    const overdueReceivablesTry = overdueSalesInvoices.reduce((s, i) => s + Number(i.remainingAmountTry || 0), 0);

    // KDV & Tevkifat Dengesi (TL bazında kur çarpımlı gerçek hesap)
    const accruedSalesVatTry = salesInvoices.reduce((s, i) => s + (Number(i.vatAmount || 0) - Number(i.withholdingAmount || 0)) * Number(i.exchangeRate || 1), 0);
    const deductiblePurchaseVatTry = purchaseInvoices.reduce((s, i) => s + Number(i.vatAmount || 0) * Number(i.exchangeRate || 1), 0);
    const totalWithholdingTry = invoices.reduce((s, i) => s + Number(i.withholdingAmount || 0) * Number(i.exchangeRate || 1), 0);
    const netVatBalanceTry = accruedSalesVatTry - deductiblePurchaseVatTry;

    // Kasa & Banka Hareketleri
    const totalCashInTry = transactions.filter((t) => t.direction === 'TAHSILAT').reduce((s, t) => s + Number(t.amountTry || 0), 0);
    const totalSupplierOutTry = transactions.filter((t) => t.direction === 'TEDIYE').reduce((s, t) => s + Number(t.amountTry || 0), 0);
    const totalExpenseOutTry = transactions.filter((t) => t.direction === 'GIDER').reduce((s, t) => s + Number(t.amountTry || 0), 0);
    const netCashFlowTry = totalCashInTry - totalSupplierOutTry - totalExpenseOutTry;

    // Çek & Senet Portföyü
    const customerInstrumentsInPortfolio = cheques.filter((c) => c.instrumentType.startsWith('MUSTERI') && ['Portföyde', 'Bankada Tahsilde'].includes(c.status));
    const issuedCompanyInstruments = cheques.filter((c) => c.instrumentType.startsWith('FIRMA') && !['Tahsil Edildi / Ödendi'].includes(c.status));
    const portfolioChequesTotalTry = customerInstrumentsInPortfolio.reduce((s, c) => s + Number(c.amountTry || 0), 0);
    const issuedChequesTotalTry = issuedCompanyInstruments.reduce((s, c) => s + Number(c.amountTry || 0), 0);

    // Henüz Faturalanmamış Onaylı Siparişler (Tek Tıkla Faturalama için)
    const unbilledOrders = orders.filter((o) => o.status !== 'İptal' && o.status !== 'Faturalandı' && !invoices.some((inv) => inv.orderId === o.id));

    // Cari Hesap Ekstre Matrisi (Müşteriler + Tedarikçiler + Faturalar + Kasa Hareketleri)
    const ledgerMap = new Map();
    const ensureParty = (name, role = 'Müşteri', taxNo = '', info = '') => {
      const key = String(name || '').trim().toUpperCase();
      if (!key) return null;
      if (!ledgerMap.has(key)) {
        ledgerMap.set(key, {
          companyName: String(name).trim(),
          partyRole: role,
          taxNumber: taxNo,
          contactInfo: info,
          totalDebitTry: 0,
          totalCreditTry: 0,
          overdueRiskTry: 0,
          movements: []
        });
      } else {
        const ex = ledgerMap.get(key);
        if (taxNo && !ex.taxNumber) ex.taxNumber = taxNo;
        if (info && !ex.contactInfo) ex.contactInfo = info;
      }
      return ledgerMap.get(key);
    };

    (store.customers || []).forEach((c) => ensureParty(c.companyName, 'Müşteri', c.taxInfo || '', c.email || c.phone || ''));
    (store.suppliers || []).forEach((s) => ensureParty(s.supplierName, 'Tedarikçi', '', s.contactInfo || ''));

    invoices.forEach((inv) => {
      const p = ensureParty(inv.companyName, inv.invoiceType === 'ALIS' ? 'Tedarikçi' : 'Müşteri', inv.taxNumber || '', inv.contactEmail || '');
      if (!p) return;
      const amtTry = Number(inv.grandTotalTry || 0);
      if (inv.invoiceType === 'SATIS') {
        p.totalDebitTry += amtTry;
        if (Number(inv.remainingAmountTry || 0) > 0 && inv.dueDate && inv.dueDate < todayIso) {
          p.overdueRiskTry += Number(inv.remainingAmountTry || 0);
        }
        p.movements.push({
          date: inv.issueDate || (inv.createdAtIso || '').slice(0, 10),
          refNo: inv.invoiceNo,
          label: `Satış Faturası (${inv.docCategory || 'E-FATURA'}) — Vade: ${inv.dueDate || '-'}`,
          debitTry: amtTry,
          creditTry: 0
        });
      } else if (inv.invoiceType === 'ALIS') {
        p.totalCreditTry += amtTry;
        p.movements.push({
          date: inv.issueDate || (inv.createdAtIso || '').slice(0, 10),
          refNo: inv.invoiceNo,
          label: `Alış / Tedarik Faturası (${inv.docCategory || 'E-FATURA'})`,
          debitTry: 0,
          creditTry: amtTry
        });
      } else {
        p.totalCreditTry += amtTry;
        p.movements.push({
          date: inv.issueDate || (inv.createdAtIso || '').slice(0, 10),
          refNo: inv.invoiceNo,
          label: `İade Faturası`,
          debitTry: 0,
          creditTry: amtTry
        });
      }
    });

    transactions.forEach((trx) => {
      const p = ensureParty(trx.companyName, trx.direction === 'TAHSILAT' ? 'Müşteri' : 'Tedarikçi / Gider');
      if (!p) return;
      const amtTry = Number(trx.amountTry || 0);
      if (trx.direction === 'TAHSILAT') {
        p.totalCreditTry += amtTry;
        p.movements.push({
          date: trx.transactionDate || (trx.createdAtIso || '').slice(0, 10),
          refNo: trx.referenceNo || trx.invoiceNo || 'TAHSİLAT',
          label: `Tahsilat (${trx.paymentMethod || 'Banka'}) — ${trx.accountName || ''}`,
          debitTry: 0,
          creditTry: amtTry
        });
      } else {
        p.totalDebitTry += amtTry;
        p.movements.push({
          date: trx.transactionDate || (trx.createdAtIso || '').slice(0, 10),
          refNo: trx.referenceNo || trx.invoiceNo || trx.direction,
          label: `${trx.direction === 'TEDIYE' ? 'Tedarikçi Ödemesi' : `Gider (${trx.category})`} — ${trx.accountName || ''}`,
          debitTry: amtTry,
          creditTry: 0
        });
      }
    });

    const ledgerEntries = Array.from(ledgerMap.values()).map((entry) => ({
      ...entry,
      netBalanceTry: Math.round((entry.totalDebitTry - entry.totalCreditTry) * 100) / 100
    })).sort((a, b) => Math.abs(b.netBalanceTry) - Math.abs(a.netBalanceTry));

    const filteredInvoices = invoices.filter((inv) => {
      if (accountingInvoiceFilter === 'SATIS') return inv.invoiceType === 'SATIS';
      if (accountingInvoiceFilter === 'ALIS') return inv.invoiceType === 'ALIS';
      if (accountingInvoiceFilter === 'OVERDUE') return Number(inv.remainingAmountTry || 0) > 0 && inv.dueDate && inv.dueDate < todayIso;
      return true;
    });

    // Kasa / Banka Hesap Bazlı Bakiye Özeti
    const accountNames = [
      'Merkez TL Kasa',
      'Kurumsal Banka — TL Ticari Hesap',
      'Kurumsal Banka — USD İhracat Hesabı',
      'Kurumsal Banka — EUR İthalat/İhracat Hesabı',
      'Kurumsal POS / Kredi Kartı Hesabı'
    ];
    const accountBalances = accountNames.map((accName) => {
      const accTrx = transactions.filter((t) => t.accountName === accName);
      const inTry = accTrx.filter((t) => t.direction === 'TAHSILAT').reduce((s, t) => s + Number(t.amountTry || 0), 0);
      const outTry = accTrx.filter((t) => t.direction !== 'TAHSILAT').reduce((s, t) => s + Number(t.amountTry || 0), 0);
      return {
        accountName: accName,
        inTry,
        outTry,
        netTry: inTry - outTry,
        count: accTrx.length
      };
    });

    const html = `
      <div class="admin-module-header">
        <div>
          <h2>8. Gelişmiş B2B Muhasebe, E-Fatura, KDV Tevkifat, Kasa/Banka & Çek-Senet ERP Modülü</h2>
          <p>İzole <code>${escapeHtml(DATABASE_ID)}</code> veritabanı üzerinde gerçek zamanlı fatura, KDV tevkifatı, çoklu döviz (TRY/USD/EUR), çek/senet vade ve cari ekstre yönetimi.</p>
        </div>
        <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
          <button type="button" class="btn ${accountingTab === 'overview' ? 'btn-primary' : 'btn-secondary'} btn-sm acc-tab-btn" data-tab="overview">1. Finansal Kokpit & KDV</button>
          <button type="button" class="btn ${accountingTab === 'invoices' ? 'btn-primary' : 'btn-secondary'} btn-sm acc-tab-btn" data-tab="invoices">2. E-Fatura & Tevkifat (${invoices.length})</button>
          <button type="button" class="btn ${accountingTab === 'cashbank' ? 'btn-primary' : 'btn-secondary'} btn-sm acc-tab-btn" data-tab="cashbank">3. Kasa, Banka & Gider (${transactions.length})</button>
          <button type="button" class="btn ${accountingTab === 'cheques' ? 'btn-primary' : 'btn-secondary'} btn-sm acc-tab-btn" data-tab="cheques">4. Çek & Senet Portföyü (${cheques.length})</button>
          <button type="button" class="btn ${accountingTab === 'ledger' ? 'btn-primary' : 'btn-secondary'} btn-sm acc-tab-btn" data-tab="ledger">5. Cari Hesap Ekstreleri (${ledgerEntries.length})</button>
        </div>
      </div>
      ${focusBannerHtml()}

      <!-- Üst Finansal KPI Kartları (Her Sekmede Görünür) -->
      <div class="admin-kpi-grid" style="margin-bottom:1.5rem;">
        <div class="admin-kpi-card" style="border-left:4px solid #059669;">
          <span class="kpi-title">Toplam Kesilen Satış Faturası</span>
          <strong class="kpi-num" style="color:#059669;">₺${totalSalesTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
          <span class="kpi-sub">${salesInvoices.length} satış faturası | İade: ${returnInvoices.length}</span>
        </div>
        <div class="admin-kpi-card" style="border-left:4px solid #0284c7;">
          <span class="kpi-title">Açık Müşteri Alacakları (Bakiye)</span>
          <strong class="kpi-num" style="color:#0284c7;">₺${openReceivablesTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
          <span class="kpi-sub">Vadesi Geçen: <strong style="color:#dc2626;">₺${overdueReceivablesTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong> (${overdueSalesInvoices.length} fatura)</span>
        </div>
        <div class="admin-kpi-card" style="border-left:4px solid #d97706;">
          <span class="kpi-title">Alış Faturaları & Tedarik Borcu</span>
          <strong class="kpi-num" style="color:#d97706;">₺${totalPurchasesTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
          <span class="kpi-sub">Kalan Tedarikçi Borcu: ₺${openPayablesTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
        </div>
        <div class="admin-kpi-card" style="border-left:4px solid #10b981;">
          <span class="kpi-title">Net Kasa & Banka Nakit Akışı</span>
          <strong class="kpi-num" style="color:${netCashFlowTry >= 0 ? '#059669' : '#dc2626'};">₺${netCashFlowTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
          <span class="kpi-sub">Giriş: ₺${totalCashInTry.toLocaleString('tr-TR', { minimumFractionDigits: 0 })} | Çıkış: ₺${(totalSupplierOutTry + totalExpenseOutTry).toLocaleString('tr-TR', { minimumFractionDigits: 0 })}</span>
        </div>
        <div class="admin-kpi-card" style="border-left:4px solid #7c3aed;">
          <span class="kpi-title">KDV & Tevkifat Dengesi</span>
          <strong class="kpi-num" style="color:#7c3aed;">₺${Math.abs(netVatBalanceTry).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
          <span class="kpi-sub">${netVatBalanceTry >= 0 ? 'Ödenecek KDV' : 'Devreden İndirilecek KDV'} | Tevkifat: ₺${totalWithholdingTry.toLocaleString('tr-TR', { minimumFractionDigits: 0 })}</span>
        </div>
        <div class="admin-kpi-card" style="border-left:4px solid #0f172a;">
          <span class="kpi-title">Portföydeki Müşteri Çek/Senet</span>
          <strong class="kpi-num">₺${portfolioChequesTotalTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
          <span class="kpi-sub">${customerInstrumentsInPortfolio.length} evrak | Verilen Çekimiz: ₺${issuedChequesTotalTry.toLocaleString('tr-TR', { minimumFractionDigits: 0 })}</span>
        </div>
      </div>

      ${accountingTab === 'overview' ? `
        <!-- SEKME 1: FİNANSAL KOKPİT, KDV ÖZETİ & SİPARİŞTEN TEK TIKLA FATURA -->
        <div class="admin-two-col" style="margin-bottom:1.5rem;">
          <div class="card" style="padding:1.5rem;">
            <h3 style="margin-bottom:0.75rem;">KDV, Tevkifat ve Nakit Akışı Bilanço Özeti</h3>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Muhasebe Kalemi</th>
                  <th>Belge / İşlem Sayısı</th>
                  <th style="text-align:right;">TL Karşılığı Tutar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Hesaplanan Satış KDV'si (Tevkifat Düşülmüş)</strong></td>
                  <td>${salesInvoices.length} Satış Faturası</td>
                  <td style="text-align:right;font-weight:700;color:#059669;">₺${accruedSalesVatTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                  <td><strong>İndirilecek Alış / Tedarik KDV'si</strong></td>
                  <td>${purchaseInvoices.length} Alış Faturası</td>
                  <td style="text-align:right;font-weight:700;color:#0284c7;">₺${deductiblePurchaseVatTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                  <td><strong>Uygulanan KDV Tevkifat Kesintisi Toplamı</strong></td>
                  <td>Tevkifatlı Faturalar</td>
                  <td style="text-align:right;font-weight:700;color:#d97706;">₺${totalWithholdingTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                  <td><strong>Net KDV Durumu (${netVatBalanceTry >= 0 ? 'Ödenecek KDV' : 'Devreden KDV'})</strong></td>
                  <td>Dönem Sonu KDV Farkı</td>
                  <td style="text-align:right;font-weight:900;color:${netVatBalanceTry >= 0 ? '#dc2626' : '#059669'};">₺${Math.abs(netVatBalanceTry).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                  <td><strong>Operasyonel Gider Çıkışları (Nakliye, Enerji, Analiz vb.)</strong></td>
                  <td>${transactions.filter((t) => t.direction === 'GIDER').length} Gider Kaydı</td>
                  <td style="text-align:right;font-weight:700;color:#dc2626;">₺${totalExpenseOutTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="card" style="padding:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
              <h3>Onaylı Siparişlerden Tek Tıkla E-Fatura Kes (${unbilledOrders.length})</h3>
              <button type="button" class="btn btn-secondary btn-sm acc-tab-btn" data-tab="invoices">Manuel Fatura Ekranı →</button>
            </div>
            ${unbilledOrders.length === 0 ? `
              <div class="empty-state-box">
                <p>Faturalanmayı bekleyen açık sipariş bulunmuyor. Tüm onaylı siparişler faturalandırılmış veya henüz yeni sipariş girilmemiştir.</p>
              </div>
            ` : `
              <div class="products-table-wrapper">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Sipariş No</th>
                      <th>Müşteri Firma</th>
                      <th>Tutar (KDV Dahil)</th>
                      <th>Tahsilat</th>
                      <th>İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${unbilledOrders.map((ord) => {
                      const grand = Number(ord.grandTotal || 0);
                      const sub = Math.round((grand / 1.2) * 100) / 100;
                      return `
                        <tr>
                          <td><code>${escapeHtml(ord.orderNo)}</code></td>
                          <td><strong>${escapeHtml(ord.companyName)}</strong></td>
                          <td><strong>₺${grand.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong></td>
                          <td>₺${Number(ord.collectedAmount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                          <td>
                            <button type="button" class="btn btn-primary btn-sm quick-bill-order-btn"
                              data-order-id="${escapeAttr(ord.id)}"
                              data-order-no="${escapeAttr(ord.orderNo || '')}"
                              data-company="${escapeAttr(ord.companyName || '')}"
                              data-email="${escapeAttr(ord.customerEmail || '')}"
                              data-subtotal="${escapeAttr(String(sub))}"
                              data-collected="${escapeAttr(String(ord.collectedAmount || 0))}"
                              data-items="${escapeAttr(ord.itemsSummary || '')}">
                              ⚡ E-Fatura Oluştur
                            </button>
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>
      ` : ''}

      ${accountingTab === 'invoices' ? `
        <!-- SEKME 2: FATURALAR, E-FATURA / E-ARŞİV / İHRACAT & KDV TEVKİFAT YÖNETİMİ -->
        <div class="card" id="accounting-invoices-anchor" style="padding:1.5rem;margin-bottom:1.5rem;">
          <h3>Yeni Resmi Fatura Kaydı (E-Fatura / E-Arşiv / İhracat / Alış Faturası)</h3>
          <form id="admin-acc-invoice-form" class="form-grid-4" style="margin-top:1rem;">
            <div class="form-group">
              <label class="form-label">Fatura Yönü *</label>
              <select name="invoiceType" class="form-select" id="acc-inv-type">
                <option value="SATIS">SATIŞ FATURASI (Müşteri)</option>
                <option value="ALIS">ALIŞ / TEDARİK FATURASI (Tedarikçi)</option>
                <option value="IADE">İADE FATURASI</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">E-Belge Kategorisi *</label>
              <select name="docCategory" class="form-select">
                <option value="E-FATURA">E-FATURA (Ticari / Temel)</option>
                <option value="E-ARSIV">E-ARŞİV FATURA</option>
                <option value="IHRACAT">İHRACAT FATURASI (Gümrük / İstisna)</option>
                <option value="PROFORMA">PROFORMA FATURA</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Fatura Numarası (GİB / Seri)</label>
              <input type="text" name="invoiceNo" class="form-input" placeholder="Otomatik: EF${new Date().getFullYear()}..." />
            </div>
            <div class="form-group">
              <label class="form-label">Bağlı Sipariş (Opsiyonel)</label>
              <select name="orderId" class="form-select" id="acc-inv-order-select">
                <option value="">— Siparişten Bağımsız / Manuel —</option>
                ${orders.map((o) => `
                  <option value="${escapeAttr(o.id)}"
                    data-order-no="${escapeAttr(o.orderNo || '')}"
                    data-company="${escapeAttr(o.companyName || '')}"
                    data-email="${escapeAttr(o.customerEmail || '')}"
                    data-grand="${escapeAttr(String(o.grandTotal || 0))}"
                    data-collected="${escapeAttr(String(o.collectedAmount || 0))}"
                    data-items="${escapeAttr(o.itemsSummary || '')}">
                    ${escapeHtml(o.orderNo)} — ${escapeHtml(o.companyName)} (₺${Number(o.grandTotal || 0).toLocaleString('tr-TR')})
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Cari Firma Ünvanı *</label>
              <input type="text" name="companyName" id="acc-inv-company" class="form-input" required placeholder="Örn: SASA Polyester Sanayi A.Ş." />
            </div>
            <div class="form-group">
              <label class="form-label">Vergi Dairesi</label>
              <input type="text" name="taxOffice" class="form-input" placeholder="Örn: Büyük Mükellefler / Ziyapaşa VD" />
            </div>
            <div class="form-group">
              <label class="form-label">Vergi No (VKN) / TCKN</label>
              <input type="text" name="taxNumber" class="form-input" placeholder="10 veya 11 haneli vergi no" />
            </div>
            <div class="form-group">
              <label class="form-label">Cari E-posta (Müşteri Portalı)</label>
              <input type="email" name="contactEmail" id="acc-inv-email" class="form-input" placeholder="muhasebe@firma.com.tr" />
            </div>

            <div class="form-group">
              <label class="form-label">Para Birimi *</label>
              <select name="currency" id="acc-inv-currency" class="form-select">
                <option value="TRY">TRY (₺ - Türk Lirası)</option>
                <option value="USD">USD ($ - Amerikan Doları)</option>
                <option value="EUR">EUR (€ - Euro)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Döviz Kuru (TRY için 1)</label>
              <input type="number" step="0.0001" min="0.0001" name="exchangeRate" id="acc-inv-rate" class="form-input" value="1" required />
            </div>
            <div class="form-group">
              <label class="form-label">KDV Hariç Ara Toplam *</label>
              <input type="number" step="0.01" min="0" name="subtotal" id="acc-inv-subtotal" class="form-input" required placeholder="Örn: 85000" />
            </div>
            <div class="form-group">
              <label class="form-label">İskonto Tutarı</label>
              <input type="number" step="0.01" min="0" name="discountTotal" id="acc-inv-discount" class="form-input" value="0" />
            </div>

            <div class="form-group">
              <label class="form-label">KDV Oranı (%)</label>
              <select name="vatRate" id="acc-inv-vat" class="form-select">
                <option value="20">%20 (Genel Kimyasal & Sistem KDV)</option>
                <option value="10">%10 (İndirimli Oran)</option>
                <option value="1">%1</option>
                <option value="0">%0 (İhracat / İstisna)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">KDV Tevkifat Oranı</label>
              <select name="withholdingRate" id="acc-inv-withholding" class="form-select">
                <option value="Yok">Yok (Tevkifatsız)</option>
                <option value="2/10">2/10 Tevkifat</option>
                <option value="3/10">3/10 Tevkifat</option>
                <option value="4/10">4/10 Tevkifat</option>
                <option value="5/10">5/10 Tevkifat (Bakım / Onarım / Mühendislik)</option>
                <option value="7/10">7/10 Tevkifat</option>
                <option value="9/10">9/10 Tevkifat (İşgücü / Danışmanlık)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Fatura Tarihi</label>
              <input type="date" name="issueDate" class="form-input" value="${todayIso}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Vade Tarihi *</label>
              <input type="date" name="dueDate" class="form-input" value="${new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10)}" required />
            </div>

            <div class="form-group">
              <label class="form-label">Ödeme Durumu</label>
              <select name="paymentStatus" id="acc-inv-paystatus" class="form-select">
                <option value="Ödeme Bekliyor">Ödeme Bekliyor (Açık Fatura)</option>
                <option value="Kısmi Ödeme">Kısmi Ödeme Alındı</option>
                <option value="Ödendi">Tamamı Ödendi / Kapalı</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Peşin Tahsil Edilen / Ödenen (Döviz)</label>
              <input type="number" step="0.01" min="0" name="paidAmount" id="acc-inv-paid" class="form-input" value="0" />
            </div>
            <div class="form-group" style="grid-column:span 2;">
              <label class="form-label">Fatura Kalemleri & Açıklama *</label>
              <input type="text" name="description" id="acc-inv-desc" class="form-input" required placeholder="Örn: 5 IBC RO Antiskalant + Medipure EDI Saf Su Modülü Bakımı" />
            </div>

            <div class="form-group full-width">
              <div id="acc-inv-live-preview" style="padding:0.85rem 1.1rem;background:#0f172a;color:#f8fafc;border-radius:8px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.86rem;">
                <span>Canlı Hesaplama: <strong>Net Matrah: 0,00</strong> | <strong>KDV: 0,00</strong> | <strong>Tevkifat: 0,00</strong></span>
                <span style="color:#34d399;font-weight:800;font-size:0.95rem;">Genel Toplam: 0,00 (TL Karşılığı: ₺0,00)</span>
              </div>
            </div>

            <div class="form-group full-width">
              <button type="submit" class="btn btn-primary btn-sm">Resmi Faturayı Sunucuya Kaydet</button>
            </div>
          </form>
        </div>

        <div class="card" style="padding:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:0.5rem;">
            <h3>Kayıtlı Resmi Faturalar (${filteredInvoices.length})</h3>
            <div style="display:flex;gap:0.4rem;">
              <button type="button" class="btn ${accountingInvoiceFilter === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm inv-filter-btn" data-filter="all">Tümü (${invoices.length})</button>
              <button type="button" class="btn ${accountingInvoiceFilter === 'SATIS' ? 'btn-primary' : 'btn-secondary'} btn-sm inv-filter-btn" data-filter="SATIS">Satış (${salesInvoices.length})</button>
              <button type="button" class="btn ${accountingInvoiceFilter === 'ALIS' ? 'btn-primary' : 'btn-secondary'} btn-sm inv-filter-btn" data-filter="ALIS">Alış (${purchaseInvoices.length})</button>
              <button type="button" class="btn ${accountingInvoiceFilter === 'OVERDUE' ? 'btn-primary' : 'btn-secondary'} btn-sm inv-filter-btn" data-filter="OVERDUE">Vadesi Geçen (${overdueSalesInvoices.length})</button>
            </div>
          </div>

          ${filteredInvoices.length === 0 ? `
            <div class="empty-state-box"><p>Seçili filtreye uygun fatura kaydı bulunmuyor.</p></div>
          ` : `
            <div class="products-table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Fatura No & Tür</th>
                    <th>Cari Firma & Vergi No</th>
                    <th>Tarih / Vade</th>
                    <th>KDV & Tevkifat</th>
                    <th>Genel Toplam (TL Karşılığı)</th>
                    <th>Kalan Açık Bakiye</th>
                    <th>Durum & İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  ${filteredInvoices.map((inv) => {
                    const isOverdue = Number(inv.remainingAmountTry || 0) > 0 && inv.dueDate && inv.dueDate < todayIso;
                    const sym = inv.currency === 'USD' ? '$' : inv.currency === 'EUR' ? '€' : '₺';
                    return `
                      <tr>
                        <td>
                          <code>${escapeHtml(inv.invoiceNo)}</code>
                          <div style="font-size:0.75rem;margin-top:0.2rem;">
                            <span class="badge ${inv.invoiceType === 'SATIS' ? 'badge-teal' : 'badge-neutral'}">${escapeHtml(inv.invoiceType)}</span>
                            <span class="badge badge-neutral">${escapeHtml(inv.docCategory || 'E-FATURA')}</span>
                          </div>
                        </td>
                        <td>
                          <strong>${escapeHtml(inv.companyName)}</strong>
                          <div style="font-size:0.76rem;color:var(--text-secondary);">VKN: ${escapeHtml(inv.taxNumber || '-')} | ${escapeHtml(inv.description || '').slice(0, 45)}</div>
                        </td>
                        <td style="font-size:0.8rem;">
                          <div>Fatura: ${escapeHtml(inv.issueDate || '-')}</div>
                          <div style="color:${isOverdue ? '#dc2626' : 'var(--text-secondary)'};font-weight:${isOverdue ? '800' : '400'};">
                            Vade: ${escapeHtml(inv.dueDate || '-')} ${isOverdue ? '⚠️ Gecikti' : ''}
                          </div>
                        </td>
                        <td style="font-size:0.8rem;">
                          <div>KDV %${Number(inv.vatRate || 20)}: ${sym}${Number(inv.vatAmount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
                          ${inv.withholdingRate && inv.withholdingRate !== 'Yok' ? `<div style="color:#d97706;font-weight:700;">Tevkifat (${escapeHtml(inv.withholdingRate)}): -${sym}${Number(inv.withholdingAmount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>` : ''}
                        </td>
                        <td>
                          <strong>₺${Number(inv.grandTotalTry || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
                          ${inv.currency !== 'TRY' ? `<div style="font-size:0.76rem;color:var(--text-secondary);">(${sym}${Number(inv.grandTotal || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} @ ${Number(inv.exchangeRate || 1)})</div>` : ''}
                        </td>
                        <td>
                          <strong style="color:${Number(inv.remainingAmountTry || 0) > 0 ? '#dc2626' : '#059669'};">
                            ₺${Number(inv.remainingAmountTry || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                          </strong>
                        </td>
                        <td>
                          <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:flex-start;">
                            <span class="badge ${inv.paymentStatus === 'Ödendi' ? 'badge-teal' : 'badge-neutral'}">${escapeHtml(inv.paymentStatus)}</span>
                            <button type="button" class="btn btn-secondary btn-sm print-invoice-row-btn" data-inv-id="${escapeAttr(inv.id)}">🖨️ A4 Yazdır</button>
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      ` : ''}

      ${accountingTab === 'cashbank' ? `
        <!-- SEKME 3: KASA, BANKA, TAHSİLAT, TEDİYE & OPERASYONEL GİDER MERKEZİ -->
        <div class="admin-kpi-grid" id="accounting-cash-anchor" style="margin-bottom:1.5rem;">
          ${accountBalances.map((acc) => `
            <div class="admin-kpi-card">
              <span class="kpi-title">${escapeHtml(acc.accountName)}</span>
              <strong class="kpi-num" style="font-size:1.25rem;color:${acc.netTry >= 0 ? '#059669' : '#dc2626'};">₺${acc.netTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
              <span class="kpi-sub">+₺${acc.inTry.toLocaleString('tr-TR', { minimumFractionDigits: 0 })} / -₺${acc.outTry.toLocaleString('tr-TR', { minimumFractionDigits: 0 })} (${acc.count} işlem)</span>
            </div>
          `).join('')}
        </div>

        <div class="card" style="padding:1.5rem;margin-bottom:1.5rem;">
          <h3>Yeni Kasa / Banka Tahsilat, Tedarikçi Ödemesi (Tediye) veya Gider Kaydı</h3>
          <form id="admin-acc-trx-form" class="form-grid-4" style="margin-top:1rem;">
            <div class="form-group">
              <label class="form-label">İşlem Yönü *</label>
              <select name="direction" class="form-select" id="acc-trx-direction">
                <option value="TAHSILAT">TAHSİLAT (+ Müşteri Para Girişi)</option>
                <option value="TEDIYE">TEDİYE (- Tedarikçi Ödemesi)</option>
                <option value="GIDER">OPERASYONEL GİDER (- Masraf Çıkışı)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Kategori *</label>
              <select name="category" class="form-select">
                <option value="Müşteri Fatura Tahsilatı">Müşteri Fatura Tahsilatı</option>
                <option value="Tedarikçi Hammadde Ödemesi">Tedarikçi Hammadde / Ekipman Ödemesi</option>
                <option value="Nakliye & Lojistik (ADR/Sevkiyat)">Nakliye & Lojistik (ADR / Sevkiyat)</option>
                <option value="Laboratuvar, ICP-OES & Su Analizi">Laboratuvar, ICP-OES & Su Analizi</option>
                <option value="Saha Montaj, Servis & Yakıt">Saha Montaj, Servis & Yakıt</option>
                <option value="Personel, SGK & İSG Gideri">Personel, SGK & İSG Gideri</option>
                <option value="Vergi, Gümrük & Resmi Harçlar">Vergi, Gümrük & Resmi Harçlar</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Kasa / Banka Hesabı *</label>
              <select name="accountName" class="form-select">
                ${accountNames.map((acc) => `<option value="${escapeAttr(acc)}">${escapeHtml(acc)}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Ödeme Kanalı *</label>
              <select name="paymentMethod" class="form-select">
                <option value="Banka Havale / EFT">Banka Havale / EFT / FAST</option>
                <option value="Nakit Kasa">Nakit Kasa</option>
                <option value="Kurumsal Kredi Kartı / POS">Kurumsal Kredi Kartı / POS</option>
                <option value="Çek / Senet Mahsubu">Çek / Senet Tahsilatı</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Bağlı Fatura (Otomatik Bakiye Düşer)</label>
              <select name="invoiceId" id="acc-trx-invoice-select" class="form-select">
                <option value="">— Faturadan Bağımsız Cari İşlem —</option>
                ${invoices.filter((i) => Number(i.remainingAmountTry || 0) > 0).map((inv) => `
                  <option value="${escapeAttr(inv.id)}"
                    data-inv-no="${escapeAttr(inv.invoiceNo)}"
                    data-company="${escapeAttr(inv.companyName)}"
                    data-remaining="${escapeAttr(String(inv.remainingAmountTry || 0))}">
                    ${escapeHtml(inv.invoiceNo)} — ${escapeHtml(inv.companyName)} (Açık: ₺${Number(inv.remainingAmountTry || 0).toLocaleString('tr-TR')})
                  </option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Cari Firma / Ödeme Yapılan Kurum *</label>
              <input type="text" name="companyName" id="acc-trx-company" class="form-input" required placeholder="Örn: Bossa Ticaret ve Sanayi A.Ş." />
            </div>
            <div class="form-group">
              <label class="form-label">Tutar *</label>
              <input type="number" step="0.01" min="0.01" name="amount" id="acc-trx-amount" class="form-input" required placeholder="Örn: 50000" />
            </div>
            <div class="form-group">
              <label class="form-label">Döviz & Kur</label>
              <div style="display:flex;gap:0.35rem;">
                <select name="currency" class="form-select" style="width:95px;">
                  <option value="TRY">TRY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
                <input type="number" step="0.0001" min="0.0001" name="exchangeRate" class="form-input" value="1" placeholder="Kur" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Dekont / Evrak Referans No</label>
              <input type="text" name="referenceNo" class="form-input" placeholder="Örn: DEK-2026-9941" />
            </div>
            <div class="form-group">
              <label class="form-label">İşlem Tarihi</label>
              <input type="date" name="transactionDate" class="form-input" value="${todayIso}" required />
            </div>
            <div class="form-group" style="grid-column:span 2;">
              <label class="form-label">Açıklama</label>
              <input type="text" name="notes" class="form-input" placeholder="Örn: 1. Kısmi fatura ödemesi / Adana-Gaziantep ADR tanker nakliye bedeli" />
            </div>

            <div class="form-group full-width">
              <button type="submit" class="btn btn-primary btn-sm">Kasa / Banka Hareketini Kaydet</button>
            </div>
          </form>
        </div>

        <div class="card" style="padding:1.5rem;">
          <h3>Kasa ve Banka Hareket Defteri (${transactions.length})</h3>
          ${transactions.length === 0 ? `
            <div class="empty-state-box"><p>Henüz kasa veya banka hareketi girilmedi.</p></div>
          ` : `
            <div class="products-table-wrapper" style="margin-top:0.75rem;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Tarih</th>
                    <th>Yön & Kategori</th>
                    <th>Cari Firma / Kurum</th>
                    <th>Kasa / Banka & Yöntem</th>
                    <th>Referans / Fatura</th>
                    <th style="text-align:right;">Tutar (TL Karşılığı)</th>
                  </tr>
                </thead>
                <tbody>
                  ${transactions.map((t) => `
                    <tr>
                      <td>${escapeHtml(t.transactionDate || (t.createdAtIso || '').slice(0, 10))}</td>
                      <td>
                        <span class="badge ${t.direction === 'TAHSILAT' ? 'badge-teal' : 'badge-neutral'}">${escapeHtml(t.direction)}</span>
                        <div style="font-size:0.76rem;color:var(--text-secondary);margin-top:0.15rem;">${escapeHtml(t.category || '')}</div>
                      </td>
                      <td>
                        <strong>${escapeHtml(t.companyName)}</strong>
                        <div style="font-size:0.75rem;color:var(--text-muted);">${escapeHtml(t.notes || '')}</div>
                      </td>
                      <td style="font-size:0.8rem;">
                        <div><strong>${escapeHtml(t.accountName)}</strong></div>
                        <div style="color:var(--text-secondary);">${escapeHtml(t.paymentMethod)}</div>
                      </td>
                      <td><code>${escapeHtml(t.referenceNo || t.invoiceNo || '-')}</code></td>
                      <td style="text-align:right;font-weight:800;color:${t.direction === 'TAHSILAT' ? '#059669' : '#dc2626'};">
                        ${t.direction === 'TAHSILAT' ? '+' : '-'}₺${Number(t.amountTry || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      ` : ''}

      ${accountingTab === 'cheques' ? `
        <!-- SEKME 4: ÇEK & SENET PORTFÖYÜ, CİRO VE VADE TAKİBİ -->
        <div class="card" id="accounting-cheques-anchor" style="padding:1.5rem;margin-bottom:1.5rem;">
          <h3>Yeni Çek veya Kambiyo Senedi Kaydı (Alınan Müşteri Çeki / Verilen Firma Çeki)</h3>
          <form id="admin-acc-cheque-form" class="form-grid-4" style="margin-top:1rem;">
            <div class="form-group">
              <label class="form-label">Kıymetli Evrak Türü *</label>
              <select name="instrumentType" class="form-select">
                <option value="MUSTERI_CEKI">ALINAN MÜŞTERİ ÇEKİ (Portföy Girişi)</option>
                <option value="MUSTERI_SENEDI">ALINAN MÜŞTERİ SENEDİ</option>
                <option value="FIRMA_CEKI">VERİLEN KENDİ FİRMA ÇEKİMİZ</option>
                <option value="FIRMA_SENEDI">VERİLEN FİRMA SENEDİMİZ</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Portföy No</label>
              <input type="text" name="portfolioNo" class="form-input" placeholder="Otomatik: PRT-2026-..." />
            </div>
            <div class="form-group">
              <label class="form-label">Cari Firma / Keşideci *</label>
              <input type="text" name="companyName" class="form-input" required placeholder="Örn: Kıvanç Tekstil San. A.Ş." />
            </div>
            <div class="form-group">
              <label class="form-label">Banka & Şube Adı *</label>
              <input type="text" name="bankName" class="form-input" required placeholder="Örn: İş Bankası Adana Ticari Şb." />
            </div>

            <div class="form-group">
              <label class="form-label">Çek / Senet Seri No *</label>
              <input type="text" name="serialNumber" class="form-input" required placeholder="Örn: TR-CHK-884120" />
            </div>
            <div class="form-group">
              <label class="form-label">Evrak Tutarı *</label>
              <input type="number" step="0.01" min="0.01" name="amount" class="form-input" required placeholder="Örn: 125000" />
            </div>
            <div class="form-group">
              <label class="form-label">Döviz & Kur</label>
              <div style="display:flex;gap:0.35rem;">
                <select name="currency" class="form-select" style="width:95px;">
                  <option value="TRY">TRY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
                <input type="number" step="0.0001" min="0.0001" name="exchangeRate" class="form-input" value="1" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Vade Tarihi *</label>
              <input type="date" name="maturityDate" class="form-input" required value="${new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10)}" />
            </div>

            <div class="form-group">
              <label class="form-label">Portföy Durumu</label>
              <select name="status" class="form-select">
                <option value="Portföyde">Portföyde (Kasada Bekliyor)</option>
                <option value="Bankada Tahsilde">Bankada Tahsilde / Teminatta</option>
                <option value="Ciro Edildi">Tedarikçiye Ciro Edildi</option>
                <option value="Tahsil Edildi / Ödendi">Tahsil Edildi / Ödendi</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Ciro Edilen Firma (Varsa)</label>
              <input type="text" name="endorsedTo" class="form-input" placeholder="Ciro edilen tedarikçi adı" />
            </div>
            <div class="form-group" style="grid-column:span 2;">
              <label class="form-label">Evrak Notu</label>
              <input type="text" name="notes" class="form-input" placeholder="Fatura mahsubu veya kefil bilgisi..." />
            </div>

            <div class="form-group full-width">
              <button type="submit" class="btn btn-primary btn-sm">Çek / Senet Evrakını Portföye Kaydet</button>
            </div>
          </form>
        </div>

        <div class="card" style="padding:1.5rem;">
          <h3>Çek & Senet Portföy Listesi ve Vade Takibi (${cheques.length})</h3>
          ${cheques.length === 0 ? `
            <div class="empty-state-box"><p>Portföyde kayıtlı çek veya senet bulunmuyor.</p></div>
          ` : `
            <div class="products-table-wrapper" style="margin-top:0.75rem;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Portföy & Evrak Türü</th>
                    <th>Cari / Keşideci</th>
                    <th>Banka & Seri No</th>
                    <th>Vade Tarihi & Kalan Gün</th>
                    <th>Tutar (TL Karşılığı)</th>
                    <th>Durum & Ciro Güncelle</th>
                  </tr>
                </thead>
                <tbody>
                  ${cheques.map((c) => {
                    const diffDays = c.maturityDate ? Math.ceil((new Date(c.maturityDate).getTime() - Date.now()) / 86400000) : 0;
                    return `
                      <tr>
                        <td>
                          <code>${escapeHtml(c.portfolioNo)}</code>
                          <div style="font-size:0.75rem;margin-top:0.15rem;"><span class="badge badge-neutral">${escapeHtml(c.instrumentType)}</span></div>
                        </td>
                        <td>
                          <strong>${escapeHtml(c.companyName)}</strong>
                          ${c.endorsedTo ? `<div style="font-size:0.75rem;color:#d97706;">Ciro: ${escapeHtml(c.endorsedTo)}</div>` : ''}
                        </td>
                        <td style="font-size:0.8rem;">
                          <div><strong>${escapeHtml(c.bankName || '-')}</strong></div>
                          <div>Seri: <code>${escapeHtml(c.serialNumber || '-')}</code></div>
                        </td>
                        <td style="font-size:0.82rem;">
                          <strong>${escapeHtml(c.maturityDate || '-')}</strong>
                          <div style="font-size:0.75rem;color:${diffDays < 0 && c.status !== 'Tahsil Edildi / Ödendi' ? '#dc2626' : '#059669'};font-weight:700;">
                            ${c.status === 'Tahsil Edildi / Ödendi' ? 'Kapandı' : diffDays < 0 ? `${Math.abs(diffDays)} gün geçti!` : `${diffDays} gün kaldı`}
                          </div>
                        </td>
                        <td><strong>₺${Number(c.amountTry || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong></td>
                        <td>
                          <div style="display:flex;gap:0.35rem;align-items:center;">
                            <select class="form-select cheque-status-select" data-cheque-id="${escapeAttr(c.id)}" style="width:auto;font-size:0.78rem;">
                              ${['Portföyde', 'Bankada Tahsilde', 'Ciro Edildi', 'Tahsil Edildi / Ödendi', 'Karşılıksız / Protestolu'].map((st) => `
                                <option value="${escapeAttr(st)}" ${c.status === st ? 'selected' : ''}>${escapeHtml(st)}</option>
                              `).join('')}
                            </select>
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      ` : ''}

      ${accountingTab === 'ledger' ? `
        <!-- SEKME 5: CARİ HESAP EKSTRELERİ, BORÇ/ALACAK BAKİYELERİ VE A4 MUTABAKAT -->
        <div class="card" style="padding:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:0.5rem;">
            <div>
              <h3>Cari Hesap Bakiyeleri, Alacak Yaşlandırma ve Mutabakat Merkezi (${ledgerEntries.length} Cari)</h3>
              <p style="font-size:0.82rem;color:var(--text-secondary);">Müşteri ve tedarikçilerin tüm satış/alış faturaları ile kasa/banka tahsilat ve tediyeleri birleştirilerek net bakiye hesaplanır.</p>
            </div>
          </div>

          ${ledgerEntries.length === 0 ? `
            <div class="empty-state-box"><p>Henüz cari hesap hareketi bulunmuyor.</p></div>
          ` : `
            <div class="products-table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Cari Firma Ünvanı</th>
                    <th>Rol & İletişim</th>
                    <th style="text-align:right;">Toplam Borç (Satış/Tediye)</th>
                    <th style="text-align:right;">Toplam Alacak (Tahsilat/Alış)</th>
                    <th style="text-align:right;">Vadesi Geçmiş Risk</th>
                    <th style="text-align:right;">Net Cari Bakiye</th>
                    <th>A4 Cari Ekstre</th>
                  </tr>
                </thead>
                <tbody>
                  ${ledgerEntries.map((entry, idx) => `
                    <tr>
                      <td>
                        <strong>${escapeHtml(entry.companyName)}</strong>
                        <div style="font-size:0.75rem;color:var(--text-muted);">${entry.movements.length} finansal hareket</div>
                      </td>
                      <td style="font-size:0.8rem;">
                        <span class="badge badge-neutral">${escapeHtml(entry.partyRole)}</span>
                        <div style="margin-top:0.15rem;color:var(--text-secondary);">${escapeHtml(entry.taxNumber || entry.contactInfo || '-')}</div>
                      </td>
                      <td style="text-align:right;font-weight:700;">₺${entry.totalDebitTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                      <td style="text-align:right;font-weight:700;color:#059669;">₺${entry.totalCreditTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                      <td style="text-align:right;font-weight:700;color:${entry.overdueRiskTry > 0 ? '#dc2626' : 'var(--text-muted)'};">
                        ₺${entry.overdueRiskTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                      </td>
                      <td style="text-align:right;font-weight:900;color:${entry.netBalanceTry > 0 ? '#059669' : entry.netBalanceTry < 0 ? '#dc2626' : 'var(--text-primary)'};">
                        ₺${Math.abs(entry.netBalanceTry).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        <span style="font-size:0.72rem;display:block;">${entry.netBalanceTry > 0 ? 'BORÇLU (Alacağımız)' : entry.netBalanceTry < 0 ? 'ALACAKLI (Borcumuz)' : 'KAPALI (0,00)'}</span>
                      </td>
                      <td>
                        <button type="button" class="btn btn-secondary btn-sm print-ledger-row-btn" data-ledger-idx="${idx}">📄 A4 Ekstre Yazdır</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      ` : ''}
    `;

    renderSafeHtml(box, html);
    bindFocusBanner(box, () => renderAccountingModule(box));

    // Sekme değiştirme
    box.querySelectorAll('.acc-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        accountingTab = btn.getAttribute('data-tab') || 'overview';
        renderAccountingModule(box);
      });
    });

    // Fatura filtreleme
    box.querySelectorAll('.inv-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        accountingInvoiceFilter = btn.getAttribute('data-filter') || 'all';
        renderAccountingModule(box);
      });
    });

    // Onaylı Siparişten Tek Tıkla E-Fatura Oluşturma (Finansal Kokpit sekmesinden)
    box.querySelectorAll('.quick-bill-order-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const orderId = btn.getAttribute('data-order-id') || '';
        const orderNo = btn.getAttribute('data-order-no') || '';
        const companyName = btn.getAttribute('data-company') || '';
        const contactEmail = btn.getAttribute('data-email') || '';
        const subtotal = Number(btn.getAttribute('data-subtotal') || 0);
        const collected = Number(btn.getAttribute('data-collected') || 0);
        const itemsSummary = btn.getAttribute('data-items') || '';
        try {
          btn.disabled = true;
          btn.textContent = 'Faturalanıyor...';
          await saveAccountingInvoice({
            invoiceType: 'SATIS',
            docCategory: 'E-FATURA',
            orderId,
            orderNo,
            companyName,
            contactEmail,
            currency: 'TRY',
            exchangeRate: 1,
            subtotal,
            discountTotal: 0,
            vatRate: 20,
            withholdingRate: 'Yok',
            paidAmount: collected,
            paymentStatus: collected >= subtotal * 1.2 ? 'Ödendi' : collected > 0 ? 'Kısmi Ödeme' : 'Ödeme Bekliyor',
            issueDate: todayIso,
            dueDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
            description: `${orderNo} Sipariş Faturası — ${itemsSummary}`
          }, currentProfile);
          showNotification(`${orderNo} siparişi için resmi E-Fatura oluşturuldu ve sipariş durumu güncellendi.`, 'success');
          await refreshStoreAndRender();
        } catch (err) {
          showNotification(err.message || 'Siparişten fatura oluşturulamadı.', 'error');
          btn.disabled = false;
          btn.textContent = '⚡ E-Fatura Oluştur';
        }
      });
    });

    // Fatura Formu Canlı Hesaplama & Sipariş Seçimi Otomatik Doldurma
    const invForm = box.querySelector('#admin-acc-invoice-form');
    if (invForm) {
      const ordSelect = invForm.querySelector('#acc-inv-order-select');
      const subInp = invForm.querySelector('#acc-inv-subtotal');
      const discInp = invForm.querySelector('#acc-inv-discount');
      const vatSel = invForm.querySelector('#acc-inv-vat');
      const withSel = invForm.querySelector('#acc-inv-withholding');
      const curSel = invForm.querySelector('#acc-inv-currency');
      const rateInp = invForm.querySelector('#acc-inv-rate');
      const previewEl = invForm.querySelector('#acc-inv-live-preview');

      const updateLiveInvoicePreview = () => {
        const sub = Math.max(Number(subInp?.value || 0), 0);
        const disc = Math.max(Number(discInp?.value || 0), 0);
        const net = Math.max(sub - disc, 0);
        const vatRate = Number(vatSel?.value || 20);
        const vatAmt = (net * vatRate) / 100;
        const wStr = String(withSel?.value || 'Yok');
        const wMap = { 'Yok': 0, '2/10': 0.2, '3/10': 0.3, '4/10': 0.4, '5/10': 0.5, '7/10': 0.7, '9/10': 0.9 };
        const wAmt = vatAmt * (wMap[wStr] || 0);
        const grand = net + (vatAmt - wAmt);
        const rate = Math.max(Number(rateInp?.value || 1), 0.0001);
        const grandTry = grand * (curSel?.value === 'TRY' ? 1 : rate);
        const sym = curSel?.value === 'USD' ? '$' : curSel?.value === 'EUR' ? '€' : '₺';
        if (previewEl) {
          renderSafeHtml(previewEl, `
            <span>Canlı Hesaplama: <strong>Net Matrah: ${sym}${net.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong> | <strong>KDV: ${sym}${vatAmt.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong> | <strong>Tevkifat: -${sym}${wAmt.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong></span>
            <span style="color:#34d399;font-weight:800;font-size:0.95rem;">Genel Toplam: ${sym}${grand.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} (TL Karşılığı: ₺${grandTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })})</span>
          `);
        }
      };

      [subInp, discInp, vatSel, withSel, curSel, rateInp].forEach((el) => {
        el?.addEventListener('input', updateLiveInvoicePreview);
        el?.addEventListener('change', updateLiveInvoicePreview);
      });

      ordSelect?.addEventListener('change', () => {
        const opt = ordSelect.options[ordSelect.selectedIndex];
        if (!opt || !opt.value) return;
        const comp = opt.getAttribute('data-company') || '';
        const email = opt.getAttribute('data-email') || '';
        const grand = Number(opt.getAttribute('data-grand') || 0);
        const coll = Number(opt.getAttribute('data-collected') || 0);
        const items = opt.getAttribute('data-items') || '';
        const ordNo = opt.getAttribute('data-order-no') || '';

        const compEl = invForm.querySelector('#acc-inv-company');
        const emailEl = invForm.querySelector('#acc-inv-email');
        const paidEl = invForm.querySelector('#acc-inv-paid');
        const descEl = invForm.querySelector('#acc-inv-desc');
        if (compEl) compEl.value = comp;
        if (emailEl) emailEl.value = email;
        if (subInp) subInp.value = String(Math.round((grand / 1.2) * 100) / 100);
        if (paidEl) paidEl.value = String(coll);
        if (descEl) descEl.value = `${ordNo} Sipariş Faturası — ${items}`;
        updateLiveInvoicePreview();
      });

      invForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(invForm);
        const selOrderId = String(fd.get('orderId') || '');
        const linkedOrd = orders.find((o) => o.id === selOrderId);
        try {
          await saveAccountingInvoice({
            invoiceNo: fd.get('invoiceNo'),
            invoiceType: fd.get('invoiceType'),
            docCategory: fd.get('docCategory'),
            orderId: selOrderId,
            orderNo: linkedOrd ? linkedOrd.orderNo : '',
            companyName: fd.get('companyName'),
            taxOffice: fd.get('taxOffice'),
            taxNumber: fd.get('taxNumber'),
            contactEmail: fd.get('contactEmail'),
            currency: fd.get('currency'),
            exchangeRate: Number(fd.get('exchangeRate') || 1),
            subtotal: Number(fd.get('subtotal') || 0),
            discountTotal: Number(fd.get('discountTotal') || 0),
            vatRate: Number(fd.get('vatRate') || 20),
            withholdingRate: fd.get('withholdingRate'),
            paidAmount: Number(fd.get('paidAmount') || 0),
            paymentStatus: fd.get('paymentStatus'),
            issueDate: fd.get('issueDate'),
            dueDate: fd.get('dueDate'),
            description: fd.get('description')
          }, currentProfile);
          showNotification('Resmi fatura sunucuya kaydedildi ve cari bakiyeye işlendi.', 'success');
          await refreshStoreAndRender();
        } catch (err) {
          showNotification(err.message || 'Fatura kaydedilemedi.', 'error');
        }
      });
    }

    // A4 Fatura Yazdırma Butonları
    box.querySelectorAll('.print-invoice-row-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const invId = btn.getAttribute('data-inv-id');
        const found = invoices.find((i) => i.id === invId);
        if (found) openInvoicePrintModal(found);
      });
    });

    // Kasa / Banka Formu
    const trxForm = box.querySelector('#admin-acc-trx-form');
    if (trxForm) {
      const invSel = trxForm.querySelector('#acc-trx-invoice-select');
      invSel?.addEventListener('change', () => {
        const opt = invSel.options[invSel.selectedIndex];
        if (!opt || !opt.value) return;
        const compEl = trxForm.querySelector('#acc-trx-company');
        const amtEl = trxForm.querySelector('#acc-trx-amount');
        if (compEl) compEl.value = opt.getAttribute('data-company') || '';
        if (amtEl) amtEl.value = opt.getAttribute('data-remaining') || '';
      });

      trxForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(trxForm);
        const invId = String(fd.get('invoiceId') || '');
        const linkedInv = invoices.find((i) => i.id === invId);
        try {
          await saveAccountingTransaction({
            direction: fd.get('direction'),
            category: fd.get('category'),
            accountName: fd.get('accountName'),
            paymentMethod: fd.get('paymentMethod'),
            companyName: fd.get('companyName'),
            invoiceId: invId,
            invoiceNo: linkedInv ? linkedInv.invoiceNo : '',
            amount: Number(fd.get('amount') || 0),
            currency: fd.get('currency'),
            exchangeRate: Number(fd.get('exchangeRate') || 1),
            referenceNo: fd.get('referenceNo'),
            transactionDate: fd.get('transactionDate'),
            notes: fd.get('notes')
          }, currentProfile);
          showNotification('Kasa / Banka işlemi kaydedildi ve bağlı fatura bakiyesi güncellendi.', 'success');
          await refreshStoreAndRender();
        } catch (err) {
          showNotification(err.message || 'Kasa/Banka hareketi kaydedilemedi.', 'error');
        }
      });
    }

    // Çek / Senet Formu & Durum Güncelleme
    const chqForm = box.querySelector('#admin-acc-cheque-form');
    chqForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(chqForm);
      try {
        await saveChequeOrNote({
          instrumentType: fd.get('instrumentType'),
          portfolioNo: fd.get('portfolioNo'),
          companyName: fd.get('companyName'),
          bankName: fd.get('bankName'),
          serialNumber: fd.get('serialNumber'),
          amount: Number(fd.get('amount') || 0),
          currency: fd.get('currency'),
          exchangeRate: Number(fd.get('exchangeRate') || 1),
          maturityDate: fd.get('maturityDate'),
          status: fd.get('status'),
          endorsedTo: fd.get('endorsedTo'),
          notes: fd.get('notes')
        }, currentProfile);
        showNotification('Çek / Senet evrakı portföye kaydedildi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Çek/Senet kaydedilemedi.', 'error');
      }
    });

    box.querySelectorAll('.cheque-status-select').forEach((sel) => {
      sel.addEventListener('change', async () => {
        const chqId = sel.getAttribute('data-cheque-id');
        try {
          await updateChequeOrNoteStatus(chqId, sel.value, '', currentProfile);
          showNotification('Evrak portföy durumu sunucuda güncellendi.', 'success');
          await refreshStoreAndRender();
        } catch (err) {
          showNotification(err.message || 'Evrak durumu güncellenemedi.', 'error');
        }
      });
    });

    // Cari Hesap A4 Ekstre Yazdırma
    box.querySelectorAll('.print-ledger-row-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-ledger-idx') || 0);
        const targetEntry = ledgerEntries[idx];
        if (targetEntry) openLedgerStatementPrintModal(targetEntry);
      });
    });
  }

  /* ========================================================================
     MODÜL 9: SERVİS VE BAKIM (SERVICE)
     ======================================================================== */
  function renderServiceModule(box) {
    const visibleServices = store.serviceRecords.filter((s) => serviceListFocus !== 'open' || s.status !== 'Tamamlandı');
    const html = `
      <div class="admin-module-header">
        <div>
          <h2>9. Su Arıtma Cihazları Periyodik Servis ve Bakım Yönetimi</h2>
          <p>Kurulum tarihi ve bakım periyoduna göre sonraki bakım tarihi otomatik hesaplanır. Gelecek tarihli işlemler "Tamamlandı" olarak işaretlenemez.</p>
        </div>
      </div>
      ${focusBannerHtml()}

      <div class="card" style="padding:1.5rem;margin-bottom:1.5rem;">
        <h3>Yeni Cihaz Bakım Planı veya Servis İş Emri</h3>
        <form id="admin-service-form" class="form-grid-3" style="margin-top:1rem;">
          <div class="form-group">
            <label class="form-label">Müşteri / Tesis Adı *</label>
            <input type="text" name="companyName" class="form-input" required placeholder="Örn: Şişecam Mersin Fabrikası" />
          </div>
          <div class="form-group">
            <label class="form-label">Müşteri E-posta (Portal Takibi)</label>
            <input type="email" name="customerEmail" class="form-input" placeholder="bakim@fabrika.com.tr" />
          </div>
          <div class="form-group">
            <label class="form-label">Kurulu Sistem / Cihaz Adı *</label>
            <input type="text" name="systemName" class="form-input" required placeholder="Örn: 40 m³/h Çift Kademeli RO + EDI" />
          </div>
          <div class="form-group">
            <label class="form-label">Cihaz Seri Numarası *</label>
            <input type="text" name="serialNumber" class="form-input" required placeholder="Örn: ELF-RO-2025-884" />
          </div>
          <div class="form-group">
            <label class="form-label">Kurulum Tarihi</label>
            <input type="date" name="installationDate" class="form-input" value="${new Date().toISOString().slice(0, 10)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Bakım Periyodu (Gün)</label>
            <input type="number" name="maintenanceIntervalDays" class="form-input" value="90" min="7" max="365" />
          </div>
          <div class="form-group">
            <label class="form-label">Son Yapılan / Tamamlanan Bakım Tarihi</label>
            <input type="date" name="lastServiceDate" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Sorumlu Teknisyen</label>
            <input type="text" name="assignedTechnician" class="form-input" value="${escapeAttr(currentProfile.displayName || currentUser.email)}" />
          </div>
          <div class="form-group">
            <label class="form-label">İş Emri Durumu</label>
            <select name="status" class="form-select">
              <option value="Planlandı">Planlandı</option>
              <option value="Devam Ediyor">Devam Ediyor</option>
              <option value="Tamamlandı">Tamamlandı</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label class="form-label">Kullanılan Yedek Parçalar / Sarf Malzemeler ve Servis Notu</label>
            <textarea name="technicianNotes" class="form-textarea" rows="2" placeholder="Örn: 5 mikron kartuş filtre değişimi, RO membran CIP asidik/alkali yıkama işlemi..."></textarea>
          </div>
          <div class="form-group full-width">
            <button type="submit" class="btn btn-primary btn-sm">Servis & Bakım Kaydını Kaydet</button>
          </div>
        </form>
      </div>

      ${visibleServices.length === 0 ? `
        <div class="empty-state-box" id="service-table-anchor"><p>${store.serviceRecords.length === 0 ? 'Henüz kayıtlı servis veya periyodik bakım planı bulunmuyor.' : 'Seçilen filtreye uygun servis kaydı yok.'}</p></div>
      ` : `
        <div class="products-table-wrapper" id="service-table-anchor">
          <table class="data-table">
            <thead>
              <tr>
                <th>Müşteri & Sistem</th>
                <th>Seri No</th>
                <th>Periyot</th>
                <th>Sonraki Planlı Bakım</th>
                <th>Teknisyen & Notlar</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              ${visibleServices.map((s) => `
                <tr>
                  <td>
                    <strong>${escapeHtml(s.companyName)}</strong>
                    <div style="font-size:0.8rem;color:var(--text-secondary);">${escapeHtml(s.systemName)}</div>
                  </td>
                  <td><code>${escapeHtml(s.serialNumber)}</code></td>
                  <td>${escapeHtml(String(s.maintenanceIntervalDays || 90))} gün</td>
                  <td><strong>${escapeHtml(s.nextServiceDate || '-')}</strong></td>
                  <td style="font-size:0.82rem;">
                    <div><strong>${escapeHtml(s.assignedTechnician || '-')}</strong></div>
                    <div style="color:var(--text-muted);">${escapeHtml(s.technicianNotes || '')}</div>
                  </td>
                  <td><span class="badge badge-teal">${escapeHtml(s.status)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    `;

    renderSafeHtml(box, html);
    bindFocusBanner(box, () => renderServiceModule(box));

    const form = box.querySelector('#admin-service-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const status = String(fd.get('status') || 'Planlandı');
      const lastDate = String(fd.get('lastServiceDate') || '');
      try {
        await saveServiceRecord({
          companyName: fd.get('companyName'),
          customerEmail: fd.get('customerEmail'),
          systemName: fd.get('systemName'),
          serialNumber: fd.get('serialNumber'),
          installationDate: fd.get('installationDate'),
          maintenanceIntervalDays: fd.get('maintenanceIntervalDays'),
          lastServiceDate: lastDate,
          completedDate: status === 'Tamamlandı' ? (lastDate || new Date().toISOString().slice(0, 10)) : null,
          assignedTechnician: fd.get('assignedTechnician'),
          status,
          technicianNotes: fd.get('technicianNotes')
        }, currentProfile);
        showNotification('Servis ve bakım kaydı sunucuya kaydedildi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Servis kaydı oluşturulamadı.', 'error');
      }
    });
  }

  /* ========================================================================
     MODÜL 10: SİSTEM, İÇERİK, SEO/GEO, BİLDİRİMLER VE ROLLER (SETTINGS)
     ======================================================================== */
  function renderSettingsModule(box) {
    const general = store.settings?.general || {};
    const notif = store.settings?.notifications || { emailEnabled: false, whatsappEnabled: false };
    const seoGeo = store.settings?.seoGeo || {};

    const html = `
      <div class="admin-module-header">
        <div>
          <h2>10. Sistem Ayarları, RBAC Kullanıcı Rolleri, SEO & GEO Anahtar Kelime Merkezi</h2>
          <p>Doğrulanmamış bildirim kanalları varsayılan olarak kapalıdır. Kullanıcı rolleri yalnızca Süperadmin tarafından değiştirilebilir.</p>
        </div>
      </div>

      <div class="admin-two-col" style="margin-bottom:1.75rem;">
        <!-- Firma İletişim & Genel Ayarlar -->
        <div class="card" style="padding:1.5rem;">
          <h3>Kurumsal İletişim ve Sistem Ayarları</h3>
          <form id="settings-general-form" class="form-grid-2" style="margin-top:1rem;">
            <div class="form-group">
              <label class="form-label">Firma Ünvanı</label>
              <input type="text" name="companyName" class="form-input" value="${escapeAttr(general.companyName || 'Elif Çevre Kimya Sanayi ve Ticaret')}" />
            </div>
            <div class="form-group">
              <label class="form-label">Kurumsal Telefon</label>
              <input type="text" name="phone" class="form-input" value="${escapeAttr(general.phone || '+90 (542) 590 36 26')}" />
            </div>
            <div class="form-group">
              <label class="form-label">Kurumsal E-posta</label>
              <input type="email" name="email" class="form-input" value="${escapeAttr(general.email || 'info@elifcevrekimya.com.tr')}" />
            </div>
            <div class="form-group">
              <label class="form-label">Merkez Adres</label>
              <input type="text" name="address" class="form-input" value="${escapeAttr(general.address || 'Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana')}" />
            </div>
            <div class="form-group full-width">
              <button type="submit" class="btn btn-primary btn-sm">Genel Ayarları Sunucuya Kaydet</button>
            </div>
          </form>
        </div>

        <!-- Bildirim Kanalları & Test Gönderimi -->
        <div class="card" style="padding:1.5rem;">
          <h3>Bildirim Kanalları (Varsayılan: Kapalı)</h3>
          <form id="settings-notif-form" style="margin-top:1rem;">
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" id="notif-email-chk" ${notif.emailEnabled ? 'checked' : ''} />
                <span>E-posta Bildirim Kanalı Aktif (Doğrulanmış SMTP/Webhook Gerekir)</span>
              </label>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" id="notif-wa-chk" ${notif.whatsappEnabled ? 'checked' : ''} />
                <span>WhatsApp / SMS Uyarı Kanalı Aktif</span>
              </label>
            </div>
            <div class="form-group">
              <label class="form-label">Bildirim Alıcı E-posta Adresi</label>
              <input type="email" id="notif-target-email" class="form-input" value="${escapeAttr(notif.targetEmail || currentUser.email || 'info@elifcevrekimya.com.tr')}" />
            </div>
            <div style="display:flex;gap:0.5rem;">
              <button type="submit" class="btn btn-primary btn-sm">Kanal Durumunu Kaydet</button>
              <button type="button" class="btn btn-secondary btn-sm" id="notif-test-btn">Test Bildirimi Kaydı Oluştur</button>
            </div>
          </form>
        </div>
      </div>

      <!-- SEO & GEO (Generative Engine Optimization) Anahtar Kelime & Bölgesel Hedefleme Merkezi -->
      <div class="card" style="padding:1.5rem;margin-bottom:1.75rem;border-left:4px solid #059669;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;margin-bottom:1rem;">
          <div>
            <h3>SEO & GEO (Yapay Zeka Arama Motoru Optimizasyonu — www.elifcevrekimya.com.tr) Komuta Merkezi</h3>
            <p style="font-size:0.84rem;color:var(--text-secondary);">Resmi Alan Adı: <strong>https://www.elifcevrekimya.com.tr</strong> • Kurumsal E-posta: <strong>info@elifcevrekimya.com.tr</strong>. Google Arama, ChatGPT Search, Perplexity, Claude ve Gemini için JSON-LD <code>@graph</code>, <code>/llms.txt</code> ve <code>/sitemap.xml</code> aktif olarak çalışmaktadır.</p>
          </div>
          <div style="display:flex;gap:0.5rem;">
            <a href="/llms.txt" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">📄 /llms.txt Görüntüle</a>
            <a href="/sitemap.xml" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">🗺️ /sitemap.xml Görüntüle</a>
          </div>
        </div>

        <form id="settings-seogeo-form" class="form-grid-2" style="margin-bottom:1.25rem;">
          <div class="form-group">
            <label class="form-label">Öncelikli GEO Bölgesel OSB Hedefleri</label>
            <input type="text" name="targetRegions" class="form-input" value="${escapeAttr(seoGeo.targetRegions || 'Adana Hacı Sabancı OSB, Mersin Tarsus OSB, Ceyhan Enerji İhtisas, İskenderun Payas OSB, Gaziantep Başpınar OSB, Kayseri OSB, Niğde OSB')}" />
          </div>
          <div class="form-group">
            <label class="form-label">Ek Özel Odak Anahtar Kelimeler (Virgülle Ayırın)</label>
            <input type="text" name="customKeywords" class="form-input" value="${escapeAttr(seoGeo.customKeywords || 'elif çevre kimya, www.elifcevrekimya.com.tr, atık su arıtma kimyasalları, pac polielektrolit, medipure saf su cihazı, ultra saf su sistemi, adana kimyasal tedarik, ters ozmos antiskalant')}" />
          </div>
          <div class="form-group full-width">
            <button type="submit" class="btn btn-primary btn-sm">SEO & GEO Hedef Parametrelerini Kaydet</button>
          </div>
        </form>

        <div class="products-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Küme Kodu & Başlık</th>
                <th>Hedef Arama Niyeti (Search Intent)</th>
                <th>Bölgesel GEO Odağı</th>
                <th>Birincil Yüksek Dönüşümlü Anahtar Kelimeler</th>
              </tr>
            </thead>
            <tbody>
              ${SEO_KEYWORD_CLUSTERS.map((c) => `
                <tr>
                  <td><strong>${escapeHtml(c.clusterTitle)}</strong></td>
                  <td><span class="badge badge-teal">${escapeHtml(c.searchIntent)}</span></td>
                  <td style="font-size:0.8rem;">${escapeHtml(c.geoFocus)}</td>
                  <td style="font-size:0.78rem;color:var(--text-secondary);">${escapeHtml(c.primaryKeywords.join(' • '))}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- RBAC Kullanıcı Rolleri Tablosu -->
      <div class="card" style="padding:1.5rem;margin-bottom:1.75rem;">
        <h3>Kullanıcılar ve Rol Tabanlı Yetki Yönetimi (RBAC)</h3>
        <div class="products-table-wrapper" style="margin-top:1rem;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Kullanıcı Adı</th>
                <th>E-posta</th>
                <th>Mevcut Rol</th>
                <th>Rol Değiştir (Yalnızca Süperadmin)</th>
              </tr>
            </thead>
            <tbody>
              ${store.users.map((u) => `
                <tr>
                  <td><strong>${escapeHtml(u.displayName || '-')}</strong></td>
                  <td>${escapeHtml(u.email || '-')}</td>
                  <td><span class="badge badge-teal">${escapeHtml(ROLE_LABELS[u.role] || u.role)}</span></td>
                  <td>
                    <select class="form-select user-role-select" data-uid="${escapeAttr(u.id)}" style="width:auto;" ${currentProfile.role !== ROLES.SUPERADMIN ? 'disabled' : ''}>
                      ${Object.entries(ROLE_LABELS).map(([rKey, rLabel]) => `
                        <option value="${escapeAttr(rKey)}" ${u.role === rKey ? 'selected' : ''}>${escapeHtml(rLabel)}</option>
                      `).join('')}
                    </select>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Değiştirilemez Denetim Günlüğü (Audit Logs) -->
      <div class="card" style="padding:1.5rem;">
        <h3>Son Sunucu Denetim Günlüğü Kayıtları (Audit Logs)</h3>
        ${store.auditLogs.length === 0 ? `<p style="color:var(--text-muted);">Henüz işlem kaydı yok.</p>` : `
          <div class="products-table-wrapper" style="margin-top:0.75rem;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Zaman (ISO)</th>
                  <th>İşlem</th>
                  <th>Koleksiyon / Hedef</th>
                  <th>Kullanıcı</th>
                  <th>Detay</th>
                </tr>
              </thead>
              <tbody>
                ${store.auditLogs.slice(0, 15).map((log) => `
                  <tr>
                    <td style="font-size:0.78rem;">${escapeHtml((log.createdAtIso || '').replace('T', ' ').slice(0, 19))}</td>
                    <td><code>${escapeHtml(log.action)}</code></td>
                    <td>${escapeHtml(log.collection)} / ${escapeHtml(log.targetId)}</td>
                    <td>${escapeHtml(log.actorEmail || log.actorUid)}</td>
                    <td style="font-size:0.78rem;color:var(--text-secondary);">${escapeHtml(String(log.details || '').slice(0, 100))}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;

    renderSafeHtml(box, html);

    box.querySelector('#settings-general-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      try {
        await saveSiteSettingsDoc('general', {
          companyName: fd.get('companyName'),
          phone: fd.get('phone'),
          email: fd.get('email'),
          address: fd.get('address')
        }, currentProfile);
        showNotification('Genel ayarlar sunucuya kaydedildi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Ayarlar kaydedilemedi.', 'error');
      }
    });

    box.querySelector('#settings-seogeo-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      try {
        await saveSiteSettingsDoc('seoGeo', {
          targetRegions: fd.get('targetRegions'),
          customKeywords: fd.get('customKeywords')
        }, currentProfile);
        showNotification('SEO ve GEO hedefleme parametreleri sunucuya kaydedildi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'SEO/GEO ayarları kaydedilemedi.', 'error');
      }
    });

    box.querySelector('#settings-notif-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        await saveSiteSettingsDoc('notifications', {
          emailEnabled: Boolean(box.querySelector('#notif-email-chk')?.checked),
          whatsappEnabled: Boolean(box.querySelector('#notif-wa-chk')?.checked),
          targetEmail: box.querySelector('#notif-target-email')?.value || ''
        }, currentProfile);
        showNotification('Bildirim kanalı ayarları sunucuya kaydedildi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Bildirim ayarları kaydedilemedi.', 'error');
      }
    });

    box.querySelector('#notif-test-btn')?.addEventListener('click', async () => {
      try {
        await sendTestNotificationLog('EMAIL', box.querySelector('#notif-target-email')?.value || currentUser.email, currentProfile);
        showNotification('Test bildirim kaydı sunucu günlüğüne işlendi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Test bildirimi oluşturulamadı.', 'error');
      }
    });

    box.querySelectorAll('.user-role-select').forEach((sel) => {
      sel.addEventListener('change', async () => {
        const uid = sel.getAttribute('data-uid');
        try {
          await updateStaffUserRole(uid, sel.value, currentProfile);
          showNotification('Kullanıcı rolü sunucuda güncellendi.', 'success');
          await refreshStoreAndRender();
        } catch (err) {
          showNotification(err.message || 'Rol güncellenemedi.', 'error');
        }
      });
    });
  }

  // Başlangıçta Auth durumunu dinle ve canlı gelen kutusunu (Sipariş & İletişim Formları) bağla
  onAuthChange(async (user, profile) => {
    currentUser = user;
    currentProfile = profile;
    if (unsubscribeInbox) {
      unsubscribeInbox();
      unsubscribeInbox = null;
    }
    if (user && profile) {
      await refreshStoreAndRender();
      let knownCount = Array.isArray(store?.crmRequests) ? store.crmRequests.length : 0;
      unsubscribeInbox = subscribeToAdminInbox((liveItems) => {
        if (!store) return;
        const prevIds = new Set((store.crmRequests || []).map((r) => r.id));
        const newlyArrived = liveItems.filter((item) => !prevIds.has(item.id));
        // Eski koleksiyonlardan gelen kayıtları koruyarak birleştir
        const liveMap = new Map();
        liveItems.forEach((item) => liveMap.set(item.id, item));
        (store.crmRequests || []).forEach((oldItem) => {
          if (!liveMap.has(oldItem.id)) liveMap.set(oldItem.id, oldItem);
        });
        const merged = Array.from(liveMap.values()).sort(
          (a, b) => new Date(b.createdAtIso || 0).getTime() - new Date(a.createdAtIso || 0).getTime()
        );
        const nextSig = computeCrmSignature(merged);
        if (nextSig === lastInboxSignature) return;

        store.crmRequests = merged;
        lastInboxSignature = nextSig;
        lastSyncedTimeStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        syncShellChrome();

        if (newlyArrived.length > 0 && knownCount > 0) {
          const latest = newlyArrived[0];
          const chMeta = getInboundChannelMeta(latest);
          showNotification(
            `${chMeta.label}: "${latest.companyName || 'Yeni Ziyaretçi'}" — ${latest.relatedProductOrSystem || 'Yeni mesaj'} Dashboard gelen kutusuna düştü.`,
            'info'
          );
        }
        knownCount = store.crmRequests.length;
        if (activeModule === 'dashboard' || activeModule === 'crm') {
          const activeEl = document.activeElement;
          const isEditingFormField = activeEl && container.contains(activeEl) && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName);
          if (!isEditingFormField) {
            renderShell();
          }
        }
      });
    } else {
      renderAuthScreen();
    }
  });
}

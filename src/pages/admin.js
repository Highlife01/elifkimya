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
  saveSiteSettingsDoc,
  sendTestNotificationLog
} from '../firebase.js';
import { MEGA_INDUSTRIAL_SECTORS, DECISION_MAKER_MATRIX } from '../data/industrial-playbook.js';
import { openProposalA4Modal } from '../utils/pdf-proposal.js';
import { showNotification, showConfirmModal } from '../components/notification.js';
import { escapeHtml, escapeAttr, renderSafeHtml } from '../utils/security.js';

const ADMIN_MODULES = [
  { id: 'dashboard', label: '1. Genel Bakış', badgeKey: 'crm' },
  { id: 'crm', label: '2. Müşteri & Talep (CRM)', badgeKey: 'crm' },
  { id: 'products', label: '3. Kimyasal Ürünler', badgeKey: 'products' },
  { id: 'documents', label: '4. Teknik Belge Merkezi', badgeKey: 'documents' },
  { id: 'projects', label: '5. Su Arıtma Projeleri', badgeKey: 'projects' },
  { id: 'proposals', label: '6. Maliyet & PDF Teklif', badgeKey: 'proposals' },
  { id: 'orders', label: '7. Sipariş, Stok & Tedarik', badgeKey: 'orders' },
  { id: 'service', label: '8. Servis & Bakım', badgeKey: 'service' },
  { id: 'settings', label: '9. Sistem, SEO & Roller', badgeKey: null }
];

export function renderAdminPage(container, navigate) {
  let currentUser = null;
  let currentProfile = null;
  let activeModule = 'dashboard';
  let store = null;
  let dashboardDateDays = 0; // 0 = Tümü
  let crmViewMode = 'table'; // 'table' | 'kanban' | 'customers' | 'playbook'
  let crmFilterStage = 'all';
  let crmFilterRes = 'active';
  let crmSearchQuery = '';

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
              <input type="email" name="email" class="form-input" required placeholder="yetkili@elifkimya.com.tr" />
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
    const mainArea = container.querySelector('#admin-module-content');
    if (mainArea && !store) {
      renderSafeHtml(mainArea, `<div class="loading-banner">İzole <strong>${escapeHtml(DATABASE_ID)}</strong> veritabanından gerçek kayıtlar yükleniyor...</div>`);
    }
    try {
      store = await loadAdminAllData();
      renderShell();
    } catch (err) {
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

    const counts = {
      crm: store ? store.crmRequests.filter((r) => (r.resolutionStatus || 'active') === 'active').length : 0,
      products: store ? store.products.length : 0,
      documents: store ? store.documents.length : 0,
      projects: store ? store.projects.length : 0,
      proposals: store ? store.proposals.length : 0,
      orders: store ? store.orders.length : 0,
      service: store ? store.serviceRecords.length : 0
    };

    const shellHtml = `
      <div class="admin-layout">
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
          </div>

          <nav class="admin-nav-list">
            ${ADMIN_MODULES.map((m) => `
              <button type="button" class="admin-nav-btn ${activeModule === m.id ? 'active' : ''}" data-module="${escapeAttr(m.id)}">
                <span>${escapeHtml(m.label)}</span>
                ${m.badgeKey ? `<span class="admin-nav-badge">${counts[m.badgeKey] || 0}</span>` : ''}
              </button>
            `).join('')}
          </nav>

          <div class="admin-sidebar-footer">
            <button type="button" class="btn btn-secondary btn-sm" id="admin-refresh-btn" style="width:100%;margin-bottom:0.5rem;">
              Verileri Yenile
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
      case 'service':
        renderServiceModule(contentBox);
        break;
      case 'settings':
        renderSettingsModule(contentBox);
        break;
      default:
        renderDashboardModule(contentBox);
    }
  }

  /* ========================================================================
     MODÜL 1: GENEL BAKIŞ (DASHBOARD)
     ======================================================================== */
  function renderDashboardModule(box) {
    const nowMs = Date.now();
    const cutoffMs = dashboardDateDays > 0 ? nowMs - dashboardDateDays * 86400000 : 0;

    const filterByDate = (arr) => {
      if (!cutoffMs) return arr;
      return arr.filter((item) => {
        const iso = item.createdAtIso || item.updatedAtIso;
        if (!iso) return true;
        return new Date(iso).getTime() >= cutoffMs;
      });
    };

    const crmList = filterByDate(store.crmRequests);
    const propList = filterByDate(store.proposals);
    const ordList = filterByDate(store.orders);
    const projList = filterByDate(store.projects);
    const srvList = filterByDate(store.serviceRecords);

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
    const totalCollectedTry = confirmedOrders.reduce((sum, o) => sum + Number(o.collectedAmount || 0), 0);

    // Aşama dağılımı (Grafik verisi)
    const stageCounts = CRM_STAGES.map((st) => ({
      stage: st,
      count: crmList.filter((r) => (r.resolutionStatus || 'active') === 'active' && r.stage === st).length
    }));
    const maxStageCount = Math.max(...stageCounts.map((s) => s.count), 1);

    const html = `
      <div class="admin-module-header">
        <div>
          <h2>1. Genel Bakış ve Gerçek Zamanlı Operasyon Özeti</h2>
          <p>Tüm göstergeler <code>${escapeHtml(DATABASE_ID)}</code> veritabanındaki doğrulanmış kayıtlardan hesaplanır. Sipariş talepleri gerçekleşmiş satışa dahil edilmez.</p>
        </div>
        <div style="display:flex;gap:0.5rem;align-items:center;">
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

      <!-- 7 Operasyonel KPI Kartı -->
      <div class="admin-kpi-grid">
        <div class="admin-kpi-card">
          <span class="kpi-title">Yeni & Yanıt Bekleyen Talepler</span>
          <strong class="kpi-num">${newPendingRequests.length}</strong>
          <span class="kpi-sub">Toplam ${crmList.length} CRM kaydı içinde</span>
        </div>
        <div class="admin-kpi-card">
          <span class="kpi-title">Hazırlanan & Gönderilen Teklifler</span>
          <strong class="kpi-num">${activeProposals.length}</strong>
          <span class="kpi-sub">${propList.filter((p) => p.status === 'sent').length} gönderildi, ${propList.filter((p) => p.status === 'draft').length} taslak</span>
        </div>
        <div class="admin-kpi-card">
          <span class="kpi-title">Onaylanan Kesin Siparişler</span>
          <strong class="kpi-num">${confirmedOrders.length}</strong>
          <span class="kpi-sub">Yalnızca onaylı sipariş kayıtları</span>
        </div>
        <div class="admin-kpi-card">
          <span class="kpi-title">Devam Eden Su Arıtma Projeleri</span>
          <strong class="kpi-num">${ongoingProjects.length}</strong>
          <span class="kpi-sub">Keşif, projelendirme ve montaj</span>
        </div>
        <div class="admin-kpi-card">
          <span class="kpi-title">Planlanan Servis & Bakım</span>
          <strong class="kpi-num">${plannedServices.length}</strong>
          <span class="kpi-sub">Periyodik bakım ve iş emirleri</span>
        </div>
        <div class="admin-kpi-card">
          <span class="kpi-title">Yayımlanmış Aktif Ürünler</span>
          <strong class="kpi-num">${activeProductsCount}</strong>
          <span class="kpi-sub">Toplam ${store.products.length} ürün kartı</span>
        </div>
        <div class="admin-kpi-card">
          <span class="kpi-title">Kritik Stok Uyarıları</span>
          <strong class="kpi-num">${initializedInventory.length === 0 ? '—' : criticalStockItems.length}</strong>
          <span class="kpi-sub">${initializedInventory.length === 0 ? 'Stok sayımı henüz girilmedi' : `${initializedInventory.length} stok kalemi izleniyor`}</span>
        </div>
      </div>

      <!-- Finansal Ayrım Barı (Teklif Hacmi vs Onaylanan Sipariş vs Tahsilat) -->
      <div class="financial-split-grid" style="margin-top:1.5rem;">
        <div class="financial-split-card">
          <span class="badge badge-neutral">1. Teklif Hacmi (KDV Hariç Net)</span>
          <h3>₺${totalQuoteVolumeTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</h3>
          <p>Hazırlanan ve müşteriye sunulan tekliflerin toplam hacmi (Henüz satış değildir).</p>
        </div>
        <div class="financial-split-card">
          <span class="badge badge-teal">2. Onaylanan Sipariş Tutarı (Kesin Satış)</span>
          <h3>₺${totalApprovedOrdersTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</h3>
          <p>Müşteri onayı alınmış resmi siparişlerin KDV dahil toplam tutarı.</p>
        </div>
        <div class="financial-split-card">
          <span class="badge badge-teal">3. Gerçekleşen Tahsilat</span>
          <h3>₺${totalCollectedTry.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</h3>
          <p>Kalan Açık Bakiye: <strong>₺${Math.max(totalApprovedOrdersTry - totalCollectedTry, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong></p>
        </div>
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
                  <div class="bar-chart-row">
                    <span class="bar-chart-label">${escapeHtml(item.stage)}</span>
                    <div class="bar-chart-track">
                      <div class="bar-chart-fill" style="width:${pct}%;"></div>
                    </div>
                    <strong class="bar-chart-val">${item.count}</strong>
                  </div>
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
              ${crmList.slice(0, 6).map((req) => `
                <div class="recent-activity-item">
                  <div>
                    <strong>${escapeHtml(req.companyName)}</strong> — <span style="font-size:0.82rem;color:var(--text-secondary);">${escapeHtml(req.relatedProductOrSystem || req.requestType)}</span>
                    <div style="font-size:0.76rem;color:var(--text-muted);">${escapeHtml(req.contactName || '')} | ${escapeHtml(req.phone || '')} | ${escapeHtml((req.createdAtIso || '').slice(0, 10))}</div>
                  </div>
                  <span class="badge badge-teal">${escapeHtml(req.stage)}</span>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;

    renderSafeHtml(box, html);
    box.querySelector('#dash-date-filter')?.addEventListener('change', (e) => {
      dashboardDateDays = Number(e.target.value || 0);
      renderDashboardModule(box);
    });
  }

  /* ========================================================================
     MODÜL 2: MÜŞTERİ VE TALEP YÖNETİMİ (CRM)
     ======================================================================== */
  function renderCrmModule(box) {
    const filteredRequests = store.crmRequests.filter((r) => {
      const res = r.resolutionStatus || 'active';
      if (crmFilterRes !== 'all' && res !== crmFilterRes) return false;
      if (crmFilterStage !== 'all' && r.stage !== crmFilterStage) return false;
      if (crmSearchQuery) {
        const hay = `${r.companyName || ''} ${r.contactName || ''} ${r.email || ''} ${r.phone || ''} ${r.cityCountry || ''} ${r.relatedProductOrSystem || ''}`.toLowerCase();
        if (!hay.includes(crmSearchQuery.toLowerCase())) return false;
      }
      return true;
    });

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

    box.querySelectorAll('[data-crm-view]').forEach((btn) => {
      btn.addEventListener('click', () => {
        crmViewMode = btn.getAttribute('data-crm-view') || 'table';
        renderCrmModule(box);
      });
    });

    box.querySelector('#crm-search-input')?.addEventListener('input', (e) => {
      crmSearchQuery = e.target.value;
      renderCrmSubView(box.querySelector('#crm-view-container'), filteredRequests);
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
        await createOrUpdateCrmRequest({
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
        showNotification('CRM talebi sunucuya kaydedildi.', 'success');
        await refreshStoreAndRender();
      } catch (err) {
        showNotification(err.message || 'Talep kaydedilemedi.', 'error');
      }
    });

    renderCrmSubView(box.querySelector('#crm-view-container'), filteredRequests);
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
                  ${items.length === 0 ? `<div class="kanban-empty">Kayıt yok</div>` : items.map((req) => `
                    <div class="kanban-card">
                      <strong>${escapeHtml(req.companyName)}</strong>
                      <p style="font-size:0.8rem;color:var(--text-secondary);margin:0.25rem 0;">${escapeHtml(req.relatedProductOrSystem || req.requestType)}</p>
                      <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.5rem;">${escapeHtml(req.contactName || '')} • ${escapeHtml(req.cityCountry || '')}</div>
                      <select class="form-select form-select-xs crm-quick-stage" data-req-id="${escapeAttr(req.id)}" data-prev-stage="${escapeAttr(req.stage)}">
                        ${CRM_STAGES.map((s) => `<option value="${escapeAttr(s)}" ${req.stage === s ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('')}
                      </select>
                    </div>
                  `).join('')}
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
              <th>Tarih</th>
              <th>Firma & Yetkili</th>
              <th>İletişim & Şehir</th>
              <th>İlgili Ürün / Sistem & Açıklama</th>
              <th>Sorumlu & Takip</th>
              <th>Talep Aşaması (10 Aşama)</th>
              <th>Durum (Aktif/Arşiv)</th>
            </tr>
          </thead>
          <tbody>
            ${requests.map((req) => `
              <tr>
                <td style="font-size:0.8rem;white-space:nowrap;">${escapeHtml((req.createdAtIso || '').slice(0, 10))}</td>
                <td>
                  <strong>${escapeHtml(req.companyName)}</strong>
                  <div style="font-size:0.8rem;color:var(--text-secondary);">${escapeHtml(req.contactName || '-')}</div>
                </td>
                <td style="font-size:0.82rem;">
                  <div>${escapeHtml(req.phone || '-')}</div>
                  <div style="color:var(--text-muted);">${escapeHtml(req.email || '-')}</div>
                  <span class="badge badge-neutral">${escapeHtml(req.cityCountry || '-')}</span>
                </td>
                <td style="max-width:280px;">
                  <div style="font-weight:600;color:var(--accent-teal);">${escapeHtml(req.relatedProductOrSystem || req.requestType)}</div>
                  <div style="font-size:0.8rem;color:var(--text-secondary);">${escapeHtml((req.description || '').slice(0, 160))}</div>
                </td>
                <td style="font-size:0.82rem;">
                  <div>${escapeHtml(req.assignedStaff || 'Atanmadı')}</div>
                  <div style="color:var(--text-muted);">Takip: ${escapeHtml(req.followUpDate || '-')}</div>
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
            `).join('')}
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
        try {
          await createOrUpdateCrmRequest({ id: reqId, stage: nextStage }, currentProfile);
          showNotification(`Talep aşaması "${nextStage}" olarak sunucuda güncellendi.`, 'success');
          await refreshStoreAndRender();
        } catch (err) {
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
        try {
          await createOrUpdateCrmRequest({ id: reqId, resolutionStatus: nextRes }, currentProfile);
          showNotification('Talep durumu sunucuda güncellendi.', 'success');
          await refreshStoreAndRender();
        } catch (err) {
          sel.value = prevRes; // Hata durumunda arayüzü geri al!
          showNotification(err.message || 'Durum güncellenemedi, değişiklik geri alındı.', 'error');
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
    const html = `
      <div class="admin-module-header">
        <div>
          <h2>5. Endüstriyel Su Arıtma Projeleri ve Mühendislik Onayı</h2>
          <p>Eksik su analizi (pH, İletkenlik, Sertlik) ile kesin sistem kapasitesi veya dozaj önerisi kaydedilmesi sistem tarafından engellenir.</p>
        </div>
      </div>

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

      ${store.projects.length === 0 ? `
        <div class="empty-state-box">
          <h4>Kayıtlı Su Arıtma Projesi Bulunmuyor</h4>
          <p>Keşif veya projelendirme aşamasındaki su arıtma sistemlerini yukarıdaki formdan oluşturabilirsiniz.</p>
        </div>
      ` : `
        <div class="products-table-wrapper">
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
              ${store.projects.map((prj) => `
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
    let draftItems = [
      {
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

    const html = `
      <div class="admin-module-header">
        <div>
          <h2>6. Maliyetlendirme, Kâr Marjı ve Kurumsal A4 PDF Teklif Yönetimi</h2>
          <p>Eksik birim maliyetler sıfır (0) kabul edilmez. Gönderilen teklifler değiştirilemez (immutable) olarak kilitlenir ve müşteri PDF/Portal görünümünden tüm iç maliyetler otomatik temizlenir.</p>
        </div>
      </div>

      <!-- Yeni Teklif Oluşturucu -->
      <div class="card" style="padding:1.5rem;margin-bottom:1.75rem;">
        <h3>Yeni Teklif / Maliyetlendirme Çalışması</h3>
        <form id="proposal-builder-form" style="margin-top:1rem;">
          <div class="form-grid-4">
            <div class="form-group">
              <label class="form-label">Teklif No</label>
              <input type="text" id="prop-no" class="form-input" value="TEK-${new Date().getFullYear()}-${String(store.proposals.length + 101).padStart(4, '0')}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Müşteri Firma Adı *</label>
              <input type="text" id="prop-company" class="form-input" required placeholder="Örn: Beyaz Kağıt Deterjan A.Ş." />
            </div>
            <div class="form-group">
              <label class="form-label">Yetkili Kişi & E-posta</label>
              <div style="display:flex;gap:0.4rem;">
                <input type="text" id="prop-contact" class="form-input" placeholder="Yetkili Adı" />
                <input type="email" id="prop-email" class="form-input" placeholder="E-posta" />
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
            <button type="submit" class="btn btn-primary">Teklifi Taslak Olarak Sunucuya Kaydet</button>
          </div>
        </form>
      </div>

      <!-- Kayıtlı Teklifler Listesi -->
      <h3 style="margin-bottom:0.75rem;">Sunucudaki Teklif Kayıtları ve Versiyonlar (${store.proposals.length})</h3>
      ${store.proposals.length === 0 ? `
        <div class="empty-state-box"><p>Henüz oluşturulmuş teklif kaydı bulunmuyor.</p></div>
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
              ${store.proposals.map((p, idx) => `
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
                      <button type="button" class="btn btn-sm btn-secondary" data-pdf-prop="${idx}">A4 PDF</button>
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
    box.querySelectorAll('[data-pdf-prop]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const p = store.proposals[Number(btn.getAttribute('data-pdf-prop'))];
        if (p) openProposalA4Modal(p);
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
    const html = `
      <div class="admin-module-header">
        <div>
          <h2>7. Onaylanan Siparişler, Gerçek Stok Hareketleri ve Tedarik</h2>
          <p>Gerçek stok sayımı (<code>INITIAL_COUNT</code>) veya giriş (<code>INBOUND</code>) yapılmamış kalemlerde uydurma stok bakiyesi gösterilmez. Tüm stok hareketleri değiştirilemez işlem günlüğüne (<code>inventoryMovements</code>) yazılır.</p>
        </div>
      </div>

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
      <h3 style="margin-bottom:0.75rem;">Onaylanan Siparişler (${store.orders.length})</h3>
      ${store.orders.length === 0 ? `
        <div class="empty-state-box" style="margin-bottom:1.5rem;"><p>Henüz onaylanmış sipariş kaydı bulunmuyor.</p></div>
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
              ${store.orders.map((o) => `
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
      <h3 style="margin-bottom:0.75rem;">Depo Stok Kalemleri (${store.inventoryItems.length})</h3>
      ${store.inventoryItems.length === 0 ? `
        <div class="empty-state-box"><p>Henüz tanımlanmış depo stok kartı bulunmuyor.</p></div>
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
              ${store.inventoryItems.map((it) => {
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
     MODÜL 8: SERVİS VE BAKIM (SERVICE)
     ======================================================================== */
  function renderServiceModule(box) {
    const html = `
      <div class="admin-module-header">
        <div>
          <h2>8. Su Arıtma Cihazları Periyodik Servis ve Bakım Yönetimi</h2>
          <p>Kurulum tarihi ve bakım periyoduna göre sonraki bakım tarihi otomatik hesaplanır. Gelecek tarihli işlemler "Tamamlandı" olarak işaretlenemez.</p>
        </div>
      </div>

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

      ${store.serviceRecords.length === 0 ? `
        <div class="empty-state-box"><p>Henüz kayıtlı servis veya periyodik bakım planı bulunmuyor.</p></div>
      ` : `
        <div class="products-table-wrapper">
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
              ${store.serviceRecords.map((s) => `
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
     MODÜL 9: SİSTEM, İÇERİK, SEO, BİLDİRİMLER VE ROLLER (SETTINGS)
     ======================================================================== */
  function renderSettingsModule(box) {
    const general = store.settings?.general || {};
    const notif = store.settings?.notifications || { emailEnabled: false, whatsappEnabled: false };

    const html = `
      <div class="admin-module-header">
        <div>
          <h2>9. Sistem Ayarları, RBAC Kullanıcı Rolleri, SEO ve Bildirim Merkezi</h2>
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
              <input type="text" name="companyName" class="form-input" value="${escapeAttr(general.companyName || 'Elif Kimya Sanayi ve Ticaret')}" />
            </div>
            <div class="form-group">
              <label class="form-label">Kurumsal Telefon</label>
              <input type="text" name="phone" class="form-input" value="${escapeAttr(general.phone || '+90 (542) 590 36 26')}" />
            </div>
            <div class="form-group">
              <label class="form-label">Kurumsal E-posta</label>
              <input type="email" name="email" class="form-input" value="${escapeAttr(general.email || 'info@elifkimya.com.tr')}" />
            </div>
            <div class="form-group">
              <label class="form-label">Merkez Adres</label>
              <input type="text" name="address" class="form-input" value="${escapeAttr(general.address || 'Adana Organize Sanayi / Merkez, Adana')}" />
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
              <input type="email" id="notif-target-email" class="form-input" value="${escapeAttr(notif.targetEmail || currentUser.email || '')}" />
            </div>
            <div style="display:flex;gap:0.5rem;">
              <button type="submit" class="btn btn-primary btn-sm">Kanal Durumunu Kaydet</button>
              <button type="button" class="btn btn-secondary btn-sm" id="notif-test-btn">Test Bildirimi Kaydı Oluştur</button>
            </div>
          </form>
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

  // Başlangıçta Auth durumunu dinle
  onAuthChange(async (user, profile) => {
    currentUser = user;
    currentProfile = profile;
    if (user && profile) {
      await refreshStoreAndRender();
    } else {
      renderAuthScreen();
    }
  });
}

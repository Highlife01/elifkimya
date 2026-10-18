import {
  fetchPortalShareBySecureToken,
  fetchAuthenticatedCustomerPortalData,
  loginWithEmail,
  loginWithGoogle,
  logoutCurrentUser,
  onAuthChange
} from '../firebase.js';
import { openProposalA4Modal } from '../utils/pdf-proposal.js';
import { showNotification } from '../components/notification.js';
import { escapeHtml, escapeAttr, renderSafeHtml } from '../utils/security.js';

export function renderPortalPage(container, navigate) {
  const params = new URLSearchParams(window.location.search);
  const urlToken = (params.get('token') || '').trim();

  const html = `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb">
          <a href="/" data-nav>Ana Sayfa</a> <span>/</span> <span>Müşteri Portalı</span>
        </div>
        <h1>Elif Kimya Kurumsal Müşteri Portalı</h1>
        <p>Size özel güvenli paylaşım bağlantısı (32+ karakterli anahtar) veya kurumsal müşteri hesabınızla tekliflerinizi, sipariş sevkiyat durumunuzu ve periyodik servis kayıtlarınızı görüntüleyin.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="portal-grid">
          <!-- Sol Kolon: Güvenli Token Sorgulama -->
          <div class="card" style="padding:2rem;">
            <span class="section-tag">Güvenli Teklif & Sipariş Bağlantısı</span>
            <h3 style="margin:0.4rem 0 0.75rem;">Teklif / Paylaşım Anahtarı ile Görüntüle</h3>
            <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1.25rem;">
              Satış temsilciniz tarafından iletilen 32+ karakterli güvenli paylaşım kodunu girerek kurumsal teklifinizi ve A4 PDF çıktısını görüntüleyebilirsiniz.
            </p>
            <form id="portal-token-form">
              <div class="form-group">
                <label class="form-label" for="portal-token-input">Güvenli Paylaşım Anahtarı (Token)</label>
                <input type="text" id="portal-token-input" class="form-input" value="${escapeAttr(urlToken)}" placeholder="En az 32 karakterli güvenli paylaşım anahtarınızı girin..." required />
              </div>
              <button type="submit" class="btn btn-primary" id="portal-token-btn" style="width:100%;">
                Teklif & Durum Kaydını Aç
              </button>
            </form>
          </div>

          <!-- Sağ Kolon: Kurumsal Müşteri Hesabı Girişi -->
          <div class="card" style="padding:2rem;" id="portal-auth-card">
            <span class="section-tag">Kayıtlı Müşteri Girişi</span>
            <h3 style="margin:0.4rem 0 0.75rem;">Kurumsal Hesap ile Oturum Açın</h3>
            <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1.25rem;">
              Firmanıza tanımlı e-posta adresinizle giriş yaparak tüm geçmiş tekliflerinizi, aktif siparişlerinizi ve su arıtma servis takviminizi takip edin.
            </p>
            <div id="portal-auth-body">
              <form id="portal-login-form">
                <div class="form-group">
                  <label class="form-label">Kurumsal E-posta</label>
                  <input type="email" name="email" class="form-input" required placeholder="ornek@fabrika.com.tr" />
                </div>
                <div class="form-group">
                  <label class="form-label">Şifre</label>
                  <input type="password" name="password" class="form-input" required placeholder="••••••••" />
                </div>
                <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
                  <button type="submit" class="btn btn-primary" style="flex:1;">Giriş Yap</button>
                  <button type="button" class="btn btn-secondary" id="portal-google-btn" style="flex:1;">Google ile Giriş</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Sonuç Gösterim Alanı -->
        <div id="portal-results-area" style="margin-top:2.5rem;"></div>
      </div>
    </section>
  `;

  renderSafeHtml(container, html);

  container.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        navigate(href);
      }
    });
  });

  const resultsArea = container.querySelector('#portal-results-area');

  async function loadByToken(tokenStr) {
    if (!resultsArea) return;
    renderSafeHtml(resultsArea, `<div class="loading-banner">Güvenli paylaşım kaydı doğrulanıyor...</div>`);
    try {
      const shareDoc = await fetchPortalShareBySecureToken(tokenStr);
      renderSingleShareCard(resultsArea, shareDoc);
    } catch (err) {
      renderSafeHtml(resultsArea, `
        <div class="empty-state-box">
          <h4>Paylaşım Kaydı Doğrulanamadı</h4>
          <p>${escapeHtml(err.message || 'Geçersiz veya süresi dolmuş paylaşım anahtarı.')}</p>
        </div>
      `);
    }
  }

  function renderSingleShareCard(targetEl, share) {
    const items = Array.isArray(share.items) ? share.items : [];
    const htmlCard = `
      <div class="card" style="padding:2rem;border-left:4px solid var(--accent-teal);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem;">
          <div>
            <span class="badge badge-teal">Doğrulanmış Kurumsal Teklif Kaydı</span>
            <h2 style="margin:0.4rem 0 0.2rem;">Teklif No: ${escapeHtml(share.proposalNo || '-')} (Rev. ${escapeHtml(String(share.revisionNo || 1))})</h2>
            <p style="color:var(--text-secondary);margin:0;">Firma: <strong>${escapeHtml(share.companyName || '-')}</strong> | Geçerlilik: <strong>${escapeHtml(share.validUntil || '-')}</strong></p>
          </div>
          <div style="display:flex;gap:0.75rem;">
            <button type="button" class="btn btn-primary" id="portal-print-pdf-btn">
              A4 PDF Önizle & İndir
            </button>
          </div>
        </div>

        <div class="products-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Ürün / Sistem & Teknik Açıklama</th>
                <th>Miktar</th>
                <th>Birim</th>
                <th>Birim Fiyat</th>
                <th>İskonto</th>
                <th>Net Tutar (KDV Hariç)</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((it, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>
                    <strong>${escapeHtml(it.productName)}</strong>
                    ${it.description ? `<div style="font-size:0.8rem;color:var(--text-muted);">${escapeHtml(it.description)}</div>` : ''}
                  </td>
                  <td>${Number(it.quantity || 0).toLocaleString('tr-TR')}</td>
                  <td>${escapeHtml(it.unit || 'kg')}</td>
                  <td>${Number(it.unitPrice || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(it.currency || share.baseCurrency || 'TRY')}</td>
                  <td>%${Number(it.discountPercent || 0)}</td>
                  <td><strong>${Number(it.lineNetExclVat || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(share.baseCurrency || 'TRY')}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="display:flex;justify-content:flex-end;margin-top:1.5rem;">
          <div style="min-width:290px;background:var(--bg-secondary);padding:1.25rem;border-radius:10px;border:1px solid var(--border-subtle);">
            <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;">
              <span>KDV Hariç Net Toplam:</span>
              <strong>${Number(share.netExclVat || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(share.baseCurrency || 'TRY')}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;">
              <span>Hesaplanan KDV:</span>
              <strong>${Number(share.totalVat || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(share.baseCurrency || 'TRY')}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;padding-top:0.6rem;border-top:1px solid var(--border-subtle);font-size:1.1rem;color:var(--accent-teal);">
              <span>Genel Toplam:</span>
              <strong>${Number(share.grandTotal || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(share.baseCurrency || 'TRY')}</strong>
            </div>
          </div>
        </div>
      </div>
    `;
    renderSafeHtml(targetEl, htmlCard);
    targetEl.querySelector('#portal-print-pdf-btn')?.addEventListener('click', () => {
      openProposalA4Modal(share);
    });
  }

  // Token form submit
  const tokenForm = container.querySelector('#portal-token-form');
  if (tokenForm) {
    tokenForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = container.querySelector('#portal-token-input')?.value || '';
      loadByToken(val);
    });
  }

  if (urlToken) {
    loadByToken(urlToken);
  }

  // Auth state listener
  const authBody = container.querySelector('#portal-auth-body');
  onAuthChange(async (user, profile) => {
    if (!authBody) return;
    if (!user) return;

    renderSafeHtml(authBody, `
      <div class="info-callout" style="margin-bottom:1rem;">
        <div>Oturum Açıldı: <strong>${escapeHtml(user.email || '')}</strong> (${escapeHtml(profile?.role || 'customer')})</div>
      </div>
      <div style="display:flex;gap:0.75rem;">
        <button type="button" class="btn btn-primary btn-sm" id="portal-load-my-records">Kayıtlarımı Yükle</button>
        <button type="button" class="btn btn-secondary btn-sm" id="portal-logout-btn">Çıkış Yap</button>
      </div>
    `);

    authBody.querySelector('#portal-logout-btn')?.addEventListener('click', async () => {
      await logoutCurrentUser();
      window.location.reload();
    });

    async function loadCustomerRecords() {
      if (!resultsArea) return;
      renderSafeHtml(resultsArea, `<div class="loading-banner">Hesabınıza bağlı teklif, sipariş ve servis kayıtları yükleniyor...</div>`);
      try {
        const data = await fetchAuthenticatedCustomerPortalData(user);
        const hasAny = data.shares.length > 0 || data.orders.length > 0 || data.services.length > 0;
        if (!hasAny) {
          renderSafeHtml(resultsArea, `
            <div class="empty-state-box">
              <h4>E-posta Adresinize (${escapeHtml(user.email || '')}) Tanımlı Aktif Kayıt Bulunamadı</h4>
              <p>Eğer elinizde 32+ karakterli teklif paylaşım anahtarı varsa sol taraftaki kutudan doğrudan açabilir veya yeni bir teklif talebi oluşturabilirsiniz.</p>
            </div>
          `);
          return;
        }

        const dashboardHtml = `
          <div class="card" style="padding:2rem;margin-bottom:2rem;">
            <h3>1. Tarafınıza İletilen Teklifler (${data.shares.length})</h3>
            ${data.shares.length === 0 ? `<p style="color:var(--text-muted);">Henüz paylaşılmış teklif bulunmuyor.</p>` : `
              <div class="products-table-wrapper">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Teklif No</th>
                      <th>Firma</th>
                      <th>Genel Toplam</th>
                      <th>Geçerlilik</th>
                      <th>Durum</th>
                      <th>A4 PDF</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${data.shares.map((s, idx) => `
                      <tr>
                        <td><strong>${escapeHtml(s.proposalNo)}</strong> (Rev.${escapeHtml(String(s.revisionNo || 1))})</td>
                        <td>${escapeHtml(s.companyName)}</td>
                        <td><strong>${Number(s.grandTotal || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(s.baseCurrency || 'TRY')}</strong></td>
                        <td>${escapeHtml(s.validUntil || '-')}</td>
                        <td><span class="badge badge-teal">${escapeHtml(s.status || 'sent')}</span></td>
                        <td><button type="button" class="btn btn-sm btn-secondary" data-view-share-idx="${idx}">A4 PDF Aç</button></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>

          <div class="card" style="padding:2rem;margin-bottom:2rem;">
            <h3>2. Onaylanan Sipariş ve Sevkiyat Durumu (${data.orders.length})</h3>
            ${data.orders.length === 0 ? `<p style="color:var(--text-muted);">Aktif sipariş kaydı bulunmuyor.</p>` : `
              <div class="products-table-wrapper">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Sipariş No</th>
                      <th>Durum</th>
                      <th>Toplam Tutar</th>
                      <th>Tahsilat Durumu</th>
                      <th>Planlanan Teslimat</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${data.orders.map((o) => `
                      <tr>
                        <td><strong>${escapeHtml(o.orderNo)}</strong></td>
                        <td><span class="badge badge-teal">${escapeHtml(o.status)}</span></td>
                        <td>${Number(o.grandTotal || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${escapeHtml(o.currency || 'TRY')}</td>
                        <td>${escapeHtml(o.paymentStatus || '-')}</td>
                        <td>${escapeHtml(o.deliveryDate || '-')}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>

          <div class="card" style="padding:2rem;">
            <h3>3. Su Arıtma Sistemi Servis ve Bakım Kayıtları (${data.services.length})</h3>
            ${data.services.length === 0 ? `<p style="color:var(--text-muted);">Kayıtlı servis veya bakım işlemi bulunmuyor.</p>` : `
              <div class="products-table-wrapper">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Sistem / Cihaz</th>
                      <th>Seri No</th>
                      <th>Sonraki Planlı Bakım</th>
                      <th>Durum</th>
                      <th>Teknisyen</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${data.services.map((sv) => `
                      <tr>
                        <td><strong>${escapeHtml(sv.systemName)}</strong></td>
                        <td><code>${escapeHtml(sv.serialNumber || '-')}</code></td>
                        <td><strong>${escapeHtml(sv.nextServiceDate || '-')}</strong></td>
                        <td><span class="badge badge-neutral">${escapeHtml(sv.status)}</span></td>
                        <td>${escapeHtml(sv.assignedTechnician || '-')}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        `;
        renderSafeHtml(resultsArea, dashboardHtml);
        resultsArea.querySelectorAll('[data-view-share-idx]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const idx = Number(btn.getAttribute('data-view-share-idx'));
            if (data.shares[idx]) {
              openProposalA4Modal(data.shares[idx]);
            }
          });
        });
      } catch (err) {
        showNotification(err.message || 'Müşteri kayıtları yüklenemedi.', 'error');
      }
    }

    authBody.querySelector('#portal-load-my-records')?.addEventListener('click', loadCustomerRecords);
    if (!urlToken) {
      loadCustomerRecords();
    }
  });

  // Login form handlers
  const loginForm = container.querySelector('#portal-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(loginForm);
      try {
        await loginWithEmail(String(fd.get('email') || ''), String(fd.get('password') || ''));
        showNotification('Giriş başarılı.', 'success');
      } catch (err) {
        showNotification(err.message || 'Giriş yapılamadı.', 'error');
      }
    });
  }

  container.querySelector('#portal-google-btn')?.addEventListener('click', async () => {
    try {
      await loginWithGoogle();
      showNotification('Google hesabı ile giriş yapıldı.', 'success');
    } catch (err) {
      showNotification(err.message || 'Google girişi başarısız.', 'error');
    }
  });
}

/**
 * Elif Kimya - Yönetim Merkezi (Admin Portal & Dashboard View)
 * 
 * Bu tasarım paketi localStorage kullanmaz ve herhangi bir sahte kaydı gerçek veri gibi
 * göstermemek üzere data-state="empty" dürüst mimarisiyle hazırlanmıştır.
 */

import { COLLECTIONS, isFirebaseConfigured, firebaseConfig } from '../firebase.js';

export function renderAdminPage(activeTab = 'genel-bakis', currentLang = 'tr') {
  const isTr = currentLang === 'tr';

  const menuItems = [
    { id: 'genel-bakis', label: 'Genel Bakış', icon: 'grid', section: 'OPERASYON' },
    { id: 'teklifler', label: 'Teklif Talepleri (RFQ)', icon: 'file-text', section: 'OPERASYON', badge: 'Yeni' },
    { id: 'mesajlar', label: 'İletişim Mesajları', icon: 'mail', section: 'OPERASYON' },
    { id: 'musteriler', label: 'Müşteriler & Cariler', icon: 'users', section: 'OPERASYON' },
    { id: 'muhasebe', label: 'Muhasebe & Finans', icon: 'credit-card', section: 'OPERASYON' },
    { id: 'urunler-yonetim', label: 'Ürün Kataloğu', icon: 'package', section: 'İÇERİK' },
    { id: 'bolgeler-yonetim', label: 'Hizmet Bölgeleri', icon: 'map-pin', section: 'İÇERİK' },
    { id: 'loglar', label: 'Denetim & Audit Logs', icon: 'shield', section: 'SİSTEM' },
    { id: 'firebase-ayarlar', label: 'Firebase & Entegrasyon', icon: 'settings', section: 'SİSTEM' }
  ];

  return `
    <div class="admin-shell">
      <!-- SOL YÖNETİM MENÜSÜ (SIDEBAR) -->
      <aside class="admin-sidebar">
        <div class="admin-brand">
          <a class="brand" href="#/" data-nav="/">
            <img src="/brand-mark.svg" alt="Elif Kimya" width="30" height="30" />
            <span>ELİF<span>KİMYA</span></span>
          </a>
          <span class="admin-badge">PORTAL / V1.0</span>
        </div>

        <div class="sidebar-scroll">
          <div class="side-label">OPERASYON MERKEZİ</div>
          <nav class="admin-nav-group">
            ${menuItems.filter(m => m.section === 'OPERASYON').map(item => `
              <a href="#" class="admin-nav-item ${activeTab === item.id ? 'active' : ''}" data-admin-tab="${item.id}">
                <span class="nav-icon">${getAdminIcon(item.icon)}</span>
                <span class="nav-text">${item.label}</span>
                ${item.badge ? `<span class="nav-pill">${item.badge}</span>` : ''}
              </a>
            `).join('')}
          </nav>

          <div class="side-label">İÇERİK & KATALOG</div>
          <nav class="admin-nav-group">
            ${menuItems.filter(m => m.section === 'İÇERİK').map(item => `
              <a href="#" class="admin-nav-item ${activeTab === item.id ? 'active' : ''}" data-admin-tab="${item.id}">
                <span class="nav-icon">${getAdminIcon(item.icon)}</span>
                <span class="nav-text">${item.label}</span>
              </a>
            `).join('')}
          </nav>

          <div class="side-label">GÜVENLİK & SİSTEM</div>
          <nav class="admin-nav-group">
            ${menuItems.filter(m => m.section === 'SİSTEM').map(item => `
              <a href="#" class="admin-nav-item ${activeTab === item.id ? 'active' : ''}" data-admin-tab="${item.id}">
                <span class="nav-icon">${getAdminIcon(item.icon)}</span>
                <span class="nav-text">${item.label}</span>
              </a>
            `).join('')}
          </nav>
        </div>

        <div class="sidebar-bottom">
          <div class="sync-status ${isFirebaseConfigured ? 'status-connected' : 'status-waiting'}">
            <span class="status-dot"></span>
            <div>
              <strong>Veri Tabanı Bağlantısı</strong>
              <small>${isFirebaseConfigured ? 'Firestore Canlı' : 'Gerçek Firestore Bekleniyor'}</small>
            </div>
          </div>
          <a href="#/" data-nav="/" class="back-site-btn">
            <span>← Ana Siteye Dön</span>
          </a>
        </div>
      </aside>

      <!-- SAĞ ANA İÇERİK ALANI -->
      <main class="admin-main">
        <div class="admin-toolbar">
          <div>
            <p class="kicker">ELİF KİMYA YÖNETİM PANELİ · GÜVENLİ ERİŞİM</p>
            <h1>${getTabTitle(activeTab)}</h1>
          </div>

          <div class="admin-actions">
            <div class="data-mode-badge ${isFirebaseConfigured ? 'live-badge' : 'mock-badge'}">
              ${isFirebaseConfigured ? '🟢 Firestore Live' : '🟠 Prototip / Entegrasyon Modu'}
            </div>
            <div class="avatar-profile">
              <div class="avatar">CK</div>
              <div class="user-name">
                <strong>Cebrail</strong>
                <span>Sistem Yöneticisi</span>
              </div>
            </div>
          </div>
        </div>

        <div class="admin-body-content">
          ${renderTabContent(activeTab)}
        </div>
      </main>
    </div>
  `;
}

function getTabTitle(tab) {
  switch (tab) {
    case 'genel-bakis': return 'Operasyonel Genel Bakış';
    case 'teklifler': return 'Teklif Talepleri & RFQ Akışı';
    case 'mesajlar': return 'Gelen İletişim Mesajları';
    case 'musteriler': return 'Müşteri & Cari Kartları';
    case 'muhasebe': return 'Muhasebe & Finansal Raporlar';
    case 'urunler-yonetim': return 'Ürün ve Şartname Yönetimi';
    case 'bolgeler-yonetim': return 'Hizmet Bölgeleri Yönetimi';
    case 'loglar': return 'Audit Logs & Denetim Kayıtları';
    case 'firebase-ayarlar': return 'Firebase ve Güvenlik Ayarları';
    default: return 'Yönetim Merkezi';
  }
}

function renderTabContent(tab) {
  switch (tab) {
    case 'genel-bakis':
      return `
        <!-- KPI METRİKLERİ -->
        <div class="admin-metric-grid">
          <div class="metric-card">
            <span>BEKLEYEN TEKLİFLER</span>
            <strong>—</strong>
            <small>Firestore bağlantısı bekleniyor</small>
            <i class="metric-icon">↗</i>
          </div>
          <div class="metric-card">
            <span>YENİ MESAJLAR</span>
            <strong>—</strong>
            <small>Firestore bağlantısı bekleniyor</small>
            <i class="metric-icon">✦</i>
          </div>
          <div class="metric-card">
            <span>AKTİF CARİLER</span>
            <strong>—</strong>
            <small>Firestore bağlantısı bekleniyor</small>
            <i class="metric-icon">🏢</i>
          </div>
          <div class="metric-card accent">
            <span>BU AYKİ TAHSİLAT</span>
            <strong>— ₺</strong>
            <small>Gerçek veri bekleniyor</small>
            <i class="metric-icon">₺</i>
          </div>
        </div>

        <!-- OPERASYON PANELİ & DURUM BİLGİSİ -->
        <div class="admin-two-cols">
          <section class="panel wide-panel">
            <div class="panel-head">
              <div>
                <span class="panel-kicker">SON HAREKETLER</span>
                <h3>Canlı Operasyon Akışı</h3>
              </div>
              <button class="panel-link" data-admin-tab="teklifler">Tümünü İncele →</button>
            </div>
            ${renderEmptyState('Son Operasyon Kayıtları', 'Yeni teklif veya iletişim talebi geldiğinde burada anlık zaman damgasıyla listelenecektir.')}
          </section>

          <section class="panel">
            <div class="panel-head">
              <div>
                <span class="panel-kicker">ENTEGRASYON KILAVUZU</span>
                <h3>Firebase Firestore</h3>
              </div>
            </div>
            <div class="integration-guide-box">
              <p>Bu panel sahte KPI veya demo veri göstermez. Gerçek kayıtları görmek için projenize Firebase Authentication ve Firestore bağlayınız.</p>
              <ul class="col-checklist">
                <li><code>${COLLECTIONS.QUOTE_REQUESTS}</code> koleksiyonu hazır</li>
                <li><code>${COLLECTIONS.CONTACT_MESSAGES}</code> koleksiyonu hazır</li>
                <li><code>${COLLECTIONS.ACCOUNTING_ENTRIES}</code> muhasebe şeması hazır</li>
                <li><code>firestore.rules</code> güvenlik kuralları hazır</li>
              </ul>
              <button class="button button-small button-dark" data-admin-tab="firebase-ayarlar">
                Entegrasyon Ayarlarına Git →
              </button>
            </div>
          </section>
        </div>
      `;

    case 'teklifler':
      return `
        <div class="table-container-card">
          <div class="table-header-bar">
            <div>
              <h3>Teklif Talepleri (${COLLECTIONS.QUOTE_REQUESTS})</h3>
              <p>Web sitesinden gelen teknik B2B talepleri, su parametreleri ve proforma durumları.</p>
            </div>
            <div class="table-actions">
              <a href="#/teklif-al" class="button button-small button-primary" target="_blank">
                + Yeni Manuel Teklif Oluştur
              </a>
            </div>
          </div>

          <div class="table-filters-row">
            <span class="filter-pill active">Tümü (—)</span>
            <span class="filter-pill">Yeni (Pending)</span>
            <span class="filter-pill">İnceleniyor (Reviewed)</span>
            <span class="filter-pill">Teklif Verildi (Quoted)</span>
            <span class="filter-pill">Tamamlandı (Completed)</span>
          </div>

          <div class="admin-table-wrapper">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Talep Ref</th>
                  <th>Firma Adı & Şehir</th>
                  <th>Yetkili & İletişim</th>
                  <th>İlgili Kategori / Ürün</th>
                  <th>Miktar & Kapasite</th>
                  <th>Tarih</th>
                  <th>Durum</th>
                  <th>Aksiyon</th>
                </tr>
              </thead>
              <tbody>
                <!-- Veri Yoksa data-state="empty" dürüst görünümü -->
              </tbody>
            </table>
            ${renderEmptyState('Bekleyen Teklif Talebi Bulunamadı', 'Kullanıcılar web sitesindeki /teklif-al formunu doldurduğunda talepler bu tabloya anlık düşecektir.')}
          </div>
        </div>
      `;

    case 'mesajlar':
      return `
        <div class="table-container-card">
          <div class="table-header-bar">
            <div>
              <h3>İletişim Mesajları (${COLLECTIONS.CONTACT_MESSAGES})</h3>
              <p>İletişim formundan gelen teknik danışmanlık, keşif ve numune talepleri.</p>
            </div>
          </div>

          <div class="admin-table-wrapper">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Gönderen</th>
                  <th>Firma</th>
                  <th>E-posta</th>
                  <th>Telefon</th>
                  <th>Konu</th>
                  <th>Tarih</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            ${renderEmptyState('Okunmamış Mesaj Yok', 'Web sitesi üzerinden iletilen mesajlar bu listede görüntülenecektir.')}
          </div>
        </div>
      `;

    case 'musteriler':
      return `
        <div class="table-container-card">
          <div class="table-header-bar">
            <div>
              <h3>Müşteri & Cari Kartları (${COLLECTIONS.COMPANIES})</h3>
              <p>Düzenli kimyasal sevkiyatı yapılan fabrikalar, vergi bilgileri ve teknik şartnameleri.</p>
            </div>
            <button class="button button-small button-dark" type="button" disabled>
              + Yeni Firma Ekle (Canlı Veri Bekleniyor)
            </button>
          </div>

          <div class="admin-table-wrapper">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Firma Ünvanı</th>
                  <th>Şehir / OSB</th>
                  <th>Sektör</th>
                  <th>Yetkili</th>
                  <th>Son Sevkiyat</th>
                  <th>Cari Bakiye</th>
                  <th>Detay</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            ${renderEmptyState('Kayıtlı Müşteri Portföyü Bekleniyor', 'Firestore şirketler koleksiyonu bağlandığında cari hesaplar burada listelenecektir.')}
          </div>
        </div>
      `;

    case 'muhasebe':
      return `
        <div class="accounting-view-container">
          <div class="admin-metric-grid">
            <div class="metric-card">
              <span>TOPLAM ALACAK (CARİLER)</span>
              <strong>— ₺</strong>
              <small>Gerçek veri bekleniyor</small>
            </div>
            <div class="metric-card">
              <span>BU AYKİ TAHSİLAT</span>
              <strong>— ₺</strong>
              <small>Gerçek veri bekleniyor</small>
            </div>
            <div class="metric-card">
              <span>BEKLEYEN ÖDEMELER</span>
              <strong>— ₺</strong>
              <small>Gerçek veri bekleniyor</small>
            </div>
            <div class="metric-card accent">
              <span>NET NAKİT AKIŞI</span>
              <strong>— ₺</strong>
              <small>Dönem Dengesi</small>
            </div>
          </div>

          <div class="table-container-card" style="margin-top: 25px;">
            <div class="table-header-bar">
              <div>
                <h3>Tahsilat & Ödeme Matrisi (${COLLECTIONS.ACCOUNTING_ENTRIES})</h3>
                <p>Sözleşmeli cari hesaplar, tahsilat sorumlusu ve vade takibi.</p>
              </div>
            </div>

            <div class="admin-table-wrapper">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Evrak / Fatura No</th>
                    <th>Cari Firma</th>
                    <th>Tutar</th>
                    <th>Vade Tarihi</th>
                    <th style="color: var(--turq); font-weight: 700;">Kimde (Kullanan / Sorumlu)</th>
                    <th>Tahsilat Durumu</th>
                    <th>Ödeme Türü</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              ${renderEmptyState('Muhasebe ve Tahsilat Kayıtları Bekleniyor', 'Tahsilat Kimde matrisi ve cari hareketler Firestore muhasebe koleksiyonu üzerinden doldurulacaktır.')}
            </div>
          </div>
        </div>
      `;

    case 'urunler-yonetim':
      return `
        <div class="table-container-card">
          <div class="table-header-bar">
            <div>
              <h3>Katalog & Şartname Yönetimi (${COLLECTIONS.PRODUCTS})</h3>
              <p>Web sitesinde yayımlanan 6 ana kategori, ürün özellikleri ve TDS teknik föyleri.</p>
            </div>
          </div>

          <div class="admin-table-wrapper">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Kod</th>
                  <th>Kategori Adı</th>
                  <th>Alt Ürün Sayısı</th>
                  <th>TDS Durumu</th>
                  <th>Yayında mı?</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>01</strong></td>
                  <td>Soğutma Kulesi Kimyasalları</td>
                  <td>5 Ürün (Korozyon, Antiskalant, Biyosit...)</td>
                  <td><span class="badge-mini status-active">TDS Aktif</span></td>
                  <td><span class="badge-mini status-active">Canlı</span></td>
                  <td><button class="panel-link">Düzenle</button></td>
                </tr>
                <tr>
                  <td><strong>02</strong></td>
                  <td>Endüstriyel Su Arıtma Sistemleri</td>
                  <td>5 Sistem (RO, Karbon, Yumuşatma, UF...)</td>
                  <td><span class="badge-mini status-active">TDS Aktif</span></td>
                  <td><span class="badge-mini status-active">Canlı</span></td>
                  <td><button class="panel-link">Düzenle</button></td>
                </tr>
                <tr>
                  <td><strong>03</strong></td>
                  <td>Saf Su ve Ultra Saf Su (EDI)</td>
                  <td>5 Çözüm (Tip I-II-III, EDI, Sarf...)</td>
                  <td><span class="badge-mini status-active">TDS Aktif</span></td>
                  <td><span class="badge-mini status-active">Canlı</span></td>
                  <td><button class="panel-link">Düzenle</button></td>
                </tr>
                <tr>
                  <td><strong>04</strong></td>
                  <td>Kazan Suyu Kimyasalları</td>
                  <td>4 Ürün (Oksijen Tutucu, Şartlandırıcı...)</td>
                  <td><span class="badge-mini status-active">TDS Aktif</span></td>
                  <td><span class="badge-mini status-active">Canlı</span></td>
                  <td><button class="panel-link">Düzenle</button></td>
                </tr>
                <tr>
                  <td><strong>05</strong></td>
                  <td>Atık Su Arıtma Kimyasalları</td>
                  <td>5 Ürün (PAC, Anyonik/Katyonik Polimer...)</td>
                  <td><span class="badge-mini status-active">TDS Aktif</span></td>
                  <td><span class="badge-mini status-active">Canlı</span></td>
                  <td><button class="panel-link">Düzenle</button></td>
                </tr>
                <tr>
                  <td><strong>06</strong></td>
                  <td>Fabrika ve Proses Kimyasalları</td>
                  <td>5 Ürün (CIP Yıkayıcı, Köpük Kesici...)</td>
                  <td><span class="badge-mini status-active">TDS Aktif</span></td>
                  <td><span class="badge-mini status-active">Canlı</span></td>
                  <td><button class="panel-link">Düzenle</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;

    case 'bolgeler-yonetim':
      return `
        <div class="table-container-card">
          <div class="table-header-bar">
            <div>
              <h3>Bölgesel Lojistik & SEO Hedefleri (${COLLECTIONS.APPLICATION_AREAS})</h3>
              <p>Adana, Mersin, Hatay, Osmaniye, Gaziantep, Kayseri ve Türkiye geneli SEO sayfaları.</p>
            </div>
          </div>
          <div class="admin-table-wrapper">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Bölge</th>
                  <th>Öncelik</th>
                  <th>Lojistik Süresi</th>
                  <th>Hedef Arama Kelimeleri</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Adana (AOSB & Merkez)</strong></td>
                  <td><span class="badge-mini status-active">Çok Yüksek</span></td>
                  <td>2 - 4 Saat (Aynı Gün)</td>
                  <td>Adana su arıtma kimyasalları, soğutma kulesi</td>
                  <td><span class="badge-mini status-active">Aktif</span></td>
                </tr>
                <tr>
                  <td><strong>Mersin (Liman & Serbest Bölge)</strong></td>
                  <td><span class="badge-mini status-active">Çok Yüksek</span></td>
                  <td>4 - 12 Saat</td>
                  <td>Mersin endüstriyel su arıtma, fabrika kimyası</td>
                  <td><span class="badge-mini status-active">Aktif</span></td>
                </tr>
                <tr>
                  <td><strong>Osmaniye & Hatay (Haddehane)</strong></td>
                  <td><span class="badge-mini">Yüksek</span></td>
                  <td>24 Saat</td>
                  <td>İskenderun korozyon inhibitörü, kazan şartlandırma</td>
                  <td><span class="badge-mini status-active">Aktif</span></td>
                </tr>
                <tr>
                  <td><strong>Gaziantep & Kayseri</strong></td>
                  <td><span class="badge-mini">Yüksek</span></td>
                  <td>24 - 48 Saat</td>
                  <td>Gaziantep su arıtma sistemleri, kireç önleyici</td>
                  <td><span class="badge-mini status-active">Aktif</span></td>
                </tr>
                <tr>
                  <td><strong>Türkiye Geneli (81 İl)</strong></td>
                  <td><span class="badge-mini">Ulusal</span></td>
                  <td>24 - 72 Saat</td>
                  <td>Saf su sistemi, RO antiskalant, biyosit tedarik</td>
                  <td><span class="badge-mini status-active">Aktif</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;

    case 'loglar':
      return `
        <div class="table-container-card">
          <div class="table-header-bar">
            <div>
              <h3>Denetim ve Güvenlik Logları (${COLLECTIONS.AUDIT_LOGS})</h3>
              <p>Veri tabanı okuma/yazma, yönetici giriş denemeleri ve KVKK mutabakat logları.</p>
            </div>
          </div>
          <div class="admin-table-wrapper">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Zaman Damgası</th>
                  <th>Kullanıcı / IP</th>
                  <th>İşlem Türü</th>
                  <th>Koleksiyon</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            ${renderEmptyState('Güvenlik Kayıtları Bekleniyor', 'Firestore auditLogs koleksiyonu aktifleştirildiğinde tüm sistem hareketleri burada tutulur.')}
          </div>
        </div>
      `;

    case 'firebase-ayarlar':
      return `
        <div class="settings-card-panel">
          <div class="settings-box">
            <h3>Firebase Canlı Bağlantı Durumu</h3>
            <p>Elif Kimya B2B platformunun üretim ortamında çalışabilmesi için Firebase yapılandırması gereklidir.</p>

            <div class="config-status-block ${isFirebaseConfigured ? 'status-ok' : 'status-pending'}">
              <strong>Mevcut Durum:</strong>
              ${isFirebaseConfigured 
                ? '✅ Canlı Firebase Projesine Bağlandı.' 
                : '⚠️ .env Dosyası Yapılandırılmadı (Prototip & Şema Doğrulama Modunda Çalışıyor)'}
            </div>

            <h4>Bağlantı Kurulum Adımları:</h4>
            <ol class="setup-steps">
              <li>Proje ana dizinindeki <code>.env.example</code> dosyasını kopyalayarak <code>.env</code> olarak adlandırın.</li>
              <li>Firebase Console üzerinden oluşturduğunuz projenin <code>apiKey</code>, <code>projectId</code> vb. bilgilerini girin.</li>
              <li><code>firestore.rules</code> dosyasındaki güvenlik kurallarını Firebase konsoluna dağıtın (deploy edin).</li>
              <li>Projeyi <code>npm run build</code> komutuyla derleyin.</li>
            </ol>

            <div class="code-preview-box">
              <pre><code>VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=elif-kimya-b2b.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=elif-kimya-b2b
VITE_FIREBASE_STORAGE_BUCKET=elif-kimya-b2b.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...</code></pre>
            </div>

            <div class="settings-notice">
              <strong>🔒 Güvenlik Notu:</strong> Bu web sitesi hiçbir teklifi veya müşteri verisini tarayıcı <code>localStorage</code> belleğinde saklamaz. Tüm veriler doğrudan Firebase TLS/SSL şifreli kanalı üzerinden Firestore'a iletilir.
            </div>
          </div>
        </div>
      `;

    default:
      return renderEmptyState('Modül Seçiniz', 'Lütfen soldaki menüden bir yönetim başlığı seçiniz.');
  }
}

function renderEmptyState(title, desc) {
  return `
    <div class="data-empty" data-state="empty">
      <div class="empty-mark">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
      </div>
      <h3>${title}</h3>
      <p>${desc}</p>
      <span class="state-tag">data-state="empty" · Gerçek Firestore Bekleniyor</span>
    </div>
  `;
}

function getAdminIcon(iconName) {
  switch (iconName) {
    case 'grid':
      return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;
    case 'file-text':
      return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;
    case 'mail':
      return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
    case 'users':
      return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
    case 'credit-card':
      return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`;
    case 'package':
      return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`;
    case 'map-pin':
      return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
    case 'shield':
      return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
    case 'settings':
      return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
    default:
      return ``;
  }
}

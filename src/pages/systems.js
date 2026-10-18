/**
 * Elif Kimya - Endüstriyel Su Arıtma ve Saf Su Sistemleri (Systems View)
 */

export function renderSystemsPage(currentLang = 'tr') {
  const isTr = currentLang === 'tr';

  return `
    <main class="page-systems">
      <div class="page-header-bar">
        <div class="container">
          <p class="kicker">MÜHENDİSLİK & EKİPMAN ÇÖZÜMLERİ</p>
          <h1>Endüstriyel Su Arıtma &<br/><span>Saf Su Sistemleri (EDI)</span></h1>
          <p class="page-lede">
            Ham suyun analizinden anahtar teslim tesis kurulumuna; Reverse Osmosis (RO), Elektro-deiyonizasyon (EDI), multimedya kum/karbon filtrasyonu ve kesintisiz iyon değiştirici su yumuşatma sistemleri.
          </p>
        </div>
      </div>

      <div class="container systems-body">
        <!-- Proses Akış Şeması (Diagram) -->
        <section class="flow-diagram-section">
          <div class="diagram-header">
            <h3>Tipik Endüstriyel Su Saflaştırma Akış Mimarisi</h3>
            <p>Fabrikanızın ham suyunu adım adım analitik standartlara ulaştıran mühendislik dizilimi:</p>
          </div>
          <div class="flow-steps-grid">
            <div class="flow-step">
              <span class="step-badge">GİRİŞ</span>
              <strong>01. Ham Su Girişi</strong>
              <small>Kuyu, Şebeke veya Nehir Suyu (TDS: 500 - 4.000 ppm)</small>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <span class="step-badge">ÖN ARITMA</span>
              <strong>02. Kum & Karbon Filtre</strong>
              <small>Askıda Katı Madde (AKM), Bulanıklık & Klor Giderimi</small>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <span class="step-badge">KORUMA</span>
              <strong>03. Yumuşatma / UF</strong>
              <small>Kalsiyum & Magnezyum İyon Değişimi, Sıfır Sertlik</small>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step highlight">
              <span class="step-badge">DESALİNASYON</span>
              <strong>04. Reverse Osmosis (RO)</strong>
              <small>%99.5 Mineral & Tuz Giderimi (İletkenlik: 5-20 µS/cm)</small>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step ultra">
              <span class="step-badge">ULTRA SAF</span>
              <strong>05. EDI / Miks Yatak</strong>
              <small>0.055 µS/cm (18.2 MΩ·cm), ASTM Tip I Analitik Saflık</small>
            </div>
          </div>
        </section>

        <!-- Sistem Detay Kartları -->
        <div class="systems-grid-detailed">
          <!-- 1. RO Sistemleri -->
          <div class="system-deep-card">
            <div class="sys-badge">ÖNCÜ TEKNOLOJİ</div>
            <h2>Endüstriyel Reverse Osmosis (Ters Ozmoz)</h2>
            <p class="sys-lead">
              Yüksek basınçlı membran ayrıştırma prensibiyle çözünmüş inorganik tuzları, ağır metalleri ve bakterileri sudan ayıran en ekonomik proses suyu kaynağı.
            </p>
            <div class="sys-details-list">
              <div class="sys-feat">
                <strong>Kapasite Aralığı:</strong> 1 m³/saat - 150 m³/saat modüler şasi tasarımı.
              </div>
              <div class="sys-feat">
                <strong>Membran Türleri:</strong> Düşük enerjili (Low Energy), acı su (Brackish Water) veya kirlenmeye dirençli (Fouling Resistant) DOW Filmtec / Toray membranlar.
              </div>
              <div class="sys-feat">
                <strong>Otomasyon & PLC:</strong> Siemens / Schneider dokunmatik ekran, sürekli iletkenlik, debi ve basınç sensörleri, otomatik kimyasal yıkama (CIP) döngüsü.
              </div>
            </div>
            <div class="sys-actions">
              <a class="button button-primary" href="#/teklif-al?sistem=reverse-osmosis" data-nav="/teklif-al">
                RO Sistemi Teklifi İste →
              </a>
            </div>
          </div>

          <!-- 2. EDI ve Saf Su Sistemleri -->
          <div class="system-deep-card highlight-border">
            <div class="sys-badge">MEDIPURE & LABORATUVAR</div>
            <h2>EDI (Elektro-deiyonizasyon) & Saf Su Üniteleri</h2>
            <p class="sys-lead">
              Rejenerasyon asidi ve kostiği gerektirmeden, elektrik akımı yardımıyla kesintisiz ultra saf su (18.2 MΩ·cm) üreten yeni nesil çevre dostu deiyonizasyon.
            </p>
            <div class="sys-details-list">
              <div class="sys-feat">
                <strong>Standartlar:</strong> ASTM D1193 Tip I / II, ISO 3696, CLSI ve Avrupa Farmakopesi uyumlu.
              </div>
              <div class="sys-feat">
                <strong>Kullanım Alanları:</strong> İlaç formülasyonu, enerji santralleri yüksek basınçlı kazan besi suyu, mikroelektronik ve analitik laboratuvarlar.
              </div>
              <div class="sys-feat">
                <strong>Çevre Avantajı:</strong> Tehlikeli kimyasal atık yok, sürekli çalışma, minimum işletme bakım maliyeti.
              </div>
            </div>
            <div class="sys-actions">
              <a class="button button-primary" href="#/teklif-al?sistem=edi-saf-su" data-nav="/teklif-al">
                Saf Su / EDI Teklifi İste →
              </a>
            </div>
          </div>

          <!-- 3. Yumuşatma ve Filtrasyon -->
          <div class="system-deep-card">
            <div class="sys-badge">ÖN ŞARTLANDIRMA</div>
            <h2>Otomatik Tandem Su Yumuşatma & Multimedya</h2>
            <p class="sys-lead">
              Buhar kazanları ve soğutma kulelerinin bir numaralı düşmanı olan kalsiyum ve magnezyum kirecini yok eden kesintisiz çalışan tandem reçine kolonları.
            </p>
            <div class="sys-details-list">
              <div class="sys-feat">
                <strong>Flew ve Valf Teknolojisi:</strong> Clack / Fleck debi kontrollü otomatik rejenerasyon kafaları.
              </div>
              <div class="sys-feat">
                <strong>Reçine Kalitesi:</strong> Gıda tipi yüksek kapasiteli güçlü asidik katyonik reçineler.
              </div>
              <div class="sys-feat">
                <strong>Kesintisiz 7/24 Akış:</strong> Biri rejenerasyondayken diğeri serviste kalarak fabrikayı susuz bırakmaz.
              </div>
            </div>
            <div class="sys-actions">
              <a class="button button-primary" href="#/teklif-al?sistem=su-yumusatma" data-nav="/teklif-al">
                Yumuşatma Sistemi Teklifi İste →
              </a>
            </div>
          </div>
        </div>

        <!-- Mühendislik Taahhüt Banner -->
        <div class="engineering-promise">
          <div class="promise-content">
            <h3>Elif Kimya Mühendislik Güvencesi</h3>
            <p>
              Tüm sistemlerimiz montaj, devreye alma, operatör eğitimi ve 2 yıl garantili teknik servis sözleşmesi ile teslim edilir. Ayrıca su analizlerinize göre membran otopsisi ve kimyasal CIP yıkama desteği verilir.
            </p>
            <div class="promise-badges">
              <span>✓ Yerinde Saha Keşfi</span>
              <span>✓ 3D Tesis Modelleme</span>
              <span>✓ Orijinal Sarf & Membran Garantisi</span>
            </div>
          </div>
          <div class="promise-cta">
            <a class="button button-dark" href="#/iletisim" data-nav="/iletisim">
              Mühendislik Ekibimizle Görüşün →
            </a>
          </div>
        </div>
      </div>
    </main>
  `;
}

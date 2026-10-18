# Elif Kimya — Kurumsal B2B Web Platformu, Mühendislik Portalı ve 9 Modüllü ERP/CRM Yönetim Sistemi

**Elif Kimya Mühendislik**, Adana merkezli olarak Çukurova (Adana, Mersin, Tarsus, Osmaniye), Doğu Akdeniz (İskenderun, Payas, Dörtyol), Güneydoğu Anadolu (Gaziantep, Kahramanmaraş) ve İç Anadolu (Kayseri, Niğde/Bor) başta olmak üzere Türkiye genelindeki ağır sanayi tesislerine **endüstriyel su şartlandırma kimyasalları, proses kimyasalları, yüzey işlem/asitleme inhibitörleri, yüksek molekül ağırlıklı flokülantlar ve anahtar teslim su arıtma sistemleri (RO / EDI / Yumuşatma / Filtrasyon)** sunan kurumsal B2B platformudur.

- **Canlı Yayın Adresi (Firebase Hosting):** [https://elifkimya.web.app](https://elifkimya.web.app)
- **Kurumsal Yönetim Paneli (ERP/CRM):** [https://elifkimya.web.app/admin](https://elifkimya.web.app/admin)
- **Müşteri Teklif, Sipariş & Servis Portalı:** [https://elifkimya.web.app/portal](https://elifkimya.web.app/portal)
- **GitHub Deposu:** [https://github.com/Highlife01/elifkimya](https://github.com/Highlife01/elifkimya)

---

## 1. Mimari ve Çoklu Site Veri İzolasyonu (Multi-Site Isolation)

`advera-c8dd0` Firebase projesi altında çalışan diğer sitelerle **hiçbir verinin karışmaması** için Elif Kimya tamamen izole bir veritabanı ve depolama alanında çalışır:

| Katman | İzolasyon Yapılandırması | Açıklama |
| :--- | :--- | :--- |
| **Firebase Projesi** | `advera-c8dd0` | Ana GCP / Firebase projesi |
| **Firestore Veritabanı** | `elifkimya` (`eur3` Standard) | `getFirestore(app, 'elifkimya')` ile `(default)` veritabanından %100 bağımsız |
| **Cloud Storage Öneki** | `elifkimya/documents/...`, `elifkimya/projects/...` | Tüm SDS/GBF, TDS, COA ve su analizi dosyaları `elifkimya/` dizininde tutulur |
| **Firebase Hosting Hedefi** | `hosting:elifkimya` | Yalnızca `elifkimya.web.app` hedefini günceller |

---

## 2. Temel Mühendislik, Veri Doğruluğu ve Güvenlik İlkeleri

1. **%100 Gerçek Sunucu Verisi (Zero Fabrication):**
   - Hiçbir modülde sahte müşteri, uydurma sipariş, hayali stok bakiyesi, tahmini kimyasal güvenlik/tehlike sınıfı (SDS) veya sahte grafik üretilmez.
   - Koleksiyonlarda kayıt yoksa kullanıcıya açıklayıcı boş durum (*Empty State*) gösterilir.
2. **`localStorage` Yasağı ve Sunucu Doğrulaması:**
   - İş verileri (`crmRequests`, `customers`, `products`, `documents`, `projects`, `proposals`, `orders`, `inventoryItems`, `inventoryMovements`, `serviceRecords`, `siteSettings`) asla tarayıcı yerel belleğinde saklanmaz.
   - Başarı bildirimleri yalnızca Firestore / Storage işlemi sunucu tarafından onaylandığında (`await` tamamlandığında) gösterilir. Hata durumunda arayüz değişikliği geri alınır.
3. **Kimyasal Yoğunluk Koruma Kuralı (Density Guard):**
   - `kg`/`ton` ile `litre`/`m³` arasında **doğrulanmış özgül ağırlık ($\text{g/cm}^3$, 20°C)** bilgisi olmadan otomatik birim dönüşümü yapılması hem genel katalogda hem de yönetim panelinde matematiksel ve yazılımsal olarak engellenmiştir (`convertMassVolumeUnit`).
4. **Su Analizi ve Mühendislik Koruma Kuralı (Water Analysis Guard):**
   - Kaynak su analizi (iletkenlik, sertlik, silis, pH, debi) doğrulanmadan kesin membran kapasitesi, arıtma verimi veya kimyasal dozaj garantisi verilmez; su arıtma projelerinde teknik onay yetkili mühendis/yönetici imzasına bağlıdır (`approveWaterProjectTechnical`).
5. **Teklif Maliyet Gizliliği ve Değiştirilemez Revizyonlar:**
   - Müşteriye gönderilen teklifler otomatik olarak `isImmutable: true` olarak kilitlenir; değişiklik gerektiğinde yeni revizyon (`Rev. 2`, `Rev. 3`) oluşturulur.
   - Müşteri portalına (`portalShares`) aktarılan teklif kopyalarından **birim maliyet (`unitCost`), toplam maliyet (`totalCost`), brüt kâr (`grossProfit`), kâr marjı (`profitMarginPercent`) ve iç yönetici notları (`internalAdminNotes`)** hem uygulama katmanında hem de `firestore.rules` seviyesinde kesin olarak temizlenir.
6. **DOM Güvenliği (Zero XSS):**
   - Kod tabanında `.innerHTML`, `.outerHTML`, `insertAdjacentHTML`, `eval()` ve yerel `alert()`/`confirm()`/`prompt()` kullanımı sıfırdır. Tüm şablonlar `DOMParser` tabanlı güvenli `renderSafeHtml()` sanitizasyon motorundan geçerek DOM'a aktarılır.

---

## 3. Kurumsal Web Sitesi Rotaları (Aydınlık Laboratuvar & Mühendislik Teması)

| Rota | Sayfa & Fonksiyon |
| :--- | :--- |
| `/` | **Ana Sayfa:** Aydınlık kurumsal hero, 4 Sıfır Riskli Fabrika Giriş Programı, "Sizi Arayalım" hızlı geri arama bandı, 6 Mega Sanayi Proses Matrisi, 6 Ana Kimyasal Kategorisi ve Çukurova vs. Marmara Lojistik Üstünlük Tablosu |
| `/urunler` | **Kimyasal Ürünler:** 6 ana kategori, alt ürün teknik tabloları, canlı Firestore ürün kataloğu ve interaktif **Yoğunluk Doğrulamalı Birim Dönüştürücü (`kg ↔ litre`)** |
| `/sistemler` | **Su Arıtma Sistemleri:** Endüstriyel RO, EDI, Otomatik Yumuşatma, Multimedya/Aktif Karbon Filtrasyon, Dozaj & Otomasyon sistemleri ve doğrudan proje başvuru formu |
| `/sektorler` | **Sektörel Proses Çözümleri & Canlı ROI Simülatörleri:** Demir-Çelik Haddehaneleri, Deterjan/Sülfonasyon, Kağıt/Oluklu Mukavva, Düzcam/Cam Ambalaj, Niğde Mikronize Kalsit ve Kayseri Boru/Galvaniz proses formülasyonları + **3 Canlı Finansal Mühendislik (ROI) Hesaplayıcısı** |
| `/hizmet-bolgeleri` | **Hizmet Bölgeleri & Lojistik:** Adana AOSB, Mersin MTOSB/Liman, İskenderun-Payas-Osmaniye Demir-Çelik Koridoru, Gaziantep, Kayseri ve Niğde sevkiyat süreleri |
| `/teknik-bilgi` | **Teknik Belge Merkezi:** Canlı yayımlanmış SDS/GBF, TDS, COA belgeleri, proses mühendisliği makaleleri ve kurumsal SSS |
| `/teklif-al` | **Kurumsal Teklif & Saha Jar-Test Başvurusu:** 4 kapı açıcı program seçici ve doğrudan CRM'e (`Yeni Talep`) bağlanan detaylı RFQ formu |
| `/iletisim` | **Kurumsal İletişim & Bölge Müdürlükleri:** *Sizi Arayalım* hızlı geri arama formu, *WhatsApp Mühendislik Hattı*, 5 Bölge İrtibat Kartı (Adana Merkez, Mersin-Tarsus, İskenderun-Osmaniye, Gaziantep-K.Maraş, Kayseri-Niğde) ve 5 Hizmet Grubu özeti |
| `/portal` | **Müşteri Portalı:** Güvenli paylaşım kodu (`shareToken`) veya kurumsal müşteri girişiyle teklif inceleme/onaylama, sipariş/sevkiyat takibi, servis geçmişi ve SDS/TDS/COA belge indirme |
| `/admin` | **9 Modüllü Yönetim Paneli:** Tam kapsamlı kurumsal ERP, CRM, ürün, belge, proje, maliyet/teklif, stok/sipariş, servis ve RBAC yönetim ekranı |

---

## 4. `/admin` — 9 Modüllü Yönetim Paneli

1. **Genel Bakış (`dashboard`):** Gerçek kayıtlardan yeni/bekleyen talepler, hazırlanan/gönderilen teklifler, onaylanan siparişler, devam eden su arıtma projeleri, yaklaşan servisler, kritik stok uyarıları, tarih aralığı filtresi ve teklif hacmi vs. onaylanan satış vs. tahsilat ayrımı. *(Sipariş talepleri gerçekleşmiş satış sayılmaz.)*
2. **Müşteri ve Talep Yönetimi (`crm`):** 10 aşamalı pipeline (*Yeni Talep → İlk Görüşme → İhtiyaç Analizi → Teknik Değerlendirme → Teklif Hazırlanıyor → Teklif Gönderildi → Revizyon → Onaylandı → Tedarik/Uygulama → Tamamlandı*), ayrı *Kaybedildi / İptal / Arşiv* durumları, Kanban ve Tablo görünümü, müşteri cari kartları ve B2B Satış Playbook rehberi.
3. **Kimyasal Ürünler (`products`):** Ticari ad, doğrulanmış kimyasal ad, ürün kodu, CAS No, konsantrasyon, özgül ağırlık ($\text{g/cm}^3$), ambalaj varyantları, minimum sipariş miktarı ve fiyat gizleme (*"Teklif İsteyin"*) desteği.
4. **Teknik Belge Merkezi (`documents`):** Firebase Storage (`elifkimya/documents/...`) üzerinde SDS/GBF, TDS, COA ve sertifika yükleme, revizyon geçmişi saklama ve erişim seviyesi (`public`, `portal_customer`, `internal`) kontrolü.
5. **Su Arıtma Projeleri (`projects`):** Kaynak su türü, su analizi doğrulaması, istenen kapasite, önerilen ekipmanlar, ilerleme aşaması ve yetkili personel teknik onay kilidi.
6. **Maliyetlendirme ve A4 PDF Teklif (`proposals`):** Çoklu kalem, birim maliyet, satış fiyatı, iskonto, nakliye, montaj, devreye alma, KDV, döviz kuru/tarihi kaydı, brüt kâr ve kâr marjı (%) hesabı, **müşteri maliyet gizlemeli A4 PDF yazdırma** ve tek tıkla Müşteri Portalı paylaşım linki üretimi.
7. **Sipariş, Stok ve Tedarikçi (`orders`):** Onaylanan tekliften sipariş oluşturma, ödeme/tahsilat takibi, depo stok kartları, değiştirilemez (*immutable*) stok hareket defteri (`runTransaction` ile *Giriş, Çıkış, Satış, Numune, İade, Sayım Düzeltmesi*) ve tedarikçi kayıtları.
8. **Servis, Bakım ve Saha Takibi (`service`):** Periyodik bakım, membran CIP yıkama, reçine/kuvars değişimi, kalibrasyon ve arıza kayıtları, saha ölçüm değerleri (giriş/çıkış iletkenlik, pH, basınç) ve sonraki bakım tarihi takibi.
9. **Sistem, SEO, Bildirim ve Rol Yönetimi (`settings`):** İletişim/kategori/SEO ayarları (satıcı vergi dairesi ve VKN dahil), bildirim günlükleri, değiştirilemez denetim günlüğü (`auditLogs`) ve 6 seviyeli RBAC rol ataması (`superadmin`, `sales`, `technical`, `warehouse`, `viewer`, `customer`).

### 4.1. Dashboard (Genel Bakış) geliştirmeleri

- **Tahsilat yaşlandırma:** Açık satış faturaları vadesi gelmemiş / 1–30 / 31–60 / 60+ gün / vadesiz dilimlerinde ve en riskli cariler listesiyle gösterilir. Proforma ve kapalı faturalar dahil edilmez (`src/utils/dashboard-insights.js`).
- **Önceki dönemle karşılaştırma:** 7/30/90/365 gün filtresinde talep, onaylı sipariş hacmi, satış faturası ve tahsilat son N gün ile önceki N gün karşılaştırılır; önceki dönemde kayıt yoksa oran uydurulmaz.
- **Rol bazlı görünüm:** Muhasebe yetkisi olmayan roller (ör. depo, teknik) nakit akışı, mutabakat, yaşlandırma, CSV ve A4 finans raporunu görmez; yetkisiz koleksiyonlar hiç sorgulanmaz.
- **Performans:** Admin yüklemesi role göre koleksiyon çeker, kayıt sonrası yalnızca ilgili koleksiyonları yeniler; ağır dashboard hesapları store dizileri değişmedikçe önbellekten gelir; canlı gelen kutusu güncellemeleri birleştirilir ve sekme gizliyken çizim ertelenir.
- **Veri tamlığı:** Koleksiyonlardan en yeni 1000 kayıt (denetim günlüğü ve stok hareketlerinde 250) alınır; sınır aşılırsa kenar çubuğunda uyarı görünür.
- Diğer bileşenler: CRM SLA sayacı, 30 günlük nakit akışı vade takvimi, sipariş → e-fatura mutabakat radarı, iş kolu ve 81 il dağılımı, global arama (`Ctrl+K`), CSV özeti ve A4 yönetici raporu (`src/utils/dashboard-analytics.js`).

### 4.2. Muhasebe, fatura ve mevzuat uyumu

- **Fatura kalemleri:** Miktar, birim fiyat, iskonto ve kalem başına KDV; karışık oranlar kalem bazında hesaplanır (`src/utils/invoice-calc.js`). Kalem girilmezse eski tek tutarlı fatura çalışır.
- **Mevzuat kuralları** (`src/utils/tax-rules.js`, son gözden geçirme 2026-10-19): KDV oranları %20/%10/%1/%0 (10.07.2023 öncesi %18/%8), %0 KDV için istisna kodu, tevkifat için 3 haneli tevkifat kodu ve oran-kod uyumu, 12.000 TL (2026) fatura düzenleme sınırı uyarısı, GİB biçiminde ardışık fatura numarası (`ELF2026000000001`), alış faturasında tedarikçi numarası zorunluluğu. Proforma vergi belgesi sayılmaz; ciro, KDV ve cariye girmez. Alışlardaki tevkifat sorumlu KDV olarak net KDV'ye eklenir.
  > Oran ve sınırlar yıllık değişebilir; uygulamadan önce GİB duyuruları ve mali müşavirle doğrulanmalıdır. XML çıktısı GİB şemasına/portalına karşı doğrulanmamıştır.
- **Siparişten fatura:** KDV dağılımı yalnızca siparişte doğrulanabiliyorsa (matrah + KDV = toplam, standart oran, TRY) tek tıkla faturalanır; aksi halde tutar tahmin edilmez, fatura formunda girilir (`src/utils/order-billing.js`).
- **GİB UBL-TR 2.1 XML:** Satıcı VKN ve vergi dairesi ayarlardan zorunludur, sahte değer üretilmez; tevkifat/istisna kodları ve oran bazında KDV alt toplamları yazılır.
- **Muhasebe programı API köprüsü** (`functions/`, [functions/README.md](functions/README.md)): Cloud Functions üzerinden sağlayıcıdan bağımsız iki yönlü senkron (fatura gönder, fatura/ödeme durumu/cari çek). API anahtarı yalnızca sunucuda (Secret Manager) tutulur; panelde **Muhasebe → 6. Muhasebe API Entegrasyonu** sekmesinden ayarlanır. Henüz bir muhasebe programına bağlı değildir.

---

## 5. Kurulum, Derleme ve Dağıtım (Build & Deploy)

```bash
# 1. Bağımlılıkları yükleyin
npm install

# 2. Geliştirme sunucusunu başlatın
npm run dev

# 3. Testleri çalıştırın (kök testler + functions/test)
npm test

# 4. Üretim paketini (dist/) derleyin
npm run build

# 5. Firestore güvenlik kurallarını ve indekslerini dağıtın (elifkimya veritabanı)
firebase deploy --only firestore --project advera-c8dd0

# 6. Firebase Hosting (elifkimya sitesi) dağıtımını yapın
firebase deploy --only hosting:elifkimya --project advera-c8dd0

# 7. (Muhasebe API entegrasyonu hazır olunca) Cloud Functions: önce `firebase functions:secrets:set ACCOUNTING_API_KEY`
firebase deploy --only functions --project advera-c8dd0
```

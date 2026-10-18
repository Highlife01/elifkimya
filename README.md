# Elif Kimya Premium B2B Platformu

Endüstriyel su arıtma kimyasalları, soğutma kuleleri, buhar kazanları, atık su arıtımı ve saf su (EDI) sistemlerinde Adana merkezli, Türkiye geneli ve ihracat odaklı B2B kurumsal web platformu ve yönetim merkezi.

GitHub Deposu: [https://github.com/Highlife01/elifkimya](https://github.com/Highlife01/elifkimya)

---

## 🚀 Hızlı Başlangıç

### Geliştirme Ortamı
```bash
npm install
npm run dev
```
Uygulama yerel olarak `http://localhost:5173` adresinde çalışacaktır.

### Üretim (Production) Derlemesi
```bash
npm run build
npm run preview
```
Derleme çıktısı `dist/` klasörüne optimize edilmiş static web bundle olarak üretilir.

---

## 🌐 Sayfa ve Rota Mimarisi

Uygulama hem hash tabanlı (`/#/rota`) hem de doğrudan istemci tarafı yönlendirmeyi destekler:

| Rota | Başlık | Açıklama |
| :--- | :--- | :--- |
| `/` | **Ana Sayfa** | Büyük hero alanı, 8K tesis görseli, metrikler, 6'lı çözüm şeridi, teknik güven ve hızlı teklif çağrısı. |
| `/urunler` | **Ürün Kataloğu** | 6 ana kategori, filtreleme, anlık ürün arama ve TDS/SDS teknik veri föyü talep modalı. |
| `/sistemler` | **Su Arıtma & EDI** | Reverse Osmosis (RO), Saf Su, EDI, Yumuşatma proses akış mimarisi şeması ve mühendislik detayları. |
| `/sektorler` | **Sektörel Çözümler** | Gıda, Tekstil, Kimya, Metal/Çelik ve Enerji tesislerine özel zorluklar, çözümler ve şartlandırma reçeteleri. |
| `/hizmet-bolgeleri` | **Bölgesel Lojistik** | Adana (AOSB), Mersin Limanı, İskenderun Demir-Çelik, Gaziantep, Kayseri ve Türkiye geneli 81 il lojistiği. |
| `/teknik-bilgi` | **Teknik Rehber & GEO** | Yapay zeka görünürlüğü (GEO) için 7 adet teknik soru-cevap akordiyonu ve mühendislik terimleri sözlüğü. |
| `/teklif-al` | **B2B Teklif Sihirbazı** | 4 adımlı endüstriyel RFQ formu (Ürün, Teknik Kapasite, Firma/Şehir, Özet & Firestore iletimi + WhatsApp yedeği). |
| `/iletisim` | **İletişim & Destek** | Adana merkez bilgileri, doğrudan telefon (0546 499 23 42), WhatsApp linki ve iletişim mesaj formu. |
| `/admin` | **Yönetim Merkezi** | Operasyon paneli (Teklifler, Mesajlar, Cariler, Muhasebe [Tahsilat Kimde matrisi dahil], Katalog, Loglar ve Firebase ayarları). |

---

## 📦 Ürün ve Hizmet Mimarisi (6 Kategori)

1. **01 — Soğutma Kulesi Kimyasalları:** Korozyon inhibitörleri, kireç ve kışır önleyiciler (antiskalantlar), biyositler ve dezenfektanlar (oksitleyici & non-oksitleyici, Lejyonella kontrolü), dispersantlar, pH düzenleyiciler.
2. **02 — Endüstriyel Su Arıtma Sistemleri:** Reverse Osmosis (RO), multimedya kum ve aktif karbon filtrasyonu, su yumuşatma sistemleri, ultrafiltrasyon (UF), deiyonizasyon sistemleri.
3. **03 — Saf Su ve Ultra Saf Su Sistemleri:** Laboratuvar saf su sistemleri, endüstriyel saf su üretimi, Tip I, II ve III saflık çözümleri (18.2 MΩ·cm), EDI (Elektro-deiyonizasyon) üniteleri, saf su sarf malzemeleri.
4. **04 — Kazan Suyu Kimyasalları:** Oksijen tutucular (DEHA vb.), korozyon ve tortu önleyiciler, kondens hattı koruma aminleri, kazan suyu şartlandırma kimyasalları.
5. **05 — Atık Su Arıtma Kimyasalları:** Koagülantlar (PAC, Demir III Klorür), anyonik ve katyonik polielektrolit polimerler, flokülantlar, tekstil renk ve ağır metal giderim ürünleri, filtre pres çamur susuzlaştırma kimyasalları.
6. **06 — Fabrika ve Proses Kimyasalları:** Ağır endüstriyel temizlik kimyasalları, membran temizleme kimyasalları (CIP), antifoam proses yardımcıları, yüzey temizleme ve fosfatlama ürünleri, fabrikaya özel fason kimyasal reçeteleri.

---

## 🔍 SEO ve Yapay Zeka Görünürlüğü (GEO) Stratejisi

- **Bölgesel Sanayi Aksı:** Adana (AOSB & Ceyhan), Mersin (Liman & Serbest Bölge), Osmaniye & Hatay (Haddehane & Demir-Çelik), Gaziantep & Kayseri OSB'leri için hedeflenmiş bölgesel anahtar kelimeler ve lojistik süreleri.
- **Yapay Zeka (GEO) Mühendislik SSS:**
  - Soğutma kulesinde hangi kimyasal kullanılır?
  - Korozyon inhibitörü nasıl seçilir?
  - Soğutma kulesinde biyosit neden gereklidir?
  - Fabrikalarda saf su sistemi nasıl seçilir?
  - Reverse Osmosis ile deiyonize su arasındaki fark nedir?
  - Kazan suyunda kireçlenme nasıl önlenir?
  - Endüstriyel su arıtma sistemi fiyatını hangi faktörler belirler?
- **Yapılandırılmış Veri:** `index.html` içinde Schema.org `ChemicalManufacturer`, `LocalBusiness` ve `Organization` JSON-LD tanımları mevcuttur.

---

## 🛡️ Gerçek Veri & Güvenlik İlkeleri

- **Sıfır Sahte Veri:** Bu paket `localStorage` kullanmaz. Veritabanı bağlı olmadığında dashboard üzerinde hayali KPI veya sahte grafikler göstermez; `data-state="empty"` durumlarıyla şeffaf bir biçimde gerçek bağlantıyı bekler.
- **Koleksiyonlar:**
  - `quoteRequests`: B2B teknik teklif talepleri, su analiz notları ve kapasite verileri.
  - `contactMessages`: İletişim formu mesajları ve danışmanlık talepleri.
  - `companies`: Müşteri ve cari firma kayıtları.
  - `products`: Ürün kataloğu ve TDS parametreleri.
  - `accountingEntries`: Cari hareketler, gelir-gider ve **Tahsilat Kimde (Kullanan)** matrisi.
  - `auditLogs`: Sistem denetim ve KVKK mutabakat logları.
- **Firebase Kurulumu:** Gerçek Firestore bağlantısı için `.env.example` dosyasını `.env` olarak kopyalayıp anahtarlarınızı giriniz. `firestore.rules` güvenlik kuralları hazır olarak sunulmuştur.

---

## 📞 Hızlı İletişim

- **Merkez:** Adana · Türkiye
- **Telefon:** 0546 499 23 42
- **WhatsApp:** [https://wa.me/905464992342](https://wa.me/905464992342)
- **E-posta:** iletisim@elifkimya.com / satis@elifkimya.com

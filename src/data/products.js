/**
 * Elif Kimya - Ürün ve Hizmet Mimarisi
 * 6 Temel Endüstriyel Kategori ve Teknik Detaylar
 */

export const productCategories = [
  {
    id: 'sogutma-kulesi-kimyasallari',
    code: '01',
    title: 'Soğutma Kulesi Kimyasalları',
    shortDesc: 'Açık ve kapalı soğutma sistemlerinde korozyon, kışır ve mikrobiyolojik üremeyi önleyen kimyasal şartlandırma programları.',
    tag: 'Sirkülasyon & Isı Transferi',
    badge: 'Yüksek Performans',
    icon: 'droplets',
    subcategories: [
      {
        name: 'Korozyon İnhibitörleri',
        slug: 'korozyon-inhibitorleri',
        desc: 'Çelik, bakır ve pirinç alaşımlarında film tabakası oluşturarak metal kaybını ve delinmeleri engelleyen organik/inorganik inhibitörler.',
        specs: ['pH Çalışma Aralığı: 6.8 - 8.5', 'Dozaj: 30 - 80 ppm', 'Ambalaj: 30 kg Bidon, 1000 kg IBC'],
        tdsReady: true
      },
      {
        name: 'Kireç ve Kışır Önleyiciler (Antiskalantlar)',
        slug: 'kirec-ve-kisir-onleyiciler',
        desc: 'Kalsiyum karbonat, kalsiyum sülfat ve silika çökmelerini kristal yapısını bozarak engelleyen polimerik formülasyonlar.',
        specs: ['Etken Madde: Polikarboksilat & Fosfonat', 'Termal Kararlılık: 95°C', 'Ambalaj: 25 kg Bidon, 1000 kg IBC'],
        tdsReady: true
      },
      {
        name: 'Biyositler ve Dezenfektanlar',
        slug: 'biyositler-ve-dezenfektanlar',
        desc: 'Legionella pneumophila, yosun, mantar ve biyofilm oluşumuna karşı oksitleyici (klor/brom bazlı) ve oksitleyici olmayan geniş spektrumlu biyositler.',
        specs: ['Biyofilm Penetrasyonu: Yüksek', 'Şok & Sürekli Dozaj Uyumlu', 'Biyolojik Parçalanabilirlik: Uygun'],
        tdsReady: true
      },
      {
        name: 'Dispersantlar & Çamur Dağıtıcılar',
        slug: 'dispersantlar',
        desc: 'Sistemde biriken silt, kil ve inorganik tortuları askıda tutarak blöf hattı üzerinden sistemden uzaklaştıran yüzey aktif maddeler.',
        specs: ['Yüksek Anyonik Yük', 'Askıda Katı Kontrolü', 'Ambalaj: 30 kg Bidon'],
        tdsReady: true
      },
      {
        name: 'pH Düzenleyiciler',
        slug: 'ph-duzenleyiciler',
        desc: 'Soğutma suyu Langelier (LSI) ve Ryznar doymuşluk indekslerini optimum aralıkta tutmak için asidik ve bazik dengeleyiciler.',
        specs: ['Hassas Dozaj Pompası Uyumu', 'Konsantre Formül', 'Güvenli Sevkiyat Sertifikalı'],
        tdsReady: true
      }
    ]
  },
  {
    id: 'endustriyel-su-aritma-sistemleri',
    code: '02',
    title: 'Endüstriyel Su Arıtma Sistemleri',
    shortDesc: 'Fabrikaların proses suyu ihtiyacına yönelik anahtar teslim mekanik, kimyasal ve membran filtrasyon mühendislik sistemleri.',
    tag: 'Mühendislik & Ekipman',
    badge: 'Anahtar Teslim',
    icon: 'cpu',
    subcategories: [
      {
        name: 'Reverse Osmosis (RO) Sistemleri',
        slug: 'reverse-osmosis',
        desc: 'Kuyu suyu, şebeke ve acı suları %99.5 tuz giderme verimiyle yüksek saflıkta proses suyuna dönüştüren endüstriyel ters ozmoz üniteleri.',
        specs: ['Kapasite: 1 - 100 m³/saat', 'PLC & Dokunmatik Ekran Kontrol', 'CIP Yıkama Entegre'],
        tdsReady: true
      },
      {
        name: 'Kum ve Aktif Karbon Filtrasyonu',
        slug: 'kum-ve-aktif-karbon-filtrasyonu',
        desc: 'Askıda katı maddeleri, bulanıklığı, kloru ve organik kokuyu gidererek membran ve yumuşatma sistemlerini koruyan çok katmanlı filtreler.',
        specs: ['FRP veya Epoksi Kaplı Karbon Çelik Gövde', 'Otomatik Ters Yıkama Valfleri'],
        tdsReady: true
      },
      {
        name: 'Su Yumuşatma Sistemleri',
        slug: 'su-yumusatma-sistemleri',
        desc: 'Kalsiyum ve magnezyum iyonlarını sodyum ile yer değiştirerek sıfır sertlikte kazan ve proses suyu sağlayan tandem (kesintisiz) sistemler.',
        specs: ['Gıda Tipi Katyonik Reçine', 'Zaman veya Debi Kontrollü Otomasyon', 'Tuz Tankı Dahil'],
        tdsReady: true
      },
      {
        name: 'Ultrafiltrasyon (UF)',
        slug: 'ultrafiltrasyon',
        desc: '0.02 mikron gözenek çapıyla bakteri, virüs ve askıda katı maddeleri kimyasalsız ayıran ileri ön arıtma teknolojisi.',
        specs: ['SDI < 2.5 Çıkış Değeri', 'Yüksek Akı Kararlılığı', 'Modüler Dizayn'],
        tdsReady: true
      },
      {
        name: 'Deiyonizasyon Sistemleri',
        slug: 'deiyonizasyon-sistemleri',
        desc: 'Katyonik ve anyonik reçine kolonları üzerinden iletkenliği < 1 µS/cm seviyesine düşüren klasik kimyasal rejenerasyonlu sistemler.',
        specs: ['Asit/Kostik Rejenerasyon İstasyonu', 'Dijital İletkenlik Monitörü'],
        tdsReady: true
      }
    ]
  },
  {
    id: 'saf-su-ve-ultra-saf-su-sistemleri',
    code: '03',
    title: 'Saf Su ve Ultra Saf Su Sistemleri',
    shortDesc: 'Laboratuvarlar, enerji santralleri ve kritik endüstriyel üretim hatları için 18.2 MΩ·cm direnç seviyesinde saf su teknolojileri.',
    tag: 'Laboratuvar & Yüksek Saflık',
    badge: 'Medipure & Analitik Standart',
    icon: 'activity',
    subcategories: [
      {
        name: 'Laboratuvar Saf Su Sistemleri',
        slug: 'laboratuvar-saf-su-sistemleri',
        desc: 'HPLC, GC-MS, ICP-MS ve hücre kültürü çalışmaları için Tip I, Tip II ve Tip III saflık standartlarını sağlayan kompakt tezgah üstü cihazlar.',
        specs: ['Direnç: 18.2 MΩ·cm @ 25°C', 'TOC < 2 ppb', 'Endotoksin: < 0.001 EU/ml'],
        tdsReady: true
      },
      {
        name: 'Endüstriyel Saf Su Üretimi',
        slug: 'endustriyel-saf-su-uretimi',
        desc: 'Elektronik, solar panel, cam yıkama ve akü üretimi için saatte onlarca ton yüksek saflıkta su üreten merkezi tesisler.',
        specs: ['Sürekli Online Kalite Takibi', 'Paslanmaz Çelik 316L Borulama Opsiyonu'],
        tdsReady: true
      },
      {
        name: 'Tip I, II ve III Saf Su Çözümleri',
        slug: 'tip-1-2-3-saf-su',
        desc: 'ASTM D1193, ISO 3696 ve CLSI standartlarına uygun kademelendirilmiş saflık modülleri ve dağıtım döngüleri.',
        specs: ['Tip I (Ultra Saf), Tip II (Analitik), Tip III (Genel Laboratuvar/Otoklav)'],
        tdsReady: true
      },
      {
        name: 'EDI (Elektro-deiyonizasyon) Sistemleri',
        slug: 'edi-sistemleri',
        desc: 'Kimyasal rejenerasyona ihtiyaç duymadan, elektrik akımı ve iyon seçici membranlarla sürekli saf su üreten çevre dostu teknoloji.',
        specs: ['İletkenlik: < 0.1 µS/cm', 'Sıfır Asit/Kostik Atığı', 'Kesintisiz Çalışma'],
        tdsReady: true
      },
      {
        name: 'Saf Su Cihazları ve Sarf Malzemeleri',
        slug: 'saf-su-sarf-malzemeleri',
        desc: 'Nükleer kalite karışık yatak (mixed-bed) reçineleri, UV lambalar (185/254 nm), ultrafiltrasyon filtreleri ve kalibrasyon solüsyonları.',
        specs: ['Orijinal Yedek Parça', 'Hızlı Kargo & Teknik Değişim Desteği'],
        tdsReady: true
      }
    ]
  },
  {
    id: 'kazan-suyu-kimyasallari',
    code: '04',
    title: 'Kazan Suyu Kimyasalları',
    shortDesc: 'Buhar kazanları, kızgın su hatları ve kondens dönüş hatlarında korozyon, kışır ve oksijen hasarını önleyen şartlandırma kimyasalları.',
    tag: 'Buhar & Termik Güvenlik',
    badge: 'Enerji Tasarrufu',
    icon: 'flame',
    subcategories: [
      {
        name: 'Oksijen Tutucular',
        slug: 'oksijen-tutucular',
        desc: 'Kazan besi suyundaki çözünmüş oksijeni bağlayarak çukurlaşma (pitting) korozyonunu önleyen DEHA, karbonhidrazid ve katalizli sülfit çözümleri.',
        specs: ['Yüksek Sıcaklık Reaksiyon Hızı', 'Uçucu veya Uçucu Olmayan Formüller', 'Gıda Uygunluk Seçenekleri'],
        tdsReady: true
      },
      {
        name: 'Korozyon ve Tortu Önleyiciler',
        slug: 'korozyon-ve-tortu-onleyiciler',
        desc: 'Kazan boruları üzerinde ısı transferini engelleyen kireç tabakasını önleyen polimerik ve fosfat bazlı all-in-one şartlandırıcılar.',
        specs: ['Isı İletim Verimi Artışı: %5-12 Yakıt Tasarrufu', 'Blöf Sıklığını Optimize Eder'],
        tdsReady: true
      },
      {
        name: 'Kondens Hattı Koruma Kimyasalları',
        slug: 'kondens-hatti-koruma',
        desc: 'Kondens hatlarındaki karbonik asit korozyonunu engelleyen nötralize edici ve film yapıcı uçucu amin karışımları.',
        specs: ['Buharla Birlikte Taşınır', 'Kondens Dönüş Suyunun Demir Oranını Düşürür'],
        tdsReady: true
      },
      {
        name: 'Kazan Suyu Şartlandırma Ürünleri',
        slug: 'kazan-sartlandirma-urunleri',
        desc: 'Alkalinite düzenleyiciler, çamur şartlandırıcılar ve ani köpüklenmeyi önleyen antifoam katkıları.',
        specs: ['Düşük ve Yüksek Basınçlı Kazan Uyumlu', 'TS EN 12952 / 12953 Standartlarına Uygun'],
        tdsReady: true
      }
    ]
  },
  {
    id: 'atik-su-aritma-kimyasallari',
    code: '05',
    title: 'Atık Su Arıtma Kimyasalları',
    shortDesc: 'Endüstriyel deşarj limitlerine uyum, KOİ/BOİ düşürme, renk giderme ve çamur susuzlaştırma için optimize edilmiş koagülant ve polimerler.',
    tag: 'Çevre & Deşarj Standartları',
    badge: 'Deşarj Uyumluluğu',
    icon: 'refresh-cw',
    subcategories: [
      {
        name: 'Koagülantlar (İnorganik & Organik)',
        slug: 'koagulantlar',
        desc: 'Poli Alüminyum Klorür (PAC), Demir III Klorür, Alüminyum Sülfat ve organik koagülantlarla hızlı flok oluşumu ve askıda katı çöktürme.',
        specs: ['Geniş pH Aralığında Yüksek Verim', 'Hızlı Çökme Hızı', 'Düşük Çamur Hacmi'],
        tdsReady: true
      },
      {
        name: 'Anyonik ve Katyonik Polimerler',
        slug: 'anyonik-ve-katyonik-polimerler',
        desc: 'Yüksek molekül ağırlıklı toz ve emülsiyon tipi polielektrolitler; flokülasyonu hızlandırır ve filtre pres verimini maksimize eder.',
        specs: ['Katyonik & Anyonik Çeşitler', 'Ultra Yüksek Zincir Uzunluğu', 'Düşük Tüketim Oranı'],
        tdsReady: true
      },
      {
        name: 'Flokülantlar & Çöktürücüler',
        slug: 'flokulantlar',
        desc: 'Biyolojik ve kimyasal arıtma çıkışlarında askıda katı maddelerin lamelli çökelticilerde hızlı çökmesini sağlayan özel formüller.',
        specs: ['Berrak Deşarj Suyu Eldesi', 'KOİ ve AKM İndirgeme'],
        tdsReady: true
      },
      {
        name: 'Renk ve Ağır Metal Giderim Ürünleri',
        slug: 'renk-ve-agir-metal-giderimi',
        desc: 'Tekstil boyahane atık sularında inatçı azo boyaları ve kaplama banyolarındaki ağır metalleri (Cr, Ni, Zn, Cu) bağlayıp çöktüren polimerik bağlayıcılar.',
        specs: ['%98+ Renk Giderme Verimi', 'Kompleks Ağır Metalleri Bağlama'],
        tdsReady: true
      },
      {
        name: 'Çamur Susuzlaştırma Kimyasalları',
        slug: 'camur-susuzlastirma',
        desc: 'Filtre pres, belt pres ve santrifüj dekanterlerde çamur kek kuruluğunu (% kuru madde oranını) artıran kondisyoner kimyasallar.',
        specs: ['Kek Kuruluğu Artışı', 'Daha Düşük Bertaraf Maliyeti'],
        tdsReady: true
      }
    ]
  },
  {
    id: 'fabrika-ve-proses-kimyasallari',
    code: '06',
    title: 'Fabrika ve Proses Kimyasalları',
    shortDesc: 'Üretim hatlarının hijyeni, membran temizliği (CIP), yüzey hazırlama ve tesise özel formüle edilen teknik kimyasal tedariki.',
    tag: 'Proses & Üretim Hijyeni',
    badge: 'Tesis Spesifik',
    icon: 'shield-check',
    subcategories: [
      {
        name: 'Endüstriyel Temizlik Kimyasalları',
        slug: 'endustriyel-temizlik-kimyasallari',
        desc: 'Ağır sanayi, makine ve zeminler için solvent bazlı veya su bazlı ağır yağ sökücüler, alkali ve asidik endüstriyel yıkayıcılar.',
        specs: ['Yüksek Yağ Çözme Gücü', 'Metal Yüzeylere Zarar Vermeyen Korozyon İnhibitörlü Yapı'],
        tdsReady: true
      },
      {
        name: 'Membran Temizleme Kimyasalları (CIP)',
        slug: 'membran-temizleme-kimyasallari-cip',
        desc: 'Ters ozmoz (RO) ve UF membranlarında oluşan inorganik kireç, demir ve organik biyofilm tabakalarını membran ömrünü koruyarak söken asidik ve alkali CIP ürünleri.',
        specs: ['pH 2 (Asidik) ve pH 11 (Alkali) Formülasyonlar', 'Membran Akısını İlk Günkü Seviyeye Yaklaştırır'],
        tdsReady: true
      },
      {
        name: 'Proses Yardımcı Kimyasalları',
        slug: 'proses-yardimci-kimyasallari',
        desc: 'Gıda, tekstil ve boya sanayinde köpük kontrolü sağlayan silikonlu/silikonsuz antifoam ürünleri, ıslatıcılar ve emülgatörler.',
        specs: ['Hızlı Köpük Söndürme', 'Uzun Süreli Kalıcılık', 'Gıda Derecesi Seçenekleri'],
        tdsReady: true
      },
      {
        name: 'Yüzey Temizleme ve Bakım Ürünleri',
        slug: 'yuzey-temizleme-ve-bakim',
        desc: 'Pas sökücüler, tufal çözücüler, kaynak sonrası pasivasyon kimyasalları ve elektrostatik toz boya öncesi fosfatlama banyoları.',
        specs: ['Demir Fosfat & Çinko Fosfat Banyoları', 'Pasivasyon Koruyucular'],
        tdsReady: true
      },
      {
        name: 'Fabrikaya Özel Kimyasal Tedariki',
        slug: 'fabrikaya-ozel-kimyasal-tedariki',
        desc: 'Fabrikanızın sahadaki su analizine ve proses ihtiyaçlarına göre laboratuvarımızda AR-GE edilip üretilen özel kimyasal reçeteleri.',
        specs: ['Teknik Analiz Raporlu', 'Fason veya Sözleşmeli Düzenli Tedarik'],
        tdsReady: true
      }
    ]
  }
];

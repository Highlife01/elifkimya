/**
 * Elif Kimya - Ürün ve Hizmet Mimarisi
 * 6 Temel Endüstriyel Kategori, Spesifik Fabrika Kimyasalları & Etken Maddeler
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
    image: '/assets/cat-cooling.jpg',
    subcategories: [
      {
        name: 'Korozyon İnhibitörleri (Organik & İnorganik)',
        slug: 'korozyon-inhibitorleri',
        activeChemical: 'HEDP, Toliltriazol (TTA), Benzotriazol (BTA), Çinko Fosfonat',
        desc: 'Karbon çelik, bakır, pirinç ve paslanmaz alaşımlarda moleküler pasif film tabakası oluşturarak metal kaybını ve delinmeleri engelleyen korozyon inhibitörleri.',
        specs: [
          'pH Çalışma Aralığı: 6.8 - 9.0',
          'Etken Madde: Organik Fosfonat & Azol Karışımı',
          'Dozaj: 30 - 80 ppm sürekli kontrol',
          'Ambalaj: 30 kg Bidon, 1000 kg IBC, Dökme Tanker'
        ],
        tdsReady: true
      },
      {
        name: 'Kireç ve Kışır Önleyiciler (Antiskalantlar)',
        slug: 'kirec-ve-kisir-onleyiciler',
        activeChemical: 'PBTC (2-Fosfonobütan-1,2,4-trikarboksilik asit), Polikarboksilat, AA/AMPS',
        desc: 'Kalsiyum karbonat, kalsiyum sülfat ve yüksek silika çökmelerini kristal distorsiyonu mekanizmasıyla engelleyen yüksek termal stabiliteye sahip antiskalantlar.',
        specs: [
          'Termal Kararlılık: 110°C reaktör ceket uyumlu',
          'Silika Toleransı: 250 ppm seviyesine kadar',
          'Konsantrasyon Döngüsü (COC): 4 - 7 kat artış',
          'Ambalaj: 30 kg Bidon, 1000 kg IBC'
        ],
        tdsReady: true
      },
      {
        name: 'Biyositler ve Mikrobiyolojik Kontrol',
        slug: 'biyositler-ve-dezenfektanlar',
        activeChemical: 'DBNPA (%20), İzotiyazolin (CMIT/MIT %1.5-3), Glutaraldehit, Stabilize Brom',
        desc: 'Legionella pneumophila, yosun, mantar, anaerobik kükürt bakterileri ve biyofilm oluşumuna karşı hızlı penetrasyon sağlayan oksitleyici ve oksitleyici olmayan biyositler.',
        specs: [
          'DBNPA Hızlı Şok Dozajı: 30-50 ppm (2-4 saatte %99.9 eliminasyon)',
          'CMIT/MIT Sürekli Koruma: 15-25 ppm',
          'Biyofilm Dağıtıcı Yüzey Aktifler Entegre',
          'Biyolojik Parçalanabilirlik: Tam uyumlu'
        ],
        tdsReady: true
      },
      {
        name: 'Dispersantlar & Biyolojik Çamur Dağıtıcılar',
        slug: 'dispersantlar',
        activeChemical: 'Yüksek Anyonik Poliakrilat, Non-iyonik Yüzey Aktifler',
        desc: 'Sistemde biriken silt, kil, demir oksit ve ölü biyokütleyi askıda tutarak blöf hattı üzerinden sistemden uzaklaştıran çamur dağıtıcılar.',
        specs: [
          'Askıda Katı Kontrolü: 1000+ ppm tolerans',
          'Depozit Dağıtma Verimi: %95+',
          'Ambalaj: 30 kg Bidon, 1000 kg IBC'
        ],
        tdsReady: true
      },
      {
        name: 'pH Düzenleyiciler & Alkalinite Dengeleyiciler',
        slug: 'ph-duzenleyiciler',
        activeChemical: 'Teknik Dereceli Sülfürik Asit (%98), Sodyum Hidroksit (%48)',
        desc: 'Soğutma suyu Langelier (LSI) ve Ryznar doymuşluk indekslerini korozyonsuz ve kışırsız nötr aralıkta tutmak için asidik ve bazik dengeleyiciler.',
        specs: [
          'Otomatik Dozaj Pompaları ve pH Probları Uyumlu',
          'Konsantre Formül, Düşük Tüketim',
          'ADR Sertifikalı Güvenli Sevkiyat'
        ],
        tdsReady: true
      },
      {
        name: 'Kapalı Devre Korozyon İnhibitörleri',
        slug: 'kapali-devre-korozyon-inhibitorleri',
        activeChemical: 'Nitritsiz molibdat, TTA/BTA azol, organik film yapıcı',
        desc: 'Chiller, kalıp soğutma ve kapalı ısıtma devrelerinde karbon çelik, bakır ve alüminyumun aynı hatta çalıştığı sistemler için korozyon programı.',
        specs: [
          'Açık kule programından ayrı, düşük blöflü kapalı devre formülü',
          'Nitritli ve nitritsiz seçenek; metalürjiye göre seçilir',
          'Ambalaj: 30 kg bidon, 1000 kg IBC'
        ],
        tdsReady: true
      },
      {
        name: 'Kazan, Eşanjör ve Hat Temizleyiciler',
        slug: 'sistem-temizleme-kimyasallari',
        activeChemical: 'İnhibitörlü asidik temizleyici, alkali organik çözücü',
        desc: 'Kireç, demir oksit ve organik birikimi duruşta veya kontrollü çevrimde çözen temizleyiciler. Süre ve derişim, kışır tipine ve metal cinsine göre sahada belirlenir.',
        specs: [
          'Karbonat ve demir oksit birikimi',
          'Temizlik sonrası nötralizasyon ve pasivasyon adımı',
          'Ambalaj: 30 kg bidon, 1000 kg IBC'
        ],
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
    image: '/assets/cat-boiler.jpg',
    subcategories: [
      {
        name: 'Oksijen Tutucular (Uçucu & İnorganik)',
        slug: 'oksijen-tutucular',
        activeChemical: 'DEHA (Dietilhidroksilamin), Karbonhidrazid, Katalizli Sodyum Sülfit',
        desc: 'Kazan besi suyundaki çözünmüş oksijeni bağlayarak çukurlaşma (pitting) korozyonunu önleyen, magnetit koruyucu tabaka oluşturan oksijen tutucular.',
        specs: [
          'Tepkime Süresi: Anlık oksijen eliminasyonu (< 5 ppb kalıntı)',
          'DEHA: Katı madde bırakmaz, buharla taşınarak kondensi korur',
          'FDA / USDA Gıda Uygunluk Seçenekleri'
        ],
        tdsReady: true
      },
      {
        name: 'Korozyon ve Kışır Önleyiciler (All-in-One)',
        slug: 'korozyon-ve-tortu-onleyiciler',
        activeChemical: 'Polikarboksilat, Organik Fosfonat, Sodyum Polifosfat',
        desc: 'Kazan boruları üzerinde ısı transferini engelleyen kireç tabakasını önleyen, 1 mm kışırın yarattığı %8-12 yakıt kaybını ortadan kaldıran şartlandırıcılar.',
        specs: [
          'Basınç Aralığı: 1 - 65 bar buhar kazanları',
          'Blöf Sıklığını %30-40 Azaltarak Enerji ve Su Tasarrufu',
          'TS EN 12952 / 12953 Standartlarına Tam Uyum'
        ],
        tdsReady: true
      },
      {
        name: 'Kondens Hattı Koruma Kimyasalları',
        slug: 'kondens-hatti-koruma',
        activeChemical: 'Nötralize Edici Uçucu Aminler (Morfolin, Sikloheksilamin), Film Yapıcı Oktadesilamin',
        desc: 'Kondens hatlarındaki karbonik asit korozyonunu engelleyen, dönüş suyunun demir oranını düşürerek kazana çamur taşınmasını önleyen amin karışımları.',
        specs: [
          'Buharla Birlikte Taşınır, Tüm Kondens Şebekesini Korur',
          'Kondens pH Seviyesi: 8.5 - 9.2 aralığında sabit tutulur',
          'Boru Delinmelerini ve Hat Yenileme Maliyetlerini Sıfırlar'
        ],
        tdsReady: true
      },
      {
        name: 'Kazan Suyu Köpük Önleyiciler & Çamur Şartlandırıcılar',
        slug: 'kazan-sartlandirma-urunleri',
        activeChemical: 'Polieter Bazlı Antifoam, Sentetik Polimerik Çamur Dispersantı',
        desc: 'Kazan suyunun aniden köpürüp buhar hattına su taşımasını (priming/carryover) engelleyen ve çamuru akışkan tutarak blöfle atılmasını sağlayan formüller.',
        specs: [
          'Buhar Saflığını Korur, Türbin ve Vana Aşınmasını Önler',
          'Gıda Kodeksine Uygun Konsantre Formül'
        ],
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
    image: '/assets/cat-coagulants.jpg',
    subcategories: [
      {
        name: 'Koagülantlar (İnorganik & Organik)',
        slug: 'koagulantlar',
        activeChemical: 'Poli Alüminyum Klorür (PAC %30), Demir III Klorür (%40), Alüminyum Sülfat',
        desc: 'Atık sudaki askıda katı maddeleri (AKM) ve kolloidleri nötralize ederek hızlı mikro-flok oluşumu sağlayan yüksek konsantrasyonlu koagülantlar.',
        specs: [
          'PAC: Geniş pH toleransı (5.5 - 9.0), düşük çamur üretimi',
          'Demir III Klorür: Fosfat ve H2S koku gideriminde maksimum verim',
          'Ambalaj: 30 kg Bidon, 1000 kg IBC, 25 Ton Dökme Tanker'
        ],
        tdsReady: true
      },
      {
        name: 'Anyonik Polielektrolitler (A-PAM)',
        slug: 'anyonik-polimerler',
        activeChemical: 'Anyonik Poliakrilamid (MW: 16 - 24 Milyon Dalton, İntrinsik Viskozite > 16 dl/g)',
        desc: 'Maden, demir-çelik haddehane tufal çukurları, kum yıkama ve kimyasal arıtma lamelli çökelticilerinde anında dev flok oluşturan toz ve emülsiyon polimerler.',
        specs: [
          'Molekül Ağırlığı: Ultra yüksek 24M Dalton',
          'Çökme Hızı: < 30 saniye içinde berrak faz ayrımı',
          'Tüketim: 0.8 - 2.5 ppm ultra düşük dozaj'
        ],
        tdsReady: true
      },
      {
        name: 'Katyonik Polielektrolitler (C-PAM)',
        slug: 'katyonik-polimerler',
        activeChemical: 'Katyonik Poliakrilamid (Yük Yoğunluğu: %20 - %80, Toz ve Emülsiyon)',
        desc: 'Filtre pres, belt pres ve dekantör santrifüjlerde biyolojik ve kimyasal çamurların susuzlaştırılmasını sağlayan yüksek katyonik yüklü polimerler.',
        specs: [
          'Kek Kuruluğu Artışı: %25 - 38 kuru madde oranı',
          'Çamur Bertaraf Maliyetinde %40 Tasarruf',
          'Berrak Süzüntü (Filtrat) Kalitesi'
        ],
        tdsReady: true
      },
      {
        name: 'Renk Giderici Polimerler & Ağır Metal Çöktürücüler',
        slug: 'renk-ve-agir-metal-giderimi',
        activeChemical: 'Dicyandiamide-Formaldehit Reçinesi, Sodyum Dimetilditiyokarbamat (DTC)',
        desc: 'Tekstil boyahane atık sularında reaktif ve dispers azo boyalarını parçalayan; kaplama sularındaki serbest ve kompleks ağır metalleri (Cr, Ni, Zn, Cu) bağlayıp çöktüren ürünler.',
        specs: [
          'Renk Giderme Verimi: %98+ (Pt-Co standartlarında berraklık)',
          'Ağır Metal Sınırı: < 0.1 mg/L deşarj garantisi',
          'Şelatlı Metallere Karşı Üstün Bağlama Kapasitesi'
        ],
        tdsReady: true
      },
      {
        name: 'Koku Gidericiler & Biyolojik Arıtma Besinleri',
        slug: 'koku-ve-besin-kimyasallari',
        activeChemical: 'Kalsiyum Nitrat Çözeltisi, Üre, Diamonyum Fosfat (DAP), Enzimler',
        desc: 'Atık su terfi merkezleri ve çamur havuzlarında H2S koku kontrolü sağlayan nitrat bazlı ürünler ile biyolojik arıtmada KOİ/N/P dengesini kuran besin çözeltileri.',
        specs: [
          'H2S Gazını Kaynağında Yok Eder, Korozyonu Önler',
          'Bakteri Popülasyonunu Canlandırır, Çamur İndeksini Düşürür'
        ],
        tdsReady: true
      },
      {
        name: 'Emülsiyon Kırıcılar',
        slug: 'emulsiyon-kiricilar',
        activeChemical: 'Katyonik demülsifiyer ve poliDADMAC karışımı',
        desc: 'Hadde yağı, kesme sıvısı ve petrol türevi kaçakların atık suda kararlı emülsiyon kurmasını bozup yağ fazını ayıran emülsiyon kırıcılar.',
        specs: [
          'Yağ-su emülsiyonunun jar-test ile seçimi',
          'Çökeltme veya flotasyon öncesi dozaj',
          'Ambalaj: 30 kg bidon, 1000 kg IBC'
        ],
        tdsReady: true
      },
      {
        name: 'Atıksu Köpük Kesiciler',
        slug: 'atiksu-kopuk-kesiciler',
        activeChemical: 'Yağ alkolü ve silikonsuz emülsiyon antifoam',
        desc: 'Havalandırma havuzu, DAF ve kimyasal arıtma girişinde taşan köpüğü kesen, çamur süspansiyonunu bozmayan köpük kesiciler.',
        specs: [
          'Havalandırma ve DAF köpüğü',
          'Silikonlu ve silikonsuz seçenek, prosese göre',
          'Ambalaj: 30 kg bidon, 1000 kg IBC'
        ],
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
    image: '/assets/cat-water-systems.jpg',
    subcategories: [
      {
        name: 'Reverse Osmosis (RO) Sistemleri',
        slug: 'reverse-osmosis',
        activeChemical: 'TFC Poliamid Membran, PLC Otomasyon, CIP Ünitesi',
        desc: 'Kuyu suyu, şebeke ve acı suları %99.5 tuz giderme verimiyle yüksek saflıkta proses suyuna dönüştüren endüstriyel ters ozmoz üniteleri.',
        specs: [
          'Kapasite: 1 - 250 m³/saat modüler dizayn',
          'Enerji Geri Kazanım Cihazları (ERD) Entegre',
          'Otomatik CIP Kimyasal Yıkama İstasyonu',
          'PLC Dokunmatik Ekran & SCADA Bağlantısı'
        ],
        tdsReady: true
      },
      {
        name: 'Kum ve Aktif Karbon Filtrasyonu',
        slug: 'kum-ve-aktif-karbon-filtrasyonu',
        activeChemical: 'Kuvars Kumu, Antrasit, Yüksek İyotlu Hindistan Cevizi Aktif Karbon',
        desc: 'Askıda katı maddeleri, bulanıklığı, serbest kloru ve organik kokuyu gidererek RO membranlarını ve yumuşatma reçinelerini koruyan çok katmanlı filtreler.',
        specs: [
          'FRP veya Epoksi Kaplı Paslanmaz Karbon Çelik Gövde',
          'Otomatik Pnömatik/Elektrik Aktüatörlü Valfler',
          'SDI < 3.0 Çıkış Güvencesi'
        ],
        tdsReady: true
      },
      {
        name: 'Endüstriyel Su Yumuşatma Sistemleri',
        slug: 'su-yumusatma-sistemleri',
        activeChemical: 'Gıda Derecesi Kuvvetli Asidik Katyonik Jel Reçine',
        desc: 'Kalsiyum ve magnezyum iyonlarını sodyum ile yer değiştirerek sıfır sertlikte (0°dH) kazan besi ve proses suyu sağlayan tandem (kesintisiz) sistemler.',
        specs: [
          'Kesintisiz Tandem (Dubleks) Çalışma Prensibi',
          'Debi veya Sertlik Sensör Kontrollü Otomatik Rejenerasyon',
          'PE Çözelti Tuz Tankı ve Emiş Düzeneği Dahil'
        ],
        tdsReady: true
      },
      {
        name: 'Ultrafiltrasyon (UF) Sistemleri',
        slug: 'ultrafiltrasyon',
        activeChemical: 'PVDF İçi Boş Elyaf (Hollow Fiber) Membran (0.02 µm)',
        desc: 'Askıda katı maddeleri, kolloidal silikayı, bakteri ve virüsleri kimyasalsız ayıran ileri ön arıtma teknolojisi.',
        specs: [
          'SDI < 2.0 Çıkış Değeri (RO Membran Ömrünü 2 Kat Artırır)',
          'Ters Yıkama ve CEB (Kimyasal Destekli Yıkama) Otomasyonu',
          'Kompakt Paslanmaz Çelik Şase'
        ],
        tdsReady: true
      },
      {
        name: 'Deiyonizasyon (Demineralizasyon) Kolonları',
        slug: 'deiyonizasyon-sistemleri',
        activeChemical: 'Kuvvetli Asidik Katyonik & Kuvvetli Bazik Anyonik Reçine',
        desc: 'Katyonik ve anyonik reçine kolonları üzerinden iletkenliği < 1 µS/cm seviyesine düşüren klasik asit/kostik rejenerasyonlu sistemler.',
        specs: [
          'Asit (HCl) ve Kostik (NaOH) Dozaj İstasyonu Entegre',
          'Dijital İletkenlik Monitörü & Otomatik Yıkama Valfi',
          'Dayanıklı Lastik/Kauçuk Kaplı Çelik Kolonlar'
        ],
        tdsReady: true
      }
    ]
  },
  {
    id: 'saf-su-ve-ultra-saf-su-sistemleri',
    code: '03',
    title: 'Saf Su ve Ultra Saf Su Sistemleri (Medipure)',
    shortDesc: 'Laboratuvar, medikal ve endüstriyel hatlar için Medipure saf su cihaz kataloğu ve yüksek saflıkta EDI su sistemleri. Model listesi Su Arıtma sayfasındadır.',
    tag: 'Medipure & Yüksek Saflık',
    badge: 'Medipure & Analitik Standart',
    icon: 'activity',
    image: '/assets/hero-medipure-edi.jpg',
    subcategories: [
      {
        name: 'Laboratuvar Saf Su Sistemleri (Tip I, II, III)',
        slug: 'laboratuvar-saf-su-sistemleri',
        activeChemical: '185/254 nm Çift Dalga Boylu UV, 0.05 µm Ultrafiltre, Nükleer Reçine',
        desc: 'HPLC, GC-MS, ICP-MS ve hücre kültürü çalışmaları için Tip I (Ultra Saf), Tip II (Analitik) ve Tip III saflık standartlarını sağlayan tezgah üstü cihazlar.',
        specs: [
          'Direnç: 18.2 MΩ·cm @ 25°C',
          'TOC (Toplam Organik Karbon): < 2 ppb',
          'Endotoksin: < 0.001 EU/ml, Bakteri: < 0.01 CFU/ml'
        ],
        tdsReady: true
      },
      {
        name: 'Endüstriyel EDI (Elektro-deiyonizasyon) Sistemleri',
        slug: 'edi-sistemleri',
        activeChemical: 'İyon Değiştirici Membran Paketleri, DC Elektrik Alanı',
        desc: 'Kimyasal rejenerasyona ihtiyaç duymadan, elektrik akımıyla sürekli saf su üreten, sıfır asit/kostik atıklı çevre dostu teknoloji.',
        specs: [
          'Çıkış İletkenliği: < 0.06 - 0.1 µS/cm',
          'Silika Giderimi: > %99.5',
          'Rejenerasyon Kimyasalı Sıfır — Kesintisiz 7/24 Üretim'
        ],
        tdsReady: true
      },
      {
        name: 'Endüstriyel Saf Su Üretim Tesisleri',
        slug: 'endustriyel-saf-su-uretimi',
        activeChemical: 'Çift Geçişli RO (Double Pass) + EDI + Degazör',
        desc: 'Cam yıkama, solar panel, akü ve kimyasal sentez tesisleri için saatte onlarca ton yüksek saflıkta su üreten merkezi tesisler.',
        specs: [
          'Kapasite: 5 - 100 m³/saat',
          'Hijyenik 316L Paslanmaz Çelik Borulama & Orbital Kaynak',
          'Sürekli Online TOC ve İletkenlik Doğrulaması'
        ],
        tdsReady: true
      },
      {
        name: 'Saf Su Cihazları ve Sarf Malzemeleri',
        slug: 'saf-su-sarf-malzemeleri',
        activeChemical: 'Nükleer Sınıf Mixed-Bed Reçine, DOW/DuPont Membranlar',
        desc: 'Karışık yatak reçineleri, UV lambalar, 0.2 mikron steril kapsül filtreler ve NIST izlenebilir kalibrasyon solüsyonları.',
        specs: [
          'Orijinal Yedek Parça Garantisi',
          'Hızlı Kargo & Yerinde Teknik Servis Desteği'
        ],
        tdsReady: true
      }
    ]
  },
  {
    id: 'laboratuvar-kimyasallari-ve-horiba-cozeltileri',
    code: '08',
    title: 'Laboratuvar Kimyasalları & HORIBA Standart Çözeltileri',
    shortDesc: 'HORIBA su kalitesi ölçüm cihazları için NIST izlenebilir pH tampon, iletkenlik (EC), iyon (ISE), ORP ve elektrot bakım çözeltileri ile analitik laboratuvar kimyasalları.',
    tag: 'HORIBA & Analitik Laboratuvar',
    badge: 'NIST İzlenebilir Standart',
    icon: 'activity',
    image: '/assets/hero-horiba-lab.jpg',
    packaging: '14 mL Tekli Paket / 50–250–500 mL Orijinal HORIBA Şişe / Kit',
    subcategories: [
      {
        name: 'HORIBA pH Standart Tampon Çözeltileri (USA & NIST Serisi)',
        slug: 'horiba-ph-tampon-cozeltileri',
        activeChemical: 'NIST İzlenebilir pH 1.68 / 4.01 / 6.86 / 7.00 / 9.18 / 10.01 / 12.46 Standart Çözeltiler',
        desc: 'Masaüstü, taşınabilir ve LAQUAtwin cep tipi pH metrelerin yüksek hassasiyetli kalibrasyonu için ±0.01 pH (@25°C) doğrulukta orijinal HORIBA pH tampon solüsyonları (Model 500-2, 500-4, 500-686, 500-7, 500-9, 500-10, 500-12 ve Y014/Y017/Y019 serisi).',
        specs: [
          'USA Tampon Serisi: pH 4.01 (500-4), pH 7.00 (500-7), pH 10.01 (500-10) (±0.01 pH @ 25°C)',
          'NIST Tampon Serisi: pH 1.68, pH 4.01, pH 6.86 (500-686), pH 9.18 (500-9), pH 12.46',
          'LAQUAtwin Cep Serisi: pH 4.01 (Y014) & pH 7.00 (Y017) 14 mL×6 şişe kalibrasyon kitleri',
          'Ambalaj: 14 mL×6 Kit, 250 mL ve 500 mL FDA/NIST izlenebilir HDPE şişe'
        ],
        tdsReady: true
      },
      {
        name: 'HORIBA İletkenlik (EC) ve TDS Standart Çözeltileri',
        slug: 'horiba-iletkenlik-standart-cozeltileri',
        activeChemical: 'Potasyum Klorür (KCl) Standartları: 84 µS/cm, 1413 µS/cm, 12.88 mS/cm, 111.8 mS/cm',
        desc: 'Saf su, ters ozmoz (RO), kazan besi suyu, soğutma kulesi ve atıksu iletkenlik/TDS ölçerlerin kalibrasyonu için NIST izlenebilir HORIBA elektriksel iletkenlik standart çözeltileri (Model 500-21, 500-22, 500-23, 500-24 ve LAQUAtwin Y071L/M/H).',
        specs: [
          'Düşük İletkenlik Standardı: 84 µS/cm @ 25°C (Model 500-21 — Saf Su & RO Çıkışı)',
          'Standart İletkenlik: 1413 µS/cm @ 25°C (Model 500-22 / Y071L) & 12.88 mS/cm (Model 500-23 / Y071M)',
          'Yüksek İletkenlik Standardı: 111.8 mS/cm @ 25°C (Model 500-24 — Deniz Suyu & Konsantre Brine)',
          'Ambalaj: 14 mL×6 LAQUAtwin paket ve 250 mL / 500 mL laboratuvar şişesi'
        ],
        tdsReady: true
      },
      {
        name: 'HORIBA İyon Seçici Elektrot (ISE) & LAQUAtwin Standart Çözeltileri',
        slug: 'horiba-iyon-standart-cozeltileri',
        activeChemical: 'Kalsiyum (Ca²⁺), Nitrat (NO₃⁻), Potasyum (K⁺), Sodyum (Na⁺), Florür (F⁻), Klorür (Cl⁻), Amonyak & Tuzluluk',
        desc: 'HORIBA LAQUAtwin cep tipi iyon ölçerler ve laboratuvar iyon seçici elektrotları (ISE) için 150 ppm ve 2000 ppm standart kalibrasyon çözeltileri, 100/1000 ppm laboratuvar standartları ve İyonik Kuvvet Ayarlayıcı (ISA) reaktifler.',
        specs: [
          'LAQUAtwin İyon Standartları: 150 ppm & 2000 ppm (Na⁺ Y022, K⁺ Y031, NO₃⁻ Y041, Ca²⁺ Y051)',
          'Tuzluluk (Salinity) Standartları: %0.5 (5 ppt) ve %5.0 (50 ppt) NaCl kalibrasyon solüsyonları (Y021)',
          'Laboratuvar ISE Standartları: F⁻, Cl⁻, NH₄⁺, Ca²⁺, K⁺, NO₃⁻ (100 mg/L & 1000 mg/L) + ISA çözeltileri',
          'Ambalaj: 14 mL×6 şişe LAQUAtwin seti ve 250 mL / 500 mL şişe'
        ],
        tdsReady: true
      },
      {
        name: 'HORIBA ORP (Redoks) Standart Çözeltileri ve Toz Reaktifler',
        slug: 'horiba-orp-standart-cozeltileri',
        activeChemical: 'Kinhidron Bazlı 89 mV / 258 mV ORP Standart Tozları (160-51 / 160-22) ve 229 mV ORP Çözeltisi (Y058)',
        desc: 'Klorlama, dezenfeksiyon, atıksu oksidasyon ve yüzme havuzu/soğutma kulesi ORP (mV) sensörlerinin doğruluk kontrolü ve kalibrasyonu için orijinal HORIBA ORP standartları.',
        specs: [
          'ORP Standart Toz Seti: pH 4 (+258 mV @ 25°C, Model 160-22) ve pH 7 (+89 mV @ 25°C, Model 160-51)',
          'Hazır ORP Kalibrasyon Çözeltisi: 229 mV @ 25°C (Model Y058 — 14 mL×6 şişe)',
          'Ambalaj: 250 mL çözelti için 10 paket toz reaktif veya 14 mL×6 hazır şişe'
        ],
        tdsReady: true
      },
      {
        name: 'HORIBA Elektrot İç Dolgu (3.33 M KCl) ve Temizleme / Bakım Çözeltileri',
        slug: 'horiba-elektrot-ic-dolgu-ve-temizleme',
        activeChemical: '3.33 M Potasyum Klorür (Model 300), Elektrot Temizleme Solüsyonları (Model 220 / 230 / 250)',
        desc: 'Doldurulabilir cam pH ve ORP elektrotları için orijinal 3.33 M KCl referans iç dolgu çözeltisi ile protein, yağ, inorganik kireç ve metal oksit kirlenmelerini gideren HORIBA elektrot temizleme ve saklama solüsyonları.',
        specs: [
          'Referans Elektrot İç Dolgu: 3.33 M KCl Çözeltisi (Model 300 — 50 mL / 250 mL) & Jel KCl (Model 310)',
          'Elektrot Temizleme: Model 220 (İnorganik Leke), Model 230 (Genel), Model 250 (Protein & Biyolojik Kalıntı)',
          'Elektrot tepki süresini hızlandırır, ölçüm sapmalarını önler ve prob ömrünü uzatır',
          'Ambalaj: 50 mL×2, 100 mL ve 250 mL orijinal HORIBA şişe'
        ],
        tdsReady: true
      },
      {
        name: 'Analitik Laboratuvar Kimyasalları, Reaktifler ve Titrasyon Çözeltileri',
        slug: 'analitik-laboratuvar-kimyasallari-ve-reaktifler',
        activeChemical: 'EDTA Titrasyon Çözeltileri, Sertlik / Alkalinite İndikatörleri, DPD Klor Reaktifleri, Analitik Asit/Bazlar',
        desc: 'Su ve atıksu kalite kontrol laboratuvarları için toplam sertlik, M/P alkalinite, klorür, sülfit, fosfat, silika, demir ve serbest/toplam klor (DPD) analiz reaktifleri ile volümetrik titrasyon çözeltileri.',
        specs: [
          'Saha Test Kitleri: Toplam Sertlik, Alkalinite, Klorür, Sülfit, DEHA ve Fosfonat damla/titrasyon kitleri',
          'Spektrofotometrik Reaktifler: KOİ (COD) tüpleri, toplam azot, toplam fosfor, silika ve demir reaktifleri',
          'Ambalaj: 100 mL – 1000 mL analitik şişe ve saha çantası yedek reaktif setleri'
        ],
        tdsReady: true
      }
    ]
  },
  {
    id: 'jeotermal-su-sartlandirma',
    code: '07',
    title: 'Jeotermal Su Şartlandırma',
    shortDesc: 'Jeotermal kuyu, eşanjör, sera ve bölgesel ısıtma hatlarında kireç, silika ve korozyon kontrolü. Dozaj, akışkan analizi görülmeden yazılmaz.',
    tag: 'Jeotermal & Yüksek Sıcaklık',
    badge: 'Analiz Şartlı',
    icon: 'flame',
    image: '/assets/cat-ro-membrane.jpg',
    subcategories: [
      {
        name: 'Jeotermal Kireç ve Silika İnhibitörleri',
        slug: 'jeotermal-kirec-silika',
        activeChemical: 'Yüksek sıcaklık kararlı fosfonat ve polimer karışımları',
        desc: 'Karbonat ve silika birikimine karşı kuyu çıkışı, separatör ve eşanjör hatlarında kullanılan inhibitörler. Sıcaklık bandı ve dozaj, brine analiziyle belirlenir.',
        specs: [
          'Uygulama: kuyu başı, yüzey hattı ve eşanjör',
          'Hedef birikim: kalsiyum karbonat, silika ve metal silikat',
          'Dozaj akışkan analizi olmadan sabitlenmez',
          'Ambalaj: 30 kg bidon, 1000 kg IBC'
        ],
        tdsReady: true
      },
      {
        name: 'Jeotermal Korozyon İnhibitörleri',
        slug: 'jeotermal-korozyon',
        activeChemical: 'Film yapıcı ve azol destekli korozyon programı',
        desc: 'Tuzlu ve çözünmüş gaz içeren jeotermal akışkanlarda karbon çelik hat ve eşanjör metal kaybını sınırlayan inhibitörler. Kireç programıyla birlikte kurulur.',
        specs: [
          'Karbon çelik yüzey hatları ve ısı eşanjörleri',
          'Kireç inhibitörü ile birlikte programlanır',
          'Korozyon kuponu ile saha doğrulaması'
        ],
        tdsReady: true
      },
      {
        name: 'Jeotermal Hat ve Eşanjör Temizleyiciler',
        slug: 'jeotermal-hat-temizleme',
        activeChemical: 'İnhibitörlü karbonat ve silikat çözücü',
        desc: 'Karbonat ve silikat birikimini duruşta veya kontrollü çevrimde çözen temizleyiciler. Online veya offline uygulama, birikim tipine göre seçilir.',
        specs: [
          'Karbonat ve silikat birikimi',
          'Duruşta veya kontrollü çevrimde uygulama',
          'Temizlik sonrası nötralizasyon'
        ],
        tdsReady: true
      },
      {
        name: 'H₂S Koku ve Mikrobiyolojik Yardımcılar',
        slug: 'jeotermal-koku-biyosit',
        activeChemical: 'Koku bastırıcı ve oksitleyici olmayan biyosit',
        desc: 'Jeotermal soğutma ve tutma hatlarında hidrojen sülfür kokusu ile inhibitör stoklarındaki bakteri üremesine karşı yardımcı kimyasallar.',
        specs: [
          'H₂S kokusunun sahada bastırılması',
          'İnhibitör stok çözeltilerinde biyolojik koruma',
          'Açık soğutma destek devreleriyle birlikte kurulabilir'
        ],
        tdsReady: true
      }
    ]
  },
  {
    id: 'fabrika-ve-proses-kimyasallari',
    code: '06',
    title: 'Fabrika, Proses ve Baz Kimyasalları (Sodyum Hipoklorit & Kostik)',
    shortDesc: 'Ağır sanayi, kağıt fabrikaları, deterjan sülfonasyon hatları, Şişecam cam hatları, haddehaneler, kalsit tesisleri ile Sodyum Hipoklorit ve Kostik Soda tedariki.',
    tag: 'Proses & Baz Kimyasallar',
    badge: 'Tesis & Sektör Spesifik',
    icon: 'shield-check',
    image: '/assets/cat-hypochlorite.jpg',
    subcategories: [
      {
        name: 'Kağıt Fabrikası Proses Kimyasalları',
        slug: 'kagit-fabrikasi-proses-kimyasallari',
        activeChemical: 'C-PAM Retansiyon Ajanı, Silikonsuz Yağ Alkolü (C16-C22), PAE Reçinesi, DBNPA',
        desc: 'Oluklu mukavva, ambalaj kağıdı ve temizlik kağıdı üretiminde su tutma ve drenajı hızlandıran C-PAM, kağıtta leke bırakmayan silikonsuz köpük kesici, keçe temizleyici ve PAE yaş mukavemet kimyasalları.',
        specs: [
          'Retansiyon & Drenaj: C-PAM (MW 8-12M Da) ile beyaz su elyaf kaybı <%0.08',
          'Köpük Kontrolü: Yağ alkolü bazlı silikonsuz antifoam, vakum düşüşünü engeller',
          'Slime Kontrolü: DBNPA şok biyositiyle levha kopmalarına son',
          'Mukavemet: Poliamidoamin-epiklorohidrin (PAE) ile neme dayanıklı karton eldesi'
        ],
        tdsReady: true
      },
      {
        name: 'Deterjan & Sülfonasyon Tesisi Kimyasalları',
        slug: 'deterjan-ve-sulfonasyon-kimyasallari',
        activeChemical: 'PBTC + HEDP Fosfonat Karışımı, Sodyum Poliakrilat (MW 4500), Akrilik/Maleik Kopolimer',
        desc: 'LABSA sülfonasyon reaktörlerinin yüksek ekzotermik ceket soğutma sularında termal kışır önleme, sprey kurutma kulesi gaz yıkama (scrubber) köpük kesicileri ve deterjan bulamacı dispersantları.',
        specs: [
          'Reaktör Ceket Şartlandırma: 120°C termal kararlı PBTC kireç/korozyon önleyici',
          'Scrubber Köpük Kesici: Yüksek sıcaklık ve basınca dayanıklı silikonsuz emülsiyon',
          'Dispersant: Sodyum Poliakrilat ile zeolit ve inorganik tuzların homojen dağılımı',
          'CIP Hat Temizliği: EDTA/GLDA takviyeli konsantre kostik yıkayıcılar'
        ],
        tdsReady: true
      },
      {
        name: 'Cam Sanayi & Şişecam Özel Çözümleri',
        slug: 'cam-sanayi-ve-sisecam-cozumleri',
        activeChemical: 'Nitritsiz Sodyum Molibdat (Na2MoO4), Sentetik Rodaj Sıvısı, RO Son Durulama Ajanı',
        desc: 'Float cam kalay banyosu elektrot ceketlerinde ultra düşük iletkenlikli korozyon önleyici, CNC cam rodaj/delme soğutma sıvıları, cam yıkama hatlarında leke ve film bırakmayan RO durulama kimyasalları ve kalıp ayırıcılar.',
        specs: [
          'Kalay Banyosu Elektrot Koruması: <0.1 µS/cm saf su uyumlu nitritsiz molibdat inhibitörü',
          'Cam Rodaj Sıvısı: Cam tozunu hızla çöktüren, taş ömrünü %35 artıran sentetik lubrikant',
          'Cam Yıkama Durulaması: Buharlaşma lekesi bırakmayan non-iyonik yüzey aktif formül',
          'Kalıp Ayırıcı: Yüksek sıcaklığa dayanıklı sentetik grafit/ester emülsiyonu'
        ],
        tdsReady: true
      },
      {
        name: 'Demir-Çelik Haddehane & Pickling Kimyasalları',
        slug: 'haddehane-ve-pickling-kimyasallari',
        activeChemical: 'Mannich Bazı + Propargil Alkol, Ultra Yüksek Anyonik PAM (24M Da), AA/AMPS Terpolimer',
        desc: 'Sıcak hadde çeliklerinin %15-20 HCl asitleme (pickling) hatlarında metali koruyup asit sarfiyatını %25 azaltan korozyon inhibitörleri, tufal çukuru (scale pit) ultra flokülantları ve sürekli döküm kalıp koruyucuları.',
        specs: [
          'Pickling Korozyon İnhibitörü: %20 HCl banyosunda %98 metal koruma verimi',
          'Tufal Çukuru Flokülantı: A-PAM 24M Da ile demir tufalını 30 saniyede çöktürme',
          'Sürekli Döküm Koruma: AA/AMPS polimer ile bakır kalıp kristalizatör soğutması',
          'Hadde Yağı Ayırıcı: Soğutma suyundaki kaçak yağları ayıran de-emülgatör'
        ],
        tdsReady: true
      },
      {
        name: 'Mikronize Kalsit & Maden Zenginleştirme Dispersantları',
        slug: 'kalsit-ve-maden-dispersantlari',
        activeChemical: 'Ultra Saf Sodyum Poliakrilat Homopolimeri (MW: 3.500 - 4.500 Da)',
        desc: 'Bilyalı değirmenlerde kalsit yaş öğütme viskozitesini düşürerek katı madde oranını %75\'e çıkaran, değirmen elektrik tüketimini %20+ düşüren dispersantlar ve filtre pres maden flokülantları.',
        specs: [
          'Katı Madde Yüklemesi: %65\'ten %75\'e viskozite artışı olmaksızın çıkış',
          'Değirmen Enerji Tasarrufu: %18 - 25 kW/ton azalma',
          'Sedimentasyon Önleme: Depolama tanklarında 6 ay çökmeyen tiksotropik kararlılık',
          'Maden Filtre Pres Flokülantı: Berrak süzüntü ve yüksek kuru kek verimi'
        ],
        tdsReady: true
      },
      {
        name: 'Metal Yüzey İşlem & Boya Kabini Kimyasalları',
        slug: 'metal-yuzey-islem-ve-boya-kabini',
        activeChemical: 'Demir & Çinko Fosfatlama, Boya Çürütücü (Detackifier) Koagülant, Pasivasyon Ajanları',
        desc: 'Elektrostatik toz boya öncesi yağ alma, demir/çinko fosfatlama banyoları ile sulu boya kabinlerinde aşırı püsküren boya partiküllerini yapışkansızlaştırıp yüzdüren kimyasal ikilisi.',
        specs: [
          'Korozyon Direnci: 500+ saat tuz sisi testi dayanımı',
          'Boya Çürütücü: Kabin suyundaki solventli/su bazlı boyayı yüzdürüp temiz su döngüsü sağlar',
          'Alkali ve Asidik Daldırma/Püskürtme Ağır Yağ Sökücüler'
        ],
        tdsReady: true
      },
      {
        name: 'Membran Temizleme Kimyasalları (CIP)',
        slug: 'membran-temizleme-kimyasallari-cip',
        activeChemical: 'Asidik CIP (pH 2 - Fosfonik/Sitrik), Alkali CIP (pH 11 - EDTA/Biyosürfaktan/Enzim)',
        desc: 'Ters ozmoz (RO) ve ultrafiltrasyon membranlarında biriken inorganik kireç, demir, silika ve biyolojik slime tabakalarını membran yapısını bozmadan çözen temizleyiciler.',
        specs: [
          'pH 2 Asidik CIP: Kalsiyum karbonat, demir ve metal oksitleri tamamen temizler',
          'pH 11 Alkali CIP: Organik biyofilm, yağ ve kolloidal silt tabakasını söker',
          'Membran Akısını (Flux) İlk Günkü Performansa Döndürür'
        ],
        tdsReady: true
      },
      {
        name: 'Sodyum Hipoklorit (%15–16) & Kostik Soda (%48 Sıvı / %99 Payet)',
        slug: 'sodyum-hipoklorit-ve-kostik-soda',
        activeChemical: 'NaOCl (%15-16 Aktif Klor), NaOH (%48 Membran Sıvı / %99 Payet), Teknik HCl & H₂SO₄',
        desc: 'Su dezenfeksiyonu, tekstil ağartma, CIP yıkama ve atıksu pH nötralizasyonu için yüksek saflıkta sıvı sodyum hipoklorit, sıvı/payet kostik soda ve teknik asitler.',
        specs: [
          'Sodyum Hipoklorit: %15–16 aktif klor, taze üretim, düşük ağır metal',
          'Kostik Soda: %48 membran kalitesi sıvı ve %99 payet/boncuk NaOH',
          'Ambalaj: 25 kg Torba, 30–60 kg Bidon, 1000–1500 kg IBC ve ADR Dökme Tanker'
        ],
        tdsReady: true
      },
      {
        name: 'Özel Kimyasal Sentez & Fason Formülasyon',
        slug: 'ozel-kimyasal-sentez-ve-tedarik',
        activeChemical: 'Tesise Özel AR-GE Reçeteleri, Fason Üretim, Konsinye Tedarik',
        desc: 'Fabrikanızın sahadaki su analizine, proses sıcaklığına ve metalurjisine göre AR-GE laboratuvarımızda formüle edilen, teknik analiz raporu ve güvenlik bilgi formuyla teslim edilen özel ürünler.',
        specs: [
          'Jar-Test ve Korozyon Kuponu Testleriyle Doğrulanmış Reçeteler',
          'Konsinye Stok ve IoT Seviye Takip Opsiyonu',
          'ISO 9001 / 14001 / 45001 Belgeli Üretim Güvencesi'
        ],
        tdsReady: true
      }
    ]
  }
];

// Kategori kartlarını hem eski hem yeni şemayla tam uyumlu hale getir
productCategories.forEach((cat) => {
  cat.slug = cat.slug || cat.id;
  cat.shortTitle = cat.shortTitle || cat.tag || cat.title;
  cat.description = cat.description || cat.shortDesc || '';
  cat.packaging = cat.packaging || '25-30 kg Bidon / 1000 kg IBC / Dökme Tanker';
  cat.subProducts = (cat.subcategories || []).map((s) => ({
    name: s.name,
    detail: `${s.activeChemical} — ${s.desc}`
  }));
});

export const solutionLines = [
  {
    id: 'su-sartlandirma',
    title: 'Endüstriyel Su Şartlandırma',
    badge: 'Kule • Kazan • Kapalı Devre',
    image: '/assets/cat-cooling.jpg',
    summary: 'Açık kule, kapalı devre, buhar kazanı ve hat temizliği aynı program mantığıyla kurulur.',
    points: ['Kışır ve korozyon inhibitörü', 'Kapalı devre molibdat / azol', 'Oksijen tutucu ve kondens amini', 'Eşanjör ve hat temizliği'],
    href: '/urunler#sogutma-kulesi-kimyasallari'
  },
  {
    id: 'atiksu',
    title: 'Atıksu ve Çamur',
    badge: 'PAC • FeCl₃ • Dekantör C-PAM',
    image: '/assets/cat-coagulants.jpg',
    summary: 'Koagülant, polimer, renk giderimi, emülsiyon kırma ve çamur susuzlaştırma.',
    points: ['PAC ve demir-III klorür', 'Toz ve emülsiyon polimer', 'Emülsiyon kırıcı', 'Dekantör C-PAM'],
    href: '/urunler#atik-su-aritma-kimyasallari'
  },
  {
    id: 'ham-su',
    title: 'Medipure Su Saflaştırma: Saf Su & Ultra Saf Su EDI',
    badge: '18.25 MΩ·cm • EDI • 163 Model',
    image: '/assets/hero-medipure-edi.jpg',
    summary: 'Medipure su saflaştırma cihazları, çift geçişli RO, Elektrodeiyonizasyon (EDI) ve Tip-1/Tip-2 ultra saf su sistemleri.',
    points: ['Saf Su & Ultra Saf Su (18.25 MΩ·cm)', 'Elektrodeiyonizasyon (EDI) sistemler', 'Deiyonize, medikal ve mobil cihazlar', '163 model Medipure GEN-6 kataloğu'],
    href: '/sistemler#medipure-katalog'
  },
  {
    id: 'horiba-laboratuvar',
    title: 'Laboratuvar Kimyasalları & HORIBA Standart Çözeltileri',
    badge: 'HORIBA pH • EC • İyon (ISE) • ORP',
    image: '/assets/hero-horiba-lab.jpg',
    summary: 'HORIBA su kalitesi ölçüm cihazları için NIST izlenebilir pH tampon, iletkenlik, iyon, ORP ve elektrot bakım çözeltileri ile analitik reaktifler.',
    points: ['HORIBA pH 4.01 / 7.00 / 10.01 tamponlar', '84 µS/cm – 111.8 mS/cm EC standartları', 'LAQUAtwin & ISE iyon/tuzluluk çözeltileri', '3.33 M KCl iç dolgu & elektrot temizleme'],
    href: '/urunler#laboratuvar-kimyasallari-ve-horiba-cozeltileri'
  },
  {
    id: 'jeotermal',
    title: 'Jeotermal Şartlandırma',
    badge: 'Kuyu • Eşanjör • Silika',
    image: '/assets/cat-boiler.jpg',
    summary: 'Kuyu, sera ve bölgesel ısıtma hatlarında kireç, silika ve korozyon. Dozaj brine analizine bağlıdır.',
    points: ['Kireç ve silika inhibitörü', 'Korozyon programı', 'Hat ve eşanjör temizliği', 'H₂S koku yardımcısı'],
    href: '/urunler#jeotermal-su-sartlandirma'
  },
  {
    id: 'metal-yuzey',
    title: 'Metal Yüzey ve Boya Kabini',
    badge: 'Yağ Alma • Fosfat • Pasivasyon',
    image: '/assets/cat-acids.jpg',
    summary: 'Yağ alma, fosfatlama, pasivasyon ve sulu boya kabininde boya çürütme.',
    points: ['Alkali yağ sökücü', 'Demir ve çinko fosfat', 'Pasivasyon', 'Boya detackifier'],
    href: '/urunler#fabrika-ve-proses-kimyasallari'
  },
  {
    id: 'maden',
    title: 'Maden ve Tikiner',
    badge: 'Kalsit • Dispersant • Flokülant',
    image: '/assets/cat-caustic.jpg',
    summary: 'Kalsit yaş öğütme dispersantı ve maden tikiner / filtre pres flokülantı.',
    points: ['Sodyum poliakrilat dispersant', 'Tikiner A-PAM', 'Filtre pres kek verimi', 'Çöktürme jar-testi'],
    href: '/urunler#fabrika-ve-proses-kimyasallari'
  },
  {
    id: 'saha',
    title: 'Saha Analiz ve İşletme Takibi',
    badge: 'Jar-Test • LSI • Kupon Analizi',
    image: '/assets/hero-chemical-lab.jpg',
    summary: 'Jar-test, LSI ve periyodik saha kontrolü. Akredite laboratuvar iddiası yok; analiz sahada veya anlaşmalı laboratuvarda yapılır.',
    points: ['Yerinde jar-test', 'LSI ve korozyon kuponu', 'Dozaj programı revizyonu', 'Seviye ve tüketim takibi'],
    href: '/teklif-al?type=water_audit'
  }
];

export const fieldServices = [
  {
    title: 'Endüstriyel Ham Su Arıtma',
    summary: 'Kuyu ve şebeke suyunu prosese hazırlayan filtrasyon, yumuşatma, RO ve EDI projesi.',
    href: '/sistemler#endustriyel-ro'
  },
  {
    title: 'Atıksu Kimyasal Arıtma Programı',
    summary: 'Koagülant ve polimer seçimi jar-test ile yapılır; deşarj hedefi tesis verisine göre yazılır.',
    href: '/teklif-al?type=jar_test_trial&product=At%C4%B1ksu%20Kimyasal%20Ar%C4%B1tma%20Program%C4%B1'
  },
  {
    title: 'Çamur Susuzlaştırma',
    summary: 'Dekantör, belt pres ve filtre pres için katyonik polimer programı ve kek kuruluğu takibi.',
    href: '/urunler#atik-su-aritma-kimyasallari'
  },
  {
    title: 'Koku Kontrol Programı',
    summary: 'Terfi, çamur hattı ve jeotermal tutma noktalarında H₂S kokusuna karşı kimyasal program.',
    href: '/urunler#atik-su-aritma-kimyasallari'
  },
  {
    title: 'Proses Danışmanlığı',
    summary: 'Mevcut arıtma veya şartlandırma hattının dozaj, blöf ve kimyasal tüketim açısından gözden geçirilmesi.',
    href: '/teklif-al?type=water_audit&product=Proses%20Dan%C4%B1%C5%9Fmanl%C4%B1%C4%9F%C4%B1'
  },
  {
    title: 'Periyodik İşletme Takibi',
    summary: 'İletkenlik, pH ve stok seviyesine göre tekrarlayan saha ziyareti ve program düzeltmesi.',
    href: '/teklif-al?type=water_project&product=Periyodik%20%C4%B0%C5%9Fletme%20Takibi'
  }
];

export const companyInfo = {
  name: 'Elif Çevre Kimya',
  legalName: 'Elif Çevre Kimya — Endüstriyel Kimyasallar, Çevre Teknolojileri ve Su Arıtma Sistemleri',
  tagline: 'Endüstriyel Kimyasal Satışları, Çevre Arıtma Kimyasalları ve Su Arıtma Sistemleri Mühendisliği',
  website: 'https://www.elifcevrekimya.com.tr',
  domainDisplay: 'www.elifcevrekimya.com.tr',
  phoneDisplay: '0546 499 23 42',
  phoneRaw: '+905464992342',
  whatsappNumber: '905464992342',
  whatsappUrl: 'https://wa.me/905464992342',
  email: 'info@elifcevrekimya.com.tr',
  salesEmail: 'satis@elifcevrekimya.com.tr',
  address: 'Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana',
  mapsUrl: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x15288751a6fd9097:0xffc6bfce58ff18ef?sa=X&ved=1t:8290&ictx=111',
  city: 'Adana',
  workingHours: 'Pazartesi – Cumartesi: 08:00 – 18:30'
};

export const heroStats = [
  {
    value: '6 Mega Sektör',
    label: 'Proses Formülasyon Matrisi',
    detail: 'Demir-Çelik, Deterjan, Kağıt, Cam, Kalsit ve Galvaniz'
  },
  {
    value: '2 – 6 Saat',
    label: 'Çukurova & OSB Sevkiyatı',
    detail: 'Adana, Mersin, Osmaniye, İskenderun, Kayseri, Niğde'
  },
  {
    value: '%99.5+',
    label: 'RO & EDI Saf Su Verimi',
    detail: '< 0.1 µS/cm iletkenlik ve yüksek silis giderimi'
  },
  {
    value: '%100 Doğrulanmış',
    label: 'SDS / TDS / COA Belgeleri',
    detail: 'Parti bazlı analiz ve yerinde Jar-Test doğrulaması'
  }
];

export const waterTreatmentSystems = [
  {
    id: 'endustriyel-ro',
    code: 'SYS-RO',
    title: 'Endüstriyel Ters Ozmoz (Reverse Osmosis) Sistemleri',
    capacityRange: '1 – 250 m³/saat',
    summary: 'Kuyu suyu, nehir suyu ve şebeke sularında yüksek tuzluluk ve iletkenliği %99.5’e varan oranda gideren, PLC/SCADA otomasyonlu ağır hizmet RO üniteleri.',
    features: [
      'Düşük enerjili TFC poliamid membran dizilimi ve antiskalant dozaj otomasyonu',
      'AISI 304/316 paslanmaz çelik yüksek basınç kollektörleri ve şase',
      'Online iletkenlik, pH, ORP, basınç ve debi izleme panosu',
      'Entegre membran kimyasal yıkama (CIP) istasyonu'
    ],
    useCases: 'Buhar kazanı besi suyu, tekstil boyahane, gıda/içecek, kimya ve enerji santralleri'
  },
  {
    id: 'edi-ultra-saf-su',
    code: 'SYS-EDI',
    title: 'EDI (Elektrodeiyonizasyon) & Çift Kademe Ultra Saf Su Sistemleri',
    capacityRange: '0.5 – 100 m³/saat (< 0.06 µS/cm)',
    summary: 'Asit ve kostik rejenerasyonuna ihtiyaç duymadan, elektrik alanıyla kesintisiz 18.2 MΩ·cm / <0.1 µS/cm ultra saf su üreten çevre dostu sistemler.',
    features: [
      'Çift geçişli RO (Double Pass) + Membran Degazör + EDI konfigürasyonu',
      'Asit/kostik atığı olmadan 7/24 kesintisiz yüksek saflık',
      '> %99.5 çözünmüş silis (SiO₂) ve bor giderimi',
      'Cam yıkama (ayna/low-E), yüksek basınçlı türbin kazanları ve laboratuvarlar'
    ],
    useCases: 'Düzcam/ayna yıkama hatları, yüksek basınçlı buhar kazanları, ilaç ve elektronik sanayi'
  },
  {
    id: 'ultrafiltrasyon-uf',
    code: 'SYS-UF',
    title: 'Ultrafiltrasyon (UF) ve İleri Ön Arıtma Sistemleri',
    capacityRange: '5 – 300 m³/saat (0.02 Mikron)',
    summary: 'Yüzey suları ve kuyu sularındaki bulanıklık, askıda katı madde, kolloidal silis ve bakterileri 0.02 mikron PVDF membranlarla filtreleyen tam otomatik sistemler.',
    features: [
      'RO membranları öncesinde SDI < 2.0 garantisi',
      'Otomatik ters yıkama (Backwash) ve kimyasal destekli yıkama (CEB)',
      'Düşük kimyasal ve enerji sarfiyatı'
    ],
    useCases: 'Nehir/baraj suyu arıtımı, atıksu geri kazanım (ZLD) ön arıtması, içme ve proses suyu'
  },
  {
    id: 'yumusatma-demineralizasyon',
    code: 'SYS-SOFT',
    title: 'Otomatik Su Yumuşatma ve Demineralizasyon Sistemleri',
    capacityRange: '2 – 200 m³/saat',
    summary: 'Kalsiyum ve magnezyum sertliğini sıfırlayan tandem reçineli yumuşatma üniteleri ile katyonik-anyonik deiyonizasyon kolonları.',
    features: [
      'Debi ve sertlik sensörü kontrollü tandem (kesintisiz) çalışma',
      'FRP veya epoksi kaplı karbon çelik tank seçenekleri',
      'Yüksek kapasiteli gıda ve endüstriyel sınıf iyon değiştirici reçineler'
    ],
    useCases: 'Soğutma kulesi besi suyu, alçak/orta basınçlı buhar kazanları, tekstil ve çamaşırhaneler'
  },
  {
    id: 'kum-karbon-demir-mangan',
    code: 'SYS-FILT',
    title: 'Multimedya Kum, Aktif Karbon ve Demir-Mangan Filtrasyonu',
    capacityRange: '2 – 250 m³/saat',
    summary: 'Ham sudaki askıda katı madde, serbest klor, organik madde, renk, koku ile çözünmüş demir ve manganı gideren otomatik filtrasyon bataryaları.',
    features: [
      'Kademeli kuvars kumu, antrasit, yüksek iyotlu aktif karbon ve katalitik medya',
      'Pnömatik veya elektrik aktüatörlü yüzey borulamalı otomatik vanalar',
      'Fark basınç (ΔP) ve zaman bazlı otomatik ters yıkama'
    ],
    useCases: 'Kuyu suyu ön arıtımı, proses suyu hazırlama, RO membran koruma'
  },
  {
    id: 'dozaj-ve-otomasyon',
    code: 'SYS-DOSE',
    title: 'Otomatik Kimyasal Dozaj, Blöf ve Kule/Kazan Kontrol Üniteleri',
    capacityRange: 'PLC & Sensör Kontrollü',
    summary: 'Soğutma kuleleri ve buhar kazanlarında iletkenlik, pH, ORP ve korozyon hızını anlık ölçerek otomatik blöf ve kimyasal dozajı yapan akıllı kontrol panoları.',
    features: [
      'Toroidal (indüktif) iletkenlik sensörü ile kirlilikten etkilenmeyen blöf kontrolü',
      'Oransal (4-20 mA / Pulse) diyaframlı dozaj pompaları ve seviye şamandıralı PE tanklar',
      'Uzaktan izleme ve veri kaydı (Data Logging)'
    ],
    useCases: 'Açık/kapalı soğutma kuleleri, buhar jeneratörleri, atıksu nötralizasyon tesisleri'
  }
];

export const waterSystems = waterTreatmentSystems;

export const sectorsData = [
  {
    id: 'demir-celik',
    title: 'Demir-Çelik, Haddehane ve Boru/Galvaniz Sanayi',
    region: 'İskenderun, Payas, Osmaniye, Adana, Kayseri',
    summary: 'Tufal çukuru ultra yüksek molekül ağırlıklı A-PAM polimerleri, HCl asitleme inhibitörleri, kristalizatör kapalı devre inhibitörleri ve yağ emülsiyon kırıcılar.',
    keyChemicals: ['Anyonik PAM (IV>16)', 'Mannich Asit İnhibitörü', 'Molibdat/Azol İnhibitörü', 'PoliDADMAC Demülsifiyer']
  },
  {
    id: 'deterjan-kimya',
    title: 'Deterjan, Sülfonasyon ve Kimya Tesisleri',
    region: 'Adana AOSB, Mersin, Gaziantep',
    summary: '%96 LABSA, %70 SLES, sodyum sülfat, zeolit 4A, kostik soda tedariki ve ekzotermik sülfonasyon reaktör ceketleri için yüksek termal kararlılıklı PBTC şartlandırma.',
    keyChemicals: ['LABSA %96 & SLES %70', 'PBTC/HEDP Antiskalant', 'Kostik Soda %48/%99', 'Sodyum Poliakrilat']
  },
  {
    id: 'kagit-ambalaj',
    title: 'Kağıt, Oluklu Mukavva ve Selüloz Sanayi',
    region: 'Adana, Mersin, Kahramanmaraş, Kayseri',
    summary: 'Kağıt makinesi yaş kısım retansiyon polimerleri, silikonsuz yağ alkolü köpük kesiciler, PAE yaş mukavemet reçineleri ve DBNPA slime biyositleri.',
    keyChemicals: ['Katyonik PAM Retansiyon', 'Silikonsuz Antifoam', 'PAE Reçinesi', 'DBNPA Biyosit']
  },
  {
    id: 'cam-seramik',
    title: 'Düzcam, Cam Ambalaj ve Soda Sanayi',
    region: 'Mersin, Adana, Eskişehir, Yenişehir',
    summary: 'Float kalay banyosu ve fırın kapalı devreleri için nitritsiz molibdat inhibitörleri, EDI ultra saf cam yıkama sistemleri ve lehr soğutma şartlandırıcıları.',
    keyChemicals: ['Sodyum Molibdat İnhibitörü', 'Çift Kademe RO + EDI', 'Sentetik Rodaj Sıvısı', 'Lehr Antiskalantı']
  },
  {
    id: 'maden-kalsit',
    title: 'Mikronize Kalsit, Maden ve Çimento Tesisleri',
    region: 'Niğde OSB, Adana, Mersin, Karaman',
    summary: 'Yaş öğütme değirmenleri için düşük molekül ağırlıklı sodyum poliakrilat dispersantlar, stearik asit yüzey kaplama ajanları ve tikiner flokülantları.',
    keyChemicals: ['NaPA Dispersant (MW 4000)', 'Stearik Asit (Triple Pressed)', 'A-PAM Tikiner Polimeri', 'Kuvars Flotasyon Ajanı']
  },
  {
    id: 'tekstil-gida-enerji',
    title: 'Tekstil Boyahane, Gıda ve Enerji Santralleri',
    region: 'Adana AOSB, Tarsus, Kayseri, Kahramanmaraş',
    summary: 'Sıfır sertlikte yumuşatma ve RO proses suyu tesisleri, buhar kazanı DEHA oksijen tutucuları, tekstil renk giderici koagülantlar ve kule biyositleri.',
    keyChemicals: ['DEHA Oksijen Tutucu', 'Renk Giderici Polimer', 'RO Antiskalant & CIP', 'Kule Biyosit & Dispersant']
  },
  {
    id: 'jeotermal',
    title: 'Jeotermal Enerji, Sera ve Bölgesel Isıtma',
    region: 'Denizli, Aydın, Manisa, Afyon ve diğer jeotermal sahalar',
    summary: 'Kuyu çıkışı, separatör ve eşanjör hatlarında kireç, silika ve korozyon programı. Dozaj, brine analizi ve korozyon kuponu olmadan sabitlenmez.',
    keyChemicals: ['Jeotermal Kireç / Silika İnhibitörü', 'Film Yapıcı Korozyon İnhibitörü', 'Hat Temizleyici', 'H₂S Koku Yardımcısı']
  }
];

export const serviceRegions = [
  {
    region: 'Adana Merkez & Hacı Sabancı OSB (AOSB)',
    badge: 'Merkez Üs — Aynı Gün Teslimat',
    details: 'Adana Hacı Sabancı OSB, Seyhan, Yüreğir ve Ceyhan enerji/endüstri bölgesindeki fabrikalara 2 saat içinde acil kimyasal sevkiyatı, yerinde su analizi ve RO/EDI teknik servisi.',
    highlights: ['Adana AOSB', 'Ceyhan Endüstri Bölgesi', '2 Saatte Saha Müdahalesi', 'Konsinye IBC Stok']
  },
  {
    region: 'Mersin-Tarsus OSB (MTOSB), Serbest Bölge & Liman',
    badge: '2–3 Saat Lojistik Koridoru',
    details: 'Mersin-Tarsus OSB, Cam ve Soda tesisleri, Mersin Serbest Bölgesi ve Liman koridorundaki fabrikalara günlük düzenli ADR’li sevkiyat ve periyodik su şartlandırma kontrolü.',
    highlights: ['Mersin MTOSB', 'Tarsus OSB', 'Mersin Serbest Bölge', 'Cam & Gıda Sanayi']
  },
  {
    region: 'İskenderun, Payas, Dörtyol & Osmaniye Demir-Çelik Hattı',
    badge: 'Ağır Sanayi Özel Sevkiyat',
    details: 'Türkiye çelik üretiminin kalbi olan Osmaniye OSB, Payas ve İskenderun haddehane/çelikhane tesislerine dökme tanker, IBC ve 25 kg paletli polimer/inhibitör tedariki.',
    highlights: ['Osmaniye OSB', 'İskenderun & Payas', 'Haddehane Tufal & Pickling', 'Dökme Tanker Sevkiyat']
  },
  {
    region: 'Niğde Mikronize Kalsit & Kayseri OSB Sanayi Koridoru',
    badge: 'İç Anadolu Güney Aksı',
    details: 'Niğde OSB ve Bor bölgesindeki mikronize kalsit madenleri ile Kayseri OSB ve Mimarsinan OSB’deki boru, profil, galvaniz, tekstil ve mobilya tesislerine hızlı sevkiyat.',
    highlights: ['Niğde OSB (Kalsit)', 'Kayseri OSB', 'Boru & Galvaniz Hatları', '4–5 Saatte Teslimat']
  },
  {
    region: 'Gaziantep, Kahramanmaraş & Güneydoğu Sanayi Havzası',
    badge: 'Bölgesel Dağıtım Ağı',
    details: 'Gaziantep Başpınar OSB ve Kahramanmaraş tekstil, kağıt ve gıda tesislerine düzenli su şartlandırma kimyasalları, atıksu polimerleri ve RO membran sistemleri.',
    highlights: ['Gaziantep Başpınar OSB', 'Kahramanmaraş Tekstil & Kağıt', 'Atıksu Renk Giderimi', 'Periyodik Bakım']
  },
  {
    region: '81 İl Türkiye Geneli & Uluslararası İhracat',
    badge: 'Ulusal & İhracat Lojistiği',
    details: 'Mersin ve İskenderun limanlarına yakınlığımızla Orta Doğu, Kuzey Afrika, Türk Cumhuriyetleri ve Balkanlar’a IMO/ADR belgeli konteyner ihracatı ve 81 ile sevkiyat.',
    highlights: ['81 İle Ambar & Filo Sevk', 'Mersin Limanı FOB/CIF İhracat', 'TR/EN SDS & COA Belgeleri', 'Teknik Destek']
  }
];

export const faqItems = [
  {
    question: 'Soğutma kulesi ve buhar kazanı kimyasal dozajı neye göre belirlenir?',
    answer: 'Kesin kimyasal dozajı; ham suyun ve sistem blöf suyunun pH, iletkenlik (µS/cm), toplam sertlik (°Fr), M-alkalinite, klorür ve silis (SiO₂) analizleri yapıldıktan ve Langelier Doygunluk İndeksi (LSI) hesaplandıktan sonra belirlenir. Eksik su analiziyle tahmini dozaj önerilmez.'
  },
  {
    question: 'Sıvı kimyasallarda kg ile litre arasında nasıl dönüşüm yapıyorsunuz?',
    answer: 'Elif Kimya mühendislik kuralları gereği, ürünün Teknik Bilgi Formunda (TDS) doğrulanmış özgül ağırlık (yoğunluk, g/cm³ veya kg/L) değeri bulunmadan kg ile litre arasında dönüşüm yapılmaz. Örneğin %48 sıvı kostik (~1.50 kg/L) ile %32 hidroklorik asit (~1.16 kg/L) farklı yoğunluklara sahiptir.'
  },
  {
    question: 'Tesisimizde kimyasal değişikliği öncesinde ücretsiz Jar-Test veya su analizi yapıyor musunuz?',
    answer: 'Evet. Adana, Mersin, Osmaniye, Hatay, Niğde ve Kayseri başta olmak üzere sanayi tesislerinize mobil laboratuvarımızla gelerek kendi atıksuyunuz, tufal suyunuz veya kule/kazan suyunuz üzerinde canlı Jar-Test ve LSI korozyon etüdü gerçekleştiriyor, raporu yönetiminize sunuyoruz.'
  },
  {
    question: 'Ürünlerinizle birlikte SDS (GBF), TDS ve Parti Analiz Sertifikası (COA) veriliyor mu?',
    answer: 'Evet. Teslim edilen her parti kimyasal ürünümüz için güncel mevzuata uygun Güvenlik Bilgi Formu (SDS/GBF), Teknik Bilgi Formu (TDS) ve üretim partisine ait Analiz Sertifikası (COA) paylaşılmaktadır.'
  },
  {
    question: 'Su arıtma sistemlerinde (RO, EDI, Yumuşatma) periyodik bakım ve membran CIP yıkama hizmetiniz var mı?',
    answer: 'Evet. Kurulumunu yaptığımız veya fabrikanızda mevcut olan Ters Ozmoz (RO), EDI, Ultrafiltrasyon ve Yumuşatma sistemleri için periyodik bakım sözleşmesi, membran CIP kimyasal yıkama, reçine/kum/karbon medya değişimi ve yedek parça desteği sağlıyoruz.'
  },
  {
    question: 'Medipure saf su cihazı kataloğunda kaç model var ve fiyat nasıl verilir?',
    answer: 'Katalogda laboratuvar, medikal, deiyonize, mobil ve endüstri gruplarında 163 Medipure modeli vardır. Kapasite lt/saat, ton/saat veya ton/gün olarak yazılır. Sitedeki EUR tutar Medipure liste fiyatıdır; Adana teslimat teklifi kur ve sevkiyata göre ayrıca verilir.'
  },
  {
    question: 'Jeotermal kireç ve silika inhibitörü dozajını nasıl belirliyorsunuz?',
    answer: 'Jeotermal akışkanın sıcaklığı, silika, kalsiyum ve çözünmüş gazı sahadan sahaya değişir. İnhibitör tipi ve dozajı brine analizi görülmeden sabitlenmez. Program kuyu başı, separatör ve eşanjör için birlikte kurulur.'
  }
];

export const geoKnowledgeArticles = [
  {
    title: 'Haddehane Tufal Çukurlarında Anyonik Poliakrilamid (A-PAM) Seçimi ve Sıcaklık Etkisi',
    content: 'Sıcak haddeleme hatlarında 60°C üzerindeki tufal sularında standart polimerler hidrolize olarak flokülasyon gücünü kaybeder. İntrinsik viskozitesi >16 dl/g olan yüksek molekül ağırlıklı A-PAM kopolimerleri, demir oksit (Fe₂O₃/Fe₃O₄) partiküllerini <10 mg/L AKM seviyesine indirerek yüksek basınçlı descaling nozullarını korur.',
    metrics: ['İntrinsik Viskozite > 16 dl/g', 'Çıkış AKM < 10 mg/L', '0.8 – 2.5 ppm Dozaj']
  },
  {
    title: 'Buhar Kazanlarında Kireç ve Silikat Taşının Doğalgaz Tüketimine Etkisi',
    content: 'Kazan duman boruları veya su boruları üzerinde oluşan 1 mm kalınlığındaki kalsiyum karbonat tabakası yakıt tüketimini %4–5 artırırken, düşük ısı iletkenliğine sahip silikatlı kışır tabakası %8–12 arasında fazladan doğalgaz yakılmasına yol açar. Doğru RO ön arıtması ve fosfonat/terpolimer şartlandırması bu kaybı sıfırlar.',
    metrics: ['1 mm Kireç = %5–8 Ek Yakıt', 'DEHA ile < 5 ppb O₂', 'EN 12952 Uyumlu']
  },
  {
    title: 'Ters Ozmoz (RO) Membranlarında Silis ve Kalsiyum Sülfat Tıkanmasını Önleme',
    content: 'Kuyu sularında yüksek silis (>40 ppm) ve yüksek sertlik bulunan Çukurova ve İç Anadolu tesislerinde, standart hekzametafosfat (SHMP) kullanımı membranlarda geri dönüşsüz tıkanmaya neden olur. Dendrimerik ve fosfonat bazlı özel RO antiskalantları 240 ppm silis seviyesine kadar çökeltisiz çalışmayı mümkün kılar.',
    metrics: ['240 ppm Silis Toleransı', 'Geri Kazanım %75–82', '2–4 ppm Dozaj']
  },
  {
    title: 'Jeotermal Hatlarında Kireç ve Silika Programı Neden Analiz İster',
    content: 'Jeotermal akışkanın sıcaklığı, silika, kalsiyum ve çözünmüş gaz yükü kuyudan kuyuya değişir. Bu yüzden kireç, silika ve korozyon inhibitörünün tipi ile dozajı brine analizi ve mümkünse korozyon kuponu görülmeden yazılmaz. Program kuyu başı, separatör ve eşanjör için birlikte kurulur.',
    metrics: ['Brine Analizi Şart', 'Kuyu Başı ve Eşanjör', 'Kupon ile Doğrulama']
  },
  {
    title: 'Laboratuvar ve Endüstriyel Saf Su Cihazı Nasıl Seçilir',
    content: 'Medipure kataloğunda 163 model, 15 kategoride durur: laboratuvar saf su, ultra saf su, biyokimya, mikrobiyoloji, sterilizasyon, medikal, deiyonize, distile, elektrodeiyonizasyon, mobil saf su, mobil ultra saf su, endüstri, metal kaplama, kozmetik ve ters ozmoz. Kapasite cihaz kodunun yanında yazılıdır. EUR liste fiyatı vitrin fiyatıdır; teslimat teklifi Elif Kimya tarafından verilir.',
    metrics: ['163 Model', '15 Kategori', 'EUR Liste + Ayrı Teklif']
  }
];

export const pageSEO = {
  '/': {
    title: 'Elif Çevre Kimya | Endüstriyel Kimya, Çevre Arıtma, Su Şartlandırma & Saf Su Cihazları',
    description: 'Seyhan/Adana merkezli Elif Çevre Kimya (www.elifcevrekimya.com.tr): endüstriyel kimyasal tedariki, çevre ve atıksu arıtma kimyasalları (PAC, Polielektrolit), soğutma kulesi ve kazan kimyasalları, jeotermal inhibitör, RO/EDI ve 163 model Medipure saf su cihazı.',
    canonical: 'https://www.elifcevrekimya.com.tr/'
  },
  '/urunler': {
    title: 'Endüstriyel & Çevre Kimyasalları | Soğutma Kulesi, Kazan, Jeotermal, PAC | Elif Çevre Kimya',
    description: 'Soğutma kulesi, kapalı devre, kazan, jeotermal kireç inhibitörü, RO antiskalant, PAC, polielektrolit, sodyum hipoklorit, kostik soda, emülsiyon kırıcı ve köpük kesici kataloğu.',
    canonical: 'https://www.elifcevrekimya.com.tr/urunler'
  },
  '/sistemler': {
    title: 'RO, EDI Su Arıtma Sistemleri ve Medipure Saf Su Cihazları | Elif Çevre Kimya',
    description: 'Endüstriyel ters ozmoz (RO), EDI, ultrafiltrasyon ve 163 model Medipure laboratuvar, medikal, mobil ve endüstriyel saf su cihaz kataloğu. Kapasite su analizi ve teklifle netleşir.',
    canonical: 'https://www.elifcevrekimya.com.tr/sistemler'
  },
  '/sektorler': {
    title: 'Haddehane, Kağıt, Cam, Kalsit, Tekstil ve Jeotermal Kimyasalları | Elif Çevre Kimya',
    description: 'İskenderun haddehane, Adana deterjan ve kağıt, Niğde kalsit, Kayseri galvaniz, Gaziantep tekstil ve jeotermal sera hatları için proses ve çevre kimyasal programları.',
    canonical: 'https://www.elifcevrekimya.com.tr/sektorler'
  },
  '/hizmet-bolgeleri': {
    title: 'Adana, Mersin, İskenderun, Gaziantep, Kayseri OSB Kimyasal Sevkiyat | Elif Çevre Kimya',
    description: 'Ova Mah. Şakirpaşa Cd. No:269 Seyhan/Adana merkezinden Mersin, İskenderun, Osmaniye, Gaziantep, Kayseri ve Niğde sanayi hatlarına ADR standartlarında kimyasal sevkiyat.',
    canonical: 'https://www.elifcevrekimya.com.tr/hizmet-bolgeleri'
  },
  '/teknik-bilgi': {
    title: 'Teknik Belge Merkezi (SDS / GBF, TDS, COA) ve Mühendislik Rehberi | Elif Çevre Kimya',
    description: 'Kimyasal ürünlerimize ait doğrulanmış Güvenlik Bilgi Formları (SDS/GBF), Teknik Bilgi Formları (TDS), Analiz Sertifikaları (COA) ve çevre/su mühendisliği makaleleri.',
    canonical: 'https://www.elifcevrekimya.com.tr/teknik-bilgi'
  },
  '/teklif-al': {
    title: 'Kurumsal Teklif, Canlı Jar-Test ve Su Analizi Başvurusu | Elif Çevre Kimya',
    description: 'Fabrikanız için endüstriyel ve çevre kimyasalları fiyat teklifi, yerinde 6’lı Jar-Test, ücretsiz korozyon/LSI risk etüdü ve su arıtma sistemi projelendirme talebi oluşturun.',
    canonical: 'https://www.elifcevrekimya.com.tr/teklif-al'
  },
  '/iletisim': {
    title: 'İletişim & Adana Merkez Depo (Ova Mah. Şakirpaşa Cd. No:269) | Elif Çevre Kimya',
    description: 'Elif Çevre Kimya Adana merkez ofis ve depo (Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana). İletişim: info@elifcevrekimya.com.tr ve satis@elifcevrekimya.com.tr.',
    canonical: 'https://www.elifcevrekimya.com.tr/iletisim'
  }
};


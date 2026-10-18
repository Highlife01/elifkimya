/**
 * Elif Kimya - Türkiye Geneli SEO ve Hizmet Bölgeleri Matrisi
 * Adana merkezli başlayıp Mersin, Hatay, Osmaniye, Niğde, Kayseri, Gaziantep
 * ve tüm Türkiye sanayi havzalarını kapsayan lojistik ve teknik servis verileri.
 */

export const regionsList = [
  {
    id: 'adana',
    name: 'Adana & Çukurova Havzası',
    priority: 'Çok Yüksek (Ana Merkez)',
    badge: 'Merkez Lojistik & Laboratuvar',
    tagline: 'Hacı Sabancı OSB (AOSB), Kağıt ve Deterjan Fabrikalarına 2 Saatte Acil Müdahale & Kimyasal Tedarik',
    targetQueries: [
      'Adana su arıtma kimyasalları',
      'AOSB kağıt fabrikası kimyasalları',
      'Adana deterjan sülfonasyon soğutma',
      'Adana soğutma kulesi korozyon inhibitörü',
      'Adana ters ozmoz antiskalant'
    ],
    industrialZones: [
      'Adana Hacı Sabancı Organize Sanayi Bölgesi (AOSB)',
      'Kağıt & Ambalaj Fabrikaları (Ankutsan, Mondi vb.)',
      'Deterjan & Kimya Tesisleri (Beyaz Kağıt / Peros vb.)',
      'Ceyhan Enerji İhtisas Endüstri Bölgesi',
      'Seyhan & Yüreğir Sanayi Siteleri'
    ],
    services: [
      'Yerinde Su Analizi & Jar-Test (pH, İletkenlik, Sertlik, Silika, Demir, KOİ)',
      'Kağıt Fabrikaları İçin C-PAM Retansiyon ve Silikonsuz Yağ Alkolü Köpük Kesici Tedariki',
      'Deterjan Sülfonasyon Reaktörleri İçin Yüksek Termal Kararlı PBTC/HEDP İnhibitörleri',
      'Aynı Gün Merkez Depodan Tanker ve IBC Sevkiyatı (2 - 4 Saat Teslimat)',
      'Konsinye Stok Yönetimi (VMI) ve IoT Depo Seviye Takibi'
    ],
    deliveryTime: '2 - 4 Saat (Aynı Gün Teslimat)',
    contactPerson: 'Adana Merkez Teknik Operasyon: 0546 499 23 42'
  },
  {
    id: 'mersin',
    name: 'Mersin & Akdeniz Liman Havzası',
    priority: 'Çok Yüksek',
    badge: 'Cam Sanayi & Liman Lojistiği',
    tagline: 'Mersin MTOSB Şişecam Fabrikaları, Tarsus OSB ve MESBAŞ İçin Yüksek Saflıkta Kimya Çözümleri',
    targetQueries: [
      'Mersin Şişecam kimyasal tedarik',
      'Mersin cam rodaj soğutma sıvısı',
      'Tarsus OSB su arıtma kimyasalları',
      'Mersin serbest bölge kimyasal tedarik',
      'Mersin liman demineralize su'
    ],
    industrialZones: [
      'Mersin Tarsus Organize Sanayi Bölgesi (MTOSB)',
      'Şişecam Düzcam ve Cam Ambalaj Kompleksi',
      'Tarsus Düzcam ve Yeni OSB Genişleme Alanı',
      'Mersin Serbest Bölgesi (MESBAŞ)',
      'Akdeniz Kimya & Lojistik Koridoru'
    ],
    services: [
      'Float Cam Kalay Banyosu Elektrot Ceketleri İçin Nitritsiz Sodyum Molibdat İnhibitörü',
      'Cam Kenar Rodaj ve Delme CNC Hatları İçin Sentetik Soğutma Sıvıları',
      'Cam Yıkama Hatları İçin Leke Bırakmayan RO Son Durulama Yüzey Aktifleri',
      'Deniz Suyu ve Acı Su Ters Ozmoz (RO) ve EDI Ultra Saf Su Sistemleri',
      'Liman Depolama ve İhracat Konteyner Sevkiyatları (FOB Mersin)'
    ],
    deliveryTime: '4 - 12 Saat',
    contactPerson: 'Mersin & Tarsus Saha Operasyon: 0546 499 23 42'
  },
  {
    id: 'osmaniye-hatay',
    name: 'Osmaniye & Hatay (İskenderun Ağır Sanayi)',
    priority: 'Çok Yüksek',
    badge: 'Ağır Sanayi, Çelikhane & Haddehane',
    tagline: 'Tosyalı, İSDEMİR ve Haddehaneler İçin HCl Asitleme İnhibitörleri ve Tufal Çukuru Polimerleri',
    targetQueries: [
      'Osmaniye demir çelik kimyasalları',
      'İskenderun pickling asitleme inhibitörü',
      'Payas haddehane tufal çukuru polimeri',
      'İSDEMİR sürekli döküm soğutma şartlandırma',
      'Hatay kazan suyu kimyasalları'
    ],
    industrialZones: [
      'Osmaniye Organize Sanayi Bölgesi (Tosyalı Çelik Kompleksi)',
      'İskenderun 1. ve 2. OSB (İSDEMİR & MMK Metalurji)',
      'Payas & Dörtyol Haddehane Koridoru (Koç Metalurji, Yolbulan)',
      'İskenderun Körfezi Liman ve Enerji Santralleri'
    ],
    services: [
      '%20 Sıcak HCl Asitleme (Pickling) Hatları İçin Mannich Bazlı Korozyon İnhibitörü (%98 Koruma)',
      'Haddehane Tufal Çukurları (Scale Pit) İçin 24M Dalton Anyonik Poliakrilamid (A-PAM)',
      'Sürekli Döküm Kalıp ve Merdane Soğutması İçin AA/AMPS Akrilik Terpolimer Programı',
      'Hadde Soğutma Sirkülasyonu İçin Katyonik Yağ Ayırıcı De-emülgatörler',
      '25 Tonluk İzoleli Paslanmaz Tankerlerle Düzenli Sevkiyat'
    ],
    deliveryTime: '12 - 24 Saat',
    contactPerson: 'Doğu Akdeniz Demir-Çelik Hattı: 0546 499 23 42'
  },
  {
    id: 'nigde-kayseri',
    name: 'Niğde & Kayseri Sanayi Koridoru',
    priority: 'Yüksek',
    badge: 'Kalsit Mikronizasyon & Metal Sanayi',
    tagline: 'Niğde Mikronize Kalsit Tesisleri ve Kayseri OSB Metal Mobilya Tesislerine Özel Reçeteler',
    targetQueries: [
      'Niğde kalsit öğütme dispersantı',
      'Niğde mikronize kalsit sodyum poliakrilat',
      'Kayseri OSB demir çinko fosfatlama',
      'Kayseri boya kabini boya çürütücü',
      'İncesu OSB soğutma kulesi kimyasalları'
    ],
    industrialZones: [
      'Niğde Maden Bölgesi (Omya Madencilik, Niğtaş, Mikron’S)',
      'Kayseri Organize Sanayi Bölgesi (Metal & Mobilya)',
      'Mimarsinan OSB & İncesu Ağır Sanayi Bölgesi',
      'Bor Karma ve Deri İhtisas OSB'
    ],
    services: [
      'Kalsit Bilyalı Değirmenleri İçin Düşük MW Sodyum Poliakrilat Islak Öğütme Dispersantı (MW 3500-4500 Da)',
      'Elektrostatik Toz Boya Öncesi Demir ve Çinko Fosfatlama Banyoları',
      'Sulu Boya Kabinleri İçin Boya Çürütücü (Detackifier) ve Yüzdürücü Flokülant Programı',
      'Kalsit Çamurları ve Maden Atık Suları İçin Filtre Pres Flokülantları',
      'Ağır Yağ Sökücüler ve Kaynak Sonrası Pasivasyon Kimyasalları'
    ],
    deliveryTime: '24 Saat İçinde Teslimat',
    contactPerson: 'İç Anadolu Teknik Temsilciliği: 0546 499 23 42'
  },
  {
    id: 'gaziantep-maras',
    name: 'Gaziantep & Kahramanmaraş Havzası',
    priority: 'Yüksek',
    badge: 'Tekstil, Plastik & İleri Geri Kazanım',
    tagline: 'Tekstil Boyahaneleri ve Plastik Sanayisi İçin Renk Giderme ve Membran Geri Kazanım Kimyasalları',
    targetQueries: [
      'Gaziantep tekstil renk giderici polimer',
      'Kahramanmaraş boyahane su geri kazanım',
      'Gaziantep OSB kireç önleyici antiskalant',
      'Gaziantep atık su koagülant'
    ],
    industrialZones: [
      'Gaziantep 1, 2, 3, 4 ve 5. Organize Sanayi Bölgeleri',
      'Kahramanmaraş Tekstil İhtisas Sanayi Bölgeleri',
      'Türkoğlu & Kilis OSB Aksı',
      'Gaziantep Plastik & Ambalaj İhtisas Alanları'
    ],
    services: [
      'Reaktif Azo Boyaları İçin Dicyandiamide Bazlı Yüksek Verimli Renk Giderici Polimerler',
      'Atık Su Geri Kazanımı İçin Yüksek Silika Toleranslı Ters Ozmoz (RO) Antiskalantları',
      'Kalıp Soğutma Suları İçin Kireç ve Tortu İnhibitörleri',
      'Biyolojik Çamur Susuzlaştırma Katyonik Polielektrolitleri'
    ],
    deliveryTime: '24 - 48 Saat',
    contactPerson: 'Güneydoğu Teknik Satış: 0546 499 23 42'
  },
  {
    id: 'turkiye-geneli',
    name: 'Türkiye Geneli (81 İl)',
    priority: 'Ulusal Yayılım',
    badge: 'Marmara, Ege, İç Anadolu & Karadeniz',
    tagline: 'Türkiye’nin Her Noktasına Belgeli, Analizli ve Güvenli Endüstriyel Kimya Tedariki',
    targetQueries: [
      'Saf su sistemi Türkiye',
      'Endüstriyel RO antiskalant tedarikçisi',
      'Biyosit tedarikçisi Türkiye',
      'Endüstriyel su arıtma kimyasalları'
    ],
    industrialZones: [
      'Kocaeli / Gebze / Çerkezköy Kimya ve Otomotiv Havzaları',
      'Bursa Nilüfer & Demirtaş OSB (Otomotiv & Tekstil)',
      'İzmir Aliağa Petrokimya & Torbalı Sanayi Aksı',
      'Ankara Sincan, Başkent & İvedik OSB'
    ],
    services: [
      'Paletli ve Tanker Bazlı Kimyasal Lojistiği (ADR Belgeli)',
      'TDS (Teknik Veri Föyü) ve SDS (Güvenlik Bilgi Formu) Eşliğinde Sevkiyat',
      'Uzaktan Su Analizi Değerlendirme ve Dozaj Raporu Hazırlama',
      'Türkiye Çapında Kurulum ve Mühendislik Danışmanlığı'
    ],
    deliveryTime: '24 - 72 Saat',
    contactPerson: 'Ulusal Müşteri Hizmetleri: 0546 499 23 42'
  },
  {
    id: 'ihracat-global',
    name: 'Uluslararası & İhracat Pazarı (Global)',
    priority: 'İhracat / International',
    badge: 'Export & Technical Supply',
    tagline: 'Industrial Water Treatment Chemicals & Process Formulations Supplier Turkey',
    targetQueries: [
      'Industrial water treatment chemicals supplier Turkey',
      'Cooling tower biocide corrosion inhibitor manufacturer',
      'Reverse osmosis antiscalant supplier Turkey',
      'Boiler water treatment chemicals export'
    ],
    industrialZones: [
      'Middle East & GCC Countries',
      'North Africa (MENA)',
      'Balkans & Eastern Europe',
      'Caucasus & Central Asia'
    ],
    services: [
      'Custom Chemical Formulations & OEM Manufacturing',
      'Full Technical Documentation (TDS, MSDS/SDS, COA in English)',
      'Sea & Road Freight Container Shipments via Mersin Port',
      'Turnkey Industrial Water Treatment Plants'
    ],
    deliveryTime: 'FOB Mersin / CIF Global Ports',
    contactPerson: 'Export Department: +90 546 499 23 42 (WhatsApp Available)'
  }
];

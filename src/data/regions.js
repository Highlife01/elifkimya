/**
 * Elif Kimya - Türkiye Geneli SEO ve Hizmet Bölgeleri Matrisi
 * Adana merkezli başlayıp Mersin, Hatay, Osmaniye, Gaziantep, Kayseri
 * ve tüm Türkiye sanayi havzalarını kapsayan lojistik ve teknik servis verileri.
 */

export const regionsList = [
  {
    id: 'adana',
    name: 'Adana & Çukurova Havzası',
    priority: 'Çok Yüksek (Ana Merkez)',
    badge: 'Merkez Lojistik & Laboratuvar',
    tagline: 'Hacı Sabancı OSB ve Adana Sanayisine Aynı Gün Teknik Servis & Kimyasal Tedarik',
    targetQueries: [
      'Adana su arıtma kimyasalları',
      'Adana soğutma kulesi kimyasalları',
      'Hacı Sabancı OSB kimyasal tedarik',
      'Adana endüstriyel su arıtma sistemleri'
    ],
    industrialZones: [
      'Adana Hacı Sabancı Organize Sanayi Bölgesi (AOSB)',
      'Ceyhan Enerji İhtisas Endüstri Bölgesi',
      'Seyhan & Yüreğir Sanayi Siteleri',
      'Kozan & Kadirli Aksı'
    ],
    services: [
      'Yerinde Su Analizi (pH, İletkenlik, Sertlik, Silika, Demir, Klorür)',
      'Aynı Gün Stoktan Tanker ve IBC Sevkiyatı',
      'Soğutma Kulesi Biyosit ve Lejyonella Şartlandırması',
      'Ters Ozmoz (RO) ve Yumuşatma Sistemleri Bakımı'
    ],
    deliveryTime: '2 - 4 Saat (Aynı Gün Teslimat)',
    contactPerson: 'Adana Bölge Teknik Temsilciliği: 0546 499 23 42'
  },
  {
    id: 'mersin',
    name: 'Mersin & Akdeniz Liman Havzası',
    priority: 'Çok Yüksek',
    badge: 'Liman & Serbest Bölge Lojistiği',
    tagline: 'Mersin Limanı, Serbest Bölge ve Tarsus OSB İçin İleri Kimya ve Su Çözümleri',
    targetQueries: [
      'Mersin endüstriyel su arıtma',
      'Mersin fabrika kimyasalları',
      'Mersin serbest bölge kimyasal tedarik',
      'Tarsus OSB kazan suyu şartlandırma'
    ],
    industrialZones: [
      'Mersin Tarsus Organize Sanayi Bölgesi (MTOSB)',
      'Mersin Serbest Bölgesi (MESBAŞ)',
      'Akdeniz Kimya & Lojistik Koridoru',
      'Liman Depolama ve Antrepo Tesisleri'
    ],
    services: [
      'Deniz Suyu ve Acı Su Ters Ozmoz Sistemleri',
      'Gıda, Narenciye ve Ambalaj Sanayi Yıkama Suları',
      'Liman Gemileri İçin Kazan ve Soğutma Şartlandırması',
      'Atık Su Koagülasyon ve Deşarj Dengeleme'
    ],
    deliveryTime: '4 - 12 Saat',
    contactPerson: 'Mersin Saha Operasyon: 0546 499 23 42'
  },
  {
    id: 'osmaniye-hatay',
    name: 'Osmaniye & Hatay (İskenderun Demir-Çelik)',
    priority: 'Yüksek',
    badge: 'Ağır Sanayi & Metalurji',
    tagline: 'Ağır Sanayi, Çelikhane ve Haddehaneler İçin Yüksek Isı Soğutma Suyu Kimyasalları',
    targetQueries: [
      'Osmaniye OSB kimyasal tedarik',
      'İskenderun korozyon inhibitörü',
      'Hatay kazan suyu şartlandırma',
      'Payas demir çelik su arıtma'
    ],
    industrialZones: [
      'Osmaniye Organize Sanayi Bölgesi',
      'İskenderun 1. ve 2. OSB',
      'Payas & Dörtyol Haddehane Bölgesi',
      'Antakya Mobilya ve Gıda Sanayi'
    ],
    services: [
      'Yüksek Sıcaklıklı Açık Devre Soğutma Kuleleri Şartlandırması',
      'Sürekli Döküm ve Haddehane Yağ Ayırıcı Polimerler',
      'Ağır Metal Çöktürme ve Çamur Susuzlaştırma',
      'Buhar Kazanı Oksijen Tutucu ve Kondens Koruma'
    ],
    deliveryTime: '24 Saat İçinde Teslimat',
    contactPerson: 'Doğu Akdeniz Sanayi Hattı: 0546 499 23 42'
  },
  {
    id: 'gaziantep-kayseri',
    name: 'Gaziantep & Kayseri Sanayi Koridoru',
    priority: 'Yüksek',
    badge: 'Tekstil, Plastik & İmalat',
    tagline: 'Tekstil Boyahaneleri, Plastik Enjeksiyon ve Üretim Tesislerine Yüksek Hacimli Kimyasal Sevkiyatı',
    targetQueries: [
      'Gaziantep endüstriyel su arıtma sistemleri',
      'Gaziantep boyahane atık su kimyasalları',
      'Kayseri OSB soğutma kulesi kireç önleyici',
      'Kayseri kazan suyu antiskalant'
    ],
    industrialZones: [
      'Gaziantep 1, 2, 3, 4 ve 5. Organize Sanayi Bölgeleri',
      'Kayseri Organize Sanayi Bölgesi',
      'Mimarsinan & İncesu OSB',
      'Kahramanmaraş Tekstil İhtisas Bölgeleri'
    ],
    services: [
      'Tekstil Boyahane Atık Sularında Renk Giderme ve KOİ Düşürme',
      'Kalıp Soğutma Suları İçin Kireç ve Tortu İnhibitörleri',
      'Yüksek Basınçlı Buhar Kazanları İçin All-in-One Şartlandırıcılar',
      'Geri Kazanımlı Ters Ozmoz (RO) Projelendirmesi'
    ],
    deliveryTime: '24 - 48 Saat',
    contactPerson: 'Güneydoğu & İç Anadolu Temsilciliği: 0546 499 23 42'
  },
  {
    id: 'turkiye-geneli',
    name: 'Türkiye Geneli (81 İl)',
    priority: 'Ulusal Yayılım',
    badge: 'Marmara, Ege, İç Anadolu & Karadeniz',
    tagline: 'Türkiye’nin Her Noktasına Belgeli, Analizli ve Güvenli Endüstriyel Kimya Tedariki',
    targetQueries: [
      'Saf su sistemi Türkiye',
      'RO antiskalant tedarikçisi',
      'Biyosit tedarikçisi Türkiye',
      'Endüstriyel su arıtma sistemleri'
    ],
    industrialZones: [
      'Kocaeli / Gebze / Çerkezköy Kimya ve Otomotiv Havzaları',
      'Bursa Nilüfer & Demirtaş OSB',
      'İzmir Aliağa & Torbalı Sanayi Aksı',
      'Ankara Sincan & Başkent OSB'
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
    tagline: 'Industrial Water Treatment Chemicals & Reverse Osmosis Solutions Supplier Turkey',
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

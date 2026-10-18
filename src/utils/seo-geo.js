/**
 * Elif Kimya — İleri Seviye SEO, GEO (Generative Engine Optimization) & Anahtar Kelime Motoru
 * Ayrıca Arcwater (360° Su Döngüsü & Otomasyon Mühendisliği) + AsiaPlast (B2B Endüstriyel Tedarik)
 * hibrit mimari veri modellerini barındırır.
 */

import { pageSEO, faqItems, productCategories } from '../data/products.js';
import { MEDIPURE_CATEGORIES, MEDIPURE_PRODUCT_COUNT } from '../data/medipure-catalog.js';

export const SEO_KEYWORD_CLUSTERS = [
  {
    id: 'baz_asit_alkali',
    title: '1. Temel Baz Kimyasallar, Asitler & Alkaliler',
    intent: 'Yüksek Hacimli Satınalma (Tanker / IBC / Palet)',
    targetRegions: 'Adana AOSB, Mersin, İskenderun, Gaziantep, Kayseri, 81 İl',
    keywords: [
      'sodyum hipoklorit fiyat',
      'sıvı klor tedarikçisi adana',
      'kostik soda naoh %48 sıvı',
      'payet kostik %99 fiyat',
      'hidroklorik asit hcl %32 dökme tanker',
      'sülfürik asit %98 endüstriyel',
      'nitrik asit %56 %65 tedarikçisi',
      'hidrojen peroksit %50 teknik',
      'fosforik asit %85 gıda ve teknik',
      'adr belgeli kimyasal nakliye'
    ]
  },
  {
    id: 'su_sartlandirma',
    title: '2. Soğutma Kulesi, Buhar Kazanı & RO Şartlandırma',
    intent: 'Teknik Mühendislik & Sürekli Sözleşmeli Tedarik',
    targetRegions: 'Çukurova, İç Anadolu, Güneydoğu Sanayi Tesisleri',
    keywords: [
      'soğutma kulesi kimyasalları',
      'kazan suyu şartlandırma kimyasalları',
      'ters osmoz ro antiskalant',
      'yüksek silis antiskalantı',
      'deha oksijen tutucu kimyasal',
      'korozyon ve kışır önleyici inhibitör',
      'dbnpa biyosit legionella kontrolü',
      'izotiyazolin cmit mit yosun önleyici',
      'kondens hattı koruyucu nötralize amin',
      'ro membran cip yıkama kimyasalları'
    ]
  },
  {
    id: 'atiksu_polimer',
    title: '3. Atık Su Arıtma, Koagülant & Polielektrolit (Flokülant)',
    intent: 'Jar-Test Odaklı Çevre & Arıtma Tesisi Satınalması',
    targetRegions: 'Organize Sanayi Bölgeleri Merkezi & Fabrika Arıtmaları',
    keywords: [
      'polialüminyum klorür pac %30 sıvı',
      'demir iii klorür %40 koagülant',
      'alüminyum sülfat katı sıvı',
      'anyonik polielektrolit a-pam flokülant',
      'katyonik polielektrolit çamur susuzlaştırma',
      'dekantör ve belt pres polimeri',
      'tekstil atıksu renk giderici kimyasal',
      'silikonlu ve silikonsuz köpük kesici antifoam',
      'haddehane tufal çukuru polimeri',
      'bakteri ve mikrobesin kültürleri'
    ]
  },
  {
    id: 'su_aritma_sistemleri',
    title: '4. 360° Endüstriyel Su Arıtma Sistemleri & Otomasyon',
    intent: 'Anahtar Teslim EPC Proje & Yedek Parça / Servis',
    targetRegions: 'Türkiye Geneli & Orta Doğu / Afrika İhracat',
    keywords: [
      'endüstriyel su arıtma sistemleri adana',
      'endüstriyel ters osmoz ro sistemi fiyatları',
      'edi elektro deiyonizasyon saf su sistemi',
      'ultrafiltrasyon uf su arıtma ünitesi',
      'tandem endüstriyel su yumuşatma sistemi',
      'kum ve aktif karbon filtrasyon sistemleri',
      'demir mangan giderme filtreleri',
      'kimyasal dozaj pompası ve otomasyon panosu',
      'plc scada su arıtma otomasyonu',
      'sıfır atık su geri kazanım projeleri'
    ]
  },
  {
    id: 'sektorel_proses',
    title: '5. Ağır Sanayi & Sektörel Proses Kimyasalları',
    intent: 'Fabrika Üretim Müdürü & Teknik Satınalma',
    targetRegions: 'İskenderun, Osmaniye, Adana, Mersin, Niğde, Kayseri',
    keywords: [
      'demir çelik haddehane su şartlandırma',
      'asitleme hattı pickling inhibitörü hcl',
      'kağıt sanayi retansiyon polimeri ve biyosit',
      'deterjan hammaddeleri labsa %96 sles %70',
      'niğde mikronize kalsit öğütme dispersantı',
      'düzcam ve fırın kapalı devre molibdat inhibitörü',
      'galvaniz ve boru profil yüzey işlem kimyasalları',
      'tekstil boyahane sıfır sertlik proses suyu',
      'gıda ve içecek cip dezenfeksiyon kimyasalları',
      'enerji santrali demineralize su hazırlama'
    ]
  },
  {
    id: 'bolgesel_geo_osb',
    title: '6. Bölgesel OSB & GEO (Yapay Zeka Arama) Otorite Kelimeleri',
    intent: 'Yerel & Bölgesel Hızlı Teslimat / Acil Tedarik',
    targetRegions: 'Adana, Mersin, Hatay, Osmaniye, Gaziantep, Kayseri, Niğde',
    keywords: [
      'adana organize sanayi bölgesi kimya firmaları',
      'adana hacı sabancı osb endüstriyel kimyasal',
      'mersin tarsus osb su arıtma ve kimya',
      'iskenderun payas demir çelik kimyasal tedarikçisi',
      'osmaniye osb su şartlandırma ve polimer',
      'gaziantep başpınar osb atıksu kimyasalları',
      'kayseri osb su arıtma ve yüzey işlem kimyasalları',
      'kahramanmaraş tekstil ve kağıt kimyasalları',
      'çukurova dökme kimyasal tanker sevkiyatı',
      'mersin limanı ihracat kimyasal tedarikçisi'
    ]
  },
  {
    id: 'saf_su_medipure',
    title: '7. Medipure Saf Su, Ultra Saf Su ve Deiyonize Cihazlar',
    intent: 'Laboratuvar, Medikal ve Endüstriyel Cihaz Teklifi',
    targetRegions: 'Adana, Türkiye geneli laboratuvar ve üretim tesisleri',
    keywords: [
      'laboratuvar saf su cihazı',
      'ultra saf su cihazı',
      'deiyonize su cihazı',
      'medipure saf su cihazı',
      'biyokimya saf su cihazı',
      'mikrobiyoloji saf su cihazı',
      'sterilizasyon su arıtma sistemi',
      'medikal saf su sistemi',
      'mobil saf su cihazı',
      'kozmetik saf su sistemi',
      'elektrodeiyonizasyon cihazı',
      'endüstriyel saf su cihazı fiyat'
    ]
  },
  {
    id: 'jeotermal_sartlandirma',
    title: '8. Jeotermal, Kapalı Devre, Koku ve Emülsiyon',
    intent: 'Saha Analizi Sonrası Program Teklifi',
    targetRegions: 'Denizli, Aydın, Manisa, Afyon ve Çukurova sanayi',
    keywords: [
      'jeotermal kireç önleyici',
      'jeotermal silika inhibitörü',
      'jeotermal korozyon inhibitörü',
      'sera jeotermal su şartlandırma',
      'kapalı devre korozyon inhibitörü',
      'molibdat kapalı devre kimyasalı',
      'eşanjör kireç temizleyici',
      'atıksu emülsiyon kırıcı',
      'h2s koku giderici kimyasal',
      'havalandırma havuzu köpük kesici'
    ]
  }
];

const PAGE_CLUSTER_IDS = {
  '/': ['baz_asit_alkali', 'su_sartlandirma', 'saf_su_medipure', 'bolgesel_geo_osb'],
  '/urunler': ['baz_asit_alkali', 'su_sartlandirma', 'atiksu_polimer', 'jeotermal_sartlandirma', 'sektorel_proses'],
  '/sistemler': ['su_aritma_sistemleri', 'saf_su_medipure'],
  '/sektorler': ['sektorel_proses', 'jeotermal_sartlandirma', 'bolgesel_geo_osb'],
  '/hizmet-bolgeleri': ['bolgesel_geo_osb', 'jeotermal_sartlandirma'],
  '/teknik-bilgi': ['su_sartlandirma', 'atiksu_polimer', 'saf_su_medipure'],
  '/teklif-al': ['bolgesel_geo_osb', 'su_aritma_sistemleri', 'saf_su_medipure'],
  '/iletisim': ['bolgesel_geo_osb']
};

export function keywordsForPath(pathname) {
  const ids = PAGE_CLUSTER_IDS[pathname] || PAGE_CLUSTER_IDS['/'];
  const byId = new Map(SEO_KEYWORD_CLUSTERS.map((cluster) => [cluster.id, cluster]));
  const picked = [];
  ids.forEach((id) => {
    const words = byId.get(id)?.keywords || [];
    words.slice(0, 6).forEach((word) => picked.push(word));
  });
  return picked.slice(0, 24).join(', ');
}

/**
 * Arcwater ilhamlı: "Suyun ve Kimyanın Döngüsünde Nerelerdeyiz?"
 * 5 Aşamalı İnteraktif Endüstriyel Su & Proses Yaşam Döngüsü
 */
export const WATER_CHEMICAL_LIFECYCLE = [
  {
    step: '01',
    id: 'dogal-su-ve-on-aritma',
    title: 'Doğal Su Kaynakları & Ön Arıtma',
    subtitle: 'Kuyu, Nehir ve Şebeke Sularının Proses Hazırlığı',
    summary: 'Ham sudaki askıda katı madde (AKM), bulanıklık, demir-mangan, organik yük ve serbest klorun çok katmanlı filtrasyon ve ön şartlandırma kimyasallarıyla giderilmesi.',
    activeChemicals: ['Sodyum Hipoklorit (%15)', 'PAC Koagülant', 'Kuvars Kumu & Antrasit', 'Aktif Karbon & Katyonik Reçine'],
    systems: ['Multimedya Kum Filtreleri', 'Demir-Mangan Giderme Üniteleri', 'Endüstriyel Tandem Su Yumuşatma', 'Otomatik Klor Dozaj Sistemleri'],
    metrics: ['SDI < 3.0 Çıkış Garantisi', '0 °dH Sertlik Kontrolü', '%98+ AKM Giderimi'],
    ctaHref: '/sistemler'
  },
  {
    step: '02',
    id: 'ters-osmoz-ve-saf-su',
    title: 'Ters Osmoz (RO) & Ultra Saf Su (EDI)',
    subtitle: 'Yüksek Saflıkta Proses ve Kazan Besi Suyu Üretimi',
    summary: 'Yüksek silisli ve sert kuyu sularının membran tıkanması olmadan yüksek geri kazanım oranıyla saflaştırılması; enerji ve elektronik/cam sanayi için <0.1 µS/cm ultra saf su üretimi.',
    activeChemicals: ['Fosfonat / Dendrimer RO Antiskalant', 'Asidik & Bazik Membran CIP Yıkama', 'SBS Klor Giderici', 'DBNPA Membran Biyositi'],
    systems: ['Endüstriyel Tek/Çift Geçişli RO', 'Ultrafiltrasyon (UF) Ön Arıtma', 'Elektrodeiyonizasyon (EDI) Üniteleri', 'PLC / SCADA Otomasyon Panoları'],
    metrics: ['240 ppm Silis Toleransı', '18.2 MΩ·cm Ultra Saf Su', '%75–85 Su Geri Kazanımı'],
    ctaHref: '/sistemler#medipure-katalog'
  },
  {
    step: '03',
    id: 'proses-kule-ve-kazan',
    title: 'Proses, Soğutma Kulesi & Buhar Kazanı',
    subtitle: 'Isı Transferi, Korozyon, Kışır ve Mikrobiyolojik Koruma',
    summary: 'Açık/kapalı soğutma devreleri, buhar kazanları ve haddehane/reaktör ceketlerinde kireç taşını, oksijen çukurlaşmasını (pitting) ve Legionella/biyofilm oluşumunu sıfırlayan şartlandırma.',
    activeChemicals: ['PBTC / HEDP / TTA İnhibitörleri', 'DEHA Uçucu Oksijen Tutucu', 'Nötralize Edici Kondens Aminleri', 'DBNPA & CMIT/MIT Biyositler'],
    systems: ['Otomatik İletkenlik & pH Blöf Panoları', 'Oransal Kimyasal Dozaj İstasyonları', 'Korozyon Kuponu & LSI İzleme Raporu', '65 Bar Yüksek Basınç Kazan Programı'],
    metrics: ['%8–12 Yakıt Tasarrufu', '< 5 ppb Çözünmüş Oksijen', 'COC 4–7 Döngü Artışı'],
    ctaHref: '/urunler'
  },
  {
    step: '04',
    id: 'atik-su-aritma-ve-camur',
    title: 'Atık Su Arıtma & Çamur Susuzlaştırma',
    subtitle: 'Kimyasal Flokülasyon, Renk Giderimi ve Dekantör Verimi',
    summary: 'Kimyasal ve biyolojik atıksu arıtma tesislerinde hızlı faz ayrımı, ağır metal/fosfat çökeltimi, tekstil renk giderimi ve dekantör/belt-pres çamur kek kuruluğunun maksimize edilmesi.',
    activeChemicals: ['PAC (%17-%30) & Demir III Klorür (%40)', 'Anyonik Polielektrolit (A-PAM)', 'Katyonik Polielektrolit (C-PAM)', 'Köpük Kesiciler (Antifoam)'],
    systems: ['Otomatik Polimer Hazırlama & Dozaj Ünitesi', 'Yerinde 6’lı Jar-Test Optimizasyonu', 'Tufal Çukuru & Lamelli Çökeltici Dozajı', 'Biyolojik Arıtma Mikrobesin Desteği'],
    metrics: ['< 30 sn Flok Çökme Hızı', '%25–35 Çamur Kek Kuruluğu', '%15–30 Polimer Tasarrufu'],
    ctaHref: '/teklif-al?type=water'
  },
  {
    step: '05',
    id: 'desarj-ve-geri-kazanim',
    title: 'Deşarj, Sıfır Atık & Su Geri Kazanımı',
    subtitle: 'Sürdürülebilirlik, Karbon Ayak İzi Azaltımı ve ZLD',
    summary: 'Arıtılmış atıksuyun UF + RO membran teknolojileri ve ileri oksidasyon ile yeniden proses suyuna dönüştürülmesi; su maliyetlerini ve çevresel deşarj yükünü minimize eden 360° mühendislik.',
    activeChemicals: ['İleri Oksidasyon & Dezenfektanlar', 'Geri Kazanım RO Antiskalantları', 'Biyofilm Önleyici Şartlandırıcılar', 'Koku & H₂S Gidericiler'],
    systems: ['Atıksu Geri Kazanım UF + RO Tesisleri', 'Online Debi, pH, AKM & KOİ İzleme', '360° Mühendislik & Karbon Azaltım Raporu', 'Periyodik Bakım & SLA Servis Yönetimi'],
    metrics: ['%60–85 Proses Suyu Geri Kazanımı', 'Çevre Mevzuatına %100 Uyum', 'Düşük Karbon & Su Ayak İzi'],
    ctaHref: '/teklif-al?type=project'
  }
];

/**
 * Arcwater ilhamlı: "Toplam Su & Kimya Yönetimi" ve "360° Otomasyon & Pano Mühendisliği" Sekmeli Yapı
 */
export const ENGINEERING_360_TABS = {
  total_water: {
    label: 'Toplam Su & Kimya Yönetimi',
    badge: 'Kimyasal + Proses Sinerjisi',
    items: [
      {
        code: '01',
        title: 'Endüstriyel Su Arıtma & Membran Teknolojileri',
        desc: 'Kuyu, nehir ve şebeke sularından proses kalitesinde su üreten Ters Osmoz (RO), Ultrafiltrasyon (UF), EDI ve demineralizasyon tesisleri.',
        specs: '1 – 250 m³/saat Kapasite • Paslanmaz Şase',
        href: '/sistemler'
      },
      {
        code: '02',
        title: 'Soğutma Kulesi & Buhar Kazanı Şartlandırma',
        desc: 'Isı eşanjörleri, soğutma kuleleri ve yüksek basınçlı buhar kazanlarında kışır, korozyon ve biyofilm riskini ortadan kaldıran özel formülasyonlar.',
        specs: 'LSI Korozyon Etüdü • Otomatik Blöf & Dozaj',
        href: '/urunler'
      },
      {
        code: '03',
        title: 'Atık Su Arıtma, Polimer & Su Geri Kazanımı',
        desc: 'Koagülant (PAC, FeCl₃), Anyonik/Katyonik Polielektrolit tedariki, yerinde Jar-Test optimizasyonu ve atıksu geri kazanım mühendisliği.',
        specs: 'Yerinde 6’lı Jar-Test • Sıfır Atık Hedefi',
        href: '/teklif-al?type=water'
      },
      {
        code: '04',
        title: 'Dökme Baz Kimyasallar, Asit & Alkali Lojistiği',
        desc: 'Sodyum Hipoklorit, Kostik Soda, HCl, H₂SO₄ ve proses kimyasallarının ADR sertifikalı tanker, IBC ve paletli ambalajlarla kesintisiz sevkiyatı.',
        specs: 'Çukurova 2–4 Saat Sevk • Parti Bazlı COA/SDS',
        href: '/teklif-al'
      }
    ]
  },
  automation_engineering: {
    label: '360° Mühendislik, Pano & Otomasyon',
    badge: 'Ölçülebilir & İzlenebilir Sistemler',
    items: [
      {
        code: '01',
        title: 'Projelendirme, Su Analizi & 360° Mühendislik',
        desc: 'Tesisinizin ham su ve proses karakteristiğine göre P&ID akış şemalarının çizimi, kütle dengesi hesabı ve doğru ekipman/kimyasal seçimi.',
        specs: 'Doğrulanmış Su Analizi • Kapasite Hesabı',
        href: '/teklif-al?type=project'
      },
      {
        code: '02',
        title: 'Elektrik, MCC & Kimyasal Dozaj Pano İmalatları',
        desc: 'Endüstriyel arıtma tesisleri ve otomatik kimyasal dozaj istasyonları için IP65 standartlarında MCC ve PLC kontrol panolarının üretimi.',
        specs: 'IP65 Endüstriyel Pano • Oransal Dozaj Kontrolü',
        href: '/sistemler'
      },
      {
        code: '03',
        title: 'PLC / SCADA Otomasyon & Online Sensör İzleme',
        desc: 'pH, ORP, İletkenlik (µS/cm), Bulanıklık ve serbest klor sensörleriyle kimyasal tüketimini ve su kalitesini 7/24 ölçülebilir ve izlenebilir kılan otomasyon.',
        specs: 'Online Sensör Entegrasyonu • Uzaktan İzleme',
        href: '/sistemler'
      },
      {
        code: '04',
        title: 'Saha Montajı, Devreye Alma & Membran CIP Servisi',
        desc: 'Anahtar teslim mekanik/elektrik saha montajı, RO membran CIP kimyasal yıkama, reçine/kum/aktif karbon medya değişimi ve periyodik bakım.',
        specs: 'Yerinde Teknik Servis • SLA Bakım Sözleşmesi',
        href: '/iletisim'
      }
    ]
  }
};

function upsertMetaTag(attrName, attrValue, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Her sayfa geçişinde SEO meta etiketlerini ve GEO (Yapay Zeka & Rich Snippet)
 * çok katmanlı JSON-LD (@graph) şemasını günceller.
 */
export function applyDynamicPageSeoAndGeo(pathname, customSeoSettings = null) {
  const isNoIndex = pathname.startsWith('/admin') || pathname.startsWith('/portal');
  upsertMetaTag(
    'name',
    'robots',
    isNoIndex
      ? 'noindex, nofollow, noarchive'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );

  if (isNoIndex) {
    document.title = pathname.startsWith('/admin')
      ? 'Elif Kimya Yönetim Paneli | Kurumsal ERP, CRM & Muhasebe'
      : 'Elif Kimya Müşteri Portalı | Teklif & Sipariş Takibi';
    return;
  }

  const baseSeo = pageSEO[pathname] || pageSEO['/'];

  const title = (pathname === '/' && customSeoSettings?.siteTitle)
    ? customSeoSettings.siteTitle
    : baseSeo.title;
  const description = (pathname === '/' && customSeoSettings?.metaDescription)
    ? customSeoSettings.metaDescription
    : baseSeo.description;
  const keywords = customSeoSettings?.metaKeywords || keywordsForPath(pathname);
  const canonical = baseSeo.canonical || `https://elifkimya.web.app${pathname === '/' ? '/' : pathname}`;

  document.title = title;
  upsertMetaTag('name', 'description', description);
  upsertMetaTag('name', 'keywords', keywords);

  // Bölgesel GEO Meta Etiketleri (Adana / Çukurova Merkez)
  upsertMetaTag('name', 'geo.region', 'TR-01');
  upsertMetaTag('name', 'geo.placename', 'Adana, Çukurova, Türkiye');
  upsertMetaTag('name', 'geo.position', '37.0000;35.3213');
  upsertMetaTag('name', 'ICBM', '37.0000, 35.3213');

  // OpenGraph & Twitter
  upsertMetaTag('property', 'og:title', title);
  upsertMetaTag('property', 'og:description', description);
  upsertMetaTag('property', 'og:url', canonical);
  upsertMetaTag('property', 'og:locale', 'tr_TR');
  upsertMetaTag('name', 'twitter:title', title);
  upsertMetaTag('name', 'twitter:description', description);

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonical);

  // Dinamik JSON-LD @graph Oluşturma (Google Rich Results + AI Overviews / GEO)
  const breadcrumbNames = {
    '/': 'Ana Sayfa',
    '/urunler': 'Endüstriyel Kimyasal Ürünler',
    '/sistemler': 'Su Arıtma & Otomasyon Sistemleri',
    '/sektorler': 'Sektörel Proses Çözümleri',
    '/hizmet-bolgeleri': 'Hizmet Bölgeleri & OSB Lojistiği',
    '/teknik-bilgi': 'Teknik Belge Merkezi (SDS/TDS/COA)',
    '/teklif-al': 'Kurumsal Teklif & Su Analizi Talebi',
    '/iletisim': 'İletişim & Merkez Depo'
  };

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Elif Kimya',
      item: 'https://elifkimya.web.app/'
    }
  ];
  if (pathname !== '/' && breadcrumbNames[pathname]) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: breadcrumbNames[pathname],
      item: canonical
    });
  }

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['ChemicalManufacturer', 'Organization', 'LocalBusiness'],
        '@id': 'https://elifkimya.web.app/#organization',
        name: 'Elif Kimya',
        legalName: 'Elif Kimya Sanayi ve Ticaret',
        url: 'https://elifkimya.web.app/',
        logo: 'https://elifkimya.web.app/logo.svg',
        image: 'https://elifkimya.web.app/assets/hero-chemical.jpg',
        description,
        telephone: '+905425903626',
        email: 'info@elifkimya.com.tr',
        priceRange: '$$$',
        hasMap: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x15288751a6fd9097:0xffc6bfce58ff18ef?sa=X&ved=1t:8290&ictx=111',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ova Mah. Şakirpaşa Cd. No:269',
          addressLocality: 'Seyhan',
          addressRegion: 'Adana',
          postalCode: '01080',
          addressCountry: 'TR'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 36.9854,
          longitude: 35.2658
        },
        areaServed: [
          { '@type': 'City', name: 'Adana' },
          { '@type': 'City', name: 'Mersin' },
          { '@type': 'City', name: 'Hatay' },
          { '@type': 'City', name: 'Osmaniye' },
          { '@type': 'City', name: 'Gaziantep' },
          { '@type': 'City', name: 'Kayseri' },
          { '@type': 'City', name: 'Niğde' },
          { '@type': 'City', name: 'Kahramanmaraş' },
          { '@type': 'City', name: 'Denizli' },
          { '@type': 'City', name: 'Aydın' },
          { '@type': 'City', name: 'Manisa' },
          { '@type': 'City', name: 'Afyonkarahisar' },
          { '@type': 'Country', name: 'Türkiye' }
        ],
        knowsAbout: [
          'Endüstriyel Su Şartlandırma Kimyasalları',
          'Soğutma Kulesi ve Buhar Kazanı Kimyasalları',
          'Jeotermal Kireç, Silika ve Korozyon Şartlandırması',
          'Ters Osmoz (RO) Antiskalant ve Membran CIP Kimyasalları',
          'Endüstriyel Su Arıtma Sistemleri (RO, EDI, UF, Su Yumuşatma)',
          'Medipure Laboratuvar ve Endüstriyel Saf Su Cihazları',
          'Atık Su Arıtma Koagülantları (PAC, Demir III Klorür) ve Polielektrolitler',
          'Sodyum Hipoklorit, Kostik Soda, Hidroklorik ve Sülfürik Asit Tedariki',
          'PLC / SCADA Su Arıtma Otomasyonu ve Dozaj Panoları'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Elif Kimya Endüstriyel Kimyasal ve Su Arıtma Kataloğu',
          itemListElement: productCategories.map((cat, idx) => ({
            '@type': 'OfferCatalog',
            position: idx + 1,
            name: cat.title,
            description: cat.shortDesc
          }))
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: breadcrumbItems
      },
      {
        '@type': 'WebSite',
        '@id': 'https://elifkimya.web.app/#website',
        url: 'https://elifkimya.web.app/',
        name: 'Elif Kimya',
        inLanguage: 'tr-TR',
        publisher: { '@id': 'https://elifkimya.web.app/#organization' }
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: 'tr-TR',
        isPartOf: { '@id': 'https://elifkimya.web.app/#website' },
        about: { '@id': 'https://elifkimya.web.app/#organization' }
      },
      {
        '@type': 'ItemList',
        '@id': 'https://elifkimya.web.app/sistemler#medipure-katalog',
        name: `Medipure saf su cihaz kataloğu (${MEDIPURE_PRODUCT_COUNT} model)`,
        numberOfItems: MEDIPURE_CATEGORIES.length,
        itemListElement: MEDIPURE_CATEGORIES.map((category, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: category.title,
          description: `${category.products.length} model. ${category.summary}`
        }))
      }
    ]
  };

  if (pathname === '/') {
    graphSchema['@graph'].push({
      '@type': 'FAQPage',
      '@id': 'https://elifkimya.web.app/#faq',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    });
  }

  let schemaScript = document.getElementById('dynamic-seo-geo-schema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'dynamic-seo-geo-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }
  schemaScript.textContent = JSON.stringify(graphSchema);
}

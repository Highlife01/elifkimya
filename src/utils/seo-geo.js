/**
 * Elif Kimya — İleri Seviye SEO, GEO (Generative Engine Optimization) & Anahtar Kelime Motoru
 * Ayrıca Arcwater (360° Su Döngüsü & Otomasyon Mühendisliği) + AsiaPlast (B2B Endüstriyel Tedarik)
 * hibrit mimari veri modellerini barındırır.
 */

import { faqItems, productCategories } from '../data/products.js';
import { findPublicRoute } from '../pages/seo-landings.js';
import { MEDIPURE_CATEGORIES, MEDIPURE_PRODUCT_COUNT } from '../data/medipure-catalog.js';

const RAW_KEYWORD_CLUSTERS = [
  {
    id: 'cevre_atiksu_kimya',
    title: '1. Çevre Kimyasalları, Atık Su Arıtma, Koagülant & Polielektrolit',
    intent: 'Jar-Test Odaklı Çevre Mühendisliği & Arıtma Tesisi Satınalması',
    targetRegions: 'Adana, Mersin, Gaziantep, İskenderun, Kayseri & Türkiye OSB Arıtmaları',
    keywords: [
      'elif çevre kimya',
      'çevre ve atıksu arıtma kimyasalları',
      'polialüminyum klorür pac %17 %30 sıvı toz',
      'demir iii klorür %40 koagülant',
      'alüminyum sülfat katı sıvı',
      'anyonik polielektrolit a-pam flokülant',
      'katyonik polielektrolit çamur susuzlaştırma',
      'dekantör ve belt pres polimeri',
      'tekstil atıksu renk giderici kimyasal',
      'silikonlu ve silikonsuz köpük kesici antifoam',
      'atıksu emülsiyon kırıcı kimyasal',
      'bakteri ve mikrobesin kültürleri'
    ]
  },
  {
    id: 'baz_asit_alkali',
    title: '2. Temel Baz Kimyasallar, Endüstriyel Asitler & Alkaliler',
    intent: 'Yüksek Hacimli Endüstriyel Satınalma (ADR Tanker / 1000 kg IBC / Palet)',
    targetRegions: 'Adana Seyhan Merkez Depo, Mersin, İskenderun, Gaziantep, Kayseri, 81 İl',
    keywords: [
      'sodyum hipoklorit %15-16 sıvı klor fiyat',
      'kostik soda naoh %48 sıvı tedarikçisi',
      'payet kostik %99 fiyat adana',
      'hidroklorik asit hcl %32 dökme tanker',
      'sülfürik asit %98 endüstriyel',
      'nitrik asit %56 %65 tedarikçisi',
      'hidrojen peroksit %50 teknik',
      'fosforik asit %85 teknik ve gıda',
      'sitrik asit monohidrat anhidrat',
      'adr belgeli kimyasal tanker nakliye'
    ]
  },
  {
    id: 'su_sartlandirma',
    title: '3. Soğutma Kulesi, Buhar Kazanı & Kapalı Devre Su Şartlandırma',
    intent: 'Teknik Mühendislik, LSI Etüdü & Sözleşmeli Şartlandırma',
    targetRegions: 'Çukurova, İç Anadolu, Güneydoğu ve Ege Sanayi Tesisleri',
    keywords: [
      'soğutma kulesi şartlandırma kimyasalları',
      'buhar kazanı suyu şartlandırma kimyasalları',
      'pbtc hedp korozyon ve kışır önleyici inhibitör',
      'deha uçucu oksijen tutucu kimyasal',
      'kondens hattı koruyucu nötralize edici amin',
      'dbnpa biyosit legionella kontrolü',
      'izotiyazolin cmit mit yosun önleyici biyosit',
      'kapalı devre sodyum molibdat korozyon inhibitörü',
      'eşanjör ve kazan kışır sökücü descaler',
      'su şartlandırma firmaları adana'
    ]
  },
  {
    id: 'ro_membran_cip',
    title: '4. Ters Ozmoz (RO) Membran Antiskalant & CIP Yıkama Kimyasalları',
    intent: 'Membran Ömrü Uzatma, Yüksek Silis Kontrolü & CIP Bakım',
    targetRegions: 'Yüksek Silisli Kuyu Suyu Kullanan Tüm Endüstriyel Tesisler',
    keywords: [
      'ters osmoz ro antiskalant fiyat',
      '240 ppm yüksek silis antiskalantı',
      'fosfonat ve dendrimer bazlı ro antiskalant',
      'ro membran asidik cip yıkama kimyasalı',
      'ro membran alkali cip organik temizleyici',
      'sodyum metabisülfit sbs klor giderici',
      'membran koruyucu biyosit dbnpa',
      'ultrasaf su edi reçine ve membran bakımı'
    ]
  },
  {
    id: 'su_aritma_sistemleri',
    title: '5. 360° Endüstriyel Su Arıtma Sistemleri, Pano & Otomasyon',
    intent: 'Anahtar Teslim EPC Proje, Pano İmalatı & Periyodik Servis',
    targetRegions: 'Türkiye Geneli & Orta Doğu / Afrika / Balkanlar İhracat',
    keywords: [
      'endüstriyel su arıtma sistemleri adana',
      'endüstriyel ters osmoz ro sistemi fiyatları',
      'edi elektrodeiyonizasyon ultra saf su sistemi',
      'ultrafiltrasyon uf su arıtma ünitesi',
      'tandem endüstriyel su yumuşatma sistemi',
      'multimedya kum ve aktif karbon filtrasyon',
      'demir mangan giderme filtre sistemleri',
      'oransal kimyasal dozaj pompası ve panosu',
      'plc scada su arıtma otomasyon panosu',
      'atıksu geri kazanım sıfır atık zld projeleri'
    ]
  },
  {
    id: 'saf_su_medipure',
    title: '6. Medipure Saf Su, Ultra Saf Su ve Deiyonize Cihazlar (163 Model)',
    intent: 'Laboratuvar, Medikal, Kozmetik ve Endüstriyel Saf Su Cihaz Teklifi',
    targetRegions: 'Adana Merkez ve Türkiye Geneli Laboratuvar / Fabrika Kurulumu',
    keywords: [
      'medipure saf su cihazı',
      'laboratuvar ultra saf su cihazı 18.2 megohm',
      'laboratuvar saf su cihazı fiyat',
      'biyokimya otoanalizör saf su cihazı',
      'mikrobiyoloji saf su sistemi',
      'sterilizasyon otoklav su arıtma sistemi',
      'medikal hemodiyaliz saf su sistemi',
      'deiyonize saf su cihazı reçineli',
      'mobil saf su ve mobil ultra saf su cihazı',
      'kozmetik ve metal kaplama saf su sistemi',
      'elektrodeiyonizasyon edi saf su cihazı',
      'endüstriyel saf su cihazı katalog'
    ]
  },
  {
    id: 'jeotermal_sartlandirma',
    title: '7. Jeotermal Kuyu, Eşanjör, Silika & H₂S Koku Şartlandırma',
    intent: 'Brine Analizi ve Kupon Ölçümü Odaklı Saha Programı',
    targetRegions: 'Denizli, Aydın, Manisa, Afyonkarahisar ve Jeotermal Sera Bölgeleri',
    keywords: [
      'jeotermal kireç önleyici antiskalant',
      'jeotermal silika dispersant ve inhibitörü',
      'jeotermal kuyu ve hat korozyon inhibitörü',
      'sera ve bölgesel ısıtma jeotermal su şartlandırma',
      'plakalı eşanjör kireç ve silis temizleyici',
      'h2s hidrojen sülfür koku giderici kimyasal',
      'jeotermal brine analizi ve korozyon kuponu'
    ]
  },
  {
    id: 'sektorel_proses',
    title: '8. Ağır Sanayi, Haddehane, Kağıt, Cam, Kalsit & Metal Yüzey İşlem',
    intent: 'Fabrika Üretim Müdürü, İşletme Şefi & Teknik Satınalma',
    targetRegions: 'İskenderun, Payas, Osmaniye, Adana, Mersin, Niğde, Kayseri, Gaziantep',
    keywords: [
      'demir çelik haddehane tufal çukuru polimeri',
      'asitleme hattı pickling inhibitörü hcl',
      'kağıt sanayi retansiyon polimeri ve biyosit',
      'deterjan hammaddeleri labsa %96 sles %70',
      'niğde mikronize kalsit yaş öğütme dispersantı',
      'düzcam float kalay banyosu molibdat inhibitörü',
      'metal yüzey işlem alkali yağ alma ve fosfatlama',
      'sulu boya kabini boya çürütme detackifier',
      'tekstil boyahane sıfır sertlik proses suyu',
      'enerji santrali demineralize su hazırlama'
    ]
  },
  {
    id: 'bolgesel_geo_osb',
    title: '9. Bölgesel OSB & GEO (Yapay Zeka Arama) Otorite Kelimeleri',
    intent: 'Yerel & Bölgesel Hızlı Teslimat / Acil IBC & Tanker Sevkiyatı',
    targetRegions: 'Ova Mah. Şakirpaşa Cd. No:269 Seyhan/Adana Merkez • Çukurova • İç ve Güneydoğu Anadolu',
    keywords: [
      'elif çevre kimya adana',
      'elifcevrekimya.com.tr',
      'adana seyhan şakirpaşa kimya deposu',
      'adana hacı sabancı osb endüstriyel kimyasal',
      'mersin tarsus osb su arıtma ve çevre kimya',
      'iskenderun payas demir çelik kimyasal tedarikçisi',
      'osmaniye osb su şartlandırma ve polimer',
      'gaziantep başpınar osb atıksu ve çevre kimyasalları',
      'kayseri ve niğde osb kimyasal sevkiyat',
      'kahramanmaraş tekstil ve kağıt kimyasalları',
      'çukurova dökme kimyasal tanker sevkiyatı',
      'mersin limanı ihracat kimyasal tedarikçisi'
    ]
  }
];

export const SEO_KEYWORD_CLUSTERS = RAW_KEYWORD_CLUSTERS.map((c) => ({
  ...c,
  clusterTitle: c.title,
  searchIntent: c.intent,
  geoFocus: c.targetRegions,
  primaryKeywords: c.keywords
}));

const PAGE_CLUSTER_IDS = {
  '/': ['cevre_atiksu_kimya', 'baz_asit_alkali', 'su_sartlandirma', 'saf_su_medipure', 'bolgesel_geo_osb'],
  '/urunler': ['cevre_atiksu_kimya', 'baz_asit_alkali', 'su_sartlandirma', 'ro_membran_cip', 'jeotermal_sartlandirma', 'sektorel_proses'],
  '/sistemler': ['su_aritma_sistemleri', 'saf_su_medipure', 'ro_membran_cip'],
  '/sektorler': ['sektorel_proses', 'cevre_atiksu_kimya', 'jeotermal_sartlandirma', 'bolgesel_geo_osb'],
  '/hizmet-bolgeleri': ['bolgesel_geo_osb', 'cevre_atiksu_kimya', 'jeotermal_sartlandirma'],
  '/teknik-bilgi': ['su_sartlandirma', 'ro_membran_cip', 'cevre_atiksu_kimya', 'saf_su_medipure'],
  '/teklif-al': ['bolgesel_geo_osb', 'cevre_atiksu_kimya', 'su_aritma_sistemleri', 'saf_su_medipure'],
  '/iletisim': ['bolgesel_geo_osb', 'cevre_atiksu_kimya']
};

export function keywordsForPath(pathname) {
  let key = pathname;
  if (!PAGE_CLUSTER_IDS[key]) {
    if (pathname.startsWith('/urunler')) key = '/urunler';
    else if (pathname.startsWith('/sistemler')) key = '/sistemler';
    else if (pathname.startsWith('/sektorler')) key = '/sektorler';
    else if (pathname.startsWith('/hizmet-bolgeleri')) key = '/hizmet-bolgeleri';
    else if (pathname.startsWith('/teknik-bilgi')) key = '/teknik-bilgi';
    else key = '/';
  }
  const ids = PAGE_CLUSTER_IDS[key] || [];
  const byId = new Map(SEO_KEYWORD_CLUSTERS.map((cluster) => [cluster.id, cluster]));
  const picked = [];
  ids.forEach((id) => {
    const words = byId.get(id)?.keywords || [];
    words.slice(0, 6).forEach((word) => picked.push(word));
  });
  return picked.slice(0, 28).join(', ');
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
      ? 'Elif Çevre Kimya Yönetim Paneli | Kurumsal ERP, CRM & Muhasebe'
      : 'Elif Çevre Kimya Müşteri Portalı | Teklif & Sipariş Takibi';
    return;
  }

  const record = findPublicRoute(pathname);
  if (!record) {
    document.title = 'Sayfa bulunamadı | Elif Çevre Kimya';
    upsertMetaTag('name', 'description', 'Bu adres Elif Çevre Kimya (www.elifcevrekimya.com.tr) sitesinde bulunamadı.');
    upsertMetaTag('name', 'robots', 'noindex, nofollow');
    const staleCanonical = document.querySelector('link[rel="canonical"]');
    staleCanonical?.remove();
    return;
  }

  const baseSeo = {
    title: record.title,
    description: record.description,
    canonical: record.canonical
  };

  const title = (pathname === '/' && customSeoSettings?.siteTitle)
    ? customSeoSettings.siteTitle
    : baseSeo.title;
  const description = (pathname === '/' && customSeoSettings?.metaDescription)
    ? customSeoSettings.metaDescription
    : baseSeo.description;
  const keywords = customSeoSettings?.metaKeywords || keywordsForPath(pathname);
  const canonical = baseSeo.canonical || `https://www.elifcevrekimya.com.tr${pathname === '/' ? '/' : pathname}`;

  document.title = title;
  upsertMetaTag('name', 'description', description);
  upsertMetaTag('name', 'keywords', keywords);

  // Bölgesel GEO Meta Etiketleri (Seyhan / Adana, Çukurova Merkez)
  upsertMetaTag('name', 'geo.region', 'TR-01');
  upsertMetaTag('name', 'geo.placename', 'Seyhan, Adana, Çukurova, Türkiye');
  upsertMetaTag('name', 'geo.position', '36.9854;35.2658');
  upsertMetaTag('name', 'ICBM', '36.9854, 35.2658');

  // OpenGraph & Twitter
  upsertMetaTag('property', 'og:site_name', 'Elif Çevre Kimya');
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
      name: 'Elif Çevre Kimya',
      item: 'https://www.elifcevrekimya.com.tr/'
    }
  ];
  if (pathname !== '/' && breadcrumbNames[pathname]) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: breadcrumbNames[pathname],
      item: canonical
    });
  } else if (pathname !== '/' && record.kind !== 'hub') {
    const parentPath = `/${pathname.split('/').filter(Boolean)[0]}`;
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: breadcrumbNames[parentPath] || 'Elif Çevre Kimya',
      item: `https://www.elifcevrekimya.com.tr${parentPath}`
    });
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: record.h1,
      item: canonical
    });
  }

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': 'https://www.elifcevrekimya.com.tr/#organization',
        name: 'Elif Çevre Kimya',
        alternateName: ['Elif Kimya', 'Elif Çevre ve Endüstriyel Kimya'],
        legalName: 'Elif Çevre Kimya Sanayi ve Ticaret',
        url: 'https://www.elifcevrekimya.com.tr/',
        sameAs: [
          'https://www.elifcevrekimya.com.tr',
          'https://elifkimya.web.app'
        ],
        logo: 'https://www.elifcevrekimya.com.tr/logo.svg',
        image: 'https://www.elifcevrekimya.com.tr/assets/hero-chemical.jpg',
        description,
        telephone: '+905464992342',
        email: 'info@elifkimya.com.tr',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+905464992342',
            email: 'satis@elifkimya.com.tr',
            contactType: 'sales',
            areaServed: 'TR',
            availableLanguage: ['Turkish', 'English']
          },
          {
            '@type': 'ContactPoint',
            telephone: '+905464992342',
            email: 'info@elifkimya.com.tr',
            contactType: 'customer support',
            areaServed: 'TR',
            availableLanguage: ['Turkish']
          }
        ],
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
          'Çevre Kimyası ve Endüstriyel Atık Su Arıtma Kimyasalları',
          'Polialüminyum Klorür (PAC %17 Sıvı / %30 Toz), Demir III Klorür ve Polielektrolitler',
          'Endüstriyel Su Şartlandırma Kimyasalları',
          'Soğutma Kulesi ve Buhar Kazanı Kimyasalları',
          'Jeotermal Kireç, Silika ve Korozyon Şartlandırması',
          'Ters Osmoz (RO) Antiskalant ve Membran CIP Kimyasalları',
          'Endüstriyel Su Arıtma Sistemleri (RO, EDI, UF, Su Yumuşatma)',
          'Medipure Laboratuvar ve Endüstriyel Saf Su Cihazları (15 Kategori, 163 Model)',
          'Sodyum Hipoklorit, Kostik Soda, Hidroklorik ve Sülfürik Asit Tedariki',
          'PLC / SCADA Su Arıtma Otomasyonu ve Dozaj Panoları'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Elif Çevre Kimya Endüstriyel Kimyasal, Çevre Kimyası ve Su Arıtma Kataloğu',
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
        '@id': 'https://www.elifcevrekimya.com.tr/#website',
        url: 'https://www.elifcevrekimya.com.tr/',
        name: 'Elif Çevre Kimya',
        inLanguage: 'tr-TR',
        publisher: { '@id': 'https://www.elifcevrekimya.com.tr/#organization' }
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: 'tr-TR',
        isPartOf: { '@id': 'https://www.elifcevrekimya.com.tr/#website' },
        about: { '@id': 'https://www.elifcevrekimya.com.tr/#organization' }
      },
      ...(record.kind === 'hub' ? [] : [{
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: record.h1,
        description: record.description,
        serviceType: record.kind,
        url: canonical,
        provider: { '@id': 'https://www.elifcevrekimya.com.tr/#organization' },
        areaServed: { '@type': 'Country', name: 'Türkiye' }
      }]),
      {
        '@type': 'ItemList',
        '@id': 'https://www.elifcevrekimya.com.tr/sistemler#medipure-katalog',
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
      '@id': 'https://www.elifcevrekimya.com.tr/#faq',
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

/**
 * Elif Kimya - Çukurova & Doğu Akdeniz Mega Sanayi Proses Matrisi,
 * Finansal Mühendislik (ROI) Hesaplayıcıları ve B2B Kurumsal Satış Playbook Verisi
 *
 * Kapsam: Adana (AOSB), Mersin (MTOSB & Liman), Osmaniye OSB,
 * Hatay (İskenderun/Payas/Dörtyol), Niğde OSB & Bor, Kayseri OSB & Mimarsinan.
 */

export const megaIndustrialProcesses = [
  {
    id: 'demir-celik-haddehane',
    code: 'PROSES-01',
    sectorTitle: 'Demir-Çelik & Sıcak/Soğuk Haddehaneler',
    regionFocus: 'İskenderun · Payas · Dörtyol · Osmaniye OSB · Adana',
    badge: 'Ağır Metalurji & Tufal/Asitleme',
    summary: 'Sıcak haddeleme tufal çukurları (scale pit), merdane emülsiyon kırma, HCl asitleme banyoları ve kristalizatör kapalı devre soğutma şartlandırması.',
    formulations: [
      {
        name: 'Haddehane Tufal Çökeltme Polimeri (Scale Pit Flocculant)',
        activeIngredient: 'Ultra Yüksek Molekül Ağırlıklı Anyonik Poliakrilamid (A-PAM)',
        technicalSpecs: 'İntrinsik Viskozite (IV): > 15 – 18 dl/g | MW: 18 – 24 Milyon Dalton | Şarj: %20–30 mol anyonik akrilat',
        mechanism: '1000°C–1200°C sıcak haddelemede 150–250 bar su spreyleriyle sökülen Fe₂O₃ ve Fe₃O₄ taneciklerini Ca²⁺ ve Fe²⁺ köprüleri üzerinden "bridging" mekanizmasıyla saniyeler içinde çöktürür.',
        dosage: '0.8 – 2.5 g/m³ (0.8 – 2.5 ppm)'
      },
      {
        name: 'Yağ Emülsiyon Kırıcı (Demulsifier)',
        activeIngredient: 'Yüksek Katyonik Şarjlı Poliamin / PoliDADMAC + Alüminyum Klorohidrat (ACH) Hibrit',
        technicalSpecs: 'Yüksek katyonik yük yoğunluğu | Zeta potansiyeli nötralizasyonu',
        mechanism: 'Merdane yatakları ve hidrolik kaçaklardan tufal suyuna karışan emülsifiye yağ damlacıklarının negatif elektriksel çift katmanını nötralize ederek yağı yüzeyde sıyırıcılar (oil skimmer) için toplar.',
        dosage: '15 – 40 ppm'
      },
      {
        name: 'Asitleme Hatları Asit İnhibitörü (Pickling Acid Inhibitor)',
        activeIngredient: 'Kuaterner Amonyum Tuzları, Propargil Alkol Etoksilatları, Tiyoüre Türevleri ve Mannich Bazları',
        technicalSpecs: '%18–%32 HCl ve H₂SO₄ Banyoları | Korozyon Önleme Verimi: > %98',
        mechanism: 'Metalik demir yüzeyinde monomoleküler koruyucu film oluşturarak hidrojen çıkış reaksiyonunu (Fe + 2HCl → FeCl₂ + H₂↑) bloke eder; baz metali eritmeden yalnızca Fe₂O₃ oksit/tufal tabakasını çözer.',
        dosage: 'Asit hacmi başına %0.1 – %0.3 (1 – 3 kg / ton saf asit)'
      },
      {
        name: 'Sürekli Döküm (CCM) Kristalizatör & Sprey Soğutma Programı',
        activeIngredient: 'HEDP + PBTC + AA/AMPS Kopolimeri (MW: 4.500 Da) + Toliltriazol (TTA) + Sodyum Molibdat',
        technicalSpecs: 'Primer Kapalı Devre Kalıp & Sekonder Açık Devre Sprey Kuleleri',
        mechanism: 'Yüksek ısı akısı altında kalsiyum çökelmesini, demir oksit birikimini ve bakır/çelik korozyonunu eşzamanlı engeller.',
        dosage: 'Aktif madde bazında 25 – 50 ppm'
      }
    ]
  },
  {
    id: 'deterjan-sulfonasyon',
    code: 'PROSES-02',
    sectorTitle: 'Entegre Deterjan & Sülfonasyon Tesisleri',
    regionFocus: 'Adana Hacı Sabancı OSB (AOSB) · Mersin · Gaziantep',
    badge: 'Ekzotermik Reaktör & Yüksek KOİ',
    summary: 'SO₃ gazı ile LABSA/SLES üretimi yapan ekzotermik sülfonasyon reaktörlerinin ceket soğutması ve yüksek anyonik yüklü atık su arıtımı.',
    formulations: [
      {
        name: 'Sülfonatör Reaktör Gömlek Soğutma Şartlandırıcısı',
        activeIngredient: 'PBTC (2-Fosfonobütan-1,2,4-trikarboksilik asit) Kopolimeri + Polialkil Glikol Biyodispersantı',
        technicalSpecs: 'Termal Kararlılık: 45°C–55°C+ | ΔH = -180 kJ/mol Ekzotermik Yük | LSI +1.5 / +2.2 Güvencesi',
        mechanism: 'Yüksek ısı transfer yüzeylerinde kristal yapısını bozarak anlık kışırlaşmayı ve reaktör aşırı ısınma riskini sıfırlar.',
        dosage: '30 – 45 ppm sürekli dozaj'
      },
      {
        name: 'Yüksek Anyonik Yüklü & Köpüklü Atık Su Programı',
        activeIngredient: 'Emülsiyon Parçalayıcı Katyonik Poliamin + CaCl₂ Şelat Kırıcı + Modifiye Polidimetilsiloksan Antifoam',
        technicalSpecs: 'KOİ > 15.000 mg/L | Anyonik Yüzey Aktif (MBAS) > 2.000 mg/L Uyumlu',
        mechanism: 'Tank yıkama ve formülasyon sularındaki yoğun yüzey aktif madde köpüğünü bastırır, şelatları kırarak kimyasal çöktürme verimini maksimize eder.',
        dosage: 'Jar-test ile prosese özel (50 – 250 ppm)'
      }
    ]
  },
  {
    id: 'kagit-oluklu-mukavva',
    code: 'PROSES-03',
    sectorTitle: 'Kağıt, Karton ve Oluklu Mukavva Tesisleri',
    regionFocus: 'Adana AOSB · Tarsus · Kayseri · Kahramanmaraş',
    badge: 'Retansiyon, Silikonsuz Antifoam & Slimisit',
    summary: 'Kağıt makinesi kafa kutusu (headbox) lif tutumu, koli bandı tutuşunu bozmayan yağ alkollü köpük kesiciler ve beyaz su slimisit kontrolü.',
    formulations: [
      {
        name: 'Retansiyon ve Drenaj Polimeri (C-PAM)',
        activeIngredient: 'Yüksek Katyonik Şarjlı Poliakrilamid (ADAME Quat Monomerli C-PAM)',
        technicalSpecs: 'Molekül Ağırlığı: 8 – 12 Milyon Dalton | Şarj: %15 – %25 mol katyonik',
        mechanism: 'Elek altı beyaz suyundaki ince lif ve dolgu kaybını önleyerek First Pass Retention (FPR) değerini %65 seviyesinden %85 üzerine taşır.',
        dosage: '150 – 350 gram / ton kuru kağıt'
      },
      {
        name: 'Yağ Alkollü Su Bazlı Köpük Kesici (Silikonsuz Defoamer)',
        activeIngredient: 'C₁₆ – C₂₂ Etoksillenmiş Yağ Alkolleri ve Yağ Asidi Esterleri Emülsiyonu',
        technicalSpecs: '%100 Silikonsuz Formül | Sıfır "Fish-Eye" Leke Riski',
        mechanism: 'Hamur hazırlama (pulper) ve elek altı çukurunda mikro-köpüğü kırar; silikon içermediği için ambalaj kağıdında yağ lekesi bırakmaz ve koli bantlarının yapışmasını engellemez.',
        dosage: '250 – 500 gram / ton kağıt'
      },
      {
        name: 'Beyaz Su Devresi Biyosit / Slimisit Programı',
        activeIngredient: 'DBNPA (%20 Aktif) + İzotiazolinon (CMIT/MIT %1.5) Sinerjik Kombinasyon',
        technicalSpecs: '40°C–50°C Kapalı Devre Beyaz Su | 15 Dakikada Hızlı Oksidasyon',
        mechanism: 'DBNPA elektrofilik brom gruplarıyla bakteri tiyol enzimlerini 15 dakikada etkisizleştirir, kağıt kopmalarına yol açan slime tabakasını engeller ve biyolojik arıtmaya zarar vermeden parçalanır.',
        dosage: 'Günde 2 kez 45 dk boyunca 50 – 100 ppm şok dozaj'
      }
    ]
  },
  {
    id: 'cam-ambalaj-duzcam',
    code: 'PROSES-04',
    sectorTitle: 'Düzcam, Cam Ambalaj ve Krom/Soda Sanayisi',
    regionFocus: 'Mersin · Tarsus OSB · Adana',
    badge: '1550°C Fırın Soğutma & <0.1 µS/cm Optik Saflık',
    summary: 'Float cam eritme fırınları elektrot kapalı devre soğutması ve Low-E kaplamalı cam yıkama hatları için ultra saf su şartlandırması.',
    formulations: [
      {
        name: 'Fırın Elektrot Ceketleri Nitritsiz Kapalı Devre İnhibitörü',
        activeIngredient: 'Sodyum Molibdat (Na₂MoO₄) + Benzotriazol (BZT)',
        technicalSpecs: '1550°C Float Fırın Elektrot Devresi | Nitritsiz & Bakteriyel Bozunmasız',
        mechanism: 'Geleneksel nitritin aksine bakteriyel nitrifikasyona uğramaz ve soğutma suyunun elektriksel iletkenliğini yükseltmeden termal şok altında korozyonu önler.',
        dosage: 'Sistem suyunda 200 – 350 ppm MoO₄²⁻'
      },
      {
        name: 'Low-E Optik Cam Yıkama Ultra Saf Su Programı',
        activeIngredient: 'Fosfatsız Polimerik RO Antiskalantı + EDI + Nükleer Kalite Mixed-Bed Reçine',
        technicalSpecs: 'Çıkış İletkenliği: < 0.1 µS/cm | Direnç: > 10 – 18.2 MΩ·cm',
        mechanism: 'Vakum kaplama öncesi cam yüzeyinde mikroskobik mineral lekesi kalmasını engelleyen sıfır iletkenlikte su kalitesi sağlar.',
        dosage: 'RO giriş suyuna 2.5 – 4.5 ppm antiskalant'
      }
    ]
  },
  {
    id: 'nigde-kalsit-maden',
    code: 'PROSES-05',
    sectorTitle: 'Mikronize Kalsit ve Endüstriyel Mineral Öğütme',
    regionFocus: 'Niğde OSB · Bor · Aksaray · Adana',
    badge: 'Yaş Öğütme Poliakrilat Dispersantı',
    summary: 'Bilyalı değirmenlerde yüksek katı madde (%72–76) oranında mikronize kalsit çamuru üretimi için dar molekül ağırlıklı dispersantlar.',
    formulations: [
      {
        name: 'Kalsit Yaş Öğütme Dispersantı (NaPA Homopolimer)',
        activeIngredient: 'Düşük Molekül Ağırlıklı Sodyum Poliakrilat Homopolimeri (NaPA)',
        technicalSpecs: 'Molekül Ağırlığı: 3.500 – 4.500 Da (Dar Polidispersite İndeksi)',
        mechanism: 'Mikronize edilen CaCO₃ taneciklerinin yüzeyinde güçlü negatif elektrostatik yük oluşturarak aglomerasyonu önler; %72–76 katı madde oranında düşük viskoziteli akışkanlık sağlar.',
        dosage: 'Kuru kalsit tonu başına 3.5 – 6.5 kg aktif polimer'
      }
    ]
  },
  {
    id: 'kayseri-boru-galvaniz',
    code: 'PROSES-06',
    sectorTitle: 'Çelik Boru, Profil ve Sıcak Daldırma Galvaniz',
    regionFocus: 'Kayseri OSB · Mimarsinan OSB · İncesu · Osmaniye',
    badge: 'Hidrojen Kırılganlığı Önleyici İnhibitör & Yağ Alma',
    summary: 'Galvaniz öncesi alkali/asidik daldırma yağ alma, HCl asitleme inhibitörü ve flaks banyosu şartlandırma çözümleri.',
    formulations: [
      {
        name: 'Galvaniz HCl Asitleme & Hidrojen Kırılganlığı İnhibitörü',
        activeIngredient: 'Mannich Reaksiyon Ürünleri + Kuaterner Benzil Alkil Amonyum Klorür',
        technicalSpecs: 'Aşırı Dağlama (Over-Pickling) ve Hydrogen Embrittlement Önleyici',
        mechanism: 'Çelik boru yüzeyindeki tufali çözerken ana metalin çözünmesini ve hidrojen atomlarının çelik kristal kafesine difüzyonunu durdurur; çinko kaplama kalitesini korur.',
        dosage: '1 – 2.5 kg / ton HCl asit'
      },
      {
        name: 'Daldırma Banyo Ağır Yağ Sökücü & Pasivasyon',
        activeIngredient: 'İyonik Olmayan Yüzey Aktif + Silikat/Fosfat Tamponlu Alkali Kombinasyon',
        technicalSpecs: '50°C–75°C Daldırma Banyoları | Uzun Banyo Ömrü',
        mechanism: 'Hadde ve şekillendirme yağlarını banyo yüzeyine ayırarak çelik boruyu asitleme ve çinko kaplamaya kusursuz hazırlar.',
        dosage: '%3 – %6 banyo konsantrasyonu'
      }
    ]
  }
];

export const b2bOfferPrograms = [
  {
    id: 'korozyon-lsi-checkup',
    code: 'PROGRAM 01',
    badge: 'ÜCRETSİZ SAHA DENETİMİ',
    title: 'Ücretsiz Tesis Korozyon (mpy) & LSI Isı Transfer Risk Raporu',
    subtitle: 'Mevcut su şartlandırma programınızın bağımsız laboratuvar doğrulaması',
    description: 'Adana AOSB laboratuvar ekibimiz tesisinizin soğutma kulesi, kazan veya tufal havuzundan 3 adet numune alır; pH, iletkenlik, klorür, silika, Langelier Doygunluk İndeksi (LSI) ve korozyon hızınızı (mpy) ölçerek mevcut tedarikçinizin koruma performansını bağımsız raporla sunar.',
    deliverables: [
      'Sahadan 15 dakikada 3 kritik noktadan numune alımı',
      '6 saat içinde akredite cihazlarla tam su ve korozyon analizi',
      'Yönetime sunulabilir "Tesis Korozyon ve Isı Transfer Risk Raporu"'
    ],
    ctaLabel: 'Ücretsiz Risk Raporu Randevusu Al'
  },
  {
    id: 'canli-jar-test',
    code: 'PROGRAM 02',
    badge: 'YERİNDE LABORATUVAR KANITI',
    title: 'Fabrikanızda Canlı 6’lı Jar-Test Karşılaştırma Gösterimi',
    subtitle: 'Mevcut polimeriniz ile Elif Kimya formülasyonunu kendi suyunuzda yan yana test edin',
    description: 'Taşınabilir 6’lı Jar-Test cihazımızla fabrikanızın laboratuvarına geliyoruz. Mevcut kullandığınız koagülant/flokülant ile Elif Kimya özel formülasyonunu aynı ppm dozajda kendi tufal veya atık suyunuzda çalıştırıyor, çökme hızını ve su berraklığını saniye bazında birlikte ölçüyoruz.',
    deliverables: [
      'Fabrikanızın gerçek proses/atık suyunda birebir yan yana test',
      'Flok büyüklüğü, çökme süresi (saniye) ve bulanıklık (NTU) karşılaştırması',
      'Optimum ppm dozaj ve yıllık tonaj tasarruf hesabı'
    ],
    ctaLabel: 'Fabrikamda Canlı Jar-Test İste'
  },
  {
    id: 'pilot-30-gun',
    code: 'PROGRAM 03',
    badge: 'SIFIR FİNANSAL RİSK',
    title: 'Tali Ünitede 30 Günlük "Risk-Free" Pilot Deneme Protokolü',
    subtitle: 'Ana üretim hattınıza dokunmadan, performans şartlı 30 gün deneme',
    description: 'Ana üretim hattınızı riske atmadan, tesisinizin tali bir soğutma kulesinde veya arıtma ünitesinde 30 gün boyunca ürünümüzü uyguluyoruz. 30 gün sonunda korozyon kuponu tartılır; korozyon hızı < 1 mpy hedefini ve sıfır kışır şartını sağlamazsak hiçbir bedel talep etmiyoruz.',
    deliverables: [
      'Başlangıç ve 30. gün korozyon kuponu (mpy) tartım raporu',
      'Haftalık saha mühendisi takibi ve dozaj kalibrasyonu',
      'Performans hedefine bağlı şeffaf onay mekanizması'
    ],
    ctaLabel: '30 Günlük Pilot Protokolü Başlat'
  },
  {
    id: 'vmi-konsinye-tank',
    code: 'PROGRAM 04',
    badge: 'OTONOM LOJİSTİK & SIFIR STOK YÜKÜ',
    title: 'VMI Konsinye Telemetrik Tank & Kullandıkça Öde Modeli',
    subtitle: 'Kimyasalı deponuza biz kuruyoruz, siz yalnızca tükettiğiniz kadar ödüyorsunuz',
    description: 'Fabrikanızın dozaj sahasına GSM/IoT ultrasonik seviye sensörlü 1000 kg IBC veya paslanmaz tanklarımızı kuruyoruz. Seviye %30’a indiğinde Adana lojistik merkezimize otomatik uyarı düşer ve siz sipariş açmadan tankınız yenilenir. Ay sonunda yalnızca sayaçtan geçen tüketim faturalandırılır.',
    deliverables: [
      'Ultrasonik GSM/IoT sensörlü tank kurulumu ve otomatik ikmal',
      'Sıfır stok finansmanı: Tükettiğiniz kadar ay sonu ödeme',
      'Adana merkezden 2–4 saatte kesintisiz ikmal güvencesi'
    ],
    ctaLabel: 'Konsinye (VMI) Teklifi İste'
  }
];

export const decisionMakerMatrix = [
  {
    role: 'Fabrika Genel Müdürü / İcra Kurulu',
    primaryKpi: 'Tesis OEE Oranı, Yıllık Üretim Bütçesi, Sıfır Çevre & İSG Cezası',
    coreRisk: 'Su veya ekipman kaynaklı plansız fabrika duruşu, deşarj aşımı ve itibar riski',
    valueProposition: 'Tesisinizde su ve kimyasal kaynaklı plansız duruş riskini sıfıra indiren, Adana merkezden 2 saatte yerinde mühendislik ve müdahale kalkanı.'
  },
  {
    role: 'Üretim / Haddehane / Kağıt İşletme Müdürü',
    primaryKpi: 'Hat Tonajı, Merdane/Kalıp/Keçe Ömrü, Düşük Ürün Fire Oranı',
    coreRisk: 'Hadde merdanesinin kireçten çatlaması, kağıdın elekten kopması, sprey nozul tıkanması',
    valueProposition: 'Ultra yüksek viskoziteli polimerimizle tufal havuzunda saniyeler içinde berraklaşma; silikonsuz köpük kesici ve inhibitörlerle sıfır yüzey kusuru.'
  },
  {
    role: 'Enerji ve Yardımcı Tesisler Müdürü',
    primaryKpi: 'Kazan Blöf Oranı, Doğalgaz Tüketimi, Chiller/Kule Elektrik Sarfiyatı',
    coreRisk: 'Kazan borusunun kışır nedeniyle aşırı ısınıp patlaması, soğutma kulesinde Legionella üremesi',
    valueProposition: 'Kazan borularında kışırı sıfırlayarak %5–12 doğalgaz tasarrufu sağlayan ve blöf kayıplarını düşüren veriye dayalı şartlandırma.'
  },
  {
    role: 'Çevre ve Atık Su Arıtma Müdürü',
    primaryKpi: 'Deşarj Limitlerine Uyum (KOİ, AKM, Renk, Ağır Metal), Çamur Bertaraf Tonajı',
    coreRisk: 'Çevre mevzuatı cezaları, OSB deşarj sınır aşımı, yüksek çamur nakliye/bertaraf faturası',
    valueProposition: 'Çamur kek kuruluğunu %18’den %25 seviyesine taşıyarak yıllık çamur bertaraf ve nakliye maliyetinizi %25–28 oranında düşüren polimer programı.'
  },
  {
    role: 'Satın Alma Direktörü / Tedarik Zinciri Müdürü',
    primaryKpi: 'Toplam Sahip Olma Maliyeti (TCO), Vade, Kur/Fiyat İstikrarı, Konsinye Esnekliği',
    coreRisk: 'Şehir dışı tedarikçinin kış/lojistik aksamasında malı geciktirmesi, yüksek navlun yükü',
    valueProposition: 'Marmara tedarikçilerinin 40.000–65.000 TL navlun yükünü sıfırlayan Adana AOSB yerel stok ve kullandıkça öde (VMI Konsinye) modeli.'
  }
];

export const logisticsComparisonMatrix = [
  {
    criterion: 'Normal Sevkiyat Süresi',
    marmaraCompetitor: '24 – 48 Saat (Şehirlerarası Kargo / Ambar)',
    elifKimyaAdvantage: '2 – 4 Saat (Adana, Mersin, Osmaniye, Hatay Aynı Gün)'
  },
  {
    criterion: 'Acil Durum Saha Müdahalesi',
    marmaraCompetitor: '"Yarın sabah araca veririz" (1–2 Gün Kayıp)',
    elifKimyaAdvantage: '90 Dakikada Araç ve Saha Mühendisi Tesis Kapısında'
  },
  {
    criterion: 'Tanker / Palet Başına Navlun Yükü',
    marmaraCompetitor: 'Sefer Başına 40.000 – 65.000 TL Ekstra Nakliye Maliyeti',
    elifKimyaAdvantage: 'Minimum Yerel Lojistik Maliyeti (Bölge İçi Sevkiyat)'
  },
  {
    criterion: 'Hava ve Kış Şartları Riski',
    marmaraCompetitor: 'Pozantı Geçidi veya Bolu Tüneli Kapandığında Tedarik Durur',
    elifKimyaAdvantage: 'Sıfır Geçit Riski (Çukurova Havzası Düz Karayolu Aksı)'
  },
  {
    criterion: 'Numune Su Analizi Süresi',
    marmaraCompetitor: 'Kargo ile İstanbul/Kocaeli’ye Gönderim (3–4 Gün Bekleme)',
    elifKimyaAdvantage: 'Adana Laboratuvarında 6 Saatte Tam Su & LSI Analizi'
  }
];

/**
 * HESAP 1: Haddehane Asitleme İnhibitörü ROI Hesaplayıcısı
 */
export function calculatePicklingInhibitorRoi({
  annualSteelTons = 200000,
  currentAcidKgPerTon = 20,
  targetAcidKgPerTon = 15,
  acidPricePerTonTl = 3500,
  currentMetalLossPct = 0.4,
  targetMetalLossPct = 0.1,
  steelPricePerTonTl = 25000,
  annualInhibitorCostTl = 1200000
}) {
  const steelTons = Math.max(0, Number(annualSteelTons) || 0);
  const savedAcidTons = Math.max(0, (Number(currentAcidKgPerTon) - Number(targetAcidKgPerTon)) * steelTons / 1000);
  const savedAcidValueTl = savedAcidTons * (Number(acidPricePerTonTl) || 0);

  const savedSteelTons = Math.max(0, ((Number(currentMetalLossPct) - Number(targetMetalLossPct)) / 100) * steelTons);
  const savedSteelValueTl = savedSteelTons * (Number(steelPricePerTonTl) || 0);

  const totalAnnualGainTl = Math.round(savedAcidValueTl + savedSteelValueTl);
  const inhibitorCost = Math.max(1, Number(annualInhibitorCostTl) || 1);
  const netAnnualSavingsTl = totalAnnualGainTl - inhibitorCost;
  const roiMultiplier = Number((totalAnnualGainTl / inhibitorCost).toFixed(1));

  return {
    savedAcidTons: Math.round(savedAcidTons),
    savedAcidValueTl: Math.round(savedAcidValueTl),
    savedSteelTons: Math.round(savedSteelTons),
    savedSteelValueTl: Math.round(savedSteelValueTl),
    totalAnnualGainTl,
    netAnnualSavingsTl,
    roiMultiplier
  };
}

/**
 * HESAP 2: Kağıt & Atık Su Çamur Susuzlaştırma Polimeri ROI Hesaplayıcısı
 */
export function calculateSludgeDewateringRoi({
  dailyWetSludgeTons = 50,
  currentDrySolidsPct = 18,
  targetDrySolidsPct = 25,
  disposalCostPerTonTl = 1200,
  operatingDaysPerYear = 360
}) {
  const dailyWet = Math.max(0, Number(dailyWetSludgeTons) || 0);
  const curDry = Math.max(1, Number(currentDrySolidsPct) || 18);
  const tarDry = Math.max(curDry, Number(targetDrySolidsPct) || 25);
  const costPerTon = Math.max(0, Number(disposalCostPerTonTl) || 0);
  const days = Math.max(1, Number(operatingDaysPerYear) || 360);

  const newDailyWetTons = Number(((dailyWet * curDry) / tarDry).toFixed(1));
  const dailyWaterRemovedTons = Number((dailyWet - newDailyWetTons).toFixed(1));

  const currentAnnualCostTl = Math.round(dailyWet * days * costPerTon);
  const newAnnualCostTl = Math.round(newDailyWetTons * days * costPerTon);
  const annualSavingsTl = Math.max(0, currentAnnualCostTl - newAnnualCostTl);

  return {
    newDailyWetTons,
    dailyWaterRemovedTons,
    currentAnnualCostTl,
    newAnnualCostTl,
    annualSavingsTl
  };
}

/**
 * HESAP 3: Buhar Kazanı Kireç Önleme & Doğalgaz Tasarrufu (Fuel Penalty) Hesaplayıcısı
 */
export function calculateBoilerScaleSavingsRoi({
  annualGasBillTl = 180000000,
  scaleThicknessMm = 1.0,
  annualChemicalProgramCostTl = 450000
}) {
  const gasBill = Math.max(0, Number(annualGasBillTl) || 0);
  const scaleMm = Math.max(0.2, Number(scaleThicknessMm) || 1.0);
  // 1 mm kalsiyum karbonat kışırı yaklaşık %5 yakıt kaybına yol açar
  const fuelPenaltyPct = Math.min(25, Number((scaleMm * 5).toFixed(1)));
  const annualFuelWasteTl = Math.round(gasBill * (fuelPenaltyPct / 100));
  const chemCost = Math.max(1, Number(annualChemicalProgramCostTl) || 1);
  const netAnnualSavingsTl = Math.max(0, annualFuelWasteTl - chemCost);
  const roiMultiplier = Number((annualFuelWasteTl / chemCost).toFixed(1));

  return {
    fuelPenaltyPct,
    annualFuelWasteTl,
    netAnnualSavingsTl,
    roiMultiplier
  };
}

/**
 * Elif Kimya - Çukurova & Doğu Akdeniz Mega Sanayi Proses Matrisi,
 * Finansal Mühendislik (ROI) Hesaplayıcıları ve B2B Kurumsal Satış Playbook Verisi
 *
 * Kapsam: Adana (AOSB), Mersin (MTOSB & Liman), Osmaniye OSB,
 * Hatay (İskenderun/Payas/Dörtyol), Niğde OSB & Bor, Kayseri OSB & Mimarsinan, Gaziantep OSB.
 */

export const megaIndustrialProcesses = [
  {
    id: 'demir-celik-haddehane',
    slug: 'demir-celik-haddehane',
    code: 'PROSES-01',
    sectorTitle: 'Demir-Çelik & Sıcak/Soğuk Haddehaneler',
    title: '1. Demir-Çelik Haddehaneleri & Ağır Metalurji',
    shortTitle: 'Demir-Çelik & Haddehane',
    regionFocus: 'İskenderun · Payas · Dörtyol · Osmaniye OSB · Adana',
    targetComplexes: 'Tosyalı Osmaniye, İSDEMİR, Baştuğ Metalurji, Ekinciler, Yazıcı, Atakaş ve Bölge Haddehaneleri',
    badge: 'Ağır Metalurji & Tufal/Asitleme',
    summary: 'Sıcak haddeleme tufal çukurları (scale pit), merdane emülsiyon kırma, HCl asitleme banyoları ve kristalizatör kapalı devre soğutma şartlandırması.',
    formulations: [
      {
        code: 'STL-FLOC-01',
        name: 'Haddehane Tufal Çökeltme Polimeri (Scale Pit Flocculant)',
        applicationPoint: 'Birincil ve İkincil Tufal Çukurları (150–250 bar Sıcak Hadde Sprey Suyu)',
        activeIngredient: 'Ultra Yüksek Molekül Ağırlıklı Anyonik Poliakrilamid (A-PAM)',
        technicalSpecs: 'İntrinsik Viskozite (IV): > 15 – 18 dl/g | MW: 18 – 24 Milyon Dalton | Şarj: %20–30 mol anyonik akrilat',
        mechanism: '1000°C–1200°C sıcak haddelemede 150–250 bar su spreyleriyle sökülen Fe₂O₃ ve Fe₃O₄ taneciklerini Ca²⁺ ve Fe²⁺ köprüleri üzerinden "bridging" mekanizmasıyla saniyeler içinde çöktürür.',
        dosage: '0.8 – 2.5 g/m³ (0.8 – 2.5 ppm)',
        typicalDosage: '0.8 – 2.5 g/m³ (0.8 – 2.5 ppm)',
        packaging: '25 kg Kraft Torba / 750 kg BigBag'
      },
      {
        code: 'STL-DEMUL-02',
        name: 'Yağ Emülsiyon Kırıcı (Demulsifier)',
        applicationPoint: 'Merdane Yatakları, Hidrolik Kaçaklar ve Hadde Yağlama Emülsiyon Ayırıcıları',
        activeIngredient: 'Yüksek Katyonik Şarjlı Poliamin / PoliDADMAC + Alüminyum Klorohidrat (ACH) Hibrit',
        technicalSpecs: 'Yüksek katyonik yük yoğunluğu | Zeta potansiyeli nötralizasyonu',
        mechanism: 'Merdane yatakları ve hidrolik kaçaklardan tufal suyuna karışan emülsifiye yağ damlacıklarının negatif elektriksel çift katmanını nötralize ederek yağı yüzeyde sıyırıcılar (oil skimmer) için toplar.',
        dosage: '15 – 40 ppm',
        typicalDosage: '15 – 40 ppm',
        packaging: '30 kg Bidon / 1.050 kg IBC Tank'
      },
      {
        code: 'STL-INHIB-03',
        name: 'Asitleme Hatları Asit İnhibitörü (Pickling Acid Inhibitor)',
        applicationPoint: 'Rulo Sac & Çubuk %18–%32 HCl / H₂SO₄ Sürekli ve Daldırma Asitleme Banyoları',
        activeIngredient: 'Kuaterner Amonyum Tuzları, Propargil Alkol Etoksilatları, Tiyoüre Türevleri ve Mannich Bazları',
        technicalSpecs: '%18–%32 HCl ve H₂SO₄ Banyoları | Korozyon Önleme Verimi: > %98',
        mechanism: 'Metalik demir yüzeyinde monomoleküler koruyucu film oluşturarak hidrojen çıkış reaksiyonunu (Fe + 2HCl → FeCl₂ + H₂↑) bloke eder; baz metali eritmeden yalnızca Fe₂O₃ oksit/tufal tabakasını çözer.',
        dosage: 'Asit hacmi başına %0.1 – %0.3 (1 – 3 kg / ton saf asit)',
        typicalDosage: '1 – 3 kg / ton saf HCl asit (%0.1 – %0.3)',
        packaging: '30 kg Bidon / 1.000 kg IBC Tank'
      },
      {
        code: 'STL-CCM-04',
        name: 'Sürekli Döküm (CCM) Kristalizatör & Sprey Soğutma Programı',
        applicationPoint: 'CCM Kalıp (Mold) Kapalı Devresi ve Sekonder Açık Devre Sprey Kuleleri',
        activeIngredient: 'HEDP + PBTC + AA/AMPS Kopolimeri (MW: 4.500 Da) + Toliltriazol (TTA) + Sodyum Molibdat',
        technicalSpecs: 'Primer Kapalı Devre Kalıp & Sekonder Açık Devre Sprey Kuleleri',
        mechanism: 'Yüksek ısı akısı altında kalsiyum çökelmesini, demir oksit birikimini ve bakır/çelik korozyonunu eşzamanlı engeller.',
        dosage: 'Aktif madde bazında 25 – 50 ppm',
        typicalDosage: '25 – 50 ppm (Aktif bazda)',
        packaging: '30 kg Bidon / 1.150 kg IBC Tank'
      }
    ]
  },
  {
    id: 'deterjan-sulfonasyon',
    slug: 'deterjan-sulfonasyon',
    code: 'PROSES-02',
    sectorTitle: 'Entegre Deterjan & Sülfonasyon Tesisleri',
    title: '2. Entegre Deterjan, Sülfonasyon (LABSA/SLES) & Kimya',
    shortTitle: 'Deterjan & Sülfonasyon',
    regionFocus: 'Adana Hacı Sabancı OSB (AOSB) · Mersin · Gaziantep',
    targetComplexes: 'Beyaz Kağıt & Deterjan Kompleksi (Adana AOSB), Bölge Sülfonasyon ve Kozmetik/Temizlik Tesisleri',
    badge: 'Ekzotermik Reaktör & Yüksek KOİ',
    summary: 'SO₃ gazı ile LABSA/SLES üretimi yapan ekzotermik sülfonasyon reaktörlerinin ceket soğutması, yüksek saflıkta proses suyu ve yüksek anyonik yüklü atık su arıtımı.',
    formulations: [
      {
        code: 'DET-SULF-01',
        name: 'Sülfonatör Reaktör Gömlek Soğutma Şartlandırıcısı',
        applicationPoint: 'Falling-Film SO₃ Sülfonasyon Reaktörü Ceket Soğutma ve Kule Devresi',
        activeIngredient: 'PBTC (2-Fosfonobütan-1,2,4-trikarboksilik asit) Kopolimeri + Polialkil Glikol Biyodispersantı',
        technicalSpecs: 'Termal Kararlılık: 45°C–55°C+ | ΔH = -180 kJ/mol Ekzotermik Yük | LSI +1.5 / +2.2 Güvencesi',
        mechanism: 'Yüksek ısı transfer yüzeylerinde kristal yapısını bozarak anlık kışırlaşmayı ve reaktör aşırı ısınma / renk kararması (Klett değeri bozulması) riskini sıfırlar.',
        dosage: '30 – 45 ppm sürekli dozaj',
        typicalDosage: '30 – 45 ppm sürekli dozaj',
        packaging: '30 kg Bidon / 1.150 kg IBC Tank'
      },
      {
        code: 'DET-WW-02',
        name: 'Yüksek Anyonik Yüklü & Köpüklü Atık Su Programı',
        applicationPoint: 'Reaktör/Tank Yıkama Suları ve Fizikokimyasal DAF / Çöktürme Üniteleri',
        activeIngredient: 'Emülsiyon Parçalayıcı Katyonik Poliamin + CaCl₂ Şelat Kırıcı + Modifiye Polidimetilsiloksan Antifoam',
        technicalSpecs: 'KOİ > 15.000 mg/L | Anyonik Yüzey Aktif (MBAS) > 2.000 mg/L Uyumlu',
        mechanism: 'Tank yıkama ve formülasyon sularındaki yoğun yüzey aktif madde köpüğünü bastırır, şelatları kırarak kimyasal çöktürme verimini maksimize eder.',
        dosage: 'Jar-test ile prosese özel (50 – 250 ppm)',
        typicalDosage: '50 – 250 ppm (Jar-test kalibrasyonlu)',
        packaging: '30 kg Bidon / 1.000 kg IBC Tank'
      },
      {
        code: 'DET-RAW-03',
        name: 'Yüksek Saflıkta LABSA (%96), SLES (%70) ve Sıvı Kostik Tedariki',
        applicationPoint: 'Sıvı/Toz Deterjan, Yumuşatıcı ve Endüstriyel Temizlik Formülasyon Hatları',
        activeIngredient: 'Lineer Alkil Benzen Sülfonik Asit (%96 min), Sodyum Lauril Eter Sülfat (%70 2EO), %48 Membran Kostik',
        technicalSpecs: 'Düşük Serbest Asit / Düşük 1,4-Dioksan (< 20 ppm) | Demir < 5 ppm',
        mechanism: 'Parti bazlı COA doğrulamalı, düşük demir ve ağır metal içerikli hammadde tedariki ile son üründe viskozite ve koku stabilitesi sağlar.',
        dosage: 'Reçete bazlı (%5 – %25)',
        typicalDosage: 'Formülasyon reçetesine göre (%5 – %25)',
        packaging: '220 kg Varil / 1.050 kg IBC / ADR Tanker'
      }
    ]
  },
  {
    id: 'kagit-oluklu-mukavva',
    slug: 'kagit-oluklu-mukavva',
    code: 'PROSES-03',
    sectorTitle: 'Kağıt, Karton ve Oluklu Mukavva Tesisleri',
    title: '3. Kağıt, Fluting/Testliner ve Oluklu Mukavva Fabrikaları',
    shortTitle: 'Kağıt & Oluklu Mukavva',
    regionFocus: 'Adana AOSB · Tarsus · Kayseri · Kahramanmaraş',
    targetComplexes: 'Ankutsan, Mondi Tire Kutsan, Erciyes Anadolu /Kombassan Kağıt, Kipaş & Bölge Oluklu Mukavva Tesisleri',
    badge: 'Retansiyon, Silikonsuz Antifoam & Slimisit',
    summary: 'Kağıt makinesi kafa kutusu (headbox) lif tutumu, koli bandı tutuşunu bozmayan yağ alkollü köpük kesiciler ve beyaz su slimisit kontrolü.',
    formulations: [
      {
        code: 'PAP-RET-01',
        name: 'Retansiyon ve Drenaj Polimeri (C-PAM)',
        applicationPoint: 'Kağıt Makinesi Kafa Kutusu (Headbox) Öncesi İnce Elek Besleme Hattı',
        activeIngredient: 'Yüksek Katyonik Şarjlı Poliakrilamid (ADAME Quat Monomerli C-PAM)',
        technicalSpecs: 'Molekül Ağırlığı: 8 – 12 Milyon Dalton | Şarj: %15 – %25 mol katyonik',
        mechanism: 'Elek altı beyaz suyundaki ince lif ve dolgu kaybını önleyerek First Pass Retention (FPR) değerini %65 seviyesinden %85 üzerine taşır.',
        dosage: '150 – 350 gram / ton kuru kağıt',
        typicalDosage: '150 – 350 g / ton kuru kağıt',
        packaging: '25 kg Kraft Torba / 750 kg BigBag'
      },
      {
        code: 'PAP-DEF-02',
        name: 'Yağ Alkollü Su Bazlı Köpük Kesici (Silikonsuz Defoamer)',
        applicationPoint: 'Hamur Hazırlama (Pulper), Elek Altı Beyaz Su Çukuru ve Biyolojik Arıtma',
        activeIngredient: 'C₁₆ – C₂₂ Etoksillenmiş Yağ Alkolleri ve Yağ Asidi Esterleri Emülsiyonu',
        technicalSpecs: '%100 Silikonsuz Formül | Sıfır "Fish-Eye" Leke Riski',
        mechanism: 'Hamur hazırlama (pulper) ve elek altı çukurunda mikro-köpüğü kırar; silikon içermediği için ambalaj kağıdında yağ lekesi bırakmaz ve koli bantlarının yapışmasını engellemez.',
        dosage: '250 – 500 gram / ton kağıt',
        typicalDosage: '250 – 500 g / ton kağıt',
        packaging: '30 kg Bidon / 1.000 kg IBC Tank'
      },
      {
        code: 'PAP-BIO-03',
        name: 'Beyaz Su Devresi Biyosit / Slimisit Programı',
        applicationPoint: '40°C–50°C Kapalı Devre Beyaz Su Döngüsü ve Duş Nozul Hatları',
        activeIngredient: 'DBNPA (%20 Aktif) + İzotiazolinon (CMIT/MIT %1.5) Sinerjik Kombinasyon',
        technicalSpecs: '40°C–50°C Kapalı Devre Beyaz Su | 15 Dakikada Hızlı Oksidasyon',
        mechanism: 'DBNPA elektrofilik brom gruplarıyla bakteri tiyol enzimlerini 15 dakikada etkisizleştirir, kağıt kopmalarına yol açan slime tabakasını engeller ve biyolojik arıtmaya zarar vermeden parçalanır.',
        dosage: 'Günde 2 kez 45 dk boyunca 50 – 100 ppm şok dozaj',
        typicalDosage: '50 – 100 ppm (Günde 2 kez şok dozaj)',
        packaging: '25 kg Bidon / 1.100 kg IBC Tank'
      }
    ]
  },
  {
    id: 'cam-ambalaj-duzcam',
    slug: 'cam-ambalaj-duzcam',
    code: 'PROSES-04',
    sectorTitle: 'Düzcam, Cam Ambalaj ve Krom/Soda Sanayisi',
    title: '4. Düzcam, Cam Ambalaj, Soda Külü ve Krom Kompleksleri',
    shortTitle: 'Şişecam / Cam & Soda',
    regionFocus: 'Mersin · Tarsus OSB · Adana',
    targetComplexes: 'Şişecam Mersin (Düzcam, Cam Ambalaj, Soda, Kromsan) ve Bölge Mineral/Cam İşleme Tesisleri',
    badge: '1550°C Fırın Soğutma & <0.1 µS/cm Optik Saflık',
    summary: 'Float cam eritme fırınları elektrot kapalı devre soğutması ve Low-E kaplamalı cam yıkama hatları için ultra saf su şartlandırması.',
    formulations: [
      {
        code: 'GLS-MOLY-01',
        name: 'Fırın Elektrot Ceketleri Nitritsiz Kapalı Devre İnhibitörü',
        applicationPoint: '1550°C Float Cam Eritme Fırını Elektrot Ceketleri, Kalıp ve Kompresör Kapalı Devreleri',
        activeIngredient: 'Sodyum Molibdat (Na₂MoO₄) + Benzotriazol (BZT)',
        technicalSpecs: '1550°C Float Fırın Elektrot Devresi | Nitritsiz & Bakteriyel Bozunmasız',
        mechanism: 'Geleneksel nitritin aksine bakteriyel nitrifikasyona uğramaz ve soğutma suyunun elektriksel iletkenliğini yükseltmeden termal şok altında korozyonu önler.',
        dosage: 'Sistem suyunda 200 – 350 ppm MoO₄²⁻',
        typicalDosage: '200 – 350 ppm MoO₄²⁻ rezervi',
        packaging: '30 kg Bidon / 1.150 kg IBC Tank'
      },
      {
        code: 'GLS-EDI-02',
        name: 'Low-E Optik Cam Yıkama Ultra Saf Su Programı',
        applicationPoint: 'Ayna ve Low-E Kaplama Öncesi Çift Kademeli RO + EDI + Mixed-Bed Hatları',
        activeIngredient: 'Fosfatsız Polimerik RO Antiskalantı + EDI + Nükleer Kalite Mixed-Bed Reçine',
        technicalSpecs: 'Çıkış İletkenliği: < 0.1 µS/cm | Direnç: > 10 – 18.2 MΩ·cm',
        mechanism: 'Vakum kaplama öncesi cam yüzeyinde mikroskobik mineral lekesi kalmasını engelleyen sıfır iletkenlikte su kalitesi sağlar.',
        dosage: 'RO giriş suyuna 2.5 – 4.5 ppm antiskalant',
        typicalDosage: '2.5 – 4.5 ppm RO Antiskalant + EDI Bakımı',
        packaging: '25 kg Bidon / 25 L Reçine Torbası'
      }
    ]
  },
  {
    id: 'nigde-kalsit-maden',
    slug: 'nigde-kalsit-maden',
    code: 'PROSES-05',
    sectorTitle: 'Mikronize Kalsit ve Endüstriyel Mineral Öğütme',
    title: '5. Niğde Mikronize Kalsit (CaCO₃) & Maden Öğütme Tesisleri',
    shortTitle: 'Niğde Mikronize Kalsit',
    regionFocus: 'Niğde OSB · Bor · Aksaray · Adana',
    targetComplexes: 'Omya Madencilik, Niğtaş, Mikron’S, Esen Mikronize ve Bölge Kalsit/Madencilik Tesisleri',
    badge: 'Yaş Öğütme Poliakrilat Dispersantı',
    summary: 'Bilyalı değirmenlerde yüksek katı madde (%72–76) oranında mikronize kalsit çamuru üretimi için dar molekül ağırlıklı dispersantlar.',
    formulations: [
      {
        code: 'CAL-DISP-01',
        name: 'Kalsit Yaş Öğütme Dispersantı (NaPA Homopolimer)',
        applicationPoint: 'Dikey Bilyalı Değirmenler (Wet Grinding Mills) Yüksek Katılı Slurry Üretimi',
        activeIngredient: 'Düşük Molekül Ağırlıklı Sodyum Poliakrilat Homopolimeri (NaPA)',
        technicalSpecs: 'Molekül Ağırlığı: 3.500 – 4.500 Da (Dar Polidispersite İndeksi)',
        mechanism: 'Mikronize edilen CaCO₃ taneciklerinin yüzeyinde güçlü negatif elektrostatik yük oluşturarak aglomerasyonu önler; %72–76 katı madde oranında düşük viskoziteli akışkanlık sağlar.',
        dosage: 'Kuru kalsit tonu başına 3.5 – 6.5 kg aktif polimer',
        typicalDosage: '3.5 – 6.5 kg / ton kuru CaCO₃',
        packaging: '1.200 kg IBC Tank / Dökme Tanker'
      }
    ]
  },
  {
    id: 'kayseri-boru-galvaniz',
    slug: 'kayseri-boru-galvaniz',
    code: 'PROSES-06',
    sectorTitle: 'Çelik Boru, Profil ve Sıcak Daldırma Galvaniz',
    title: '6. Kayseri Çelik Boru, Profil ve Sıcak Daldırma Galvaniz',
    shortTitle: 'Kayseri Boru & Galvaniz',
    regionFocus: 'Kayseri OSB · Mimarsinan OSB · İncesu · Osmaniye',
    targetComplexes: 'Erbosan, Hasçelik, Merkez Çelik, Boydak/Erciyes Metal ve Bölge Galvaniz Tesisleri',
    badge: 'Hidrojen Kırılganlığı Önleyici İnhibitör & Yağ Alma',
    summary: 'Galvaniz öncesi alkali/asidik daldırma yağ alma, HCl asitleme inhibitörü ve flaks banyosu şartlandırma çözümleri.',
    formulations: [
      {
        code: 'GAL-INHIB-01',
        name: 'Galvaniz HCl Asitleme & Hidrojen Kırılganlığı İnhibitörü',
        applicationPoint: 'Sıcak Daldırma Galvaniz Öncesi Tünel/Banyo HCl Asitleme Hatları',
        activeIngredient: 'Mannich Reaksiyon Ürünleri + Kuaterner Benzil Alkil Amonyum Klorür',
        technicalSpecs: 'Aşırı Dağlama (Over-Pickling) ve Hydrogen Embrittlement Önleyici',
        mechanism: 'Çelik boru yüzeyindeki tufali çözerken ana metalin çözünmesini ve hidrojen atomlarının çelik kristal kafesine difüzyonunu durdurur; çinko kaplama kalitesini korur.',
        dosage: '1 – 2.5 kg / ton HCl asit',
        typicalDosage: '1 – 2.5 kg / ton HCl asit',
        packaging: '30 kg Bidon / 1.000 kg IBC Tank'
      },
      {
        code: 'GAL-DEGR-02',
        name: 'Daldırma Banyo Ağır Yağ Sökücü & Pasivasyon',
        applicationPoint: 'Boru ve Profil Şekillendirme Sonrası Sıcak Daldırma Alkali/Asidik Yağ Alma Banyoları',
        activeIngredient: 'İyonik Olmayan Yüzey Aktif + Silikat/Fosfat Tamponlu Alkali Kombinasyon',
        technicalSpecs: '50°C–75°C Daldırma Banyoları | Uzun Banyo Ömrü',
        mechanism: 'Hadde ve şekillendirme yağlarını banyo yüzeyine ayırarak çelik boruyu asitleme ve çinko kaplamaya kusursuz hazırlar.',
        dosage: '%3 – %6 banyo konsantrasyonu',
        typicalDosage: '%3 – %6 banyo konsantrasyonu',
        packaging: '30 kg Bidon / 25 kg Kraft Torba'
      }
    ]
  }
].map((sec) => ({
  ...sec,
  UnitProcesses: sec.formulations
}));

export const MEGA_INDUSTRIAL_SECTORS = megaIndustrialProcesses;

export const b2bOfferPrograms = [
  {
    id: 'korozyon-lsi-checkup',
    aliasId: 'program-audit',
    code: 'PROGRAM 01',
    badge: 'ÜCRETSİZ SAHA DENETİMİ',
    title: 'Ücretsiz Tesis Korozyon (mpy) & LSI Isı Transfer Risk Raporu',
    subtitle: 'Mevcut su şartlandırma programınızın bağımsız laboratuvar doğrulaması',
    description: 'Adana AOSB laboratuvar ekibimiz tesisinizin soğutma kulesi, kazan veya tufal havuzundan 3 adet numune alır; pH, iletkenlik, klorür, silika, Langelier Doygunluk İndeksi (LSI) ve korozyon hızınızı (mpy) ölçerek mevcut tedarikçinizin koruma performansını bağımsız raporla sunar.',
    deliverable: '6 saat içinde akredite cihazlarla tam su, LSI ve korozyon risk raporu',
    deliverables: [
      'Sahadan 15 dakikada 3 kritik noktadan numune alımı',
      '6 saat içinde akredite cihazlarla tam su ve korozyon analizi',
      'Yönetime sunulabilir "Tesis Korozyon ve Isı Transfer Risk Raporu"'
    ],
    ctaLabel: 'Ücretsiz Risk Raporu Randevusu Al'
  },
  {
    id: 'canli-jar-test',
    aliasId: 'program-jartest',
    code: 'PROGRAM 02',
    badge: 'YERİNDE LABORATUVAR KANITI',
    title: 'Fabrikanızda Canlı 6’lı Jar-Test Karşılaştırma Gösterimi',
    subtitle: 'Mevcut polimeriniz ile Elif Kimya formülasyonunu kendi suyunuzda yan yana test edin',
    description: 'Taşınabilir 6’lı Jar-Test cihazımızla fabrikanızın laboratuvarına geliyoruz. Mevcut kullandığınız koagülant/flokülant ile Elif Kimya özel formülasyonunu aynı ppm dozajda kendi tufal veya atık suyunuzda çalıştırıyor, çökme hızını ve su berraklığını saniye bazında birlikte ölçüyoruz.',
    deliverable: 'Saniye bazlı çökme hızı, NTU bulanıklık ve yıllık tonaj tasarruf tutanağı',
    deliverables: [
      'Fabrikanızın gerçek proses/atık suyunda birebir yan yana test',
      'Flok büyüklüğü, çökme süresi (saniye) ve bulanıklık (NTU) karşılaştırması',
      'Optimum ppm dozaj ve yıllık tonaj tasarruf hesabı'
    ],
    ctaLabel: 'Fabrikamda Canlı Jar-Test İste'
  },
  {
    id: 'pilot-30-gun',
    aliasId: 'program-pilot',
    code: 'PROGRAM 03',
    badge: 'SIFIR FİNANSAL RİSK',
    title: 'Tali Ünitede 30 Günlük "Risk-Free" Pilot Deneme Protokolü',
    subtitle: 'Ana üretim hattınıza dokunmadan, performans şartlı 30 gün deneme',
    description: 'Ana üretim hattınızı riske atmadan, tesisinizin tali bir soğutma kulesinde veya arıtma ünitesinde 30 gün boyunca ürünümüzü uyguluyoruz. 30 gün sonunda korozyon kuponu tartılır; korozyon hızı < 1 mpy hedefini ve sıfır kışır şartını sağlamazsak hiçbir bedel talep etmiyoruz.',
    deliverable: '30. gün ASTM korozyon kuponu (mpy) tartım ve performans onay raporu',
    deliverables: [
      'Başlangıç ve 30. gün korozyon kuponu (mpy) tartım raporu',
      'Haftalık saha mühendisi takibi ve dozaj kalibrasyonu',
      'Performans hedefine bağlı şeffaf onay mekanizması'
    ],
    ctaLabel: '30 Günlük Pilot Protokolü Başlat'
  },
  {
    id: 'vmi-konsinye-tank',
    aliasId: 'program-vmi',
    code: 'PROGRAM 04',
    badge: 'OTONOM LOJİSTİK & SIFIR STOK YÜKÜ',
    title: 'VMI Konsinye Telemetrik Tank & Kullandıkça Öde Modeli',
    subtitle: 'Kimyasalı deponuza biz kuruyoruz, siz yalnızca tükettiğiniz kadar ödüyorsunuz',
    description: 'Fabrikanızın dozaj sahasına GSM/IoT ultrasonik seviye sensörlü 1000 kg IBC veya paslanmaz tanklarımızı kuruyoruz. Seviye %30’a indiğinde Adana lojistik merkezimize otomatik uyarı düşer ve siz sipariş açmadan tankınız yenilenir. Ay sonunda yalnızca sayaçtan geçen tüketim faturalandırılır.',
    deliverable: 'Sensörlü konsinye tank kurulumu, sıfır stok finansmanı ve ay sonu sayaç faturası',
    deliverables: [
      'Ultrasonik GSM/IoT sensörlü tank kurulumu ve otomatik ikmal',
      'Sıfır stok finansmanı: Tükettiğiniz kadar ay sonu ödeme',
      'Adana merkezden 2–4 saatte kesintisiz ikmal güvencesi'
    ],
    ctaLabel: 'Konsinye (VMI) Teklifi İste'
  }
];

export const B2B_OFFER_PROGRAMS = b2bOfferPrograms;

export const decisionMakerMatrix = [
  {
    role: 'Fabrika Genel Müdürü / İcra Kurulu',
    roleTitle: 'Fabrika Genel Müdürü / İcra Kurulu',
    primaryKpi: 'Tesis OEE Oranı, Yıllık Üretim Bütçesi, Sıfır Çevre & İSG Cezası',
    coreRisk: 'Su veya ekipman kaynaklı plansız fabrika duruşu, deşarj aşımı ve itibar riski',
    valueProposition: 'Tesisinizde su ve kimyasal kaynaklı plansız duruş riskini sıfıra indiren, Adana merkezden 2 saatte yerinde mühendislik ve müdahale kalkanı.',
    proofDocument: 'Yıllık TCO (Toplam İşletme Maliyeti) Kıyaslama Tablosu ve 30 Günlük Pilot Performans Taahhütnamesi'
  },
  {
    role: 'Üretim / Haddehane / Kağıt İşletme Müdürü',
    roleTitle: 'Üretim / Haddehane / Kağıt İşletme Müdürü',
    primaryKpi: 'Hat Tonajı, Merdane/Kalıp/Keçe Ömrü, Düşük Ürün Fire Oranı',
    coreRisk: 'Hadde merdanesinin kireçten çatlaması, kağıdın elekten kopması, sprey nozul tıkanması',
    valueProposition: 'Ultra yüksek viskoziteli polimerimizle tufal havuzunda saniyeler içinde berraklaşma; silikonsuz köpük kesici ve inhibitörlerle sıfır yüzey kusuru.',
    proofDocument: 'Sahada Canlı 6’lı Jar-Test Tutanağı, Asitleme Banyosu Demir Çözünme (Fe²⁺) Eğrisi ve Korozyon Kuponu Raporu'
  },
  {
    role: 'Enerji ve Yardımcı Tesisler Müdürü',
    roleTitle: 'Enerji ve Yardımcı Tesisler Müdürü',
    primaryKpi: 'Kazan Blöf Oranı, Doğalgaz Tüketimi, Chiller/Kule Elektrik Sarfiyatı',
    coreRisk: 'Kazan borusunun kışır nedeniyle aşırı ısınıp patlaması, soğutma kulesinde Legionella üremesi',
    valueProposition: 'Kazan borularında kışırı sıfırlayarak %5–12 doğalgaz tasarrufu sağlayan ve blöf kayıplarını düşüren veriye dayalı şartlandırma.',
    proofDocument: 'Langelier Doygunluk İndeksi (LSI) Simülasyonu, Baca Gazı Isı Kaybı Hesabı ve RO Membran Autopsy/CIP Raporu'
  },
  {
    role: 'Çevre ve Atık Su Arıtma Müdürü',
    roleTitle: 'Çevre ve Atık Su Arıtma Müdürü',
    primaryKpi: 'Deşarj Limitlerine Uyum (KOİ, AKM, Renk, Ağır Metal), Çamur Bertaraf Tonajı',
    coreRisk: 'Çevre mevzuatı cezaları, OSB deşarj sınır aşımı, yüksek çamur nakliye/bertaraf faturası',
    valueProposition: 'Çamur kek kuruluğunu %18’den %25 seviyesine taşıyarak yıllık çamur bertaraf ve nakliye maliyetinizi %25–28 oranında düşüren polimer programı.',
    proofDocument: 'Dekantör/Belt-Pres Kek Kuruluğu (% KM) Test Raporu ve Güncel SDS/GBF & COA Belgeleri'
  },
  {
    role: 'Satın Alma Direktörü / Tedarik Zinciri Müdürü',
    roleTitle: 'Satın Alma Direktörü / Tedarik Zinciri Müdürü',
    primaryKpi: 'Toplam Sahip Olma Maliyeti (TCO), Vade, Kur/Fiyat İstikrarı, Konsinye Esnekliği',
    coreRisk: 'Şehir dışı tedarikçinin kış/lojistik aksamasında malı geciktirmesi, yüksek navlun yükü',
    valueProposition: 'Marmara tedarikçilerinin 40.000–65.000 TL navlun yükünü sıfırlayan Adana AOSB yerel stok ve kullandıkça öde (VMI Konsinye) modeli.',
    proofDocument: 'Birim Ton Üretim Başına Kimyasal Maliyet Analizi, ADR Lojistik Taahhüdü ve VMI Konsinye Sözleşme Taslağı'
  }
];

export const DECISION_MAKER_MATRIX = decisionMakerMatrix;

export const logisticsComparisonMatrix = [
  {
    criterion: 'Normal Sevkiyat Süresi',
    marmaraCompetitor: '24 – 48 Saat (Şehirlerarası Kargo / Ambar)',
    marmaraSupplier: '24 – 48 Saat (Şehirlerarası Kargo / Ambar)',
    elifKimyaAdvantage: '2 – 4 Saat (Adana, Mersin, Osmaniye, Hatay Aynı Gün)',
    elifKimyaLocal: '2 – 4 Saat (Adana, Mersin, Osmaniye, Hatay Aynı Gün)',
    financialImpact: 'Emniyet stoğu bağlama maliyeti %70 düşer'
  },
  {
    criterion: 'Acil Durum Saha Müdahalesi',
    marmaraCompetitor: '"Yarın sabah araca veririz" (1–2 Gün Kayıp)',
    marmaraSupplier: '"Yarın sabah araca veririz" (1–2 Gün Kayıp)',
    elifKimyaAdvantage: '90 Dakikada Araç ve Saha Mühendisi Tesis Kapısında',
    elifKimyaLocal: '90 Dakikada Araç ve Saha Mühendisi Tesis Kapısında',
    financialImpact: 'Plansız üretim/hat duruşu riski sıfırlanır'
  },
  {
    criterion: 'Tanker / Palet Başına Navlun Yükü',
    marmaraCompetitor: 'Sefer Başına 40.000 – 65.000 TL Ekstra Nakliye Maliyeti',
    marmaraSupplier: 'Sefer Başına 40.000 – 65.000 TL Ekstra Nakliye Maliyeti',
    elifKimyaAdvantage: 'Minimum Yerel Lojistik Maliyeti (Bölge İçi Sevkiyat)',
    elifKimyaLocal: 'Minimum Yerel Lojistik Maliyeti (Bölge İçi Sevkiyat)',
    financialImpact: 'Yıllık 450.000 – 900.000 TL doğrudan navlun tasarrufu'
  },
  {
    criterion: 'Hava ve Kış Şartları Riski',
    marmaraCompetitor: 'Pozantı Geçidi veya Bolu Tüneli Kapandığında Tedarik Durur',
    marmaraSupplier: 'Pozantı Geçidi veya Bolu Tüneli Kapandığında Tedarik Durur',
    elifKimyaAdvantage: 'Sıfır Geçit Riski (Çukurova Havzası Düz Karayolu Aksı)',
    elifKimyaLocal: 'Sıfır Geçit Riski (Çukurova Havzası Düz Karayolu Aksı)',
    financialImpact: '%100 kesintisiz kış tedarik sürekliliği'
  },
  {
    criterion: 'Numune Su Analizi Süresi',
    marmaraCompetitor: 'Kargo ile İstanbul/Kocaeli’ye Gönderim (3–4 Gün Bekleme)',
    marmaraSupplier: 'Kargo ile İstanbul/Kocaeli’ye Gönderim (3–4 Gün Bekleme)',
    elifKimyaAdvantage: 'Adana Laboratuvarında 6 Saatte Tam Su & LSI Analizi',
    elifKimyaLocal: 'Adana Laboratuvarında 6 Saatte Tam Su & LSI Analizi',
    financialImpact: 'Aynı gün dozaj müdahalesi ile ekipman koruma'
  }
];

export const LOGISTICS_COMPARISON_MATRIX = logisticsComparisonMatrix;

/**
 * HESAP 1: Haddehane Asitleme İnhibitörü ROI Hesaplayıcısı
 */
export function calculatePicklingInhibitorRoi(params = {}) {
  const steelTons = Math.max(0, Number(params.annualPickledSteelTons ?? params.annualSteelTons ?? 120000));
  const curLossPct = Math.max(0, Number(params.currentMetalLossPercent ?? params.currentMetalLossPct ?? 0.65));
  const tarLossPct = Math.max(0, Number(params.targetMetalLossPercent ?? params.targetMetalLossPct ?? 0.18));
  const steelUsdPerTon = Math.max(0, Number(params.steelScrapValueUsdPerTon ?? 620));
  const steelTlPerTon = Math.max(0, Number(params.steelPricePerTonTl ?? 25000));

  const curAcidKg = Math.max(0, Number(params.currentAcidKgPerTon ?? 20));
  const tarAcidKg = Math.max(0, Number(params.targetAcidKgPerTon ?? 15));
  const acidPriceTl = Math.max(0, Number(params.acidPricePerTonTl ?? 3500));
  const acidPriceUsd = Math.max(0, Number(params.acidPriceUsdPerTon ?? 110));

  const savedSteelTons = Math.max(0, ((curLossPct - tarLossPct) / 100) * steelTons);
  const savedSteelValueUsd = Math.round(savedSteelTons * steelUsdPerTon);
  const savedSteelValueTl = Math.round(savedSteelTons * steelTlPerTon);

  const savedAcidTons = Math.max(0, ((curAcidKg - tarAcidKg) * steelTons) / 1000);
  const savedAcidValueUsd = Math.round(savedAcidTons * acidPriceUsd);
  const savedAcidValueTl = Math.round(savedAcidTons * acidPriceTl);

  const totalAnnualSavingsUsd = savedSteelValueUsd + savedAcidValueUsd;
  const totalAnnualGainTl = savedSteelValueTl + savedAcidValueTl;
  const inhibitorCost = Math.max(1, Number(params.annualInhibitorCostTl ?? 1200000));
  const netAnnualSavingsTl = totalAnnualGainTl - inhibitorCost;
  const roiMultiplier = Number((totalAnnualGainTl / inhibitorCost).toFixed(1));

  return {
    savedSteelTons: Math.round(savedSteelTons),
    savedSteelTonsPerYear: Math.round(savedSteelTons),
    savedSteelValueUsd,
    savedSteelValueTl,
    savedAcidTons: Math.round(savedAcidTons),
    savedAcidTonsPerYear: Math.round(savedAcidTons),
    savedAcidValueUsd,
    savedAcidValueTl,
    totalAnnualSavingsUsd,
    totalAnnualGainTl,
    netAnnualSavingsTl,
    roiMultiplier
  };
}

/**
 * HESAP 2: Kağıt & Atık Su Çamur Susuzlaştırma Polimeri ROI Hesaplayıcısı
 */
export function calculateSludgeDewateringRoi(params = {}) {
  const curDry = Math.max(1, Number(params.currentCakeDrynessPercent ?? params.currentDrySolidsPct ?? 19));
  const tarDry = Math.max(curDry, Number(params.targetCakeDrynessPercent ?? params.targetDrySolidsPct ?? 26));
  const costPerTon = Math.max(0, Number(params.disposalAndTransportTryPerTon ?? params.disposalCostPerTonTl ?? 1450));
  const days = Math.max(1, Number(params.operatingDaysPerYear ?? 350));

  const dailyDrySolids = params.dailyDrySolidsTons !== undefined
    ? Math.max(0.1, Number(params.dailyDrySolidsTons))
    : Math.max(0.1, (Number(params.dailyWetSludgeTons ?? 50) * curDry) / 100);

  const currentWetSludgeTonsPerDay = Number(((dailyDrySolids / curDry) * 100).toFixed(1));
  const targetWetSludgeTonsPerDay = Number(((dailyDrySolids / tarDry) * 100).toFixed(1));
  const dailyWetReductionTons = Number(Math.max(0, currentWetSludgeTonsPerDay - targetWetSludgeTonsPerDay).toFixed(1));
  const annualWetReductionTons = Math.round(dailyWetReductionTons * days);
  const savedTruckTripsPerYear = Math.round(annualWetReductionTons / 22);

  const currentAnnualCostTl = Math.round(currentWetSludgeTonsPerDay * days * costPerTon);
  const newAnnualCostTl = Math.round(targetWetSludgeTonsPerDay * days * costPerTon);
  const annualSavingsTl = Math.max(0, currentAnnualCostTl - newAnnualCostTl);

  return {
    currentWetSludgeTonsPerDay,
    targetWetSludgeTonsPerDay,
    newDailyWetTons: targetWetSludgeTonsPerDay,
    dailyWaterRemovedTons: dailyWetReductionTons,
    dailyWetReductionTons,
    annualWetReductionTons,
    savedTruckTripsPerYear,
    currentAnnualCostTl,
    newAnnualCostTl,
    annualSavingsTl,
    annualDisposalSavingsTry: annualSavingsTl
  };
}

export const calculateSludgePolymerRoi = calculateSludgeDewateringRoi;

/**
 * HESAP 3: Buhar Kazanı Kireç Önleme & Doğalgaz Tasarrufu (Fuel Penalty) Hesaplayıcısı
 */
export function calculateBoilerScaleSavingsRoi(params = {}) {
  const scaleMm = Math.max(0.2, Number(params.scaleThicknessMm ?? 2.0));
  const highSilica = params.highSilicaOrIron !== undefined ? Boolean(params.highSilicaOrIron) : true;
  const penaltyFactorPerMm = highSilica ? 7.0 : 4.5;
  const fuelPenaltyPct = Math.min(28, Number((scaleMm * penaltyFactorPerMm).toFixed(1)));

  const steamTonsPerHour = Number(params.steamCapacityTonsPerHour ?? 15);
  const gasPriceTry = Number(params.naturalGasPriceTryPerSm3 ?? 16.5);
  // 1 ton buhar için yaklaşık 72 Sm3 doğalgaz, yılda 8000 saat çalışma
  const estimatedAnnualGasSm3 = steamTonsPerHour * 72 * 8000;
  const wastedGasSm3PerYear = Math.round(estimatedAnnualGasSm3 * (fuelPenaltyPct / 100));

  const gasBill = params.annualGasBillTl !== undefined
    ? Math.max(0, Number(params.annualGasBillTl))
    : estimatedAnnualGasSm3 * gasPriceTry;

  const annualFuelWasteTl = Math.round(gasBill * (fuelPenaltyPct / 100));
  const chemCost = Math.max(1, Number(params.annualChemicalProgramCostTl ?? 450000));
  const netAnnualSavingsTl = Math.max(0, annualFuelWasteTl - chemCost);
  const roiMultiplier = Number((annualFuelWasteTl / chemCost).toFixed(1));

  return {
    fuelPenaltyPct,
    fuelPenaltyPercent: fuelPenaltyPct,
    wastedGasSm3PerYear,
    annualFuelWasteTl,
    annualFuelPenaltyTry: annualFuelWasteTl,
    netAnnualSavingsTl,
    roiMultiplier
  };
}

export const calculateBoilerScaleRoi = calculateBoilerScaleSavingsRoi;

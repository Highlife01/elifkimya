/**
 * Elif Çevre Kimya — Laboratuvar Kimyasalları, Analitik Reaktifler & HORIBA Cihaz / Elektrot / Standart Çözelti Kataloğu
 * Toplam 130 ürün (83 Analitik Laboratuvar Kimyasalı + 35 HORIBA Cihaz & Elektrot + 12 HORIBA Standart Çözelti Serisi).
 * Tüm kayıtlar ürün etiket ve üretici katalog verileriyle (marka, katalog kodu/CAS, ambalaj ve kalite sınıfı) doğrulanmıştır.
 * Kurumsal B2B politikası gereği fiyat bilgisi gösterilmez; tüm ürünler sipariş & teklif talebi usulüyle sunulur.
 */

export const LAB_CHEMICALS_COUNT = 130;

export const LAB_CHEMICAL_GROUPS = [
  {
    "id": "su-analiz-kitleri-ve-reaktifler",
    "title": "HACH, Merck Spectroquant & Su Analiz Kitleri",
    "shortTitle": "HACH & Su Analiz Kitleri",
    "blurb": "HACH LCK küvet testleri, toz reaktif yastıkları (Powder Pillows), Merck Spectroquant hücre testleri ve Chembio kitler."
  },
  {
    "id": "horiba-laquatwin-cep-cihazlari",
    "title": "HORIBA LAQUAtwin Cep Tipi pH, İletkenlik, Tuzluluk, ORP & İyon Ölçerler",
    "shortTitle": "HORIBA LAQUAtwin Cep Cihazları",
    "blurb": "Tek damla (0.1 mL) numune ile sahada ve laboratuvarda doğrudan pH, EC, TDS, tuzluluk, ORP ve spesifik iyon (Ca²⁺, NO₃⁻, Na⁺, F⁻) ölçen cep tipi cihazlar."
  },
  {
    "id": "horiba-laqua-portatif-masaustu",
    "title": "HORIBA LAQUA Masa Tipi & Portatif Çok Parametreli Su Analiz Cihazları",
    "shortTitle": "HORIBA Portatif & Masaüstü Cihazlar",
    "blurb": "Masa tipi PH2000 ve IP67 saha korumalı WQ-330-K, PC220-K, PC210-K, PH210-K, EC220-K, EC210-K, DO220-K ve DO210-K su kalitesi analiz cihazları."
  },
  {
    "id": "horiba-elektrot-ve-problar",
    "title": "HORIBA pH, İletkenlik (EC) & Çözünmüş Oksijen (DO) Elektrotları ve Probları",
    "shortTitle": "HORIBA Elektrot & Problar",
    "blurb": "ToupH darbeye dayanıklı cam pH elektrotları, kıvamlı numune ve gıda tipi pH probları, titanyum/platin iletkenlik hücreleri ve galvanik DO probları."
  },
  {
    "id": "horiba-standart-cozeltiler",
    "title": "HORIBA Standart Kalibrasyon & Elektrot Bakım Çözeltileri",
    "shortTitle": "HORIBA Çözeltileri",
    "blurb": "NIST izlenebilir pH tampon, iletkenlik (EC), iyon (ISE), ORP ve 3.33 M KCl elektrot bakım solüsyonları."
  },
  {
    "id": "analitik-asit-baz-solvent",
    "title": "Analitik Asitler, Bazlar & Çözücüler",
    "shortTitle": "Analitik Asit, Baz & Solvent",
    "blurb": "Merck Suprapur® / EMSURE®, Isolab, Honeywell ve Tekkim analitik saflıkta asitler, alkaliler ve kromatografik çözücüler."
  },
  {
    "id": "kalibrasyon-ve-standartlar",
    "title": "pH Tampon, İletkenlik & CRM Standartları",
    "shortTitle": "Tampon & CRM Standartları",
    "blurb": "Merck, Isolab, CPAChem, Mettler Toledo ve Norateks pH tampon, bulanıklık, KOİ ve element CRM standartları."
  },
  {
    "id": "titrasyon-ve-indikatorler",
    "title": "Titrisol®, Volümetrik Çözeltiler & İndikatörler",
    "shortTitle": "Titrasyon & İndikatörler",
    "blurb": "Merck Titrisol® konsantreleri, ayarlı normalite/molarite çözeltileri, indikatörler ve Kjeldahl katalizör tabletleri."
  },
  {
    "id": "analitik-tuzlar-ve-kimyasallar",
    "title": "Analitik Tuzlar & İnorganik/Organik Kimyasallar",
    "shortTitle": "Analitik Tuzlar & Kimyasallar",
    "blurb": "ACS, ISO ve Reag. Ph. Eur. saflıkta laboratuvar tuzları, standart katılar ve sentez/analiz kimyasalları."
  }
];

export const LAB_CHEMICAL_PRODUCTS = [
  {
    "code": "LAB-001",
    "name": "Norateks Murexid Mix İndikatör 25 gr",
    "brand": "NORATEKS",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "25 gr",
    "cas": "3051-09-0 (Mureksid İndikatör Karışımı)",
    "image": "/assets/lab/lab-001.jpeg",
    "summary": "Norateks Murexid Mix İndikatör (25 gr); su sertliği ve kalsiyum iyonu (Ca²⁺) analizlerinde EDTA ile yapılan kompleksometrik titrasyonlarda dönüm noktasını net olarak gözlemlemek için kullanılan katı indikatör karışımıdır.",
    "specs": [
      "Marka / Üretici: NORATEKS",
      "Katalog / CAS Bilgisi: 3051-09-0 (Mureksid İndikatör Karışımı)",
      "Ambalaj & Form: 25 gr — Kompleksometrik İndikatör Karışımı",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-002",
    "name": "Kjeldahl Katalizör Tableti Bakırlı (Cu) 500 Tablet",
    "brand": "ISOLAB",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "500 Tablet / Kutu",
    "cas": "7778-80-5 / 7758-99-8 (K₂SO₄ + CuSO₄·5H₂O)",
    "image": "/assets/lab/lab-002.jpeg",
    "summary": "Bakır sülfat ve potasyum sülfat içerikli Kjeldahl katalizör tableti (500 Tablet); su, atıksu, çamur, gıda ve tarımsal numunelerde Toplam Kjeldahl Azotu (TKN) ve protein yaş yakma (digestion) işlemlerini hızlandırmak için kullanılır.",
    "specs": [
      "Marka / Üretici: ISOLAB",
      "Katalog / CAS Bilgisi: 7778-80-5 / 7758-99-8 (K₂SO₄ + CuSO₄·5H₂O)",
      "Ambalaj & Form: 500 Tablet / Kutu — Kjeldahl Azot/Protein Analiz Katalizörü",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-003",
    "name": "HACH Klor, Serbest Toz Reaktif Paketi (0,02-2,00 mg/L) Cat. No: 2105569",
    "brand": "HACH",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "100 Test / Paket (10 mL numune)",
    "cas": "Cat. No: 2105569 (DPD Serbest Klor)",
    "image": "/assets/lab/lab-003.png",
    "summary": "HACH 2105569 DPD Serbest Klor Toz Reaktif Yastıkları (Powder Pillows); 10 mL su numunesinde 0,02 – 2,00 mg/L Cl₂ aralığında fotometrik serbest klor tayini için kullanılan, pakette 100 test içeren USEPA uyumlu reaktif setidir.",
    "specs": [
      "Marka / Üretici: HACH",
      "Katalog / CAS Bilgisi: Cat. No: 2105569 (DPD Serbest Klor)",
      "Ambalaj & Form: 100 Test / Paket (10 mL numune) — HACH Powder Pillows (USEPA DPD Metodu)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-004",
    "name": "HACH FerroVer Demir Toz Reaktifi (0,02-3,00 mg/L) Cat. No: 2105769",
    "brand": "HACH",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "100 Test / Paket (10 mL numune)",
    "cas": "Cat. No: 2105769 (FerroVer Demir)",
    "image": "/assets/lab/lab-004.png",
    "summary": "HACH 2105769 FerroVer Demir Toz Reaktif Yastıkları (Powder Pillows); 10 mL numunede 0,02 – 3,00 mg/L Fe aralığında çözünmüş ve toplam demir tayini için kullanılan, pakette 100 test içeren fotometrik reaktif setidir.",
    "specs": [
      "Marka / Üretici: HACH",
      "Katalog / CAS Bilgisi: Cat. No: 2105769 (FerroVer Demir)",
      "Ambalaj & Form: 100 Test / Paket (10 mL numune) — HACH Powder Pillows (USEPA FerroVer Metodu)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-005",
    "name": "HACH NitriVer 3 Nitrit Toz Reaktif Kiti (0,002-0,300 mg/L) Cat. No: 2107169",
    "brand": "HACH",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "100 Test / Paket (10 mL numune)",
    "cas": "Cat. No: 2107169 (NitriVer 3 Nitrit)",
    "image": "/assets/lab/lab-005.png",
    "summary": "HACH 2107169 NitriVer 3 Nitrit Toz Reaktif Yastıkları; 10 mL içme suyu, soğutma suyu veya atıksu numunesinde 0,002 – 0,300 mg/L NO₂⁻-N aralığında düşük seviye nitrit azotu tayini için kullanılan 100 testlik pakettir.",
    "specs": [
      "Marka / Üretici: HACH",
      "Katalog / CAS Bilgisi: Cat. No: 2107169 (NitriVer 3 Nitrit)",
      "Ambalaj & Form: 100 Test / Paket (10 mL numune) — HACH Powder Pillows (Diazotizasyon Metodu)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-006",
    "name": "HACH CuVer 1 Bakır Toz Reaktifi (0,04-5,00 mg/L) Cat. No: 2105869",
    "brand": "HACH",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "100 Test / Paket (10 mL numune)",
    "cas": "Cat. No: 2105869 (CuVer 1 Bakır)",
    "image": "/assets/lab/lab-006.png",
    "summary": "HACH 2105869 CuVer 1 Bakır Toz Reaktif Yastıkları; 10 mL numunede bikinkoninat yöntemiyle 0,04 – 5,00 mg/L Cu aralığında serbest ve toplam bakır tayini sağlayan, pakette 100 test içeren fotometrik reaktiftir.",
    "specs": [
      "Marka / Üretici: HACH",
      "Katalog / CAS Bilgisi: Cat. No: 2105869 (CuVer 1 Bakır)",
      "Ambalaj & Form: 100 Test / Paket (10 mL numune) — HACH Powder Pillows (Bikinkoninat Metodu)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-007",
    "name": "SRL 13250 Potasyum Dikromat Pure (%99,5) 500 g",
    "brand": "SRL",
    "group": "analitik-tuzlar-ve-kimyasallar",
    "packaging": "500 g",
    "cas": "7778-50-9 • Cat. No: 13250",
    "image": "/assets/lab/lab-007.jpeg",
    "summary": "SRL (Sisco Research Laboratories) Cat. No: 13250 Potasyum Dikromat (K₂Cr₂O₇, Pure %99,5 min., M=294,18 g/mol, CAS: 7778-50-9). KOİ (Kimyasal Oksijen İhtiyacı) analizlerinde, redoks titrasyonlarında ve laboratuvar oksidasyon işlemlerinde kullanılan 500 g ambalajlı katı reaktiftir.",
    "specs": [
      "Marka / Üretici: SRL",
      "Katalog / CAS Bilgisi: 7778-50-9 • Cat. No: 13250",
      "Ambalaj & Form: 500 g — Pure (%99,5 Min. Saflık)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-008",
    "name": "MERCK 100778 Cult-Dip Combi® Mikrobiyolojik Daldırma Slaytı (10 Test)",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "10 Test / Kutu",
    "cas": "Cat. No: 1.00778.0001 (TTC Agar / Patates Dekstroz Agar)",
    "image": "/assets/lab/lab-008.jpeg",
    "summary": "MERCK 1.00778.0001 Cult-Dip Combi® (10 Test); soğutma kulesi suları, endüstriyel proses sıvıları ve yüzeylerde toplam bakteri (TTC-Agar) ile maya ve küf (Potato Dextrose Agar) yükünü yarı-kantitatif izlemek için kullanılan çift yüzeyli daldırma slayt kitidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.00778.0001 (TTC Agar / Patates Dekstroz Agar)",
      "Ambalaj & Form: 10 Test / Kutu — Mikrobiyolojik Saha & Laboratuvar Besiyeri Kiti",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "HRB-001",
    "name": "HORIBA 9383-10D İletkenlik Elektrodu – 1 µS/cm… 100 mS/cm, K=1",
    "brand": "HORIBA",
    "group": "horiba-elektrot-ve-problar",
    "packaging": "Orijinal Yedek Sensör / Elektrot",
    "cas": "Model: 9383-10D • HORIBA Kod: 3200780927",
    "image": "/assets/horiba/horiba-001.png",
    "summary": "HORIBA 9383-10D İletkenlik Elektrodu – 1 µS/cm… 100 mS/cm, K=1 , laboratuvar ve saha uygulamalarında su ve sulu çözeltilerin elektriksel iletkenliğini ölçmek için geliştirilmiş, sıcaklık sensörlü ve suya dayanıklı daldırma tipi iletkenlik elektrodudur. Titanyum ve platin siyahı özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: 9383-10D • HORIBA Kod: 3200780927",
      "Donanım / Paket Yapısı: Orijinal Yedek Sensör / Elektrot",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-006",
    "name": "HORIBA 9615S-10D Standart ToupH Cam Gövdeli pH Elektrodu – 1 m Kablolu",
    "brand": "HORIBA",
    "group": "horiba-elektrot-ve-problar",
    "packaging": "1 m Kablolu Orijinal Elektrot",
    "cas": "Model: 9615S-10D • HORIBA Kod: 3200585428",
    "image": "/assets/horiba/horiba-006.png",
    "summary": "HORIBA 9615S-10D Standart ToupH Cam pH Elektrodu HORIBA 9615S-10D Standart ToupH Cam Gövdeli pH Elektrodu – 1 m Kablolu , genel laboratuvar uygulamalarında, tampon çözeltilerde ve sulu numunelerde hassas pH ölçümü için geliştirilmiştir. Cam gövdeli, yeniden doldurulabilir kombine özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: 9615S-10D • HORIBA Kod: 3200585428",
      "Donanım / Paket Yapısı: 1 m Kablolu Orijinal Elektrot",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-010",
    "name": "LAQUA WQ-330-K Üç Kanallı Portatif Çok Parametreli Su Analiz Cihazı",
    "brand": "HORIBA",
    "group": "horiba-laqua-portatif-masaustu",
    "packaging": "Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
    "cas": "Model: WQ-330-K • HORIBA Kod: 3200832607",
    "image": "/assets/horiba/horiba-010.png",
    "summary": "HORIBA LAQUA WQ-330-K, laboratuvar ve saha uygulamalarında su kalitesi parametrelerinin ölçümü için geliştirilmiş üç kanallı dijital ölçüm cihazıdır. Uygun sensörlerle pH, ORP, iyon, çözünmüş oksijen, iletkenlik, direnç, TDS, tuzluluk ve sıcaklık ölçümlerini destekler. Üç sensörün eş özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: WQ-330-K • HORIBA Kod: 3200832607",
      "Donanım / Paket Yapısı: Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-011",
    "name": "HORIBA LAQUA PC220-K pH/ORP/EC/TDS/Direnç/Tuzluluk/Sıcaklık Ölçer",
    "brand": "HORIBA",
    "group": "horiba-laqua-portatif-masaustu",
    "packaging": "Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
    "cas": "Model: PC220-K • HORIBA Kod: 3200779533",
    "image": "/assets/horiba/horiba-011.png",
    "summary": "HORIBA LAQUA PC220-K; pH, ORP, elektriksel iletkenlik (EC), toplam çözünmüş madde (TDS), direnç, tuzluluk ve sıcaklık ölçümleri için geliştirilmiş, iki kanallı portatif su analiz cihazıdır. 1.000 ölçüm kaydı hafızası, tarih-saat bilgisi, bilgisayar ve yazıcı bağlantısı özellikleriyle özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: PC220-K • HORIBA Kod: 3200779533",
      "Donanım / Paket Yapısı: Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-022",
    "name": "HORIBA LAQUAtwin Ca-11 Kalsiyum İyon Ölçer (Ca²⁺) 4… 9900 ppm",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: Ca-11 • HORIBA Kod: 3200689161",
    "image": "/assets/horiba/horiba-022.png",
    "summary": "HORIBA LAQUAtwin Ca-11 Kalsiyum İyon Ölçer (Ca²⁺) 4… 9900 ppm, küçük hacimli sıvı numunelerde kalsiyum iyonu (Ca²⁺) konsantrasyonunu ölçmek için geliştirilmiş, cep tipi dijital kalsiyum ölçüm cihazıdır. İyon seçici elektrot (ISE) teknolojisi sayesinde yalnızca birkaç damla numune ile özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: Ca-11 • HORIBA Kod: 3200689161",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-029",
    "name": "HORIBA LAQUAtwin EC-33 Cep Tipi İletkenlik, TDS ve Sıcaklık Ölçer 20.00... 199.99 mS/cm | 1000... 9990 ppm | 0... 50 °C",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: EC-33 • HORIBA Kod: 3999960127",
    "image": "/assets/horiba/horiba-029.png",
    "summary": "HORIBA LAQUAtwin EC-33 Cep Tipi İletkenlik, TDS ve Sıcaklık Ölçer HORIBA LAQUAtwin EC-33 Cep Tipi İletkenlik, TDS ve Sıcaklık Ölçer 20.00... 199.99 mS/cm 1000... 9990 ppm 0... 50 °C; elektriksel iletkenlik (EC), toplam çözünmüş madde (TDS) ve sıcaklık ölçümü için geliştirilmiş özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: EC-33 • HORIBA Kod: 3999960127",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-032",
    "name": "HORIBA LAQUAtwin pH-33 Cep Tipi pH ve Sıcaklık Ölçer",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: pH-33 • HORIBA Kod: 3999960124",
    "image": "/assets/horiba/horiba-032.png",
    "summary": "HORIBA LAQUAtwin pH-33, yalnızca 0,1 mL numune kullanarak pH ölçümü yapabilen, cep tipi dijital pH metredir. Düz yüzeyli cam elektrot sensörü, küçük hacimli sıvı örneklerinde pratik ölçüm yapılmasını sağlar. Uygun numune hazırlama yöntemleriyle gıda, bitki, toprak ve yarı katı özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: pH-33 • HORIBA Kod: 3999960124",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-035",
    "name": "HORIBA LAQUA PH2000 Masa Tipi pH, ORP ve Sıcaklık Ölçer",
    "brand": "HORIBA",
    "group": "horiba-laqua-portatif-masaustu",
    "packaging": "Masa Tipi Laboratuvar Cihazı",
    "cas": "Model: PH2000 • HORIBA Kod: 3200896829",
    "image": "/assets/horiba/horiba-035.png",
    "summary": "HORIBA LAQUA PH2000 , laboratuvarlarda hassas pH, oksidasyon-redüksiyon potansiyeli (ORP/mV) ve sıcaklık ölçümleri için geliştirilmiş profesyonel masa tipi analiz cihazıdır. 3200896829 ürün kodlu Avrupa versiyonu, elektrot ve kalibrasyon çözeltileri içermeyen cihaz seçeneğidir. HORIBA özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: PH2000 • HORIBA Kod: 3200896829",
      "Donanım / Paket Yapısı: Masa Tipi Laboratuvar Cihazı",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "LAB-009",
    "name": "Norateks Hidroklorik Asit Çözeltisi 1 N (1 M) 1 L",
    "brand": "NORATEKS",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 L",
    "cas": "7647-01-0 (1 mol/L HCl Çözeltisi)",
    "image": "/assets/lab/lab-009.jpeg",
    "summary": "Norateks Hidroklorik Asit 1 N (1 mol/L) 1 L; su ve atıksu laboratuvarlarında alkalinite tayini, nötralizasyon titrasyonları ve pH ayarlamalarında doğrudan kullanıma hazır volümetrik çözeltidir.",
    "specs": [
      "Marka / Üretici: NORATEKS",
      "Katalog / CAS Bilgisi: 7647-01-0 (1 mol/L HCl Çözeltisi)",
      "Ambalaj & Form: 1 L — Ayarlı Volümetrik Titrasyon Çözeltisi (1 N)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-010",
    "name": "MERCK 100441 Nitrik Asit %65 Suprapur® 1 L",
    "brand": "MERCK",
    "group": "analitik-asit-baz-solvent",
    "packaging": "1 L",
    "cas": "7697-37-2 • Cat. No: 1.00441.1000",
    "image": "/assets/lab/lab-010.png",
    "summary": "MERCK 1.00441.1000 Nitrik Asit %65 Suprapur® (1 L, CAS: 7697-37-2); ICP-MS, ICP-OES ve AAS ile yapılan ppb/ppt düzeyindeki eser metal analizlerinde ve numune parçalama (digestion) işlemlerinde ultra düşük metal safsızlığı sağlayan yüksek saflıkta asittir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 7697-37-2 • Cat. No: 1.00441.1000",
      "Ambalaj & Form: 1 L — Suprapur® (Ultra Saf Eser Analiz Kalitesi)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-011",
    "name": "ISOLAB pH 10.00 Tampon Çözeltisi (Buffer Solution) 1 L",
    "brand": "ISOLAB",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "1 L",
    "cas": "Cat. No: 959.110.1000 (pH 10.00 ±0.02 @ 20°C)",
    "image": "/assets/lab/lab-011.jpeg",
    "summary": "ISOLAB pH 10.00 Tampon Çözeltisi (1 L, 20 °C'de pH 10,00 ±0,02); laboratuvar ve saha pH elektrotlarının bazik bölge kalibrasyonu için renk kodlu ve NIST standartlarına izlenebilir referans çözeltidir.",
    "specs": [
      "Marka / Üretici: ISOLAB",
      "Katalog / CAS Bilgisi: Cat. No: 959.110.1000 (pH 10.00 ±0.02 @ 20°C)",
      "Ambalaj & Form: 1 L — NIST İzlenebilir pH Tampon Çözeltisi",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-012",
    "name": "ISOLAB pH 7.00 Tampon Çözeltisi (Buffer Solution) 1 L",
    "brand": "ISOLAB",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "1 L",
    "cas": "Cat. No: 959.107.1000 (pH 7.00 ±0.02 @ 20°C)",
    "image": "/assets/lab/lab-012.jpeg",
    "summary": "ISOLAB pH 7.00 Tampon Çözeltisi (1 L, 20 °C'de pH 7,00 ±0,02); tüm pH metre ve elektrotların nötr sıfır noktası kalibrasyonunda kullanılan standart referans tampon çözeltidir.",
    "specs": [
      "Marka / Üretici: ISOLAB",
      "Katalog / CAS Bilgisi: Cat. No: 959.107.1000 (pH 7.00 ±0.02 @ 20°C)",
      "Ambalaj & Form: 1 L — NIST İzlenebilir pH Tampon Çözeltisi",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-013",
    "name": "MERCK 100316 Hidroklorik Asit %37 EMSURE® ACS, ISO, Reag. Ph. Eur. 2,5 L",
    "brand": "MERCK",
    "group": "analitik-asit-baz-solvent",
    "packaging": "2,5 L",
    "cas": "7647-01-0 • Cat. No: 1.00316.2500",
    "image": "/assets/lab/lab-013.jpeg",
    "summary": "MERCK 1.00316.2500 Hidroklorik Asit dumanlı %37 EMSURE® ACS, ISO, Reag. Ph. Eur. (2,5 L, CAS: 7647-01-0); maksimum 0,005 ppm cıva (Hg) limiti ile kantitatif analiz, metal çözündürme ve farmakope uyumlu laboratuvar uygulamaları için üretilmiş analitik saflıkta asittir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 7647-01-0 • Cat. No: 1.00316.2500",
      "Ambalaj & Form: 2,5 L — EMSURE® ACS, ISO, Reag. Ph. Eur. (max. 0,005 ppm Hg)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-014",
    "name": "HACH LCK339 Nitrat Küvet Testi (0,23-13,50 mg/L NO₃-N) 25 Test",
    "brand": "HACH",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: LCK339 (1,0-60,0 mg/L NO₃)",
    "image": "/assets/lab/lab-014.jpeg",
    "summary": "HACH LCK339 Nitrat Küvet Testi; içme suyu, yüzey suyu ve arıtma çıkış sularında 0,23 – 13,50 mg/L NO₃-N (1,0 – 60,0 mg/L NO₃) aralığında ISO 7890-1-2-1986 ve DIN 38405 D9-2 uyumlu spektrofotometrik tayin sağlayan 25 testlik hazır küvet kitidir.",
    "specs": [
      "Marka / Üretici: HACH",
      "Katalog / CAS Bilgisi: Cat. No: LCK339 (1,0-60,0 mg/L NO₃)",
      "Ambalaj & Form: 25 Test / Kutu — HACH Barkodlu Küvet Testi (2,6-Dimetilfenol Metodu)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-015",
    "name": "HACH LCK114 KOİ (Kimyasal Oksijen İhtiyacı) Küvet Testi (150-1000 mg/L O₂) 25 Test",
    "brand": "HACH",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: LCK114 (Dikromat KOİ Küvet Testi)",
    "image": "/assets/lab/lab-015.jpeg",
    "summary": "HACH LCK114 KOİ Küvet Testi; evsel ve endüstriyel atıksularda 150 – 1000 mg/L O₂ aralığında Kimyasal Oksijen İhtiyacı (COD) tayini için kullanılan, 148 °C termoreaktör bozundurma uyumlu 25 testlik barkodlu küvet kitidir.",
    "specs": [
      "Marka / Üretici: HACH",
      "Katalog / CAS Bilgisi: Cat. No: LCK114 (Dikromat KOİ Küvet Testi)",
      "Ambalaj & Form: 25 Test / Kutu — HACH Barkodlu Küvet Testi (ISO 15705 Uyumlu)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-016",
    "name": "HACH LCK514 KOİ (Kimyasal Oksijen İhtiyacı) Küvet Testi (100-2000 mg/L O₂) 25 Test",
    "brand": "HACH",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: LCK514 (Dikromat KOİ Küvet Testi)",
    "image": "/assets/lab/lab-016.jpeg",
    "summary": "HACH LCK514 KOİ Küvet Testi; orta ve yüksek kirlilik yüküne sahip endüstriyel atıksularda 100 – 2000 mg/L O₂ aralığında hızlı ve güvenilir fotometrik KOİ analizi sağlayan 25 testlik hazır küvet setidir.",
    "specs": [
      "Marka / Üretici: HACH",
      "Katalog / CAS Bilgisi: Cat. No: LCK514 (Dikromat KOİ Küvet Testi)",
      "Ambalaj & Form: 25 Test / Kutu — HACH Barkodlu Küvet Testi (Yüksek Aralık KOİ)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-017",
    "name": "HACH LCK314 KOİ (Kimyasal Oksijen İhtiyacı) Küvet Testi (15-150 mg/L O₂) 25 Test",
    "brand": "HACH",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: LCK314 (Dikromat KOİ Küvet Testi)",
    "image": "/assets/lab/lab-017.jpeg",
    "summary": "HACH LCK314 KOİ Küvet Testi; arıtma tesisi deşarj sularında ve düşük organik yüklü numunelerde 15 – 150 mg/L O₂ aralığında ISO 15705 uyumlu hassas KOİ ölçümü için kullanılan 25 testlik küvet kitidir.",
    "specs": [
      "Marka / Üretici: HACH",
      "Katalog / CAS Bilgisi: Cat. No: LCK314 (Dikromat KOİ Küvet Testi)",
      "Ambalaj & Form: 25 Test / Kutu — HACH Barkodlu Küvet Testi (ISO 15705 Uyumlu)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-018",
    "name": "HBB CHEM İletkenlik Kalibrasyon Çözeltisi 1413 µS/cm 250 mL",
    "brand": "HBB CHEM",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "250 mL",
    "cas": "7447-40-7 (KCl 1413 µS/cm @ 25°C)",
    "image": "/assets/lab/lab-018.jpeg",
    "summary": "HBB CHEM 1413 µS/cm (@25 °C) İletkenlik Kalibrasyon Çözeltisi (250 mL); masaüstü ve portatif iletkenlik/TDS ölçerlerin hücre sabiti doğrulaması ve rutin kalibrasyonu için kullanılan potasyum klorür bazlı standart çözeltidir.",
    "specs": [
      "Marka / Üretici: HBB CHEM",
      "Katalog / CAS Bilgisi: 7447-40-7 (KCl 1413 µS/cm @ 25°C)",
      "Ambalaj & Form: 250 mL — İletkenlik (EC) Kalibrasyon Standardı",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-019",
    "name": "MERCK 109439 pH 9.00 Certipur® Tampon Çözeltisi (20 °C) 1 L",
    "brand": "MERCK",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "1 L",
    "cas": "Cat. No: 1.09439.1000 (pH 9.00 ±0.02 @ 20°C)",
    "image": "/assets/lab/lab-019.jpg",
    "summary": "MERCK 1.09439.1000 Certipur® pH 9.00 Tampon Çözeltisi (1 L, borik asit/potasyum klorür/sodyum hidroksit bazlı); 20 °C referans sıcaklığında ±0,02 pH belirsizlikle pH elektrotlarının alkali bölge kalibrasyonunda kullanılır.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.09439.1000 (pH 9.00 ±0.02 @ 20°C)",
      "Ambalaj & Form: 1 L — Certipur® SRM/NIST İzlenebilir Tampon Çözelti",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-020",
    "name": "MERCK 109435 pH 4.00 Certipur® Tampon Çözeltisi (20 °C) 1 L",
    "brand": "MERCK",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "1 L",
    "cas": "Cat. No: 1.09435.1000 (pH 4.00 ±0.02 @ 20°C)",
    "image": "/assets/lab/lab-020.jpg",
    "summary": "MERCK 1.09435.1000 Certipur® pH 4.00 Tampon Çözeltisi (1 L, sitrik asit/sodyum hidroksit/hidroklorik asit bazlı); 20 °C referans sıcaklığında ±0,02 pH doğrulukla pH cihazlarının asidik kalibrasyonunda kullanılır.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.09435.1000 (pH 4.00 ±0.02 @ 20°C)",
      "Ambalaj & Form: 1 L — Certipur® SRM/NIST İzlenebilir Tampon Çözelti",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-021",
    "name": "MERCK 109535 MQuant® pH İndikatör Stribi (pH 0-14) 100 Strip",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "100 Strip / Kutu",
    "cas": "Cat. No: 1.09535.0001 (Universal Indicator pH 0-14)",
    "image": "/assets/lab/lab-021.jpg",
    "summary": "MERCK 1.09535.0001 MQuant® pH 0–14 İndikatör Stribi (100 Strip); boya salınımı yapmayan (non-bleeding) özel ped yapısı sayesinde numuneyi kirletmeden sahada ve laboratuvarda saniyeler içinde pH 0–14 aralığında ölçüm sağlar.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.09535.0001 (Universal Indicator pH 0-14)",
      "Ambalaj & Form: 100 Strip / Kutu — MQuant® Akıtmaz (Non-Bleeding) pH Test Şeridi",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-022",
    "name": "Norateks pH 7.00 Tampon Çözeltisi 1 L",
    "brand": "NORATEKS",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "1 L",
    "cas": "pH 7.00 ±0.02 @ 25°C (Fosfat Tamponu)",
    "image": "/assets/lab/lab-022.jpeg",
    "summary": "Norateks pH 7.00 Tampon Çözeltisi (1 L); su şartlandırma, atıksu ve kalite kontrol laboratuvarlarında pH elektrotlarının nötr nokta kalibrasyonu için kullanılan hazır tampon çözeltidir.",
    "specs": [
      "Marka / Üretici: NORATEKS",
      "Katalog / CAS Bilgisi: pH 7.00 ±0.02 @ 25°C (Fosfat Tamponu)",
      "Ambalaj & Form: 1 L — Laboratuvar pH Kalibrasyon Tamponu",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-023",
    "name": "Norateks pH 4.00 Tampon Çözeltisi 1 L",
    "brand": "NORATEKS",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "1 L",
    "cas": "pH 4.00 ±0.02 @ 25°C (Ftalat Tamponu)",
    "image": "/assets/lab/lab-023.jpg",
    "summary": "Norateks pH 4.00 Tampon Çözeltisi (1 L); laboratuvar ve proses pH metrelerinin asidik eğim (slope) kalibrasyonu için kullanılan hazır kalibrasyon tampon çözeltisidir.",
    "specs": [
      "Marka / Üretici: NORATEKS",
      "Katalog / CAS Bilgisi: pH 4.00 ±0.02 @ 25°C (Ftalat Tamponu)",
      "Ambalaj & Form: 1 L — Laboratuvar pH Kalibrasyon Tamponu",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-024",
    "name": "Norateks Sodyum Tiyosülfat Çözeltisi 0,1 N (0,1 M) 1 L",
    "brand": "NORATEKS",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 L",
    "cas": "7772-98-7 (0,1 N Na₂S₂O₃ Volümetrik Çözelti)",
    "image": "/assets/lab/lab-024.png",
    "summary": "Norateks Sodyum Tiyosülfat 0,1 N (0,1 mol/L) Volümetrik Çözeltisi (1 L, CAS: 7772-98-7); iyodometrik titrasyonlarda, aktif klor ve çözünmüş oksijen (Winkler) analizlerinde kullanılır. Ürün görseli arşiv referansı olup sevkiyatlar güncel üretim ve geçerli raf ömürlü partilerden yapılır.",
    "specs": [
      "Marka / Üretici: NORATEKS",
      "Katalog / CAS Bilgisi: 7772-98-7 (0,1 N Na₂S₂O₃ Volümetrik Çözelti)",
      "Ambalaj & Form: 1 L — Ayarlı Volümetrik Titrasyon Çözeltisi (0,1 N)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-025",
    "name": "MERCK 109060 Hidroklorik Asit Çözeltisi 1 mol/L (1 N) Titripur® 1 L",
    "brand": "MERCK",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 L",
    "cas": "7647-01-0 • Cat. No: 1.09060.1000",
    "image": "/assets/lab/lab-025.jpeg",
    "summary": "MERCK 1.09060.1000 Hidroklorik Asit Çözeltisi 1 mol/L (1 N) Titripur® (1 L, CAS: 7647-01-0); NIST SRM izlenebilir faktör değerine sahip, asit-baz titrasyonları ve alkalinite analizleri için kullanıma hazır volümetrik standart çözeltidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 7647-01-0 • Cat. No: 1.09060.1000",
      "Ambalaj & Form: 1 L — Titripur® Reag. Ph. Eur., Reag. USP Volümetrik Çözelti",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-026",
    "name": "MERCK 109057 Hidroklorik Asit Çözeltisi 0,1 mol/L (0,1 N) Titripur® 1 L",
    "brand": "MERCK",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 L",
    "cas": "7647-01-0 • Cat. No: 1.09057.1000",
    "image": "/assets/lab/lab-026.png",
    "summary": "MERCK 1.09057.1000 Hidroklorik Asit Çözeltisi 0,1 mol/L (0,1 N) Titripur® (1 L, CAS: 7647-01-0); su analizlerinde P ve M alkalinitesi tayini ile hassas nötralizasyon titrasyonlarında kullanılan ayarlı volümetrik çözeltidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 7647-01-0 • Cat. No: 1.09057.1000",
      "Ambalaj & Form: 1 L — Titripur® Reag. Ph. Eur., Reag. USP Volümetrik Çözelti",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-027",
    "name": "MERCK 109137 Sodyum Hidroksit Çözeltisi 1 mol/L (1 N) Titripur® 1 L",
    "brand": "MERCK",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 L",
    "cas": "1310-73-2 • Cat. No: 1.09137.1000",
    "image": "/assets/lab/lab-027.jpeg",
    "summary": "MERCK 1.09137.1000 Sodyum Hidroksit Çözeltisi 1 mol/L (1 N) Titripur® (1 L, CAS: 1310-73-2); asitlik tayini, Kjeldahl distilasyonu ve kantitatif asit-baz titrasyonları için NIST izlenebilir hazır volümetrik çözeltidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 1310-73-2 • Cat. No: 1.09137.1000",
      "Ambalaj & Form: 1 L — Titripur® Reag. Ph. Eur., Reag. USP Volümetrik Çözelti",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-028",
    "name": "MERCK 107293 4-Aminoantipirin GR for Analysis 10 gr",
    "brand": "MERCK",
    "group": "analitik-tuzlar-ve-kimyasallar",
    "packaging": "10 gr",
    "cas": "83-07-8 • Cat. No: 1.07293.0010",
    "image": "/assets/lab/lab-028.jpeg",
    "summary": "MERCK 1.07293.0010 4-Aminoantipirin (4-Amino-2,3-dimetil-1-fenil-3-pirazolin-5-on, C₁₁H₁₃N₃O, M=203,25 g/mol, CAS: 83-07-8) 10 gr orijinal şişe; su ve atıksularda fenol indeksinin fotometrik tayininde kullanılan analitik saflıkta reaktiftir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 83-07-8 • Cat. No: 1.07293.0010",
      "Ambalaj & Form: 10 gr — GR for Analysis (Analitik Reaktif, M=203,25 g/mol)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-029",
    "name": "MERCK 114752 Spectroquant® Amonyum Testi (0,010-3,00 mg/L NH₄-N) 500 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "500 Test / Kutu",
    "cas": "Cat. No: 1.14752.0001 (İndofenol Mavisi Metodu)",
    "image": "/assets/lab/lab-029.jpeg",
    "summary": "MERCK 1.14752.0001 Spectroquant® Amonyum Testi; içme suyu, yüzey suyu ve atıksularda 0,010 – 3,00 mg/L NH₄-N aralığında EPA, APHA ve ISO 7150-1 ile uyumlu fotometrik amonyum tayini sağlayan sıvı reaktif kitidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14752.0001 (İndofenol Mavisi Metodu)",
      "Ambalaj & Form: 500 Test / Kutu — Spectroquant® Fotometrik Reaktif Kiti",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-030",
    "name": "MERCK 114895 Spectroquant® Klor Hücre Testi (0,03-6,00 mg/L Cl₂) 200 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "200 Test / Kutu",
    "cas": "Cat. No: 1.14895.0001 (DPD Serbest & Toplam Klor)",
    "image": "/assets/lab/lab-030.jpg",
    "summary": "MERCK 1.14895.0001 Spectroquant® Klor Testi (200 Test); içme suyu, soğutma suyu ve dezenfeksiyon proseslerinde 0,03 – 6,00 mg/L Cl₂ aralığında DPD yöntemiyle serbest ve toplam klor ölçümü sağlayan analiz kitidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14895.0001 (DPD Serbest & Toplam Klor)",
      "Ambalaj & Form: 200 Test / Kutu — Spectroquant® Fotometrik Test Kiti",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-031",
    "name": "MERCK 114773 Spectroquant® Nitrat Testi (0,2-20,0 mg/L NO₃-N) 100 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "100 Test / Kutu",
    "cas": "Cat. No: 1.14773.0001",
    "image": "/assets/lab/lab-031.jpeg",
    "summary": "MERCK 1.14773.0001 Spectroquant® Nitrat Testi (100 Test); su, atıksu ve toprak ekstraktlarında sülfürik/fosforik asit ortamında 2,6-dimetilfenol yöntemiyle 0,2 – 20,0 mg/L NO₃-N (0,9 – 88,5 mg/L NO₃⁻) tayini sağlar.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14773.0001",
      "Ambalaj & Form: 100 Test / Kutu — Spectroquant® Fotometrik Reaktif Kiti",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-032",
    "name": "MERCK 114542 Spectroquant® Nitrat Hücre Testi (0,5-18,0 mg/L NO₃-N) 25 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: 1.14542.0001 (2,2-9,7 mg/L NO₃)",
    "image": "/assets/lab/lab-032.jpg",
    "summary": "MERCK 1.14542.0001 Spectroquant® Nitrat Hücre Testi (25 Test); su ve atıksularda 0,5 – 18,0 mg/L NO₃-N (2,2 – 79,7 mg/L NO₃⁻) aralığında doğrudan spektrofotometrik okuma için hazır reaktif küvetleri içerir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14542.0001 (2,2-9,7 mg/L NO₃)",
      "Ambalaj & Form: 25 Test / Kutu — Spectroquant® Barkodlu Küvet Testi",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-033",
    "name": "MERCK 114563 Spectroquant® Nitrat Hücre Testi (0,5-25,0 mg/L NO₃-N) 25 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: 1.14563.0001 (2,2-110,7 mg/L NO₃)",
    "image": "/assets/lab/lab-033.jpg",
    "summary": "MERCK 1.14563.0001 Spectroquant® Nitrat Hücre Testi (25 Test); DIN 38405-9 ve ISO 7890-1 uyumlu 2,6-dimetilfenol (DMP) metodu ile 0,5 – 25,0 mg/L NO₃-N aralığında hızlı nitrat analizi sağlayan küvet kitidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14563.0001 (2,2-110,7 mg/L NO₃)",
      "Ambalaj & Form: 25 Test / Kutu — Spectroquant® Barkodlu Küvet Testi (DMP Metodu)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-034",
    "name": "MERCK 114544 Spectroquant® Amonyum Hücre Testi (0,5-16,0 mg/L NH₄-N) 25 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: 1.14544.0001 (0,6-20,6 mg/L NH₄⁺)",
    "image": "/assets/lab/lab-034.webp",
    "summary": "MERCK 1.14544.0001 Spectroquant® Amonyum Hücre Testi (25 Test); biyolojik arıtma tesisleri ve endüstriyel atıksularda 0,5 – 16,0 mg/L NH₄-N aralığında indofenol mavisi yöntemiyle fotometrik amonyum tayini sağlar.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14544.0001 (0,6-20,6 mg/L NH₄⁺)",
      "Ambalaj & Form: 25 Test / Kutu — Spectroquant® Barkodlu Küvet Testi (İndofenol Mavisi)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-035",
    "name": "MERCK 114558 Spectroquant® Amonyum Hücre Testi (0,20-8,00 mg/L NH₄-N) 25 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: 1.14558.0001 (0,26-10,30 mg/L NH₄⁺)",
    "image": "/assets/lab/lab-035.jpeg",
    "summary": "MERCK 1.14558.0001 Spectroquant® Amonyum Hücre Testi (25 Test); yüzey suları ve arıtılmış atıksularda 0,20 – 8,00 mg/L NH₄-N aralığında ISO 7150-1 uyumlu spektrofotometrik amonyum ölçümü için hazır küvet kitidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14558.0001 (0,26-10,30 mg/L NH₄⁺)",
      "Ambalaj & Form: 25 Test / Kutu — Spectroquant® Barkodlu Küvet Testi (ISO 7150-1)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-036",
    "name": "MERCK 114549 Spectroquant® Demir Hücre Testi (0,05-4,00 mg/L Fe) 25 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: 1.14549.0001 (Triazin Metodu)",
    "image": "/assets/lab/lab-036.jpeg",
    "summary": "MERCK 1.14549.0001 Spectroquant® Demir Hücre Testi (25 Test); kuyu suyu, kazan besi suyu ve proses sularında 0,05 – 4,00 mg/L Fe aralığında demir iyonlarının fotometrik tayini için kullanılan 16 mm yuvarlak küvet kitidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14549.0001 (Triazin Metodu)",
      "Ambalaj & Form: 25 Test / Kutu — Spectroquant® Barkodlu Küvet Testi",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-037",
    "name": "MERCK 114554 Spectroquant® Nikel Hücre Testi (0,10-6,00 mg/L Ni) 25 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: 1.14554.0001 (Dimetilglioksim Metodu)",
    "image": "/assets/lab/lab-037.jpeg",
    "summary": "MERCK 1.14554.0001 Spectroquant® Nikel Hücre Testi (25 Test); metal kaplama banyoları ve endüstriyel atıksularda 0,10 – 6,00 mg/L Ni aralığında dimetilglioksim yöntemiyle nikel tayini sağlayan küvet testidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14554.0001 (Dimetilglioksim Metodu)",
      "Ambalaj & Form: 25 Test / Kutu — Spectroquant® Barkodlu Küvet Testi",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-038",
    "name": "MERCK 114555 Spectroquant® KOİ (COD) Hücre Testi (500-10000 mg/L) 25 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: 1.14555.0001 (Yüksek Aralık KOİ)",
    "image": "/assets/lab/lab-038.jpg",
    "summary": "MERCK 1.14555.0001 Spectroquant® KOİ Hücre Testi (25 Test); yüksek konsantrasyonlu endüstriyel atıksularda ve proses sularında 500 – 10.000 mg/L O₂ aralığında Kimyasal Oksijen İhtiyacı ölçümü için kullanılan hazır küvet kitidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14555.0001 (Yüksek Aralık KOİ)",
      "Ambalaj & Form: 25 Test / Kutu — Spectroquant® Barkodlu Küvet Testi (DIN ISO 15705)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-039",
    "name": "MERCK 114541 Spectroquant® KOİ (COD) Hücre Testi (25-1500 mg/L) 25 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: 1.14541.0001 (Orta Aralık KOİ)",
    "image": "/assets/lab/lab-039.jpeg",
    "summary": "MERCK 1.14541.0001 Spectroquant® KOİ Hücre Testi (25 Test); evsel ve endüstriyel atıksularda 25 – 1500 mg/L O₂ aralığında DIN EN ISO 7393 ve ISO 15705 uyumlu fotometrik KOİ analizi sağlayan küvet kitidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14541.0001 (Orta Aralık KOİ)",
      "Ambalaj & Form: 25 Test / Kutu — Spectroquant® Barkodlu Küvet Testi (DIN ISO 15705)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-040",
    "name": "MERCK 114540 Spectroquant® KOİ (COD) Hücre Testi (10-150 mg/L) 25 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: 1.14540.0001 (Düşük-Orta Aralık KOİ)",
    "image": "/assets/lab/lab-040.jpeg",
    "summary": "MERCK 1.14540.0001 Spectroquant® KOİ Hücre Testi (25 Test); arıtma tesisi çıkış suları ve yüzey sularında 10 – 150 mg/L O₂ aralığında ISO 15705 standartlarına uygun Kimyasal Oksijen İhtiyacı tayini sağlar.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14540.0001 (Düşük-Orta Aralık KOİ)",
      "Ambalaj & Form: 25 Test / Kutu — Spectroquant® Barkodlu Küvet Testi (DIN ISO 15705)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-041",
    "name": "MERCK 114560 Spectroquant® KOİ (COD) Hücre Testi (4,0-40,0 mg/L) 25 Test",
    "brand": "MERCK",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: 1.14560.0001 (Düşük Aralık KOİ)",
    "image": "/assets/lab/lab-041.jpeg",
    "summary": "MERCK 1.14560.0001 Spectroquant® KOİ Hücre Testi (25 Test); çok düşük organik yük içeren su ve deşarj numunelerinde 4,0 – 40,0 mg/L O₂ aralığında yüksek hassasiyetli KOİ tayini sağlayan küvet kitidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.14560.0001 (Düşük Aralık KOİ)",
      "Ambalaj & Form: 25 Test / Kutu — Spectroquant® Barkodlu Küvet Testi (ISO 15705)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-042",
    "name": "ISOLAB Asetonitril (Acetonitrile) ≥%99,9 HPLC Grade 2,5 L",
    "brand": "ISOLAB",
    "group": "analitik-asit-baz-solvent",
    "packaging": "2,5 L",
    "cas": "75-05-8 • Cat. No: 901.012.2500",
    "image": "/assets/lab/lab-042.jpeg",
    "summary": "ISOLAB Asetonitril (CH₃CN, M=41,05 g/mol, CAS: 75-05-8) 2,5 L amber cam şişe; sıvı kromatografisi (HPLC), UV spektroskopisi ve organik ekstraksiyon uygulamaları için düşük su içerikli ve mikro filtreli yüksek saflıkta çözücüdür.",
    "specs": [
      "Marka / Üretici: ISOLAB",
      "Katalog / CAS Bilgisi: 75-05-8 • Cat. No: 901.012.2500",
      "Ambalaj & Form: 2,5 L — HPLC Grade (Kromatografik Saflık ≥%99,9)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-043",
    "name": "LOVIBOND T-CAL Bulanıklık (Turbidity) Kalibrasyon Seti (<0,1 / 20 / 200 / 800 NTU)",
    "brand": "LOVIBOND",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "4 Şişe Kalibrasyon Seti",
    "cas": "Cat. No: 194150 / 48012912 (T-CAL Standart Seti)",
    "image": "/assets/lab/lab-043.jpeg",
    "summary": "LOVIBOND T-CAL Bulanıklık Kalibrasyon Seti; laboratuvar ve saha türbidimetrelerinin (bulanıklık ölçerlerin) <0,1 NTU, 20 NTU, 200 NTU ve 800 NTU noktalarında tam aralık kalibrasyonu ve doğrulaması için kullanılan hazır standart setidir.",
    "specs": [
      "Marka / Üretici: LOVIBOND",
      "Katalog / CAS Bilgisi: Cat. No: 194150 / 48012912 (T-CAL Standart Seti)",
      "Ambalaj & Form: 4 Şişe Kalibrasyon Seti — EN ISO 7027 / USEPA Uyumlu Türbidimetre Standardı",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-044",
    "name": "MERCK 109407 pH 7.00 Certipur® Tampon Çözeltisi (25 °C) 1 L",
    "brand": "MERCK",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "1 L",
    "cas": "Cat. No: 1.09407.1000 (pH 7.00 ±0.01 @ 25°C)",
    "image": "/assets/lab/lab-044.jpeg",
    "summary": "MERCK 1.09407.1000 Certipur® pH 7.00 Tampon Çözeltisi (1 L, 25 °C'de pH 7,00 ±0,01); akredite su ve çevre laboratuvarlarında pH ölçüm cihazlarının NIST ve PTB birincil referans maddelerine izlenebilir kalibrasyonu için kullanılır.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.09407.1000 (pH 7.00 ±0.01 @ 25°C)",
      "Ambalaj & Form: 1 L — Certipur® NIST/PTB İzlenebilir Sertifikalı Tampon",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-045",
    "name": "MERCK 109406 pH 4.01 Certipur® Tampon Çözeltisi (25 °C) 1 L",
    "brand": "MERCK",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "1 L",
    "cas": "Cat. No: 1.09406.1000 (pH 4.01 ±0.01 @ 25°C)",
    "image": "/assets/lab/lab-045.jpeg",
    "summary": "MERCK 1.09406.1000 Certipur® pH 4.01 Tampon Çözeltisi (1 L, potasyum hidrojen ftalat bazlı, 25 °C'de pH 4,01 ±0,01); yüksek doğruluk gerektiren analitik pH ölçümlerinde asidik bölge kalibrasyonu için kullanılır.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.09406.1000 (pH 4.01 ±0.01 @ 25°C)",
      "Ambalaj & Form: 1 L — Certipur® NIST/PTB İzlenebilir Sertifikalı Tampon",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-046",
    "name": "MERCK 109409 pH 10.00 Certipur® Tampon Çözeltisi (20 °C) 1 L",
    "brand": "MERCK",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "1 L",
    "cas": "Cat. No: 1.09409.1000 (pH 10.00 ±0.02 @ 20°C)",
    "image": "/assets/lab/lab-046.jpeg",
    "summary": "MERCK 1.09409.1000 Certipur® pH 10.00 Tampon Çözeltisi (1 L, borik asit/potasyum klorür/sodyum hidroksit tamponu); alkali numunelerin pH ölçümünde elektrot eğim doğrulaması sağlayan NIST/PTB izlenebilir standarttır.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.09409.1000 (pH 10.00 ±0.02 @ 20°C)",
      "Ambalaj & Form: 1 L — Certipur® NIST/PTB İzlenebilir Sertifikalı Tampon",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-047",
    "name": "CPACHEM Bulanıklık Standardı (Turbidity Standard) 4000 NTU Formazin 100 mL",
    "brand": "CPACHEM",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "100 mL",
    "cas": "Formazin 4000 NTU (ISO 7027 Birincil Standart)",
    "image": "/assets/lab/lab-047.jpeg",
    "summary": "CPACHEM 4000 NTU Formazin Bulanıklık Standardı (100 mL); ISO 7027 ve EPA 180.1 yöntemlerine göre nefelometrik bulanıklık ölçerlerin kalibrasyonu ve çalışma standartlarının seyreltilerek hazırlanması için üretilmiş stok referans çözeltidir.",
    "specs": [
      "Marka / Üretici: CPACHEM",
      "Katalog / CAS Bilgisi: Formazin 4000 NTU (ISO 7027 Birincil Standart)",
      "Ambalaj & Form: 100 mL — Sertifikalı Referans Malzeme (CRM — ISO 17034)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-048",
    "name": "CPACHEM KOİ (COD) Standart Çözeltisi 1000 mg/L O₂ 100 mL",
    "brand": "CPACHEM",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "100 mL",
    "cas": "877-24-7 (Potasyum Hidrojen Ftalat Bazlı 1000 mg/L KOİ)",
    "image": "/assets/lab/lab-048.jpeg",
    "summary": "CPACHEM KOİ (Kimyasal Oksijen İhtiyacı) 1000 mg/L O₂ Standart Çözeltisi (100 mL); küvet testlerinin, spektrofotometrelerin ve titrimetrik KOİ metotlarının kalite kontrol (QC) doğrulaması için kullanılan NIST izlenebilir CRM çözeltisidir.",
    "specs": [
      "Marka / Üretici: CPACHEM",
      "Katalog / CAS Bilgisi: 877-24-7 (Potasyum Hidrojen Ftalat Bazlı 1000 mg/L KOİ)",
      "Ambalaj & Form: 100 mL — Sertifikalı Referans Malzeme (CRM — ISO 17034 / ISO 17025)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-049",
    "name": "CPACHEM İletkenlik Standart Çözeltisi 1413 µS/cm (@25°C) 500 mL",
    "brand": "CPACHEM",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "500 mL",
    "cas": "7447-40-7 (0,01 M KCl — 1413 µS/cm @ 25°C)",
    "image": "/assets/lab/lab-049.jpeg",
    "summary": "CPACHEM 1413 µS/cm (@25 °C) İletkenlik Standart Çözeltisi (500 mL); ISO 17025 ve ISO 17034 akreditasyonu kapsamında üretilen, laboratuvar ve proses iletkenlik hücrelerinin kalibrasyonu için kullanılan sertifikalı referans çözeltidir.",
    "specs": [
      "Marka / Üretici: CPACHEM",
      "Katalog / CAS Bilgisi: 7447-40-7 (0,01 M KCl — 1413 µS/cm @ 25°C)",
      "Ambalaj & Form: 500 mL — Sertifikalı Referans Malzeme (CRM — NIST İzlenebilir)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-050",
    "name": "CPACHEM Siyanür (Cyanide) Standart Çözeltisi 1000 mg/L CN⁻ 100 mL",
    "brand": "CPACHEM",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "100 mL",
    "cas": "151-50-8 (1000 mg/L CN⁻, %0.1 NaOH Matrisinde)",
    "image": "/assets/lab/lab-050.jpeg",
    "summary": "CPACHEM 1000 mg/L Siyanür (CN⁻) Standart Çözeltisi (100 mL, %0,1 NaOH içinde stabilize edilmiş); çevre ve maden analiz laboratuvarlarında serbest ve toplam siyanür kalibrasyon eğrilerinin hazırlanması için kullanılan CRM standardıdır.",
    "specs": [
      "Marka / Üretici: CPACHEM",
      "Katalog / CAS Bilgisi: 151-50-8 (1000 mg/L CN⁻, %0.1 NaOH Matrisinde)",
      "Ambalaj & Form: 100 mL — Sertifikalı Referans Malzeme (CRM — İyon / Fotometri)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-051",
    "name": "CPACHEM Çoklu Element (Multi-Element) Kalibrasyon Standardı 100 mL",
    "brand": "CPACHEM",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "100 mL",
    "cas": "Nitrik Asit Matrisinde ICP-OES / ICP-MS Çoklu Element CRM",
    "image": "/assets/lab/lab-051.jpeg",
    "summary": "CPACHEM Çoklu Element (Multi-Element) Standart Çözeltisi (100 mL); ICP-OES, ICP-MS ve AAS cihazlarında ağır metal ve katyon analizlerinin kalibrasyonu için NIST SRM'lerine izlenebilir olarak üretilmiş sertifikalı referans malzemedir.",
    "specs": [
      "Marka / Üretici: CPACHEM",
      "Katalog / CAS Bilgisi: Nitrik Asit Matrisinde ICP-OES / ICP-MS Çoklu Element CRM",
      "Ambalaj & Form: 100 mL — Sertifikalı Referans Malzeme (ISO 17034 / NIST SRM İzlenebilir)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-052",
    "name": "MERCK 119778 Kalsiyum (Ca) ICP / AAS Standart Çözeltisi Certipur® 1000 mg/L 500 mL",
    "brand": "MERCK",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "500 mL",
    "cas": "Cat. No: 1.19778.0500 (Ca(NO₃)₂ in HNO₃ 0,5 mol/L, 1000 mg/L Ca)",
    "image": "/assets/lab/lab-052.jpeg",
    "summary": "MERCK Certipur® Kalsiyum Standart Çözeltisi 1000 mg/L Ca (500 mL, seyreltik nitrik asit içinde Ca(NO₃)₂); atomik absorpsiyon (AAS), ICP-OES ve iyon kromatografisi kalibrasyonlarında kullanılan NIST izlenebilir referans çözeltidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: Cat. No: 1.19778.0500 (Ca(NO₃)₂ in HNO₃ 0,5 mol/L, 1000 mg/L Ca)",
      "Ambalaj & Form: 500 mL — Certipur® NIST SRM İzlenebilir Element Standardı",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-053",
    "name": "CPACHEM pH 7.00 Tampon Çözeltisi (20 °C) NIST İzlenebilir 1 L",
    "brand": "CPACHEM",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "1 L",
    "cas": "pH 7.00 ±0.01 @ 20°C (Potasyum Dihidrojen Fosfat / Disodyum Hidrojen Fosfat)",
    "image": "/assets/lab/lab-053.jpeg",
    "summary": "CPACHEM pH 7.00 ±0.01 (20 °C) Tampon Çözeltisi (1 L); akredite su analiz laboratuvarlarında pH elektrotlarının sıfır noktası kalibrasyonu ve doğrulaması için ISO 17034 kapsamında üretilmiş sertifikalı referans tampon çözeltidir.",
    "specs": [
      "Marka / Üretici: CPACHEM",
      "Katalog / CAS Bilgisi: pH 7.00 ±0.01 @ 20°C (Potasyum Dihidrojen Fosfat / Disodyum Hidrojen Fosfat)",
      "Ambalaj & Form: 1 L — Sertifikalı Referans Malzeme (CRM — NIST İzlenebilir)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-054",
    "name": "CPACHEM pH 4.01 Tampon Çözeltisi (25 °C) NIST İzlenebilir 1 L",
    "brand": "CPACHEM",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "1 L",
    "cas": "877-24-7 (pH 4.01 ±0.01 @ 25°C Potasyum Hidrojen Ftalat)",
    "image": "/assets/lab/lab-054.jpeg",
    "summary": "CPACHEM pH 4.01 ±0.01 (25 °C) Tampon Çözeltisi (1 L); pH ölçüm sistemlerinin asidik eğim kalibrasyonunda kullanılan, NIST SRM 185i birincil standardına izlenebilir sertifikalı tampon çözeltidir.",
    "specs": [
      "Marka / Üretici: CPACHEM",
      "Katalog / CAS Bilgisi: 877-24-7 (pH 4.01 ±0.01 @ 25°C Potasyum Hidrojen Ftalat)",
      "Ambalaj & Form: 1 L — Sertifikalı Referans Malzeme (CRM — NIST İzlenebilir)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-055",
    "name": "METTLER TOLEDO pH 7.00 Teknik Tampon Çözeltisi 250 mL",
    "brand": "METTLER TOLEDO",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "250 mL",
    "cas": "Cat. No: 51350004 (pH 7.00 ±0.02 @ 25°C)",
    "image": "/assets/lab/lab-055.jpeg",
    "summary": "METTLER TOLEDO 51350004 pH 7.00 Tampon Çözeltisi (250 mL); masaüstü ve taşınabilir pH metrelerin günlük kalibrasyonunda yüksek kararlılık sağlayan orijinal Mettler Toledo kalibrasyon çözeltisidir.",
    "specs": [
      "Marka / Üretici: METTLER TOLEDO",
      "Katalog / CAS Bilgisi: Cat. No: 51350004 (pH 7.00 ±0.02 @ 25°C)",
      "Ambalaj & Form: 250 mL — Mettler Toledo NIST İzlenebilir pH Tamponu",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-056",
    "name": "METTLER TOLEDO pH 4.01 Teknik Tampon Çözeltisi 250 mL",
    "brand": "METTLER TOLEDO",
    "group": "kalibrasyon-ve-standartlar",
    "packaging": "250 mL",
    "cas": "Cat. No: 51350002 (pH 4.01 ±0.02 @ 25°C)",
    "image": "/assets/lab/lab-056.jpeg",
    "summary": "METTLER TOLEDO 51350002 pH 4.01 Tampon Çözeltisi (250 mL); pH elektrotlarının asidik bölge kalibrasyonu ve eğim kontrolü için kullanılan sertifikalı izlenebilirliğe sahip orijinal tampon çözeltidir.",
    "specs": [
      "Marka / Üretici: METTLER TOLEDO",
      "Katalog / CAS Bilgisi: Cat. No: 51350002 (pH 4.01 ±0.02 @ 25°C)",
      "Ambalaj & Form: 250 mL — Mettler Toledo NIST İzlenebilir pH Tamponu",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-057",
    "name": "Norateks Amonyak Çözeltisi %25 (Extra Pure) 2,5 L",
    "brand": "NORATEKS",
    "group": "analitik-asit-baz-solvent",
    "packaging": "2,5 L",
    "cas": "1336-21-6 (NH₄OH %25 Sulu Çözelti)",
    "image": "/assets/lab/lab-057.jpeg",
    "summary": "Norateks Amonyak Çözeltisi %25 (NH₄OH, CAS: 1336-21-6, 2,5 L); kompleksometrik sertlik titrasyonlarında pH 10 tamponu hazırlanmasında, metal çöktürme işlemlerinde ve genel laboratuvar analizlerinde kullanılan bazik çözeltidir.",
    "specs": [
      "Marka / Üretici: NORATEKS",
      "Katalog / CAS Bilgisi: 1336-21-6 (NH₄OH %25 Sulu Çözelti)",
      "Ambalaj & Form: 2,5 L — Extra Pure (Laboratuvar & Analiz Kalitesi)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-058",
    "name": "HACH LCK304 Amonyum Küvet Testi (0,015-2,0 mg/L NH₄-N) 25 Test",
    "brand": "HACH",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: LCK304 (0,02-2,5 mg/L NH₄)",
    "image": "/assets/lab/lab-058.jpeg",
    "summary": "HACH LCK304 Amonyum Küvet Testi (25 Test); içme suyu, yüzey suyu ve arıtma çıkışlarında 0,015 – 2,0 mg/L NH₄-N aralığında indofenol mavisi metoduyla düşük seviye amonyum azotu tayini sağlayan DosiCap® kapaklı küvet kitidir.",
    "specs": [
      "Marka / Üretici: HACH",
      "Katalog / CAS Bilgisi: Cat. No: LCK304 (0,02-2,5 mg/L NH₄)",
      "Ambalaj & Form: 25 Test / Kutu — HACH Barkodlu Küvet Testi (ISO 7150-1 / DIN 38406 E5-1)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-059",
    "name": "CHEMBIO CB114 KOİ (COD) Küvet Test Kiti (150-1000 mg/L O₂) 25 Test",
    "brand": "CHEMBIO",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: CB114 (Dikromat KOİ Küvet Testi)",
    "image": "/assets/lab/lab-059.jpeg",
    "summary": "CHEMBIO CB114 KOİ (Kimyasal Oksijen İhtiyacı) Küvet Testi (25 Test); 150 – 1000 mg/L O₂ ölçüm aralığında çalışan, standart 16 mm termoreaktör ve spektrofotometrelerle uyumlu hazır atıksu KOİ analiz kitidir.",
    "specs": [
      "Marka / Üretici: CHEMBIO",
      "Katalog / CAS Bilgisi: Cat. No: CB114 (Dikromat KOİ Küvet Testi)",
      "Ambalaj & Form: 25 Test / Kutu — ISO 15705 Uyumlu 16 mm Tüp KOİ Kiti",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-060",
    "name": "Tezkim NeoCitrus Sitrik Asit Monohidrat (%99,5-100,5) 25 kg",
    "brand": "TEZKİM",
    "group": "analitik-tuzlar-ve-kimyasallar",
    "packaging": "25 kg Kraft Torba",
    "cas": "5949-29-1 (C₆H₈O₇·H₂O)",
    "image": "/assets/lab/lab-060.jpg",
    "summary": "Tezkim NeoCitrus Sitrik Asit Monohidrat (C₆H₈O₇·H₂O, CAS: 5949-29-1, 25 kg); ters ozmoz (RO) ve ultrafiltrasyon (UF) membranlarının inorganik kireç/metal oksit CIP yıkamalarında, pH tamponlamada ve şelatlama işlemlerinde kullanılan yüksek saflıkta organik asittir.",
    "specs": [
      "Marka / Üretici: TEZKİM",
      "Katalog / CAS Bilgisi: 5949-29-1 (C₆H₈O₇·H₂O)",
      "Ambalaj & Form: 25 kg Kraft Torba — BP / USP / FCC / E330 Kristal Monohidrat",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-061",
    "name": "CHEMBIO CB314 KOİ (COD) Küvet Test Kiti (15-150 mg/L O₂) 25 Test",
    "brand": "CHEMBIO",
    "group": "su-analiz-kitleri-ve-reaktifler",
    "packaging": "25 Test / Kutu",
    "cas": "Cat. No: CB314 (Düşük Aralık KOİ Küvet Testi)",
    "image": "/assets/lab/lab-061.webp",
    "summary": "CHEMBIO CB314 KOİ Küvet Testi (25 Test); arıtılmış atıksu deşarjları ve yüzey sularında 15 – 150 mg/L O₂ aralığında fotometrik Kimyasal Oksijen İhtiyacı tayini için kullanılan 25 testlik hazır küvet setidir.",
    "specs": [
      "Marka / Üretici: CHEMBIO",
      "Katalog / CAS Bilgisi: Cat. No: CB314 (Düşük Aralık KOİ Küvet Testi)",
      "Ambalaj & Form: 25 Test / Kutu — ISO 15705 Uyumlu 16 mm Tüp KOİ Kiti",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-062",
    "name": "MERCK 108418 Titriplex® III (EDTA Disodyum Tuzu Dihidrat) ACS, ISO, Reag. Ph. Eur. 1 kg",
    "brand": "MERCK",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 kg",
    "cas": "6381-92-6 • Cat. No: 1.08418.1000",
    "image": "/assets/lab/lab-062.jpeg",
    "summary": "MERCK 1.08418.1000 Titriplex® III (Etilendinitrilotetraasetik asit disodyum tuzu dihidrat, C₁₀H₁₄N₂Na₂O₈·2H₂O, M=372,24 g/mol, CAS: 6381-92-6) 1 kg; su sertliği, kalsiyum ve ağır metal kompleksometrik titrasyonlarının temel analitik reaktifidir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 6381-92-6 • Cat. No: 1.08418.1000",
      "Ambalaj & Form: 1 kg — ACS, ISO, Reag. Ph. Eur. (Analitik Reaktif, %99,0-101,0)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-063",
    "name": "MERCK 106404 Sodyum Klorür (Sodium Chloride) EMSURE® ACS, ISO, Reag. Ph. Eur. 1 kg",
    "brand": "MERCK",
    "group": "analitik-tuzlar-ve-kimyasallar",
    "packaging": "1 kg",
    "cas": "7647-14-5 • Cat. No: 1.06404.1000",
    "image": "/assets/lab/lab-063.jpeg",
    "summary": "MERCK 1.06404.1000 Sodyum Klorür (NaCl, M=58,44 g/mol, CAS: 7647-14-5) EMSURE® ACS, ISO, Reag. Ph. Eur. 1 kg; arjantometrik klorür standartlarının hazırlanması, iyonik kuvvet ayarlaması ve analitik kalite kontrol analizleri için kullanılır.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 7647-14-5 • Cat. No: 1.06404.1000",
      "Ambalaj & Form: 1 kg — EMSURE® ACS, ISO, Reag. Ph. Eur. (≥%99,5)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-064",
    "name": "ISOLAB Dimetil Sülfoksit (DMSO) ≥%99,5 (Extra Pure) 1 L",
    "brand": "ISOLAB",
    "group": "analitik-asit-baz-solvent",
    "packaging": "1 L",
    "cas": "67-68-5 • Cat. No: 919.013.1000",
    "image": "/assets/lab/lab-064.jpeg",
    "summary": "ISOLAB Dimetil Sülfoksit (DMSO, (CH₃)₂SO, M=78,13 g/mol, CAS: 67-68-5) 1 L cam şişe; hem polar hem apolar bileşikleri çözebilen, kromatografi, spektroskopi ve organik sentez laboratuvarlarında kullanılan polar aprotik çözücüdür.",
    "specs": [
      "Marka / Üretici: ISOLAB",
      "Katalog / CAS Bilgisi: 67-68-5 • Cat. No: 919.013.1000",
      "Ambalaj & Form: 1 L — Extra Pure (≥%99,5 Saflık)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-065",
    "name": "Sigma-Aldrich N4126 Nikotinik Asit (Niacin) ≥%98 100 gr",
    "brand": "SIGMA-ALDRICH",
    "group": "analitik-tuzlar-ve-kimyasallar",
    "packaging": "100 gr",
    "cas": "59-67-6 • Cat. No: N4126-100G",
    "image": "/assets/lab/lab-065.jpeg",
    "summary": "Sigma-Aldrich Cat. No: N4126-100G Nikotinik Asit (Piridin-3-karboksilik asit / B3 Vitamini, C₆H₅NO₂, M=123,11 g/mol, CAS: 59-67-6) 100 gr; biyokimyasal araştırmalar, mikrobiyolojik besiyeri hazırlığı ve analitik referans çalışmalarında kullanılır.",
    "specs": [
      "Marka / Üretici: SIGMA-ALDRICH",
      "Katalog / CAS Bilgisi: 59-67-6 • Cat. No: N4126-100G",
      "Ambalaj & Form: 100 gr — Hücre Kültürü & Biyokimyasal Analiz Kalitesi (≥%98)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-066",
    "name": "ISOLAB Sodyum Hidroksit Çözeltisi 0,1 mol/L (0,1 N) Volümetrik 1 L",
    "brand": "ISOLAB",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 L",
    "cas": "1310-73-2 • Cat. No: 969.121.1000",
    "image": "/assets/lab/lab-066.jpeg",
    "summary": "ISOLAB Sodyum Hidroksit 0,1 mol/L (0,1 N) Volümetrik Çözeltisi (1 L, CAS: 1310-73-2); su, gıda ve kimya laboratuvarlarında serbest asitlik tayini ve asit-baz titrasyonlarında doğrudan kullanılan standart çözeltidir.",
    "specs": [
      "Marka / Üretici: ISOLAB",
      "Katalog / CAS Bilgisi: 1310-73-2 • Cat. No: 969.121.1000",
      "Ambalaj & Form: 1 L — Ayarlı Volümetrik Çözelti (0,1 mol/L NaOH)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-067",
    "name": "MERCK 106657 Sodyum Sülfit Anhidrit (Sodium Sulfite) EMSURE® Reag. Ph. Eur. 1 kg",
    "brand": "MERCK",
    "group": "analitik-tuzlar-ve-kimyasallar",
    "packaging": "1 kg",
    "cas": "7757-83-7 • Cat. No: 1.06657.1000",
    "image": "/assets/lab/lab-067.jpeg",
    "summary": "MERCK 1.06657.1000 Sodyum Sülfit Anhidrit (Na₂SO₃, M=126,04 g/mol, CAS: 7757-83-7) 1 kg; çözünmüş oksijen sıfırlama (DO zero) çözeltisi hazırlığında, kazan suyu sülfit analizlerinde ve indirgeme reaksiyonlarında kullanılan analitik reaktiftir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 7757-83-7 • Cat. No: 1.06657.1000",
      "Ambalaj & Form: 1 kg — EMSURE® Reag. Ph. Eur. (Analitik Reaktif, ≥%98,0)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-068",
    "name": "ISOLAB Metilen Mavisi (Methylene Blue, C.I. 52015) 100 gr",
    "brand": "ISOLAB",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "100 gr",
    "cas": "61-73-4 / 7220-79-3 • Cat. No: 946.043.0100",
    "image": "/assets/lab/lab-068.png",
    "summary": "ISOLAB Metilen Mavisi (C₁₆H₁₈ClN₃S·xH₂O, C.I. 52015, CAS: 61-73-4) 100 gr; atıksularda anyonik yüzey aktif madde (MBAS) tayininde, redoks indikatörü olarak ve mikrobiyolojik boyama işlemlerinde kullanılan laboratuvar kimyasalıdır.",
    "specs": [
      "Marka / Üretici: ISOLAB",
      "Katalog / CAS Bilgisi: 61-73-4 / 7220-79-3 • Cat. No: 946.043.0100",
      "Ambalaj & Form: 100 gr — Mikroskopi & Redoks İndikatör Boyası",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-069",
    "name": "TEKKİM Potasyum İyodür (Potassium Iodide) Extra Pure 500 gr",
    "brand": "TEKKİM",
    "group": "analitik-tuzlar-ve-kimyasallar",
    "packaging": "500 gr",
    "cas": "7681-11-0 • Cat. No: TK.150640.00501",
    "image": "/assets/lab/lab-069.jpeg",
    "summary": "TEKKİM Potasyum İyodür (KI, M=166,00 g/mol, CAS: 7681-11-0) 500 gr; Winkler yöntemiyle çözünmüş oksijen tayininde, aktif klor (sodyum hipoklorit) iyodometrik titrasyonlarında ve iyot çözeltisi hazırlığında kullanılan yüksek saflıkta tuzdur.",
    "specs": [
      "Marka / Üretici: TEKKİM",
      "Katalog / CAS Bilgisi: 7681-11-0 • Cat. No: TK.150640.00501",
      "Ambalaj & Form: 500 gr — Extra Pure (≥%99,0 Saflık)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-070",
    "name": "HONEYWELL Riedel-de Haën Sülfürik Asit %95-97 Puriss. p.a. 2,5 L",
    "brand": "HONEYWELL",
    "group": "analitik-asit-baz-solvent",
    "packaging": "2,5 L",
    "cas": "7664-93-9 • Cat. No: 30743-2.5L",
    "image": "/assets/lab/lab-070.png",
    "summary": "HONEYWELL Riedel-de Haën (Cat. No: 30743) Sülfürik Asit %95–97 Puriss. p.a. (2,5 L, CAS: 7664-93-9); KOİ reaktifi hazırlığı, Kjeldahl yaş yakma, sülfat/alkalinite analizleri ve genel analitik kimya uygulamaları için ACS/ISO saflıkta asittir.",
    "specs": [
      "Marka / Üretici: HONEYWELL",
      "Katalog / CAS Bilgisi: 7664-93-9 • Cat. No: 30743-2.5L",
      "Ambalaj & Form: 2,5 L — Puriss. p.a. ACS, ISO, Reag. Ph. Eur. (%95-97)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-071",
    "name": "MERCK 106579 Sodyum Tiyosülfat Pentahidrat EMSURE® ACS, ISO, Reag. Ph. Eur. 1 kg",
    "brand": "MERCK",
    "group": "analitik-tuzlar-ve-kimyasallar",
    "packaging": "1 kg",
    "cas": "10102-17-7 • Cat. No: 1.06579.1000",
    "image": "/assets/lab/lab-071.jpg",
    "summary": "MERCK 1.06579.1000 Sodyum Tiyosülfat Pentahidrat (Na₂S₂O₃·5H₂O, M=248,18 g/mol, CAS: 10102-17-7) 1 kg; iyodometrik titrasyon çözeltilerinin hazırlanmasında ve klor giderimi (deklorinasyon) analizlerinde kullanılan ACS/ISO standartlarında kristal tuzdur.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 10102-17-7 • Cat. No: 1.06579.1000",
      "Ambalaj & Form: 1 kg — EMSURE® ACS, ISO, Reag. Ph. Eur. (%99,5-101,0)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-072",
    "name": "MERCK 100983 Etanol (Ethyl Alcohol Absolute) EMSURE® ACS, ISO, Reag. Ph. Eur. 2,5 L",
    "brand": "MERCK",
    "group": "analitik-asit-baz-solvent",
    "packaging": "2,5 L",
    "cas": "64-17-5 • Cat. No: 1.00983.2511",
    "image": "/assets/lab/lab-072.png",
    "summary": "MERCK 1.00983.2511 Etanol Absolut (C₂H₅OH, ≥%99,9, CAS: 64-17-5) EMSURE® ACS, ISO, Reag. Ph. Eur. 2,5 L; indikatör çözeltilerinin hazırlanmasında, kromatografik ekstraksiyonlarda ve enstrümantal analizlerde kullanılan susuz analitik çözücüdür.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 64-17-5 • Cat. No: 1.00983.2511",
      "Ambalaj & Form: 2,5 L — EMSURE® ACS, ISO, Reag. Ph. Eur. (≥%99,9 Absolute)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-073",
    "name": "MERCK 100063 Asetik Asit (%100 Glasiyal) EMSURE® ACS, ISO, Reag. Ph. Eur. 2,5 L",
    "brand": "MERCK",
    "group": "analitik-asit-baz-solvent",
    "packaging": "2,5 L",
    "cas": "64-19-7 • Cat. No: 1.00063.2500",
    "image": "/assets/lab/lab-073.png",
    "summary": "MERCK 1.00063.2500 Glasiyal Asetik Asit %100 (CH₃COOH, M=60,05 g/mol, CAS: 64-19-7) EMSURE® ACS, ISO, Reag. Ph. Eur. 2,5 L; susuz ortam titrasyonları, tampon çözelti hazırlığı ve kromatografik mobil faz uygulamaları için analitik saflıkta asittir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 64-19-7 • Cat. No: 1.00063.2500",
      "Ambalaj & Form: 2,5 L — EMSURE® ACS, ISO, Reag. Ph. Eur. (%100 Susuz Glasiyal)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-074",
    "name": "ISOLAB Aseton (Acetone) ≥%99,5 (Pure) 2,5 L",
    "brand": "ISOLAB",
    "group": "analitik-asit-baz-solvent",
    "packaging": "2,5 L",
    "cas": "67-64-1 • Cat. No: 901.022.2500",
    "image": "/assets/lab/lab-074.png",
    "summary": "ISOLAB Aseton (CH₃COCH₃, M=58,08 g/mol, CAS: 67-64-1) 2,5 L; laboratuvar ekstraksiyon işlemlerinde, organik sentezlerde ve hassas cam malzemelerin kalıntısız temizlik/kurutma uygulamalarında kullanılan çözücüdür.",
    "specs": [
      "Marka / Üretici: ISOLAB",
      "Katalog / CAS Bilgisi: 67-64-1 • Cat. No: 901.022.2500",
      "Ambalaj & Form: 2,5 L — Pure / Laboratuvar Saflığı (≥%99,5)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-075",
    "name": "MERCK 109950 Sodyum Tiyosülfat Titrisol® Konsantresi (0,1 mol/L - 0,1 N) 1 Ampul",
    "brand": "MERCK",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 Ampul (1000 mL Çözelti İçin)",
    "cas": "7772-98-7 • Cat. No: 1.09950.0001",
    "image": "/assets/lab/lab-075.png",
    "summary": "MERCK 1.09950.0001 Titrisol® Sodyum Tiyosülfat Konsantresi; deiyonize su ile 1000 mL balon jojede tamamlandığında tam 0,1 mol/L (0,1 N) ayarlı Na₂S₂O₃ titrasyon çözeltisi veren, hava sızdırmaz ampul formunda standart konsantredir.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 7772-98-7 • Cat. No: 1.09950.0001",
      "Ambalaj & Form: 1 Ampul (1000 mL Çözelti İçin) — Titrisol® Volümetrik Konsantre (1000 mL = 0,1 mol/L Na₂S₂O₃)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-076",
    "name": "TEKKİM Sodyum Hidroksit Çözeltisi 0,1 N (0,1 M) Volümetrik 1 L",
    "brand": "TEKKİM",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 L",
    "cas": "1310-73-2 • Cat. No: TK.920140.01002",
    "image": "/assets/lab/lab-076.png",
    "summary": "TEKKİM Sodyum Hidroksit 0,1 N (0,1 mol/L) Volümetrik Çözeltisi (1 L, CAS: 1310-73-2); su, gıda ve kimya kontrol laboratuvarlarında asitlik tayini ve rutin nötralizasyon titrasyonları için kullanıma hazır çözeltidir.",
    "specs": [
      "Marka / Üretici: TEKKİM",
      "Katalog / CAS Bilgisi: 1310-73-2 • Cat. No: TK.920140.01002",
      "Ambalaj & Form: 1 L — Ayarlı Volümetrik Titrasyon Çözeltisi (0,1 N NaOH)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-077",
    "name": "MERCK 109870 Titriplex® III (EDTA) Titrisol® Konsantresi (0,1 mol/L) 1 Ampul",
    "brand": "MERCK",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 Ampul (1000 mL Çözelti İçin)",
    "cas": "6381-92-6 • Cat. No: 1.09870.0001",
    "image": "/assets/lab/lab-077.png",
    "summary": "MERCK 1.09870.0001 Titrisol® Titriplex® III Konsantresi; 1000 mL'ye seyreltildiğinde tam 0,1 mol/L etilendinitrilotetraasetik asit disodyum tuzu (EDTA) çözeltisi oluşturan, toplam sertlik ve kalsiyum titrasyonları için kullanılan standart ampuldür.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 6381-92-6 • Cat. No: 1.09870.0001",
      "Ambalaj & Form: 1 Ampul (1000 mL Çözelti İçin) — Titrisol® Kompleksometrik Konsantre (1000 mL = 0,1 mol/L EDTA)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-078",
    "name": "MERCK 109940 Potasyum Permanganat Titrisol® Konsantresi (0,02 mol/L - 0,1 N) 1 Ampul",
    "brand": "MERCK",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 Ampul (1000 mL Çözelti İçin)",
    "cas": "7722-64-7 • Cat. No: 1.09940.0001",
    "image": "/assets/lab/lab-078.png",
    "summary": "MERCK 1.09940.0001 Titrisol® Potasyum Permanganat Konsantresi; 1000 mL'ye tamamlandığında 0,02 mol/L (0,1 N) KMnO₄ çözeltisi sağlayan, permanganometrik redoks titrasyonları ve suda organik madde (oksitlenebilirlik) tayininde kullanılan ampuldür.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 7722-64-7 • Cat. No: 1.09940.0001",
      "Ambalaj & Form: 1 Ampul (1000 mL Çözelti İçin) — Titrisol® Redoks Konsantresi (1000 mL = 0,02 mol/L KMnO₄)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-079",
    "name": "MERCK 109970 Hidroklorik Asit Titrisol® Konsantresi (1 mol/L - 1 N) 1 Ampul",
    "brand": "MERCK",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 Ampul (1000 mL Çözelti İçin)",
    "cas": "7647-01-0 • Cat. No: 1.09970.0001",
    "image": "/assets/lab/lab-079.png",
    "summary": "MERCK 1.09970.0001 Titrisol® Hidroklorik Asit Konsantresi; saf su ile 1000 mL'ye tamamlandığında tam 1 mol/L (1 N) HCl standart titrasyon çözeltisi veren, NIST izlenebilir volümetrik konsantre ampuldür.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 7647-01-0 • Cat. No: 1.09970.0001",
      "Ambalaj & Form: 1 Ampul (1000 mL Çözelti İçin) — Titrisol® Volümetrik Konsantre (1000 mL = 1 mol/L HCl)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-080",
    "name": "MERCK 109959 Sodyum Hidroksit Titrisol® Konsantresi (0,1 mol/L - 0,1 N) 1 Ampul",
    "brand": "MERCK",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 Ampul (1000 mL Çözelti İçin)",
    "cas": "1310-73-2 • Cat. No: 1.09959.0001",
    "image": "/assets/lab/lab-080.jpeg",
    "summary": "MERCK 1.09959.0001 Titrisol® Sodyum Hidroksit Konsantresi; karbondioksitsiz saf su ile 1000 mL'ye tamamlandığında tam 0,1 mol/L (0,1 N) NaOH ayarlı çözeltisi oluşturan analitik titrasyon ampulüdür.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 1310-73-2 • Cat. No: 1.09959.0001",
      "Ambalaj & Form: 1 Ampul (1000 mL Çözelti İçin) — Titrisol® Volümetrik Konsantre (1000 mL = 0,1 mol/L NaOH)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-081",
    "name": "MERCK 109981 Sülfürik Asit Titrisol® Konsantresi (0,05 mol/L - 0,1 N) 1 Ampul",
    "brand": "MERCK",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 Ampul (1000 mL Çözelti İçin)",
    "cas": "7664-93-9 • Cat. No: 1.09981.0001",
    "image": "/assets/lab/lab-081.jpeg",
    "summary": "MERCK 1.09981.0001 Titrisol® Sülfürik Asit Konsantresi; 1000 mL'ye seyreltildiğinde 0,05 mol/L (0,1 N) H₂SO₄ çözeltisi veren, su ve atıksu alkalinite analizleri ile baz titrasyonlarında kullanılan standart ampuldür.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 7664-93-9 • Cat. No: 1.09981.0001",
      "Ambalaj & Form: 1 Ampul (1000 mL Çözelti İçin) — Titrisol® Volümetrik Konsantre (1000 mL = 0,05 mol/L H₂SO₄)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-082",
    "name": "MERCK 109973 Hidroklorik Asit Titrisol® Konsantresi (0,1 mol/L - 0,1 N) 1 Ampul",
    "brand": "MERCK",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 Ampul (1000 mL Çözelti İçin)",
    "cas": "7647-01-0 • Cat. No: 1.09973.0001",
    "image": "/assets/lab/lab-082.png",
    "summary": "MERCK 1.09973.0001 Titrisol® Hidroklorik Asit Konsantresi; 1000 mL'ye tamamlandığında tam 0,1 mol/L (0,1 N) HCl çözeltisi sağlayan, yüksek doğruluklu asit-baz titrasyonlarında kullanılan volümetrik ampuldür.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 7647-01-0 • Cat. No: 1.09973.0001",
      "Ambalaj & Form: 1 Ampul (1000 mL Çözelti İçin) — Titrisol® Volümetrik Konsantre (1000 mL = 0,1 mol/L HCl)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "LAB-083",
    "name": "MERCK 109956 Sodyum Hidroksit Titrisol® Konsantresi (1 mol/L - 1 N) 1 Ampul",
    "brand": "MERCK",
    "group": "titrasyon-ve-indikatorler",
    "packaging": "1 Ampul (1000 mL Çözelti İçin)",
    "cas": "1310-73-2 • Cat. No: 1.09956.0001",
    "image": "/assets/lab/lab-083.png",
    "summary": "MERCK 1.09956.0001 Titrisol® Sodyum Hidroksit Konsantresi; 1000 mL'ye seyreltildiğinde tam 1 mol/L (1 N) NaOH çözeltisi oluşturan, endüstriyel kalite kontrol ve kantitatif analiz laboratuvarları için üretilmiş standart ampuldür.",
    "specs": [
      "Marka / Üretici: MERCK",
      "Katalog / CAS Bilgisi: 1310-73-2 • Cat. No: 1.09956.0001",
      "Ambalaj & Form: 1 Ampul (1000 mL Çözelti İçin) — Titrisol® Volümetrik Konsantre (1000 mL = 1 mol/L NaOH)",
      "Belge & Lot: Teklif/sipariş adımında güncel parti SDS ve mevcutsa üretici COA bilgisi paylaşılır"
    ]
  },
  {
    "code": "HRB-002",
    "name": "HORIBA 5402 Yedek Çözünmüş Oksijen Sensör Ucu – 9552-20D / 9552-50D Uyumlu",
    "brand": "HORIBA",
    "group": "horiba-elektrot-ve-problar",
    "packaging": "Orijinal Yedek Sensör / Elektrot",
    "cas": "Model: 5402 • HORIBA Kod: 3200781553",
    "image": "/assets/horiba/horiba-002.png",
    "summary": "HORIBA 5402 Yedek Çözünmüş Oksijen Sensör Ucu HORIBA 5402 , HORIBA 9552-20D ve 9552-50D galvanik çözünmüş oksijen problarında kullanılan değiştirilebilir DO sensör ucudur. Mevcut probun sensör ucunun değiştirilmesi gerektiğinde, prob gövdesi ve bağlantı kablosu korunarak bakım özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: 5402 • HORIBA Kod: 3200781553",
      "Donanım / Paket Yapısı: Orijinal Yedek Sensör / Elektrot",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-003",
    "name": "HORIBA 9552-50D Galvanik Çözünmüş Oksijen Probu – 5 m Kablolu, Sıcaklık Sensörlü",
    "brand": "HORIBA",
    "group": "horiba-elektrot-ve-problar",
    "packaging": "5 m Kablolu Orijinal Prob",
    "cas": "Model: 9552-50D • HORIBA Kod: 3200780941",
    "image": "/assets/horiba/horiba-003.png",
    "summary": "HORIBA 9552-50D Galvanik Çözünmüş Oksijen Probu – 2 m Kablolu HORIBA 9552-50D , su numunelerinde çözünmüş oksijen (DO) ve sıcaklık ölçümleri için tasarlanmış, galvanik sensör teknolojisine sahip bir oksijen probudur. HORIBA LAQUA portatif çözünmüş oksijen ölçüm cihazlarıyla kullanılmak özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: 9552-50D • HORIBA Kod: 3200780941",
      "Donanım / Paket Yapısı: 5 m Kablolu Orijinal Prob",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-004",
    "name": "HORIBA 9552-20D Galvanik Çözünmüş Oksijen Probu – 2 m Kablolu, Sıcaklık Sensörlü",
    "brand": "HORIBA",
    "group": "horiba-elektrot-ve-problar",
    "packaging": "2 m Kablolu Orijinal Elektrot/Prob",
    "cas": "Model: 9552-20D • HORIBA Kod: 3200780939",
    "image": "/assets/horiba/horiba-004.png",
    "summary": "HORIBA 9552-20D Galvanik Çözünmüş Oksijen Probu – 2 m Kablolu HORIBA 9552-20D , su numunelerinde çözünmüş oksijen (DO) ve sıcaklık ölçümleri için tasarlanmış, galvanik sensör teknolojisine sahip bir oksijen probudur. HORIBA LAQUA portatif çözünmüş oksijen ölçüm cihazlarıyla kullanılmak özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: 9552-20D • HORIBA Kod: 3200780939",
      "Donanım / Paket Yapısı: 2 m Kablolu Orijinal Elektrot/Prob",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-005",
    "name": "HORIBA 9681S-10D Kıvamlı Numuneler İçin Sleeve Tip Cam pH Elektrodu – 1 m Kablolu",
    "brand": "HORIBA",
    "group": "horiba-elektrot-ve-problar",
    "packaging": "1 m Kablolu Orijinal Elektrot",
    "cas": "Model: 9681S-10D • HORIBA Kod: 3200585463",
    "image": "/assets/horiba/horiba-005.png",
    "summary": "HORIBA 9681S-10D Sleeve ToupH Cam pH Elektrodu HORIBA 9681S-10D Kıvamlı Numuneler İçin Sleeve Tip Cam pH Elektrodu – 1 m Kablolu, yüksek viskoziteli, yoğun kıvamlı ve susuz çözücü içeren uygun numunelerde pH ölçümü için geliştirilmiş, cam gövdeli ve doldurulabilir bir kombine pH özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: 9681S-10D • HORIBA Kod: 3200585463",
      "Donanım / Paket Yapısı: 1 m Kablolu Orijinal Elektrot",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-007",
    "name": "HORIBA 9652-20D Plastik Gövdeli Jel Dolgulu pH Elektrodu – 2 m Kablolu",
    "brand": "HORIBA",
    "group": "horiba-elektrot-ve-problar",
    "packaging": "2 m Kablolu Orijinal Elektrot/Prob",
    "cas": "Model: 9652-20D • HORIBA Kod: 3200786361",
    "image": "/assets/horiba/horiba-007.png",
    "summary": "HORIBA 9652-20D Plastik Gövdeli Jel Dolgulu pH Elektrodu –2 m Kablolu HORIBA 9652-20D Plastik Gövdeli Jel Dolgulu pH Elektrodu – 2 m Kablolu, laboratuvar ve saha uygulamalarında pH ölçümü için tasarlanmış, plastik gövdeli, jel dolgulu ve entegre sıcaklık sensörlü bir elektrottur. 0…14 özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: 9652-20D • HORIBA Kod: 3200786361",
      "Donanım / Paket Yapısı: 2 m Kablolu Orijinal Elektrot/Prob",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-008",
    "name": "HORIBA LAQUAtwin ORP-11 ORP (Redoks Potansiyeli) Ölçer -1000… +1000 mV",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: ORP-11 • HORIBA Kod: 3200965260",
    "image": "/assets/horiba/horiba-008.png",
    "summary": "HORIBA LAQUAtwin ORP-11 ORP (Redoks Potansiyeli) Ölçer -1000… +1000 mV , sıvı numunelerin oksidasyon-indirgenme potansiyelini belirlemek için geliştirilmiş, taşınabilir ve kompakt bir ölçüm cihazıdır. Platin elektrot teknolojisiyle çalışan cihaz, -1000… +1000 mV ölçüm aralığına ve özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: ORP-11 • HORIBA Kod: 3200965260",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-009",
    "name": "HORIBA LAQUAtwin F-11 Florür İyonu (F⁻) Ölçer 0,1… 990 ppm",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: F-11 • HORIBA Kod: 3200934412",
    "image": "/assets/horiba/horiba-009.png",
    "summary": "HORIBA LAQUAtwin F-11 Florür İyonu (F⁻) Ölçer 0,1… 990 ppm , su ve uygun sıvı numunelerde florür iyonu (F⁻) konsantrasyonunun belirlenmesi için geliştirilmiş taşınabilir bir florür analiz cihazıdır. İyon seçici elektrot (ISE) teknolojisiyle çalışan cihaz, çok az miktarda sıvı numuneyle özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: F-11 • HORIBA Kod: 3200934412",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-012",
    "name": "HORIBA LAQUA PC210-K pH/ORP/EC, TDS/Direnç/Tuzluluk/Sıcaklık Ölçer",
    "brand": "HORIBA",
    "group": "horiba-laqua-portatif-masaustu",
    "packaging": "Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
    "cas": "Model: PC210-K • HORIBA Kod: 3200779532",
    "image": "/assets/horiba/horiba-012.png",
    "summary": "HORIBA LAQUA PC210-K; pH, ORP, iletkenlik (EC), toplam çözünmüş madde (TDS), direnç, tuzluluk ve sıcaklık ölçümleri için geliştirilmiş iki kanallı portatif su analiz cihazıdır. Laboratuvar ve saha uygulamalarında farklı su kalitesi parametrelerinin tek cihazla değerlendirilmesini özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: PC210-K • HORIBA Kod: 3200779532",
      "Donanım / Paket Yapısı: Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-013",
    "name": "HORIBA 9652-10D Plastik Gövdeli Jel Dolgulu pH Elektrodu – 1 m Kablolu",
    "brand": "HORIBA",
    "group": "horiba-elektrot-ve-problar",
    "packaging": "1 m Kablolu Orijinal Elektrot",
    "cas": "Model: 9652-10D • HORIBA Kod: 3200786359",
    "image": "/assets/horiba/horiba-013.png",
    "summary": "HORIBA 9652-10D Plastik Gövdeli Jel Dolgulu pH Elektrodu HORIBA 9652-10D Plastik Gövdeli Jel Dolgulu pH Elektrodu – 1 m Kablolu, laboratuvar ve saha uygulamalarında pH ölçümü için tasarlanmış, plastik gövdeli, jel dolgulu ve entegre sıcaklık sensörlü bir elektrottur. 0…14 pH ölçüm özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: 9652-10D • HORIBA Kod: 3200786359",
      "Donanım / Paket Yapısı: 1 m Kablolu Orijinal Elektrot",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-014",
    "name": "HORIBA LAQUAtwin Ca-11C İnek Kanı İyonize Kalsiyum (Ca²⁺) Ölçer 0,1… 5,0 mmol/L",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: Ca-11C • HORIBA Kod: 1300084982",
    "image": "/assets/horiba/horiba-014.png",
    "summary": "HORIBA LAQUAtwin Ca-11C İnek Kanı İyonize Kalsiyum (Ca²⁺) Ölçer 0,1…5,0 mmol/L HORIBA LAQUAtwin Ca-11C İnek Kanı İyonize Kalsiyum (Ca²⁺) Ölçer 0,1… 5,0 mmol/L , özellikle inek kanında iyonize kalsiyum (Ca²⁺) ölçümü için geliştirilmiş taşınabilir bir veteriner araştırma cihazıdır. Süt özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: Ca-11C • HORIBA Kod: 1300084982",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-015",
    "name": "HORIBA LAQUA DO220-K Portatif Çözünmüş Oksijen Ölçer Seti – 0,00…20,00 mg/L, IP67",
    "brand": "HORIBA",
    "group": "horiba-laqua-portatif-masaustu",
    "packaging": "Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
    "cas": "Model: DO220-K • HORIBA Kod: 3200779531",
    "image": "/assets/horiba/horiba-015.png",
    "summary": "HORIBA LAQUA DO220-K Portatif Çözünmüş Oksijen Ölçer Seti HORIBA LAQUA DO220-K , su numunelerinde çözünmüş oksijen konsantrasyonu (DO), oksijen doygunluğu (%) ve sıcaklık ölçümü için geliştirilmiş portatif oksijen metredir. IP67 korumalı gövdesi, arka aydınlatmalı LCD ekranı özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: DO220-K • HORIBA Kod: 3200779531",
      "Donanım / Paket Yapısı: Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-016",
    "name": "HORIBA LAQUA DO210-K Portatif Çözünmüş Oksijen ve Sıcaklık Ölçer – 0… 20 mg/L",
    "brand": "HORIBA",
    "group": "horiba-laqua-portatif-masaustu",
    "packaging": "Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
    "cas": "Model: DO210-K • HORIBA Kod: 3200779530",
    "image": "/assets/horiba/horiba-016.png",
    "summary": "HORIBA LAQUA DO210-K Portatif Çözünmüş Oksijen ve Sıcaklık Ölçer HORIBA LAQUA DO210-K , içme suyu, atık su, yüzey suları, endüstriyel proses suyu ve su ürünleri yetiştiriciliği uygulamalarında çözünmüş oksijen (DO) ve sıcaklık ölçümü için geliştirilmiş portatif su analiz cihazıdır.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: DO210-K • HORIBA Kod: 3200779530",
      "Donanım / Paket Yapısı: Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-017",
    "name": "HORIBA 6252-10D Gıda Tipi Sivri Uçlu pH Elektrodu – 1 m Kablolu",
    "brand": "HORIBA",
    "group": "horiba-elektrot-ve-problar",
    "packaging": "1 m Kablolu Orijinal Elektrot",
    "cas": "Model: 6252-10D • HORIBA Kod: 3014080850",
    "image": "/assets/horiba/horiba-017.png",
    "summary": "HORIBA 6252-10D Gıda Tipi Sivri Uçlu pH Elektrodu HORIBA 6252-10D Gıda Tipi Sivri Uçlu pH Elektrodu – 1 m Kablolu , et, meyve, sebze ve diğer gıda numunelerinde doğrudan pH ölçümü için geliştirilmiş, sivri uçlu cam gövdeli bir elektrottur. Numuneye batırılabilen özel uç tasarımı özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: 6252-10D • HORIBA Kod: 3014080850",
      "Donanım / Paket Yapısı: 1 m Kablolu Orijinal Elektrot",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-018",
    "name": "HORIBA 9651-10D Plastik Gövdeli Jel Dolgulu pH Elektrodu – 1 m Kablolu",
    "brand": "HORIBA",
    "group": "horiba-elektrot-ve-problar",
    "packaging": "1 m Kablolu Orijinal Elektrot",
    "cas": "Model: 9651-10D • HORIBA Kod: 3200642020",
    "image": "/assets/horiba/horiba-018.png",
    "summary": "HORIBA 9651-10D Plastik Gövdeli Jel Dolgulu pH Elektrodu HORIBA 9651-10D Plastik Gövdeli Jel Dolgulu pH Elektrodu – 1 m Kablolu , saha ve laboratuvar ortamlarında pH ölçümleri için geliştirilmiş, plastik gövdeli, jel dolgulu ve entegre sıcaklık sensörlü bir elektrottur. pH, referans ve özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: 9651-10D • HORIBA Kod: 3200642020",
      "Donanım / Paket Yapısı: 1 m Kablolu Orijinal Elektrot",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-019",
    "name": "HORIBA LAQUA EC220-K Portatif İletkenlik, TDS, Tuzluluk ve Direnç Ölçer Seti – IP67",
    "brand": "HORIBA",
    "group": "horiba-laqua-portatif-masaustu",
    "packaging": "Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
    "cas": "Model: EC220-K • HORIBA Kod: 3200779529",
    "image": "/assets/horiba/horiba-019.png",
    "summary": "HORIBA LAQUA EC220-K Portatif İletkenlik Ölçer Seti HORIBA LAQUA EC220-K Portatif İletkenlik, TDS, Tuzluluk ve Direnç Ölçer Seti – IP67; aydınlatmalı ekranı ve otomatik veri kayıt özellikleri sayesinde laboratuvar ve saha uygulamalarında kullanılabilir. Öne Çıkan Özellikler İletkenlik, özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: EC220-K • HORIBA Kod: 3200779529",
      "Donanım / Paket Yapısı: Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-020",
    "name": "HORIBA LAQUA EC210-K Portatif İletkenlik, TDS, Direnç, Tuzluluk ve Sıcaklık Ölçer",
    "brand": "HORIBA",
    "group": "horiba-laqua-portatif-masaustu",
    "packaging": "Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
    "cas": "Model: EC210-K • HORIBA Kod: 3200779528",
    "image": "/assets/horiba/horiba-020.png",
    "summary": "HORIBA LAQUA EC210-K , su ve sulu çözeltilerde elektriksel iletkenlik (EC), toplam çözünmüş madde (TDS), özdirenç, tuzluluk ve sıcaklık ölçümleri için geliştirilmiş portatif çok parametreli ölçüm cihazıdır. IP67 korumalı gövdesi, otomatik sıcaklık kompanzasyonu ve 500 verilik hafızası özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: EC210-K • HORIBA Kod: 3200779528",
      "Donanım / Paket Yapısı: Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-021",
    "name": "HORIBA LAQUA PH210-K Portatif pH, ORP ve Sıcaklık Ölçer -2,00… 16,00 pH",
    "brand": "HORIBA",
    "group": "horiba-laqua-portatif-masaustu",
    "packaging": "Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
    "cas": "Model: PH210-K • HORIBA Kod: 3200779526",
    "image": "/assets/horiba/horiba-021.png",
    "summary": "HORIBA LAQUA PH210-K Portatif pH, ORP ve Sıcaklık Ölçer HORIBA LAQUA PH210-K , laboratuvar ve saha uygulamalarında pH, oksidasyon-redüksiyon potansiyeli (ORP/mV) ve sıcaklık ölçümleri için geliştirilmiş portatif su analiz cihazıdır. -2,00… 16,00 pH ölçüm aralığı, 0,01 pH çözünürlüğü ve özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: PH210-K • HORIBA Kod: 3200779526",
      "Donanım / Paket Yapısı: Portatif Saha & Laboratuvar Cihaz Seti (IP67)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-023",
    "name": "HORIBA LAQUAtwin NO3-11 Nitrat İyonu (NO₃⁻) Ölçer 6…9900 ppm",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: NO3-11 • HORIBA Kod: 3200689162",
    "image": "/assets/horiba/horiba-023.png",
    "summary": "HORIBA LAQUAtwin NO3-11 Nitrat İyonu (NO₃⁻) Ölçer 6…9900 ppm, sıvı numunelerde nitrat iyonu (NO₃⁻) konsantrasyonunu belirlemek için geliştirilmiş, kompakt ve taşınabilir bir iyon ölçüm cihazıdır. İyon seçici elektrot (ISE) teknolojisiyle yalnızca birkaç damla numune kullanılarak ölçüm özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: NO3-11 • HORIBA Kod: 3200689162",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-024",
    "name": "HORIBA LAQUAtwin NO3-11S Toprak Nitrat İyonu (NO₃⁻) Ölçer 6… 9900 ppm",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: NO3-11S • HORIBA Kod: 3200689164",
    "image": "/assets/horiba/horiba-024.png",
    "summary": "HORIBA LAQUAtwin NO3-11S Toprak Nitrat İyonu (NO₃⁻) Ölçer 6…9900 ppm HORIBA LAQUAtwin NO3-11S Toprak Nitrat İyonu (NO₃⁻) Ölçer 6… 9900 ppm , toprak numunelerinden hazırlanan sıvı ekstraktlarda nitrat iyonu (NO₃⁻) konsantrasyonunun belirlenmesine yönelik taşınabilir bir nitrat analiz özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: NO3-11S • HORIBA Kod: 3200689164",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-025",
    "name": "HORIBA LAQUAtwin NO3-11C Bitki Özsuyu Nitrat İyonu (NO₃⁻) Ölçer 6… 9900 ppm",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: NO3-11C • HORIBA Kod: 3200689163",
    "image": "/assets/horiba/horiba-025.png",
    "summary": "HORIBA LAQUAtwin NO3-11C , bitki özsularındaki nitrat iyonu (NO₃⁻) konsantrasyonunun belirlenmesi için geliştirilmiş taşınabilir bir nitrat analiz kitidir. İyon seçici elektrot (ISE) teknolojisiyle çalışan cihaz, çok az miktarda numuneyle hızlı ve pratik ölçüm yapılmasını sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: NO3-11C • HORIBA Kod: 3200689163",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-026",
    "name": "HORIBA LAQUAtwin Na-11 Sodyum İyon Ölçer (Na+) 2… 9900 ppm",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: Na-11 • HORIBA Kod: 3200689159",
    "image": "/assets/horiba/horiba-026.png",
    "summary": "HORIBA LAQUAtwin Na-11 Sodyum İyon Ölçer (Na+) 2… 9900 ppm , sıvı numunelerde sodyum iyonu (Na⁺) konsantrasyonunu belirlemek için geliştirilmiş, taşınabilir bir iyon ölçüm cihazıdır. İyon seçici elektrot (ISE) teknolojisiyle çalışan cihaz, yalnızca birkaç damla numuneyle ölçüm özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: Na-11 • HORIBA Kod: 3200689159",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-027",
    "name": "HORIBA LAQUAtwin Salt-22 Tuzluluk Ölçer Na+ Sensörlü | Ağırlıkça % 0.01 İle %25",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: Salt-22 • HORIBA Kod: 3200689158",
    "image": "/assets/horiba/horiba-027.png",
    "summary": "HORIBA LAQUAtwin Salt-22 Tuzluluk Ölçer Ağırlıkça % 0.01 ile %25 HORIBA LAQUAtwin Salt- Cep Tipi Tuzluluk Ölçer; 0.3 mL'lik numune ile tuzluluk değerini ölçen tek cep tipi saltmetredir. Ölçüm cihazınızı kalibre etmesi veya bir numuneyi ölçmesi için bir behere gerek yoktur. Sadece düz özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: Salt-22 • HORIBA Kod: 3200689158",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-028",
    "name": "HORIBA LAQUAtwin SALT-11 Tuzluluk ve Sıcaklık Ölçer",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: SALT-11 • HORIBA Kod: 3999960128",
    "image": "/assets/horiba/horiba-028.png",
    "summary": "HORIBA LAQUAtwin SALT-11 Tuzluluk ve Sıcaklık Ölçer, sıvı numunelerde tuzluluk ve sıcaklık ölçümü yapabilen taşınabilir dijital analiz cihazıdır. Tuzluluğu 0,0…100,0 ppt (g/L) veya %0,00…10,00 aralığında gösterirken, 0…50,0 °C aralığında sıcaklık ölçümü de gerçekleştirir. Deniz suyu, özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: SALT-11 • HORIBA Kod: 3999960128",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-030",
    "name": "HORIBA LAQUAtwin EC-22 İletkenlik Ölçer 20.00... 199.99 mS/cm | 0.1 mS/cm",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: EC-22 • HORIBA Kod: 3999960126",
    "image": "/assets/horiba/horiba-030.png",
    "summary": "HORIBA LAQUAtwin EC-22 Cep Tipi İletkenlik Ölçer HORIBA LAQUAtwin EC-22 İletkenlik Ölçer 20.00... 199.99 mS/cm 0.1 mS/cm, sıvı numunelerin elektriksel iletkenliğini hızlı ve pratik şekilde ölçmek için geliştirilmiş, cep tipi dijital iletkenlik ölçerdir. Düz yüzeyli sensör teknolojisi özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: EC-22 • HORIBA Kod: 3999960126",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-031",
    "name": "HORIBA LAQUAtwin EC-11 İletkenlik Ölçer 2.00.... 19.99 mS/cm / 0.01 mS/cm",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: EC-11 • HORIBA Kod: 3999960125",
    "image": "/assets/horiba/horiba-031.png",
    "summary": "HORIBA LAQUAtwin EC-11 Cep Tipi İletkenlik Ölçer HORIBA Laquatwin EC-11 İletkenlik Ölçer 2.00.... 19.99 mS/cm / 0.01 mS/cm, su ve sıvı numunelerin elektriksel iletkenliğini ölçmek için geliştirilmiş, kompakt ve taşınabilir bir iletkenlik ölçüm cihazıdır. Düz yüzeyli sensörü sayesinde özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: EC-11 • HORIBA Kod: 3999960125",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-033",
    "name": "HORIBA LAQUAtwin pH-22 pH Metre 0.00... 14.00 pH / 0.01 pH",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: pH-22 • HORIBA Kod: 3999960123",
    "image": "/assets/horiba/horiba-033.png",
    "summary": "HORIBA LAQUAtwin pH-22, küçük hacimli sıvı numunelerinde hassas pH ölçümü için geliştirilmiş cep tipi dijital pH metredir. Düz yüzeyli cam elektrot sensörü sayesinde yalnızca 0,1 mL numune ile ölçüm yapılabilir. 0,01 pH çözünürlüğü, 3 noktaya kadar kalibrasyon ve IP67 koruması özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: pH-22 • HORIBA Kod: 3999960123",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HRB-034",
    "name": "HORIBA LAQUAtwin pH-11 pH Metre 0.0...14.0 pH / 0.1 pH",
    "brand": "HORIBA",
    "group": "horiba-laquatwin-cep-cihazlari",
    "packaging": "Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
    "cas": "Model: pH-11 • HORIBA Kod: 3999960122",
    "image": "/assets/horiba/horiba-034.png",
    "summary": "HORIBA LAQUAtwin pH-11, küçük hacimli sıvı numunelerinde hızlı ve pratik pH ölçümü için geliştirilmiş cep tipi dijital pH metredir. Düz yüzeyli cam elektrot sensörü sayesinde yalnızca 0,1 mL numune ile ölçüm yapılabilir. 0,1 pH çözünürlüğü, 2 noktaya kadar kalibrasyon özelliği ve IP67 özellikleri ile laboratuvar ve saha ölçümlerinde yüksek tekrarlanabilirlik sağlar.",
    "specs": [
      "Marka / Üretici: HORIBA Advanced Techno (Japonya)",
      "Model & Referans Kodu: Model: pH-11 • HORIBA Kod: 3999960122",
      "Donanım / Paket Yapısı: Cep Tipi Kit (Sensör + Kalibrasyon Çözeltisi Seti)",
      "Tedarik Kapsamı: Kurumsal teklif bazlı cihaz/elektrot tedariki ve kalibrasyon çözeltisi uyumu"
    ]
  },
  {
    "code": "HORIBA-500-4",
    "name": "HORIBA 500-4 pH 4.01 Standart Tampon Çözeltisi (500 mL)",
    "brand": "HORIBA",
    "group": "horiba-standart-cozeltiler",
    "packaging": "500 mL HDPE Şişe (NIST İzlenebilir)",
    "cas": "Ftalat Tamponu (pH 4.01 ±0.01 @ 25°C)",
    "image": "/assets/horiba/horiba-009.png",
    "summary": "HORIBA masaüstü ve taşınabilir pH metrelerin asidik bölge kalibrasyonu için ±0.01 pH (@25°C) hassasiyetli, NIST izlenebilir orijinal pH 4.01 standart tampon çözeltisi.",
    "specs": [
      "Parametre: pH 4.01 ± 0.01 (@ 25°C)",
      "Standart: NIST İzlenebilir Kalibrasyon Sertifikalı (COA)",
      "Ambalaj: 500 mL Orijinal HORIBA Şişe (Model 500-4)",
      "Uygulama: Laboratuvar, Proses ve Saha pH Elektrot Kalibrasyonu"
    ]
  },
  {
    "code": "HORIBA-500-7",
    "name": "HORIBA 500-7 pH 7.00 Standart Tampon Çözeltisi (500 mL)",
    "brand": "HORIBA",
    "group": "horiba-standart-cozeltiler",
    "packaging": "500 mL HDPE Şişe (NIST İzlenebilir)",
    "cas": "Fosfat Tamponu (pH 7.00 ±0.01 @ 25°C)",
    "image": "/assets/horiba/horiba-011.png",
    "summary": "Tüm laboratuvar ve endüstriyel pH ölçerlerin sıfır noktası (nötr) kalibrasyonu için ±0.01 pH (@25°C) doğrulukta NIST izlenebilir orijinal HORIBA pH 7.00 tampon çözeltisi.",
    "specs": [
      "Parametre: pH 7.00 ± 0.01 (@ 25°C) — Nötr Referans Noktası",
      "Standart: NIST İzlenebilir Parti Sertifikalı (COA)",
      "Ambalaj: 500 mL Orijinal HORIBA Şişe (Model 500-7)",
      "Uygulama: USA Serisi pH 7.00 & NIST Serisi pH 6.86 (500-686) Seçenekli"
    ]
  },
  {
    "code": "HORIBA-500-10",
    "name": "HORIBA 500-10 pH 10.01 Standart Tampon Çözeltisi (500 mL)",
    "brand": "HORIBA",
    "group": "horiba-standart-cozeltiler",
    "packaging": "500 mL HDPE Şişe (NIST İzlenebilir)",
    "cas": "Karbonat/Borat Tamponu (pH 10.01 ±0.02 @ 25°C)",
    "image": "/assets/horiba/horiba-012.png",
    "summary": "Kazan suyu, soğutma kulesi ve alkali proses sularında çalışan pH elektrotlarının bazik eğim (slope) kalibrasyonu için orijinal HORIBA pH 10.01 tampon çözeltisi.",
    "specs": [
      "Parametre: pH 10.01 ± 0.02 (@ 25°C)",
      "Standart: NIST İzlenebilir Kalibrasyon Sertifikalı",
      "Ambalaj: 500 mL Orijinal HORIBA Şişe (Model 500-10 / NIST pH 9.18 Model 500-9)",
      "Uygulama: Alkali Su ve Atıksu pH Kalibrasyonu"
    ]
  },
  {
    "code": "HORIBA-Y014-Y017",
    "name": "HORIBA LAQUAtwin pH 4.01 & pH 7.00 Cep Tipi Tampon Çözelti Seti (6×14 mL)",
    "brand": "HORIBA",
    "group": "horiba-standart-cozeltiler",
    "packaging": "14 mL × 6 Şişe Orijinal Kit",
    "cas": "Model Y014 (pH 4.01) & Model Y017 (pH 7.00)",
    "image": "/assets/horiba/horiba-033.png",
    "summary": "HORIBA LAQUAtwin düz sensörlü cep tipi pH metrelerin sahada doğrudan damlatma yöntemiyle hızlı 2 noktalı kalibrasyonu için 14 mL damlalıklı şişe kitleri.",
    "specs": [
      "Model Kodları: Y014 (pH 4.01), Y017 (pH 7.00), Y019 (pH 9.18)",
      "Ambalaj: 6 × 14 mL Damlalıklı Cep Şişesi",
      "Avantaj: Tek damla (0.1 mL) ile saha kalibrasyonu, sıfır kontaminasyon"
    ]
  },
  {
    "code": "HORIBA-500-21",
    "name": "HORIBA 500-21 Düşük İletkenlik (EC) Standart Çözeltisi 84 µS/cm (500 mL)",
    "brand": "HORIBA",
    "group": "horiba-standart-cozeltiler",
    "packaging": "500 mL Şişe (84 µS/cm @ 25°C)",
    "cas": "Potasyum Klorür (KCl) NIST İzlenebilir",
    "image": "/assets/horiba/horiba-016.png",
    "summary": "Ters ozmoz (RO) permeat suyu, deiyonize su ve düşük iletkenlikli kazan besi suyu ölçerlerin kalibrasyonu için 84 µS/cm (@25°C) HORIBA standart çözeltisi.",
    "specs": [
      "İletkenlik Değeri: 84 µS/cm (@ 25°C)",
      "Model Kodu: HORIBA 500-21",
      "Ambalaj: 500 mL Hava Sızdırmaz HDPE Şişe",
      "Uygulama: Saf Su, RO Çıkışı ve Düşük EC Sensör Kalibrasyonu"
    ]
  },
  {
    "code": "HORIBA-500-22",
    "name": "HORIBA 500-22 Standart İletkenlik (EC) Çözeltisi 1413 µS/cm (500 mL)",
    "brand": "HORIBA",
    "group": "horiba-standart-cozeltiler",
    "packaging": "500 mL Şişe (1413 µS/cm @ 25°C)",
    "cas": "0.01 M KCl Referans Çözeltisi",
    "image": "/assets/horiba/horiba-017.png",
    "summary": "İçme suyu, kuyu suyu, soğutma kulesi ve endüstriyel proses suyu iletkenlik/TDS problarının ana kalibrasyonu için 1413 µS/cm (1.41 mS/cm) HORIBA standart çözeltisi.",
    "specs": [
      "İletkenlik Değeri: 1413 µS/cm (1.413 mS/cm @ 25°C)",
      "Model Kodu: HORIBA 500-22 (Masaüstü) / Y071L (LAQUAtwin 6×14 mL)",
      "Ambalaj: 500 mL Şişe veya 6×14 mL Cep Seti"
    ]
  },
  {
    "code": "HORIBA-500-23-24",
    "name": "HORIBA 500-23 (12.88 mS/cm) & 500-24 (111.8 mS/cm) Yüksek İletkenlik Standartları",
    "brand": "HORIBA",
    "group": "horiba-standart-cozeltiler",
    "packaging": "500 mL Şişe (12.88 mS/cm & 111.8 mS/cm)",
    "cas": "KCl Yüksek İletkenlik Referans Serisi",
    "image": "/assets/horiba/horiba-029.png",
    "summary": "Yüksek iletkenlikli soğutma suyu blöfü, kazan suyu, tekstil/deri atıksuları ve deniz suyu (brine) EC hücrelerinin kalibrasyonu için 12.88 mS/cm ve 111.8 mS/cm çözeltiler.",
    "specs": [
      "Model 500-23 / Y071M: 12.88 mS/cm (@ 25°C)",
      "Model 500-24: 111.8 mS/cm (@ 25°C)",
      "Ambalaj: 500 mL Orijinal HORIBA Şişe"
    ]
  },
  {
    "code": "HORIBA-ISE-STANDARDS",
    "name": "HORIBA LAQUAtwin & Laboratuvar İyon (ISE) Kalibrasyon Çözeltileri (Ca²⁺, NO₃⁻, K⁺, Na⁺, F⁻, Cl⁻)",
    "brand": "HORIBA",
    "group": "horiba-standart-cozeltiler",
    "packaging": "6×14 mL LAQUAtwin Kit / 500 mL ISE Şişe",
    "cas": "150 ppm / 2000 ppm & 100 / 1000 mg/L Standartlar",
    "image": "/assets/horiba/horiba-022.png",
    "summary": "HORIBA İyon Seçici Elektrotlar (ISE) ve LAQUAtwin cep tipi iyon ölçerler için Kalsiyum, Nitrat, Potasyum, Sodyum, Florür, Klorür ve Amonyak standart çözeltileri ile ISA reaktifleri.",
    "specs": [
      "LAQUAtwin İyon Kitleri (150 & 2000 ppm): Y022 (Na⁺), Y031 (K⁺), Y041 (NO₃⁻), Y051 (Ca²⁺)",
      "Laboratuvar ISE Standartları: 100 mg/L ve 1000 mg/L (F⁻, Cl⁻, NH₄⁺, Ca²⁺, K⁺, NO₃⁻)",
      "İyonik Kuvvet Ayarlayıcı (ISA) Çözeltileri Dahil"
    ]
  },
  {
    "code": "HORIBA-ORP-STANDARDS",
    "name": "HORIBA ORP (Redoks) Standart Çözeltisi (229 mV) ve Kinhidron Toz Seti (89 mV / 258 mV)",
    "brand": "HORIBA",
    "group": "horiba-standart-cozeltiler",
    "packaging": "6×14 mL Şişe (Y058) / 10 Paket Toz (160-22 & 160-51)",
    "cas": "ORP Referans Standartları (@ 25°C)",
    "image": "/assets/horiba/horiba-025.png",
    "summary": "Dezenfeksiyon, klorlama ve atıksu oksidasyon ORP (mV) problarının doğruluk kontrolü için hazır 229 mV kalibrasyon çözeltisi (Y058) ve 89 mV / 258 mV ORP standart tozları.",
    "specs": [
      "Model Y058: 229 mV (@ 25°C) Hazır ORP Çözeltisi (14 mL × 6 Şişe)",
      "Model 160-22: pH 4 Kinhidron ORP Tozu (+258 mV @ 25°C, 250 mL × 10 Paket)",
      "Model 160-51: pH 7 Kinhidron ORP Tozu (+89 mV @ 25°C, 250 mL × 10 Paket)"
    ]
  },
  {
    "code": "HORIBA-300-KCL",
    "name": "HORIBA Model 300 Referans Elektrot İç Dolgu Çözeltisi (3.33 M KCl — 250 mL)",
    "brand": "HORIBA",
    "group": "horiba-standart-cozeltiler",
    "packaging": "50 mL / 250 mL Orijinal Şişe",
    "cas": "7447-40-7 (3.33 mol/L Potasyum Klorür)",
    "image": "/assets/horiba/horiba-006.png",
    "summary": "Doldurulabilir cam pH, ORP ve referans elektrotların kavşak (junction) potansiyelini kararlı tutan ve elektrot ömrünü koruyan orijinal HORIBA 3.33 M KCl iç dolgu ve saklama çözeltisi.",
    "specs": [
      "Konsantrasyon: 3.33 M Potasyum Klorür (AgCl doygun olmayan saf formül)",
      "Model Kodu: HORIBA 300 (Sıvı) / HORIBA 310 (Jel Tipi)",
      "Ambalaj: 50 mL ve 250 mL Damlalıklı Orijinal Şişe"
    ]
  },
  {
    "code": "HORIBA-220-230-250",
    "name": "HORIBA Model 220 / 230 / 250 pH Elektrot Temizleme ve Rejenerasyon Çözeltileri",
    "brand": "HORIBA",
    "group": "horiba-standart-cozeltiler",
    "packaging": "50 mL × 2 / 100 mL / 250 mL Şişe",
    "cas": "Elektrot Membran & Diyafram Temizleme Serisi",
    "image": "/assets/horiba/horiba-007.png",
    "summary": "Tepki süresi yavaşlamış veya kirlenmiş pH/ORP cam membranlarını inorganik kireç, metal oksit, yağ ve protein kalıntılarından arındıran orijinal HORIBA temizleme solüsyonları.",
    "specs": [
      "Model 220: İnorganik Kireç ve Metal Oksit Temizleme Çözeltisi",
      "Model 230: Genel Amaçlı Diyafram & Cam Membran Temizleyici",
      "Model 250: Protein ve Biyolojik Kalıntı Temizleme Çözeltisi (Pepsin/HCl)"
    ]
  },
  {
    "code": "HORIBA-Y021-SALINITY",
    "name": "HORIBA Y021 Tuzluluk (Salinity) Kalibrasyon Çözeltisi Seti (%0.5 & %5.0 NaCl)",
    "brand": "HORIBA",
    "group": "horiba-standart-cozeltiler",
    "packaging": "14 mL × 6 Şişe Seti",
    "cas": "7647-14-5 (5 ppt & 50 ppt NaCl Standart)",
    "image": "/assets/horiba/horiba-027.png",
    "summary": "HORIBA LAQUAtwin Salt-11 ve laboratuvar tuzluluk ölçerlerin düşük (%0.5 / 5 ppt) ve yüksek (%5.0 / 50 ppt) aralıkta hassas kalibrasyonu için standart çözelti seti.",
    "specs": [
      "Standart Değerler: %0.5 (5 ppt) ve %5.0 (50 ppt) Sodyum Klorür",
      "Model Kodu: HORIBA Y021",
      "Ambalaj: 6 × 14 mL Orijinal Şişe"
    ]
  }
];
